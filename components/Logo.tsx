import Link from "next/link";

interface LogoProps {
  className?: string;
  src?: string;
  height?: number;
  scaleClass?: string;
  priority?: boolean;
}

export default function Logo({ className = "" }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center group ${className}`}>
      <div className="flex items-center gap-2">
        {/* Snowflake ikonu */}
        <div className="w-8 h-8 rounded-lg bg-[#0EA5E9] flex items-center justify-center shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <line x1="12" y1="2" x2="12" y2="22"/>
            <path d="m2 7 10 5 10-5"/>
            <path d="m2 17 10-5 10 5"/>
            <path d="m7 4.5-2.5 2.5 2.5 2.5"/>
            <path d="M17 4.5l2.5 2.5-2.5 2.5"/>
            <path d="m7 19.5-2.5-2.5 2.5-2.5"/>
            <path d="M17 19.5l2.5-2.5-2.5-2.5"/>
          </svg>
        </div>
        {/* Firma adı */}
        <div className="leading-none">
          <span className="block font-black text-sm md:text-base tracking-tight group-hover:text-[#0EA5E9] transition-colors">
            SAKARYA UZMAN
          </span>
          <span className="block font-bold text-[10px] md:text-xs tracking-[0.2em] text-[#0EA5E9] uppercase">
            Klima Servisi
          </span>
        </div>
      </div>
    </Link>
  );
}
