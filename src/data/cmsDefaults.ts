import { CmsConfig } from '../types';
import { DEPARTMENTS, DOCTORS, HOSPITAL_CONTACT } from './hospitalData';

export const INITIAL_CMS_CONFIG: CmsConfig = {
  adminPasswordHash: 'admin123', // Default admin password
  leadRecipientEmail: 'roadydigital@gmail.com', // Lead submissions are forwarded to this email
  privyrWebhookUrl: 'https://www.privyr.com/api/v1/incoming-leads/0vZfjMQw/d4Sj1sEf', // Privyr generic webhook
  theme: {
    primaryColor: '#0B4F6C',
    primaryDark: '#08384D',
    secondaryColor: '#1995AD',
    topbarColor: '#0B4F6C',
    accentColor: '#0284C7',
    bgColor: '#F8FAFC',
    textColor: '#0F172A',
    presetName: 'Deep Navy & Cyan (Default)'
  },
  hospital: {
    name: 'Sarphi Hospital',
    legalName: 'Sarphi Hospital & Healthcare Centre',
    taglineHindi: 'बेस्ट हॉस्पिटल इन धनबाद',
    taglineEnglish: 'Best Multi-Speciality Hospital in Dhanbad',
    address: 'Memco More, Near GT Road By-pass, Dhanbad, Jharkhand, Pin - 826004, India',
    city: 'Dhanbad',
    state: 'Jharkhand',
    landmark: 'Memco More Chowk',
    phonePrimary: '+91 80022 34567',
    phoneEmergency: '+91 80022 34568',
    phoneReception: '0326-2204567',
    email: 'care@sarphihospital.com',
    appointmentEmail: 'appointments@sarphihospital.com',
    workingHours: '24 Hours Open (Emergency & Inpatient)',
    opdHours: 'Monday to Saturday: 09:30 AM – 08:30 PM | Sunday: 10:00 AM – 02:00 PM',
    visitingHours: 'Morning: 11:00 AM – 12:00 PM | Evening: 05:00 PM – 07:00 PM',
    mapEmbedQuery: 'Memco More, Dhanbad, Jharkhand'
  },
  logo: {
    imageUrl: '/logo.svg',
    titleText: 'THE FUTURE TRACK',
    subtitleText: 'COMPUTER EDUCATION',
    hindiSlogan: 'विद्या परमं बलम्'
  },
  hero: {
    announcementNotice: '24×7 Healthcare Support | Memco More, Dhanbad',
    eyebrowHindi: 'बेस्ट हॉस्पिटल इन धनबाद',
    eyebrowEnglish: 'Best Hospital in Dhanbad',
    headlineMain: 'बेस्ट हॉस्पिटल इन धनबाद',
    headlineSub1: 'Compassionate Care.',
    headlineSub2: 'Advanced Healthcare. Closer to You.',
    description: 'Sarphi Hospital is committed to providing accessible, reliable and patient-focused healthcare services for individuals and families in Dhanbad.',
    primaryCtaText: 'Book an Appointment',
    secondaryCtaText: 'Explore Our Services',
    useCustomHeroImage: false,
    heroImageUrl: '',
    trustPoint1: 'Patient-Centered Care',
    trustPoint2: 'Professional Medical Team',
    trustPoint3: 'Modern Healthcare Environment'
  },
  about: {
    eyebrow: 'ABOUT SARPHI HOSPITAL',
    heading: 'Healthcare With Care & Responsibility',
    introText: 'At Sarphi Hospital, our focus is on providing a professional and patient-centered healthcare environment where individuals and families can access medical support with confidence and care.',
    secondaryText: 'Our approach is centered around clear communication, patient care, professional medical support and a comfortable healthcare environment.',
    philosophyTitle: 'Hospital Philosophy & Community Care',
    philosophyText: 'Established at the Memco More crossroads in Dhanbad, the hospital is structured around patient convenience, ethical diagnostics, and continuous medical support. We avoid unnecessary procedures and focus on clear communication between doctors, patients, and their family attendants.',
    aboutImageUrl: ''
  },
  departments: DEPARTMENTS,
  doctors: DOCTORS,
  galleryItems: [
    {
      id: 'ot-1',
      title: 'Modular Operation Theatre (OT)',
      category: 'Surgical Care',
      description: 'Ultra-clean laminar airflow OT with surgical pendants, HEPA filtration, and LED dual-arm surgical lights for multi-specialty interventions.',
      visualType: 'ot'
    },
    {
      id: 'icu-1',
      title: 'Intensive Care Unit (ICU)',
      category: 'Critical Care',
      description: 'Equipped with multipara physiological monitors, central oxygen delivery, defibrillators, and isolation bays.',
      visualType: 'icu'
    },
    {
      id: 'lab-1',
      title: 'Pathology & Diagnostic Laboratory',
      category: 'Diagnostics',
      description: 'Automated biochemistry and hematology analyzers for precise blood test results with rapid turnaround.',
      visualType: 'lab'
    },
    {
      id: 'em-1',
      title: '24×7 Casualty & Emergency Portico',
      category: 'Emergency',
      description: 'Dedicated ambulance reception bay, resuscitation beds, and direct connectivity to triage rooms.',
      visualType: 'emergency'
    },
    {
      id: 'ward-1',
      title: 'Inpatient Recovery Rooms',
      category: 'Inpatient Care',
      description: 'Clean, air-conditioned patient suites with attendant couches, nurse call bells, and ensuite bathrooms.',
      visualType: 'ward'
    },
    {
      id: 'pharma-1',
      title: '24×7 In-House Pharmacy',
      category: 'Pharmacy',
      description: 'Genuine branded emergency therapeutics, surgical consumables, and chronic prescriptions.',
      visualType: 'pharmacy'
    }
  ],
  appointments: [],
  leads: [],
  lastUpdated: new Date().toISOString()
};

export const THEME_PRESETS = [
  {
    name: 'Deep Navy & Cyan (Default)',
    primaryColor: '#0B4F6C',
    primaryDark: '#08384D',
    secondaryColor: '#1995AD',
    topbarColor: '#0B4F6C',
    accentColor: '#0284C7',
    bgColor: '#F8FAFC',
    textColor: '#0F172A'
  },
  {
    name: 'Royal Purple & Crimson (Future Track Match)',
    primaryColor: '#2E083B',
    primaryDark: '#1C0425',
    secondaryColor: '#D12A38',
    topbarColor: '#2E083B',
    accentColor: '#E11D48',
    bgColor: '#FAF5FF',
    textColor: '#1E1B4B'
  },
  {
    name: 'Emerald Health & Medical Teal',
    primaryColor: '#065F46',
    primaryDark: '#064E3B',
    secondaryColor: '#0D9488',
    topbarColor: '#064E3B',
    accentColor: '#10B981',
    bgColor: '#F0FDF4',
    textColor: '#064E3B'
  },
  {
    name: 'Classic Hospital Blue & Gold',
    primaryColor: '#1E3A8A',
    primaryDark: '#172554',
    secondaryColor: '#2563EB',
    topbarColor: '#1E3A8A',
    accentColor: '#F59E0B',
    bgColor: '#F8FAFC',
    textColor: '#0F172A'
  },
  {
    name: 'Modern Slate & Indigo',
    primaryColor: '#334155',
    primaryDark: '#1E293B',
    secondaryColor: '#6366F1',
    topbarColor: '#1E293B',
    accentColor: '#4F46E5',
    bgColor: '#F8FAFC',
    textColor: '#0F172A'
  }
];
