import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SnowEffect from "@/components/SnowEffect";
const FloatingWhatsApp = dynamic(() => import("@/components/FloatingWhatsApp"));
import { Analytics } from "@vercel/analytics/next";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  metadataBase: new URL("https://www.sakaryaklimaservisi.demo"),
  title: {
    default: "Sakarya Klima Servisi | 7/24 Acil Bakım, Montaj & Tamir - Sakarya Uzman Klima",
    template: "%s | Sakarya Uzman Klima İklimlendirme Servisi",
  },
  description: "Sakarya genelinde 7/24 klima servisi! Adapazarı, Serdivan, Sapanca, Hendek ve tüm ilçelerde 30 dakikada acil yerinde müdahale, klima montajı, periyodik bakım, gaz dolumu ve tamir. Hemen arayın!",
  keywords: [
    "Sakarya Klima Servisi", "Adapazarı Klima Servisi", "Serdivan Klima Servisi", "Klima Montajı Sakarya", "Klima Bakımı", 
    "Klima Gaz Dolumu", "Sakarya Klima Tamiri", "7/24 Acil Klima Servisi", "Sapanca Klima Bakımı", "Hendek Klima Servisi", 
    "Karasu Klima Montajı", "Daikin Klima Servisi Sakarya", "Mitsubishi Klima Bakımı", "VRF Sistemleri Sakarya", 
    "Klima BTU Hesabı", "Duvar Tipi Klima Tamiri", "Kaset Tipi Klima Servisi", "Salon Tipi Klima Bakımı"
  ],
  authors: [{ name: "Sakarya Uzman Klima İklimlendirme Servisi" }],
  creator: "Sakarya Uzman Klima İklimlendirme Servisi",
  publisher: "Sakarya Uzman Klima İklimlendirme Servisi",
  openGraph: {
    title: "Sakarya Klima Servisi | 7/24 Acil Bakım, Montaj & Tamir",
    description: "Sakarya genelinde 7/24 uzman klima servisi! Adapazarı, Serdivan, Sapanca ve tüm Sakarya ilçelerine aynı gün hızlı servis.",
    url: "https://www.sakaryaklimaservisi.demo",
    siteName: "Sakarya Uzman Klima",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Sakarya Klima Servisi | 7/24 Acil Bakım & Tamir",
    description: "Sakarya genelinde 7/24 uzman klima servisi! Montaj, periyodik bakım, gaz dolumu ve 30 dakikada acil teknik destek.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Sakarya Uzman Klima Servisi",
    "image": "https://www.sakaryaklimaservisi.demo/og-image.png",
    "telephone": "+908503085454",
    "email": "info@sakaryaklimaservisi.demo",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Semerciler Mah. Bosna Cad. No: 45",
      "addressLocality": "Adapazarı",
      "addressRegion": "Sakarya",
      "addressCountry": "TR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 40.7731,
      "longitude": 30.3948
    },
    "url": "https://www.sakaryaklimaservisi.demo",
    "priceRange": "$$",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "areaServed": [
      { "@type": "AdministrativeArea", "name": "Sakarya" },
      { "@type": "AdministrativeArea", "name": "Adapazarı" },
      { "@type": "AdministrativeArea", "name": "Serdivan" },
      { "@type": "AdministrativeArea", "name": "Erenler" },
      { "@type": "AdministrativeArea", "name": "Hendek" },
      { "@type": "AdministrativeArea", "name": "Sapanca" }
    ]
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Sakarya Uzman Klima Servisi",
    "alternateName": [
      "Sakarya Klima Servisi",
      "Adapazarı Klima Servisi",
      "Sakarya Klima Montaj ve Bakım"
    ],
    "url": "https://www.sakaryaklimaservisi.demo"
  };

  return (
    <html
      lang="tr"
      className={`${plusJakartaSans.variable} h-full antialiased scroll-smooth`}
      data-scroll-behavior="smooth"
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-[family-name:--font-plus-jakarta-sans] bg-white relative" style={{color:'#334155'}}>
        <SnowEffect />
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <FloatingWhatsApp />
        <Analytics />
      </body>
    </html>
  );
}


