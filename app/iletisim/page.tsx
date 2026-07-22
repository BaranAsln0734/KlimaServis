import type { Metadata } from "next";
import ContactClientPage from "@/components/ContactClientPage";

export const metadata: Metadata = {
  title: "İletişim & Servis Talebi | Sakarya Uzman Klima",
  description: "Sakarya Uzman Klima 7/24 iletişim bilgileri. Adapazarı, Serdivan, Sapanca ve tüm ilçeler için klima bakım, arıza tamiri ve montaj servis hattı.",
  alternates: {
    canonical: "/iletisim",
  },
  openGraph: {
    title: "İletişim & Servis Talebi | Sakarya Uzman Klima",
    description: "Sakarya Uzman Klima 7/24 teknik servis hattı. Hemen arayın veya randevu formunu doldurun.",
    url: "https://www.sakaryaklimaservisi.demo/iletisim",
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
        "item": "https://www.sakaryaklimaservisi.demo"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "İletişim",
        "item": "https://www.sakaryaklimaservisi.demo/iletisim"
      }
    ]
  };

  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Sakarya Uzman Klima İklimlendirme Servisi",
    "image": "https://www.sakaryaklimaservisi.demo/icon.svg",
    "telephone": "08500000000",
    "email": "info@demo.com",
    "url": "https://www.sakaryaklimaservisi.demo",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Atatürk Bulvarı No: 100",
      "addressLocality": "Adapazarı",
      "addressRegion": "Sakarya",
      "addressCountry": "TR"
    },
    "priceRange": "$$",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />
      <ContactClientPage />
    </>
  );
}
