import { notFound } from "next/navigation";
import ServiceDetailClientPage from "@/components/ServiceDetailClientPage";

interface ServiceDetail {
  title: string;
  slug: string;
  iconName: string;
  image: string;
  intro: string;
  whyRequired: string;
  scope: { title: string; desc: string }[];
  benefits: string[];
  faqs: { q: string; a: string }[];
}

const SERVICES_DATA: { [key: string]: ServiceDetail } = {
  "ariza-servis-7-24": {
    title: "Klima Arıza Servisi",
    slug: "ariza-servis-7-24",
    iconName: "activity",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop",
    intro: "Sakarya Uzman Klima olarak, klimanızda oluşan beklenmedik arızalara, 7 gün 24 saat kesintisiz çalışan tam donanımlı mobil acil servis ekiplerimizle anında müdahale ediyoruz. Klimanızın verimli ve güvenli çalışmasını engelleyen kart arızaları, kompresör kilitlenmeleri ve fan motoru problemlerinde yanınızdayız.",
    whyRequired: "Klimada giderilmeyen küçük arızalar, kompresörün aşırı ısınmasına ve kalıcı olarak yanmasına sebep olabilir. Bu durum cihazınızı tamamen kullanılamaz hale getirerek yüksek maliyetli yenileme gerektirebilir.",
    scope: [
      { title: "7/24 Mobil Acil Servis", desc: "Hafta sonu veya geç saat fark etmeksizin acil teknik servis ihtiyaçlarınızda aynı gün yerinde hizmet." },
      { title: "Kapsamlı Arıza Teşhisi", desc: "Elektronik kontrol kartı, sensörler ve mekanik aksamlar gelişmiş cihazlarla taranarak arızanın kaynağı netleştirilir." },
      { title: "Garantili Yedek Parça Değişimi", desc: "Değiştirilen tüm fan motorları, sensörler ve elektronik kartlar 1 yıl resmi işçilik ve yedek parça garantimiz kapsamındadır." }
    ],
    benefits: [
      "Hızlı ve yerinde arıza teşhisi ile zaman kaybını en aza indiriyoruz.",
      "Orijinal yedek parçalar sayesinde klimanızın ömrünü uzatıyoruz.",
      "1 Yıl resmi servis garantisi ile güvence altında olmanızı sağlıyoruz.",
      "Deneyimli teknik ekibimiz sayesinde kesin çözümler sunuyoruz."
    ],
    faqs: [
      { q: "Klima neden su akıtır?", a: "İç ünitenin drenaj borusunun tıkanması, filtrelerin aşırı kirlenmesi sonucu evaporatörün buz tutması veya gaz eksikliği iç üniteden su sızmasına yol açabilir." },
      { q: "Kompresör arızası nasıl anlaşılır?", a: "Klima çalışmasına rağmen sadece hava üflüyor ve soğutma yapmıyorsa, dış üniteden anormal sesler geliyorsa veya sigorta attırıyorsa kompresör arızalanmış olabilir." },
      { q: "Değiştirilen parçalar garantili midir?", a: "Evet, servisimiz bünyesinde yapılan tüm parça değişimleri ve işçilikler 1 yıl süreyle garantilidir." }
    ]
  },
  "periyodik-kontrol": {
    title: "Klima Periyodik Bakımı",
    slug: "periyodik-kontrol",
    iconName: "shield-check",
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=800&auto=format&fit=crop",
    intro: "Klimanızın performansını artıran, enerji tüketimini %30'a varan oranda düşüren ve yaşam alanınızdaki hava kalitesini maksimuma çıkaran koruyucu bakım hizmetleri sunuyoruz. Sağlığınızı ve cihazınızın ömrünü korumak için yılda iki kez klima bakımı yaptırmanız önerilir.",
    whyRequired: "Bakımsız klimaların evaporatör ve filtrelerinde biriken tozlar, bakteriler ve küfler zamanla Lejyoner hastalığı gibi ciddi solunum yolu enfeksiyonlarına yol açabilir. Ayrıca tıkanmış serpantinler kompresörü yorarak elektrik tüketimini ciddi oranda artırır.",
    scope: [
      { title: "İlaçlı Serpantin Temizliği", desc: "İç ünite evaporatörü ve dış ünite kondanseri, klimaya özel antibakteriyel kimyasal ilaçlarla yıkanarak dezenfekte edilir." },
      { title: "Filtre ve Drenaj Temizliği", desc: "Toz filtreleri yıkanır, drenaj tavası ve tahliye hortumu temizlenerek su akıtma riskleri önceden engellenir." },
      { title: "Elektriksel Parametre Testleri", desc: "Kompresör çekilen akım değerleri, fan motoru hız kontrolü ve bağlantı klemenslerinin sıkılığı kontrol edilir." },
      { title: "Gaz Basınç Kontrolü", desc: "Klimanın soğutucu akışkan (gaz) seviyesi ölçülerek performans testi yapılır." }
    ],
    benefits: [
      "Yaşam alanlarınızda temiz, steril ve sağlıklı bir hava sirkülasyonu sağlar.",
      "Elektrik faturalarında %25 ila %35 oranında tasarruf elde edilmesini garantiler.",
      "Klimanızın kompresör ve fan ömrünü maksimum seviyede tutar.",
      "Beklenmedik pahalı arızaların önüne erkenden geçilmesini sağlar."
    ],
    faqs: [
      { q: "Klima bakımı ne sıklıkla yapılmalıdır?", a: "Sağlıklı bir hava kalitesi ve yüksek verim için yaz ve kış sezonu başlangıcı olmak üzere yılda en az iki kez periyodik bakım yaptırılması tavsiye edilir." },
      { q: "Klima temizliğini kendim yapabilir miyim?", a: "Kendi başınıza sadece toz filtrelerini yıkayabilirsiniz. Ancak serpantinlerin kimyasal ilaçla yıkanması ve gaz ölçümleri teknik bilgi ve ekipman gerektirir." },
      { q: "Bakımda kullanılan ilaçlar sağlığa zararlı mıdır?", a: "Hayır. Kullandığımız dezenfektanlar klimalar için özel üretilmiş, biyobozunur ve durulama sonrası havaya karışmayan sertifikalı ürünlerdir." }
    ]
  },
  "klima-montaj": {
    title: "Klima Montaj & Deplase",
    slug: "klima-montaj",
    iconName: "cpu",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=800&auto=format&fit=crop",
    intro: "Split, kaset, salon tipi ve VRF/VRV klima sistemlerinin mühendislik standartlarına uygun montaj, demontaj ve yer değiştirme (deplase) işlemlerini gerçekleştiriyoruz. Doğru konumlandırma ve garantili bakır boru tesisatıyla cihazınızdan maksimum verim almanızı sağlıyoruz.",
    whyRequired: "Hatalı monte edilen klimalar, drenaj eğimsizliği nedeniyle su akıtabilir, vakum yapılmaması durumunda sistem içinde kalan hava nedeniyle kompresör arızasına yol açabilir ve verimsiz çalışarak yüksek elektrik tüketebilir.",
    scope: [
      { title: "Profesyonel Konumlandırma", desc: "İç ünitenin doğrudan insan üzerine üflemeyeceği, dış ünitenin ise hava sirkülasyonu rahat olan en doğru konuma monte edilmesi sağlanır." },
      { title: "Gaz Toplama (Demontaj)", desc: "Söküm işlemi öncesinde cihaz çalıştırılarak gazı dış ünite kompresörüne kayıpsız toplanır ve vanalar kapatılır." },
      { title: "Nizami Bakır Borulama", desc: "Marka standartlarına uygun kalınlıkta bakır boru, drenaj hortumu ve sinyalizasyon kablosu estetik kanallarla çekilir." },
      { title: "Sistem Vakumlama", desc: "Montaj sonrasında bakır boruların içindeki hava ve nem vakum pompasıyla çekilerek kompresörün sağlığı korunur." }
    ],
    benefits: [
      "Vakumlama işlemi sayesinde kompresörün aşınmasını ve arızalanmasını önlüyoruz.",
      "Klimanızın gazını havaya salmadan, kayıpsız bir şekilde taşıyoruz.",
      "Terazili ve sağlam montaj ile gürültü ve titreşim risklerini sıfıra indiriyoruz.",
      "Mekana en uygun konumlandırma ile homojen bir hava dağılımı sağlıyoruz."
    ],
    faqs: [
      { q: "Klima sökülürken içindeki gaz kaybolur mu?", a: "Hayır. Teknisyenlerimiz sökümden önce gaz toplama işlemi yaparak klimanın kendi soğutucu akışkanını dış üniteye hapseder ve vanaları kilitler." },
      { q: "Klima montajında vakumlama neden zorunludur?", a: "Vakumlama, tesisat içindeki nemi ve havayı temizler. Nem temizlenmezse gazla birleşerek asit oluşturur ve kompresör sargılarını yakabilir." },
      { q: "Dış ünite nereye monte edilmelidir?", a: "Dış ünite, güneş ışığını doğrudan uzun süre almayan, hava giriş çıkışının engellenmediği ve servis verilebilmesi kolay olan sağlam zemin veya konsollara asılmalıdır." }
    ]
  },
  "gaz-dolumu": {
    title: "Gaz Dolumu & BTU Keşfi",
    slug: "gaz-dolumu",
    iconName: "zap",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=800&auto=format&fit=crop",
    intro: "Gaz seviyesi düşmüş veya kaçak nedeniyle gazı tamamen boşalmış klimaların hassas sızıntı tespiti, kaçak onarımı ve çevre dostu R32 / R410A gaz şarjı işlemlerini yapıyoruz. Ayrıca odanız için en doğru BTU klima kapasitesini analiz ediyoruz.",
    whyRequired: "Eksik gazla çalışan klimalar, evaporatörde karlanma yapar ve soğutma/ısıtma verimi düşer. Kompresör soğuyamadığı için sürekli aşırı yük altında çalışır ve bir süre sonra yanarak kalıcı hasar görür.",
    scope: [
      { title: "Hassas Gaz Kaçak Tespiti", desc: "Gaz dolumundan önce sistem azot gazı ile basınçlandırılarak köpük ve elektronik kaçak dedektörleriyle sızıntı noktası belirlenir." },
      { title: "Gaz Kaçağı Onarımı", desc: "Tespit edilen bakır boru çatlakları, rekor bağlantıları veya kaynak noktaları profesyonelce onarılır." },
      { title: "Gramajlı R32 / R410A Şarjı", desc: "Üretici kataloğundaki gramaj değerlerine uygun olarak hassas terazilerle klima gaz şarjı yapılır." },
      { title: "BTU Kapasite Keşfi", desc: "Odanın metrekaresi, cephesi, pencere alanları ve kişi sayısı hesaplanarak en uygun BTU kapasitesi belirlenir." }
    ],
    benefits: [
      "Kaçak onarılmadan gaz basılmayarak paranızın boşa gitmesi engellenir.",
      "Doğru gaz seviyesi ile klimanızdan maksimum soğutma performansı alırsınız.",
      "Kompresörün aşırı ısınması engellenerek ömrü korunur.",
      "Doğru BTU seçimi ile elektrik tüketimini dengeleyebilirsiniz."
    ],
    faqs: [
      { q: "Klima gazı kendi kendine biter mi?", a: "Hayır. Klima gazı kapalı devre bir sistemdir. Gazın eksilmesi ancak tesisatta veya rekorlarda bir gaz kaçağı (sızıntı) olması durumunda gerçekleşir." },
      { q: "R32 gazı ile R410A gazı arasındaki fark nedir?", a: "R32 yeni nesil çevre dostu bir gazdır, küresel ısınma potansiyeli R410A'ya göre %68 daha düşüktür ve enerji verimliliği daha yüksektir." },
      { q: "Klima gazının eksildiğini nasıl anlarız?", a: "Klimanın üfleme sıcaklığı yetersiz kalır, iç ünitedeki ince bakır boruda karlanma/buzlanma görülür veya dış ünite boru bağlantılarında yağlanma fark edilir." }
    ]
  }
};

