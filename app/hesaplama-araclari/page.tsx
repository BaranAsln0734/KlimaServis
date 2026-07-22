"use client";

import React, { useState, useMemo } from "react";
import {
  Snowflake, Thermometer, Home, Building, Sun, Wind,
  ArrowRight, PhoneCall, Calculator, CheckCircle2, AlertTriangle, Info
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const EASE = [0.25, 0.1, 0.25, 1] as const;

// BTU Hesaplama Katsayıları
const BTU_PER_SQM_BASE = 500; // W/m² base
const FACTORS = {
  insulation: { good: 0.85, average: 1.0, poor: 1.25 },
  sun: { north: 0.9, east: 1.0, south: 1.15, west: 1.1 },
  floor: { low: 0.9, mid: 1.0, top: 1.1 },
  occupants: (n: number) => 1 + (n - 1) * 0.05,
  ceiling: (h: number) => h <= 2.6 ? 1.0 : h <= 3.0 ? 1.1 : 1.2,
};

// Klima kapasiteleri (BTU) ve önerilen modeller
const KLIMA_MODELLERI = [
  { btu: 9000,  ad: "9.000 BTU",  m2: "10-15 m²", kw: "2.6 kW",  enerji: "A++",  seri: "Split İnverter" },
  { btu: 12000, ad: "12.000 BTU", m2: "15-20 m²", kw: "3.5 kW",  enerji: "A++",  seri: "Split İnverter" },
  { btu: 18000, ad: "18.000 BTU", m2: "20-30 m²", kw: "5.2 kW",  enerji: "A+",   seri: "Split İnverter" },
  { btu: 24000, ad: "24.000 BTU", m2: "30-40 m²", kw: "7.0 kW",  enerji: "A+",   seri: "Split İnverter" },
  { btu: 36000, ad: "36.000 BTU", m2: "40-60 m²", kw: "10.5 kW", enerji: "A",    seri: "Kaset / Kanal Tipi" },
  { btu: 48000, ad: "48.000 BTU", m2: "60-80 m²", kw: "14.0 kW", enerji: "A",    seri: "VRF / Kanal Tipi" },
];

type InsType = "good" | "average" | "poor";
type SunType = "north" | "east" | "south" | "west";
type FloorType = "low" | "mid" | "top";

export default function HesaplamaAraclari() {
  // Inputs
  const [area, setArea] = useState<number>(20);
  const [ceilingH, setCeilingH] = useState<number>(2.7);
  const [insulation, setInsulation] = useState<InsType>("average");
  const [sunDir, setSunDir] = useState<SunType>("south");
  const [floorPos, setFloorPos] = useState<FloorType>("mid");
  const [occupants, setOccupants] = useState<number>(2);
  const [hasWindows, setHasWindows] = useState<boolean>(true);
  const [spaceType, setSpaceType] = useState<"home" | "office">("home");

  // Calculation
  const result = useMemo(() => {
    const base = area * BTU_PER_SQM_BASE; // Watt
    const fIns = FACTORS.insulation[insulation];
    const fSun = FACTORS.sun[sunDir];
    const fFloor = FACTORS.floor[floorPos];
    const fOcc = FACTORS.occupants(occupants);
    const fCeil = FACTORS.ceiling(ceilingH);
    const fWindow = hasWindows ? 1.1 : 1.0;
    const fSpace = spaceType === "office" ? 1.15 : 1.0;

    const totalW = base * fIns * fSun * fFloor * fOcc * fCeil * fWindow * fSpace;
    const totalBTU = totalW * 3.412; // 1 Watt = 3.412 BTU/h
    const totalKW = totalW / 1000;

    const recommended = KLIMA_MODELLERI.find(m => m.btu >= totalBTU) || KLIMA_MODELLERI[KLIMA_MODELLERI.length - 1];

    return { totalW: Math.round(totalW), totalBTU: Math.round(totalBTU), totalKW: totalKW.toFixed(1), recommended };
  }, [area, ceilingH, insulation, sunDir, floorPos, occupants, hasWindows, spaceType]);

  const getEfficiencyColor = (btu: number) => {
    if (btu <= 12000) return "text-emerald-600 bg-emerald-50 border-emerald-200";
    if (btu <= 24000) return "text-[#0EA5E9] bg-[#0EA5E9]/10 border-[#0EA5E9]/20";
    return "text-amber-600 bg-amber-50 border-amber-200";
  };

  return (
    <div className="min-h-screen bg-[#F0F4F8] text-[#1E293B] font-sans">
      <title>BTU Hesaplama — Klimam Kaç BTU Olmalı? | Sakarya Uzman Klima</title>
      <meta name="description" content="Odanız için doğru klima kapasitesini (BTU) hesaplayın. Alan, tavan yüksekliği, yalıtım ve güneş yönü gibi faktörlerle doğru klima boyutu bulun." />

      {/* ─── HERO ─── */}
      <section className="relative pt-[134px] pb-20 bg-[#0F172A] text-white overflow-hidden">
        <div className="absolute inset-0 bg-topo-waves pointer-events-none opacity-30" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-[#0EA5E9]/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#0EA5E9] font-black text-xs tracking-widest uppercase mb-6"
          >
            <Calculator className="w-4 h-4" />
            Ücretsiz BTU Hesaplama Aracı
          </motion.div>
          <h1 className="font-black text-white uppercase leading-none text-3xl sm:text-5xl md:text-6xl tracking-tight mb-4">
            Klimam Kaç BTU<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0EA5E9] to-[#38BDF8]">Olmalı?</span>
          </h1>
          <p className="text-gray-300 font-semibold text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Oda alanı, tavan yüksekliği, yalıtım durumu ve güneş yönü gibi tüm faktörleri hesaba katarak
            odanız için gereken doğru klima kapasitesini saniyeler içinde bulun.
          </p>
        </div>
      </section>

      {/* ─── HESAPLAYICI ─── */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* ─── SOL: Input Formu ─── */}
          <div className="bg-white border border-gray-100 rounded-[32px] p-8 shadow-sm space-y-7">
            <div className="flex items-center gap-3 pb-5 border-b border-gray-50">
              <div className="w-10 h-10 rounded-2xl bg-[#0EA5E9]/10 flex items-center justify-center">
                <Snowflake className="w-5 h-5 text-[#0EA5E9]" />
              </div>
              <div>
                <h2 className="font-black text-gray-900 text-base uppercase tracking-tight">Ortam Bilgileri</h2>
                <span className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Alanınıza ait detayları girin</span>
              </div>
            </div>

            {/* Mekan Tipi */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-gray-400 mb-2">Mekan Tipi</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { key: "home", label: "Konut / Ev", icon: Home },
                  { key: "office", label: "Ofis / İşyeri", icon: Building },
                ].map(opt => {
                  const Icon = opt.icon;
                  return (
                    <button
                      key={opt.key}
                      onClick={() => setSpaceType(opt.key as "home" | "office")}
                      className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl border text-xs font-black uppercase tracking-wide cursor-pointer transition-all ${
                        spaceType === opt.key
                          ? "bg-[#0EA5E9] text-white border-[#0EA5E9] shadow-md shadow-sky-500/15"
                          : "bg-gray-50 text-gray-600 border-gray-100 hover:border-gray-300"
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Alan + Tavan */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-gray-400 mb-2">
                  Oda Alanı (m²)
                </label>
                <input
                  type="number"
                  min={5}
                  max={500}
                  value={area}
                  onChange={e => setArea(Math.max(5, Number(e.target.value)))}
                  className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:border-[#0EA5E9] focus:ring-4 focus:ring-sky-500/5 font-black text-sm"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-gray-400 mb-2">
                  Tavan Yüksekliği (m)
                </label>
                <input
                  type="number"
                  min={2.2}
                  max={6}
                  step={0.1}
                  value={ceilingH}
                  onChange={e => setCeilingH(Math.max(2.2, Number(e.target.value)))}
                  className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:border-[#0EA5E9] focus:ring-4 focus:ring-sky-500/5 font-black text-sm"
                />
              </div>
            </div>

            {/* Yalıtım */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-gray-400 mb-2">Yalıtım Durumu</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { key: "good",    label: "İyi",     desc: "Çift cam + yalıtım" },
                  { key: "average", label: "Orta",    desc: "Tek cam, kısmi" },
                  { key: "poor",    label: "Zayıf",   desc: "Yalıtımsız, eski" },
                ].map(opt => (
                  <button
                    key={opt.key}
                    onClick={() => setInsulation(opt.key as InsType)}
                    className={`flex flex-col items-center px-2 py-3 rounded-2xl border text-center cursor-pointer transition-all ${
                      insulation === opt.key
                        ? "bg-[#0EA5E9] text-white border-[#0EA5E9] shadow-sm"
                        : "bg-gray-50 text-gray-600 border-gray-100 hover:border-gray-300"
                    }`}
                  >
                    <span className="text-[11px] font-black uppercase tracking-wide">{opt.label}</span>
                    <span className={`text-[9px] mt-0.5 ${insulation === opt.key ? "text-white/70" : "text-gray-400"}`}>{opt.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Güneş Yönü */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-gray-400 mb-2">
                <Sun className="w-3 h-3 inline mr-1" />Pencere Cephesi (Güneş Yönü)
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { key: "north", label: "Kuzey" },
                  { key: "east",  label: "Doğu" },
                  { key: "south", label: "Güney" },
                  { key: "west",  label: "Batı" },
                ].map(opt => (
                  <button
                    key={opt.key}
                    onClick={() => setSunDir(opt.key as SunType)}
                    className={`py-3 rounded-2xl border text-[11px] font-black uppercase tracking-wide cursor-pointer transition-all ${
                      sunDir === opt.key
                        ? "bg-[#0EA5E9] text-white border-[#0EA5E9] shadow-sm"
                        : "bg-gray-50 text-gray-600 border-gray-100 hover:border-gray-300"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Kat Konumu */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-gray-400 mb-2">Kat Konumu</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { key: "low",  label: "Alt Katlar", desc: "1–3. kat arası" },
                  { key: "mid",  label: "Orta Katlar", desc: "4–7. kat arası" },
                  { key: "top",  label: "Üst Katlar",  desc: "Son kat / çatı" },
                ].map(opt => (
                  <button
                    key={opt.key}
                    onClick={() => setFloorPos(opt.key as FloorType)}
                    className={`flex flex-col items-center px-2 py-3 rounded-2xl border text-center cursor-pointer transition-all ${
                      floorPos === opt.key
                        ? "bg-[#0EA5E9] text-white border-[#0EA5E9] shadow-sm"
                        : "bg-gray-50 text-gray-600 border-gray-100 hover:border-gray-300"
                    }`}
                  >
                    <span className="text-[11px] font-black uppercase tracking-wide">{opt.label}</span>
                    <span className={`text-[9px] mt-0.5 ${floorPos === opt.key ? "text-white/70" : "text-gray-400"}`}>{opt.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Kişi Sayısı + Cam */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-gray-400 mb-2">Sürekli Kişi Sayısı</label>
                <div className="flex items-center border border-gray-200 rounded-2xl overflow-hidden bg-gray-50">
                  <button onClick={() => setOccupants(Math.max(1, occupants - 1))} className="px-4 py-3 font-black text-gray-600 hover:bg-gray-100 cursor-pointer transition-colors">−</button>
                  <span className="flex-1 text-center font-black text-gray-900 text-sm">{occupants}</span>
                  <button onClick={() => setOccupants(Math.min(20, occupants + 1))} className="px-4 py-3 font-black text-gray-600 hover:bg-gray-100 cursor-pointer transition-colors">+</button>
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-gray-400 mb-2">Büyük Cam Yüzey</label>
                <div className="grid grid-cols-2 gap-2 h-[46px]">
                  {[
                    { key: true,  label: "Evet" },
                    { key: false, label: "Hayır" },
                  ].map(opt => (
                    <button
                      key={String(opt.key)}
                      onClick={() => setHasWindows(opt.key)}
                      className={`rounded-2xl border text-[11px] font-black uppercase tracking-wide cursor-pointer transition-all ${
                        hasWindows === opt.key
                          ? "bg-[#0EA5E9] text-white border-[#0EA5E9]"
                          : "bg-gray-50 text-gray-600 border-gray-100 hover:border-gray-300"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ─── SAĞ: Sonuç Paneli ─── */}
          <div className="space-y-5">
            {/* Ana Sonuç */}
            <motion.div
              key={result.totalBTU}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="bg-[#0F172A] rounded-[32px] p-8 text-white shadow-xl shadow-slate-900/10"
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-xl bg-[#0EA5E9]/20 flex items-center justify-center">
                  <Thermometer className="w-4 h-4 text-[#0EA5E9]" />
                </div>
                <span className="text-[#0EA5E9] font-black text-xs uppercase tracking-widest">Hesaplama Sonucu</span>
              </div>

              <div className="text-center py-4">
                <div className="text-6xl sm:text-7xl font-black text-white leading-none">
                  {result.totalBTU.toLocaleString("tr-TR")}
                </div>
                <div className="text-[#0EA5E9] font-black text-xl uppercase tracking-wider mt-1">BTU/saat</div>
                <div className="text-white/50 text-sm font-semibold mt-2">≈ {result.totalKW} kW soğutma kapasitesi</div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-white/10">
                <div className="text-center">
                  <div className="text-white/40 text-[9px] uppercase tracking-widest font-bold mb-1">Alan</div>
                  <div className="text-white font-black text-base">{area} m²</div>
                </div>
                <div className="text-center">
                  <div className="text-white/40 text-[9px] uppercase tracking-widest font-bold mb-1">Tavan</div>
                  <div className="text-white font-black text-base">{ceilingH} m</div>
                </div>
              </div>
            </motion.div>

            {/* Önerilen Klima */}
            <motion.div
              key={result.recommended.btu}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: EASE, delay: 0.1 }}
              className="bg-white border border-gray-100 rounded-[32px] p-7 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-5">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span className="text-emerald-600 font-black text-xs uppercase tracking-widest">Önerilen Kapasite</span>
              </div>

              <div className="flex items-end justify-between mb-4">
                <div>
                  <div className={`inline-block px-3 py-1.5 rounded-xl border text-sm font-black uppercase tracking-wide mb-2 ${getEfficiencyColor(result.recommended.btu)}`}>
                    {result.recommended.ad}
                  </div>
                  <div className="text-gray-500 text-xs font-bold">
                    {result.recommended.seri} • {result.recommended.kw} • Enerji Sınıfı {result.recommended.enerji}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-gray-400 text-[9px] font-black uppercase tracking-widest">İdeal Alan</div>
                  <div className="text-gray-900 font-black text-sm">{result.recommended.m2}</div>
                </div>
              </div>

              <div className="flex items-start gap-2 bg-amber-50 border border-amber-100 rounded-2xl px-4 py-3">
                <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-amber-700 text-[10px] font-semibold leading-relaxed">
                  Bu sonuç teorik bir hesaplamadır. Kesin kapasite tespiti için uzman teknik ekibimiz ücretsiz saha ölçümü yapabilir.
                </p>
              </div>
            </motion.div>

            {/* Tüm Modeller */}
            <div className="bg-white border border-gray-100 rounded-[32px] p-6 shadow-sm">
              <h3 className="font-black text-gray-700 text-xs uppercase tracking-widest mb-4">Klima Kapasiteleri Tablosu</h3>
              <div className="space-y-2">
                {KLIMA_MODELLERI.map(m => (
                  <div
                    key={m.btu}
                    className={`flex items-center justify-between px-4 py-2.5 rounded-xl border text-xs transition-all ${
                      result.recommended.btu === m.btu
                        ? "bg-[#0EA5E9]/8 border-[#0EA5E9]/20"
                        : "bg-gray-50 border-gray-100"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {result.recommended.btu === m.btu && <div className="w-1.5 h-1.5 rounded-full bg-[#0EA5E9]" />}
                      <span className={`font-black uppercase tracking-tight ${result.recommended.btu === m.btu ? "text-[#0EA5E9]" : "text-gray-600"}`}>
                        {m.ad}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-gray-400 font-semibold">
                      <span>{m.m2}</span>
                      <span className="hidden sm:block">{m.kw}</span>
                      <span className={`px-1.5 py-0.5 rounded font-black text-[9px] ${
                        m.enerji === "A++" ? "bg-emerald-100 text-emerald-700" :
                        m.enerji === "A+"  ? "bg-blue-100 text-blue-700" :
                        "bg-gray-100 text-gray-600"
                      }`}>{m.enerji}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-[#0EA5E9] to-[#0284C7] rounded-[32px] p-7 text-white shadow-lg shadow-sky-500/20">
              <div className="flex items-start gap-3 mb-5">
                <Wind className="w-6 h-6 shrink-0 mt-0.5 opacity-70" />
                <div>
                  <div className="font-black uppercase tracking-tight text-base">Klima Seçiminizi Yapalım!</div>
                  <div className="text-white/70 text-xs font-semibold mt-1 leading-relaxed">
                    Sonuçlarınızı teknik ekibimize iletin, size en uygun marka ve modeli öneren ücretsiz danışmanlık hizmeti alın.
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="tel:08503085454"
                  className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-[#0284C7] font-black uppercase tracking-wider text-xs hover:bg-white/90 transition-all shadow-md"
                >
                  <PhoneCall className="w-4 h-4" />
                  0850 308 54 54
                </a>
                <Link
                  href="/iletisim"
                  className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white/15 border border-white/20 text-white font-black uppercase tracking-wider text-xs hover:bg-white/25 transition-all"
                >
                  Fiyat Teklifi Al <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── BTU NEDİR BİLGİ KUTUSU ─── */}
      <section className="border-t border-gray-100 bg-white py-16">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="text-center mb-12">
            <span className="text-[#0EA5E9] font-black uppercase tracking-widest text-xs block mb-2">BTU Nedir?</span>
            <h2 className="font-black text-gray-900 uppercase tracking-tight text-2xl md:text-4xl">Klima Kapasitesini Etkileyen Faktörler</h2>
            <div className="w-12 h-1.5 bg-[#0EA5E9] mx-auto rounded-full mt-4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Home,
                title: "Alan ve Hacim",
                desc: "Oda metrekaresi ile tavan yüksekliği, soğutulacak hacmi belirler. Yüksek tavanlı mekanlarda BTU ihtiyacı orantılı artar."
              },
              {
                icon: Sun,
                title: "Güneş Maruziyeti",
                desc: "Güney cepheli veya büyük cam yüzeyli odalarda güneş ısı yükü %15-25 artış gerektirir. Kuzey cepheli odalar daha düşük kapasiteyle soğutulabilir."
              },
              {
                icon: CheckCircle2,
                title: "Yalıtım Kalitesi",
                desc: "Çift cam, yalıtımlı duvarlar ve sızdırmaz kapılar gereken BTU kapasitesini %15-25 azaltabilir. Yalıtımsız binalarda kapasiteyi büyütün."
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="bg-[#F8FAFC] border border-gray-100 rounded-[28px] p-6 space-y-3">
                  <div className="w-11 h-11 rounded-2xl bg-[#0EA5E9]/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#0EA5E9]" />
                  </div>
                  <h3 className="font-black text-gray-900 text-sm uppercase tracking-tight">{item.title}</h3>
                  <p className="text-gray-500 text-xs font-semibold leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}
