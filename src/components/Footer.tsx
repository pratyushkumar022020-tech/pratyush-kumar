import React from 'react';
import { Phone, Mail, MapPin, Clock, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { Logo } from './Logo';
import { HOSPITAL_CONTACT, DEPARTMENTS } from '../data/hospitalData';
import { Page } from '../types';

interface FooterProps {
  onNavigate: (page: Page) => void;
  onOpenAppointmentModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onNavigate, 
  onOpenAppointmentModal
}) => {
  const handleNav = (page: Page) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Main 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-14 border-b border-slate-800">
          {/* Column 1: Hospital Introduction */}
          <div className="space-y-4">
            <Logo variant="light" />
            <p className="text-sm text-slate-400 leading-relaxed pr-2">
              Sarphi Hospital is a multi-specialty healthcare centre located at Memco More, Dhanbad. We deliver ethical, patient-centric clinical services, sterile modular surgeries, and 24×7 critical care with compassion and professionalism.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-emerald-400">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Ethical Non-Commercial Clinical Care</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-white">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-[#1995AD]" />
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-[#1995AD]" />
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-[#1995AD]" />
                  Clinical Specialties
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('doctors')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-[#1995AD]" />
                  Doctors & Specialists
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('gallery')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-[#1995AD]" />
                  Hospital Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-[#1995AD]" />
                  Contact & Location
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Patient Support */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-white">
              Patient Support
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={onOpenAppointmentModal}
                  className="text-white hover:text-[#1995AD] transition-colors font-medium flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-[#1995AD]" />
                  Book an OPD Appointment
                </button>
              </li>
              <li>
                <a
                  href={`tel:${HOSPITAL_CONTACT.phoneEmergency}`}
                  className="text-rose-400 hover:text-rose-300 transition-colors font-medium flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-rose-400" />
                  24×7 Emergency Casualty Desk
                </a>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-[#1995AD]" />
                  Hospital Directions & Bus Stop
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-[#1995AD]" />
                  Diagnostic Lab & Digital X-Ray
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-[#1995AD]" />
                  Visiting Hours & Attendant Rules
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Information */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-white">
              Contact Information
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#1995AD] shrink-0 mt-0.5" />
                <span className="leading-snug">
                  Memco More, Near GT Road By-pass, Dhanbad, Jharkhand – 826004, India
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#1995AD] shrink-0" />
                <div>
                  <a href={`tel:${HOSPITAL_CONTACT.phonePrimary}`} className="hover:text-white transition-colors font-medium block">
                    {HOSPITAL_CONTACT.phonePrimary} (OPD)
                  </a>
                  <a href={`tel:${HOSPITAL_CONTACT.phoneEmergency}`} className="text-rose-400 hover:text-rose-300 font-semibold text-xs block mt-0.5">
                    {HOSPITAL_CONTACT.phoneEmergency} (24x7 Emergency)
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#1995AD] shrink-0" />
                <a href={`mailto:${HOSPITAL_CONTACT.email}`} className="hover:text-white transition-colors">
                  {HOSPITAL_CONTACT.email}
                </a>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <Clock className="w-4 h-4 text-[#1995AD] shrink-0" />
                <span>Emergency: 24/7 | OPD: 09:30 AM – 08:30 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal Notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 Sarphi Hospital. All Rights Reserved. Memco More, Dhanbad, Jharkhand.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <button
              onClick={() => handleNav('privacy')}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>·</span>
            <button
              onClick={() => handleNav('terms')}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Terms & Conditions
            </button>
            <span>·</span>
            <button
              onClick={() => handleNav('admin')}
              className="text-amber-400 hover:text-white transition-colors cursor-pointer font-bold flex items-center gap-1"
              title="Admin Panel: Change content, photos, colors and design"
            >
              <span>⚙️ Admin Panel (एडमिन)</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
