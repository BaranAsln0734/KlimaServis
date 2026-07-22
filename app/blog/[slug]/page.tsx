import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react';
import { notFound } from 'next/navigation';
import BlogSidebar from '@/components/BlogSidebar';
import { kvGet, isKvEnabled } from '@/lib/kv';

async function getPostBySlug(slug: string) {
  let posts: any[] = [];
  
  if (isKvEnabled()) {
    const cached = await kvGet('posts');
    if (cached && Array.isArray(cached)) {
      posts = cached;
    }
  }
  
  if (posts.length === 0) {
    const dataFilePath = path.join(process.cwd(), 'data', 'posts.json');
    if (fs.existsSync(dataFilePath)) {
      try {
        const fileData = fs.readFileSync(dataFilePath, 'utf8');
        posts = JSON.parse(fileData);
      } catch {
        posts = [];
      }
    }
  }

  return posts.find((p: any) => p.slug === slug) || null;
}

function renderVideo(videoUrl: string) {
  if (!videoUrl) return null;

  // Simple YouTube URL parsing
  let embedUrl = "";
  const ytMatch = videoUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
  if (ytMatch && ytMatch[1]) {
    embedUrl = `https://www.youtube.com/embed/${ytMatch[1]}`;
  }

  // Simple Vimeo URL parsing
  const vimeoMatch = videoUrl.match(/(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/i);
  if (vimeoMatch && vimeoMatch[1]) {
    embedUrl = `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  }

  if (embedUrl) {
    return (
      <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-sm border border-gray-100">
        <iframe
          src={embedUrl}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Blog Videosu"
        />
      </div>
    );
  }

  // Fallback to HTML5 video if it ends with video extensions
  const isDirectVideo = /\.(mp4|webm|ogg|mov)$/i.test(videoUrl);
  if (isDirectVideo) {
    return (
      <div className="relative w-full rounded-xl overflow-hidden shadow-sm border border-gray-100 bg-black">
        <video controls className="w-full max-h-[500px] object-contain">
          <source src={videoUrl} />
          Tarayıcınız video oynatmayı desteklemiyor.
        </video>
      </div>
    );
  }

  // Otherwise, render a nice external video link card
  return (
    <a
      href={videoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 p-4 rounded-xl border border-gray-250 bg-gray-50 hover:bg-gray-100 transition-colors text-xs font-black text-gray-700 uppercase tracking-wider"
    >
      <svg className="w-5 h-5 text-red-500 fill-current shrink-0" viewBox="0 0 24 24">
        <path d="M8 5v14l11-7z" />
      </svg>
      Videoyu Yeni Sekmede İzle
    </a>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const nowStr = new Date().toISOString().split('T')[0];
  const isScheduled = post && post.date && post.date > nowStr;
  if (!post || isScheduled) return {};

  const title = `${post.title} | Sakarya Uzman Klima İklimlendirme Servisi`;
  const description = post.excerpt || post.content.substring(0, 150) + "...";

  return {
    title,
    description,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.sakaryaklimaservisi.com/blog/${slug}`,
      images: [
        {
          url: post.imageUrl || 'https://www.akanenerji.com/wp-content/uploads/2025/09/TMG-Power-Jenerator-Servisi-Istanbul.jpg',
          alt: post.title,
        }
      ]
    }
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  const nowStr = new Date().toISOString().split('T')[0];
  const isScheduled = post && post.date && post.date > nowStr;

  if (!post || isScheduled) {
    notFound();
  }

  // Format date
  const formattedDate = post.date.split('-').reverse().join(' / ');

  return (
    <div className="bg-[#F8F9FA] min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Back button */}
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-gray-500 hover:text-[#FFCC00] font-bold uppercase tracking-wider text-xs mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Blog'a Dön
        </Link>

        {/* Header */}
        <header className="mb-12">
          <h1 className="text-3xl md:text-5xl font-black text-[#111111] uppercase tracking-tight leading-tight mb-6">
            {post.title}
          </h1>
          
          <div className="flex items-center gap-6 text-gray-500 font-bold uppercase tracking-wider text-xs border-b border-gray-200 pb-6">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#0EA5E9]" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-2">
              <User className="w-4 h-4 text-[#0EA5E9]" />
              {post.author}
            </span>
            <button className="flex items-center gap-2 ml-auto text-gray-400 hover:text-[#0EA5E9] transition-colors">
              <Share2 className="w-4 h-4" />
              Paylaş
            </button>
          </div>
        </header>

        {/* Grid Layout: Content + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main content column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Cover Image */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg">
              <Image 
                src={post.imageUrl} 
                alt={post.title} 
                fill 
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
              <div className="prose prose-lg max-w-none prose-headings:text-[#111111] prose-headings:font-black prose-headings:uppercase prose-a:text-[#0EA5E9] prose-img:rounded-xl text-gray-700 whitespace-pre-wrap leading-relaxed">
                {post.content}
              </div>
            </div>

            {/* Gallery Images */}
            {post.images && post.images.length > 0 && (
              <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                <h3 className="font-black text-xl text-gray-900 uppercase tracking-tight">Galeri / Görseller</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {post.images.map((imgUrl: string, index: number) => (
                    <div key={index} className="relative aspect-video rounded-xl overflow-hidden shadow-sm group border border-gray-100 hover:shadow-md transition-all duration-300">
                      <Image 
                        src={imgUrl} 
                        alt={`${post.title} Görsel - ${index + 1}`} 
                        fill 
                        className="object-cover group-hover:scale-103 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Video Section */}
            {post.videoUrl && (
              <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                <h3 className="font-black text-xl text-gray-900 uppercase tracking-tight">İlgili Video</h3>
                {renderVideo(post.videoUrl)}
              </div>
            )}
          </div>

          {/* Sidebar column */}
          <div className="lg:sticky lg:top-[160px] h-fit space-y-6">
            <BlogSidebar currentCategory={post.category || "Genel"} currentSlug={post.slug} />
          </div>
        </div>

      </div>
    </div>
  );
}
