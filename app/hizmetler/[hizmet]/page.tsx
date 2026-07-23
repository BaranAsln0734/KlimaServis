import { notFound } from "next/navigation";
import ServiceDetailClientPage from "@/components/ServiceDetailClientPage";

interface ServiceDetail {
  title: string;
  slug: string;
  iconName: string;
  image: string;
  intro: string;
  whyRequired: string;
  scope: { title: string; desc: string }[];
  benefits: string[];
  faqs: { q: string; a: string }[];
}

const SERVICES_DATA: { [key: string]: ServiceDetail } = {
  "camasir-makinesi-ariza-servisi": {
    title: "Çamaşır Makinesi Arıza Servisi",
    slug: "camasir-makinesi-ariza-servisi",
    iconName: "activity",
    image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?q=80&w=800&auto=format&fit=crop",
    intro: "Çamaşır makineniz su almıyor, sıkma yapmıyor, sesli çalışıyor veya su sızdırıyorsa uzman teknik ekibimiz orijinal yedek parça garantisiyle aynı gün yerinde tamir hizmeti sunar.",
    whyRequired: "Çamaşır makinesi arızaları zamanında giderilmediğinde motor yanması, kazan bilyası dağılması veya evi su basması gibi büyük hasarlara yol açabilir.",
    scope: [
      { title: "Motor ve Kazan Tamiri", desc: "Kazan bilyası, amortisör, kayış ve motor kömürü değişimleri yerinde yapılır." },
      { title: "Pompa ve Kart Onarımı", desc: "Su tahliye pompası tıkanıklığı ve elektronik kart arızaları orijinal parçalarla giderilir." },
      { title: "Deterjan ve Rezistans Bakımı", desc: "Kireçlenen ısıtıcı rezistanslar değiştirilerek yıkama kalitesi ilk günkü seviyesine getirilir." }
    ],
    benefits: [
      "Aynı gün adreste hızlı arıza tespiti ve tamir.",
      "1 Yıl parça ve işçilik garantisi.",
      "Orijinal ve sertifikalı yedek parça kullanımı.",
      "Sıkma ve yıkama performansının yenilenmesi."
    ],
    faqs: [
      { q: "Çamaşır makinesi neden çok gürültülü sıkma yapar?", a: "Kazan bilyalarının (rulman) aşınması veya amortisörlerin patlaması sıkma esnasında şiddetli sarsıntı ve gürültüye sebep olur." },
      { q: "Makine suyu boşaltmıyorsa ne yapılmalı?", a: "Pompa filtresinde bozuk para veya yabancı cisim birikmiş olabilir. Filtre temizlendikten sonra sorun sürüyorsa pompa motoru değiştirilir." },
      { q: "Tamir garantili midir?", a: "Evet, servisimiz tarafından değiştirilen tüm parçalar 1 yıl garanti kapsamındadır." }
    ]
  },
  "bulasik-makinesi-ariza-servisi": {
    title: "Bulaşık Makinesi Arıza Servisi",
    slug: "bulasik-makinesi-ariza-servisi",
    iconName: "shield-check",
    image: "https://images.unsplash.com/photo-1585837575652-267c041d77d4?q=80&w=800&auto=format&fit=crop",
    intro: "Bulaşık makineniz iyi yıkamıyor, lekeli bırakıyor, su ısıtmıyor veya kurutma yapmıyorsa 7/24 mobil teknik servisimizle sorunsuz çözümler sağlıyoruz.",
    whyRequired: "Tıkalı fıskiyeler veya arızalı sirkülasyon pompaları bulaşıkların hijyensiz kalmasına ve bakteri üretmesine sebep olur.",
    scope: [
      { title: "Sirkülasyon Pompası Tamiri", desc: "Yıkama basıncını sağlayan motor ve pompa aksamı yenilenir veya tamir edilir." },
      { title: "Isıtıcı NTC & Rezistans", desc: "Suyun istenen dereceye ulaşmasını sağlayan rezistans ve sıcaklık sensörleri değiştirilir." },
      { title: "Fıskiye ve Kart Temizliği", desc: "Tıkanan alt ve üst fıskiyeler temizlenir, elektronik anakart test edilir." }
    ],
    benefits: [
      "Bulaşıklarda lekesiz ve pırıl pırıl yıkama garantisi.",
      "Düşük su ve elektrik tüketimi verimliliği.",
      "Aynı gün adrese servis desteği.",
      "1 Yıl işçilik ve yedek parça garantisi."
    ],
    faqs: [
      { q: "Bulaşık makinesi neden kurutma yapmaz?", a: "NTC sensörü arızası veya rezistans arızası nedeniyle su ısınmazsa bulaşıklar ıslak kalır." },
      { q: "Tablet deterjan erimiyorsa sebebi nedir?", a: "Deterjan kutusu kapağı arızalı olabilir veya su sıcaklığı yeterli dereceye ulaşmıyordur." },
      { q: "Servis süresi ne kadardır?", a: "Arızaların %90'ı adreste aynı gün 1-2 saat içinde çözüme kavuşturulur." }
    ]
  },
  "buzdolabi-ariza-servisi": {
    title: "Buzdolabı Arıza Servisi",
    slug: "buzdolabi-ariza-servisi",
    iconName: "zap",
    image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?q=80&w=800&auto=format&fit=crop",
    intro: "Buzdolabınız soğutmuyor, buzlanma yapıyor, motoru sürekli çalışıyor veya gaz kaçağı varsa gıdalarınız bozulmadan acil mobil ekibimiz adresi ziyaret eder.",
    whyRequired: "Buzdolabı arızaları gıdaların hızla bozulmasına ve yüksek maddi kayıplara sebep olan en kritik ev aleti arızalarındandır.",
    scope: [
      { title: "Kompresör (Motor) Değişimi", desc: "Sıkışan veya yanan motorlar orijinal sıfır kompresörle değiştirilerek sistem vakumlanır ve gaz şarjı yapılır." },
      { title: "No-Frost Defrost Tamiri", desc: "Buzlanmayı önleyen rezistans, bi-metal termostat ve sensörler kontrol edilir." },
      { title: "Gaz Kaçak Tespiti & Şarjı", desc: "R600a ve R134a gaz sızıntıları kaynakla giderilip hassas terazili gaz dolumu gerçekleştirilir." }
    ],
    benefits: [
      "Gıdalarınız bozulmadan acil hızlı müdahale.",
      "Garantili motor ve gaz şarjı işlemleri.",
      "Sessiz ve verimli kompresör performansı.",
      "Tüm No-Frost ve Gardırop tipi dolaplarda uzmanlık."
    ],
    faqs: [
      { q: "Buzdolabının alt kısmı neden soğutmaz?", a: "No-Frost hava kanallarının buzlanması veya damper motoru arızası üstten alta soğuk hava akışını engeller." },
      { q: "Motor çok sıcak ve sürekli çalışıyorsa?", a: "Gaz eksikliği veya termostat arızası nedeniyle dolap istenen dereceye ulaşamadığı için motor durmadan çalışır." },
      { q: "Gaz dolumu garantili midir?", a: "Kaçak testi yapılıp sızıntı kaynaklandıktan sonra yapılan gaz dolumları 1 yıl garantilidir." }
    ]
  },
  "kombi-ariza-servisi": {
    title: "Kombi Arıza Servisi",
    slug: "kombi-ariza-servisi",
    iconName: "cpu",
    image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=800&auto=format&fit=crop",
    intro: "Kombiniz sıcak su vermiyor, petekleri ısıtmıyor, basınç düşürüyor veya ateşleme yapmıyorsa sertifikalı kombi teknisyenlerimizle 7/24 güvenli servis sunuyoruz.",
    whyRequired: "Kombi arızaları kış aylarında konfor kaybına ve gaz kaçakları ile aşırı yüksek doğalgaz faturalarına yol açabilir.",
    scope: [
      { title: "Anakart & İyonizasyon Tamiri", desc: "Ateşleme yapmayan veya hata kodu veren kombilerin elektronik kartları onarılır." },
      { title: "Devirdaim Pompası & Üç Yollu Vana", desc: "Peteklere sıcak su sirkülasyonunu sağlayan pompa ve vana bakımları yapılır." },
      { title: "Eşanjör & Petek Temizliği", desc: "Kireçlenen plakalı eşanjörler ve petekler özel ilacımızla yıkanarak ısı verimi artırılır." }
    ],
    benefits: [
      "Doğalgaz faturalarında hissedilir tasarruf.",
      "7/24 Kesintisiz sıcak su ve petek ısınma garantisi.",
      "Sertifikalı ve uzman teknik kadro.",
      "1 Yıl resmi işçilik ve parça garantisi."
    ],
    faqs: [
      { q: "Kombi bar basıncı neden sürekli düşer?", a: "Genleşme tankı havası bitmiş olabilir veya tesisatta mikro su kaçağı mevcuttur." },
      { q: "Peteklerin altı soğuk üstü sıcaksa?", a: "Petek içinde çamurlaşma birikmiştir. Tesisat yıkanarak sirke ve kimyasal bakımla temizlenmelidir." },
      { q: "Kombi su akıtıyorsa ne yapılmalı?", a: "Emniyet valfi açmış olabilir. Kombiyi kapatıp servis çağırmanız önerilir." }
    ]
  },
  "klima-arizasi-servisi": {
    title: "Klima Arızası Servisi",
    slug: "klima-arizasi-servisi",
    iconName: "compass",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop",
    intro: "Sakarya genelinde klimanız soğutmuyor, ısıtmıyor, su akıtıyor veya sesli çalışıyorsa 7/24 tam donanımlı mobil araçlarımızla yerinde arıza tespiti ve tamir hizmeti sağlıyoruz.",
    whyRequired: "Giderilmeyen klima arızaları kompresör sıkışmasına ve elektrik aksamında yanmalara yol açarak yüksek maliyet oluşturabilir.",
    scope: [
      { title: "Kompresör ve Kart Tamiri", desc: "İnverter anakart onarımları ve kompresör kapasitör değişimleri yapılır." },
      { title: "Gaz Kaçak Onarımı & Dolum", desc: "R32 ve R410A soğutucu gaz sızıntıları giderilerek hassas şarj yapılır." },
      { title: "Drenaj Temizliği & Hijyen", desc: "İç ünite su akıtma problemleri ve antibakteriyel hava filtresi hijyeni sağlanır." }
    ],
    benefits: [
      "Aynı gün 30 dakikada acil yerinde müdahale.",
      "Orijinal yedek parça ve 1 yıl servis garantisi.",
      "Tüm marka ve modellerde uzman teknik altyapı.",
      "%30'a varan enerji verimliliği artışı."
    ],
    faqs: [
      { q: "Klima neden su akıtır?", a: "Drenaj hortumu tıkanıklığı veya evaporatörün buz tutması iç üniteden su sızmasına sebep olur." },
      { q: "Klima neden soğutmaz?", a: "Gaz eksikliği, kompresör arızası veya filtre tıkanıklığı soğutmayı engeller." },
      { q: "Servis garantisi var mı?", a: "Tüm parça değişimlerimiz ve işçiliklerimiz 1 yıl garantilidir." }
    ]
  },
  "kucuk-ev-aletleri-ariza-servisi": {
    title: "Küçük Ev Aletleri Arıza Servisi",
    slug: "kucuk-ev-aletleri-ariza-servisi",
    iconName: "briefcase",
    image: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?q=80&w=800&auto=format&fit=crop",
    intro: "Süpürge, mikser, kahve makinesi, ütü, robot süpürge ve diğer küçük ev aletlerinizdeki motor, kablo ve rezistans arızalarını garantili şekilde onarıyoruz.",
    whyRequired: "Arızalı küçük ev aletleri elektrik kaçakları ve kablo yanmaları sebebiyle ev güvenliği açısından risk oluşturabilir.",
    scope: [
      { title: "Süpürge Motoru & Filtre", desc: "Emiş gücü düşen süpürgelerde motor ve HEPA filtre değişimleri yapılır." },
      { title: "Kahve & Çay Makinesi", desc: "Rezistans, termostat ve su pompası arızaları tamir edilir." },
      { title: "Ütü & Mikser Onarımı", desc: "Buhar vermeyen ütüler ve dişli sıran mikserler yenilenir." }
    ],
    benefits: [
      "Cihazlarınızı yenisini almaktan çok daha uygun fiyata kurtarma imkanı.",
      "Orijinal yedek parça desteği.",
      "Hızlı teslimat ve test garantisi.",
      "Güvenli ve garantili teknik servis hizmeti."
    ],
    faqs: [
      { q: "Robot süpürge batarya değişimi yapılıyor mu?", a: "Evet, tüm marka robot süpürgelerin batarya ve fırça motoru değişimleri yapılmaktadır." },
      { q: "Ütü neden buhar vermez?", a: "Kireçlenme veya buhar valfi arızası nedeniyle buhar kanalları tıkanmış olabilir." },
      { q: "Tamir ne kadar sürer?", a: "Küçük ev aletleri arızaları genellikle 1-2 iş günü içinde tamamlanır." }
    ]
  },
  "kurutma-makinesi-ariza-servisi": {
    title: "Kurutma Makinesi Arıza Servisi",
    slug: "kurutma-makinesi-ariza-servisi",
    iconName: "sparkles",
    image: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?q=80&w=800&auto=format&fit=crop",
    intro: "Kurutma makineniz çamaşırları nemli bırakıyor, ısıtmıyor, koku yapıyor veya kayış koparmışsa ısı pompalı ve yoğuşmalı tüm modellerde uzman servis sağlıyoruz.",
    whyRequired: "Filtre ve kondanser bakımı yapılmayan kurutma makineleri aşırı ısınarak yangın riski oluşturabilir ve çamaşırları yıpratır.",
    scope: [
      { title: "Isı Pompası & Gaz Şarjı", desc: "Isı pompalı kurutma makinelerinde gaz dolumu ve kompresör kontrolleri yapılır." },
      { title: "Kayış & Kasnak Değişimi", desc: "Kazan dönmüyorsa kopan kayış ve yıpranan kasnak aksamı yenilenir." },
      { title: "Kondanser & Sensör Temizliği", desc: "Nem sensörleri ve filtrelenen tiftik kanalları derinlemesine temizlenir." }
    ],
    benefits: [
      "Çamaşırlarınızda yıpranmasız, mis kokulu ve tam kurutma.",
      "Düşük enerji tüketimi.",
      "Garantili parça ve işçilik servisi.",
      "Aynı gün yerinde müdahale imkanı."
    ],
    faqs: [
      { q: "Kurutma makinesi neden ısıtmaz?", a: "Isı pompası gazı bitmiş olabilir veya rezistans termostatı atmış olabilir." },
      { q: "Kazan dönüyor ama çamaşırlar ıslak çıkıyorsa?", a: "Tiftik filtresi ve kondanser tıkalı olduğundan sıcak hava tahliye edilemiyordur." },
      { q: "Servis garantiniz var mı?", a: "Evet, tüm kurutma makinesi arıza tamirleri 1 yıl garanti kapsamındadır." }
    ]
  },
  // Backward compatibility alias keys:
  "ariza-servis-7-24": {
    title: "Klima Arızası Servisi",
    slug: "klima-arizasi-servisi",
    iconName: "compass",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop",
    intro: "Sakarya genelinde klimanız soğutmuyor, ısıtmıyor, su akıtıyor veya sesli çalışıyorsa 7/24 tam donanımlı mobil araçlarımızla yerinde arıza tespiti ve tamir hizmeti sağlıyoruz.",
    whyRequired: "Giderilmeyen klima arızaları kompresör sıkışmasına ve elektrik aksamında yanmalara yol açarak yüksek maliyet oluşturabilir.",
    scope: [
      { title: "Kompresör ve Kart Tamiri", desc: "İnverter anakart onarımları ve kompresör kapasitör değişimleri yapılır." },
      { title: "Gaz Kaçak Onarımı & Dolum", desc: "R32 ve R410A soğutucu gaz sızıntıları giderilerek hassas şarj yapılır." },
      { title: "Drenaj Temizliği & Hijyen", desc: "İç ünite su akıtma problemleri ve antibakteriyel hava filtresi hijyeni sağlanır." }
    ],
    benefits: [
      "Aynı gün 30 dakikada acil yerinde müdahale.",
      "Orijinal yedek parça ve 1 yıl servis garantisi.",
      "Tüm marka ve modellerde uzman teknik altyapı.",
      "%30'a varan enerji verimliliği artışı."
    ],
    faqs: [
      { q: "Klima neden su akıtır?", a: "Drenaj hortumu tıkanıklığı veya evaporatörün buz tutması iç üniteden su sızmasına sebep olur." },
      { q: "Klima neden soğutmaz?", a: "Gaz eksikliği, kompresör arızası veya filtre tıkanıklığı soğutmayı engeller." },
      { q: "Servis garantisi var mı?", a: "Tüm parça değişimlerimiz ve işçiliklerimiz 1 yıl garantilidir." }
    ]
  },
  "periyodik-kontrol": {
    title: "Kombi Arıza Servisi",
    slug: "kombi-ariza-servisi",
    iconName: "cpu",
    image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=800&auto=format&fit=crop",
    intro: "Kombiniz sıcak su vermiyor, petekleri ısıtmıyor, basınç düşürüyor veya ateşleme yapmıyorsa sertifikalı kombi teknisyenlerimizle 7/24 güvenli servis sunuyoruz.",
    whyRequired: "Kombi arızaları kış aylarında konfor kaybına ve gaz kaçakları ile aşırı yüksek doğalgaz faturalarına yol açabilir.",
    scope: [
      { title: "Anakart & İyonizasyon Tamiri", desc: "Ateşleme yapmayan veya hata kodu veren kombilerin elektronik kartları onarılır." },
      { title: "Devirdaim Pompası & Üç Yollu Vana", desc: "Peteklere sıcak su sirkülasyonunu sağlayan pompa ve vana bakımları yapılır." },
      { title: "Eşanjör & Petek Temizliği", desc: "Kireçlenen plakalı eşanjörler ve petekler özel ilacımızla yıkanarak ısı verimi artırılır." }
    ],
    benefits: [
      "Doğalgaz faturalarında hissedilir tasarruf.",
      "7/24 Kesintisiz sıcak su ve petek ısınma garantisi.",
      "Sertifikalı ve uzman teknik kadro.",
      "1 Yıl resmi işçilik ve parça garantisi."
    ],
    faqs: [
      { q: "Kombi bar basıncı neden sürekli düşer?", a: "Genleşme tankı havası bitmiş olabilir veya tesisatta mikro su kaçağı mevcuttur." },
      { q: "Peteklerin altı soğuk üstü sıcaksa?", a: "Petek içinde çamurlaşma birikmiştir. Tesisat yıkanarak sirke ve kimyasal bakımla temizlenmelidir." },
      { q: "Kombi su akıtıyorsa ne yapılmalı?", a: "Emniyet valfi açmış olabilir. Kombiyi kapatıp servis çağırmanız önerilir." }
    ]
  },
  "klima-montaj": {
    title: "Çamaşır Makinesi Arıza Servisi",
    slug: "camasir-makinesi-ariza-servisi",
    iconName: "activity",
    image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?q=80&w=800&auto=format&fit=crop",
    intro: "Çamaşır makineniz su almıyor, sıkma yapmıyor, sesli çalışıyor veya su sızdırıyorsa uzman teknik ekibimiz orijinal yedek parça garantisiyle aynı gün yerinde tamir hizmeti sunar.",
    whyRequired: "Çamaşır makinesi arızaları zamanında giderilmediğinde motor yanması, kazan bilyası dağılması veya evi su basması gibi büyük hasarlara yol açabilir.",
    scope: [
      { title: "Motor ve Kazan Tamiri", desc: "Kazan bilyası, amortisör, kayış ve motor kömürü değişimleri yerinde yapılır." },
      { title: "Pompa ve Kart Onarımı", desc: "Su tahliye pompası tıkanıklığı ve elektronik kart arızaları orijinal parçalarla giderilir." },
      { title: "Deterjan ve Rezistans Bakımı", desc: "Kireçlenen ısıtıcı rezistanslar değiştirilerek yıkama kalitesi ilk günkü seviyesine getirilir." }
    ],
    benefits: [
      "Aynı gün adreste hızlı arıza tespiti ve tamir.",
      "1 Yıl parça ve işçilik garantisi.",
      "Orijinal ve sertifikalı yedek parça kullanımı.",
      "Sıkma ve yıkama performansının yenilenmesi."
    ],
    faqs: [
      { q: "Çamaşır makinesi neden çok gürültülü sıkma yapar?", a: "Kazan bilyalarının (rulman) aşınması veya amortisörlerin patlaması sıkma esnasında şiddetli sarsıntı ve gürültüye sebep olur." },
      { q: "Makine suyu boşaltmıyorsa ne yapılmalı?", a: "Pompa filtresinde bozuk para veya yabancı cisim birikmiş olabilir. Filtre temizlendikten sonra sorun sürüyorsa pompa motoru değiştirilir." },
      { q: "Tamir garantili midir?", a: "Evet, servisimiz tarafından değiştirilen tüm parçalar 1 yıl garanti kapsamındadır." }
    ]
  },
  "gaz-dolumu": {
    title: "Buzdolabı Arıza Servisi",
    slug: "buzdolabi-ariza-servisi",
    iconName: "zap",
    image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?q=80&w=800&auto=format&fit=crop",
    intro: "Buzdolabınız soğutmuyor, buzlanma yapıyor, motoru sürekli çalışıyor veya gaz kaçağı varsa gıdalarınız bozulmadan acil mobil ekibimiz adresi ziyaret eder.",
    whyRequired: "Buzdolabı arızaları gıdaların hızla bozulmasına ve yüksek maddi kayıplara sebep olan en kritik ev aleti arızalandırır.",
    scope: [
      { title: "Kompresör (Motor) Değişimi", desc: "Sıkışan veya yanan motorlar orijinal sıfır kompresörle değiştirilerek sistem vakumlanır ve gaz şarjı yapılır." },
      { title: "No-Frost Defrost Tamiri", desc: "Buzlanmayı önleyen rezistans, bi-metal termostat ve sensörler kontrol edilir." },
      { title: "Gaz Kaçak Tespiti & Şarjı", desc: "R600a ve R134a gaz sızıntıları kaynakla giderilip hassas terazili gaz dolumu gerçekleştirilir." }
    ],
    benefits: [
      "Gıdalarınız bozulmadan acil hızlı müdahale.",
      "Garantili motor ve gaz şarjı işlemleri.",
      "Sessiz ve verimli kompresör performansı.",
      "Tüm No-Frost ve Gardırop tipi dolaplarda uzmanlık."
    ],
    faqs: [
      { q: "Buzdolabının alt kısmı neden soğutmaz?", a: "No-Frost hava kanallarının buzlanması veya damper motoru arızası üstten alta soğuk hava akışını engeller." },
      { q: "Motor çok sıcak ve sürekli çalışıyorsa?", a: "Gaz eksikliği veya termostat arızası nedeniyle dolap istenen dereceye ulaşamadığı için motor durmadan çalışır." },
      { q: "Gaz dolumu garantili midir?", a: "Kaçak testi yapılıp sızıntı kaynaklandıktan sonra yapılan gaz dolumları 1 yıl garantilidir." }
    ]
  }
};

