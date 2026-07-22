"use client";

import { useState } from "react";
import { Phone, MessageCircle, X } from "lucide-react";

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);

  const contacts = [
    {
      name: "SAKARYA UZMAN KLİMA",
      title: "7/24 ACİL SERVİS HATTI (DEMO)",
      number: "905550000000",
      phoneUrl: "tel:05550000000",
    },
  ];

  const message = encodeURIComponent(
    "Merhaba, Sakarya Uzman Klima Servisi ile iletişime geçmek istiyorum. Klima servis talebinde bulunmak istiyorum."
  );

  return (
    <div className="fixed bottom-6 md:bottom-8 right-6 md:right-8 z-[999] flex flex-col items-end">
      {/* Dropdown Card */}
      {isOpen && (
        <div className="mb-4 bg-white border border-gray-150 rounded-2xl shadow-2xl p-6 w-[280px] md:w-[320px] transition-all duration-300 transform scale-100 origin-bottom-right">
          <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-2">
            <h4 className="font-black text-gray-800 text-xs md:text-sm uppercase tracking-wider">Destek Hattımız</h4>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-4">
            {contacts.map((contact, idx) => (
              <div key={idx} className="bg-gray-50 border border-gray-100 rounded-xl p-4 flex flex-col gap-3 hover:border-gray-200 transition-all">
                <div>
                  <h5 className="font-black text-gray-900 text-xs uppercase tracking-tight">{contact.name}</h5>
                  <p className="text-gray-400 text-[10px] md:text-[11px] font-black uppercase mt-0.5">{contact.title}</p>
                </div>
                <div className="flex gap-2">
                  <a
                    href={`https://wa.me/${contact.number}?text=${message}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-3 bg-[#25D366] text-white font-bold text-center rounded-lg hover:bg-[#1ebe5d] active:scale-95 transition-all text-[11px] flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    WhatsApp
                  </a>
                  <a
                    href={contact.phoneUrl}
                    className="py-2 px-3 bg-white border border-gray-200 text-gray-700 font-bold text-center rounded-lg hover:bg-gray-50 active:scale-95 transition-all text-[11px] flex items-center justify-center cursor-pointer shadow-xs"
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Trigger Buttons Container */}
      <div className="flex items-center bg-white rounded-full p-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-gray-100 hover:shadow-[0_8px_40px_rgba(0,0,0,0.16)] transition-all duration-300">
        {/* Direct Call Button */}
        <a
          href="tel:05550000000"
          className="relative w-12 h-12 md:w-14 md:h-14 rounded-full bg-white text-gray-700 hover:bg-[#E53E3E] hover:text-white flex items-center justify-center transition-all duration-300 group"
          title="7/24 Acil Klima Servisi (Demo)"
        >
          <Phone className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform duration-300" />
        </a>

        {/* Divider */}
        <div className="w-[1px] h-8 bg-gray-200 mx-1"></div>

        {/* WhatsApp Button with Toggle */}
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30"></div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-inner hover:brightness-110 active:scale-95 transition-all duration-300 group cursor-pointer"
            title="WhatsApp Destek"
          >
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="currentColor"
              className="md:w-[28px] md:h-[28px] group-hover:scale-110 transition-transform duration-300"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
