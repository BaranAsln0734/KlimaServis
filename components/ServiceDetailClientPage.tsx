"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight,
  CheckCircle2, 
  PhoneCall, 
  Briefcase,
  Activity,
  ShieldCheck,
  Zap,
  Cpu,
  Compass,
  ChevronDown,
  Clock,
  Wrench,
  Sparkles,
  MapPin,
  HelpCircle,
  AlertTriangle,
  Award,
  Calculator,
  Check
} from "lucide-react";

const ICON_MAP = {
  "activity": Activity,
  "shield-check": ShieldCheck,
  "zap": Zap,
  "cpu": Cpu,
  "compass": Compass,
  "briefcase": Briefcase,
  "sparkles": Sparkles,
  "wrench": Wrench,
};

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

interface ServiceDetailClientPageProps {
  slug: string;
  service: ServiceDetail;
  allServices: ServiceDetail[];
}

const SUPPORTED_BRANDS = [
  "Daikin",
  "Mitsubishi Electric",
  "Samsung",
  "LG",
  "Arçelik",
  "Vestel",
  "Bosch",
  "Beko",
  "Toshiba",
  "Siemens",
  "Profilo",
  "Baymak",
  "Vaillant",
  "Demirdöküm",
  "E.C.A"
];

const SAKARYA_DISTRICTS = [
  { name: "Adapazarı", slug: "adapazari" },
  { name: "Serdivan", slug: "serdivan" },
  { name: "Erenler", slug: "erenler" },
  { name: "Arifiye", slug: "arifiye" },
  { name: "Sapanca", slug: "sapanca" },
  { name: "Hendek", slug: "hendek" },
  { name: "Karasu", slug: "karasu" },
  { name: "Akyazı", slug: "akyazi" },
  { name: "Geyve", slug: "geyve" },
  { name: "Pamukova", slug: "pamukova" },
  { name: "Ferizli", slug: "ferizli" },
  { name: "Söğütlü", slug: "sogutlu" },
];

