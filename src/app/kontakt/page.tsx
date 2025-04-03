"use client";

import { OpenSansBold, OpenSansMedium, OpenSansRegular } from "@/lib/fonts";

import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile";
import { RiSendPlane2Line } from "react-icons/ri";
import { FiAlertCircle } from "react-icons/fi";
import { motion } from "framer-motion";
import { toast } from "sonner";
import React from "react";

const KontaktPage = () => {
	const initialFormState = { fullname: "", email: "", phone: "", message: "" };

	const fieldLabels: { [key in keyof typeof initialFormState]: string } = {
		fullname: "Jméno a Příjmení",
		email: "Emailová Adresa",
		phone: "Telefonní Číslo",
		message: "Zpráva",
	};

	const fieldPlaceholders: { [key in keyof typeof initialFormState]: string } = {
		fullname: "Alexandr Virgovič",
		email: "contact@deemdev.xyz",
		phone: "+420 730 908 998",
		//prettier-ignore
		message: "Popište detailně Váš požadavek co od nás potřebujete, jestli již máte nějaké podklady tak je připojte. Poskytněte nám co nejvíce informací pro rychlejší komunikaci...",
	};

	//prettier-ignore
	const [formErrors, setFormErrors] = React.useState<{ fullname?: string; email?: string; phone?: string; message?: string;}>({});
	const [focusedField, setFocusedField] = React.useState<string | null>(null);
	const [isDataSubmitting, setIsDataSubmitting] = React.useState(false);
	const [formData, setFormData] = React.useState(initialFormState);
	const [canDataSubmit, setCanDataSubmit] = React.useState(true);
	const turnstileRef = React.useRef<TurnstileInstance>(null);

	const handleCloudFlareChallenge = async (e: string) => {
		const data = await fetch(`/api/submitContactForm?token=${e}`);

		setCanDataSubmit(data?.ok ? true : false);
	};

	function handleFormChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		const newFormErrors = { ...formErrors };
		const eventFieldName = e?.target?.name as keyof typeof formErrors;

		delete newFormErrors[eventFieldName];

		setFormErrors(newFormErrors);
		setFormData((prev) => ({ ...prev, [eventFieldName]: e?.target?.value }));
	}

	async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		e.stopPropagation();

		const newFormErrors: { fullname?: string; email?: string; phone?: string; message?: string } = {};

		// TODO : Add validation for form inputs
		if (!formData.fullname.trim()) {
			newFormErrors.fullname = "Jméno a příjmení je povinné pole";
		}

		setFormErrors(newFormErrors);

		try {
			if (Object.keys(newFormErrors).length == 0) {
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
		} catch (err) {
			setIsDataSubmitting(false);
		}
	}

	// TODO : Finish the page design
	return (
		<div className="flex min-h-screen flex-col items-center justify-center p-4 2xl:p-0">
			<form className="flex w-full max-w-md flex-col space-y-4" onSubmit={handleFormSubmit}>
				{Object.keys(initialFormState).map((field) => (
					<div key={field} className="relative w-full">
						<label
							htmlFor={field}
							className={`${OpenSansMedium.className} block text-[0.9rem] text-[#000000]`}
						>
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
							<div className="absolute top-1/2 right-0 flex -translate-y-1/2 transform items-center">
								<FiAlertCircle className="text-[#fb2c36]" size={20} />
							</div>
						)}

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

				<div className="mt-4">
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

				<motion.button
					type="submit"
					className={`${OpenSansBold.className} flex cursor-pointer items-center justify-center rounded-lg bg-[#000000] px-4 py-2 text-base text-[#FFFFFF] disabled:cursor-not-allowed`}
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
			</form>
		</div>
	);
};

export default KontaktPage;
