import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: "https://www.virgixo.com",
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 1,
		},
		{
			url: "https://www.virgixo.com/kontakt",
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 1,
		},
	];
}
