export interface Project {
	title?: string;
	category: string;
	images?: string[];
	youtubeId?: string;
	createdAt?: string;
	description?: string;
}

//prettier-ignore
export const projects: Project[] = [
	{
		title: "Voxie",
		description: "Voxie Music je hudební Discord bot, pro kterého jsme navrhli a vyvinuli kompletní webové rozhraní včetně integrace platebního systému Stripe pro správu předplatného. Cílem bylo vytvořit moderní a uživatelsky přívětivý web, který zjednoduší přístup ke službě a podpoří její monetizaci.",
		images: ["/assets/projects/voxie-1.jpg", "/assets/projects/voxie-2.jpg", "/assets/projects/voxie-3.jpg","/assets/projects/voxie-4.jpg", "/assets/projects/voxie-5.jpg"],
		category: "Tvorba Webu",
		createdAt: "2024-06-12"
	},
	{
		title: "Next Icons",
		description: "Next Icons je open-source knihovna moderních SVG ikon navržená speciálně pro projekty v Reactu a Next.js. Ikony jsou postavené na 24x24 gridu, mají čistý a konzistentní styl a snadno se přizpůsobují pomocí barev nebo velikosti. Knihovna je ideální pro vývojáře, kteří chtějí lehké a elegantní ikony.",
		images: ["/assets/projects/nexticons-1.png", "/assets/projects/nexticons-2.png", "/assets/projects/nexticons-3.png", "/assets/projects/nexticons-4.png"],
		category: "Tvorba Webu",
		createdAt: "2025-01-01"
	},
	{
		title: "Socializační procházky",
		description: "Pro projekt Socializační procházky jsme vytvořili přehledný a důvěryhodný web, který informuje o pravidelných lekcích socializace psů zdarma. Hlavní důraz byl kladen na jednoduchost, přehlednost a osobní přístup – s cílem oslovit majitele psů všech věkových kategorií.",
		images: ["/assets/projects/socializace-1.jpeg", "/assets/projects/socializace-2.png", "/assets/projects/socializace-3.png", "/assets/projects/socializace-4.png", "/assets/projects/socializace-5.png", "/assets/projects/socializace-6.jpeg", "/assets/projects/socializace-7.png", "/assets/projects/socializace-8.png"],
		category: "Tvorba Webu",
		createdAt: "2024-11-02"
	},
	{
		title: "Kóduj Weby",
		description: "Platforma zaměřená na výuku webového vývoje pro začátečníky. V rámci projektu jsme navrhli a implementovali moderní přihlašovací a registrační rozhraní s důrazem na jednoduchost, přehlednost a příjemnou uživatelskou zkušenost. Rozhraní je navrženo tak, aby uživatele hladce provedlo celým procesem přístupu ke kurzu.",
		images: ["/assets/projects/kodujweby-1.png", "/assets/projects/kodujweby-2.png", "/assets/projects/kodujweby-3.png"],
		category: "Tvorba Webu",
		createdAt: "2024-11-29"
	},
	{
		title: "Itnetic Technologies",
		description: "Pro společnost Itnetic, která se specializuje na zabezpečení webových stránek, jsme vytvořili kompletní webové řešení včetně administračního panelu. Hlavní důraz byl kladen na maximální jednoduchost a přehlednost, aby i složitější bezpečnostní procesy byly pro uživatele co nejpřístupnější a snadno ovladatelné.",
		images: ["/assets/projects/itnetic-1.jpg", "/assets/projects/itnetic-2.jpg", "/assets/projects/itnetic-3.jpg"],
		category: "Tvorba Webu",
		createdAt: "2023-12-29"
	},
	{
		title: "Simple Games",
		description: "Pro vzdělávací mobilní aplikaci Dětské hry - Slabiky jsme připravili jednoduchý a hravý webový design, který odráží cílovou skupinu - malé děti a jejich rodiče. Cílem bylo vytvořit vizuálně přitažlivé a zároveň důvěryhodné prostředí, které prezentuje výukovou hru zaměřenou na rozvoj jazykových dovedností.",
		images: ["/assets/projects/simplegames-1.png", "/assets/projects/simplegames-2.png"],
		category: "Tvorba Webu",
		createdAt: "2024-12-02"
	},
	{
		title: "Flusbe",
		description: "Cílem projektu bylo oslovit nové zákazníky, a proto jsme zvolili čistý a moderní design, který zaujme hned na první pohled. Výsledkem je profesionální webová prezentace, která posiluje důvěru v značku a podporuje její růst. Struktura webu i obsah byly navrženy tak, aby návštěvníky přirozeně vedly k akci a podpořily konverze.",
		images: ["/assets/projects/flusbe-1.jpg", "/assets/projects/flusbe-2.jpg", "/assets/projects/flusbe-3.jpg"],
		category: "Tvorba Webu",
		createdAt: "2025-01-04"
	},
	{
		title: "Nikola Jahnová",
		description: "Pro certifikovanou specialistku na pojištění, jsme vytvořili moderní a důvěryhodně působící webovou prezentaci. Cílem bylo zvýšit online viditelnost a umožnit potenciálním klientům snadný kontakt i orientaci v nabízených službách. Design je postavený na kombinaci syté tmavé a zlaté barvy, což podtrhuje profesionalitu a zároveň přehlednost a výsledkem je elegantní web.",
		images: ["/assets/projects/nikolaj-1.png", "/assets/projects/nikolaj-2.png", "/assets/projects/nikolaj-3.png","/assets/projects/nikolaj-4.png"],
		category: "Tvorba Webu",
		createdAt: "2025-04-08"
	},
	{
		category: "Video Produkce",
		youtubeId: "lLoYeZfd5Nw",
	},
	{
		category: "Video Produkce",
		youtubeId: "cL9Uqcs5pU0",
	},
	{
		category: "Video Produkce",
		youtubeId: "0wxoS1yeLFA",
	},
	{
		category: "Video Produkce",
		youtubeId: "qMU-cEUNAjI",
	},
	{
		category: "Video Produkce",
		youtubeId: "6rOTvS9COb8",
	},
	{
		category: "Video Produkce",
		youtubeId: "JcU86Ff6qcg",
	},
	{
		category: "Video Produkce",
		youtubeId: "fNUPu4be9iE",
	},
	{
		category: "Video Produkce",
		youtubeId: "J0lh07Lx4Dc",
	},
	{
		category: "Video Produkce",
		youtubeId: "Fny3jUGDmDs",
	},
	{
		category: "Video Produkce",
		youtubeId: "izwLkqkyEGI",
	},
	{
		category: "Video Produkce",
		youtubeId: "lgUbPZKNFJo",
	},
	{
		category: "Video Produkce",
		youtubeId: "txltumvTCfA",
	},
	{
		category: "Video Produkce",
		youtubeId: "61US-u5Xy8k",
	},
	{
		category: "Video Produkce",
		youtubeId: "xLwQALsyZS0",
	},
	{
		category: "Video Produkce",
		youtubeId: "cd6ovYoM7no",
	},
	{
		category: "Video Produkce",
		youtubeId: "h81XdymHoUE",
	},
	{
		category: "Video Produkce",
		youtubeId: "UPQOtbEbNNs",
	},
	{
		category: "Video Produkce",
		youtubeId: "3Q4x-_TrDRE",
	},
	{
		category: "Video Produkce",
		youtubeId: "MRSbzlM7Qkg",
	},
	{
		category: "Video Produkce",
		youtubeId: "ezX00eVK9Ek",
	},
	{
		category: "Video Produkce",
		youtubeId: "3Z6dy0kku44",
	},
	{
		category: "Video Produkce",
		youtubeId: "hfmWWQTCDqA",
	},
	{
		category: "Video Produkce",
		youtubeId: "zGR6Wy_Etwo",
	},
	{
		category: "Video Produkce",
		youtubeId: "0seeLcCIEVk",
	},
	{
		category: "Video Produkce",
		youtubeId: "l6pzCcdvXYE",
	},
	{
		category: "Video Produkce",
		youtubeId: "ZjGEJXrMfGk",
	},
	{
		category: "Video Produkce",
		youtubeId: "83oN_J6-bn8",
	},
	{
		category: "Video Produkce",
		youtubeId: "6mi3El2kJjc",
	}
];
