"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2, ArrowRight, ShieldCheck, HeartPulse, GraduationCap,
  Factory, CheckCircle, Sparkles, Star, Award, ChevronRight,
  Snowflake, Users, Phone, Zap
} from "lucide-react";
import { REFERENCES as INITIAL_REFERENCES } from "@/data/references";

interface Reference {
  logo: string;
  name: string;
  category: "kamu-saglik" | "egitim" | "ozel";
  tag: string;
}

function ReferansCard({ refItem, idx }: { refItem: Reference; idx: number }) {
  const [imgError, setImgError] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.35, delay: idx * 0.03 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-white rounded-[32px] border border-gray-100 p-7 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between h-56 relative group overflow-hidden"
    >
      {/* Glow effect on hover */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10"
          style={{
            background: `radial-gradient(240px circle at ${coords.x}px ${coords.y}px, rgba(14, 165, 233, 0.08), transparent 80%)`,
          }}
        />
      )}

      {/* Tag Badge */}
      <div className="flex items-center justify-between relative z-20">
        <span className="text-[9px] font-black uppercase tracking-widest text-[#0EA5E9] bg-[#0EA5E9]/10 px-3 py-1.5 rounded-xl border border-[#0EA5E9]/20">
          {refItem.tag}
        </span>
        <CheckCircle className="w-4 h-4 text-emerald-500 opacity-80" />
      </div>

      {/* Logo frame with text fallback */}
      <div className="flex-1 flex items-center justify-center w-full px-2 relative z-20 my-2" suppressHydrationWarning>
        {!imgError && refItem.logo ? (
          <img 
            src={refItem.logo} 
            alt={refItem.name} 
            onError={() => setImgError(true)}
            suppressHydrationWarning
            className="max-w-full max-h-[75px] object-contain group-hover:scale-105 transition-transform duration-500" 
            loading="lazy"
          />
        ) : (
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0EA5E9]/20 to-sky-100 flex items-center justify-center text-[#0EA5E9] font-black text-xl border border-[#0EA5E9]/30">
            {refItem.name.charAt(0)}
          </div>
        )}
      </div>

      {/* Reference Title */}
      <div className="border-t border-gray-50 pt-3 relative z-20 text-center">
        <span className="text-xs font-black text-gray-800 uppercase tracking-tight line-clamp-1 block group-hover:text-[#0EA5E9] transition-colors">
          {refItem.name}
        </span>
      </div>
    </motion.div>
  );
}

