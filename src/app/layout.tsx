//prettier-ignore
import { OpenSansLight, OpenSansRegular, OpenSansMedium, OpenSansSemiBold, OpenSansBold, OpenSansExtraBold } from "@/lib/fonts";
import CookiesConsent from "@/components/layout/CookiesConsent";
import NavbarExport from "@/components/layout/NavbarExport";
import FooterExport from "@/components/layout/FooterExport";
import TopLoader from "@/components/ui/TopLoader";
import { DOMAIN_BASE_URL } from "@/lib/constants";
import "../../public/styles/globals.css";

import type { Metadata, Viewport } from "next";
import { Toaster } from "sonner";

export const metadata: Metadata = {
	metadataBase: new URL(DOMAIN_BASE_URL),
	title: "Transformujeme vaše vize do reality – Virgixo.com",
	//prettier-ignore
	description: "Specializujeme se na tvorbu moderních, uživatelsky přívětivých a kvalitních webů, které pomáhají firmám a jednotlivcům dosáhnout jejich cílů. Objevte, jak můžeme přetvořit vaše nápady do reality a posunout váš online projekt na vyšší úroveň!",
	applicationName: "Virgixo™",
	keywords: [
		"vývoj webových stránek",
		"tvorba webových stránek",
		"web design",
		"vývoj webových aplikací",
		"profesionální web design",
		"mobilní webové stránky",
		"responsivní design",
		"ecommerce web",
		"SEO optimalizace",
		"ux/ui design",
		"moderní webové stránky",
		"tvorba webu na míru",
		"webové stránky pro firmy",
		"úpravy webových stránek",
		"web design pro firmy",
		"tvorba e-shopů",
		"přizpůsobení webu",
		"správa webových stránek",
		"vytvoření webových stránek",
		"vytvoření webu",
		"digitální řešení",
		"optimalizace webu",
		"webová stránka na míru",
		"webové stránky pro malé firmy",
		"web pro startupy",
	],
	generator: "Next.js",
	twitter: {
		card: "summary",
		title: "Transformujeme vaše vize do reality – Virgixo.com",
		//prettier-ignore
		description: "Specializujeme se na tvorbu moderních, uživatelsky přívětivých a kvalitních webů, které pomáhají firmám a jednotlivcům dosáhnout jejich cílů. Objevte, jak můžeme přetvořit vaše nápady do reality a posunout váš online projekt na vyšší úroveň!",
		images: `${DOMAIN_BASE_URL}/assets/Logo-With-Background.png`,
	},
	appleWebApp: {
		title: "Transformujeme vaše vize do reality – Virgixo.com",
		statusBarStyle: "black-translucent",
	},
	openGraph: {
		title: "Transformujeme vaše vize do reality – Virgixo.com",
		//prettier-ignore
		description: "Specializujeme se na tvorbu moderních, uživatelsky přívětivých a kvalitních webů, které pomáhají firmám a jednotlivcům dosáhnout jejich cílů. Objevte, jak můžeme přetvořit vaše nápady do reality a posunout váš online projekt na vyšší úroveň!",
		type: "website",
		locale: "cs_CZ",
		images: [
			{
				url: `${DOMAIN_BASE_URL}/assets/Logo-With-Background.png`,
				width: 512,
				height: 512,
				alt: "Virgixo",
				type: "image/png",
			},
		],
	},
	category: "Website Development",
	icons: [
		{
			rel: "icon",
			type: "image/png",
			sizes: "192x192",
			url: "/assets/favicons/android-icon-192x192.png",
		},
		{
			rel: "apple-touch-icon",
			type: "images/png",
			sizes: "57x57",
			url: "/assets/favicons/apple-icon-57x57.png",
		},
		{
			rel: "apple-touch-icon",
			type: "images/png",
			sizes: "60x60",
			url: "/assets/favicons/apple-icon-60x60.png",
		},
		{
			rel: "apple-touch-icon",
			type: "images/png",
			sizes: "72x72",
			url: "/assets/favicons/apple-icon-72x72.png",
		},
		{
			rel: "apple-touch-icon",
			type: "images/png",
			sizes: "76x76",
			url: "/assets/favicons/apple-icon-76x76.png",
		},
		{
			rel: "apple-touch-icon",
			type: "images/png",
			sizes: "114x114",
			url: "/assets/favicons/apple-icon-114x114.png",
		},
		{
			rel: "apple-touch-icon",
			type: "images/png",
			sizes: "120x120",
			url: "/assets/favicons/apple-icon-120x120.png",
		},
		{
			rel: "apple-touch-icon",
			type: "images/png",
			sizes: "144x144",
			url: "/assets/favicons/apple-icon-144x144.png",
		},
		{
			rel: "apple-touch-icon",
			type: "images/png",
			sizes: "152x152",
			url: "/assets/favicons/apple-icon-152x152.png",
		},
		{
			rel: "apple-touch-icon",
			type: "images/png",
			sizes: "180x180",
			url: "/assets/favicons/apple-icon-180x180.png",
		},
		{
			rel: "icon",
			type: "image/png",
			sizes: "96x96",
			url: "/assets/favicons/favicon-96x96.png",
		},
		{
			rel: "icon",
			type: "image/png",
			sizes: "32x32",
			url: "/assets/favicons/favicon-32x32.png",
		},
		{
			rel: "icon",
			type: "image/png",
			sizes: "16x16",
			url: "/assets/favicons/favicon-16x16.png",
		},
		{
			rel: "shortcut icon",
			type: "images/x-icon",
			url: "/assets/favicons/favicon.ico",
		},
	],
};

export const viewport: Viewport = {
	initialScale: 1,
	minimumScale: 1,
	width: "device-width",
	themeColor: "#ffffff",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="cs_CZ" suppressHydrationWarning={true}>
			{/* prettier-ignore */}
			<body className={`${OpenSansLight.className} ${OpenSansRegular.className} ${OpenSansMedium.className} ${OpenSansSemiBold.className} ${OpenSansBold.className} ${OpenSansExtraBold.className} antialiased`}>
				<TopLoader />
				<Toaster richColors={true} closeButton={true} visibleToasts={4} theme="light" />

				<NavbarExport />
				<CookiesConsent />
				<main>{children}</main>
				<FooterExport />
			</body>
		</html>
	);
}
