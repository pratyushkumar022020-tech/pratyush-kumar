import React, { useState } from 'react';
import { 
  Heart, Activity, Stethoscope, Microscope, ShieldCheck, 
  Calendar, Clock, CheckCircle2, ArrowRight, UserCheck, 
  Baby, ShieldAlert, Phone, Mail, MapPin, ChevronDown, 
  ChevronUp, Star, AlertCircle, Sparkles
} from 'lucide-react';
import { DOCTORS, HOSPITAL_CONTACT, TESTIMONIALS } from '../data/hospitalData';
import { Page, Doctor } from '../types';
import { ClinicalVisual } from '../components/VisualFallback';

interface ServicesPageProps {
  onNavigate: (page: Page) => void;
  onOpenAppointmentModal: (doctorId?: string, departmentId?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onNavigate,
  onOpenAppointmentModal,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All Services');
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>('serv-gen-med');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // SECTION 06 & 08: 8 Main Services
  const allServices = [
    {
      id: 'serv-gen-med',
      category: 'Medical Care',
      title: 'General Medicine',
      shortDesc: 'Professional medical consultation and care for common health concerns and medical conditions.',
      icon: <Activity className="w-6 h-6 text-[#1995AD]" />,
      overview: 'General medical consultation and healthcare support for common medical concerns, acute viral fevers, diabetes management, and chronic adult illnesses.',
      whoNeeds: 'Adults experiencing fevers, metabolic issues, respiratory symptoms, seasonal infections, or seeking preventive health checkups.',
      whatToExpect: 'Patients can discuss their health concerns with the appropriate medical professional and receive guidance based on their individual situation.',
      facilities: 'Dedicated step-down beds, continuous vital signs monitoring, and bedside glucometry.',
      ctaType: 'appointment',
      deptId: 'gen-med'
    },
    {
      id: 'serv-emergency',
      category: 'Emergency Care',
      title: 'Emergency Care',
      shortDesc: 'Medical assistance for urgent healthcare needs.',
      icon: <ShieldAlert className="w-6 h-6 text-rose-500" />,
      overview: 'Healthcare support for urgent medical situations, subject to the hospital\'s emergency facilities and availability.',
      whoNeeds: 'Acute road accident trauma, sudden acute respiratory distress, severe chest discomfort, or urgent medical conditions requiring prompt triage.',
      whatToExpect: 'Immediate triage by on-duty medical officers, primary stabilization, and urgent diagnostics.',
      facilities: 'Direct ground floor ambulance bay, emergency resuscitation beds, crash cart, and cardiac monitor.',
      ctaType: 'emergency',
      deptId: 'emergency-care'
    },
    {
      id: 'serv-diagnostic',
      category: 'Diagnostics',
      title: 'Diagnostic Services',
      shortDesc: 'Diagnostic support to assist healthcare professionals in evaluating patient needs.',
      icon: <Activity className="w-6 h-6 text-[#1995AD]" />,
      overview: 'Diagnostic services may assist healthcare professionals in evaluating a patient\'s condition accurately and rapidly.',
      whoNeeds: 'Patients prescribed digital radiography for chest or skeletal imaging, or requiring computerized electrocardiograms (ECG).',
      whatToExpect: 'Prompt imaging by trained radiographers with clear digital outputs provided for doctor consultation.',
      facilities: 'High-frequency digital X-Ray suite and multi-channel computerized 12-lead ECG unit.',
      ctaType: 'contact',
      deptId: 'diagnostic-services'
    },
    {
      id: 'serv-laboratory',
      category: 'Diagnostics',
      title: 'Laboratory Services',
      shortDesc: 'Laboratory testing and diagnostic support, subject to availability.',
      icon: <Microscope className="w-6 h-6 text-[#1995AD]" />,
      overview: 'Quality-calibrated clinical pathology and automated biochemistry testing to support clinical evaluation.',
      whoNeeds: 'Patients requiring routine blood panels (CBC, blood sugar, liver and kidney parameters) or infection screenings.',
      whatToExpect: 'Hygienic sample collection, automated barcoded processing, and computerized report delivery.',
      facilities: 'Automated 5-part hematology analyzer, biochemistry testing equipment, and cold-chain sample storage.',
      ctaType: 'contact',
      deptId: 'laboratory'
    },
    {
      id: 'serv-surgical',
      category: 'Surgical Care',
      title: 'Surgical Services',
      shortDesc: 'Surgical care and related medical support, based on hospital facilities and specialist availability.',
      icon: <Activity className="w-6 h-6 text-[#1995AD]" />,
      overview: 'Surgical services and related care provided according to available facilities, specialists and medical assessment.',
      whoNeeds: 'Patients requiring general and laparoscopic keyhole procedures such as gallbladder stone removal, hernia repairs, or emergency appendectomy.',
      whatToExpect: 'Pre-anesthetic evaluation, procedure in sterile modular operating theatres, and recovery under attentive nursing care.',
      facilities: 'Laminar airflow positive-pressure modular OTs, laparoscopy video towers, and post-anesthesia care recovery beds.',
      ctaType: 'appointment',
      deptId: 'surgical-services'
    },
    {
      id: 'serv-maternity',
      category: 'Specialist Care',
      title: 'Maternity Care',
      shortDesc: 'Healthcare support for maternity and related needs, subject to available facilities and specialists.',
      icon: <Baby className="w-6 h-6 text-[#1995AD]" />,
      overview: 'Compassionate maternal healthcare dedicated to safe childbearing, antenatal wellness, and women\'s health.',
      whoNeeds: 'Expectant mothers seeking routine antenatal checkups, safe delivery planning, or women requiring gynecological evaluation.',
      whatToExpect: 'Attentive obstetric consultations, fetal heart Doppler monitoring, safe labor facilities, and newborn pediatric checkup.',
      facilities: 'Clean labor rooms, fetal monitoring Doppler, maternal high-dependency beds, and neonatal warmers.',
      ctaType: 'appointment',
      deptId: 'maternity-care'
    },
    {
      id: 'serv-pharmacy',
      category: 'Other Services',
      title: 'Pharmacy',
      shortDesc: 'Medication and pharmacy support, subject to hospital availability.',
      icon: <ShieldCheck className="w-6 h-6 text-[#1995AD]" />,
      overview: 'In-house dispensary providing genuine, temperature-controlled medicines and consumables within hospital premises.',
      whoNeeds: 'Inpatients, OPD visitors, and emergency attendants requiring immediate access to prescribed pharmaceuticals.',
      whatToExpect: 'Prompt medicine dispensing by a registered pharmacist with transparent computerized billing receipts.',
      facilities: 'Ground-floor 24×7 medicine counter with cold-chain refrigeration for insulin and vaccines.',
      ctaType: 'contact',
      deptId: 'pharmacy'
    },
    {
      id: 'serv-specialist',
      category: 'Specialist Care',
      title: 'Specialist Consultation',
      shortDesc: 'Consultation with available medical specialists based on appointment and availability.',
      icon: <UserCheck className="w-6 h-6 text-[#1995AD]" />,
      overview: 'Dedicated outpatient department chambers where patients can discuss health concerns with qualified specialists.',
      whoNeeds: 'Individuals and families seeking specialized diagnosis in Orthopaedics, Paediatrics, Surgery, or Internal Medicine.',
      whatToExpect: 'Detailed clinical review, discussion of symptoms, and structured treatment prescriptions.',
      facilities: 'Private OPD consultation chambers, token registration queue system, and wheelchair accessibility.',
      ctaType: 'appointment',
      deptId: 'specialist-consultation'
    }
  ];

  // Category filter list (Section 05)
  const categories = [
    'All Services',
    'Medical Care',
    'Emergency Care',
    'Diagnostics',
    'Surgical Care',
    'Specialist Care',
    'Other Services'
  ];

  const filteredServices = activeCategory === 'All Services'
    ? allServices
    : allServices.filter(s => s.category === activeCategory);

  // Section 12: Service-Related FAQs
  const serviceFaqs = [
    {
      q: 'What healthcare services are available at Sarphi Hospital?',
      a: 'Please refer to the current service list on this page or contact Sarphi Hospital for the latest availability. Core services include General Medicine, Emergency Care, Diagnostic Services (Digital X-Ray & ECG), Laboratory Testing, Surgical Services, Maternity Care, Pharmacy, and Specialist Consultations.'
    },
    {
      q: 'Can I request an appointment online?',
      a: 'Yes. You can click "Book an Appointment" anywhere on this website to select your department, preferred doctor, and time slot. Our reception team will confirm your consultation voucher.'
    },
    {
      q: 'How can I find information about a particular service?',
      a: 'Select the relevant service in the directory above or scroll down to the "Explore Our Services" section for detailed overviews. You can also call our reception desk directly for personal guidance.'
    },
    {
      q: 'Are all services available every day?',
      a: 'Emergency casualty, inpatient care, diagnostic testing, and the in-house pharmacy operate 24 hours daily. Specialist OPD consultation timings vary by department and doctor schedule. Please contact the hospital before visiting for a specific specialist.'
    },
    {
      q: 'How can I contact the hospital?',
      a: `Sarphi Hospital can be contacted via phone at ${HOSPITAL_CONTACT.phonePrimary}, emergency helpline at ${HOSPITAL_CONTACT.phoneEmergency}, or email at ${HOSPITAL_CONTACT.email}. In-person visits are welcomed at Memco More, Dhanbad.`
    },
    {
      q: 'What should I do in an emergency?',
      a: `For an acute medical emergency, contact the hospital directly at ${HOSPITAL_CONTACT.phoneEmergency} or arrive at our Ground Floor Emergency Casualty Bay at Memco More Chowk immediately. Emergency staff is on duty 24×7.`
    }
  ];

  const handleLearnMoreClick = (serviceId: string) => {
    setExpandedServiceId(serviceId);
    const detailEl = document.getElementById('detailed-services-section');
    if (detailEl) {
      detailEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-16 md:space-y-24 pb-16">
      {/* ========================================================================= */}
      {/* SECTION 03 — SERVICES HERO                                                */}
      {/* ========================================================================= */}
      <section className="pt-6 md:pt-10" aria-labelledby="services-hero-title">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6" aria-label="Breadcrumb">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-[#0B4F6C] hover:underline cursor-pointer"
            >
              Home
            </button>
            <span aria-hidden="true">→</span>
            <span className="font-semibold text-[#0B4F6C]">Services</span>
          </nav>

          <div className="bg-[#F0F7F9] rounded-2xl border border-slate-200/80 p-8 sm:p-12 md:p-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0B4F6C] block">
                  OUR HEALTHCARE SERVICES
                </span>

                <h1 
                  id="services-hero-title"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-tight"
                >
                  Healthcare Services Designed Around Patient Needs
                </h1>

                <p className="text-base sm:text-lg text-slate-600 leading-relaxed text-pretty">
                  Explore the healthcare services available at Sarphi Hospital and find the information you need for your healthcare journey.
                </p>

                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    onClick={() => onOpenAppointmentModal()}
                    className="px-6 py-3 rounded-xl bg-[#0B4F6C] hover:bg-[#08384D] active:scale-[0.98] text-white text-sm font-semibold transition-all shadow-sm flex items-center gap-2 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4 text-[#1995AD]" />
                    <span>Book an Appointment</span>
                  </button>

                  <button
                    onClick={() => onNavigate('contact')}
                    className="px-5 py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span>Contact Hospital</span>
                  </button>
                </div>
              </div>

              {/* Right: Hospital image visual */}
              <div className="lg:col-span-5">
                <ClinicalVisual
                  type="ot"
                  className="h-72 sm:h-80 w-full rounded-2xl shadow-md border border-slate-200"
                  title="Sarphi Hospital Medical & Surgical Suites"
                  badge="Comprehensive Care"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 04 — QUICK SERVICE INTRODUCTION                                   */}
      {/* ========================================================================= */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 text-center" aria-labelledby="intro-heading">
        <div className="max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0B4F6C] block">
            CARE & SUPPORT
          </span>
          <h2 id="intro-heading" className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Healthcare Services Under One Roof
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Sarphi Hospital aims to provide patients and families with accessible healthcare support through a professional and patient-focused environment.
          </p>
          <p className="text-xs text-slate-500 italic pt-1">
            * Service availability may vary. Please contact the hospital for the latest information.
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 05 — SERVICE CATEGORY FILTER                                      */}
      {/* ========================================================================= */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6" aria-label="Service Categories">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#0B4F6C] text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 06 — MAIN SERVICES GRID                                           */}
      {/* ========================================================================= */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6" aria-label="Available Services Grid">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md hover:border-[#1995AD] transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#EBF4F7] flex items-center justify-center group-hover:bg-[#0B4F6C] transition-colors">
                  {service.icon}
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-[#0B4F6C] uppercase tracking-wider block">
                    {service.category}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0B4F6C] transition-colors leading-snug">
                    {service.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {service.shortDesc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => handleLearnMoreClick(service.id)}
                  className="text-xs font-bold text-[#0B4F6C] hover:text-[#08384D] flex items-center gap-1 cursor-pointer"
                >
                  <span>Learn More</span>
                  <span aria-hidden="true">→</span>
                </button>

                <button
                  onClick={() => onOpenAppointmentModal(undefined, service.deptId)}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-900 cursor-pointer"
                >
                  Book OPD
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 07 — FEATURED SERVICE                                             */}
      {/* ========================================================================= */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6" aria-labelledby="featured-service-heading">
        <div className="bg-[#F8FBFC] rounded-2xl border border-slate-200/80 p-8 sm:p-12 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Large professional healthcare image */}
            <div className="lg:col-span-6">
              <ClinicalVisual
                type="consultation"
                className="h-80 sm:h-96 w-full rounded-2xl shadow-sm border border-slate-200"
                title="Professional Doctor & Patient Consultation"
                badge="Patient-Focused Care"
              />
            </div>

            {/* Right: Content */}
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0B4F6C] block">
                FEATURED HEALTHCARE SERVICE
              </span>

              <h2 id="featured-service-heading" className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
                Professional Care With a Patient-Focused Approach
              </h2>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Healthcare services should be easy to understand and accessible to patients and their families. Sarphi Hospital's service approach is designed around clear communication, professional support and patient needs.
              </p>

              {/* 3 Small Points */}
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-[#1995AD] shrink-0" />
                  <span>Patient-Focused Support</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-[#1995AD] shrink-0" />
                  <span>Professional Medical Environment</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-[#1995AD] shrink-0" />
                  <span>Clear Communication</span>
                </div>
              </div>

              <div className="pt-3">
                <button
                  onClick={() => onNavigate('contact')}
                  className="px-6 py-3 rounded-xl bg-[#0B4F6C] hover:bg-[#08384D] active:scale-[0.98] text-white text-sm font-semibold transition-all inline-flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>Contact Hospital</span>
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 08 — SERVICE DETAIL SECTIONS (ACCORDION / DETAILS)                 */}
      {/* ========================================================================= */}
      <section 
        id="detailed-services-section" 
        className="max-w-[1200px] mx-auto px-4 sm:px-6" 
        aria-labelledby="detailed-services-heading"
      >
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0B4F6C]">
            SERVICE OVERVIEW & GUIDELINES
          </span>
          <h2 id="detailed-services-heading" className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Explore Our Services
          </h2>
          <p className="text-slate-600 text-sm">
            Click on any service to view what to expect, available facilities, and how to request care.
          </p>
        </div>

        <div className="space-y-4 max-w-4xl mx-auto">
          {allServices.map((service) => {
            const isExpanded = expandedServiceId === service.id;

            return (
              <div
                key={service.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs transition-all"
              >
                <button
                  onClick={() => setExpandedServiceId(isExpanded ? null : service.id)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors cursor-pointer"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#EBF4F7] flex items-center justify-center shrink-0">
                      {service.icon}
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-[#0B4F6C] uppercase tracking-wider block">
                        {service.category}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-[#0B4F6C] shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>

                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 border-t border-slate-100 bg-slate-50/50 space-y-4 animate-in fade-in duration-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                      <div className="space-y-1.5">
                        <strong className="text-slate-900 font-semibold block uppercase tracking-wider text-[11px] text-[#0B4F6C]">
                          Overview
                        </strong>
                        <p className="text-slate-600 leading-relaxed">
                          {service.overview}
                        </p>
                      </div>

                      <div className="space-y-1.5">
                        <strong className="text-slate-900 font-semibold block uppercase tracking-wider text-[11px] text-[#0B4F6C]">
                          What to Expect
                        </strong>
                        <p className="text-slate-600 leading-relaxed">
                          {service.whatToExpect}
                        </p>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-600 space-y-1">
                      <strong className="text-slate-800 font-semibold block">
                        Available Facilities & Diagnostic Backing:
                      </strong>
                      <p>{service.facilities}</p>
                    </div>

                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      {service.ctaType === 'emergency' ? (
                        <a
                          href={`tel:${HOSPITAL_CONTACT.phoneEmergency}`}
                          className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs inline-flex items-center gap-2 shadow-xs transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>Emergency Helpline: {HOSPITAL_CONTACT.phoneEmergency}</span>
                        </a>
                      ) : (
                        <button
                          onClick={() => onOpenAppointmentModal(undefined, service.deptId)}
                          className="px-5 py-2.5 rounded-xl bg-[#0B4F6C] hover:bg-[#08384D] text-white font-semibold text-xs inline-flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
                        >
                          <Calendar className="w-3.5 h-3.5 text-[#1995AD]" />
                          <span>Request an Appointment →</span>
                        </button>
                      )}

                      <button
                        onClick={() => onNavigate('contact')}
                        className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-medium text-xs inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        <span>Contact Hospital Desk</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 09 — HOW TO ACCESS OUR SERVICES                                   */}
      {/* ========================================================================= */}
      <section className="bg-[#F8FBFC] py-16 md:py-20 border-y border-slate-200/80" aria-labelledby="how-it-works-heading">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B4F6C]">
              HOW IT WORKS
            </span>
            <h2 id="how-it-works-heading" className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight">
              Getting Healthcare Support Is Simple
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We make the process of consultation, diagnostic testing, and hospital visits transparent and straightforward.
            </p>
          </div>

          {/* 3-Step Process (Horizontal on Desktop, Vertical on Mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* STEP 01 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs text-center space-y-3 relative z-10">
              <div className="w-12 h-12 rounded-full bg-[#0B4F6C] text-white flex items-center justify-center font-bold text-base mx-auto shadow-sm">
                01
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Choose a Service
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Explore the available healthcare services and determine which department suits your symptoms or checkup needs.
              </p>
            </div>

            {/* STEP 02 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs text-center space-y-3 relative z-10">
              <div className="w-12 h-12 rounded-full bg-[#1995AD] text-white flex items-center justify-center font-bold text-base mx-auto shadow-sm">
                02
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Contact or Request an Appointment
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Connect with the hospital or submit an appointment request online or over the telephone.
              </p>
            </div>

            {/* STEP 03 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs text-center space-y-3 relative z-10">
              <div className="w-12 h-12 rounded-full bg-[#0B4F6C] text-white flex items-center justify-center font-bold text-base mx-auto shadow-sm">
                03
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Visit Sarphi Hospital
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Follow the hospital's appointment or consultation process at Memco More Chowk, Dhanbad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 10 — WHY CHOOSE OUR SERVICES                                      */}
      {/* ========================================================================= */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6" aria-labelledby="why-services-heading">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0B4F6C]">
            OUR STANDARDS
          </span>
          <h2 id="why-services-heading" className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Why Choose Our Services
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Reliable, patient-focused healthcare support in Dhanbad with clear ethical principles.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 01: Patient-Focused Approach */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-[#1995AD] transition-all space-y-2.5">
            <span className="text-xs font-mono font-bold text-slate-400">01</span>
            <h3 className="text-base font-bold text-slate-900 leading-snug">
              Patient-Focused Approach
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Healthcare information and support designed around patient needs and dignity.
            </p>
          </div>

          {/* 02: Professional Environment */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-[#1995AD] transition-all space-y-2.5">
            <span className="text-xs font-mono font-bold text-slate-400">02</span>
            <h3 className="text-base font-bold text-slate-900 leading-snug">
              Professional Environment
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              A structured and professional healthcare setting with disciplined hygiene.
            </p>
          </div>

          {/* 03: Accessible Location */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-[#1995AD] transition-all space-y-2.5">
            <span className="text-xs font-mono font-bold text-slate-400">03</span>
            <h3 className="text-base font-bold text-slate-900 leading-snug">
              Accessible Location
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Conveniently located at Memco More Chowk on the GT Road bypass in Dhanbad.
            </p>
          </div>

          {/* 04: Clear Communication */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-[#1995AD] transition-all space-y-2.5">
            <span className="text-xs font-mono font-bold text-slate-400">04</span>
            <h3 className="text-base font-bold text-slate-900 leading-snug">
              Clear Communication
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Easy access to service details, investigation timelines, and appointment information.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 11 — DOCTORS & SPECIALISTS PREVIEW                                */}
      {/* ========================================================================= */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6" aria-labelledby="specialists-preview-heading">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B4F6C]">
              MEDICAL TEAM
            </span>
            <h2 id="specialists-preview-heading" className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight">
              Find the Right Medical Professional
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-xl">
              Explore the doctors and specialists associated with Sarphi Hospital.
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DOCTORS.slice(0, 3).map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-[#1995AD] transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
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
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  onClick={() => onNavigate('doctors')}
                  className="w-1/2 py-2 px-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold text-center cursor-pointer transition-colors"
                >
                  View Profile →
                </button>
                <button
                  onClick={() => onOpenAppointmentModal(doc.id, doc.departmentId)}
                  className="w-1/2 py-2 px-3 rounded-xl bg-[#0B4F6C] hover:bg-[#08384D] text-white text-xs font-semibold text-center cursor-pointer shadow-xs transition-colors"
                >
                  Book OPD
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 12 — SERVICE-RELATED FAQ                                          */}
      {/* ========================================================================= */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6" aria-labelledby="service-faq-heading">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0B4F6C]">
            SERVICE FAQ
          </span>
          <h2 id="service-faq-heading" className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm">
            Answers to common questions regarding our healthcare services, timings, and appointments.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {serviceFaqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;

            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full px-5 py-4 text-left font-bold text-sm sm:text-base text-slate-900 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-[#0B4F6C] shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
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
      {/* SECTION 13 — GALLERY PREVIEW                                              */}
      {/* ========================================================================= */}
      <section className="bg-slate-50 py-16 border-y border-slate-200" aria-labelledby="environment-gallery-heading">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B4F6C]">
              HOSPITAL ENVIRONMENT
            </span>
            <h2 id="environment-gallery-heading" className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight">
              Explore Our Healthcare Environment
            </h2>
            <p className="text-slate-600 text-sm">
              Take a visual tour of our clean treatment suites, reception, and care areas at Memco More.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ClinicalVisual type="building" className="h-44 sm:h-52 w-full rounded-2xl" title="Hospital Exterior" badge="Memco More" />
            <ClinicalVisual type="lobby" className="h-44 sm:h-52 w-full rounded-2xl" title="Reception & Desk" badge="Ground Floor" />
            <ClinicalVisual type="ot" className="h-44 sm:h-52 w-full rounded-2xl" title="Modular OT" badge="Sterile Airflow" />
            <ClinicalVisual type="icu" className="h-44 sm:h-52 w-full rounded-2xl" title="ICU & Telemetry" badge="24×7 Critical" />
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => onNavigate('gallery')}
              className="px-7 py-3 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 text-sm font-semibold inline-flex items-center gap-2 cursor-pointer shadow-xs transition-all"
            >
              <span>View Gallery</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 14 — PATIENT EXPERIENCE                                           */}
      {/* ========================================================================= */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6" aria-labelledby="patient-experience-heading">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0B4F6C]">
            PATIENT EXPERIENCE
          </span>
          <h2 id="patient-experience-heading" className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Hear From Our Patients
          </h2>
          <p className="text-slate-600 text-sm">
            Real feedback from patients and families who accessed our healthcare services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-3">
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
      {/* SECTION 15 — FINAL APPOINTMENT CTA                                        */}
      {/* ========================================================================= */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6" aria-labelledby="services-final-cta-heading">
        <div className="bg-[#0B4F6C] text-white rounded-2xl p-8 sm:p-12 text-center shadow-lg relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-5">
            <h2 id="services-final-cta-heading" className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Need Help Finding the Right Service?
            </h2>

            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              Contact Sarphi Hospital and our team can guide you with available services, appointments and general enquiries.
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
      {/* SECTION 16 — CONTACT INFORMATION STRIP                                    */}
      {/* ========================================================================= */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6" aria-label="Hospital Contact Details">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Location */}
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
                  <span>Contact Us</span>
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>

            {/* Phone */}
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

            {/* Email */}
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
