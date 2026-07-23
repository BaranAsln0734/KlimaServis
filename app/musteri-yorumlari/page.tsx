"use client";

import React, { useState, useEffect } from "react";
import { MessageSquare, Star, ShieldCheck, Clock, CheckCircle2, Send, Zap, User } from "lucide-react";
import { motion } from "framer-motion";
import { TESTIMONIALS_DATA as INITIAL_TESTIMONIALS } from "@/data/testimonials";

interface Testimonial {
  id: number;
  name: string;
  role?: string;
  company: string;
  quote: string;
  rating: number;
  initials: string;
  avatar?: string;
}

function TestimonialCard({ item, index }: { item: Testimonial; index: number }) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-white rounded-[36px] p-8 border border-gray-200/60 shadow-sm hover:shadow-2xl hover:translate-y-[-6px] transition-all duration-500 flex flex-col justify-between relative group overflow-hidden"
    >
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10"
          style={{
            background: `radial-gradient(240px circle at ${coords.x}px ${coords.y}px, rgba(14, 165, 233, 0.06), transparent 80%)`,
          }}
        />
      )}

      {/* Large visual quote symbol in background */}
      <div className="absolute top-8 right-8 text-gray-100 pointer-events-none select-none group-hover:text-[#0EA5E9]/8 transition-colors duration-500">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
          <path d="M14.017 21v-7.391c0-5.704 3.748-9.762 9-11.048l.982 1.814c-3.69 1.19-5.996 3.294-5.996 6.625h4v10h-8zm-12 0v-7.391c0-5.704 3.748-9.762 9-11.048l.981 1.814c-3.689 1.19-5.996 3.294-5.996 6.625h4v10h-8z" />
        </svg>
      </div>

      <div className="space-y-5 relative z-20">
        <div className="flex gap-1 text-[#0EA5E9]">
          {[...Array(item.rating)].map((_, i) => (
            <Star key={i} className="w-4.5 h-4.5 fill-current text-amber-450 stroke-amber-450" />
          ))}
        </div>

        <p className="text-gray-500 font-semibold leading-relaxed italic text-sm sm:text-base">
          &ldquo;{item.quote}&rdquo;
        </p>
      </div>

      <div className="pt-6 border-t border-gray-100 mt-8 flex items-center gap-4 relative z-20">
        {item.avatar ? (
          <div className="relative w-12 h-12 rounded-2xl overflow-hidden bg-gray-50 border border-gray-200 shrink-0">
            <img
              src={item.avatar}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-12 h-12 rounded-2xl bg-gray-50 text-gray-400 group-hover:bg-[#0EA5E9]/15 group-hover:text-[#0EA5E9] transition-all duration-300 flex items-center justify-center shrink-0 border border-gray-200 font-black text-sm">
            {item.initials || <User className="w-5 h-5" />}
          </div>
        )}
        <div>
          <h4 className="font-black text-gray-950 text-sm uppercase tracking-tight">
            {item.name}
          </h4>
          <span className="text-gray-450 text-[10px] sm:text-xs font-black uppercase tracking-wider block mt-1">
            {item.role || "Müşteri"} / <span className="text-[#0EA5E9]">{item.company}</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function MusteriYorumlari() {
  const [formData, setFormData] = useState({ name: "", company: "", quote: "", rating: 5 });
  const [formSent, setFormSent] = useState(false);
  const [testimonialsList, setTestimonialsList] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);

  useEffect(() => {
    fetch("/api/admin/files?file=testimonials.ts&t=" + Date.now(), { cache: "no-store" })
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
              setTestimonialsList(parsed);
            }
          }
        }
      })
      .catch((err) => console.error("Error loading dynamic testimonials:", err));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.company && formData.quote) {
      setFormSent(true);
      setTimeout(() => {
        setFormData({ name: "", company: "", quote: "", rating: 5 });
        setFormSent(false);
      }, 3000);
    }
  };

  return (
    <div className="bg-[#F8F9FA] min-h-screen text-gray-700 relative overflow-hidden font-sans">
      
      {/* Decorative gradients & Organic Blobs */}
      <div className="absolute top-[30%] left-[-15%] w-[600px] h-[600px] bg-[#0EA5E9]/5 blur-[140px] rounded-full pointer-events-none -z-10 animate-organic-blob" />
      <div className="absolute bottom-1/4 right-[-15%] w-[600px] h-[600px] bg-[#0EA5E9]/3 blur-[140px] rounded-full pointer-events-none -z-10 animate-organic-blob-reverse" />
      <div className="absolute inset-0 bg-topo-waves opacity-20 pointer-events-none -z-10" />

      {/* HERO HEADER */}
      <section className="bg-[#0F172A] text-white pt-36 pb-20 md:pt-44 md:pb-24 relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-topo-waves pointer-events-none opacity-40" />
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 shadow-xs text-[#0EA5E9] font-black text-xs tracking-widest uppercase">
            <MessageSquare className="w-4 h-4 animate-pulse" />
            Müşteri Yorumları
          </div>
          
          <h1 className="font-black text-white tracking-tight uppercase leading-none text-4xl sm:text-5xl md:text-7xl">
            Müşteri <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0EA5E9] to-[#0284C7] mt-2 block">
              Yorumlarımız
            </span>
          </h1>
          <div className="w-20 h-1.5 bg-[#0EA5E9] mx-auto mt-6 rounded-full" />
          <p className="text-gray-300 font-semibold max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Sakarya genelinde gerçekleştirdiğimiz başarılı Klima, Kombi, Çamaşır Makinesi, Bulaşık Makinesi, Buzdolabı ve Kurutma Makinesi servis hizmetlerimizin ardından paylaşılan değerli müşteri geri bildirimleri.
          </p>

          {/* Stat strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-10 border-t border-white/10 max-w-4xl mx-auto">
            {[
              { val: "7/24", label: "Kesintisiz Destek", icon: Clock },
              { val: "10+", label: "Yıllık Tecrübe", icon: ShieldCheck },
              { val: "Aynı Gün", label: "Hızlı Müdahale", icon: Zap },
              { val: "1 Yıl", label: "Parça & İşçilik Garantisi", icon: CheckCircle2 },
            ].map((s, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 flex items-center gap-4 text-left backdrop-blur-md">
                <s.icon className="w-5 h-5 text-[#0EA5E9] shrink-0" />
                <div>
                  <div className="font-black text-white text-lg md:text-xl leading-none">{s.val}</div>
                  <div className="text-white/45 text-[10px] uppercase tracking-widest font-black mt-1.5">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="pt-16" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10">

        {/* Testimonials Grid */}
        <section className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonialsList.map((item, index) => (
              <TestimonialCard key={item.id} item={item} index={index} />
            ))}
          </div>
        </section>

        {/* "Neden Güveniyorlar?" Service Principles Block */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 border-t border-gray-200/60 pt-20">
          <div className="bg-white border border-gray-200/60 p-8 rounded-[32px] space-y-4 shadow-sm hover:translate-y-[-4px] transition-transform duration-300">
            <div className="w-12 h-12 bg-[#0EA5E9]/10 rounded-2xl flex items-center justify-center text-[#0EA5E9]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-black text-gray-955 text-base uppercase tracking-tight">Şeffaf Fiyat Politikası</h4>
            <p className="text-gray-500 text-xs sm:text-sm font-semibold leading-relaxed">
              Klima montajı, bakım ve arıza onarım işlemlerimizin tamamında gizli maliyetler olmadan şeffaf fiyatlandırma sunuyoruz.
            </p>
          </div>
          <div className="bg-white border border-gray-200/60 p-8 rounded-[32px] space-y-4 shadow-sm hover:translate-y-[-4px] transition-transform duration-300">
            <div className="w-12 h-12 bg-[#0EA5E9]/10 rounded-2xl flex items-center justify-center text-[#0EA5E9]">
              <Clock className="w-6 h-6" />
            </div>
            <h4 className="font-black text-gray-955 text-base uppercase tracking-tight">Hızlı Saha Müdahalesi</h4>
            <p className="text-gray-500 text-xs sm:text-sm font-semibold leading-relaxed">
              Sakarya genelinde sahada olan yaygın mobil servis araçlarımızla bildirim sonrasında aynı gün yerinde destek sağlıyoruz.
            </p>
          </div>
          <div className="bg-white border border-gray-200/60 p-8 rounded-[32px] space-y-4 shadow-sm hover:translate-y-[-4px] transition-transform duration-300">
            <div className="w-12 h-12 bg-[#0EA5E9]/10 rounded-2xl flex items-center justify-center text-[#0EA5E9]">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="font-black text-gray-955 text-base uppercase tracking-tight">Garantili İşçilik & Parça</h4>
            <p className="text-gray-500 text-xs sm:text-sm font-semibold leading-relaxed">
              Klima bakım ve onarımlarında kullandığımız tüm yedek parçalar ve teknik işçiliğimiz 1 yıl resmi servis garantimiz altındadır.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
