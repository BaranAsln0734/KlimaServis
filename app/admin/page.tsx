"use client";

import { useState, useEffect } from "react";
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Cpu, 
  Trash2, 
  PlusCircle, 
  CheckCircle2, 
  Send, 
  Search,
  ImageIcon, 
  AlertCircle, 
  Phone, 
  Mail, 
  FileDown,
  FileSpreadsheet,
  Check,
  Archive,
  ArrowRight,
  ShieldAlert,
  MapPin,
  Pencil,
  X,
  Video
} from "lucide-react";
import Link from "next/link";

interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  imageUrl?: string;
  videoUrl?: string;
  images?: string[];
  author?: string;
  category?: string;
}

interface ServiceRequest {
  id: string;
  name: string;
  phone: string;
  email: string;
  serviceType: string;
  district: string;
  message: string;
  date: string;
  status: "Pending" | "Approved" | "Archived";
}

const INITIAL_REQUESTS: ServiceRequest[] = [
  {
    id: "req-1",
    name: "Ahmet Yılmaz (Adapazarı)",
    phone: "+90 532 111 22 33",
    email: "ahmet.yilmaz@gmail.com",
    serviceType: "Klima Periyodik Bakım",
    district: "Adapazarı",
    message: "Evimizdeki Daikin split klima için sezonsal ilaçlı bakım randevusu almak istiyoruz.",
    date: "2026-07-22",
    status: "Pending"
  },
  {
    id: "req-2",
    name: "Mehmet Demir (Serdivan)",
    phone: "+90 544 444 55 66",
    email: "mdemir@hotmail.com",
    serviceType: "Kombi Arıza Servisi",
    district: "Serdivan",
    message: "Kombimiz basınç düşürüyor ve petekler ısınmıyor, acil nöbetçi ekip yönlendirir misiniz?",
    date: "2026-07-21",
    status: "Approved"
  },
  {
    id: "req-3",
    name: "Selin Kaya (Sapanca)",
    phone: "+90 535 777 88 99",
    email: "info@kayatekstil.com",
    serviceType: "Çamaşır Makinesi Tamiri",
    district: "Sapanca",
    message: "Çamaşır makinemiz suyu tahliye etmiyor ve sıkmaya geçmiyor. Yerinde servis rica ederiz.",
    date: "2026-07-20",
    status: "Archived"
  }
];

