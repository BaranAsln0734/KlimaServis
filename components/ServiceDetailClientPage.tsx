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
  Sparkles
} from "lucide-react";

const ICON_MAP = {
  "activity": Activity,
  "shield-check": ShieldCheck,
  "zap": Zap,
  "cpu": Cpu,
  "compass": Compass,
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
  "Toshiba"
];

const RICH_DESCRIPTIONS: { [key: string]: string } = {
  "periyodik-kontrol": "Klima periyodik bakımı, yalnızca basit bir toz filtre temizliğinden ibaret değildir. Sisteminizin iç ve dış ünitelerinde zamanla biriken mikropartiküller, polenler, bakteriler ve küf mantarları, soluduğunuz havaya karışarak sağlığınızı doğrudan tehdit eder. Özellikle klima sistemlerinde üreyebilen Legionella pneumophila bakterisi, ölümcül akciğer enfeksiyonlarına (Lejyoner Hastalığı) neden olabilir. Sakarya Uzman Klima olarak, özel antibakteriyel kimyasal solüsyonlar ve yüksek basınçlı yıkama makineleri ile evaporatör peteklerini derinlemesine temizliyoruz. Bu temizlik, ısı transfer katsayısını artırarak klimanızın kompresör yükünü hafifletir. Elektrik tüketiminde anında %30'a varan düşüş sağlanırken, cihazın soğutma ve ısıtma performansı ilk günkü seviyesine geri döner. Ayrıca fan motorunun balans kontrolleri, drenaj hortumunun tıkanıklık testleri ve elektriksel kartların oksitlenme kontrolleri yapılarak olası yangın ve arıza riskleri en başından engellenir.",
  "ariza-servis-7-24": "Klimanızda meydana gelen arızalar genellikle kompresör sıkışması, kapasitör (kondansatör) patlaması, fan motoru yanması veya elektronik kart (anakart) üzerindeki röle/transistör hasarlarından kaynaklanır. Sakarya genelinde hizmet veren acil mobil teknik ekiplerimiz, en karmaşık arızalarda bile profesyonel teşhis cihazları kullanarak sorunu noktasal olarak tespit eder. Klima sistemi aşırı ısındığında veya gaz eksildiğinde kompresör kendini korumaya alamazsa sargıları yanabilir. Ekiplerimiz, yerinde müdahale ile anakart onarımlarını, gaz kaçak tamirlerini ve kompresör değişimlerini orijinal parça garantisiyle gerçekleştirir. Servis sonrası tüm testler yapılarak klimanız ideal çalışma basıncına ve akım değerlerine ulaştırılır.",
  "klima-montaj": "Klima montajı, cihazınızın ömrünü ve verimini belirleyen en kritik aşamadır. Hatalı borulama, yanlış iç-dış ünite konumlandırması ve vakum işleminin yapılmaması, klimanızın verimini yarı yarıya düşürür ve kompresör ömrünü kısaltır. Sakarya Uzman Klima olarak, montaj öncesinde mekana en uygun ısı dağılımı sağlayacak konumu belirliyoruz. Bakır boruların döşenmesinde izolasyon kalitesine, drenaj borusunun meyil açısına azami özen gösterilir. Montaj tamamlandıktan sonra, boru hattının içindeki nemi ve havayı tahliye etmek için minimum 20 dakika vakumlama işlemi yapılır. Vakumlama yapılmayan klimalarda borulardaki hava gazla birleşerek asit oluşturur ve kompresörün sargılarını çürüterek yakar. Biz, her montajımızda vakumlama kuralına tavizsiz bir şekilde uyuyoruz.",
  "gaz-dolumu": "Klimalardaki soğutucu akışkan (gaz) kapalı devre sistemde dolaştığı için normal şartlarda eksilmez. Gazın eksilmesi, boru hatlarındaki kaynak çatlakları, rekor bağlantılarındaki gevşemeler veya dış ünitedeki servis vanalarının sızdırmasından kaynaklanır. Sızıntı onarılmadan yapılan gaz dolumları, kısa süre sonra gazın tekrar kaçmasıyla sonuçlanır ve bütçenize zarar verir. Ekiplerimiz sisteme kuru azot basarak hassas kaçak dedektörleri ve sabunlu köpük testleriyle sızıntıyı bulup kaynakla onarır. Onarım sonrası sistem tamamen vakumlanır ve üretici etiketinde yazan gramaj değerine göre dijital terazilerle hassas gaz dolumu (R32 veya R410A) yapılır. Eksik veya fazla gaz basılması kompresörün ömrünü kısaltır ve verimi düşürür."
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
          "_subject": `Yeni Klima Servis Talebi - ${service.title}`,
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
          serviceType: `Klima Hizmeti: ${service.title}`,
          district: "Belirtilmedi",
          message: `Klima Hizmeti: ${service.title}\nDetay: ${quickMessage || "Yok"}`
        })
      }).catch(() => {});
      if (response.ok) {
        setFormStatus("success");
        setQuickName(""); setQuickPhone(""); setQuickEmail(""); setQuickMessage("");
      } else setFormStatus("error");
    } catch { setFormStatus("error"); }
  };

  const topServices = allServices.filter(s =>
    ["ariza-servis-7-24", "periyodik-kontrol", "klima-montaj", "gaz-dolumu"].includes(s.slug)
  );

  const isActive = (s: ServiceDetail) => s.slug === slug;

  return (
    <div className="min-h-screen bg-white text-[#1E293B]">

      {/* 1. HERO HEADER WITH CINEMATIC BACKGROUND */}
      <section className="relative overflow-hidden flex items-center pt-36 pb-20 md:pt-40 md:pb-24 bg-[#0F172A]">
        {/* Background image */}
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover scale-105"
          priority
          unoptimized={true}
        />
        {/* Multi-layer premium overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/95 via-[#0F172A]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent" />
        
        {/* Drifting Blobs inside Hero */}
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-[#0EA5E9]/10 blur-[120px] rounded-full pointer-events-none animate-organic-blob" />

        {/* Hero content */}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-10 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6 text-white/40 text-[10px] font-black uppercase tracking-widest">
            <Link href="/hizmetler" className="hover:text-[#0EA5E9] transition-colors">Hizmetler</Link>
            <span className="text-white/20">─</span>
            <span className="text-white/60">{service.title}</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-5 max-w-3xl"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#0EA5E9]/20 border border-[#0EA5E9]/30 text-[#0EA5E9] flex items-center justify-center">
                <IconComponent className="w-5 h-5" />
              </div>
              <span className="text-[#0EA5E9] font-black uppercase tracking-widest text-[10px] md:text-xs">
                Sakarya Uzman Klima İklimlendirme
              </span>
            </div>

            <h1 className="font-black text-white uppercase leading-none text-4xl md:text-5xl lg:text-6xl tracking-tight">
              {service.title}
            </h1>

            <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-2xl font-medium">
              {service.intro}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="tel:08503085454"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#0EA5E9] text-white font-black uppercase tracking-wider text-xs rounded-2xl hover:bg-[#0284C7] hover:scale-105 transition-all shadow-lg shadow-sky-500/20"
              >
                <PhoneCall className="w-4 h-4" />
                0850 308 54 54
              </a>
              <a
                href="https://wa.me/905321234567"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white/10 text-white border border-white/20 font-black uppercase tracking-wider text-xs rounded-2xl hover:bg-white/20 transition-all backdrop-blur-sm"
              >
                WhatsApp Destek
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. STATS BANNER STRIP */}
      <div className="bg-[#0F172A] border-b border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-topo-waves pointer-events-none opacity-20" />
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
            {[
              { val: "7/24", label: "Hızlı Mobil Servis" },
              { val: "10+", label: "Yıllık Tecrübe" },
              { val: "Aynı Gün", label: "Yerinde Müdahale" },
              { val: "1 Yıl", label: "İşçilik & Parça Garantisi" },
            ].map((stat, i) => (
              <div key={i} className="py-6 px-6 text-center">
                <div className="font-black text-[#0EA5E9] text-xl md:text-2xl leading-none">{stat.val}</div>
                <div className="text-white/40 text-[10px] uppercase tracking-widest mt-1.5 font-black">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. MAIN SPLIT PRESENTATION LAYOUT */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 relative">
        {/* Decorative background blobs */}
        <div className="absolute top-[25%] right-[-10%] w-[500px] h-[500px] bg-[#0EA5E9]/5 blur-[120px] rounded-full pointer-events-none -z-10 animate-organic-blob" />
        <div className="absolute bottom-[25%] left-[-10%] w-[500px] h-[500px] bg-sky-300/4 blur-[120px] rounded-full pointer-events-none -z-10 animate-organic-blob-reverse" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* LEFT AREA: Rich service scope and FAQ (col 8) */}
          <div className="lg:col-span-8 space-y-20">

            {/* Scope of service */}
            <div>
              <div className="flex items-end gap-4 mb-10 pb-6 border-b border-gray-150">
                <div>
                  <span className="text-[#0EA5E9] font-black uppercase tracking-widest text-xs block mb-1">Uygulama Alanları</span>
                  <h2 className="font-black text-gray-900 uppercase text-2xl md:text-3xl tracking-tight">Hizmet Kapsamı</h2>
                </div>
              </div>
              
              <div className="space-y-2">
                {service.scope.map((item, idx) => (
                  <div key={idx} className="py-6 flex gap-6 items-start hover:bg-gray-50/50 px-4 transition-colors duration-200 rounded-2xl">
                    <span className="font-mono text-[#0EA5E9] font-black text-2xl md:text-3xl leading-none w-12 shrink-0 pt-1">
                      0{idx + 1}
                    </span>
                    <div className="flex-1 space-y-1.5">
                      <h3 className="font-black text-gray-900 uppercase text-base md:text-lg tracking-tight">{item.title}</h3>
                      <p className="text-gray-500 text-xs sm:text-sm font-semibold leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Why Required — pulled quote element */}
              <div className="mt-12 relative pl-8 border-l-4 border-[#0EA5E9]">
                <h3 className="font-black text-gray-950 uppercase tracking-widest text-[10px] sm:text-xs mb-2">
                  Bu İşlem Neden Hayati Derecede Önemlidir?
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base font-semibold italic">
                  &ldquo;{service.whyRequired}&rdquo;
                </p>
              </div>
            </div>

            {/* Supported Brands Section */}
            <div className="py-10 border-t border-gray-150">
              <span className="text-[#0EA5E9] font-black uppercase tracking-widest text-xs block mb-3">Tam Uyumlu Sistemler</span>
              <h3 className="font-black text-gray-900 uppercase text-xl tracking-tight mb-6">Hizmet Verdiğimiz Markalar</h3>
              <div className="flex flex-wrap gap-2.5">
                {SUPPORTED_BRANDS.map((brand, idx) => (
                  <div key={idx} className="flex items-center gap-2 px-4.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm font-bold text-gray-700 shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0EA5E9] shrink-0" />
                    {brand}
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Article Guide */}
            {RICH_DESCRIPTIONS[slug] && (
              <div className="py-12 border-t border-gray-150 space-y-6">
                <span className="text-[#0EA5E9] font-black uppercase tracking-widest text-xs block mb-1">MÜHENDİSLİK VE TEKNİK DETAYLAR</span>
                <h3 className="font-black text-gray-900 uppercase text-xl md:text-2xl tracking-tight">Kapsamlı Hizmet Rehberimiz</h3>
                <p className="text-gray-500 text-sm sm:text-base leading-relaxed font-semibold">
                  {RICH_DESCRIPTIONS[slug]}
                </p>
              </div>
            )}

            {/* Why choose us - Quality check */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-12 border-t border-gray-150">
              <div className="space-y-4">
                <span className="text-[#0EA5E9] font-black uppercase tracking-widest text-xs block">KALİTE STANDARTLARIMIZ</span>
                <h2 className="font-black text-gray-900 uppercase text-xl md:text-2xl tracking-tight leading-tight">
                  Neden Sakarya Uzman Klima?
                </h2>
                <p className="text-gray-500 text-sm font-semibold leading-relaxed">
                  Adapazarı merkezli geniş teknik ağımız ve 10 yılı aşkın tecrübeli ekiplerimizle tüm Sakarya ilçelerine aynı gün hızlı klima servisi sunuyoruz.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {[
                  "10+ yıllık profesyonel iklimlendirme tecrübesi",
                  "TSE standartlarına tam uyumlu teknik müdahaleler",
                  "Tüm kompresör ve kart onarımlarında 1 Yıl Garanti",
                  "Yalnızca orijinal ve lisanslı yedek parça kullanımı",
                  "Mobil donanımlı araçlarla aynı gün yerinde servis",
                  "Sakarya'nın 16 ilçesinde kesintisiz teknik destek"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="text-gray-750 text-xs sm:text-sm font-semibold">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            {service.faqs && service.faqs.length > 0 && (
              <div className="border-t border-gray-150 pt-12 space-y-6">
                <div>
                  <span className="text-[#0EA5E9] font-black uppercase tracking-widest text-xs block mb-1">S.S.S</span>
                  <h2 className="font-black text-gray-900 uppercase text-2xl md:text-3xl tracking-tight">
                    Sıkça Sorulan Sorular
                  </h2>
                </div>

                <div className="space-y-2">
                  {service.faqs.map((faq, index) => {
                    const isOpen = openFaqIndex === index;
                    return (
                      <div key={index} className="border-b border-gray-100 transition-all duration-300">
                        <button
                          type="button"
                          onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                          className="w-full py-5 flex items-start justify-between text-left gap-6 cursor-pointer outline-none group select-none"
                        >
                          <span className={`font-black text-sm sm:text-base leading-snug transition-colors ${isOpen ? "text-[#0EA5E9]" : "text-gray-900 group-hover:text-[#0EA5E9]"}`}>
                            {faq.q}
                          </span>
                          <ChevronDown className={`w-4.5 h-4.5 text-[#0EA5E9] shrink-0 mt-0.5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                        </button>
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <p className="pb-5 text-gray-500 text-xs sm:text-sm leading-relaxed font-semibold">
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
          </div>

          {/* RIGHT SIDEBAR (col 4) */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28 h-fit">

            {/* Quick Contact Form */}
            <div className="bg-[#0F172A] rounded-[32px] overflow-hidden relative shadow-lg">
              <div className="absolute inset-0 bg-topo-waves pointer-events-none opacity-20" />
              <div className="p-8 space-y-5 relative z-10">
                <div className="space-y-1">
                  <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">Hızlı İletişim</p>
                  <h3 className="font-black text-white text-base sm:text-lg uppercase tracking-tight">
                    Hızlı Servis Kaydı
                  </h3>
                </div>

                {formStatus === "success" ? (
                  <div className="py-6 text-center">
                    <CheckCircle2 className="w-10 h-10 text-[#0EA5E9] mx-auto mb-3" />
                    <p className="text-white text-xs sm:text-sm font-black">Talebiniz başarıyla alındı. En kısa sürede geri dönüş yapacağız.</p>
                  </div>
                ) : (
                  <form onSubmit={handleQuickServiceSubmit} className="space-y-3">
                    <input
                      type="text" placeholder="Adınız Soyadınız *" required
                      value={quickName} onChange={e => setQuickName(e.target.value)}
                      className="w-full px-4.5 py-3.5 bg-white/5 rounded-xl border border-white/10 focus:outline-none focus:border-[#0EA5E9] text-white text-xs font-semibold placeholder-white/20 transition-all"
                    />
                    <input
                      type="tel" placeholder="Telefon Numaranız *" required
                      value={quickPhone} onChange={e => setQuickPhone(e.target.value)}
                      className="w-full px-4.5 py-3.5 bg-white/5 rounded-xl border border-white/10 focus:outline-none focus:border-[#0EA5E9] text-white text-xs font-semibold placeholder-white/20 transition-all"
                    />
                    <input
                      type="email" placeholder="E-posta Adresiniz"
                      value={quickEmail} onChange={e => setQuickEmail(e.target.value)}
                      className="w-full px-4.5 py-3.5 bg-white/5 rounded-xl border border-white/10 focus:outline-none focus:border-[#0EA5E9] text-white text-xs font-semibold placeholder-white/20 transition-all"
                    />
                    <textarea
                      placeholder="Adres veya servis detayları..." rows={2}
                      value={quickMessage} onChange={e => setQuickMessage(e.target.value)}
                      className="w-full px-4.5 py-3.5 bg-white/5 rounded-xl border border-white/10 focus:outline-none focus:border-[#0EA5E9] text-white text-xs font-semibold placeholder-white/20 resize-none transition-all"
                    />
                    <button
                      type="submit" disabled={formStatus === "loading"}
                      className="w-full py-4 bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-black uppercase tracking-wider text-xs rounded-xl transition-all disabled:opacity-50 cursor-pointer shadow-lg shadow-sky-500/10"
                    >
                      {formStatus === "loading" ? "Gönderiliyor..." : "Servis Kaydı Oluştur"}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Sidebar: Other Services */}
            <div className="border border-gray-200/60 rounded-[32px] p-6.5 bg-white shadow-sm space-y-4">
              <h3 className="font-black text-gray-950 uppercase text-sm tracking-tight">
                Tüm Faaliyetlerimiz
              </h3>
              <div className="space-y-2">
                {topServices.map(item => (
                  <Link
                    key={item.slug}
                    href={`/hizmetler/${item.slug}`}
                    className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 ${
                      isActive(item)
                        ? "bg-[#0EA5E9] text-white cursor-default pointer-events-none shadow-md shadow-sky-500/10"
                        : "text-gray-500 hover:text-gray-950 hover:bg-gray-50 border border-transparent hover:border-gray-150"
                    }`}
                  >
                    <span>{item.title}</span>
                    {!isActive(item) && <ArrowRight className="w-3.5 h-3.5 shrink-0" />}
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
