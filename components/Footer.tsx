"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Phone, MapPin } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();

  // Hide the standalone CTA banner on blog, district, and neighborhood pages
  const isBlog = pathname?.startsWith("/blog");
  const isServiceRegions = pathname?.startsWith("/servis-bolgeleri");
  const isDistrictOrNeighborhood =
    pathname?.includes("-klima-servisi") ||
    pathname?.includes("-Klima-Servisi") ||
    (pathname !== "/" && !["/hakkimizda", "/hizmetler", "/referanslar", "/hesaplama-araclari", "/iletisim", "/sss", "/kvkk", "/gizlilik-politikasi", "/kullanim-kosullari", "/musteri-yorumlari"].includes(pathname || ""));

  const hideBanner = isBlog || isServiceRegions || isDistrictOrNeighborhood;

  const socialLinks = [
    {
      name: "Instagram",
      href: "https://www.instagram.com/demo",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
        </svg>
      )
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/demo",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
        </svg>
      )
    },
    {
      name: "X (Twitter)",
      href: "https://x.com/demo",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <path d="M4 4l11.733 16h4.267l-11.733 -16z"/>
          <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/>
        </svg>
      )
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/demo",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
          <rect width="4" height="12" x="2" y="9"/>
          <circle cx="4" cy="4" r="2"/>
        </svg>
      )
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/demo",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.56 49.56 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
          <path d="m10 15 5-3-5-3z"/>
        </svg>
      )
    },
    {
      name: "TikTok",
      href: "https://www.tiktok.com/@demo",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
        </svg>
      )
    },
    {
      name: "WhatsApp",
      href: "https://wa.me/905550000000",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      )
    }
  ];

  return (
    <>
      {/* 📞 Hızlı İletişim / Standalone CTA Banner (Hidden on blog, district, and neighborhood pages) */}
      {!hideBanner && (
        <section className="bg-slate-50 border-t border-b border-gray-200 py-16">
          <div className="max-w-[1600px] mx-auto px-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center lg:text-left">
              <h3 className="text-gray-900 font-black text-xl md:text-2xl uppercase tracking-tight leading-snug">
                Klimanız arızalandı mı? Bakım zamanı mı geldi? <br className="hidden md:inline" />
                <span className="text-[#0EA5E9]">Hemen arayın, aynı gün çözelim.</span>
              </h3>
              <p className="text-gray-600 text-xs md:text-sm font-semibold uppercase tracking-wider">
                Sakarya'nın tüm ilçelerinde 7/24 uzman klima servis ekibimiz hizmetinizde.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full lg:w-auto">
              <a
                href="tel:08500000000"
                className="flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all hover:scale-[1.03] shadow-lg shadow-sky-500/20 w-full sm:w-auto text-center"
              >
                <Phone className="w-4 h-4" />
                0850 000 00 00
              </a>
              <a
                href="https://wa.me/905550000000?text=Merhaba%2C%20klima%20servis%20talebi%20i%C3%A7in%20ileti%C5%9Fime%20ge%C3%A7iyorum."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all hover:scale-[1.03] shadow-lg shadow-emerald-600/20 w-full sm:w-auto text-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-4 h-4" viewBox="0 0 16 16">
                  <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.949h.004c4.368 0 7.926-3.558 7.93-7.93a7.9 7.9 0 0 0-2.327-5.592M7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.69-4.98c-.202-.1-1.195-.59-1.378-.657-.183-.067-.317-.1-.449.1-.132.2-.511.657-.626.78-.115.123-.23.138-.432.037-2.006-.897-3.27-2.007-4.153-3.524-.25-.43-.014-.663.22-.897.209-.208.432-.51.48-.684.048-.174.024-.326-.012-.426-.036-.1-.317-.765-.434-1.048-.115-.279-.23-.24-.317-.245-.083-.004-.178-.005-.272-.005a.52.52 0 0 0-.377.177C4.09 5.251 3.5 5.86 3.5 7.1c0 1.24.9 2.435 1.024 2.6 1.24 1.638 2.82 2.63 5.43 3.593.62.23 1.1.37 1.48.49.62.2 1.18.17 1.62.1.49-.07 1.4-.57 1.6-1.13.2-.56.2-1.04.14-1.13-.06-.1-.2-.17-.4-.27"/>
                </svg>
                WhatsApp Demo
              </a>
            </div>
          </div>
        </section>
      )}

      <footer className="bg-[#0F172A] text-gray-400 relative overflow-hidden">
        <div className="absolute inset-0 bg-topo-waves pointer-events-none opacity-80" />
        <div className="max-w-[1600px] mx-auto px-10 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 pt-16 relative z-10">
          {/* Brand details */}
          <div className="flex flex-col gap-4">
            <Logo className="mb-2" />
            <p className="text-sm leading-relaxed text-gray-400">
              Sakarya Uzman Klima Servisi, Adapazarı başta olmak üzere tüm Sakarya ilçelerinde her marka ve model klimaya montaj, periyodik bakım, arıza tamiri ve gaz dolumu hizmetleri sunmaktadır.
            </p>
            
            {/* Sosyal Medya İkonları */}
            <div className="mt-2">
              <span className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-3">Sosyal Medya Kanallarımız</span>
              <div className="flex flex-wrap gap-2.5">
                {socialLinks.map((s, idx) => (
                  <a
                    key={idx}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl bg-slate-800/80 border border-slate-700/50 flex items-center justify-center hover:bg-[#0EA5E9] hover:border-[#0EA5E9] hover:text-white text-gray-300 transition-all duration-300 shadow-sm"
                    title={s.name}
                    aria-label={s.name}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Hızlı Linkler */}
          <div>
            <h3 className="text-white font-bold text-sm tracking-widest uppercase mb-6">Hızlı Linkler</h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li><Link href="/" className="hover:text-[#0EA5E9] transition-colors">Anasayfa</Link></li>
              <li><Link href="/hakkimizda" className="hover:text-[#0EA5E9] transition-colors">Hakkımızda</Link></li>
              <li><Link href="/servis-bolgeleri" className="hover:text-[#0EA5E9] transition-colors">Servis Bölgeleri</Link></li>
              <li><Link href="/hizmetler" className="hover:text-[#0EA5E9] transition-colors">Hizmetlerimiz</Link></li>
              <li><Link href="/referanslar" className="hover:text-[#0EA5E9] transition-colors">Referanslarımız</Link></li>
              <li><Link href="/hesaplama-araclari" className="hover:text-[#0EA5E9] transition-colors">BTU Hesaplama</Link></li>
              <li><Link href="/blog" className="hover:text-[#0EA5E9] transition-colors">Blog & Haberler</Link></li>
              <li><Link href="/iletisim" className="hover:text-[#0EA5E9] transition-colors">İletişim</Link></li>
              <li><Link href="/kvkk" className="hover:text-[#0EA5E9] transition-colors">KVKK & Gizlilik</Link></li>
            </ul>
          </div>

          {/* Hizmetlerimiz */}
          <div>
            <h3 className="text-white font-bold text-sm tracking-widest uppercase mb-6">Hizmetlerimiz</h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li><Link href="/hizmetler/ariza-servis-7-24" className="hover:text-[#0EA5E9] transition-colors">Klima Arıza Servisi</Link></li>
              <li><Link href="/hizmetler/periyodik-kontrol" className="hover:text-[#0EA5E9] transition-colors">Klima Periyodik Bakımı</Link></li>
              <li><Link href="/hizmetler/klima-montaj" className="hover:text-[#0EA5E9] transition-colors">Klima Montajı & Demontajı</Link></li>
              <li><Link href="/hizmetler/gaz-dolumu" className="hover:text-[#0EA5E9] transition-colors">Gaz Dolumu & Bakım</Link></li>
            </ul>
          </div>

          {/* İletişim Bilgileri */}
          <div>
            <h3 className="text-white font-bold text-sm tracking-widest uppercase mb-6">İletişim (Demo)</h3>
            <ul className="flex flex-col gap-6 text-sm">
              <li className="flex gap-3 items-start">
                <MapPin className="w-5 h-5 text-[#0EA5E9] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block text-xs uppercase tracking-wider mb-1">Merkez Ofis (Demo)</strong>
                  <span>Atatürk Bulvarı No: 100, Adapazarı / Sakarya</span>
                </div>
              </li>
              <li className="flex gap-3 items-start">
                <Phone className="w-5 h-5 text-[#0EA5E9] shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                  <a href="tel:08500000000" className="hover:text-[#0EA5E9] transition-colors font-semibold">
                    0850 000 00 00 (Demo Hat)
                  </a>
                  <a href="tel:05550000000" className="hover:text-[#0EA5E9] transition-colors text-xs">
                    0555 000 00 00 (Demo 7/24 Acil)
                  </a>
                </div>
              </li>
              <li className="flex gap-3 items-center">
                <Mail className="w-5 h-5 text-[#0EA5E9] shrink-0" />
                <a href="mailto:info@demo.com" className="hover:text-[#0EA5E9] transition-colors">
                  info@demo.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-[1600px] mx-auto px-10 border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs pb-8 relative z-10">
          <p>© {currentYear} Sakarya Uzman Klima Servisi (Demo). Tüm Hakları Saklıdır.</p>
          <p className="flex gap-4">
            <Link href="/gizlilik-politikasi" className="hover:text-white transition-colors">
              Gizlilik Politikası
            </Link>
            <span>|</span>
            <Link href="/kullanim-kosullari" className="hover:text-white transition-colors">
              Kullanım Koşulları
            </Link>
          </p>
        </div>
      </footer>
    </>
  );
}
