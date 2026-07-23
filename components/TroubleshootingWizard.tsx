"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Wrench, 
  Flame, 
  Snowflake, 
  Droplets, 
  Wind, 
  Zap, 
  ShieldCheck, 
  HelpCircle, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  PhoneCall, 
  ArrowRight,
  Sparkles,
  RotateCcw,
  Activity,
  Cpu,
  Search,
  Check,
  Info
} from "lucide-react";

interface FaultItem {
  id: string;
  symptom: string;
  cause: string;
  selfCheck: string[];
  techSolution: string[];
  estimatedTime: string;
  urgency: "Kritik" | "Yüksek" | "Orta";
  probabilityScore: number;
}

interface ServiceWizardCategory {
  id: string;
  name: string;
  icon: React.ElementType;
  accent: string;
  badge: string;
  faults: FaultItem[];
}

const WIZARD_DATA: ServiceWizardCategory[] = [
  {
    id: "klima",
    name: "Klima",
    icon: Snowflake,
    accent: "#0EA5E9",
    badge: "İklimlendirme",
    faults: [
      {
        id: "k-1",
        symptom: "Klima Sıcak/Soğuk Üflemiyor (Yetersiz Soğutma)",
        cause: "R32/R410A soğutucu gaz eksikliği, tıkalı iç/dış ünite serpantini veya kompresör kapasitör arızası.",
        selfCheck: [
          "Kumandadan modun 'Cool' (Soğutma) veya 'Heat' (Isıtma) olduğunu kontrol edin.",
          "Sıcaklık derecesini ortam sıcaklığının en az 3°C altına ayarlayın.",
          "İç ünite filtrelerinin temiz olduğunu kontrol edin."
        ],
        techSolution: [
          "Dijital manifold ile gaz basınç ölçümü ve kaçak tespiti.",
          "Vakum pompası ile sistem tahliyesi ve R32/R410A hassas gaz dolumu.",
          "Basınçlı ilaçlı suyla serpantin ve fan çarkı dezenfeksiyonu."
        ],
        estimatedTime: "45 - 60 Dakika",
        urgency: "Yüksek",
        probabilityScore: 92
      },
      {
        id: "k-2",
        symptom: "İç Üniteden Su Sızıyor / Akıtıyor",
        cause: "Drenaj hortumu tıkanıklığı, evaporatör donması veya iç ünite terazi ayarının bozulması.",
        selfCheck: [
          "Dışarıdaki su tahliye hortumunun ucunun tıkalı olmadığını kontrol edin.",
          "İç ünite filtresinin kirden tıkalı olup olmadığını kontrol edin."
        ],
        techSolution: [
          "Yüksek basınçlı hava ile drenaj hattı açma işlemi.",
          "Drenaj tavası antibakteriyel dezenfeksiyonu ve terazi ayarı."
        ],
        estimatedTime: "30 - 45 Dakika",
        urgency: "Kritik",
        probabilityScore: 88
      },
      {
        id: "k-3",
        symptom: "Klimadan Kötü Koku Geliyor",
        cause: "İç ünite serpantini ve drenaj tavasında küf, bakteri ve toz birikimi.",
        selfCheck: [
          "Ön plastik filtreleri çıkarıp ılık suyla yıkayarak kurulayın."
        ],
        techSolution: [
          "TSE onaylı antibakteriyel köpüklü kimyasal yıkama.",
          "Evaporatör kanatçık dezenfeksiyonu ve filtre yenileme."
        ],
        estimatedTime: "40 - 50 Dakika",
        urgency: "Orta",
        probabilityScore: 95
      },
      {
        id: "k-4",
        symptom: "Klima Açılmıyor / Sinyal Işıkları Yanıp Sönüyor",
        cause: "Elektronik ana kart arızası, voltaj dalgalanması veya kompresör koruma şalteri.",
        selfCheck: [
          "Evdeki sigorta kutusundan klimanın şalterini indirip 3 dakika bekledikten sonra tekrar açın."
        ],
        techSolution: [
          "Elektronik kart entegre voltaj testi ve mikroçip onarımı.",
          "Besleme trafosu, röle ve kondansatör değişimi."
        ],
        estimatedTime: "60 - 90 Dakika",
        urgency: "Kritik",
        probabilityScore: 85
      }
    ]
  },
  {
    id: "kombi",
    name: "Kombi",
    icon: Flame,
    accent: "#F59E0B",
    badge: "Isıtma Sistemleri",
    faults: [
      {
        id: "km-1",
        symptom: "Kombi Ateşleme Yapmıyor / Hata Kodu Veriyor (E01 vb.)",
        cause: "Gaz vanası kapalılığı, iyonizasyon/ateşleme elektrodu kirliliği veya gaz valfi arızası.",
        selfCheck: [
          "Kombi yanındaki ve daire girişindeki gaz vanalarının açık olduğunu kontrol edin.",
          "Kombi panelindeki 'Reset' butonuna 3 saniye basılı tutarak sıfırlayın."
        ],
        techSolution: [
          "Ateşleme ve iyonizasyon elektrotlarının hassas temizliği.",
          "Gaz valfi bobin testi, voltaj ölçümü veya orijinal yedek parça değişimi."
        ],
        estimatedTime: "45 - 60 Dakika",
        urgency: "Kritik",
        probabilityScore: 94
      },
      {
        id: "km-2",
        symptom: "Sıcak Su Gelmiyor Veya Bir Isınıp Bir Soğuyor",
        cause: "NTC sıcak su sensörü arızası, plaka eşanjör kireçlenmesi veya 3 yollu vana motoru sıkışması.",
        selfCheck: [
          "Musluktan akan su debisinin (akış miktarının) normal seviyede olduğunu kontrol edin."
        ],
        techSolution: [
          "Sıcak su NTC sensör değişimi.",
          "Plaka eşanjörün kimyasal kireç çözücü ilaçla dairesel yıkanması."
        ],
        estimatedTime: "45 - 75 Dakika",
        urgency: "Kritik",
        probabilityScore: 90
      },
      {
        id: "km-3",
        symptom: "Kombi Bar Basıncı Sürekli Düşüyor",
        cause: "Tesisatta su sızıntısı, genleşme tankı membran patlaması veya emniyet ventili kaçırma yapması.",
        selfCheck: [
          "Kombi altındaki mavi/siyah doldurma musluğu ile basıncı 1.5 bar seviyesine getirin."
        ],
        techSolution: [
          "Genleşme tankına 1.0 bar azot hava şarjı yapılması.",
          "Emniyet ventili değişimi ve termal kamerayla kaçak tespiti."
        ],
        estimatedTime: "40 - 60 Dakika",
        urgency: "Orta",
        probabilityScore: 89
      },
      {
        id: "km-4",
        symptom: "Peteklerin Altı Soğuk / Isınmıyor",
        cause: "Radyatör peteklerinde çamurlaşma ve tortu birikimi veya sirkülasyon pompası devir düşüklüğü.",
        selfCheck: [
          "Petek üst vanalarının tamamen açık olduğundan ve havasının alındığından emin olun."
        ],
        techSolution: [
          "Çift yönlü darbesiz tesisat yıkama makinesi ve koruyucu kimyasal temizliği."
        ],
        estimatedTime: "90 - 120 Dakika",
        urgency: "Orta",
        probabilityScore: 96
      }
    ]
  },
  {
    id: "camasir",
    name: "Çamaşır M.",
    icon: ShieldCheck,
    accent: "#10B981",
    badge: "Yıkama Grubu",
    faults: [
      {
        id: "cm-1",
        symptom: "Çamaşırları Sıkmıyor / Islak Bırakıyor",
        cause: "Tahliye pompası tıkanıklığı, motor kömürü aşınması veya dengesiz yük sensör uyarısı.",
        selfCheck: [
          "Makinenin sağ alt kapağını açarak bozuk para, iğne veya yabancı cisimleri temizleyin."
        ],
        techSolution: [
          "Orijinal tahliye pompası yenilemesi.",
          "Motor kömürü (karbon fırça) değişimi ve amortisör testi."
        ],
        estimatedTime: "30 - 50 Dakika",
        urgency: "Yüksek",
        probabilityScore: 91
      },
      {
        id: "cm-2",
        symptom: "Sıkmada Aşırı Ses / Yürür Gibi Titreşim Yapıyor",
        cause: "Kazan bilyası (rulman) dağılması, amortisör patlaması veya keçe aşınması.",
        selfCheck: [
          "Makine ayaklarının zeminle tam temas ettiğini ve kilit somunlarını kontrol edin."
        ],
        techSolution: [
          "Kazan rulman seti ve keçe değişimi.",
          "Orijinal amortisör takımı montajı."
        ],
        estimatedTime: "90 - 150 Dakika",
        urgency: "Orta",
        probabilityScore: 93
      }
    ]
  },
  {
    id: "bulasik",
    name: "Bulaşık M.",
    icon: Droplets,
    accent: "#8B5CF6",
    badge: "Mutfak Hijyeni",
    faults: [
      {
        id: "bm-1",
        symptom: "Bulaşıkları Lekeli / Kirli Bırakıyor",
        cause: "Fıskiye gözeneklerinin yemek artığıyla tıkanması veya sirkülasyon pompası basınç düşüklüğü.",
        selfCheck: [
          "Fıskiye kollarını çıkarıp deliklerindeki artıkları su altında temizleyin."
        ],
        techSolution: [
          "Sirkülasyon yıkama motoru ve basınç sensörü değişimi.",
          "Deterjan kutusu ve fıskiye mekanizması yenileme."
        ],
        estimatedTime: "40 - 60 Dakika",
        urgency: "Orta",
        probabilityScore: 87
      },
      {
        id: "bm-2",
        symptom: "Makine Su Isıtmıyor / Kurutmuyor",
        cause: "Rezistans (ısıtma tüpü) yanması veya NTC termostat arızası.",
        selfCheck: [
          "Seçilen yıkama programının sıcak su kullanan bir program olduğundan emin olun."
        ],
        techSolution: [
          "Orijinal rezistans bloğu değişimi ve NTC sensör yenilemesi."
        ],
        estimatedTime: "45 - 60 Dakika",
        urgency: "Yüksek",
        probabilityScore: 92
      }
    ]
  },
  {
    id: "buzdolabi",
    name: "Buzdolabı",
    icon: Snowflake,
    accent: "#EC4899",
    badge: "Soğutma Grubu",
    faults: [
      {
        id: "bz-1",
        symptom: "Buzdolabı Alt Bölmesi Soğutmuyor (Üst Soğutuyor)",
        cause: "No-Frost rezistans arızası, hava kanalı donması veya sensör bozukluğu.",
        selfCheck: [
          "Buzdolabının fişini çekip kapıları açık şekilde 24 saat dinlendirerek kanallardaki buzu eritin."
        ],
        techSolution: [
          "Defrost rezistansı, sensör ve termik sigorta değişimi.",
          "Damper motoru ve evaporatör fanı testi."
        ],
        estimatedTime: "45 - 75 Dakika",
        urgency: "Kritik",
        probabilityScore: 95
      },
      {
        id: "bz-2",
        symptom: "Motor Sürekli Çalışıyor / Hiç Soğutmuyor",
        cause: "R600a/R134a gaz kaçağı veya kompresör performans kaybı.",
        selfCheck: [
          "Buzdolabı arka Izgara ve motor bölümünün etrafında yeterli hava boşluğu olduğunu kontrol edin."
        ],
        techSolution: [
          "Azot gaz kaçağı tespiti, vakumlama ve gaz şarjı veya kompresör değişimi."
        ],
        estimatedTime: "60 - 120 Dakika",
        urgency: "Kritik",
        probabilityScore: 90
      }
    ]
  },
  {
    id: "kurutma",
    name: "Kurutma M.",
    icon: Wind,
    accent: "#06B6D4",
    badge: "Kurutma Teknolojisi",
    faults: [
      {
        id: "kr-1",
        symptom: "Çamaşırları Nemli Bırakıyor / Isıtmıyor",
        cause: "Kondanser kirliliği, NTC nem sensörü veya ısı pompası gaz eksikliği.",
        selfCheck: [
          "Çift kapaklı tiftik filtresini çıkarıp akan su altında iyice temizleyin."
        ],
        techSolution: [
          "Kondanser ilaçlı derin yıkama ve NTC nem sensörü yenilemesi."
        ],
        estimatedTime: "45 - 60 Dakika",
        urgency: "Orta",
        probabilityScore: 89
      }
    ]
  },
  {
    id: "evaletleri",
    name: "Ev Aletleri",
    icon: Zap,
    accent: "#E11D48",
    badge: "Küçük Ev Aletleri",
    faults: [
      {
        id: "ea-1",
        symptom: "Cihaz Hiç Çalışmıyor / Güç Gelmiyor",
        cause: "Termik emniyet sigortası atması, kablo kırıklığı veya anahtar arızası.",
        selfCheck: [
          "Prizde elektrik olduğunu başka bir cihaz takarak doğrulayın."
        ],
        techSolution: [
          "Termik sigorta değişimi, kablo tamiri ve motor testi."
        ],
        estimatedTime: "30 - 45 Dakika",
        urgency: "Orta",
        probabilityScore: 86
      }
    ]
  }
];

