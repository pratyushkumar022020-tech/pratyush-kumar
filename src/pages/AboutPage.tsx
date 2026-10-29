import React, { useState } from 'react';
import { 
  Heart, Users, MessageSquare, ShieldCheck, Award, Building2, 
  MapPin, Stethoscope, Calendar, ArrowRight, ChevronDown, ChevronUp, 
  Star, Phone, Mail, CheckCircle2, Sparkles, Activity, Microscope,
  Compass, Eye, Target, FileText, Clock
} from 'lucide-react';
import { Page, Doctor } from '../types';
import { ClinicalVisual } from '../components/VisualFallback';
import { HOSPITAL_CONTACT, DOCTORS, TESTIMONIALS } from '../data/hospitalData';

interface AboutPageProps {
  onNavigate: (page: Page) => void;
  onOpenAppointmentModal: (doctorId?: string, departmentId?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ 
  onNavigate, 
  onOpenAppointmentModal 
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // Section 08: Core Values data
  const coreValues = [
    {
      id: '01',
      title: 'Compassion',
      desc: 'Treat every patient with empathy, dignity and respect.',
      icon: <Heart className="w-5 h-5 text-[#1995AD]" />
    },
    {
      id: '02',
      title: 'Professionalism',
      desc: 'Maintain a responsible and professional approach to healthcare.',
      icon: <Award className="w-5 h-5 text-[#1995AD]" />
    },
    {
      id: '03',
      title: 'Patient Focus',
      desc: 'Keep patient needs and comfort at the center of care.',
      icon: <Users className="w-5 h-5 text-[#1995AD]" />
    },
    {
      id: '04',
      title: 'Integrity',
      desc: 'Communicate honestly and responsibly.',
      icon: <ShieldCheck className="w-5 h-5 text-[#1995AD]" />
    },
    {
      id: '05',
      title: 'Respect',
      desc: 'Respect every patient, family and attendant.',
      icon: <CheckCircle2 className="w-5 h-5 text-[#1995AD]" />
    },
    {
      id: '06',
      title: 'Responsibility',
      desc: 'Approach healthcare services with care and accountability.',
      icon: <Target className="w-5 h-5 text-[#1995AD]" />
    }
  ];

  // Section 09: Facilities data
  const hospitalFacilities = [
    {
      id: 'fac-1',
      title: 'Reception & Registration',
      desc: 'Spacious central reception area with clear token counters and dedicated attendant waiting seating.',
      icon: <Building2 className="w-6 h-6 text-[#1995AD]" />
    },
    {
      id: 'fac-2',
      title: 'Patient Care Areas',
      desc: 'Hygienic general and private inpatient rooms equipped with bedside call bells and sanitised washrooms.',
      icon: <Heart className="w-6 h-6 text-[#1995AD]" />
    },
    {
      id: 'fac-3',
      title: 'Diagnostic Facilities',
      desc: 'In-house digital radiography (X-Ray), computerized ECG machines, and rapid automated testing.',
      icon: <Microscope className="w-6 h-6 text-[#1995AD]" />
    },
    {
      id: 'fac-4',
      title: 'Treatment Areas',
      desc: 'Sterile modular operation theatre complex with HEPA positive pressure air and emergency casualty triage.',
      icon: <Activity className="w-6 h-6 text-[#1995AD]" />
    },
    {
      id: 'fac-5',
      title: 'Pharmacy',
      desc: '24×7 ground-floor pharmacy counter stocked with genuine medicines, surgical consumables, and pediatric drops.',
      icon: <ShieldCheck className="w-6 h-6 text-[#1995AD]" />
    },
    {
      id: 'fac-6',
      title: 'Other Hospital Facilities',
      desc: 'Direct ambulance drop bay at Memco More Chowk, 24×7 backup power generators, and cold-chain storage.',
      icon: <Sparkles className="w-6 h-6 text-[#1995AD]" />
    }
  ];

  // Section 15: About page FAQs
  const aboutFaqs = [
    {
      q: 'Where is Sarphi Hospital located?',
      a: 'Sarphi Hospital is located at Memco More, Near GT Road By-pass, Dhanbad, Jharkhand, Pin - 826004, India. The hospital is easily accessible by auto-rickshaw, e-rickshaw, or private vehicle directly from Dhanbad Railway Station, Bank More, and Steel Gate.',
      cta: null
    },
    {
      q: 'What healthcare services does Sarphi Hospital provide?',
      a: 'Sarphi Hospital provides General Medicine, Emergency Care, Diagnostic Services (Digital X-Ray & ECG), Laboratory Pathology, Surgical Services (Modular Laparoscopic OT), Maternity Care, 24×7 Pharmacy, and Specialist Outpatient Consultations.',
      cta: { label: 'Explore Services →', action: () => onNavigate('services') }
    },
    {
      q: 'How can I contact the hospital?',
      a: `You can reach our primary OPD and enquiry desk at ${HOSPITAL_CONTACT.phonePrimary}, our 24×7 emergency helpline at ${HOSPITAL_CONTACT.phoneEmergency}, or send an email to ${HOSPITAL_CONTACT.email}. In-person enquiries are welcome at our Ground Floor reception at Memco More.`,
      cta: null
    },
    {
      q: 'How can I request an appointment?',
      a: 'You can submit your OPD consultation request directly online by clicking the "Book an Appointment" button on this website, calling our hospital reception, or walking in to the registration counter during chamber hours.',
      cta: { label: 'Book an Appointment →', action: () => onOpenAppointmentModal() }
    },
    {
      q: 'Where can I find information about doctors?',
      a: 'A complete schedule of our specialist doctors including their degrees (MBBS, MD, MS, DNB), chamber timings, and consultation days is available on our Doctors & Specialists directory.',
      cta: { label: 'View Doctors →', action: () => onNavigate('doctors') }
    }
  ];

  return (
    <div className="space-y-16 md:space-y-24 pb-16">
      {/* ========================================================================= */}
      {/* SECTION 03 — ABOUT PAGE HERO                                              */}
      {/* ========================================================================= */}
      <section className="pt-6 md:pt-10" aria-labelledby="about-hero-title">
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
            <span className="font-semibold text-[#0B4F6C]">About Us</span>
          </nav>

          <div className="bg-[#F0F7F9] rounded-2xl border border-slate-200/80 p-8 sm:p-12 md:p-14">
            <div className="max-w-3xl space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0B4F6C] block">
                ABOUT SARPHI HOSPITAL
              </span>

              <h1 
                id="about-hero-title"
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-tight"
              >
                Healthcare With Care & Responsibility
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed text-pretty">
                Learn more about Sarphi Hospital, our approach to healthcare and our commitment to creating a professional and patient-focused healthcare environment.
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
                  onClick={() => onNavigate('services')}
                  className="px-5 py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Explore Our Services</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 04 — WHO WE ARE                                                   */}
      {/* ========================================================================= */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6" aria-labelledby="who-we-are-heading">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left: Large professional hospital photograph */}
          <div className="lg:col-span-6">
            <ClinicalVisual
              type="building"
              className="h-80 sm:h-96 md:h-[420px] rounded-2xl shadow-md border border-slate-200"
              title="Sarphi Hospital & Healthcare Centre"
              badge="Memco More, Dhanbad"
            />
          </div>

          {/* Right: Content */}
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B4F6C] block">
              WHO WE ARE
            </span>

            <h2 
              id="who-we-are-heading"
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight leading-tight"
            >
              A Healthcare Environment Built Around Patients
            </h2>

            <p className="text-base text-slate-700 leading-relaxed">
              Sarphi Hospital is a healthcare facility located at Memco More, Dhanbad, focused on providing professional and patient-centered healthcare support to individuals and families.
            </p>

            <p className="text-sm text-slate-600 leading-relaxed">
              Our approach is centered around clear communication, patient care, professional medical support and a comfortable healthcare environment.
            </p>

            {/* Editable Content Area for Verified Hospital Information */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1.5">
              <span className="font-bold text-[#0B4F6C] block uppercase tracking-wider text-[11px]">
                [Add Verified Hospital Introduction Here]
              </span>
              <p className="leading-relaxed">
                Hospital administration can add verified establishment records, department affiliations, and community healthcare initiatives here. All medical data is verified and documented according to clinical regulations.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('services')}
                className="px-6 py-3 rounded-xl bg-[#0B4F6C] hover:bg-[#08384D] active:scale-[0.98] text-white text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Explore Our Services</span>
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 05 — OUR APPROACH TO PATIENT CARE                                 */}
      {/* ========================================================================= */}
      <section className="bg-[#F8FBFC] py-16 md:py-20 border-y border-slate-200/80" aria-labelledby="approach-heading">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B4F6C]">
              OUR APPROACH
            </span>
            <h2 id="approach-heading" className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight">
              Care That Puts Patients First
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Every process in our clinical and administrative workflow is oriented towards dignified patient support and transparent family communication.
            </p>
          </div>

