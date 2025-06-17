"use client";

import { OpenSansExtraBold, OpenSansMedium, OpenSansRegular } from "@/lib/fonts";
import { EMAIL_ADDRESS, PHONE_NUMBER } from "@/lib/constants";

import { RiMailSendLine, RiPhoneLine } from "react-icons/ri";
import { HiOutlineLocationMarker } from "react-icons/hi";
import Link from "next/link";

export const ContactInfo = () => {
	return (
		<>
			<h2 className={`mb-4 ${OpenSansExtraBold.className} text-3xl leading-tight sm:text-4xl md:text-[2.7rem]`}>
				<span className="mr-2 text-[#000000]">Proměňíme Váš</span>

				<span className="rounded-lg bg-[#000000] px-2 py-0.5 text-[#FFFFFF]">nápad v realitu</span>
			</h2>

			<p
				className={`mb-6 max-w-2xl text-justify text-sm text-[#4a5565] sm:text-base md:text-lg ${OpenSansRegular.className}`}
			>
				Každý skvělý projekt začíná nápadem. Dejte nám vědět, co chcete vytvořit, a společně ho přetvoříme v
				realitu - moderní, funkční a připravenou uspět.
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

				<Link
					href={`https://cs.wikipedia.org/wiki/Ostrava`}
					target={"_blank"}
					className="flex cursor-pointer items-center space-x-2 transition-transform hover:translate-x-1"
				>
					<HiOutlineLocationMarker className="text-[#000000]" size={24} />
					<span className={`text-base text-[#000000] ${OpenSansMedium.className}`}>702 00, Ostrava</span>
				</Link>
			</div>
		</>
	);
};
