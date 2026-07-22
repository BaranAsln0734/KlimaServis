"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, TrendingUp, ShieldCheck, Activity, Cpu, Lightbulb, Zap, Calendar, Award, CheckCircle2, ArrowRight } from "lucide-react";

const VALUES = [
  {
    title: "Konfor ve Süreklilik",
    desc: "Evler, ofisler ve endüstriyel alanlar başta olmak üzere yaşam alanlarınızdaki ideal iklimlendirme konforunu, 7/24 kesintisiz saha teknik servis desteğimizle güvence altına alıyoruz.",
    icon: Activity,
    color: "from-sky-400 to-blue-600"
  },
  {
    title: "Güven ve Şeffaflık",
    desc: "Sakarya Uzman Klima olarak, klima montajı, periyodik bakım, gaz şarjı ve arıza onarım işlemlerimizin her aşamasında şeffaf fiyatlandırmayı ve teknik dürüstlüğü esas alıyoruz.",
    icon: ShieldCheck,
    color: "from-teal-400 to-emerald-600"
  },
  {
    title: "Teknik Derinlik",
    desc: "Sektördeki tüm global ve yerli klima markalarının split, kaset, VRF/VRV ve merkezi Chiller sistemlerine hakim, TSE standartlarında belgelendirilmiş profesyonel ekiplerle hizmet veriyoruz.",
    icon: Cpu,
    color: "from-blue-500 to-indigo-600"
  },
  {
    title: "Çevreye Saygı",
    desc: "Yeni nesil çevre dostu R32 gaz uygulamaları, yüksek enerji verimliliği sağlayan inverter klima montajları ve enerji tasarruf analizleriyle sürdürülebilir bir gelecek için çalışıyoruz.",
    icon: Lightbulb,
    color: "from-cyan-400 to-sky-600"
  }
];

const STATS = [
  { value: "10+", label: "Yıllık Tecrübe", icon: Calendar, description: "Sektörel Birikim" },
  { value: "3000+", label: "Mutlu Müşteri", icon: Zap, description: "Güvenli İş Ortaklığı" },
  { value: "7/24", label: "Acil Destek Hattı", icon: Activity, description: "Kesintisiz İletişim" },
  { value: "16", label: "Hizmet Bölgesi", icon: Compass, description: "Tüm Sakarya İlçeleri" }
];

