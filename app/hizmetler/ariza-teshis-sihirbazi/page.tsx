import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Home, ChevronRight, Sparkles, Wrench, PhoneCall, MessageCircle, ShieldCheck } from "lucide-react";
import TroubleshootingWizard from "@/components/TroubleshootingWizard";
import UrgencyCountdownBanner from "@/components/UrgencyCountdownBanner";

export const metadata: Metadata = {
  title: "Akıllı Arıza Teşhis & Hizmet Sihirbazı | Sakarya Beyaz Eşya Kombi Klima Servisi",
  description: "Klima, kombi, çamaşır makinesi, bulaşık makinesi ve buzdolabı arızalarınızı anında teşhis edin. Olası nedenleri, evde yapılacak kontrolleri ve adreste onarım sürelerini öğrenin.",
};

export default function ArizaTeshisSihirbaziPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-gray-900 pt-32 sm:pt-36">
      
      {/* ━━━ HERO HEADER (Clean White Theme) ━━━ */}
      <section className="relative py-16 md:py-20 overflow-hidden bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-[1300px] mx-auto px-6 md:px-10 relative z-10 text-center">
          
          {/* Breadcrumb */}
          <nav className="flex justify-center items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-400 mb-6">
            <Link href="/" className="hover:text-[#0EA5E9] transition-colors flex items-center gap-1">
              <Home className="w-3.5 h-3.5" /> Anasayfa
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
            <Link href="/hizmetler" className="hover:text-[#0EA5E9] transition-colors">
              Hizmetlerimiz
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
            <span className="text-[#0EA5E9]">Arıza Teşhis Sihirbazı</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 border border-sky-100 text-[#0EA5E9] text-xs font-black uppercase tracking-widest mb-4 shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-500" />
            Ücretsiz Dijital Ön Teşhis Aracı
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-gray-900 mb-4">
            Akıllı Arıza Teşhis & <br />
            <span className="text-[#0EA5E9]">
              Hizmet Sihirbazı
            </span>
          </h1>

          <p className="text-gray-600 font-semibold text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Arızalı cihazınızı ve yaşadığınız belirtiyi seçin; saniyeler içinde olası teknik arıza nedenini, evde yapabileceğiniz kontrolleri ve adreste onarım süresini keşfedin.
          </p>
        </div>
      </section>

      {/* ━━━ URGENCY BANNER ━━━ */}
      <UrgencyCountdownBanner />

      {/* ━━━ INTERACTIVE WIZARD COMPONENT ━━━ */}
      <TroubleshootingWizard />

      {/* ━━━ BOTTOM CTA BANNER ━━━ */}
      <section className="bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] py-16 border-t border-white/10 relative overflow-hidden text-white">
        <div className="max-w-[1300px] mx-auto px-6 md:px-10 text-center relative z-10">
          <ShieldCheck className="w-12 h-12 text-[#0EA5E9] mx-auto mb-4" />
          <h2 className="font-black text-2xl md:text-4xl text-white uppercase tracking-tight mb-3">
            Teşhis Sonrası Yerinde Arıza Servisi İster Misiniz?
          </h2>
          <p className="text-gray-300 text-sm font-semibold max-w-xl mx-auto mb-8 leading-relaxed">
            Sakarya genelinde 7/24 hizmet veren tam donanımlı mobil servis ekiplerimiz arıza tespit ve onarımı için 30 dakikada kapınızda.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:08500000000"
              className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-black uppercase text-xs tracking-wider shadow-lg shadow-sky-500/25 transition-all hover:scale-105"
            >
              <PhoneCall className="w-4 h-4" />
              Hemen Ara (0850 000 00 00)
            </a>
            <a
              href="https://wa.me/905550000000?text=Merhaba%2C+ar%C4%B1za+te%C5%9Fhis+sihirbaz%C4%B1ndan+ula%C5%9F%C4%B1yorum.+Servis+talebinde+bulunmak+istiyorum."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black uppercase text-xs tracking-wider shadow-lg shadow-emerald-500/25 transition-all hover:scale-105"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Ön Teşhis (Demo)
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
