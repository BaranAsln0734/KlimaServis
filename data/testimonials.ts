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
    "quote": "Evime klima aldım, montaj için Sakarya Uzman Klima'yı aradım. Aynı gün gelip tertemiz işçilikle kurdular. Duvar borulaması çok nizami yapıldı, elinize sağlık.",
    "rating": 5,
    "initials": "MY",
    "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
  },
  {
    "id": 2,
    "name": "Elif Şahin",
    "role": "Ofis Yöneticisi",
    "company": "Adapazarı / Sakarya",
    "quote": "Şirket ofisimizin kaset klimalarının periyodik bakımı ve gaz dolumu için hizmet aldık. Havalandırma performansı bariz arttı. İşinin ehli, son derece kibar ekipler.",
    "rating": 5,
    "initials": "EŞ",
    "avatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
  },
  {
    "id": 3,
    "name": "Ahmet Demir",
    "role": "Esnaf",
    "company": "Erenler / Sakarya",
    "quote": "Gece yarısı dükkandaki klimamız su akıtmaya başladı. 7/24 acil servis hattından ulaştım, sabah saatlerinde gelip arızayı çözdüler. Orijinal yedek parça garantisi de verdiler.",
    "rating": 5,
    "initials": "AD",
    "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop"
  },
  {
    "id": 4,
    "name": "Zeynep Kaya",
    "role": "Mimar",
    "company": "Sapanca / Sakarya",
    "quote": "Sapanca'daki proje villamız için VRF merkezi klima sistemi kurulumu yaptırdık. Keşif ve mühendislik hesaplarından montaja kadar her aşamada mükemmel bir profesyonellik sergilediler.",
    "rating": 5,
    "initials": "ZK",
    "avatar": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop"
  },
  {
    "id": 5,
    "name": "Mustafa Koç",
    "role": "Villa Sahibi",
    "company": "Akyazı / Sakarya",
    "quote": "Klima bakımı konusunda Sakarya'da tek geçerim. Filtreleri kimyasalla tertemiz yıkayıp dezenfekte ediyorlar. Enerji sarfiyatımız periyodik bakımlardan sonra gözle görülür şekilde düştü.",
    "rating": 5,
    "initials": "MK",
    "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop"
  },
  {
    "id": 6,
    "name": "Selin Öztürk",
    "role": "Yazlık Sahibi",
    "company": "Karasu / Sakarya",
    "quote": "Karasu'daki yazlığımızın klimasını söktürüp başka odaya taşıttık. Gazı hiç boşa gitmeden cihazın içine topladılar ve yeni yerine kurdular. Güvenilir ve dürüst esnaflar.",
    "rating": 5,
    "initials": "SÖ",
    "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop"
  }
];
