"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, ChevronDown, HelpCircle } from "lucide-react";

interface Post {
  slug: string;
  title: string;
  category: string;
}

export interface FAQ {
  q: string;
  a: string;
}

const STATIC_POSTS: Post[] = [
  {
    slug: "jenerator-neden-hararet-yapar",
    title: "Jeneratör Neden Hararet Yapar? Belirtileri ve Çözüm Yolları",
    category: "Jeneratör Bakımı",
  },
  {
    slug: "jenerator-yakit-sistemi-arizalari",
    title: "Jeneratör Hava Yapması ve Kalitesiz Yakıt İkmali Arızaları",
    category: "Yakıt Sistemleri",
  },
  {
    slug: "jenerator-arizalari-nelerdir",
    title: "Sık Karşılaşılan Jeneratör Arızaları ve Çözümleri",
    category: "Arıza Giderme",
  },
  {
    slug: "ev-icin-jenerator-kac-kva-olmali",
    title: "Ev İçin Jeneratör Kaç kVA Olmalı? Ev Tipi Jeneratör Seçimi",
    category: "Güç Hesabı",
  },
  {
    slug: "jenerator-yag-bakimi-nasil-yapilir",
    title: "Jeneratör Yağ Bakımı Nasıl Yapılır? Adım Adım Rehber",
    category: "Jeneratör Bakımı",
  },
  {
    slug: "kac-kva-jenerator-gerekir-dogru-jenerator-gucu-nasil-hesaplanir",
    title: "Doğru Jeneratör Gücü Nasıl Hesaplanır? Kaç kVA Jeneratör Gerekir?",
    category: "Güç Hesabı",
  }
];

const DEFAULT_FAQS: FAQ[] = [
  {
    q: "Jeneratör bakımı ne sıklıkla yapılmalıdır?",
    a: "Jeneratörlerin sorunsuz çalışması için haftalık boşta çalıştırma testi, aylık genel kontroller ve yılda en az bir kez detaylı periyodik motor-alternatör bakımı yapılmalıdır."
  },
  {
    q: "Ev tipi jeneratör seçiminde nelere dikkat edilmelidir?",
    a: "Evinizdeki aktif cihazların toplam gücü (kW) ve demeraj akımları (buzdolabı, klima vb.) hesaplanarak, %20 emniyet payı ile standart bir kVA gücü seçilmelidir."
  },
  {
    q: "Kiralık jeneratör hizmetiniz neleri kapsıyor?",
    a: "İhtiyacınıza uygun güçteki jeneratörü yerinde keşiften nakliye, kablolama, montaj ve 7/24 operatör/servis desteğine kadar uçtan uca teslim ediyoruz."
  },
  {
    q: "Jeneratörün hava yapması ne anlama gelir?",
    a: "Yakıt bitmesi veya yakıt filtre değişimi sonrasında sisteme giren hava motorun çalışmasını engeller. Bu durumda yakıt hattının havası uzman ekiplerce alınmalıdır."
  }
];

function FaqAccordion({ faqs }: { faqs: FAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <div className="bg-white rounded-[28px] p-6 border border-gray-150 space-y-4 shadow-xs">
      <h3 className="font-extrabold text-xs uppercase tracking-wider text-gray-950 flex items-center gap-2">
        <HelpCircle className="w-4.5 h-4.5 text-[#E6B800]" />
        Sıkça Sorulan Sorular
      </h3>
      <div className="flex flex-col gap-2.5">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              className="rounded-2xl border border-gray-150 bg-gray-50 overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left text-xs font-black text-gray-800 hover:text-[#E6B800] transition-colors cursor-pointer"
              >
                <span className="leading-snug">{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 shrink-0 transition-transform text-[#E6B800] ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isOpen && (
                <div className="px-4 pb-4 text-xs text-gray-500 font-semibold leading-relaxed border-t border-gray-150/50 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function BlogSidebar({
  currentCategory,
  currentSlug,
  faqs,
}: {
  currentCategory: string;
  currentSlug: string;
  faqs?: FAQ[];
}) {
  const [posts, setPosts] = useState<Post[]>(STATIC_POSTS);

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          interface ApiPost {
            slug: string;
            title: string;
            category?: string;
            date?: string;
          }
          const nowStr = new Date().toISOString().split('T')[0];
          const activeData = data.filter((p: ApiPost) => !p.date || p.date <= nowStr);

          const formatted = activeData.map((p: ApiPost) => ({
            slug: p.slug,
            title: p.title,
            category: p.category || "Genel"
          }));
          const combined = [...formatted];
          STATIC_POSTS.forEach((sp) => {
            if (!combined.some((c) => c.slug === sp.slug)) {
              combined.push(sp);
            }
          });
          setPosts(combined);
        }
      })
      .catch(() => {});
  }, []);

  const relatedPosts = useMemo(() => {
    let matched = posts.filter(
      (p) => p.category.toLowerCase() === currentCategory.toLowerCase() && p.slug !== currentSlug
    );
    if (matched.length < 3) {
      const extra = posts.filter(
        (p) => p.category.toLowerCase() !== currentCategory.toLowerCase() && p.slug !== currentSlug
      );
      matched = [...matched, ...extra];
    }
    return matched.slice(0, 3);
  }, [posts, currentCategory, currentSlug]);

  const activeFaqs = faqs && faqs.length > 0 ? faqs : DEFAULT_FAQS;

  return (
    <div className="space-y-6">
      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="bg-white rounded-[28px] p-6 border border-gray-150 space-y-4 shadow-xs">
          <h3 className="font-extrabold text-xs uppercase tracking-wider text-gray-950 flex items-center gap-2">
            <BookOpen className="w-4.5 h-4.5 text-[#E6B800]" />
            Dikkatini Çekebilecek Diğer Bilgiler
          </h3>
          <div className="flex flex-col gap-2.5">
            {relatedPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="flex items-start justify-between gap-3 p-4 rounded-2xl bg-gray-50 border border-gray-150 hover:border-[#FFCC00] hover:bg-white transition-all text-xs font-bold text-gray-600 hover:text-[#E6B800] group"
              >
                <span className="line-clamp-2 leading-relaxed">{post.title}</span>
                <ArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1 mt-0.5 text-[#E6B800]" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* FAQ Section */}
      {activeFaqs && activeFaqs.length > 0 && <FaqAccordion faqs={activeFaqs} />}
    </div>
  );
}
