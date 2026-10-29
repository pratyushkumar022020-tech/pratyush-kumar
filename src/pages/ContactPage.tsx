import React, { useState } from 'react';
import { 
  Phone, Mail, MapPin, Clock, Calendar, CheckCircle2, AlertCircle, 
  Send, ArrowRight, ChevronDown, ChevronUp, ShieldAlert, Building2, 
  ShieldCheck, MessageSquare, ExternalLink, HeartPulse, User, AtSign, 
  FileText, Info, HelpCircle, Cake, Sparkles
} from 'lucide-react';
import { HOSPITAL_CONTACT, DEPARTMENTS } from '../data/hospitalData';
import { Page } from '../types';
import { ClinicalVisual } from '../components/VisualFallback';
import { useCms } from '../context/CmsContext';

interface ContactPageProps {
  onNavigate: (page: Page) => void;
  onOpenAppointmentModal: (doctorId?: string, departmentId?: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ 
  onNavigate, 
  onOpenAppointmentModal 
}) => {
  const { config, addLead } = useCms();
  const hospital = config?.hospital || HOSPITAL_CONTACT;
  const targetEmail = config?.leadRecipientEmail || 'roadydigital@gmail.com';
  const availableDepartments = config?.departments?.length ? config.departments : DEPARTMENTS;

  // Form State - Lead capture fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('General Medicine');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('Morning (10:00 AM - 01:00 PM)');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);

  // Form Validation & Status
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [lastSubmittedLead, setLastSubmittedLead] = useState<{
    name: string;
    phone: string;
    email: string;
    service: string;
    dateOfBirth: string;
    preferredDate?: string;
    preferredTime?: string;
    message?: string;
  } | null>(null);

  // Helper to calculate age from Date of Birth
  const calculateAge = (dobString: string): number | null => {
    if (!dobString) return null;
    try {
      const birth = new Date(dobString);
      const today = new Date();
      let age = today.getFullYear() - birth.getFullYear();
      const m = today.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--;
      }
      return age >= 0 ? age : null;
    } catch {
      return null;
    }
  };

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Please enter your full name (पूरा नाम दर्ज करें)';
    }

    const cleanPhone = phone.replace(/[\s-]/g, '');
    if (!cleanPhone) {
      newErrors.phone = 'Please enter your phone number (फ़ोन नंबर दर्ज करें)';
    } else if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      newErrors.phone = 'Please enter a valid 10-digit Indian mobile number';
    }

    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!dateOfBirth) {
      newErrors.dateOfBirth = 'Please select Date of Birth (जन्म तिथि चुनें)';
    }

    if (!consent) {
      newErrors.consent = 'You must agree to the Privacy Policy to proceed';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError(false);

    try {
      const leadPayload = {
        name: fullName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        service: department,
        dateOfBirth: dateOfBirth,
        preferredDate: preferredDate || undefined,
        preferredTime: preferredTime || undefined,
        message: message.trim() || undefined
      };

      // Store in CMS and dispatch email to roadydigital@gmail.com
      await addLead(leadPayload);

      setLastSubmittedLead(leadPayload);
      setIsSubmitting(false);
      setSubmitted(true);
    } catch (err) {
      console.error('Lead submission error', err);
      setIsSubmitting(false);
      setSubmitError(true);
    }
  };

  const handleResetForm = () => {
    setFullName('');
    setPhone('');
    setEmail('');
    setDepartment('General Medicine');
    setDateOfBirth('');
    setPreferredDate('');
    setPreferredTime('Morning (10:00 AM - 01:00 PM)');
    setMessage('');
    setConsent(false);
    setErrors({});
    setSubmitted(false);
    setSubmitError(false);
    setLastSubmittedLead(null);
  };

  // Section 11: Contact FAQs
  const contactFaqs = [
    {
      q: 'Where is Sarphi Hospital located?',
      a: 'Sarphi Hospital is located at Memco More, Near GT Road By-pass, Dhanbad, Jharkhand, Pin - 826004, India. It is situated right at the Memco More traffic junction with convenient road connectivity from Dhanbad Railway Station (4.2 km), Steel Gate / Saraidhela (2.8 km), and Bank More (5.5 km).'
    },
    {
      q: 'How can I contact Sarphi Hospital?',
      a: `You can call our primary reception desk at ${hospital.phonePrimary} or landline at ${hospital.phoneReception}. For email correspondence, reach us at ${hospital.email}. For immediate trauma emergencies, dial our 24×7 casualty hotline at ${hospital.phoneEmergency}.`
    },
    {
      q: 'How can I request an appointment?',
      a: 'You can submit the appointment enquiry form on this page, call our reception directly at ' + hospital.phonePrimary + ', or use the online "Book an Appointment" option at the top of the website to select your department and doctor.'
    },
    {
      q: 'Can I choose a specific doctor?',
      a: "Yes. Doctor availability depends on the hospital's current consultation schedule and operating duties. You can view our verified doctors and their chamber timings on the Doctors page, or inquire with our reception team when booking."
    },
    {
      q: 'What services are available at Sarphi Hospital?',
      a: 'Sarphi Hospital provides General Medicine, Emergency Care, General & Laparoscopic Surgery, Obstetrics & Gynaecology (Maternity Care), Paediatrics & Child Health, Orthopaedics & Trauma, Digital Radiography (X-Ray), Automated Pathology Laboratory, and a 24×7 In-House Pharmacy.',
      hasServicesCta: true
    },
    {
      q: 'What are the hospital visiting hours?',
      a: `Inpatient visiting hours for General and Private Wards are Morning: 11:00 AM – 12:00 PM and Evening: 05:00 PM – 07:00 PM daily. Emergency triage and patient admissions remain open 24 hours a day, 7 days a week.`
    }
  ];

  return (
    <div className="space-y-16 md:space-y-24 pb-16">
      {/* ========================================================================= */}
      {/* SECTION 03 — CONTACT HERO                                                 */}
      {/* ========================================================================= */}
      <section className="pt-6 md:pt-10" aria-labelledby="contact-hero-title">
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
            <span className="text-[#0B4F6C] font-semibold">Contact Us</span>
          </nav>

          <div className="bg-gradient-to-br from-[#EBF4F7] via-[#F0F7F9] to-white rounded-3xl p-8 sm:p-12 border border-[#1995AD]/20 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Hero Copy */}
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-[#0B4F6C] text-xs font-semibold border border-[#1995AD]/30 shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-[#1995AD] animate-pulse" />
                  <span className="tracking-wide uppercase font-bold">GET IN TOUCH</span>
                </div>

                <h1 
                  id="contact-hero-title"
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-[1.18]"
                >
                  We’re Here to Help
                </h1>

                <p className="text-base sm:text-lg text-slate-600 leading-relaxed text-pretty">
                  Contact Sarphi Hospital for appointments, healthcare enquiries, service information and general assistance.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                  <a
                    href={`tel:${HOSPITAL_CONTACT.phonePrimary}`}
                    className="px-7 py-3.5 rounded-xl bg-[#0B4F6C] hover:bg-[#08384D] active:scale-[0.98] text-white text-sm font-semibold shadow-md transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                  >
                    <Phone className="w-4 h-4 text-[#1995AD]" />
                    <span>Call Hospital</span>
                  </a>

                  <a
                    href="#appointment-form"
                    className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <Calendar className="w-4 h-4 text-[#0B4F6C]" />
                    <span>Book an Appointment</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Hero Visual Graphic */}
              <div className="lg:col-span-5">
                <ClinicalVisual
                  type="reception"
                  className="h-64 sm:h-80 w-full shadow-sm"
                  title="Central Reception & Patient Help Desk"
                  badge="Memco More, Dhanbad"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 04 — QUICK CONTACT CARDS                                          */}
      {/* ========================================================================= */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6" aria-labelledby="quick-contact-title">
        <h2 id="quick-contact-title" className="sr-only">Quick Contact Methods</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* CARD 01 — LOCATION */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 flex flex-col justify-between shadow-xs hover:border-[#1995AD]/40 hover:shadow-md transition-all duration-200">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#EBF4F7] text-[#0B4F6C] flex items-center justify-center shadow-2xs">
                <MapPin className="w-6 h-6 text-[#1995AD]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Visit Us</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Memco More, Dhanbad, Jharkhand, India
                </p>
              </div>
            </div>
            <div className="pt-4 mt-2 border-t border-slate-100">
              <a
                href="#location-map"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B4F6C] hover:text-[#08384D] hover:underline cursor-pointer"
              >
                <span>Get Directions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* CARD 02 — PHONE */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 flex flex-col justify-between shadow-xs hover:border-[#1995AD]/40 hover:shadow-md transition-all duration-200">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#EBF4F7] text-[#0B4F6C] flex items-center justify-center shadow-2xs">
                <Phone className="w-6 h-6 text-[#1995AD]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Call Us</h3>
                <p className="text-xs font-bold text-[#0B4F6C] mt-1">
                  {HOSPITAL_CONTACT.phonePrimary}
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Reception: {HOSPITAL_CONTACT.phoneReception}
                </p>
              </div>
            </div>
            <div className="pt-4 mt-2 border-t border-slate-100">
              <a
                href={`tel:${HOSPITAL_CONTACT.phonePrimary}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B4F6C] hover:text-[#08384D] hover:underline cursor-pointer"
              >
                <span>Call Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* CARD 03 — EMAIL */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 flex flex-col justify-between shadow-xs hover:border-[#1995AD]/40 hover:shadow-md transition-all duration-200">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#EBF4F7] text-[#0B4F6C] flex items-center justify-center shadow-2xs">
                <Mail className="w-6 h-6 text-[#1995AD]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Email Us</h3>
                <p className="text-xs font-medium text-slate-700 mt-1 break-all">
                  {HOSPITAL_CONTACT.email}
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Patient Inquiries & Reports
                </p>
              </div>
            </div>
            <div className="pt-4 mt-2 border-t border-slate-100">
              <a
                href={`mailto:${HOSPITAL_CONTACT.email}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B4F6C] hover:text-[#08384D] hover:underline cursor-pointer"
              >
                <span>Send Email</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* CARD 04 — APPOINTMENT */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 flex flex-col justify-between shadow-xs hover:border-[#1995AD]/40 hover:shadow-md transition-all duration-200">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#EBF4F7] text-[#0B4F6C] flex items-center justify-center shadow-2xs">
                <Calendar className="w-6 h-6 text-[#1995AD]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Appointments</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Request an appointment with Sarphi Hospital.
                </p>
              </div>
            </div>
            <div className="pt-4 mt-2 border-t border-slate-100">
              <a
                href="#appointment-form"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B4F6C] hover:text-[#08384D] hover:underline cursor-pointer"
              >
                <span>Book Appointment</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 05 — CONTACT & APPOINTMENT FORM                                   */}
      {/* ========================================================================= */}
      <section 
        id="appointment-form"
        className="max-w-[1200px] mx-auto px-4 sm:px-6 scroll-mt-24"
        aria-labelledby="contact-section-title"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* LEFT SIDE — CONTACT INFORMATION */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#0B4F6C] uppercase tracking-wider">
                CONTACT SARPHI HOSPITAL
              </span>
              <h2 id="contact-section-title" className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                How Can We Help You?
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Whether you need information about a healthcare service, doctor availability or an appointment, get in touch with Sarphi Hospital.
              </p>
            </div>

            {/* Structured Contact Details Panel */}
            <div className="space-y-4 pt-2">
              {/* Phone Detail */}
              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="w-10 h-10 rounded-lg bg-[#EBF4F7] text-[#0B4F6C] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-[#1995AD]" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Phone</span>
                  <a href={`tel:${HOSPITAL_CONTACT.phonePrimary}`} className="text-xs sm:text-sm font-bold text-slate-900 hover:text-[#0B4F6C] block">
                    {HOSPITAL_CONTACT.phonePrimary} (Primary OPD)
                  </a>
                  <span className="text-xs text-slate-600 block">
                    Reception: {HOSPITAL_CONTACT.phoneReception}
                  </span>
                </div>
              </div>

              {/* Email Detail */}
              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="w-10 h-10 rounded-lg bg-[#EBF4F7] text-[#0B4F6C] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-[#1995AD]" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Email</span>
                  <a href={`mailto:${HOSPITAL_CONTACT.email}`} className="text-xs sm:text-sm font-bold text-slate-900 hover:text-[#0B4F6C] block break-all">
                    {HOSPITAL_CONTACT.email}
                  </a>
                  <span className="text-xs text-slate-600 block">
                    Appointments: {HOSPITAL_CONTACT.appointmentEmail}
                  </span>
                </div>
              </div>

              {/* Address Detail */}
              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="w-10 h-10 rounded-lg bg-[#EBF4F7] text-[#0B4F6C] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#1995AD]" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Address</span>
                  <p className="text-xs sm:text-sm font-bold text-slate-900">
                    Memco More, Dhanbad, Jharkhand, India
                  </p>
                  <p className="text-xs text-slate-600">
                    {HOSPITAL_CONTACT.address}
                  </p>
                </div>
              </div>

              {/* Working / Visiting Hours Detail */}
              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="w-10 h-10 rounded-lg bg-[#EBF4F7] text-[#0B4F6C] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-[#1995AD]" />
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Working / Visiting Hours</span>
                  <div className="text-xs text-slate-700 space-y-0.5">
                    <p><strong>OPD Consultations:</strong> {HOSPITAL_CONTACT.opdHours}</p>
                    <p><strong>Inpatient Visiting:</strong> {HOSPITAL_CONTACT.visitingHours}</p>
                    <p><strong>Emergency & Casualty:</strong> 24 Hours Open</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE — APPOINTMENT / LEAD ENQUIRY FORM */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs">
              {submitted && lastSubmittedLead ? (
                /* FORM SUCCESS STATE */
                <div className="py-6 space-y-6" role="status" aria-live="polite">
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-xs">
                      <CheckCircle2 className="w-9 h-9" />
                    </div>

                    <div>
                      <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider bg-emerald-100/70 px-3 py-1 rounded-full inline-block mb-1">
                        लीड सफलतापूर्वक दर्ज हुई (Lead Delivered)
                      </span>
                      <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                        Thank You, {lastSubmittedLead.name}!
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1 max-w-md mx-auto">
                        आपकी पूछताछ व विवरण सफलतापूर्वक <strong className="text-[#0B4F6C] font-semibold">{targetEmail}</strong> पर भेज दिया गया है। हमारी हॉस्पिटल टीम शीघ्र आपसे संपर्क करेगी।
                      </p>
                    </div>
                  </div>

                  {/* Summary Receipt Card */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
                      <span className="font-bold text-slate-700 flex items-center gap-1.5">
                        <FileText className="w-4 h-4 text-[#0B4F6C]" />
                        <span>Submitted Details Summary</span>
                      </span>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        Forwarded to Email
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-slate-700">
                      <div>
                        <span className="text-slate-500 block text-[11px]">Patient / Inquirer:</span>
                        <strong className="text-slate-900 font-semibold">{lastSubmittedLead.name}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[11px]">Phone Number:</span>
                        <strong className="text-slate-900 font-semibold">{lastSubmittedLead.phone}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[11px]">Email Address:</span>
                        <span className="text-slate-800">{lastSubmittedLead.email || 'Not provided'}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[11px]">Service / Department:</span>
                        <strong className="text-[#0B4F6C] font-semibold">{lastSubmittedLead.service}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[11px]">Date of Birth (जन्म तिथि):</span>
                        <span className="text-slate-900 font-semibold">
                          {lastSubmittedLead.dateOfBirth} 
                          {calculateAge(lastSubmittedLead.dateOfBirth) !== null && ` (Age: ${calculateAge(lastSubmittedLead.dateOfBirth)} yrs)`}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[11px]">Preferred Consultation:</span>
                        <span className="text-slate-800">
                          {lastSubmittedLead.preferredDate ? `${lastSubmittedLead.preferredDate} (${lastSubmittedLead.preferredTime || 'Anytime'})` : 'Flexible'}
                        </span>
                      </div>
                    </div>

                    {lastSubmittedLead.message && (
                      <div className="pt-2 border-t border-slate-200/60">
                        <span className="text-slate-500 block text-[11px]">Message / Health Query:</span>
                        <p className="text-slate-800 italic mt-0.5">{lastSubmittedLead.message}</p>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <a
                      href={`mailto:${targetEmail}?subject=${encodeURIComponent(`New Lead: ${lastSubmittedLead.name} - ${lastSubmittedLead.service}`)}&body=${encodeURIComponent(
                        `Patient Name: ${lastSubmittedLead.name}\nPhone: ${lastSubmittedLead.phone}\nEmail: ${lastSubmittedLead.email}\nService: ${lastSubmittedLead.service}\nDate of Birth: ${lastSubmittedLead.dateOfBirth}\nPreferred Date: ${lastSubmittedLead.preferredDate || 'N/A'}\nMessage: ${lastSubmittedLead.message || 'N/A'}`
                      )}`}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#0B4F6C] hover:bg-[#08384D] text-white text-xs font-semibold shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#1995AD]" />
                      <span>Open in Gmail / Email</span>
                    </a>

                    <a
                      href={`tel:${hospital.phonePrimary}`}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#0B4F6C]" />
                      <span>Call Hospital ({hospital.phonePrimary})</span>
                    </a>

                    <button
                      onClick={handleResetForm}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold cursor-pointer transition-colors"
                    >
                      Submit Another Enquiry
                    </button>
                  </div>
                </div>
              ) : submitError ? (
                /* FORM ERROR STATE */
                <div className="text-center py-10 space-y-5" role="alert">
                  <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center mx-auto shadow-xs">
                    <AlertCircle className="w-9 h-9" />
                  </div>

                  <div className="space-y-2 max-w-md mx-auto">
                    <h3 className="text-2xl font-bold text-slate-900">Unable to Submit</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      We couldn't submit your request right now. Please try again or contact the hospital directly at {hospital.phonePrimary}.
                    </p>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={`tel:${hospital.phonePrimary}`}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#0B4F6C] hover:bg-[#08384D] text-white text-xs font-semibold cursor-pointer shadow-xs transition-colors flex items-center justify-center gap-2"
                    >
                      <Phone className="w-4 h-4 text-[#1995AD]" />
                      <span>Call Hospital</span>
                    </a>

                    <button
                      onClick={() => setSubmitError(false)}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold cursor-pointer transition-colors"
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              ) : (
                /* MAIN LEAD CAPTURE FORM */
                <form onSubmit={handleFormSubmit} noValidate className="space-y-5">
                  <div className="border-b border-slate-100 pb-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                      <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                        Lead & Appointment Enquiry Form
                      </h3>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-[11px] font-semibold">
                        <Mail className="w-3 h-3 text-sky-600" />
                        <span>Direct to: {targetEmail}</span>
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">
                      कृपया अपना विवरण भरें। यह जानकारी सीधे हमारे हॉस्पिटल कोऑर्डिनेटर (<span className="text-[#0B4F6C] font-semibold">{targetEmail}</span>) के पास सुरक्षित पहुँचेगी।
                    </p>
                  </div>

                  {/* Field: Full Name */}
                  <div className="space-y-1.5">
                    <label htmlFor="fullName" className="text-xs font-bold text-slate-700 flex items-center justify-between">
                      <span>Full Name (पूरा नाम) <span className="text-rose-600">*</span></span>
                      <span className="text-[11px] text-slate-400 font-normal">As per Govt ID</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        id="fullName"
                        type="text"
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                          if (errors.fullName) setErrors(prev => ({ ...prev, fullName: '' }));
                        }}
                        placeholder="e.g. Ramesh Kumar"
                        aria-required="true"
                        aria-invalid={!!errors.fullName}
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs border ${
                          errors.fullName ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300 bg-white'
                        } text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0B4F6C] transition-all`}
                      />
                    </div>
                    {errors.fullName && (
                      <p className="text-[11px] text-rose-600 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.fullName}</span>
                      </p>
                    )}
                  </div>

                  {/* Grid: Phone & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Field: Phone Number */}
                    <div className="space-y-1.5">
                      <label htmlFor="phone" className="text-xs font-bold text-slate-700 block">
                        Phone Number (फ़ोन नंबर) <span className="text-rose-600">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                        <input
                          id="phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value);
                            if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
                          }}
                          placeholder="e.g. 98765 43210"
                          aria-required="true"
                          aria-invalid={!!errors.phone}
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs border ${
                            errors.phone ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300 bg-white'
                          } text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0B4F6C] transition-all`}
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-[11px] text-rose-600 flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.phone}</span>
                        </p>
                      )}
                    </div>

                    {/* Field: Email Address */}
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-xs font-bold text-slate-700 block">
                        Email Address (ईमेल एड्रेस)
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                        <input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                          }}
                          placeholder="e.g. patient@example.com"
                          aria-invalid={!!errors.email}
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs border ${
                            errors.email ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300 bg-white'
                          } text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0B4F6C] transition-all`}
                        />
                      </div>
                      {errors.email && (
                        <p className="text-[11px] text-rose-600 flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Grid: Service & Date of Birth */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Field: Select Service / Department */}
                    <div className="space-y-1.5">
                      <label htmlFor="department" className="text-xs font-bold text-slate-700 block">
                        Service / Department (सर्विस) <span className="text-rose-600">*</span>
                      </label>
                      <select
                        id="department"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl text-xs border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0B4F6C] transition-all cursor-pointer"
                      >
                        {availableDepartments.map((dept) => (
                          <option key={dept.id} value={dept.name}>
                            {dept.name}
                          </option>
                        ))}
                        <option value="General & Emergency Care">General & Emergency Care</option>
                        <option value="Diagnostics, Lab & X-Ray">Diagnostics, Lab & X-Ray</option>
                        <option value="Hospital Admission Enquiry">Hospital Admission Enquiry</option>
                        <option value="Other Medical Enquiry">Other Medical Enquiry</option>
                      </select>
                    </div>

                    {/* Field: Date of Birth */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label htmlFor="dateOfBirth" className="text-xs font-bold text-slate-700 block">
                          Date of Birth (डेट ऑफ बर्थ) <span className="text-rose-600">*</span>
                        </label>
                        {dateOfBirth && calculateAge(dateOfBirth) !== null && (
                          <span className="text-[11px] font-bold text-[#0B4F6C] bg-[#EBF4F7] px-2 py-0.5 rounded-md">
                            Age: {calculateAge(dateOfBirth)} yrs
                          </span>
                        )}
                      </div>
                      <div className="relative">
                        <input
                          id="dateOfBirth"
                          type="date"
                          max={new Date().toISOString().split('T')[0]}
                          value={dateOfBirth}
                          onChange={(e) => {
                            setDateOfBirth(e.target.value);
                            if (errors.dateOfBirth) setErrors(prev => ({ ...prev, dateOfBirth: '' }));
                          }}
                          aria-required="true"
                          aria-invalid={!!errors.dateOfBirth}
                          className={`w-full px-4 py-2.5 rounded-xl text-xs border ${
                            errors.dateOfBirth ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300 bg-white'
                          } text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0B4F6C] transition-all`}
                        />
                      </div>
                      {errors.dateOfBirth && (
                        <p className="text-[11px] text-rose-600 flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.dateOfBirth}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Grid: Preferred Consultation Date & Time (Optional) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Preferred Date */}
                    <div className="space-y-1.5">
                      <label htmlFor="preferredDate" className="text-xs font-bold text-slate-700 block">
                        Preferred Date (पसंदीदा तारीख - Optional)
                      </label>
                      <input
                        id="preferredDate"
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl text-xs border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0B4F6C] transition-all"
                      />
                    </div>

                    {/* Preferred Time */}
                    <div className="space-y-1.5">
                      <label htmlFor="preferredTime" className="text-xs font-bold text-slate-700 block">
                        Preferred Time (पसंदीदा समय)
                      </label>
                      <select
                        id="preferredTime"
                        value={preferredTime}
                        onChange={(e) => setPreferredTime(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl text-xs border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0B4F6C] transition-all cursor-pointer"
                      >
                        <option value="Morning (10:00 AM - 01:00 PM)">Morning (10:00 AM - 01:00 PM)</option>
                        <option value="Afternoon (01:00 PM - 04:00 PM)">Afternoon (01:00 PM - 04:00 PM)</option>
                        <option value="Evening (05:00 PM - 08:00 PM)">Evening (05:00 PM - 08:00 PM)</option>
                      </select>
                    </div>
                  </div>

                  {/* Field: Message */}
                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-xs font-bold text-slate-700 block">
                      Message / Health Concern (बीमारी या समस्या का विवरण)
                    </label>
                    <textarea
                      id="message"
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="लक्षण, पिछली बीमारी या कोई अन्य जानकारी जो आप डॉक्टर/हॉस्पिटल टीम से साझा करना चाहते हैं..."
                      className="w-full px-4 py-2.5 rounded-xl text-xs border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0B4F6C] transition-all resize-none"
                    />
                  </div>

                  {/* Field: Consent Checkbox */}
                  <div className="pt-1">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => {
                          setConsent(e.target.checked);
                          if (errors.consent) setErrors(prev => ({ ...prev, consent: '' }));
                        }}
                        className="mt-0.5 w-4 h-4 rounded text-[#0B4F6C] focus:ring-[#0B4F6C] border-slate-300 cursor-pointer"
                      />
                      <span className="text-[11px] sm:text-xs text-slate-600 leading-normal">
                        I agree to the{' '}
                        <button
                          type="button"
                          onClick={() => onNavigate('privacy')}
                          className="text-[#0B4F6C] font-semibold underline hover:text-[#08384D] cursor-pointer"
                        >
                          Privacy Policy
                        </button>{' '}
                        and consent to Sarphi Hospital forwarding this information to <strong className="text-slate-800">{targetEmail}</strong> to contact me.
                      </span>
                    </label>
                    {errors.consent && (
                      <p className="text-[11px] text-rose-600 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.consent}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-[#0B4F6C] hover:bg-[#08384D] active:scale-[0.99] disabled:opacity-70 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>ईमेल पर भेजा जा रहा है ({targetEmail})...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-[#1995AD]" />
                        <span>Submit Lead & Send to Email (लीड भेजें)</span>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-center text-slate-500">
                    🔒 सुरक्षित डेटा ट्रांसमिशन · तत्काल ईमेल नोटिफिकेशन: <strong>{targetEmail}</strong>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 06 — EMERGENCY CONTACT                                            */}
      {/* ========================================================================= */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="bg-rose-50 border-2 border-rose-200/80 rounded-3xl p-8 sm:p-10 shadow-xs relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold w-fit mx-auto md:mx-0">
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                <span>24×7 CASUALTY & AMBULANCE</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-rose-950 tracking-tight">
                Need Urgent Medical Assistance?
              </h2>

              <p className="text-xs sm:text-sm text-rose-900 max-w-xl leading-relaxed">
                For urgent medical assistance, contact Sarphi Hospital directly.
              </p>

              <p className="text-[11px] text-rose-700 italic pt-1">
                For life-threatening emergencies, use appropriate local emergency services.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <a
                href={`tel:${HOSPITAL_CONTACT.phoneEmergency}`}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-700 active:scale-[0.98] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2.5 cursor-pointer whitespace-nowrap"
              >
                <Phone className="w-4 h-4" />
                <span>Call Now: {HOSPITAL_CONTACT.phoneEmergency}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 07 — GOOGLE MAP / LOCATION                                        */}
      {/* ========================================================================= */}
      <section 
        id="location-map"
        className="max-w-[1200px] mx-auto px-4 sm:px-6 scroll-mt-24 space-y-6"
        aria-labelledby="map-section-title"
      >
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#0B4F6C] uppercase tracking-wider">
            OUR LOCATION
          </span>
          <h2 id="map-section-title" className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Find Sarphi Hospital
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Visit Sarphi Hospital at Memco More, Dhanbad, Jharkhand.
          </p>
        </div>

        {/* Large Google Maps Embed Card */}
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="w-full h-80 sm:h-96 md:h-[420px] bg-slate-100 relative">
            <iframe
              title="Sarphi Hospital Location at Memco More, Dhanbad"
              src="https://maps.google.com/maps?q=Memco+More,+Dhanbad,+Jharkhand&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>

          <div className="p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-0.5 text-center sm:text-left">
              <span className="text-xs font-bold text-slate-900 block">
                Sarphi Hospital & Healthcare Centre
              </span>
              <p className="text-xs text-slate-600">
                Memco More, Near GT Road By-pass, Dhanbad, Jharkhand, Pin - 826004
              </p>
            </div>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Memco+More,+Dhanbad,+Jharkhand"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-xl bg-[#0B4F6C] hover:bg-[#08384D] text-white text-xs font-semibold shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-colors whitespace-nowrap"
            >
              <span>Get Directions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 08 — HOW TO REACH US                                              */}
      {/* ========================================================================= */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-8" aria-labelledby="getting-here-title">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#0B4F6C] uppercase tracking-wider">
            TRANSIT & ACCESS
          </span>
          <h2 id="getting-here-title" className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Getting Here
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Simple steps to easily locate Sarphi Hospital at Memco More Chowk.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* STEP 01 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs relative">
            <div className="w-10 h-10 rounded-xl bg-[#0B4F6C] text-white font-bold text-sm flex items-center justify-center">
              01
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Find Memco More
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Memco More is a major junction on the GT Road By-pass in Dhanbad, well-known to auto-rickshaws, taxis, and ambulances arriving from Dhanbad Railway Station or Bank More.
            </p>
            <span className="text-[11px] font-semibold text-[#0B4F6C] block pt-2 border-t border-slate-100">
              Landmark: Memco More Traffic Point
            </span>
          </div>

          {/* STEP 02 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs relative">
            <div className="w-10 h-10 rounded-xl bg-[#0B4F6C] text-white font-bold text-sm flex items-center justify-center">
              02
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Locate Sarphi Hospital
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              The hospital building is clearly visible adjacent to Memco More with prominent bilingual directional signage, patient portico, and dedicated ambulance bays.
            </p>
            <span className="text-[11px] font-semibold text-[#0B4F6C] block pt-2 border-t border-slate-100">
              Direct Main Road Entrance
            </span>
          </div>

          {/* STEP 03 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs relative">
            <div className="w-10 h-10 rounded-xl bg-[#0B4F6C] text-white font-bold text-sm flex items-center justify-center">
              03
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Visit the Hospital
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Enter through the main front entrance for reception registration, OPD token guidance, and billing. For emergency triage, proceed directly to the Ground Floor casualty wing.
            </p>
            <span className="text-[11px] font-semibold text-[#0B4F6C] block pt-2 border-t border-slate-100">
              Wheelchair & Stretcher Ramps Available
            </span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 09 — CONTACT INFORMATION PANEL                                    */}
      {/* ========================================================================= */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6" aria-labelledby="detailed-info-title">
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-10 space-y-6">
          <div className="text-center sm:text-left">
            <span className="text-xs font-bold text-[#0B4F6C] uppercase tracking-wider block">
              OFFICIAL HOSPITAL DIRECTORY
            </span>
            <h2 id="detailed-info-title" className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
              Verified Contact Information
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {/* Item 1: Hospital Name & Legal */}
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-[#1995AD]" />
                <span>HOSPITAL</span>
              </span>
              <p className="text-sm font-bold text-slate-900">{HOSPITAL_CONTACT.name}</p>
              <p className="text-xs text-slate-600">{HOSPITAL_CONTACT.legalName}</p>
            </div>

            {/* Item 2: Address */}
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#1995AD]" />
                <span>ADDRESS</span>
              </span>
              <p className="text-xs text-slate-800 leading-relaxed font-medium">
                {HOSPITAL_CONTACT.address}
              </p>
            </div>

            {/* Item 3: Phone Numbers */}
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#1995AD]" />
                <span>PHONE</span>
              </span>
              <p className="text-xs text-slate-800">
                <strong>Primary:</strong> <a href={`tel:${HOSPITAL_CONTACT.phonePrimary}`} className="hover:underline text-[#0B4F6C] font-semibold">{HOSPITAL_CONTACT.phonePrimary}</a>
              </p>
              <p className="text-xs text-slate-800">
                <strong>Emergency:</strong> <a href={`tel:${HOSPITAL_CONTACT.phoneEmergency}`} className="hover:underline text-rose-700 font-semibold">{HOSPITAL_CONTACT.phoneEmergency}</a>
              </p>
            </div>

            {/* Item 4: Email */}
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#1995AD]" />
                <span>EMAIL</span>
              </span>
              <p className="text-xs text-slate-800">
                <a href={`mailto:${HOSPITAL_CONTACT.email}`} className="hover:underline text-[#0B4F6C] font-medium break-all">{HOSPITAL_CONTACT.email}</a>
              </p>
              <p className="text-xs text-slate-600">
                Appointments: {HOSPITAL_CONTACT.appointmentEmail}
              </p>
            </div>

            {/* Item 5: Hours */}
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#1995AD]" />
                <span>HOURS</span>
              </span>
              <p className="text-xs text-slate-800">
                <strong>OPD:</strong> {HOSPITAL_CONTACT.opdHours}
              </p>
              <p className="text-xs text-slate-800">
                <strong>Casualty:</strong> 24 Hours Open
              </p>
            </div>

            {/* Item 6: Appointments */}
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#1995AD]" />
                <span>APPOINTMENTS</span>
              </span>
              <p className="text-xs text-slate-800 leading-relaxed">
                Available via online appointment request, telephone booking, or walk-in registration at the front desk.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 10 — CONNECT WITH SARPHI HOSPITAL                                  */}
      {/* ========================================================================= */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xs">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <span className="text-xs font-bold text-[#0B4F6C] uppercase tracking-wider">
              VERIFIED CHANNELS
            </span>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Connect With Sarphi Hospital
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Official hospital helplines and patient communication channels for the Dhanbad community.
            </p>

            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <a
                href={`tel:${HOSPITAL_CONTACT.phonePrimary}`}
                className="p-4 rounded-xl bg-slate-50 hover:bg-[#EBF4F7] border border-slate-200 transition-colors flex flex-col items-center text-center space-y-2 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-white shadow-2xs flex items-center justify-center text-[#0B4F6C]">
                  <Phone className="w-5 h-5 text-[#1995AD]" />
                </div>
                <span className="text-xs font-bold text-slate-900">Hospital Reception</span>
                <span className="text-[11px] text-slate-500">{HOSPITAL_CONTACT.phonePrimary}</span>
              </a>

              <a
                href={`https://wa.me/918002234567?text=Hello%20Sarphi%20Hospital,%20I%20would%20like%20to%20inquire%20about%20OPD%20consultations.`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 transition-colors flex flex-col items-center text-center space-y-2 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-white shadow-2xs flex items-center justify-center text-emerald-600">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-900">WhatsApp Help Desk</span>
                <span className="text-[11px] text-slate-500">+91 80022 34567</span>
              </a>

              <a
                href={`mailto:${HOSPITAL_CONTACT.email}`}
                className="p-4 rounded-xl bg-slate-50 hover:bg-[#EBF4F7] border border-slate-200 transition-colors flex flex-col items-center text-center space-y-2 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-white shadow-2xs flex items-center justify-center text-[#0B4F6C]">
                  <Mail className="w-5 h-5 text-[#1995AD]" />
                </div>
                <span className="text-xs font-bold text-slate-900">Official Email</span>
                <span className="text-[11px] text-slate-500 break-all">{HOSPITAL_CONTACT.email}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 11 — FAQ                                                          */}
      {/* ========================================================================= */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-8" aria-labelledby="contact-faqs-title">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#0B4F6C] uppercase tracking-wider">
            CONTACT FAQ
          </span>
          <h2 id="contact-faqs-title" className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Helpful answers to common questions about contacting Sarphi Hospital, visiting, and scheduling consultations.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {contactFaqs.map((faq, index) => {
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
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50 space-y-3">
                    <p>{faq.a}</p>
                    {faq.hasServicesCta && (
                      <button
                        onClick={() => onNavigate('services')}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B4F6C] hover:underline cursor-pointer"
                      >
                        <span>View Services</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 12 — FINAL CTA                                                    */}
      {/* ========================================================================= */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="bg-[#0B4F6C] text-white rounded-3xl p-8 sm:p-12 shadow-sm text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-cyan-200 text-xs font-semibold">
            <Building2 className="w-3.5 h-3.5 text-cyan-300" />
            <span>Dedicated Healthcare in Dhanbad</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
            Have a Question? We’re Here to Help.
          </h2>

          <p className="text-xs sm:text-base text-slate-200 max-w-xl mx-auto leading-relaxed">
            Contact Sarphi Hospital for appointments, service information and general enquiries.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <a
              href={`tel:${HOSPITAL_CONTACT.phonePrimary}`}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-[#0B4F6C] font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
            >
              <Phone className="w-4 h-4 text-[#0B4F6C]" />
              <span>Call Hospital</span>
            </a>

            <button
              onClick={() => {
                const element = document.getElementById('appointment-form');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                } else {
                  onOpenAppointmentModal();
                }
              }}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white/15 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-cyan-300" />
              <span>Book an Appointment</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