          {/* 4 Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* CARD 01: Patient-Centered Care */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-[#1995AD] transition-all space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#EBF4F7] text-[#0B4F6C] flex items-center justify-center">
                <Heart className="w-6 h-6 text-[#1995AD]" />
              </div>
              <h3 className="text-base font-bold text-slate-900 leading-snug">
                Patient-Centered Care
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We focus on understanding patient needs and providing a respectful and supportive healthcare experience.
              </p>
            </div>

            {/* CARD 02: Professional Support */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-[#1995AD] transition-all space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#EBF4F7] text-[#0B4F6C] flex items-center justify-center">
                <Users className="w-6 h-6 text-[#1995AD]" />
              </div>
              <h3 className="text-base font-bold text-slate-900 leading-snug">
                Professional Support
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Our healthcare environment is designed to support patients through professional medical care and assistance.
              </p>
            </div>

            {/* CARD 03: Clear Communication */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-[#1995AD] transition-all space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#EBF4F7] text-[#0B4F6C] flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-[#1995AD]" />
              </div>
              <h3 className="text-base font-bold text-slate-900 leading-snug">
                Clear Communication
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We believe patients and attendants should receive clear and understandable information about their healthcare journey.
              </p>
            </div>

            {/* CARD 04: Responsible Healthcare */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-[#1995AD] transition-all space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#EBF4F7] text-[#0B4F6C] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-[#1995AD]" />
              </div>
              <h3 className="text-base font-bold text-slate-900 leading-snug">
                Responsible Healthcare
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We aim to maintain a professional, organized and patient-focused approach to healthcare.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 06 — OUR MISSION                                                  */}
      {/* ========================================================================= */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6" aria-labelledby="mission-heading">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Mission Content */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF4F7] text-[#0B4F6C] text-xs font-semibold">
                <Target className="w-3.5 h-3.5 text-[#1995AD]" />
                <span>Purpose & Commitment</span>
              </div>

              <h2 id="mission-heading" className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Our Mission
              </h2>

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
                To provide accessible and patient-focused healthcare support while maintaining professionalism, compassion and respect for every individual who seeks care at Sarphi Hospital.
              </p>

              <div className="pt-2 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                We measure our mission through prompt emergency attention, respectful dialogue with patient attendants, and maintaining sterile, infection-controlled clinical spaces at Memco More.
              </div>
            </div>

            {/* Right: Doctor / Patient Visual with subtle decorative brand shape */}
            <div className="lg:col-span-5 relative">
              {/* Decorative Brand Accent Shape */}
              <div className="absolute -top-3 -right-3 w-full h-full bg-[#1995AD]/15 rounded-2xl pointer-events-none" />
              <div className="relative z-10">
                <ClinicalVisual
                  type="consultation"
                  className="h-72 sm:h-80 w-full rounded-2xl shadow-md border border-slate-200"
                  title="Compassionate Doctor & Patient Dialogue"
                  badge="Patient-Focused Mission"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 07 — OUR VISION                                                   */}
      {/* ========================================================================= */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6" aria-labelledby="vision-heading">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Image */}
            <div className="lg:col-span-5">
              <ClinicalVisual
                type="ot"
                className="h-72 sm:h-80 w-full rounded-2xl shadow-md border border-slate-200"
                title="Sterile Modular Surgical Environment"
                badge="Organized Healthcare Setting"
              />
            </div>

            {/* Right: Vision Content */}
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0B4F6C] block">
                OUR VISION
              </span>

              <h2 id="vision-heading" className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Building a Trusted Healthcare Experience
              </h2>

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
                Our vision is to create a healthcare environment where patients and families can access professional medical support in a comfortable, respectful and organized setting.
              </p>

              <div className="pt-2 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                By investing in hygienic infrastructure, automated in-house diagnostics, and qualified specialists, we strive to earn the steady trust of the Dhanbad community every single day.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 08 — OUR VALUES                                                   */}
      {/* ========================================================================= */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6" aria-labelledby="values-heading">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0B4F6C]">
            GUIDING PRINCIPLES
          </span>
          <h2 id="values-heading" className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Our Core Values
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            The principles that guide our approach to patient care and healthcare service.
          </p>
        </div>

        {/* 6-Card Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreValues.map((v) => (
            <div
              key={v.id}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-[#1995AD] transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#EBF4F7] flex items-center justify-center">
                  {v.icon}
                </div>
                <span className="text-xs font-mono font-semibold text-slate-400">
                  {v.id}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 leading-snug">
                {v.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 09 — OUR FACILITIES                                               */}
      {/* ========================================================================= */}
      <section className="bg-slate-50 py-16 border-y border-slate-200" aria-labelledby="facilities-heading">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B4F6C]">
              OUR FACILITIES
            </span>
            <h2 id="facilities-heading" className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight">
              A Comfortable & Professional Healthcare Environment
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Explore the facilities and healthcare spaces available at Sarphi Hospital.
            </p>
          </div>

          {/* 6 Facility Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {hospitalFacilities.map((fac) => (
              <div
                key={fac.id}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-[#1995AD] transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-[#EBF4F7] text-[#0B4F6C] flex items-center justify-center">
                    {fac.icon}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {fac.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {fac.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[#0B4F6C] font-semibold">Memco More Facility</span>
                  <span className="text-emerald-600 font-medium">Verified Active</span>
                </div>
              </div>
            ))}
          </div>

          {/* CTA: View Gallery */}
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
      {/* SECTION 10 — MEDICAL TEAM INTRODUCTION                                    */}
      {/* ========================================================================= */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6" aria-labelledby="team-heading">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B4F6C]">
              OUR MEDICAL TEAM
            </span>
            <h2 id="team-heading" className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight">
              Meet Our Doctors & Specialists
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-xl">
              Get to know the medical professionals associated with Sarphi Hospital.
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

                <div className="text-xs text-slate-600 space-y-1">
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
                  View Profile →
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

        {/* Editable note */}
        <div className="mt-8 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500 text-center">
          <span className="font-semibold text-slate-700">Verified Medical Faculty:</span> All doctor qualifications and consultation timings are directly managed by the Sarphi Hospital administrative desk.
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 11 — HOSPITAL ENVIRONMENT                                         */}
      {/* ========================================================================= */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6" aria-labelledby="environment-heading">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Large Featured Hospital Image */}
            <div className="lg:col-span-6">
              <ClinicalVisual
                type="lobby"
                className="h-80 sm:h-96 w-full rounded-2xl shadow-sm border border-slate-200"
                title="Sarphi Hospital Reception & Waiting Lounge"
                badge="Clean & Calm Ambience"
              />
            </div>

            {/* Right: Environment Storytelling */}
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0B4F6C] block">
                OUR ENVIRONMENT
              </span>

              <h2 id="environment-heading" className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
                Designed Around Patient Comfort
              </h2>

              <p className="text-base text-slate-700 leading-relaxed">
                A professional healthcare environment should feel organized, accessible and comfortable for patients and their attendants.
              </p>

              {/* 3 Small Feature Points */}
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#EBF4F7] text-[#0B4F6C] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-[#1995AD]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Clean & Organized Spaces</h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Daily sanitisation schedules across OPD corridors, inpatient rooms, and sterile surgical suites.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#EBF4F7] text-[#0B4F6C] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-[#1995AD]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Patient-Friendly Environment</h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Clear informational signage, comfortable attendant seating, and wheelchair-accessible entryways.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#EBF4F7] text-[#0B4F6C] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-[#1995AD]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Professional Healthcare Setting</h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Calm atmosphere prioritizing patient rest, infection containment, and structured visiting hours.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 12 — TRUST HIGHLIGHTS                                             */}
      {/* ========================================================================= */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6" aria-label="Trust Highlights">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            <div className="space-y-1">
              <h3 className="text-base sm:text-lg font-bold text-[#0B4F6C]">
                Patient-Centered Approach
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Compassionate & respectful care
              </p>
            </div>

            <div className="pt-4 sm:pt-0 sm:pl-4 space-y-1">
              <h3 className="text-base sm:text-lg font-bold text-[#0B4F6C]">
                Professional Healthcare Support
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Qualified medical officers & nurses
              </p>
            </div>

            <div className="pt-4 sm:pt-0 sm:pl-4 space-y-1">
              <h3 className="text-base sm:text-lg font-bold text-[#0B4F6C]">
                Accessible Location
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Memco More Chowk, Dhanbad
              </p>
            </div>

            <div className="pt-4 sm:pt-0 sm:pl-4 space-y-1">
              <h3 className="text-base sm:text-lg font-bold text-[#0B4F6C]">
                Comprehensive Services
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                OPD, Surgery, Diagnostics & 24×7 Care
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 13 — GALLERY PREVIEW                                              */}
      {/* ========================================================================= */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6" aria-labelledby="gallery-preview-heading">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0B4F6C]">
            INSIDE SARPHI HOSPITAL
          </span>
          <h2 id="gallery-preview-heading" className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            A Glimpse Into Our Hospital
          </h2>
          <p className="text-slate-600 text-sm">
            Clean facilities, modern surgical suites, and dedicated care spaces at Memco More.
          </p>
        </div>

        {/* 5-6 Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <ClinicalVisual type="building" className="h-44 sm:h-52 w-full rounded-2xl" title="Hospital Exterior" badge="Memco More" />
          <ClinicalVisual type="lobby" className="h-44 sm:h-52 w-full rounded-2xl" title="Reception & Desk" badge="Ground Floor" />
          <ClinicalVisual type="ot" className="h-44 sm:h-52 w-full rounded-2xl" title="Modular OT Suite" badge="Sterile Airflow" />
          <ClinicalVisual type="icu" className="h-44 sm:h-52 w-full rounded-2xl" title="ICU & Telemetry" badge="24×7 Critical" />
          <ClinicalVisual type="lab" className="h-44 sm:h-52 w-full rounded-2xl" title="Diagnostic Lab" badge="Automated" />
          <ClinicalVisual type="consultation" className="h-44 sm:h-52 w-full rounded-2xl" title="Doctor Chambers" badge="First Floor" />
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
            Hear From Our Patients
          </h2>
          <p className="text-slate-600 text-sm">
            Experiences from patient families who trusted Sarphi Hospital for treatment.
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
      {/* SECTION 15 — FAQ                                                          */}
      {/* ========================================================================= */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6" aria-labelledby="about-faq-heading">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0B4F6C]">
            ABOUT SARPHI HOSPITAL
          </span>
          <h2 id="about-faq-heading" className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm">
            Answers to common questions regarding Sarphi Hospital, our facility and doctors.
          </p>
        </div>

        {/* Accordion */}
        <div className="max-w-3xl mx-auto space-y-3">
          {aboutFaqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs"
              >
                <button
                  onClick={() => toggleFaq(idx)}
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
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50 space-y-3">
                    <p>{faq.a}</p>
                    {faq.cta && (
                      <div>
                        <button
                          onClick={faq.cta.action}
                          className="text-xs font-bold text-[#0B4F6C] hover:underline inline-flex items-center gap-1 cursor-pointer"
                        >
                          <span>{faq.cta.label}</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 16 — FINAL CTA                                                    */}
      {/* ========================================================================= */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6" aria-labelledby="final-cta-heading">
        <div className="bg-[#0B4F6C] text-white rounded-2xl p-8 sm:p-12 text-center shadow-lg relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-5">
            <h2 id="final-cta-heading" className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Looking for Healthcare Assistance?
            </h2>

            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              Connect with Sarphi Hospital for appointments, enquiries and healthcare information.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <button
                onClick={() => onOpenAppointmentModal()}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-[#0B4F6C] font-bold text-base shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-5 h-5 text-[#0B4F6C]" />
                <span>Book an Appointment</span>
              </button>

              <button
                onClick={() => onNavigate('contact')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold text-base transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Phone className="w-5 h-5 text-white" />
                <span>Contact Hospital</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 17 — CONTACT STRIP                                                */}
      {/* ========================================================================= */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6" aria-label="Hospital Contact Details">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Card 1: Location */}
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

            {/* Card 2: Phone */}
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

            {/* Card 3: Email */}
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
