"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, ArrowRight, PhoneCall, Clock, ShieldCheck, CheckCircle2,
  ChevronDown, Snowflake, Wrench, Droplets, Zap, Wind, Star,
  Phone, MessageCircle, Navigation, Home, Check, AlertCircle, FileText, Thermometer, Flame, Cpu
} from "lucide-react";
import UrgencyCountdownBanner from "@/components/UrgencyCountdownBanner";
import TroubleshootingWizard from "@/components/TroubleshootingWizard";

/* ─── Types ─── */
interface DistrictSection {
  title: string;
  html: string;
}
interface DistrictInfoType {
  mainTitle?: string;
  sections: DistrictSection[];
  jsonLd?: Record<string, unknown>;
}
interface DistrictClientPageProps {
  slug: string;
  districtName: string;
  locativeName: string;
  districtInfo: DistrictInfoType;
}

/* ─── Helper functions ─── */
const slugify = (text: string) =>
  text.toString().toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[ğg]/g, "g").replace(/[üu]/g, "u").replace(/[şs]/g, "s")
    .replace(/[ıi]/g, "i").replace(/[öo]/g, "o").replace(/[çc]/g, "c")
    .replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-")
    .replace(/^-+/, "").replace(/-+$/, "");

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

const DISTRICT_DB: Record<string, {
  eta: string;
  neighborhoods: string[];
  services: { icon: React.ElementType; title: string; content: string; accent: string }[];
  whyUs: string[];
}> = {
  adapazari: {
    eta: "Merkez",
    neighborhoods: ["Cumhuriyet","Mithatpaşa","İstiklal","Karaosman","Semerciler","Camii Kebir","Papuççular","Çark","Orta","Tepebaşı","Yenidoğan","Şeker","Korucuk","Güneşler","Esentepe","Kırkpınar","Yeniköy","Dağyolu"],
    services: [
      { icon: Wrench,      title: "Klima Arıza & Gaz Dolumu",  content: "Adapazarı'nda her marka klimada soğutmama, gaz kaçağı, fan ve kart arızalarına yerinde 7/24 mobil servis.", accent: "#0EA5E9" },
      { icon: Flame,       title: "Kombi Bakım & Petek Temizliği", content: "Adapazarı'nda kombi basınç sorunları, ateşleme arızası ve petek temizleme hizmeti ile yakıt tasarrufu.", accent: "#F59E0B" },
      { icon: ShieldCheck, title: "Çamaşır Makinesi Tamir Servisi", content: "Sıkma yapmayan, su boşaltmayan ve sesli çalışan çamaşır makinelerine aynı gün garantili müdahale.", accent: "#10B981" },
      { icon: Droplets,    title: "Bulaşık Makinesi Servisi",  content: "Bulaşıkların lekeli kalması, su almaması ve fıskiye tıkanıklıklarına adreste orijinal parçayla çözüm.", accent: "#8B5CF6" },
      { icon: Snowflake,   title: "Buzdolabı & Kurutma Makinesi", content: "Buzdolabının alt soğutmaması ve kurutma makinesinin nemli bırakması arızalarında garantili tamir.", accent: "#EC4899" },
      { icon: Zap,         title: "Garantili Montaj & Ev Aletleri", content: "TSE standartlarında bakır borulu klima montajı, gaz toplama ve küçük ev aletleri teknik onarımı.", accent: "#06B6D4" },
    ],
    whyUs: ["Adapazarı merkezi konumundan en hızlı saha müdahalesi","7/24 acil nöbetçi teknik ekip","Daikin, Mitsubishi, Samsung, LG, Arçelik tüm markalar","1 yıl işçilik + parça garantisi","Orijinal yedek parça stoğu"],
  },
  serdivan: {
    eta: "~18 dk",
    neighborhoods: ["Arabacıalanı","Çiftlik","Dağdibi","Emek","Fevzi Çakmak","Gazi","Hızırtepe","Kemalpaşa","Kırmızıtoprak","Kurtköy","Mimarsinan","Mithatpaşa","Orhangazi","Serdivan Merkez","Sinanoğlu","Tepekum","Üniversite","Yeni"],
    services: [
      { icon: Wrench,      title: "Serdivan Klima Arıza & Gaz", content: "Serdivan'da konut ve site klimaları için 7/24 arıza servisi. Ortalama 18 dakikada adresteyiz.", accent: "#0EA5E9" },
      { icon: Flame,       title: "Serdivan Kombi & Isıtma Servisi", content: "Serdivan'da kombi yıllık bakımı, esanjör temizliği ve radyatör yıkaması 1 yıl garantili.", accent: "#F59E0B" },
      { icon: ShieldCheck, title: "Serdivan Çamaşır Makinesi Tamiri", content: "Çamaşır makinesi kazan ve motor arızalarında Serdivan evlerinize adreste hizmet veriyoruz.", accent: "#10B981" },
      { icon: Droplets,    title: "Serdivan Bulaşık Makinesi Tamiri", content: "Su sızdıran ve kirli bırakan bulaşık makinelerinde orijinal parça garantili müdahale.", accent: "#8B5CF6" },
      { icon: Snowflake,   title: "Buzdolabı & Kurutma Servisi", content: "Serdivan rezidanslarında buzdolabı soğutmama ve motor kilitlenme arızalarına hızlı müdahale.", accent: "#EC4899" },
      { icon: Zap,         title: "Montaj & Küçük Ev Aletleri", content: "Serdivan'da site ve binalara bakır borulamalı klima montajı ve ev aletleri servisi.", accent: "#06B6D4" },
    ],
    whyUs: ["Serdivan'a 18 dakikada ulaşan mobil ekip","7/24 acil klima servisi","Tüm marka ve modellerde deneyim","1 yıl garanti"],
  },
  erenler: {
    eta: "~20 dk",
    neighborhoods: ["Camili","Çukurhisar","Derbent","Erenler Merkez","Gündoğdu","Işıklar","Karapınar","Kuzuluk","Mithatpaşa","Mollafenari","Osmaniye","Sinan","Şenlikköy","Yenimahalle","Yeşiltepe","Zafer"],
    services: [
      { icon: Wrench,      title: "Erenler Klima Arıza & Bakım", content: "Erenler ilçesinde klimada soğutmama, kompresör ve gaz kaçağı arızalarında aynı gün müdahale.", accent: "#0EA5E9" },
      { icon: Flame,       title: "Erenler Kombi & Petek Servisi", content: "Kombi ateşleme yapmama ve petek altlarının soğuk kalması problemlerine garantili çözüm.", accent: "#F59E0B" },
      { icon: ShieldCheck, title: "Erenler Çamaşır Makinesi Tamiri", content: "Erenler'de çamaşır makinesi pompa tıkanıklığı ve motor arızalarına yerinde servis.", accent: "#10B981" },
      { icon: Droplets,    title: "Erenler Bulaşık Makinesi Servisi", content: "Bulaşık makinesi yıkama motoru ve rezistans arızalarında hızlı parça değişimi.", accent: "#8B5CF6" },
      { icon: Snowflake,   title: "Erenler Buzdolabı Servisi", content: "No-Frost buzdolaplarında defrost ve gaz kaçağı arızalarına adreste müdahale.", accent: "#EC4899" },
      { icon: Zap,         title: "Klima & Cihaz Montajı", content: "Erenler'de klima montajı, gaz toplama ve küçük ev aletleri teknik onarımı.", accent: "#06B6D4" },
    ],
    whyUs: ["Erenler'e 20 dakikada mobil ekip","7/24 acil servis","Tüm marka ve modeller","1 yıl garanti"],
  },
  arifiye: {
    eta: "~22 dk",
    neighborhoods: ["Arifiye Merkez","Geyve Caddesi","İstasyon","Karaçay","Kemaliye","Kırkpınar","Kocapınar","Küplü","Nüfus","Orta","Pelitçik","Seyrantepe","Yazlık"],
    services: [
      { icon: Wrench,      title: "Arifiye Klima Servis & Gaz", content: "Arifiye'de klima arıza tespiti, R32/R410A gaz dolumu ve serpantin yıkama hizmetleri.", accent: "#0EA5E9" },
      { icon: Flame,       title: "Arifiye Kombi & Petek Yıkama", content: "Kombi periyodik bakımı ve kimyasal radyatör petek temizliği ile yakıt tasarrufu.", accent: "#F59E0B" },
      { icon: ShieldCheck, title: "Arifiye Çamaşır Makinesi Tamiri", content: "Çamaşır makinesi su boşaltmama ve kart arızalarında 22 dakikada adreste servis.", accent: "#10B981" },
      { icon: Droplets,    title: "Arifiye Bulaşık Makinesi Servisi", content: "Bulaşık makinesinin su almaması ve deterjan çözmemesi arızalarına garantili tamir.", accent: "#8B5CF6" },
      { icon: Snowflake,   title: "Arifiye Buzdolabı Servisi", content: "Buzdolabı soğutucu bölme ısınması ve fan motoru arızalarında yerinde çözüm.", accent: "#EC4899" },
      { icon: Zap,         title: "Montaj & Demontaj Servisi", content: "Arifiye'de standartlara uygun vakumlu klima montajı ve ev aletleri servisi.", accent: "#06B6D4" },
    ],
    whyUs: ["Arifiye'ye 22 dakikada ulaşım","7/24 acil hat","Orijinal yedek parça","1 yıl garanti"],
  },
  sapanca: {
    eta: "~35 dk",
    neighborhoods: ["Ballıkaya","Çamlıca","Çengeller","Dağkadı","Derbent","Doğançay","Eşme","Hüseyinli","Kıran","Kireçocağı","Mahmudiye","Maşukiye","Merkez","Nüzhetiye","Sümbüllü","Şerefiye","Uzunkum","Yangıköy"],
    services: [
      { icon: Wrench,      title: "Sapanca Klima Arıza & Gaz", content: "Sapanca, Maşukiye ve Uzunkum villa ve müstakil konutları için 7/24 klima arıza ve gaz şarjı.", accent: "#0EA5E9" },
      { icon: Flame,       title: "Sapanca Kombi & Petek Bakımı", content: "Sapanca konutlarında kış öncesi kombi bakımı ve petek temizliği ile sorunsuz ısınma.", accent: "#F59E0B" },
      { icon: ShieldCheck, title: "Sapanca Çamaşır Makinesi Tamiri", content: "Sapanca yazlık ve konutlarında çamaşır makinesi arızalarına adreste hızlı müdahale.", accent: "#10B981" },
      { icon: Droplets,    title: "Sapanca Bulaşık Makinesi Servisi", content: "Bulaşık makinesi su sızıntısı ve yıkama arızalarında aynı gün yerinde servis.", accent: "#8B5CF6" },
      { icon: Snowflake,   title: "Sapanca Buzdolabı Servisi", content: "Buzdolabının dondurmaması ve sesli çalışmasında orijinal parça değişimli tamir.", accent: "#EC4899" },
      { icon: Zap,         title: "Montaj & Sezon Hazırlığı", content: "Sapanca'da yazlık konut iklimlendirme ve beyaz eşya sezon açılış bakımları.", accent: "#06B6D4" },
    ],
    whyUs: ["Sapanca'ya 35 dakikada mobil ekip","Yazlık ve daimi konut uzmanlığı","7/24 acil servis","1 yıl garanti"],
  },
  hendek: {
    eta: "~45 dk",
    neighborhoods: ["Ağaçlı","Akçay","Balcı","Bardakçı","Beşköprü","Çubuklu","Dallıca","Dereköy","Doğançay","Erikli","Fevziye","Geriş","Göçbeyli","Hamidiye","Hendek Merkez","Kavacık","Kayabaşı","Köprübaşı","Kuzuluk","Lalahan","Nüzhetiye","Pazar","Ramazan","Sazlıca","Sofular","Toygarlı"],
    services: [
      { icon: Wrench,      title: "Hendek Klima Teknik Servisi", content: "Hendek merkez, OSB ve bağlı köylere klima arıza, bakım ve gaz dolumu servisi.", accent: "#0EA5E9" },
      { icon: Flame,       title: "Hendek Kombi & Isıtma Servisi", content: "Hendek'te kombi bakımı, kart tamiri ve kimyasal radyatör petek temizliği.", accent: "#F59E0B" },
      { icon: ShieldCheck, title: "Hendek Çamaşır Makinesi Servisi", content: "Çamaşır makinesi sıkmama ve su boşaltmama sorunlarına Hendek'te adreste tamir.", accent: "#10B981" },
      { icon: Droplets,    title: "Hendek Bulaşık Makinesi Tamiri", content: "Bulaşık makinesi temiz yıkamama ve su ısıtmama arızalarına yerinde çözüm.", accent: "#8B5CF6" },
      { icon: Snowflake,   title: "Hendek Buzdolabı Servisi", content: "Buzdolabı gaz kaçak tespiti ve kompresör değişimlerinde 1 yıl garantili servis.", accent: "#EC4899" },
      { icon: Zap,         title: "Klima & Cihaz Montajı", content: "Hendek'te sanayi ve konut alanlarına bakır borulamalı klima montajı.", accent: "#06B6D4" },
    ],
    whyUs: ["Hendek'e 45 dakikada ulaşan ekip","Tüm köy ve mahallelere servis","7/24 acil hat","1 yıl garanti"],
  },
  karasu: {
    eta: "~45 dk",
    neighborhoods: ["Akçakoca","Aydınpınar","Balkaya","Beyören","Doğançay","Düzağaç","Ekşioğlu","Erikli","Gündüzler","Güneşli","Hatipler","Karasu Merkez","Kılavuzlar","Kurtköy","Küçükköy","Merkez","Ovayurt","Sarıyer","Tekkeönü","Yeşilova"],
    services: [
      { icon: Wrench,      title: "Karasu Klima Arıza & Gaz", content: "Karasu sahil sitelerinde klima soğutmama, gaz kaçağı ve dış ünite paslanma bakımı.", accent: "#0EA5E9" },
      { icon: Flame,       title: "Karasu Kombi & Petek Servisi", content: "Karasu konutlarında kombi periyodik bakımı ve radyatör tesisat temizliği.", accent: "#F59E0B" },
      { icon: ShieldCheck, title: "Karasu Çamaşır Makinesi Tamiri", content: "Karasu yazlık ve evlerinde çamaşır makinesi arızalarına adreste müdahale.", accent: "#10B981" },
      { icon: Droplets,    title: "Karasu Bulaşık Makinesi Servisi", content: "Bulaşık makinesi su sızıntısı ve program takılması arızalarına yerinde çözüm.", accent: "#8B5CF6" },
      { icon: Snowflake,   title: "Karasu Buzdolabı Servisi", content: "Sahil iklimine özel buzdolabı motor bakımı ve gaz dolumu hizmetleri.", accent: "#EC4899" },
      { icon: Zap,         title: "Yazlık Montaj & Demontaj", content: "Karasu'da yazlık sitelere klima montajı, sökümü ve sezon bakımları.", accent: "#06B6D4" },
    ],
    whyUs: ["Karasu sahil bölgesi uzmanlığı","Tuzlu hava etkisine karşı özel bakım","7/24 acil servis","1 yıl garanti"],
  },
  kocaali: {
    eta: "~55 dk",
    neighborhoods: ["Akçakese","Alifuatpaşa","Ballıca","Çaltı","Çelik","Değirmendere","Geyik","Hüseyinli","Karaçay","Kayışlar","Kerpe","Kocaali Merkez","Kumkışlak","Ortaköy","Pazar","Sarıyar","Sultanlı","Tığcılar"],
    services: [
      { icon: Wrench,      title: "Kocaali Klima Arıza & Gaz", content: "Kocaali merkez ve sahil mahallelerine klima arıza, gaz dolumu ve bakım servisi.", accent: "#0EA5E9" },
      { icon: Flame,       title: "Kocaali Kombi & Isıtma", content: "Kocaali'de kombi yıllık bakımı ve radyatör petek yıkama hizmetleri.", accent: "#F59E0B" },
      { icon: ShieldCheck, title: "Kocaali Çamaşır Makinesi Tamiri", content: "Çamaşır makinesi su boşaltma ve sıkma arızalarında Kocaali'de yerinde müdahale.", accent: "#10B981" },
      { icon: Droplets,    title: "Kocaali Bulaşık Makinesi Servisi", content: "Bulaşık makinesinin kirli yıkaması ve kart arızalarında adreste tamir.", accent: "#8B5CF6" },
      { icon: Snowflake,   title: "Kocaali Buzdolabı Servisi", content: "Buzdolabının alt soğutmaması ve sensör arızalarında orijinal parça garantisi.", accent: "#EC4899" },
      { icon: Zap,         title: "Klima Montaj & Ev Aletleri", content: "Kocaali'de konutlara klima montajı ve küçük ev aletleri teknik desteği.", accent: "#06B6D4" },
    ],
    whyUs: ["Kocaali'ye 55 dakikada ulaşım","Sahil konutları uzmanlığı","7/24 acil hat","1 yıl garanti"],
  },
  kaynarca: {
    eta: "~60 dk",
    neighborhoods: ["Adatepe","Akçakese","Altıntaş","Aşağı Kızılca","Beşpınar","Büyük Kızılca","Çakıllar","Duralıbey","Göktepe","Güneşli","Kadıköy","Kaynarca Merkez","Kılçık","Kocagöl","Kuzucu","Taşburun"],
    services: [
      { icon: Wrench,      title: "Kaynarca Klima Arıza & Gaz", content: "Kaynarca ilçesinde klima arıza tespiti, R32/R410A gaz şarjı ve bakım servisi.", accent: "#0EA5E9" },
      { icon: Flame,       title: "Kaynarca Kombi & Petek Bakımı", content: "Kaynarca'da kombi yıllık bakımı ve petek temizliği ile yakıt tasarrufu.", accent: "#F59E0B" },
      { icon: ShieldCheck, title: "Kaynarca Çamaşır Makinesi Tamiri", content: "Çamaşır makinesi kazan ve bilya arızalarında adreste 1 yıl garantili servis.", accent: "#10B981" },
      { icon: Droplets,    title: "Kaynarca Bulaşık Makinesi Servisi", content: "Bulaşık makinesi su almama ve rezistans arızalarında adreste çözüm.", accent: "#8B5CF6" },
      { icon: Snowflake,   title: "Kaynarca Buzdolabı Servisi", content: "Buzdolabı soğutmama ve karlanma arızalarına Kaynarca'da adreste servis.", accent: "#EC4899" },
      { icon: Zap,         title: "Klima Montaj & Demontaj", content: "Kaynarca'da konut ve işyerlerine bakır borulamalı klima kurulumu.", accent: "#06B6D4" },
    ],
    whyUs: ["Kaynarca'ya 60 dakikada ulaşım","7/24 acil hat","Orijinal yedek parça","1 yıl garanti"],
  },
  ferizli: {
    eta: "~30 dk",
    neighborhoods: ["Aziziye","Bağlar","Bayramoğlu","Çaybaşı","Doğancı","Ferizli Merkez","Göktepe","Hamidiye","Kadı","Kışla","Köybucağı","Nüzhetiye","Orhan","Osmaniye","Selimiye","Servi","Turpçular"],
    services: [
      { icon: Wrench,      title: "Ferizli Klima Arıza & Gaz", content: "Ferizli'de klima arıza servisi, R32/R410A gaz şarjı ve ilaçlı serpantin yıkama.", accent: "#0EA5E9" },
      { icon: Flame,       title: "Ferizli Kombi & Petek Yıkama", content: "Ferizli'de kombi bakımı ve kalorifer radyatör temizliği hizmeti.", accent: "#F59E0B" },
      { icon: ShieldCheck, title: "Ferizli Çamaşır Makinesi Tamiri", content: "Çamaşır makinesi sıkmama ve kart arızalarına Ferizli'de aynı gün müdahale.", accent: "#10B981" },
      { icon: Droplets,    title: "Ferizli Bulaşık Makinesi Servisi", content: "Bulaşık makinesi yıkama motoru ve fıskiye tıkanıklıklarında adreste tamir.", accent: "#8B5CF6" },
      { icon: Snowflake,   title: "Ferizli Buzdolabı Servisi", content: "Buzdolabının dondurucu bölme kar yapması ve soğutmaması sorunlarına çözüm.", accent: "#EC4899" },
      { icon: Zap,         title: "Garantili Klima Montajı", content: "Ferizli'de yeni binalara vakumlu klima montajı ve ev aletleri servisi.", accent: "#06B6D4" },
    ],
    whyUs: ["Ferizli'ye 30 dakikada ulaşım","Aynı gün servis","7/24 acil hat","1 yıl garanti"],
  },
  sogutlu: {
    eta: "~28 dk",
    neighborhoods: ["Ballıhisar","Çakmaklı","Çeltikçi","Dağkadı","Dikilitaş","Erenler","Güney","Hamidiye","Kayabaşı","Kızılcaören","Söğütlü Merkez","Yenice"],
    services: [
      { icon: Wrench,      title: "Söğütlü Klima Arıza & Gaz", content: "Söğütlü'de klima arıza ve gaz şarjı. Merkezden 28 dakikada mobil ekibimiz adrestedir.", accent: "#0EA5E9" },
      { icon: Flame,       title: "Söğütlü Kombi & Petek Servisi", content: "Söğütlü'de kombi yıllık bakımı ve petek yıkanması ile yüksek ısınma verimi.", accent: "#F59E0B" },
      { icon: ShieldCheck, title: "Söğütlü Çamaşır Makinesi Tamiri", content: "Çamaşır makinesi su tahliye ve motor sorunlarında adreste tamir hizmeti.", accent: "#10B981" },
      { icon: Droplets,    title: "Söğütlü Bulaşık Makinesi Servisi", content: "Bulaşık makinesinin lekeli bırakması ve su ısıtmama sorunlarına garantili müdahale.", accent: "#8B5CF6" },
      { icon: Snowflake,   title: "Söğütlü Buzdolabı Servisi", content: "Buzdolabı alt bölme ısınması ve kompresör arızalarına yerinde müdahale.", accent: "#EC4899" },
      { icon: Zap,         title: "Klima Montaj & Deplase", content: "Söğütlü'de konut ve fabrikalara bakır borulamalı klima kurulumu.", accent: "#06B6D4" },
    ],
    whyUs: ["Söğütlü'ye 28 dakikada ulaşım","7/24 acil hat","Orijinal yedek parça","1 yıl garanti"],
  },
  geyve: {
    eta: "~55 dk",
    neighborhoods: ["Ağaçlı","Aydınpınar","Çark","Dağkadı","Derbent","Doğançay","Geyve Merkez","Güneşli","Hamidiye","Hisarköy","İhsaniye","Kavaklı","Kızılcaören","Mahmudiye","Nüzhetiye","Pazar","Sarıyer","Taşburun","Yenice"],
    services: [
      { icon: Wrench,      title: "Geyve Klima Arıza & Bakım", content: "Geyve'nin tüm mahalle ve köylerine 7/24 klima arıza, gaz dolumu ve ilaçlı bakım.", accent: "#0EA5E9" },
      { icon: Flame,       title: "Geyve Kombi & Petek Yıkama", content: "Geyve'de kış öncesi kombi bakımı ve radyatör tesisat temizliği ile tasarruf.", accent: "#F59E0B" },
      { icon: ShieldCheck, title: "Geyve Çamaşır Makinesi Tamiri", content: "Geyve ilçesinde çamaşır makinesi arızalarına adreste 1 yıl garantili müdahale.", accent: "#10B981" },
      { icon: Droplets,    title: "Geyve Bulaşık Makinesi Servisi", content: "Bulaşık makinesinin su almaması ve deterjan kutusu arızalarında adreste tamir.", accent: "#8B5CF6" },
      { icon: Snowflake,   title: "Geyve Buzdolabı Servisi", content: "Buzdolabının dondurmaması ve motor röle arızalarında adreste servis.", accent: "#EC4899" },
      { icon: Zap,         title: "Klima Montaj Hizmetleri", content: "Geyve'de her türlü bina ve yapıya uygun profesyonel klima montajı.", accent: "#06B6D4" },
    ],
    whyUs: ["Geyve'nin tüm mahallelerine servis","7/24 acil hat","Dağlık arazi deneyimi","1 yıl garanti"],
  },
  pamukova: {
    eta: "~50 dk",
    neighborhoods: ["Ahmediye","Akmeşe","Alpagut","Bektaşlı","Çifteler","Çifte Köprü","Dağkadı","Doğançay","Erikli","Göktepe","Güneşli","Hürriyet","Kazımiye","Kuşça","Kutluca","Mahmudiye","Pamukova Merkez","Selimiye","Sultandere","Yenice"],
    services: [
      { icon: Wrench,      title: "Pamukova Klima Arıza & Gaz", content: "Pamukova ilçesinde klima arıza tespiti, R32/R410A gaz şarjı ve serpantin yıkama.", accent: "#0EA5E9" },
      { icon: Flame,       title: "Pamukova Kombi & Isıtma Servisi", content: "Pamukova'da kombi bakımı ve petek yıkaması ile kış boyunca yüksek verim.", accent: "#F59E0B" },
      { icon: ShieldCheck, title: "Pamukova Çamaşır Makinesi Tamiri", content: "Çamaşır makinesi sıkmama ve ses yapma arızalarına Pamukova'da yerinde tamir.", accent: "#10B981" },
      { icon: Droplets,    title: "Pamukova Bulaşık Makinesi Servisi", content: "Bulaşık makinesinin kirli çıkarması ve su tahliye arızalarına adreste çözüm.", accent: "#8B5CF6" },
      { icon: Snowflake,   title: "Pamukova Buzdolabı Servisi", content: "Buzdolabı soğutmaması ve gaz kaçaklarında Pamukova'da 1 yıl garantili servis.", accent: "#EC4899" },
      { icon: Zap,         title: "Klima & Cihaz Montajı", content: "Pamukova'da konut ve işletmelere bakır borulamalı klima kurulumu.", accent: "#06B6D4" },
    ],
    whyUs: ["Pamukova'ya 50 dakikada ulaşım","7/24 acil hat","Tarım bölgesi deneyimi","1 yıl garanti"],
  },
  tarakli: {
    eta: "~70 dk",
    neighborhoods: ["Beypınar","Boyalıca","Çeltikdere","Dere","Deydinler","Eğrikaya","Gökçedere","Hacıyakup","Hamidiye","Kaymakam","Kılıçlı","Kırantepe","Köprübaşı","Kuzluca","Mahmudiye","Ortaca","Sarıbeyler","Taraklı Merkez","Yalnızçam","Yeşilova"],
    services: [
      { icon: Wrench,      title: "Taraklı Klima Arıza & Gaz", content: "Tarihi Taraklı ilçemizde ve tüm köylerinde 7/24 klima arıza, gaz dolumu ve bakım.", accent: "#0EA5E9" },
      { icon: Flame,       title: "Taraklı Kombi & Petek Servisi", content: "Taraklı konutlarında kombi periyodik bakımı ve radyatör temizliği hizmeti.", accent: "#F59E0B" },
      { icon: ShieldCheck, title: "Taraklı Çamaşır Makinesi Tamiri", content: "Taraklı'da çamaşır makinesi arızalarında adreste 1 yıl parça garantili servis.", accent: "#10B981" },
      { icon: Droplets,    title: "Taraklı Bulaşık Makinesi Servisi", content: "Bulaşık makinesinin temiz yıkamaması ve su kaçırmasında adreste çözüm.", accent: "#8B5CF6" },
      { icon: Snowflake,   title: "Taraklı Buzdolabı Servisi", content: "Buzdolabının dondurmaması ve motor çalışmaması arızalarında adreste tamir.", accent: "#EC4899" },
      { icon: Zap,         title: "Tarihi Yapı Klima Montajı", content: "Taraklı tarihi evlerinde hassas borulama ve estetik klima montajı.", accent: "#06B6D4" },
    ],
    whyUs: ["Taraklı'nın tüm köylerine servis","7/24 acil hat","Tarihi yapı deneyimi","1 yıl garanti"],
  },
  akyazi: {
    eta: "~40 dk",
    neighborhoods: ["Ağaçlı","Aksu","Balcı","Beşköprü","Çay","Çukurhisar","Dağdibi","Değirmendere","Doğançay","Duman","Erikli","Fevziye","Göktepe","Güneşli","Hamidiye","Işıklar","Kadıköy","Karaburun","Kavaklı","Kuyumcu","Mahmudiye","Nüzhetiye","Ortaköy","Pazar","Selimiye","Sultanlı","Taşburun","Yenice"],
    services: [
      { icon: Wrench,      title: "Akyazı Klima Arıza & Gaz Dolumu", content: "Akyazı merkez ve bağlı tüm köylerinde klimada soğutmama, gaz kaçağı ve kart tamiri.", accent: "#0EA5E9" },
      { icon: Flame,       title: "Akyazı Kombi & Petek Temizliği", content: "Akyazı'da kombi bakımı, kart onarımı ve radyatör peteklerinin yıkanması ile tasarruf.", accent: "#F59E0B" },
      { icon: ShieldCheck, title: "Akyazı Çamaşır Makinesi Tamiri", content: "Çamaşır makinesi sıkmama ve su boşaltmama sorunlarına Akyazı'da adreste tamir.", accent: "#10B981" },
      { icon: Droplets,    title: "Akyazı Bulaşık Makinesi Servisi", content: "Bulaşık makinesinin lekeli bırakması ve su ısıtmama sorunlarına garantili müdahale.", accent: "#8B5CF6" },
      { icon: Snowflake,   title: "Akyazı Buzdolabı & Kurutma", content: "Buzdolabı soğutmama ve kurutma makinesinin nemli bırakması arızalarında yerinde tamir.", accent: "#EC4899" },
      { icon: Zap,         title: "Akyazı Klima & Cihaz Montajı", content: "Akyazı'da tüm mahalle ve köylere bakır borulamalı vakumlu klima kurulumu.", accent: "#06B6D4" },
    ],
    whyUs: ["Akyazı'nın tüm mahallelerine servis","7/24 acil hat","Tarım & konut uzmanlığı","1 yıl garanti"],
  },
  karapurcek: {
    eta: "~35 dk",
    neighborhoods: ["Bahçeköy","Bağlarbaşı","Bekirler","Boyalıca","Çaltı","Çeltikçi","Dağkadı","Dikmen","Düzköy","Güneşli","Hamidiye","Karapürçek Merkez","Kavaklı","Kızılcaören","Köprübaşı","Mahmudiye","Sarıyer","Selimiye","Yenice"],
    services: [
      { icon: Wrench,      title: "Karapürçek Klima Arıza & Gaz", content: "Karapürçek'te klima arıza servisi, R32/R410A gaz şarjı ve ilaçlı serpantin temizliği.", accent: "#0EA5E9" },
      { icon: Flame,       title: "Karapürçek Kombi & Isıtma Servisi", content: "Karapürçek'te kombi yıllık bakımı ve kalorifer radyatör petek temizliği.", accent: "#F59E0B" },
      { icon: ShieldCheck, title: "Karapürçek Çamaşır Makinesi Tamiri", content: "Çamaşır makinesi su boşaltma ve sıkma arızalarında Karapürçek'te adreste tamir.", accent: "#10B981" },
      { icon: Droplets,    title: "Karapürçek Bulaşık Makinesi Servisi", content: "Bulaşık makinesi yıkama motoru ve rezistans arızalarında yerinde çözüm.", accent: "#8B5CF6" },
      { icon: Snowflake,   title: "Karapürçek Buzdolabı Servisi", content: "Buzdolabı soğutmama ve karlanma arızalarına Karapürçek'te adreste servis.", accent: "#EC4899" },
      { icon: Zap,         title: "Klima Montaj & Ev Aletleri", content: "Karapürçek'te konut ve işyerlerine klima montajı ve ev aletleri servisi.", accent: "#06B6D4" },
    ],
    whyUs: ["Karapürçek'e 35 dakikada ulaşım","7/24 acil hat","Orijinal yedek parça","1 yıl garanti"],
  },
};

