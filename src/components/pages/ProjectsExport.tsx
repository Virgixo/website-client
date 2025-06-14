"use client";

import { OpenSansExtraBold, OpenSansMedium, OpenSansRegular } from "@/lib/fonts";
import { projects } from "@/utils/projects";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useSearchParams, useRouter } from "next/navigation";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { motion as m } from "framer-motion";
import Image from "next/image";
import React from "react";

const ImageSlider = ({ images, title }: { images: string[]; title: string }) => {
	const [currentIndex, setCurrentIndex] = React.useState(0);

	const nextSlide = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
	};

	const prevSlide = () => {
		setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
	};

	return (
		<div className="group relative h-60 w-full">
			<Image
				src={images[currentIndex]}
				alt={title}
				fill={true}
				priority={true}
				quality={100}
				sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
				draggable={false}
				className="object-cover transition-opacity duration-300"
			/>

			{images.length > 1 && (
				<>
					<button
						onClick={prevSlide}
						className="absolute inset-y-0 left-1 my-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#7f7e7e] text-[#FFFFFF] opacity-100 transition-opacity duration-300 2xl:opacity-0 group-hover:2xl:opacity-100"
					>
						<IoIosArrowBack size={20} />
					</button>

					<button
						onClick={nextSlide}
						className="absolute inset-y-0 right-1 my-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#7f7e7e] text-[#FFFFFF] opacity-100 transition-opacity duration-300 2xl:opacity-0 group-hover:2xl:opacity-100"
					>
						<IoIosArrowForward size={20} />
					</button>

					<div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-2">
						{images.map((_, index) => (
							<button
								key={index}
								onClick={() => setCurrentIndex(index)}
								className={`h-2 w-2 rounded-full transition-all duration-300 ${
									currentIndex === index ? "w-4 bg-[#d1d5dc]" : "bg-[#6a7282]"
								}`}
							/>
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default function ProjectsExport() {
	const categories = ["Vše", "Tvorba Webu", "Video Produkce"];
	const searchParams = useSearchParams();
	const router = useRouter();

	const categoryParam = searchParams.get("kategorie") || "";
	const isValidCategory = categories.includes(categoryParam);
	const [activeCategory, setActiveCategory] = React.useState(isValidCategory ? categoryParam : "Vše");

	const showAllParam = searchParams.get("zobrazitVse");
	const isValidShowAll = showAllParam === "true" || showAllParam === "false";
	const [showAll, setShowAll] = React.useState(isValidShowAll ? showAllParam === "true" : false);

	React.useEffect(() => {
		if (!isValidCategory || !isValidShowAll) {
			const params = new URLSearchParams();

			params.set("kategorie", activeCategory);
			params.set("zobrazitVse", showAll.toString());
			router.replace(`/projekty?${params.toString()}`);
		}
	}, [isValidCategory, isValidShowAll, activeCategory, showAll, router]);

	//prettier-ignore
	const filteredProjects = activeCategory === "Vše" ? [...projects.filter((p) => p.category === "Tvorba Webu"), ...projects.filter((p) => p.category === "Video Produkce")] : projects.filter((project) => project.category === activeCategory);
	const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 6);

	const handleCategoryChange = (category: string) => {
		setActiveCategory(category);
		setShowAll(false);

		const params = new URLSearchParams(searchParams.toString());
		params.set("kategorie", category);
		params.delete("zobrazitVse");

		return router.push(`/projekty?${params.toString()}`);
	};

	const handleShowAllToggle = () => {
		const newShowAll = !showAll;
		setShowAll(newShowAll);

		const params = new URLSearchParams(searchParams.toString());
		params.set("zobrazitVse", newShowAll.toString());

		return router.push(`/projekty?${params.toString()}`);
	};

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.15,
				delayChildren: 0.2,
			},
		},
	};

	const itemVariants = {
		hidden: {
			y: 50,
			opacity: 0,
			scale: 0.95,
		},
		visible: {
			y: 0,
			opacity: 1,
			scale: 1,
			transition: {
				type: "spring" as const,
				damping: 12,
				stiffness: 100,
			},
		},
	};

	return (
		<div className="flex min-h-screen w-full flex-col p-4 2xl:p-0">
			<div className="container mx-auto pt-20 md:pt-28">
				<h1
					className={`mb-2 text-[1.4rem] md:mb-0 ${OpenSansExtraBold.className} text-[#000000] md:text-6xl md:leading-relaxed`}
				>
					Nápady převedené do reality
				</h1>

				<p
					className={`max-w-4xl text-justify text-sm leading-relaxed text-[#4a5565] md:text-lg ${OpenSansMedium.className}`}
				>
					Představte si značku, která zaujme už na první pohled – funkčním designem, silným obsahem a jasně
					definovanou strategií. Pomáháme klientům vytvářet digitální řešení, která nejen dobře vypadají, ale
					hlavně fungují. Prohlédněte si výběr realizovaných projektů a objevte, jak může spolupráce s námi
					posílit vaši značku a přivést nové zákazníky prostřednictvím kvalitního online řešení.
				</p>
			</div>

			<div className="container mx-auto">
				<m.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="mt-14 flex flex-col items-center gap-4 md:flex-row md:justify-between md:gap-0"
				>
					<div className="flex flex-row flex-wrap gap-3">
						{categories.map((category) => (
							<button
								key={category}
								onClick={() => handleCategoryChange(category)}
								className={`rounded-lg px-4 py-2 text-sm ${OpenSansMedium.className} cursor-pointer transition-all duration-300 ${
									activeCategory === category
										? "bg-[#000000] text-[#FFFFFF]"
										: "bg-[#e5e7eb] text-[#4a5565] hover:bg-[#f3f4f6]"
								}`}
							>
								{category}
							</button>
						))}
					</div>

					{filteredProjects.length > 6 && (
						<m.button
							onClick={handleShowAllToggle}
							className={`hidden cursor-pointer items-center gap-1 rounded-lg px-4 py-2 text-sm md:flex ${OpenSansMedium.className} bg-[#000000] text-[#FFFFFF] transition-all duration-300`}
						>
							<span>{showAll ? "Méně z této kategorie" : "Více z této kategorie"}</span>

							<m.div
								animate={{
									x: [0, 4, 0],
								}}
								transition={{
									duration: 1.5,
									repeat: Infinity,
									ease: "easeInOut",
								}}
							>
								<MdKeyboardDoubleArrowRight size={20} />
							</m.div>
						</m.button>
					)}
				</m.div>
			</div>

			<m.div
				variants={containerVariants}
				initial="hidden"
				animate="visible"
				key={activeCategory}
				className="container mx-auto mb-8 pt-6"
			>
				<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
					{displayedProjects.map((project, index) => (
						<m.div
							key={project.youtubeId || project.title || index}
							variants={itemVariants}
							whileHover={{
								y: -4,
								transition: {
									type: "spring" as const,
									damping: 15,
									stiffness: 300,
								},
							}}
							className={
								project.category === "Video Produkce"
									? ""
									: "overflow-hidden rounded-lg border border-[#e5e7eb] bg-[#FFFFFF] shadow-md"
							}
						>
							{project.category === "Video Produkce" && project.youtubeId ? (
								<div className="group relative h-60 w-full">
									<iframe
										width="100%"
										height="100%"
										src={`https://www.youtube.com/embed/${project.youtubeId}`}
										title={project.title}
										allowFullScreen={false}
										className="absolute inset-0"
									/>
								</div>
							) : (
								<>
									<ImageSlider
										images={project?.images || []}
										title={project?.title || "Unknown Title"}
									/>

									<div className="p-4">
										<h3 className={`mb-2 text-2xl ${OpenSansMedium.className} text-[#000000]`}>
											{project?.title}
										</h3>

										<p
											className={`text-justify text-sm ${OpenSansRegular.className} leading-relaxed text-[#4a5565]`}
										>
											{project?.description}
										</p>
									</div>
								</>
							)}
						</m.div>
					))}
				</div>
			</m.div>

			{filteredProjects.length > 6 && (
				<div className="mb-16 flex w-full justify-end md:hidden">
					<m.button
						onClick={handleShowAllToggle}
						className={`inline-flex cursor-pointer items-center gap-1 rounded-lg px-4 py-2 text-sm ${OpenSansMedium.className} bg-[#000000] text-[#FFFFFF] transition-all duration-300`}
					>
						<span>{showAll ? "Méně z této kategorie" : "Více z této kategorie"}</span>

						<m.div
							animate={{
								x: [0, 4, 0],
							}}
							transition={{
								duration: 1.5,
								repeat: Infinity,
								ease: "easeInOut",
							}}
						>
							<MdKeyboardDoubleArrowRight size={20} />
						</m.div>
					</m.button>
				</div>
			)}
		</div>
	);
}
