"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Wrench, 
  ShieldCheck, 
  Zap, 
  Cpu, 
  Snowflake, 
  Activity, 
  Sparkles,
  ArrowRight, 
  Search, 
  Clock, 
  Star,
  CheckCircle2,
  PhoneCall,
  Calculator,
  Phone,
  Check
} from "lucide-react";

interface ServiceItem {
  slug: string;
  code: string;
  title: string;
  desc: string;
  image: string;
  icon: React.ElementType;
  accent: string;
  readTime: string;
  items: string[];
}

const SERVICES: ServiceItem[] = [
  {
    slug: "camasir-makinesi-ariza-servisi",
    code: "SERV-01",
    title: "Çamaşır Makinesi Arıza Servisi",
    desc: "Çamaşır makineniz su almıyor, sıkma yapmıyor, sesli çalışıyor veya su sızdırıyorsa uzman teknik ekibimiz orijinal yedek parça garantisiyle aynı gün yerinde tamir hizmeti sunar.",
    image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=800&q=80",
    icon: Wrench,
    accent: "#0EA5E9",
    readTime: "Aynı Gün Servis",
    items: [
      "Motor & Kazan Bilyası Değişimi",
      "Tahliye Pompası & Kart Onarımı",
      "Kireçlenen Isıtıcı Rezistans Yenileme",
      "1 Yıl Garantili Orijinal Parça"
    ]
  },
  {
    slug: "bulasik-makinesi-ariza-servisi",
    code: "SERV-02",
    title: "Bulaşık Makinesi Arıza Servisi",
    desc: "Bulaşık makineniz iyi yıkamıyor, lekeli bırakıyor, su ısıtmıyor veya kurutma yapmıyorsa 7/24 mobil teknik servisimizle yerinde garantili müdahale sağlıyoruz.",
    image: "https://images.unsplash.com/photo-1585837575652-267c041d77d4?auto=format&fit=crop&w=800&q=80",
    icon: ShieldCheck,
    accent: "#10B981",
    readTime: "30 Dk Ulaşım",
    items: [
      "Sirkülasyon Pompası & Yıkama Motoru",
      "Isıtıcı NTC & Rezistans Değişimi",
      "Fıskiye Tıkanıklıkları & Kart Bakımı",
      "Hijyenik Yıkama Performans Testi"
    ]
  },
  {
    slug: "buzdolabi-ariza-servisi",
    code: "SERV-03",
    title: "Buzdolabı Arıza Servisi",
    desc: "Buzdolabınız soğutmuyor, buzlanma yapıyor, motoru sürekli çalışıyor veya gaz kaçağı varsa gıdalarınız bozulmadan acil mobil ekibimiz adresi ziyaret eder.",
    image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=800&q=80",
    icon: Zap,
    accent: "#EF4444",
    readTime: "Acil Müdahale",
    items: [
      "Kompresör (Motor) Değişimi & Şarj",
      "No-Frost Defrost Rezistans & Sensör",
      "R600a & R134a Hassas Gaz Dolumu",
      "Tüm Markalarda Yerinde Onarım"
    ]
  },
  {
    slug: "kombi-ariza-servisi",
    code: "SERV-04",
    title: "Kombi Arıza Servisi",
    desc: "Kombiniz sıcak su vermiyor, petekleri ısıtmıyor, basınç düşürüyor veya ateşleme yapmıyorsa sertifikalı kombi teknisyenlerimizle 7/24 emniyetli servis sağlıyoruz.",
    image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=800&q=80",
    icon: Cpu,
    accent: "#F59E0B",
    readTime: "7/24 Destek",
    items: [
      "Anakart & İyonizasyon Ateşleme Onarımı",
      "Devirdaim Pompası & Üç Yollu Vana Bakımı",
      "Plakalı Eşanjör & İlaçlı Petek Yıkama",
      "Doğalgaz Tasarruf Ve Güvenlik Testi"
    ]
  },
  {
    slug: "klima-arizasi-servisi",
    code: "SERV-05",
    title: "Klima Arızası Servisi",
    desc: "Sakarya genelinde klimanız soğutmuyor, ısıtmıyor, su akıtıyor veya sesli çalışıyorsa 7/24 tam donanımlı mobil araçlarımızla yerinde arıza tespiti ve tamir hizmeti sağlıyoruz.",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80",
    icon: Snowflake,
    accent: "#0EA5E9",
    readTime: "7/24 Nöbetçi Ekip",
    items: [
      "Inverter Anakart & Kompresör Tamiri",
      "R32 & R410A Sızıntı Onarımı ve Şarjı",
      "İç Ünite Su Akıtma & İlaçlı Hijyen Temizlik",
      "Yüksek Enerji Verimlilik Testi"
    ]
  },
  {
    slug: "kucuk-ev-aletleri-ariza-servisi",
    code: "SERV-06",
    title: "Küçük Ev Aletleri Arıza Servisi",
    desc: "Süpürge, mikser, kahve makinesi, ütü, robot süpürge ve diğer küçük ev aletlerinizdeki motor, kablo ve rezistans arızalarını garantili şekilde onarıyoruz.",
    image: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=800&q=80",
    icon: Activity,
    accent: "#8B5CF6",
    readTime: "Hızlı Teslimat",
    items: [
      "Elektrikli Süpürge Motoru & HEPA Filtre",
      "Kahve & Çay Makinesi Rezistans Onarımı",
      "Robot Süpürge Batarya & Fırça Değişimi",
      "Ekonomik Parça Değişim Garantisi"
    ]
  },
  {
    slug: "kurutma-makinesi-ariza-servisi",
    code: "SERV-07",
    title: "Kurutma Makinesi Arıza Servisi",
    desc: "Kurutma makineniz çamaşırları nemli bırakıyor, ısıtmıyor, koku yapıyor veya kayış koparmışsa ısı pompalı ve yoğuşmalı tüm modellerde uzman servis sağlıyoruz.",
    image: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&w=800&q=80",
    icon: Sparkles,
    accent: "#EC4899",
    readTime: "Aynı Gün Onarım",
    items: [
      "Isı Pompası Gaz Şarjı & Kompresör Kontrolü",
      "Kazan Kayışı & Kasnak Değişimi",
      "Kondanser & Nem Sensörü Temizliği",
      "Mis Kokulu Kurutma Performansı"
    ]
  }
];

