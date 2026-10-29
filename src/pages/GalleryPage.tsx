import React, { useState } from 'react';
import { 
  Building2, Activity, HeartPulse, Microscope, ShieldAlert, CheckCircle2, 
  Calendar, Clock, MapPin, Phone, Mail, Award, Eye, X, ChevronDown, 
  ChevronUp, ShieldCheck, HeartHandshake, Sparkles, Filter, Search,
  ExternalLink, Stethoscope, ArrowRight, Info
} from 'lucide-react';
import { Page, Facility } from '../types';
import { ClinicalVisual } from '../components/VisualFallback';
import { FACILITIES, HOSPITAL_CONTACT, TRUST_HIGHLIGHTS } from '../data/hospitalData';

interface GalleryPageProps {
  onNavigate: (page: Page) => void;
  onOpenAppointmentModal: (doctorId?: string, departmentId?: string) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ 
  onNavigate, 
  onOpenAppointmentModal 
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // Filter facilities
  const filteredFacilities = FACILITIES.filter((fac) => {
    const matchesCategory = 
      activeCategory === 'all' ||
      (activeCategory === 'surgical' && fac.category === 'surgical') ||
      (activeCategory === 'critical' && fac.category === 'critical') ||
      (activeCategory === 'diagnostic' && fac.category === 'diagnostic') ||
      (activeCategory === 'inpatient' && fac.category === 'inpatient') ||
      (activeCategory === 'general' && fac.category === 'general');

    const matchesSearch = 
      fac.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fac.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (fac.floorLocation && fac.floorLocation.toLowerCase().includes(searchQuery.toLowerCase())) ||
      fac.keyFeatures.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  // Section 08: Infection Control & Hygiene Protocols
  const hygieneProtocols = [
    {
      id: 'hyg-1',
      title: 'Laminar Airflow & HEPA-14 Filtration',
      desc: 'Positive pressure airflow system in modular operating theatres continually washes air downwards, preventing airborne contaminants and micro-organisms from entering the surgical zone.',
      badge: 'Sterile Air Standard',
      icon: <Activity className="w-5 h-5 text-[#1995AD]" />
    },
    {
      id: 'hyg-2',
      title: 'Four-Stage Instrument Autoclaving',
      desc: 'Surgical instruments and diagnostic scopes undergo ultrasonic cleaning, enzymatic debridement, and Class-B vacuum thermal autoclaving with chemical indicator verification.',
      badge: 'Zero-Pathogen Protocol',
      icon: <ShieldCheck className="w-5 h-5 text-[#1995AD]" />
    },
    {
      id: 'hyg-3',
      title: 'Bio-Medical Waste Segregation (BMW)',
      desc: 'Strict color-coded disposal (Yellow, Red, White translucent, Blue) compliant with Central Pollution Control Board norms ensures safe handling of sharps, infected disposables, and glass.',
      badge: 'Pollution Board Compliant',
      icon: <CheckCircle2 className="w-5 h-5 text-[#1995AD]" />
    },
    {
      id: 'hyg-4',
      title: 'Scheduled Chemical Fogging & Wipes',
      desc: 'Intensive care units, inpatient rooms, and public hallways undergo daily morning and evening sanitization using medical-grade quaternary ammonium and chlorine disinfectants.',
      badge: 'Continuous Disinfection',
      icon: <Sparkles className="w-5 h-5 text-[#1995AD]" />
    }
  ];

  // Section 09: Attendant Amenities
  const attendantAmenities = [
    {
      title: 'Air-Conditioned Waiting Lounges',
      desc: 'Spacious, clean seating with charging points and token announcement displays for patient family members.',
      icon: <Building2 className="w-6 h-6 text-[#1995AD]" />
    },
    {
      title: '24×7 In-House Hospital Pharmacy',
      desc: 'Ground floor dispensary stocked with genuine prescription medicines, pediatric doses, and critical injectables.',
      icon: <ShieldCheck className="w-6 h-6 text-[#1995AD]" />
    },
    {
      title: 'Wheelchair & Stretcher Assistance',
      desc: 'Free wheelchair access and gentle slope entry ramps at the main portico with dedicated assistance staff.',
      icon: <HeartHandshake className="w-6 h-6 text-[#1995AD]" />
    },
    {
      title: 'Multi-Stage RO Drinking Water',
      desc: 'Certified reverse osmosis water dispensing stations installed on every floor with clean paper cups.',
      icon: <Sparkles className="w-6 h-6 text-[#1995AD]" />
    },
    {
      title: '100% DG Power & Medical Gas Pipeline',
      desc: 'Uninterrupted power generator backup and centralized oxygen distribution guaranteeing zero equipment downtime.',
      icon: <Activity className="w-6 h-6 text-[#1995AD]" />
    },
    {
      title: 'Dedicated Ambulance Parking Bay',
      desc: 'Direct street access portico at Memco More Chowk for rapid patient reception and zero-delay casualty transfer.',
      icon: <ShieldAlert className="w-6 h-6 text-rose-500" />
    }
  ];

  // Section 11: Gallery & Facility FAQs
  const facilityFaqs = [
    {
      q: 'What are the visiting hours for the Inpatient Wards and ICU?',
      a: 'For General and Private Wards, visiting hours are 10:00 AM to 12:00 PM and 05:00 PM to 07:00 PM daily. For the Intensive Care Unit (ICU), visiting is restricted to 11:30 AM – 12:30 PM and 05:30 PM – 06:30 PM (one attendant at a time wearing protective barrier attire) to maintain sterility and patient recovery.'
    },
    {
      q: 'Can patient family members inspect patient rooms before admission?',
      a: 'Yes. Our reception and admission counseling team at the Ground Floor desk will gladly guide you or your family attendant to view available general wards, semi-private sharing rooms, or private AC rooms so you can make an informed choice.'
    },
    {
      q: 'How many attendants are allowed to stay overnight with an admitted patient?',
      a: 'In Deluxe and Single Private Rooms, one primary attendant is provided with an attendant couch bed and pass to stay overnight. In general wards, attendant passes are regulated during night hours to preserve quiet rest for all patients.'
    },
    {
      q: 'Are the operation theatres equipped with laminar airflow systems?',
      a: 'Yes. Sarphi Hospital operation theatres are constructed with positive-pressure laminar airflow and HEPA-14 particulate filtration ceilings. This maintains a sterile air current directly over the operating table, minimizing surgical site infection risks.'
    },
    {
      q: 'Is wheelchair assistance available upon arrival at the hospital?',
      a: 'Yes. Dedicated hospital wheelchairs and transport stretchers are stationed right at the Ground Floor portico entrance. Our front desk support staff will assist elderly or immobile patients immediately upon vehicle arrival.'
    },
    {
      q: 'Does Sarphi Hospital have backup power generators during municipal load shedding?',
      a: 'Yes. The entire hospital facility is connected to high-capacity industrial diesel generators with automatic mains failure (AMF) transfer panels. Life-support ventilators, operation theatre lighting, and diagnostic devices run without interruption.'
    },
    {
      q: 'Is the in-house pharmacy open during late night hours?',
      a: 'Yes. The Sarphi Hospital pharmacy is situated on the Ground Floor right near the entrance and operates 24 hours a day, 7 days a week, 365 days a year for inpatients, emergency casualty cases, and walk-in prescriptions.'
    },
    {
      q: 'How are diagnostic laboratory and X-Ray reports delivered?',
      a: 'Routine blood panels and computerized ECGs are processed rapidly with same-day printed reports available at the diagnostics counter. Emergency stat reports for casualty and ICU patients are generated immediately.'
    }
  ];

  return (
    <div className="space-y-16 md:space-y-24 pb-16">
      {/* ========================================================================= */}
      {/* SECTION 03 — PAGE HERO                                                    */}
      {/* ========================================================================= */}
      <section className="pt-6 md:pt-10" aria-labelledby="gallery-hero-title">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6" aria-label="Breadcrumb">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-[#0B4F6C] hover:underline cursor-pointer"
            >
              Home
            </button>
            <span>/</span>
            <span className="text-[#0B4F6C] font-semibold">Facilities & Infrastructure Tour</span>
          </nav>

          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF4F7] text-[#0B4F6C] text-xs font-semibold border border-[#1995AD]/25">
              <span className="w-2 h-2 rounded-full bg-[#1995AD] animate-pulse" />
              <span>Transparent Look Inside Sarphi Hospital</span>
            </div>

            <h1 
              id="gallery-hero-title"
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-[1.18]"
            >
              Hospital Infrastructure, Facilities & Patient Care Tour
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed text-pretty">
              Take a visual walkthrough of our clinical care environments, advanced modular operation theatres, intensive care beds, automated pathology laboratory, and comfortable inpatient recovery suites at Memco More, Dhanbad.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <button
                onClick={() => onOpenAppointmentModal()}
                className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[#0B4F6C] hover:bg-[#08384D] text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
              >
                <Calendar className="w-4 h-4 text-[#1995AD]" />
                <span>Book Doctor Appointment</span>
              </button>

              <button
                onClick={() => onNavigate('contact')}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Info className="w-4 h-4 text-[#0B4F6C]" />
                <span>Inquire About Admissions</span>
              </button>

              <a
                href={`tel:${HOSPITAL_CONTACT.phonePrimary}`}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Phone className="w-4 h-4 text-[#1995AD]" />
                <span>Reception: {HOSPITAL_CONTACT.phonePrimary}</span>
              </a>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-6 border-t border-slate-200">
            {TRUST_HIGHLIGHTS.map((item) => (
              <div 
                key={item.id} 
                className="bg-slate-50/80 rounded-xl p-3 text-center border border-slate-100"
              >
                <span className="block text-xs font-bold text-[#0B4F6C]">{item.title}</span>
                <span className="text-[11px] text-slate-500">{item.subtitle}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 04 — TOUR REASSURANCE STATEMENT                                   */}
      {/* ========================================================================= */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-br from-[#0B4F6C] to-[#08384D] text-white rounded-3xl p-8 sm:p-12 shadow-md relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-[radial-gradient(#1995AD_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-cyan-200 backdrop-blur-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-300" />
                Designed for Safety, Cleanliness & Dignified Care
              </span>

              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug">
                A Purpose-Built Healthcare Environment in Dhanbad
              </h2>

              <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                Sarphi Hospital was established with a singular priority: ensuring that every patient in Dhanbad has access to sterile, medically sound, and compassionate hospital surroundings. From HEPA-filtered laminar airflow in our operating suites to 24×7 central oxygen lines, our infrastructure adheres to modern healthcare hygiene standards.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2.5 text-xs text-cyan-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Class-B Multi-Stage Autoclaved Sterilization</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-cyan-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>24×7 Central Medical Gas Pipeline (MGPS)</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-cyan-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Biomedical Waste Segregation & Safe Disposal</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-cyan-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Dedicated Patient Attendant Waiting Facilities</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-cyan-300" />
                Visiting & Admissions Overview
              </h3>
              
              <div className="space-y-3 text-xs text-slate-200 divide-y divide-white/10">
                <div className="pt-2 flex justify-between items-center">
                  <span className="text-slate-300">OPD Consultation Hours</span>
                  <span className="font-semibold text-white">09:00 AM – 08:30 PM</span>
                </div>
                <div className="pt-2 flex justify-between items-center">
                  <span className="text-slate-300">Emergency & Trauma Triage</span>
                  <span className="font-semibold text-emerald-400">24 Hours / 7 Days</span>
                </div>
                <div className="pt-2 flex justify-between items-center">
                  <span className="text-slate-300">Inpatient Ward Visiting</span>
                  <span className="font-semibold text-white">10 AM - 12 PM & 5 PM - 7 PM</span>
                </div>
                <div className="pt-2 flex justify-between items-center">
                  <span className="text-slate-300">In-House Pharmacy</span>
                  <span className="font-semibold text-cyan-300">Always Open (Ground Fl.)</span>
                </div>
              </div>

              <button
                onClick={() => onNavigate('contact')}
                className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-[#0B4F6C] font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Memco More Location & Directions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 05 — INTERACTIVE CATEGORY FILTER & SEARCH                          */}
      {/* ========================================================================= */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeCategory === 'all'
                  ? 'bg-[#0B4F6C] text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span>All Facilities</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeCategory === 'all' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>
                {FACILITIES.length}
              </span>
            </button>

            <button
              onClick={() => setActiveCategory('surgical')}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === 'surgical'
                  ? 'bg-[#0B4F6C] text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              Modular OT Complex
            </button>

            <button
              onClick={() => setActiveCategory('critical')}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === 'critical'
                  ? 'bg-[#0B4F6C] text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              ICU & Emergency
            </button>

            <button
              onClick={() => setActiveCategory('diagnostic')}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === 'diagnostic'
                  ? 'bg-[#0B4F6C] text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              Diagnostics & Lab
            </button>

            <button
              onClick={() => setActiveCategory('inpatient')}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === 'inpatient'
                  ? 'bg-[#0B4F6C] text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              Inpatient Rooms
            </button>

            <button
              onClick={() => setActiveCategory('general')}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === 'general'
                  ? 'bg-[#0B4F6C] text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              Pharmacy & Reception
            </button>
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px] md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search facility or equipment..."
              className="w-full pl-9 pr-4 py-2 rounded-xl text-xs border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#0B4F6C] focus:border-transparent text-slate-800 placeholder-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 06 — INTERACTIVE FACILITIES GALLERY GRID                          */}
      {/* ========================================================================= */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {filteredFacilities.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 space-y-4">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">No matching hospital facilities found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your search keywords or switch category filter to see all departments.
            </p>
            <button
              onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
              className="px-4 py-2 rounded-xl bg-[#0B4F6C] text-white text-xs font-semibold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFacilities.map((fac) => {
              const visualType = fac.visualType || (
                fac.category === 'surgical' ? 'ot' :
                fac.category === 'critical' ? (fac.id.includes('emergency') ? 'emergency' : 'icu') :
                fac.category === 'diagnostic' ? (fac.id.includes('x-ray') ? 'xray' : 'lab') :
                fac.category === 'inpatient' ? 'ward' : 'building'
              );

              return (
                <div
                  key={fac.id}
                  className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Visual Card Header */}
                    <div className="relative overflow-hidden cursor-pointer" onClick={() => setSelectedFacility(fac)}>
                      <ClinicalVisual
                        type={visualType as any}
                        className="h-56 w-full group-hover:scale-[1.02] transition-transform duration-500"
                        title={fac.title}
                        badge={fac.badge}
                      />
                      
                      {/* Floor Location Pill */}
                      {fac.floorLocation && (
                        <div className="absolute bottom-3 left-3 z-20">
                          <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold bg-slate-900/80 backdrop-blur-sm text-white shadow-xs border border-white/20 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-[#1995AD]" />
                            <span>{fac.floorLocation}</span>
                          </span>
                        </div>
                      )}

                      {/* Inspect Overlay Trigger */}
                      <div className="absolute inset-0 bg-[#0B4F6C]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                        <span className="px-3 py-1.5 rounded-lg bg-white/90 text-[#0B4F6C] text-xs font-bold shadow-md flex items-center gap-1.5">
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Full Specs</span>
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 space-y-3.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-bold text-[#0B4F6C] uppercase tracking-wider">
                          {fac.badge}
                        </span>
                        {fac.capacity && (
                          <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                            {fac.capacity}
                          </span>
                        )}
                      </div>

                      <h3 
                        onClick={() => setSelectedFacility(fac)}
                        className="text-lg font-bold text-slate-900 leading-snug cursor-pointer hover:text-[#0B4F6C] transition-colors"
                      >
                        {fac.title}
                      </h3>

                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                        {fac.description}
                      </p>

                      {/* Key Features & Technology */}
                      <div className="pt-3 border-t border-slate-100">
                        <span className="text-[11px] font-semibold text-slate-500 block mb-2">
                          Key Equipment & Technology:
                        </span>
                        <ul className="space-y-1.5 text-xs text-slate-700">
                          {fac.keyFeatures.slice(0, 3).map((feat, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#1995AD] shrink-0 mt-0.5" />
                              <span className="leading-tight">{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Card Action Buttons */}
                  <div className="p-6 pt-0 space-y-2">
                    <button
                      onClick={() => setSelectedFacility(fac)}
                      className="w-full py-2.5 px-3 rounded-xl bg-[#0B4F6C] hover:bg-[#08384D] text-white text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#1995AD]" />
                      <span>Inspect Facility & Guidelines</span>
                    </button>

                    <button
                      onClick={() => onOpenAppointmentModal()}
                      className="w-full py-2 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <Calendar className="w-3.5 h-3.5 text-[#0B4F6C]" />
                      <span>Inquire / Book Consultation</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ========================================================================= */}
      {/* SECTION 07 — INTERACTIVE DETAIL MODAL / LIGHTBOX                           */}
      {/* ========================================================================= */}
      {selectedFacility && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-facility-title"
        >
          <div 
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 relative animate-in zoom-in-95 duration-200 my-8"
          >
            {/* Modal Close Button */}
            <button
              onClick={() => setSelectedFacility(null)}
              className="absolute right-4 top-4 z-30 w-9 h-9 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white flex items-center justify-center cursor-pointer transition-colors shadow-sm"
              aria-label="Close details"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Visual Banner */}
            <div className="relative">
              <ClinicalVisual
                type={(selectedFacility.visualType || 'building') as any}
                className="h-64 sm:h-72 w-full rounded-t-3xl rounded-b-none"
                title={selectedFacility.title}
                badge={selectedFacility.badge}
              />
              {selectedFacility.floorLocation && (
                <div className="absolute bottom-4 left-6 z-20">
                  <span className="px-3 py-1 rounded-md text-xs font-semibold bg-slate-900/85 backdrop-blur-md text-white border border-white/20 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#1995AD]" />
                    <span>{selectedFacility.floorLocation}</span>
                  </span>
                </div>
              )}
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-[#0B4F6C] uppercase tracking-wider bg-[#EBF4F7] px-2.5 py-1 rounded-full">
                    {selectedFacility.badge}
                  </span>
                  {selectedFacility.capacity && (
                    <span className="text-xs text-slate-500 font-medium">
                      {selectedFacility.capacity}
                    </span>
                  )}
                </div>

                <h2 
                  id="modal-facility-title"
                  className="text-2xl font-bold text-slate-900"
                >
                  {selectedFacility.title}
                </h2>

                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  {selectedFacility.description}
                </p>
              </div>

              {/* Specialist In Charge */}
              {selectedFacility.specialistInCharge && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#0B4F6C] text-white flex items-center justify-center shrink-0">
                    <Stethoscope className="w-5 h-5 text-cyan-200" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 font-medium block">Department Oversight</span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900">
                      {selectedFacility.specialistInCharge}
                    </span>
                  </div>
                </div>
              )}

              {/* Detailed Equipment Specifications */}
              {selectedFacility.equipmentSpecs && selectedFacility.equipmentSpecs.length > 0 && (
                <div className="space-y-2.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-[#1995AD]" />
                    <span>Clinical Equipment & Technology Specifications</span>
                  </h4>
                  <div className="grid grid-cols-1 gap-2 pt-1">
                    {selectedFacility.equipmentSpecs.map((spec, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        <CheckCircle2 className="w-4 h-4 text-[#1995AD] shrink-0 mt-0.5" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sanitation & Sterilization Protocol */}
              {selectedFacility.sanitationProtocol && (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200/80 space-y-1">
                  <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <span>Hygiene & Infection Control Protocol</span>
                  </span>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    {selectedFacility.sanitationProtocol}
                  </p>
                </div>
              )}

              {/* Attendant & Visiting Policy */}
              {selectedFacility.visitingHours && (
                <div className="p-4 rounded-xl bg-blue-50 border border-blue-200/80 space-y-1">
                  <span className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-blue-700" />
                    <span>Attendant Policy & Visiting Hours</span>
                  </span>
                  <p className="text-xs text-blue-800 leading-relaxed">
                    {selectedFacility.visitingHours}
                  </p>
                </div>
              )}

              {/* Actions Footer */}
              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <a
                  href={`tel:${HOSPITAL_CONTACT.phonePrimary}`}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#0B4F6C]" />
                  <span>Call Reception Desk</span>
                </a>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedFacility(null);
                      onOpenAppointmentModal();
                    }}
                    className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-[#0B4F6C] hover:bg-[#08384D] text-white text-xs font-semibold shadow-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <Calendar className="w-4 h-4 text-[#1995AD]" />
                    <span>Book Doctor Appointment</span>
                  </button>

                  <button
                    onClick={() => setSelectedFacility(null)}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold cursor-pointer transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 08 — HYGIENE, STERILIZATION & INFECTION CONTROL                   */}
      {/* ========================================================================= */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF4F7] text-[#0B4F6C] text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-[#1995AD]" />
            <span>Zero-Compromise Cleanliness</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Hospital Hygiene & Sterilization Standards
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Preventing healthcare-associated infections (HCAI) is foundational to patient safety. Here is how Sarphi Hospital upholds infection control across every department.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {hygieneProtocols.map((proto) => (
            <div
              key={proto.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3.5 shadow-xs hover:border-[#1995AD]/40 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-[#EBF4F7] flex items-center justify-center">
                {proto.icon}
              </div>
              <span className="text-[10px] font-bold text-[#0B4F6C] uppercase tracking-wider block bg-slate-100 px-2 py-0.5 rounded w-fit">
                {proto.badge}
              </span>
              <h3 className="text-base font-bold text-slate-900 leading-snug">
                {proto.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {proto.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 09 — ATTENDANT AMENITIES & SUPPORT INFRASTRUCTURE                */}
      {/* ========================================================================= */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF4F7] text-[#0B4F6C] text-xs font-semibold">
            <HeartHandshake className="w-3.5 h-3.5 text-[#1995AD]" />
            <span>Patient Attendant Care</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Thoughtful Amenities for Patients & Attendant Families
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            We understand that hospital visits can be stressful for families. Sarphi Hospital provides accessible support infrastructure to ensure comfortable stays.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {attendantAmenities.map((amenity, idx) => (
            <div
              key={idx}
              className="bg-slate-50/70 rounded-2xl border border-slate-200/80 p-6 space-y-3 hover:bg-white hover:shadow-sm transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-white shadow-xs border border-slate-200 flex items-center justify-center text-[#0B4F6C]">
                {amenity.icon}
              </div>
              <h3 className="text-base font-bold text-slate-900">
                {amenity.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {amenity.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 10 — LOCATION ADVANTAGE AT MEMCO MORE                            */}
      {/* ========================================================================= */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF4F7] text-[#0B4F6C] text-xs font-semibold">
                <MapPin className="w-3.5 h-3.5 text-[#1995AD]" />
                <span>Memco More Chowk, Dhanbad</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Strategic Location on the GT Road Bypass
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Located right at Memco More, Sarphi Hospital provides rapid access for emergency ambulances and planned outpatient visitors from across Dhanbad, Govindpur, Barwadda, and surrounding coalfield areas. Our spacious front portico ensures ambulances and patient cars avoid congested downtown traffic.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-center">
                  <span className="text-lg font-extrabold text-[#0B4F6C] block">4.2 km</span>
                  <span className="text-[11px] text-slate-500 font-medium">Dhanbad Rly Station</span>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-center">
                  <span className="text-lg font-extrabold text-[#0B4F6C] block">2.8 km</span>
                  <span className="text-[11px] text-slate-500 font-medium">Steel Gate / Saraidhela</span>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-center">
                  <span className="text-lg font-extrabold text-[#0B4F6C] block">5.5 km</span>
                  <span className="text-[11px] text-slate-500 font-medium">Bank More Market</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-100 rounded-2xl p-6 border border-slate-200 space-y-4 text-center sm:text-left">
              <h3 className="text-base font-bold text-slate-900">Hospital Visiting Address</h3>
              <p className="text-xs text-slate-700 leading-relaxed">
                <strong>{HOSPITAL_CONTACT.name}</strong><br />
                {HOSPITAL_CONTACT.address}<br />
                Landmark: Near Memco More Traffic Point, Dhanbad
              </p>
              
              <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                <button
                  onClick={() => onNavigate('contact')}
                  className="px-4 py-2.5 rounded-xl bg-[#0B4F6C] hover:bg-[#08384D] text-white text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#1995AD]" />
                  <span>Open Location Guide</span>
                </button>

                <a
                  href={`tel:${HOSPITAL_CONTACT.phonePrimary}`}
                  className="px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-slate-50 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#0B4F6C]" />
                  <span>Call for Directions</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 11 — FREQUENTLY ASKED QUESTIONS ABOUT FACILITIES                  */}
      {/* ========================================================================= */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-8" aria-labelledby="facility-faqs-title">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF4F7] text-[#0B4F6C] text-xs font-semibold">
            <Info className="w-3.5 h-3.5 text-[#1995AD]" />
            <span>Attendant & Visitor Information</span>
          </div>
          <h2 id="facility-faqs-title" className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Frequently Asked Questions Regarding Facilities
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Helpful answers to common questions about visiting hours, room choices, sanitation, and overnight attendant rules.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {facilityFaqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;

            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs transition-colors"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-bold text-slate-900 leading-snug">
                    {faq.q}
                  </span>
                  <span className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-600">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 12 — FINAL CALL TO ACTION (CTA) BANNER                             */}
      {/* ========================================================================= */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="bg-[#0B4F6C] text-white rounded-3xl p-8 sm:p-12 shadow-sm text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-cyan-200 text-xs font-semibold">
            <Building2 className="w-3.5 h-3.5 text-cyan-300" />
            <span>Serving Dhanbad with Care & Dignity</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
            Experience Quality Healthcare at Sarphi Hospital
          </h2>

          <p className="text-xs sm:text-base text-slate-200 max-w-xl mx-auto leading-relaxed">
            Whether you require an outpatient doctor consultation, routine laboratory tests, or emergency care, our clinical teams at Memco More are ready to support your family 24×7.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onOpenAppointmentModal()}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-[#0B4F6C] font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
            >
              <Calendar className="w-4 h-4 text-[#0B4F6C]" />
              <span>Book Doctor Appointment</span>
            </button>

            <a
              href={`tel:${HOSPITAL_CONTACT.phonePrimary}`}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/15 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Phone className="w-4 h-4 text-cyan-300" />
              <span>Call Reception: {HOSPITAL_CONTACT.phonePrimary}</span>
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 13 — COMPACT DIRECT CONTACT STRIP                                 */}
      {/* ========================================================================= */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-rose-50 border border-rose-200/80 rounded-2xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-rose-800 uppercase tracking-wider block">24×7 Emergency Casualty</span>
              <a href={`tel:${HOSPITAL_CONTACT.phoneEmergency}`} className="text-base font-bold text-rose-950 hover:underline">
                {HOSPITAL_CONTACT.phoneEmergency}
              </a>
              <span className="text-[11px] text-rose-700 block">Direct Trauma Hotline</span>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#0B4F6C] text-white flex items-center justify-center shrink-0 shadow-xs">
              <Phone className="w-6 h-6 text-cyan-200" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-[#0B4F6C] uppercase tracking-wider block">OPD & Reception Desk</span>
              <a href={`tel:${HOSPITAL_CONTACT.phonePrimary}`} className="text-base font-bold text-slate-900 hover:underline">
                {HOSPITAL_CONTACT.phonePrimary}
              </a>
              <span className="text-[11px] text-slate-500 block">Mon - Sat: 08:00 AM – 08:30 PM</span>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#1995AD] text-white flex items-center justify-center shrink-0 shadow-xs">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-[#0B4F6C] uppercase tracking-wider block">Hospital Location</span>
              <p className="text-xs font-bold text-slate-900 leading-snug">
                Memco More Chowk, Dhanbad
              </p>
              <button 
                onClick={() => onNavigate('contact')}
                className="text-[11px] text-[#0B4F6C] font-semibold hover:underline cursor-pointer"
              >
                View Directions & Transport Guide →
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
