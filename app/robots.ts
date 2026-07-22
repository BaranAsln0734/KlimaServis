import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.akanenerji.com';
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/admin', '/api/', '/tag/', '/tag/*'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
