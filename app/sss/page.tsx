import type { Metadata } from "next";
import FAQClientPage from "@/components/FAQClientPage";

export const metadata: Metadata = {
  title: "Sıkça Sorulan Sorular | Sakarya Uzman Klima Servisi",
  description: "Klima bakımı ne sıklıkla yapılmalıdır, soğutmama sebepleri, gaz dolumu, montaj söküm işlemleri ve garanti koşulları hakkında merak edilen sorular.",
  alternates: {
    canonical: "/sss",
  },
  openGraph: {
    title: "Sıkça Sorulan Sorular | Sakarya Uzman Klima Servisi",
    description: "Klima bakımı ne sıklıkla yapılmalıdır, soğutmama sebepleri, gaz dolumu, montaj söküm işlemleri ve garanti koşulları hakkında merak edilen sorular.",
    url: "https://www.sakaryaklimaservisi.demo/sss",
  }
};

const FAQ_DATA = [
  {
    question: "Jeneratör odası kurulumu nasıl olmalıdır?",
    answer: "Jeneratör odasında yeterli taze hava girişi ve sıcak hava egzoz çıkışı (panjurlar yardımıyla) olmalıdır. Ayrıca motor titreşimini absorbe edecek kalınlıkta düzgün bir beton zemin, yangın güvenlik önlemleri ve kolay servis müdahalesi için yeterli çalışma alanı bulunmalıdır."
  },
  {
    question: "Jeneratör hiç elektrik kesilmediğinde ne sıklıkla çalıştırılmalıdır?",
    answer: "Jeneratörlerin acil durumlara her an hazır kalması, akünün şarjını koruması ve motor içi yağlama sisteminin devrede kalması için haftada en az bir kez yüksüz olarak 10-15 dakika çalıştırılması (test çalıştırılması) önerilir."
  },
  {
    question: "Dizel jeneratörlerin yakıt tüketimi ne kadardır?",
    answer: "Jeneratörlerin yakıt tüketimi motor gücüne (kVA) ve çalışma yüküne (%50, %75 veya %100 yük) bağlıdır. Genel bir kural olarak, modern dizel jeneratörler ürettikleri her kW güç için saatte ortalama 0.22 - 0.25 litre motorin tüketir."
  },
  {
    question: "Tesisim için en uygun jeneratör gücünü (kVA) nasıl belirlerim?",
    answer: "Tesisinizdeki aktif elektrikli cihazların toplam güç tüketimi, demeraj (kalkış) akımları olan motorlu yükler ve gelecekteki büyüme payınız hesaplanarak güç tespiti yapılır. Akan Enerji mühendisleri adresinize gelerek ücretsiz keşif ve hassas güç ölçümü yapmaktadır."
  },
  {
    question: "Sıfır jeneratör ile garantili ikinci el jeneratör arasındaki farklar nelerdir?",
    answer: "Sıfır jeneratörler en son teknolojiye ve uzun vadeli üretici garantisine sahiptir. Revizyonlu ve test edilmiş ikinci el jeneratörler ise Akan Enerji teknik servis güvencesiyle sunulmakta olup, ilk yatırım bütçesini yaklaşık %40-50 oranında düşürmek isteyen işletmeler için mükemmel bir alternatiftir."
  },
  {
    question: "Jeneratör aküsü neden arızalanır ve ne sıklıkla değiştirilmelidir?",
    answer: "Jeneratörlerin çalışmama nedenlerinin %80'i zayıflamış veya şarj edilmemiş akülerden kaynaklanır. Jeneratör akülerinin ömrü ortalama 2 ila 3 yıldır. Akünün voltaj değerleri ve elektrolit seviyeleri periyodik servis kontrollerinde düzenli olarak ölçülmelidir."
  },
  {
    question: "Otomatik Voltaj Regülatörü (AVR) arızası cihazlarıma zarar verir mi?",
    answer: "Evet, AVR jeneratörün ürettiği voltajı 230V/400V seviyesinde sabit tutan hayati bir karttır. AVR arızalandığında voltaj çok yükselebilir veya dalgalanabilir. Bu durum jeneratöre bağlı bilgisayarlar, UPS sistemleri, klimalar ve hassas elektronik kartların yanmasına yol açabilir."
  },
  {
    question: "Jeneratörün periyodik bakımı hangi aralıklarla yapılmalıdır?",
    answer: "Standart acil durum (standby) jeneratörlerinde motor yağı, yağ filtresi, yakıt filtresi ve hava filtrelerinin yılda en az bir kez değiştirilmesi gerekir. Sürekli çalışan veya şantiyede kullanılan jeneratörlerde ise her 150 - 200 çalışma saatinde bir periyodik bakım yapılmalıdır."
  },
  {
    question: "Kiralık jeneratör hizmetiniz neleri kapsıyor?",
    answer: "Kiralama hizmetimiz; projenize uygun güçteki kabinli ve sessiz jeneratörün teminini, tesisinize nakliyesini, transfer panosu ve güç kablosu bağlantılarını kapsar. Kiralama süresi boyunca tüm periyodik bakımlar ve doğal aşınma kaynaklı servis işlemleri fiyata dahildir."
  },
  {
    question: "Konser ve açık hava etkinlikleri için sessiz jeneratör kiralayabiliyor muyuz?",
    answer: "Evet, kiralık jeneratör filomuzun tamamı özel ses yalıtım kabinli (süper sessiz) modellerden oluşur. Gürültü hassasiyeti olan konserler, film setleri, hastane yanları ve açık alan etkinlikleri için mükemmel düzeyde sessizlik sağlayan jeneratörler konumlandırıyoruz."
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
