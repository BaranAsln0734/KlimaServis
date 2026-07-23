"use client";

import { useState, useMemo } from "react";
import { MapPin, PhoneCall, Search, ArrowRight, Clock, ShieldCheck, Zap, CheckCircle2, Star, Wrench, Snowflake, Droplets, Navigation } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const REGIONS = [
  { name: "Adapazarı", category: "merkez", time: "~15 dk", color: "sky" },
  { name: "Serdivan",  category: "merkez", time: "~18 dk", color: "sky" },
  { name: "Erenler",   category: "merkez", time: "~20 dk", color: "sky" },
  { name: "Arifiye",   category: "merkez", time: "~22 dk", color: "sky" },
  { name: "Sapanca",   category: "guney",  time: "~35 dk", color: "emerald" },
  { name: "Geyve",     category: "guney",  time: "~55 dk", color: "emerald" },
  { name: "Pamukova",  category: "guney",  time: "~50 dk", color: "emerald" },
  { name: "Taraklı",   category: "guney",  time: "~70 dk", color: "emerald" },
  { name: "Karasu",    category: "kuzey",  time: "~45 dk", color: "violet" },
  { name: "Kocaali",   category: "kuzey",  time: "~55 dk", color: "violet" },
  { name: "Kaynarca",  category: "kuzey",  time: "~60 dk", color: "violet" },
  { name: "Ferizli",   category: "kuzey",  time: "~30 dk", color: "violet" },
  { name: "Söğütlü",   category: "kuzey",  time: "~28 dk", color: "violet" },
  { name: "Akyazı",    category: "dogu",   time: "~40 dk", color: "amber" },
  { name: "Hendek",    category: "dogu",   time: "~45 dk", color: "amber" },
  { name: "Karapürçek",category: "dogu",   time: "~35 dk", color: "amber" },
];

const CATEGORIES = [
  { key: "all",    label: "Tümü",        count: REGIONS.length },
  { key: "merkez", label: "Merkez İlçeler", count: REGIONS.filter(r => r.category === "merkez").length },
  { key: "guney",  label: "Güney İlçeler",  count: REGIONS.filter(r => r.category === "guney").length },
  { key: "kuzey",  label: "Kuzey İlçeler",  count: REGIONS.filter(r => r.category === "kuzey").length },
  { key: "dogu",   label: "Doğu İlçeler",   count: REGIONS.filter(r => r.category === "dogu").length },
];

const COLOR_MAP: Record<string, { bg: string; border: string; text: string; badge: string; dot: string }> = {
  sky:     { bg: "hover:bg-[#0EA5E9]/5",    border: "hover:border-[#0EA5E9]",   text: "text-[#0EA5E9]",   badge: "bg-[#0EA5E9]/10 text-[#0EA5E9] border-[#0EA5E9]/20",   dot: "bg-[#0EA5E9]" },
  emerald: { bg: "hover:bg-emerald-50",      border: "hover:border-emerald-400", text: "text-emerald-600", badge: "bg-emerald-50 text-emerald-700 border-emerald-200",   dot: "bg-emerald-500" },
  violet:  { bg: "hover:bg-violet-50",       border: "hover:border-violet-400",  text: "text-violet-600",  badge: "bg-violet-50 text-violet-700 border-violet-200",       dot: "bg-violet-500" },
  amber:   { bg: "hover:bg-amber-50",        border: "hover:border-amber-400",   text: "text-amber-600",   badge: "bg-amber-50 text-amber-700 border-amber-200",          dot: "bg-amber-500" },
};

const CATEGORY_LABEL: Record<string, string> = {
  merkez: "Merkez",
  guney: "Güney",
  kuzey: "Kuzey",
  dogu: "Doğu",
};

const getDistrictSlug = (name: string) => {
  return name
    .replace(/Ğ/g, 'G').replace(/ğ/g, 'g')
    .replace(/Ü/g, 'U').replace(/ü/g, 'u')
    .replace(/Ş/g, 'S').replace(/ş/g, 's')
    .replace(/İ/g, 'I').replace(/ı/g, 'i')
    .replace(/Ö/g, 'O').replace(/ö/g, 'o')
    .replace(/Ç/g, 'C').replace(/ç/g, 'c');
};

