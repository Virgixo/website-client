import ProjectsExport from "@/components/pages/ProjectsExport";

import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Nápady převedené do reality",
	//prettier-ignore
	description: "Představte si značku, která zaujme už na první pohled – funkčním designem, silným obsahem a jasně definovanou strategií. Pomáháme klientům vytvářet digitální řešení, která nejen dobře vypadají, ale hlavně fungují. Prohlédněte si výběr realizovaných projektů a objevte, jak může spolupráce s námi posílit vaši značku a přivést nové zákazníky prostřednictvím kvalitního online řešení.",
};

export default function Projects() {
	return <ProjectsExport />;
}
