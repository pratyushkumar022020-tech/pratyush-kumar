import React, { useState } from 'react';
import { 
  Stethoscope, Calendar, Clock, MapPin, Search, Filter, CheckCircle2, 
  ArrowRight, Phone, Mail, Award, UserCheck, ShieldCheck, Heart, 
  Baby, Activity, Microscope, ChevronDown, ChevronUp, Star, X
} from 'lucide-react';
import { DOCTORS, DEPARTMENTS, HOSPITAL_CONTACT, TESTIMONIALS } from '../data/hospitalData';
import { Page, Doctor } from '../types';
import { ClinicalVisual } from '../components/VisualFallback';

interface DoctorsPageProps {
  onNavigate: (page: Page) => void;
  onOpenAppointmentModal: (doctorId?: string, departmentId?: string) => void;
}

export const DoctorsPage: React.FC<DoctorsPageProps> = ({
  onNavigate,
  onOpenAppointmentModal,
}) => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProfileDoctor, setActiveProfileDoctor] = useState<Doctor | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // SECTION 05: Specialty Filter Options
  const filterOptions = [
    'All',
    'General Medicine',
    'Surgery',
    'Women’s Health',
    'Diagnostics',
    'Specialist Care',
    'Other Specialties'
  ];

  const matchesCategory = (doc: Doctor, filter: string) => {
    if (filter === 'All') return true;
    if (filter === 'General Medicine') return doc.departmentId === 'gen-med';
    if (filter === 'Surgery') return doc.departmentId === 'surgery' || doc.departmentId === 'surgical-services';
    if (filter === 'Women’s Health') return doc.departmentId === 'gynae' || doc.departmentId === 'maternity-care';
    if (filter === 'Diagnostics') return doc.departmentId === 'diagnostics' || doc.departmentId === 'laboratory' || doc.departmentId === 'diagnostic-services';
    if (filter === 'Specialist Care') return ['ortho', 'paediatrics', 'critical-care', 'specialist-consultation'].includes(doc.departmentId);
    if (filter === 'Other Specialties') return !['gen-med', 'surgery', 'surgical-services', 'gynae', 'maternity-care', 'diagnostics', 'laboratory'].includes(doc.departmentId);
    return true;
  };

  const filteredDoctors = DOCTORS.filter((doc) => {
    const matchesSearch = 
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.departmentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specializations.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const inCategory = matchesCategory(doc, selectedFilter);
    return matchesSearch && inCategory;
  });

  // Featured Doctor (Dr. R. K. Choudhary, Senior Consultant Physician)
  const featuredDoctor = DOCTORS[0];

  // SECTION 12: Doctor-Related FAQs
  const doctorFaqs = [
    {
      q: 'How can I find a doctor at Sarphi Hospital?',
      a: 'Browse the doctor directory on this page using the specialty filter tabs or search input, or call our reception desk directly at +91 80022 34567 for assistance with finding the right department.'
    },
    {
      q: 'Can I book an appointment with a specific doctor?',
      a: 'Yes. Appointment availability depends on the doctor\'s verified consultation schedule. You can select the specific doctor while booking through our online appointment form or requesting by phone.'
    },
    {
      q: 'How can I know a doctor\'s specialization?',
      a: 'Each doctor profile in our directory transparently displays their formal medical qualifications (MBBS, MD, MS, DNB), clinical focus areas, and chamber room allocations.'
    },
    {
      q: 'Are doctor consultation timings fixed?',
      a: 'Doctor availability and consultation schedules may vary based on surgical cases and emergency duties. Please confirm the current day\'s schedule with the hospital reception desk before visiting.'
    },
    {
      q: 'Can I request an appointment online?',
      a: 'Yes. Simply click "Book an Appointment", choose the relevant department or doctor, select your preferred date and time slot, and submit the form to receive your OPD token reference.'
    },
    {
      q: 'What should I do if I am unsure which specialist I need?',
      a: 'Contact Sarphi Hospital reception at +91 80022 34567 or visit our Ground Floor desk. Our healthcare team will listen to your symptoms and guide you to the appropriate medical department.'
    }
  ];

  return (
    <div className="space-y-16 md:space-y-24 pb-16">
      {/* ========================================================================= */}
      {/* SECTION 03 — PAGE HERO                                                    */}
      {/* ========================================================================= */}
      <section className="pt-6 md:pt-10" aria-labelledby="doctors-hero-title">
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
            <span className="font-semibold text-[#0B4F6C]">Doctors & Specialists</span>
          </nav>

          <div className="bg-[#F0F7F9] rounded-2xl border border-slate-200/80 p-8 sm:p-12 md:p-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0B4F6C] block">
                  OUR MEDICAL TEAM
                </span>

                <h1 
                  id="doctors-hero-title"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-tight"
                >
                  Doctors & Specialists
                </h1>

                <p className="text-base sm:text-lg text-slate-600 leading-relaxed text-pretty">
                  Meet the healthcare professionals associated with Sarphi Hospital and explore their areas of medical expertise.
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

              {/* Hero Visual */}
              <div className="lg:col-span-5">
                <ClinicalVisual
                  type="consultation"
                  className="h-72 sm:h-80 w-full rounded-2xl shadow-md border border-slate-200"
                  title="Sarphi Hospital Medical Team"
                  badge="Qualified Clinicians"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 04 — INTRODUCTION                                                 */}
      {/* ========================================================================= */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 text-center" aria-labelledby="intro-heading">
        <div className="max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0B4F6C] block">
            OUR MEDICAL TEAM
          </span>
          <h2 id="intro-heading" className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Professional Healthcare, Centered Around Patients
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Sarphi Hospital brings together healthcare professionals across relevant medical specialties to support patients and families with professional medical care and guidance.
          </p>
          <p className="text-xs text-slate-500 italic pt-1">
            * Doctor availability and consultation schedules may vary. Please contact the hospital for current information.
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 05 — SPECIALTY FILTER & SEARCH                                    */}
      {/* ========================================================================= */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6" aria-label="Find a Doctor Filter">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-lg font-bold text-slate-900">
              Find a Doctor
            </h2>

            {/* Quick search input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search by name or symptom..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white focus:ring-2 focus:ring-[#0B4F6C] outline-hidden"
              />
            </div>
          </div>

          {/* Filter options tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {filterOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => setSelectedFilter(opt)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedFilter === opt
                    ? 'bg-[#0B4F6C] text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          <div className="text-xs text-slate-500 flex items-center justify-between">
            <span>Showing {filteredDoctors.length} available specialist profiles</span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-[#0B4F6C] hover:underline font-semibold cursor-pointer"
              >
                Clear Search
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 06 — DOCTOR DIRECTORY GRID                                        */}
      {/* ========================================================================= */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6" aria-label="Doctor Directory Grid">
        {filteredDoctors.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
            <Stethoscope className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">No Specialists Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              No doctors matched your current filter criteria. Please select another category or reset your search.
            </p>
            <button
              onClick={() => { setSelectedFilter('All'); setSearchQuery(''); }}
              className="px-4 py-2 rounded-xl bg-[#0B4F6C] text-white text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-[#1995AD] transition-all flex flex-col justify-between overflow-hidden group"
              >
                <div className="p-6 space-y-4">
                  {/* Card Top: Photograph / Emblem */}
                  <div className="flex items-start justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-[#EBF4F7] text-[#0B4F6C] flex items-center justify-center font-bold text-xl border border-slate-200 group-hover:bg-[#0B4F6C] group-hover:text-white transition-colors">
                      <Stethoscope className="w-7 h-7 text-[#1995AD] group-hover:text-white" />
                    </div>
                    <span className="text-[11px] font-semibold text-[#0B4F6C] bg-[#EBF4F7] px-2.5 py-1 rounded-md">
                      {doc.departmentName}
                    </span>
                  </div>

                  {/* Card Middle: Name, Specialization, Qualification, Experience */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-[#0B4F6C] transition-colors">
                      {doc.name}
                    </h3>
                    <p className="text-xs font-medium text-slate-600 mt-0.5">
                      {doc.title}
                    </p>
                    <p className="text-[11px] font-mono text-[#0B4F6C] mt-1 font-semibold">
                      {doc.qualifications}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {doc.bio}
                  </p>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                    <p className="text-slate-700">
                      <strong>Experience:</strong> {doc.experience}
                    </p>
                    <p className="text-slate-500 text-[11px]">
                      <strong>Location:</strong> {doc.roomNumber}
                    </p>
                  </div>
                </div>

                {/* Card Bottom CTAs */}
                <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setActiveProfileDoctor(doc)}
                    className="w-1/2 py-2 px-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold text-center cursor-pointer transition-colors"
                  >
                    View Profile →
                  </button>
                  <button
                    onClick={() => onOpenAppointmentModal(doc.id, doc.departmentId)}
                    className="w-1/2 py-2 px-3 rounded-xl bg-[#0B4F6C] hover:bg-[#08384D] text-white text-xs font-semibold text-center cursor-pointer shadow-xs transition-colors"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ========================================================================= */}
      {/* SECTION 07 — FEATURED DOCTOR                                              */}
      {/* ========================================================================= */}
      {featuredDoctor && (
        <section className="max-w-[1200px] mx-auto px-4 sm:px-6" aria-labelledby="featured-doctor-heading">
          <div className="bg-[#F8FBFC] rounded-2xl border border-slate-200/80 p-8 sm:p-12 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left: Large professional doctor photograph */}
              <div className="lg:col-span-5">
                <ClinicalVisual
                  type="consultation"
                  className="h-80 sm:h-96 w-full rounded-2xl shadow-sm border border-slate-200"
                  title="Senior Clinical Consultant"
                  badge="Featured Specialist"
                />
              </div>

              {/* Right: Details */}
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0B4F6C] block">
                  FEATURED SPECIALIST
                </span>

                <h2 id="featured-doctor-heading" className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
                  {featuredDoctor.name}
                </h2>

                <div className="space-y-1">
                  <p className="text-sm font-semibold text-slate-800">
                    Specialization: {featuredDoctor.departmentName}
                  </p>
                  <p className="text-xs font-mono text-[#0B4F6C] font-semibold">
                    Qualification: {featuredDoctor.qualifications}
                  </p>
                  <p className="text-xs text-slate-600">
                    Experience: {featuredDoctor.experience}
                  </p>
                </div>

                <p className="text-sm text-slate-700 leading-relaxed">
                  {featuredDoctor.bio}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setActiveProfileDoctor(featuredDoctor)}
                    className="px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold cursor-pointer transition-colors"
                  >
                    View Full Profile →
                  </button>

                  <button
                    onClick={() => onOpenAppointmentModal(featuredDoctor.id, featuredDoctor.departmentId)}
                    className="px-5 py-2.5 rounded-xl bg-[#0B4F6C] hover:bg-[#08384D] text-white text-xs font-semibold cursor-pointer shadow-xs transition-colors"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION 08 — DOCTOR PROFILE DETAIL MODAL                                   */}
      {/* ========================================================================= */}
      {activeProfileDoctor && (
        <div 
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="profile-modal-title"
        >
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-[#0B4F6C] text-white p-6 flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
                  <Stethoscope className="w-7 h-7 text-[#1995AD]" />
                </div>
                <div>
                  <h3 id="profile-modal-title" className="text-xl font-bold text-white">
                    {activeProfileDoctor.name}
                  </h3>
                  <p className="text-xs text-cyan-200">
                    {activeProfileDoctor.title} · {activeProfileDoctor.departmentName}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveProfileDoctor(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-colors"
                aria-label="Close Profile"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 md:p-8 space-y-6 max-h-[75vh] overflow-y-auto text-xs sm:text-sm">
              {/* Professional Information */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B4F6C]">
                  Professional Information
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div>
                    <span className="text-slate-500 block text-xs">Qualification:</span>
                    <strong className="text-slate-900">{activeProfileDoctor.qualifications}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-xs">Experience:</span>
                    <strong className="text-slate-900">{activeProfileDoctor.experience}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-xs">Specialization:</span>
                    <strong className="text-slate-900">{activeProfileDoctor.departmentName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-xs">Chamber:</span>
                    <strong className="text-slate-900">{activeProfileDoctor.roomNumber}</strong>
                  </div>
                </div>
              </div>

              {/* About the Doctor */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B4F6C]">
                  About the Doctor
                </h4>
                <p className="text-slate-600 leading-relaxed bg-white">
                  {activeProfileDoctor.bio}
                </p>
              </div>

              {/* Areas of Interest */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B4F6C]">
                  Areas of Clinical Expertise
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeProfileDoctor.specializations.map((spec, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-800">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1995AD] shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Consultation Information */}
              <div className="p-4 rounded-xl bg-[#EBF4F7] border border-[#1995AD]/30 space-y-2 text-xs">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B4F6C]">
                  Consultation Information
                </h4>
                <div className="space-y-1 text-slate-700">
                  <p><strong>Days:</strong> {activeProfileDoctor.opdDays}</p>
                  <p><strong>Timing:</strong> {activeProfileDoctor.opdTimings}</p>
                  <p><strong>Location:</strong> Sarphi Hospital, Memco More, Dhanbad</p>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => {
                    const doc = activeProfileDoctor;
                    setActiveProfileDoctor(null);
                    onOpenAppointmentModal(doc.id, doc.departmentId);
                  }}
                  className="w-full sm:w-1/2 py-2.5 px-4 rounded-xl bg-[#0B4F6C] hover:bg-[#08384D] text-white font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <Calendar className="w-4 h-4 text-[#1995AD]" />
                  <span>Request an Appointment</span>
                </button>

                <a
                  href={`tel:${HOSPITAL_CONTACT.phonePrimary}`}
                  className="w-full sm:w-1/2 py-2.5 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span>Call Hospital: {HOSPITAL_CONTACT.phonePrimary}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 09 — DEPARTMENT / SPECIALTY OVERVIEW                              */}
      {/* ========================================================================= */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6" aria-labelledby="specialty-overview-heading">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0B4F6C]">
            MEDICAL SPECIALTIES
          </span>
          <h2 id="specialty-overview-heading" className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Explore Healthcare Specialties
          </h2>
          <p className="text-slate-600 text-sm">
            Clinical departments organized to provide focused secondary and tertiary care support.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-[#1995AD] transition-all space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#EBF4F7] text-[#0B4F6C] flex items-center justify-center">
                <Activity className="w-5 h-5 text-[#1995AD]" />
              </div>
              <h3 className="text-base font-bold text-slate-900">General Medicine</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Consultations for acute and chronic lifestyle illnesses, fevers, and diabetic care.
              </p>
            </div>
            <button
              onClick={() => setSelectedFilter('General Medicine')}
              className="text-xs font-bold text-[#0B4F6C] hover:underline flex items-center gap-1 cursor-pointer pt-2"
            >
              <span>View Doctors</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-[#1995AD] transition-all space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#EBF4F7] text-[#0B4F6C] flex items-center justify-center">
                <Activity className="w-5 h-5 text-[#1995AD]" />
              </div>
              <h3 className="text-base font-bold text-slate-900">General & Laparoscopic Surgery</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Minimally invasive keyhole procedures, hernia repair, and wound trauma management.
              </p>
            </div>
            <button
              onClick={() => setSelectedFilter('Surgery')}
              className="text-xs font-bold text-[#0B4F6C] hover:underline flex items-center gap-1 cursor-pointer pt-2"
            >
              <span>View Doctors</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-[#1995AD] transition-all space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#EBF4F7] text-[#0B4F6C] flex items-center justify-center">
                <Baby className="w-5 h-5 text-[#1995AD]" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Women’s Health & Maternity</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Antenatal counseling, safe normal and caesarean deliveries, and women’s wellness.
              </p>
            </div>
            <button
              onClick={() => setSelectedFilter('Women’s Health')}
              className="text-xs font-bold text-[#0B4F6C] hover:underline flex items-center gap-1 cursor-pointer pt-2"
            >
              <span>View Doctors</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-[#1995AD] transition-all space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#EBF4F7] text-[#0B4F6C] flex items-center justify-center">
                <Microscope className="w-5 h-5 text-[#1995AD]" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Diagnostic Care & Pathology</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Automated blood testing, biochemistry panels, digital X-Ray, and emergency stat reporting.
              </p>
            </div>
            <button
              onClick={() => setSelectedFilter('Diagnostics')}
              className="text-xs font-bold text-[#0B4F6C] hover:underline flex items-center gap-1 cursor-pointer pt-2"
            >
              <span>View Doctors</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-[#1995AD] transition-all space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#EBF4F7] text-[#0B4F6C] flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-[#1995AD]" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Orthopaedics & Trauma</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Fracture reduction, joint arthritis therapy, and emergency polytrauma care.
              </p>
            </div>
            <button
              onClick={() => setSelectedFilter('Specialist Care')}
              className="text-xs font-bold text-[#0B4F6C] hover:underline flex items-center gap-1 cursor-pointer pt-2"
            >
              <span>View Doctors</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-[#1995AD] transition-all space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#EBF4F7] text-[#0B4F6C] flex items-center justify-center">
                <Heart className="w-5 h-5 text-[#1995AD]" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Paediatrics & Child Health</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Newborn medical evaluations, childhood immunization, and infantile care.
              </p>
            </div>
            <button
              onClick={() => setSelectedFilter('Specialist Care')}
              className="text-xs font-bold text-[#0B4F6C] hover:underline flex items-center gap-1 cursor-pointer pt-2"
            >
              <span>View Doctors</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 10 — HOW TO REQUEST AN APPOINTMENT                                */}
      {/* ========================================================================= */}
      <section className="bg-[#F8FBFC] py-16 md:py-20 border-y border-slate-200/80" aria-labelledby="how-to-book-heading">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B4F6C]">
              APPOINTMENT PROCESS
            </span>
            <h2 id="how-to-book-heading" className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight">
              How to Request an Appointment
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Transparent, convenient steps to consult with our medical faculty.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#0B4F6C] text-white flex items-center justify-center font-bold text-base mx-auto shadow-sm">
                01
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Choose a Doctor
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Explore doctors and their specialties from our verified medical directory.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#1995AD] text-white flex items-center justify-center font-bold text-base mx-auto shadow-sm">
                02
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Contact the Hospital
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Call or submit an appointment request online specifying your preferred time slot.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#0B4F6C] text-white flex items-center justify-center font-bold text-base mx-auto shadow-sm">
                03
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Confirm Your Visit
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Follow the hospital's confirmed appointment instructions at Memco More Chowk.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 11 — APPOINTMENT CTA                                              */}
      {/* ========================================================================= */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6" aria-labelledby="need-help-heading">
        <div className="bg-[#EBF4F7] rounded-2xl border border-[#1995AD]/30 p-8 sm:p-12 text-center">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 id="need-help-heading" className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
              Need Help Choosing a Doctor?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Contact Sarphi Hospital and our team can help you with doctor availability, specialties and appointment information.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => onOpenAppointmentModal()}
                className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[#0B4F6C] hover:bg-[#08384D] text-white font-semibold text-sm shadow-xs transition-all cursor-pointer"
              >
                Book an Appointment
              </button>

              <a
                href={`tel:${HOSPITAL_CONTACT.phonePrimary}`}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-semibold text-sm transition-all"
              >
                Call Hospital: {HOSPITAL_CONTACT.phonePrimary}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 12 — DOCTOR-RELATED FAQ                                           */}
      {/* ========================================================================= */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6" aria-labelledby="doctor-faq-heading">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0B4F6C]">
            DOCTOR FAQ
          </span>
          <h2 id="doctor-faq-heading" className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm">
            Answers to common questions regarding doctor schedules, appointments, and consultations.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {doctorFaqs.map((faq, idx) => {
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
      {/* SECTION 13 — MEDICAL TEAM VISUAL                                          */}
      {/* ========================================================================= */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6" aria-label="Medical Team Visual">
        <div className="relative rounded-2xl overflow-hidden shadow-md">
          <ClinicalVisual
            type="consultation"
            className="h-64 sm:h-72 w-full"
            title="Sarphi Hospital Consultant Faculty"
            badge="Compassionate Healthcare"
          />
          <div className="absolute bottom-4 left-4 sm:left-6 bg-slate-900/80 backdrop-blur-xs text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border border-white/20">
            Professional Care. Patient-Focused Approach.
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 14 — PATIENT EXPERIENCE                                           */}
      {/* ========================================================================= */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6" aria-labelledby="experience-heading">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0B4F6C]">
            PATIENT EXPERIENCE
          </span>
          <h2 id="experience-heading" className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            What Patients Say
          </h2>
          <p className="text-slate-600 text-sm">
            Verified experiences from patients consulting our specialists at Memco More.
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
      {/* SECTION 15 — CONTACT INFORMATION                                          */}
      {/* ========================================================================= */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6" aria-label="Hospital Contact Cards">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* LOCATION */}
            <div className="space-y-1.5 border-b md:border-b-0 md:border-r border-slate-100 pb-4 md:pb-0 md:pr-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0B4F6C]">
                <MapPin className="w-4 h-4 text-[#1995AD]" />
                <span>LOCATION</span>
              </div>
              <p className="text-sm font-semibold text-slate-900 leading-snug">
                Sarphi Hospital
              </p>
              <p className="text-xs text-slate-500">
                Memco More, Dhanbad, Jharkhand, India
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

            {/* PHONE */}
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

            {/* EMAIL */}
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
                Inquiries & Appointment Support
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 16 — FINAL CTA                                                    */}
      {/* ========================================================================= */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6" aria-labelledby="final-team-cta-heading">
        <div className="bg-[#0B4F6C] text-white rounded-2xl p-8 sm:p-12 text-center shadow-lg relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-5">
            <h2 id="final-team-cta-heading" className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Connect With Our Medical Team
            </h2>

            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              For doctor availability, specialist information or appointment enquiries, contact Sarphi Hospital.
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
    </div>
  );
};
