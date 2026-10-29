import React, { useState } from 'react';
import { 
  FileText, ShieldAlert, AlertCircle, ArrowLeft, ArrowRight, Phone, 
  Mail, MapPin, Calendar, Clock, ChevronDown, HelpCircle, CheckCircle2, 
  ExternalLink, Lock, Scale
} from 'lucide-react';
import { Page } from '../types';
import { HOSPITAL_CONTACT } from '../data/hospitalData';

interface TermsPageProps {
  onNavigate: (page: Page) => void;
  onOpenAppointmentModal?: (doctorId?: string, departmentId?: string) => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ 
  onNavigate, 
  onOpenAppointmentModal 
}) => {
  const [activeSection, setActiveSection] = useState<string>('terms-sec-1');

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const tableOfContents = [
    { id: 'terms-sec-1', title: '1. Introduction' },
    { id: 'terms-sec-2', title: '2. Website Use' },
    { id: 'terms-sec-3', title: '3. Medical Information Disclaimer' },
    { id: 'terms-sec-4', title: '4. Medical Emergencies' },
    { id: 'terms-sec-5', title: '5. Appointments & Enquiries' },
    { id: 'terms-sec-6', title: '6. Accuracy of Website Information' },
    { id: 'terms-sec-7', title: '7. Healthcare Services' },
    { id: 'terms-sec-8', title: '8. Doctor & Specialist Information' },
    { id: 'terms-sec-9', title: '9. Information Submitted by Users' },
    { id: 'terms-sec-10', title: '10. Intellectual Property' },
    { id: 'terms-sec-11', title: '11. Use of Hospital Branding' },
    { id: 'terms-sec-12', title: '12. Third-Party Websites & Services' },
    { id: 'terms-sec-13', title: '13. Website Availability' },
    { id: 'terms-sec-14', title: '14. Prohibited Use' },
    { id: 'terms-sec-15', title: '15. Privacy' },
    { id: 'terms-sec-16', title: '16. Limitation of Liability' },
    { id: 'terms-sec-17', title: '17. Changes to Website Content' },
    { id: 'terms-sec-18', title: '18. Changes to These Terms' },
    { id: 'terms-sec-19', title: '19. Governing Law & Jurisdiction' },
    { id: 'terms-sec-20', title: '20. Contact Information' },
  ];

  return (
    <div className="space-y-12 md:space-y-16 pb-16 pt-6 md:pt-10">
      {/* ========================================================================= */}
      {/* SECTION 03 — TERMS HERO                                                    */}
      {/* ========================================================================= */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6" aria-labelledby="terms-hero-title">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6" aria-label="Breadcrumb">
          <button
            onClick={() => onNavigate('home')}
            className="hover:text-[#0B4F6C] hover:underline cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-[#0B4F6C] font-semibold">Terms & Conditions</span>
        </nav>

        {/* Hero Container: Simple, Minimal, Brand-Tinted */}
        <div className="bg-[#F0F7F9] border border-[#1995AD]/25 rounded-3xl p-6 sm:p-10 shadow-2xs">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#0B4F6C] text-xs font-semibold border border-[#1995AD]/30 shadow-2xs">
              <Scale className="w-3.5 h-3.5 text-[#1995AD]" />
              <span className="uppercase tracking-wider font-bold">LEGAL INFORMATION</span>
            </div>

            <h1 
              id="terms-hero-title"
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-tight"
            >
              Terms & Conditions
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed text-pretty">
              Please read these Terms & Conditions carefully before using the Sarphi Hospital website.
            </p>

            <div className="pt-1">
              <span className="inline-block text-xs text-slate-500">
                <strong>Effective Date:</strong>{' '}
                <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-mono text-[11px]">
                  [Insert Date]
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* MAIN DOCUMENT CONTAINER (Max-Width 900–1000px)                             */}
      {/* ========================================================================= */}
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ======================================================================= */}
          {/* TABLE OF CONTENTS: Mobile Dropdown & Desktop Sticky Sidebar             */}
          {/* ======================================================================= */}
          {/* Mobile Jump to Section Dropdown */}
          <div className="lg:hidden w-full bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs">
            <label htmlFor="jump-to-terms-section" className="text-xs font-bold text-slate-700 block mb-2">
              Jump to Section:
            </label>
            <div className="relative">
              <select
                id="jump-to-terms-section"
                onChange={(e) => scrollToSection(e.target.value)}
                value={activeSection}
                className="w-full pl-3 pr-8 py-2 rounded-xl text-xs border border-slate-300 bg-white text-slate-800 appearance-none focus:outline-none focus:ring-2 focus:ring-[#0B4F6C]"
              >
                {tableOfContents.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Desktop Sticky Sidebar */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-28 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs max-h-[75vh] overflow-y-auto scrollbar-thin">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 pb-2 border-b border-slate-100 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-[#0B4F6C]" />
                <span>On This Page</span>
              </h2>
              <nav className="space-y-1" aria-label="Table of contents">
                {tableOfContents.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full text-left text-xs py-1.5 px-2 rounded-lg transition-colors cursor-pointer truncate ${
                      activeSection === item.id
                        ? 'bg-[#EBF4F7] text-[#0B4F6C] font-bold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium'
                    }`}
                  >
                    {item.title}
                  </button>
                ))}
              </nav>
            </div>

            {/* Emergency & Reception Help Strip */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-2.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0B4F6C] block">
                Hospital Administration
              </span>
              <p className="text-xs text-slate-600 leading-relaxed">
                For questions regarding website terms, permissions, or official queries:
              </p>
              <a
                href={`tel:${HOSPITAL_CONTACT.phonePrimary}`}
                className="text-xs font-bold text-slate-900 hover:text-[#0B4F6C] flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-[#1995AD]" />
                <span>{HOSPITAL_CONTACT.phonePrimary}</span>
              </a>
              <a
                href={`mailto:${HOSPITAL_CONTACT.email}`}
                className="text-xs text-[#0B4F6C] hover:underline flex items-center gap-1.5 break-all"
              >
                <Mail className="w-3.5 h-3.5 text-[#1995AD]" />
                <span>{HOSPITAL_CONTACT.email}</span>
              </a>
            </div>
          </aside>

          {/* ======================================================================= */}
          {/* TERMS BODY DOCUMENT                                                     */}
          {/* ======================================================================= */}
          <main className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-10">
            
            {/* SECTION 04 — 1. INTRODUCTION */}
            <section id="terms-sec-1" className="space-y-4 border-b border-slate-100 pb-8 scroll-mt-28">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-[#EBF4F7] text-[#0B4F6C] text-xs font-bold flex items-center justify-center shrink-0">
                  1
                </span>
                <span>Introduction</span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                These Terms & Conditions govern your use of the Sarphi Hospital website. By accessing or using this website, you acknowledge that you have read and understood these terms and agree to use the website responsibly and in accordance with applicable laws.
              </p>

              <div className="p-3 rounded-lg bg-slate-100 border border-slate-200 text-[11px] text-slate-600 font-mono">
                [Review and approve final legal wording before publication.]
              </div>
            </section>

            {/* SECTION 05 — 2. WEBSITE USE */}
            <section id="terms-sec-2" className="space-y-3.5 scroll-mt-28 pt-2">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-[#EBF4F7] text-[#0B4F6C] text-xs font-bold flex items-center justify-center shrink-0">
                  2
                </span>
                <span>Use of This Website</span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Visitors may use this website for legitimate, non-commercial healthcare information purposes, such as:
              </p>

              <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-slate-600 pl-2">
                <li>Learning about Sarphi Hospital, its background and mission.</li>
                <li>Exploring available clinical services and diagnostic facilities.</li>
                <li>Finding qualified doctor information and scheduled OPD chamber timings.</li>
                <li>Viewing hospital infrastructure, visiting guidelines, and facility details.</li>
                <li>Requesting outpatient appointments and submitting inquiries.</li>
                <li>Contacting the hospital for administrative or direction guidance.</li>
              </ul>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-semibold pt-1">
                Users must not:
              </p>

              <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-slate-600 pl-2">
                <li>Misuse the website or attempt unauthorized access to restricted server areas.</li>
                <li>Interfere with or disrupt website operations or server communication.</li>
                <li>Submit false, misleading, fraudulent, or harassing information.</li>
                <li>Use the website for any unlawful, defamatory, or harmful purposes.</li>
                <li>Upload malicious code, viruses, automated bots, or harmful payloads.</li>
                <li>Attempt to compromise website security, firewalls, or user data integrity.</li>
              </ul>
            </section>

            {/* SECTION 06 — 3. MEDICAL INFORMATION DISCLAIMER (VISUALLY HIGHLIGHTED BOX) */}
            <section id="terms-sec-3" className="space-y-3.5 scroll-mt-28 pt-6 border-t border-slate-100">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-[#EBF4F7] text-[#0B4F6C] text-xs font-bold flex items-center justify-center shrink-0">
                  3
                </span>
                <span>Medical Information Disclaimer</span>
              </h2>

              {/* Visually Highlighted Information Box */}
              <div className="bg-[#EBF4F7]/80 border-2 border-[#1995AD]/40 rounded-2xl p-5 sm:p-6 space-y-3 text-slate-800">
                <div className="flex items-center gap-2 text-[#0B4F6C]">
                  <AlertCircle className="w-5 h-5 text-[#1995AD] shrink-0" />
                  <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider">
                    General Healthcare Information Notice
                  </h3>
                </div>

                <p className="text-xs sm:text-sm leading-relaxed">
                  Information published on this website is provided for general informational purposes and should not be treated as a substitute for professional medical advice, diagnosis or treatment. Individual healthcare decisions should be made in consultation with an appropriately qualified healthcare professional.
                </p>

                <p className="text-xs sm:text-sm font-bold text-[#0B4F6C] leading-relaxed pt-1 border-t border-[#1995AD]/20">
                  Do not rely solely on website content when making decisions about a medical condition or treatment.
                </p>
              </div>
            </section>

            {/* SECTION 07 — 4. MEDICAL EMERGENCIES (CALM & VISIBLE BOX) */}
            <section id="terms-sec-4" className="space-y-3.5 scroll-mt-28 pt-6 border-t border-slate-100">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-[#EBF4F7] text-[#0B4F6C] text-xs font-bold flex items-center justify-center shrink-0">
                  4
                </span>
                <span>Medical Emergencies</span>
              </h2>

              {/* Calm But Distinct Warning Box */}
              <div className="bg-rose-50/70 border border-rose-200 rounded-2xl p-5 sm:p-6 space-y-3 text-rose-950">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0" />
                  <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-rose-900">
                    Emergency Medical Protocol Notice
                  </h3>
                </div>

                <p className="text-xs sm:text-sm leading-relaxed text-rose-900">
                  This website should not be relied upon as a substitute for emergency medical services. If you believe you or another person is experiencing a medical emergency, seek appropriate emergency medical assistance immediately.
                </p>

                <div className="pt-2 border-t border-rose-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <span className="font-bold text-rose-900">
                    Sarphi Hospital Casualty Hotline:
                  </span>
                  <a 
                    href={`tel:${HOSPITAL_CONTACT.phoneEmergency}`}
                    className="font-bold text-rose-700 hover:underline"
                  >
                    {HOSPITAL_CONTACT.phoneEmergency}
                  </a>
                </div>
              </div>
            </section>

            {/* SECTION 08 — 5. APPOINTMENTS & ENQUIRIES */}
            <section id="terms-sec-5" className="space-y-3.5 scroll-mt-28 pt-6 border-t border-slate-100">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-[#EBF4F7] text-[#0B4F6C] text-xs font-bold flex items-center justify-center shrink-0">
                  5
                </span>
                <span>Appointments & Enquiries</span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Appointment requests submitted through this website are requests for contact or scheduling and do not automatically constitute a confirmed medical appointment unless confirmed by Sarphi Hospital.
              </p>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Doctor availability, consultation timings and service availability may vary due to emergency patient arrivals, intensive care duty, or urgent surgical interventions.
              </p>

              <p className="text-xs sm:text-sm text-slate-600">
                Visitors should contact the hospital reception directly if they require immediate confirmation of their token reference or doctor chamber availability.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('contact')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B4F6C] hover:underline cursor-pointer"
                >
                  <span>Contact Hospital</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </section>

            {/* SECTION 09 — 6. ACCURACY OF WEBSITE INFORMATION */}
            <section id="terms-sec-6" className="space-y-3.5 scroll-mt-28 pt-6 border-t border-slate-100">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-[#EBF4F7] text-[#0B4F6C] text-xs font-bold flex items-center justify-center shrink-0">
                  6
                </span>
                <span>Accuracy of Website Information</span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Sarphi Hospital aims to keep the information on this website accurate and current. However, service availability, doctor schedules, contact information, facilities and other details may change over time.
              </p>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Visitors should contact Sarphi Hospital directly when they require confirmation of current information.
              </p>
            </section>

            {/* SECTION 10 — 7. HEALTHCARE SERVICES */}
            <section id="terms-sec-7" className="space-y-3.5 scroll-mt-28 pt-6 border-t border-slate-100">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-[#EBF4F7] text-[#0B4F6C] text-xs font-bold flex items-center justify-center shrink-0">
                  7
                </span>
                <span>Healthcare Services</span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Information about healthcare services displayed on this website is intended to provide general information about services that may be available at Sarphi Hospital. Actual service availability may depend on hospital facilities, medical professionals, schedules and other operational factors.
              </p>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Please contact the hospital for current service availability. Website representations do not guarantee the immediate availability of any specific medical procedure, specialist consultant, or inpatient bed category.
              </p>
            </section>

            {/* SECTION 11 — 8. DOCTOR & SPECIALIST INFORMATION */}
            <section id="terms-sec-8" className="space-y-3.5 scroll-mt-28 pt-6 border-t border-slate-100">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-[#EBF4F7] text-[#0B4F6C] text-xs font-bold flex items-center justify-center shrink-0">
                  8
                </span>
                <span>Doctor & Specialist Information</span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Doctor names, qualifications, specialties, consultation schedules and other professional information displayed on the website are based on information approved by Sarphi Hospital.
              </p>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Consultation availability may change. Visitors should confirm current availability with the hospital before planning a visit. The website makes no claims, guarantees, or representations regarding individual doctor performance, success rates, or clinical outcomes.
              </p>
            </section>

            {/* SECTION 12 — 9. INFORMATION SUBMITTED BY USERS */}
            <section id="terms-sec-9" className="space-y-3.5 scroll-mt-28 pt-6 border-t border-slate-100">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-[#EBF4F7] text-[#0B4F6C] text-xs font-bold flex items-center justify-center shrink-0">
                  9
                </span>
                <span>Information Submitted by Users</span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Users are responsible for ensuring that information submitted through website forms—including contact forms, appointment requests, and general enquiries—is accurate, truthful, and appropriate for the purpose of the request.
              </p>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Do not submit confidential medical records or highly sensitive personal information through a general website form unless Sarphi Hospital specifically provides a secure method for doing so.
              </p>

              <div className="pt-1">
                <button
                  onClick={() => onNavigate('privacy')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B4F6C] hover:underline cursor-pointer"
                >
                  <span>Privacy Policy</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </section>

            {/* SECTION 13 — 10. INTELLECTUAL PROPERTY */}
            <section id="terms-sec-10" className="space-y-3.5 scroll-mt-28 pt-6 border-t border-slate-100">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-[#EBF4F7] text-[#0B4F6C] text-xs font-bold flex items-center justify-center shrink-0">
                  10
                </span>
                <span>Intellectual Property</span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Unless otherwise stated, website content including text, graphics, logos, photographs, design elements and other materials may be protected by applicable intellectual property laws.
              </p>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Users should not copy website content without permission, reproduce the logo without authorization, republish photographs without permission, or modify or distribute protected content.
              </p>

              <div className="p-3 rounded-lg bg-slate-100 border border-slate-200 text-[11px] text-slate-600 font-mono">
                [Insert approved copyright and intellectual-property ownership details.]
              </div>
            </section>

            {/* SECTION 14 — 11. USE OF SARPHI HOSPITAL BRANDING */}
            <section id="terms-sec-11" className="space-y-3.5 scroll-mt-28 pt-6 border-t border-slate-100">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-[#EBF4F7] text-[#0B4F6C] text-xs font-bold flex items-center justify-center shrink-0">
                  11
                </span>
                <span>Use of Sarphi Hospital Branding</span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                The Sarphi Hospital name, logo and other brand elements should not be reproduced, modified or used in a manner that suggests unauthorized affiliation, endorsement or partnership.
              </p>
            </section>

            {/* SECTION 15 — 12. THIRD-PARTY WEBSITES & SERVICES */}
            <section id="terms-sec-12" className="space-y-3.5 scroll-mt-28 pt-6 border-t border-slate-100">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-[#EBF4F7] text-[#0B4F6C] text-xs font-bold flex items-center justify-center shrink-0">
                  12
                </span>
                <span>Third-Party Websites & Services</span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                The website may contain links to third-party websites or services (such as Google Maps or external communication platforms) for convenience or additional geographic information. Sarphi Hospital does not necessarily control those external websites and users should review their respective terms and privacy policies.
              </p>
            </section>

            {/* SECTION 16 — 13. WEBSITE AVAILABILITY */}
            <section id="terms-sec-13" className="space-y-3.5 scroll-mt-28 pt-6 border-t border-slate-100">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-[#EBF4F7] text-[#0B4F6C] text-xs font-bold flex items-center justify-center shrink-0">
                  13
                </span>
                <span>Website Availability</span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Sarphi Hospital aims to keep the website available and functional, but temporary interruptions may occur due to maintenance, technical issues, hosting problems, updates or circumstances outside the hospital's control.
              </p>
            </section>

            {/* SECTION 17 — 14. PROHIBITED ACTIVITIES */}
            <section id="terms-sec-14" className="space-y-3.5 scroll-mt-28 pt-6 border-t border-slate-100">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-[#EBF4F7] text-[#0B4F6C] text-xs font-bold flex items-center justify-center shrink-0">
                  14
                </span>
                <span>Prohibited Use</span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                When accessing or interacting with the Sarphi Hospital website, users must strictly refrain from:
              </p>

              <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-slate-600 pl-2">
                <li>Attempting unauthorized access to administrative servers or private data stores.</li>
                <li>Introducing malicious software, trojans, worms, or destructive code.</li>
                <li>Disrupting website functionality, availability, or server responsiveness.</li>
                <li>Scraping, harvesting, or bulk-extracting website data without written permission.</li>
                <li>Submitting fraudulent, fictitious, or impersonated appointment requests.</li>
                <li>Impersonating another person, patient, doctor, or staff member.</li>
                <li>Using the website for any unlawful, harassing, or prohibited activity.</li>
                <li>Attempting to bypass security controls, rate limiters, or authentication mechanisms.</li>
              </ul>
            </section>

            {/* SECTION 18 — 15. PRIVACY */}
            <section id="terms-sec-15" className="space-y-3.5 scroll-mt-28 pt-6 border-t border-slate-100">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-[#EBF4F7] text-[#0B4F6C] text-xs font-bold flex items-center justify-center shrink-0">
                  15
                </span>
                <span>Privacy</span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Use of personal information submitted through the website is governed by the Sarphi Hospital Privacy Policy.
              </p>

              <div className="pt-1">
                <button
                  onClick={() => onNavigate('privacy')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B4F6C] hover:underline cursor-pointer"
                >
                  <span>Read Privacy Policy</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </section>

            {/* SECTION 19 — 16. LIMITATION OF LIABILITY */}
            <section id="terms-sec-16" className="space-y-3.5 scroll-mt-28 pt-6 border-t border-slate-100">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-[#EBF4F7] text-[#0B4F6C] text-xs font-bold flex items-center justify-center shrink-0">
                  16
                </span>
                <span>Limitation of Liability</span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                To the extent permitted by applicable law, Sarphi Hospital should not be represented as guaranteeing that all website information will always be complete, current, uninterrupted or error-free.
              </p>

              <div className="p-3 rounded-lg bg-slate-100 border border-slate-200 text-[11px] text-slate-600 font-mono">
                [Insert legally approved limitation-of-liability language.]
              </div>
            </section>

            {/* SECTION 20 — 17. CHANGES TO WEBSITE CONTENT */}
            <section id="terms-sec-17" className="space-y-3.5 scroll-mt-28 pt-6 border-t border-slate-100">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-[#EBF4F7] text-[#0B4F6C] text-xs font-bold flex items-center justify-center shrink-0">
                  17
                </span>
                <span>Changes to Website Content</span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Sarphi Hospital may update, modify, add or remove website content, services information, features or other website elements from time to time. Updated information will be published on the website when appropriate.
              </p>
            </section>

            {/* SECTION 21 — 18. CHANGES TO THESE TERMS */}
            <section id="terms-sec-18" className="space-y-3.5 scroll-mt-28 pt-6 border-t border-slate-100">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-[#EBF4F7] text-[#0B4F6C] text-xs font-bold flex items-center justify-center shrink-0">
                  18
                </span>
                <span>Changes to These Terms</span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                These Terms & Conditions may be updated from time to time. When changes are made, the revised version may be published on this page along with an updated effective date.
              </p>
            </section>

            {/* SECTION 22 — 19. GOVERNING LAW & JURISDICTION */}
            <section id="terms-sec-19" className="space-y-3.5 scroll-mt-28 pt-6 border-t border-slate-100">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-[#EBF4F7] text-[#0B4F6C] text-xs font-bold flex items-center justify-center shrink-0">
                  19
                </span>
                <span>Governing Law & Jurisdiction</span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                These Terms & Conditions and any disputes arising out of the use of this website shall be interpreted in accordance with applicable laws in India.
              </p>

              <div className="p-3 rounded-lg bg-slate-100 border border-slate-200 text-[11px] text-slate-600 font-mono">
                [Insert legally approved governing law and jurisdiction applicable to Sarphi Hospital.]
              </div>
            </section>

            {/* SECTION 23 — 20. CONTACT INFORMATION (HIGHLIGHTED CARD) */}
            <section id="terms-sec-20" className="scroll-mt-28 pt-6 border-t border-slate-100">
              <div className="bg-[#EBF4F7]/70 rounded-2xl border border-[#1995AD]/30 p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-2 text-[#0B4F6C]">
                  <HelpCircle className="w-5 h-5 text-[#1995AD]" />
                  <h3 className="text-lg font-bold text-slate-900">
                    Questions About These Terms?
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  If you have questions regarding these Terms & Conditions, please contact Sarphi Hospital.
                </p>

                <div className="space-y-1.5 pt-1 text-xs text-slate-800">
                  <p className="font-bold text-slate-900">Sarphi Hospital</p>
                  <p className="text-slate-600">{HOSPITAL_CONTACT.address}</p>
                  <p>
                    <strong>Phone:</strong>{' '}
                    <a href={`tel:${HOSPITAL_CONTACT.phonePrimary}`} className="text-[#0B4F6C] font-semibold hover:underline">
                      {HOSPITAL_CONTACT.phonePrimary}
                    </a>
                  </p>
                  <p>
                    <strong>Email:</strong>{' '}
                    <a href={`mailto:${HOSPITAL_CONTACT.email}`} className="text-[#0B4F6C] font-semibold hover:underline">
                      {HOSPITAL_CONTACT.email}
                    </a>
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => onNavigate('contact')}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#0B4F6C] hover:bg-[#08384D] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                  >
                    <span>Contact Us</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </section>

          </main>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 24 — RELATED LINKS                                                */}
      {/* ========================================================================= */}
      <section className="max-w-[1000px] mx-auto px-4 sm:px-6">
        <h2 className="sr-only">Related Hospital Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Card 1: Privacy Policy */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-2 hover:border-[#1995AD]/40 transition-colors shadow-2xs">
            <h3 className="text-sm font-bold text-slate-900">Privacy Policy</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Learn how information submitted through the website may be handled.
            </p>
            <button
              onClick={() => onNavigate('privacy')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#0B4F6C] hover:underline pt-1 cursor-pointer"
            >
              <span>View Privacy Policy</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 2: Contact Us */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-2 hover:border-[#1995AD]/40 transition-colors shadow-2xs">
            <h3 className="text-sm font-bold text-slate-900">Contact Us</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Get in touch with Sarphi Hospital.
            </p>
            <button
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#0B4F6C] hover:underline pt-1 cursor-pointer"
            >
              <span>Contact Hospital</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 3: Services */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-2 hover:border-[#1995AD]/40 transition-colors shadow-2xs">
            <h3 className="text-sm font-bold text-slate-900">Services</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Explore available healthcare services.
            </p>
            <button
              onClick={() => onNavigate('services')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#0B4F6C] hover:underline pt-1 cursor-pointer"
            >
              <span>View Services</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 25 — FINAL CTA                                                    */}
      {/* ========================================================================= */}
      <section className="max-w-[1000px] mx-auto px-4 sm:px-6">
        <div className="bg-[#0B4F6C] text-white rounded-3xl p-6 sm:p-10 shadow-sm text-center space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            Need More Information?
          </h2>

          <p className="text-xs sm:text-sm text-slate-200 max-w-lg mx-auto leading-relaxed">
            Contact Sarphi Hospital for healthcare services, appointments and general enquiries.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-[#0B4F6C] font-bold text-xs shadow-xs transition-colors cursor-pointer"
            >
              Contact Hospital
            </button>

            <button
              onClick={() => {
                if (onOpenAppointmentModal) {
                  onOpenAppointmentModal();
                } else {
                  onNavigate('contact');
                }
              }}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-white/15 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs transition-colors cursor-pointer"
            >
              Book an Appointment
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
