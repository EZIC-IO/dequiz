import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://dequiz.app/',
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: 'https://dequiz.app/quiz/1',
      lastModified: new Date(),
      priority: 0.9,
    },
    {
      url: 'https://dequiz.app/minted',
      lastModified: new Date(),
      priority: 0.8,
    },
  ];
}
