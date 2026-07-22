"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { 
  Zap, 
  Trash2, 
  Calculator, 
  ArrowRight, 
  Tv, 
  Lightbulb, 
  Laptop, 
  Flame, 
  Wind, 
  Lock, 
  Coffee, 
  Activity, 
  Thermometer, 
  Hammer, 
  Radio, 
  Smartphone,
  CheckCircle2,
  PhoneCall
} from "lucide-react";

interface Device {
  name: string;
  watt: number;
  category: string;
  multiplier?: number;
}

const DEVICES: Device[] = [
  { name: "51 Ekran Televizyon", watt: 300, category: "Elektronik", multiplier: 1.0 },
  { name: "Ampul", watt: 70, category: "Aydınlatma", multiplier: 1.0 },
  { name: "Asansör", watt: 25000, category: "Ağır Cihazlar", multiplier: 3.0 },
  { name: "Ayak Isıtıcı", watt: 1500, category: "Isıtma/Soğutma", multiplier: 1.0 },
  { name: "Aydınlatma (LED)", watt: 20, category: "Aydınlatma", multiplier: 1.0 },
  { name: "Bilgisayar", watt: 800, category: "Elektronik", multiplier: 1.0 },
  { name: "Bulaşık Makinesi", watt: 500, category: "Mutfak", multiplier: 1.5 },
  { name: "Buzdolabı", watt: 500, category: "Mutfak", multiplier: 2.5 },
  { name: "Çamaşır Kurutucu", watt: 5750, category: "Ev Aletleri", multiplier: 1.2 },
  { name: "Çamaşır Makinesi", watt: 1150, category: "Ev Aletleri", multiplier: 2.0 },
  { name: "Derin Dondurucu", watt: 400, category: "Mutfak", multiplier: 2.5 },
  { name: "Dış Aydınlatma", watt: 100, category: "Aydınlatma", multiplier: 1.0 },
  { name: "DVD Oynatıcı", watt: 100, category: "Elektronik", multiplier: 1.0 },
  { name: "Elektrikli Ocak", watt: 2100, category: "Mutfak", multiplier: 1.0 },
  { name: "Elektrikli Süpürge", watt: 1200, category: "Ev Aletleri", multiplier: 1.8 },
  { name: "Elektrikli Testere", watt: 1500, category: "Endüstriyel/Atölye", multiplier: 2.0 },
  { name: "Fırın", watt: 700, category: "Mutfak", multiplier: 1.0 },
  { name: "Garaj Kapısı", watt: 550, category: "Ağır Cihazlar", multiplier: 2.0 },
  { name: "Güvenlik Sistemi", watt: 1000, category: "Elektronik", multiplier: 1.0 },
  { name: "Hidrofor (Küçük)", watt: 1500, category: "Ağır Cihazlar", multiplier: 3.0 },
  { name: "Hidrofor (Büyük)", watt: 12000, category: "Ağır Cihazlar", multiplier: 3.0 },
  { name: "Kahve Makinesi", watt: 1000, category: "Mutfak", multiplier: 1.0 },
  { name: "Klima (24.000 BTU)", watt: 3250, category: "Isıtma/Soğutma", multiplier: 2.5 },
  { name: "Klima (18.000 BTU)", watt: 2000, category: "Isıtma/Soğutma", multiplier: 2.5 },
  { name: "Klima (9.000 BTU)", watt: 1000, category: "Isıtma/Soğutma", multiplier: 2.5 },
  { name: "Kombi", watt: 170, category: "Isıtma/Soğutma", multiplier: 1.1 },
  { name: "Kuyu Pompası", watt: 1000, category: "Ağır Cihazlar", multiplier: 3.0 },
  { name: "LCD Televizyon", watt: 500, category: "Elektronik", multiplier: 1.0 },
  { name: "Matkap", watt: 1000, category: "Endüstriyel/Atölye", multiplier: 2.0 },
  { name: "Radyo", watt: 50, category: "Elektronik", multiplier: 1.0 },
  { name: "Saç Kurutma Makinesi", watt: 1200, category: "Ev Aletleri", multiplier: 1.0 },
  { name: "Ses Sistemi", watt: 500, category: "Elektronik", multiplier: 1.0 },
  { name: "Tasarruflu Ampul", watt: 20, category: "Aydınlatma", multiplier: 1.0 },
  { name: "Televizyon", watt: 150, category: "Elektronik", multiplier: 1.0 },
  { name: "Ütü", watt: 1200, category: "Ev Aletleri", multiplier: 1.0 },
  { name: "Vantilatör", watt: 200, category: "Isıtma/Soğutma", multiplier: 1.5 },
  { name: "Diğer (Genel Yük)", watt: 1000, category: "Elektronik", multiplier: 1.0 }
];

