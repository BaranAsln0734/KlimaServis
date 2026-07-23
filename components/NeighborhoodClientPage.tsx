"use client";

import { useMemo, useState, useEffect } from "react";
import { useParams, useRouter, notFound } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, PhoneCall, Zap, CheckCircle2, ArrowRight,
  Clock, ShieldCheck, ChevronDown, Snowflake, Wrench,
  Droplets, Wind, Thermometer, AlertCircle, FileText,
  Phone, MessageCircle, Home, Navigation, Check
} from "lucide-react";
import districtsData from "@/data/districts_content.json";

const REGIONS = [
  "Adapazarı", "Serdivan", "Erenler", "Arifiye", "Hendek",
  "Sapanca", "Karasu", "Kaynarca", "Geyve", "Ferizli",
  "Pamukova", "Söğütlü", "Taraklı", "Kocaali", "Akyazı", "Karapürçek"
];

const SUFFIX_MAP: Record<string, { locative: string }> = {
  "Adapazarı": { locative: "Adapazarı'nda" },
  "Serdivan": { locative: "Serdivan'da" },
  "Erenler": { locative: "Erenler'de" },
  "Arifiye": { locative: "Arifiye'de" },
  "Hendek": { locative: "Hendek'te" },
  "Sapanca": { locative: "Sapanca'da" },
  "Karasu": { locative: "Karasu'da" },
  "Kaynarca": { locative: "Kaynarca'da" },
  "Geyve": { locative: "Geyve'de" },
  "Ferizli": { locative: "Ferizli'de" },
  "Pamukova": { locative: "Pamukova'da" },
  "Söğütlü": { locative: "Söğütlü'de" },
  "Taraklı": { locative: "Taraklı'da" },
  "Kocaali": { locative: "Kocaali'de" },
  "Akyazı": { locative: "Akyazı'da" },
  "Karapürçek": { locative: "Karapürçek'te" },
};

const slugify = (text: string) =>
  text.toString().toLowerCase()
    .replace(/\s+/g,"-").replace(/[ğg]/g,"g").replace(/[üu]/g,"u")
    .replace(/[şs]/g,"s").replace(/[ıi]/g,"i").replace(/[öo]/g,"o")
    .replace(/[çc]/g,"c").replace(/[^\w\-]+/g,"").replace(/\-\-+/g,"-")
    .replace(/^-+/,"").replace(/-+$/,"");

const getDisplayName = (slug: string) =>
  REGIONS.find(r => slugify(r) === slug) || slug.replace(/-/g," ");

const getDistrictPath = (n: string) => {
  const capitalizedSlug = n
    .replace(/Ğ/g, 'G').replace(/ğ/g, 'g')
    .replace(/Ü/g, 'U').replace(/ü/g, 'u')
    .replace(/Ş/g, 'S').replace(/ş/g, 's')
    .replace(/İ/g, 'I').replace(/ı/g, 'i')
    .replace(/Ö/g, 'O').replace(/ö/g, 'o')
    .replace(/Ç/g, 'C').replace(/ç/g, 'c');
  return `${capitalizedSlug}-Klima-Servisi`;
};

const cleanSlug = (slug: string) => {
  let decoded = decodeURIComponent(slug);
  decoded = decoded
    .replace(/-[jJ]eneratör-[sS]ervisi$/, "")
    .replace(/-[jJ]enerator-[sS]ervisi$/, "")
    .replace(/-[kK]lima-[sS]ervisi$/, "")
    .replace(/-[jJ]eneratör$/, "")
    .replace(/-[kK]lima$/, "")
    .replace(/-[sS]ervisi$/, "")
    .toLowerCase();
  return decoded;
};