interface PageProps {
  params: Promise<{ hizmet: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { hizmet } = await params;
  const service = SERVICES_DATA[hizmet];
  if (!service) return {};

  const customTitles: { [key: string]: string } = {
    "ariza-servis-7-24": "7/24 Acil Klima Tamiri & Hızlı Teknik Servis - Sakarya Uzman Klima",
    "periyodik-kontrol": "Klima Periyodik Bakımı ve Hijyenik İlaçlama Hizmeti - Sakarya",
    "klima-montaj": "Klima Montajı, Sökümü ve Deplase Hizmetleri - Sakarya",
    "gaz-dolumu": "Klima R32 Gaz Şarjı, Sızıntı Onarımı & BTU Kapasite Keşfi"
  };

  const title = customTitles[hizmet] || `${service.title} | Sakarya Uzman Klima İklimlendirme Servisi`;
  const description = `${service.title} hizmeti. Klimanızın güvenli, verimli ve sağlıklı çalışması için Sakarya Uzman Klima güvencesiyle profesyonel servis desteği.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/hizmetler/${hizmet}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.sakaryaklimaservisi.demo/hizmetler/${hizmet}`,
    }
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { hizmet } = await params;
  const service = SERVICES_DATA[hizmet];

  if (!service) {
    notFound();
  }

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
        "name": "Hizmetlerimiz",
        "item": "https://www.sakaryaklimaservisi.demo/hizmetler"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": service.title,
        "item": `https://www.sakaryaklimaservisi.demo/hizmetler/${hizmet}`
      }
    ]
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `${service.title} Hizmeti`,
    "serviceType": service.title,
    "provider": {
      "@type": "LocalBusiness",
      "name": "Sakarya Uzman Klima İklimlendirme Servisi",
      "telephone": "0850 308 54 54",
      "email": "info@sakaryaklimaservisi.demo",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Semerciler Mah. Bosna Cad. No: 12",
        "addressLocality": "Adapazarı",
        "addressRegion": "Sakarya",
        "addressCountry": "TR"
      }
    },
    "description": service.intro
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": service.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
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
      <ServiceDetailClientPage
        slug={hizmet}
        service={service}
        allServices={Object.values(SERVICES_DATA)}
      />
    </>
  );
}
