import NotFoundExport from "@/components/pages/NotFoundExport";

import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Tahle stránka se někam ztratila...",
	//prettier-ignore
	description: "Vypadá to že stránka kterou hledáte, možná neexistuje nebo byla přesunuta. Ale nezoufejte můžete se vždy vrátit domů nebo nám napsat, pokud potřebujete pomoct.",
};

export default function NotFound() {
	return <NotFoundExport />;
}
