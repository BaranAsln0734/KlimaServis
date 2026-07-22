import React, { useState } from "react";
import { PhoneCall, ShieldAlert, CheckCircle2 } from "lucide-react";

interface EmergencyFormProps {
  locationName: string; // e.g., "Bakırköy" or "Kartaltepe Mahallesi"
  districtName: string; // e.g., "Bakırköy"
}

export default function EmergencyServiceForm({ locationName, districtName }: EmergencyFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert("Lütfen gerekli alanları doldurunuz (Ad Soyad, Telefon).");
      return;
    }
    setStatus("loading");

    const fullMessage = `Acil Servis Bölgesi: ${locationName}\nİlçe: ${districtName}\nTalep Detayı: ${message || "Belirtilmedi"}`;

    try {
      // 1. Send Email Notification via Formsubmit
      const response = await fetch("https://formsubmit.co/ajax/info@akanenerji.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          "_subject": `🚨 7/24 ACİL SERVİS ÇAĞRISI: ${locationName}`,
          "Musteri_Adi": name,
          "Telefon": phone,
          "Eposta": email || "Belirtilmedi",
          "Bölge": locationName,
          "Arıza_Detayı": message || "Belirtilmedi"
        })
      });

      // 2. Save in Admin Database
      await fetch("/api/admin/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          phone: phone,
          email: email || "Belirtilmedi",
          serviceType: "7/24 Acil Servis",
          district: locationName,
          message: fullMessage
        })
      }).catch(err => console.error("Error storing emergency request:", err));

      if (response.ok) {
        setStatus("success");
        setName("");
        setPhone("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="bg-[#FFCC00] text-white p-8 md:p-10 rounded-3xl shadow-xl flex flex-col gap-6 relative overflow-hidden">
      {/* Subtle background light */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />

      {status === "success" ? (
        <div className="flex flex-col items-center justify-center text-center py-10 space-y-4">
          <CheckCircle2 className="w-16 h-16 text-white animate-bounce" />
          <h3 className="font-black text-xl uppercase tracking-tight">Talebiniz Alındı!</h3>
          <p className="text-white/80 text-sm leading-relaxed max-w-sm">
            Acil servis talebiniz sisteme ulaştı. Nöbetçi teknik servis ekiplerimiz en kısa sürede sizinle iletişime geçecektir.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-4 px-6 py-2.5 bg-white/20 hover:bg-white/30 text-white font-bold uppercase tracking-wider text-xs rounded-xl transition-all"
          >
            Yeni Talep Gönder
          </button>
        </div>
      ) : (
        <>
          <div>
            <h3 className="font-black text-2xl uppercase tracking-tight border-b border-white/20 pb-4 flex items-center gap-2">
              <PhoneCall className="w-6 h-6 animate-pulse text-[#E53E3E]" /> 7/24 Acil Servis Çağır
            </h3>
            <p className="text-white/80 leading-relaxed text-xs font-semibold mt-4">
              {locationName} genelinde acil jeneratör arızalarında nöbetçi teknik ekiplerimize 7/24 anında ulaşın. Aşağıdaki formu doldurarak acil servis talebi gönderin.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-gray-800">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] text-white/70 font-bold uppercase block">Adınız Soyadınız *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ad Soyad"
                  className="w-full px-4 py-2.5 bg-white rounded-xl border-none outline-none focus:ring-2 focus:ring-white/50 text-xs font-bold text-gray-700"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-white/70 font-bold uppercase block">Telefon Numaranız *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Telefon"
                  className="w-full px-4 py-2.5 bg-white rounded-xl border-none outline-none focus:ring-2 focus:ring-white/50 text-xs font-bold text-gray-700"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-white/70 font-bold uppercase block">E-posta Adresiniz (Opsiyonel)</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="eposta@adresiniz.com"
                className="w-full px-4 py-2.5 bg-white rounded-xl border-none outline-none focus:ring-2 focus:ring-white/50 text-xs font-bold text-gray-700"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-white/70 font-bold uppercase block">Arıza / Talep Detayı (Opsiyonel)</label>
              <textarea
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Arıza tipi, jeneratör markası veya belirtmek istedikleriniz..."
                className="w-full px-4 py-2.5 bg-white rounded-xl border-none outline-none focus:ring-2 focus:ring-white/50 text-xs font-bold text-gray-700 resize-none"
              />
            </div>

            {status === "error" && (
              <div className="p-3 bg-[#E53E3E]/20 border border-[#E53E3E]/30 rounded-xl text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>Talep gönderilemedi. Lütfen tekrar deneyin.</span>
              </div>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-3.5 bg-white hover:bg-gray-100 text-[#FFCC00] font-black uppercase text-xs tracking-wider rounded-xl transition-all shadow-lg disabled:opacity-50 cursor-pointer border-none outline-none flex items-center justify-center gap-2"
            >
              {status === "loading" ? "Gönderiliyor..." : "Servis Talebi Gönder"}
            </button>
          </form>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-[10px] font-black uppercase tracking-wider text-white/70 border-t border-white/10 pt-4 mt-2">
            <span>📞 Nöbetçi Tel: +90 (549) 621 34 60</span>
            <span>✉ E-posta: info@akanenerji.com</span>
            <span>📍 Adres: {districtName} / İstanbul</span>
          </div>
        </>
      )}
    </div>
  );
}