export default function AboutClientPage() {
  const [activeTab, setActiveTab] = useState<"misyon" | "vizyon" | "kalite">("misyon");

  return (
    <div className="bg-[#F8F9FA] text-[#1E293B] min-h-screen relative overflow-hidden font-sans pt-[134px]">
      
      {/* Dynamic Background Blobs */}
      <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-[#0EA5E9]/5 blur-[140px] rounded-full pointer-events-none animate-organic-blob -z-10" />
      <div className="absolute bottom-[30%] left-[-10%] w-[600px] h-[600px] bg-sky-300/4 blur-[140px] rounded-full pointer-events-none animate-organic-blob-reverse -z-10" />

      {/* 1. HERO HEADER (Cinematic & Atmospheric) */}
      <section className="bg-[#0F172A] text-white py-28 relative overflow-hidden -mt-[134px] pt-[220px] border-b border-white/5">
        <div className="absolute inset-0 bg-topo-waves pointer-events-none opacity-40" />
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-[#0EA5E9]/10 blur-[130px] rounded-full pointer-events-none animate-organic-blob" />
        
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
          <div className="max-w-4xl space-y-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 shadow-md text-[#0EA5E9] font-black text-xs tracking-widest uppercase"
            >
              <Award className="w-4 h-4 text-[#0EA5E9] animate-pulse" />
              10 YILLIK UZMANLIK & GÜVENCE
            </motion.div>
            
            <h1 className="font-black text-white tracking-tight uppercase text-4xl sm:text-5xl md:text-7xl leading-[0.95]">
              Yaşam Alanlarınıza <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0EA5E9] to-[#0284C7]">
                Konfor ve Ferahlık
              </span> <br />
              Katıyoruz
            </h1>
            <div className="w-20 h-1.5 bg-[#0EA5E9] rounded-full" />
            <p className="text-gray-300 text-sm sm:text-lg leading-relaxed max-w-2xl font-medium">
              Sakarya Uzman Klima İklimlendirme Servisi olarak, konut ve ticari alanlarınızın mevsim şartlarından bağımsız, her zaman ideal sıcaklıkta kalması için dünya standartlarında mühendislik çözümleri sunuyoruz.
            </p>
          </div>
        </div>
      </section>

      {/* 2. OVERLAPPING GLASS STATS BANNER */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 -translate-y-12 relative z-20">
        <div className="bg-white/80 backdrop-blur-xl border border-gray-200/50 p-8 md:p-10 rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.03)] grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y-2 lg:divide-y-0 lg:divide-x divide-gray-100">
          {STATS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                key={idx}
                className="flex flex-col items-center lg:items-start text-center lg:text-left justify-center pt-6 lg:pt-0 lg:px-8 first:pt-0 first:pl-0"
              >
                <div className="w-10 h-10 rounded-2xl bg-[#0EA5E9]/10 text-[#0EA5E9] flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight leading-none">{stat.value}</h3>
                <h4 className="text-gray-950 font-bold text-xs sm:text-sm uppercase tracking-wider mt-2">{stat.label}</h4>
                <p className="text-gray-400 text-[10px] sm:text-xs font-semibold block mt-0.5">{stat.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 3. NARRATIVE PRESENTATION & INTERACTIVE STACK */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 mb-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Narrative Info (Left Column) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <span className="text-[#0EA5E9] font-black uppercase tracking-widest block text-xs md:text-sm">Sakarya Uzman Klima İklimlendirme Servisi</span>
              <h2 className="font-black text-gray-900 tracking-tight uppercase text-3xl sm:text-5xl leading-none">
                İklimlendirme ve Konforun <br />Güvenilir Adresi
              </h2>
            </div>
            
            <p className="font-semibold text-gray-700 text-base sm:text-lg leading-relaxed">
              10 yılı aşkın sektörel tecrübemiz ile Sakarya merkezli olarak hizmet sunan Sakarya Uzman Klima; Adapazarı, Serdivan, Sapanca başta olmak üzere şehrin 16 ilçesinde 7/24 hızlı mobil servis ekibiyle klima montajı, bakımı ve arıza onarımında profesyonel çözüm ortağınızdır.
            </p>
            
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed font-semibold">
              Sektördeki tüm lider klima markalarında (Daikin, Mitsubishi Electric, Samsung, LG, Arçelik, Vestel, Bosch, Toshiba, Beko vb.) orijinal yedek parça desteği, profesyonel BTU keşfi, bakır borulama, R32 çevre dostu gaz dolumu ve garantili kompresör onarımı yapmaktayız. Evinizde ve iş yerinizde konforun kesintisiz sürmesi en büyük önceliğimizdir.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-3 p-4 bg-white border border-gray-150 rounded-2xl shadow-xs">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-gray-800">TSE Hizmet Yeterlilik Standartları</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white border border-gray-150 rounded-2xl shadow-xs">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-gray-800">1 Yıl Servis & İşçilik Garantisi</span>
              </div>
            </div>
          </div>

          {/* Premium Image Composite Stack (Right Column) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Morphing Blob behind the stack */}
            <div className="absolute w-[450px] h-[450px] bg-sky-400/5 blur-[100px] rounded-full pointer-events-none animate-organic-blob" />
            
            <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-[48px] overflow-hidden shadow-2xl border border-gray-200/50 group z-10">
              <Image
                src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop"
                alt="Sakarya Uzman Klima Teknik Servis Ekipleri"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
                unoptimized={true}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              
              {/* Floating Overlap Glass Badge */}
              <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/90 backdrop-blur-md border border-white/20 rounded-3xl shadow-xl flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#0EA5E9] text-white flex items-center justify-center shrink-0 shadow-lg shadow-sky-500/20">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-black text-gray-900 text-sm">Resmi Standartlarda Hizmet</h4>
                  <p className="text-gray-500 text-xs font-semibold mt-0.5">Mühendislik esaslı servis güvencesi.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. CINEMATIC DARK GLASS TABS SECTION */}
      <section className="py-24 bg-[#0F172A] text-white relative overflow-hidden border-t border-b border-white/5 mb-28">
        {/* Glowing Blobs inside Dark Area */}
        <div className="absolute top-[10%] right-[-5%] w-[500px] h-[500px] bg-[#0EA5E9]/6 blur-[140px] pointer-events-none animate-organic-blob z-0" />
        <div className="absolute bottom-[10%] left-[-5%] w-[500px] h-[500px] bg-sky-500/4 blur-[140px] pointer-events-none animate-organic-blob-reverse z-0" />
        <div className="absolute inset-0 bg-topo-waves pointer-events-none opacity-30 z-0" />
        
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Interactive Tab Selectors */}
            <div className="lg:col-span-4 flex flex-col justify-center space-y-4">
              <span className="text-[#0EA5E9] font-black uppercase tracking-widest text-xs md:text-sm block">VİZYON & YÖNÜMÜZ</span>
              <h2 className="font-black text-white tracking-tight uppercase text-3xl sm:text-4xl leading-tight">
                Geleceğe Güvenle <br />Bakıyoruz
              </h2>
              <div className="w-12 h-1 bg-[#0EA5E9] rounded-full mb-6" />
              
              <div className="space-y-3">
                <button
                  onClick={() => setActiveTab("misyon")}
                  className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-wider transition-all duration-300 border text-left cursor-pointer ${
                    activeTab === "misyon"
                      ? "bg-[#0EA5E9] border-[#0EA5E9] text-white shadow-xl shadow-sky-500/20"
                      : "bg-white/5 border-white/10 text-white/55 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Compass className="w-5 h-5 shrink-0" />
                  Misyonumuz
                </button>
                <button
                  onClick={() => setActiveTab("vizyon")}
                  className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-wider transition-all duration-300 border text-left cursor-pointer ${
                    activeTab === "vizyon"
                      ? "bg-[#0EA5E9] border-[#0EA5E9] text-white shadow-xl shadow-sky-500/20"
                      : "bg-white/5 border-white/10 text-white/55 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <TrendingUp className="w-5 h-5 shrink-0" />
                  Vizyonumuz
                </button>
                <button
                  onClick={() => setActiveTab("kalite")}
                  className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-wider transition-all duration-300 border text-left cursor-pointer ${
                    activeTab === "kalite"
                      ? "bg-[#0EA5E9] border-[#0EA5E9] text-white shadow-xl shadow-sky-500/20"
                      : "bg-white/5 border-white/10 text-white/55 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <ShieldCheck className="w-5 h-5 shrink-0" />
                  Kalite Politikamız
                </button>
              </div>
            </div>

            {/* Details Content Box */}
            <div className="lg:col-span-8 bg-white/5 border border-white/10 p-8 sm:p-12 rounded-[40px] shadow-2xl backdrop-blur-md flex items-center">
              <AnimatePresence mode="wait">
                {activeTab === "misyon" && (
                  <motion.div
                    key="misyon"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-6"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-[#0EA5E9]/10 text-[#0EA5E9] flex items-center justify-center">
                      <Compass className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">İdeal İklimlendirme Standartları</h3>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-medium">
                      Sakarya ve çevre illerdeki konut ve ticari alanların, iklimlendirme sistemleri kaynaklı herhangi bir konfor kaybı yaşamaması için hızlı, dürüst ve yüksek standartlı klima servis hizmetleri sunmaktır. Teknik kadromuzu sürekli eğiterek servis kalitemizi en üst düzeyde korumayı amaçlayyoruz.
                    </p>
                  </motion.div>
                )}

                {activeTab === "vizyon" && (
                  <motion.div
                    key="vizyon"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-6"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-[#0EA5E9]/10 text-[#0EA5E9] flex items-center justify-center">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">Sakarya'nın Lider Klima Servisi Olmak</h3>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-medium">
                      İklimlendirme ve klima teknolojileri servis alanında, Sakarya genelinde en çok tercih edilen, müşteri odaklı ve güvenilen butik servis markası olmaktır. Gelişen teknolojiye (çevre dostu gazlar, akıllı klimalar) hızla uyum sağlayarak sektöre öncülük etmeye devam etmektir.
                    </p>
                  </motion.div>
                )}

                {activeTab === "kalite" && (
                  <motion.div
                    key="kalite"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-6"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-[#0EA5E9]/10 text-[#0EA5E9] flex items-center justify-center">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">Yüksek Standartlı Teknik Hizmet</h3>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-medium">
                      Servis talebinden montaj ve periyodik bakıma kadar tüm iklimlendirme süreçlerimizde hata payını sıfıra indirmeyi hedefliyoruz. Orijinal yedek parça kullanımı, şeffaf ücretlendirme, garantili işçilik ve çevre dostu gaz dolum süreçleri, kalite politikamızın temel yapı taşlarıdır.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

      {/* 5. BRAND VALUES (HEX-STYLE DEĞERLERİMİZ GRID) */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 mb-32 relative">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-[#0EA5E9] font-black uppercase tracking-widest text-xs md:text-sm block">İLKELERİMİZ</span>
          <h2 className="font-black text-gray-900 tracking-tight uppercase text-3xl sm:text-5xl">Değerlerimiz</h2>
          <div className="w-16 h-1.5 bg-[#0EA5E9] mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {VALUES.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div 
                key={idx} 
                className="bg-white border border-gray-200/60 rounded-[36px] p-8 hover:border-[#0EA5E9]/40 hover:shadow-2xl hover:shadow-[#0EA5E9]/5 hover:translate-y-[-6px] transition-all duration-500 flex flex-col justify-between min-h-[240px] relative group overflow-hidden"
              >
                {/* Spotlight background hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0EA5E9]/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div className="space-y-6 relative z-10 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className={`w-12 h-12 rounded-2xl bg-[#0EA5E9]/10 text-[#0EA5E9] flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 duration-300`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-black text-gray-950 uppercase text-lg sm:text-xl tracking-tight leading-none pt-2">
                      {val.title}
                    </h4>
                  </div>
                  <p className="text-gray-500 text-xs sm:text-sm font-semibold leading-relaxed flex-grow pt-3">
                    {val.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