interface PageProps {
  params: Promise<{ hizmet: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { hizmet } = await params;
  const service = SERVICES_DATA[hizmet];
  if (!service) return {};

  const customTitles: { [key: string]: string } = {
    "ariza-servis-7-24": "7/24 Acil Klima Tamiri & Hızlı Teknik Servis - Sakarya Uzman Klima",
    "periyodik-kontrol": "Klima Periyodik Bakımı ve Hijyenik İlaçlama Hizmeti - Sakarya",
    "klima-montaj": "Klima Montajı, Sökümü ve Deplase Hizmetleri - Sakarya",
    "gaz-dolumu": "Klima R32 Gaz Şarjı, Sızıntı Onarımı & BTU Kapasite Keşfi"
  };

  const title = customTitles[hizmet] || `${service.title} | Sakarya Uzman Klima İklimlendirme Servisi`;
  const description = `${service.title} hizmeti. Klimanızın güvenli, verimli ve sağlıklı çalışması için Sakarya Uzman Klima güvencesiyle profesyonel servis desteği.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/hizmetler/${hizmet}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.sakaryaklimaservisi.demo/hizmetler/${hizmet}`,
    }
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { hizmet } = await params;
  const service = SERVICES_DATA[hizmet];

  if (!service) {
    notFound();
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Anasayfa",
        "item": "https://www.sakaryaklimaservisi.demo"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Hizmetlerimiz",
        "item": "https://www.sakaryaklimaservisi.demo/hizmetler"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": service.title,
        "item": `https://www.sakaryaklimaservisi.demo/hizmetler/${hizmet}`
      }
    ]
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `${service.title} Hizmeti`,
    "serviceType": service.title,
    "provider": {
      "@type": "LocalBusiness",
      "name": "Sakarya Uzman Klima İklimlendirme Servisi",
      "telephone": "0850 308 54 54",
      "email": "info@sakaryaklimaservisi.demo",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Semerciler Mah. Bosna Cad. No: 12",
        "addressLocality": "Adapazarı",
        "addressRegion": "Sakarya",
        "addressCountry": "TR"
      }
    },
    "description": service.intro
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": service.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ServiceDetailClientPage
        slug={hizmet}
        service={service}
        allServices={Array.from(new Map(Object.values(SERVICES_DATA).map(item => [item.slug, item])).values())}
      />

    </>
  );
}
