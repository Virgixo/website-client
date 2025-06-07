"use client";

import { OpenSansExtraBold, OpenSansMedium, OpenSansRegular } from "@/lib/fonts";
import { EMAIL_ADDRESS, PHONE_NUMBER } from "@/lib/constants";

import { RiMailSendLine, RiPhoneLine } from "react-icons/ri";
import Link from "next/link";

export const ContactInfo = () => {
	return (
		<>
			<h2 className={`mb-4 text-start text-4xl text-[#000000] ${OpenSansExtraBold.className}`}>
				Proměňíme Váš nápad v realitu
			</h2>

			<p className={`mb-6 max-w-xl text-start text-base text-[#4a5565] ${OpenSansRegular.className}`}>
				Každý skvělý projekt začíná nápadem. Dejte nám vědět, co chcete vytvořit, a společně ho přetvoříme v
				realitu – moderní, funkční a připravenou uspět.
			</p>

			<div className="flex flex-col space-y-6 lg:flex-row lg:gap-10 lg:space-y-0">
				<Link
					href={`mailto:${EMAIL_ADDRESS}`}
					className="flex cursor-pointer items-center space-x-2 transition-transform hover:translate-x-1"
				>
					<RiMailSendLine className="text-[#000000]" size={24} />
					<span className={`text-base text-[#000000] ${OpenSansMedium.className}`}>{EMAIL_ADDRESS}</span>
				</Link>

				<Link
					href={`tel:${PHONE_NUMBER}`}
					className="flex cursor-pointer items-center space-x-2 transition-transform hover:translate-x-1"
				>
					<RiPhoneLine className="text-[#000000]" size={24} />
					<span className={`text-base text-[#000000] ${OpenSansMedium.className}`}>{PHONE_NUMBER}</span>
				</Link>
			</div>
		</>
	);
};
