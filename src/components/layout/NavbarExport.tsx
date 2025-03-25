"use client";

import { OpenSansMedium, OpenSansSemiBold } from "@/lib/fonts";

import { motion as m, AnimatePresence } from "framer-motion";
import { RiMailSendLine } from "react-icons/ri";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";

const NavbarExport = () => {
	const [isNavbarMenuOpen, setIsNavbarMenuOpen] = React.useState(false);

	React.useEffect(() => {
		const handleResizeScreen = () => {
			if (window?.innerWidth >= 768) {
				setIsNavbarMenuOpen(false);
			}
		};

		document.body.style.overflow = isNavbarMenuOpen ? "hidden" : "unset";
		window.addEventListener("resize", handleResizeScreen);

		return () => {
			document.body.style.overflow = "unset";
			window.removeEventListener("resize", handleResizeScreen);
		};
	}, [isNavbarMenuOpen]);

	const navbarLinks = [
		{ href: "/informace", label: "O nás" },
		{ href: "/sluzby", label: "Služby" },
		{ href: "/projekty", label: "Projekty" },
	];

	const desktopNavbarLinkClasses = `${OpenSansMedium.className} relative text-base text-[#000000] after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-[#000000] after:transition-all after:duration-300 hover:after:w-full`;

	return (
		<>
			<nav className="fixed top-0 right-0 left-0 z-[60] mx-auto w-full bg-[#ffffff] px-4 py-4">
				<div className="mx-auto flex max-w-screen-2xl items-center justify-between">
					<m.div whileHover={{ scale: 1.05 }}>
						<Link href="/" onClick={() => setIsNavbarMenuOpen(false)}>
							<Image
								src={"/assets/Logo-Without-Background.png"}
								alt="Virgixo"
								width={34}
								height={34}
								priority={true}
								draggable={false}
							/>
						</Link>
					</m.div>

					<div className="flex items-center space-x-10">
						<div className="hidden items-center space-x-10 md:flex">
							{navbarLinks.map(({ href, label }) => (
								<Link key={href} href={href} className={desktopNavbarLinkClasses}>
									{label}
								</Link>
							))}
						</div>

						<m.div whileHover={{ scale: 1.05 }} className="hidden md:flex">
							<Link
								href="/kontakt"
								className="group relative flex h-9 w-32 cursor-pointer items-center rounded-lg bg-[#000000]"
							>
								<span
									className={`ml-4 transform ${OpenSansSemiBold.className} text-[#ffffff] transition-all duration-300 group-hover:translate-x-20 group-hover:opacity-0`}
								>
									Kontakt
								</span>

								<span className="absolute right-0 flex h-full w-10 transform items-center justify-center rounded-lg bg-[#000000] transition-all duration-300 group-hover:w-full group-hover:translate-x-0">
									<RiMailSendLine className="text-[#ffffff]" size={20} />
								</span>
							</Link>
						</m.div>

						<button
							onClick={() => setIsNavbarMenuOpen(!isNavbarMenuOpen)}
							className="relative z-[60] h-10 w-10 md:hidden"
						>
							{["-translate-y-1.5", "", "translate-y-1.5"].map((transform, i) => (
								<span
									key={i}
									className={`absolute top-1/2 left-1/2 block h-0.5 w-7 -translate-x-1/2 transform bg-[#000000] transition duration-300 ease-in-out ${
										isNavbarMenuOpen
											? i === 1
												? "opacity-0"
												: i === 0
													? "rotate-45"
													: "-rotate-45"
											: transform
									}`}
								/>
							))}
						</button>
					</div>
				</div>
			</nav>

			<AnimatePresence>
				{isNavbarMenuOpen && (
					<m.div
						initial={{ x: "100%" }}
						animate={{ x: 0 }}
						exit={{ x: "100%" }}
						transition={{ type: "spring", damping: 40, stiffness: 300 }}
						className="fixed top-0 right-0 bottom-0 z-40 w-full bg-[#ffffff] p-6 pt-28"
					>
						<div className="relative z-10 flex h-full flex-col">
							<div className="flex flex-col space-y-10">
								{navbarLinks.map((item, index) => (
									<m.div
										key={item.href}
										initial={{ x: 50, opacity: 0 }}
										animate={{ x: 0, opacity: 1 }}
										exit={{ x: 50, opacity: 0 }}
										transition={{ delay: 0.1 * index, duration: 0.4 }}
									>
										<Link
											href={item.href}
											onClick={() => setIsNavbarMenuOpen(false)}
											className="group flex items-center"
										>
											<m.span
												initial={{ width: "0%" }}
												animate={{ width: "15%" }}
												transition={{ delay: 0.3 + 0.1 * index, duration: 0.4 }}
												className="mr-6 h-[2px] bg-[#000000] rounded-full"
											/>

											<span
												className={`${OpenSansMedium.className} text-2xl text-[#000000] transition-all duration-300`}
											>
												{item.label}
											</span>
										</Link>
									</m.div>
								))}
							</div>

							<m.div
								initial={{ y: 30, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								exit={{ y: 30, opacity: 0 }}
								transition={{ delay: 0.8, duration: 0.8 }}
								className="mt-auto"
							>
								<Link
									href="/kontakt"
									onClick={() => setIsNavbarMenuOpen(false)}
									className="relative flex h-12 w-full items-center justify-center rounded-lg bg-[#000000]"
								>
									<span
										className={`${OpenSansSemiBold.className} relative z-10 mr-3 text-lg text-[#ffffff]`}
									>
										Kontakt
									</span>

									<RiMailSendLine className="relative z-10 text-white" size={22} />
								</Link>
							</m.div>
						</div>
					</m.div>
				)}
			</AnimatePresence>
		</>
	);
};

export default NavbarExport;
