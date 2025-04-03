"use server";

import { blacklistedMails } from "@/utils/blacklistedMails";
import generateUUID from "@/lib/generateUUID";

import { NextResponse, NextRequest } from "next/server";
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

	contactFormData.append("secret", process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY as string);
	contactFormData.append("response", token);
	contactFormData.append("remoteip", ip);

	const result = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
		method: "POST",
		body: contactFormData,
	});

	const cfResponse = await result.json();
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
	const { fullname, email, phone, message } = await req.json();

	if (!solves.includes(req?.cookies.get("cf-captch")?.value || "")) {
		return NextResponse.json(
			{
				message: "Nepodařilo se nám ověřit jestli jste člověk. Obnovte prosím stránku a vyplňte captchu!",
				success: false,
			},
			{ status: 400 },
		);
	}

	// TODO : Add back-end validation for form inputs

	return NextResponse.json({ message: "Žádost byla úspěšně odeslána!", success: true }, { status: 200 });
}
