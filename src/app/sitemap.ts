import { MetadataRoute } from 'next';
import { promises as fs } from 'fs';
import path from 'path';

const BASE_URL = 'https://directortax.com'; // Replace with actual domain

async function getGuideSlugs() {
    const guidesDir = path.join(process.cwd(), 'src/app/guides/(articles)');
    try {
        const entries = await fs.readdir(guidesDir, { withFileTypes: true });
        return entries
            .filter((entry) => entry.isDirectory())
            .map((entry) => entry.name);
    } catch (error) {
        console.warn('Could not read guides directory for sitemap', error);
        return [];
    }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const guideSlugs = await getGuideSlugs();

    const guides = guideSlugs.map((slug) => ({
        url: `${BASE_URL}/guides/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }));

    const staticPages = [
        '',
        '/about',
        '/privacy',
        '/editorial',
        '/disclaimer',
        '/terms',
        '/contact',
        '/glossary',
        '/tax-years/2025-26',
    ].map((route) => ({
        url: `${BASE_URL}${route}`,
        lastModified: new Date(),
        changeFrequency: 'yearly' as const,
        priority: route === '' ? 1.0 : 0.5,
    }));

    return [...staticPages, ...guides];
}
