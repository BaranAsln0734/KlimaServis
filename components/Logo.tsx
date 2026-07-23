import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  className?: string;
  imageClassName?: string;
  src?: string;
  priority?: boolean;
}

export default function Logo({
  className = "",
  imageClassName = "h-20 sm:h-24 md:h-28 w-auto object-contain",
  src = "/newlogo.png",
  priority = true
}: LogoProps) {
  return (
    <Link href="/" className={`inline-flex items-center justify-center shrink-0 ${className}`}>
      <div className="relative flex items-center justify-center">
        <Image
          src={src}
          alt="Sakarya Beyaz Eşya Kombi Klima Servisi"
          width={600}
          height={220}
          className={`${imageClassName} filter drop-shadow-md`}
          priority={priority}
          unoptimized
        />
      </div>
    </Link>
  );
}
