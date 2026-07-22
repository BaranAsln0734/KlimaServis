"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, BookOpen, Users, CheckCircle, Mail, FileText } from "lucide-react";
import { motion } from "framer-motion";

export default function KVKK() {
  const [activeSection, setActiveSection] = useState("sec-1");

  const SECTIONS = [
    { id: "sec-1", name: "1. Veri Sorumlusu", title: "Veri Sorumlusunun Kimliği" },
    { id: "sec-2", name: "2. İşlenme Amacı", title: "Kişisel Verilerin İşlenme Amacı" },
    { id: "sec-3", name: "3. Veri Aktarımı", title: "Kişisel Verilerin Aktarımı" },
    { id: "sec-4", name: "4. Haklarınız", title: "İlgili Kişinin Hakları" }
  ];

  const handleScroll = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -120; // adjust offset for sticky header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#F8F9FA] min-h-screen text-gray-700 py-24 md:py-36 relative overflow-hidden font-sans pt-[134px]">
      
      {/* Decorative light elements & Organic Blobs */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#0EA5E9]/10 via-transparent to-transparent pointer-events-none -z-10" />
      <div className="absolute top-[25%] left-[-15%] w-[600px] h-[600px] bg-[#0EA5E9]/5 blur-[140px] rounded-full pointer-events-none -z-10 animate-organic-blob" />
      <div className="absolute bottom-[25%] right-[-15%] w-[650px] h-[650px] bg-[#0EA5E9]/3 blur-[140px] rounded-full pointer-events-none -z-10 animate-organic-blob-reverse" />

      <section className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
        
        {/* Navigation & Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#0EA5E9] font-black text-xs tracking-widest uppercase transition-all duration-300">
            <ArrowLeft className="w-4 h-4" /> Ana Sayfaya Dön
          </Link>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 text-xs font-black text-[#0EA5E9] uppercase tracking-wider shadow-xs">
            Yasal Mevzuat & Uyum
          </div>
        </div>

        {/* Brand Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-6 mb-12 bg-white border border-gray-200/60 p-8 rounded-[36px] shadow-sm relative overflow-hidden"
        >
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0EA5E9]/3 to-transparent pointer-events-none" />
          <div className="w-16 h-16 rounded-2xl bg-[#0EA5E9]/10 border border-[#0EA5E9]/20 text-[#0EA5E9] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-9 h-9 animate-pulse" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 uppercase tracking-tight leading-none">
              KVKK Aydınlatma Metni
            </h1>
            <p className="text-gray-500 font-bold text-xs sm:text-sm mt-2.5">
              6698 Sayılı Kişisel Verilerin Korunması Kanunu Kapsamında Bilgilendirme
            </p>
          </div>
        </motion.div>

        {/* Executive Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white border border-gray-200/60 p-8 rounded-[32px] space-y-4 shadow-sm hover:translate-y-[-4px] transition-transform duration-300">
            <div className="w-12 h-12 bg-[#0EA5E9]/10 rounded-2xl flex items-center justify-center text-[#0EA5E9]">
              <BookOpen className="w-6 h-6" />
            </div>
            <h4 className="font-black text-gray-950 text-base uppercase tracking-tight">Güvenli Veri İşleme</h4>
            <p className="text-gray-500 text-xs sm:text-sm font-semibold leading-relaxed">
              Verileriniz yalnızca sizin onay verdiğiniz keşif, servis ve iletişim amaçlarıyla sınırlı olarak işlenir.
            </p>
          </div>
          <div className="bg-white border border-gray-200/60 p-8 rounded-[32px] space-y-4 shadow-sm hover:translate-y-[-4px] transition-transform duration-300">
            <div className="w-12 h-12 bg-[#0EA5E9]/10 rounded-2xl flex items-center justify-center text-[#0EA5E9]">
              <Users className="w-6 h-6" />
            </div>
            <h4 className="font-black text-gray-950 text-base uppercase tracking-tight">Üçüncü Şahıslarla Paylaşılmaz</h4>
            <p className="text-gray-500 text-xs sm:text-sm font-semibold leading-relaxed">
              Kişisel bilgileriniz yasal zorunluluklar haricinde hiçbir kuruma satılmaz, kiralanmaz ve aktarılmaz.
            </p>
          </div>
          <div className="bg-white border border-gray-200/60 p-8 rounded-[32px] space-y-4 shadow-sm hover:translate-y-[-4px] transition-transform duration-300">
            <div className="w-12 h-12 bg-[#0EA5E9]/10 rounded-2xl flex items-center justify-center text-[#0EA5E9]">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h4 className="font-black text-gray-950 text-base uppercase tracking-tight">Veri Sahibi Hakları</h4>
            <p className="text-gray-500 text-xs sm:text-sm font-semibold leading-relaxed">
              Dilediğiniz zaman info@sakaryaklimaservisi.demo adresine yazarak tüm kişisel verilerinizi sildirebilirsiniz.
            </p>
          </div>
        </div>

        {/* Main Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Sticky Navigator Sidebar */}
          <div className="lg:col-span-4 space-y-3 lg:sticky lg:top-36">
            <div className="bg-white border border-gray-200/60 p-8 rounded-[32px] shadow-sm">
              <h3 className="font-black text-gray-950 text-base uppercase tracking-tight mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#0EA5E9]" />
                Doküman Navigasyonu
              </h3>
              <div className="flex flex-col gap-2">
                {SECTIONS.map((sec) => {
                  const isActive = activeSection === sec.id;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => handleScroll(sec.id)}
                      className={`w-full flex items-center px-5 py-4 rounded-2xl text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer border text-left ${
                        isActive
                          ? "bg-[#0EA5E9] border-[#0EA5E9] text-white shadow-lg shadow-sky-500/20"
                          : "bg-white border-gray-100 text-gray-500 hover:text-gray-950 hover:bg-gray-50/50"
                      }`}
                    >
                      {sec.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Document Content */}
          <div className="lg:col-span-8 bg-white border border-gray-200/60 p-8 sm:p-12 rounded-[40px] shadow-sm space-y-12">
            
            <div className="text-gray-550 font-semibold text-sm sm:text-base leading-relaxed space-y-6">
              <p>
                <strong className="text-gray-950 font-black">Sakarya Uzman Klima İklimlendirme Servisi</strong> (&ldquo;Şirket&rdquo;) olarak, kişisel verilerinizin güvenliğine ve gizliliğine büyük önem vermekteyiz. 6698 sayılı Kişisel Verilerin Korunması Kanunu (&ldquo;KVKK&rdquo;) uyarınca, web sitemiz üzerinden bizimle paylaştığınız kişisel verileriniz hakkında sizleri bilgilendirmek isteriz.
              </p>
            </div>

            {/* Section 1 */}
            <div id="sec-1" className="scroll-mt-36 pt-4 border-t border-gray-100 space-y-4">
              <h3 className="text-lg sm:text-xl font-black text-gray-950 uppercase tracking-tight">
                1. Veri Sorumlusunun Kimliği
              </h3>
              <p className="text-gray-550 text-sm sm:text-base font-semibold leading-relaxed">
                KVKK uyarınca muhatap &ldquo;Veri Sorumlusu&rdquo;, Semerciler Mah. Bosna Cad. No: 12 Adapazarı/Sakarya adresinde mukim Sakarya Uzman Klima İklimlendirme Servisi&apos;dir.
              </p>
            </div>

            {/* Section 2 */}
            <div id="sec-2" className="scroll-mt-36 pt-6 border-t border-gray-100 space-y-4">
              <h3 className="text-lg sm:text-xl font-black text-gray-950 uppercase tracking-tight">
                2. Kişisel Verilerin İşlenme Amacı
              </h3>
              <p className="text-gray-550 text-sm sm:text-base font-semibold leading-relaxed">
                Web sitemizdeki İletişim ve Keşif Talep formları aracılığıyla toplanan <strong className="text-gray-950 font-black">Ad, Soyad, Telefon Numarası, E-posta Adresi ve Adres/Proje bilgileriniz</strong>;
              </p>
              <ul className="list-none pl-0 space-y-3 font-semibold text-sm sm:text-base text-gray-550">
                <li className="flex items-start gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0EA5E9] shrink-0 mt-1.5" />
                  Servis taleplerinizin değerlendirilmesi ve tarafınıza dönüş yapılması,
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0EA5E9] shrink-0 mt-1.5" />
                  Klima montajı, bakımı, gaz şarjı ve teknik servis süreçlerinin organize edilmesi,
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0EA5E9] shrink-0 mt-1.5" />
                  Müşteri memnuniyeti ve iletişim süreçlerinin yürütülmesi,
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0EA5E9] shrink-0 mt-1.5" />
                  Ticari ve sözleşmesel yükümlülüklerimizin yerine getirilmesi
                </li>
              </ul>
              <p className="text-gray-550 text-sm sm:text-base font-semibold leading-relaxed">
                amaçlarıyla sınırlı ve ölçülü olarak işlenmektedir.
              </p>
            </div>

            {/* Section 3 */}
            <div id="sec-3" className="scroll-mt-36 pt-6 border-t border-gray-100 space-y-4">
              <h3 className="text-lg sm:text-xl font-black text-gray-950 uppercase tracking-tight">
                3. Kişisel Verilerin Aktarımı
              </h3>
              <p className="text-gray-550 text-sm sm:text-base font-semibold leading-relaxed">
                Söz konusu kişisel verileriniz, kanuni yükümlülükler haricinde hiçbir şekilde üçüncü şahıslara veya şirketlere satılmaz, kiralanmaz ve paylaşılmaz. Talebiniz doğrultusunda sadece yetkili teknik personellerimize işin ifası amacıyla aktarılabilir.
              </p>
            </div>

            {/* Section 4 */}
            <div id="sec-4" className="scroll-mt-36 pt-6 border-t border-gray-100 space-y-4">
              <h3 className="text-lg sm:text-xl font-black text-gray-950 uppercase tracking-tight">
                4. İlgili Kişinin Hakları
              </h3>
              <p className="text-gray-550 text-sm sm:text-base font-semibold leading-relaxed">
                KVKK&apos;nın 11. maddesi uyarınca veri sahipleri; kişisel verilerinin işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi talep etme, eksik/yanlış işlenmişse düzeltilmesini isteme, kanun kapsamında silinmesini talep etme haklarına sahiptir.
              </p>
            </div>

            {/* Contact Panel Card */}
            <div className="pt-8 border-t border-gray-100">
              <div className="bg-gray-50 border border-gray-150 p-8 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="space-y-1 text-center sm:text-left">
                  <h4 className="font-black text-gray-950 text-base uppercase tracking-tight">Veri Sorumlusu İletişim</h4>
                  <p className="text-gray-400 text-xs font-semibold">Talepleriniz ve yasal başvurularınız için bizimle iletişime geçin.</p>
                </div>
                <a
                  href="mailto:info@sakaryaklimaservisi.demo"
                  className="flex items-center justify-center gap-2 px-6 py-4 bg-[#0EA5E9] hover:bg-[#0284C7] text-white transition-colors rounded-2xl font-black text-xs normal-case tracking-wider cursor-pointer shadow-md shadow-sky-500/10"
                >
                  <Mail className="w-4.5 h-4.5" /> info@sakaryaklimaservisi.demo
                </a>
              </div>
            </div>

          </div>

        </div>

      </section>
    </div>
  );
}
