"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Logo from "./Logo";
import { Menu, X, ArrowRight, ChevronDown, Phone } from "lucide-react";

interface NavChild {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href?: string;
  children?: NavChild[];
}

const NAV_ITEMS: NavItem[] = [
  { label: "Anasayfa", href: "/" },
  {
    label: "Kurumsal",
    children: [
      { label: "Hakkımızda", href: "/hakkimizda" },
      { label: "S.S.S", href: "/sss" },
      { label: "K.V.K.K", href: "/kvkk" },
    ],
  },
  {
    label: "Hizmetlerimiz",
    href: "/hizmetler",
    children: [
      { label: "Klima Arıza Servisi", href: "/hizmetler/ariza-servis-7-24" },
      { label: "Klima Periyodik Bakımı", href: "/hizmetler/periyodik-kontrol" },
      { label: "Klima Montajı & Demontajı", href: "/hizmetler/klima-montaj" },
      { label: "Gaz Dolumu & Bakım", href: "/hizmetler/gaz-dolumu" },
      { label: "BTU Hesaplama", href: "/hesaplama-araclari" },
    ],
  },
  {
    label: "Referanslar",
    children: [
      { label: "Referanslarımız", href: "/referanslar" },
      { label: "Müşteri Yorumları", href: "/musteri-yorumlari" },
    ],
  },
  { label: "Servis Bölgeleri", href: "/servis-bolgeleri" },
  { label: "Blog", href: "/blog" },
  { label: "İletişim", href: "/iletisim" },
];

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Quote Modal states
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteFormData, setQuoteFormData] = useState({ name: "", phone: "", service: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quoteFormData.name || !quoteFormData.phone) return;
    setIsSubmitting(true);

    try {
      const response = await fetch("https://formsubmit.co/ajax/info@sakaryaklimaservisi.demo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: "Sakarya Uzman Klima – Hızlı Servis Talebi",
          Ad_Soyad: quoteFormData.name,
          Telefon: quoteFormData.phone,
          Hizmet_Turu: quoteFormData.service,
          Mesaj: quoteFormData.message,
          _template: "table",
        }),
      });

      await fetch("/api/admin/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: quoteFormData.name,
          phone: quoteFormData.phone,
          email: "Belirtilmedi",
          serviceType: quoteFormData.service || "Hızlı Servis Talebi",
          district: "Sakarya",
          message: quoteFormData.message || "Yok",
        }),
      }).catch((err) => console.error("Error storing request locally:", err));

      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsQuoteModalOpen(false);
          setIsSubmitted(false);
          setQuoteFormData({ name: "", phone: "", service: "", message: "" });
        }, 3000);
      }
    } catch (err) {
      console.error("Quote submit error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (openDropdown && !(e.target as Element).closest(".nav-group")) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [openDropdown]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on page transition
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const isDarkHeroPage =
    pathname === "/" ||
    pathname === "/iletisim" ||
    pathname === "/servis-bolgeleri" ||
    pathname === "/blog" ||
    pathname === "/referanslar" ||
    pathname === "/musteri-yorumlari" ||
    (pathname && pathname.startsWith("/blog/")) ||
    (pathname && pathname.startsWith("/hizmetler/")) ||
    (pathname && (pathname.includes("-klima-servisi") || pathname.includes("-Klima-Servisi")));

  const headerBgClass = isScrolled
    ? "bg-white/95 backdrop-blur-lg shadow-md border-b border-gray-100 py-[14px]"
    : isDarkHeroPage
    ? "bg-transparent py-[22px] border-b border-white/10"
    : "bg-white py-[20px] border-b border-gray-100";

  const linkColorClass = isScrolled
    ? "text-[#1A1A1A] hover:text-[#0EA5E9]"
    : isDarkHeroPage
    ? "text-white/90 hover:text-white"
    : "text-[#1A1A1A] hover:text-[#0EA5E9]";

  const logoClass = "";

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBgClass}`}>
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between">
          <Logo className={logoClass} priority={true} />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 lg:gap-8">
            {NAV_ITEMS.map((item) => {
              if (item.children) {
                const isAnyChildActive = item.children.some((child) => pathname === child.href);
                const isDropdownOpen = openDropdown === item.label;
                return (
                  <div key={item.label} className="relative group py-2 nav-group">
                    {item.href ? (
                      <Link
                        href={item.href}
                        onClick={() => setOpenDropdown(null)}
                        className={`flex items-center gap-1 text-base font-normal tracking-wide transition-colors cursor-pointer capitalize ${
                          isAnyChildActive ? "text-[#0EA5E9]" : linkColorClass
                        }`}
                      >
                        {item.label}
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180 ${isDropdownOpen ? "rotate-180" : ""}`}
                        />
                      </Link>
                    ) : (
                      <button
                        onClick={() => setOpenDropdown(isDropdownOpen ? null : item.label)}
                        className={`flex items-center gap-1 text-base font-normal tracking-wide transition-colors cursor-pointer capitalize ${
                          isAnyChildActive ? "text-[#0EA5E9]" : linkColorClass
                        }`}
                      >
                        {item.label}
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180 ${isDropdownOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                    )}

                    {/* Dropdown Menu */}
                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 w-52 bg-white rounded shadow-xl border-t-2 border-[#0EA5E9] py-2 transition-all duration-200 z-50
                      ${isDropdownOpen ? "opacity-100 visible" : "opacity-0 invisible group-hover:opacity-100 group-hover:visible"}`}
                    >
                      {item.children.map((child) => {
                        const isChildActive = pathname === child.href;
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setOpenDropdown(null)}
                            className={`block px-4 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-gray-50 hover:text-[#0EA5E9] transition-colors ${
                              isChildActive ? "text-[#0EA5E9] bg-gray-50/50" : "text-gray-700"
                            }`}
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              }

              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href!}
                  className={`text-base font-normal tracking-wide transition-colors relative py-1 capitalize ${
                    isActive ? "text-[#0EA5E9]" : linkColorClass
                  }`}
                >
                  {item.label}
                  {isActive && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0EA5E9] rounded-full" />}
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:08500000000"
              className={`flex items-center gap-2 text-sm font-bold transition-colors ${
                !isScrolled && isDarkHeroPage ? "text-white/80 hover:text-white" : "text-gray-600 hover:text-[#0EA5E9]"
              }`}
            >
              <Phone className="w-4 h-4" />
              0850 000 00 00
            </a>
            <button
              onClick={() => setIsQuoteModalOpen(true)}
              className="group flex items-center gap-2 px-6 py-3 rounded-sm bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-bold text-xs uppercase tracking-widest active:scale-95 transition-all duration-300 shadow-sm cursor-pointer border-none outline-none"
            >
              Servis İste
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`p-2 lg:hidden transition-colors ${
              !isScrolled && isDarkHeroPage ? "text-white hover:text-[#0EA5E9]" : "text-[#1A1A1A] hover:text-[#0EA5E9]"
            }`}
            aria-label="Menüyü Aç/Kapat"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-2xl py-6 px-6 flex flex-col gap-4 animate-fade-in max-h-[85vh] overflow-y-auto">
            {NAV_ITEMS.map((item) => {
              if (item.children) {
                return (
                  <div key={item.label} className="flex flex-col gap-2">
                    {item.href ? (
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-xs font-black uppercase tracking-wider text-gray-400 hover:text-[#0EA5E9] transition-colors pb-1"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <span className="text-xs font-black uppercase tracking-wider text-gray-400 pb-1">{item.label}</span>
                    )}
                    <div className="flex flex-col gap-2 pl-3">
                      {item.children.map((child) => {
                        const isChildActive = pathname === child.href;
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`text-sm font-bold py-1.5 ${isChildActive ? "text-[#0EA5E9]" : "text-[#1A1A1A]"}`}
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              }

              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href!}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-base font-bold transition-colors py-2 ${isActive ? "text-[#0EA5E9]" : "text-[#1A1A1A]"}`}
                >
                  {item.label}
                </Link>
              );
            })}
            <a
              href="tel:08500000000"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-sm uppercase tracking-wider text-center mt-1 cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              0850 000 00 00
            </a>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsQuoteModalOpen(true);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-bold text-sm uppercase tracking-wider text-center mt-1 shadow-md cursor-pointer border-none outline-none"
            >
              Servis İste
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </header>

      {/* Servis Talep Modal */}
      {isQuoteModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full relative shadow-2xl border border-gray-100 animate-fade-in">
            <button
              onClick={() => setIsQuoteModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-[#0EA5E9] transition-colors p-1 rounded-full hover:bg-gray-50 cursor-pointer"
              aria-label="Kapat"
            >
              <X className="w-5 h-5" />
            </button>

            {isSubmitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </div>
                <h3 className="font-extrabold text-dark-text text-xl">Talebiniz Alındı!</h3>
                <p className="text-gray-500 font-medium text-sm leading-relaxed">
                  Servis talebiniz başarıyla ulaştı. Uzman ekibimiz en kısa sürede sizinle iletişime geçecektir.
                </p>
              </div>
            ) : (
              <form onSubmit={handleQuoteSubmit} className="space-y-5">
                <div className="space-y-1">
                  <h3 className="font-black text-dark-text text-xl uppercase tracking-tight">Hızlı Servis Talebi</h3>
                  <p className="text-gray-400 text-xs font-semibold">Bilgileri doldurun, klima uzmanımız sizi arasın.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Adınız Soyadınız *</label>
                    <input
                      type="text"
                      required
                      value={quoteFormData.name}
                      onChange={(e) => setQuoteFormData({ ...quoteFormData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-[#0EA5E9] focus:ring-1 focus:ring-[#0EA5E9] outline-none font-medium text-gray-700 bg-gray-50/50"
                      placeholder="Örn. Ahmet Yılmaz"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Telefon Numaranız *</label>
                    <input
                      type="tel"
                      required
                      value={quoteFormData.phone}
                      onChange={(e) => setQuoteFormData({ ...quoteFormData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-[#0EA5E9] focus:ring-1 focus:ring-[#0EA5E9] outline-none font-medium text-gray-700 bg-gray-50/50"
                      placeholder="Örn. 0530 123 45 67"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Hizmet Türü</label>
                    <select
                      value={quoteFormData.service}
                      onChange={(e) => setQuoteFormData({ ...quoteFormData, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-[#0EA5E9] focus:ring-1 focus:ring-[#0EA5E9] outline-none font-medium text-gray-600 bg-gray-50/50"
                    >
                      <option value="">Hizmet Seçiniz</option>
                      <option value="Klima Arıza Servisi">Klima Arıza Servisi</option>
                      <option value="Klima Periyodik Bakımı">Klima Periyodik Bakımı</option>
                      <option value="Klima Montajı">Klima Montajı</option>
                      <option value="Klima Demontajı">Klima Demontajı</option>
                      <option value="Gaz Dolumu">Gaz Dolumu</option>
                      <option value="Diğer">Diğer</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Ek Not / Mesajınız</label>
                    <textarea
                      rows={3}
                      value={quoteFormData.message}
                      onChange={(e) => setQuoteFormData({ ...quoteFormData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-[#0EA5E9] focus:ring-1 focus:ring-[#0EA5E9] outline-none font-medium text-gray-700 bg-gray-50/50 resize-none"
                      placeholder="Klima markanız, modeli veya şikayetinizi belirtebilirsiniz..."
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-extrabold uppercase tracking-wider text-sm transition-colors shadow-md shadow-[#0EA5E9]/20 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Gönderiliyor..." : "Servis Talep Et"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