export default function TroubleshootingWizard() {
  const [selectedCatId, setSelectedCatId] = useState<string>("klima");
  const [selectedFaultId, setSelectedFaultId] = useState<string>("k-1");
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const currentCategory = WIZARD_DATA.find((c) => c.id === selectedCatId) || WIZARD_DATA[0];
  const currentFault = currentCategory.faults.find((f) => f.id === selectedFaultId) || currentCategory.faults[0];

  const handleCategoryChange = (catId: string) => {
    setSelectedCatId(catId);
    const cat = WIZARD_DATA.find((c) => c.id === catId);
    if (cat && cat.faults.length > 0) {
      setSelectedFaultId(cat.faults[0].id);
    }
  };

  const toggleCheck = (idx: number) => {
    const key = `${selectedFaultId}-${idx}`;
    setCheckedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section className="py-16 sm:py-20 bg-[#F8FAFC] text-gray-900 relative">
      <div className="max-w-[1350px] mx-auto px-6 md:px-10">
        
        {/* Header Badges & Title */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 border border-sky-100 text-[#0EA5E9] font-black text-xs uppercase tracking-widest mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Akıllı Ön Teşhis Sihirbazı</span>
          </div>
          <h2 className="font-black text-gray-900 text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight leading-tight">
            Arıza Teşhis & Hizmet Rehberi
          </h2>
          <div className="w-20 h-1.5 bg-[#0EA5E9] mx-auto rounded-full mt-4" />
          <p className="text-gray-600 font-semibold text-xs sm:text-sm mt-4 leading-relaxed">
            Aşağıdaki sabitleştirilmiş 7 kategoriden cihazınızı seçin; belirtiye göre olası kök nedeni, evdeki kontrolleri ve adreste onarım planını anında görüntüleyin.
          </p>
        </div>

        {/* 1. FIXED RESPONSIVE GRID CATEGORIES (Harakesiz, Tam Sığan Sabit 7'li Grid) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-12">
          {WIZARD_DATA.map((cat) => {
            const Icon = cat.icon;
            const isSelected = cat.id === selectedCatId;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`flex flex-col items-center justify-center p-3.5 rounded-2xl font-black text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer border text-center ${
                  isSelected
                    ? "bg-[#0EA5E9] text-white border-[#0EA5E9] shadow-lg shadow-sky-500/20"
                    : "bg-white hover:bg-gray-50 text-gray-700 border-gray-200 shadow-sm"
                }`}
              >
                <div 
                  className={`w-9 h-9 rounded-xl flex items-center justify-center mb-2 transition-transform ${
                    isSelected ? "bg-white/20 text-white" : "bg-sky-50"
                  }`}
                >
                  <Icon className="w-5 h-5" style={{ color: isSelected ? "#ffffff" : cat.accent }} />
                </div>
                <span className="block font-black leading-tight text-xs">{cat.name}</span>
                <span className={`block text-[9px] font-bold mt-1 ${isSelected ? "text-white/80" : "text-gray-400"}`}>
                  {cat.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* 2. Main Diagnostic Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Symptom Selection Cards */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between px-1 mb-2">
              <span className="text-xs font-black uppercase tracking-widest text-[#0EA5E9] flex items-center gap-2">
                <Search className="w-4 h-4" />
                1. Belirtiyi Seçin ({currentCategory.name}):
              </span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-white px-2.5 py-1 rounded-full border border-gray-200 shadow-sm">
                {currentCategory.faults.length} Belirti
              </span>
            </div>

            {currentCategory.faults.map((fault, idx) => {
              const isSelected = fault.id === selectedFaultId;
              return (
                <button
                  key={fault.id}
                  onClick={() => setSelectedFaultId(fault.id)}
                  className={`w-full text-left p-4.5 rounded-2xl border transition-all duration-200 relative overflow-hidden cursor-pointer ${
                    isSelected
                      ? "bg-white border-[#0EA5E9] text-gray-900 shadow-md ring-2 ring-sky-500/15"
                      : "bg-white hover:bg-gray-50 border-gray-200 text-gray-700 shadow-sm"
                  }`}
                >
                  {/* Left Active Accent Bar */}
                  {isSelected && (
                    <div 
                      className="absolute top-0 bottom-0 left-0 w-1.5"
                      style={{ backgroundColor: currentCategory.accent }}
                    />
                  )}

                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <span className={`font-mono text-xs font-black px-2.5 py-1 rounded-lg shrink-0 mt-0.5 ${
                        isSelected ? "bg-[#0EA5E9] text-white" : "bg-gray-100 text-gray-500"
                      }`}>
                        #{idx + 1}
                      </span>
                      <div>
                        <h3 className="font-bold text-xs sm:text-sm leading-snug text-gray-900">
                          {fault.symptom}
                        </h3>
                        <div className="flex items-center gap-3 mt-2 text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                          <span className="flex items-center gap-1 text-[#0EA5E9]">
                            <Activity className="w-3 h-3" /> %{fault.probabilityScore} Uyum
                          </span>
                          <span>•</span>
                          <span>Aciliyet: {fault.urgency}</span>
                        </div>
                      </div>
                    </div>

                    <ArrowRight className={`w-4 h-4 shrink-0 transition-transform mt-1 ${isSelected ? "text-[#0EA5E9] translate-x-1" : "text-gray-400"}`} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: High-Tech Diagnostic Analysis Card */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {currentFault && (
                <motion.div
                  key={currentFault.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white border border-gray-200 rounded-[32px] p-6 sm:p-8 shadow-xl relative overflow-hidden"
                >
                  {/* Top Accent Bar */}
                  <div 
                    className="absolute top-0 left-0 right-0 h-1.5" 
                    style={{ backgroundColor: currentCategory.accent }}
                  />

                  {/* Diagnostic Result Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-6 border-b border-gray-100">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Cpu className="w-4 h-4 text-[#0EA5E9]" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#0EA5E9]">
                          Canlı Ön Teşhis Raporu
                        </span>
                      </div>
                      <h3 className="font-black text-gray-900 text-lg sm:text-2xl uppercase tracking-tight">
                        {currentFault.symptom}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5" />
                        %{currentFault.probabilityScore} Doğruluk
                      </div>
                    </div>
                  </div>

                  {/* Section 1: Root Cause Analysis */}
                  <div className="space-y-5">
                    
                    <div className="bg-red-50/60 border border-red-100 rounded-2xl p-5">
                      <div className="flex items-start gap-3.5">
                        <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                          <AlertTriangle className="w-4.5 h-4.5 text-red-600" />
                        </div>
                        <div>
                          <h4 className="text-red-700 font-black text-xs uppercase tracking-wider mb-1">
                            Olası Kök Neden Analizi:
                          </h4>
                          <p className="text-gray-700 text-xs sm:text-sm font-semibold leading-relaxed">
                            {currentFault.cause}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Section 2: Interactive Self Check Checklist */}
                    <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-5">
                      <h4 className="text-amber-800 font-black text-xs uppercase tracking-wider mb-3 flex items-center gap-2">
                        <RotateCcw className="w-4 h-4 text-amber-600" />
                        Evde Yapabileceğiniz Hızlı Kontrol Listesi:
                      </h4>
                      <div className="space-y-2">
                        {currentFault.selfCheck.map((stepText, i) => {
                          const itemKey = `${currentFault.id}-${i}`;
                          const isDone = !!checkedItems[itemKey];
                          return (
                            <button
                              key={i}
                              onClick={() => toggleCheck(i)}
                              className={`w-full text-left flex items-start gap-3 p-3 rounded-xl transition-all cursor-pointer border ${
                                isDone 
                                  ? "bg-emerald-100/70 border-emerald-300 text-emerald-900"
                                  : "bg-white border-amber-100/80 hover:bg-amber-100/30 text-gray-800"
                              }`}
                            >
                              <div className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                                isDone ? "bg-emerald-600 border-emerald-600 text-white" : "border-gray-300 bg-white"
                              }`}>
                                {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                              </div>
                              <span className={`text-xs font-semibold leading-relaxed ${isDone ? "line-through opacity-80" : ""}`}>
                                {stepText}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Section 3: Technical On-Site Blueprint */}
                    <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-5">
                      <h4 className="text-emerald-800 font-black text-xs uppercase tracking-wider mb-3 flex items-center gap-2">
                        <Wrench className="w-4 h-4 text-emerald-600" />
                        Teknik Ekibimizin Adreste Uygulayacağı Müdahale Planı:
                      </h4>
                      <ul className="space-y-2">
                        {currentFault.techSolution.map((planStep, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs font-semibold text-gray-800">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5" />
                            <span>{planStep}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>

                  {/* Footer Bar: Time Estimator & Direct Action Buttons */}
                  <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    
                    <div className="flex items-center gap-2 text-gray-600 text-xs font-bold">
                      <Clock className="w-4 h-4 text-[#0EA5E9]" />
                      <span>Tahmini Adreste Onarım: <strong className="text-gray-900 font-black">{currentFault.estimatedTime}</strong></span>
                    </div>

                    <a
                      href="tel:08500000000"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-sky-500/20 transition-all hover:scale-105 cursor-pointer"
                    >
                      <PhoneCall className="w-4 h-4" />
                      Bu Arıza İçin Servis Çağır
                    </a>

                  </div>

                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
