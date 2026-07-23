"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, PhoneCall, Sparkles, ShieldCheck, Zap, Flame } from "lucide-react";

interface UrgencyCountdownBannerProps {
  districtName?: string;
}

export default function UrgencyCountdownBanner({ districtName }: UrgencyCountdownBannerProps) {
  const [timeLeft, setTimeLeft] = useState({ hours: 3, minutes: 47, seconds: 20 });

  useEffect(() => {
    // 4-hour rolling loop countdown that automatically resets when hitting 0
    const LOOP_DURATION_MS = 4 * 60 * 60 * 1000; // 4 Hours

    const updateTimer = () => {
      const now = Date.now();
      const currentCycleOffset = now % LOOP_DURATION_MS;
      const remainingMs = LOOP_DURATION_MS - currentCycleOffset;

      const hours = Math.floor((remainingMs / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((remainingMs / (1000 * 60)) % 60);
      const seconds = Math.floor((remainingMs / 1000) % 60);

      setTimeLeft({ hours, minutes, seconds });
    };

    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);
    return () => clearInterval(timerInterval);
  }, []);

  const formatDigit = (num: number) => String(num).padStart(2, "0");

  return (
    <div className="w-full bg-gradient-to-r from-[#0B132B] via-[#1C2541] to-[#0B132B] text-white border-y border-amber-500/30 py-4 px-4 sm:px-8 relative overflow-hidden shadow-2xl z-30">
      
      {/* Background Dual Aura Glow */}
      <div className="absolute -top-24 left-1/4 w-96 h-48 bg-amber-500/15 blur-[100px] pointer-events-none rounded-full" />
      <div className="absolute -bottom-24 right-1/4 w-96 h-48 bg-[#0EA5E9]/15 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-[1350px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-4 relative z-10">
        
        {/* Left: Live Beacon & Urgency Copy */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          
          {/* Neon Live Pulse Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-wider shrink-0 shadow-lg shadow-amber-500/10">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
            </span>
            <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>Bugüne Özel Hızlı Servis</span>
          </div>

          <div>
            <h4 className="font-black text-white text-sm sm:text-base uppercase tracking-tight flex items-center justify-center sm:justify-start gap-2">
              <span>{districtName ? `${districtName}'da Aynı Gün Adreste Mobil Servis` : "Sakarya Genelinde Aynı Gün Adreste Mobil Servis"}</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            </h4>
            <p className="text-gray-300 text-xs font-semibold mt-0.5 max-w-xl">
              Süre dolmadan arayarak ücretsiz ön tanı ve 1 yıl garantili parça avantajını kaçırmayın.
            </p>
          </div>
        </div>

        {/* Right: High-Tech Glass Countdown & Call Button */}
        <div className="flex items-center gap-4 shrink-0 flex-wrap justify-center">
          
          {/* Glass Digit Box Container */}
          <div className="flex items-center gap-2">
            
            {/* Hours */}
            <div className="bg-white/5 border border-amber-500/30 rounded-2xl px-3 py-1.5 min-w-[50px] text-center backdrop-blur-md shadow-inner">
              <span className="font-mono font-black text-amber-400 text-lg sm:text-xl leading-none drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]">
                {formatDigit(timeLeft.hours)}
              </span>
              <span className="block text-[8px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Saat</span>
            </div>

            <span className="text-amber-400 font-black text-lg leading-none animate-pulse">:</span>

            {/* Minutes */}
            <div className="bg-white/5 border border-amber-500/30 rounded-2xl px-3 py-1.5 min-w-[50px] text-center backdrop-blur-md shadow-inner">
              <span className="font-mono font-black text-amber-400 text-lg sm:text-xl leading-none drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]">
                {formatDigit(timeLeft.minutes)}
              </span>
              <span className="block text-[8px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Dakika</span>
            </div>

            <span className="text-amber-400 font-black text-lg leading-none animate-pulse">:</span>

            {/* Seconds */}
            <div className="bg-white/5 border border-amber-500/30 rounded-2xl px-3 py-1.5 min-w-[50px] text-center backdrop-blur-md shadow-inner">
              <span className="font-mono font-black text-amber-400 text-lg sm:text-xl leading-none drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]">
                {formatDigit(timeLeft.seconds)}
              </span>
              <span className="block text-[8px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Saniye</span>
            </div>

          </div>

          {/* High-Impact CTA Call Button */}
          <a
            href="tel:08500000000"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-[#0EA5E9] hover:from-amber-600 hover:to-[#0284C7] text-white font-black text-xs uppercase tracking-wider transition-all duration-300 shadow-xl shadow-amber-500/20 hover:scale-105 hover:shadow-amber-500/40 cursor-pointer"
          >
            <PhoneCall className="w-4 h-4 animate-bounce" />
            <span>Hemen Arayın (0850 000 00 00)</span>
          </a>

        </div>

      </div>
    </div>
  );
}
