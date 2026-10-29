import React from 'react';
import { Phone, Calendar, MessageCircle } from 'lucide-react';
import { HOSPITAL_CONTACT } from '../data/hospitalData';
import { useCms } from '../context/CmsContext';

interface FloatingActionsProps {
  onOpenAppointmentModal: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({
  onOpenAppointmentModal,
}) => {
  const { config } = useCms();
  const hospital = config?.hospital || HOSPITAL_CONTACT;

  // Extract digits for WhatsApp URL
  const phoneDigits = (hospital.phonePrimary || '918002234567').replace(/\D/g, '');
  const cleanPhone = phoneDigits.length === 10 ? `91${phoneDigits}` : phoneDigits;

  // WhatsApp message preset for patient attendants
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Hello ${hospital.name}, I would like to inquire about OPD consultation / healthcare services at ${hospital.landmark || 'Memco More, Dhanbad'}.`
  )}`;

  return (
    <>
      {/* Desktop Floating Action Buttons (Bottom-Right) */}
      <div className="hidden md:flex fixed bottom-6 right-6 z-40 flex-col items-end gap-3 pointer-events-auto">
        {/* Call Hospital Floating Button */}
        <a
          href={`tel:${hospital.phonePrimary}`}
          className="group flex items-center gap-2.5 bg-white text-[#0B4F6C] hover:bg-slate-50 px-4 py-3 rounded-full shadow-lg border border-slate-200 hover:border-[#1995AD] transition-all hover:scale-105 active:scale-95"
          aria-label={`Call ${hospital.name}`}
          title={`Call ${hospital.phonePrimary}`}
        >
          <span className="w-8 h-8 rounded-full bg-[#0B4F6C] text-white flex items-center justify-center">
            <Phone className="w-4 h-4" />
          </span>
          <div className="text-left pr-1">
            <span className="text-[11px] font-medium text-slate-500 block leading-tight">Call Hospital</span>
            <span className="text-xs font-bold text-slate-900 block font-mono">{hospital.phonePrimary}</span>
          </div>
        </a>

        {/* WhatsApp Assistance Floating Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2.5 bg-[#0B4F6C] text-white hover:bg-[#08384D] px-4 py-3 rounded-full shadow-xl transition-all hover:scale-105 active:scale-95"
          aria-label={`Chat on WhatsApp with ${hospital.name}`}
          title="WhatsApp Patient Support"
        >
          <span className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center">
            <MessageCircle className="w-4 h-4" />
          </span>
          <div className="text-left pr-1">
            <span className="text-[11px] text-cyan-200 block leading-tight font-medium">Instant Chat</span>
            <span className="text-xs font-bold text-white block">WhatsApp Helpdesk</span>
          </div>
        </a>
      </div>

      {/* Mobile Sticky Bottom Action Bar (Call | WhatsApp | Appointment) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 shadow-lg safe-bottom">
        <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
          {/* Call */}
          <a
            href={`tel:${hospital.phonePrimary}`}
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl text-slate-700 bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-200/80 active:scale-95"
            aria-label={`Call ${hospital.name}`}
          >
            <Phone className="w-4 h-4 text-[#0B4F6C]" />
            <span className="text-[11px] font-semibold mt-1 text-slate-800">Call</span>
          </a>

          {/* WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl text-emerald-800 bg-emerald-50 hover:bg-emerald-100 transition-colors border border-emerald-200 active:scale-95"
            aria-label="WhatsApp Hospital Helpdesk"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span className="text-[11px] font-bold mt-1 text-emerald-800">WhatsApp</span>
          </a>

          {/* Appointment */}
          <button
            onClick={onOpenAppointmentModal}
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#0B4F6C] text-white hover:bg-[#08384D] transition-colors cursor-pointer shadow-xs active:scale-95"
            aria-label="Book Appointment"
          >
            <Calendar className="w-4 h-4 text-[#1995AD]" />
            <span className="text-[11px] font-bold mt-1 text-white">Appointment</span>
          </button>
        </div>
      </div>
    </>
  );
};
