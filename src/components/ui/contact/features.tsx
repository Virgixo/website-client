"use client";

import { OpenSansBold, OpenSansRegular } from "@/lib/fonts";

import { RiTimeLine, RiUser2Line } from "react-icons/ri";
import { MdOutlineWorkOutline } from "react-icons/md";
import { RxLightningBolt } from "react-icons/rx";
import { motion } from "framer-motion";

export const ContactFeatures = () => {
	const features = [
		{
			icon: <RiTimeLine size={20} className="text-[#000000]" />,
			title: "Reakční Doba",
			desc: "Rychlá odpověď do 60 minut",
		},
		{
			icon: <MdOutlineWorkOutline size={20} className="text-[#000000]" />,
			title: "Pracovní Doba",
			desc: "Po-Ne: 9:00-23:00",
		},
		{
			icon: <RxLightningBolt size={20} className="text-[#000000]" />,
			title: "Rychlá Komunikace",
			desc: "Komunikace bez zbytečných průtahů",
		},
		{
			icon: <RiUser2Line size={20} className="text-[#000000]" />,
			title: "Osobní Přístup",
			desc: "Řešení na míru Vašim potřebám",
		},
	];

	return (
		<div className="mt-10 grid w-full cursor-pointer grid-cols-1 gap-4 sm:grid-cols-2 2xl:mt-auto">
			{features.map((item, index) => (
				<motion.div
					key={index}
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
					whileHover={{
						scale: 1.02,
						transition: { type: "spring", stiffness: 400, damping: 10 },
					}}
					className="flex items-center space-x-4 rounded-xl border border-[#e4e4e7] bg-[#FFFFFF] p-4 shadow-md transition-all duration-300 hover:shadow-lg"
				>
					<div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#f9fafb] to-[#f3f4f6]">
						<div className="text-[#2563eb]">{item.icon}</div>
					</div>

					<div className="flex flex-col space-y-1">
						<h3 className={`text-start text-base text-[#000000] ${OpenSansBold.className}`}>
							{item.title}
						</h3>

						<p className={`text-start text-sm text-[#4a5565] ${OpenSansRegular.className}`}>{item.desc}</p>
					</div>
				</motion.div>
			))}
		</div>
	);
};