const EASE = [0.25, 0.1, 0.25, 1] as const;

export default function ServisBolgeleri() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = useMemo(() =>
    REGIONS.filter(r => {
      const matchSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCat = activeCategory === "all" || r.category === activeCategory;
      return matchSearch && matchCat;
    }).sort((a, b) => a.name.localeCompare(b.name, "tr")),
    [searchQuery, activeCategory]
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] font-sans">
      <title>Servis Bölgelerimiz | Sakarya Beyaz Eşya Kombi Klima Servisi</title>
      <meta name="description" content="Sakarya'da Adapazarı, Serdivan, Sapanca, Hendek ve tüm 16 ilçede 7/24 mobil Klima, Kombi ve Beyaz Eşya servisi. Hemen arayın!" />

      {/* ─── HERO ─── */}
      <section className="relative pt-36 pb-28 md:pt-40 bg-[#0F172A] text-white overflow-hidden">
        <div className="absolute inset-0 bg-topo-waves pointer-events-none opacity-30" />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#0EA5E9]/12 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-[#0284C7]/8 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#0EA5E9] font-black text-xs tracking-widest uppercase"
            >
              <Navigation className="w-4 h-4 animate-pulse" />
              Sakarya Hizmet Ağı — 16 İlçe
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-black text-white uppercase leading-none text-4xl sm:text-5xl md:text-7xl tracking-tight"
            >
              Tüm Sakarya'da<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0EA5E9] to-[#38BDF8] mt-2 block">
                Mobil Teknik Servis Ağı
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-300 font-semibold max-w-2xl mx-auto text-sm sm:text-base leading-relaxed"
            >
              Adapazarı merkezimizden koordine edilen tam donanımlı mobil araçlarımızla Sakarya'nın 16 ilçesinde
              Klima, Kombi, Çamaşır Makinesi, Bulaşık Makinesi, Buzdolabı, Kurutma Makinesi ve Ev Aletleri arıza tamiri ve bakım hizmeti sunuyoruz.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 justify-center pt-2"
            >
              <a
                href="tel:08503085454"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-[#0EA5E9] text-white font-black uppercase tracking-wider text-xs hover:bg-[#0284C7] transition-all shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:-translate-y-0.5"
              >
                <PhoneCall className="w-4 h-4" />
                0850 308 54 54
              </a>
              <Link
                href="/iletisim"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white/8 border border-white/15 text-white font-black uppercase tracking-wider text-xs hover:bg-white/15 transition-all"
              >
                Fiyat Teklifi Al <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-3xl mx-auto"
          >
            {[
              { val: "7/24", label: "Acil Klima Servisi", icon: Clock },
              { val: "Aynı Gün", label: "Hızlı Müdahale", icon: Zap },
              { val: "10+ Yıl", label: "Tecrübe", icon: ShieldCheck },
              { val: "1 Yıl", label: "İşçilik Garantisi", icon: CheckCircle2 },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="bg-white/6 border border-white/10 rounded-2xl p-4 flex items-center gap-3 backdrop-blur-sm hover:border-white/20 transition-all duration-300">
                  <Icon className="w-5 h-5 text-[#0EA5E9] shrink-0" />
                  <div>
                    <div className="font-black text-white text-sm leading-none">{stat.val}</div>
                    <div className="text-white/45 text-[9px] uppercase tracking-widest font-bold mt-1">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ─── BÖLGE GRID ─── */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-20">

        {/* Filters + Search */}
        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between mb-12">
          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 py-2 rounded-xl font-black text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer border ${
                  activeCategory === cat.key
                    ? "bg-[#0F172A] text-white border-[#0F172A] shadow-md"
                    : "bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-gray-800"
                }`}
              >
                {cat.label}
                <span className={`ml-1.5 inline-block px-1.5 py-0.5 rounded-md text-[9px] font-black ${activeCategory === cat.key ? "bg-white/15 text-white" : "bg-gray-100 text-gray-400"}`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full lg:w-72 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#0EA5E9] transition-colors" />
            <input
              type="text"
              placeholder="İlçe adı ile arayın..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl text-xs font-semibold text-gray-800 focus:outline-none focus:border-[#0EA5E9] focus:ring-4 focus:ring-sky-500/5 transition-all placeholder-gray-400 shadow-xs"
            />
          </div>
        </div>

        {/* Section header */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <span className="text-[#0EA5E9] font-black uppercase tracking-widest text-xs block mb-1">
              {activeCategory === "all" ? "Tüm İlçeler" : CATEGORY_LABEL[activeCategory] + " İlçeleri"}
            </span>
            <h2 className="font-black text-gray-900 uppercase tracking-tight text-2xl sm:text-3xl">
              Hizmet Verdiğimiz Bölgeler
            </h2>
          </div>
          <span className="text-gray-400 font-black text-sm hidden sm:block">{filtered.length} ilçe</span>
        </div>

        {/* Cards Grid */}
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div
              key={`${searchQuery}-${activeCategory}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
            >
              {filtered.map((region, idx) => {
                const c = COLOR_MAP[region.color];
                const slug = getDistrictSlug(region.name);
                return (
                  <motion.div
                    key={region.name}
                    initial={{ opacity: 0, y: 20, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.25, delay: idx * 0.02, ease: EASE }}
                  >
                    <Link
                      href={`/${slug}-Klima-Servisi`}
                      className={`group flex flex-col justify-between p-6 bg-white border border-gray-100 rounded-[28px] cursor-pointer ${c.border} ${c.bg} hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 shadow-sm h-full block`}
                    >
                      <div className="space-y-4">
                        {/* Top badges */}
                        <div className="flex items-center justify-between">
                          <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg border ${c.badge}`}>
                            {CATEGORY_LABEL[region.category]}
                          </span>
                          <div className="flex items-center gap-1.5">
                            <span className={`w-1.5 h-1.5 rounded-full ${c.dot} animate-pulse shrink-0`} />
                            <span className="text-[9px] font-extrabold text-gray-400 uppercase tracking-wider">Aktif</span>
                          </div>
                        </div>

                        {/* Name + Icon */}
                        <div className="flex items-center gap-3">
                          <div className={`w-11 h-11 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center ${c.text} group-hover:bg-current/10 transition-all duration-300`}
                            style={{ backgroundColor: undefined }}>
                            <MapPin className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="font-black text-gray-900 text-base uppercase tracking-tight leading-none">{region.name}</h3>
                            <span className="text-gray-400 text-[10px] font-bold block mt-1">Klima Teknik Servisi</span>
                          </div>
                        </div>

                        {/* ETA */}
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-gray-300 shrink-0" />
                          <span className="text-gray-400 text-[10px] font-bold">Merkezden ortalama ulaşım: <span className={`${c.text} font-black`}>{region.time}</span></span>
                        </div>
                      </div>

                      {/* Footer CTA */}
                      <div className={`flex items-center justify-between pt-5 mt-5 border-t border-gray-50 text-gray-400 ${c.text.replace("text-", "group-hover:text-")} transition-colors`}>
                        <span className="text-[10px] font-black uppercase tracking-wider group-hover:text-inherit transition-colors">Detaylara Bak</span>
                        <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-24 text-center"
            >
              <MapPin className="w-12 h-12 text-gray-200 mx-auto mb-4" />
              <p className="text-gray-400 font-semibold text-sm">
                &ldquo;{searchQuery}&rdquo; ilçesi bulunamadı.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ─── SÜREÇ ADIMLAR ─── */}
      <section className="border-t border-gray-100 bg-white py-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="text-center mb-14 space-y-3">
            <span className="text-[#0EA5E9] font-black uppercase tracking-widest text-xs block">Nasıl Çalışır?</span>
            <h2 className="font-black text-gray-900 uppercase tracking-tight text-2xl md:text-4xl">Teknik Müdahale Süreci</h2>
            <div className="w-12 h-1.5 bg-[#0EA5E9] mx-auto rounded-full" />
            <p className="text-gray-500 font-semibold text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
              Talebinizden klimanızın teslim edilmesine kadar 3 adım.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-16 left-1/6 right-1/6 h-px bg-gradient-to-r from-transparent via-[#0EA5E9]/30 to-transparent" />

            {[
              { no: "01", icon: PhoneCall, title: "Çağrı & Servis Kaydı", desc: "0850 308 54 54 hattı veya WhatsApp üzerinden talebinizi bildirin, servis kaydınız anında açılsın." },
              { no: "02", icon: Navigation, title: "En Yakın Ekip Sevki", desc: "Lokasyonunuza en yakın bölgede görevde olan mobil teknik aracımız adresinize sevk edilir." },
              { no: "03", icon: ShieldCheck, title: "Garantili Müdahale", desc: "Teknisyenimiz arızayı tespit eder, orijinal parça ile onarır ve 1 yıl garanti belgesi ile teslim eder." },
            ].map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative bg-white border border-gray-100 p-8 rounded-[32px] space-y-4 shadow-sm hover:-translate-y-1 transition-transform duration-300 text-center"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#0EA5E9]/10 flex items-center justify-center mx-auto">
                    <Icon className="w-6 h-6 text-[#0EA5E9]" />
                  </div>
                  <span className="font-mono text-[#0EA5E9]/30 font-black text-5xl leading-none block absolute top-5 right-7">{step.no}</span>
                  <h3 className="font-black text-gray-900 uppercase text-sm tracking-tight">{step.title}</h3>
                  <p className="text-gray-500 text-xs sm:text-sm font-semibold leading-relaxed">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── NEDEN BİZ ─── */}
      <section className="border-t border-gray-100 bg-[#F8FAFC] py-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-5">
              <span className="text-[#0EA5E9] font-black uppercase tracking-widest text-xs block">Kalite Güvencesi</span>
              <h2 className="font-black text-gray-900 uppercase tracking-tight text-3xl md:text-4xl leading-tight">
                Neden Sakarya<br />
                <span className="text-[#0EA5E9]">Uzman Klima?</span>
              </h2>
              <div className="w-12 h-1.5 bg-[#0EA5E9] rounded-full" />
              <p className="text-gray-500 text-sm font-semibold leading-relaxed">
                Adapazarı merkezimizden tüm Sakarya ilçelerine uzanan servis ağımızla yaşam alanlarınızın konforunu
                kesintisiz güvence altına alıyoruz. Orijinal parça stoğumuz ve 1 yıl garantimizle fark yaratıyoruz.
              </p>
              <a
                href="tel:08503085454"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-[#0EA5E9] text-white font-black uppercase tracking-wider text-xs hover:bg-[#0284C7] transition-all shadow-lg shadow-sky-500/20 hover:-translate-y-0.5"
              >
                <PhoneCall className="w-4 h-4" />
                Hemen Ara
              </a>
            </div>

            <div className="grid grid-cols-1 gap-3 bg-white p-6 sm:p-8 border border-gray-100 rounded-[32px] shadow-sm">
              {[
                { icon: Zap,         text: "Tüm Sakarya genelinde aynı gün hızlı yerinde servis" },
                { icon: Clock,       text: "7/24 acil nöbetçi teknik saha ekipleri" },
                { icon: ShieldCheck, text: "Onarılan tüm işlem ve parçalarda 1 Yıl Garanti" },
                { icon: Wrench,      text: "Lisanslı ve orijinal klima yedek parça kullanımı" },
                { icon: Snowflake,   text: "Daikin, Mitsubishi, Samsung dahil tüm markalar" },
                { icon: Star,        text: "TSE HYB standartlarında faturalı teknik raporlama" },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0">
                    <div className="w-8 h-8 rounded-xl bg-[#0EA5E9]/8 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-[#0EA5E9]" />
                    </div>
                    <span className="text-gray-700 text-xs sm:text-sm font-semibold pt-1">{item.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

