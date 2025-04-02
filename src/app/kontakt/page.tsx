"use client";

import { OpenSansBold, OpenSansMedium, OpenSansRegular } from "@/lib/fonts";

import { FiAlertCircle } from "react-icons/fi";
import { motion } from "framer-motion";
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
		message:
			"Popište detailně Váš požadavek co od nás potřebujete, jestli již máte nějaké podklady tak je připojte. Poskytněte nám co nejvíce informací pro rychlejší komunikaci...",
	};

	//prettier-ignore
	const [formErrors, setFormErrors] = React.useState<{ fullname?: string; email?: string; phone?: string; message?: string;}>({});
	const [focusedField, setFocusedField] = React.useState<string | null>(null);
	const [isDataSubmitting, setIsDataSubmitting] = React.useState(false);
	const [formData, setFormData] = React.useState(initialFormState);
	const [canDataSubmit, setCanDataSubmit] = React.useState(true);

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

		setFormErrors(newFormErrors);
	}

	return (
		<div className="flex min-h-screen flex-col items-center justify-center p-4 2xl:p-0">
			<form className="flex w-full max-w-md flex-col space-y-4" onSubmit={handleFormSubmit}>
				{Object.keys(initialFormState).map((field) => (
					<div key={field} className="relative w-full">
						<label
							htmlFor={field}
							className={`${OpenSansMedium.className} block text-[0.9rem] text-[#000000]`}
						>
							{fieldLabels[field as keyof typeof fieldLabels]} <span className="text-red-500">*</span>
						</label>

						{field === "message" ? (
							<textarea
								name={field}
								rows={4}
								className={`${OpenSansRegular.className} block w-full resize-none border-b border-[#e4e4e7] bg-transparent p-2 pl-0 text-justify text-sm text-[#18181B] transition-all duration-300 outline-none focus:border-transparent`}
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
								className={`${OpenSansRegular.className} block w-full border-b border-[#e4e4e7] bg-transparent p-2 pl-0 text-start text-sm text-[#18181B] transition-all duration-300 outline-none focus:border-transparent`}
								placeholder={fieldPlaceholders[field as keyof typeof fieldPlaceholders]}
								value={formData[field as keyof typeof formData]}
								onChange={handleFormChange}
								onFocus={() => setFocusedField(field)}
								onBlur={() => setFocusedField(null)}
							/>
						)}

						{formErrors[field as keyof typeof formErrors] && (
							<div className="absolute top-1/2 right-0 flex -translate-y-1/2 transform items-center">
								<FiAlertCircle className="text-red-500" size={24} />
							</div>
						)}

						// TODO : Add input error message under the underline effect

						<motion.div
							initial={{ scaleX: 0 }}
							animate={{
								scaleX: focusedField === field || formData[field as keyof typeof formData] ? 1 : 0,
							}}
							transition={{ duration: 0.4, ease: "easeInOut" }}
							className="absolute bottom-0 left-0 h-[1px] w-full origin-left bg-[#000000]"
						/>
					</div>
				))}

				<button
					type="submit"
					className={`${OpenSansBold.className} mt-4 rounded-lg bg-[#000000] px-4 py-2 text-base text-[#FFFFFF]`}
					disabled={!canDataSubmit || isDataSubmitting}
				>
					Odeslat
				</button>
			</form>
		</div>
	);
};

export default KontaktPage;
