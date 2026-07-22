export interface Project {
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

export const PROJECTS: Project[] = [
  {
    "id": 4,
    "title": "ENTES GKRC ROLE DEGISIMI VE ELEKTRIK ARIZASI GIDERME ",
    "location": "TAKSIM/ISTANBUL ",
    "scope": "ENTES GKRC ROLE DEGISIMI VE ELEKTRIKSEL ARIZA GIDERME ",
    "description": "JENERATORDE MEYDANA GELEN ELEKTRIK ARIZASI YERINDE TESPIT EDILEREK ARIZALI ENTES GKRC ROLESI DEGISTIRILMISTIR SISTEM KONTOLLERI TAMAMLANARAK JENERATOR SORUNSUZ SEKILDE YENIDEN DEVREYE ALINMISTIR ",
    "category": "servis",
    "categoryLabel": "Jeneratör Servis",
    "technicalDetails": "ENTES GKRCYENISI ILE DEGISTIRILMIS,KONTROL PANELI ,KUMANDA DEVRELERI VE ELEKTRIK BAGLANTILARI TEST EDILMISTIR GEREKLI AYARLAMALAR YAPILDIKTAN SONRA SISTEM YUK ALTINDA CALISTIRILARAK SORUNSUZ TESLIM EDILMISTIR",
    "img": "https://rsbojkoctsexvovlpisc.supabase.co/storage/v1/object/public/images/akanenerji/1783940590750_4.jpg",
    "region": "marmara",
    "regionLabel": "Marmara Bölgesi",
    "status": "completed",
    "showOnHomepage": true
  },
  {
    "id": 3,
    "title": "770 KVA JENERATOR HARARET ARIZASI",
    "location": "SULTANAHMET/ISTANBUL",
    "scope": "HARARET ARIZASI ONARIMI ",
    "description": "770 KVA JENERATOR DE OLUSAN HARERET ARIZASI YERINDE TESPIT EDILEREK GEREKLI BAKIM ONARIM ISLEMLERI TAMAMLANMISTIR ,JENERATOR SORUNSUZ SEKILDE DEVREYE ALINMISTIR ",
    "category": "servis",
    "categoryLabel": "Jeneratör Servis",
    "technicalDetails": "RADYATOR ,FAN SISTEMI,SU POMPASI,TERMOSTAT VE SOGUTMA DEVRESI KONTROL EDILEREK ARIZA GIDERILMIS YUK TESTI BASARIYLA TAMAMLANMISTIR ",
    "img": "https://rsbojkoctsexvovlpisc.supabase.co/storage/v1/object/public/images/akanenerji/1783940703140_5.jpg",
    "region": "marmara",
    "regionLabel": "Marmara Bölgesi",
    "status": "completed",
    "showOnHomepage": true
  },
  {
    "id": 2,
    "title": "ARNAVUTKOY AD490 KVA JENERATOR ARIZA TESPITI VE YERINDE ONARIM",
    "location": "ARNAVUTKOY /ISTANBUL",
    "scope": "490 KVA DIZEL JENERATOR ARIZA TESPITI VE MEKANIK ONARIM ",
    "description": "ARNAVUTKOYDE BULUNAN 490 KVA DIZEL JENERATORDE MEYDANA GELEN ARIZA AKAN ENERJI TEKNIK EKIBI TARAFINDAN YERINDE DETAYLI OLARAK INCELENMISTIR.YAPILAN KONTROLLER SONUCUNDA ARIZA COZUME KAVUSMUSTUR ",
    "category": "servis",
    "categoryLabel": "Jeneratör Servis",
    "technicalDetails": "JENERATOR UZERINDE KAPSAMLI TEKNIK KONTROLLER GERCEKLESMISTIR.MOTOR,ALTERNATOR,KONTROL PANELI,MARS SISTEMI,SARJSISTEMI,YAKIT HATTI YAGLAMA VE SOGUTMA SISTEMI DETAYLI OLARAK INCELENMISTIR .ELEKTRIKSEL OLCUMLER YAPILARAK ARIZA KAYNAGI TESPIT EDILMISTIR.GEREKLI ONARIM VE AYARLAMALAR TAMAMLANMISTIR.SON OLARAK YUK ALTINDA TEST CALISMASI YAPILARAK JENERATORUN GUVENLI VE KARARLI CALISTIGI DOGRULANMISTIR",
    "img": "https://rsbojkoctsexvovlpisc.supabase.co/storage/v1/object/public/images/akanenerji/1783940461049_1.jpg",
    "region": "marmara",
    "regionLabel": "Marmara Bölgesi",
    "status": "completed",
    "showOnHomepage": true
  }
];
