"use client";

import { OpenSansBold, OpenSansRegular } from "@/lib/fonts";

import { AnimatePresence } from "framer-motion";
import { RiCloseLine } from "react-icons/ri";
import React from "react";

const CookiesConsent = () => {
	const [showCookiesConsent, setShowCookiesConsent] = React.useState(true);

	// TODO : Make backend for cookies

	return (
		<AnimatePresence>
			{showCookiesConsent && (
				<div className="fixed right-0 bottom-4 left-0 z-[80] w-full px-4 lg:left-4 lg:max-w-md lg:px-0">
					<div className="rounded-lg border border-[#d1d5dc] bg-[#ffffff] p-4 shadow-2xl">
						<div className="flex items-center justify-between">
							<div className="flex items-center space-x-2">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="h-7 w-7 text-[#000000]"
								>
									<path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
									<path d="M8.5 8.5v.01" />
									<path d="M16 15.5v.01" />
									<path d="M12 12v.01" />
									<path d="M11 17v.01" />
									<path d="M7 14v.01" />
								</svg>

								<h1 className={`${OpenSansBold.className} text-start text-xl text-[#000000]`}>
									Používáme soubory cookies
								</h1>
							</div>

							<button onClick={() => setShowCookiesConsent(false)} className="cursor-pointer">
								<RiCloseLine className="text-[#000000]" size={24} />
							</button>
						</div>

						<p className={`mt-4 text-justify ${OpenSansRegular.className} text-sm text-[#4a5565]`}>
							Vážíme si vašeho práva na soukromí, a proto jsou všechny typy cookies, kromě technických a
							bezpečnostních, ve výchozím nastavení deaktivovány. Jednotlivé typy cookies můžete povolit
							nebo zakázat v menu Nastavení ve Vašem prohlížeči.
						</p>

						{/* TODO: Add buttons to accept/decline cookies */}
					</div>
				</div>
			)}
		</AnimatePresence>
	);
};

export default CookiesConsent;