const RICH_DESCRIPTIONS: { [key: string]: string } = {
  "camasir-makinesi-ariza-servisi": "Çamaşır makinesi arızaları genellikle uzun süreli kullanım sonucu yıpranan kazan bilyaları (rulman), yırtılan motor kayışları, aşınan kömür fırçaları veya kireçlenme nedeniyle süzgeci tıkanan tahliye pompalarından kaynaklanır. Makineniz sıkma esnasında aşırı gürültü yapıyorsa, tambur dönmüyorsa veya altında su birikiyorsa elektriksel bağlantıları kesip uzman teknik servisi aramanız gerekir. Sakarya Uzman Klima & Beyaz Eşya Servisi olarak, mobil teknik aracımızla adresinize gelerek dijital arıza teşhis cihazları ile sorunu yerinde tespit ediyoruz. Orijinal sıfır yedek parçalarla yapılan amortisör, kazan, elektronik anakart ve rezistans değişimlerinde 1 yıl resmi işçilik ve parça garantisi sunuyoruz.",
  "bulasik-makinesi-ariza-servisi": "Bulaşık makinelerinde suyun ısınmaması, tablet deterjanın erimemesi veya yıkama sonrası bulaşıkların nemli ve puslu kalması sirkülasyon pompası, NTC sıcaklık sensörü veya rezistans arızasına işaret eder. Alt ve üst fıskiyelerin kireç veya yemek artıklarıyla tıkanması ise su püskürtme basıncını düşürerek hijyensiz yıkamaya sebep olur. Ekibimiz, yerinde müdahale ile fıskiye temizliklerini, vana ve pompa bakımlarını, su jetleri ve anakart tamirlerini gerçekleştirir. Tüm parça değişimleri garantili olup makineniz ilk günkü lekesiz yıkama performansına kavuşturulur.",
  "buzdolabi-ariza-servisi": "Buzdolabı arızaları gıdaların bozulma riski nedeniyle en acil müdahale gerektiren teknik servis işlemlerindendir. Kompresör kilitlenmesi, No-Frost defrost rezistansı ve bi-metal termostat arızaları, fan motoru durması veya R600a / R134a soğutucu gaz kaçakları dolabın alt veya üst bölmesinin soğutmamasına yol açar. Sakarya genelinde 7/24 nöbetçi mobil ekibimiz adrese ulaşarak azot kaçağı testleri, kaynaklı boru tamiri, kompresör değişimi ve hassas terazili gaz dolumunu aynı gün gerçekleştirir.",
  "kombi-ariza-servisi": "Kombinizin kış aylarında petekleri ısıtmaması, sıcak su alırken soğuk su dalgalanması yapması, su basıncının sürekli düşmesi veya ateşleme yapmayıp hata koduna geçmesi iyonizasyon elektrodu, üç yollu vana, devirdaim pompası veya plakalı eşanjör kireçlenmesinden kaynaklanır. Sertifikalı kombi teknisyenlerimiz gaz sızdırmazlık testleri, elektronik kart onarımı, genleşme tankı hava şarjı ve kimyasal ilaçlı petek temizliği ile doğalgaz faturalarınızda tasarruf sağlar.",
  "klima-arizasi-servisi": "Klimanızda meydana gelen arızalar kompresör sıkışması, kondansatör patlaması, fan motoru yanması veya inverter anakart üzerindeki transistör hasarlarından kaynaklanır. Klimanın soğutmaması veya su damlatması filtrasyon ve drenaj tıkanıklığı kadar R32 / R410A gaz eksikliğine de dayanabilir. Mobil teknik servisimiz yerinde arıza tanılama ile kart onarımlarını, gaz kaçak welding işlemlerini ve kompresör yenilemelerini 1 yıl garantiyle gerçekleştirir.",
  "kucuk-ev-aletleri-ariza-servisi": "Elektrikli süpürge, robot süpürge, kahve makinesi, ütü, mikser ve çay makinelerinizdeki motor sargı yanması, HEPA filtre tıkanması, rezistans kireçlenmesi veya batarya ömrünün tükenmesi cihazlarınızı kullanılamaz hale getirir. Arızalı ev aletlerinizi yenisini alma maliyetine girmeden orijinal yedek parça ve test garantisiyle ekonomik şekilde onarıyoruz.",
  "kurutma-makinesi-ariza-servisi": "Kurutma makinenizin çamaşırları ıslak veya nemli bırakması, koku yapması, tambur kayışı koparması veya aşırı ısınması ısı pompası gaz eksikliği, tiftik filtresi ve kondanser kirliliği ile nem sensörü arızalarından oluşur. Uzman teknisyenlerimiz yerinde kayış-kasnak değişimi, kondanser temizliği ve ısı pompası bakımı ile çamaşırlarınızı yıpratmayan kurutma sağlatır.",
  // Backward compatibility alias keys:
  "periyodik-kontrol": "Klima ve kombi periyodik bakımı sistemlerinizin enerji tüketimini %30 oranında düşürür. Hijyenik ilaçlı yıkama ile bakteri ve kötü kokular engellenir.",
  "ariza-servis-7-24": "7/24 acil mobil teknik ekiplerimizle tüm iklimlendirme ve beyaz eşya arızalarına aynı gün yerinde müdahale sağlıyoruz.",
  "klima-montaj": "Mühendislik standartlarına uygun bakır borulama, gaz toplama ve vakumlama yöntemleriyle garantili klima montaj ve deplase hizmeti.",
  "gaz-dolumu": "R32 ve R410A soğutucu gaz sızıntı tespiti, azot testi ve dijital terazili hassas gaz dolumu işlemleri."
};