const ENGINE_BRANDS = [
  { name: "Baudouin Motorlu Jeneratörler", tr: "/urunler?brand=baudouin", pdfTr: "https://www.tmgpower.com.tr/dosyalar/kataloglar/baudouin-katalog.pdf" },
  { name: "Perkins Motorlu Jeneratörler", tr: "/urunler?brand=perkins", pdfTr: "https://www.tmgpower.com.tr/dosyalar/kataloglar/perkins-katalog.pdf" },
  { name: "Ricardo Motorlu Jeneratörler", tr: "/urunler?brand=ricardo", pdfTr: "https://www.tmgpower.com.tr/dosyalar/kataloglar/ricardo-katalog.pdf" },
  { name: "Yangdong Motorlu Jeneratörler", tr: "/urunler?brand=yangdong", pdfTr: "https://www.tmgpower.com.tr/dosyalar/kataloglar/yangdong-katalog.pdf" },
  { name: "Lambert Motorlu Jeneratörler", tr: "/urunler?brand=lambert", pdfTr: "https://www.tmgpower.com.tr/dosyalar/kataloglar/lambert-katalog.pdf" }
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "blog" | "requests" | "files">("dashboard");
  
  // Vercel Live check state
  const [isLiveVercel, setIsLiveVercel] = useState(false);
  const [kvConnected, setKvConnected] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
      setIsLiveVercel(!isLocal);
    }

    fetch("/api/admin/status?t=" + Date.now(), { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.kvEnabled === "boolean") {
          setKvConnected(data.kvEnabled);
        }
      })
      .catch((err) => console.error("Error checking KV status:", err));
  }, []);

  // Auth states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");

  // Blog states
  const [posts, setPosts] = useState<Post[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [blogCategory, setBlogCategory] = useState("Genel");
  const [blogDate, setBlogDate] = useState(new Date().toISOString().split('T')[0]);

  // Edit states
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [editStatus, setEditStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [allPostsModal, setAllPostsModal] = useState<"published" | "scheduled" | null>(null);
  const [modalSearchQuery, setModalSearchQuery] = useState("");

  // File Editor States
  const [selectedFile, setSelectedFile] = useState("projects.ts");
  const [fileContent, setFileContent] = useState("");
  const [fileStatus, setFileStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [fileMessage, setFileMessage] = useState("");

  // Visual Editor states
  const [editMode, setEditMode] = useState<"visual" | "raw">("visual");
  const [parsedData, setParsedData] = useState<any>(null);
  const [selectedDistrict, setSelectedDistrict] = useState("arnavutkoy");
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [editingItemIndex, setEditingItemIndex] = useState<number | null>(null);
  const [projectStatusFilter, setProjectStatusFilter] = useState<"all" | "completed" | "ongoing">("all");

  const parseFileContent = (fileName: string, content: string) => {
    try {
      if (fileName.endsWith('.json')) {
        try {
          const parsed = JSON.parse(content);
          setParsedData(parsed);
        } catch {
          // Fallback to loose JS parser (handles trailing commas/comments/unquoted keys)
          const parsed = new Function(`return ${content};`)();
          setParsedData(parsed);
        }
      } else if (fileName.endsWith('.ts')) {
        const start = content.indexOf('[');
        const end = content.lastIndexOf(']');
        if (start !== -1 && end !== -1) {
          const jsArrayText = content.substring(start, end + 1);
          // Evaluate JavaScript array literal safely (ignores comments/quotes differences)
          const parsed = new Function(`return ${jsArrayText};`)();
          setParsedData(parsed);
        } else {
          setParsedData(null);
        }
      }
    } catch {
      setParsedData(null);
    }
  };

  const saveFileContentToServer = async (fileName: string, content: string) => {
    setFileStatus("loading");
    setFileMessage("");
    try {
      const res = await fetch("/api/admin/files", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName, content })
      });
      const data = await res.json();
      if (res.ok) {
        setFileStatus("success");
        setFileMessage(data.message || "Dosya başarıyla kaydedildi.");
        setTimeout(() => setFileStatus("idle"), 3000);
        return true;
      } else {
        setFileStatus("error");
        setFileMessage(data.error || "Dosya kaydedilirken hata oluştu.");
        return false;
      }
    } catch (err: any) {
      setFileStatus("error");
      setFileMessage(err.message || "Bağlantı hatası.");
      return false;
    }
  };

  const serializeParsedData = async (fileName: string, data: any) => {
    if (!data) return;
    
    let serialized = "";
    if (fileName === 'tmg_products.json' || fileName === 'districts_content.json' || fileName === 'tmg_pdf_links.json' || fileName === 'posts.json' || fileName === 'certificates.json' || fileName === 'partners.json') {
      serialized = JSON.stringify(data, null, 2);
    } else if (fileName === 'second_hand_generators.ts') {
      serialized = `export interface SecondHandGenerator {
  id: number;
  title: string;
  brand: string;
  power: string;
  engine: string;
  hours: string;
  year: string;
  status: string;
  image: string;
  desc: string;
}

export const SECOND_HAND_GENERATORS: SecondHandGenerator[] = ${JSON.stringify(data, null, 2)};
`;
    } else if (fileName === 'projects.ts') {
      serialized = `export interface Project {
  id: number;
  title: string;
  location: string;
  scope: string;
  description: string;
  category: "satis" | "kiralama" | "servis" | "yedek-parca";
  categoryLabel: string;
  technicalDetails: string;
  img: string;
  region: "marmara" | "ege" | "akdeniz" | "anadolu" | "yurtdisi";
  regionLabel: string;
  status: "completed" | "ongoing";
  showOnHomepage?: boolean;
}

export const PROJECTS: Project[] = ${JSON.stringify(data, null, 2)};
`;
    } else if (fileName === 'references.ts') {
      serialized = `export interface Reference {
  logo: string;
  name: string;
  category: "kamu-saglik" | "egitim" | "ozel";
  tag: string;
}

export const REFERENCES: Reference[] = ${JSON.stringify(data, null, 2)};
`;
    } else if (fileName === 'testimonials.ts') {
      serialized = `export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  initials: string;
  avatar: string;
}

export const TESTIMONIALS_DATA: Testimonial[] = ${JSON.stringify(data, null, 2)};
`;
    }

    setFileContent(serialized);
    await saveFileContentToServer(fileName, serialized);
  };

  const fetchFileContent = async (fileName: string) => {
    setFileStatus("loading");
    setFileMessage("");
    try {
      const res = await fetch(`/api/admin/files?file=${fileName}&t=${Date.now()}`, { cache: "no-store" });
      const data = await res.json();
      if (res.ok) {
        setFileContent(data.content);
        parseFileContent(fileName, data.content);
        setFileStatus("idle");
      } else {
        setFileStatus("error");
        setFileMessage(data.error || "Dosya yüklenirken hata oluştu.");
      }
    } catch (err: any) {
      setFileStatus("error");
      setFileMessage(err.message || "Bağlantı hatası.");
    }
  };

  const handleSaveFileContent = async () => {
    await saveFileContentToServer(selectedFile, fileContent);
  };

  useEffect(() => {
    if (activeTab === "files" && isAuthenticated) {
      fetchFileContent(selectedFile);
    }
  }, [activeTab, selectedFile, isAuthenticated]);

  const startAddVisualItem = () => {
    setEditingItemIndex(null);
    if (selectedFile === 'tmg_products.json') {
      setEditingItem({ id: "", category: "Dizel Jeneratörler", brand: "Perkins", model: "", engineModel: "", cylinders: "", prime: "", standby: "", type: "Endüstriyel", phase: "Trifaze (380/220V)" });
    } else if (selectedFile === 'second_hand_generators.ts') {
      const nextId = Array.isArray(parsedData) ? Math.max(0, ...parsedData.map((x: any) => x.id || 0)) + 1 : 1;
      setEditingItem({ id: nextId, title: "", brand: "", power: "", engine: "", hours: "", year: "", status: "", image: "", desc: "" });
    } else if (selectedFile === 'projects.ts') {
      const nextId = Array.isArray(parsedData) ? Math.max(0, ...parsedData.map((x: any) => x.id || 0)) + 1 : 1;
      setEditingItem({ id: nextId, title: "", location: "", scope: "", description: "", category: "servis", categoryLabel: "Jeneratör Servis", technicalDetails: "", img: "", region: "marmara", regionLabel: "Marmara Bölgesi", status: "completed", showOnHomepage: false });
    } else if (selectedFile === 'tmg_pdf_links.json') {
      setEditingItem({ modelKey: "", tr: "", en: "" });
    } else if (selectedFile === 'posts.json') {
      setEditingItem({ id: Date.now().toString(), slug: "", title: "", excerpt: "", content: "", date: new Date().toISOString().split('T')[0], imageUrl: "", author: "Akan Enerji", category: "Genel" });
    } else if (selectedFile === 'certificates.json') {
      const nextId = Array.isArray(parsedData) ? Math.max(0, ...parsedData.map((x: any) => x.id || 0)) + 1 : 1;
      setEditingItem({ id: nextId, title: "", desc: "", img: "" });
    } else if (selectedFile === 'partners.json') {
      setEditingItem({ name: "", logo: "" });
    } else if (selectedFile === 'references.ts') {
      setEditingItem({ logo: "", name: "", category: "ozel", tag: "" });
    } else if (selectedFile === 'testimonials.ts') {
      const nextId = Array.isArray(parsedData) ? Math.max(0, ...parsedData.map((x: any) => x.id || 0)) + 1 : 1;
      setEditingItem({ id: nextId, name: "", role: "Ev Sahibi", company: "", quote: "", rating: 5, initials: "", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop" });
    }
    setModalOpen(true);
  };

  const startEditVisualItem = (item: any, index: number) => {
    setEditingItemIndex(index);
    if (selectedFile === 'tmg_pdf_links.json') {
      setEditingItem({ modelKey: item[0], tr: item[1].tr || "", en: item[1].en || "" });
    } else {
      setEditingItem(JSON.parse(JSON.stringify(item)));
    }
    setModalOpen(true);
  };

  const deleteVisualItem = async (indexOrKey: any) => {
    if (!confirm("Bu içeriği silmek istediğinizden emin misiniz?")) return;
    
    let updatedData;
    if (selectedFile === 'tmg_pdf_links.json') {
      updatedData = { ...parsedData };
      delete updatedData[indexOrKey];
    } else {
      updatedData = [...parsedData];
      updatedData.splice(indexOrKey, 1);
    }
    
    setParsedData(updatedData);
    await serializeParsedData(selectedFile, updatedData);
  };

  const saveVisualItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    
    let updatedData;
    if (selectedFile === 'tmg_pdf_links.json') {
      updatedData = { ...parsedData };
      const { modelKey, tr, en } = editingItem;
      if (!modelKey) {
        alert("Model ismi zorunludur");
        return;
      }
      if (editingItemIndex !== null) {
        const oldKey = Object.keys(parsedData)[editingItemIndex];
        if (oldKey !== modelKey) {
          delete updatedData[oldKey];
        }
      }
      updatedData[modelKey] = { tr, en };
    } else if (selectedFile === 'partners.json') {
      updatedData = { ...parsedData };
      if (!updatedData.list) updatedData.list = [];
      if (editingItemIndex !== null) {
        updatedData.list[editingItemIndex] = editingItem;
      } else {
        updatedData.list.push(editingItem);
      }
    } else {
      updatedData = Array.isArray(parsedData) ? [...parsedData] : [];
      if (editingItemIndex !== null) {
        updatedData[editingItemIndex] = editingItem;
      } else {
        if (selectedFile === 'posts.json' && !editingItem.slug) {
          editingItem.slug = editingItem.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        }
        updatedData.unshift(editingItem);
      }
    }
    
    setParsedData(updatedData);
    await serializeParsedData(selectedFile, updatedData);
    setModalOpen(false);
    setEditingItem(null);
    setEditingItemIndex(null);
  };

  const updateDistrictSection = async (sectionIndex: number, field: "title" | "html", value: string) => {
    const updatedData = { ...parsedData };
    const district = updatedData[selectedDistrict];
    if (district && district.sections && district.sections[sectionIndex]) {
      district.sections[sectionIndex][field] = value;
      setParsedData(updatedData);
      await serializeParsedData(selectedFile, updatedData);
    }
  };

  const updateDistrictMainTitle = async (value: string) => {
    const updatedData = { ...parsedData };
    const district = updatedData[selectedDistrict];
    if (district) {
      district.mainTitle = value;
      setParsedData(updatedData);
      await serializeParsedData(selectedFile, updatedData);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const auth = localStorage.getItem("admin_authenticated");
      if (auth === "true") {
        setTimeout(() => setIsAuthenticated(true), 0);
      }
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameInput === "admin" && passwordInput === "akanenerji2026") {
      setIsAuthenticated(true);
      localStorage.setItem("admin_authenticated", "true");
      setAuthError("");
    } else {
      setAuthError("Geçersiz kullanıcı adı veya şifre!");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("admin_authenticated");
    setUsernameInput("");
    setPasswordInput("");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setUploadedImages([reader.result as string]);
      }
    };
    reader.readAsDataURL(file);
  };

  const removeUploadedImage = (indexToRemove: number) => {
    setUploadedImages(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  // Requests states
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loadingRequests, setLoadingRequests] = useState(true);

  const fetchRequests = async () => {
    try {
      const res = await fetch("/api/admin/requests?t=" + Date.now(), { cache: "no-store" });
      const data = await res.json();
      if (Array.isArray(data)) {
        setRequests(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingRequests(false);
    }
  };

  const exportRequestsToCSV = () => {
    if (requests.length === 0) return;
    const headers = ["Musteri Adi", "Telefon", "Eposta", "Hizmet Tipi", "Ilce", "Mesaj", "Tarih", "Durum"];
    const rows = requests.map(req => [
      req.name,
      req.phone,
      req.email,
      req.serviceType,
      req.district,
      `"${req.message.replace(/"/g, '""')}"`,
      req.date,
      req.status
    ]);
    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `akanenerji_servis_talepleri_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/posts?t=" + Date.now(), { cache: "no-store" });
      const data = await res.json();
      if (Array.isArray(data)) {
        setPosts(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingPosts(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchPosts();
      fetchRequests();
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const firstImage = uploadedImages.length > 0 ? uploadedImages[0] : imageUrl;
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          title, 
          excerpt, 
          content, 
          imageUrl: firstImage,
          images: uploadedImages,
          videoUrl,
          category: blogCategory,
          date: blogDate
        })
      });

      if (res.ok) {
        setStatus("success");
        setTitle("");
        setExcerpt("");
        setContent("");
        setImageUrl("");
        setVideoUrl("");
        setBlogCategory("Genel");
        setBlogDate(new Date().toISOString().split('T')[0]);
        setUploadedImages([]);
        fetchPosts();
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const handleDeletePost = async (id: string) => {
    if (!confirm("Bu haberi silmek istediğinizden emin misiniz?")) return;
    try {
      const res = await fetch(`/api/posts?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchPosts();
      } else {
        alert("Haber silinemedi.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditPost = (post: Post) => {
    setEditingPost({ ...post });
  };

  const handleUpdatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;
    setEditStatus("loading");
    try {
      const res = await fetch("/api/posts", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingPost),
      });
      if (res.ok) {
        setEditStatus("success");
        fetchPosts();
        setTimeout(() => {
          setEditingPost(null);
          setEditStatus("idle");
        }, 1200);
      } else {
        setEditStatus("error");
      }
    } catch {
      setEditStatus("error");
    }
  };

  // Request actions
  const handleUpdateRequestStatus = async (id: string, newStatus: "Pending" | "Approved" | "Archived") => {
    try {
      const res = await fetch("/api/admin/requests", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        fetchRequests();
      } else {
        alert("Talep durumu güncellenemedi.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteRequest = async (id: string) => {
    if (!confirm("Bu talebi silmek istediğinizden emin misiniz?")) return;
    try {
      const res = await fetch(`/api/admin/requests?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchRequests();
      } else {
        alert("Talep silinemedi.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Stats calculation
  const totalPostsCount = posts.length;
  const pendingRequestsCount = requests.filter(r => r.status === "Pending").length;

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-[9999] min-h-screen w-full flex bg-[#0F172A] text-white overflow-hidden font-sans">
        {/* Left Side - Full Screen High Quality Image Area */}
        <div className="hidden lg:flex lg:w-3/5 relative min-h-screen items-center justify-center p-16 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1600&auto=format&fit=crop"
            alt="Sakarya Uzman Klima Yönetim Paneli"
            className="absolute inset-0 w-full h-full object-cover scale-105"
          />
          {/* Gradients & Glow overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#0F172A]/75 to-[#0F172A]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-[#0F172A]/60" />
          <div className="absolute inset-0 bg-topo-waves opacity-25 pointer-events-none" />
          <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-[#0EA5E9]/20 blur-[140px] rounded-full pointer-events-none" />

          {/* Content on Image */}
          <div className="relative z-10 space-y-6 max-w-xl">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-[#0EA5E9] font-black text-xs uppercase tracking-widest">
              <ShieldAlert className="w-4 h-4 animate-pulse" />
              Güvenli Yönetim Portalı
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-none text-white">
              Sakarya Uzman<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0EA5E9] to-[#38BDF8]">
                Klima Servisi
              </span>
            </h1>

            <p className="text-gray-300 font-semibold text-sm sm:text-base leading-relaxed">
              7/24 mobil servis taleplerini, müşteri yorumlarını, blog içeriklerini ve site dinamik verilerini tek bir merkezden yönetin.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
                <div className="text-[#0EA5E9] font-black text-xl">16 İlçe</div>
                <div className="text-[#94A3B8] text-[10px] uppercase font-bold tracking-wider mt-1">Servis Ağı</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
                <div className="text-emerald-400 font-black text-xl">7/24</div>
                <div className="text-[#94A3B8] text-[10px] uppercase font-bold tracking-wider mt-1">Canlı Destek</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
                <div className="text-amber-400 font-black text-xl">%100</div>
                <div className="text-[#94A3B8] text-[10px] uppercase font-bold tracking-wider mt-1">Garantili</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form Container */}
        <div className="w-full lg:w-2/5 flex flex-col justify-between p-8 sm:p-12 md:p-16 bg-[#0B1120] relative z-20 border-l border-white/5">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <img src="/x.png" alt="Sakarya Uzman Klima Logo" className="h-10 w-auto object-contain group-hover:scale-105 transition-transform" />
              <div>
                <span className="block font-black text-sm text-white tracking-tight">SAKARYA UZMAN</span>
                <span className="block font-bold text-[10px] text-[#0EA5E9] uppercase tracking-widest">Klima Servisi</span>
              </div>
            </Link>

            <Link
              href="/"
              className="text-xs font-bold text-gray-400 hover:text-white transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10"
            >
              <ArrowRight className="w-3.5 h-3.5 rotate-180" />
              Siteden Çık
            </Link>
          </div>

          <div className="my-auto py-8 max-w-md w-full mx-auto space-y-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                Yönetim Paneli
              </h2>
              <p className="text-gray-400 text-xs font-semibold mt-2">
                Devam etmek için yönetici kullanıcı adı ve şifrenizi girin.
              </p>
            </div>

            {authError && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-2xl flex items-center gap-3 text-xs font-bold uppercase tracking-wide">
                <ShieldAlert className="w-5 h-5 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2">
                  Kullanıcı Adı
                </label>
                <input
                  type="text"
                  required
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  className="w-full px-4 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-[#0EA5E9] focus:bg-white/10 focus:ring-2 focus:ring-[#0EA5E9]/20 outline-none transition-all text-sm font-semibold"
                  placeholder="admin"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2">
                  Şifre
                </label>
                <input
                  type="password"
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full px-4 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-[#0EA5E9] focus:bg-white/10 focus:ring-2 focus:ring-[#0EA5E9]/20 outline-none transition-all text-sm font-semibold"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4.5 bg-gradient-to-r from-[#0EA5E9] to-[#0284C7] hover:from-[#0284C7] hover:to-[#0369A1] text-white font-black uppercase tracking-wider text-xs rounded-2xl shadow-lg shadow-sky-500/25 transition-all cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Sisteme Giriş Yap</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          <div className="text-center text-[11px] font-semibold text-gray-500 border-t border-white/5 pt-6">
            © 2026 Sakarya Uzman Klima İklimlendirme Servisi. Tüm Hakları Saklıdır.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] pt-32 pb-20">
      {isLiveVercel && kvConnected === false && (
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 mb-8">
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-3xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-100 rounded-2xl text-red-600 shrink-0">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-black text-red-800 uppercase tracking-wider">Veritabanı Bağlantısı Devre Dışı (Supabase / PostgreSQL Eksik)</h3>
                <p className="text-sm text-red-700 mt-1 leading-relaxed">
                  Canlı sitede yaptığınız değişikliklerin kalıcı olması ve sayfalara yansıması için Vercel projenizin Dashboard panelinde <strong>POSTGRES_URL</strong> ve <strong>POSTGRES_URL_NON_POOLING</strong> çevre değişkenlerini (Environment Variables) tanımlamanız gerekmektedir. Aksi takdirde, yaptığınız değişiklikler sayfa yenilendiğinde eski haline dönecektir.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-[1600px] mx-auto px-6 md:px-10 flex flex-col lg:flex-row gap-10">
        
        {/* SIDEBAR NAVIGATION */}
        <aside className="w-full lg:w-72 shrink-0 space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-xs border border-gray-100">
            <div className="mb-8">
              <h1 className="text-xl font-black text-[#111111] uppercase tracking-wider">Akan Enerji</h1>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Yönetim Paneli</p>
            </div>
            
            <nav className="flex flex-col gap-1.5">
              {[
                { id: "dashboard", label: "Genel Bakış", icon: LayoutDashboard },
                { id: "blog", label: "Blog / Haber", icon: FileText, badge: posts.length > 0 ? posts.length : undefined },
                { id: "requests", label: "Servis Talepleri", icon: Users, badge: pendingRequestsCount > 0 ? pendingRequestsCount : undefined },
                { id: "files", label: "Gelişmiş Veri Editörü", icon: FileSpreadsheet }
              ].map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as "dashboard" | "blog" | "requests" | "files")}
                    className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer
                      ${isActive 
                        ? "bg-[#0EA5E9] text-white shadow-md shadow-[#0EA5E9]/20" 
                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge !== undefined && (
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold 
                        ${isActive ? "bg-white text-[#0EA5E9]" : "bg-red-500 text-white"}`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col gap-3">
              <Link 
                href="/" 
                className="flex items-center justify-between text-xs font-bold text-gray-400 hover:text-[#0EA5E9] transition-colors"
              >
                <span>Sitede Gör</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center justify-between text-xs font-bold text-red-400 hover:text-red-600 transition-colors w-full cursor-pointer mt-2 text-left"
              >
                <span>Çıkış Yap</span>
                <ShieldAlert className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 space-y-8">
          
          {/* TAB 1: DASHBOARD */}
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-black text-[#111111] uppercase tracking-tight">Genel Bakış</h2>
                  <p className="text-gray-500 mt-1">İşletmenizin güncel veri durumunu takip edin.</p>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {[
                  { label: "Toplam Blog Haberi", val: totalPostsCount, desc: `${posts.length} Dinamik, 6 Statik`, icon: FileText, color: "text-[#0EA5E9] bg-[#0EA5E9]/10" },
                  { label: "Servis Talepleri", val: requests.length, desc: `${pendingRequestsCount} İşlem Bekliyor`, icon: Users, color: "text-amber-600 bg-amber-50" },
                  { label: "Aktif Servis Bölgeleri", val: 39, desc: "Tüm İstanbul İlçeleri", icon: MapPin, color: "text-emerald-600 bg-emerald-50" },
                  { label: "Hizmet Kategorileri", val: 5, desc: "5 Mühendislik Hizmeti", icon: Cpu, color: "text-purple-600 bg-purple-50" }
                ].map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div key={idx} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs flex items-center justify-between">
                      <div className="space-y-1">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{stat.label}</span>
                        <h3 className="text-3xl font-black text-gray-800">{stat.val}</h3>
                        <p className="text-xs text-gray-500 font-semibold">{stat.desc}</p>
                      </div>
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Recent requests list */}
                <div className="xl:col-span-2 bg-white rounded-3xl p-6 border border-gray-100 shadow-xs space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-black text-gray-800 uppercase tracking-tight">Son Servis Talepleri</h3>
                    <button 
                      onClick={() => setActiveTab("requests")} 
                      className="text-xs font-black uppercase tracking-wider text-[#0EA5E9] hover:underline"
                    >
                      Tümünü Gör
                    </button>
                  </div>

                  <div className="flex flex-col gap-4">
                    {requests.slice(0, 3).map(req => (
                      <div key={req.id} className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-gray-800 text-sm">{req.name}</span>
                            <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md 
                              ${req.status === "Pending" ? "bg-amber-100 text-amber-800 border border-amber-200" : ""}
                              ${req.status === "Approved" ? "bg-green-100 text-green-800 border border-green-200" : ""}
                              ${req.status === "Archived" ? "bg-gray-200 text-gray-600 border border-gray-300" : ""}
                            `}>
                              {req.status === "Pending" ? "Beklemede" : ""}
                              {req.status === "Approved" ? "Onaylandı" : ""}
                              {req.status === "Archived" ? "Arşivde" : ""}
                            </span>
                          </div>
                          <p className="text-xs text-gray-400 font-semibold">{req.district} • {req.serviceType}</p>
                          <p className="text-xs text-gray-500 line-clamp-1 italic">&quot;{req.message}&quot;</p>
                        </div>
                        <span className="text-[10px] text-gray-400 font-mono shrink-0">{req.date}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick actions box */}
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs space-y-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-black text-gray-800 uppercase tracking-tight mb-4">Hızlı İşlemler</h3>
                    <p className="text-xs text-gray-400 leading-relaxed font-semibold">
                      Blog sayfanızı yeni içeriklerle güncel tutun veya müşteri servis taleplerini onaylayarak müdahale süreçlerini başlatın.
                    </p>
                  </div>
                  
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => setActiveTab("blog")}
                      className="w-full py-3.5 rounded-xl bg-[#0EA5E9] text-white font-black uppercase text-xs tracking-wider hover:brightness-105 transition-all shadow-md shadow-blue-500/10 flex items-center justify-center gap-2"
                    >
                      <PlusCircle className="w-4 h-4" />
                      Yeni Haber Ekle
                    </button>
                    <button
                      onClick={() => setActiveTab("requests")}
                      className="w-full py-3.5 rounded-xl bg-gray-900 text-white font-black uppercase text-xs tracking-wider hover:bg-black transition-all flex items-center justify-center gap-2"
                    >
                      <Users className="w-4 h-4" />
                      Talepleri Yönet
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: BLOG HABER YÖNETİMİ */}
          {activeTab === "blog" && (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-black text-[#111111] uppercase tracking-tight">Haber / Blog Yönetimi</h2>
                <p className="text-gray-500 mt-1">Sitenizdeki makaleleri ve sektörel haberleri kontrol edin.</p>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                
                {/* Form to create new post */}
                <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-xs space-y-6 h-fit">
                  <h3 className="text-lg font-black text-gray-800 uppercase tracking-tight">Yeni Makale Yayınla</h3>
                  
                  {status === "success" && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-2xl flex items-center gap-3 text-green-700">
                      <CheckCircle2 className="w-6 h-6 shrink-0" />
                      <div>
                        <h3 className="font-bold">Başarılı!</h3>
                        <p className="text-xs">Haber başarıyla yayınlandı.</p>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2">Haber Başlığı</label>
                      <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/20 outline-none transition-all text-sm font-semibold text-gray-800"
                        placeholder="Örn: Jeneratör Bakımı Neden Önemlidir?"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2">Haber Kategorisi</label>
                        <select
                          value={blogCategory}
                          onChange={(e) => setBlogCategory(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/20 outline-none transition-all text-sm font-semibold text-gray-800 bg-white"
                        >
                          <option value="Genel">Genel</option>
                          <option value="Jeneratör Bakımı">Jeneratör Bakımı</option>
                          <option value="Yakıt Sistemleri">Yakıt Sistemleri</option>
                          <option value="Arıza Giderme">Arıza Giderme</option>
                          <option value="Güç Hesabı">Güç Hesabı</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2">Yayın Tarihi (Zamanlama İçin İleri Tarih)</label>
                        <input
                          type="date"
                          required
                          value={blogDate}
                          onChange={(e) => setBlogDate(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/20 outline-none transition-all text-sm font-semibold text-gray-800 bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2">Kısa Özet (Ana Sayfada Görünür)</label>
                      <textarea
                        rows={2}
                        value={excerpt}
                        onChange={(e) => setExcerpt(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/20 outline-none transition-all resize-none text-sm font-semibold text-gray-800"
                        placeholder="Haberin kısa bir özeti..."
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                          <ImageIcon className="w-4 h-4 text-gray-400" /> Kapak Resmi Linki (Opsiyonel)
                        </label>
                        <input
                          type="url"
                          value={imageUrl}
                          onChange={(e) => setImageUrl(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/20 outline-none transition-all text-sm font-semibold text-gray-800"
                          placeholder="https://images.unsplash.com/..."
                        />
                        <p className="text-[10px] text-gray-400 mt-1 font-semibold">Boş bırakırsanız yüklediğiniz resimlerden ilki veya varsayılan görsel atanır.</p>
                      </div>

                      <div>
                        <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                          <ImageIcon className="w-4 h-4 text-gray-400" /> Haber Görseli Yükle (Tek Görsel)
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="w-full px-4 py-2.5 text-xs font-semibold text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:uppercase file:bg-blue-50 file:text-[#0EA5E9] hover:file:bg-blue-100 border border-gray-200 rounded-xl cursor-pointer"
                        />
                        <p className="text-[10px] text-gray-400 mt-1 font-semibold">Habere kapak resmi olacak bir görsel seçin.</p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                        <Video className="w-4 h-4 text-gray-400" /> Video Linki (Opsiyonel)
                      </label>
                      <input
                        type="url"
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/20 outline-none transition-all text-sm font-semibold text-gray-800"
                        placeholder="Örn: YouTube, Vimeo veya doğrudan video (.mp4) linki"
                      />
                      <p className="text-[10px] text-gray-400 mt-1 font-semibold">Desteklenenler: YouTube, Vimeo veya doğrudan video URL'i.</p>
                    </div>

                    {uploadedImages.length > 0 && (
                      <div className="space-y-2">
                        <label className="block text-xs font-black text-gray-400 uppercase tracking-wider">Seçilen Haber Görseli</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-gray-50 border border-gray-200 rounded-xl">
                          {uploadedImages.map((imgSrc, index) => (
                            <div key={index} className="relative aspect-video rounded-lg overflow-hidden group border border-gray-200 shadow-sm bg-white">
                              <img src={imgSrc} alt={`Yüklenen Görsel ${index + 1}`} className="w-full h-full object-cover" />
                              <button
                                type="button"
                                onClick={() => removeUploadedImage(index)}
                                className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-colors shadow-sm"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-gray-400" /> Haber İçeriği
                      </label>
                      <textarea
                        required
                        rows={8}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/20 outline-none transition-all resize-none text-sm font-semibold text-gray-800"
                        placeholder="Haberin tüm detaylarını buraya yazın..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full py-4 bg-[#0EA5E9] text-white font-black uppercase tracking-wider rounded-xl hover:brightness-105 transition-all flex items-center justify-center gap-2 shadow-md shadow-blue-500/10 disabled:opacity-75 text-xs"
                    >
                      {status === "loading" ? "Yayınlanıyor..." : "Haberi Yayınla"}
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>

                {/* List of existing posts */}
                <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-xs space-y-6">
                  <h3 className="text-lg font-black text-gray-800 uppercase tracking-tight">Dinamik Makaleler ({posts.length})</h3>

                  {loadingPosts ? (
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Makaleler Yükleniyor...</p>
                  ) : posts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-center p-8 text-gray-400 border border-dashed border-gray-200 rounded-2xl">
                      <AlertCircle className="w-8 h-8 mb-2" />
                      <p className="text-xs font-bold uppercase tracking-wider">Henüz dinamik haber bulunamadı.</p>
                    </div>
                  ) : (() => {
                    const nowStr = new Date().toISOString().split('T')[0];
                    const published = posts.filter(p => !p.date || p.date <= nowStr);
                    const scheduled = posts.filter(p => p.date && p.date > nowStr);

                    return (
                      <div className="space-y-8">
                        {/* 1. PUBLISHED POSTS (LAST 4) */}
                        <div className="space-y-4">
                          <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                            <h4 className="text-xs font-black uppercase text-gray-400 tracking-wider">Yayında Olanlar ({published.length})</h4>
                            {published.length > 4 && (
                              <button
                                type="button"
                                onClick={() => { setAllPostsModal("published"); setModalSearchQuery(""); }}
                                className="text-[10px] font-black text-[#0EA5E9] hover:underline uppercase tracking-wider cursor-pointer border-0 bg-transparent"
                              >
                                Tümünü Gör ({published.length})
                              </button>
                            )}
                          </div>
                          {published.length === 0 ? (
                            <p className="text-xs text-gray-400 italic">Yayında olan makale bulunmuyor.</p>
                          ) : (
                            <div className="flex flex-col gap-3">
                              {published.slice(0, 4).map(post => (
                                <div key={post.id} className="p-3.5 rounded-2xl bg-green-50/40 border border-green-100/50 flex items-center justify-between gap-4">
                                  <div className="space-y-0.5 flex-1 min-w-0">
                                    <h5 className="font-bold text-gray-800 text-xs line-clamp-1">{post.title}</h5>
                                    <p className="text-[9px] text-gray-400 font-mono">{post.date.split('-').reverse().join('/')} • {post.category || "Genel"}</p>
                                  </div>
                                  <div className="flex items-center gap-1.5 shrink-0">
                                    <button
                                      onClick={() => handleEditPost(post)}
                                      className="w-7 h-7 rounded-lg bg-blue-50 text-[#0EA5E9] hover:bg-[#0EA5E9] hover:text-white transition-colors flex items-center justify-center border border-blue-100 cursor-pointer"
                                      title="Haberi Düzenle"
                                    >
                                      <Pencil className="w-3 h-3" />
                                    </button>
                                    <button
                                      onClick={() => handleDeletePost(post.id)}
                                      className="w-7 h-7 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors flex items-center justify-center border border-red-100 cursor-pointer"
                                      title="Haberi Sil"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* 2. SCHEDULED POSTS (LAST 4) */}
                        <div className="space-y-4">
                          <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                            <h4 className="text-xs font-black uppercase text-gray-400 tracking-wider">Zamanlanmış / Planlı ({scheduled.length})</h4>
                            {scheduled.length > 4 && (
                              <button
                                type="button"
                                onClick={() => { setAllPostsModal("scheduled"); setModalSearchQuery(""); }}
                                className="text-[10px] font-black text-[#0EA5E9] hover:underline uppercase tracking-wider cursor-pointer border-0 bg-transparent"
                              >
                                Tümünü Gör ({scheduled.length})
                              </button>
                            )}
                          </div>
                          {scheduled.length === 0 ? (
                            <p className="text-xs text-gray-400 italic">Planlanmış makale bulunmuyor.</p>
                          ) : (
                            <div className="flex flex-col gap-3">
                              {scheduled.slice(0, 4).map(post => (
                                <div key={post.id} className="p-3.5 rounded-2xl bg-amber-50/40 border border-amber-100/50 flex items-center justify-between gap-4">
                                  <div className="space-y-0.5 flex-1 min-w-0">
                                    <h5 className="font-bold text-gray-800 text-xs line-clamp-1">{post.title}</h5>
                                    <p className="text-[9px] text-amber-600 font-mono font-bold">⏱️ Yayın: {post.date.split('-').reverse().join('/')} • {post.category || "Genel"}</p>
                                  </div>
                                  <div className="flex items-center gap-1.5 shrink-0">
                                    <button
                                      onClick={() => handleEditPost(post)}
                                      className="w-7 h-7 rounded-lg bg-blue-50 text-[#0EA5E9] hover:bg-[#0EA5E9] hover:text-white transition-colors flex items-center justify-center border border-blue-100 cursor-pointer"
                                      title="Haberi Düzenle"
                                    >
                                      <Pencil className="w-3 h-3" />
                                    </button>
                                    <button
                                      onClick={() => handleDeletePost(post.id)}
                                      className="w-7 h-7 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors flex items-center justify-center border border-red-100 cursor-pointer"
                                      title="Haberi Sil"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })()}
                </div>

              </div>
            </div>
          )}

          {/* TAB 3: SERVİS TALEPLERİ */}
          {activeTab === "requests" && (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-black text-[#111111] uppercase tracking-tight">Servis & Teklif Talepleri</h2>
                <p className="text-gray-500 mt-1">Müşterilerden gelen Klima, Kombi ve Beyaz Eşya arıza, bakım ve montaj taleplerini denetleyin.</p>
              </div>

              <div className="bg-white rounded-3xl border border-gray-100 shadow-xs overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="text-lg font-black text-gray-800 uppercase tracking-tight">Gelen Kutusu</h3>
                  {requests.length > 0 && (
                    <button
                      onClick={exportRequestsToCSV}
                      className="px-4 py-2 bg-gray-50 border border-gray-200 hover:bg-gray-100 text-gray-600 font-bold uppercase tracking-wider rounded-xl text-[10px] flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <FileSpreadsheet className="w-3.5 h-3.5 text-green-600" />
                      Excel / CSV İndir
                    </button>
                  )}
                </div>

                {loadingRequests ? (
                  <div className="p-12 flex flex-col items-center justify-center text-center text-gray-400">
                    <div className="w-6 h-6 border-2 border-[#0EA5E9] border-t-transparent rounded-full animate-spin mb-2" />
                    <p className="text-xs font-bold uppercase tracking-wider">Talepler Yükleniyor...</p>
                  </div>
                ) : requests.length === 0 ? (
                  <div className="p-12 flex flex-col items-center justify-center text-center text-gray-400">
                    <ShieldAlert className="w-10 h-10 text-gray-300 mb-2 animate-bounce" />
                    <p className="text-sm font-bold uppercase tracking-wider">Herhangi bir servis talebi bulunmuyor.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-gray-50 text-[10px] font-black uppercase tracking-wider text-gray-400 border-b border-gray-100">
                          <th className="px-6 py-4.5">Müşteri Detayları</th>
                          <th className="px-6 py-4.5">Talep Edilen Hizmet & Bölge</th>
                          <th className="px-6 py-4.5">Mesaj Detayı</th>
                          <th className="px-6 py-4.5">Tarih</th>
                          <th className="px-6 py-4.5 text-center">Durum</th>
                          <th className="px-6 py-4.5 text-right">İşlemler</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 text-xs">
                        {requests.map(req => (
                          <tr key={req.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-6 py-4.5">
                              <div className="font-bold text-gray-800">{req.name}</div>
                              <div className="text-[10px] text-gray-400 font-semibold flex items-center gap-1.5 mt-0.5">
                                <Phone className="w-3 h-3 text-gray-300" /> {req.phone}
                              </div>
                              <div className="text-[10px] text-gray-400 font-semibold flex items-center gap-1.5">
                                <Mail className="w-3 h-3 text-gray-300" /> {req.email}
                              </div>
                            </td>
                            <td className="px-6 py-4.5">
                              <span className="px-2.5 py-1.5 rounded-lg bg-[#0EA5E9]/5 border border-[#0EA5E9]/10 text-[#0EA5E9] font-bold inline-block text-[10px] tracking-wide uppercase">
                                {req.serviceType}
                              </span>
                              <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-1.5 flex items-center gap-1">
                                📍 {req.district}
                              </div>
                            </td>
                            <td className="px-6 py-4.5 max-w-[280px]">
                              <p className="text-gray-500 line-clamp-3 leading-relaxed font-semibold italic">&quot;{req.message}&quot;</p>
                            </td>
                            <td className="px-6 py-4.5 font-mono text-gray-400 font-semibold">
                              {req.date}
                            </td>
                            <td className="px-6 py-4.5 text-center">
                              <span className={`px-2.5 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wider inline-block border
                                ${req.status === "Pending" ? "bg-amber-50 text-amber-700 border-amber-200" : ""}
                                ${req.status === "Approved" ? "bg-green-50 text-green-700 border-green-200" : ""}
                                ${req.status === "Archived" ? "bg-gray-100 text-gray-500 border-gray-300" : ""}
                              `}>
                                {req.status === "Pending" ? "Beklemede" : ""}
                                {req.status === "Approved" ? "Onaylandı" : ""}
                                {req.status === "Archived" ? "Arşivlendi" : ""}
                              </span>
                            </td>
                            <td className="px-6 py-4.5 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                {req.status !== "Approved" && (
                                  <button
                                    onClick={() => handleUpdateRequestStatus(req.id, "Approved")}
                                    className="w-7 h-7 rounded-lg bg-green-50 text-green-600 border border-green-100 hover:bg-green-600 hover:text-white transition-colors flex items-center justify-center"
                                    title="Onayla"
                                  >
                                    <Check className="w-3.5 h-3.5" />
                                  </button>
                                )}
                                {req.status !== "Archived" && (
                                  <button
                                    onClick={() => handleUpdateRequestStatus(req.id, "Archived")}
                                    className="w-7 h-7 rounded-lg bg-gray-50 text-gray-500 border border-gray-200 hover:bg-gray-600 hover:text-white transition-colors flex items-center justify-center"
                                    title="Arşivle"
                                  >
                                    <Archive className="w-3.5 h-3.5" />
                                  </button>
                                )}
                                <button
                                  onClick={() => handleDeleteRequest(req.id)}
                                  className="w-7 h-7 rounded-lg bg-red-50 text-red-600 border border-red-100 hover:bg-red-600 hover:text-white transition-colors flex items-center justify-center"
                                  title="Sil"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}


          {/* TAB 5: GELİŞMİŞ VERİ EDİTÖRÜ */}
          {activeTab === "files" && (
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-black text-[#111111] uppercase tracking-tight">Gelişmiş Veri Editörü</h2>
                  <p className="text-gray-500 mt-1">
                    Sitenin veri tabanını oluşturan içerikleri görsel panel ile kolayca ekleyin, düzenleyin ve silin.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => fetchFileContent(selectedFile)}
                    disabled={fileStatus === "loading"}
                    className="px-4 py-3 text-xs font-black uppercase tracking-wider text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl transition-all disabled:opacity-50 cursor-pointer"
                  >
                    Yeniden Yükle
                  </button>
                  <button
                    onClick={handleSaveFileContent}
                    disabled={fileStatus === "loading"}
                    className="px-5 py-3 text-xs font-black uppercase tracking-wider text-white bg-[#0EA5E9] hover:bg-[#E6B800] rounded-xl transition-all shadow-md shadow-[#0EA5E9]/10 disabled:opacity-50 flex items-center gap-1.5 cursor-pointer animate-pulse"
                  >
                    {fileStatus === "loading" ? "Kaydediliyor..." : "Tüm Değişiklikleri Kaydet"}
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-gray-100 shadow-xs p-6 md:p-8 space-y-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-gray-100 pb-5">
                  <div className="space-y-1">
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-wider">
                      Düzenlenecek Veri Dosyasını Seçin
                    </label>
                    <select
                      value={selectedFile}
                      onChange={(e) => setSelectedFile(e.target.value)}
                      className="w-full md:w-80 px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/20 outline-none transition-all text-sm font-semibold text-gray-800 bg-white"
                    >
                      <option value="projects.ts">Referans Projeler (projects.ts)</option>
                      <option value="references.ts">Kurumsal Referans Logoları (references.ts)</option>
                      <option value="testimonials.ts">Müşteri Yorumları (testimonials.ts)</option>
                      <option value="districts_content.json">İlçe Detay Paragrafları (districts_content.json)</option>
                      <option value="partners.json">Kayan Marka Logoları & Başlığı (partners.json)</option>
                    </select>
                  </div>

                  <div className="flex border-b border-gray-100 gap-4">
                    <button
                      onClick={() => {
                        setEditMode("visual");
                        parseFileContent(selectedFile, fileContent);
                      }}
                      className={`pb-2.5 text-xs font-black uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                        editMode === "visual"
                          ? "border-[#0EA5E9] text-[#0EA5E9]"
                          : "border-transparent text-gray-400 hover:text-gray-600"
                      }`}
                    >
                      🎨 Görsel Arayüz (Kolay)
                    </button>
                    <button
                      onClick={() => setEditMode("raw")}
                      className={`pb-2.5 text-xs font-black uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                        editMode === "raw"
                          ? "border-[#0EA5E9] text-[#0EA5E9]"
                          : "border-transparent text-gray-400 hover:text-gray-600"
                      }`}
                    >
                      💻 Ham Kod (Gelişmiş)
                    </button>
                  </div>
                </div>

                {fileStatus === "success" && (
                  <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-2xl flex items-center gap-2.5 text-xs font-bold">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <span>{fileMessage}</span>
                  </div>
                )}

                {fileStatus === "error" && (
                  <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl flex items-center gap-2.5 text-xs font-bold">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span>{fileMessage}</span>
                  </div>
                )}

                {/* RAW CODE MODE */}
                {editMode === "raw" && (
                  <div className="space-y-4">
                    <div className="relative">
                      <div className="absolute top-3 right-4 z-10 px-2 py-1 bg-gray-900/10 text-gray-500 rounded-md text-[9px] font-black uppercase tracking-wider select-none pointer-events-none">
                        {selectedFile.endsWith('.ts') ? 'TypeScript / JavaScript' : 'Structured JSON'}
                      </div>
                      <textarea
                        rows={22}
                        value={fileContent}
                        onChange={(e) => setFileContent(e.target.value)}
                        disabled={fileStatus === "loading"}
                        className="w-full p-6 bg-gray-950 text-emerald-400 font-mono text-xs rounded-2xl border border-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/50 leading-relaxed disabled:opacity-75"
                        style={{ tabSize: 2, whiteSpace: "pre", overflowX: "auto" }}
                        placeholder="// Dosya içeriği yükleniyor..."
                      />
                    </div>
                    <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-2xl text-[11px] text-blue-700 leading-relaxed font-semibold">
                      💡 <strong>Kullanım Kılavuzu:</strong> JSON dosyalarında tırnak işaretlerine ve virgüllere dikkat edin. TypeScript (.ts) dosyalarında değişken adlarını bozmamaya özen gösterin.
                    </div>
                  </div>
                )}

                {/* VISUAL EASY MODE */}
                {editMode === "visual" && (
                  <div className="space-y-6">
                    {parsedData === null ? (
                      <div className="p-6 text-center bg-amber-50 text-amber-700 rounded-2xl font-bold text-xs uppercase tracking-wide border border-amber-200">
                        Bu dosya formatı görsel düzenleyici ile uyumsuz veya veri hatalı. Lütfen &quot;Ham Kod&quot; sekmesinden düzenleyin.
                      </div>
                    ) : (
                      <>
                        {/* 1. DISTRICTS CONTENT VISUAL EDITOR */}
                        {selectedFile === "districts_content.json" && (
                          <div className="space-y-6">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gray-50 p-5 rounded-2xl border border-gray-100">
                              <div>
                                <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider">Düzenlemek İstediğiniz Bölge (İlçe)</h4>
                                <select
                                  value={selectedDistrict}
                                  onChange={(e) => setSelectedDistrict(e.target.value)}
                                  className="mt-1.5 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-gray-700 bg-white outline-none focus:border-[#0EA5E9]"
                                >
                                  {Object.keys(parsedData).map((key) => (
                                    <option key={key} value={key}>
                                      {key.charAt(0).toUpperCase() + key.slice(1).replace(/-/g, ' ')}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                                📍 Toplam İlçe: {Object.keys(parsedData).length} adet
                              </div>
                            </div>

                            {parsedData[selectedDistrict] && (
                              <div className="space-y-6 border-t border-gray-100 pt-6">
                                <div>
                                  <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2">Sayfa Başlığı (SEO H1)</label>
                                  <input
                                    type="text"
                                    value={parsedData[selectedDistrict].mainTitle || ""}
                                    onChange={(e) => updateDistrictMainTitle(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0EA5E9] outline-none text-sm font-semibold text-gray-800"
                                  />
                                </div>

                                <div className="space-y-4">
                                  <h4 className="text-sm font-black text-gray-800 uppercase tracking-tight border-b border-gray-150 pb-2">Sayfa Paragrafları ve Bölümleri</h4>
                                  
                                  {parsedData[selectedDistrict].sections?.map((section: any, idx: number) => (
                                    <div key={idx} className="p-6 border border-gray-100 rounded-2xl bg-gray-50/50 space-y-4">
                                      <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-black text-[#0EA5E9] bg-[#0EA5E9]/10 px-2 py-0.5 rounded-md uppercase tracking-wider">Bölüm #{idx + 1}</span>
                                      </div>
                                      <div>
                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-wider mb-1">Bölüm Başlığı</label>
                                        <input
                                          type="text"
                                          value={section.title || ""}
                                          onChange={(e) => updateDistrictSection(idx, "title", e.target.value)}
                                          className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm font-bold text-gray-800 outline-none focus:border-[#0EA5E9]"
                                        />
                                      </div>
                                      <div>
                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-wider mb-1">Bölüm İçeriği (Yazı / HTML Kodları)</label>
                                        <textarea
                                          rows={4}
                                          value={section.html || ""}
                                          onChange={(e) => updateDistrictSection(idx, "html", e.target.value)}
                                          className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 leading-relaxed outline-none focus:border-[#0EA5E9]"
                                        />
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {/* 2. PDF LINKS VISUAL EDITOR */}
                        {selectedFile === "tmg_pdf_links.json" && (
                          <div className="space-y-6">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gray-50 p-5 rounded-2xl border border-gray-100">
                              <div className="flex items-center gap-3 w-full sm:w-auto">
                                <input
                                  type="text"
                                  placeholder="Model ismi ara..."
                                  value={searchQuery}
                                  onChange={(e) => setSearchQuery(e.target.value)}
                                  className="w-full sm:w-60 px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 outline-none focus:border-[#0EA5E9]"
                                />
                              </div>
                              <button
                                onClick={startAddVisualItem}
                                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase tracking-wider text-[10px] rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-sm border-0"
                              >
                                <PlusCircle className="w-4 h-4" /> Yeni Model Katalogu Ekle
                              </button>
                            </div>

                            <div className="overflow-x-auto border border-gray-100 rounded-2xl">
                              <table className="w-full text-left border-collapse">
                                <thead>
                                  <tr className="bg-gray-50 text-[10px] font-black uppercase text-gray-400 border-b border-gray-100">
                                    <th className="px-4 py-3">Jeneratör Modeli</th>
                                    <th className="px-4 py-3">Türkçe PDF Katalog Linki</th>
                                    <th className="px-4 py-3">İngilizce PDF Katalog Linki</th>
                                    <th className="px-4 py-3 text-right">İşlemler</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 text-xs font-bold text-gray-700">
                                  {Object.entries(parsedData)
                                    .filter(([key]) => key.toLowerCase().includes(searchQuery.toLowerCase()))
                                    .map(([key, val]: any, idx) => (
                                      <tr key={key} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-4 py-3 text-[#0EA5E9] font-black">{key}</td>
                                        <td className="px-4 py-3 max-w-[240px] truncate font-mono text-[10px] text-gray-500">{val.tr}</td>
                                        <td className="px-4 py-3 max-w-[240px] truncate font-mono text-[10px] text-gray-500">{val.en}</td>
                                        <td className="px-4 py-3 text-right space-x-1.5">
                                          <button
                                            onClick={() => startEditVisualItem([key, val], idx)}
                                            className="px-2 py-1 bg-gray-100 hover:bg-blue-100 hover:text-blue-700 border-0 text-gray-600 rounded-md text-[10px] uppercase font-black transition-colors cursor-pointer"
                                          >
                                            Düzenle
                                          </button>
                                          <button
                                            onClick={() => deleteVisualItem(key)}
                                            className="px-2 py-1 bg-red-50 hover:bg-red-500 hover:text-white border-0 text-red-600 rounded-md text-[10px] uppercase font-black transition-colors cursor-pointer"
                                          >
                                            Sil
                                          </button>
                                        </td>
                                      </tr>
                                    ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}

                        {/* 2.5 PARTNERS VISUAL EDITOR */}
                        {selectedFile === "partners.json" && parsedData && (
                          <div className="space-y-6">
                            {/* Title & Subtitle inputs */}
                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-4">
                              <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider">Kayan Markalar Alan Başlığı Ayarları</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-[10px] font-black text-gray-500 uppercase mb-1">Küçük Üst Başlık (Subtitle)</label>
                                  <input
                                    type="text"
                                    value={parsedData.subtitle || ""}
                                    onChange={async (e) => {
                                      const updated = { ...parsedData, subtitle: e.target.value };
                                      setParsedData(updated);
                                      await serializeParsedData(selectedFile, updated);
                                    }}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-gray-800 outline-none focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/10 bg-white"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[10px] font-black text-gray-500 uppercase mb-1">Büyük Ana Başlık (Title)</label>
                                  <input
                                    type="text"
                                    value={parsedData.title || ""}
                                    onChange={async (e) => {
                                      const updated = { ...parsedData, title: e.target.value };
                                      setParsedData(updated);
                                      await serializeParsedData(selectedFile, updated);
                                    }}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-gray-800 outline-none focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/10 bg-white"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Logos list section */}
                            <div className="bg-white p-6 rounded-2xl border border-gray-150 space-y-6">
                              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
                                <div>
                                  <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider">Kayan Marka Logoları</h4>
                                  <p className="text-[10px] text-gray-400 font-semibold mt-1">Anasayfada kayan şerit üzerinde gösterilecek markaların isimleri ve logoları.</p>
                                </div>
                                <button
                                  onClick={startAddVisualItem}
                                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase tracking-wider text-[10px] rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-sm border-0"
                                >
                                  <PlusCircle className="w-4 h-4" /> Yeni Logo Ekle
                                </button>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {parsedData.list && parsedData.list.map((item: any, idx: number) => (
                                  <div key={idx} className="bg-gray-50/50 border border-gray-150 rounded-2xl p-4 flex flex-col justify-between gap-4 relative overflow-hidden">
                                    <div className="space-y-3">
                                      {/* Logo preview */}
                                      <div className="h-16 w-full bg-white rounded-xl border border-gray-100 flex items-center justify-center p-2 relative overflow-hidden">
                                        {item.logo ? (
                                          <img src={item.logo} alt={item.name} className="max-h-full max-w-full object-contain" />
                                        ) : (
                                          <span className="text-[10px] text-gray-300 font-black uppercase">Logo Yok</span>
                                        )}
                                      </div>
                                      <h5 className="font-bold text-gray-800 text-xs text-center">{item.name || "İsimsiz Marka"}</h5>
                                    </div>

                                    <div className="flex items-center justify-center gap-2 pt-2 border-t border-gray-100">
                                      <button
                                        onClick={() => startEditVisualItem(item, idx)}
                                        className="px-2.5 py-1.5 bg-gray-100 hover:bg-blue-100 hover:text-blue-700 border-0 text-gray-600 rounded-lg text-[9px] uppercase font-black transition-colors cursor-pointer"
                                      >
                                        Düzenle
                                      </button>
                                      <button
                                        onClick={async () => {
                                          if (!confirm("Bu logoyu silmek istediğinizden emin misiniz?")) return;
                                          const newList = [...parsedData.list];
                                          newList.splice(idx, 1);
                                          const updated = { ...parsedData, list: newList };
                                          setParsedData(updated);
                                          await serializeParsedData(selectedFile, updated);
                                        }}
                                        className="px-2.5 py-1.5 bg-red-50 hover:bg-red-500 hover:text-white border-0 text-red-600 rounded-lg text-[9px] uppercase font-black transition-colors cursor-pointer"
                                      >
                                        Sil
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* 3. ARRAY LISTS DYNAMIC CARDS (Products, Second Hand, Projects, Blog Posts) */}
                        {Array.isArray(parsedData) && (
                          <div className="space-y-6">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gray-50 p-5 rounded-2xl border border-gray-100">
                              <div className="flex items-center gap-3 w-full sm:w-auto">
                                <input
                                  type="text"
                                  placeholder="Başlık, marka, model ara..."
                                  value={searchQuery}
                                  onChange={(e) => setSearchQuery(e.target.value)}
                                  className="w-full sm:w-60 px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 outline-none focus:border-[#0EA5E9]"
                                />
                              </div>
                              <button
                                onClick={startAddVisualItem}
                                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase tracking-wider text-[10px] rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-sm border-0"
                              >
                                <PlusCircle className="w-4 h-4" /> Yeni İçerik Ekle
                              </button>
                            </div>

                            {selectedFile === "projects.ts" && (
                              <div className="flex border-b border-gray-100 gap-6 pb-1">
                                <button
                                  onClick={() => setProjectStatusFilter("all")}
                                  className={`pb-2.5 text-xs font-black uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                                    projectStatusFilter === "all"
                                      ? "border-[#0EA5E9] text-[#0EA5E9]"
                                      : "border-transparent text-gray-400 hover:text-gray-600"
                                  }`}
                                >
                                  Tüm Projeler ({parsedData.length})
                                </button>
                                <button
                                  onClick={() => setProjectStatusFilter("completed")}
                                  className={`pb-2.5 text-xs font-black uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                                    projectStatusFilter === "completed"
                                      ? "border-[#0EA5E9] text-[#0EA5E9]"
                                      : "border-transparent text-gray-400 hover:text-gray-600"
                                  }`}
                                >
                                  Tamamlanan Projeler ({parsedData.filter((x: any) => x.status === "completed").length})
                                </button>
                                <button
                                  onClick={() => setProjectStatusFilter("ongoing")}
                                  className={`pb-2.5 text-xs font-black uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                                    projectStatusFilter === "ongoing"
                                      ? "border-[#0EA5E9] text-[#0EA5E9]"
                                      : "border-transparent text-gray-400 hover:text-gray-600"
                                  }`}
                                >
                                  Devam Eden Projeler ({parsedData.filter((x: any) => x.status === "ongoing").length})
                                </button>
                              </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                              {parsedData
                                .filter((item: any) => {
                                  const text = (item.title || item.model || item.brand || item.name || "").toLowerCase();
                                  const matchesSearch = text.includes(searchQuery.toLowerCase());
                                  if (selectedFile === "projects.ts") {
                                    if (projectStatusFilter === "completed") {
                                      return matchesSearch && item.status === "completed";
                                    }
                                    if (projectStatusFilter === "ongoing") {
                                      return matchesSearch && item.status === "ongoing";
                                    }
                                  }
                                  return matchesSearch;
                                })
                                .map((item: any, idx: number) => {
                                  const title = item.title || (item.company && item.name ? `${item.company} - ${item.name}` : item.name) || (item.brand && item.model ? `${item.brand} ${item.model}` : "") || "İsimsiz İçerik";
                                  const powerInfo = item.power || item.standby || "";
                                  return (
                                    <div key={idx} className="bg-white border border-gray-150 rounded-2xl p-5 hover:shadow-md transition-all flex flex-col justify-between gap-4 relative overflow-hidden">
                                      <div className="space-y-2">
                                        <div className="flex items-center justify-between gap-1.5">
                                          <div className="flex items-center gap-1.5">
                                            <span className="px-2 py-0.5 bg-gray-100 border border-gray-200 text-gray-600 font-bold uppercase rounded-md text-[8px] tracking-wide">
                                              {item.brand || item.category || (item.company ? "Yorum" : "Veri")}
                                            </span>
                                            {selectedFile === "projects.ts" && item.showOnHomepage && (
                                              <span className="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-600 font-black uppercase rounded-md text-[8px] tracking-wide">
                                                ★ Anasayfa
                                              </span>
                                            )}
                                          </div>
                                          {powerInfo && (
                                            <span className="text-[10px] font-black text-amber-600">{powerInfo}</span>
                                          )}
                                        </div>
                                        <h4 className="font-bold text-gray-800 text-sm line-clamp-1">{title}</h4>
                                        <p className="text-xs text-gray-400 font-semibold line-clamp-2 leading-relaxed">{item.desc || item.description || item.excerpt || item.quote || item.tag || ""}</p>
                                      </div>

                                      <div className="flex items-center justify-between border-t border-gray-100 pt-3 mt-1">
                                        <span className="text-[10px] text-gray-400 font-mono">#{parsedData.length - idx}</span>
                                        <div className="flex items-center gap-2">
                                          <button
                                            onClick={() => startEditVisualItem(item, idx)}
                                            className="px-2.5 py-1.5 bg-gray-100 hover:bg-blue-100 hover:text-blue-700 border-0 text-gray-600 rounded-lg text-[9px] uppercase font-black transition-colors cursor-pointer"
                                          >
                                            Düzenle
                                          </button>
                                          <button
                                            onClick={() => deleteVisualItem(idx)}
                                            className="px-2.5 py-1.5 bg-red-50 hover:bg-red-500 hover:text-white border-0 text-red-600 rounded-lg text-[9px] uppercase font-black transition-colors cursor-pointer"
                                          >
                                            Sil
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

        </main>
      </div>

      {/* EDIT POST MODAL */}
      {editingPost && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 relative">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-8 py-5 border-b border-gray-100 rounded-t-3xl">
              <div>
                <h3 className="font-black text-gray-800 text-lg uppercase tracking-tight">Haberi Düzenle</h3>
                <p className="text-[11px] text-gray-400 font-semibold mt-0.5">Değişikliklerinizi yapın ve kaydedin</p>
              </div>
              <button
                onClick={() => { setEditingPost(null); setEditStatus("idle"); }}
                className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-red-50 hover:text-red-500 text-gray-400 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleUpdatePost} className="p-8 space-y-6">
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2">Başlık</label>
                <input
                  type="text"
                  required
                  value={editingPost.title}
                  onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/20 outline-none transition-all text-sm font-semibold text-gray-800"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2">Kategori</label>
                  <select
                    value={editingPost.category || "Genel"}
                    onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/20 outline-none transition-all text-sm font-semibold text-gray-800 bg-white"
                  >
                    <option value="Genel">Genel</option>
                    <option value="Jeneratör Bakımı">Jeneratör Bakımı</option>
                    <option value="Yakıt Sistemleri">Yakıt Sistemleri</option>
                    <option value="Arıza Giderme">Arıza Giderme</option>
                    <option value="Güç Hesabı">Güç Hesabı</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2">Yayın Tarihi</label>
                  <input
                    type="date"
                    required
                    value={editingPost.date || ""}
                    onChange={(e) => setEditingPost({ ...editingPost, date: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/20 outline-none transition-all text-sm font-semibold text-gray-800 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2">Kısa Özet</label>
                <textarea
                  rows={2}
                  value={editingPost.excerpt}
                  onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/20 outline-none transition-all resize-none text-sm font-semibold text-gray-800"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-gray-400" /> Kapak Resmi URL
                </label>
                <input
                  type="text"
                  value={editingPost.imageUrl || ""}
                  onChange={(e) => setEditingPost({ ...editingPost, imageUrl: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/20 outline-none transition-all text-sm font-semibold text-gray-800"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Video className="w-4 h-4 text-gray-400" /> Video URL (Opsiyonel)
                </label>
                <input
                  type="url"
                  value={editingPost.videoUrl || ""}
                  onChange={(e) => setEditingPost({ ...editingPost, videoUrl: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/20 outline-none transition-all text-sm font-semibold text-gray-800"
                  placeholder="YouTube, Vimeo veya direct video link"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-gray-400" /> İçerik
                </label>
                <textarea
                  required
                  rows={10}
                  value={editingPost.content}
                  onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/20 outline-none transition-all resize-none text-sm font-semibold text-gray-800"
                />
              </div>

              {editStatus === "error" && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-bold">
                  <AlertCircle className="w-4 h-4 shrink-0" /> Güncelleme başarısız. Lütfen tekrar deneyin.
                </div>
              )}

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => { setEditingPost(null); setEditStatus("idle"); }}
                  className="flex-1 py-3.5 border border-gray-200 text-gray-500 font-black uppercase tracking-wider rounded-xl hover:bg-gray-50 transition-all text-xs cursor-pointer"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  disabled={editStatus === "loading"}
                  className="flex-1 py-3.5 bg-[#0EA5E9] text-white font-black uppercase tracking-wider rounded-xl hover:brightness-105 transition-all flex items-center justify-center gap-2 shadow-md shadow-blue-500/10 disabled:opacity-75 text-xs cursor-pointer"
                >
                  {editStatus === "loading" ? (
                    "Kaydediliyor..."
                  ) : editStatus === "success" ? (
                    <><CheckCircle2 className="w-4 h-4" /> Kaydedildi!</>
                  ) : (
                    <><Check className="w-4 h-4" /> Değişiklikleri Kaydet</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ALL POSTS MODAL */}
      {allPostsModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl border border-gray-100 relative overflow-hidden">
            {/* Modal Header */}
            <div className="bg-white flex items-center justify-between px-8 py-5 border-b border-gray-100">
              <div>
                <h3 className="font-black text-gray-800 text-lg uppercase tracking-tight">
                  {allPostsModal === "published" ? "Yayında Olan Tüm Makaleler" : "Planlanmış Tüm Makaleler"}
                </h3>
                <p className="text-[11px] text-gray-400 font-semibold mt-0.5">Tüm kayıtları listeleyin ve arama yapın</p>
              </div>
              <button
                onClick={() => { setAllPostsModal(null); setModalSearchQuery(""); }}
                className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-red-50 hover:text-red-500 text-gray-400 flex items-center justify-center transition-colors cursor-pointer border-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Bar inside Modal */}
            <div className="px-8 py-4 border-b border-gray-50 bg-gray-50/50 flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Başlığa veya kategoriye göre makale ara..."
                  value={modalSearchQuery}
                  onChange={(e) => setModalSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/20 outline-none text-xs font-semibold text-gray-800 bg-white"
                />
              </div>
              {modalSearchQuery && (
                <button
                  onClick={() => setModalSearchQuery("")}
                  className="px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-600 rounded-lg text-[10px] font-bold uppercase transition-colors cursor-pointer"
                >
                  Temizle
                </button>
              )}
            </div>

            {/* Scrollable Post List */}
            <div className="flex-1 overflow-y-auto p-8 space-y-4">
              {(() => {
                const nowStr = new Date().toISOString().split('T')[0];
                const list = posts.filter(p => {
                  const isMatch = allPostsModal === "published" 
                    ? (!p.date || p.date <= nowStr)
                    : (p.date && p.date > nowStr);
                  
                  const matchesSearch = p.title.toLowerCase().includes(modalSearchQuery.toLowerCase()) ||
                    (p.category || "").toLowerCase().includes(modalSearchQuery.toLowerCase());
                  
                  return isMatch && matchesSearch;
                });

                if (list.length === 0) {
                  return (
                    <div className="flex flex-col items-center justify-center text-center p-12 text-gray-400 border border-dashed border-gray-150 rounded-2xl">
                      <AlertCircle className="w-8 h-8 mb-2 text-gray-300" />
                      <p className="text-xs font-bold uppercase tracking-wider">Aramanıza uygun makale bulunamadı.</p>
                    </div>
                  );
                }

                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {list.map(post => (
                      <div 
                        key={post.id} 
                        className={`p-4 rounded-2xl border flex items-center justify-between gap-4 transition-all hover:shadow-xs ${
                          allPostsModal === "published"
                            ? "bg-green-50/20 border-green-100 hover:border-green-300"
                            : "bg-amber-50/20 border-amber-100 hover:border-amber-300"
                        }`}
                      >
                        <div className="space-y-1 flex-1 min-w-0">
                          <h4 className="font-extrabold text-gray-800 text-xs line-clamp-2 leading-relaxed">{post.title}</h4>
                          <p className={`text-[9px] font-mono ${
                            allPostsModal === "published" ? "text-gray-400" : "text-amber-600 font-bold"
                          }`}>
                            {allPostsModal === "published" ? "" : "⏱️ Yayına Giriş: "}
                            {post.date.split('-').reverse().join('/')} • {post.category || "Genel"}
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => {
                              handleEditPost(post);
                              setAllPostsModal(null);
                            }}
                            className="w-8 h-8 rounded-lg bg-blue-50 text-[#0EA5E9] hover:bg-[#0EA5E9] hover:text-white transition-colors flex items-center justify-center border border-blue-100 cursor-pointer"
                            title="Haberi Düzenle"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              handleDeletePost(post.id);
                            }}
                            className="w-8 h-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors flex items-center justify-center border border-red-100 cursor-pointer"
                            title="Haberi Sil"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 border-t border-gray-100 px-8 py-4 flex justify-end">
              <button
                type="button"
                onClick={() => { setAllPostsModal(null); setModalSearchQuery(""); }}
                className="px-5 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 font-black uppercase text-[10px] tracking-wider rounded-xl transition-all cursor-pointer"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VISUAL DATA EDITOR MODAL */}
      {modalOpen && editingItem && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 relative">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-8 py-5 border-b border-gray-100 rounded-t-3xl">
              <div>
                <h3 className="font-black text-gray-800 text-lg uppercase tracking-tight">Veriyi Düzenle</h3>
                <p className="text-[11px] text-gray-400 font-semibold mt-0.5">{selectedFile} içindeki kaydı güncelleyin</p>
              </div>
              <button
                onClick={() => { setModalOpen(false); setEditingItem(null); setEditingItemIndex(null); }}
                className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-red-50 hover:text-red-500 text-gray-400 flex items-center justify-center transition-colors cursor-pointer border-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={saveVisualItem} className="p-8 space-y-6">
              {/* 3. Form Fields for projects.ts */}
              {selectedFile === 'projects.ts' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2">Proje Başlığı</label>
                    <input
                      type="text"
                      required
                      value={editingItem.title || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-800"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2">Konum / Şehir</label>
                    <input
                      type="text"
                      required
                      value={editingItem.location || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-800"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2">Proje Kapsamı</label>
                    <input
                      type="text"
                      value={editingItem.scope || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, scope: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-800"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2">Kategori</label>
                    <select
                      value={editingItem.category || "servis"}
                      onChange={(e) => {
                        const labels: Record<string, string> = { satis: "Jeneratör Satış", kiralama: "Jeneratör Kiralama", servis: "Jeneratör Servis", "yedek-parca": "Yedek Parça" };
                        setEditingItem({ ...editingItem, category: e.target.value, categoryLabel: labels[e.target.value] || "" });
                      }}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-800 bg-white"
                    >
                      <option value="servis">Servis</option>
                      <option value="satis">Satış</option>
                      <option value="kiralama">Kiralama</option>
                      <option value="yedek-parca">Yedek Parça</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2">Bölge</label>
                    <select
                      value={editingItem.region || "marmara"}
                      onChange={(e) => {
                        const labels: Record<string, string> = { marmara: "Marmara Bölgesi", ege: "Ege Bölgesi", akdeniz: "Akdeniz Bölgesi", anadolu: "İç/Doğu Anadolu", yurtdisi: "Yurtdışı Projeleri" };
                        setEditingItem({ ...editingItem, region: e.target.value, regionLabel: labels[e.target.value] || "" });
                      }}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-800 bg-white"
                    >
                      <option value="marmara">Marmara Bölgesi</option>
                      <option value="ege">Ege Bölgesi</option>
                      <option value="akdeniz">Akdeniz Bölgesi</option>
                      <option value="anadolu">Anadolu</option>
                      <option value="yurtdisi">Yurtdışı</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2">Proje Durumu</label>
                    <select
                      value={editingItem.status || "completed"}
                      onChange={(e) => setEditingItem({ ...editingItem, status: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-800 bg-white"
                    >
                      <option value="completed">Tamamlandı</option>
                      <option value="ongoing">Devam Ediyor</option>
                    </select>
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2">Görsel URL / Dosya Yolu</label>
                    <div className="flex gap-4">
                      <input
                        type="text"
                        value={editingItem.img || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, img: e.target.value })}
                        className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-800"
                        placeholder="/images/akanenerji/..."
                      />
                      <label className="px-5 py-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#0EA5E9] font-black uppercase text-xs tracking-wider flex items-center justify-center shrink-0 cursor-pointer transition-colors border border-blue-100">
                        Resim Yükle
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={async (e) => {
                            if (!e.target.files || e.target.files.length === 0) return;
                            const file = e.target.files[0];
                            const formData = new FormData();
                            formData.append("file", file);
                            try {
                              const uploadRes = await fetch("/api/admin/upload", {
                                method: "POST",
                                body: formData
                              });
                              const uploadData = await uploadRes.json();
                              if (uploadRes.ok && uploadData.url) {
                                setEditingItem({ ...editingItem, img: uploadData.url });
                              } else {
                                alert(uploadData.error || "Yükleme hatası");
                              }
                            } catch (err: any) {
                              alert("Bağlantı hatası: " + err.message);
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2">Proje Açıklaması</label>
                    <textarea
                      rows={2}
                      value={editingItem.description || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-800"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2">Teknik Detaylar (Detaylı Keşif / İşlem)</label>
                    <textarea
                      rows={3}
                      value={editingItem.technicalDetails || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, technicalDetails: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-800"
                    />
                  </div>
                  {/* Homepage Featured toggle */}
                  <div className="md:col-span-2 bg-[#0EA5E9]/5 p-5 rounded-2xl border border-[#0EA5E9]/20 flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <label className="block text-xs font-black text-gray-800 uppercase tracking-wide">Anasayfada Örnek Projeler Arasında Göster</label>
                      <p className="text-[10px] text-gray-400 font-semibold leading-normal">
                        Bu ayar etkinleştirildiğinde, proje anasayfadaki &quot;Örnek Projelerimiz&quot; kısmında kayan vitrinde gösterilir.
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={!!editingItem.showOnHomepage}
                        onChange={(e) => setEditingItem({ ...editingItem, showOnHomepage: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0EA5E9]"></div>
                    </label>
                  </div>
                </div>
              )}


              {/* 5. Form Fields for posts.json */}
              {selectedFile === 'posts.json' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2">Başlık</label>
                    <input
                      type="text"
                      required
                      value={editingItem.title || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-800"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2">Kategori</label>
                    <select
                      value={editingItem.category || "Genel"}
                      onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-800 bg-white"
                    >
                      <option value="Genel">Genel</option>
                      <option value="Jeneratör Bakımı">Jeneratör Bakımı</option>
                      <option value="Yakıt Sistemleri">Yakıt Sistemleri</option>
                      <option value="Arıza Giderme">Arıza Giderme</option>
                      <option value="Güç Hesabı">Güç Hesabı</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2">Kısa Özet</label>
                    <textarea
                      rows={2}
                      value={editingItem.excerpt || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, excerpt: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-800"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2">Görsel URL</label>
                    <input
                      type="text"
                      value={editingItem.imageUrl || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, imageUrl: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-800"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2">Video URL (Opsiyonel)</label>
                    <input
                      type="url"
                      value={editingItem.videoUrl || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, videoUrl: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-800"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2">Makale İçeriği (Markdown veya HTML Destekler)</label>
                    <textarea
                      rows={10}
                      required
                      value={editingItem.content || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, content: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-800"
                    />
                  </div>
                </div>
              )}

              {/* 6. Form Fields for certificates.json */}
              {selectedFile === 'certificates.json' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2">Belge Adı</label>
                    <input
                      type="text"
                      required
                      value={editingItem.title || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-800"
                      placeholder="Örn: TSE Hizmet Yeterlilik Belgesi"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2">Belge Açıklaması</label>
                    <textarea
                      rows={2}
                      required
                      value={editingItem.desc || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, desc: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-800"
                      placeholder="Belgenin kapsamı veya TS standardı hakkında kısa bilgi..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2">Belge Görseli (Görsel URL / Dosya Yolu)</label>
                    <div className="flex gap-4">
                      <input
                        type="text"
                        required
                        value={editingItem.img || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, img: e.target.value })}
                        className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-800"
                        placeholder="/images/akanenerji/..."
                      />
                      <label className="px-5 py-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#0EA5E9] font-black uppercase text-xs tracking-wider flex items-center justify-center shrink-0 cursor-pointer transition-colors border border-blue-100">
                        Resim Yükle
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={async (e) => {
                            if (!e.target.files || e.target.files.length === 0) return;
                            const file = e.target.files[0];
                            const formData = new FormData();
                            formData.append("file", file);
                            try {
                              const uploadRes = await fetch("/api/admin/upload", {
                                method: "POST",
                                body: formData
                              });
                              const uploadData = await uploadRes.json();
                              if (uploadRes.ok && uploadData.url) {
                                setEditingItem({ ...editingItem, img: uploadData.url });
                              } else {
                                alert(uploadData.error || "Yükleme hatası");
                              }
                            } catch (err: any) {
                              alert("Bağlantı hatası: " + err.message);
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* 7. Form Fields for references.ts */}
              {selectedFile === 'references.ts' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2">Referans Kurum/Firma Adı</label>
                    <input
                      type="text"
                      required
                      value={editingItem.name || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-800"
                      placeholder="Örn: Pendik Devlet Hastanesi"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2">Kategori</label>
                    <select
                      value={editingItem.category || "ozel"}
                      onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-800 bg-white"
                    >
                      <option value="kamu-saglik">Kamu & Sağlık</option>
                      <option value="egitim">Eğitim & Akademi</option>
                      <option value="ozel">Özel Sektör / Sanayi</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2">Kısa Etiket</label>
                    <input
                      type="text"
                      required
                      value={editingItem.tag || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, tag: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-800"
                      placeholder="Örn: Sağlık Bakanlığı veya Belediye"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2">Logo Görseli (Dosya Yolu / URL)</label>
                    <div className="flex gap-4">
                      <input
                        type="text"
                        required
                        value={editingItem.logo || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, logo: e.target.value })}
                        className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-800"
                        placeholder="/images/akanenerji/..."
                      />
                      <label className="px-5 py-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-white font-black uppercase text-xs tracking-wider flex items-center justify-center shrink-0 cursor-pointer transition-colors border border-blue-100">
                        Resim Yükle
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={async (e) => {
                            if (!e.target.files || e.target.files.length === 0) return;
                            const file = e.target.files[0];
                            const formData = new FormData();
                            formData.append("file", file);
                            try {
                              const uploadRes = await fetch("/api/admin/upload", {
                                method: "POST",
                                body: formData
                              });
                              const uploadData = await uploadRes.json();
                              if (uploadRes.ok && uploadData.url) {
                                setEditingItem({ ...editingItem, logo: uploadData.url });
                              } else {
                                alert(uploadData.error || "Yükleme hatası");
                              }
                            } catch (err: any) {
                              alert("Bağlantı hatası: " + err.message);
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* 7.5 Form Fields for partners.json */}
              {selectedFile === 'partners.json' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2">Marka Adı</label>
                    <input
                      type="text"
                      required
                      value={editingItem.name || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-800"
                      placeholder="Örn: Aksa Jeneratör"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2">Logo Görseli (Dosya Yolu / URL)</label>
                    <div className="flex gap-4">
                      <input
                        type="text"
                        required
                        value={editingItem.logo || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, logo: e.target.value })}
                        className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-800"
                        placeholder="/images/akanenerji/..."
                      />
                      <label className="px-5 py-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 font-black uppercase text-xs tracking-wider flex items-center justify-center shrink-0 cursor-pointer transition-colors border border-blue-100">
                        Resim Yükle
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={async (e) => {
                            if (!e.target.files || e.target.files.length === 0) return;
                            const file = e.target.files[0];
                            const formData = new FormData();
                            formData.append("file", file);
                            try {
                              const uploadRes = await fetch("/api/admin/upload", {
                                method: "POST",
                                body: formData
                              });
                              const uploadData = await uploadRes.json();
                              if (uploadRes.ok && uploadData.url) {
                                setEditingItem({ ...editingItem, logo: uploadData.url });
                              } else {
                                alert(uploadData.error || "Yükleme hatası");
                              }
                            } catch (err: any) {
                              alert("Bağlantı hatası: " + err.message);
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* 8. Form Fields for testimonials.ts */}
              {selectedFile === 'testimonials.ts' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2">Müşteri Adı Soyadı</label>
                      <input
                        type="text"
                        required
                        value={editingItem.name || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-800"
                        placeholder="Örn: Murat Yılmaz"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2">Görevi / Rolü</label>
                      <input
                        type="text"
                        required
                        value={editingItem.role || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, role: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-800"
                        placeholder="Örn: Ev Sahibi"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2">Kurum / İlçe Adı</label>
                      <input
                        type="text"
                        required
                        value={editingItem.company || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, company: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-800"
                        placeholder="Örn: Serdivan / Sakarya"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2">Puan (1 - 5)</label>
                      <select
                        value={editingItem.rating || 5}
                        onChange={(e) => setEditingItem({ ...editingItem, rating: Number(e.target.value) })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-800 bg-white"
                      >
                        <option value="5">5 Yıldız (Mükemmel)</option>
                        <option value="4">4 Yıldız (Çok İyi)</option>
                        <option value="3">3 Yıldız (Orta)</option>
                        <option value="2">2 Yıldız (Zayıf)</option>
                        <option value="1">1 Yıldız (Çok Kötü)</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2">Avatar Baş Harfleri (Maks 3 Harf)</label>
                      <input
                        type="text"
                        required
                        maxLength={3}
                        value={editingItem.initials || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, initials: e.target.value.toUpperCase() })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-800"
                        placeholder="Örn: MY"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2">Profil Fotoğrafı URL (Unsplash veya Benzeri)</label>
                      <input
                        type="text"
                        required
                        value={editingItem.avatar || ""}
                        onChange={(e) => setEditingItem({ ...editingItem, avatar: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-800"
                        placeholder="https://images.unsplash.com/photo-..."
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-2">Yorum Metni</label>
                    <textarea
                      rows={4}
                      required
                      value={editingItem.quote || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, quote: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-800"
                      placeholder="Aldığınız hizmet hakkındaki detaylı yorum..."
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => { setModalOpen(false); setEditingItem(null); setEditingItemIndex(null); }}
                  className="flex-1 py-3.5 border border-gray-200 text-gray-500 font-black uppercase tracking-wider rounded-xl hover:bg-gray-50 transition-all text-xs cursor-pointer"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3.5 bg-[#0EA5E9] text-white font-black uppercase tracking-wider rounded-xl hover:brightness-105 transition-all text-xs cursor-pointer shadow-md shadow-[#0EA5E9]/10 flex items-center justify-center gap-2 border-0"
                >
                  <Check className="w-4 h-4" /> Değişiklikleri Uygula
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
