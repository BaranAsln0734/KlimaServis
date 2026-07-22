"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone, Mail, MapPin, Clock, Send, CheckCircle,
  PhoneCall, ShieldCheck, Zap, Snowflake,
  Wrench, Droplets, Wind, ArrowRight, MessageCircle
} from "lucide-react";

const SERVICES = [
  "Klima Arıza Tamiri",
  "Periyodik Bakım",
  "Gaz Dolumu (R32 / R410A)",
  "Klima Montajı & Kurulumu",
  "İç/Dış Ünite Temizliği",
  "Klima Sökümü",
  "Yedek Parça Temini",
  "Keşif & Fiyat Teklifi",
];

const BRANDS = [
  "Daikin", "Mitsubishi", "Samsung", "LG", "Arçelik",
  "Bosch", "Vestel", "Gree", "Midea", "Toshiba", "Diğer"
];

const CONTACT_CARDS = [
  {
    icon: Phone,
    label: "Telefon (Demo 7/24)",
    value: "0850 000 00 00",
    sub: "Demo acil servis hattı",
    href: "tel:08500000000",
    accent: "#0EA5E9",
    bg: "bg-[#0EA5E9]/8",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp (Demo)",
    value: "0555 000 00 00",
    sub: "Demo mesaj hattı",
    href: "https://wa.me/905550000000?text=Merhaba%2C%20demo%20klima%20servisi%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.",
    accent: "#10B981",
    bg: "bg-emerald-50",
  },
  {
    icon: Mail,
    label: "E-Posta (Demo)",
    value: "info@demo.com",
    sub: "Demo iletişim adresi",
    href: "mailto:info@demo.com",
    accent: "#8B5CF6",
    bg: "bg-violet-50",
  },
  {
    icon: MapPin,
    label: "Adres (Demo)",
    value: "Atatürk Bulvarı No: 100",
    sub: "Adapazarı / Sakarya (Demo Konum)",
    href: "https://maps.google.com/?q=Adapazarı+Atatürk+Bulvarı+Sakarya",
    accent: "#F59E0B",
    bg: "bg-amber-50",
  },
];

