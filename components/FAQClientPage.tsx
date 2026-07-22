"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown, Search, Zap, ShoppingBag, Wrench, Clock, ArrowRight, MessageSquare, PhoneCall } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  category: "Genel" | "Montaj" | "Servis" | "Bakım";
}

const FAQ_DATA: FAQItem[] = [
  {
    category: "Genel",
    question: "Klima bakımı ne sıklıkla yapılmalıdır?",
    answer: "Sağlıklı bir hava kalitesi, maksimum enerji verimliliği ve cihaz ömrünü korumak adına klimaların yılda en az iki kez (ilkbahar ve sonbahar aylarında, yani yaz ve kış sezonu başlangıcında) periyodik bakımdan geçmesi önerilir."
  },
  {
    category: "Genel",
    question: "Klimanın soğutmamasının en yaygın sebepleri nelerdir?",
    answer: "Klimanın soğutmamasının temel sebepleri arasında iç ünite filtrelerinin tıkanması, R32 veya R410A soğutucu gazının eksilmesi (gaz sızıntısı), kompresör veya fan motoru arızaları ile dış ünitenin aşırı güneş altında kalması/hava sirkülasyonunun kesilmesi yer alır."
  },
  {
    category: "Servis",
    question: "Klima gaz dolumu ne zaman yapılmalıdır?",
    answer: "Klima gazı normal şartlarda tükenen bir madde değildir. Ancak boru tesisatındaki aşınmalar, kaynak noktalarındaki çatlaklar veya rekor bağlantı gevşemeleri nedeniyle gaz sızıntısı meydana geldiğinde gaz eksilir. Teknik ekibimiz gaz kaçağını tespit edip onardıktan sonra gaz dolumu gerçekleştirir."
  },
  {
    category: "Montaj",
    question: "Klima montajında konum seçimi neden önemlidir?",
    answer: "İç ünitenin doğrudan üzerinize üflemeyeceği, oda içinde hava sirkülasyonunun en homojen dağılacağı bir konum seçilmelidir. Dış ünite ise kolayca servis verilebilen, direkt güneş ışığından uzak ve rahat hava alıp atabileceği bir noktaya monte edilmelidir."
  },
  {
    category: "Servis",
    question: "Servis sonrasında yapılan işlemler garantili mi?",
    answer: "Evet, Sakarya Uzman Klima olarak gerçekleştirdiğimiz tüm arıza tespit, parça değişimi ve teknik müdahaleler, orijinal yedek parça ve işçilik dahil olmak üzere 1 yıl süreyle servis garantimiz altındadır."
  },
  {
    category: "Bakım",
    question: "Klima bakımı faturalarımı etkiler mi?",
    answer: "Evet, kesinlikle etkiler. Kirli filtreler ve tıkanmış serpantinler klimanın havayı çekmesini zorlaştırır. Bu durum kompresörün daha fazla çalışmasına ve elektrik faturasının %20 ila %30 oranında artmasına neden olur. Temiz bir klima ise minimum elektrikle maksimum verim sağlar."
  },
  {
    category: "Montaj",
    question: "Klima sökerken gazı boşa gider mi?",
    answer: "Hayır. Uzman teknisyenlerimiz klima söküm (demontaj) işleminden önce sistemi çalıştırarak gazı dış ünite kompresörüne toplar (gaz toplama işlemi) ve vanaları kapatır. Bu sayede klimanızın gazı boşa gitmeden güvenle yeni yerine taşınabilir."
  },
  {
    category: "Bakım",
    question: "Klima temizliğini kendim yapabilir miyim?",
    answer: "İç ünitenin plastik kapağını açarak toz filtrelerini musluk altında yıkayıp kurutabilirsiniz. Bu işlemi 2 haftada bir yapmanız önerilir. Ancak evaporatör dezenfeksiyonu, ilaçlı serpantin temizliği, dış ünite yıkaması ve gaz basıncı kontrolleri gibi derinlemesine bakım işlemleri profesyonel ekipmanlar gerektirir."
  }
];

