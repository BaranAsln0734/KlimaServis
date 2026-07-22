"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, 
  Cpu,
  ShieldCheck,
  Activity,
  ArrowRight,
  Calculator,
  Wrench,
  Check,
  Clock,
  Snowflake
} from "lucide-react";

interface SectorItem {
  title: string;
  slug: string;
  code: string;
  icon: React.ComponentType<{ className?: string }>;
  image: string;
  desc: string;
  items: string[];
}

const SECTORS: SectorItem[] = [
  {
    title: "Klima Arıza Servisi",
    slug: "ariza-servis-7-24",
    code: "SERV-01",
    icon: Wrench,
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop",
    desc: "Klimanızda oluşan elektronik arızalar, kompresör problemleri, kart arızaları ve su akıtma gibi sorunlara aynı gün yerinde müdahale.",
    items: [
      "7/24 Mobil Acil Teknik Servis Ekipleri",
      "Kapsamlı Elektronik & Mekanik Arıza Teşhisi",
      "Anakart, Sensör ve Kompresör Onarımı",
      "1 Yıl Garantili Orijinal Yedek Parça Değişimi"
    ]
  },
  {
    title: "Klima Periyodik Bakımı",
    slug: "periyodik-kontrol",
    code: "SERV-02",
    icon: ShieldCheck,
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=800&auto=format&fit=crop",
    desc: "Cihazınızın ömrünü uzatan, enerji tüketimini düşüren ve sağlığınızı koruyan hijyenik ilaçlama ve temizlik bakımları.",
    items: [
      "Evaporatör & Serpantin İlaçlı Yıkama",
      "Dış Ünite Yüksek Basınçlı Kondanser Temizliği",
      "Toz ve Antibakteriyel Filtre Dezenfeksiyonu",
      "Soğutucu Gaz Basıncı ve Akım Değerleri Testi"
    ]
  },
  {
    title: "Klima Montaj & Deplase",
    slug: "klima-montaj",
    code: "SERV-03",
    icon: Cpu,
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=800&auto=format&fit=crop",
    desc: "Split, kaset, salon tipi ve VRF ünitelerinin mühendislik standartlarına tam uyumlu profesyonel montaj ve söküm süreçleri.",
    items: [
      "Nizami Bakır Borulama & Estetik Kanal Altyapısı",
      "Gaz Toplama Yöntemiyle Kayıpsız Klima Sökümü",
      "Hassas Terazili Montaj & Titreşim Engelleyici Takozlar",
      "Sistem Vakumlama ile Oksidasyon Engelleme"
    ]
  },
  {
    title: "Gaz Dolumu & BTU Keşfi",
    slug: "gaz-dolumu",
    code: "SERV-04",
    icon: Zap,
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=800&auto=format&fit=crop",
    desc: "Gazı eksilen klimaların kaçak tespiti, azot testi, çevre dostu R32 gaz şarjı ve odanıza uygun kapasite (BTU) analizi.",
    items: [
      "Hassas Azot Testi & Gaz Kaçak Tespiti",
      "Çevre Dostu R32 ve R410A Gaz Şarjı",
      "Oda Hacmine & Güneş Açılarına Göre BTU Hesabı",
      "Çalışma Basınçlarının ve Kompresör Yükünün Testi"
    ]
  }
];

