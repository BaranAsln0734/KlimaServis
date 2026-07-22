import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';
import { kvGet, isKvEnabled } from '@/lib/kv';

export const dynamic = 'force-dynamic';

// List of all districts to slugify
const REGIONS = [
  "Arnavutköy", "Avcılar", "Bağcılar", "Bahçelievler", "Bakırköy", "Başakşehir", "Bayrampaşa", "Beşiktaş", "Beylikdüzü", "Beyoğlu", "Büyükçekmece", "Çatalca", "Esenler", "Esenyurt", "Eyüpsultan", "Fatih", "Gaziosmanpaşa", "Güngören", "Kağıthane", "Küçükçekmece", "Sarıyer", "Silivri", "Sultangazi", "Şişli", "Zeytinburnu",
  "Adalar", "Ataşehir", "Beykoz", "Çekmeköy", "Kadıköy", "Kartal", "Maltepe", "Pendik", "Sancaktepe", "Sultanbeyli", "Şile", "Tuzla", "Ümraniye", "Üsküdar",
  "Çerkezköy", "Çorlu", "Ergene", "Hayrabolu", "Kapaklı", "Malkara", "Marmaraereğlisi", "Muratlı", "Saray", "Süleymanpaşa", "Şarköy"
];

const slugify = (text: string) => {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[ğg]/g, 'g')
    .replace(/[üu]/g, 'u')
    .replace(/[şs]/g, 's')
    .replace(/[ıi]/g, 'i')
    .replace(/[öo]/g, 'o')
    .replace(/[çc]/g, 'c')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

const getDistrictPath = (regionName: string) => {
  const capitalizedSlug = regionName
    .replace(/Ğ/g, 'G').replace(/ğ/g, 'g')
    .replace(/Ü/g, 'U').replace(/ü/g, 'u')
    .replace(/Ş/g, 'S').replace(/ş/g, 's')
    .replace(/İ/g, 'I').replace(/ı/g, 'i')
    .replace(/Ö/g, 'O').replace(/ö/g, 'o')
    .replace(/Ç/g, 'C').replace(/ç/g, 'c');
  return `${capitalizedSlug}-Jenerator-Servisi`;
};

const SERVICES = [
  "jenerator-satis",
  "sifir-jenerator-satis",
  "jenerator-servis",
  "ariza-servis-7-24",
  "periyodik-kontrol",
  "genel-bakim",
  "jenerator-kiralama",
  "jenerator-yedek-parca"
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.akanenerji.com';
  
  // Static Routes
  const staticRoutes = [
    '',
    '/hakkimizda',
    '/hizmetler',
    '/urunler',
    '/referanslar',
    '/projeler',
    '/iletisim',
    '/blog',
    '/hesaplama-araclari',
    '/guc-ihtiyac-analizi',
    '/gizlilik-politikasi',
    '/kullanim-kosullari',
    '/kvkk',
    '/musteri-yorumlari',
    '/sss',
  ];

  const sitemapItems: MetadataRoute.Sitemap = [];

  // Add static routes
  staticRoutes.forEach(route => {
    sitemapItems.push({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: route === '' ? 'daily' : 'weekly',
      priority: route === '' ? 1.0 : 0.8,
    });
  });

  // Add services
  SERVICES.forEach(service => {
    sitemapItems.push({
      url: `${baseUrl}/hizmetler/${service}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    });
  });

  // Add legacy districts
  REGIONS.forEach(region => {
    sitemapItems.push({
      url: `${baseUrl}/${getDistrictPath(region)}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  });

  // Add dynamic districts and neighborhoods under /servis-bolgeleri
  const districtsFilePath = path.join(process.cwd(), 'data', 'districts_content.json');
  try {
    if (fs.existsSync(districtsFilePath)) {
      const fileData = fs.readFileSync(districtsFilePath, 'utf8');
      const districtsData = JSON.parse(fileData);
      
      Object.keys(districtsData).forEach(ilceSlug => {
        // Parse neighborhoods
        const districtInfo = districtsData[ilceSlug];
        const section = districtInfo.sections.find((s: any) => 
          s.title.toLowerCase().includes("mahalle") ||
          s.title.toLowerCase().includes("servis noktaları") ||
          s.title.toLowerCase().includes("bölgeler") ||
          s.title.toLowerCase().includes("çevresinde") ||
          s.html.toLowerCase().includes("mahallelerinde") ||
          s.html.toLowerCase().includes("başta olmak üzere")
        );
        if (section) {
          const cleanText = section.html.replace(/<[^>]*>/g, "").replace(/\n/g, " ");
          const match = cleanText.match(/(.*?)(?:başta olmak üzere|ilçesinin tüm mahallelerinde|tüm mahallelerinde)/i);
          if (match) {
            const listString = match[1];
            const rawNames = listString.split(/,|\bve\b/);
            const neighborhoods = rawNames
              .map((name: string) => name.trim())
              .filter((name: string) => name.length > 0 && !name.includes("veya") && !name.includes("başta") && name.length > 2);
            
            neighborhoods.forEach((mahalle: string) => {
              sitemapItems.push({
                url: `${baseUrl}/${ilceSlug}/${slugify(mahalle)}-jenerator-servisi`,
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: 0.5,
              });
            });
          }
        }
      });
    }
  } catch (e) {
    console.error("Failed to generate neighborhood routes in sitemap", e);
  }

  // Add dynamic blog posts from data/posts.json / Vercel KV if exists
  let dynamicBlogSlugs: string[] = [];
  try {
    let posts: any[] = [];
    if (isKvEnabled()) {
      const cached = await kvGet('posts');
      if (cached && Array.isArray(cached)) {
        posts = cached;
      }
    }
    
    if (posts.length === 0) {
      const postsFilePath = path.join(process.cwd(), 'data', 'posts.json');
      if (fs.existsSync(postsFilePath)) {
        const fileData = fs.readFileSync(postsFilePath, 'utf8');
        posts = JSON.parse(fileData);
      }
    }

    if (Array.isArray(posts)) {
      const nowStr = new Date().toISOString().split('T')[0];
      const activePosts = posts.filter((p: any) => !p.date || p.date <= nowStr);
      dynamicBlogSlugs = activePosts.map((p: { slug: string }) => p.slug);
    }
  } catch (e) {
    console.error("Failed to read posts for sitemap", e);
  }

  // Combine static and dynamic blog posts
  const staticBlogPosts = [
    'jenerator-yakit-sistemi-arizalari',
    'jenerator-arizalari-nelerdir',
    'ev-icin-jenerator-kac-kva-olmali',
    'jenerator-yag-bakimi-nasil-yapilir',
    'kac-kva-jenerator-gerekir-dogru-jenerator-gucu-nasil-hesaplanir'
  ];

  const allBlogPosts = Array.from(new Set([...staticBlogPosts, ...dynamicBlogSlugs]));

  allBlogPosts.forEach(slug => {
    sitemapItems.push({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  });

  return sitemapItems;
}
