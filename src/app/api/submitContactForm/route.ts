"use server";

import { blacklistedMails } from "@/utils/blacklistedMails";
import { EMAIL_ADDRESS } from "@/lib/constants";
import generateUUID from "@/lib/generateUUID";

import { parsePhoneNumberFromString } from "libphonenumber-js";
import { NextResponse, NextRequest } from "next/server";
import { createTransport } from "nodemailer";
import "dotenv/config";

let solves: string[] = [];
setInterval(() => {
	solves = [];
}, 60_000 * 5);

export async function GET(req: NextRequest) {
	const token = req?.nextUrl?.searchParams?.get("token");
	if (!token) return new Response(null, { status: 400 });

	const contactFormData = new FormData();
	// @ts-expect-error : Ignore this runtime error
	const ip = req?.ip;

	contactFormData.append("secret", process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY);
	contactFormData.append("response", token);
	contactFormData.append("remoteip", ip);

	const result = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
		method: "POST",
		body: contactFormData,
	});

	const cfResponse = await result?.json();
	if (!cfResponse) return new Response(null, { status: 400 });

	const id = generateUUID();
	solves.push(id);

	return new Response(null, {
		status: 200,
		headers: {
			"set-cookie": "cf-captch=" + id,
		},
	});
}

export async function POST(req: NextRequest) {
	const { fullname, email, phone, message } = await req?.json();

	if (!solves.includes(req?.cookies.get("cf-captch")?.value || "")) {
		return NextResponse.json(
			{
				message: "Nepodařilo se nám ověřit jestli jste člověk. Obnovte prosím stránku a vyplňte captchu!",
				success: false,
			},
			{ status: 400 },
		);
	}

	if (!fullname) {
		return NextResponse.json(
			{ message: "Vyplňte prosím Vaše celé jméno a příjmení", success: false },
			{ status: 400 },
		);
	} else if (fullname.length < 5) {
		return NextResponse.json(
			{ message: "Jméno a příjmení musí mít alespoň 5 znaků", success: false },
			{ status: 400 },
		);
	} else if (fullname.length > 50) {
		return NextResponse.json(
			{ message: "Jméno a příjmení nemůže mít více než 50 znaků", success: false },
			{ status: 400 },
		);
	} else if (!/^[a-zA-Zá-žÁ-Ž\s]+$/.test(fullname)) {
		return NextResponse.json(
			{ message: "Jméno a příjmení může obsahovat pouze písmena", success: false },
			{ status: 400 },
		);
	} else if (fullname.trim().split(/\s+/).length < 2) {
		return NextResponse.json(
			{ message: "Jméno a příjmení musí být odděleno mezerou", success: false },
			{ status: 400 },
		);
	}

	if (!email) {
		return NextResponse.json({ message: "Vyplňte prosím Vaší e-mailovou adresu", success: false }, { status: 400 });
	} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
		return NextResponse.json({ message: "Zadaná e-mailová adresa je neplatná", success: false }, { status: 400 });
	} else if (email.length > 100) {
		return NextResponse.json({ message: "E-mailová adresa je příliš dlouhá", success: false }, { status: 400 });
	} else if (email.length < 8) {
		return NextResponse.json({ message: "E-mailová adresa je příliš krátka", success: false }, { status: 400 });
	} else if (blacklistedMails.includes(email.split("@")[1])) {
		return NextResponse.json(
			{ message: "Dočasné e-mailové adresy nejsou povoleny", success: false },
			{ status: 400 },
		);
	} else if (email === EMAIL_ADDRESS) {
		return NextResponse.json(
			{ message: "Tuhle e-mailovou adresu nemůžete použít", success: false },
			{ status: 400 },
		);
	}

	const userPhoneNumber = parsePhoneNumberFromString(phone, "CZ");

	if (!phone) {
		return NextResponse.json({ message: "Vyplňte prosím Vaše telefonní číslo", success: false }, { status: 400 });
	} else if (!userPhoneNumber || !userPhoneNumber.isValid()) {
		return NextResponse.json({ message: "Zadejte prosím platné telefonní číslo", success: false }, { status: 400 });
	} else if (userPhoneNumber.country !== "CZ") {
		return NextResponse.json({ message: "Zadejte prosím české telefonní číslo", success: false }, { status: 400 });
	} else if (userPhoneNumber.nationalNumber.length !== 9) {
		return NextResponse.json({ message: "Telefonní číslo musí mít 9 číslic", success: false }, { status: 400 });
	}

	if (!message) {
		return NextResponse.json({ message: "Vyplňte prosím Vaší zprávu", success: false }, { status: 400 });
	} else if (message.length < 10) {
		return NextResponse.json({ message: "Zpráva musí mít minimálně 10 znaků", success: false }, { status: 400 });
	} else if (message.length > 1000) {
		return NextResponse.json(
			{ message: "Zpráva nemůže být delší než 1000 znaků", success: false },
			{ status: 400 },
		);
	}

	const transporter = createTransport({
		host: "smtp.seznam.cz",
		port: 465,
		auth: {
			user: process.env.EMAIL_USER_NAME,
			pass: process.env.EMAIL_USER_PASS,
		},
	});

	try {
		await transporter.sendMail({
			from: `${fullname} <${process.env.EMAIL_USER_NAME}>`,
			to: EMAIL_ADDRESS,
			subject: "Obdrželi jste novou zprávu z kontaktního formuláře",
			html: `
            <div style="background-color:#121212;padding:30px 0;">
                <div style="max-width:600px;margin:0 auto;background:#ffffff;overflow:hidden;">
                    <div style="background-color:#000000;padding:20px;text-align:center;color:#ffffff;">
                        <img src="cid:virgixo" alt="Virgixo" style="max-height:80px;margin-bottom:10px;">
                        <h1 style="margin:0;font-size:22px;">Nová zpráva z kontaktního formuláře</h1>
                    </div>

                <div style="padding:20px;">
                    <p style="margin:0 0 15px;color:#000000;">Níže naleznete informace z kontaktní stránky:</p>
        
                    <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
                        <tr>
                        <td style="padding:8px;font-weight:bold;width:100px;color:#000000;;">Jméno:</td>
                        <td style="padding:8px;background:#f9f9f9;color:#000000;">${fullname}</td>
                        </tr>
                        <tr>
                        <td style="padding:8px;font-weight:bold;color:#000000;">Email:</td>
                        <td style="padding:8px;background:#f9f9f9;color:#000000;">${email}</td>
                        </tr>
                        <tr>
                        <td style="padding:8px;font-weight:bold;color:#000000">Telefon:</td>
                        <td style="padding:8px;background:#f9f9f9;color:#000000;">${userPhoneNumber.formatInternational()}</td>
                        </tr>
                        <tr>
                        <td style="padding:8px;font-weight:bold;vertical-align:top;color:#000000;">Zpráva:</td>
                        <td style="padding:8px;background:#f9f9f9;white-space:pre-line;color:#000000;">${message}</td>
                        </tr>
                    </table>

                    <p style="margin-top:30px;color:#555555;">Zpráva byla automaticky odeslána z kontaktího formuláře <strong>Virgixo.com</strong>.</p>
                </div>

                <div style="background:#f1f1f1;padding:15px;text-align:center;font-size:12px;color:#777777;">
                    &copy; ${new Date().getFullYear()} Virgixo.com · Všechna práva vyhrazena
                </div>
                </div>
            </div>
`,
			attachments: [
				{
					filename: "Logo-With-Background.png",
					path: `${process.cwd()}/public/assets/Logo-With-Background.png`,
					cid: "virgixo",
				},
			],
		});

		return NextResponse.json({ message: "Zpráva byla úspěšně odeslána!", success: true }, { status: 200 });
	} catch {
		return NextResponse.json(
			{ message: "Nastala neočekávaná chyba, zkuste to prosím znovu později!", success: false },
			{ status: 500 },
		);
	}
}
