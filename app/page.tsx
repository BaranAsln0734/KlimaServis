"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion, useSpring, useMotionValue, useMotionValueEvent } from "framer-motion";
import { PROJECTS } from "@/data/projects";
import staticPartners from "@/data/partners.json";

interface ServiceItem {
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

import { TESTIMONIALS_DATA } from "@/data/testimonials";

import { 
  ArrowRight, 
  CheckCircle2,
  Zap, 
  ShieldCheck, 
  Settings, 
  Activity, 
  X, 
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Cpu,
  MapPin,
  PhoneCall,
  ClipboardCheck,
  Truck,
  Star,
  MessageSquare,
  Snowflake,
  Thermometer,
  Droplets,
  Wind,
  Wrench,
  Timer,
  Fan,
  Gauge,
  HelpCircle
} from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// CountUp effect component
function Counter({ end, duration = 1500 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return <span>{count}</span>;
}

// Fareye duyarlı hareketli parçacık şebekesi (Interactive Particle Network)
function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }> = [];
    
    const maxParticles = width < 768 ? 40 : 80;
    const connectionDist = 130;
    const mouse = { x: -9999, y: -9999, active: false };

    for (let i = 0; i < maxParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
      mouse.active = false;
    };

    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx = -p.vx;
        if (p.y < 0 || p.y > height) p.vy = -p.vy;

        // Attract to mouse
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            p.x += (dx / dist) * 0.2;
            p.y += (dy / dist) * 0.2;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(14, 165, 233, 0.45)"; // brand blue
        ctx.fill();
      });

      // Draw lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * 0.2;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(14, 165, 233, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-auto" />;
}

// Animasyonlu Elektrik Devresi / Akım Efekti (Animated SVG Circuit Board)
function CircuitBoard() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.25] pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="grid-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0.2" />
        </linearGradient>
        <style>{`
          .circuit-line {
            stroke: #0EA5E9;
            stroke-width: 1.2;
            stroke-linecap: round;
            stroke-linejoin: round;
            fill: none;
            opacity: 0.15;
          }
          .pulse-line {
            stroke: url(#grid-grad);
            stroke-width: 2.2;
            stroke-linecap: round;
            stroke-linejoin: round;
            fill: none;
            stroke-dasharray: 60, 260;
            animation: dash 6s linear infinite;
          }
          @keyframes dash {
            to {
              stroke-dashoffset: -320;
            }
          }
        `}</style>
      </defs>

      {/* Circuit Line 1 */}
      <path className="circuit-line" d="M -50,150 L 300,150 L 400,250 L 900,250 L 980,330 L 1500,330" />
      <path className="pulse-line" d="M -50,150 L 300,150 L 400,250 L 900,250 L 980,330 L 1500,330" />

      {/* Circuit Line 2 */}
      <path className="circuit-line" d="M 200,600 L 500,600 L 580,520 L 1100,520 L 1200,620 L 1800,620" />
      <path className="pulse-line" d="M 200,600 L 500,600 L 580,520 L 1100,520 L 1200,620 L 1800,620" style={{ animationDelay: '1.8s' }} />

      {/* Circuit Line 3 */}
      <path className="circuit-line" d="M 600,-50 L 600,100 L 720,220 L 720,480 L 800,560 L 800,900" />
      <path className="pulse-line" d="M 600,-50 L 600,100 L 720,220 L 720,480 L 800,560 L 800,900" style={{ animationDelay: '3.2s' }} />

      {/* Circuit Line 4 */}
      <path className="circuit-line" d="M 1200,-50 L 1200,150 L 1100,250 L 1100,450 L 1150,500 L 1400,500" />
      <path className="pulse-line" d="M 1200,-50 L 1200,150 L 1100,250 L 1100,450 L 1150,500 L 1400,500" style={{ animationDelay: '0.8s' }} />

      {/* Circuit Line 5 */}
      <path className="circuit-line" d="M 100,800 L 350,800 L 450,900" />
      <path className="pulse-line" d="M 100,800 L 350,800 L 450,900" style={{ animationDelay: '2.5s' }} />

      {/* Junction Nodes */}
      <circle cx="300" cy="150" r="3.5" fill="#FFCC00" opacity="0.6" />
      <circle cx="400" cy="250" r="3.5" fill="#FFCC00" opacity="0.6" />
      <circle cx="900" cy="250" r="3.5" fill="#FFCC00" opacity="0.6" />
      <circle cx="980" cy="330" r="3.5" fill="#FFCC00" opacity="0.6" />
      <circle cx="580" cy="520" r="3.5" fill="#FFCC00" opacity="0.6" />
      <circle cx="1100" cy="520" r="3.5" fill="#FFCC00" opacity="0.6" />
      <circle cx="1200" cy="620" r="3.5" fill="#FFCC00" opacity="0.6" />
      <circle cx="720" cy="220" r="3.5" fill="#FFCC00" opacity="0.6" />
      <circle cx="720" cy="480" r="3.5" fill="#FFCC00" opacity="0.6" />
      <circle cx="800" cy="560" r="3.5" fill="#FFCC00" opacity="0.6" />
      <circle cx="350" cy="800" r="3.5" fill="#FFCC00" opacity="0.6" />
    </svg>
  );
}

interface Project {
  title: string;
  category: "satis" | "kiralama" | "servis" | "yedek-parca";
  categoryLabel: string;
  img: string;
  details?: string;
  location?: string;
  year?: string;
  employer?: string;
  region?: string;
  technicalDetails?: string;
  showOnHomepage?: boolean;
}

