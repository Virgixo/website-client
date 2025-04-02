"use client";

import { OpenSansBold, OpenSansMedium, OpenSansRegular, OpenSansSemiBold } from "@/lib/fonts";

import { AnimatePresence, motion as m } from "framer-motion";
import { FiExternalLink } from "react-icons/fi";
import { RiCloseLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React from "react";

const CookiesConsent = () => {
	const [showCookiesConsent, setShowCookiesConsent] = React.useState(false);
	const router = useRouter();

	React.useEffect(() => {
		const cookieConsent = localStorage.getItem("cookieConsent");
		if (!cookieConsent) setShowCookiesConsent(true);
	}, []);

	const handleCookieConsent = (type: "accepted" | "rejected") => {
		setShowCookiesConsent(false);
		localStorage.setItem("cookieConsent", type);

		if (type === "rejected") {
			return router.replace("https://www.google.com");
		}
	};

	return (
		<AnimatePresence>
			{showCookiesConsent && (
				<m.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 50 }}
					transition={{ duration: 0.5 }}
					className="fixed right-0 bottom-4 left-0 z-[80] w-full px-4 lg:left-4 lg:max-w-md lg:px-0"
				>
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
									className="h-5 w-5 text-[#000000] md:h-7 md:w-7"
								>
									<path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
									<path d="M8.5 8.5v.01" />
									<path d="M16 15.5v.01" />
									<path d="M12 12v.01" />
									<path d="M11 17v.01" />
									<path d="M7 14v.01" />
								</svg>

								<h1
									className={`${OpenSansBold.className} text-start text-base text-[#000000] md:text-xl`}
								>
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

						<m.div
							onClick={() => handleCookieConsent("accepted")}
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.9 }}
							className={`mt-4 w-full cursor-pointer rounded-lg bg-[#000000] px-4 py-3 text-center text-sm ${OpenSansSemiBold.className} text-[#ffffff]`}
						>
							Přijmout Cookies
						</m.div>

						<div className="mt-4 flex w-full items-center justify-between">
							<button
								onClick={() => handleCookieConsent("rejected")}
								className={`cursor-pointer text-start text-sm text-[#4a5565] transition-all duration-300 hover:text-[#000000] ${OpenSansMedium.className}`}
							>
								Odmítnout Cookies
							</button>

							<Link
								href="/zasady-pouzivani-cookies"
								className={`flex items-center text-end text-sm text-[#4a5565] transition-all duration-300 hover:text-[#000000] ${OpenSansMedium.className}`}
							>
								Více informací <FiExternalLink className="ml-1.5" />
							</Link>
						</div>
					</div>
				</m.div>
			)}
			ß
		</AnimatePresence>
	);
};

export default CookiesConsent;
