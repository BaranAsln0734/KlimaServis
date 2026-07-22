"use client";

import { useState, Suspense, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, 
  Tag, 
  X, 
  FileSpreadsheet, 
  Briefcase,
  ArrowRight,
  Zap,
  Activity,
  Calendar,
  Cpu,
  Layers,
  Award,
  CheckCircle
} from "lucide-react";
import { PROJECTS, type Project } from "@/data/projects";

const CATEGORIES = [
  { id: "all", label: "Tüm Projeler", icon: Layers },
  { id: "satis", label: "Satış", icon: Zap },
  { id: "servis", label: "Servis", icon: Activity },
  { id: "kiralama", label: "Kiralama", icon: Calendar },
  { id: "yedek-parca", label: "Yedek Parça", icon: Cpu }
];

function ProjelerContent() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeStatus, setActiveStatus] = useState<"completed" | "ongoing">("completed");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectsList, setProjectsList] = useState<Project[]>(PROJECTS);

  useEffect(() => {
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
              setProjectsList(parsed);
            }
          }
        }
      })
      .catch((err) => console.error("Error loading dynamic projects:", err));
  }, []);

  // Filter projects by category only (all projects merged)
  const filteredProjects = useMemo(() => {
    return activeCategory === "all"
      ? projectsList
      : projectsList.filter((p) => p.category === activeCategory);
  }, [projectsList, activeCategory]);

  const activeProjects = useMemo(() => {
    return filteredProjects.filter((p) => {
      if (activeStatus === "completed") {
        return p.status === "completed" || p.status === undefined;
      } else {
        return p.status === "ongoing";
      }
    });
  }, [filteredProjects, activeStatus]);

  return (
    <div className="bg-[#F8F9FA] min-h-screen text-gray-700 py-24 md:py-36 relative overflow-hidden font-sans">
      {/* Decorative gradients */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#FFCC00]/10 via-transparent to-transparent pointer-events-none -z-10" />
      <div className="absolute top-1/4 right-[-10%] w-[500px] h-[500px] bg-[#FFCC00]/5 blur-[120px] rounded-full pointer-events-none -z-10 hero-drift" />
      <div className="absolute bottom-1/4 left-[-10%] w-[600px] h-[600px] bg-[#FFCC00]/3 blur-[150px] rounded-full pointer-events-none -z-10 hero-breathe-1" />

      {/* 1. Header Section */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 text-center mb-16 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-xs text-[#E6B800] font-black text-xs tracking-widest uppercase">
            <Award className="w-4 h-4 animate-pulse" />
            Mühendislik Güvencesi
          </div>
          <h1 className="font-black text-gray-900 tracking-tight uppercase leading-none text-4xl sm:text-5xl md:text-7xl">
            Proje <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E6B800] to-[#FFCC00]">
              Portföyümüz
            </span>
          </h1>
          <div className="w-24 h-1.5 bg-[#FFCC00] mx-auto mt-4" />
          <p className="text-gray-500 max-w-2xl mx-auto mt-6 leading-relaxed font-semibold text-xs sm:text-sm">
            Hastanelerden sanayi tesislerine, konut projelerinden kamu binalarına kadar gerçekleştirdiğimiz tamamlanan ve yapımı devam eden kesintisiz güç çözümlerimiz.
          </p>
        </motion.div>
      </section>

      {/* Status Filter Tabs (Tamamlanan / Devam Eden) */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 mb-6">
        <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-xl mx-auto">
          <button
            onClick={() => setActiveStatus("completed")}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-[20px] font-black uppercase text-xs tracking-wider transition-all duration-300 shadow-xs cursor-pointer border ${
              activeStatus === "completed"
                ? "bg-emerald-600 border-emerald-500 text-white shadow-emerald-600/10 hover:bg-emerald-700"
                : "bg-white border-gray-150 text-gray-500 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            <CheckCircle className="w-5 h-5 shrink-0" />
            Tamamlanan Projeler
          </button>
          <button
            onClick={() => setActiveStatus("ongoing")}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-[20px] font-black uppercase text-xs tracking-wider transition-all duration-300 shadow-xs cursor-pointer border ${
              activeStatus === "ongoing"
                ? "bg-amber-500 border-amber-400 text-white shadow-amber-500/10 hover:bg-amber-600"
                : "bg-white border-gray-150 text-gray-500 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            <Activity className="w-5 h-5 shrink-0" />
            Devam Eden Projeler
          </button>
        </div>
      </section>

      {/* 2. Category Filter Tabs */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 mb-16">
        <div className="flex flex-wrap justify-center gap-2 bg-white border border-gray-150 p-2 rounded-[24px] shadow-xs max-w-4xl mx-auto">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            const CatIcon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold uppercase text-[10px] sm:text-xs tracking-wider transition-all duration-300 cursor-pointer ${
                  isActive 
                    ? "bg-gray-900 text-white shadow-xs" 
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <CatIcon className="w-4 h-4 shrink-0" />
                {cat.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Projects Grid */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 mb-24">
        {activeProjects.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {activeProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => setSelectedProject(project)}
                  className="bg-white rounded-[32px] p-5 border border-gray-150 shadow-xs hover:shadow-2xl hover:translate-y-[-6px] transition-all duration-500 cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    {/* Image Frame */}
                    <div className="relative w-full aspect-[4/3] rounded-[20px] overflow-hidden bg-gray-50 mb-5">
                      <Image
                        src={project.img}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        loading="lazy"
                      />
                      {/* Only Category Tag on Image */}
                      <div className="absolute top-4 left-4 z-10">
                        <div className="bg-white/95 px-3 py-1 rounded-xl text-[#E6B800] font-black uppercase tracking-wider text-[9px] flex items-center gap-1 shadow-sm border border-gray-100">
                          <Tag className="w-3 h-3" />
                          {project.categoryLabel}
                        </div>
                      </div>
                    </div>

                    {/* Content Info */}
                    <div className="space-y-2">
                      <h3 className="font-extrabold text-gray-950 text-lg leading-snug group-hover:text-[#E6B800] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-500 text-xs sm:text-sm font-semibold leading-relaxed line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-gray-500 font-bold text-xs">
                      <MapPin className="w-4 h-4 text-[#E6B800]" />
                      {project.location}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="text-center py-20 bg-white rounded-[32px] border border-gray-150 p-8 shadow-xs">
            <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-4 animate-bounce" />
            <h3 className="text-lg font-bold text-gray-950 uppercase tracking-wider">Proje Bulunamadı</h3>
            <p className="text-gray-400 text-sm mt-2 max-w-sm mx-auto font-medium">
              Bu kategoride henüz {activeStatus === "completed" ? "tamamlanmış" : "yapımı devam eden"} bir projemiz bulunmamaktadır.
            </p>
          </div>
        )}
      </section>

      {/* 5. PORTFOLIO LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gray-950/80 backdrop-blur-md"
              onClick={() => setSelectedProject(null)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[32px] max-w-3xl w-full relative z-10 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col border border-gray-100"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-20 w-10 h-10 bg-white/95 rounded-full flex items-center justify-center text-gray-800 hover:bg-[#FFCC00] hover:text-black transition-colors shadow-lg border border-gray-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="overflow-y-auto p-8 md:p-10 space-y-8">
                
                {/* Meta details */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="bg-[#FFCC00]/10 border border-[#FFCC00]/20 text-[#E6B800] px-3.5 py-1.5 rounded-xl font-black uppercase tracking-widest text-[10px]">
                      {selectedProject.categoryLabel}
                    </span>
                    <span className="text-gray-400 font-semibold text-xs uppercase tracking-wider">
                      {selectedProject.scope}
                    </span>
                  </div>
                  <h3 className="font-black text-gray-950 text-2xl md:text-4xl leading-tight">
                    {selectedProject.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-gray-500 font-bold text-xs sm:text-sm">
                    <MapPin className="w-4.5 h-4.5 text-[#E6B800]" />
                    {selectedProject.location}
                  </div>
                </div>

                {/* Hero Image in Modal */}
                <div className="relative w-full aspect-video rounded-[24px] overflow-hidden shadow-lg border border-gray-100 bg-gray-50">
                  <Image src={selectedProject.img} alt={selectedProject.title} fill sizes="(max-width: 768px) 100vw, 80vw" className="object-cover" />
                </div>

                {/* Technical description */}
                <div className="space-y-4">
                  <h4 className="font-extrabold uppercase tracking-wider text-gray-950 text-sm">Proje Kapsamı ve Açıklaması</h4>
                  <p className="text-gray-500 leading-relaxed text-sm sm:text-base font-semibold bg-gray-50 p-6 rounded-2xl border border-gray-150">
                    {selectedProject.technicalDetails}
                  </p>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Customized CTA Section */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 mt-24 mb-16">
        <motion.div 
          className="bg-white border border-gray-150 p-8 md:p-12 rounded-[36px] flex flex-col md:flex-row items-center justify-between gap-8 shadow-xs relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#FFCC00]/5 blur-[120px] rounded-full pointer-events-none" />

          <div className="max-w-3xl text-center md:text-left space-y-3 relative z-10">
            <h4 className="font-black uppercase text-gray-900 text-2xl sm:text-3xl leading-none">Kesintisiz Enerjide Güvenilir Çözüm Ortağınız</h4>
            <p className="text-gray-500 leading-relaxed text-sm sm:text-base font-semibold">
              Akan Enerji olarak, +10 yıllık mühendislik tecrübemiz ve kesintisiz güç çözümlerimizle, sanayi tesislerinden konutlara kadar tüm projelerinizde yanınızdayız.
            </p>
          </div>
          <Link
            href="/iletisim"
            className="shrink-0 flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#FFCC00] text-black font-black uppercase tracking-wider hover:bg-[#E6B800] transition-all duration-300 text-xs sm:text-sm shadow-md shadow-[#FFCC00]/20 relative z-10"
          >
            Projenizi Konuşalım
            <ArrowRight className="w-5 h-5 stroke-[2.5]" />
          </Link>
        </motion.div>
      </div>

    </div>
  );
}

export default function ProjectsClientPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-bold text-gray-500">Yükleniyor...</div>}>
      <ProjelerContent />
    </Suspense>
  );
}