function LogoCarousel({ partners }: { partners: { name: string; logo: string }[] }) {
  const duplicatedPartners = [...partners, ...partners, ...partners];

  return (
    <div className="relative w-full py-12 overflow-hidden select-none">
      {/* Shadow overlays for smooth fade-in/out on sides */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      <style>{`
        @keyframes marquee-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.3333%);
          }
        }
        .marquee-container {
          display: flex;
          width: max-content;
          animation: marquee-scroll 32s linear infinite;
        }
        .marquee-container:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="marquee-container gap-16" suppressHydrationWarning={true}>
        {duplicatedPartners.map((partner, index) => (
          <div 
            key={index}
            className="flex items-center justify-center w-[260px] h-28 bg-white border border-gray-150 rounded-3xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-lg hover:border-[#0EA5E9]/20 transition-all duration-300 shrink-0 hover:scale-105"
            suppressHydrationWarning={true}
          >
            <img 
              src={partner.logo} 
              alt={partner.name} 
              className="max-w-[200px] max-h-[80px] w-auto h-auto object-contain mix-blend-multiply" 
              loading="lazy" 
              suppressHydrationWarning={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function CertificatesCarousel() {
  const certs = [
    {
      title: "TSE Belgesi",
      desc: "Türk Standartları Enstitüsü Hizmet Yeterlilik Belgesi",
      code: "TSE-HYB",
      colorClass: "border-blue-100 hover:border-blue-300 bg-blue-50/10",
      svg: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 text-blue-800">
          <polygon points="30,10 70,10 90,30 90,70 70,90 30,90 10,70 10,30" fill="none" stroke="currentColor" strokeWidth="6" />
          <text x="50" y="58" textAnchor="middle" fontSize="24" fontWeight="900" fontFamily="sans-serif" fill="currentColor" letterSpacing="1">TSE</text>
        </svg>
      )
    },
    {
      title: "CE Uygunluk",
      desc: "Avrupa Standartlarına Uygunluk Beyanı",
      code: "CE Deklarasyonu",
      colorClass: "border-amber-100 hover:border-amber-300 bg-amber-50/10",
      svg: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 text-[#1E3A8A] fill-current">
          <path d="M 46,50 C 46,36 34,36 34,50 C 34,64 46,64 46,50 M 46,39 L 42,42 C 39,39 36,39 34,42 C 32,44 31,47 31,50 C 31,53 32,56 34,58 C 36,61 39,61 42,58 L 46,61 C 42,65 37,66 33,63 C 29,60 27,55 27,50 C 27,45 29,40 33,37 C 37,34 42,35 46,39 Z" />
          <path d="M 73,50 C 73,36 61,36 61,50 C 61,64 73,64 73,50 M 73,39 L 69,42 C 66,39 63,39 61,42 C 59,44 58,47 58,50 C 58,53 59,56 61,58 C 63,61 66,61 69,58 L 73,61 C 69,65 64,66 60,63 C 56,60 54,55 54,50 C 54,45 56,40 60,37 C 64,34 69,35 73,39 M 70,48 L 59,48 L 59,52 L 70,52 Z" />
        </svg>
      )
    },
    {
      title: "ISO 9001:2015",
      desc: "Kalite Yönetim Sistemi Sertifikası",
      code: "ISO 9001",
      colorClass: "border-emerald-100 hover:border-emerald-300 bg-emerald-50/10",
      svg: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 text-emerald-600">
          <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="4" />
          <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
          <path d="M 25,50 A 25,25 0 0,0 75,50 A 25,25 0 0,0 25,50 M 50,15 L 50,85 M 15,50 L 85,50" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
          <text x="50" y="46" textAnchor="middle" fontSize="11" fontWeight="900" fill="currentColor">ISO 9001</text>
          <text x="50" y="58" textAnchor="middle" fontSize="7" fontWeight="800" fill="currentColor" letterSpacing="0.5">KALİTE</text>
          <text x="50" y="67" textAnchor="middle" fontSize="7" fontWeight="800" fill="currentColor" letterSpacing="0.5">YÖNETİMİ</text>
        </svg>
      )
    },
    {
      title: "ISO 14001:2015",
      desc: "Çevre Yönetim Sistemi Sertifikası",
      code: "ISO 14001",
      colorClass: "border-teal-100 hover:border-teal-300 bg-teal-50/10",
      svg: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 text-teal-600">
          <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="4" />
          <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
          <path d="M 50,22 C 35,35 35,60 50,75 C 65,60 65,35 50,22 Z" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.2" />
          <text x="50" y="46" textAnchor="middle" fontSize="11" fontWeight="900" fill="currentColor">ISO 14001</text>
          <text x="50" y="58" textAnchor="middle" fontSize="7" fontWeight="800" fill="currentColor" letterSpacing="0.5">ÇEVRE</text>
          <text x="50" y="67" textAnchor="middle" fontSize="7" fontWeight="800" fill="currentColor" letterSpacing="0.5">YÖNETİMİ</text>
        </svg>
      )
    },
    {
      title: "ISO 45001:2018",
      desc: "İş Sağlığı ve Güvenliği Yönetim Sistemi",
      code: "ISO 45001",
      colorClass: "border-indigo-100 hover:border-indigo-300 bg-indigo-50/10",
      svg: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 text-indigo-600">
          <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="4" />
          <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
          <path d="M 35,30 L 50,22 L 65,30 L 65,55 C 65,68 50,78 50,78 C 50,78 35,68 35,55 Z" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.2" />
          <text x="50" y="46" textAnchor="middle" fontSize="11" fontWeight="900" fill="currentColor">ISO 45001</text>
          <text x="50" y="58" textAnchor="middle" fontSize="7" fontWeight="800" fill="currentColor" letterSpacing="0.5">İSG</text>
          <text x="50" y="67" textAnchor="middle" fontSize="7" fontWeight="800" fill="currentColor" letterSpacing="0.5">YÖNETİMİ</text>
        </svg>
      )
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 lg:px-8 mt-10">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 justify-center">
        {certs.map((c, idx) => (
          <div
            key={idx}
            className={`bg-white rounded-3xl p-6 border text-center flex flex-col items-center justify-between shadow-xs hover:shadow-lg transition-all duration-300 group cursor-default ${c.colorClass}`}
          >
            <div className="mb-4 transform group-hover:scale-105 transition-transform duration-300">
              {c.svg}
            </div>
            <div className="space-y-1">
              <h3 className="font-extrabold text-gray-900 text-xs md:text-sm leading-snug">
                {c.title}
              </h3>
              <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">
                {c.code}
              </p>
              <p className="text-gray-500 text-[10px] md:text-xs leading-relaxed hidden md:block">
                {c.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Blog-based "Bilgi Merkezi" preview for homepage ────────────────────────
const STATIC_BLOG_POSTS = [
  {
    slug: "klima-bakim-neden-onemli",
    title: "Klima Bakımı Neden Bu Kadar Önemli? Uzman Tavsiyeleri",
    desc: "Düzenli klima bakımı hem enerji tasarrufu sağlar hem de cihazınızın ömrünü uzatır. Bakımsız klimaların yol açtığı sorunlar ve çözümleri.",
    category: "Klima Bakımı",
    readTime: "6 Dk Okuma",
    date: "18 Haziran 2026",
    img: "/images/akanenerji/hizmet-jenerator-servis.jpg",
  },
  {
    slug: "klima-gaz-dolumu-ne-zaman",
    title: "Klimam Soğutmuyor: Gaz Dolumu Gerekli mi?",
    desc: "Klimanızın soğutma performansı düştüyse, gaz kaçağı olabilir. Gaz dolumunun ne zaman gerekli olduğunu ve nasıl anlaşılacağını açıklıyoruz.",
    category: "Arıza Giderme",
    readTime: "5 Dk Okuma",
    date: "12 Haziran 2026",
    img: "/images/akanenerji/hizmet-kiralama.jpg",
  },
  {
    slug: "klima-montaj-rehberi",
    title: "Klima Montajında Dikkat Edilmesi Gereken 7 Kritik Nokta",
    desc: "Doğru klima montajı hem verimi hem de güvenliği doğrudan etkiler. Profesyonel montaj sırasında gözetilmesi gereken kritik detaylar.",
    category: "Montaj",
    readTime: "7 Dk Okuma",
    date: "05 Haziran 2026",
    img: "/images/akanenerji/hizmet-jenerator-kiralama-new.png",
  },
  {
    slug: "btu-hesaplama-rehberi",
    title: "Odanız İçin Kaç BTU'luk Klima Lazım? BTU Hesabı",
    desc: "Oda metrekaresi, tavan yüksekliği ve güneş alımına göre doğru klima kapasitesini nasıl hesaplarsınız? Adım adım BTU rehberi.",
    category: "Kapasite Hesabı",
    readTime: "8 Dk Okuma",
    date: "28 Mayıs 2026",
    img: "/images/akanenerji/blog-kva-hesap.jpg",
  },
  {
    slug: "vrf-vrv-sistemleri-nedir",
    title: "VRF ve VRV Klima Sistemleri Nedir? Avantajları",
    desc: "Büyük binalarda merkezi iklimlendirme için kullanılan VRF/VRV sistemlerinin özellikleri, avantajları ve kurulum sürecine dair detaylı rehber.",
    category: "VRF Sistemleri",
    readTime: "9 Dk Okuma",
    date: "15 Mayıs 2026",
    img: "/images/akanenerji/hizmet-jenerator-yedek-parca-v3.png",
  },
  {
    slug: "klima-kotu-koku-nedenleri",
    title: "Klimadan Kötü Koku Geliyor: Nedenleri ve Çözümü",
    desc: "Klimadan gelen küf ve hoş olmayan kokuların sebebi ne? Filtrelerin kirlenmesi ve bakım ihmalinin yol açtığı sonuçlar ve kalıcı çözümler.",
    category: "Klima Bakımı",
    readTime: "4 Dk Okuma",
    date: "08 Mayıs 2026",
    img: "/images/akanenerji/blog-hararet.jpg",
  },
];

interface BlogPostPreview {
  slug: string;
  title: string;
  desc: string;
  category: string;
  readTime: string;
  date: string;
  img: string;
}

function InfoCenterSection() {
  const [posts, setPosts] = useState<BlogPostPreview[]>(STATIC_BLOG_POSTS);

  useEffect(() => {
    fetch("/api/posts?t=" + Date.now(), { cache: "no-store" })
      .then((r) => r.json())
      .then((data: Array<{ slug: string; title: string; excerpt?: string; date?: string; category?: string; imageUrl?: string }>) => {
        if (Array.isArray(data)) {
          const nowStr = new Date().toISOString().split('T')[0];
          const activeData = data.filter(p => !p.date || p.date <= nowStr);

          const formatted: BlogPostPreview[] = activeData.map((p) => ({
            slug: p.slug,
            title: p.title,
            desc: p.excerpt ?? "",
            category: p.category ?? "Genel",
            readTime: "3 Dk Okuma",
            date: typeof p.date === "string" ? p.date.split("-").reverse().join(" ") : "",
            img: p.imageUrl ?? "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=600&auto=format&fit=crop"
          }));
          setPosts(formatted);
        }
      })
      .catch((err) => {
        console.error("Error loading posts:", err);
        setPosts(STATIC_BLOG_POSTS);
      });
  }, []);

  // Deterministically shuffle posts based on the current day of the month so they cycle daily
  const visiblePosts = useMemo(() => {
    if (posts.length === 0) return [];
    const day = new Date().getDate(); // 1 to 31
    const shuffled = [...posts];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = (day * (i + 1)) % (i + 1);
      const temp = shuffled[i];
      shuffled[i] = shuffled[j];
      shuffled[j] = temp;
    }
    return shuffled.slice(0, 3);
  }, [posts]);

  const categoryColors: Record<string, string> = {
    "Klima Bakımı": "bg-blue-50 text-blue-600 border border-blue-100",
    "Arıza Giderme": "bg-red-50 text-red-600 border border-red-100",
    "Montaj": "bg-green-50 text-green-600 border border-green-100",
    "Kapasite Hesabı": "bg-amber-50 text-amber-600 border border-amber-100",
    "VRF Sistemleri": "bg-purple-50 text-purple-600 border border-purple-100",
    "Genel": "bg-gray-50 text-gray-600 border border-gray-100",
  };

  return (
    <section className="py-24 bg-white text-gray-900 relative overflow-hidden border-t border-b border-gray-150">
      <div className="absolute inset-0 bg-topo-waves pointer-events-none opacity-[0.03] z-0" />
      {/* Soft Cyan/Blue Blobs for background depth */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#0EA5E9]/4 blur-[130px] rounded-full pointer-events-none animate-organic-blob z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#0EA5E9]/3 blur-[130px] rounded-full pointer-events-none animate-organic-blob-reverse z-0" />
      <div className="max-w-[1600px] mx-auto px-10 relative z-10">

        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
          <div className="space-y-2">
            <span className="text-[#0EA5E9] font-black uppercase tracking-widest block text-xs">BİLGİ MERKEZİ</span>
            <h2 className="font-black text-gray-950 tracking-tight uppercase leading-tight text-2xl md:text-3xl">
              Son Teknik Yazılar
            </h2>
            <div className="w-10 h-1 bg-[#0EA5E9]" />
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#0EA5E9] font-bold text-sm uppercase tracking-wider hover:gap-3 transition-all duration-200"
          >
            Tüm Yazılar
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visiblePosts.map((post, idx) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: EASE }}
              className="flex flex-col h-full"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group flex flex-col h-full bg-white border border-gray-200/80 rounded-[32px] hover:border-[#0EA5E9] hover:shadow-2xl hover:shadow-sky-500/5 hover:translate-y-[-4px] transition-all duration-300 overflow-hidden shadow-xs"
              >
                {/* Image Header */}
                <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
                  <Image
                    src={post.img}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 400px, 380px"
                    quality={70}
                  />
                </div>

                {/* Card Body */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${categoryColors[post.category] ?? "bg-gray-50 text-gray-600 border border-gray-100"}`}>
                      {post.category}
                    </span>
                    <span className="text-gray-400 text-xs font-semibold ml-auto">{post.readTime}</span>
                  </div>

                  <h3 className="font-black text-gray-950 text-base leading-snug mb-3 group-hover:text-[#0EA5E9] transition-colors duration-200 line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-gray-500 text-xs font-semibold leading-relaxed line-clamp-3 flex-1">
                    {post.desc}
                  </p>

                  <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-gray-400 text-xs font-semibold">{post.date}</span>
                    <span className="text-[#0EA5E9] text-xs font-black uppercase tracking-wider flex items-center gap-1 group-hover:gap-2 transition-all">
                      Oku <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}




function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Klima periyodik bakımları ne sıklıkla yapılmalıdır?",
      a: "Split ve inverter klimaların periyodik bakımının yılda en az 2 kez (ilkbahar ve sonbahar) yapılması önerilir. Ticari ortamlarda veya yoğun kullanımlarda bu süre 3 aya inebilir."
    },
    {
      q: "Hangi BTU'luk klima almam gerektiğini nasıl belirlerim?",
      a: "Genel kural olarak 10 m² oda için yaklaşık 8.000 BTU gereklidir. Ancak güneş alan cepheler, cam yüzeyi ve tavan yüksekliği bu hesabı etkiler. Sitemizin BTU hesaplama aracını kullanabilirsiniz."
    },
    {
      q: "Klimam soğutmuyor, gaz mı doldurmak gerekiyor?",
      a: "Soğutma performansı düşen klimalar çoğunlukla gaz kaçağından kaynaklanır. Uzman teknisyenimiz sistemi kontrol ederek gaz sızıntısını giderir ve uygun oranda gaz dolumu yapar."
    },
    {
      q: "Inverter klima ile normal klima arasındaki fark nedir?",
      a: "Inverter klimalar kompresör hızını değişken tutarak enerji tasarrufu sağlar ve hedef sıcaklığa ulaştıktan sonra düşük güçle çalışmayı sürdürür. On/off klimalar ise sabit güçte çalışır, bu da enerji tüketimini artırır."
    },
    {
      q: "Klima montajı kaç saatte tamamlanır?",
      a: "Standart bir split klima montajı ortalama 2-3 saat içinde tamamlanır. VRF/VRV sistemleri ve kaset tipi klimalar daha uzun sürebilir; kesin süre için ücretsiz keşif yapılabilir."
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden border-t border-gray-100">
      {/* Organic Blobs */}
      <div className="absolute top-[10%] left-[-15%] w-[450px] h-[450px] bg-[#0EA5E9]/4 blur-[120px] rounded-full pointer-events-none animate-organic-blob z-0" />
      <div className="absolute bottom-[10%] right-[-15%] w-[450px] h-[450px] bg-[#0EA5E9]/3 blur-[120px] rounded-full pointer-events-none animate-organic-blob-reverse z-0" />
      <div className="max-w-[1200px] mx-auto px-10 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-primary font-bold uppercase tracking-widest block text-xs md:text-sm">SIKÇA SORULANLAR</span>
          <h2 className="font-black text-dark-text tracking-tight uppercase leading-tight text-3xl md:text-4xl">
            Merak Ettikleriniz
          </h2>
          <div className="w-12 h-1 bg-primary mx-auto" />
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-light-bg border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full py-6 px-8 flex items-center justify-between text-left cursor-pointer focus:outline-none"
                >
                  <span className="font-bold text-dark-text text-base md:text-lg hover:text-primary transition-colors duration-200">
                    {faq.q}
                  </span>
                  <span className={`ml-4 w-8 h-8 rounded-full bg-white flex items-center justify-center text-primary shadow-sm transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </button>
                
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0 }}
                  className="overflow-hidden"
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="px-8 pb-6 pt-2 text-gray-500 font-medium text-sm md:text-base leading-relaxed border-t border-gray-200/40">
                    {faq.a}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

// ─── Magnetic Button Component ────────────────────────────────────────────────
function MagneticButton({ children, shouldReduceMotion }: { children: React.ReactNode; shouldReduceMotion: boolean }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 15 });
  const springY = useSpring(y, { stiffness: 180, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * 0.35);
    y.set((clientY - centerY) * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
      transition={{ type: "spring", stiffness: 350, damping: 15 }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

// ─── Animated Hizmetler Section — Gallery Grid Layout ─────────────────────────
function HizmetlerSection({ services: _services }: { services: ServiceItem[] }) {
  const shouldReduceMotion = useReducedMotion();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [activeMobileIdx, setActiveMobileIdx] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (hoveredIdx !== null) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(interval);
  }, [hoveredIdx]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const galleryItems = [
    {
      title: "Klima Arıza Servisi",
      subtitle: "7/24 Mobil Acil Teknik Servis",
      tag: "Arıza",
      href: "/hizmetler/ariza-servis-7-24",
      img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=900&auto=format&fit=crop",
      desc: "Klimanız arızalandığında Sakarya genelinde 7/24 mobil ekibimizle en kısa sürede yerinde müdahale sağlıyoruz. Isıtma-soğutma arızaları, kompresör sorunları ve elektrik arızalarında hızlı çözüm.",
      items: ["7/24 Acil Mobil Servis", "Aynı Gün Müdahale", "Tüm Marka ve Modeller"]
    },
    {
      title: "Klima Periyodik Bakımı",
      subtitle: "Filtre Temizleme & Sistem Kontrolü",
      tag: "Bakım",
      href: "/hizmetler/periyodik-kontrol",
      img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=900&auto=format&fit=crop",
      desc: "Klimanızın verimini artırmak ve uzun ömürlü çalışmasını sağlamak için filtre temizliği, gaz basınç kontrolü ve genel sistem bakımı hizmetleri.",
      items: ["Filtre Temizleme & Değişimi", "Gaz Basınç Kontrolü", "Yıllık Bakım Anlaşması"]
    },
    {
      title: "Klima Montajı & Demontajı",
      subtitle: "Profesyonel Kurulum & Söküm",
      tag: "Montaj",
      href: "/hizmetler/klima-montaj",
      img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=900&auto=format&fit=crop",
      desc: "Split, kaset, cassette ve VRF/VRV sistemlerinin profesyonel montajı. Doğru konumlama, bakır boru ve elektrik tesisatıyla garantili kurulum.",
      items: ["Split & Kaset Klima Montajı", "VRF/VRV Sistem Kurulumu", "Garanti Kapsamında Montaj"]
    },
    {
      title: "Gaz Dolumu & Bakım",
      subtitle: "R32 / R410A / R22 Gaz Dolumu",
      tag: "Gaz",
      href: "/hizmetler/gaz-dolumu",
      img: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=900&auto=format&fit=crop",
      desc: "Klimanızın soğutma gazı bitmişse ya da gaz kaçağı yaşıyorsanız, sertifikalı teknisyenlerimiz uygun gaz tipini doldurarak sisteminizi optimum performansa kavuşturur.",
      items: ["R32, R410A, R22 Gaz Dolumu", "Kaçak Tespiti & Giderimi", "Sertifikalı Teknisyen"]
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-[#0F1923] relative overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-topo-waves pointer-events-none opacity-80 z-0" />
      {/* Organic Blobs */}
      <div className="absolute top-[10%] left-[-10%] w-[550px] h-[550px] bg-[#0EA5E9]/6 blur-[130px] rounded-full pointer-events-none animate-organic-blob z-0" />
      <div className="absolute bottom-[10%] right-[-10%] w-[550px] h-[550px] bg-[#0EA5E9]/4 blur-[130px] rounded-full pointer-events-none animate-organic-blob-reverse z-0" />

      {/* Section Header */}
      <div className="max-w-[1600px] mx-auto px-10 mb-12 relative z-10">
        <motion.div
          className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div className="space-y-3">
            <span className="text-primary font-bold uppercase tracking-widest block text-xs md:text-sm">HİZMETLERİMİZ</span>
            <h2 className="font-black text-white tracking-tight uppercase leading-tight text-3xl md:text-[48px]">
              Profesyonel Klima<br className="hidden md:block" /> Hizmetleri
            </h2>
            <div className="w-12 h-1 bg-primary" />
          </div>
          <p className="text-white/60 font-medium text-sm md:text-base max-w-sm leading-relaxed">
            7/24 Acil Klima Servisi, Uzman Teknisyenler, Garantili Hizmet ve Sakarya Geneli Mobil Destek — Klima ihtiyaçlarınızın tamamında güvenilir çözüm ortağınız.
          </p>
        </motion.div>
      </div>

      {/* Accordion Layout Container */}
      <div className="max-w-[1600px] mx-auto px-10">
        
        {/* Desktop: Yatay Akordeon (Horizontal Hover-to-Expand Columns) */}
        <div className="hidden lg:flex flex-row gap-4 h-[600px] w-full">
          {galleryItems.map((item, idx) => {
            const currentActive = hoveredIdx !== null ? hoveredIdx : activeIdx;
            const isCurrentActive = currentActive === idx;
            // The active column takes flex-3.2, other columns shrink to flex-0.6
            const flexValue = isCurrentActive ? 3.2 : 0.6;

            return (
              <motion.div
                layout
                key={idx}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{ flex: flexValue }}
                className="relative h-full rounded-[32px] overflow-hidden cursor-pointer group border border-white/10 shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <Link href={item.href} className="absolute inset-0 block w-full h-full">
                  {/* Background image & overlay */}
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 400px, 35vw"
                      quality={70}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/25 transition-opacity duration-300 ${
                      isCurrentActive ? "opacity-90" : "opacity-80 group-hover:opacity-85"
                    }`} />
                  </div>

                  {/* Category Tag */}
                  <div className="absolute top-6 left-6 z-10">
                    <span className="inline-block px-3 py-1.5 rounded-full bg-primary text-black font-black text-[10px] uppercase tracking-wider shadow-lg">
                      {item.tag}
                    </span>
                  </div>

                  {/* Content Container */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">

                    {/* Collapsed Vertical Title */}
                    {!isCurrentActive && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none pb-16">
                        <span className="transform -rotate-90 origin-center whitespace-nowrap uppercase tracking-[0.2em] font-black text-white/50 text-xs md:text-sm group-hover:text-primary transition-colors duration-300">
                          {item.title}
                        </span>
                      </div>
                    )}

                    <motion.div layout="position" className="space-y-4">
                      
                      {/* Subtitle */}
                      {isCurrentActive && (
                        <span className="text-white/60 text-xs font-semibold uppercase tracking-widest block">
                          {item.subtitle}
                        </span>
                      )}
                      
                      {/* Title */}
                      {isCurrentActive && (
                        <h3 className="font-black text-white uppercase tracking-tight text-xl md:text-3xl transition-colors duration-300 text-primary">
                          {item.title}
                        </h3>
                      )}

                      {/* Expanded details (shown only on hover/active) */}
                      <AnimatePresence>
                        {isCurrentActive && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                            className="space-y-4 overflow-hidden pt-2"
                          >
                            <p className="text-gray-300 text-sm leading-relaxed max-w-md">
                              {item.desc}
                            </p>
                            
                            {/* Features list */}
                            <ul className="space-y-2 text-xs font-bold text-gray-200">
                              {item.items.map((feat, fIdx) => (
                                <li key={fIdx} className="flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                  {feat}
                                </li>
                              ))}
                            </ul>

                            <div className="pt-2">
                              <div className="inline-flex items-center gap-2 bg-primary text-black font-black uppercase tracking-wider text-[10px] px-5 py-3 rounded-full shadow-lg hover:bg-white transition-colors duration-300">
                                Detayları İncele <ArrowRight className="w-3.5 h-3.5" />
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile: Dikey Akordeon (Vertical Accordion Shingles) */}
        <div className="flex lg:hidden flex-col gap-4 w-full">
          {galleryItems.map((item, idx) => {
            const isActive = activeMobileIdx === idx;

            return (
              <div
                key={idx}
                onClick={() => setActiveMobileIdx(isActive ? null : idx)}
                className="relative rounded-2xl overflow-hidden cursor-pointer bg-[#0F1923] border border-white/5 shadow-md"
              >
                {/* Background image & header */}
                <div className="relative h-24 w-full overflow-hidden">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 400px, 100vw"
                    quality={70}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/45 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-between px-6 z-10">
                    <div className="flex flex-col items-start gap-1">
                      <span className="text-primary font-black text-[9px] uppercase tracking-widest">{item.tag}</span>
                      <h3 className="font-extrabold text-white uppercase text-sm md:text-base">{item.title}</h3>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-primary transition-transform duration-300 ${
                      isActive ? "rotate-180" : ""
                    }`} />
                  </div>
                </div>

                {/* Expanded mobile panel */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-[#14212D]/95 px-6 py-6 border-t border-white/5 space-y-4"
                    >
                      <span className="text-primary/70 text-[10px] font-black uppercase tracking-widest block">
                        {item.subtitle}
                      </span>
                      <p className="text-gray-300 text-xs leading-relaxed">
                        {item.desc}
                      </p>
                      <ul className="space-y-2 text-[10px] font-bold text-gray-200">
                        {item.items.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-primary" />
                            {feat}
                          </li>
                        ))}
                      </ul>
                      <div className="pt-2">
                        <Link
                          href={item.href}
                          className="inline-flex items-center gap-2 bg-primary text-black font-black uppercase tracking-wider text-[10px] px-5 py-3 rounded-full shadow-lg"
                        >
                          Hizmeti İncele <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}




// Map shared PROJECTS data to the local Project interface
const STATIC_PROJECTS: Project[] = PROJECTS.map((p) => ({
  title: p.title,
  category: p.category,
  categoryLabel: p.categoryLabel,
  img: p.img,
  location: p.location,
  year: String(p.id + 2021),
  details: p.description,
  region: p.region,
  technicalDetails: p.technicalDetails,
  showOnHomepage: p.showOnHomepage,
}));

const STAGES = [
  {
    index: 0,
    label: "Karşılama",
    badge: "Sakarya Uzman Klima · İklimlendirme Servisi",
    title: "Konforunuz",
    titleYellow: "Uzman Ellerinde",
    desc: "Sakarya Uzman Klima olarak; tüm klima marka ve modellerinde montaj, bakım, arıza tamiri ve gaz dolumu hizmetleri sunuyoruz. Sakarya'nın güvenilir klima uzmanı.",
    bg: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?q=80&w=1920&auto=format&fit=crop",
    btnText: "Hakkımızda",
    btnHref: "/hakkimizda"
  },
  {
    index: 1,
    label: "Arıza Servisi",
    badge: "7/24 Hızlı Müdahale",
    title: "Klima",
    titleYellow: "Arıza Servisi",
    desc: "Klimanız bozulduğunda Adapazarı, Serdivan, Erenler ve tüm Sakarya ilçelerinde 7/24 mobil acil teknik ekibimizle aynı gün yerinde müdahale sağlıyoruz.",
    bg: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1920&auto=format&fit=crop",
    btnText: "Hemen Ara",
    btnHref: "tel:+905321234567"
  },
  {
    index: 2,
    label: "Bakım Servisi",
    badge: "Koruyucu Periyodik Bakım",
    title: "Klima",
    titleYellow: "Bakım Servisi",
    desc: "Klimanızın verimini artırmak ve uzun ömürlü çalışmasını sağlamak için filtre temizliği, gaz basınç kontrolü ve kapsamlı sistem bakımı yapıyoruz.",
    bg: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1920&auto=format&fit=crop",
    btnText: "Anlaşma Yap",
    btnHref: "/iletisim"
  },
  {
    index: 3,
    label: "Montaj & Demontaj",
    badge: "Profesyonel Klima Kurulumu",
    title: "Klima Montajı",
    titleYellow: "& Demontajı",
    desc: "Split, kaset ve VRF/VRV sistemlerinin profesyonel montajı. Doğru konumlama, bakır boru ve elektrik tesisatıyla garantili kurulum; yaz-kış optimum verim.",
    bg: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=1920&auto=format&fit=crop",
    btnText: "Teklif İsteyin",
    btnHref: "/iletisim"
  },
  {
    index: 4,
    label: "Gaz Dolumu & BTU",
    badge: "Kapasite Analizi & Gaz Dolumu",
    title: "BTU Analizi",
    titleYellow: "& Gaz Dolumu",
    desc: "Odası için doğru BTU değerini belirleyin; gaz kaçağı varsa anında tespit ve R32/R410A dolumu yapılır. Sertifikalı teknisyenlerle garantili hizmet.",
    bg: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1920&auto=format&fit=crop",
    btnText: "BTU Hesapla",
    btnHref: "/hesaplama-araclari"
  }
];

const FAQ_ITEMS = [
  {
    question: "Klima bakımı ne sıklıkla yapılmalıdır?",
    answer: "Sağlıklı bir hava kalitesi ve yüksek enerji verimliliği için klimaların yılda en az iki kez (yaz ve kış sezonu başlangıcında) periyodik bakımdan geçmesi önerilir."
  },
  {
    question: "Klimanın soğutmamasının en yaygın sebepleri nelerdir?",
    answer: "İç ünite filtrelerinin tıkanması, soğutucu gaz eksikliği (sızıntı), kompresör/fan motoru arızaları ile dış ünitenin aşırı ısınması en yaygın sebeplerdir."
  },
  {
    question: "Klima gaz dolumu ne zaman yapılmalıdır?",
    answer: "Klima gazı normal şartlarda eksilmez. Ancak boru tesisatındaki rekor gevşemeleri veya kaynak çatlaklarından kaynaklanan sızıntılarda gaz azalır. Sızıntı onarıldıktan sonra dolum yapılır."
  },
  {
    question: "Servis sonrasında yapılan işlemler garantili mi?",
    answer: "Evet, Sakarya Uzman Klima bünyesinde yapılan arıza onarımları ve orijinal yedek parça değişimleri işçilik dahil 1 yıl süreyle resmi servis garantimiz altındadır."
  },
  {
    question: "Klima montaj söküm işleminde gazı boşa gider mi?",
    answer: "Hayır. Teknolojimiz ve söküm prosedürümüz sayesinde klima gazı dış ünite kompresörüne toplanır ve vanalar kapatılır. Böylece gaz kaybı yaşamadan klimanız sökülebilir."
  }
];

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>(STATIC_PROJECTS.filter((p) => p.showOnHomepage === true));
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [hoveredCardIdx, setHoveredCardIdx] = useState<number | null>(null);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [serviceTab, setServiceTab] = useState<"konut" | "ticari">("konut");
  const [hoveredKonut, setHoveredKonut] = useState(0);
  const [hoveredTicari, setHoveredTicari] = useState(0);
  const [testimonials, setTestimonials] = useState<any[]>(TESTIMONIALS_DATA.slice(0, 6));
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [partnersData, setPartnersData] = useState<{ title: string; subtitle: string; list: { name: string; logo: string }[] }>(staticPartners);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  useEffect(() => {
    // 1. Fetch Testimonials
    fetch("/api/admin/files?file=testimonials.ts&t=" + Date.now(), { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.content) {
          const content = data.content;
          const start = content.indexOf('[');
          const end = content.lastIndexOf(']');
          if (start !== -1 && end !== -1) {
            const jsArrayText = content.substring(start, end + 1);
            const parsed = new Function(`return ${jsArrayText};`)();
            if (Array.isArray(parsed)) {
              setTestimonials(parsed.slice(0, 6));
            }
          }
        }
      })
      .catch((err) => console.error("Error loading dynamic testimonials:", err));

    // 2. Fetch Projects
    fetch("/api/admin/files?file=projects.ts&t=" + Date.now(), { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.content) {
          const content = data.content;
          const start = content.indexOf('[');
          const end = content.lastIndexOf(']');
          if (start !== -1 && end !== -1) {
            const jsArrayText = content.substring(start, end + 1);
            const parsed = new Function(`return ${jsArrayText};`)();
            if (Array.isArray(parsed)) {
              const mapped = parsed.map((p: any) => ({
                title: p.title,
                category: p.category,
                categoryLabel: p.categoryLabel,
                img: p.img,
                location: p.location,
                year: String(p.id + 2021),
                details: p.description,
                region: p.region,
                technicalDetails: p.technicalDetails,
                showOnHomepage: p.showOnHomepage,
              }));
              const featured = mapped.filter((p: any) => p.showOnHomepage === true);
              setProjects(featured.length > 0 ? featured : mapped);
              setActiveProjectIndex(0);
            }
          }
        }
      })
      .catch((err) => console.error("Error loading dynamic projects:", err));

    // 3. Fetch Partners
    fetch("/api/admin/files?file=partners.json&t=" + Date.now(), { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.content) {
          try {
            const parsed = typeof data.content === "string" ? JSON.parse(data.content) : data.content;
            if (parsed && parsed.title && parsed.list) {
              setPartnersData(parsed);
            }
          } catch (e) {
            console.error("Error parsing dynamic partners:", e);
          }
        }
      })
      .catch((err) => console.error("Error loading dynamic partners:", err));
  }, []);

  // Auto slide testimonials every 6 seconds
  useEffect(() => {
    if (testimonials.length <= 1) return;
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const activeItemRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (activeItemRef.current) {
      activeItemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [activeProjectIndex]);

  const autoplayTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const shouldReduceMotion = useReducedMotion();

  // Autoplay function
  const startAutoplay = useCallback(() => {
    if (shouldReduceMotion || projects.length <= 1) return;
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    
    autoplayIntervalRef.current = setInterval(() => {
      setActiveProjectIndex((prev) => (prev + 1) % projects.length);
    }, 5000);
    setIsAutoplayPaused(false);
  }, [shouldReduceMotion, projects.length]);

  const resetAutoplay = useCallback(() => {
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    if (autoplayTimeoutRef.current) clearTimeout(autoplayTimeoutRef.current);
    
    setIsAutoplayPaused(true);
    
    // Resume autoplay after 8 seconds of inactivity
    autoplayTimeoutRef.current = setTimeout(() => {
      startAutoplay();
    }, 8000);
  }, [startAutoplay]);

  // Autoplay effect
  useEffect(() => {
    startAutoplay();
    return () => {
      if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
      if (autoplayTimeoutRef.current) clearTimeout(autoplayTimeoutRef.current);
    };
  }, [startAutoplay]);

  // Responsive check
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Hero Slider Autoplay (automatically slide every 5 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 5);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (projects.length <= 1) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setActiveProjectIndex((prev) => (prev - 1 + projects.length) % projects.length);
        resetAutoplay();
      } else if (e.key === "ArrowRight") {
        setActiveProjectIndex((prev) => (prev + 1) % projects.length);
        resetAutoplay();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [resetAutoplay, projects.length]);






  const services = [
    {
      title: "Klima Arıza Servisi",
      desc: "Sakarya genelinde 7/24 mobil acil teknik ekibimizle klima arızalarına aynı gün yerinde müdahale ediyoruz.",
      icon: Wrench,
      href: "/hizmetler/ariza-servis-7-24"
    },
    {
      title: "Klima Periyodik Bakımı",
      desc: "Klimanızın verimini artırmak ve uzun ömürlü çalışmasını sağlamak için filtre temizliği, gaz basınç kontrolü ve genel sistem bakımı.",
      icon: Fan,
      href: "/hizmetler/periyodik-kontrol"
    },
    {
      title: "Klima Montajı & Demontajı",
      desc: "Split, kaset ve VRF/VRV sistemlerinin profesyonel montajı. Doğru konumlama, bakır boru ve elektrik tesisatıyla garantili kurulum.",
      icon: Snowflake,
      href: "/hizmetler/klima-montaj"
    },
    {
      title: "Gaz Dolumu & BTU Analizi",
      desc: "Odanız için doğru BTU değerini belirleyin; gaz kaçağı varsa anında tespit ve R32/R410A gaz dolumu yapılır.",
      icon: Droplets,
      href: "/hizmetler/gaz-dolumu"
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      
      {/* 1. HERO SECTION (Autoplay Slide Deck) */}
      <section ref={containerRef} className="relative h-screen w-full flex items-center overflow-hidden pt-[134px] bg-[#0B1120] text-white -mt-[134px]">
        {/* Organic Blobs for Hero Overlay */}
        <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-[#0EA5E9]/7 blur-[140px] pointer-events-none animate-organic-blob z-10" />
        <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] bg-sky-400/5 blur-[140px] pointer-events-none animate-organic-blob-reverse z-10" />

        {/* Background Crossfading Images */}
        {STAGES.map((stage, idx) => (
          <motion.div
            key={idx}
            className="absolute inset-0 z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: activeIndex === idx ? 1 : 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            <Image
              src={stage.bg}
              alt={stage.label}
              fill
              className="object-cover object-center"
              priority={idx === 0}
              fetchPriority={idx === 0 ? "high" : "auto"}
              sizes="(max-width: 768px) 640px, 100vw"
              unoptimized={true}
            />
            <div className="absolute inset-0 bg-black/60 z-10 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/45 z-10 pointer-events-none" />
          </motion.div>
        ))}

        {/* Main content grid */}
        <div className="max-w-[1600px] mx-auto px-10 w-full relative z-20 py-20 md:py-28">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeIndex}
              className="max-w-4xl mx-auto text-center space-y-6"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <div className="space-y-1">
                <h1 className="block">
                  <span className="block font-semibold uppercase tracking-[0.25em] text-primary text-xs md:text-sm mb-3">
                    {activeIndex === 0 ? "Sakarya Uzman Klima İklimlendirme Servisi" : STAGES[activeIndex].badge}
                  </span>
                  <span className="block font-black tracking-tight leading-[1.0] text-white text-[45px] md:text-[80px] uppercase">
                    {STAGES[activeIndex].title}
                  </span>
                </h1>
                <h2 className="font-light tracking-tight leading-[1.0] text-primary text-[30px] md:text-[60px] uppercase">
                  {STAGES[activeIndex].titleYellow}
                </h2>
              </div>

              <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed font-medium text-base md:text-lg pt-2">
                {STAGES[activeIndex].desc}
              </p>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-6">
                {STAGES[activeIndex].btnHref.startsWith("tel:") ? (
                  <a
                    href={STAGES[activeIndex].btnHref}
                    className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-sm bg-primary text-white font-black uppercase tracking-widest hover:bg-[#0284C7] transition-all duration-300 text-sm hover:translate-y-[-2px] hover:shadow-lg hover:shadow-primary/30 w-full sm:w-auto"
                  >
                    {STAGES[activeIndex].btnText}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                ) : (
                  <Link
                    href={STAGES[activeIndex].btnHref}
                    className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-sm bg-primary text-white font-black uppercase tracking-widest hover:bg-[#0284C7] transition-all duration-300 text-sm hover:translate-y-[-2px] hover:shadow-lg hover:shadow-primary/30 w-full sm:w-auto"
                  >
                    {STAGES[activeIndex].btnText}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                )}
                {activeIndex === 0 && (
                  <a
                    href="#giris"
                    className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-sm bg-white/5 text-white border border-white/20 hover:border-white hover:bg-white/10 font-bold uppercase tracking-widest transition-all duration-300 text-sm hover:translate-y-[-2px] w-full sm:w-auto"
                  >
                    Keşfet
                  </a>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* 1.5 STATS STRIP — Klima sektörüne özgü */}
      <div className="bg-[#0F172A] border-b border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-topo-waves pointer-events-none opacity-80" />
        <div className="max-w-[1600px] mx-auto px-10 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
            {[
              { icon: Wrench,      val: "7/24",    label: "Acil Klima Servisi" },
              { icon: Snowflake,   val: "5.000+",  label: "Klima Servisi Tamamlandı" },
              { icon: Droplets,    val: "R32/R410A",label: "Gaz Stoku Hazır" },
              { icon: Gauge,       val: "A+++",    label: "Enerji Tasarrufu Uzmanı" },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="py-6 px-6 text-center flex flex-col items-center gap-2">
                  <Icon className="w-5 h-5 text-primary/60" />
                  <div className="font-black text-primary text-xl md:text-2xl leading-none">{stat.val}</div>
                  <div className="text-white/40 text-[10px] uppercase tracking-widest font-bold">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. BİZ KİMİZ (About Teaser & Resimli Farkı Yaşayın) */}
      <section id="giris" className="py-24 bg-white relative overflow-hidden">
        {/* Organic Blobs */}
        <div className="absolute top-[15%] right-[-10%] w-[500px] h-[500px] bg-[#0EA5E9]/4 blur-[130px] rounded-full pointer-events-none animate-organic-blob z-0" />
        <div className="absolute bottom-[15%] left-[-10%] w-[500px] h-[500px] bg-[#0EA5E9]/3 blur-[130px] rounded-full pointer-events-none animate-organic-blob-reverse z-0" />
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 items-center">
            
            {/* Left Column: Premium Image with Floating Badges */}
            <motion.div 
              className="lg:col-span-2 relative h-[500px] md:h-[600px] rounded-[32px] overflow-hidden shadow-2xl group border border-slate-100 w-full"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <Image
                src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop"
                alt="Sakarya Uzman Klima Teknik Servis Ekipleri"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                unoptimized={true}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              
              {/* Floating Badge 1 - Tecrübe */}
              <motion.div 
                className="absolute top-6 left-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl flex items-center gap-3 border border-white/20"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <div className="w-12 h-12 rounded-xl bg-[#0EA5E9]/10 flex items-center justify-center">
                  <Timer className="w-6 h-6 text-[#0EA5E9]" />
                </div>
                <div>
                  <div className="text-gray-900 font-black text-lg leading-none">10+ Yıl</div>
                  <div className="text-gray-500 text-[10px] font-bold uppercase tracking-wider mt-1">Sektör Tecrübesi</div>
                </div>
              </motion.div>

              {/* Floating Badge 2 - Müşteri */}
              <motion.div 
                className="absolute bottom-8 right-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl flex items-center gap-3 border border-white/20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <div className="text-gray-900 font-black text-lg leading-none">5.000+</div>
                  <div className="text-gray-500 text-[10px] font-bold uppercase tracking-wider mt-1">Mutlu Müşteri</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column: Clean Professional Text + Feature Grid */}
            <motion.div 
              className="lg:col-span-2 space-y-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <div className="space-y-3">
                <span className="text-[#0EA5E9] font-black uppercase tracking-widest text-xs block">Sakarya'nın Güvenilir Klima Uzmanı</span>
                <h2 className="font-black text-dark-text uppercase tracking-tight leading-none text-3xl md:text-5xl">
                  Sakarya Uzman Klima <br />
                  <span className="text-[#0EA5E9] mt-2 block">İle Farkı Yaşayın</span>
                </h2>
                <div className="w-16 h-1.5 bg-[#0EA5E9] mt-4 rounded-full" />
              </div>

              <div className="space-y-4 text-gray-500 font-medium text-sm md:text-base leading-relaxed">
                <p>
                  Adapazarı merkezimizden tüm Sakarya ilçelerine uzanan geniş servis ağımızla klima montaj, bakım, arıza tamiri ve gaz dolumu hizmetleri sunuyoruz. 10 yılı aşkın sahaya dayanan tecrübemizle çözümsüz arıza bırakmıyoruz.
                </p>
                <p className="font-bold text-dark-text border-l-4 border-[#0EA5E9] pl-4 py-1 italic">
                  En iyi bildiklerimiz; hızlı müdahale, uzman teknik analiz ve garantili işçiliktir.
                </p>
              </div>

              {/* 4 Feature mini grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                {[
                  { icon: Wrench, title: "7/24 Acil Destek", desc: "Acil arızalara anında mobil ekiplerle müdahale." },
                  { icon: ShieldCheck, title: "TSE Standartı", desc: "Tüm süreçler resmi mühendislik standartlarında yürütülür." },
                  { icon: Settings, title: "Orijinal Yedek Parça", desc: "Adapazarı depomuzda tüm markaların parçaları hazır." },
                  { icon: Timer, title: "Hızlı Saha Müdahalesi", desc: "Bildiriminizden sonra aynı gün kapınızdayız." },
                ].map((feat, idx) => {
                  const FeatIcon = feat.icon;
                  return (
                    <div key={idx} className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                        <FeatIcon className="w-5 h-5 text-[#0EA5E9]" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-black text-gray-900 text-xs sm:text-sm uppercase tracking-tight">{feat.title}</h4>
                        <p className="text-gray-500 text-[11px] sm:text-xs font-semibold leading-relaxed">{feat.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 flex gap-4">
                <Link
                  href="/hakkimizda"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-gray-900 hover:bg-gray-800 text-white font-black uppercase text-xs tracking-widest rounded-xl transition-all hover:scale-105 shadow-md shadow-gray-900/10"
                >
                  Kurumsal Bilgimiz
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/iletisim"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-gray-800 font-black uppercase text-xs tracking-widest rounded-xl transition-all hover:scale-105"
                >
                  Teklif İste
                </Link>
              </div>
            </motion.div>

          </div>
        </div>
      </section>




      {/* 3. HİZMETLERİMİZ — Hover-Expanding Accordion Panels */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10">
          {/* Tab Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
            <div>
              <span className="text-[#0EA5E9] font-black uppercase tracking-widest text-xs block mb-2">Hizmetlerimiz</span>
              <h2 className="font-black text-dark-text uppercase tracking-tight leading-none text-3xl md:text-5xl">
                Ne Tür Klima<br />
                <span className="text-[#0EA5E9] mt-2 block">Servisine</span> İhtiyacınız Var?
              </h2>
            </div>
            {/* Segment Tabs */}
            <div className="flex bg-gray-100 rounded-2xl p-1.5 gap-1 shrink-0">
              {([
                { key: "konut", label: "🏠 Konut", desc: "Ev & Daire" },
                { key: "ticari", label: "🏢 Ticari", desc: "İşyeri & Mağaza" },
              ] as const).map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setServiceTab(tab.key)}
                  className={`px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    serviceTab === tab.key
                      ? "bg-white text-[#0EA5E9] shadow-sm"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Konut Hizmetleri */}
          <AnimatePresence mode="wait">
            {serviceTab === "konut" && (
              <motion.div
                key="konut"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                {/* Desktop Version: Hover-Expanding Panels */}
                <div className="hidden lg:flex w-full gap-5 h-[480px]">
                  {[
                    { icon: Wrench, title: "Klima Arıza Tamiri", desc: "Split ve inverter klimaların soğutmama, donma, su sızıntısı gibi tüm arızaları.", href: "/hizmetler/ariza-servis-7-24", tag: "7/24", img: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?q=80&w=800&auto=format&fit=crop" },
                    { icon: Fan, title: "Periyodik Bakım", desc: "Yılda 2 kez filtre temizliği, gaz basınç ölçümü ve genel kontrol.", href: "/hizmetler/periyodik-kontrol", tag: "Önlem", img: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?q=80&w=800&auto=format&fit=crop" },
                    { icon: Snowflake, title: "Klima Montajı", desc: "Yeni alınan klimanın doğru konuma, garantili şekilde montajı.", href: "/hizmetler/klima-montaj", tag: "Kurulum", img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=800&auto=format&fit=crop" },
                    { icon: Droplets, title: "Gaz Dolumu", desc: "R32 / R410A soğutucu gaz dolumu ve kaçak tespiti.", href: "/hizmetler/gaz-dolumu", tag: "Bakım", img: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800&auto=format&fit=crop" },
                  ].map((s, i) => {
                    const Icon = s.icon;
                    const isHovered = hoveredKonut === i;
                    return (
                      <Link
                        key={i}
                        href={s.href}
                        onMouseEnter={() => setHoveredKonut(i)}
                        className={`relative rounded-[32px] overflow-hidden transition-all duration-500 ease-in-out border border-sky-100 flex flex-col justify-end p-8 group ${
                          isHovered ? "flex-[3.5] shadow-xl shadow-sky-500/10" : "flex-[1]"
                        }`}
                      >
                        {/* Background Image */}
                        <Image
                          src={s.img}
                          alt={s.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          unoptimized={true}
                        />
                        {/* Dark Overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-t transition-opacity duration-500 ${
                          isHovered ? "from-black/85 via-black/45 to-transparent" : "from-black/75 via-black/60 to-black/35"
                        }`} />
                        
                        {/* Tag */}
                        <span className="absolute top-6 left-6 text-[9px] font-black uppercase tracking-widest bg-[#0EA5E9] text-white px-2.5 py-1 rounded-full z-20">
                          {s.tag}
                        </span>

                        {/* Content */}
                        <div className="relative z-20 flex flex-col w-full text-white">
                          {/* Icon */}
                          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-4 border border-white/10 shrink-0">
                            <Icon className="w-6 h-6 text-[#0EA5E9]" />
                          </div>
                          
                          {/* Title */}
                          <h3 className="font-black text-white text-base sm:text-lg uppercase tracking-tight whitespace-nowrap mb-1">
                            {s.title}
                          </h3>

                          {/* Description & CTA (Framer-like smooth show/hide) */}
                          <div className={`overflow-hidden transition-all duration-500 ${
                            isHovered ? "max-h-32 opacity-100 mt-2" : "max-h-0 opacity-0"
                          }`}>
                            <p className="text-white/70 text-xs leading-relaxed font-semibold">
                              {s.desc}
                            </p>
                            <div className="mt-4 flex items-center gap-1 text-[#0EA5E9] text-[10px] font-black uppercase tracking-wider">
                              Hizmeti İncele <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>

                {/* Mobile & Tablet Version: Standard Grid Fallback */}
                <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    { icon: Wrench, title: "Klima Arıza Tamiri", desc: "Split ve inverter klimaların soğutmama, donma, su sızıntısı gibi tüm arızaları.", href: "/hizmetler/ariza-servis-7-24", tag: "7/24", img: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?q=80&w=800&auto=format&fit=crop" },
                    { icon: Fan, title: "Periyodik Bakım", desc: "Yılda 2 kez filtre temizliği, gaz basınç ölçümü ve genel kontrol.", href: "/hizmetler/periyodik-kontrol", tag: "Önlem", img: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?q=80&w=800&auto=format&fit=crop" },
                    { icon: Snowflake, title: "Klima Montajı", desc: "Yeni alınan klimanın doğru konuma, garantili şekilde montajı.", href: "/hizmetler/klima-montaj", tag: "Kurulum", img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=800&auto=format&fit=crop" },
                    { icon: Droplets, title: "Gaz Dolumu", desc: "R32 / R410A soğutucu gaz dolumu ve kaçak tespiti.", href: "/hizmetler/gaz-dolumu", tag: "Bakım", img: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800&auto=format&fit=crop" },
                  ].map((s, i) => {
                    const Icon = s.icon;
                    return (
                      <Link key={i} href={s.href}
                        className="group flex flex-col bg-white border border-sky-100 hover:border-sky-300/40 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-sky-500/5 hover:-translate-y-1"
                      >
                        {/* Image */}
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={s.img}
                            alt={s.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, 50vw"
                            unoptimized={true}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                          <span className="absolute top-3 left-3 text-[9px] font-black uppercase tracking-widest bg-[#0EA5E9] text-white px-2.5 py-1 rounded-full">{s.tag}</span>
                        </div>
                        {/* Content */}
                        <div className="p-6 flex flex-col flex-1">
                          <div className="w-10 h-10 rounded-xl bg-[#0EA5E9]/10 flex items-center justify-center mb-4">
                            <Icon className="w-5 h-5 text-[#0EA5E9]" />
                          </div>
                          <h3 className="font-black text-gray-900 text-sm uppercase tracking-tight mb-2 group-hover:text-[#0EA5E9] transition-colors">{s.title}</h3>
                          <p className="text-gray-500 text-xs leading-relaxed font-semibold flex-1">{s.desc}</p>
                          <div className="mt-4 flex items-center gap-1 text-[#0EA5E9] text-[10px] font-black uppercase tracking-wider">
                            Detay <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {serviceTab === "ticari" && (
              <motion.div
                key="ticari"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                {/* Desktop Version: Hover-Expanding Panels */}
                <div className="hidden lg:flex w-full gap-5 h-[480px]">
                  {[
                    { icon: Wind, title: "VRF/VRV Sistemi Servisi", desc: "Çok iç üniteli ticari VRF klima sistemleri bakım ve arıza servisi.", href: "/hizmetler/ariza-servis-7-24", tag: "Ticari", img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=800&auto=format&fit=crop" },
                    { icon: Thermometer, title: "Kaset Klima Servisi", desc: "Mağaza, ofis ve restoranlardaki kaset tipi klimaların bakım ve tamiri.", href: "/hizmetler/periyodik-kontrol", tag: "Ticari", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop" },
                    { icon: Gauge, title: "Enerji Analizi", desc: "A+++ enerji verimliliği analizi; gereksiz enerji tüketimini tespit et.", href: "/hesaplama-araclari", tag: "Tasarruf", img: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=800&auto=format&fit=crop" },
                    { icon: ShieldCheck, title: "Bakım Sözleşmesi", desc: "Yıllık bakım kontratıyla işyerinizin klimaları sürekli kontrol altında.", href: "/iletisim", tag: "Anlaşma", img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop" },
                  ].map((s, i) => {
                    const Icon = s.icon;
                    const isHovered = hoveredTicari === i;
                    return (
                      <Link
                        key={i}
                        href={s.href}
                        onMouseEnter={() => setHoveredTicari(i)}
                        className={`relative rounded-[32px] overflow-hidden transition-all duration-500 ease-in-out border border-orange-100 flex flex-col justify-end p-8 group ${
                          isHovered ? "flex-[3.5] shadow-xl shadow-orange-500/10" : "flex-[1]"
                        }`}
                      >
                        {/* Background Image */}
                        <Image
                          src={s.img}
                          alt={s.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          unoptimized={true}
                        />
                        {/* Dark Overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-t transition-opacity duration-500 ${
                          isHovered ? "from-black/85 via-black/45 to-transparent" : "from-black/75 via-black/60 to-black/35"
                        }`} />
                        
                        {/* Tag */}
                        <span className="absolute top-6 left-6 text-[9px] font-black uppercase tracking-widest bg-orange-500 text-white px-2.5 py-1 rounded-full z-20">
                          {s.tag}
                        </span>

                        {/* Content */}
                        <div className="relative z-20 flex flex-col w-full text-white">
                          {/* Icon */}
                          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-4 border border-white/10 shrink-0">
                            <Icon className="w-6 h-6 text-orange-500" />
                          </div>
                          
                          {/* Title */}
                          <h3 className="font-black text-white text-base sm:text-lg uppercase tracking-tight whitespace-nowrap mb-1">
                            {s.title}
                          </h3>

                          {/* Description & CTA */}
                          <div className={`overflow-hidden transition-all duration-500 ${
                            isHovered ? "max-h-32 opacity-100 mt-2" : "max-h-0 opacity-0"
                          }`}>
                            <p className="text-white/70 text-xs leading-relaxed font-semibold">
                              {s.desc}
                            </p>
                            <div className="mt-4 flex items-center gap-1 text-orange-500 text-[10px] font-black uppercase tracking-wider">
                              Hizmeti İncele <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>

                {/* Mobile & Tablet Version: Standard Grid Fallback */}
                <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    { icon: Wind, title: "VRF/VRV Sistemi Servisi", desc: "Çok iç üniteli ticari VRF klima sistemleri bakım ve arıza servisi.", href: "/hizmetler/ariza-servis-7-24", tag: "Ticari", img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=800&auto=format&fit=crop" },
                    { icon: Thermometer, title: "Kaset Klima Servisi", desc: "Mağaza, ofis ve restoranlardaki kaset tipi klimaların bakım ve tamiri.", href: "/hizmetler/periyodik-kontrol", tag: "Ticari", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop" },
                    { icon: Gauge, title: "Enerji Analizi", desc: "A+++ enerji verimliliği analizi; gereksiz enerji tüketimini tespit et.", href: "/hesaplama-araclari", tag: "Tasarruf", img: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=800&auto=format&fit=crop" },
                    { icon: ShieldCheck, title: "Bakım Sözleşmesi", desc: "Yıllık bakım kontratıyla işyerinizin klimaları sürekli kontrol altında.", href: "/iletisim", tag: "Anlaşma", img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop" },
                  ].map((s, i) => {
                    const Icon = s.icon;
                    return (
                      <Link key={i} href={s.href}
                        className="group flex flex-col bg-white border border-orange-100 hover:border-orange-300/40 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/5 hover:-translate-y-1"
                      >
                        {/* Image */}
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={s.img}
                            alt={s.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, 50vw"
                            unoptimized={true}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                          <span className="absolute top-3 left-3 text-[9px] font-black uppercase tracking-widest bg-orange-500 text-white px-2.5 py-1 rounded-full">{s.tag}</span>
                        </div>
                        {/* Content */}
                        <div className="p-6 flex flex-col flex-1">
                          <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center mb-4">
                            <Icon className="w-5 h-5 text-orange-500" />
                          </div>
                          <h3 className="font-black text-gray-900 text-sm uppercase tracking-tight mb-2 group-hover:text-orange-500 transition-colors">{s.title}</h3>
                          <p className="text-gray-500 text-xs leading-relaxed font-semibold flex-1">{s.desc}</p>
                          <div className="mt-4 flex items-center gap-1 text-orange-500 text-[10px] font-black uppercase tracking-wider">
                            Detay <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>


      {/* 🚀 ACİL KLİMA SERVİSİ (Parallax Banner) */}
      <section className="relative h-[480px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1600&auto=format&fit=crop')",
            backgroundAttachment: "fixed"
          }}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-[#0F172A]/80 z-10" />
        
        {/* Content */}
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 relative z-20 text-center space-y-6">
          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#0EA5E9] font-black text-xs tracking-widest uppercase">
            ⚡ HIZLI MÜDAHALE
          </span>
          <h2 className="text-white font-black uppercase tracking-tight text-3xl md:text-6xl leading-none">
            Acil Klima Servisi <br />
            <span className="text-[#0EA5E9] mt-2 block">Aynı Gün Servis İmkanı</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto font-medium text-xs md:text-base leading-relaxed">
            Klimanız mı bozuldu? Sakarya genelindeki yaygın mobil araç filomuzla en kısa sürede adresinizdeyiz. Profesyonel sertifikalı kadromuzla aynı gün kesin çözüm sunuyoruz.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <a
              href="tel:08503085454"
              className="flex items-center gap-2.5 px-8 py-4 bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all hover:scale-105 shadow-xl shadow-sky-500/30"
            >
              <PhoneCall className="w-4 h-4 animate-bounce" />
              Hemen Arayın: 0850 308 54 54
            </a>
            <a
              href="https://wa.me/905321234567"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all hover:scale-105 shadow-xl shadow-emerald-600/30"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-4 h-4" viewBox="0 0 16 16">
                <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.949h.004c4.368 0 7.926-3.558 7.93-7.93a7.9 7.9 0 0 0-2.327-5.592M7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.69-4.98c-.202-.1-1.195-.59-1.378-.657-.183-.067-.317-.1-.449.1-.132.2-.511.657-.626.78-.115.123-.23.138-.432.037-2.006-.897-3.27-2.007-4.153-3.524-.25-.43-.014-.663.22-.897.209-.208.432-.51.48-.684.048-.174.024-.326-.012-.426-.036-.1-.317-.765-.434-1.048-.115-.279-.23-.24-.317-.245-.083-.004-.178-.005-.272-.005a.52.52 0 0 0-.377.177C4.09 5.251 3.5 5.86 3.5 7.1c0 1.24.9 2.435 1.024 2.6 1.24 1.638 2.82 2.63 5.43 3.593.62.23 1.1.37 1.48.49.62.2 1.18.17 1.62.1.49-.07 1.4-.57 1.6-1.13.2-.56.2-1.04.14-1.13-.06-.1-.2-.17-.4-.27"/>
              </svg>
              WhatsApp Destek
            </a>
          </div>
        </div>
      </section>

      {/* Klima Markaları (Partnerler) */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10">
          <div className="text-center mb-8">
            <span className="font-black text-amber-700 tracking-widest uppercase block mb-1 text-[11px]">{partnersData.subtitle}</span>
            <h2 className="font-black uppercase text-dark-text tracking-tight text-xl md:text-2xl">{partnersData.title}</h2>
            <div className="w-10 h-1 bg-primary mx-auto mt-3" />
          </div>
          <LogoCarousel partners={partnersData.list} />
        </div>
      </section>

      {/* Müşteri Yorumları Bölümü — Çapraz Kesimli İki Kolonlu Premium Layout */}
      <section className="relative overflow-hidden bg-[#0F1923] border-t border-b border-white/5 w-full">
        <div className="absolute inset-0 bg-topo-waves pointer-events-none opacity-80 z-0" />
        {/* Organic Blobs matching Son Teknik Yazılar */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#0EA5E9]/6 blur-[130px] rounded-full pointer-events-none animate-organic-blob z-0" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#0EA5E9]/4 blur-[130px] rounded-full pointer-events-none animate-organic-blob-reverse z-0" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[550px] w-full relative z-10">
            
            {/* SOL KOLON: Çapraz Kesimli Görsel (5 kolon) */}
            <div className="lg:col-span-5 relative min-h-[350px] lg:min-h-full overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop"
                alt="Sakarya Uzman Klima Müşteri Deneyimi"
                fill
                className="object-cover"
                unoptimized={true}
              />
              {/* Diagonal clip path overlay */}
              <div 
                className="absolute inset-y-0 right-0 w-32 bg-[#0F1923] hidden lg:block"
                style={{
                  clipPath: "polygon(100% 0, 0 0, 100% 100%)",
                  transform: "translateX(1px)" // prevent tiny sub-pixel render gap
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1923]/80 via-transparent to-transparent lg:hidden" />
            </div>

            {/* SAĞ KOLON: Koyu Lacivert Panel (7 kolon) */}
            <div className="lg:col-span-7 p-8 sm:p-12 md:p-16 flex flex-col justify-between relative overflow-hidden bg-[#0F1923]">
              
              {/* DEKORATİF ŞEKİLLER */}
              {/* 1. Noktalı desen (Dot Pattern) */}
              <div className="absolute inset-0 opacity-[0.06] pointer-events-none z-0"
                style={{
                  backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.15) 1.5px, transparent 1.5px)",
                  backgroundSize: "20px 20px"
                }}
              />
              {/* 2. Yumuşak daire gradyanı (Radial Glow) */}
              <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-[#0EA5E9]/8 blur-[90px] rounded-full pointer-events-none z-0" />
              {/* 3. Çapraz açık mavi gradient şerit */}
              <div 
                className="absolute top-[-50%] left-[-20%] w-[150%] h-[200%] pointer-events-none z-0 opacity-15"
                style={{
                  background: "linear-gradient(135deg, transparent 40%, rgba(14, 165, 233, 0.15) 45%, rgba(14, 165, 233, 0.3) 50%, rgba(14, 165, 233, 0.15) 55%, transparent 60%)",
                  transform: "rotate(-10deg)"
                }}
              />

              {/* İÇERİK YAPISI */}
              <div className="relative z-10 space-y-8">
                <div className="space-y-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#0EA5E9] font-black text-[10px] tracking-widest uppercase">
                    <MessageSquare className="w-3.5 h-3.5 text-[#0EA5E9]" />
                    Müşteri Deneyimi
                  </span>
                  <h3 className="text-2xl sm:text-3.5xl font-black text-white uppercase tracking-tight leading-tight">
                    Müşterilerimizin Gözünden <br />
                    <span className="text-[#0EA5E9] mt-2 block">Sakarya Uzman Klima Güvencesi</span>
                  </h3>
                </div>

                {/* Yorum Alanı */}
                <div className="min-h-[160px] flex items-center">
                  <AnimatePresence mode="wait">
                    {testimonials.length > 0 && (
                      <motion.div
                        key={activeTestimonial}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.35, ease: EASE }}
                        className="space-y-5"
                      >
                        <div className="flex gap-1 text-[#0EA5E9]">
                          {[...Array(testimonials[activeTestimonial].rating || 5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-current text-amber-400 stroke-amber-400" />
                          ))}
                        </div>
                        <p className="text-gray-300 font-semibold italic text-sm sm:text-base leading-relaxed">
                          &ldquo;{testimonials[activeTestimonial].quote}&rdquo;
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Alt Bilgiler ve Kontroller */}
              <div className="relative z-10 pt-8 border-t border-white/10 mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                {testimonials.length > 0 && (
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-2xl overflow-hidden bg-white/5 border border-white/10 shrink-0">
                      <img
                        src={testimonials[activeTestimonial].avatar}
                        alt={testimonials[activeTestimonial].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-black text-white text-sm uppercase tracking-tight leading-none">
                        {testimonials[activeTestimonial].name}
                      </h4>
                      <span className="text-gray-400 text-[10px] sm:text-xs font-black uppercase tracking-wider block mt-1">
                        {testimonials[activeTestimonial].role} / <span className="text-[#0EA5E9]">{testimonials[activeTestimonial].company.split(" / ")[0]}</span>
                      </span>
                    </div>
                  </div>
                )}

                {/* Slider Kontrolleri */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/15 hover:border-[#0EA5E9] transition-all flex items-center justify-center cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setActiveTestimonial((prev) => (prev + 1) % testimonials.length)}
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/15 hover:border-[#0EA5E9] transition-all flex items-center justify-center cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  
                  <Link
                    href="/musteri-yorumlari"
                    className="ml-2 inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-black uppercase text-[10px] tracking-wider rounded-xl transition-all shadow-lg shadow-sky-500/10 cursor-pointer"
                  >
                    Tümü
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

            </div>

          </div>
        </section>


      {/* 7. BİLGİ MERKEZİ — Blog Önizleme */}
      <InfoCenterSection />





      {/* 9+10. BELGELER — tek bölüm */}
      <section className="py-20 bg-white border-t border-gray-100" id="belgeler">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10">
          {/* Belgeler */}
          <div className="text-center mb-12">
            <span className="font-black text-amber-700 tracking-widest uppercase block mb-2 text-xs">Resmi Sertifikalarımız</span>
            <h2 className="font-black uppercase text-dark-text tracking-tight text-2xl md:text-4xl">
              Kalite ve Hizmet Yeterlilik Belgelerimiz
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto mt-5" />
            <p className="text-gray-600 mt-4 max-w-xl mx-auto font-medium text-sm md:text-base leading-relaxed">
              Tüm hizmetlerimiz TSE ve uluslararası ISO kalite standartlarına uygun olarak belgelendirilmiştir.
            </p>
          </div>
        </div>
        <CertificatesCarousel />
      </section>

      {/* 🧩 SIKÇA SORULAN SORULAR (FAQ) */}
      <section className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          {/* Section Header */}
          <div className="text-center mb-16 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-50 border border-gray-200 text-[#0EA5E9] font-black text-xs tracking-widest uppercase">
              <HelpCircle className="w-4 h-4 animate-bounce" />
              Sıkça Sorulan Sorular
            </span>
            <h2 className="font-black uppercase text-dark-text tracking-tight text-3xl md:text-5xl leading-none">
              Klima Servisi <br />
              <span className="text-[#0EA5E9] mt-2 block">Hakkında Merak Edilenler</span>
            </h2>
            <div className="w-20 h-1.5 bg-[#0EA5E9] mx-auto mt-5" />
          </div>

          {/* Accordion List */}
          <div className="max-w-3xl mx-auto space-y-4">
            {FAQ_ITEMS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className={`bg-white border transition-all duration-300 rounded-[24px] overflow-hidden ${
                    isOpen ? "border-[#0EA5E9] shadow-md shadow-sky-500/5" : "border-gray-150 hover:border-gray-200"
                  }`}
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left font-extrabold text-gray-900 hover:text-[#0EA5E9] transition-colors cursor-pointer select-none outline-none"
                  >
                    <span className="text-base sm:text-lg leading-snug pr-4 uppercase tracking-tight">{faq.question}</span>
                    <div className={`p-2 rounded-xl bg-gray-50 border border-gray-100 shrink-0 transition-all duration-300 ${isOpen ? "bg-[#0EA5E9]/10 border-[#0EA5E9]/20" : ""}`}>
                      <ChevronDown
                        className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${
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
                    <div className="px-6 pb-6 text-gray-500 text-sm sm:text-base leading-relaxed border-t border-gray-100 pt-4 font-semibold">
                      {faq.answer}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>



      {/* 8. PROJECT DETAIL LIGHTBOX MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded max-w-2xl w-full p-6 md:p-8 relative shadow-2xl my-8">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 text-[#1A1A1A] hover:text-primary p-1.5 rounded-sm hover:border-primary/20 transition-colors cursor-pointer"
              aria-label="Kapat"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="mb-6">
              <span className="font-black text-primary tracking-widest uppercase block mb-1 text-[11px] md:text-xs">
                {selectedProject.categoryLabel}
              </span>
              <h3 className="font-black text-dark-text uppercase tracking-tight leading-tight text-xl">
                {selectedProject.title}
              </h3>
              <div className="flex items-center gap-1.5 text-gray-400 font-bold mt-2 text-sm md:text-base">
                <span>{selectedProject.location}</span>
                <span>•</span>
                <span>{selectedProject.year}</span>
              </div>
            </div>

            {/* Modal Content */}
            <div className="space-y-6">
              <div className="relative aspect-video rounded-sm overflow-hidden bg-gray-100">
                <Image
                  src={selectedProject.img}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              </div>

              <div>
                <div className="font-black uppercase text-gray-700 tracking-wider mb-2 text-sm md:text-base">Proje Özeti & Kapsamı</div>
                <p className="text-gray-500 leading-relaxed font-semibold bg-gray-50 p-4 rounded text-sm md:text-base">
                  {selectedProject.details || "Bu projede Sakarya Uzman Klima Servisi en yüksek kalite standartlarında klima montajı, bakım ve iklimlendirme hizmetleri sağlamıştır."}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="mt-8 pt-6 flex justify-end">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-5 py-2.5 rounded bg-primary text-black hover:bg-primary-dark font-bold uppercase tracking-wider transition-colors cursor-pointer text-sm md:text-base"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
