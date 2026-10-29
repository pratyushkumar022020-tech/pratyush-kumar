import React from 'react';
import { Activity, HeartPulse, Microscope, Stethoscope, Building2, ShieldAlert, Award } from 'lucide-react';

interface ClinicalVisualProps {
  type: 'consultation' | 'lobby' | 'ot' | 'icu' | 'lab' | 'emergency' | 'building' | 'ward' | 'pharmacy' | 'reception' | 'ambulance' | 'xray' | 'doctor-male' | 'doctor-female';
  className?: string;
  title?: string;
  badge?: string;
}

export const ClinicalVisual: React.FC<ClinicalVisualProps> = ({
  type,
  className = 'h-64 w-full',
  title,
  badge
}) => {
  switch (type) {
    case 'consultation':
      return (
        <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0B4F6C]/10 via-[#F0F7F9] to-[#1995AD]/15 border border-[#1995AD]/25 flex flex-col justify-between p-6 ${className}`}>
          {/* Subtle architectural background grid */}
          <div className="absolute inset-0 bg-[radial-gradient(#0B4F6C_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />
          
          <div className="relative z-10 flex justify-between items-start">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#0B4F6C] text-white shadow-sm">
              <Stethoscope className="w-3.5 h-3.5 text-[#1995AD]" />
              {badge || 'Outpatient Consultation'}
            </span>
            <div className="w-9 h-9 rounded-xl bg-white/90 shadow-sm border border-slate-200/80 flex items-center justify-center text-[#0B4F6C]">
              <Award className="w-5 h-5" />
            </div>
          </div>

          {/* Central Medical Illustration */}
          <div className="relative z-10 my-auto py-4 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-2xl bg-white shadow-md border border-slate-100 flex items-center justify-center mb-3">
              <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
                <circle cx="24" cy="16" r="8" fill="#E2E8F0" />
                <path d="M12 38C12 31.3726 17.3726 26 24 26C30.6274 26 36 31.3726 36 38" fill="#CBD5E1" />
                <path d="M18 20V24C18 27.3137 20.6863 30 24 30C27.3137 30 30 27.3137 30 24V20" stroke="#0B4F6C" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M24 30V36M24 36C22 36 21 38 21 39M24 36C26 36 27 38 27 39" stroke="#1995AD" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="24" cy="40" r="2.5" fill="#1995AD" />
              </svg>
            </div>
            <h4 className="text-base md:text-lg font-bold text-[#0B4F6C] leading-snug">
              {title || 'Compassionate Medical Consultation'}
            </h4>
            <p className="text-xs text-slate-500 max-w-xs mt-1">
              One-on-one specialist diagnosis, respectful patient hearing, and tailored medical management.
            </p>
          </div>

          <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-[#0B4F6C]/10">
            <span>Sarphi Hospital OPD Chambers</span>
            <span className="font-semibold text-[#0B4F6C]">Memco More, Dhanbad</span>
          </div>
        </div>
      );

    case 'ot':
      return (
        <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-[#0B3B4F] to-[#0A2E3D] text-white flex flex-col justify-between p-6 ${className}`}>
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#1995AD_1px,transparent_1px)] [background-size:20px_20px]" />
          
          <div className="relative z-10 flex justify-between items-start">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#1995AD] text-white">
              <Activity className="w-3.5 h-3.5" />
              {badge || 'Modular Surgical Suite'}
            </span>
            <span className="text-[11px] font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-800/60 px-2 py-0.5 rounded">
              HEPA Laminar Flow
            </span>
          </div>

          <div className="relative z-10 my-auto py-4 flex flex-col items-center text-center">
            {/* Surgical Lamp & OT graphic */}
            <div className="relative mb-3">
              <div className="w-20 h-20 rounded-full bg-cyan-500/20 border-2 border-cyan-400/40 flex items-center justify-center animate-pulse">
                <div className="w-12 h-12 rounded-full bg-cyan-400/30 flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-white shadow-lg shadow-cyan-300" />
                </div>
              </div>
            </div>
            <h4 className="text-base md:text-lg font-bold text-white tracking-tight">
              {title || 'Modular Operation Theatre'}
            </h4>
            <p className="text-xs text-slate-300 max-w-xs mt-1">
              Sterile positive-pressure air, C-Arm fluoroscopy, and advanced laparoscopic surgical equipment.
            </p>
          </div>

          <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-300 pt-2 border-t border-white/10">
            <span>Infection Control Standard</span>
            <span className="text-emerald-400 font-medium">Sterile OT Protocol</span>
          </div>
        </div>
      );

    case 'icu':
      return (
        <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0F2837] via-[#0B4F6C] to-[#0A3D52] text-white flex flex-col justify-between p-6 ${className}`}>
          <div className="relative z-10 flex justify-between items-start">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-600 text-white">
              <HeartPulse className="w-3.5 h-3.5" />
              {badge || 'Intensive Care Unit (ICU)'}
            </span>
            <span className="text-[11px] font-mono text-emerald-300 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded">
              24×7 Bedside Telemetry
            </span>
          </div>

          <div className="relative z-10 my-auto py-3 flex flex-col items-center text-center">
            {/* Telemetry Waveform */}
            <div className="w-full max-w-[220px] h-12 bg-slate-950/50 rounded-lg border border-slate-700/60 p-2 flex items-center justify-center mb-3">
              <svg viewBox="0 0 160 30" fill="none" className="w-full h-full text-emerald-400">
                <path
                  d="M0 15 H40 L45 5 L52 25 L58 10 L63 18 L70 15 H160"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h4 className="text-base md:text-lg font-bold text-white tracking-tight">
              {title || 'Critical Care & Life Support'}
            </h4>
            <p className="text-xs text-slate-200 max-w-xs mt-1">
              Mechanical ventilators, continuous cardiac monitoring, and dedicated critical care nursing team.
            </p>
          </div>

          <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-300 pt-2 border-t border-white/10">
            <span>High Dependency Beds</span>
            <span className="text-cyan-300 font-semibold">24×7 Intensivist Backup</span>
          </div>
        </div>
      );

    case 'lab':
      return (
        <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#F8FAFC] via-[#F0F9FB] to-[#E0F2FE] border border-[#1995AD]/30 flex flex-col justify-between p-6 ${className}`}>
          <div className="relative z-10 flex justify-between items-start">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#1995AD] text-white">
              <Microscope className="w-3.5 h-3.5" />
              {badge || 'Diagnostics & Pathology'}
            </span>
            <span className="text-[11px] font-semibold text-[#0B4F6C] bg-white px-2.5 py-1 rounded-md shadow-xs border border-slate-200">
              Automated Lab
            </span>
          </div>

          <div className="relative z-10 my-auto py-3 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-slate-200 flex items-center justify-center mb-3 text-[#0B4F6C]">
              <Microscope className="w-9 h-9 text-[#1995AD]" />
            </div>
            <h4 className="text-base md:text-lg font-bold text-[#0B4F6C] tracking-tight">
              {title || 'Automated Clinical Diagnostic Lab'}
            </h4>
            <p className="text-xs text-slate-600 max-w-xs mt-1">
              Computerised hematology, biochemistry profiles, digital X-Ray, and rapid emergency reporting.
            </p>
          </div>

          <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-200">
            <span>Accurate & Quality Calibrated</span>
            <span className="font-semibold text-[#0B4F6C]">Stat Reports 24×7</span>
          </div>
        </div>
      );

    case 'emergency':
      return (
        <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#450A0A] via-[#7F1D1D] to-[#991B1B] text-white flex flex-col justify-between p-6 ${className}`}>
          <div className="relative z-10 flex justify-between items-start">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white text-red-700 shadow">
              <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
              {badge || 'Emergency & Trauma Triage'}
            </span>
            <span className="text-[11px] font-semibold tracking-wide uppercase bg-black/30 border border-white/20 px-2.5 py-0.5 rounded text-white">
              24×7 OPEN
            </span>
          </div>

          <div className="relative z-10 my-auto py-3 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center mb-3 text-red-200">
              <ShieldAlert className="w-9 h-9 text-white" />
            </div>
            <h4 className="text-base md:text-lg font-bold text-white tracking-tight">
              {title || 'Immediate Trauma & Casualty Response'}
            </h4>
            <p className="text-xs text-red-100 max-w-xs mt-1">
              Equipped for road accident trauma, acute respiratory shock, cardiac events, and acute medical emergencies.
            </p>
          </div>

          <div className="relative z-10 flex items-center justify-between text-[11px] text-red-100 pt-2 border-t border-white/15">
            <span>Ambulance & Casualty Bay</span>
            <span className="font-bold text-white">Dial: +91 80022 34568</span>
          </div>
        </div>
      );

    case 'ward':
      return (
        <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#F0F7F9] via-[#E6F3F7] to-[#D5EBF0] border border-[#1995AD]/30 text-slate-800 flex flex-col justify-between p-6 ${className}`}>
          <div className="relative z-10 flex justify-between items-start">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#0B4F6C] text-white">
              <Building2 className="w-3.5 h-3.5 text-[#1995AD]" />
              {badge || 'Inpatient Wards & Rooms'}
            </span>
            <span className="text-[11px] font-semibold text-[#0B4F6C] bg-white px-2.5 py-1 rounded-md shadow-xs border border-slate-200">
              Sanitised & Private
            </span>
          </div>

          <div className="relative z-10 my-auto py-3 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-slate-200 flex items-center justify-center mb-3 text-[#0B4F6C]">
              <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10 text-[#0B4F6C]">
                <rect x="6" y="24" width="36" height="14" rx="2" stroke="currentColor" strokeWidth="2.5" />
                <path d="M10 24V14C10 12.8954 10.8954 12 12 12H16C17.1046 12 18 12.8954 18 14V24" stroke="currentColor" strokeWidth="2.5" />
                <circle cx="14" cy="18" r="2.5" fill="#1995AD" />
                <path d="M6 38V42M42 38V42" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M22 28H38" stroke="#1995AD" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
            <h4 className="text-base md:text-lg font-bold text-[#0B4F6C] tracking-tight">
              {title || 'Hygienic Inpatient Care Rooms'}
            </h4>
            <p className="text-xs text-slate-600 max-w-xs mt-1">
              Motorized beds, dedicated attendant seating, natural daylight, bedside nurse call buzzer, and sanitised bathrooms.
            </p>
          </div>

          <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-200">
            <span>24×7 Inpatient Nursing Care</span>
            <span className="font-semibold text-[#0B4F6C]">Daily Hygiene Protocol</span>
          </div>
        </div>
      );

    case 'pharmacy':
      return (
        <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#064E3B] via-[#047857] to-[#0D9488] text-white flex flex-col justify-between p-6 ${className}`}>
          <div className="relative z-10 flex justify-between items-start">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white text-emerald-800 shadow-sm">
              <Award className="w-3.5 h-3.5 text-emerald-700" />
              {badge || '24×7 Hospital Pharmacy'}
            </span>
            <span className="text-[11px] font-mono text-emerald-100 bg-emerald-950/60 border border-emerald-400/30 px-2 py-0.5 rounded">
              Cold-Chain Certified
            </span>
          </div>

          <div className="relative z-10 my-auto py-3 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center mb-3">
              <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10 text-white">
                <rect x="8" y="10" width="32" height="30" rx="4" stroke="currentColor" strokeWidth="2.5" />
                <path d="M24 18V32M17 25H31" stroke="#34D399" strokeWidth="3.5" strokeLinecap="round" />
              </svg>
            </div>
            <h4 className="text-base md:text-lg font-bold text-white tracking-tight">
              {title || '24×7 On-Premises Pharmacy'}
            </h4>
            <p className="text-xs text-emerald-100 max-w-xs mt-1">
              Round-the-clock genuine pharmaceuticals, pediatric drops, critical ICU injectables, and surgical dressing supplies.
            </p>
          </div>

          <div className="relative z-10 flex items-center justify-between text-[11px] text-emerald-200 pt-2 border-t border-white/15">
            <span>Ground Floor Main Entrance</span>
            <span className="font-semibold text-white">Computerized Billing</span>
          </div>
        </div>
      );

    case 'reception':
      return (
        <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0B4F6C] via-[#12688C] to-[#1995AD] text-white flex flex-col justify-between p-6 ${className}`}>
          <div className="relative z-10 flex justify-between items-start">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md text-white border border-white/25">
              <Building2 className="w-3.5 h-3.5 text-cyan-200" />
              {badge || 'Reception & Attendant Lounge'}
            </span>
            <span className="text-[11px] text-cyan-100 bg-black/25 px-2.5 py-1 rounded">
              Ground Floor
            </span>
          </div>

          <div className="relative z-10 my-auto py-3 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center mb-3">
              <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10 text-white">
                <path d="M6 38H42V42H6V38Z" fill="currentColor" opacity="0.3" />
                <path d="M10 24H38V38H10V24Z" stroke="currentColor" strokeWidth="2.5" />
                <circle cx="24" cy="14" r="5" stroke="currentColor" strokeWidth="2.5" />
                <path d="M18 24C18 20.6863 20.6863 18 24 18C27.3137 18 30 20.6863 30 24" stroke="currentColor" strokeWidth="2.5" />
              </svg>
            </div>
            <h4 className="text-base md:text-lg font-bold text-white tracking-tight">
              {title || 'Central Registration & Attendant Lounge'}
            </h4>
            <p className="text-xs text-slate-100 max-w-xs mt-1">
              Token queue management, comfortable attendant seating, admission desk, and drinking water facilities.
            </p>
          </div>

          <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-200 pt-2 border-t border-white/15">
            <span>Help Desk & Admission Guidance</span>
            <span className="font-semibold text-white">Patient First Hospitality</span>
          </div>
        </div>
      );

    case 'ambulance':
      return (
        <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-[#334155] text-white flex flex-col justify-between p-6 ${className}`}>
          <div className="relative z-10 flex justify-between items-start">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-600 text-white">
              <ShieldAlert className="w-3.5 h-3.5" />
              {badge || '24×7 Ambulance Fleet'}
            </span>
            <span className="text-[11px] font-mono text-amber-300 bg-amber-950/60 border border-amber-500/30 px-2 py-0.5 rounded">
              Emergency Standby
            </span>
          </div>

          <div className="relative z-10 my-auto py-3 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center mb-3">
              <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10 text-white">
                <path d="M6 14H30V34H6V14Z" stroke="currentColor" strokeWidth="2.5" />
                <path d="M30 20H38L42 26V34H30V20Z" stroke="currentColor" strokeWidth="2.5" />
                <circle cx="14" cy="36" r="4" fill="#E2E8F0" stroke="#0F172A" strokeWidth="2" />
                <circle cx="34" cy="36" r="4" fill="#E2E8F0" stroke="#0F172A" strokeWidth="2" />
                <path d="M18 20V28M14 24H22" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
            <h4 className="text-base md:text-lg font-bold text-white tracking-tight">
              {title || 'Emergency Ambulance Transfer'}
            </h4>
            <p className="text-xs text-slate-300 max-w-xs mt-1">
              On-board oxygen support, emergency stretcher, vital monitor, and trained emergency medical technicians (EMTs).
            </p>
          </div>

          <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-300 pt-2 border-t border-white/15">
            <span>Direct Emergency Hotline</span>
            <span className="font-bold text-rose-400">+91 80022 34568</span>
          </div>
        </div>
      );

    case 'xray':
      return (
        <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0284C7]/40 text-white flex flex-col justify-between p-6 ${className}`}>
          <div className="relative z-10 flex justify-between items-start">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#0284C7] text-white">
              <Activity className="w-3.5 h-3.5" />
              {badge || 'Digital Radiography & ECG'}
            </span>
            <span className="text-[11px] text-cyan-200 bg-cyan-950/60 border border-cyan-700/50 px-2 py-0.5 rounded">
              Lead-Shielded Suite
            </span>
          </div>

          <div className="relative z-10 my-auto py-3 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-3">
              <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10 text-cyan-300">
                <rect x="8" y="8" width="32" height="32" rx="4" stroke="currentColor" strokeWidth="2.5" />
                <path d="M14 24H34" stroke="white" strokeWidth="2" strokeDasharray="3 3" />
                <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="2" />
                <path d="M24 16V32" stroke="white" strokeWidth="2" strokeDasharray="3 3" />
              </svg>
            </div>
            <h4 className="text-base md:text-lg font-bold text-white tracking-tight">
              {title || 'Digital High-Frequency X-Ray & ECG'}
            </h4>
            <p className="text-xs text-slate-300 max-w-xs mt-1">
              Low-dose radiation imaging for chest, bones, and abdominal diagnoses with instant digital view screens.
            </p>
          </div>

          <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-300 pt-2 border-t border-white/15">
            <span>First Floor Diagnostic Wing</span>
            <span className="font-semibold text-cyan-300">Same-Day Reporting</span>
          </div>
        </div>
      );

    case 'building':
    default:
      return (
        <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0B4F6C] via-[#0D5C75] to-[#1995AD] text-white flex flex-col justify-between p-6 ${className}`}>
          <div className="relative z-10 flex justify-between items-start">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-sm text-white border border-white/20">
              <Building2 className="w-3.5 h-3.5" />
              {badge || 'Hospital Infrastructure'}
            </span>
            <span className="text-[11px] text-slate-200 bg-black/20 px-2.5 py-1 rounded">
              Memco More, Dhanbad
            </span>
          </div>

          <div className="relative z-10 my-auto py-3 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center mb-3">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-base md:text-lg font-bold text-white tracking-tight">
              {title || 'Sarphi Hospital & Healthcare Centre'}
            </h4>
            <p className="text-xs text-slate-100 max-w-xs mt-1">
              Modern multi-specialty facility providing tertiary-standard secondary medical care to the Dhanbad community.
            </p>
          </div>

          <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-200 pt-2 border-t border-white/15">
            <span>Clean, Sanitised & Accessible</span>
            <span className="font-semibold text-white">Memco More Chowk</span>
          </div>
        </div>
      );
  }
};
