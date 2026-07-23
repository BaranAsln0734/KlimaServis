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
import UrgencyCountdownBanner from "@/components/UrgencyCountdownBanner";
import TroubleshootingWizard from "@/components/TroubleshootingWizard";

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

      <div className="marquee-container gap-6" suppressHydrationWarning={true}>
        {duplicatedPartners.map((partner, index) => (
          <div 
            key={index}
            className="flex items-center gap-4 px-6 py-4 bg-white border border-gray-150 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-lg hover:border-[#0EA5E9]/30 transition-all duration-300 shrink-0 hover:scale-105"
            suppressHydrationWarning={true}
          >
            <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center p-2 shrink-0">
              <img 
                src={partner.logo} 
                alt={partner.name} 
                className="w-full h-full object-contain" 
                loading="lazy" 
                suppressHydrationWarning={true}
              />
            </div>
            <span className="font-black text-gray-900 text-sm tracking-tight uppercase whitespace-nowrap">
              {partner.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CertificatesCarousel() {
  const certs = [
    {
      title: "MYK Belgesi",
      desc: "Mesleki Yeterlilik Kurumu Sertifikalı Uzman Ekipler",
      code: "MYK-HYB",
      colorClass: "border-blue-100 hover:border-blue-300 bg-blue-50/10",
      svg: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 text-blue-800">
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="6" />
          <path d="M 32 52 L 45 65 L 68 38" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
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

function AnimatedCounter({ 
  targetValue, 
  prefix = "", 
  suffix = "" 
}: { 
  targetValue: number; 
  prefix?: string; 
  suffix?: string; 
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2200;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            const currentCount = Math.floor(easeProgress * targetValue);
            setCount(currentCount);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(targetValue);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [targetValue, hasAnimated]);

  return (
    <div ref={ref} className="font-black text-[#0EA5E9] text-xl md:text-2xl leading-none">
      {prefix}
      {count.toLocaleString("tr-TR")}
      {suffix}
    </div>
  );
}

// ─── Blog-based "Bilgi Merkezi" preview for homepage ────────────────────────
const STATIC_BLOG_POSTS: BlogPostPreview[] = [
  {
    slug: "klima-bakimi-ne-zaman-yapilir",
    title: "Klima Bakımı Ne Zaman Yapılır? Mevsimlik Bakım Rehberi",
    desc: "Klimanızın verimli çalışması ve sağlığınız için yılda en az iki kez ilaçlı bakım yaptırmanız gerekir. Filtre temizliği ve hijyen adımları.",
    category: "Bakım & Servis",
    readTime: "7 Dk Okuma",
    date: "18 Temmuz 2026",
    img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "kombi-bakimi-ve-petek-temizligi",
    title: "Kombi Bakımı ve Petek Temizliği Nasıl Yapılır?",
    desc: "Doğalgaz faturanız yüksek geliyorsa peteklerde çamurlaşma olabilir. Kombi bakımı ve petek temizliği ile %25'e varan yakıt tasarrufu.",
    category: "Kombi & Isıtma",
    readTime: "8 Dk Okuma",
    date: "15 Temmuz 2026",
    img: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "camasir-makinesi-sikma-yapmiyor-neden",
    title: "Çamaşır Makinesi Sıkma Yapmıyor ve Su Boşaltmıyor",
    desc: "Çamaşır makineniz suyu tahliye etmiyor veya kazan dönmüyorsa pompa filtresi tıkanıklığı veya kayış kopması olabilir. Adım adım çözüm.",
    category: "Beyaz Eşya",
    readTime: "6 Dk Okuma",
    date: "10 Temmuz 2026",
    img: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=800&q=80",
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
        if (Array.isArray(data) && data.length > 0) {
          const nowStr = new Date().toISOString().split('T')[0];
          const activeData = data.filter(p => !p.date || p.date <= nowStr);

          const formatted: BlogPostPreview[] = activeData.map((p) => ({
            slug: p.slug,
            title: p.title,
            desc: p.excerpt ?? "",
            category: p.category ?? "Genel",
            readTime: "5 Dk Okuma",
            date: typeof p.date === "string" ? p.date.split("-").reverse().join(" / ") : "",
            img: p.imageUrl && p.imageUrl.startsWith("http") ? p.imageUrl : "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80"
          }));
          setPosts(formatted);
        }
      })
      .catch((err) => {
        console.error("Error loading posts:", err);
        setPosts(STATIC_BLOG_POSTS);
      });
  }, []);

  const visiblePosts = useMemo(() => {
    if (!posts || posts.length === 0) return STATIC_BLOG_POSTS;
    return posts.slice(0, 3);
  }, [posts]);

  const categoryColors: Record<string, string> = {
    "Bakım & Servis": "bg-blue-50 text-blue-600 border border-blue-100",
    "Kombi & Isıtma": "bg-amber-50 text-amber-600 border border-amber-100",
    "Beyaz Eşya": "bg-emerald-50 text-emerald-600 border border-emerald-100",
    "Arıza & Tanı": "bg-red-50 text-red-600 border border-red-100",
    "Montaj & Kurulum": "bg-purple-50 text-purple-600 border border-purple-100",
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
      title: "Çamaşır Makinesi Arıza Servisi",
      subtitle: "Motor, Kazan & Pompa Tamiri",
      tag: "Çamaşır",
      href: "/hizmetler/camasir-makinesi-ariza-servisi",
      img: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?q=80&w=900&auto=format&fit=crop",
      desc: "Çamaşır makineniz su almıyor, sıkma yapmıyor, sesli çalışıyor veya su sızdırıyorsa uzman teknik ekibimiz orijinal yedek parça garantisiyle aynı gün yerinde tamir hizmeti sunar.",
      items: ["Kazan & Motor Tamiri", "Pompa & Kart Onarımı", "1 Yıl Parça Garantisi"]
    },
    {
      title: "Bulaşık Makinesi Arıza Servisi",
      subtitle: "Hijyenik & Lekesiz Yıkama",
      tag: "Bulaşık",
      href: "/hizmetler/bulasik-makinesi-ariza-servisi",
      img: "https://images.unsplash.com/photo-1585837575652-267c041d77d4?q=80&w=900&auto=format&fit=crop",
      desc: "Bulaşık makineniz iyi yıkamıyor, lekeli bırakıyor, su ısıtmıyor veya kurutma yapmıyorsa 7/24 mobil teknik servisimizle sorunsuz çözümler sağlıyoruz.",
      items: ["Sirkülasyon Pompası Tamiri", "Rezistans & NTC Değişimi", "Fıskiye & Kart Bakımı"]
    },
    {
      title: "Buzdolabı Arıza Servisi",
      subtitle: "Kompresör & Defrost Tamiri",
      tag: "Buzdolabı",
      href: "/hizmetler/buzdolabi-ariza-servisi",
      img: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?q=80&w=900&auto=format&fit=crop",
      desc: "Buzdolabınız soğutmuyor, buzlanma yapıyor, motoru sürekli çalışıyor veya gaz kaçağı varsa gıdalarınız bozulmadan acil mobil ekibimiz adresi ziyaret eder.",
      items: ["Kompresör (Motor) Değişimi", "No-Frost Defrost Tamiri", "R600a/R134a Gaz Şarjı"]
    },
    {
      title: "Kombi Arıza Servisi",
      subtitle: "Ateşleme, Kart & Pompa Servisi",
      tag: "Kombi",
      href: "/hizmetler/kombi-ariza-servisi",
      img: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=900&auto=format&fit=crop",
      desc: "Kombiniz sıcak su vermiyor, petekleri ısıtmıyor, basınç düşürüyor veya ateşleme yapmıyorsa sertifikalı kombi teknisyenlerimizle 7/24 güvenli servis sunuyoruz.",
      items: ["Anakart & İyonizasyon Tamiri", "Üç Yollu Vana & Pompa", "Petek Temizliği & Bakım"]
    },
    {
      title: "Klima Arızası Servisi",
      subtitle: "7/24 Acil İklimlendirme Destek",
      tag: "Klima",
      href: "/hizmetler/klima-arizasi-servisi",
      img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=900&auto=format&fit=crop",
      desc: "Sakarya genelinde klimanız soğutmuyor, ısıtmıyor, su akıtıyor veya sesli çalışıyorsa 7/24 tam donanımlı mobil araçlarımızla yerinde arıza tespiti ve tamir hizmeti sağlıyoruz.",
      items: ["Inverter Kart & Kompresör", "R32/R410A Gaz Dolumu", "30 Dk Acil Mobil Servis"]
    },
    {
      title: "Küçük Ev Aletleri Arıza Servisi",
      subtitle: "Süpürge, Kahve Makinesi & Ütü",
      tag: "Ev Aletleri",
      href: "/hizmetler/kucuk-ev-aletleri-ariza-servisi",
      img: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?q=80&w=900&auto=format&fit=crop",
      desc: "Süpürge, mikser, kahve makinesi, ütü, robot süpürge ve diğer küçük ev aletlerinizdeki motor, kablo ve rezistans arızalarını garantili şekilde onarıyoruz.",
      items: ["Süpürge Motoru & Filtre", "Kahve Makinesi Rezistansı", "Robot Süpürge Batarya"]
    },
    {
      title: "Kurutma Makinesi Arıza Servisi",
      subtitle: "Isı Pompası & Kayış Tamiri",
      tag: "Kurutma",
      href: "/hizmetler/kurutma-makinesi-ariza-servisi",
      img: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?q=80&w=900&auto=format&fit=crop",
      desc: "Kurutma makineniz çamaşırları nemli bırakıyor, ısıtmıyor, koku yapıyor veya kayış koparmışsa ısı pompalı ve yoğuşmalı tüm modellerde uzman servis sağlıyoruz.",
      items: ["Isı Pompası & Gaz Şarjı", "Kazan Kayışı & Kasnak", "Kondanser & Sensör Bakımı"]
    }
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
    label: "Klima Servisi",
    badge: "Sakarya Uzman Klima · İklimlendirme Servisi",
    title: "Klima",
    titleYellow: "Arıza & Bakım",
    desc: "Inverter split, kaset ve VRF klima arızalarında 7/24 mobil araçlarımızla profesyonel müdahale, R32/R410A gaz dolumu ve ilaçlı periyodik bakım.",
    bg: "/images/hero_klima.jpg",
    btnText: "Klima Hizmeti",
    btnHref: "/hizmetler/klima-arizasi-servisi"
  },
  {
    index: 1,
    label: "Çamaşır Makinesi",
    badge: "Garantili Adreste Tamir",
    title: "Çamaşır Makinesi",
    titleYellow: "Arıza Servisi",
    desc: "Çamaşır makineniz sıkmada gürültü mü yapıyor, su mu boşaltmıyor veya tambur dönmüyor mu? Sakarya genelinde orijinal parça ve 1 yıl garantiyle aynı gün hizmet.",
    bg: "/images/hero_camasir.jpg",
    btnText: "Çamaşır Makinesi Servisi",
    btnHref: "/hizmetler/camasir-makinesi-ariza-servisi"
  },
  {
    index: 2,
    label: "Bulaşık Makinesi",
    badge: "Lekesiz Temizlik & Uzman Onarım",
    title: "Bulaşık Makinesi",
    titleYellow: "Arıza Servisi",
    desc: "Bulaşık makineniz su ısıtmıyor, deterjanı eritmiyor, iyi yıkamıyor veya su mu akıtıyor? Sirkülasyon pompası ve anakart tamirinde yerinde çözüm.",
    bg: "/images/hero_bulasik.jpg",
    btnText: "Bulaşık Makinesi Servisi",
    btnHref: "/hizmetler/bulasik-makinesi-ariza-servisi"
  },
  {
    index: 3,
    label: "Buzdolabı Servisi",
    badge: "30 Dk Acil Mobil Müdahale",
    title: "Buzdolabı",
    titleYellow: "Arıza Servisi",
    desc: "Buzdolabınız soğutmuyor, buzlanma yapıyor veya motoru durmuyor mu? Gıdalarınız bozulmadan 30 dakikada nöbetçi mobil ekibimiz adrese ulaşır.",
    bg: "/images/hero_buzdolabi.jpg",
    btnText: "Buzdolabı Servisi",
    btnHref: "/hizmetler/buzdolabi-ariza-servisi"
  },
  {
    index: 4,
    label: "Kombi Servisi",
    badge: "7/24 Kesintisiz Isınma Güvencesi",
    title: "Kombi",
    titleYellow: "Arıza & Bakım",
    desc: "Kombiniz sıcak su vermiyor, petekleri ısıtmıyor, basınç düşürüyor veya ateşleme yapmıyorsa sertifikalı kombi teknisyenlerimizle anında yerinde servis.",
    bg: "/images/hero_kombi.jpg",
    btnText: "Kombi Servisi",
    btnHref: "/hizmetler/kombi-ariza-servisi"
  },
  {
    index: 5,
    label: "Kurutma Makinesi",
    badge: "Isı Pompası & Kazan Kayışı",
    title: "Kurutma Makinesi",
    titleYellow: "Arıza Servisi",
    desc: "Kurutma makineniz nemli bırakıyor, koku yapıyor veya tambur dönmüyorsa ısı pompalı ve yoğuşmalı tüm markalarda garantili tamir.",
    bg: "/images/hero_kurutma.jpg",
    btnText: "Kurutma Makinesi Servisi",
    btnHref: "/hizmetler/kurutma-makinesi-ariza-servisi"
  },
  {
    index: 6,
    label: "Ev Aletleri Servisi",
    badge: "Süpürge, Ütü & Kahve Makinesi",
    title: "Küçük Ev Aletleri",
    titleYellow: "Tamir Servisi",
    desc: "Süpürge motoru, robot süpürge bataryası, ütü ve kahve makinesi arızalarında orijinal yedek parça garantisiyle ekonomik ve hızlı onarım.",
    bg: "/images/hero_evaletleri.jpg",
    btnText: "Ev Aletleri Servisi",
    btnHref: "/hizmetler/kucuk-ev-aletleri-ariza-servisi"
  }
];


const FAQ_ITEMS = [
  {
    question: "Klima ve kombi bakımı ne sıklıkla yapılmalıdır?",
    answer: "Yüksek enerji verimliliği ve cihaz ömrü için klimaların yılda en az 2 kez (yaz ve kış öncesi), kombilerin ise yılda 1 kez periyodik bakımdan geçmesi önerilir."
  },
  {
    question: "Çamaşır ve bulaşık makinesi arızalarında aynı gün servis veriyor musunuz?",
    answer: "Evet, Adapazarı merkez depomuz ve Sakarya'nın 16 ilçesinde devrede olan mobil araçlarımız sayesinde arıza bildiriminizden sonra aynı gün adresinizde oluyoruz."
  },
  {
    question: "Buzdolabı soğutmama ve ses yapma arızaları yerinde tamir edilebilir mi?",
    answer: "Kompresör, gaz kaçağı, sensör ve kart arızalarının %90'dan fazlası donanımlı mobil servis araçlarımız sayesinde adreste aynı gün garantili olarak tamir edilir."
  },
  {
    question: "Yapılan arıza tamiri ve yedek parça değişimleri garantili mi?",
    answer: "Evet, firmamız tarafından gerçekleştirilen tüm Klima, Kombi ve Beyaz Eşya arıza onarımları ile orijinal parça değişimleri 1 Yıl İşçilik ve Parça Garantisi altındadır."
  },
  {
    question: "Kombide basınç düşmesi veya peteklerin ısınmaması neden olur?",
    answer: "Tesisattaki su sızıntıları, genleşme tankı havasının eksilmesi veya sirkülasyon pompası tıkanıklıkları ısınma sorununa yol açar. Ekibimiz dijital cihazlarla sorunu adreste çözer."
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
  const [serviceTab, setServiceTab] = useState<"beyaz-esya" | "klima-kombi">("beyaz-esya");

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
      setActiveIndex((prev) => (prev + 1) % STAGES.length);
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
      
      {/* 1. HERO SECTION (Autoplay Slide Deck - STRICT FULL SCREEN 100VH) */}
      <section ref={containerRef} className="relative h-[100vh] min-h-[100vh] max-h-[100vh] w-full flex flex-col justify-between items-center overflow-hidden bg-[#0B1120] text-white pt-24 pb-6 z-20">
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
            <div className="absolute inset-0 bg-black/65 z-10 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-black/60 z-10 pointer-events-none" />
          </motion.div>
        ))}

        {/* Top Spacer for Header Alignment */}
        <div className="w-full shrink-0 h-4" />

        {/* Main content grid */}
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 w-full relative z-20 my-auto">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeIndex}
              className="max-w-4xl mx-auto text-center space-y-3 sm:space-y-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <div className="space-y-1">
                <h1 className="block">
                  <span className="block font-semibold uppercase tracking-[0.25em] text-[#0EA5E9] text-xs md:text-sm mb-2">
                    {activeIndex === 0 ? "Sakarya Beyaz Eşya Kombi Klima Servisi" : STAGES[activeIndex].badge}
                  </span>
                  <span className="block font-black tracking-tight leading-[1.0] text-white text-[32px] sm:text-[46px] md:text-[68px] uppercase">
                    {STAGES[activeIndex].title}
                  </span>
                </h1>
                <h2 className="font-light tracking-tight leading-[1.0] text-[#0EA5E9] text-[22px] sm:text-[34px] md:text-[48px] uppercase">
                  {STAGES[activeIndex].titleYellow}
                </h2>
              </div>

              <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed font-medium text-xs sm:text-sm md:text-base pt-1">
                {STAGES[activeIndex].desc}
              </p>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-3 pt-3">
                {STAGES[activeIndex].btnHref.startsWith("tel:") ? (
                  <a
                    href={STAGES[activeIndex].btnHref}
                    className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-[#0EA5E9] text-white font-black uppercase tracking-widest hover:bg-[#0284C7] transition-all duration-300 text-xs sm:text-sm hover:translate-y-[-2px] hover:shadow-lg hover:shadow-sky-500/30 w-full sm:w-auto"
                  >
                    {STAGES[activeIndex].btnText}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                ) : (
                  <Link
                    href={STAGES[activeIndex].btnHref}
                    className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-[#0EA5E9] text-white font-black uppercase tracking-widest hover:bg-[#0284C7] transition-all duration-300 text-xs sm:text-sm hover:translate-y-[-2px] hover:shadow-lg hover:shadow-sky-500/30 w-full sm:w-auto"
                  >
                    {STAGES[activeIndex].btnText}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                )}
                {activeIndex === 0 && (
                  <a
                    href="#hizmetler"
                    className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-white/10 text-white border border-white/20 hover:border-white hover:bg-white/20 font-bold uppercase tracking-widest transition-all duration-300 text-xs sm:text-sm hover:translate-y-[-2px] w-full sm:w-auto backdrop-blur-md"
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
              { icon: Wrench,      val: <AnimatedCounter targetValue={7} suffix="/24" />, label: "Acil Mobil Teknik Servis" },
              { icon: ShieldCheck, val: <AnimatedCounter targetValue={5000} suffix="+" />, label: "Başarılı Servis & Onarım" },
              { icon: Settings,    val: <AnimatedCounter targetValue={100} prefix="%" />, label: "Orijinal Yedek Parça" },
              { icon: Timer,       val: <AnimatedCounter targetValue={1} suffix=" Yıl" />, label: "Parça & İşçilik Garantisi" },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="py-6 px-6 text-center flex flex-col items-center gap-2">
                  <Icon className="w-5 h-5 text-[#0EA5E9]/70" />
                  {stat.val}
                  <div className="text-white/40 text-[10px] uppercase tracking-widest font-bold">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 1.6 URGENCY COUNTDOWN BANNER */}
      <UrgencyCountdownBanner />

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
                src="/images/about_service_team.jpg"
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
                <span className="text-[#0EA5E9] font-black uppercase tracking-widest text-xs block">Sakarya'nın Güvenilir Servis Markası</span>
                <h2 className="font-black text-dark-text uppercase tracking-tight leading-none text-3xl md:text-5xl">
                  Sakarya Beyaz Eşya <br />
                  <span className="text-[#0EA5E9] mt-2 block">Kombi & Klima Servisi</span>
                </h2>
                <div className="w-16 h-1.5 bg-[#0EA5E9] mt-4 rounded-full" />
              </div>

              <div className="space-y-4 text-gray-500 font-medium text-sm md:text-base leading-relaxed">
                <p>
                  Adapazarı merkezimizden tüm Sakarya ilçelerine uzanan geniş mobil servis ağımızla Klima, Kombi, Çamaşır Makinesi, Bulaşık Makinesi, Buzdolabı, Kurutma Makinesi ve Ev Aletleri için arıza tamiri, bakım, montaj ve yedek parça hizmetleri sunuyoruz. 10 yılı aşkın sahaya dayanan tecrübemizle çözümsüz arıza bırakmıyoruz.
                </p>
                <p className="font-bold text-dark-text border-l-4 border-[#0EA5E9] pl-4 py-1 italic">
                  En iyi bildiklerimiz; hızlı müdahale, uzman teknik analiz ve 1 yıl garantili işçiliktir.
                </p>
              </div>

              {/* 4 Feature mini grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                {[
                  { icon: Wrench, title: "7/24 Acil Destek", desc: "Acil arızalara anında mobil ekiplerle müdahale." },
                  { icon: ShieldCheck, title: "MYK Belgeli Uzmanlık", desc: "Tüm süreçler resmi mühendislik standartlarında yürütülür." },
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

      {/* 🚀 ACİL KOMBİ SERVİSİ (Parallax Scroll Banner) */}
      <section className="relative h-[480px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax Scroll Effect */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/hero_kombi.jpg')",
            backgroundAttachment: "fixed"
          }}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-[#0F172A]/85 z-10" />
        
        {/* Content */}
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 relative z-20 text-center space-y-6 flex flex-col items-center justify-center">
          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-500/40 text-amber-400 font-black text-xs tracking-widest uppercase text-center">
            🔥 HIZLI KOMBİ SERVİSİ
          </span>
          <h2 className="text-white font-black uppercase tracking-tight text-3xl md:text-6xl leading-none text-center">
            Acil Kombi Servisi <br />
            <span className="text-amber-400 mt-2 block text-center">Aynı Gün Servis İmkanı</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto font-medium text-xs md:text-base leading-relaxed text-center">
            Kombiniz ısıtmıyor, sıcak su vermiyor veya arıza kodu mu veriyor? Sakarya genelinde 7/24 mobil araçlarımız ve sertifikalı kombi uzmanlarımızla aynı gün kapınızdayız.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <a
              href="tel:08503085454"
              className="flex items-center gap-2.5 px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all hover:scale-105 shadow-xl shadow-amber-500/30"
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


      {/* 3. HİZMETLERİMİZ — Hover-Expanding Accordion Panels */}
      <section className="py-24 bg-white border-t border-gray-100">

        <div className="max-w-[1600px] mx-auto px-6 md:px-10">
          {/* Tab Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
            <div>
              <span className="text-[#0EA5E9] font-black uppercase tracking-widest text-xs block mb-2">Çözüm Merkezimiz</span>
              <h2 className="font-black text-dark-text uppercase tracking-tight leading-none text-3xl md:text-5xl">
                Hangi Cihazınız İçin<br />
                <span className="text-[#0EA5E9] mt-2 block">Servis Arıyorsunuz?</span>
              </h2>
            </div>
            {/* Segment Tabs */}
            <div className="flex bg-gray-100 rounded-2xl p-1.5 gap-1 shrink-0">
              {([
                { key: "beyaz-esya", label: "🧺 Beyaz Eşya Servisleri" },
                { key: "klima-kombi", label: "❄️ Klima & Kombi Servisleri" },
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

          {/* Beyaz Eşya Hizmetleri */}
          <AnimatePresence mode="wait">
            {serviceTab === "beyaz-esya" && (
              <motion.div
                key="beyaz-esya"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                {/* Desktop Version: Hover-Expanding Panels */}
                <div className="hidden lg:flex w-full gap-5 h-[480px]">
                  {[
                    { icon: Wrench, title: "Çamaşır Makinesi Servisi", desc: "Tambur dönmeme, sıkmada gürültü yapma ve su boşaltmama arızalarına yerinde müdahale.", href: "/hizmetler/camasir-makinesi-ariza-servisi", tag: "Çamaşır", img: "/images/hero_camasir.jpg" },
                    { icon: ShieldCheck, title: "Bulaşık Makinesi Servisi", desc: "Su ısıtmama, deterjan eritmeme, lekesiz yıkama pompası ve anakart onarımları.", href: "/hizmetler/bulasik-makinesi-ariza-servisi", tag: "Bulaşık", img: "/images/hero_bulasik.jpg" },
                    { icon: Zap, title: "Buzdolabı Arıza Servisi", desc: "Kompresör değişimi, No-Frost defrost arızası ve gaz şarjı ile 30 dakikada nöbetçi servis.", href: "/hizmetler/buzdolabi-ariza-servisi", tag: "Buzdolabı", img: "/images/hero_buzdolabi.jpg" },
                    { icon: Settings, title: "Kurutma Makinesi Servisi", desc: "Isı pompası gaz şarjı, kazan kayışı değişimi ve filtre nem sensörü bakımı.", href: "/hizmetler/kurutma-makinesi-ariza-servisi", tag: "Kurutma", img: "/images/hero_kurutma.jpg" },
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
                          <h3 className={`font-black text-white uppercase tracking-tight leading-tight transition-all duration-300 mb-1 ${
                            isHovered ? "text-base sm:text-lg md:text-xl" : "text-xs sm:text-sm line-clamp-2"
                          }`}>
                            {s.title}
                          </h3>

                          {/* Description & CTA */}
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
                    { icon: Wrench, title: "Çamaşır Makinesi Servisi", desc: "Tambur dönmeme, sıkmada gürültü yapma ve su boşaltmama arızalarına yerinde müdahale.", href: "/hizmetler/camasir-makinesi-ariza-servisi", tag: "Çamaşır", img: "/images/hero_camasir.jpg" },
                    { icon: ShieldCheck, title: "Bulaşık Makinesi Servisi", desc: "Su ısıtmama, deterjan eritmeme, lekesiz yıkama pompası ve anakart onarımları.", href: "/hizmetler/bulasik-makinesi-ariza-servisi", tag: "Bulaşık", img: "/images/hero_bulasik.jpg" },
                    { icon: Zap, title: "Buzdolabı Arıza Servisi", desc: "Kompresör değişimi, No-Frost defrost arızası ve gaz şarjı ile 30 dakikada nöbetçi servis.", href: "/hizmetler/buzdolabi-ariza-servisi", tag: "Buzdolabı", img: "/images/hero_buzdolabi.jpg" },
                    { icon: Settings, title: "Kurutma Makinesi Servisi", desc: "Isı pompası gaz şarjı, kazan kayışı değişimi ve filtre nem sensörü bakımı.", href: "/hizmetler/kurutma-makinesi-ariza-servisi", tag: "Kurutma", img: "/images/hero_kurutma.jpg" },
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

            {serviceTab === "klima-kombi" && (
              <motion.div
                key="klima-kombi"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                {/* Desktop Version: Hover-Expanding Panels */}
                <div className="hidden lg:flex w-full gap-5 h-[480px]">
                  {[
                    { icon: Snowflake, title: "Acil Klima Arıza Servisi", desc: "Split ve inverter klimaların soğutmama, donma, su sızıntısı gibi tüm arızaları.", href: "/hizmetler/klima-arizasi-servisi", tag: "Klima", img: "/images/hero_klima.jpg" },
                    { icon: Thermometer, title: "Kombi Arıza & Bakım", desc: "Ateşleme arızası, sıcak su dalgalanması ve petek yıkama bakımları.", href: "/hizmetler/kombi-ariza-servisi", tag: "Kombi", img: "/images/hero_kombi.jpg" },
                    { icon: Wind, title: "Klima Montaj & Söküm", desc: "Garantili bakır borulama, gaz toplama ve vakumlu montaj hizmeti.", href: "/hizmetler/klima-montaj", tag: "Montaj", img: "/images/hero_klima_montaj.jpg" },
                    { icon: Cpu, title: "Küçük Ev Aletleri Servisi", desc: "Süpürge motoru, robot süpürge bataryası ve ütü rezistans onarımları.", href: "/hizmetler/kucuk-ev-aletleri-ariza-servisi", tag: "Ev Aletleri", img: "/images/hero_evaletleri.jpg" },
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
                        <div className="relative z-20 flex flex-col w-full text-[#1E293B]">
                          {/* Icon */}
                          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-4 border border-white/10 shrink-0">
                            <Icon className="w-6 h-6 text-orange-500" />
                          </div>
                          
                          {/* Title */}
                          <h3 className={`font-black text-white uppercase tracking-tight leading-tight transition-all duration-300 mb-1 ${
                            isHovered ? "text-base sm:text-lg md:text-xl" : "text-xs sm:text-sm line-clamp-2"
                          }`}>
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
                    { icon: Snowflake, title: "Acil Klima Arıza Servisi", desc: "Split ve inverter klimaların soğutmama, donma, su sızıntısı gibi tüm arızaları.", href: "/hizmetler/klima-arizasi-servisi", tag: "Klima", img: "/images/hero_klima.jpg" },
                    { icon: Thermometer, title: "Kombi Arıza & Bakım", desc: "Ateşleme arızası, sıcak su dalgalanması ve petek yıkama bakımları.", href: "/hizmetler/kombi-ariza-servisi", tag: "Kombi", img: "/images/hero_kombi.jpg" },
                    { icon: Wind, title: "Klima Montaj & Söküm", desc: "Garantili bakır borulama, gaz toplama ve vakumlu montaj hizmeti.", href: "/hizmetler/klima-montaj", tag: "Montaj", img: "/images/hero_klima_montaj.jpg" },
                    { icon: Cpu, title: "Küçük Ev Aletleri Servisi", desc: "Süpürge motoru, robot süpürge bataryası ve ütü rezistans onarımları.", href: "/hizmetler/kucuk-ev-aletleri-ariza-servisi", tag: "Ev Aletleri", img: "/images/hero_evaletleri.jpg" },
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


      {/* 🚀 ACİL KLİMA SERVİSİ (Parallax Banner - Orijinal Hali) */}
      <section className="relative h-[480px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/hero_klima.jpg')",
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



      {/* Markalar (Partnerler) */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-[1600px] mx-auto px-6 md:px-10">
          <div className="text-center mb-10 space-y-2">
            <span className="font-black text-[#0EA5E9] tracking-widest uppercase block text-xs">{partnersData.subtitle}</span>
            <h2 className="font-black uppercase text-dark-text tracking-tight text-2xl md:text-4xl max-w-3xl mx-auto leading-tight">{partnersData.title}</h2>
            <div className="w-16 h-1.5 bg-[#0EA5E9] mx-auto mt-4 rounded-full" />
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
                src="/images/customer_satisfaction.jpg"
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
                    <span className="text-[#0EA5E9] mt-2 block">Sakarya Beyaz Eşya Kombi Klima Servisi Güvencesi</span>
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

      {/* 🚀 ACİL BEYAZ EŞYA SERVİSİ (Parallax Scroll Banner) */}
      <section className="relative h-[480px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax Scroll Effect */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/hero_camasir.jpg')",
            backgroundAttachment: "fixed"
          }}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-[#0F172A]/85 z-10" />
        
        {/* Content */}
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 relative z-20 text-center space-y-6 flex flex-col items-center justify-center">
          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-500/40 text-emerald-400 font-black text-xs tracking-widest uppercase text-center">
            🧺 HIZLI BEYAZ EŞYA SERVİSİ
          </span>
          <h2 className="text-white font-black uppercase tracking-tight text-3xl md:text-6xl leading-none text-center">
            Acil Beyaz Eşya Servisi <br />
            <span className="text-emerald-400 mt-2 block text-center">Aynı Gün Servis İmkanı</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto font-medium text-xs md:text-base leading-relaxed text-center">
            Çamaşır makinesi, bulaşık makinesi veya buzdolabınız mı arızalandı? Gıdalarınız ve ev işleriniz aksamadan yerinde 1 yıl orijinal parça garantisiyle çözüyoruz.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <a
              href="tel:08503085454"
              className="flex items-center gap-2.5 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all hover:scale-105 shadow-xl shadow-emerald-500/30"
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
              Tüm hizmetlerimiz uluslararası ISO kalite ve güvenlik standartlarına uygun olarak belgelendirilmiştir.
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
              Teknik Servis Hizmetlerimiz <br />
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
