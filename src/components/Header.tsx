import React, { useState, useEffect } from 'react';
import { Phone, Clock, Menu, X, Calendar, AlertCircle, ShieldCheck, Settings } from 'lucide-react';
import { Logo } from './Logo';
import { Page } from '../types';
import { useCms } from '../context/CmsContext';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onOpenAppointmentModal: (doctorId?: string, departmentId?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenAppointmentModal
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cms = useCms();
  const { config } = cms;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string; page: Page }[] = [
    { label: 'Home', page: 'home' },
    { label: 'About', page: 'about' },
    { label: 'Services', page: 'services' },
    { label: 'Doctors', page: 'doctors' },
    { label: 'Gallery', page: 'gallery' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleNavClick = (page: Page) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all duration-200 shadow-xs">
      {/* Top Announcement Bar (Section 01) with dynamic background color */}
      <div 
        className="text-white text-xs py-2 px-4 sm:px-6 transition-colors"
        style={{ backgroundColor: config.theme.topbarColor || config.theme.primaryColor }}
      >
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          {/* Desktop Announcement */}
          <div className="hidden sm:flex items-center gap-2.5">
            <span className="font-bold text-[#E0F2FE] bg-white/10 px-2 py-0.5 rounded text-[11px] tracking-wide">
              {config.hospital.taglineHindi}
            </span>
            <span className="text-slate-400">·</span>
            <span className="font-semibold text-white">
              {config.hero.announcementNotice || '24×7 Healthcare Support | Memco More, Dhanbad'}
            </span>
          </div>

          {/* Mobile Announcement */}
          <div className="sm:hidden flex items-center justify-between w-full">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-[#E0F2FE] text-[11px]">{config.hospital.taglineHindi}</span>
              <span className="text-slate-400">|</span>
              <span className="font-medium text-white text-[11px]">24×7</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleNavClick('admin')}
                className="text-amber-300 font-bold text-[11px] flex items-center gap-1 cursor-pointer bg-white/10 px-2 py-0.5 rounded"
              >
                <Settings className="w-3 h-3" />
                <span>एडमिन</span>
              </button>
              <a
                href={`tel:${config.hospital.phonePrimary}`}
                className="text-[#38BDF8] hover:text-white font-bold flex items-center gap-1"
              >
                <span>Call Now →</span>
              </a>
            </div>
          </div>

          {/* Desktop Right CTA */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href={`tel:${config.hospital.phoneEmergency}`}
              className="text-rose-300 hover:text-white font-medium flex items-center gap-1.5 transition-colors"
              title="24x7 Emergency Casualty Helpline"
            >
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Emergency: {config.hospital.phoneEmergency}</span>
            </a>
            <span className="text-slate-400">·</span>
            <a
              href={`tel:${config.hospital.phonePrimary}`}
              className="text-white hover:text-[#38BDF8] font-semibold flex items-center gap-1 transition-colors"
            >
              <span>Call Now →</span>
            </a>

            {/* Admin Panel Direct Link */}
            <span className="text-slate-400">·</span>
            <button
              onClick={() => handleNavClick('admin')}
              className={`font-bold flex items-center gap-1 px-2.5 py-0.5 rounded-full transition-all cursor-pointer ${
                currentPage === 'admin'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'bg-white/15 text-amber-300 hover:bg-white/25 hover:text-white'
              }`}
              title="एडमिन पैनल: कंटेंट, फोटो व रंग बदलने हेतु"
            >
              <Settings className="w-3 h-3" />
              <span>एडमिन पैनल</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Navigation Bar (Section 02) */}
      <div className={`max-w-[1200px] mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between transition-all ${isScrolled ? 'py-3' : 'py-3.5'}`}>
        {/* Brand Lockup */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-left focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#0B4F6C] rounded-lg cursor-pointer"
          aria-label="Sarphi Hospital Home"
        >
          <Logo variant="dark" />
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navItems.map((item) => {
            const isActive = currentPage === item.page;
            return (
              <button
                key={item.page}
                onClick={() => handleNavClick(item.page)}
                className={`text-sm font-semibold tracking-tight transition-colors relative py-1 cursor-pointer focus-visible:outline-hidden ${
                  isActive
                    ? 'text-[#0B4F6C]'
                    : 'text-slate-600 hover:text-[#0B4F6C]'
                }`}
                style={{
                  color: isActive ? config.theme.primaryColor : undefined
                }}
              >
                {item.label}
                {isActive && (
                  <span 
                    className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                    style={{ backgroundColor: config.theme.primaryColor }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => onOpenAppointmentModal()}
            style={{
              backgroundColor: config.theme.primaryColor
            }}
            className="px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 active:scale-[0.98] rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-offset-2"
          >
            <Calendar className="w-4 h-4 text-[#1995AD]" />
            <span className="whitespace-nowrap">{config.hero.primaryCtaText || 'Book an Appointment'}</span>
          </button>
        </div>

        {/* Mobile Action Buttons */}
        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={`tel:${config.hospital.phonePrimary}`}
            className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-[#0B4F6C] hover:bg-slate-200 transition-colors"
            aria-label="Call Hospital"
          >
            <Phone className="w-4 h-4" />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ backgroundColor: config.theme.primaryColor }}
            className="w-10 h-10 rounded-xl text-white flex items-center justify-center transition-colors"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="px-5 py-4 space-y-2">
            {navItems.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-base font-semibold transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-slate-100 text-[#0B4F6C]'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                  style={{
                    color: isActive ? config.theme.primaryColor : undefined
                  }}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full" style={{ backgroundColor: config.theme.primaryColor }} />}
                </button>
              );
            })}

            {/* Admin Panel button inside mobile drawer */}
            <button
              onClick={() => handleNavClick('admin')}
              className="w-full text-left px-4 py-2.5 rounded-xl text-base font-bold bg-amber-50 text-amber-900 border border-amber-200 flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <Settings className="w-4 h-4 text-amber-700" />
                <span>एडमिन पैनल (Admin Panel)</span>
              </span>
              <span className="text-xs bg-amber-200 px-2 py-0.5 rounded-full text-amber-900">CMS</span>
            </button>

            <div className="pt-3 border-t border-slate-100 space-y-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAppointmentModal();
                }}
                style={{ backgroundColor: config.theme.primaryColor }}
                className="w-full py-3 px-4 rounded-xl text-white font-semibold text-center flex items-center justify-center gap-2 shadow-sm"
              >
                <Calendar className="w-4 h-4 text-[#1995AD]" />
                {config.hero.primaryCtaText || 'Book an Appointment'}
              </button>

              <a
                href={`tel:${config.hospital.phoneEmergency}`}
                className="w-full py-2.5 px-4 rounded-xl bg-rose-50 text-rose-700 font-semibold text-center flex items-center justify-center gap-2 border border-rose-200"
              >
                <AlertCircle className="w-4 h-4 text-rose-600" />
                <span>Emergency: {config.hospital.phoneEmergency}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
