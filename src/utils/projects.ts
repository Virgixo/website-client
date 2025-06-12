export interface Project {
	title: string;
	images?: string[];
	category: string;
	description: string;
	youtubeId?: string;
}

export const projects: Project[] = [
	{
		title: "Flusbe",
		//prettier-ignore
		description: "Cílem projektu bylo oslovit nové zákazníky, a proto jsme zvolili čistý a moderní design, který zaujme hned na první pohled. Výsledkem je profesionální webová prezentace, která posiluje důvěru v značku a podporuje její růst. Struktura webu i obsah byly navrženy tak, aby návštěvníky přirozeně vedly k akci a podpořily konverze.",
		images: ["/assets/projects/flusbe-1.jpg", "/assets/projects/flusbe-2.jpg", "/assets/projects/flusbe-3.jpg"],
		category: "Tvorba Webu",
	},
	{
		title: "Itnetic Technologies",
		//prettier-ignore
		description: "Pro společnost Itnetic, která se specializuje na ochranu domén, jsme vytvořili kompletní webové řešení včetně administračního panelu. Hlavní důraz byl kladen na maximální jednoduchost a přehlednost, aby i složitější bezpečnostní procesy byly pro uživatele co nejpřístupnější a snadno ovladatelné.",
		images: ["/assets/projects/itnetic-1.jpg", "/assets/projects/itnetic-2.jpg", "/assets/projects/itnetic-3.jpg"],
		category: "Tvorba Webu",
	},
	{
		title: "Kóduj Weby",
		//prettier-ignore
		description: "gay",
		images: ["/assets/projects/kodujweby-1.png", "/assets/projects/kodujweby-2.png", "/assets/projects/kodujweby-3.png"],
		category: "Tvorba Webu",
	},
	{
		title: "Firemní Video - TechCorp",
		description: "Profesionální firemní video prezentující inovativní technologie a tým společnosti TechCorp.",
		category: "Video Produkce",
		youtubeId: "dQw4w9WgXcQ",
	},
];
