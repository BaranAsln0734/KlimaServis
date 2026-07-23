import type { Metadata } from "next";
import FAQClientPage from "@/components/FAQClientPage";

export const metadata: Metadata = {
  title: "Sıkça Sorulan Sorular | Sakarya Uzman Klima & Beyaz Eşya Servisi",
  description: "Klima, Kombi, Çamaşır Makinesi, Bulaşık Makinesi, Buzdolabı, Kurutma Makinesi ve Küçük Ev Aletleri servis süreçlerimiz, garanti koşullarımız ve bakım detayları hakkında merak edilen sorular.",
  alternates: {
    canonical: "/sss",
  },
  openGraph: {
    title: "Sıkça Sorulan Sorular | Sakarya Uzman Klima & Beyaz Eşya Servisi",
    description: "Klima, Kombi, Çamaşır Makinesi, Bulaşık Makinesi, Buzdolabı, Kurutma Makinesi ve Küçük Ev Aletleri servis süreçlerimiz, garanti koşullarımız ve bakım detayları hakkında merak edilen sorular.",
    url: "https://www.sakaryaklimaservisi.demo/sss",
  }
};

const FAQ_DATA = [
  {
    question: "Hangi cihazlar için servis hizmeti veriyorsunuz?",
    answer: "Sakarya genelinde Klima (Split, Kaset, VRF), Kombi (Ateşleme, Kart, Petek), Çamaşır Makinesi, Bulaşık Makinesi, Buzdolabı, Kurutma Makinesi ve Küçük Ev Aletleri (Süpürge, Ütü, Kahve Makinesi) için 7/24 mobil teknik servis sunmaktayız."
  },
  {
    question: "Çamaşır ve bulaşık makinelerinde parça değişimi garantili mi?",
    answer: "Evet, firmamız bünyesinde yapılan tüm çamaşır ve bulaşık makinesi tamirlerinde (amortisör, motor kayışı, sirkülasyon pompası, anakart vb.) orijinal yedek parça kullanılarak 1 yıl süreyle resmi garanti verilir."
  },
  {
    question: "Kombi ve klima bakımı ne sıklıkla yapılmalıdır?",
    answer: "Klima ve kombi sistemlerinin yılda en az bir kez periyodik bakımdan geçmesi önerilir. Düzenli bakım doğalgaz ve elektrik tüketimini %30 oranında düşürür ve cihazınızın ömrünü uzatır."
  },
  {
    question: "Buzdolabı soğutmama arızasına ne kadar sürede müdahale ediyorsunuz?",
    answer: "Gıdalarınızın bozulma riskine karşı buzdolabı arızalarında mobil nöbetçi araçlarımız ortalama 30 dakika ile 1 saat içerisinde Sakarya genelindeki adresinize ulaşır."
  },
  {
    question: "Klima montajında vakumlama yapılması şart mıdır?",
    answer: "Evet, kesinlikle şarttır. Boru hattındaki hava ve nem tahliye edilmeden gaz verildiğinde asit oluşur ve kompresör sargıları yanar. Ekiplerimiz her montajda minimum 20 dakika vakumlama yapmaktadır."
  },
  {
    question: "Servis sonrasında yapılan işlemler garantili mi?",
    answer: "Evet, Sakarya Uzman Klima & Beyaz Eşya Servisi olarak gerçekleştirdiğimiz tüm arıza tespiti, parça değişimi ve tamir işlemleri 1 yıl işçilik ve parça garantimiz altındadır."
  },
  {
    question: "Kurutma makinesi neden çamaşırları nemli bırakır?",
    answer: "Kurutma makinesinin nemli bırakması genellikle tiftik filtresi tıkanıklığı, kondanser kirliliği, ısı pompası gaz eksikliği veya nem sensör arızasından kaynaklanır. Yerinde bakımla sorun çözülür."
  },
  {
    question: "Küçük ev aletleri (Süpürge, Ütü) için adresinizden servis alabilir miyiz?",
    answer: "Elektrikli süpürge motor arızası, robot süpürge bataryası ve ütü rezistans arızalarında adresinizden teslim alıp veya yerinde ekonomik onarım yapmaktayız."
  }
];

export default function Page() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQ_DATA.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FAQClientPage />
    </>
  );
}