const CATEGORIES = [
  { id: "ALL", name: "Tüm Sorular", icon: HelpCircle },
  { id: "Genel", name: "Genel Bilgiler", icon: Zap },
  { id: "Montaj", name: "Montaj & Demontaj", icon: ShoppingBag },
  { id: "Servis", name: "Teknik Servis", icon: Wrench },
  { id: "Bakım", name: "Bakım & Temizlik", icon: Clock }
];

export default function FAQClientPage() {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredFAQs = useMemo(() => {
    return FAQ_DATA.filter((faq) => {
      const matchesCategory = activeCategory === "ALL" || faq.category === activeCategory;
      const matchesSearch =
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="bg-[#F8F9FA] min-h-screen text-gray-700 pt-[134px] pb-24 relative overflow-hidden font-sans">
      
      {/* Decorative light elements & Organic Blobs */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#0EA5E9]/10 via-transparent to-transparent pointer-events-none -z-10" />
      <div className="absolute top-[20%] right-[-15%] w-[600px] h-[600px] bg-[#0EA5E9]/5 blur-[140px] rounded-full pointer-events-none -z-10 animate-organic-blob" />
      <div className="absolute bottom-[20%] left-[-15%] w-[600px] h-[600px] bg-[#0EA5E9]/3 blur-[140px] rounded-full pointer-events-none -z-10 animate-organic-blob-reverse" />
      
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-20 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200/80 shadow-xs text-[#0EA5E9] font-black text-xs tracking-widest uppercase"
          >
            <HelpCircle className="w-4 h-4 animate-bounce" />
            Teknik & İdari Destek
          </motion.div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-gray-900 tracking-tight uppercase leading-none">
            Aklınıza Takılan <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0EA5E9] to-[#0284C7] mt-2 block">
              Tüm Sorular
            </span>
          </h1>
          <div className="w-20 h-1.5 bg-[#0EA5E9] mx-auto mt-6 rounded-full" />
          <p className="text-gray-500 font-semibold max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Klima montajı, bakımı, gaz dolumu, arıza tespiti ve verimlilik konularında en çok merak edilen soruları yanıtladık.
          </p>
        </div>

        {/* Dynamic Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Sidebar & Search Column (Left) */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-36">
            
            {/* Realtime Search Panel */}
            <div className="bg-white border border-gray-200/60 p-8 rounded-[36px] shadow-sm">
              <h3 className="font-black text-gray-950 text-base uppercase tracking-tight mb-4 flex items-center gap-2">
                <Search className="w-5 h-5 text-[#0EA5E9]" />
                Akıllı Arama
              </h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Sorularda arayın..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setOpenIndex(null);
                  }}
                  className="w-full pl-12 pr-6 py-4 rounded-2xl border border-gray-200 focus:border-[#0EA5E9] focus:outline-none bg-gray-50/50 text-gray-900 font-semibold shadow-inner transition-all text-sm placeholder-gray-400"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
              </div>
            </div>

            {/* Dynamic Category Selector (Vertical Tabs) */}
            <div className="bg-white border border-gray-200/60 p-8 rounded-[36px] shadow-sm">
              <h3 className="font-black text-gray-950 text-base uppercase tracking-tight mb-4">Kategoriler</h3>
              <div className="flex flex-col gap-2">
                {CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setActiveCategory(cat.id);
                        setOpenIndex(null);
                      }}
                      className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer border text-left ${
                        isActive
                          ? "bg-[#0EA5E9] border-[#0EA5E9] text-white shadow-xl shadow-sky-500/20"
                          : "bg-white border-gray-100 text-gray-500 hover:text-gray-950 hover:bg-gray-50/50"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <Icon className={`w-4.5 h-4.5 shrink-0 ${isActive ? "text-white" : "text-[#0EA5E9]"}`} />
                        {cat.name}
                      </span>
                      <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${isActive ? "translate-x-1" : "opacity-0"}`} />
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Accordion Questions Column (Right) */}
          <div className="lg:col-span-8 space-y-4">
            <AnimatePresence mode="wait">
              {filteredFAQs.length > 0 ? (
                <motion.div
                  key={activeCategory + searchQuery}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >
                  {filteredFAQs.map((faq, index) => {
                    const isOpen = openIndex === index;
                    return (
                      <div
                        key={index}
                        className={`bg-white border transition-all duration-300 rounded-[28px] overflow-hidden ${
                          isOpen ? "border-[#0EA5E9] shadow-lg shadow-sky-500/5" : "border-gray-200/60 hover:border-gray-300"
                        }`}
                      >
                        <button
                          onClick={() => setOpenIndex(isOpen ? null : index)}
                          className="w-full px-8 py-6 flex items-center justify-between text-left font-black text-gray-950 hover:text-[#0EA5E9] transition-colors cursor-pointer select-none outline-none"
                        >
                          <span className="text-base sm:text-lg leading-snug pr-4 uppercase tracking-tight">{faq.question}</span>
                          <div className={`p-2 rounded-xl bg-gray-50 border border-gray-100 shrink-0 transition-all duration-300 ${isOpen ? "bg-[#0EA5E9]/10 border-[#0EA5E9]/20" : ""}`}>
                            <ChevronDown
                              className={`w-4.5 h-4.5 text-gray-400 transition-transform duration-300 ${
                                isOpen ? "rotate-180 text-[#0EA5E9]" : ""
                              }`}
                            />
                          </div>
                        </button>

                        <motion.div
                          initial={false}
                          animate={{ height: isOpen ? "auto" : 0 }}
                          className="overflow-hidden"
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <div className="px-8 pb-6 text-gray-500 text-xs sm:text-sm leading-relaxed border-t border-gray-100 pt-4 font-semibold">
                            {faq.answer}
                          </div>
                        </motion.div>
                      </div>
                    );
                  })}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-24 bg-white border border-gray-200/60 rounded-[36px] text-gray-400 font-bold"
                >
                  Aramanızla eşleşen veya bu kategoriye ait bir soru bulunamadı.
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Custom Bottom CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 p-8 sm:p-12 bg-white border border-gray-200/60 rounded-[40px] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm"
        >
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#0EA5E9]/5 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="space-y-3 max-w-xl text-center md:text-left relative z-10">
            <span className="px-3.5 py-1 bg-[#0EA5E9]/10 text-[#0EA5E9] text-[10px] font-black uppercase tracking-widest rounded-full inline-block border border-[#0EA5E9]/20">
              Canlı Destek
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 uppercase tracking-tight leading-none">
              Aradığınız Cevabı Bulamadınız mı?
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm font-semibold leading-relaxed">
              Klimanızla ilgili her türlü teknik soruyu yanıtlamak veya hızlı servis kaydı oluşturmak için teknik danışmanlarımız hazır bekliyor.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full sm:w-auto relative z-10">
            <a
              href="https://wa.me/905321234567"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-4 bg-emerald-600 hover:bg-emerald-700 text-white transition-all rounded-2xl font-black text-xs uppercase tracking-wider text-center cursor-pointer shadow-md hover:scale-[1.03]"
            >
              <MessageSquare className="w-4 h-4 fill-white text-emerald-600" /> WhatsApp Destek
            </a>
            <a
              href="tel:08503085454"
              className="flex items-center justify-center gap-2 px-6 py-4 bg-gray-50 hover:bg-gray-100 text-gray-900 transition-all rounded-2xl font-black text-xs uppercase tracking-wider text-center border border-gray-200 cursor-pointer hover:scale-[1.03]"
            >
              <PhoneCall className="w-4.5 h-4.5 text-[#0EA5E9]" /> Hemen Ara
            </a>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
