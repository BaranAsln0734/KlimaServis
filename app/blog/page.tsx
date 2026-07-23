"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  BookOpen, Calendar, Clock, ArrowRight, Search, X,
  Snowflake, Thermometer, Wrench, Droplets, Zap, Wind,
  ShieldCheck, CheckCircle2, Star
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Post {
  slug: string;
  title: string;
  desc: string;
  date: string;
  readTime: string;
  category: string;
  icon: React.ElementType;
  accent: string;
  img: string;
}

const POSTS: Post[] = [
  {
    slug: "klima-bakimi-ne-zaman-yapilir",
    title: "Klima Bakımı Ne Zaman Yapılır? Mevsimlik Bakım Rehberi",
    desc: "Klimanızın verimli çalışması için yılda en az iki kez bakım yaptırmanız gerekir. Filtre temizliği, gaz kontrolü ve serpantin bakımı için doğru zamanlamayı öğrenin.",
    date: "18 Temmuz 2026",
    readTime: "7 Dk Okuma",
    category: "Bakım & Servis",
    icon: Wrench,
    accent: "#0EA5E9",
    img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "kombi-bakimi-ve-petek-temizligi",
    title: "Kombi Bakımı ve Petek Temizliği Nasıl Yapılır? Yakıt Tasarrufu İpuçları",
    desc: "Doğalgaz faturanız yüksek geliyorsa peteklerde çamurlaşma ve hava birikmesi olabilir. Kombi bakımı ve petek temizliği ile %25'e varan yakıt tasarrufu sağlayın.",
    date: "15 Temmuz 2026",
    readTime: "8 Dk Okuma",
    category: "Kombi & Isıtma",
    icon: Thermometer,
    accent: "#F59E0B",
    img: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "camasir-makinesi-sikma-yapmiyor-neden",
    title: "Çamaşır Makinesi Sıkma Yapmıyor ve Su Boşaltmıyor: 5 Adımda Çözüm",
    desc: "Çamaşır makineniz suyu tahliye etmiyor veya kazan dönmüyorsa pompa filtresi tıkanıklığı veya kayış kopması olabilir. Adım adım kontrol rehberi.",
    date: "10 Temmuz 2026",
    readTime: "6 Dk Okuma",
    category: "Beyaz Eşya",
    icon: Wrench,
    accent: "#10B981",
    img: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "buzdolabi-sogutmuyor-motor-calisiyor",
    title: "Buzdolabı Neden Soğutmaz? Gaz Kaçağı ve Sensör Arızası Belirtileri",
    desc: "Buzdolabının dondurucu kısmı soğutuyor ama alt kısım ılık mı? Fan motoru, nTC sensör ve rezistans arızalarında yapılması gereken teknik müdahaleler.",
    date: "05 Temmuz 2026",
    readTime: "9 Dk Okuma",
    category: "Beyaz Eşya",
    icon: Droplets,
    accent: "#06B6D4",
    img: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "klima-sogutmuyor-neden",
    title: "Klima Soğutmuyor: En Sık 8 Neden ve Çözümü",
    desc: "Klima çalışıyor ama soğutmuyor mu? Gaz eksikliği, kirli filtre, termostat arızası veya kompresör problemi olabilir. Adım adım kontrol listesi ile sorunu tespit edin.",
    date: "01 Temmuz 2026",
    readTime: "11 Dk Okuma",
    category: "Arıza & Tanı",
    icon: Thermometer,
    accent: "#EF4444",
    img: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "bulasik-makinesi-temiz-yikamiyor",
    title: "Bulaşık Makinesi Bulaşıkları Lekeli ve Kirli Bırakıyor: Nedenleri",
    desc: "Fıskiye tıkanıklığı, deterjan gözü arızası ve rezistans kireçlenmesi bulaşıkların puslu çıkmasına neden olur. Çözüm yöntemleri ve bakım önerileri.",
    date: "25 Haziran 2026",
    readTime: "7 Dk Okuma",
    category: "Beyaz Eşya",
    icon: Wrench,
    accent: "#8B5CF6",
    img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "inverter-klima-ile-klasik-klima-farki",
    title: "İnverter Klima ile Klasik Klima Farkı: Hangisi Daha Ekonomik?",
    desc: "İnverter teknolojisi klimanın ne anlama geldiğini, elektrik faturasına etkisini ve uzun vadede maliyet karşılaştırmasını bu kapsamlı rehberle öğrenin.",
    date: "20 Haziran 2026",
    readTime: "14 Dk Okuma",
    category: "Enerji Tasarrufu",
    icon: Zap,
    accent: "#F59E0B",
    img: "https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "klima-montaji-nasil-yapilir",
    title: "Klima Montajı Nasıl Yapılır? Doğru Montaj İçin 10 Kural",
    desc: "Yanlış monte edilen klima enerji kaybına, su akıntısına ve erken arızaya yol açar. Uzman montaj ekibinin uyguladığı standartları ve sık yapılan hataları inceleyin.",
    date: "10 Haziran 2026",
    readTime: "6 Dk Okuma",
    category: "Montaj & Kurulum",
    icon: Wrench,
    accent: "#10B981",
    img: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800&q=80",
  }
];

