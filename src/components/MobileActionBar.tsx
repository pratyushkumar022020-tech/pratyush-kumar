import React from 'react';
import { Phone, Calendar, MapPin, AlertCircle } from 'lucide-react';
import { HOSPITAL_CONTACT } from '../data/hospitalData';

interface MobileActionBarProps {
  onOpenAppointmentModal: () => void;
  onNavigateToContact: () => void;
}

export const MobileActionBar: React.FC<MobileActionBarProps> = ({
  onOpenAppointmentModal,
  onNavigateToContact,
}) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 shadow-lg safe-bottom">
      <div className="grid grid-cols-4 gap-1.5 max-w-md mx-auto">
        {/* Call Hospital */}
        <a
          href={`tel:${HOSPITAL_CONTACT.phonePrimary}`}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Call Hospital"
        >
          <Phone className="w-4 h-4 text-[#0B4F6C]" />
          <span className="text-[10px] font-semibold mt-1">Call</span>
        </a>

        {/* Emergency */}
        <a
          href={`tel:${HOSPITAL_CONTACT.phoneEmergency}`}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-lg text-rose-700 bg-rose-50 hover:bg-rose-100 transition-colors border border-rose-200"
          aria-label="Emergency 24x7"
        >
          <AlertCircle className="w-4 h-4 text-rose-600 animate-pulse" />
          <span className="text-[10px] font-bold mt-1 text-rose-700">24x7 SOS</span>
        </a>

        {/* Location / Directions */}
        <button
          onClick={onNavigateToContact}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Directions to Memco More"
        >
          <MapPin className="w-4 h-4 text-[#1995AD]" />
          <span className="text-[10px] font-semibold mt-1">Location</span>
        </button>

        {/* Book OPD */}
        <button
          onClick={onOpenAppointmentModal}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-lg bg-[#0B4F6C] text-white hover:bg-[#08384D] transition-colors cursor-pointer shadow-xs"
          aria-label="Book Appointment"
        >
          <Calendar className="w-4 h-4 text-[#1995AD]" />
          <span className="text-[10px] font-bold mt-1">Book OPD</span>
        </button>
      </div>
    </div>
  );
};
