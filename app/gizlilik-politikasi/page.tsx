import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Lock, Eye, FileText, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Gizlilik Politikası | Sakarya Uzman Klima İklimlendirme",
  description: "Sakarya Uzman Klima İklimlendirme Servisi Gizlilik Politikası ve Kişisel Verilerin Korunması Taahhüdü.",
};

export default function GizlilikPolitikasi() {
  return (
    <div className="bg-[#F8F9FA] min-h-screen text-gray-700 py-24 md:py-36 relative overflow-hidden font-sans pt-[134px]">
      
      {/* Decorative Blobs */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#0EA5E9]/10 via-transparent to-transparent pointer-events-none -z-10" />
      <div className="absolute top-[25%] left-[-15%] w-[600px] h-[600px] bg-[#0EA5E9]/5 blur-[140px] rounded-full pointer-events-none -z-10 animate-organic-blob" />

      <section className="max-w-[1200px] mx-auto px-6 md:px-10 relative z-10">
        
        {/* Navigation & Badge */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#0EA5E9] font-black text-xs tracking-widest uppercase transition-all duration-300">
            <ArrowLeft className="w-4 h-4" /> Ana Sayfaya Dön
          </Link>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 text-xs font-black text-[#0EA5E9] uppercase tracking-wider shadow-xs">
            Veri Güvenliği & Gizlilik
          </div>
        </div>

        {/* Header Card */}
        <div className="flex items-center gap-6 mb-12 bg-white border border-gray-200/60 p-8 rounded-[36px] shadow-sm relative overflow-hidden">
          <div className="w-16 h-16 rounded-2xl bg-[#0EA5E9]/10 border border-[#0EA5E9]/20 text-[#0EA5E9] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-9 h-9" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 uppercase tracking-tight leading-none">
              Gizlilik Politikası
            </h1>
            <p className="text-gray-500 font-bold text-xs sm:text-sm mt-2.5">
              Sakarya Uzman Klima İklimlendirme Servisi Kişisel Veri Güvenliği Standardı
            </p>
          </div>
        </div>

        {/* Content Box */}
        <div className="bg-white border border-gray-200/60 p-8 md:p-14 rounded-[40px] shadow-sm space-y-8">
          <div className="prose max-w-none text-gray-600 space-y-6 leading-relaxed text-sm sm:text-base font-medium">
            <p className="text-gray-900 font-bold text-base leading-relaxed">
              Sakarya Uzman Klima İklimlendirme Servisi (&ldquo;Sakarya Uzman Klima&rdquo;) olarak, web sitemizi ziyaret eden müşterilerimizin ve hizmet alan kullanıcılarımızın gizliliğine büyük önem vermekteyiz. Bu Gizlilik Politikası, web sitemizi ziyaret ettiğinizde toplanan verilerin türlerini, kullanım amaçlarını ve haklarınızı açıklamaktadır.
            </p>

            <div className="border-t border-gray-100 pt-6 space-y-4">
              <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight flex items-center gap-2">
                <Lock className="w-5 h-5 text-[#0EA5E9]" />
                1. Toplanan Bilgiler ve Veri İşleme Amacı
              </h2>
              <p>
                İletişim, Keşif Talebi veya Servis İste formlarımızı doldurduğunuzda; Adınız, Soyadınız, Telefon Numaranız, E-posta adresiniz, Bulunduğunuz İlçe/Mahalle bilgisi ve İletmek istediğiniz mesaj içeriği toplanmaktadır.
              </p>
              <p>
                Bu bilgiler yalnızca:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Acil servis talebinize 7/24 hızlı geri dönüş sağlamak,</li>
                <li>Klima montajı, bakımı veya arıza tespiti için ekibimizi doğru adrese yönlendirmek,</li>
                <li>Fiyat tekliflerinizi hazırlamak ve servis sonrası garanti takibini yapmak</li>
              </ul>
              <p>amaçlarıyla işlenmektedir.</p>
            </div>

            <div className="border-t border-gray-100 pt-6 space-y-4">
              <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight flex items-center gap-2">
                <Eye className="w-5 h-5 text-[#0EA5E9]" />
                2. Üçüncü Şahıslarla Veri Paylaşımı
              </h2>
              <p>
                Toplanan kişisel bilgileriniz hiçbir şart altında üçüncü taraf kişi, kurum veya ticari şirketlere satılmaz, kiralanmaz ve reklam amaçlı aktarılmaz. Bilgileriniz yalnızca resmi yasal zorunluluklar gerektirdiğinde yetkili kamu kurumlarıyla paylaşılabilir.
              </p>
            </div>

            <div className="border-t border-gray-100 pt-6 space-y-4">
              <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#0EA5E9]" />
                3. Çerezler (Cookies) ve Analitik
              </h2>
              <p>
                Web sitemizde kullanıcı deneyimini iyileştirmek, site trafiğini analiz etmek ve performans optimizasyonu yapmak amacıyla temel düzeyde teknik çerezler kullanılmaktadır. Dilerseniz tarayıcı ayarlarınızdan çerez kullanımını kısıtlayabilir veya engelleyebilirsiniz.
              </p>
            </div>

            <div className="border-t border-gray-100 pt-6 space-y-4">
              <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#0EA5E9]" />
                4. Veri Güvenliği ve Haklarınız
              </h2>
              <p>
                Verilerinizin yetkisiz erişim, kayıp veya suiistimale karşı korunması için modern şifreleme ve güvenlik protokolleri uygulanmaktadır. Kişisel verilerinizin silinmesini, güncellenmesini veya bilgi verilmesini talep etmek için dilediğiniz zaman bizimle iletişime geçebilirsiniz.
              </p>
            </div>
          </div>

          {/* Contact Box */}
          <div className="bg-gray-50 border border-gray-150 p-8 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 pt-6">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="font-black text-gray-950 text-base uppercase tracking-tight">Gizlilik Sorularınız İçin</h4>
              <p className="text-gray-400 text-xs font-semibold">Tüm veri güvenliği sorularınız için e-posta gönderebilirsiniz.</p>
            </div>
            <a
              href="mailto:info@demo.com"
              className="flex items-center justify-center gap-2 px-6 py-4 bg-[#0EA5E9] hover:bg-[#0284C7] text-white transition-colors rounded-2xl font-black text-xs tracking-wider cursor-pointer shadow-md shadow-sky-500/10"
            >
              <Mail className="w-4.5 h-4.5" /> info@demo.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
