"use client";

import { ContactFeatures } from "@/components/ui/contact/features";
import { ContactForm } from "@/components/ui/contact/form";
import { ContactInfo } from "@/components/ui/contact/info";

import { motion } from "framer-motion";
import React from "react";

const ContactExport = () => {
	return (
		<div className="relative flex min-h-screen w-full items-center justify-center p-4 pt-28 pb-24 2xl:p-0">
			<div className="container flex flex-col gap-14 lg:flex-row">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, ease: "easeOut" }}
					className="relative flex w-full flex-col justify-start lg:w-1/2"
				>
					<ContactInfo />
					<ContactFeatures />
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
					className="relative flex w-full items-center justify-center lg:w-1/2"
				>
					<ContactForm />
				</motion.div>
			</div>
		</div>
	);
};

export default ContactExport;