export default function ContactClientPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    brand: "",
    serviceType: "",
    district: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("https://formsubmit.co/ajax/info@demo.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: "Sakarya Uzman Klima — Yeni Servis Talebi (Demo)",
          Ad_Soyad: formData.name,
          Telefon: formData.phone,
          Eposta: formData.email || "Belirtilmedi",
          Klima_Markası: formData.brand || "Belirtilmedi",
          Hizmet_Turu: formData.serviceType || "Belirtilmedi",
          Bolge: formData.district || "Belirtilmedi",
          Mesaj: formData.message || "Yok",
          _template: "table",
        }),
      });
      await fetch("/api/admin/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          serviceType: formData.serviceType || "İletişim / Servis Talebi",
          district: formData.district || "Belirtilmedi",
          message: `Marka: ${formData.brand || "Yok"}\nHizmet: ${formData.serviceType || "Yok"}\nMesaj: ${formData.message || "Yok"}`,
        }),
      }).catch(() => {});

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", phone: "", email: "", brand: "", serviceType: "", district: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputCls = "w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#0EA5E9] focus:ring-4 focus:ring-sky-500/5 focus:bg-white text-gray-800 placeholder:text-gray-400 font-semibold transition-all text-sm";
  const labelCls = "block font-black text-gray-400 uppercase tracking-wider mb-2 text-[10px]";

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-[#1E293B]">
      <title>İletişim & Servis Talebi (Demo) | Sakarya Uzman Klima</title>
      <meta name="description" content="Sakarya Uzman Klima ile iletişime geçin. 7/24 acil klima servisi, bakım randevusu ve fiyat teklifi için hemen arayın veya formu doldurun." />

      {/* ─── HERO ─── */}
      <section className="relative pt-36 pb-24 md:pt-40 bg-[#0F172A] text-white overflow-hidden">
        <div className="absolute inset-0 bg-topo-waves pointer-events-none opacity-30" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#0EA5E9]/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#0EA5E9] font-black text-xs tracking-widest uppercase mb-6"
          >
            <PhoneCall className="w-4 h-4 animate-pulse" />
            7/24 Teknik Destek (Demo)
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-black text-white uppercase leading-none text-4xl sm:text-5xl md:text-6xl tracking-tight mb-4"
          >
            Uzman Klima<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0EA5E9] to-[#38BDF8]">
              Servisi & İletişim
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 font-semibold text-sm sm:text-base leading-relaxed max-w-2xl mx-auto"
          >
            Klimanız için acil servis, bakım randevusu veya fiyat teklifi almak istiyorsanız
            7/24 hattımızı arayın ya da formu doldurun, sizi geri arayalım.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14 max-w-3xl mx-auto"
          >
            {[
              { val: "7/24", label: "Acil Servis Hattı", icon: Clock },
              { val: "Aynı Gün", label: "Hızlı Müdahale", icon: Zap },
              { val: "10+ Yıl", label: "Sektör Deneyimi", icon: ShieldCheck },
              { val: "1 Yıl", label: "İşçilik Garantisi", icon: Snowflake },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="bg-white/6 border border-white/10 rounded-2xl p-4 flex items-center gap-3">
                  <Icon className="w-5 h-5 text-[#0EA5E9] shrink-0" />
                  <div className="text-left">
                    <div className="font-black text-white text-sm leading-none">{s.val}</div>
                    <div className="text-white/45 text-[9px] uppercase tracking-widest font-bold mt-1">{s.label}</div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ─── İLETİŞİM KARTLARI ─── */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 -mt-8 relative z-10 mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CONTACT_CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.a
                key={i}
                href={card.href}
                target={card.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="group bg-white border border-gray-100 rounded-[24px] p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-start gap-4"
              >
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${card.bg} transition-all group-hover:scale-110`}
                >
                  <Icon className="w-5 h-5" style={{ color: card.accent }} />
                </div>
                <div>
                  <div className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">{card.label}</div>
                  <div className="font-black text-gray-900 text-sm leading-tight break-all">{card.value}</div>
                  <div className="text-gray-400 text-[10px] font-semibold mt-0.5">{card.sub}</div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </section>

      {/* ─── FORM + BİLGİ ─── */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

          {/* ─── FORM ─── */}
          <motion.div
            className="lg:col-span-3 bg-white border border-gray-100 rounded-[32px] p-8 md:p-10 shadow-sm"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-50">
              <div className="w-10 h-10 rounded-2xl bg-[#0EA5E9]/10 flex items-center justify-center">
                <Send className="w-5 h-5 text-[#0EA5E9]" />
              </div>
              <div>
                <h2 className="font-black text-gray-900 uppercase tracking-tight text-lg">Servis Talep Formu</h2>
                <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Sizi geri arayalım</span>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center gap-5 py-10"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-emerald-500" />
                  </div>
                  <div>
                    <h3 className="font-black text-gray-900 text-lg uppercase tracking-tight">Talebiniz Alındı!</h3>
                    <p className="text-gray-500 font-semibold text-sm leading-relaxed mt-2 max-w-sm mx-auto">
                      Teknik ekibimiz en kısa sürede sizinle iletişime geçecektir.
                      Acil durumlar için 7/24 hattımızı arayabilirsiniz.
                    </p>
                  </div>
                  <a
                    href="tel:08500000000"
                    className="flex items-center gap-2 px-6 py-3.5 bg-[#0EA5E9] text-white font-black uppercase tracking-wider text-xs rounded-2xl hover:bg-[#0284C7] transition-all"
                  >
                    <Phone className="w-4 h-4" /> 0850 000 00 00
                  </a>
                  <button
                    onClick={() => setStatus("idle")}
                    className="text-gray-400 text-xs font-bold uppercase tracking-wider hover:text-gray-700 transition-colors cursor-pointer"
                  >
                    Yeni Talep Gönder
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  {/* Ad + Telefon */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className={labelCls}>Ad Soyad *</label>
                      <input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} placeholder="Ahmet Yılmaz" className={inputCls} />
                    </div>
                    <div>
                      <label htmlFor="phone" className={labelCls}>Telefon *</label>
                      <input id="phone" name="phone" type="tel" required value={formData.phone} onChange={handleChange} placeholder="0555 000 00 00" className={inputCls} />
                    </div>
                  </div>

                  {/* E-posta + İlçe */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className={labelCls}>E-Posta</label>
                      <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="ornek@demo.com" className={inputCls} />
                    </div>
                    <div>
                      <label htmlFor="district" className={labelCls}>Bulunduğunuz İlçe</label>
                      <select id="district" name="district" value={formData.district} onChange={handleChange} className={inputCls + " cursor-pointer"}>
                        <option value="">İlçe seçin...</option>
                        {["Adapazarı","Serdivan","Erenler","Arifiye","Hendek","Sapanca","Karasu","Kocaali","Kaynarca","Ferizli","Söğütlü","Geyve","Pamukova","Taraklı","Akyazı","Karapürçek"].map(d => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Hizmet Türü + Klima Markası */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="serviceType" className={labelCls}>Hizmet Türü *</label>
                      <select id="serviceType" name="serviceType" required value={formData.serviceType} onChange={handleChange} className={inputCls + " cursor-pointer"}>
                        <option value="">Hizmet seçin...</option>
                        {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="brand" className={labelCls}>Klima Markası</label>
                      <select id="brand" name="brand" value={formData.brand} onChange={handleChange} className={inputCls + " cursor-pointer"}>
                        <option value="">Marka seçin...</option>
                        {BRANDS.map(b => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Mesaj */}
                  <div>
                    <label htmlFor="message" className={labelCls}>Arıza veya Talep Açıklaması</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Klimanızda yaşadığınız problemi kısaca açıklayın..."
                      className={inputCls + " resize-none"}
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-red-500 text-xs font-bold bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                      Gönderim sırasında bir hata oluştu. Lütfen tekrar deneyin veya telefon ile arayın.
                    </p>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-black uppercase tracking-wider text-xs rounded-2xl transition-all shadow-lg shadow-sky-500/20 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {status === "loading" ? (
                        <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Gönderiliyor...</>
                      ) : (
                        <><Send className="w-4 h-4" />Servis Talebi Gönder</>
                      )}
                    </button>
                    <a
                      href="https://wa.me/905550000000?text=Merhaba%2C%20klima%20servis%20talebi%20i%C3%A7in%20ileti%C5%9Fime%20ge%C3%A7iyorum."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-6 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-black uppercase tracking-wider text-xs rounded-2xl transition-all hover:-translate-y-0.5 shadow-lg shadow-emerald-500/20"
                    >
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp (Demo)
                    </a>
                  </div>

                  <p className="text-gray-400 text-[10px] font-semibold text-center leading-relaxed">
                    Bilgileriniz yalnızca servis talebiniz için kullanılır. Üçüncü taraflarla paylaşılmaz.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ─── SAĞ BİLGİ PANELİ ─── */}
          <motion.div
            className="lg:col-span-2 space-y-5"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Çalışma Saatleri */}
            <div className="bg-white border border-gray-100 rounded-[28px] p-7 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl bg-[#0EA5E9]/10 flex items-center justify-center">
                  <Clock className="w-4.5 h-4.5 text-[#0EA5E9]" />
                </div>
                <h3 className="font-black text-gray-900 text-sm uppercase tracking-tight">Çalışma Saatleri</h3>
              </div>
              <div className="space-y-3">
                {[
                  { gun: "Hafta İçi (Pzt–Cum)", saat: "08:00 – 20:00" },
                  { gun: "Cumartesi", saat: "09:00 – 18:00" },
                  { gun: "Pazar", saat: "10:00 – 16:00" },
                  { gun: "Acil Klima Servisi", saat: "7/24 — 365 gün", vurgu: true },
                ].map((item, i) => (
                  <div key={i} className={`flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0 ${item.vurgu ? "bg-[#0EA5E9]/5 rounded-xl px-3 -mx-3" : ""}`}>
                    <span className={`text-xs font-semibold ${item.vurgu ? "text-[#0EA5E9] font-black" : "text-gray-600"}`}>{item.gun}</span>
                    <span className={`text-xs font-black uppercase tracking-wider ${item.vurgu ? "text-[#0EA5E9]" : "text-gray-900"}`}>{item.saat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hizmet Listesi */}
            <div className="bg-white border border-gray-100 rounded-[28px] p-7 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center">
                    <Wrench className="w-4.5 h-4.5 text-emerald-600" />
                  </div>
                  <h3 className="font-black text-gray-900 text-sm uppercase tracking-tight">Hizmetlerimiz</h3>
                </div>
                <Link href="/hizmetler" className="text-[10px] font-black text-[#0EA5E9] uppercase tracking-wider hover:underline">
                  Tümü
                </Link>
              </div>
              <div className="space-y-1">
                {[
                  { icon: Wrench,    text: "Arıza Tespiti & Onarım", color: "text-[#0EA5E9]", bg: "bg-[#0EA5E9]/8", href: "/hizmetler/ariza-servis-7-24" },
                  { icon: Snowflake, text: "Periyodik Klima Bakımı", color: "text-emerald-600", bg: "bg-emerald-50", href: "/hizmetler/periyodik-kontrol" },
                  { icon: Droplets,  text: "R32 / R410A Gaz Dolumu", color: "text-violet-600", bg: "bg-violet-50", href: "/hizmetler/gaz-dolumu" },
                  { icon: Wind,      text: "Klima Montajı & Sökümü", color: "text-amber-600", bg: "bg-amber-50", href: "/hizmetler/klima-montaj" },
                  { icon: Zap,       text: "BTU & Güç Hesaplama",    color: "text-orange-600", bg: "bg-orange-50", href: "/hesaplama-araclari" },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={i}
                      href={item.href}
                      className="flex items-center justify-between p-2.5 rounded-xl border border-transparent hover:border-gray-100 hover:bg-[#F8FAFC] transition-all group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${item.bg}`}>
                          <Icon className={`w-4 h-4 ${item.color}`} />
                        </div>
                        <span className="text-gray-700 text-xs font-bold group-hover:text-[#0EA5E9] transition-colors">{item.text}</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#0EA5E9] group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Acil Arama */}
            <div className="bg-gradient-to-br from-[#0EA5E9] to-[#0284C7] rounded-[28px] p-7 text-white shadow-lg shadow-sky-500/20">
              <div className="text-white/70 text-[10px] font-black uppercase tracking-widest mb-2">7/24 Acil Klima Servisi (Demo)</div>
              <div className="font-black text-2xl mb-1">0850 000 00 00</div>
              <p className="text-white/70 text-xs font-semibold mb-5 leading-relaxed">
                Klimanız çalışmıyor mu? Hemen arayın, en yakın ekibi yönlendirelim.
              </p>
              <a
                href="tel:08500000000"
                className="flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-white text-[#0284C7] font-black uppercase tracking-wider text-xs rounded-2xl hover:bg-white/90 transition-all"
              >
                <Phone className="w-4 h-4" />
                Şimdi Ara (Demo)
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── HARİTA (DEMO KONUM) ─── */}
      <section className="border-t border-gray-100 bg-white py-16">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="text-center mb-10">
            <span className="text-[#0EA5E9] font-black text-xs uppercase tracking-widest block mb-2">Harita & Konum (Demo)</span>
            <h2 className="font-black text-gray-900 text-2xl md:text-3xl uppercase tracking-tight">Bizi Bulun</h2>
            <div className="w-12 h-1.5 bg-[#0EA5E9] mx-auto rounded-full mt-4" />
          </div>
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            {/* Adres Kartı */}
            <div className="bg-[#F8FAFC] border border-gray-100 rounded-[28px] p-7 space-y-4 lg:w-80 shrink-0 shadow-sm">
              {[
                { icon: MapPin,  label: "Adres (Demo)", value: "Atatürk Bulvarı No: 100, Adapazarı / Sakarya" },
                { icon: Phone,   label: "Telefon (Demo)", value: "0850 000 00 00" },
                { icon: Mail,    label: "E-Posta (Demo)", value: "info@demo.com" },
                { icon: Clock,   label: "Acil Servis", value: "7/24 — 365 gün" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-start gap-3 py-2.5 border-b border-gray-100 last:border-0">
                    <div className="w-8 h-8 rounded-xl bg-[#0EA5E9]/10 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-[#0EA5E9]" />
                    </div>
                    <div>
                      <div className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-0.5">{item.label}</div>
                      <div className="text-gray-800 text-xs font-semibold">{item.value}</div>
                    </div>
                  </div>
                );
              })}
              <a
                href="https://maps.google.com/?q=Adapazarı+Atatürk+Bulvarı+Sakarya"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full mt-2 px-5 py-3 bg-[#0EA5E9] text-white font-black uppercase tracking-wider text-xs rounded-2xl hover:bg-[#0284C7] transition-all"
              >
                <ArrowRight className="w-4 h-4" />
                Yol Tarifi Al (Demo)
              </a>
            </div>

            {/* Harita Embed (Demo Location) */}
            <div className="flex-1 rounded-[28px] overflow-hidden border border-gray-100 shadow-sm" style={{ height: 420 }}>
              <iframe
                src="https://maps.google.com/maps?q=Sakarya+Adapazar%C4%B1+Atat%C3%BCrk+Bulvar%C4%B1&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Sakarya Uzman Klima Demo Konum"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
