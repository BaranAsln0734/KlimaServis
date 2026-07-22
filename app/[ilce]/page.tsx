import { notFound, redirect } from "next/navigation";
import DistrictClientPage from "@/components/DistrictClientPage";
import { kvGet, isKvEnabled } from "@/lib/kv";
import staticDistrictsData from "../../data/districts_content.json";

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

// List of all Sakarya districts to un-slugify properly
const REGIONS = [
  "Adapazarı", "Serdivan", "Erenler", "Arifiye", "Hendek",
  "Sapanca", "Karasu", "Kaynarca", "Geyve", "Ferizli",
  "Pamukova", "Söğütlü", "Taraklı", "Kocaali", "Akyazı", "Karapürçek"
];

// Grammar mapping for Turkish locative suffixes (in/at the district)
const SUFFIX_MAP: { [key: string]: { locative: string, suffix: string } } = {
  "Adapazarı": { locative: "Adapazarı'nda", suffix: "nda" },
  "Serdivan": { locative: "Serdivan'da", suffix: "da" },
  "Erenler": { locative: "Erenler'de", suffix: "de" },
  "Arifiye": { locative: "Arifiye'de", suffix: "de" },
  "Hendek": { locative: "Hendek'te", suffix: "te" },
  "Sapanca": { locative: "Sapanca'da", suffix: "da" },
  "Karasu": { locative: "Karasu'da", suffix: "da" },
  "Kaynarca": { locative: "Kaynarca'da", suffix: "da" },
  "Geyve": { locative: "Geyve'de", suffix: "de" },
  "Ferizli": { locative: "Ferizli'de", suffix: "de" },
  "Pamukova": { locative: "Pamukova'da", suffix: "da" },
  "Söğütlü": { locative: "Söğütlü'de", suffix: "de" },
  "Taraklı": { locative: "Taraklı'da", suffix: "da" },
  "Kocaali": { locative: "Kocaali'de", suffix: "de" },
  "Akyazı": { locative: "Akyazı'da", suffix: "da" },
  "Karapürçek": { locative: "Karapürçek'te", suffix: "te" },
};

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
    .replace(/^-+\//, '')
    .replace(/-+$/, '');
};

const cleanSlug = (slug: string) => {
  let decoded = decodeURIComponent(slug);
  decoded = decoded
    .replace(/-[kK]lima-[sS]ervisi$/, "")
    .replace(/-[jJ]eneratör-[sS]ervisi$/, "")
    .replace(/-[jJ]enerator-[sS]ervisi$/, "")
    .replace(/-[jJ]eneratör$/, "")
    .replace(/-[sS]ervisi$/, "")
    .toLowerCase();
  return decoded;
};

const getDisplayName = (slug: string) => {
  return REGIONS.find(r => slugify(r) === slug) || slug.replace(/-/g, ' ');
};

interface PageProps {
  params: Promise<{ ilce: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { ilce } = await params;
  const cleanIlce = cleanSlug(ilce);
  
  const districtName = getDisplayName(cleanIlce);
  const grammarInfo = SUFFIX_MAP[districtName] || { locative: `${districtName}'de`, suffix: "de" };
  const locativeName = grammarInfo.locative;
  
  const districtsData = await getDistrictsData();
  const districtInfo = (districtsData as any)[cleanIlce] || (staticDistrictsData as any)[cleanIlce];

  const capitalizedSlug = districtName
    .replace(/Ğ/g, 'G').replace(/ğ/g, 'g')
    .replace(/Ü/g, 'U').replace(/ü/g, 'u')
    .replace(/Ş/g, 'S').replace(/ş/g, 's')
    .replace(/İ/g, 'I').replace(/ı/g, 'i')
    .replace(/Ö/g, 'O').replace(/ö/g, 'o')
    .replace(/Ç/g, 'C').replace(/ç/g, 'c');
  const canonicalSlug = `${capitalizedSlug}-Klima-Servisi`;

  const title = districtInfo?.mainTitle || `${districtName} Klima Servisi – 7/24 Bakım, Montaj ve Arıza Tamiri`;
  const description = `${districtName} klima servisi. ${locativeName} 7/24 acil klima tamiri, arıza onarımı, periyodik bakım, gaz dolumu ve klima montajı.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/${canonicalSlug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.akanenerji.com/${canonicalSlug}`,
    }
  };
}

export default async function DistrictPage({ params }: PageProps) {
  const { ilce } = await params;
  
  const cleanIlce = cleanSlug(ilce);
  const isValidDistrict = REGIONS.some(r => slugify(r) === cleanIlce);
  if (!isValidDistrict) {
    notFound();
  }

  const districtName = getDisplayName(cleanIlce);

  const capitalizedSlug = districtName
    .replace(/Ğ/g, 'G').replace(/ğ/g, 'g')
    .replace(/Ü/g, 'U').replace(/ü/g, 'u')
    .replace(/Ş/g, 'S').replace(/ş/g, 's')
    .replace(/İ/g, 'I').replace(/ı/g, 'i')
    .replace(/Ö/g, 'O').replace(/ö/g, 'o')
    .replace(/Ç/g, 'C').replace(/ç/g, 'c');
  const canonicalSlug = `${capitalizedSlug}-Klima-Servisi`;

  // Decode check to handle both encoded and decoded matches
  if (decodeURIComponent(ilce) !== canonicalSlug) {
    redirect(`/${canonicalSlug}`);
  }

  const grammarInfo = SUFFIX_MAP[districtName] || { locative: `${districtName}'de`, suffix: "de" };
  const locativeName = grammarInfo.locative;

  const districtsData = await getDistrictsData();
  const districtInfo = (districtsData as any)[cleanIlce] || (staticDistrictsData as any)[cleanIlce];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Anasayfa",
        "item": "https://www.akanenerji.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Servis Bölgeleri",
        "item": "https://www.akanenerji.com/servis-bolgeleri"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": districtName,
        "item": `https://www.akanenerji.com/${canonicalSlug}`
      }
    ]
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Jeneratör Teknik Servis ve Bakım Hizmeti",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Sakarya Uzman Klima Servisi",
      "telephone": "+908503085454",
      "email": "info@sakaryaklimaservisi.demo",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Semerciler Mah. Bosna Cad. No: 45",
        "addressLocality": "Adapazarı",
        "addressRegion": "Sakarya",
        "addressCountry": "TR"
      }
    },
    "areaServed": [
      {
        "@type": "AdministrativeArea",
        "name": districtName
      }
    ],
    "description": `${districtName} ilçesinde her marka klima için 7/24 acil arıza tamiri, periyodik bakım, montaj ve gaz dolumu hizmeti.`
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
      <DistrictClientPage
        slug={cleanIlce}
        districtName={districtName}
        locativeName={locativeName}
        districtInfo={districtInfo}
      />
    </>
  );
}
