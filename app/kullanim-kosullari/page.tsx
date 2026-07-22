import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileText, CheckCircle2, ShieldAlert, Phone, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Kullanım Koşulları | Sakarya Uzman Klima İklimlendirme",
  description: "Sakarya Uzman Klima İklimlendirme Servisi Web Sitesi Kullanım Koşulları ve Yasal Uyarılar.",
};

export default function KullanimKosullari() {
  return (
    <div className="bg-[#F8F9FA] min-h-screen text-gray-700 py-24 md:py-36 relative overflow-hidden font-sans pt-[134px]">
      
      {/* Decorative Blobs */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#0EA5E9]/10 via-transparent to-transparent pointer-events-none -z-10" />
      <div className="absolute top-[25%] right-[-15%] w-[600px] h-[600px] bg-[#0EA5E9]/5 blur-[140px] rounded-full pointer-events-none -z-10 animate-organic-blob" />

      <section className="max-w-[1200px] mx-auto px-6 md:px-10 relative z-10">
        
        {/* Navigation & Badge */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#0EA5E9] font-black text-xs tracking-widest uppercase transition-all duration-300">
            <ArrowLeft className="w-4 h-4" /> Ana Sayfaya Dön
          </Link>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 text-xs font-black text-[#0EA5E9] uppercase tracking-wider shadow-xs">
            Yasal Şartlar & Kullanım
          </div>
        </div>

        {/* Header Card */}
        <div className="flex items-center gap-6 mb-12 bg-white border border-gray-200/60 p-8 rounded-[36px] shadow-sm relative overflow-hidden">
          <div className="w-16 h-16 rounded-2xl bg-[#0EA5E9]/10 border border-[#0EA5E9]/20 text-[#0EA5E9] flex items-center justify-center shrink-0">
            <FileText className="w-9 h-9" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 uppercase tracking-tight leading-none">
              Kullanım Koşulları
            </h1>
            <p className="text-gray-500 font-bold text-xs sm:text-sm mt-2.5">
              Sakarya Uzman Klima İklimlendirme Servisi Web Sitesi Kullanım Kuralları
            </p>
          </div>
        </div>

        {/* Content Box */}
        <div className="bg-white border border-gray-200/60 p-8 md:p-14 rounded-[40px] shadow-sm space-y-8">
          <div className="prose max-w-none text-gray-600 space-y-6 leading-relaxed text-sm sm:text-base font-medium">
            <p className="text-gray-900 font-bold text-base leading-relaxed">
              Bu internet sitesini (sakaryaklimaservisi.demo) ziyaret ederek, site üzerindeki servis talep formlarını doldurarak veya çağrı merkezimizle iletişime geçerek aşağıdaki kullanım koşullarını kabul etmiş sayılmaktasınız.
            </p>

            <div className="border-t border-gray-100 pt-6 space-y-4">
              <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#0EA5E9]" />
                1. Hizmet Kapsamı ve Genel Bilgiler
              </h2>
              <p>
                Sakarya Uzman Klima İklimlendirme Servisi; Adapazarı, Serdivan, Sapanca, Hendek ve tüm Sakarya ilçelerinde split, kaset, salon ve VRF tipi klimalar için montaj, periyodik bakım, arıza tamiri, yedek parça ve R32/R410A gaz dolumu hizmetleri sunan bağımsız özel teknik servis sağlayıcısıdır.
              </p>
            </div>

            <div className="border-t border-gray-100 pt-6 space-y-4">
              <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-[#0EA5E9]" />
                2. Fikri Mülkiyet ve Telif Hakları
              </h2>
              <p>
                Sitemizde yer alan grafikler, logo, arayüz tasarımı, metin içerikleri ve yazılı teknik rehberlerin tüm telif hakları Sakarya Uzman Klima&apos;ya aittir. İzin alınmaksızın kopyalanması, çoğaltılması veya diğer web sitelerinde yayınlanması yasaktır.
              </p>
            </div>

            <div className="border-t border-gray-100 pt-6 space-y-4">
              <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#0EA5E9]" />
                3. Sorumluluk Sınırları ve Garanti Şartları
              </h2>
              <p>
                Sitemizde yer alan bilgiler ve BTU hesaplama araçları genel bilgilendirme amacıyla sunulmaktadır. Yerinde teknik keşif yapılmadan verilen fiyat tahminleri kesin teklif niteliği taşımaz. İşlem gören tüm cihazlar onarım sonrasında düzenlenen teknik servis formuyla 1 Yıl İşçilik ve Parça Garantisi altındadır.
              </p>
            </div>

            <div className="border-t border-gray-100 pt-6 space-y-4">
              <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight flex items-center gap-2">
                <Phone className="w-5 h-5 text-[#0EA5E9]" />
                4. Şartlarda Değişiklik Hakkı
              </h2>
              <p>
                Sakarya Uzman Klima, işbu kullanım koşullarını, servis politikalarını ve web sitesindeki içerikleri önceden haber vermeksizin değiştirme hakkını saklı tutar.
              </p>
            </div>
          </div>

          {/* Contact Box */}
          <div className="bg-gray-50 border border-gray-150 p-8 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 pt-6">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="font-black text-gray-950 text-base uppercase tracking-tight">Destek & Bilgi Hattı</h4>
              <p className="text-gray-400 text-xs font-semibold">Servis şartları hakkında sorularınız için arayabilirsiniz.</p>
            </div>
            <a
              href="tel:08500000000"
              className="flex items-center justify-center gap-2 px-6 py-4 bg-[#0EA5E9] hover:bg-[#0284C7] text-white transition-colors rounded-2xl font-black text-xs tracking-wider cursor-pointer shadow-md shadow-sky-500/10"
            >
              <Phone className="w-4.5 h-4.5" /> 0850 000 00 00
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