const CATEGORIES = [
  { key: "Tümü",            icon: BookOpen,   color: "bg-[#0F172A] text-white border-[#0F172A]" },
  { key: "Bakım & Servis",  icon: Wrench,     color: "bg-[#0EA5E9]/10 text-[#0EA5E9] border-[#0EA5E9]/20" },
  { key: "Arıza & Tanı",    icon: Thermometer,color: "bg-red-50 text-red-600 border-red-200" },
  { key: "Kombi & Isıtma",  icon: Thermometer,color: "bg-amber-50 text-amber-600 border-amber-200" },
  { key: "Beyaz Eşya",      icon: Wrench,     color: "bg-emerald-50 text-emerald-600 border-emerald-200" },
  { key: "Enerji Tasarrufu",icon: Zap,        color: "bg-violet-50 text-violet-600 border-violet-200" },
  { key: "Montaj & Kurulum",icon: Wrench,     color: "bg-cyan-50 text-cyan-600 border-cyan-200" },
];

const ACCENT_CAT: Record<string, string> = {
  "Bakım & Servis":   "#0EA5E9",
  "Arıza & Tanı":     "#EF4444",
  "Gaz & Kimyasal":   "#8B5CF6",
  "Enerji Tasarrufu": "#F59E0B",
  "Montaj & Kurulum": "#10B981",
  "Marka & Model":    "#F97316",
};

const RANDOM_TIMES = ["4 Dk Okuma", "7 Dk Okuma", "11 Dk Okuma", "5 Dk Okuma", "9 Dk Okuma", "6 Dk Okuma", "14 Dk Okuma", "8 Dk Okuma", "12 Dk Okuma"];