function HizmetCard({ sec, idx }: { sec: SectorItem; idx: number }) {
  const Icon = sec.icon;
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div 
      layout
      key={idx}
      className="bg-white rounded-[32px] overflow-hidden border border-gray-200/60 shadow-sm hover:shadow-2xl hover:translate-y-[-6px] transition-all duration-500 flex flex-col justify-between group relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: idx * 0.08 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Light spotlight effect */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10"
          style={{
            background: `radial-gradient(300px circle at ${coords.x}px ${coords.y}px, rgba(14, 165, 233, 0.06), transparent 80%)`,
          }}
        />
      )}

      <div>
        {/* Image header */}
        <div className="relative h-60 w-full bg-gray-50 overflow-hidden">
          <Image
            src={sec.image}
            alt={sec.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={idx < 2}
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            unoptimized={true}
          />
          {/* Service code badge */}
          <div className="absolute top-4 left-4 px-3 py-1.5 rounded-xl bg-black/60 text-[#0EA5E9] text-[10px] font-black tracking-widest uppercase backdrop-blur-md shadow-md flex items-center gap-1.5">
            <Icon className="w-3.5 h-3.5" />
            {sec.code}
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-5 relative z-20">
          <div className="space-y-2">
            <h3 className="font-black text-gray-950 uppercase tracking-tight text-lg sm:text-xl group-hover:text-[#0EA5E9] transition-colors leading-snug">
              {sec.title}
            </h3>
            <p className="text-gray-500 text-xs sm:text-sm font-semibold leading-relaxed">
              {sec.desc}
            </p>
          </div>
          
          <ul className="space-y-2.5 text-gray-500 font-semibold text-xs sm:text-sm">
            {sec.items.map((item: string, itemIdx: number) => (
              <li key={itemIdx} className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-650 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Detail link button */}
      <div className="p-8 pt-0 relative z-20">
        <div className="pt-5 border-t border-gray-100">
          <Link
            href={`/hizmetler/${sec.slug}`}
            className="flex items-center justify-between text-xs font-black uppercase text-[#0EA5E9] hover:text-[#0284C7] tracking-wider group/link transition-colors"
          >
            <span>Detayları İncele</span>
            <div className="p-2 rounded-xl bg-gray-50 group-hover/link:bg-[#0EA5E9]/10 transition-colors">
              <ArrowRight className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function Hizmetler() {
  return (
    <div className="py-24 md:py-36 bg-[#F8F9FA] overflow-hidden font-sans pt-[134px]">
      
      {/* Decorative gradients & Organic Blobs */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#0EA5E9]/10 via-transparent to-transparent pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-[-10%] w-[550px] h-[550px] bg-[#0EA5E9]/5 blur-[130px] rounded-full pointer-events-none -z-10 animate-organic-blob" />
      <div className="absolute bottom-1/3 left-[-10%] w-[550px] h-[550px] bg-[#0EA5E9]/3 blur-[130px] rounded-full pointer-events-none -z-10 animate-organic-blob-reverse" />
      <div className="absolute inset-0 bg-topo-waves opacity-20 pointer-events-none -z-10" />

      {/* 1. Page Header */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 text-center mb-16 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="flex justify-center mb-2">
            <Snowflake className="w-10 h-10 text-[#0EA5E9] animate-spin-slow opacity-90" />
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-xs text-[#0EA5E9] font-black text-xs tracking-widest uppercase">
            <Clock className="w-4 h-4 animate-pulse" />
            7/24 Hızlı Mobil Servis
          </div>
          <h1 className="font-black text-gray-900 tracking-tight uppercase leading-none text-4xl sm:text-5xl md:text-7xl">
            Faaliyet <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0EA5E9] to-[#0284C7] mt-2 block">
              Alanlarımız
            </span>
          </h1>
          <div className="w-20 h-1.5 bg-[#0EA5E9] mx-auto mt-6 rounded-full" />
          <p className="text-gray-500 max-w-3xl mx-auto mt-6 leading-relaxed font-semibold text-sm sm:text-base">
            Sakarya Uzman Klima İklimlendirme Servisi, geniş servis araç filosu ve her biri alanında uzman teknik kadrosuyla klimanızın ilk günkü verimle çalışması için profesyonel çözümler sunmaktadır.
          </p>
        </motion.div>
      </section>

      {/* 2. Sectors Grid */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 mb-28">
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {SECTORS.map((sec, idx) => (
              <HizmetCard key={sec.slug} sec={sec} idx={idx} />
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* 3. Unique Teaser Box (Klima BTU Hesaplama Aracı) */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white border border-gray-200/60 p-8 sm:p-12 rounded-[40px] shadow-sm relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8"
        >
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#0EA5E9]/5 blur-[120px] rounded-full pointer-events-none" />
          <div className="space-y-3 max-w-2xl text-center lg:text-left relative z-10">
            <span className="px-3.5 py-1 bg-[#0EA5E9]/10 text-[#0EA5E9] text-[10px] font-black uppercase tracking-widest rounded-full inline-block border border-[#0EA5E9]/20">
              Kapasite Analizi
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 uppercase tracking-tight leading-none">
              Odanız İçin Hangi BTU Klima Gerekli?
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm font-semibold leading-relaxed">
              Odanızın metrekaresini, konumunu ve binanızın yalıtım durumunu hesaplama aracımızla analiz edin, yaşam alanınıza en uygun BTU klima kapasitesini saniyeler içinde öğrenin.
            </p>
          </div>
          <div className="flex shrink-0 w-full lg:w-auto justify-center relative z-10">
            <Link
              href="/guc-ihtiyac-analizi"
              className="shrink-0 flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gray-900 hover:bg-black text-white font-black uppercase tracking-wider transition-all duration-300 text-xs sm:text-sm shadow-md"
            >
              BTU Kapasite Analizi <Calculator className="w-4 h-4 text-[#0EA5E9]" />
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
