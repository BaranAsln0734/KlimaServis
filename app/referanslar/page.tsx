import type { Metadata } from "next";
import ReferencesClientPage from "@/components/ReferencesClientPage";

export const metadata: Metadata = {
  title: "Kurumsal Referanslarımız | Sakarya Uzman Klima İklimlendirme",
  description: "Sakarya'nın öncü kamu kuruluşları, belediyeleri, üniversiteleri ve sanayi şirketlerinden oluşan geniş kurumsal klima servis ve iklimlendirme referans portföyümüz.",
  alternates: {
    canonical: "/referanslar",
  },
  openGraph: {
    title: "Kurumsal Referanslarımız | Sakarya Uzman Klima İklimlendirme",
    description: "Sakarya'nın öncü kamu kuruluşları, belediyeleri, üniversiteleri ve sanayi şirketlerinden oluşan geniş kurumsal klima servis ve iklimlendirme referans portföyümüz.",
    url: "https://sakaryaklimaservisi.demo/referanslar",
  }
};

export default function Page() {
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
        "name": "Kurumsal Referanslarımız",
        "item": "https://www.akanenerji.com/referanslar"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ReferencesClientPage />
    </>
  );
}
