import Link from "next/link";
import { Snowflake } from "lucide-react";

interface LogoProps {
  className?: string;
  imageClassName?: string;
  src?: string;
  height?: number;
  scaleClass?: string;
  priority?: boolean;
}

export default function Logo({ className = "" }: LogoProps) {
  return (
    <Link href="/" className={`inline-flex items-center gap-3 group ${className}`}>
      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-[#0EA5E9] to-[#0284C7] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform duration-300 shrink-0">
        <Snowflake className="w-6 h-6 text-white animate-spin-slow" />
      </div>
      <div className="flex flex-col leading-none">
        <span className="font-black text-base sm:text-lg tracking-tight uppercase text-current group-hover:text-[#0EA5E9] transition-colors">
          SAKARYA <span className="text-[#0EA5E9]">BEYAZ EŞYA</span>
        </span>
        <span className="text-[10px] sm:text-[11px] font-bold opacity-80 text-[#0EA5E9] tracking-widest uppercase mt-1">
          Kombi & Klima Servisi
        </span>
      </div>
    </Link>
  );
}
