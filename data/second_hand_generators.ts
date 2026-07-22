export interface SecondHandGenerator {
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

export const SECOND_HAND_GENERATORS: SecondHandGenerator[] = [
  {
    "id": 1,
    "title": "150 kVA Aksa Cummins Dizel Jeneratör",
    "brand": "Aksa",
    "power": "150 kVA",
    "engine": "Cummins",
    "hours": "420 Saat",
    "year": "2022",
    "status": "Revizyonlu & Garantili",
    "image": "https://www.akanenerji.com/wp-content/uploads/2025/10/hizmet-detail-satis.jpg",
    "desc": "Tüm periyodik bakımları, filtre ve motor sıvı değişimleri atölyemizde yapılmıştır. %100 Yük Testi (Load Bank) raporu ile birlikte teslim edilecektir. AKAN ENERJİ güvencesiyle 6 ay teknik servis garantilidir."
  },
  {
    "id": 2,
    "title": "275 kVA Teksan Doosan Dizel Jeneratör",
    "brand": "Teksan",
    "power": "275 kVA",
    "engine": "Doosan",
    "hours": "850 Saat",
    "year": "2021",
    "status": "Çok Temiz / Bakımlı",
    "image": "https://www.akanenerji.com/wp-content/uploads/2025/10/hizmet-jenerator-satis.jpg",
    "desc": "Fabrika yedek güç grubundan sökülmüş, elektrik kesintileri dışında neredeyse hiç çalışmamıştır. Kontrol paneli ve transfer panosu (ATS) ile birlikte eksiksiz settir. 6 ay mekanik garantilidir."
  },
  {
    "id": 3,
    "title": "55 kVA KJ Power Ricardo Dizel Jeneratör",
    "brand": "KJ Power",
    "power": "55 kVA",
    "engine": "Ricardo",
    "hours": "180 Saat",
    "year": "2023",
    "status": "Sıfır Ayarında",
    "image": "https://www.akanenerji.com/wp-content/uploads/2025/10/hizmet-kiralama.jpg",
    "desc": "Yalnızca şantiye ofisinde yedek olarak bekletilmiş, düşük çalışma saatine sahip sıfır ayarında kabinli jeneratör. Tüm koruyucu bakımları yeni yapılmıştır."
  },
  {
    "id": 4,
    "title": "500 kVA Alimar Deutz Dizel Jeneratör",
    "brand": "Alimar",
    "power": "500 kVA",
    "engine": "Deutz",
    "hours": "1100 Saat",
    "year": "2020",
    "status": "Komple Revizyonlu",
    "image": "https://www.akanenerji.com/wp-content/uploads/2025/10/hizmet-servis.jpg",
    "desc": "Ağır sanayi tipi Deutz motorlu, güçlü alternatörlü grup. Silindir kapak conta takımı, segmanlar ve tüm yataklar atölyemizde orijinal parçalarla yenilenmiştir. %100 yükte test raporu mevcuttur."
  }
];
