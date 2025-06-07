"use client";

import { OpenSansBold, OpenSansMedium, OpenSansRegular } from "@/lib/fonts";

import { RiCopyrightLine } from "react-icons/ri";
import { motion as m } from "framer-motion";
import Link from "next/link";

interface FooterLink {
	href: string;
	text: string;
}

const FOOTER_LINKS: FooterLink[] = [
	{ href: "/podminky-spoluprace", text: "Podmínky Spolupráce" },
	{ href: "/zasady-pouzivani-cookies", text: "Zásady Používání Cookies" },
	{ href: "/ochrana-osobnich-udaju", text: "Ochrana Osobních Údajů" },
];

const FADE_IN_ANIMATION = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.6 },
};

const FooterExport: React.FC = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="relative overflow-hidden border-t border-[#d1d5dc]" role="contentinfo">
			<div className="mx-auto max-w-screen-2xl px-4 py-6">
				<div className="relative flex flex-col items-start justify-between space-y-10 sm:items-center lg:flex-row lg:items-center lg:space-y-0">
					<m.div {...FADE_IN_ANIMATION} className="relative">
						<div className="flex flex-col items-start gap-3 sm:items-center lg:items-start">
							<Link
								href="/"
								className={`text-3xl text-[#000000] ${OpenSansBold.className}`}
								aria-label="Domů"
							>
								Virgixo.com
							</Link>

							<p className={`${OpenSansRegular.className} flex items-center text-sm text-[#4a5565]`}>
								<RiCopyrightLine className="mr-1.5" aria-hidden="true" />
								<span>{currentYear} Virgixo. All rights reserved.</span>
							</p>
						</div>
					</m.div>

					<m.div
						{...FADE_IN_ANIMATION}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="flex flex-col items-start space-y-4 sm:flex-row sm:space-y-0 sm:space-x-10"
					>
						{FOOTER_LINKS.map((link, index) => (
							<m.div
								key={link.href}
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

								<div
									className="absolute -bottom-1 left-0 h-[2px] w-0 rounded-full bg-[#000000] transition-all duration-300 group-hover:w-full"
									aria-hidden="true"
								/>
							</m.div>
						))}
					</m.div>
				</div>
			</div>
		</footer>
	);
};

export default FooterExport;