const EASE = [0.25, 0.1, 0.25, 1] as const;

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [dynamicPosts, setDynamicPosts] = useState<Post[]>(POSTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/posts?t=" + Date.now(), { cache: "no-store" })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const nowStr = new Date().toISOString().split("T")[0];
          const active = data.filter(p => !p.date || p.date <= nowStr);
          const formatted: Post[] = active.map((p, idx) => ({
            slug: p.slug,
            title: p.title,
            desc: p.excerpt || p.desc || "",
            date: p.date ? p.date.split("-").reverse().join(" ") : "",
            readTime: p.readTime || RANDOM_TIMES[idx % RANDOM_TIMES.length],
            category: p.category || "Genel",
            icon: Snowflake,
            accent: ACCENT_CAT[p.category] || "#0EA5E9",
            img: p.imageUrl || POSTS[idx % POSTS.length].img,
          }));
          setDynamicPosts(formatted);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = dynamicPosts.filter(p => {
    const matchCat = selectedCategory === "Tümü" || p.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchQ = !q || p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q);
    return matchCat && matchQ;
  });

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] font-sans">
      <title>Blog & Rehberler | Sakarya Uzman Klima İklimlendirme</title>
      <meta name="description" content="Klima bakımı, arıza tespiti, gaz dolumu, BTU hesabı ve enerji tasarrufu hakkında uzman rehberler. Sakarya Uzman Klima bilgi merkezi." />

      {/* ─── HERO ─── */}
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
            <BookOpen className="w-4 h-4 animate-pulse" />
            Teknik Servis Bilgi Merkezi
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-black text-white uppercase leading-none text-4xl sm:text-5xl md:text-6xl tracking-tight mb-4"
          >
            Uzman Rehberler<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0EA5E9] to-[#38BDF8] mt-2 block">
              & Teknik Blog
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 font-semibold text-sm sm:text-base leading-relaxed max-w-2xl mx-auto"
          >
            Klima, Kombi, Çamaşır Makinesi, Bulaşık Makinesi, Buzdolabı ve Kurutma Makinesi arıza tespiti, bakımı ve tasarruf yöntemleri hakkında teknik ekibimizin rehberleri.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14 max-w-3xl mx-auto"
          >
            {[
              { val: "9",    label: "Uzman Rehber", icon: BookOpen },
              { val: "7/24", label: "Teknik Destek", icon: ShieldCheck },
              { val: "10+",  label: "Yıllık Deneyim", icon: Star },
              { val: "A+++", label: "Enerji Uzmanı", icon: Zap },
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

      {/* ─── FİLTRE + ARAMA (Kategoriler Yan Yana Dizili) ─── */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 pt-12 pb-8">
        <div className="flex flex-col lg:flex-row gap-5 items-start lg:items-center justify-between">
          
          {/* Yan Yana Dizili Kategori Butonları */}
          <div className="w-full lg:w-auto overflow-x-auto pb-2 scrollbar-none">
            <div className="flex flex-row items-center gap-2.5 min-w-max">
              {CATEGORIES.map(cat => {
                const Icon = cat.icon;
                const isActive = selectedCategory === cat.key;
                return (
                  <button
                    key={cat.key}
                    onClick={() => setSelectedCategory(cat.key)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border font-black text-xs uppercase tracking-wide cursor-pointer transition-all duration-200 shrink-0 ${
                      isActive ? cat.color + " shadow-sm" : "bg-white text-gray-500 border-gray-100 hover:border-gray-300 hover:text-gray-800"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    {cat.key}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Arama */}
          <div className="relative w-full lg:w-80 group shrink-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#0EA5E9] transition-colors" />
            <input
              type="text"
              placeholder="Rehberlerde ara..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-white border border-gray-100 focus:outline-none focus:border-[#0EA5E9] focus:ring-4 focus:ring-sky-500/5 text-gray-800 font-semibold text-xs transition-all shadow-xs placeholder-gray-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ─── YAZI GRİDİ (RESİMLİ KARTLAR) ─── */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 pb-24">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(n => (
              <div key={n} className="bg-white rounded-[28px] overflow-hidden p-6 space-y-4 animate-pulse border border-gray-100">
                <div className="w-full h-48 bg-gray-100 rounded-2xl" />
                <div className="h-4 bg-gray-100 rounded w-1/3" />
                <div className="h-6 bg-gray-100 rounded w-5/6" />
                <div className="h-4 bg-gray-100 rounded w-full" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-24 text-center bg-white rounded-[32px] border border-gray-100 max-w-xl mx-auto"
          >
            <Snowflake className="w-12 h-12 text-[#0EA5E9]/30 mx-auto mb-4" />
            <h3 className="font-black text-gray-900 uppercase text-sm tracking-wider">Yazı Bulunamadı</h3>
            <p className="text-gray-400 mt-2 font-semibold text-xs sm:text-sm">
              Arama teriminize veya kategoriye uygun makale bulunamadı.
            </p>
            <button
              onClick={() => { setSearchQuery(""); setSelectedCategory("Tümü"); }}
              className="mt-6 px-6 py-3 bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-black uppercase tracking-widest text-xs rounded-xl transition-all cursor-pointer"
            >
              Filtreleri Sıfırla
            </button>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${searchQuery}-${selectedCategory}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              {/* Featured post — resimli büyük kart */}
              {featured && selectedCategory === "Tümü" && !searchQuery && (
                <Link href={`/blog/${featured.slug}`} className="block mb-8 group">
                  <div className="bg-white border border-gray-100 rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="flex flex-col lg:flex-row">
                      {/* Görsel Alanı */}
                      <div className="lg:w-1/2 h-64 lg:h-auto relative overflow-hidden bg-gray-100 shrink-0">
                        <img
                          src={featured.img}
                          alt={featured.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:hidden" />
                        <span
                          className="absolute top-4 left-4 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest px-3.5 py-1.5 rounded-xl border shadow-md bg-white/90 backdrop-blur-md"
                          style={{ color: featured.accent, borderColor: featured.accent + "40" }}
                        >
                          <featured.icon className="w-3.5 h-3.5" />
                          {featured.category} — Öne Çıkan
                        </span>
                      </div>
                      {/* Açıklama Paneli */}
                      <div className="lg:w-1/2 p-8 md:p-10 flex flex-col justify-between">
                        <div className="space-y-4">
                          <div className="flex items-center gap-4 text-gray-400 text-[10px] font-bold uppercase tracking-wider">
                            <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-[#0EA5E9]" />{featured.date}</span>
                            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-[#0EA5E9]" />{featured.readTime}</span>
                          </div>
                          <h2 className="font-black text-gray-900 text-xl md:text-2xl lg:text-3xl uppercase tracking-tight leading-tight group-hover:text-[#0EA5E9] transition-colors">
                            {featured.title}
                          </h2>
                          <p className="text-gray-500 font-semibold text-sm leading-relaxed line-clamp-3">
                            {featured.desc}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 mt-8 font-black text-[#0EA5E9] uppercase tracking-widest text-xs group-hover:translate-x-1 transition-transform">
                          Yazıyı Oku <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              )}

              {/* Grid cards — Resimli Kart Dizilimi */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {(selectedCategory === "Tümü" && !searchQuery ? rest : filtered).map((post, idx) => {
                  const Icon = post.icon;
                  return (
                    <motion.article
                      key={post.slug}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: idx * 0.04, ease: EASE }}
                    >
                      <Link
                        href={`/blog/${post.slug}`}
                        className="group flex flex-col justify-between bg-white border border-gray-100 rounded-[28px] overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 shadow-xs h-full block"
                      >
                        {/* Kapak Görseli */}
                        <div className="w-full h-48 relative overflow-hidden bg-gray-100">
                          <img
                            src={post.img}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-60" />
                          <span
                            className="absolute top-3 left-3 inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg border bg-white/90 backdrop-blur-md shadow-sm"
                            style={{ color: post.accent, borderColor: post.accent + "40" }}
                          >
                            <Icon className="w-3 h-3" />
                            {post.category}
                          </span>
                        </div>

                        {/* Kart Gövdesi */}
                        <div className="p-6 flex flex-col justify-between flex-1">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between text-gray-400 text-[9px] font-bold uppercase tracking-wider">
                              <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-[#0EA5E9]" />{post.date}</span>
                              <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-[#0EA5E9]" />{post.readTime}</span>
                            </div>

                            {/* Başlık */}
                            <h3 className="font-black text-gray-900 text-sm md:text-base uppercase tracking-tight leading-snug line-clamp-2 group-hover:text-[#0EA5E9] transition-colors">
                              {post.title}
                            </h3>

                            {/* Özet */}
                            <p className="text-gray-500 text-xs font-semibold leading-relaxed line-clamp-3">
                              {post.desc}
                            </p>
                          </div>

                          {/* Footer */}
                          <div className="flex items-center justify-between pt-4 mt-5 border-t border-gray-50">
                            <span
                              className="flex items-center gap-1 font-black text-[10px] uppercase tracking-wider group-hover:translate-x-1 transition-transform"
                              style={{ color: post.accent }}
                            >
                              Yazıyı Oku <ArrowRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </div>
                      </Link>
                    </motion.article>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </section>

      {/* ─── ALT CTA ─── */}
      <section className="border-t border-gray-100 bg-white py-16">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 text-[#0EA5E9] font-black text-xs uppercase tracking-widest">
              <CheckCircle2 className="w-4 h-4" />
              Sorularınız mı Var?
            </div>
            <h2 className="font-black text-gray-900 text-2xl md:text-3xl uppercase tracking-tight">
              Uzman Ekibimize<br />
              <span className="text-[#0EA5E9]">Hemen Danışın</span>
            </h2>
            <p className="text-gray-500 font-semibold text-sm leading-relaxed">
              Klima, Kombi veya Beyaz Eşyanız hakkında aklınıza takılan tüm teknik soruları uzman teknisyenlerimize sorabilir,
              ücretsiz ön tanı ve fiyat teklifi alabilirsiniz.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href="tel:08500000000"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-[#0EA5E9] text-white font-black uppercase tracking-wider text-xs hover:bg-[#0284C7] hover:-translate-y-0.5 transition-all shadow-lg shadow-sky-500/20"
            >
              0850 000 00 00
            </a>
            <Link
              href="/iletisim"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-[#0F172A] text-white font-black uppercase tracking-wider text-xs hover:bg-[#0F172A]/80 transition-all hover:-translate-y-0.5"
            >
              Fiyat Teklifi Al <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
