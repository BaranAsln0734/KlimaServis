"use client";

import { usePathname } from "next/navigation";

export default function SEOFooter() {
  const pathname = usePathname();

  // Ana sayfada gizle
  if (pathname === "/") return null;

  return (
    <div className="bg-[#111111] border-b border-white/5 py-12">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 text-center">
        <h2 className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-3">
          Bölgesel Hizmetlerimiz ve Uzmanlık Alanlarımız
        </h2>
        <p className="text-gray-600 text-[11px] md:text-xs leading-loose max-w-6xl mx-auto opacity-70">
          <strong>Akan Enerji Jeneratör Sistemleri:</strong> İstanbul jeneratör servisi, kiralık mobil jeneratör, 2. el jeneratör alım satım, dizel jeneratör fiyatları 2025, Aksa, Teksan, Güçbir, Emsa marka jeneratör periyodik bakımı ve arıza tamiri. Gebze, Kocaeli, Çorlu, Tekirdağ ve tüm Marmara bölgesinde acil jeneratör servisi. Hastane kesintisiz güç kaynakları, büyük şantiye jeneratör kiralama, senkronizasyon panosu kurulumu, endüstriyel tesisler için yüksek kVA jeneratör çözümleri. Jeneratör yedek parça temini, alternatör sarımı, motor revizyonu ve güç tespiti konularında 7/24 profesyonel, garantili ve güvenilir hizmet sunmaktadır. Tüm enerji ihtiyaçlarınız için mühendislik standartlarında, size en uygun kVA kapasitesini belirleyerek ekonomik ve uzun ömürlü güç sistemleri inşa ediyoruz.
        </p>
      </div>
    </div>
  );
}
