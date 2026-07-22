import { notFound, redirect } from "next/navigation";
import NeighborhoodClientPage from "@/components/NeighborhoodClientPage";
import { kvGet, isKvEnabled } from "@/lib/kv";
import staticDistrictsData from "../../../data/districts_content.json";

// Helper to get dynamic district content from KV or fallback to static json file
async function getDistrictsData() {
  if (isKvEnabled()) {
    const cached = await kvGet("file:districts_content.json");
    if (cached) {
      try {
        return typeof cached === "string" ? JSON.parse(cached) : cached;
      } catch (err) {
        console.error("Failed to parse cached districts_content.json:", err);
      }
    }
  }
  return staticDistrictsData;
}

const REGIONS = [
  "Adapazarı", "Serdivan", "Erenler", "Arifiye", "Hendek",
  "Sapanca", "Karasu", "Kaynarca", "Geyve", "Ferizli",
  "Pamukova", "Söğütlü", "Taraklı", "Kocaali", "Akyazı", "Karapürçek"
];

const slugify = (text: string) =>
  text.toString().toLowerCase()
    .replace(/\s+/g,"-").replace(/[ğg]/g,"g").replace(/[üu]/g,"u")
    .replace(/[şs]/g,"s").replace(/[ıi]/g,"i").replace(/[öo]/g,"o")
    .replace(/[çc]/g,"c").replace(/[^\w\-]+/g,"").replace(/\-\-+/g,"-")
    .replace(/^-+/,"").replace(/-+$/,"");

const getDisplayName = (slug: string) =>
  REGIONS.find(r => slugify(r) === slug) || slug.replace(/-/g," ");

const cleanSlug = (slug: string) => {
  let decoded = decodeURIComponent(slug);
  decoded = decoded
    .replace(/-[jJ]eneratör-[sS]ervisi$/, "")
    .replace(/-[jJ]enerator-[sS]ervisi$/, "")
    .replace(/-[kK]lima-[sS]ervisi$/, "")
    .replace(/-[jJ]eneratör$/, "")
    .replace(/-[kK]lima$/, "")
    .replace(/-[sS]ervisi$/, "")
    .toLowerCase();
  return decoded;
};

const getDistrictPath = (n: string) => {
  const capitalizedSlug = n
    .replace(/Ğ/g, 'G').replace(/ğ/g, 'g')
    .replace(/Ü/g, 'U').replace(/ü/g, 'u')
    .replace(/Ş/g, 'S').replace(/ş/g, 's')
    .replace(/İ/g, 'I').replace(/ı/g, 'i')
    .replace(/Ö/g, 'O').replace(/ö/g, 'o')
    .replace(/Ç/g, 'C').replace(/ç/g, 'c');
  return `${capitalizedSlug}-Klima-Servisi`;
};

