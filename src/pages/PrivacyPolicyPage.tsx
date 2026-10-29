import React, { useState } from 'react';
import { 
  ShieldCheck, Lock, FileText, ArrowLeft, ArrowRight, AlertCircle, 
  Phone, Mail, MapPin, Calendar, Clock, ExternalLink, ChevronDown, 
  HelpCircle, CheckCircle2, ShieldAlert
} from 'lucide-react';
import { Page } from '../types';
import { HOSPITAL_CONTACT } from '../data/hospitalData';

interface PrivacyPolicyPageProps {
  onNavigate: (page: Page) => void;
  onOpenAppointmentModal?: (doctorId?: string, departmentId?: string) => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ 
  onNavigate,
  onOpenAppointmentModal 
}) => {
  const [activeSection, setActiveSection] = useState<string>('sec-1');

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const tableOfContents = [
    { id: 'sec-1', title: '1. Information We Collect' },
    { id: 'sec-2', title: '2. How We Use Information' },
    { id: 'sec-3', title: '3. Appointment Information' },
    { id: 'sec-4', title: '4. Medical & Sensitive Data' },
    { id: 'sec-5', title: '5. Cookies & Technologies' },
    { id: 'sec-6', title: '6. Third-Party Services' },
    { id: 'sec-7', title: '7. How Information May Be Shared' },
    { id: 'sec-8', title: '8. Data Security' },
    { id: 'sec-9', title: '9. Data Retention' },
    { id: 'sec-10', title: '10. Your Privacy Choices' },
    { id: 'sec-11', title: '11. Children’s Privacy' },
    { id: 'sec-12', title: '12. External Websites' },
    { id: 'sec-13', title: '13. Changes to This Policy' },
    { id: 'sec-14', title: '14. Contact About Privacy' },
  ];

  return (
    <div className="space-y-12 md:space-y-16 pb-16 pt-6 md:pt-10">
      {/* ========================================================================= */}
      {/* SECTION 03 — PRIVACY POLICY HERO                                          */}
      {/* ========================================================================= */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6" aria-labelledby="policy-hero-title">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6" aria-label="Breadcrumb">
          <button
            onClick={() => onNavigate('home')}
            className="hover:text-[#0B4F6C] hover:underline cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-[#0B4F6C] font-semibold">Privacy Policy</span>
        </nav>

        {/* Hero Container: Simple, Minimal, Brand-Tinted */}
        <div className="bg-[#F0F7F9] border border-[#1995AD]/25 rounded-3xl p-6 sm:p-10 shadow-2xs">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#0B4F6C] text-xs font-semibold border border-[#1995AD]/30 shadow-2xs">
              <Lock className="w-3.5 h-3.5 text-[#1995AD]" />
              <span className="uppercase tracking-wider font-bold">LEGAL & PRIVACY</span>
            </div>

            <h1 
              id="policy-hero-title"
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-tight"
            >
              Privacy Policy
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed text-pretty">
              Your privacy and personal information are important to us. This Privacy Policy explains how information may be collected, used, protected and handled when you use the Sarphi Hospital website.
            </p>
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
            <label htmlFor="jump-to-section" className="text-xs font-bold text-slate-700 block mb-2">
              Jump to Section:
            </label>
            <div className="relative">
              <select
                id="jump-to-section"
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
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 pb-2 border-b border-slate-100 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-[#0B4F6C]" />
                <span>On This Page</span>
              </h2>
              <nav className="space-y-1" aria-label="Table of contents">
                {tableOfContents.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full text-left text-xs py-1.5 px-2.5 rounded-lg transition-colors cursor-pointer truncate ${
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

            {/* Quick Contact Box */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-2.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0B4F6C] block">
                Hospital Help Desk
              </span>
              <p className="text-xs text-slate-600 leading-relaxed">
                For questions regarding patient records or privacy practices:
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
          {/* POLICY BODY DOCUMENT                                                    */}
          {/* ======================================================================= */}
          <main className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-10">
            
            {/* SECTION 04 — POLICY INTRODUCTION */}
            <section className="space-y-4 border-b border-slate-100 pb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Privacy at Sarphi Hospital
              </h2>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Sarphi Hospital respects the privacy of visitors to its website and aims to handle personal information responsibly. This Privacy Policy describes the types of information that may be collected through this website, how that information may be used, and the choices available to users.
              </p>

              {/* Editable Information Block */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1 text-xs text-slate-600">
                <p>
                  <strong>Effective Date:</strong>{' '}
                  <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-mono text-[11px]">
                    [Insert Date]
                  </span>
                </p>
                <p>
                  <strong>Last Updated:</strong>{' '}
                  <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-mono text-[11px]">
                    [Insert Date]
                  </span>
                </p>
              </div>
            </section>

            {/* SECTION 05 — 1. INFORMATION WE COLLECT */}
            <section id="sec-1" className="space-y-3.5 scroll-mt-28">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-[#EBF4F7] text-[#0B4F6C] text-xs font-bold flex items-center justify-center shrink-0">
                  1
                </span>
                <span>Information We Collect</span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Information may be collected when users voluntarily submit it through website forms. This includes:
              </p>

              <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-slate-600 pl-2">
                <li><strong>Name:</strong> To identify and address you appropriately.</li>
                <li><strong>Phone Number:</strong> To contact you regarding appointment confirmations or enquiry responses.</li>
                <li><strong>Email Address:</strong> When provided, to send digital communication regarding your enquiry.</li>
                <li><strong>Appointment-Related Information:</strong> Selected department, preferred doctor, preferred date, and preferred time slot.</li>
                <li><strong>Enquiry Details:</strong> General descriptions of your enquiry or assistance needed.</li>
                <li><strong>Information Submitted Through Contact Forms:</strong> Communications transmitted through website contact interfaces.</li>
              </ul>

              <p className="text-xs text-slate-500 italic pt-1">
                Please note: The public website does not collect confidential medical histories, diagnostic imaging files, or electronic patient health records unless an official authorized portal is deployed.
              </p>

              <div className="p-3 rounded-lg bg-slate-100 border border-slate-200 text-[11px] text-slate-600 font-mono">
                [Customize this section according to the actual website forms and data collection practices.]
              </div>
            </section>

            {/* SECTION 06 — 2. HOW WE USE YOUR INFORMATION */}
            <section id="sec-2" className="space-y-3.5 scroll-mt-28 pt-6 border-t border-slate-100">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-[#EBF4F7] text-[#0B4F6C] text-xs font-bold flex items-center justify-center shrink-0">
                  2
                </span>
                <span>How We Use Your Information</span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Personal information collected through this website is used solely for legitimate healthcare coordination and communication purposes, including:
              </p>

              <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-slate-600 pl-2">
                <li>Responding to enquiries submitted through our website contact forms.</li>
                <li>Contacting users about appointment requests and scheduling availability.</li>
                <li>Providing requested information about Sarphi Hospital facilities and departments.</li>
                <li>Communicating about hospital services and doctor consultation hours.</li>
                <li>Improving website functionality, readability, and performance.</li>
                <li>Maintaining website security and preventing fraudulent submissions.</li>
              </ul>

              <p className="text-xs text-slate-600">
                Sarphi Hospital does not use personal information collected through this website for third-party commercial advertising, telemarketing, or behavioral profiling.
              </p>
            </section>

            {/* SECTION 07 — 3. APPOINTMENT INFORMATION */}
            <section id="sec-3" className="space-y-3.5 scroll-mt-28 pt-6 border-t border-slate-100">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-[#EBF4F7] text-[#0B4F6C] text-xs font-bold flex items-center justify-center shrink-0">
                  3
                </span>
                <span>Appointment & Enquiry Information</span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Information submitted through appointment or enquiry forms may be used to respond to the user's request and coordinate communication regarding the requested service or appointment.
              </p>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Appointment requests made through the website represent scheduling inquiries and are subject to doctor availability and hospital confirmation.
              </p>

              <p className="text-xs sm:text-sm text-slate-600 font-medium bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                The website should not be used to submit highly sensitive medical information unless the hospital provides an appropriate secure channel for doing so.
              </p>
            </section>

            {/* SECTION 08 — 4. MEDICAL INFORMATION & SENSITIVE DATA (WARNING BOX) */}
            <section id="sec-4" className="space-y-3.5 scroll-mt-28 pt-6 border-t border-slate-100">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-[#EBF4F7] text-[#0B4F6C] text-xs font-bold flex items-center justify-center shrink-0">
                  4
                </span>
                <span>Medical Information & Sensitive Data</span>
              </h2>

              {/* High-Visibility Warning Box */}
              <div className="bg-amber-50/80 border-2 border-amber-200 rounded-2xl p-5 sm:p-6 space-y-3 text-amber-950">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-amber-900">
                    Important Patient Notice Regarding Sensitive Health Data
                  </h3>
                </div>

                <p className="text-xs sm:text-sm leading-relaxed">
                  Please do not submit confidential medical records, detailed medical history, financial information or other sensitive personal information through a general website contact form unless Sarphi Hospital specifically instructs you to do so through a secure system.
                </p>

                <div className="pt-2 border-t border-amber-200/80 text-xs sm:text-sm leading-relaxed space-y-2">
                  <p>
                    <strong>For medical emergencies or urgent healthcare needs, contact the hospital directly or use appropriate local emergency services.</strong>
                  </p>
                  <p className="flex items-center gap-2 text-xs font-bold">
                    <span>Direct Casualty Hotline:</span>
                    <a href={`tel:${HOSPITAL_CONTACT.phoneEmergency}`} className="text-rose-700 hover:underline">
                      {HOSPITAL_CONTACT.phoneEmergency}
                    </a>
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 09 — 5. COOKIES & WEBSITE TECHNOLOGIES */}
            <section id="sec-5" className="space-y-3.5 scroll-mt-28 pt-6 border-t border-slate-100">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-[#EBF4F7] text-[#0B4F6C] text-xs font-bold flex items-center justify-center shrink-0">
                  5
                </span>
                <span>Cookies & Website Technologies</span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                The website may use cookies or similar technologies to support essential website functionality, understand website usage and improve the user experience.
              </p>

              <div className="space-y-3 pt-2">
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
                  <h3 className="text-xs font-bold text-slate-900">Essential Cookies</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Used for core website functionality, such as responsive page navigation, session management, and form token protection.
                  </p>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
                  <h3 className="text-xs font-bold text-slate-900">Analytics Cookies</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Only included if analytics tools are actually installed to help understand anonymous page views and improve website accessibility.
                  </p>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
                  <h3 className="text-xs font-bold text-slate-900">Preference Cookies</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Only included if the website stores user preferences, such as selected language or accessibility display options.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-100 border border-slate-200 text-[11px] text-slate-600 font-mono">
                [List actual cookies and tracking technologies used by the website.]
              </div>
            </section>

            {/* SECTION 10 — 6. THIRD-PARTY SERVICES */}
            <section id="sec-6" className="space-y-3.5 scroll-mt-28 pt-6 border-t border-slate-100">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-[#EBF4F7] text-[#0B4F6C] text-xs font-bold flex items-center justify-center shrink-0">
                  6
                </span>
                <span>Third-Party Services</span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                The website may integrate third-party services where applicable to facilitate visitor convenience and communication. Examples include:
              </p>

              <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-slate-600 pl-2">
                <li><strong>Google Maps:</strong> Used to display interactive geographic location and driving directions to Memco More, Dhanbad.</li>
                <li><strong>Website Hosting & CDN:</strong> Secure server infrastructure utilized to host and deliver web pages to users.</li>
                <li><strong>Email Services:</strong> Mail server relays used to route visitor enquiries to hospital receptionists.</li>
                <li><strong>Spam Protection:</strong> Automated tools to safeguard contact forms from automated spam submissions.</li>
              </ul>

              <div className="p-3 rounded-lg bg-slate-100 border border-slate-200 text-[11px] text-slate-600 font-mono">
                [Insert verified third-party services used by Sarphi Hospital.]
              </div>
            </section>

            {/* SECTION 11 — 7. HOW INFORMATION MAY BE SHARED */}
            <section id="sec-7" className="space-y-3.5 scroll-mt-28 pt-6 border-t border-slate-100">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-[#EBF4F7] text-[#0B4F6C] text-xs font-bold flex items-center justify-center shrink-0">
                  7
                </span>
                <span>How Information May Be Shared</span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Personal information may be shared only where necessary for legitimate operational purposes, service providers who assist in operating the hospital's communications, or where required by applicable laws, statutory orders, or healthcare regulatory authorities in Jharkhand, India.
              </p>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Sarphi Hospital does not sell, rent, or trade personal data to marketing organizations.
              </p>

              <div className="p-3 rounded-lg bg-slate-100 border border-slate-200 text-[11px] text-slate-600 font-mono">
                [Add verified data-sharing practices.]
              </div>
            </section>

            {/* SECTION 12 — 8. DATA SECURITY */}
            <section id="sec-8" className="space-y-3.5 scroll-mt-28 pt-6 border-t border-slate-100">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-[#EBF4F7] text-[#0B4F6C] text-xs font-bold flex items-center justify-center shrink-0">
                  8
                </span>
                <span>Data Security</span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Sarphi Hospital takes reasonable steps to protect information submitted through the website against unauthorized access, misuse or disclosure. This includes utilizing transport layer security (HTTPS) encryption and administrative access limits for communication records.
              </p>

              <p className="text-xs text-slate-500 italic">
                While we take reasonable technical precautions, please be aware that no electronic transmission over the internet or computerized storage method can be guaranteed completely immune from unauthorized interception.
              </p>

              <div className="p-3 rounded-lg bg-slate-100 border border-slate-200 text-[11px] text-slate-600 font-mono">
                [Describe actual technical and organizational security measures if approved by the hospital.]
              </div>
            </section>

            {/* SECTION 13 — 9. DATA RETENTION */}
            <section id="sec-9" className="space-y-3.5 scroll-mt-28 pt-6 border-t border-slate-100">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-[#EBF4F7] text-[#0B4F6C] text-xs font-bold flex items-center justify-center shrink-0">
                  9
                </span>
                <span>Data Retention</span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Personal information may be retained for as long as necessary to fulfill the purpose for which it was collected, meet operational requirements or comply with applicable legal obligations.
              </p>

              <div className="p-3 rounded-lg bg-slate-100 border border-slate-200 text-[11px] text-slate-600 font-mono">
                [Insert the hospital's approved retention period or retention policy.]
              </div>
            </section>

            {/* SECTION 14 — 10. YOUR PRIVACY CHOICES */}
            <section id="sec-10" className="space-y-3.5 scroll-mt-28 pt-6 border-t border-slate-100">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-[#EBF4F7] text-[#0B4F6C] text-xs font-bold flex items-center justify-center shrink-0">
                  10
                </span>
                <span>Your Privacy Choices</span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Depending on applicable legal provisions, visitors who have submitted personal information through this website may have the right to:
              </p>

              <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-slate-600 pl-2">
                <li>Request information about their submitted data.</li>
                <li>Request correction of inaccurate or outdated contact information.</li>
                <li>Ask questions about how their submitted information is processed.</li>
                <li>Request deletion of their communication records where legally permissible and operationally feasible.</li>
              </ul>

              <div className="p-3 rounded-lg bg-slate-100 border border-slate-200 text-[11px] text-slate-600 font-mono">
                [Insert the hospital's approved privacy-contact procedure.]
              </div>
            </section>

            {/* SECTION 15 — 11. CHILDREN'S PRIVACY */}
            <section id="sec-11" className="space-y-3.5 scroll-mt-28 pt-6 border-t border-slate-100">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-[#EBF4F7] text-[#0B4F6C] text-xs font-bold flex items-center justify-center shrink-0">
                  11
                </span>
                <span>Children’s Privacy</span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Sarphi Hospital does not knowingly collect personal information directly from minors through this website without parental or guardian oversight. Where paediatric appointments are requested, information should be submitted by the child's parent, attendant, or legal guardian.
              </p>

              <div className="p-3 rounded-lg bg-slate-100 border border-slate-200 text-[11px] text-slate-600 font-mono">
                [Insert Sarphi Hospital's approved children's privacy statement.]
              </div>
            </section>

            {/* SECTION 16 — 12. EXTERNAL WEBSITES */}
            <section id="sec-12" className="space-y-3.5 scroll-mt-28 pt-6 border-t border-slate-100">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-[#EBF4F7] text-[#0B4F6C] text-xs font-bold flex items-center justify-center shrink-0">
                  12
                </span>
                <span>External Websites</span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                The Sarphi Hospital website may contain links to external websites or third-party services (such as Google Maps or official regulatory portals). Sarphi Hospital's Privacy Policy does not necessarily apply to those external websites. Users should review the privacy policies of external websites before submitting personal information.
              </p>
            </section>

            {/* SECTION 17 — 13. CHANGES TO THIS PRIVACY POLICY */}
            <section id="sec-13" className="space-y-3.5 scroll-mt-28 pt-6 border-t border-slate-100">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-[#EBF4F7] text-[#0B4F6C] text-xs font-bold flex items-center justify-center shrink-0">
                  13
                </span>
                <span>Changes to This Privacy Policy</span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Sarphi Hospital may update this Privacy Policy from time to time to reflect changes in website functionality, operational practices or applicable requirements. The updated version will be published on this page with the revised date where appropriate.
              </p>
            </section>

            {/* SECTION 18 — CONTACT ABOUT PRIVACY (HIGHLIGHTED CARD) */}
            <section id="sec-14" className="scroll-mt-28 pt-6 border-t border-slate-100">
              <div className="bg-[#EBF4F7]/70 rounded-2xl border border-[#1995AD]/30 p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-2 text-[#0B4F6C]">
                  <HelpCircle className="w-5 h-5 text-[#1995AD]" />
                  <h3 className="text-lg font-bold text-slate-900">
                    Questions About Privacy?
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  If you have questions about this Privacy Policy or how information submitted through the website is handled, please contact Sarphi Hospital.
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
      {/* SECTION 19 — RELATED LINKS                                                */}
      {/* ========================================================================= */}
      <section className="max-w-[1000px] mx-auto px-4 sm:px-6">
        <h2 className="sr-only">Related Hospital Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Card 1: Terms */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-2 hover:border-[#1995AD]/40 transition-colors shadow-2xs">
            <h3 className="text-sm font-bold text-slate-900">Terms & Conditions</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Read the website's terms of use.
            </p>
            <button
              onClick={() => onNavigate('terms')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#0B4F6C] hover:underline pt-1 cursor-pointer"
            >
              <span>View Terms</span>
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
      {/* SECTION 20 — FINAL CTA                                                    */}
      {/* ========================================================================= */}
      <section className="max-w-[1000px] mx-auto px-4 sm:px-6">
        <div className="bg-[#0B4F6C] text-white rounded-3xl p-6 sm:p-10 shadow-sm text-center space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            Need Assistance?
          </h2>

          <p className="text-xs sm:text-sm text-slate-200 max-w-lg mx-auto leading-relaxed">
            For healthcare enquiries, appointments or general information, contact Sarphi Hospital.
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