export default function DistrictClientPage({
  slug, districtName, locativeName, districtInfo,
}: DistrictClientPageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formService, setFormService] = useState("");
  const [formStatus, setFormStatus] = useState<"idle"|"loading"|"success"|"error">("idle");

  const db = DISTRICT_DB[slug] || DISTRICT_DB["adapazari"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("loading");
    try {
      await fetch("/api/admin/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formName, phone: formPhone,
          serviceType: formService || "Genel Servis Talebi",
          district: districtName,
          message: `Bölge: ${districtName}`,
        }),
      });
      setFormStatus("success");
      setFormName(""); setFormPhone(""); setFormService("");
    } catch {
      setFormStatus("error");
    }
  };

  const FAQS = [
    { q: `${locativeName} servis ekibiniz kaç dakikada adrese gelir?`, a: `Adapazarı merkez lokasyonumuzdan ${db.eta} içinde ${locativeName} ulaşan mobil teknik araçlarımız 7/24 kesintisiz hizmet vermektedir.` },
    { q: `${districtName}'da hangi cihaz markalarına hizmet veriyorsunuz?`, a: "Daikin, Mitsubishi, Samsung, LG, Arçelik, Beko, Bosch, Siemens, Vaillant, Baymak, Demirdöküm ve E.C.A dahil tüm iklimlendirme, kombi ve beyaz eşya markalarında uzmanız." },
    { q: `Kombi bakımı ve petek temizliği ${locativeName} ne kadar sürer?`, a: "Kombi periyodik bakımı ve ilaçlı kimyasal petek yıkama işlemi ortalama 60-90 dakika sürer ve ısı verimini %30 artırır." },
    { q: `Çamaşır ve bulaşık makinesi tamirinde parça garantisi var mı?`, a: "Evet. Değiştirdiğimiz tüm motor, pompa, kart ve rezistans parçaları 1 Yıl İşçilik ve Parça Garanti Belgesi ile teslim edilmektedir." },
    { q: `Buzdolabı ve klimada yerinde arıza tespiti ve gaz şarjı yapılır mı?`, a: "Tam donanımlı mobil araçlarımızda vakum pompaları ve R32, R410A, R600A gaz tüpleri hazır bulunmaktadır. Arıza tespiti ve gaz şarjı aynı gün adreste tamamlanır." },
  ];

  /* ─── Informative text sections ─── */
  const INFO_SECTIONS = [
    {
      step: "01",
      title: `${districtName} İklimlendirme, Kombi & Beyaz Eşya Kullanım Rehberi`,
      icon: Thermometer,
      accent: "#0EA5E9",
      content: `${districtName} ilçesinde yaz aylarındaki yüksek nem ve sıcaklıklar ile kış aylarındaki sert soğuklar, evlerdeki iklimlendirme, kombi ve beyaz eşyaların kesintisiz çalışmasını zorunlu kılar. Tıkanmış klima filtreleri veya kireçlenmiş kombi petekleri %40'a varan fazla enerji tüketir. ${locativeName} uzman teknik ekibimiz, mekanınızın kapasite ve kullanım değerlerine göre en yüksek verimlilik sağlayacak kullanım tavsiyelerini sunmaktadır.`
    },
    {
      step: "02",
      title: `${locativeName} Yerinde Adım Adım Mobil Servis Süreci`,
      icon: FileText,
      accent: "#10B981",
      content: `Servis talebiniz oluşturulduğu andan itibaren mobil aracımız ${districtName} sınırlarına ortalama ${db.eta} süre içinde ulaşır. 1. Dijital test cihazlarıyla arıza ve performans tespiti -> 2. Şeffaf fiyatlandırma ve detaylı bilgilendirme -> 3. Orijinal yedek parça ve antibakteriyel ilaçlama ile yerinde tamir -> 4. 1 Yıl İşçilik Garantili resmi servis belgesinin teslimi.`
    },
    {
      step: "03",
      title: "Antibakteriyel İlaçlı Klima & Hijyenik Kombi Bakımı",
      icon: Snowflake,
      accent: "#8B5CF6",
      content: "Klimalarda biriken küf ve tozlar solunum yolu rahatsızlıklarına, kombilerde ise yanma odası kirliliği yüksek yakıt faturasına yol açar. Periyodik bakımlarda TSE onaylı ilaçlarla klima serpantin temizliği, drenaj dezenfeksiyonu ile kombi brülör ve radyatör petek yıkamaları yapılır."
    },
    {
      step: "04",
      title: "Çamaşır, Bulaşık Makinesi & Buzdolabı Arıza Çözümleri",
      icon: AlertCircle,
      accent: "#F59E0B",
      content: "Çamaşır makinesinin sıkmaması, bulaşık makinesinin lekeli yıkaması veya buzdolabının soğutmaması gibi arızalara tam donanımlı mobil servis araçlarımızla adreste müdahale ediyoruz. Elektronik kart tamiri, motor kömürü ve gaz kaçak şarjları aynı gün tamamlanır."
    },
    {
      step: "05",
      title: "Kurutma Makinesi, Ev Aletleri & Montaj Hizmetleri",
      icon: Zap,
      accent: "#06B6D4",
      content: `${districtName} genelinde kurutma makinesi nem filtre değişimi, küçük ev aletleri rezistans onarımları ile standartlara uygun bakır borulamalı vakumlu klima montaj, demontaj ve deplase işlemleri güvenle gerçekleştirilmektedir.`
    },
    {
      step: "06",
      title: `${districtName} Garantili Orijinal Parça & 1 Yıl Teknik Güvence`,
      icon: ShieldCheck,
      accent: "#EC4899",
      content: `${locativeName} gerçekleştirilen kompresör, fan motoru, kombi devirdaim pompası, çamaşır makinesi kazanı, buzdolabı rölesi ve elektronik kart değişimlerinin tamamında %100 orijinal yedek parçalar kullanılır. Yapılan tüm teknik müdahaleler Sakarya Beyaz Eşya Kombi Klima Servisi tarafından 1 Yıl Resmi İşçilik ve Parça Garanti Belgesi ile kayıt altına alınmaktadır.`
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-[#1E293B]">
      <title>{`${districtName} Beyaz Eşya, Kombi & Klima Servisi | 7/24 Bakım, Montaj & Tamir`}</title>
      <meta name="description" content={`${districtName} ilçesinde Klima, Kombi, Çamaşır Makinesi, Bulaşık Makinesi, Buzdolabı ve Kurutma Makinesi için 7/24 acil servis, periyodik bakım ve montaj hizmetleri.`} />

      {/* ━━━ HERO ━━━ */}
      <section className="relative pt-44 pb-36 md:pt-52 md:pb-44 bg-[#0F172A] text-white overflow-hidden">
        <div className="absolute inset-0 bg-topo-waves pointer-events-none opacity-25" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#0EA5E9]/10 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[300px] h-[200px] bg-[#38BDF8]/6 blur-[80px] rounded-full pointer-events-none" />

        <div className="max-w-[1300px] mx-auto px-6 md:px-10 relative z-10">
          {/* Breadcrumb */}
          <div className="flex flex-wrap items-center gap-2 mb-8 text-white/40 text-[10px] font-mono uppercase tracking-widest">
            <Link href="/" className="hover:text-white/70 transition-colors flex items-center gap-1"><Home className="w-3 h-3"/>Anasayfa</Link>
            <span>/</span>
            <Link href="/servis-bolgeleri" className="hover:text-white/70 transition-colors flex items-center gap-1"><Navigation className="w-3 h-3"/>Servis Bölgeleri</Link>
            <span>/</span>
            <span className="text-[#0EA5E9]">{districtName}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#0EA5E9] font-black text-xs tracking-widest uppercase"
              >
                <MapPin className="w-4 h-4" />
                {districtName} — Sakarya
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-black text-white uppercase leading-none text-3.5xl sm:text-4.5xl md:text-5.5xl tracking-tight"
              >
                {districtName}<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0EA5E9] to-[#38BDF8] mt-2 block">
                  Beyaz Eşya, Kombi & Klima Servisi
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-gray-300 font-semibold text-sm leading-relaxed max-w-xl"
              >
                {locativeName} 7/24 acil Klima, Kombi, Çamaşır Makinesi, Bulaşık Makinesi, Buzdolabı, Kurutma Makinesi ve Ev Aletleri arıza tamiri, bakım ve montaj servis hizmetleri. Merkezden <span className="text-[#0EA5E9] font-black">{db.eta}</span> ulaşıyoruz.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <a
                  href="tel:08500000000"
                  className="flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-[#0EA5E9] text-white font-black uppercase tracking-wider text-xs hover:bg-[#0284C7] transition-all shadow-lg shadow-sky-500/25 hover:-translate-y-0.5"
                >
                  <Phone className="w-4 h-4" />0850 000 00 00
                </a>
                <a
                  href={`https://wa.me/905550000000?text=Merhaba%2C+${districtName}+klima+servisi+hakk%C4%B1nda+bilgi+almak+istiyorum.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-emerald-500 text-white font-black uppercase tracking-wider text-xs hover:bg-emerald-600 transition-all hover:-translate-y-0.5"
                >
                  <MessageCircle className="w-4 h-4" />WhatsApp (Demo)
                </a>
              </motion.div>
            </div>

            {/* Stat Cards */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { val: "7/24", label: "Acil Servis", icon: Clock, accent: "#0EA5E9" },
                { val: db.eta, label: "Ulaşım Süresi", icon: Navigation, accent: "#10B981" },
                { val: "1 Yıl", label: "İşçilik Garantisi", icon: ShieldCheck, accent: "#8B5CF6" },
                { val: "A+++", label: "Enerji Uzmanı", icon: Zap, accent: "#F59E0B" },
              ].map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={i} className="bg-white/6 border border-white/10 rounded-2xl p-5 flex flex-col gap-3 hover:border-white/20 transition-all">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: s.accent + "20" }}>
                      <Icon className="w-4.5 h-4.5" style={{ color: s.accent }} />
                    </div>
                    <div>
                      <div className="font-black text-white text-xl leading-none">{s.val}</div>
                      <div className="text-white/45 text-[10px] uppercase tracking-widest font-bold mt-1">{s.label}</div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ━━━ URGENCY COUNTDOWN BANNER ━━━ */}
      <UrgencyCountdownBanner districtName={districtName} />

      {/* ━━━ HİZMETLER ━━━ */}
      <section className="max-w-[1300px] mx-auto px-6 md:px-10 py-20">
        <div className="text-center mb-12">
          <span className="text-[#0EA5E9] font-black text-xs uppercase tracking-widest block mb-2">Hizmetlerimiz</span>
          <h2 className="font-black text-gray-900 text-2xl md:text-4xl uppercase tracking-tight">
            {districtName}'da Mobil Teknik Servis Hizmetleri<br />
            <span className="text-[#0EA5E9] text-xl md:text-3xl mt-1.5 block font-extrabold">
              (Klima, Kombi & Beyaz Eşya)
            </span>
          </h2>
          <div className="w-12 h-1.5 bg-[#0EA5E9] mx-auto rounded-full mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {db.services.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group bg-white border border-gray-100 rounded-[28px] p-7 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex gap-5"
              >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all group-hover:scale-110" style={{ backgroundColor: svc.accent + "15" }}>
                  <Icon className="w-6 h-6" style={{ color: svc.accent }} />
                </div>
                <div>
                  <h3 className="font-black text-gray-900 text-sm uppercase tracking-tight mb-2">{svc.title}</h3>
                  <p className="text-gray-500 text-xs font-semibold leading-relaxed">{svc.content}</p>
                  <a
                    href="tel:08500000000"
                    className="inline-flex items-center gap-1.5 mt-3 text-[10px] font-black uppercase tracking-wider transition-colors"
                    style={{ color: svc.accent }}
                  >
                    Randevu Al <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ━━━ GENEL BİLGİ REHBERİ (DETAYLI YAZILAR & BAŞLIKLAR - YENİLENMİŞ TASARIM) ━━━ */}
      <section className="bg-white py-20 border-t border-gray-100">
        <div className="max-w-[1300px] mx-auto px-6 md:px-10">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <div className="flex justify-center mb-2">
              <Snowflake className="w-8 h-8 text-[#0EA5E9] animate-spin-slow" />
            </div>
            <span className="text-[#0EA5E9] font-black text-xs uppercase tracking-widest block mb-2">Uzman Rehberi</span>
            <h2 className="font-black text-gray-900 text-2xl md:text-4xl uppercase tracking-tight">
              {districtName} Beyaz Eşya, Kombi & Klima Servis & Hizmet Detayları
            </h2>
            <div className="w-16 h-1.5 bg-[#0EA5E9] mx-auto rounded-full mt-4" />
            <p className="text-gray-500 font-semibold text-xs sm:text-sm mt-4 leading-relaxed">
              {locativeName} Klima, Kombi, Çamaşır Makinesi, Bulaşık Makinesi, Buzdolabı ve Kurutma Makinesi bakımı, arıza teşhisi ve montaj süreçlerinde sunduğumuz kalite standartları.
            </p>
          </div>

          <div className="space-y-6">
            {INFO_SECTIONS.map((sec, i) => {
              const Icon = sec.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-[#F8FAFC] border border-gray-100 rounded-[32px] p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group"
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="flex items-start gap-5">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-110"
                        style={{ backgroundColor: (sec.accent || "#0EA5E9") + "18" }}
                      >
                        <Icon className="w-7 h-7" style={{ color: sec.accent || "#0EA5E9" }} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <span
                            className="font-mono font-black text-xs px-3 py-1 rounded-xl"
                            style={{ backgroundColor: (sec.accent || "#0EA5E9") + "15", color: sec.accent || "#0EA5E9" }}
                          >
                            ADIM {sec.step}
                          </span>
                          <span className="text-gray-400 text-[10px] font-black uppercase tracking-wider">
                            {districtName} Klima Servisi
                          </span>
                        </div>
                        <h3 className="font-black text-gray-900 text-lg md:text-xl uppercase tracking-tight leading-snug">
                          {sec.title}
                        </h3>
                        <p className="text-gray-600 text-xs sm:text-sm font-semibold leading-relaxed max-w-4xl pt-1">
                          {sec.content}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 hidden lg:flex flex-col items-end justify-center pl-6 border-l border-gray-200/60 text-right space-y-1">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#0EA5E9]">Garantili Hizmet</span>
                      <span className="text-xs font-black text-gray-800">1 Yıl Garanti</span>
                      <span className="text-[10px] font-bold text-gray-400">Aynı Gün Destek</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ━━━ MAHALLELER (Tıklanabilir Mahalle Sayfaları) ━━━ */}
      <section className="border-t border-gray-100 bg-[#F8FAFC] py-16">
        <div className="max-w-[1300px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4 space-y-4">
              <span className="text-[#0EA5E9] font-black text-xs uppercase tracking-widest block">Hizmet Noktaları</span>
              <h2 className="font-black text-gray-900 text-2xl md:text-3xl uppercase tracking-tight">
                {districtName} Mahallelerinde<br />
                <span className="text-[#0EA5E9] text-xl md:text-2xl mt-1 block font-extrabold">
                  Klima, Kombi & Beyaz Eşya Servisi
                </span>
              </h2>
              <div className="w-12 h-1.5 bg-[#0EA5E9] rounded-full" />
              <p className="text-gray-500 font-semibold text-sm leading-relaxed">
                {locativeName} tüm mahallelere aynı gün hızlı servis garantisi veriyoruz.
                Detaylı mahalle teknik servis sayfasına gitmek için aşağıdaki mahalle adına tıklayabilirsiniz.
              </p>
              <a
                href="tel:08500000000"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-[#0EA5E9] text-white font-black uppercase tracking-wider text-xs hover:bg-[#0284C7] transition-all shadow-lg shadow-sky-500/20 hover:-translate-y-0.5"
              >
                <PhoneCall className="w-4 h-4" />Hemen Ara — 0850 000 00 00
              </a>
            </div>

            {/* Tıklanabilir Mahalle Linkleri Grid'i */}
            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {db.neighborhoods.map((mah, i) => {
                const canonicalSlug = `${getDistrictPath(districtName)}/${slugify(mah)}-klima-servisi`;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.015 }}
                  >
                    <Link
                      href={`/${canonicalSlug}`}
                      className="flex items-center justify-between px-3.5 py-3 bg-white border border-gray-100 rounded-xl hover:border-[#0EA5E9] hover:bg-[#0EA5E9]/5 hover:shadow-sm transition-all group cursor-pointer"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0EA5E9] shrink-0 group-hover:scale-150 transition-transform" />
                        <span className="text-gray-700 font-bold text-xs truncate group-hover:text-[#0EA5E9] transition-colors">{mah}</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#0EA5E9] shrink-0 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ NEDEN BİZ + FORM ━━━ */}
      <section className="max-w-[1300px] mx-auto px-6 md:px-10 py-16 border-t border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* Neden Biz */}
          <div className="bg-[#0F172A] rounded-[32px] p-8 md:p-10 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#0EA5E9]/8 blur-[80px] rounded-full pointer-events-none" />
            <div className="relative z-10">
              <span className="text-[#0EA5E9] font-black text-xs uppercase tracking-widest block mb-3">Neden Biz?</span>
              <h3 className="font-black text-white text-xl md:text-2xl uppercase tracking-tight mb-6">
                {districtName} İçin Doğru<br />
                <span className="text-[#0EA5E9]">Teknik Servis Seçimi</span>
              </h3>
              <div className="space-y-4 mb-8">
                {db.whyUs.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-lg bg-[#0EA5E9]/20 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#0EA5E9]" />
                    </div>
                    <span className="text-gray-300 text-sm font-semibold">{item}</span>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Tüm Markalar", val: "Daikin, Samsung, Bosch +" },
                  { label: "Garanti", val: "1 Yıl İşçilik" },
                  { label: "Acil Servis", val: "7/24 Hizmet" },
                  { label: "Saha Ekibi", val: "Mobil Araçlar" },
                ].map((item, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <div className="text-[#0EA5E9] text-[9px] font-black uppercase tracking-widest mb-1">{item.label}</div>
                    <div className="text-white text-xs font-black">{item.val}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Servis Talep Formu */}
          <div className="bg-white border border-gray-100 rounded-[32px] p-8 md:p-10 shadow-sm">
            <div className="flex items-center gap-3 mb-7 pb-6 border-b border-gray-50">
              <div className="w-10 h-10 rounded-2xl bg-[#0EA5E9]/10 flex items-center justify-center">
                <PhoneCall className="w-5 h-5 text-[#0EA5E9]" />
              </div>
              <div>
                <h3 className="font-black text-gray-900 text-base uppercase tracking-tight">{districtName} Servis & Teklif Talebi</h3>
                <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Sizi geri arayalım</span>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {formStatus === "success" ? (
                <motion.div key="ok" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-10">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                  <h4 className="font-black text-gray-900 uppercase text-sm tracking-tight mb-2">Talebiniz Alındı!</h4>
                  <p className="text-gray-500 text-xs font-semibold mb-6">Teknik ekibimiz kısa süre içinde sizi arayacak.</p>
                  <button onClick={() => setFormStatus("idle")} className="text-gray-400 text-xs font-bold uppercase tracking-wider hover:text-gray-700 cursor-pointer">Yeni Talep Gönder</button>
                </motion.div>
              ) : (
                <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-gray-400 mb-2">Ad Soyad *</label>
                    <input type="text" required value={formName} onChange={e => setFormName(e.target.value)} placeholder="Ahmet Yılmaz" className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#0EA5E9] focus:ring-4 focus:ring-sky-500/5 focus:bg-white text-gray-800 placeholder:text-gray-400 font-semibold text-sm transition-all" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-gray-400 mb-2">Telefon *</label>
                    <input type="tel" required value={formPhone} onChange={e => setFormPhone(e.target.value)} placeholder="0555 000 00 00" className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#0EA5E9] focus:ring-4 focus:ring-sky-500/5 focus:bg-white text-gray-800 placeholder:text-gray-400 font-semibold text-sm transition-all" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-gray-400 mb-2">Hizmet Türü</label>
                    <select value={formService} onChange={e => setFormService(e.target.value)} className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#0EA5E9] focus:bg-white text-gray-800 font-semibold text-sm transition-all cursor-pointer">
                      <option value="">Seçin...</option>
                      {["Klima Arıza & Gaz Dolumu","Kombi Bakım & Petek Temizliği","Çamaşır Makinesi Tamiri","Bulaşık Makinesi Servisi","Buzdolabı & Kurutma Makinesi","Küçük Ev Aletleri Servisi","Garantili Montaj","Fiyat Teklifi"].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  {formStatus === "error" && <p className="text-red-500 text-xs font-bold bg-red-50 border border-red-100 rounded-xl px-4 py-3">Hata oluştu. Lütfen telefonu arayın.</p>}
                  <button type="submit" disabled={formStatus === "loading"} className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-black uppercase tracking-wider text-xs rounded-2xl transition-all shadow-lg shadow-sky-500/20 hover:-translate-y-0.5 disabled:opacity-60 cursor-pointer">
                    {formStatus === "loading" ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>Gönderiliyor...</> : <><PhoneCall className="w-4 h-4"/>Geri Arama Talebi</>}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ━━━ SSS ━━━ */}
      <section className="border-t border-gray-100 bg-white py-16">
        <div className="max-w-[1300px] mx-auto px-6 md:px-10">
          <div className="text-center mb-12">
            <span className="text-[#0EA5E9] font-black text-xs uppercase tracking-widest block mb-2">Sıkça Sorulan Sorular</span>
            <h2 className="font-black text-gray-900 text-2xl md:text-3xl uppercase tracking-tight">{districtName} Beyaz Eşya, Kombi & Klima Servisi SSS</h2>
            <div className="w-12 h-1.5 bg-[#0EA5E9] mx-auto rounded-full mt-4" />
          </div>
          <div className="max-w-3xl mx-auto space-y-3">
            {FAQS.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-[#F8FAFC] border border-gray-100 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer group"
                >
                  <span className="font-black text-gray-900 text-sm uppercase tracking-tight pr-4 group-hover:text-[#0EA5E9] transition-colors">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-[#0EA5E9] shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 text-gray-500 text-sm font-semibold leading-relaxed border-t border-gray-100 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ ALT CTA ━━━ */}
      <section className="bg-gradient-to-br from-[#0F172A] via-[#0F172A] to-[#0284C7]/20 text-white py-16 relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-topo-waves pointer-events-none opacity-20" />
        <div className="max-w-[1300px] mx-auto px-6 md:px-10 relative z-10 text-center">
          <Snowflake className="w-10 h-10 text-[#0EA5E9]/40 mx-auto mb-4" />
          <h3 className="font-black text-white text-2xl md:text-3xl uppercase tracking-tight mb-3">
            {districtName}'da Cihazınız mı Arızalandı?
          </h3>
          <p className="text-gray-300 font-semibold text-sm leading-relaxed mb-8 max-w-xl mx-auto">
            {locativeName} 7/24 hizmet veren Klima, Kombi & Beyaz Eşya uzman teknik ekibimizi hemen arayın.
            Aynı gün adreste müdahale, 1 yıl işçilik garantisi.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:08500000000" className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-[#0EA5E9] text-white font-black uppercase tracking-wider text-xs hover:bg-[#0284C7] transition-all shadow-lg shadow-sky-500/20 hover:-translate-y-0.5">
              <Phone className="w-4 h-4" />0850 000 00 00
            </a>
            <a href={`https://wa.me/905550000000?text=Merhaba%2C+${encodeURIComponent(districtName)}+klima+servisi+hakk%C4%B1nda+bilgi+almak+istiyorum.`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-emerald-500 text-white font-black uppercase tracking-wider text-xs hover:bg-emerald-600 transition-all hover:-translate-y-0.5">
              <MessageCircle className="w-4 h-4" />WhatsApp ile Yaz (Demo)
            </a>
            <Link href="/servis-bolgeleri" className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white/8 border border-white/15 text-white font-black uppercase tracking-wider text-xs hover:bg-white/15 transition-all">
              <Navigation className="w-4 h-4" />Tüm İlçeler
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
