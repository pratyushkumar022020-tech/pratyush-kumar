import React, { useState } from 'react';
import { 
  Calendar, Phone, MapPin, ArrowRight, ShieldCheck, HeartHandshake, 
  Activity, Stethoscope, ChevronDown, ChevronUp, Clock, AlertCircle, 
  CheckCircle2, Users, Building2, Microscope, Baby, Bone, ShieldAlert,
  Star, Mail, ExternalLink, UserCheck
} from 'lucide-react';
import { 
  DEPARTMENTS, DOCTORS, FACILITIES, FAQS, HOSPITAL_CONTACT, 
  TESTIMONIALS, WHY_CHOOSE_CARDS, TRUST_HIGHLIGHTS 
} from '../data/hospitalData';
import { Page, Doctor, Department } from '../types';
import { ClinicalVisual } from '../components/VisualFallback';
import { useCms } from '../context/CmsContext';

interface HomePageProps {
  onNavigate: (page: Page) => void;
  onOpenAppointmentModal: (doctorId?: string, departmentId?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenAppointmentModal,
}) => {
  const cms = useCms();
  const { config } = cms;
  const DEPARTMENTS = config.departments;
  const DOCTORS = config.doctors;
  const HOSPITAL_CONTACT = config.hospital;
  const hero = config.hero;
  const about = config.about;

  const [openFaqId, setOpenFaqId] = useState<string | null>(FAQS[0]?.id || null);

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Stethoscope':
        return <Stethoscope className="w-6 h-6 text-[#1995AD]" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-6 h-6 text-rose-500" />;
      case 'Activity':
        return <Activity className="w-6 h-6 text-[#1995AD]" />;
      case 'Microscope':
        return <Microscope className="w-6 h-6 text-[#1995AD]" />;
      case 'Baby':
        return <Baby className="w-6 h-6 text-[#1995AD]" />;
      case 'ShieldPlus':
        return <ShieldCheck className="w-6 h-6 text-[#1995AD]" />;
      case 'UserCheck':
      default:
        return <UserCheck className="w-6 h-6 text-[#1995AD]" />;
    }
  };

  return (
    <div className="space-y-20 md:space-y-28 pb-12">
      {/* ========================================================================= */}
      {/* SECTION 03 — HERO SECTION                                                 */}
      {/* ========================================================================= */}
      <section className="relative pt-6 md:pt-12 overflow-hidden" aria-labelledby="hero-title">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Hero Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* HERO EYEBROW */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF4F7] text-[#0B4F6C] text-xs font-semibold border border-[#1995AD]/25 shadow-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1995AD] animate-pulse" />
                <span className="font-bold text-[#0B4F6C]">{hero.eyebrowHindi || 'बेस्ट हॉस्पिटल इन धनबाद'}</span>
                <span className="text-slate-400">·</span>
                <span className="text-slate-600 font-medium">{hero.eyebrowEnglish || 'Best Hospital in Dhanbad'}</span>
              </div>

              {/* HERO H1 */}
              <h1 
                id="hero-title"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-extrabold text-[#0F172A] tracking-tight leading-[1.16] text-balance"
              >
                <span className="text-[#0B4F6C] block text-2xl sm:text-3xl md:text-4xl font-black mb-1.5 tracking-normal">
                  {hero.headlineMain || 'बेस्ट हॉस्पिटल इन धनबाद'}
                </span>
                {hero.headlineSub1 || 'Compassionate Care.'}<br />
                {hero.headlineSub2 || 'Advanced Healthcare. Closer to You.'}
              </h1>

              {/* HERO DESCRIPTION */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl text-pretty">
                {hero.description}
              </p>

              {/* HERO CTAS */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                {/* PRIMARY CTA */}
                <button
                  onClick={() => onOpenAppointmentModal()}
                  className="px-7 py-3.5 rounded-xl bg-[#0B4F6C] hover:bg-[#08384D] active:scale-[0.98] text-white text-base font-semibold shadow-md transition-all flex items-center justify-center gap-2.5 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#0B4F6C] focus-visible:ring-offset-2"
                >
                  <Calendar className="w-5 h-5 text-[#1995AD]" />
                  <span>{hero.primaryCtaText || 'Book an Appointment'}</span>
                </button>

                {/* SECONDARY CTA */}
                <button
                  onClick={() => onNavigate('services')}
                  className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 border-2 border-[#0B4F6C] text-[#0B4F6C] text-base font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>{hero.secondaryCtaText || 'Explore Our Services'}</span>
                  <ArrowRight className="w-4 h-4 text-[#0B4F6C]" />
                </button>
              </div>

              {/* HERO TRUST POINTS */}
              <div className="pt-6 border-t border-slate-200">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-800">
                    <span className="w-2 h-2 rounded-full bg-[#1995AD] shrink-0" />
                    <span>{hero.trustPoint1 || 'Patient-Centered Care'}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-800">
                    <span className="w-2 h-2 rounded-full bg-[#1995AD] shrink-0" />
                    <span>{hero.trustPoint2 || 'Professional Medical Team'}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-800">
                    <span className="w-2 h-2 rounded-full bg-[#1995AD] shrink-0" />
                    <span>{hero.trustPoint3 || 'Modern Healthcare Environment'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual / Custom Photo / Showcase Card */}
            <div className="lg:col-span-5">
              <div className="relative">
                {hero.useCustomHeroImage && hero.heroImageUrl ? (
                  <div className="relative overflow-hidden rounded-2xl h-80 sm:h-96 md:h-[440px] shadow-xl border border-slate-200">
                    <img
                      src={hero.heroImageUrl}
                      alt={HOSPITAL_CONTACT.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                      <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                        {HOSPITAL_CONTACT.name}
                      </span>
                      <h3 className="text-lg font-bold">{HOSPITAL_CONTACT.taglineHindi}</h3>
                      <p className="text-xs text-slate-300">{HOSPITAL_CONTACT.address}</p>
                    </div>
                  </div>
                ) : (
                  /* Main Showcase Banner Card in place of the screenshot */
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0B4F6C] via-[#08384D] to-[#062432] p-6 sm:p-7 text-white shadow-xl border border-[#1995AD]/40 flex flex-col justify-between min-h-[390px] sm:min-h-[440px]">
                    {/* Subtle Grid and Glow */}
                    <div className="absolute inset-0 bg-[radial-gradient(#1995AD_1px,transparent_1px)] [background-size:18px_18px] opacity-15 pointer-events-none" />
                    <div className="absolute -right-16 -top-16 w-52 h-52 rounded-full bg-[#1995AD]/20 blur-2xl pointer-events-none" />

                    {/* Card Header */}
                    <div className="relative z-10 flex items-center justify-between">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-white">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#38BDF8]" />
                        <span>{HOSPITAL_CONTACT.name.toUpperCase()}</span>
                      </div>
                      <span className="text-[11px] font-medium text-slate-200 bg-black/25 px-2.5 py-0.5 rounded-full border border-white/10">
                        {HOSPITAL_CONTACT.city}
                      </span>
                    </div>

                    {/* Core Showcase Text: 'बेस्ट हॉस्पिटल इन धनबाद' */}
                    <div className="relative z-10 my-auto py-4 space-y-3">
                      <div className="inline-flex items-center gap-1.5 text-amber-300 text-xs font-bold uppercase tracking-wider">
                        <Star className="w-3.5 h-3.5 fill-amber-300" />
                        <span>धनबाद का विश्वसनीय चिकित्सा केंद्र</span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl md:text-[34px] font-black text-white tracking-tight leading-tight drop-shadow-sm">
                        {HOSPITAL_CONTACT.taglineHindi || 'बेस्ट हॉस्पिटल इन धनबाद'}
                      </h2>

                      <p className="text-sm font-semibold text-[#7DD3FC]">
                        {HOSPITAL_CONTACT.taglineEnglish || 'Best Multi-Speciality Hospital in Dhanbad'}
                      </p>

                      <p className="text-xs text-slate-300 leading-relaxed pt-0.5">
                        24×7 आपातकालीन सेवा, अनुभवी विशेषज्ञ डॉक्टर्स, मॉड्यूलर ऑपरेशन थिएटर एवं आधुनिक आईसीयू द्वारा समर्पित स्वास्थ्य सेवा।
                      </p>

                      {/* Clinical Feature Pills */}
                      <div className="pt-2 grid grid-cols-2 gap-2 text-[11px]">
                        <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-2.5 py-1.5 rounded-lg border border-white/10">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span className="font-medium text-slate-100">24×7 इमरजेंसी सेवा</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-2.5 py-1.5 rounded-lg border border-white/10">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span className="font-medium text-slate-100">अनुभवी विशेषज्ञ डॉक्टर</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-2.5 py-1.5 rounded-lg border border-white/10">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span className="font-medium text-slate-100">मॉड्यूलर ओटी & ICU</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-2.5 py-1.5 rounded-lg border border-white/10">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span className="font-medium text-slate-100">डिजिटल डायग्नोस्टिक्स</span>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer Bar */}
                    <div className="relative z-10 pt-3 border-t border-white/15 flex items-center justify-between text-[11px] text-slate-300">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#38BDF8]" />
                        <span>{HOSPITAL_CONTACT.landmark || 'Memco More, Dhanbad'}</span>
                      </span>
                      <a
                        href={`tel:${HOSPITAL_CONTACT.phonePrimary}`}
                        className="text-white hover:text-[#38BDF8] font-bold flex items-center gap-1 transition-colors"
                      >
                        <Phone className="w-3 h-3 text-[#38BDF8]" />
                        <span>{HOSPITAL_CONTACT.phonePrimary}</span>
                      </a>
                    </div>
                  </div>
                )}

                {/* Floating Card 1: 24×7 Support */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3.5 py-2.5 rounded-xl shadow-md border border-slate-200 flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  <div className="text-left">
                    <span className="text-xs font-bold text-slate-900 block leading-none">24×7 Support</span>
                    <span className="text-[10px] text-slate-500 font-medium">Emergency & Casualty</span>
                  </div>
                </div>

                {/* Floating Card 2: Patient Care */}
                <div className="absolute -bottom-5 left-4 sm:left-6 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-slate-200 flex items-center gap-3 max-w-[280px]">
                  <div className="w-10 h-10 rounded-lg bg-[#EBF4F7] text-[#0B4F6C] flex items-center justify-center shrink-0">
                    <HeartHandshake className="w-5 h-5 text-[#1995AD]" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block leading-tight">Patient Care</span>
                    <span className="text-[11px] text-slate-500 block leading-tight mt-0.5">
                      Dignified, comfortable and accessible healthcare.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 04 — QUICK ACTION CARDS                                           */}
      {/* ========================================================================= */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6" aria-label="Quick Action Cards">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* CARD 01: Our Services */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-[#1995AD] transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#EBF4F7] text-[#0B4F6C] flex items-center justify-center group-hover:bg-[#0B4F6C] group-hover:text-white transition-colors">
                <Activity className="w-6 h-6 text-[#1995AD] group-hover:text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0B4F6C] transition-colors">
                Our Services
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Explore healthcare services available at Sarphi Hospital.
              </p>
            </div>
            <div className="pt-4 mt-2">
              <button
                onClick={() => onNavigate('services')}
                className="text-xs sm:text-sm font-bold text-[#0B4F6C] hover:text-[#08384D] flex items-center gap-1.5 cursor-pointer"
              >
                <span>View Services</span>
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>

          {/* CARD 02: Our Doctors */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-[#1995AD] transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#EBF4F7] text-[#0B4F6C] flex items-center justify-center group-hover:bg-[#0B4F6C] group-hover:text-white transition-colors">
                <Stethoscope className="w-6 h-6 text-[#1995AD] group-hover:text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0B4F6C] transition-colors">
                Our Doctors
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Meet our doctors and medical specialists.
              </p>
            </div>
            <div className="pt-4 mt-2">
              <button
                onClick={() => onNavigate('doctors')}
                className="text-xs sm:text-sm font-bold text-[#0B4F6C] hover:text-[#08384D] flex items-center gap-1.5 cursor-pointer"
              >
                <span>Meet Our Doctors</span>
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>

          {/* CARD 03: Book an Appointment */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-[#1995AD] transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#EBF4F7] text-[#0B4F6C] flex items-center justify-center group-hover:bg-[#0B4F6C] group-hover:text-white transition-colors">
                <Calendar className="w-6 h-6 text-[#1995AD] group-hover:text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0B4F6C] transition-colors">
                Book an Appointment
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Send your appointment request to the hospital.
              </p>
            </div>
            <div className="pt-4 mt-2">
              <button
                onClick={() => onOpenAppointmentModal()}
                className="text-xs sm:text-sm font-bold text-[#0B4F6C] hover:text-[#08384D] flex items-center gap-1.5 cursor-pointer"
              >
                <span>Book Now</span>
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>

          {/* CARD 04: Contact Hospital */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-[#1995AD] transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#EBF4F7] text-[#0B4F6C] flex items-center justify-center group-hover:bg-[#0B4F6C] group-hover:text-white transition-colors">
                <Phone className="w-6 h-6 text-[#1995AD] group-hover:text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0B4F6C] transition-colors">
                Contact Hospital
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Get in touch with Sarphi Hospital for enquiries and assistance.
              </p>
            </div>
            <div className="pt-4 mt-2">
              <button
                onClick={() => onNavigate('contact')}
                className="text-xs sm:text-sm font-bold text-[#0B4F6C] hover:text-[#08384D] flex items-center gap-1.5 cursor-pointer"
              >
                <span>Contact Us</span>
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 05 — ABOUT SARPHI HOSPITAL                                        */}
      {/* ========================================================================= */}
      <section className="bg-[#F0F7F9] py-16 md:py-20 border-y border-slate-200/80" aria-labelledby="about-heading">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left: Large hospital / doctor image */}
            <div className="lg:col-span-6">
              {about.aboutImageUrl ? (
                <div className="h-80 sm:h-96 md:h-[420px] rounded-2xl shadow-md border border-slate-200 overflow-hidden">
                  <img
                    src={about.aboutImageUrl}
                    alt={about.heading}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <ClinicalVisual
                  type="building"
                  className="h-80 sm:h-96 md:h-[420px] rounded-2xl shadow-md border border-slate-200"
                  title={`${HOSPITAL_CONTACT.name} & Healthcare Centre`}
                  badge={HOSPITAL_CONTACT.landmark || 'Memco More, Dhanbad'}
                />
              )}
            </div>

            {/* Right: Content */}
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0B4F6C] block">
                {about.eyebrow || 'ABOUT SARPHI HOSPITAL'}
              </span>

              <h2 id="about-heading" className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
                {about.heading || 'Healthcare With Care & Responsibility'}
              </h2>

              <p className="text-base text-slate-700 leading-relaxed font-medium">
                {about.introText}
              </p>

              {/* Editable paragraph for hospital history / medical philosophy */}
              <div className="p-4 rounded-xl bg-white border border-[#1995AD]/30 text-xs sm:text-sm text-slate-600 leading-relaxed space-y-2">
                <span className="text-[11px] font-bold text-[#0B4F6C] uppercase tracking-wider block">
                  {about.philosophyTitle || 'Hospital Philosophy & Community Care'}
                </span>
                <p>
                  {about.philosophyText}
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('about')}
                  className="px-6 py-3 rounded-xl bg-[#0B4F6C] hover:bg-[#08384D] active:scale-[0.98] text-white text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>Learn More About Us</span>
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 06 — HEALTHCARE SERVICES                                          */}
      {/* ========================================================================= */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6" aria-labelledby="services-heading">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0B4F6C]">
            OUR SERVICES
          </span>
          <h2 id="services-heading" className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Healthcare Services Under One Roof
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Explore the healthcare services available at Sarphi Hospital, designed to support patients across different medical needs.
          </p>
        </div>

        {/* 8 Service Cards Grid (Desktop 4 columns, Tablet 2, Mobile 1-2) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DEPARTMENTS.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md hover:border-[#1995AD] transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#EBF4F7] flex items-center justify-center group-hover:bg-[#0B4F6C] transition-colors">
                  {getServiceIcon(service.iconName)}
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0B4F6C] transition-colors leading-snug">
                  {service.name}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {service.shortDesc}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => onNavigate('services')}
                  className="text-xs font-bold text-[#0B4F6C] hover:text-[#08384D] flex items-center gap-1 cursor-pointer"
                >
                  <span>Learn More</span>
                  <span aria-hidden="true">→</span>
                </button>
                <button
                  onClick={() => onOpenAppointmentModal(undefined, service.id)}
                  className="text-[11px] font-semibold text-slate-500 hover:text-slate-900 cursor-pointer"
                >
                  Book OPD
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-10">
          <button
            onClick={() => onNavigate('services')}
            className="px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 text-sm font-semibold transition-all inline-flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <span>View All Services</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 07 — WHY CHOOSE SARPHI HOSPITAL                                   */}
      {/* ========================================================================= */}
      <section className="bg-[#F8FBFC] py-16 md:py-20 border-y border-slate-200/80" aria-labelledby="why-heading">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B4F6C]">
              WHY SARPHI HOSPITAL
            </span>
            <h2 id="why-heading" className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight">
              Care Designed Around Patients
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Our approach is centered around professional healthcare, patient comfort and accessible medical support.
            </p>
          </div>

          {/* 6 Feature Cards (3 columns desktop, 2 tablet, 1 mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_CHOOSE_CARDS.map((card) => (
              <div
                key={card.id}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-[#1995AD] transition-all space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-[#EBF4F7] text-[#0B4F6C] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-[#1995AD]" />
                </div>
                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 08 — DOCTORS & SPECIALISTS PREVIEW                                */}
      {/* ========================================================================= */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6" aria-labelledby="doctors-heading">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B4F6C]">
              OUR MEDICAL TEAM
            </span>
            <h2 id="doctors-heading" className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight">
              Meet Our Doctors & Specialists
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-xl">
              Get to know the healthcare professionals associated with Sarphi Hospital.
            </p>
          </div>

          <button
            onClick={() => onNavigate('doctors')}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0B4F6C] hover:text-[#08384D] cursor-pointer"
          >
            <span>View All Doctors</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>

        {/* 3 Doctor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DOCTORS.slice(0, 3).map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:border-[#1995AD] transition-all flex flex-col justify-between"
            >
              <div className="p-6 space-y-4">
                {/* Doctor Avatar / Photo Placeholder */}
                <div className="flex items-start justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-[#EBF4F7] text-[#0B4F6C] flex items-center justify-center font-bold text-xl border border-slate-200">
                    <Stethoscope className="w-7 h-7 text-[#1995AD]" />
                  </div>
                  <span className="text-xs font-semibold text-[#0B4F6C] bg-[#EBF4F7] px-2.5 py-1 rounded-md">
                    {doc.departmentName}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 leading-snug">
                    {doc.name}
                  </h3>
                  <p className="text-xs font-medium text-slate-600 mt-0.5">
                    {doc.title}
                  </p>
                  <p className="text-[11px] font-mono text-[#0B4F6C] mt-1 font-semibold">
                    {doc.qualifications}
                  </p>
                </div>

                <div className="space-y-1 text-xs text-slate-600">
                  <p className="text-slate-500">
                    <strong>Experience:</strong> {doc.experience}
                  </p>
                  <p className="text-slate-500">
                    <strong>Chamber:</strong> {doc.roomNumber}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  onClick={() => onNavigate('doctors')}
                  className="w-1/2 py-2 px-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold text-center cursor-pointer transition-colors"
                >
                  View Profile
                </button>
                <button
                  onClick={() => onOpenAppointmentModal(doc.id, doc.departmentId)}
                  className="w-1/2 py-2 px-3 rounded-xl bg-[#0B4F6C] hover:bg-[#08384D] text-white text-xs font-semibold text-center cursor-pointer shadow-xs transition-colors"
                >
                  Book OPD Slot
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Editable placeholder note for hospital administration */}
        <div className="mt-8 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500 text-center">
          <span className="font-semibold text-slate-700">Hospital Administration Note:</span> Doctor schedules and chamber allocations are verified and updated by Sarphi Hospital OPD desk at Memco More.
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 09 — HOSPITAL FACILITIES / GALLERY PREVIEW                        */}
      {/* ========================================================================= */}
      <section className="bg-slate-50 py-16 border-y border-slate-200" aria-labelledby="facilities-heading">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B4F6C]">
              OUR FACILITIES
            </span>
            <h2 id="facilities-heading" className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight">
              A Look Inside Sarphi Hospital
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Explore our hospital environment, facilities and healthcare spaces.
            </p>
          </div>

          {/* Modern Image Grid: 1 Large Featured + 4 Smaller Images */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {/* Featured Image (Large 7 cols on desktop) */}
            <div className="md:col-span-7">
              <ClinicalVisual
                type="ot"
                className="h-80 sm:h-96 md:h-full w-full rounded-2xl shadow-sm"
                title="Modular Operation Theatre Complex"
                badge="Sterile Laminar Airflow"
              />
            </div>

            {/* 4 Smaller Images (5 cols, 2x2 grid) */}
            <div className="md:col-span-5 grid grid-cols-2 gap-4">
              <ClinicalVisual
                type="icu"
                className="h-44 sm:h-48 w-full rounded-2xl shadow-sm"
                title="ICU & Telemetry"
                badge="24×7 Critical"
              />
              <ClinicalVisual
                type="lab"
                className="h-44 sm:h-48 w-full rounded-2xl shadow-sm"
                title="Pathology Lab"
                badge="Automated"
              />
              <ClinicalVisual
                type="emergency"
                className="h-44 sm:h-48 w-full rounded-2xl shadow-sm"
                title="Casualty Bay"
                badge="Always Open"
              />
              <ClinicalVisual
                type="consultation"
                className="h-44 sm:h-48 w-full rounded-2xl shadow-sm"
                title="Inpatient Ward"
                badge="Clean & Calm"
              />
            </div>
          </div>

          {/* CTA: View Full Gallery */}
          <div className="text-center mt-10">
            <button
              onClick={() => onNavigate('gallery')}
              className="px-7 py-3 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 text-sm font-semibold inline-flex items-center gap-2 cursor-pointer shadow-xs transition-all"
            >
              <span>View Full Gallery</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 10 — PATIENT TRUST / KEY HIGHLIGHTS                               */}
      {/* ========================================================================= */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6" aria-label="Key Hospital Highlights">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            {TRUST_HIGHLIGHTS.map((h, i) => (
              <div key={h.id} className={`${i !== 0 ? 'pt-4 sm:pt-0 sm:pl-4' : ''} space-y-1`}>
                <h3 className="text-base sm:text-lg font-bold text-[#0B4F6C]">
                  {h.title}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {h.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 11 — PATIENT TESTIMONIALS                                         */}
      {/* ========================================================================= */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6" aria-labelledby="testimonials-heading">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0B4F6C]">
            PATIENT EXPERIENCES
          </span>
          <h2 id="testimonials-heading" className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            What Our Patients Say
          </h2>
          <p className="text-slate-600 text-sm">
            Real feedback from verified patients and families who received medical care at Sarphi Hospital.
          </p>
        </div>

        {/* 3 Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* 5-star rating */}
                <div className="flex items-center gap-1 text-amber-500" aria-label="5 out of 5 stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-[11px] font-semibold text-slate-500 ml-1.5">[Verified Patient Review]</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                  "{t.content}"
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100">
                <span className="font-bold text-slate-900 text-sm block">{t.patientName}</span>
                <span className="text-xs text-slate-500 block">{t.relation}</span>
                <span className="text-[11px] text-[#0B4F6C] font-medium block mt-0.5">{t.department}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 12 — FAQ                                                          */}
      {/* ========================================================================= */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6" aria-labelledby="faq-heading">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0B4F6C]">
            FAQ
          </span>
          <h2 id="faq-heading" className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm">
            Clear information about hospital timings, consultations, and emergency procedures.
          </p>
        </div>

        {/* Accordion */}
        <div className="max-w-3xl mx-auto space-y-3">
          {FAQS.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-5 py-4 text-left font-bold text-sm sm:text-base text-slate-900 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-[#0B4F6C] shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 13 — FINAL CALL TO ACTION                                         */}
      {/* ========================================================================= */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6" aria-labelledby="cta-heading">
        <div className="bg-[#0B4F6C] text-white rounded-2xl p-8 sm:p-12 text-center shadow-lg relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-5">
            <h2 id="cta-heading" className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Your Health Deserves Thoughtful Care
            </h2>

            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              For appointments, enquiries or healthcare assistance, connect with Sarphi Hospital.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <button
                onClick={() => onOpenAppointmentModal()}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-[#0B4F6C] font-bold text-base shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-5 h-5 text-[#0B4F6C]" />
                <span>Book an Appointment</span>
              </button>

              <a
                href={`tel:${HOSPITAL_CONTACT.phonePrimary}`}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold text-base transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5 text-white" />
                <span>Call Hospital</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 14 — CONTACT STRIP                                                */}
      {/* ========================================================================= */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6" aria-label="Hospital Contact Details">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Column 1: Location */}
            <div className="space-y-1.5 border-b md:border-b-0 md:border-r border-slate-100 pb-4 md:pb-0 md:pr-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0B4F6C]">
                <MapPin className="w-4 h-4 text-[#1995AD]" />
                <span>LOCATION</span>
              </div>
              <p className="text-sm font-semibold text-slate-900 leading-snug">
                Memco More, Dhanbad
              </p>
              <p className="text-xs text-slate-500">
                Jharkhand, India · Pin 826004
              </p>
              <div className="pt-1">
                <button
                  onClick={() => onNavigate('contact')}
                  className="text-xs font-bold text-[#0B4F6C] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Get Directions</span>
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>

            {/* Column 2: Phone */}
            <div className="space-y-1.5 border-b md:border-b-0 md:border-r border-slate-100 pb-4 md:pb-0 md:pr-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0B4F6C]">
                <Phone className="w-4 h-4 text-[#1995AD]" />
                <span>PHONE</span>
              </div>
              <a
                href={`tel:${HOSPITAL_CONTACT.phonePrimary}`}
                className="text-sm font-bold text-slate-900 block hover:text-[#0B4F6C] transition-colors"
              >
                {HOSPITAL_CONTACT.phonePrimary} (OPD)
              </a>
              <a
                href={`tel:${HOSPITAL_CONTACT.phoneEmergency}`}
                className="text-xs font-semibold text-rose-600 block hover:text-rose-700"
              >
                {HOSPITAL_CONTACT.phoneEmergency} (24x7 Emergency)
              </a>
            </div>

            {/* Column 3: Email */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0B4F6C]">
                <Mail className="w-4 h-4 text-[#1995AD]" />
                <span>EMAIL</span>
              </div>
              <a
                href={`mailto:${HOSPITAL_CONTACT.email}`}
                className="text-sm font-semibold text-slate-900 block hover:text-[#0B4F6C] transition-colors truncate"
              >
                {HOSPITAL_CONTACT.email}
              </a>
              <p className="text-xs text-slate-500">
                Official Inpatient & Administration Desk
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