export default function ReferencesClientPage() {
  const [filter, setFilter] = useState<"ALL" | "kamu-saglik" | "egitim" | "ozel">("ALL");
  const [referencesList, setReferencesList] = useState<Reference[]>(INITIAL_REFERENCES);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetch("/api/admin/files?file=references.ts&t=" + Date.now(), { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.content) {
          const content = data.content;
          const start = content.indexOf('[');
          const end = content.lastIndexOf(']');
          if (start !== -1 && end !== -1) {
            const jsArrayText = content.substring(start, end + 1);
            const parsed = new Function(`return ${jsArrayText};`)();
            if (Array.isArray(parsed)) {
              setReferencesList(parsed);
            }
          }
        }
      })
      .catch((err) => console.error("Error loading dynamic references:", err));
  }, []);

  const filteredReferences = useMemo(() => {
    return referencesList.filter(ref => filter === "ALL" || ref.category === filter);
  }, [referencesList, filter]);

  const categoryCounts = useMemo(() => ({
    ALL: referencesList.length,
    "kamu-saglik": referencesList.filter(r => r.category === "kamu-saglik").length,
    egitim: referencesList.filter(r => r.category === "egitim").length,
    ozel: referencesList.filter(r => r.category === "ozel").length,
  }), [referencesList]);

  return (
    <div className="bg-[#F8FAFC] min-h-screen text-[#1E293B] font-sans">
      <title>Kurumsal Referanslarımız | Sakarya Uzman Klima İklimlendirme</title>
      <meta name="description" content="Sakarya'nın öncü kamu kurumları, belediyeleri, üniversiteleri ve sanayi kuruluşlarından oluşan geniş klima servis ve iklimlendirme referans portföyümüz." />

      {/* ━━━ HERO SECTION ━━━ */}
      <section className="bg-[#0F172A] text-white pt-36 pb-24 relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-topo-waves pointer-events-none opacity-30" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#0EA5E9]/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#0EA5E9] font-black text-xs tracking-widest uppercase mb-6"
          >
            <Snowflake className="w-4 h-4 animate-spin-slow" />
            Kurumsal Güven & Referanslar
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-black text-white uppercase leading-none text-4xl sm:text-5xl md:text-7xl tracking-tight mb-4"
          >
            Güçlü İş Birlikleri<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0EA5E9] to-[#38BDF8]">
              & Referanslarımız
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 font-semibold text-sm sm:text-base leading-relaxed max-w-2xl mx-auto"
          >
            Sakarya genelindeki hastaneler, belediyeler, üniversiteler, organize sanayi bölgeleri ve kurumsal plazaslar iklimlendirme ve klima çözümlerinde Sakarya Uzman Klima kalitesine güvenmektedir.
          </motion.p>

          {/* Key Stat Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14 max-w-4xl mx-auto"
          >
            {[
              { val: "150+", label: "Kurumsal Proje", icon: Building2 },
              { val: "500+", label: "VRF/VRV Ünitesi", icon: Zap },
              { val: "%99.4", label: "Müşteri Memnuniyeti", icon: Star },
              { val: "10+", label: "Yıllık Tecrübe", icon: Award },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-xl bg-[#0EA5E9]/15 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-[#0EA5E9]" />
                  </div>
                  <div>
                    <div className="font-black text-white text-lg leading-none">{s.val}</div>
                    <div className="text-white/45 text-[9px] uppercase tracking-widest font-black mt-1">{s.label}</div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ━━━ KATALOG FİLTRELERİ ━━━ */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 pt-16 pb-10">
        <div className="flex flex-wrap justify-center gap-3 bg-white border border-gray-100 p-2.5 rounded-[28px] shadow-sm max-w-3xl mx-auto">
          {[
            { key: "ALL",          label: "Tüm Sektörler", icon: Building2, count: categoryCounts.ALL },
            { key: "kamu-saglik",  label: "Kamu & Sağlık",  icon: HeartPulse,count: categoryCounts["kamu-saglik"] },
            { key: "egitim",       label: "Eğitim",         icon: GraduationCap, count: categoryCounts.egitim },
            { key: "ozel",         label: "Sanayi & Özel",  icon: Factory,   count: categoryCounts.ozel },
          ].map(cat => {
            const Icon = cat.icon;
            const isActive = filter === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setFilter(cat.key as any)}
                className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl font-black uppercase text-xs tracking-wider transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#0EA5E9] text-white shadow-lg shadow-sky-500/20"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{cat.label}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${isActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"}`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ━━━ REFERANS LOGO GRİDİ ━━━ */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 pb-24" suppressHydrationWarning>
        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" suppressHydrationWarning>
          <AnimatePresence mode="popLayout">
            {filteredReferences.map((refItem, idx) => (
              <ReferansCard key={refItem.name} refItem={refItem} idx={idx} />
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* ━━━ NEDEN KURUMSAL SERVİS SÖZLEŞMESİ? ━━━ */}
      <section className="bg-white border-t border-b border-gray-100 py-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="flex justify-center mb-2">
              <Snowflake className="w-8 h-8 text-[#0EA5E9] animate-spin-slow" />
            </div>
            <span className="text-[#0EA5E9] font-black text-xs uppercase tracking-widest block mb-2">Kurumsal Çözümler</span>
            <h2 className="font-black text-gray-900 text-2xl md:text-4xl uppercase tracking-tight">
              Kurumlar Neden Sakarya Uzman Klima&apos;yı Seçiyor?
            </h2>
            <div className="w-12 h-1.5 bg-[#0EA5E9] mx-auto rounded-full mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#F8FAFC] border border-gray-100 p-8 rounded-[32px] space-y-4 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-[#0EA5E9]/10 rounded-2xl flex items-center justify-center text-[#0EA5E9]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-black text-gray-900 text-lg uppercase tracking-tight">ISO & MYK Belgeli Standartlar</h3>
              <p className="text-gray-500 text-xs sm:text-sm font-semibold leading-relaxed">
                Tüm teknik personelimiz klima üreticilerinin orijinal standartlarına uygun sertifikalara sahiptir. Montaj, borulama ve gaz dolumlarında sıfır hata prensibiyle hareket edilir.
              </p>
            </div>

            <div className="bg-[#F8FAFC] border border-gray-100 p-8 rounded-[32px] space-y-4 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-[#0EA5E9]/10 rounded-2xl flex items-center justify-center text-[#0EA5E9]">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="font-black text-gray-900 text-lg uppercase tracking-tight">7/24 Öncelikli Mobil Servis</h3>
              <p className="text-gray-500 text-xs sm:text-sm font-semibold leading-relaxed">
                Sözleşmeli kurumsal müşterilerimize acil klima arızalarında en geç 45 dakika içerisinde müdahale garantisi veriyoruz. Üretim veya hizmet aksaması yaşanmaz.
              </p>
            </div>

            <div className="bg-[#F8FAFC] border border-gray-100 p-8 rounded-[32px] space-y-4 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-[#0EA5E9]/10 rounded-2xl flex items-center justify-center text-[#0EA5E9]">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-black text-gray-900 text-lg uppercase tracking-tight">Yıllık Bakım Anlaşmaları</h3>
              <p className="text-gray-500 text-xs sm:text-sm font-semibold leading-relaxed">
                Periyodik filtre dezenfeksiyonu, ilaçlı serpantin temizliği ve gaz kontrolleri ile iklimlendirme sisteminizin enerji tüketimi %30 düşürülür.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ ALT CTA ━━━ */}
      <section className="py-20 max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="bg-[#0F172A] rounded-[36px] p-10 md:p-14 text-white relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="absolute inset-0 bg-topo-waves pointer-events-none opacity-40" />
          <div className="space-y-4 text-center lg:text-left relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#0EA5E9] font-black text-xs uppercase tracking-widest">
              <Users className="w-4 h-4" /> Kurumsal Teklif Alın
            </span>
            <h2 className="font-black text-white text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight">
              Kurumunuz İçin İklimlendirme Çözümleri
            </h2>
            <p className="text-gray-300 font-semibold text-xs sm:text-sm leading-relaxed">
              İşyeriniz, fabrikanız veya binalarınız için periyodik klima bakım anlaşması veya toplu montaj teklifi almak için kurumsal müşteri temsilcilerimizle iletişime geçin.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 relative z-10 shrink-0">
            <a
              href="tel:08500000000"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-[#0EA5E9] text-white font-black uppercase tracking-wider text-xs hover:bg-[#0284C7] transition-all shadow-lg shadow-sky-500/20"
            >
              <Phone className="w-4 h-4" /> 0850 000 00 00
            </a>
            <Link
              href="/iletisim"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white text-gray-900 font-black uppercase tracking-wider text-xs hover:bg-gray-100 transition-all"
            >
              İletişime Geçin <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
