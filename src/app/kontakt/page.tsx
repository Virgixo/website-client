import ContactExport from "@/components/pages/ContactExport";

import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Proměňíme Váš nápad v realitu – Virgixo.com",
	//prettier-ignore
	description: "Každý skvělý projekt začíná nápadem. Dejte nám vědět, co chcete vytvořit, a společně ho přetvoříme v realitu – moderní, funkční a připravenou uspět.",
};

export default function Contact() {
	return <ContactExport />;
}