const STANDARD_GENERATORS = [10, 15, 22, 33, 50, 75, 110, 150, 220, 275, 330, 400, 550, 700, 820, 1000, 1400, 2000];

export default function PowerWizard() {
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [manualKVA, setManualKVA] = useState<string>("0");
  const [activeFilter, setActiveFilter] = useState<string>("Tümü");
  const [pf, setPf] = useState<number>(0.80);
  const [safetyMargin, setSafetyMargin] = useState<number>(1.25);

  const categories = useMemo(() => {
    return ["Tümü", ...Array.from(new Set(DEVICES.map(d => d.category)))];
  }, []);

  const filteredDevices = useMemo(() => {
    if (activeFilter === "Tümü") return DEVICES;
    return DEVICES.filter(d => d.category === activeFilter);
  }, [activeFilter]);

  const handleQuantity = (name: string, direction: "inc" | "dec") => {
    setQuantities(prev => {
      const current = prev[name] || 0;
      const next = direction === "inc" ? current + 1 : Math.max(0, current - 1);
      return { ...prev, [name]: next };
    });
  };

  const handleReset = () => {
    setQuantities({});
    setManualKVA("0");
    setPf(0.80);
    setSafetyMargin(1.25);
  };

  const totalWatt = useMemo(() => {
    return DEVICES.reduce((sum, device) => {
      const qty = quantities[device.name] || 0;
      return sum + (device.watt * qty);
    }, 0);
  }, [quantities]);

  const totalKW = useMemo(() => {
    return totalWatt / 1000;
  }, [totalWatt]);

  const totalKVA = useMemo(() => {
    const wattKVA = totalKW / pf;
    const addedKVA = parseFloat(manualKVA) || 0;
    return wattKVA + addedKVA;
  }, [totalKW, pf, manualKVA]);

  const recommendedKVA = useMemo(() => {
    return totalKVA * safetyMargin;
  }, [totalKVA, safetyMargin]);

  const snappedGenerator = useMemo(() => {
    if (recommendedKVA === 0) return "0";
    if (recommendedKVA < 10) {
      return recommendedKVA.toFixed(1);
    }
    return (STANDARD_GENERATORS.find(g => g >= recommendedKVA) || 2000).toString();
  }, [recommendedKVA]);

  return (
    <div className="min-h-screen bg-[#F4F6F9] text-gray-700 pt-32 pb-20 relative overflow-hidden font-sans">
      {/* Soft light decorative gradients */}
      <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-[#FFCC00]/5 via-transparent to-transparent pointer-events-none -z-10" />
      <div className="absolute top-1/4 left-[-10%] w-[500px] h-[500px] bg-[#FFCC00]/3 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-[1600px] mx-auto px-6 md:px-10 relative z-10">
        
        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-150 text-[#E6B800] font-black text-[10px] tracking-widest uppercase shadow-xs">
            <Calculator className="w-4 h-4" />
            Jeneratör Güç Analizi
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 uppercase tracking-tight leading-none">
            Güç İhtiyaç Analiz Aracı
          </h1>
          <div className="w-20 h-1.5 bg-[#FFCC00] mx-auto mt-2" />
          <p className="text-gray-500 font-semibold text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            Tesisinizde veya evinizde kullandığınız cihazların adetlerini girerek ihtiyacınız olan jeneratör gücünü gerçek zamanlı hesaplayın.
          </p>
        </div>

        {/* Top Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Manual Input Card */}
          <div className="bg-white p-6 rounded-[32px] border border-gray-150 shadow-xs flex flex-col justify-between">
            <div>
              <label className="text-[10px] font-black uppercase tracking-wider text-gray-400 block mb-3">
                Ekstra kVA Yükü Ekle
              </label>
              <input
                type="number"
                min="0"
                value={manualKVA}
                onChange={(e) => setManualKVA(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-lg font-bold text-gray-900 focus:outline-none focus:border-[#FFCC00] focus:bg-white transition-colors"
                placeholder="Ekstra kVA"
              />
            </div>
            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mt-4">
              Cihaz dışı bilinen kVA yükleri için
            </p>
          </div>

          {/* Total Watt Card */}
          <div className="bg-white p-6 rounded-[32px] border border-gray-150 shadow-xs flex flex-col justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block mb-3">
              Toplam Aktif Güç
            </span>
            <div>
              <span className="text-3xl sm:text-4xl font-black text-gray-900">{totalWatt.toLocaleString("tr-TR")}</span>
              <span className="text-sm font-bold text-[#E6B800] ml-2">W</span>
            </div>
            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mt-4">
              Seçilen Cihaz Gücü Toplamı
            </p>
          </div>

          {/* Total kVA Card */}
          <div className="bg-white p-6 rounded-[32px] border border-gray-150 shadow-xs flex flex-col justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block mb-3">
              Toplam Güç (kVA)
            </span>
            <div>
              <span className="text-3xl sm:text-4xl font-black text-gray-900">{totalKVA.toFixed(2)}</span>
              <span className="text-sm font-bold text-[#E6B800] ml-2">kVA</span>
            </div>
            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mt-4">
              Güç Faktörü (Cos φ = {pf}) Dahil
            </p>
          </div>

          {/* Recommended kVA Card */}
          <div className="bg-[#FFCC00] text-black p-6 rounded-[32px] shadow-lg shadow-[#FFCC00]/10 flex flex-col justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider text-black/60 block mb-3">
              Önerilen Jeneratör Gücü
            </span>
            <div>
              <span className="text-3xl sm:text-4xl font-black">{snappedGenerator}</span>
              <span className="text-sm font-bold text-black/60 ml-2">kVA</span>
            </div>
            <p className="text-[9px] text-black/50 font-bold uppercase tracking-wider mt-4">
              Net Güç İhtiyacına Göre Belirlendi
            </p>
          </div>
        </div>

        {/* Reset & Instructions Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-gray-150 p-6 rounded-3xl mb-12 shadow-xs">
          <p className="text-xs sm:text-sm font-bold text-gray-500 text-center sm:text-left">
            Aşağıdaki cihazların adetlerini <span className="text-[#FFCC00] font-black">+ / -</span> butonları ile ayarlayın. Hesaplama otomatik gerçekleşir.
          </p>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors font-black uppercase tracking-wider text-xs border border-red-100 shrink-0 cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            Tümünü Sıfırla
          </button>
        </div>

        {/* Filter Categories */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200 pb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-3 rounded-2xl font-bold uppercase tracking-widest text-[10px] transition-all duration-200 cursor-pointer
                ${activeFilter === cat 
                  ? "bg-[#FFCC00] text-black border-[#FFCC00] shadow-sm shadow-[#FFCC00]/25" 
                  : "bg-white text-gray-500 border border-gray-200 hover:border-gray-300 hover:text-gray-700"}
              `}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Devices Grid List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {filteredDevices.map((device) => {
            const qty = quantities[device.name] || 0;
            return (
              <div 
                key={device.name}
                className={`bg-white border rounded-[24px] p-6 transition-all duration-300 flex flex-col justify-between
                  ${qty > 0 ? "border-[#FFCC00] ring-4 ring-[#FFCC00]/5 shadow-md" : "border-gray-150 hover:border-gray-300 hover:-translate-y-0.5 shadow-xs"}
                `}
              >
                <div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 bg-gray-50 border border-gray-150 px-2.5 py-1 rounded-md mb-3 inline-block">
                    {device.category}
                  </span>
                  <h3 className="font-bold text-gray-800 text-base leading-snug mb-1">
                    {device.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#E6B800] mb-4">
                    <Zap className="w-3.5 h-3.5 fill-[#FFCC00]/10" />
                    <span>{device.watt} Watt</span>
                  </div>
                </div>

                {/* Counter Control */}
                <div className="flex items-center justify-between bg-gray-50 p-1 rounded-xl border border-gray-100">
                  <button
                    onClick={() => handleQuantity(device.name, "dec")}
                    className="w-8 h-8 rounded-lg bg-white border border-gray-200 hover:border-gray-300 text-gray-600 font-bold text-sm hover:bg-gray-100 transition-colors flex items-center justify-center shrink-0 select-none cursor-pointer"
                  >
                    -
                  </button>
                  <span className="flex-grow text-center font-black text-gray-800 text-sm select-none">
                    {qty}
                  </span>
                  <button
                    onClick={() => handleQuantity(device.name, "inc")}
                    className="w-8 h-8 rounded-lg bg-white border border-gray-200 hover:border-gray-300 text-gray-600 font-bold text-sm hover:bg-gray-100 transition-colors flex items-center justify-center shrink-0 select-none cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Calculation Details Box */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-16">
          <div className="lg:col-span-2 bg-white rounded-[32px] border border-gray-150 p-8 md:p-12 space-y-8 relative overflow-hidden shadow-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
              
              {/* Hesap Parametreleri */}
              <div className="space-y-4">
                <h3 className="font-black text-lg text-gray-900 uppercase tracking-tight border-b-2 border-[#FFCC00] pb-2 inline-block mb-2">
                  Hesap Parametreleri
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-gray-400 mb-1.5">
                      Güç Faktörü (PF / Cos φ)
                    </label>
                    <input
                      type="number"
                      step="0.05"
                      min="0.1"
                      max="1"
                      value={pf}
                      onChange={(e) => setPf(parseFloat(e.target.value) || 0.8)}
                      className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-sm font-semibold text-gray-900 focus:outline-none focus:border-[#FFCC00] focus:bg-white transition-colors"
                    />
                    <span className="block mt-1 text-[10px] text-gray-400">Tipik aralık: 0,80 – 0,95</span>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-gray-400 mb-1.5">
                      Güvenlik Payı (Katsayı)
                    </label>
                    <input
                      type="number"
                      step="0.05"
                      min="1"
                      max="2"
                      value={safetyMargin}
                      onChange={(e) => setSafetyMargin(parseFloat(e.target.value) || 1.25)}
                      className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-sm font-semibold text-gray-900 focus:outline-none focus:border-[#FFCC00] focus:bg-white transition-colors"
                    />
                    <span className="block mt-1 text-[10px] text-gray-400">Önerilen: 1,25 (%25 güvenlik marjı)</span>
                  </div>
                </div>
              </div>

              {/* Sonuç Detayları */}
              <div className="space-y-4">
                <h3 className="font-black text-lg text-gray-900 uppercase tracking-tight border-b-2 border-[#FFCC00] pb-2 inline-block mb-2">
                  Detaylı Sonuçlar
                </h3>
                <div className="space-y-3 text-xs sm:text-sm font-semibold text-gray-500 leading-relaxed">
                  <p className="flex items-center justify-between border-b border-gray-100 pb-2">
                    <span>Toplam Aktif Yük:</span>
                    <strong className="text-gray-900 font-black">{(totalWatt / 1000).toFixed(2)} kW</strong>
                  </p>
                  <p className="flex items-center justify-between border-b border-gray-100 pb-2">
                    <span>Ham Güç İhtiyacı:</span>
                    <strong className="text-gray-900 font-black">{totalKVA.toFixed(2)} kVA</strong>
                  </p>
                  <p className="flex items-center justify-between border-b border-gray-100 pb-2">
                    <span>Güvenlik Paylı Yük:</span>
                    <strong className="text-[#E6B800] font-black">{recommendedKVA.toFixed(2)} kVA</strong>
                  </p>
                  <p className="flex items-center justify-between border-b border-gray-100 pb-2">
                    <span>Önerilen Standart Jeneratör:</span>
                    <strong className="text-gray-900 font-black">{snappedGenerator} kVA</strong>
                  </p>
                </div>
              </div>

            </div>
          </div>

          <div className="bg-[#0F1923] text-white rounded-[32px] p-8 md:p-12 flex flex-col justify-between border border-white/5 relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-topo-waves pointer-events-none opacity-30 z-0" />
            
            <div className="relative z-10 space-y-6">
              <h3 className="text-[#FFCC00] font-black text-xs uppercase tracking-widest">
                Önerilen Jeneratör Gücü
              </h3>
              <div className="flex items-baseline">
                <span className="text-5xl sm:text-6xl font-black tracking-tight text-white">{snappedGenerator}</span>
                <span className="text-xl font-bold text-[#FFCC00] ml-2">kVA</span>
              </div>
              <p className="text-white/60 text-xs sm:text-sm leading-relaxed font-semibold">
                Tesisiniz için güvenli kullanım sınırlarında çalışacak en uygun jeneratör gücü belirlenmiştir. Teklif veya detaylı keşif talebi oluşturabilirsiniz.
              </p>
            </div>
            
            <div className="relative z-10 flex flex-col gap-3 mt-8">
              <a
                href={`https://wa.me/905496213460?text=Merhaba%2C%20sitenizdeki%20g%C3%BC%C3%A7%20analiz%20arac%C4%B1%20ile%20hesaplama%20yapt%C4%B1m.%20%C3%96nerilen%20jenerat%C3%B6r%20g%C3%BCc%C3%BC%3A%20${snappedGenerator}%20kVA.%20Fiyat%20teklifi%20alabilir%20miyim%3F`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-[#FFCC00] text-black font-black uppercase tracking-widest text-xs hover:bg-[#E6B800] transition-all hover:-translate-y-0.5 shadow-md shadow-[#FFCC00]/15"
              >
                Hemen Fiyat Al
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="tel:+905496213460"
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-black uppercase tracking-widest text-xs transition-all hover:-translate-y-0.5"
              >
                <PhoneCall className="w-4 h-4 text-[#FFCC00]" />
                Bizi Arayın
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