export default function HizmetlerPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredServices = useMemo(() => {
    if (!searchQuery.trim()) return SERVICES;
    const q = searchQuery.toLowerCase();
    return SERVICES.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.desc.toLowerCase().includes(q) ||
        s.items.some((item) => item.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  const featured = filteredServices[0];
  const rest = filteredServices.slice(1);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] font-sans">
      <title>Teknik Servis Hizmetlerimiz | Sakarya Uzman Klima & Beyaz Eşya</title>
      <meta
        name="description"
        content="Sakarya Uzman Klima İklimlendirme & Beyaz Eşya Servisi: Klima, Kombi, Çamaşır Makinesi, Bulaşık Makinesi, Buzdolabı ve Kurutma Makinesi arıza bakımları."
      />

      {/* ─── 1. HERO BANNER (Blog Sayfası Tarzı Dark Hero) ─── */}
      <section className="relative pt-36 pb-24 md:pt-40 bg-[#0F172A] text-white overflow-hidden">
        <div className="absolute inset-0 bg-topo-waves pointer-events-none opacity-30" />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#0EA5E9]/10 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[200px] bg-[#38BDF8]/8 blur-[80px] rounded-full pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#0EA5E9] font-black text-xs tracking-widest uppercase mb-6"
          >
            <Clock className="w-4 h-4 animate-pulse" />
            7/24 Mobil Acil Teknik Servis
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-black text-white uppercase leading-none text-4xl sm:text-5xl md:text-6xl tracking-tight mb-4"
          >
            Profesyonel Ev & İklimlendirme<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0EA5E9] to-[#38BDF8]">
              Arıza Servisi Hizmetleri
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 font-semibold text-sm sm:text-base leading-relaxed max-w-2xl mx-auto"
          >
            Sakarya'nın 16 ilçesinde Klima, Kombi, Çamaşır Makinesi, Bulaşık Makinesi, Buzdolabı, Kurutma Makinesi ve Küçük Ev Aletleri arızalarına 30 dakikada yerinde 1 yıl garantili müdahale.
          </motion.p>

          {/* Stats Bar (Blog Tasarımındaki Kart İstatistikleri) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-3xl mx-auto"
          >
            {[
              { val: "7", label: "Ana Servis Alanı", icon: Wrench },
              { val: "7/24", label: "Mobil Nöbetçi Ekip", icon: ShieldCheck },
              { val: "30 Dk", label: "Ortalama Ulaşım", icon: Clock },
              { val: "1 Yıl", label: "Parça Garantisi", icon: Star },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-3">
                  <Icon className="w-5 h-5 text-[#0EA5E9] shrink-0" />
                  <div className="text-left">
                    <div className="font-black text-white text-base leading-none">{s.val}</div>
                    <div className="text-white/45 text-[9px] uppercase tracking-widest font-bold mt-1">{s.label}</div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ─── 2. SEARCH BAR SECTION (KATEGORİSİZ TEMİZ ARAMA) ─── */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 pt-10 pb-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-gray-100 p-4 sm:p-5 rounded-3xl shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-50 text-[#0EA5E9] flex items-center justify-center font-bold shrink-0">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-black text-gray-900 uppercase text-sm tracking-wide">Faaliyet Alanlarımız</h2>
              <p className="text-gray-400 text-xs font-semibold">Tüm cihaz arızalarında uzman teknik kadromuzla yanınızdayız</p>
            </div>
          </div>

          <div className="relative w-full sm:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#0EA5E9] transition-colors" />
            <input
              type="text"
              placeholder="Hizmetlerde ara (Örn: Çamaşır, Kombi, Klima...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-10 py-3 rounded-2xl bg-gray-50 border border-gray-100 focus:outline-none focus:border-[#0EA5E9] focus:bg-white text-gray-800 font-semibold text-xs transition-all shadow-xs placeholder-gray-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-bold"
              >
                Temizle
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ─── 3. FEATURED SERVICE CARD & GRID (BLOG TARZI KART TASARIMI) ─── */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-10">
        {filteredServices.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 space-y-4">
            <Search className="w-12 h-12 text-gray-300 mx-auto" />
            <h3 className="text-xl font-bold text-gray-800 uppercase">Aramanıza Uygun Hizmet Bulunamadı</h3>
            <p className="text-gray-500 text-xs font-semibold">Lütfen farklı kelimeler arayarak tekrar deneyin.</p>
            <button
              onClick={() => setSearchQuery("")}
              className="px-6 py-2.5 rounded-xl bg-[#0EA5E9] text-white font-bold text-xs uppercase tracking-wider shadow-sm"
            >
              Tüm Hizmetleri Göster
            </button>
          </div>
        ) : (
          <div className="space-y-10">
            {/* Featured Highlighted Card (First Item) */}
            {featured && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-gray-100 rounded-[32px] overflow-hidden shadow-xs hover:shadow-2xl hover:border-[#0EA5E9] transition-all duration-300 group"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  <div className="lg:col-span-6 relative h-64 lg:h-auto min-h-[280px] bg-gray-100 overflow-hidden">
                    <Image
                      src={featured.image}
                      alt={featured.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      unoptimized
                    />
                    <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                      <span className="px-3 py-1.5 rounded-xl bg-[#0F172A]/85 backdrop-blur-md text-[#0EA5E9] border border-white/10 text-[10px] font-black tracking-widest uppercase flex items-center gap-1.5 shadow-md">
                        <featured.icon className="w-3.5 h-3.5" />
                        ÖNE ÇIKAN HİZMET
                      </span>
                    </div>
                  </div>

                  <div className="lg:col-span-6 p-8 lg:p-12 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#0EA5E9] uppercase tracking-widest">
                        <span>{featured.code}</span>
                        <span>•</span>
                        <span>{featured.readTime}</span>
                      </div>
                      <h2 className="font-black text-gray-900 text-2xl lg:text-3xl uppercase leading-tight group-hover:text-[#0EA5E9] transition-colors">
                        {featured.title}
                      </h2>
                      <p className="text-gray-500 text-xs sm:text-sm leading-relaxed font-semibold">
                        {featured.desc}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        {featured.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs font-bold text-gray-700">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                      <Link
                        href={`/hizmetler/${featured.slug}`}
                        className="inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-black text-xs uppercase tracking-wider transition-all duration-300 shadow-md group/btn"
                      >
                        <span>Hizmet Detayı & Randevu</span>
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                      <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest hidden sm:inline">
                        1 Yıl Garantili
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Services Grid (Remaining Items) */}
            {rest.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {rest.map((sec, idx) => {
                  const IconComponent = sec.icon;
                  return (
                    <motion.div
                      key={sec.slug}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="bg-white border border-gray-100 rounded-[32px] overflow-hidden shadow-xs hover:shadow-2xl hover:border-[#0EA5E9] transition-all duration-300 group flex flex-col justify-between"
                    >
                      <div>
                        {/* Image Header */}
                        <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                          <Image
                            src={sec.image}
                            alt={sec.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                            unoptimized
                          />
                          <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                            <span className="px-3 py-1.5 rounded-xl bg-[#0F172A]/85 backdrop-blur-md text-[#0EA5E9] border border-white/10 text-[10px] font-black tracking-widest uppercase flex items-center gap-1.5 shadow-md">
                              <IconComponent className="w-3.5 h-3.5" />
                              {sec.code}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 sm:p-7 space-y-4">
                          <div className="flex items-center justify-between text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                            <span>{sec.readTime}</span>
                            <span className="text-[#0EA5E9]">Yerinde Müdahale</span>
                          </div>

                          <h3 className="font-black text-gray-900 text-lg sm:text-xl uppercase leading-snug group-hover:text-[#0EA5E9] transition-colors">
                            {sec.title}
                          </h3>

                          <p className="text-gray-500 text-xs sm:text-sm leading-relaxed font-semibold line-clamp-3">
                            {sec.desc}
                          </p>

                          <ul className="space-y-2 pt-2 border-t border-gray-50 text-xs font-semibold text-gray-700">
                            {sec.items.slice(0, 3).map((item, itemIdx) => (
                              <li key={itemIdx} className="flex items-start gap-2">
                                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                                <span className="line-clamp-1">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Card Action Link */}
                      <div className="p-6 sm:p-7 pt-0">
                        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                          <Link
                            href={`/hizmetler/${sec.slug}`}
                            className="flex items-center justify-between w-full py-3 px-5 rounded-2xl bg-gray-50 hover:bg-[#0EA5E9] text-gray-900 hover:text-white font-black text-xs uppercase tracking-wider transition-all duration-300 group/link"
                          >
                            <span>Hizmet Detayı & Randevu</span>
                            <ArrowRight className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </section>

      {/* ─── 4. BOTTOM EMERGENCY CALL & CAPACITY ANALYSIS BANNER ─── */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 mb-20 pt-6">
        <div className="bg-gradient-to-r from-[#0F172A] via-[#0B1120] to-[#0F172A] rounded-[36px] p-8 sm:p-12 border border-white/10 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 text-white">
          <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#0EA5E9]/10 blur-[130px] rounded-full pointer-events-none" />

          <div className="space-y-4 text-center lg:text-left relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0EA5E9]/15 border border-[#0EA5E9]/30 text-[#0EA5E9] text-xs font-black uppercase tracking-widest">
              <PhoneCall className="w-4 h-4 animate-bounce" />
              7/24 Acil Çağrı Merkezi
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight leading-tight">
              Ev Aletiniz Arızalandı Mı?<br />
              <span className="text-[#0EA5E9]">Aynı Gün Kapınıza Gelelim</span>
            </h2>
            <p className="text-gray-300 font-semibold text-xs sm:text-sm leading-relaxed">
              Sakarya'nın 16 ilçesinde mobil acil servis araçlarımız nöbetçi teknisyenlerle hizmetinizde. Hemen arayın, servis kaydınızı saniyeler içinde oluşturalım.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 relative z-10 w-full lg:w-auto">
            <a
              href="tel:08500000000"
              className="flex items-center justify-center gap-3 px-8 py-4 bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-black text-xs sm:text-sm uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-sky-500/25 w-full sm:w-auto text-center hover:scale-[1.02]"
            >
              <Phone className="w-5 h-5" />
              0850 000 00 00
            </a>
            <Link
              href="/hesaplama-araclari"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-black text-xs sm:text-sm uppercase tracking-widest rounded-2xl transition-all border border-white/20 w-full sm:w-auto text-center"
            >
              BTU Kapasite Analizi <Calculator className="w-4 h-4 text-[#0EA5E9]" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