export default function ServiceDetailClientPage({ 
  slug, 
  service, 
  allServices 
}: ServiceDetailClientPageProps) {
  const IconComponent = ICON_MAP[service.iconName as keyof typeof ICON_MAP] || Briefcase;
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [quickName, setQuickName] = useState("");
  const [quickPhone, setQuickPhone] = useState("");
  const [quickEmail, setQuickEmail] = useState("");
  const [quickMessage, setQuickMessage] = useState("");
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleQuickServiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickName || !quickPhone) return;
    setFormStatus("loading");
    try {
      const response = await fetch("https://formsubmit.co/ajax/info@sakaryaklimaservisi.demo", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          "_subject": `Yeni Servis Talebi - ${service.title}`,
          "Musteri_Adi": quickName,
          "Telefon": quickPhone,
          "Eposta": quickEmail || "Belirtilmedi",
          "Hizmet": service.title,
          "Detay": quickMessage || "Detay belirtilmedi"
        })
      });
      await fetch("/api/admin/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: quickName, phone: quickPhone, email: quickEmail || "Belirtilmedi",
          serviceType: `Hizmet: ${service.title}`,
          district: "Belirtilmedi",
          message: `Hizmet: ${service.title}\nDetay: ${quickMessage || "Yok"}`
        })
      }).catch(() => {});
      if (response.ok) {
        setFormStatus("success");
        setQuickName(""); setQuickPhone(""); setQuickEmail(""); setQuickMessage("");
      } else setFormStatus("error");
    } catch { setFormStatus("error"); }
  };

  const isActive = (s: ServiceDetail) => s.slug === slug;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B]">

      {/* 1. CLEAN STANDARD HERO HEADER (NO DARK GLASSMORPHISM FLOATING BADGES) */}
      <section className="bg-[#0F172A] text-white pt-36 pb-16 md:pt-40 md:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-topo-waves pointer-events-none opacity-20" />
        
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6 text-white/50 text-xs font-semibold">
            <Link href="/" className="hover:text-[#0EA5E9] transition-colors">Anasayfa</Link>
            <span>/</span>
            <Link href="/hizmetler" className="hover:text-[#0EA5E9] transition-colors">Hizmetlerimiz</Link>
            <span>/</span>
            <span className="text-white/80 font-bold">{service.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#0EA5E9] font-bold text-xs">
                <IconComponent className="w-4 h-4" />
                Sakarya Uzman Klima & Beyaz Eşya Servisi
              </div>

              <h1 className="font-black text-white uppercase text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight">
                {service.title}
              </h1>

              <p className="text-gray-300 text-sm md:text-base leading-relaxed font-medium max-w-2xl">
                {service.intro}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a
                  href="tel:08503085454"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md"
                >
                  <PhoneCall className="w-4 h-4" />
                  0850 308 54 54
                </a>
                <a
                  href="https://wa.me/905321234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md"
                >
                  WhatsApp İletişim
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 relative group flex items-center justify-center p-2 sm:p-4">
              {/* Layer 1: Backing Offset Colored Frame (Bottom-Right 3D Layer) */}
              <div className="absolute inset-0 translate-x-4 translate-y-4 sm:translate-x-6 sm:translate-y-6 rounded-[36px] bg-gradient-to-br from-[#0EA5E9] via-sky-500 to-blue-600 opacity-90 shadow-2xl transition-all duration-500 group-hover:translate-x-7 group-hover:translate-y-7 group-hover:rotate-1" />

              {/* Layer 2: Middle Offset Accent Frame (Top-Left Offset Layer) */}
              <div className="absolute inset-0 -translate-x-2 -translate-y-2 rounded-[34px] border-2 border-[#0EA5E9]/40 bg-white/5 backdrop-blur-xs transition-all duration-500 group-hover:-translate-x-3 group-hover:-translate-y-3" />

              {/* Layer 3: Main Front Image Box */}
              <div className="relative h-72 sm:h-96 w-full rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-2 border-white/30 bg-slate-900 transition-transform duration-500 group-hover:scale-[1.01]">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. STATS & GUARANTEE BAR */}
      <div className="bg-white border-b border-gray-200 py-6 shadow-xs">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x divide-gray-100">
            {[
              { val: "Aynı Gün", label: "Yerinde Servis Müdahalesi" },
              { val: "1 Yıl", label: "Orijinal Parça Garantisi" },
              { val: "30 Dk", label: "Ortalama Adrese Ulaşım" },
              { val: "%100", label: "Müşteri Memnuniyeti" },
            ].map((stat, i) => (
              <div key={i} className="px-4">
                <div className="font-black text-[#0EA5E9] text-xl sm:text-2xl leading-none">{stat.val}</div>
                <div className="text-gray-500 text-xs font-bold mt-1 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. MAIN CONTENT & SIDEBAR */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* LEFT CONTENT AREA (8 columns) */}
          <div className="lg:col-span-8 space-y-14">

            {/* Scope of service */}
            <div className="bg-white border border-gray-200/80 rounded-3xl p-8 shadow-xs space-y-8">
              <div className="border-b border-gray-100 pb-4">
                <span className="text-[#0EA5E9] font-black uppercase tracking-widest text-xs block mb-1">PROSES & ÇÖZÜMLER</span>
                <h2 className="font-black text-gray-900 uppercase text-2xl tracking-tight">Hizmet Kapsamımız</h2>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                {service.scope.map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-start p-4 bg-slate-50 rounded-2xl border border-gray-100">
                    <div className="w-9 h-9 rounded-xl bg-[#0EA5E9] text-white font-black text-sm flex items-center justify-center shrink-0 shadow-sm">
                      {idx + 1}
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-black text-gray-900 uppercase text-base tracking-tight">{item.title}</h3>
                      <p className="text-gray-600 text-xs sm:text-sm font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Why Required Box */}
              <div className="p-6 bg-amber-50 border border-amber-200 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-amber-800 font-black text-xs uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  Bu İşlem Neden Hayati Önem Taşır?
                </div>
                <p className="text-amber-900 text-xs sm:text-sm font-semibold leading-relaxed">
                  {service.whyRequired}
                </p>
              </div>
            </div>

            {/* Comprehensive Engineering & Technical Guide */}
            {RICH_DESCRIPTIONS[slug] && (
              <div className="bg-white border border-gray-200/80 rounded-3xl p-8 shadow-xs space-y-4">
                <div className="flex items-center gap-2 text-[#0EA5E9] font-black text-xs uppercase tracking-widest">
                  <Award className="w-4 h-4" />
                  Teknik Rehber & Arıza Tanı Bilgisi
                </div>
                <h3 className="font-black text-gray-900 uppercase text-xl sm:text-2xl tracking-tight">
                  Detaylı Arıza & Tamir Rehberi
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed font-semibold">
                  {RICH_DESCRIPTIONS[slug]}
                </p>
              </div>
            )}

            {/* Quality Checklist & Benefits */}
            <div className="bg-white border border-gray-200/80 rounded-3xl p-8 shadow-xs space-y-6">
              <div>
                <span className="text-[#0EA5E9] font-black uppercase tracking-widest text-xs block mb-1">AVANTAJLARINIZ</span>
                <h2 className="font-black text-gray-900 uppercase text-xl sm:text-2xl tracking-tight">
                  Neden Bizimle Çalışmalısınız?
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-100">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-gray-800 text-xs sm:text-sm font-bold">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Supported Brands */}
            <div className="bg-white border border-gray-200/80 rounded-3xl p-8 shadow-xs space-y-4">
              <span className="text-[#0EA5E9] font-black uppercase tracking-widest text-xs block">MARKA İLE UYUMLULUK</span>
              <h3 className="font-black text-gray-900 uppercase text-xl tracking-tight">Desteklenen Markalar</h3>
              <div className="flex flex-wrap gap-2.5 pt-2">
                {SUPPORTED_BRANDS.map((brand, idx) => (
                  <span key={idx} className="px-4 py-2 bg-gray-100 rounded-xl text-xs font-bold text-gray-700">
                    {brand}
                  </span>
                ))}
              </div>
            </div>

            {/* FAQ Accordion */}
            {service.faqs && service.faqs.length > 0 && (
              <div className="bg-white border border-gray-200/80 rounded-3xl p-8 shadow-xs space-y-6">
                <div>
                  <span className="text-[#0EA5E9] font-black uppercase tracking-widest text-xs block mb-1">MERAK EDİLENLER</span>
                  <h2 className="font-black text-gray-900 uppercase text-2xl tracking-tight">
                    Sıkça Sorulan Sorular
                  </h2>
                </div>

                <div className="space-y-3">
                  {service.faqs.map((faq, index) => {
                    const isOpen = openFaqIndex === index;
                    return (
                      <div key={index} className="border border-gray-100 rounded-2xl overflow-hidden">
                        <button
                          type="button"
                          onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                          className="w-full p-5 flex items-center justify-between text-left gap-4 bg-gray-50/50 hover:bg-gray-100/60 transition-colors cursor-pointer"
                        >
                          <span className="font-bold text-sm text-gray-900">
                            {faq.q}
                          </span>
                          <ChevronDown className={`w-4 h-4 text-[#0EA5E9] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                        </button>
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden bg-white p-5 border-t border-gray-100"
                            >
                              <p className="text-gray-600 text-xs sm:text-sm font-semibold leading-relaxed">
                                {faq.a}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* SAKARYA İLÇE SERVİS LİNKLERİ (INTERNAL LINKING BLOCK) */}
            <div className="bg-white border border-gray-200/80 rounded-3xl p-8 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-[#0EA5E9] font-black text-xs uppercase tracking-widest">
                <MapPin className="w-4 h-4" />
                Sakarya İlçe Hizmet Bölgeleri
              </div>
              <h3 className="font-black text-gray-900 uppercase text-xl tracking-tight">
                {service.title} İlçe Servis Noktalarımız
              </h3>
              <p className="text-gray-500 text-xs font-semibold">
                Sakarya'nın tüm ilçelerinde mobil nöbetçi teknik ekiplerimiz aynı gün adresinize ulaşmaktadır.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 pt-2">
                {SAKARYA_DISTRICTS.map((dist) => (
                  <Link
                    key={dist.slug}
                    href={`/${dist.slug}`}
                    className="p-3 bg-gray-50 hover:bg-[#0EA5E9] hover:text-white rounded-xl text-xs font-bold text-gray-700 transition-all flex items-center justify-between group"
                  >
                    <span>{dist.name} Servisi</span>
                    <ArrowRight className="w-3 h-3 text-gray-400 group-hover:text-white transition-colors" />
                  </Link>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT SIDEBAR (4 columns) */}
          <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-28 h-fit">

            {/* Quick Service Form */}
            <div className="bg-[#0F172A] rounded-3xl p-7 text-white shadow-xl relative overflow-hidden space-y-5">
              <div className="absolute inset-0 bg-topo-waves pointer-events-none opacity-20" />
              <div className="relative z-10 space-y-1">
                <span className="text-[#0EA5E9] text-[10px] font-black uppercase tracking-widest">HIZLI SERVİS KAYDI</span>
                <h3 className="font-black text-lg uppercase tracking-tight text-white">
                  Yerinde Servis İsteyin
                </h3>
              </div>

              {formStatus === "success" ? (
                <div className="py-6 text-center space-y-2 relative z-10">
                  <CheckCircle2 className="w-10 h-10 text-[#0EA5E9] mx-auto" />
                  <p className="text-white text-xs font-bold">Talebiniz başarıyla oluşturuldu. Ekiplerimiz kısa sürede arayacaktır.</p>
                </div>
              ) : (
                <form onSubmit={handleQuickServiceSubmit} className="space-y-3 relative z-10">
                  <input
                    type="text" placeholder="Adınız Soyadınız *" required
                    value={quickName} onChange={e => setQuickName(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 rounded-xl border border-white/15 focus:outline-none focus:border-[#0EA5E9] text-white text-xs font-medium placeholder-gray-400"
                  />
                  <input
                    type="tel" placeholder="Telefon Numaranız *" required
                    value={quickPhone} onChange={e => setQuickPhone(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 rounded-xl border border-white/15 focus:outline-none focus:border-[#0EA5E9] text-white text-xs font-medium placeholder-gray-400"
                  />
                  <input
                    type="email" placeholder="E-posta Adresiniz"
                    value={quickEmail} onChange={e => setQuickEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 rounded-xl border border-white/15 focus:outline-none focus:border-[#0EA5E9] text-white text-xs font-medium placeholder-gray-400"
                  />
                  <textarea
                    placeholder="Arıza veya adres detayınız..." rows={2}
                    value={quickMessage} onChange={e => setQuickMessage(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 rounded-xl border border-white/15 focus:outline-none focus:border-[#0EA5E9] text-white text-xs font-medium placeholder-gray-400 resize-none"
                  />
                  <button
                    type="submit" disabled={formStatus === "loading"}
                    className="w-full py-3.5 bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-black uppercase text-xs tracking-wider rounded-xl transition-all shadow-md cursor-pointer disabled:opacity-50"
                  >
                    {formStatus === "loading" ? "Gönderiliyor..." : "Servis Kaydı Oluştur"}
                  </button>
                </form>
              )}
            </div>

            {/* Sidebar Navigation: All 7 Services */}
            <div className="bg-white border border-gray-200/80 rounded-3xl p-6 shadow-xs space-y-4">
              <h3 className="font-black text-gray-900 uppercase text-sm tracking-tight">
                Tüm Arıza Servislerimiz
              </h3>
              <div className="space-y-1.5">
                {Array.from(new Map(allServices.map((item) => [item.slug, item])).values()).map((item) => (
                  <Link
                    key={item.slug}

                    href={`/hizmetler/${item.slug}`}
                    className={`flex items-center justify-between p-3 rounded-xl text-xs font-bold transition-all ${
                      isActive(item)
                        ? "bg-[#0EA5E9] text-white font-black"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <span className="line-clamp-1">{item.title}</span>
                    {!isActive(item) && <ArrowRight className="w-3.5 h-3.5 shrink-0 text-gray-400" />}
                  </Link>
                ))}
              </div>
            </div>

            {/* Interactive Tools & Customer Reviews Promotion Card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl p-6 text-white space-y-4 border border-white/10 shadow-md">
              <div className="flex items-center gap-2 text-[#0EA5E9] text-xs font-black uppercase">
                <Calculator className="w-4 h-4" />
                BTU Kapasite Hesabı
              </div>
              <h4 className="font-black text-base uppercase">Hangi Kapasite Klima Gerekli?</h4>
              <p className="text-gray-400 text-xs font-medium leading-relaxed">
                Mekanınızın alanına ve güneş alma durumuna en uygun BTU kapasitesini hesaplama aracımızla öğrenin.
              </p>
              <Link
                href="/hesaplama-araclari"
                className="block text-center py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all border border-white/15"
              >
                BTU Analizini Başlat
              </Link>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
