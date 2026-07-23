export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  initials: string;
  avatar: string;
}

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    "id": 1,
    "name": "Murat Yılmaz",
    "role": "Ev Sahibi",
    "company": "Serdivan / Sakarya",
    "quote": "Çamaşır makinemiz sıkma yaparken kazan çok gürültü çıkarıyordu. Sakarya Uzman ekibi aynı gün adrese gelip amortisör ve rulman değişimini yaptılar. 1 yıl parça garantisiyle ilk günkü gibi sessiz çalışıyor.",
    "rating": 5,
    "initials": "MY",
    "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
  },
  {
    "id": 2,
    "name": "Elif Şahin",
    "role": "Ofis Yöneticisi",
    "company": "Adapazarı / Sakarya",
    "quote": "Ofisimizin klimalarının periyodik bakımı ve R32 gaz dolumu için hizmet aldık. Hem soğutma performansı bariz arttı hem de elektrik faturamız düştü. İşinin ehli, dürüst teknik servis.",
    "rating": 5,
    "initials": "EŞ",
    "avatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
  },
  {
    "id": 3,
    "name": "Ahmet Demir",
    "role": "Esnaf",
    "company": "Erenler / Sakarya",
    "quote": "Kış ortasında kombimiz sıcak su vermemeye başladı ve hata koduna geçti. 7/24 nöbetçi acil servisi aradım, kısa sürede gelip üç yollu vana ve anakart arızasını çözdüler. Sıcak yuvamıza kavuştuk.",
    "rating": 5,
    "initials": "AD",
    "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop"
  },
  {
    "id": 4,
    "name": "Zeynep Kaya",
    "role": "Villa Sahibi",
    "company": "Sapanca / Sakarya",
    "quote": "Buzdolabımızın alt bölmesi soğutmadığı için gıdalar bozulmak üzereydi. Ustalar hemen gelip defrost rezistansı ve sensör değişimini yerinde yaptı. Gıdalarımız kurtuldu, teşekkürler.",
    "rating": 5,
    "initials": "ZK",
    "avatar": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop"
  },
  {
    "id": 5,
    "name": "Mustafa Koç",
    "role": "Müstakil Ev Sahibi",
    "company": "Akyazı / Sakarya",
    "quote": "Bulaşık makinesi su boşaltmıyor ve kurutma makinesi çamaşırları nemli bırakıyordu. İki cihazımıza da aynı gün yerinde müdahale edip pompa ve ısı pompası bakımını hallettiler.",
    "rating": 5,
    "initials": "MK",
    "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop"
  },
  {
    "id": 6,
    "name": "Selin Öztürk",
    "role": "Yazlık Sahibi",
    "company": "Karasu / Sakarya",
    "quote": "Yeni klimamızın vakumlu montajını yaptırdık, ayrıca arızalı robot süpürgemizin batarya değişimini hallettiler. Sakarya'da iklimlendirme ve beyaz eşya servisinde kesinlikle tek adres.",
    "rating": 5,
    "initials": "SÖ",
    "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop"
  }
];
