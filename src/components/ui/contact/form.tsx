"use client";

import { OpenSansBold, OpenSansMedium, OpenSansRegular } from "@/lib/fonts";
import { EMAIL_ADDRESS, PHONE_NUMBER } from "@/lib/constants";
import { blacklistedMails } from "@/utils/blacklistedMails";

import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile";
import { RiSendPlane2Line, RiPhoneLine } from "react-icons/ri";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { motion } from "framer-motion";
import { toast } from "sonner";
import Link from "next/link";
import React from "react";

export const ContactForm = () => {
	const initialFormState = { fullname: "", email: "", phone: "", message: "" };

	const fieldLabels: { [key in keyof typeof initialFormState]: string } = {
		fullname: "Jméno a Příjmení",
		email: "E-mailová Adresa",
		phone: "Telefonní Číslo",
		message: "Zpráva",
	};

	const fieldPlaceholders: { [key in keyof typeof initialFormState]: string } = {
		fullname: "Franta Novotný",
		email: EMAIL_ADDRESS,
		phone: PHONE_NUMBER,
		//prettier-ignore
		message: "Popište detailně Váš požadavek co od nás potřebujete, jestli již máte nějaké podklady tak je připojte. Poskytněte nám co nejvíce informací pro rychlejší komunikaci...",
	};

	//prettier-ignore
	const [formErrors, setFormErrors] = React.useState<{ fullname?: string; email?: string; phone?: string; message?: string; }>({});
	const [focusedField, setFocusedField] = React.useState<string | null>(null);
	const [isDataSubmitting, setIsDataSubmitting] = React.useState(false);
	const [formData, setFormData] = React.useState(initialFormState);
	const [canDataSubmit, setCanDataSubmit] = React.useState(true);
	const turnstileRef = React.useRef<TurnstileInstance>(null);

	const handleCloudFlareChallenge = async (e: string) => {
		const data = await fetch(`/api/submitContactForm?token=${e}`);
		setCanDataSubmit(data?.ok ? true : false);
	};

	const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const newFormErrors = { ...formErrors };
		const eventFieldName = e?.target?.name as keyof typeof formErrors;

		delete newFormErrors[eventFieldName];

		setFormErrors(newFormErrors);
		setFormData((prev) => ({ ...prev, [eventFieldName]: e?.target?.value }));
	};

	const validateForm = () => {
		const newFormErrors: { fullname?: string; email?: string; phone?: string; message?: string } = {};

		if (!formData.fullname.trim()) {
			newFormErrors.fullname = "Vyplňte prosím Vaše celé jméno a příjmení";
		} else if (formData.fullname.length < 5) {
			newFormErrors.fullname = "Jméno a příjmení musí mít alespoň 5 znaků";
		} else if (formData.fullname.length > 50) {
			newFormErrors.fullname = "Jméno a příjmení nemůže mít více než 50 znaků";
		} else if (!/^[a-zA-Zá-žÁ-Ž\s]+$/.test(formData.fullname)) {
			newFormErrors.fullname = "Jméno a příjmení může obsahovat pouze písmena";
		} else if (formData.fullname.trim().split(/\s+/).length < 2) {
			newFormErrors.fullname = "Jméno a příjmení musí být odděleno mezerou";
		}

		if (!formData.email.trim()) {
			newFormErrors.email = "Vyplňte prosím Vaší e-mailovou adresu";
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			newFormErrors.email = "Zadaná e-mailová adresa je neplatná";
		} else if (formData.email.length > 100) {
			newFormErrors.email = "E-mailová adresa je přiliš dlouhá";
		} else if (formData.email.length < 8) {
			newFormErrors.email = "E-mailová adresa je přiliš krátka";
		} else if (blacklistedMails.includes(formData.email.split("@")[1])) {
			newFormErrors.email = "Dočasné e-mailové adresy nejsou povoleny";
		} else if (formData.email === EMAIL_ADDRESS) {
			newFormErrors.email = "Tuhle e-mailovou adresu nemůžete použít";
		}

		const userPhoneNumber = parsePhoneNumberFromString(formData.phone, "CZ");

		if (!formData.phone.trim()) {
			newFormErrors.phone = "Vyplňte prosím Vaše telefonní číslo";
		} else if (!userPhoneNumber || !userPhoneNumber.isValid()) {
			newFormErrors.phone = "Zadejte prosím platné telefonní číslo";
		} else if (userPhoneNumber.country !== "CZ") {
			newFormErrors.phone = "Zadejte prosím české telefonní číslo";
		} else if (userPhoneNumber.nationalNumber.length !== 9) {
			newFormErrors.phone = "Telefonní číslo musí mít 9 číslic";
		}

		if (!formData.message.trim()) {
			newFormErrors.message = "Vyplňte prosím Vaší zprávu";
		} else if (formData.message.length < 10) {
			newFormErrors.message = "Zpráva musí mít minimálně 10 znaků";
		} else if (formData.message.length > 1000) {
			newFormErrors.message = "Zpráva nemůže být delší než 1000 znaků";
		}

		return newFormErrors;
	};

	const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		e.stopPropagation();

		const newFormErrors = validateForm();
		setFormErrors(newFormErrors);

		try {
			if (Object.keys(newFormErrors).length === 0) {
				setIsDataSubmitting(true);

				const res = await fetch("/api/submitContactForm", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(formData),
				});

				setIsDataSubmitting(false);

				if (res?.ok) {
					setFormData(initialFormState);
					setCanDataSubmit(false);
					turnstileRef.current?.reset();

					return toast.success("Děkujeme za Vaši zprávu!", {
						//prettier-ignore
						description: "Odpovíme co nejdříve to půjde, obvykle během několika hodin. Buďte prosím trpěliví.",
						className: OpenSansMedium.className,
						duration: 5_000,
					});
				} else {
					const errData = await res?.json();

					return toast.error(errData?.message, {
						className: OpenSansMedium.className,
						duration: 5_000,
					});
				}
			}
		} catch {
			setIsDataSubmitting(false);
		}
	};

	return (
		<form className="flex w-full flex-col space-y-4" onSubmit={handleFormSubmit}>
			{Object.keys(initialFormState).map((field) => (
				<div key={field} className="relative w-full">
					<label htmlFor={field} className={`${OpenSansMedium.className} block text-[0.9rem] text-[#000000]`}>
						{fieldLabels[field as keyof typeof fieldLabels]} <span className="text-[#fb2c36]">*</span>
					</label>

					<div className="relative">
						{field === "message" ? (
							<textarea
								name={field}
								rows={4}
								className={`${OpenSansRegular.className} block w-full resize-none border-b ${formErrors[field as keyof typeof formErrors] ? "border-[#fb2c36]" : "border-[#e4e4e7]"} bg-transparent p-2 pl-0 text-justify text-sm text-[#18181B] transition-all duration-300 outline-none focus:border-transparent`}
								placeholder={fieldPlaceholders[field as keyof typeof fieldPlaceholders]}
								value={formData[field as keyof typeof formData]}
								onChange={handleFormChange}
								autoComplete="off"
								onFocus={() => setFocusedField(field)}
								onBlur={() => setFocusedField(null)}
							/>
						) : (
							<input
								type="text"
								name={field}
								className={`${OpenSansRegular.className} block w-full border-b ${formErrors[field as keyof typeof formErrors] ? "border-[#fb2c36]" : "border-[#e4e4e7]"} bg-transparent p-2 pl-0 text-start text-sm text-[#18181B] transition-all duration-300 outline-none focus:border-transparent`}
								placeholder={fieldPlaceholders[field as keyof typeof fieldPlaceholders]}
								value={formData[field as keyof typeof formData]}
								onChange={handleFormChange}
								autoComplete="off"
								onFocus={() => setFocusedField(field)}
								onBlur={() => setFocusedField(null)}
							/>
						)}

						<motion.div
							initial={{ scaleX: 0 }}
							animate={{
								scaleX: focusedField === field || formData[field as keyof typeof formData] ? 1 : 0,
							}}
							transition={{ duration: 0.4, ease: "easeInOut" }}
							className={`absolute bottom-0 left-0 h-[1px] w-full origin-left ${formErrors[field as keyof typeof formErrors] ? "bg-[#fb2c36]" : "bg-[#000000]"}`}
						/>
					</div>

					{formErrors[field as keyof typeof formErrors] && (
						<motion.p
							initial={{ opacity: 0, y: -5 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -5 }}
							transition={{ duration: 0.3 }}
							className={`mt-0.5 ${OpenSansRegular.className} text-[0.8rem] text-[#fb2c36]`}
						>
							{formErrors[field as keyof typeof formErrors]}
						</motion.p>
					)}
				</div>
			))}

			<div>
				<Turnstile
					siteKey="0x4AAAAAABDp2j1cSmkuT9qY"
					id="cf-turnstile-captcha"
					ref={turnstileRef}
					options={{
						theme: "light",
						language: "cs",
						size: "normal",
					}}
					onError={() => setCanDataSubmit(false)}
					onExpire={() => turnstileRef.current?.reset()}
					onSuccess={handleCloudFlareChallenge}
				/>
			</div>

			<div className="mt-1 flex flex-col gap-4 lg:flex-row">
				<motion.button
					type="submit"
					className={`${OpenSansBold.className} flex flex-1 cursor-pointer items-center justify-center rounded-lg bg-[#000000] px-4 py-2 text-base text-[#FFFFFF] disabled:cursor-not-allowed`}
					whileTap={{ scale: 0.9 }}
					disabled={isDataSubmitting || !canDataSubmit}
				>
					{isDataSubmitting ? (
						<div className="flex h-7 w-7 animate-spin items-center justify-center rounded-full border-t-2 border-r-2 border-[#ffffff]" />
					) : (
						<span className="flex items-center justify-center">
							Odeslat
							<RiSendPlane2Line size={20} className="ml-2" aria-hidden="true" />
						</span>
					)}
				</motion.button>

				<Link
					href={`tel:${PHONE_NUMBER}`}
					className={`${OpenSansBold.className} flex flex-1 cursor-pointer items-center justify-center rounded-lg border-2 border-[#000000] bg-[#FFFFFF] px-4 py-2 text-base text-[#000000]`}
				>
					<RiPhoneLine size={20} className="mr-2" />
					Zavolejte nám
				</Link>
			</div>
		</form>
	);
};