interface PageProps {
  params: Promise<{ ilce: string; mahalle: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { ilce, mahalle } = await params;
  const cleanIlce = cleanSlug(ilce);
  const districtName = getDisplayName(cleanIlce);

  const districtsData = await getDistrictsData();
  const districtInfo = (districtsData as any)[cleanIlce] || (staticDistrictsData as any)[cleanIlce];

  let neighborhoodsList: string[] = [];
  if (districtInfo) {
    const sec = districtInfo.sections.find((s:any) =>
      s.title.toLowerCase().includes("mahalle") || s.html.toLowerCase().includes("başta olmak üzere") ||
      s.html.toLowerCase().includes("mahallelerinde")
    );
    if (sec) {
      const clean = sec.html.replace(/<[^>]*>/g,"").replace(/\n/g," ");
      const m = clean.match(/(.*?)(?:başta olmak üzere|ilçesinin tüm mahallelerinde|tüm mahallelerinde)/i);
      if (m) {
        neighborhoodsList = m[1].split(/,|\bve\b/).map((n:string)=>n.trim()).filter((n:string)=>n.length>2 && !n.includes("veya") && !n.includes("başta"));
      }
    }
  }

  const cleanMahalleSlug = decodeURIComponent(mahalle || "").toLowerCase()
    .replace(/-klima-servisi$/i,"").replace(/-klimaservisi$/i,"").replace(/-servisi$/i,"");
    
  const nName = neighborhoodsList.find((n:string)=>slugify(n)===cleanMahalleSlug);
  const neighborhoodName = nName || cleanMahalleSlug.split("-").map((w:string)=>w.charAt(0).toUpperCase()+w.slice(1)).join(" ");

  const title = `${districtName} ${neighborhoodName} Klima Servisi | 7/24 Acil Teknik Servis - Sakarya Uzman Klima`;
  const description = `${districtName} ilçesi ${neighborhoodName} mahallesinde 7/24 klima tamiri, periyodik bakım, orijinal yedek parça ve acil mobil servis desteği.`;
  const canonicalSlug = `${getDistrictPath(districtName)}/${slugify(neighborhoodName)}-klima-servisi`;

  return {
    title,
    description,
    alternates: {
      canonical: `/${canonicalSlug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.sakaryaklimaservisi.demo/${canonicalSlug}`,
    }
  };
}

export default async function NeighborhoodPage({ params }: PageProps) {
  const { ilce, mahalle } = await params;
  
  const cleanIlce = cleanSlug(ilce);
  const isValidDistrict = REGIONS.some(r => slugify(r) === cleanIlce);
  if (!isValidDistrict) {
    notFound();
  }

  const districtName = getDisplayName(cleanIlce);
  
  const districtsData = await getDistrictsData();
  const districtInfo = (districtsData as any)[cleanIlce] || (staticDistrictsData as any)[cleanIlce];

  let neighborhoodsList: string[] = [];
  if (districtInfo) {
    const sec = districtInfo.sections.find((s:any) =>
      s.title.toLowerCase().includes("mahalle") || s.html.toLowerCase().includes("başta olmak üzere") ||
      s.html.toLowerCase().includes("mahallelerinde")
    );
    if (sec) {
      const clean = sec.html.replace(/<[^>]*>/g,"").replace(/\n/g," ");
      const m = clean.match(/(.*?)(?:başta olmak üzere|ilçesinin tüm mahallelerinde|tüm mahallelerinde)/i);
      if (m) {
        neighborhoodsList = m[1].split(/,|\bve\b/).map((n:string)=>n.trim()).filter((n:string)=>n.length>2 && !n.includes("veya") && !n.includes("başta"));
      }
    }
  }

  const cleanMahalleSlug = decodeURIComponent(mahalle || "").toLowerCase()
    .replace(/-klima-servisi$/i,"").replace(/-klimaservisi$/i,"").replace(/-servisi$/i,"");
    
  const nName = neighborhoodsList.find((n:string)=>slugify(n)===cleanMahalleSlug);
  const neighborhoodName = nName || cleanMahalleSlug.split("-").map((w:string)=>w.charAt(0).toUpperCase()+w.slice(1)).join(" ");

  const canonicalSlug = `${getDistrictPath(districtName)}/${cleanMahalleSlug}-klima-servisi`;

  if (decodeURIComponent(mahalle) !== `${cleanMahalleSlug}-klima-servisi`) {
    redirect(`/${canonicalSlug}`);
  }

  // --- SCHEMA.ORG JSON-LD STRUCTURED DATA ---

  // 1. Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Anasayfa",
        "item": "https://www.sakaryaklimaservisi.demo"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Servis Bölgeleri",
        "item": "https://www.sakaryaklimaservisi.demo/servis-bolgeleri"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": districtName,
        "item": `https://www.sakaryaklimaservisi.demo/${getDistrictPath(districtName)}`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": neighborhoodName,
        "item": `https://www.sakaryaklimaservisi.demo/${canonicalSlug}`
      }
    ]
  };

  // 2. Service Schema
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Klima Teknik Servis ve Bakım Hizmeti",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Sakarya Uzman Klima İklimlendirme Servisi",
      "telephone": "+908503085454",
      "email": "info@sakaryaklimaservisi.demo",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Semerciler Mah. Bosna Cad. No: 12",
        "addressLocality": "Adapazarı",
        "addressRegion": "Sakarya",
        "addressCountry": "TR"
      }
    },
    "areaServed": [
      {
        "@type": "AdministrativeArea",
        "name": `${districtName} ${neighborhoodName} Mahallesi`
      }
    ],
    "description": `${districtName} ilçesi ${neighborhoodName} mahallesinde her marka klima için 7/24 acil tamir, periyodik bakım ve gaz dolumu hizmeti.`
  };

  // 3. FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `${neighborhoodName} mahallesine ortalama varış süreniz nedir?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Ekiplerimiz ${districtName} ${neighborhoodName} mahallesine Adapazarı merkezimizden mobil servis araçlarıyla ortalama 30–60 dakika içinde ulaşmaktadır. Acil durumlarda öncelikli yönlendirme yapılır.`
        }
      },
      {
        "@type": "Question",
        "name": "Klima arızalarında parça garantisi veriyor musunuz?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Evet. Servis kapsamında onarılan veya değiştirilen tüm orijinal yedek parçalar Sakarya Uzman Klima 1 yıl işçilik ve parça garantisi altındadır. İşlem sonrası yazılı teknik servis formu düzenlenir."
        }
      },
      {
        "@type": "Question",
        "name": "Klima bakımı ne sıklıkla yapılmalıdır?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Solunum yolu sağlığınızı korumak ve enerji tüketimini optimize etmek için klimaların yılda en az iki kez (yaz ve kış sezonu başlangıçlarında) profesyonel antibakteriyel ilaçlarla periyodik bakımının yapılması önerilmektedir."
        }
      },
      {
        "@type": "Question",
        "name": "Hangi marka klimalara servis veriyorsunuz?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Daikin, Mitsubishi Electric, Samsung, LG, Arçelik, Vestel, Bosch, Beko, Toshiba ve diğer tüm split, salon ve kaset tipi klima markalarına uzman teknik kadromuzla yetkin olarak servis veriyoruz."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <NeighborhoodClientPage />
    </>
  );
}
