import type { Metadata } from "next";
import AboutClientPage from "@/components/AboutClientPage";

export const metadata: Metadata = {
  title: "Hakkımızda | Sakarya Uzman Klima İklimlendirme Servisi",
  description: "Sakarya Uzman Klima'nın 10 yılı aşkın tecrübesi, misyonu, vizyonu ve kalite politikası. Split, kaset, salon tipi ve VRF/VRV klima servis, montaj ve bakım uzmanlığımız hakkında detaylı bilgiler.",
  alternates: {
    canonical: "/hakkimizda",
  },
  openGraph: {
    title: "Hakkımızda | Sakarya Uzman Klima İklimlendirme Servisi",
    description: "Sakarya Uzman Klima'nın 10 yılı aşkın tecrübesi, misyonu, vizyonu ve kalite politikası. Split, kaset, salon tipi ve VRF/VRV klima servis, montaj ve bakım uzmanlığımız hakkında detaylı bilgiler.",
    url: "https://www.sakaryauzman-klima.com/hakkimizda",
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
        "name": "Hakkımızda",
        "item": "https://www.akanenerji.com/hakkimizda"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AboutClientPage />
    </>
  );
}
