import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: "https://www.virgixo.com",
			lastModified: new Date().toISOString(),
			changeFrequency: "yearly",
			priority: 1.0,
		},
		{
			url: "https://www.virgixo.com/kontakt",
			lastModified: new Date().toISOString(),
			changeFrequency: "yearly",
			priority: 1.0,
		},
		{
			url: "https://www.virgixo.com/projekty",
			lastModified: new Date().toISOString(),
			changeFrequency: "monthly",
			priority: 0.7,
		},
		{
			url: "https://www.virgixo.com/cenik",
			lastModified: new Date().toISOString(),
			changeFrequency: "monthly",
			priority: 1.0,
		},
	];
}
