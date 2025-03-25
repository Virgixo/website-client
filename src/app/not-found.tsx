"use client";

import { OpenSansExtraBold, OpenSansRegular, OpenSansSemiBold } from "@/lib/fonts";

import { RiMailSendLine, RiHome3Line } from "react-icons/ri";
import { motion as m } from "framer-motion";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

const NotFound: NextPage = () => {
	return (
		<div className="flex min-h-screen w-full items-center justify-center p-4 2xl:p-0">
			<div className="container flex max-w-7xl flex-col items-center justify-between xl:flex-row">
				<m.div
					initial={{ opacity: 0, x: -50 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5 }}
					className="text-center xl:w-1/2 xl:text-start"
				>
					<m.h1
						className={`text-start text-2xl text-[#000000] sm:text-center sm:text-4xl md:text-5xl xl:text-start ${OpenSansExtraBold.className}`}
					>
						Ups! Tady něco chybí...
					</m.h1>

					<m.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.2, duration: 0.5 }}
						className={`mt-6 max-w-xl text-start text-base text-[#4a5565] sm:text-center sm:text-lg md:text-xl xl:text-start ${OpenSansRegular.className}`}
					>
						Stránka, kterou hledáte, byla přesunuta nebo již neexistuje. Ale nebojte se, máme pro vás mnoho
						jiných možnosti!
					</m.p>

					<m.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.4, duration: 0.5 }}
						className="mt-6 flex flex-col justify-center gap-6 sm:flex-row md:flex-row xl:justify-start"
					>
						<m.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.9 }}>
							<Link
								href={"/"}
								className={`rounded-lg bg-[#000000] px-8 py-2.5 text-center text-base ${OpenSansSemiBold.className} flex items-center justify-center gap-2 text-[#ffffff]`}
							>
								<RiHome3Line size={22} />
								Zpět domů
							</Link>
						</m.div>

						<m.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.9 }}>
							<Link
								href={"/kontakt"}
								className={`rounded-lg border-2 border-[#000000] px-8 py-2 text-center text-base ${OpenSansSemiBold.className} flex items-center justify-center gap-2`}
							>
								<RiMailSendLine size={22} />
								Kontaktujte nás
							</Link>
						</m.div>
					</m.div>
				</m.div>

				<m.div
					initial={{ opacity: 0, x: 50 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5 }}
					className="hidden justify-end xl:flex xl:w-1/2"
				>
					<Image src="/assets/404.svg" alt="404" width={400} height={400} priority={true} draggable={false} />
				</m.div>
			</div>
		</div>
	);
};

export default NotFound;
