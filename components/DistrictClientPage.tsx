"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, ArrowRight, PhoneCall, Clock, ShieldCheck, CheckCircle2,
  ChevronDown, Snowflake, Wrench, Droplets, Zap, Wind, Star,
  Phone, MessageCircle, Navigation, Home, Check, AlertCircle, FileText, Thermometer
} from "lucide-react";

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

/* ─── Static Sakarya İlçe Veritabanı ─── */
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
      { icon: Wrench,    title: "Klima Arıza Tamiri", content: "Adapazarı'nda her marka klima için 7/24 arıza servisi. Kompresör, fan motoru, elektronik kart ve gaz kaçağı sorunlarında aynı gün müdahale.", accent: "#EF4444" },
      { icon: Snowflake, title: "Periyodik Bakım",     content: "Yılda 2 kez filtre temizliği, serpantin yıkama ve gaz basınç kontrolü ile klimanız en verimli halinde çalışır. Bakımlı klima %30 daha az enerji harcar.", accent: "#0EA5E9" },
      { icon: Droplets,  title: "R32 / R410A Gaz Dolumu", content: "Orijinal ve belgeli soğutucu gazlarla gaz dolumu yapıyoruz. Sızdırmazlık testi, tahliye ve tam şarj hizmetleri mevcuttur.", accent: "#8B5CF6" },
      { icon: Zap,       title: "Klima Montajı",       content: "TSE standartlarında bakır boru hattı, drenaj ve elektrik bağlantısıyla doğru montaj. Tüm montajlarda 1 yıl işçilik garantisi.", accent: "#10B981" },
    ],
    whyUs: ["Adapazarı merkezi konumundan en hızlı saha müdahalesi","7/24 acil nöbetçi teknik ekip","Daikin, Mitsubishi, Samsung, LG, Arçelik tüm markalar","1 yıl işçilik + parça garantisi","Orijinal yedek parça stoğu"],
  },
  serdivan: {
    eta: "~18 dk",
    neighborhoods: ["Arabacıalanı","Çiftlik","Dağdibi","Emek","Fevzi Çakmak","Gazi","Hızırtepe","Kemalpaşa","Kırmızıtoprak","Kurtköy","Mimarsinan","Mithatpaşa","Orhangazi","Serdivan Merkez","Sinanoğlu","Tepekum","Üniversite","Yeni"],
    services: [
      { icon: Wrench,    title: "Serdivan Klima Arıza Servisi", content: "Serdivan'da konut, site ve işyeri klimaları için 7/24 arıza servisi. Ortalama 18 dakikada kapınızdayız.", accent: "#EF4444" },
      { icon: Snowflake, title: "Periyodik Bakım",               content: "Serdivan'da yıllık klima bakımı için randevu alın. Anlaşmalı müşterilerimiz öncelikli servis hizmetinden yararlanır.", accent: "#0EA5E9" },
      { icon: Droplets,  title: "Gaz Dolumu",                    content: "Serdivan bölgesinde R32 ve R410A gaz dolumu ve sızdırmazlık testi yapıyoruz.", accent: "#8B5CF6" },
      { icon: Zap,       title: "Klima Montajı",                  content: "Serdivan'daki yeni binalarda ve site rezidanslarında klima montajı yapıyoruz.", accent: "#10B981" },
    ],
    whyUs: ["Serdivan'a 18 dakikada ulaşan mobil ekip","7/24 acil klima servisi","Tüm marka ve modellerde deneyim","1 yıl garanti"],
  },
  erenler: {
    eta: "~20 dk",
    neighborhoods: ["Camili","Çukurhisar","Derbent","Erenler Merkez","Gündoğdu","Işıklar","Karapınar","Kuzuluk","Mithatpaşa","Mollafenari","Osmaniye","Sinan","Şenlikköy","Yenimahalle","Yeşiltepe","Zafer"],
    services: [
      { icon: Wrench,    title: "Erenler Klima Arıza Tamiri",  content: "Erenler'de her marka klimada arıza tespiti ve onarım. Samsung, LG, Daikin, Mitsubishi dahil tüm markalarda yerinde servis.", accent: "#EF4444" },
      { icon: Snowflake, title: "Periyodik Bakım",              content: "Klima ömrünü ve verimini artırmak için Erenler'de yıllık periyodik bakım veriyoruz.", accent: "#0EA5E9" },
      { icon: Droplets,  title: "Gaz Dolumu",                   content: "R32 ve R410A gazları için gaz dolumu ve sızdırmazlık testleri yapıyoruz.", accent: "#8B5CF6" },
      { icon: Zap,       title: "Klima Montaj & Söküm",         content: "Erenler'de klima kurulumu ve söküm için randevu alabilirsiniz.", accent: "#10B981" },
    ],
    whyUs: ["Erenler'e 20 dakikada mobil ekip","7/24 acil servis","Tüm marka ve modeller","1 yıl garanti"],
  },
  arifiye: {
    eta: "~22 dk",
    neighborhoods: ["Arifiye Merkez","Geyve Caddesi","İstasyon","Karaçay","Kemaliye","Kırkpınar","Kocapınar","Küplü","Nüfus","Orta","Pelitçik","Seyrantepe","Yazlık"],
    services: [
      { icon: Wrench,    title: "Arifiye Klima Arıza Servisi", content: "Arifiye'de konut ve ticari alanlarda klima bakımı ve arıza servisi. Ekibimiz 22 dakikada ulaşır.", accent: "#EF4444" },
      { icon: Snowflake, title: "Periyodik Bakım",              content: "Arifiye'de yıllık klima bakımı için bizi arayın.", accent: "#0EA5E9" },
      { icon: Droplets,  title: "Gaz Dolumu",                   content: "Arifiye'de R32 ve R410A gaz dolumu hizmetleri sunuyoruz.", accent: "#8B5CF6" },
      { icon: Zap,       title: "Klima Montajı",                 content: "Arifiye'de yeni klima kurulumu için uzman ekibimizi arayın.", accent: "#10B981" },
    ],
    whyUs: ["Arifiye'ye 22 dakikada ulaşım","7/24 acil hat","Orijinal yedek parça","1 yıl garanti"],
  },
  sapanca: {
    eta: "~35 dk",
    neighborhoods: ["Ballıkaya","Çamlıca","Çengeller","Dağkadı","Derbent","Doğançay","Eşme","Hüseyinli","Kıran","Kireçocağı","Mahmudiye","Maşukiye","Merkez","Nüzhetiye","Sümbüllü","Şerefiye","Uzunkum","Yangıköy"],
    services: [
      { icon: Wrench,    title: "Sapanca Klima Arıza & Bakım",  content: "Sapanca'da tatil ve daimi konutlar için 7/24 klima servisi. Maşukiye, Uzunkum dahil tüm bölgelere aynı gün servis.", accent: "#EF4444" },
      { icon: Snowflake, title: "Sezonal Klima Bakımı",          content: "Yaz sezonu öncesi klima bakımını yaptırarak sezon boyunca konforunuzu yaşayın.", accent: "#0EA5E9" },
      { icon: Droplets,  title: "Gaz Dolumu",                    content: "Sapanca bölgesinde R32 ve R410A gaz dolumu ve sızdırmazlık testleri yapıyoruz.", accent: "#8B5CF6" },
      { icon: Zap,       title: "Montaj & Söküm",                content: "Sapanca'da yazlık ve daimi konutlara klima montajı ve söküm hizmetleri.", accent: "#10B981" },
    ],
    whyUs: ["Sapanca'ya 35 dakikada mobil ekip","Yazlık ve daimi konut uzmanlığı","7/24 acil servis","1 yıl garanti"],
  },
  hendek: {
    eta: "~45 dk",
    neighborhoods: ["Ağaçlı","Akçay","Balcı","Bardakçı","Beşköprü","Çubuklu","Dallıca","Dereköy","Doğançay","Erikli","Fevziye","Geriş","Göçbeyli","Hamidiye","Hendek Merkez","Kavacık","Kayabaşı","Köprübaşı","Kuzuluk","Lalahan","Nüzhetiye","Pazar","Ramazan","Sazlıca","Sofular","Toygarlı"],
    services: [
      { icon: Wrench,    title: "Hendek Klima Teknik Servisi",  content: "Hendek ilçesinde klima arıza servisi, bakım ve montaj. Merkez ve köy mahallelerine dahil tüm Hendek bölgesine mobil servis.", accent: "#EF4444" },
      { icon: Snowflake, title: "Periyodik Klima Bakımı",        content: "Hendek'te klima bakımı için randevu alın. Filtre temizliği ve sistem kontrolü ile klimanızın verimini artırın.", accent: "#0EA5E9" },
      { icon: Droplets,  title: "Gaz Dolumu",                    content: "Hendek'te soğutucu gaz dolumu hizmeti veriyoruz.", accent: "#8B5CF6" },
      { icon: Zap,       title: "Klima Montaj Hizmeti",          content: "Hendek'te yeni klima alacaklar için profesyonel montaj. Sanayi OSB ve konut alanlarına özel çözümler.", accent: "#10B981" },
    ],
    whyUs: ["Hendek'e 45 dakikada ulaşan ekip","Tüm köy ve mahallelere servis","7/24 acil hat","1 yıl garanti"],
  },
  karasu: {
    eta: "~45 dk",
    neighborhoods: ["Akçakoca","Aydınpınar","Balkaya","Beyören","Doğançay","Düzağaç","Ekşioğlu","Erikli","Gündüzler","Güneşli","Hatipler","Karasu Merkez","Kılavuzlar","Kurtköy","Küçükköy","Merkez","Ovayurt","Sarıyer","Tekkeönü","Yeşilova"],
    services: [
      { icon: Wrench,    title: "Karasu Klima Arıza Servisi",     content: "Karasu'da sahil konutları ve işyerleri için 7/24 klima servisi. Tuzlu hava etkisine karşı özel bakım çözümleri sunuyoruz.", accent: "#EF4444" },
      { icon: Snowflake, title: "Dış Ünite Bakımı & Temizliği",    content: "Karasu'nun sahil iklimi dış ünitelerde korozyona yol açabilir. Serpantin temizliği ve koruyucu bakım ile klimanızı koruyun.", accent: "#0EA5E9" },
      { icon: Droplets,  title: "Gaz Dolumu",                      content: "Karasu'da R32 ve R410A gaz dolumu hizmetleri sunuyoruz.", accent: "#8B5CF6" },
      { icon: Zap,       title: "Klima Montajı",                   content: "Karasu'da yazlık sitelere klima montajı. Randevu için bizi arayın.", accent: "#10B981" },
    ],
    whyUs: ["Karasu sahil bölgesi uzmanlığı","Tuzlu hava etkisine karşı özel bakım","7/24 acil servis","1 yıl garanti"],
  },
  kocaali: {
    eta: "~55 dk",
    neighborhoods: ["Akçakese","Alifuatpaşa","Ballıca","Çaltı","Çelik","Değirmendere","Geyik","Hüseyinli","Karaçay","Kayışlar","Kerpe","Kocaali Merkez","Kumkışlak","Ortaköy","Pazar","Sarıyar","Sultanlı","Tığcılar"],
    services: [
      { icon: Wrench,    title: "Kocaali Klima Servisi",    content: "Kocaali ilçesinde 7/24 klima arıza servisi. Sahil bölgesi konutları ve yazlıklara özel klima hizmetleri.", accent: "#EF4444" },
      { icon: Snowflake, title: "Periyodik Bakım",           content: "Özellikle yaz sezonu başında yapılan bakımlar sezon boyunca sorunsuz çalışma garantisi sağlar.", accent: "#0EA5E9" },
      { icon: Droplets,  title: "Gaz Dolumu",                content: "Kocaali bölgesinde R32 ve R410A gaz dolumu.", accent: "#8B5CF6" },
      { icon: Zap,       title: "Montaj Hizmetleri",         content: "Kocaali'de yazlık ve konutlara klima montajı.", accent: "#10B981" },
    ],
    whyUs: ["Kocaali'ye 55 dakikada ulaşım","Sahil konutları uzmanlığı","7/24 acil hat","1 yıl garanti"],
  },
  kaynarca: {
    eta: "~60 dk",
    neighborhoods: ["Adatepe","Akçakese","Altıntaş","Aşağı Kızılca","Beşpınar","Büyük Kızılca","Çakıllar","Duralıbey","Göktepe","Güneşli","Kadıköy","Kaynarca Merkez","Kılçık","Kocagöl","Kuzucu","Taşburun"],
    services: [
      { icon: Wrench,    title: "Kaynarca Klima Teknik Servisi", content: "Kaynarca ilçesinde klima arıza, bakım ve montaj hizmetleri.", accent: "#EF4444" },
      { icon: Snowflake, title: "Klima Bakımı",                   content: "Kaynarca'da yıllık klima bakımı için bizi arayın.", accent: "#0EA5E9" },
      { icon: Droplets,  title: "Gaz Dolumu",                     content: "R32 ve R410A gaz dolumu için Kaynarca'ya servis veriyoruz.", accent: "#8B5CF6" },
      { icon: Zap,       title: "Klima Montajı",                  content: "Kaynarca'da konut ve işyerlerine klima montajı.", accent: "#10B981" },
    ],
    whyUs: ["Kaynarca'ya 60 dakikada ulaşım","7/24 acil hat","Orijinal yedek parça","1 yıl garanti"],
  },
  ferizli: {
    eta: "~30 dk",
    neighborhoods: ["Aziziye","Bağlar","Bayramoğlu","Çaybaşı","Doğancı","Ferizli Merkez","Göktepe","Hamidiye","Kadı","Kışla","Köybucağı","Nüzhetiye","Orhan","Osmaniye","Selimiye","Servi","Turpçular"],
    services: [
      { icon: Wrench,    title: "Ferizli Klima Teknik Servisi", content: "Ferizli'de klima arıza servisi ve bakım hizmetleri. Merkezden ~30 dakikada ulaşan ekibimiz aynı gün çözüm sunar.", accent: "#EF4444" },
      { icon: Snowflake, title: "Klima Bakım & Temizliği",      content: "Ferizli'de filtre temizliği ve periyodik bakım için randevu alabilirsiniz.", accent: "#0EA5E9" },
      { icon: Droplets,  title: "Gaz Dolumu",                   content: "Ferizli bölgesinde R32 ve R410A gaz dolumu hizmetleri.", accent: "#8B5CF6" },
      { icon: Zap,       title: "Klima Montajı",                 content: "Ferizli'de yeni klima kurulumu için bizi arayın, aynı gün montaj imkânı.", accent: "#10B981" },
    ],
    whyUs: ["Ferizli'ye 30 dakikada ulaşım","Aynı gün servis","7/24 acil hat","1 yıl garanti"],
  },
  sogutlu: {
    eta: "~28 dk",
    neighborhoods: ["Ballıhisar","Çakmaklı","Çeltikçi","Dağkadı","Dikilitaş","Erenler","Güney","Hamidiye","Kayabaşı","Kızılcaören","Söğütlü Merkez","Yenice"],
    services: [
      { icon: Wrench,    title: "Söğütlü Klima Servisi",  content: "Söğütlü'de klima arıza ve bakım servisi. Merkezden ~28 dakikada en hızlı çözümü sunarız.", accent: "#EF4444" },
      { icon: Snowflake, title: "Klima Bakımı",            content: "Söğütlü'de sezonal klima bakımı için randevu alın.", accent: "#0EA5E9" },
      { icon: Droplets,  title: "Gaz Dolumu",              content: "Söğütlü'de R32 ve R410A gaz dolumu.", accent: "#8B5CF6" },
      { icon: Zap,       title: "Klima Montajı",           content: "Söğütlü'de konut ve işyerlerine klima montajı.", accent: "#10B981" },
    ],
    whyUs: ["Söğütlü'ye 28 dakikada ulaşım","7/24 acil hat","Orijinal yedek parça","1 yıl garanti"],
  },
  geyve: {
    eta: "~55 dk",
    neighborhoods: ["Ağaçlı","Aydınpınar","Çark","Dağkadı","Derbent","Doğançay","Geyve Merkez","Güneşli","Hamidiye","Hisarköy","İhsaniye","Kavaklı","Kızılcaören","Mahmudiye","Nüzhetiye","Pazar","Sarıyer","Taşburun","Yenice"],
    services: [
      { icon: Wrench,    title: "Geyve Klima Teknik Servisi", content: "Geyve ilçesinde klima arıza servisi ve bakım. Dağlık coğrafyasıyla Geyve'nin tüm mahallelerine mobil servis aracımızla ulaşıyoruz.", accent: "#EF4444" },
      { icon: Snowflake, title: "Periyodik Bakım",             content: "Geyve'de klima bakımı için randevu alın. Kış öncesi ısıtma kontrolleri dahildir.", accent: "#0EA5E9" },
      { icon: Droplets,  title: "Gaz Dolumu",                  content: "Geyve bölgesinde R32 ve R410A gaz dolumu.", accent: "#8B5CF6" },
      { icon: Zap,       title: "Klima Montajı",               content: "Geyve'de yeni klima kurulumu için bizi arayın.", accent: "#10B981" },
    ],
    whyUs: ["Geyve'nin tüm mahallelerine servis","7/24 acil hat","Dağlık arazi deneyimi","1 yıl garanti"],
  },
  pamukova: {
    eta: "~50 dk",
    neighborhoods: ["Ahmediye","Akmeşe","Alpagut","Bektaşlı","Çifteler","Çifte Köprü","Dağkadı","Doğançay","Erikli","Göktepe","Güneşli","Hürriyet","Kazımiye","Kuşça","Kutluca","Mahmudiye","Pamukova Merkez","Selimiye","Sultandere","Yenice"],
    services: [
      { icon: Wrench,    title: "Pamukova Klima Servisi",  content: "Pamukova ilçesinde klima arıza servisi, bakım ve montaj hizmetleri.", accent: "#EF4444" },
      { icon: Snowflake, title: "Klima Bakımı",             content: "Pamukova'da klima bakımı için randevu alabilirsiniz. Konut ve tarımsal işletmeler için servis.", accent: "#0EA5E9" },
      { icon: Droplets,  title: "Gaz Dolumu",               content: "Pamukova'da R32 ve R410A gaz dolumu.", accent: "#8B5CF6" },
      { icon: Zap,       title: "Klima Montajı",            content: "Pamukova ilçesinde klima montajı için randevu alın.", accent: "#10B981" },
    ],
    whyUs: ["Pamukova'ya 50 dakikada ulaşım","7/24 acil hat","Tarım bölgesi deneyimi","1 yıl garanti"],
  },
  tarakli: {
    eta: "~70 dk",
    neighborhoods: ["Beypınar","Boyalıca","Çeltikdere","Dere","Deydinler","Eğrikaya","Gökçedere","Hacıyakup","Hamidiye","Kaymakam","Kılıçlı","Kırantepe","Köprübaşı","Kuzluca","Mahmudiye","Ortaca","Sarıbeyler","Taraklı Merkez","Yalnızçam","Yeşilova"],
    services: [
      { icon: Wrench,    title: "Taraklı Klima Teknik Servisi", content: "Sakarya'nın tarihi ilçesi Taraklı'da klima arıza servisi ve bakım. Tüm köy ve mahallelere ulaşan mobil ekibimizle hizmetinizdeyiz.", accent: "#EF4444" },
      { icon: Snowflake, title: "Klima Bakımı",                  content: "Taraklı'da klima bakımı için randevu alabilirsiniz.", accent: "#0EA5E9" },
      { icon: Droplets,  title: "Gaz Dolumu",                    content: "Taraklı'da R32 ve R410A gaz dolumu.", accent: "#8B5CF6" },
      { icon: Zap,       title: "Klima Montajı",                 content: "Taraklı'da konut ve işyerlerine klima montajı.", accent: "#10B981" },
    ],
    whyUs: ["Taraklı'nın tüm köylerine servis","7/24 acil hat","Tarihi yapı deneyimi","1 yıl garanti"],
  },
  akyazi: {
    eta: "~40 dk",
    neighborhoods: ["Ağaçlı","Aksu","Balcı","Beşköprü","Çay","Çukurhisar","Dağdibi","Değirmendere","Doğançay","Duman","Erikli","Fevziye","Göktepe","Güneşli","Hamidiye","Işıklar","Kadıköy","Karaburun","Kavaklı","Kuyumcu","Mahmudiye","Nüzhetiye","Ortaköy","Pazar","Selimiye","Sultanlı","Taşburun","Yenice"],
    services: [
      { icon: Wrench,    title: "Akyazı Klima Arıza Servisi",   content: "Akyazı ilçesinde klima arıza tespiti ve onarım. Merkezden ~40 dakikada ulaşan ekibimiz aynı gün çözüm sağlar.", accent: "#EF4444" },
      { icon: Snowflake, title: "Periyodik Bakım Hizmeti",        content: "Akyazı'da tarımsal işletmeler ve konutlar için özel bakım planları oluşturuyoruz.", accent: "#0EA5E9" },
      { icon: Droplets,  title: "Gaz Dolumu",                    content: "Akyazı'da R32 ve R410A gaz dolumu ve sızdırmazlık testi.", accent: "#8B5CF6" },
      { icon: Zap,       title: "Klima Montajı",                 content: "Akyazı'da tüm mahalle ve bağlı köylere klima montajı.", accent: "#10B981" },
    ],
    whyUs: ["Akyazı'nın tüm mahallelerine servis","7/24 acil hat","Tarım & konut uzmanlığı","1 yıl garanti"],
  },
  karapurcek: {
    eta: "~35 dk",
    neighborhoods: ["Bahçeköy","Bağlarbaşı","Bekirler","Boyalıca","Çaltı","Çeltikçi","Dağkadı","Dikmen","Düzköy","Güneşli","Hamidiye","Karapürçek Merkez","Kavaklı","Kızılcaören","Köprübaşı","Mahmudiye","Sarıyer","Selimiye","Yenice"],
    services: [
      { icon: Wrench,    title: "Karapürçek Klima Teknik Servisi", content: "Karapürçek ilçesinde klima arıza servisi ve bakım. Adapazarı merkezinden ~35 dakikada ulaşan ekibimizle hızlı çözüm.", accent: "#EF4444" },
      { icon: Snowflake, title: "Klima Bakımı",                     content: "Karapürçek'te sezonal klima bakımı ve filtre temizliği için randevu alın.", accent: "#0EA5E9" },
      { icon: Droplets,  title: "Gaz Dolumu",                       content: "Karapürçek'te R32 ve R410A gaz dolumu.", accent: "#8B5CF6" },
      { icon: Zap,       title: "Klima Montajı",                    content: "Karapürçek'te konut ve işyerlerine klima montajı için bizi arayın.", accent: "#10B981" },
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
    { q: `${locativeName} klima servisi kaç saat içinde gelir?`, a: `Adapazarı merkezimizden ${db.eta} içinde ${locativeName} ulaşan mobil teknik ekibimiz 7/24 hizmet vermektedir. Acil durumlarda öncelikli yönlendirme yapılmaktadır.` },
    { q: `${districtName}'da hangi klima markaları için servis veriyorsunuz?`, a: "Daikin, Mitsubishi Electric, Samsung, LG, Arçelik, Bosch, Vestel, Gree, Midea, Toshiba, Fujitsu, Panasonic dahil tüm marka ve modellerde yetkili servis düzeyinde hizmet veriyoruz." },
    { q: `Klima gaz dolumu ${locativeName} ne kadar sürer?`, a: "Gaz dolumu işlemi ortalama 45-90 dakika sürmektedir. Sızdırmazlık testi, tahliye ve tam şarj dahil tüm işlemler tek seferde tamamlanır." },
    { q: `${districtName}'da klima bakımı ücreti nedir?`, a: "Klima bakım ücreti cihazın tipi, markası ve yapılacak işlem kapsamına göre değişmektedir. Keşif ziyareti ücretsizdir, yerinde kontrol sonrası net fiyat verilir." },
    { q: `${locativeName} klima montajı için ne kadar önceden randevu alınmalı?`, a: "Randevu 1-2 iş günü öncesinden alınması yeterlidir. Yoğun sezonlarda (Mayıs–Eylül) daha erken rezervasyon önerilir." },
  ];

  /* ─── Informative text sections ─── */
  const INFO_SECTIONS = [
    {
      step: "01",
      title: `${districtName} İklimlendirme & Klima Kullanım Rehberi`,
      icon: Thermometer,
      accent: "#0EA5E9",
      content: `${districtName} ilçesinde yaz aylarında yaşanan nemli sıcaklar ve kış aylarındaki sert soğuklar, iklimlendirme sistemlerinin düzenli çalışmasını kritik hale getirmektedir. Doğru BTU kapasitesi seçilmeyen veya filtresi tıkanmış klimalar kompresörü aşırı zorlayarak %40'a varan fazla elektrik tüketir. ${locativeName} uzman teknik ekibimiz, mekanınızın metrekare, cephe ve izolasyon değerlerine göre en yüksek verimlilik sağlayacak klima kullanım tavsiyelerini sunmaktadır.`
    },
    {
      step: "02",
      title: `${locativeName} Yerinde Adım Adım Klima Servis Süreci`,
      icon: FileText,
      accent: "#10B981",
      content: `Servis talebiniz oluşturulduğu andan itibaren mobil aracımız ${districtName} sınırlarına ortalama ${db.eta} süre içinde ulaşır. 1. Dijital ölçüm cihazlarıyla arıza ve gaz seviyesi tespiti -> 2. Şeffaf fiyat ve işlem bilgilendirmesi -> 3. Orijinal yedek parça ve antibakteriyel ilaçlama ile onarım -> 4. 1 Yıl İşçilik Garantili servis belgesinin teslimi.`
    },
    {
      step: "03",
      title: "Antibakteriyel İlaçlı Bakım ve Hijyen Standartları",
      icon: Snowflake,
      accent: "#8B5CF6",
      content: "Bakımsız klimaların evaporatör serpantinlerinde biriken toz, küf ve mantarlar lejyoner hastalığı gibi solunum yolu rahatsızlıklarına davetiye çıkarır. Sakarya Uzman Klima olarak periyodik bakımlarda yalnızca TSE onaylı antibakteriyel dezenfektan ilaçlar kullanır, iç ünitenin filtre, drenaj tavası ve fan çarkını ilk günkü hijyen seviyesine getiririz."
    },
    {
      step: "04",
      title: "Sık Karşılaşılan Arızalar ve Çözüm Yöntemlerimiz",
      icon: AlertCircle,
      accent: "#F59E0B",
      content: "Klimanızın su akıtması (tıkalı drenaj borusu veya gaz eksikliği), üfleyip soğutmaması (kondanser kirliliği, R32/R410A gaz kaçağı), kötü koku yayması veya sinyal ışıklarının yanıp sönmesi gibi durumlarda yetkin teknisyenlerimiz yerinde tam teşekküllü müdahale ederek cihazınızı güvenle yeniden devreye alır."
    },
    {
      step: "05",
      title: `${districtName} Garantili Yedek Parça & Teknik Güvence`,
      icon: ShieldCheck,
      accent: "#EC4899",
      content: `${locativeName} gerçekleştirilen kompresör, fan motoru, ana kart, 4 yollu vana ve sensör değişimlerinin tamamında %100 orijinal yedek parçalar kullanılır. Yapılan tüm tamir ve bakım işlemleri Sakarya Uzman Klima tarafından 1 Yıl İşçilik ve Parça Garanti Belgesi ile kayıt altına alınmaktadır.`
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-[#1E293B]">
      <title>{`${districtName} Klima Servisi | 7/24 Bakım, Montaj & Tamir`}</title>
      <meta name="description" content={`${districtName} ilçesinde her marka klima için 7/24 acil servis, periyodik bakım, R32/R410A gaz dolumu ve montaj hizmetleri.`} />

      {/* ━━━ HERO ━━━ */}
      <section className="relative pt-36 pb-28 md:pt-40 bg-[#0F172A] text-white overflow-hidden">
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
                className="font-black text-white uppercase leading-none text-4xl sm:text-5xl md:text-6xl tracking-tight"
              >
                {districtName}<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0EA5E9] to-[#38BDF8]">
                  Klima Servisi
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-gray-300 font-semibold text-sm leading-relaxed max-w-xl"
              >
                {locativeName} 7/24 acil klima arıza tamiri, periyodik bakım, R32/R410A gaz dolumu
                ve klima montajı hizmetleri. Merkezden <span className="text-[#0EA5E9] font-black">{db.eta}</span> ulaşıyoruz.
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

      {/* ━━━ HİZMETLER ━━━ */}
      <section className="max-w-[1300px] mx-auto px-6 md:px-10 py-20">
        <div className="text-center mb-12">
          <span className="text-[#0EA5E9] font-black text-xs uppercase tracking-widest block mb-2">Hizmetlerimiz</span>
          <h2 className="font-black text-gray-900 text-2xl md:text-4xl uppercase tracking-tight">
            {districtName}'da Klima Hizmetleri
          </h2>
          <div className="w-12 h-1.5 bg-[#0EA5E9] mx-auto rounded-full mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
              {districtName} Klima Servis & Hizmet Detayları
            </h2>
            <div className="w-16 h-1.5 bg-[#0EA5E9] mx-auto rounded-full mt-4" />
            <p className="text-gray-500 font-semibold text-xs sm:text-sm mt-4 leading-relaxed">
              {locativeName} klima bakımı, arıza teşhisi, gaz şarjı ve montaj süreçlerinde sunduğumuz kalite standartları.
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
                {districtName} Mahallelerinde<br />Klima Servisi
              </h2>
              <div className="w-12 h-1.5 bg-[#0EA5E9] rounded-full" />
              <p className="text-gray-500 font-semibold text-sm leading-relaxed">
                {locativeName} tüm mahallelere aynı gün hızlı servis garantisi veriyoruz.
                Detaylı mahalle klima servis sayfasına gitmek için aşağıdaki mahalle adına tıklayabilirsiniz.
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
                <span className="text-[#0EA5E9]">Klima Servisi Seçimi</span>
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
                  { label: "Tüm Markalar", val: "Daikin, Samsung, LG +" },
                  { label: "Garanti", val: "1 Yıl İşçilik" },
                  { label: "Acil Servis", val: "7/24 Hizmet" },
                  { label: "Enerji Sınıfı", val: "A+++ Uzmanı" },
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
                <h3 className="font-black text-gray-900 text-base uppercase tracking-tight">{districtName} Servis Talebi</h3>
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
                      {["Klima Arıza Tamiri","Periyodik Bakım","Gaz Dolumu","Klima Montajı","Klima Söküm","Filtre Temizliği","Fiyat Teklifi"].map(s => <option key={s} value={s}>{s}</option>)}
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
            <h2 className="font-black text-gray-900 text-2xl md:text-3xl uppercase tracking-tight">{districtName} Klima Servisi SSS</h2>
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
            {districtName}'da Klima Problemi mi?
          </h3>
          <p className="text-gray-300 font-semibold text-sm leading-relaxed mb-8 max-w-xl mx-auto">
            {locativeName} 7/24 hizmet veren uzman teknik ekibimizi hemen arayın.
            Aynı gün müdahale, 1 yıl işçilik garantisi.
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