export default function NeighborhoodClientPage() {
  const params = useParams();
  const router = useRouter();
  const ilceSlug = params?.ilce as string;
  const mahalleSlug = params?.mahalle as string;

  const cleanIlce = useMemo(() => cleanSlug(ilceSlug || ""), [ilceSlug]);

  const isValidDistrict = useMemo(() => {
    if (!cleanIlce) return false;
    return REGIONS.some(r => slugify(r) === cleanIlce);
  }, [cleanIlce]);

  if (ilceSlug && !isValidDistrict) {
    notFound();
  }

  const [districtsList, setDistrictsList] = useState<any>(districtsData);

  useEffect(() => {
    fetch("/api/admin/files?file=districts_content.json&t=" + Date.now(), { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.content) {
          try {
            const parsed = typeof data.content === "string" ? JSON.parse(data.content) : data.content;
            setDistrictsList(parsed);
          } catch (e) {
            console.error("Failed to parse dynamic districts content in client:", e);
          }
        }
      })
      .catch((err) => console.error("Error loading dynamic districts in client:", err));
  }, []);

  const districtName = useMemo(() => getDisplayName(cleanIlce), [cleanIlce]);
  const districtInfo = useMemo(() => (districtsList as any)[cleanIlce] || (districtsData as any)[cleanIlce], [cleanIlce, districtsList]);
  const locativeName = useMemo(() => SUFFIX_MAP[districtName]?.locative ?? `${districtName}'de`, [districtName]);

  useEffect(() => {
    if (ilceSlug && cleanIlce && ilceSlug !== cleanIlce) {
      router.replace(`/${cleanIlce}/${mahalleSlug}`);
    }
  }, [ilceSlug, cleanIlce, mahalleSlug, router]);

  const [quickName, setQuickName] = useState("");
  const [quickPhone, setQuickPhone] = useState("");
  const [quickEmail, setQuickEmail] = useState("");
  const [quickMessage, setQuickMessage] = useState("");
  const [formStatus, setFormStatus] = useState<"idle"|"loading"|"success"|"error">("idle");
  const [openFaq, setOpenFaq] = useState<number|null>(null);

  const neighborhoodsList = useMemo(() => {
    if (!districtInfo) return [];
    const sec = districtInfo.sections.find((s:any) =>
      s.title.toLowerCase().includes("mahalle") || s.html.toLowerCase().includes("başta olmak üzere") ||
      s.html.toLowerCase().includes("mahallelerinde")
    );
    if (!sec) return [];
    const clean = sec.html.replace(/<[^>]*>/g,"").replace(/\n/g," ");
    const m = clean.match(/(.*?)(?:başta olmak üzere|ilçesinin tüm mahallelerinde|tüm mahallelerinde)/i);
    if (!m) return [];
    return m[1].split(/,|\bve\b/).map((n:string)=>n.trim()).filter((n:string)=>n.length>2 && !n.includes("veya") && !n.includes("başta"));
  }, [districtInfo]);

  const cleanMahalleSlug = useMemo(() =>
    decodeURIComponent(mahalleSlug||"").toLowerCase()
      .replace(/-klima-servisi$/i,"").replace(/-klimaservisi$/i,"").replace(/-servisi$/i,""),
    [mahalleSlug]
  );

  const neighborhoodName = useMemo(() => {
    const m = neighborhoodsList.find((n:string)=>slugify(n)===cleanMahalleSlug);
    if (!m && neighborhoodsList.length > 0) {
      return "";
    }
    return m || cleanMahalleSlug.split("-").map((w:string)=>w.charAt(0).toUpperCase()+w.slice(1)).join(" ");
  }, [cleanMahalleSlug, neighborhoodsList]);

  if (ilceSlug && isValidDistrict && neighborhoodsList.length > 0 && neighborhoodName === "") {
    notFound();
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickName || !quickPhone) return;
    setFormStatus("loading");
    try {
      const res = await fetch("https://formsubmit.co/ajax/info@demo.com", {
        method:"POST",
        headers:{"Content-Type":"application/json","Accept":"application/json"},
        body: JSON.stringify({
          "_subject":`Sakarya Uzman Klima - ${districtName} / ${neighborhoodName} Servis Talebi`,
          "Musteri_Adi":quickName,"Telefon":quickPhone,
          "Eposta":quickEmail||"Belirtilmedi","Mahalle":neighborhoodName,
          "Ilce":districtName,"Detay":quickMessage||"Detay belirtilmedi",
        }),
      });
      await fetch("/api/admin/requests",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ name:quickName, phone:quickPhone, email:quickEmail||"Belirtilmedi",
          serviceType:`Acil Klima Servisi / ${neighborhoodName} Mah.`,
          district:`${districtName} / ${neighborhoodName} Mah.`,
          message: `${districtName} ${neighborhoodName} Mah. Klima Servis Talebi\nDetay: ${quickMessage||"Yok"}` }),
      }).catch(()=>{});
      if (res.ok) { setFormStatus("success"); setQuickName(""); setQuickPhone(""); setQuickEmail(""); setQuickMessage(""); }
      else setFormStatus("error");
    } catch { setFormStatus("error"); }
  };

  /* ─── 5 Detaylı Mahalle Servis Başlık ve İçerikleri ─── */
  const neighborhoodGuideSections = useMemo(() => [
    {
      num: "01",
      icon: Wrench,
      accent: "#0EA5E9",
      title: `${districtName} ${neighborhoodName} Mahallesi Klima, Kombi & Beyaz Eşya Servis Hizmeti`,
      content: `${districtName} ilçesi ${neighborhoodName} mahallesinde bulunan tüm konut, müstakil ev ve ticari işletmeler için 7/24 mobil teknik servis desteği sunuyoruz. Klimanız, kombiniz, çamaşır veya bulaşık makineniz ya da buzdolabınız arızalandığında; uzman teknisyenlerimiz çağrınız üzerine kısa sürede adresinize gelerek dijital test cihazlarıyla yerinde arıza tespiti gerçekleştirmektedir. Daikin, Mitsubishi, Samsung, LG, Arçelik, Bosch, Beko, Vestel ve tüm markalarda garantili müdahale sunulmaktadır.`
    },
    {
      num: "02",
      icon: Snowflake,
      accent: "#10B981",
      title: `${neighborhoodName} Mahallesi İlaçlı Klima & Kombi Periyodik Bakımı`,
      content: `${neighborhoodName} mahallesinde hijyen ve yüksek enerji tasarrufu için klimalarda yılda 2 kez, kombilerde yılda 1 kez profesyonel bakım önerilmektedir. Klima iç/dış ünite antibakteriyel temizliği ve kombi yanma odası, filtre ile petek temizliği yapılarak cihazlarınızın ömrü uzatılır ve yakıt masraflarında %30'a varan tasarruf temin edilir.`
    },
    {
      num: "03",
      icon: Droplets,
      accent: "#8B5CF6",
      title: `Çamaşır, Bulaşık Makinesi & Buzdolabı Adreste Tamir Hizmeti`,
      content: `${locativeName} ${neighborhoodName} mahallesinde çamaşır makinenizin sıkmaması, bulaşık makinenizin kirli yıkaması veya buzdolabınızın soğutmaması gibi problemlere tam donanımlı mobil araçlarımızla adreste müdahale ediyoruz. Dijital ölçümlerle arıza tespit edilir ve aynı gün cihazınız çalışır vaziyette teslim edilir.`
    },
    {
      num: "04",
      icon: Wind,
      accent: "#F59E0B",
      title: `${neighborhoodName} Klima & Beyaz Eşya Montaj, Demontaj Hizmeti`,
      content: `${neighborhoodName} mahallesinde yeni bina veya taşınma durumlarında profesyonel montaj hizmeti veriyoruz. Klimanızın konumlandırılması, vakumlama, borulama ve beyaz eşyalarınızın tesisat bağlantıları standartlara uygun olarak yapılır.`
    },
    {
      num: "05",
      icon: ShieldCheck,
      accent: "#EC4899",
      title: `Orijinal Yedek Parça & 1 Yıl İşçilik Garantisi`,
      content: `${districtName} ${neighborhoodName} mahallesinde yapılan tüm arıza tamir ve parça değişim işlemlerinde (kompresör, fan motoru, anakart, pompa, sensör, rezistans) yalnızca orijinal yedek parçalar kullanılır. Yapılan her teknik müdahale sonrası 1 Yıl Resmi İşçilik ve Parça Garanti Belgesi yazılı olarak teslim edilmektedir.`
    }
  ], [districtName, neighborhoodName, locativeName]);

  const faqs = [
    { q:`${neighborhoodName} mahallesine ortalama varış süreniz nedir?`, a:`Ekiplerimiz ${districtName} ${neighborhoodName} mahallesine Adapazarı merkezimizden mobil servis araçlarıyla ortalama 30–60 dakika içinde ulaşmaktadır. Acil durumlarda öncelikli yönlendirme yapılır.` },
    { q:"Arızalarda parça garantisi veriyor musunuz?", a:"Evet. Servis kapsamında onarılan veya değiştirilen tüm orijinal yedek parçalar Sakarya Beyaz Eşya Kombi Klima Servisi 1 yıl işçilik ve parça garantisi altındadır. İşlem sonrası yazılı teknik servis formu düzenlenir." },
    { q:"Hangi cihazlar için servis veriyorsunuz?", a:"Klima, kombi, çamaşır makinesi, bulaşık makinesi, buzdolabı, kurutma makinesi ve küçük ev aletlerinin arıza tamiri, bakımı ve montajı için 7/24 hizmet veriyoruz." },
    { q:"Hangi markalara servis veriyorsunuz?", a:"Daikin, Mitsubishi, Samsung, LG, Arçelik, Bosch, Beko, Vestel, Siemens, DemirDöküm, Baymak, Vaillant, Toshiba, Buderus, Profilo ve diğer tüm marka ve modellere uzman teknik kadromuzla yetkin olarak servis veriyoruz." },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] font-sans">
      <title>{`${districtName} ${neighborhoodName} Beyaz Eşya, Kombi & Klima Servisi | 7/24 Bakım & Tamir`}</title>
      <meta name="description" content={`${districtName} ilçesi ${neighborhoodName} mahallesinde Klima, Kombi, Çamaşır Makinesi, Bulaşık Makinesi, Buzdolabı ve Kurutma Makinesi için 7/24 acil tamir, bakım ve montaj servisi.`} />
      
      {/* ━━━ 1. PREMİUM HERO BÖLÜMÜ ━━━ */}
      <section className="bg-[#0F172A] text-white pt-36 pb-20 md:pt-40 relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-topo-waves pointer-events-none opacity-30" />
        <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-[#0EA5E9]/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">

          {/* Breadcrumb Navigasyon */}
          <div className="flex items-center gap-2 mb-8 text-white/40 text-[10px] font-mono uppercase tracking-widest flex-wrap">
            <Link href="/" className="hover:text-white/70 transition-colors flex items-center gap-1"><Home className="w-3 h-3"/>Anasayfa</Link>
            <span>/</span>
            <Link href="/servis-bolgeleri" className="hover:text-white/70 transition-colors flex items-center gap-1"><Navigation className="w-3 h-3"/>Servis Bölgeleri</Link>
            <span>/</span>
            <Link href={`/${getDistrictPath(districtName)}`} className="hover:text-white/70 transition-colors">{districtName}</Link>
            <span>/</span>
            <span className="text-[#0EA5E9]">{neighborhoodName} Mahallesi</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <motion.div initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{duration:0.5}} className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#0EA5E9] font-black text-xs tracking-widest uppercase">
                <MapPin className="w-4 h-4" />
                {districtName} · {neighborhoodName} Mahallesi
              </div>

              <h1 className="font-black text-white uppercase leading-none text-4xl sm:text-5xl lg:text-6xl tracking-tight">
                {districtName} {neighborhoodName}<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0EA5E9] to-[#38BDF8]">
                  Klima Servisi
                </span>
              </h1>

              <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-2xl font-semibold">
                {districtName} ilçesi {neighborhoodName} mahallesinde 7/24 acil klima arıza tamiri, periyodik bakımı, montajı ve gaz şarjı. Mobil ekiplerimizle kapınızdayız.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a href="tel:08500000000" className="inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-[#0EA5E9] text-white font-black uppercase tracking-wider text-xs rounded-2xl hover:bg-[#0284C7] transition-all shadow-lg shadow-sky-500/20 hover:-translate-y-0.5">
                  <PhoneCall className="w-4 h-4" />0850 000 00 00
                </a>
                <a href="https://wa.me/905550000000?text=Merhaba%2C+${encodeURIComponent(districtName)}+${encodeURIComponent(neighborhoodName)}+klima+servisi+hakk%C4%B1nda+bilgi+almak+istiyorum." target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-emerald-500 text-white font-black uppercase tracking-wider text-xs rounded-2xl hover:bg-emerald-600 transition-all hover:-translate-y-0.5">
                  <MessageCircle className="w-4 h-4" />WhatsApp (Demo)
                </a>
              </div>
            </motion.div>

            {/* Stat Kartları */}
            <motion.div initial={{opacity:0,scale:0.97}} animate={{opacity:1,scale:1}} transition={{duration:0.5,delay:0.1}} className="lg:col-span-5 grid grid-cols-2 gap-4">
              {[
                { val:"7/24", label:"Mobil Servis", icon:Clock, color:"#0EA5E9" },
                { val:"30 Dk", label:"Ort. Ulaşım", icon:Zap, color:"#10B981" },
                { val:"10+", label:"Yıllık Tecrübe", icon:ShieldCheck, color:"#8B5CF6" },
                { val:"1 Yıl", label:"Parça Garantisi", icon:CheckCircle2, color:"#F59E0B" },
              ].map((s,i)=>{
                const Icon = s.icon;
                return (
                  <div key={i} className="bg-white/6 border border-white/10 rounded-2xl p-5 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: s.color + "20" }}>
                      <Icon className="w-5 h-5" style={{ color: s.color }} />
                    </div>
                    <div>
                      <div className="font-black text-white text-lg leading-none">{s.val}</div>
                      <div className="text-white/45 text-[9px] uppercase tracking-widest font-black mt-1">{s.label}</div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ━━━ 2. DETAYLI YAZI VE BAŞLIKLAR (01, 02, 03, 04, 05) ━━━ */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* SOL: 5 Detaylı Servis Rehberi Kısımı */}
          <div className="lg:col-span-8 space-y-8">
            <div className="border-b border-gray-100 pb-6">
              <div className="flex items-center gap-2 mb-2">
                <Snowflake className="w-5 h-5 text-[#0EA5E9] animate-spin-slow" />
                <span className="text-[#0EA5E9] font-black uppercase tracking-widest text-xs">Hizmet Detayları</span>
              </div>
              <h2 className="font-black text-gray-900 uppercase tracking-tight text-2xl md:text-3xl">
                {districtName} {neighborhoodName} Klima Hizmet Rehberi
              </h2>
              <div className="w-12 h-1.5 bg-[#0EA5E9] mt-3 rounded-full" />
            </div>

            <div className="space-y-6">
              {neighborhoodGuideSections.map((sec, idx) => {
                const Icon = sec.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08 }}
                    className="bg-white border border-gray-100 rounded-[28px] p-7 shadow-sm hover:shadow-md transition-all space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: sec.accent + "15" }}>
                          <Icon className="w-5 h-5" style={{ color: sec.accent }} />
                        </div>
                        <span className="font-black text-gray-900 uppercase text-base md:text-lg tracking-tight">
                          {sec.title}
                        </span>
                      </div>
                      <span className="font-mono font-black text-xl opacity-30" style={{ color: sec.accent }}>
                        {sec.num}
                      </span>
                    </div>

                    <p className="text-gray-600 text-xs sm:text-sm font-semibold leading-relaxed pl-13">
                      {sec.content}
                    </p>

                    <div className="flex items-center gap-4 pt-2 pl-13 text-[10px] font-black uppercase tracking-wider text-gray-400 border-t border-gray-50">
                      <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-[#0EA5E9]" />Aynı Gün Servis</span>
                      <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-[#0EA5E9]" />1 Yıl Garanti</span>
                      <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-[#0EA5E9]" />Orijinal Parça</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Diğer Mahalleler */}
            {neighborhoodsList.length > 0 && (
              <div className="pt-12 space-y-5 border-t border-gray-100">
                <div>
                  <span className="text-[#0EA5E9] font-black uppercase tracking-widest text-xs block mb-1">{districtName} Mahalleleri</span>
                  <h3 className="font-black text-gray-900 uppercase tracking-tight text-xl">Diğer Hizmet Noktalarımız</h3>
                  <div className="w-12 h-1 bg-[#0EA5E9] mt-3 rounded-full" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {neighborhoodsList.filter((m:string)=>slugify(m)!==cleanMahalleSlug).map((m:string,i:number)=>(
                    <Link
                      key={i}
                      href={`/${ilceSlug}/${slugify(m)}-klima-servisi`}
                      className="group flex items-center justify-between px-4 py-3 bg-white border border-gray-100 rounded-xl hover:border-[#0EA5E9] hover:bg-[#0EA5E9]/5 transition-all duration-150"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0EA5E9] shrink-0" />
                        <span className="font-extrabold text-gray-800 text-xs truncate group-hover:text-[#0EA5E9] transition-colors">{m}</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#0EA5E9] shrink-0 ml-1 transition-all duration-150 group-hover:translate-x-0.5" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* SSS Accordion */}
            <div className="pt-12 space-y-5 border-t border-gray-100">
              <div>
                <span className="text-[#0EA5E9] font-black uppercase tracking-widest text-xs block mb-1">SSS</span>
                <h3 className="font-black text-gray-900 uppercase tracking-tight text-xl">{neighborhoodName} Mahallesi SSS</h3>
                <div className="w-12 h-1 bg-[#0EA5E9] mt-3 mb-6 rounded-full" />
              </div>
              <div className="space-y-3">
                {faqs.map((faq, i) => {
                  const isOpen = openFaq === i;
                  return (
                    <div key={i} className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
                      <button
                        type="button"
                        onClick={()=>setOpenFaq(isOpen?null:i)}
                        className="w-full px-6 py-4 flex items-center justify-between gap-6 text-left cursor-pointer outline-none group"
                      >
                        <span className={`font-black text-xs sm:text-sm leading-snug transition-colors ${isOpen?"text-[#0EA5E9]":"text-gray-900 group-hover:text-[#0EA5E9]"}`}>{faq.q}</span>
                        <ChevronDown className={`w-4 h-4 text-[#0EA5E9] shrink-0 transition-transform duration-300 ${isOpen?"rotate-180":""}`} />
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}} transition={{duration:0.25}} className="overflow-hidden">
                            <p className="px-6 pb-5 text-gray-500 text-xs sm:text-sm leading-relaxed font-semibold border-t border-gray-50 pt-3">{faq.a}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* SAĞ SÜTUN: Servis Talep Formu ve İletişim */}
          <div className="lg:col-span-4 space-y-5 lg:sticky lg:top-36 h-fit">
            <div className="bg-white border border-gray-100 rounded-[32px] p-7 shadow-sm">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-50">
                <div className="w-9 h-9 rounded-xl bg-[#0EA5E9]/10 flex items-center justify-center">
                  <PhoneCall className="w-4.5 h-4.5 text-[#0EA5E9]" />
                </div>
                <div>
                  <h3 className="font-black text-gray-900 text-sm uppercase tracking-tight">{neighborhoodName} Servis Talebi</h3>
                  <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Sizi geri arayalım</span>
                </div>
              </div>

              {formStatus==="success" ? (
                <div className="py-8 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                  <h4 className="font-black text-gray-900 text-sm uppercase tracking-tight">Talebiniz Alındı!</h4>
                  <p className="text-gray-500 text-xs font-semibold">En kısa sürede mobil ekibimiz sizi arayacaktır.</p>
                  <button onClick={() => setFormStatus("idle")} className="text-gray-400 text-xs font-bold uppercase tracking-wider hover:text-gray-700 cursor-pointer">Yeni Talep</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-gray-400 mb-1">Ad Soyad *</label>
                    <input type="text" placeholder="Ahmet Yılmaz" required value={quickName} onChange={e=>setQuickName(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-[#0EA5E9] focus:bg-white text-gray-800 text-xs font-semibold transition-all" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-gray-400 mb-1">Telefon *</label>
                    <input type="tel" placeholder="0555 000 00 00" required value={quickPhone} onChange={e=>setQuickPhone(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-[#0EA5E9] focus:bg-white text-gray-800 text-xs font-semibold transition-all" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-gray-400 mb-1">E-Posta</label>
                    <input type="email" placeholder="ornek@demo.com" value={quickEmail} onChange={e=>setQuickEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-[#0EA5E9] focus:bg-white text-gray-800 text-xs font-semibold transition-all" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-gray-400 mb-1">Arıza veya Talep</label>
                    <textarea placeholder="Klima markası ve arıza sorunu..." rows={3} value={quickMessage} onChange={e=>setQuickMessage(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-[#0EA5E9] focus:bg-white text-gray-800 text-xs font-semibold resize-none transition-all" />
                  </div>
                  <button type="submit" disabled={formStatus==="loading"}
                    className="w-full py-3.5 bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-black uppercase tracking-wider text-xs rounded-xl transition-all shadow-md shadow-sky-500/10 cursor-pointer">
                    {formStatus==="loading"?"Gönderiliyor...":"Servis Talebi Gönder"}
                  </button>
                </form>
              )}
            </div>

            {/* Çalışma Saatleri Kartı */}
            <div className="bg-white border border-gray-100 rounded-[28px] p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-4 h-4 text-[#0EA5E9]" />
                <h4 className="font-black text-gray-900 text-xs uppercase tracking-tight">Mobil Servis Saatleri</h4>
              </div>
              <div className="space-y-2 text-xs font-semibold">
                <div className="flex justify-between py-1 border-b border-gray-50"><span className="text-gray-500">Hafta İçi</span><span className="text-gray-800 font-bold">08:00 – 20:00</span></div>
                <div className="flex justify-between py-1 border-b border-gray-50"><span className="text-gray-500">Cumartesi</span><span className="text-gray-800 font-bold">09:00 – 18:00</span></div>
                <div className="flex justify-between py-1 bg-[#0EA5E9]/5 px-2 rounded-lg -mx-2"><span className="text-[#0EA5E9] font-black">7/24 Acil</span><span className="text-[#0EA5E9] font-black">Kesintisiz</span></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
