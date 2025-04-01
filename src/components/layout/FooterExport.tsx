"use client";

import { OpenSansBold, OpenSansMedium, OpenSansRegular } from "@/lib/fonts";

import { RiCopyrightLine } from "react-icons/ri";
import { motion as m } from "framer-motion";
import Link from "next/link";

const FooterExport = () => {
	return (
		<footer className="relative overflow-hidden border-t border-[#d1d5dc]">
			<div className="mx-auto max-w-screen-2xl px-4 py-6">
				<div className="relative flex flex-col items-start justify-between space-y-10 sm:items-center lg:flex-row lg:items-center lg:space-y-0">
					<m.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="relative"
					>
						<div className="flex flex-col items-start gap-3 sm:items-center lg:items-start">
							<Link href="/" className={`text-3xl text-[#000000] ${OpenSansBold.className}`}>
								Virgixo.com
							</Link>

							<p className={`${OpenSansRegular.className} flex items-center text-sm text-[#4a5565]`}>
								<RiCopyrightLine className="mr-1.5" />
								<span>{new Date().getFullYear()} Virgixo. All rights reserved.</span>
							</p>
						</div>
					</m.div>

					<m.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="flex flex-col items-start space-y-4 sm:flex-row sm:space-y-0 sm:space-x-10"
					>
						{[
							{ href: "/podminky-spoluprace", text: "Podmínky spolupráce" },
							{ href: "/zasady-pouzivani-cookies", text: "Zásady používání cookies" },
							{ href: "/ochrana-osobnich-udaju", text: "Ochrana osobních údajů" },
						].map((link, index) => (
							<m.div
								key={index}
								initial={{ opacity: 0.8, scale: 1 }}
								whileHover={{ opacity: 1, scale: 1.05, transition: { duration: 0.2 } }}
								className="group relative"
							>
								<Link
									href={link.href}
									className={`relative text-sm ${OpenSansMedium.className} text-[#4a5565] transition-colors duration-200 hover:text-[#000000] lg:text-base`}
								>
									{link.text}
								</Link>

								<div className="absolute -bottom-1 left-0 h-[2px] w-0 rounded-full bg-[#000000] transition-all duration-300 group-hover:w-full" />
							</m.div>
						))}
					</m.div>
				</div>
			</div>
		</footer>
	);
};

export default FooterExport;
