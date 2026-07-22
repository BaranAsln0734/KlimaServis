"use client";

import Link from "next/link";
import { ArrowRight, Snowflake } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-white px-6">
      <motion.div 
        className="text-center max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-24 h-24 bg-[#0EA5E9]/10 text-[#0EA5E9] rounded-full flex items-center justify-center mx-auto mb-8">
          <Snowflake className="w-12 h-12" />
        </div>
        
        <h1 className="font-black text-[#0F172A] tracking-tight uppercase text-4xl md:text-6xl mb-4">
          Sayfa Bulunamadı
        </h1>
        
        <div className="w-16 h-1 bg-[#0EA5E9] mx-auto mb-6" />
        
        <p className="text-gray-500 font-medium text-base md:text-lg mb-10 leading-relaxed">
          Aradığınız sayfaya ulaşılamıyor. URL&apos;yi yanlış yazmış olabilir veya sayfa taşınmış olabilir.
          Klima servisi için bizi arayabilir ya da ana sayfaya dönebilirsiniz.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0F172A] text-white font-black uppercase tracking-widest hover:bg-[#0F172A]/80 transition-all duration-300 text-sm hover:-translate-y-1 rounded-2xl shadow-xl"
          >
            Anasayfaya Dön
            <ArrowRight className="w-5 h-5" />
          </Link>
          <a
            href="tel:08503085454"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0EA5E9] text-white font-black uppercase tracking-widest hover:bg-[#0284C7] transition-all duration-300 text-sm hover:-translate-y-1 rounded-2xl shadow-lg shadow-sky-500/20"
          >
            0850 308 54 54
          </a>
        </div>
      </motion.div>
    </div>
  );
}
