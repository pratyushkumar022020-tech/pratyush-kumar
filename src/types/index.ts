export type Page = 'home' | 'about' | 'services' | 'doctors' | 'gallery' | 'contact' | 'privacy' | 'terms' | 'admin';

export interface Doctor {
  id: string;
  name: string;
  title: string;
  departmentId: string;
  departmentName: string;
  qualifications: string;
  experience: string;
  opdTimings: string;
  opdDays: string;
  roomNumber: string;
  bio: string;
  specializations: string[];
  gender: 'male' | 'female';
  photoUrl?: string;
}

export interface Department {
  id: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  headOfDept: string;
  commonTreatments: string[];
  facilities: string[];
  opdSchedule: string;
  iconName: string;
  imageUrl?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl?: string;
  visualType?: string;
}

export interface CmsTheme {
  primaryColor: string;      // e.g. #0B4F6C
  primaryDark: string;       // e.g. #08384D
  secondaryColor: string;    // e.g. #1995AD
  topbarColor: string;       // e.g. #0B4F6C
  accentColor: string;       // e.g. #0284C7
  bgColor: string;           // e.g. #F8FAFC
  textColor: string;         // e.g. #0F172A
  presetName?: string;
}

export interface CmsHospitalInfo {
  name: string;
  legalName: string;
  taglineHindi: string;
  taglineEnglish: string;
  address: string;
  city: string;
  state: string;
  landmark: string;
  phonePrimary: string;
  phoneEmergency: string;
  phoneReception: string;
  email: string;
  appointmentEmail: string;
  workingHours: string;
  opdHours: string;
  visitingHours: string;
  mapEmbedQuery: string;
}

export interface CmsLogo {
  imageUrl: string;
  titleText: string;
  subtitleText: string;
  hindiSlogan: string;
}

export interface CmsHero {
  announcementNotice: string;
  eyebrowHindi: string;
  eyebrowEnglish: string;
  headlineMain: string;
  headlineSub1: string;
  headlineSub2: string;
  description: string;
  primaryCtaText: string;
  secondaryCtaText: string;
  heroImageUrl?: string;
  useCustomHeroImage: boolean;
  trustPoint1: string;
  trustPoint2: string;
  trustPoint3: string;
}

export interface CmsAbout {
  eyebrow: string;
  heading: string;
  introText: string;
  secondaryText: string;
  philosophyTitle: string;
  philosophyText: string;
  aboutImageUrl?: string;
}

export interface ContactLead {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  dateOfBirth: string;
  preferredDate?: string;
  preferredTime?: string;
  message?: string;
  submittedAt: string;
  sentToEmail: string;
  status: 'new' | 'contacted' | 'resolved';
}

export interface CmsConfig {
  adminPasswordHash: string;
  leadRecipientEmail: string; // Target email for contact leads (e.g. roadydigital@gmail.com)
  privyrWebhookUrl: string; // Target Privyr generic webhook URL
  theme: CmsTheme;
  hospital: CmsHospitalInfo;
  logo: CmsLogo;
  hero: CmsHero;
  about: CmsAbout;
  departments: Department[];
  doctors: Doctor[];
  galleryItems: GalleryItem[];
  appointments: AppointmentRequest[];
  leads: ContactLead[];
  lastUpdated: string;
}

export interface Facility {
  id: string;
  title: string;
  category: 'critical' | 'surgical' | 'diagnostic' | 'inpatient' | 'general';
  description: string;
  keyFeatures: string[];
  badge: string;
  floorLocation?: string;
  capacity?: string;
  specialistInCharge?: string;
  visitingHours?: string;
  sanitationProtocol?: string;
  equipmentSpecs?: string[];
  visualType?: 'consultation' | 'lobby' | 'ot' | 'icu' | 'lab' | 'emergency' | 'building' | 'ward' | 'pharmacy' | 'reception' | 'ambulance' | 'xray';
}

export interface AppointmentRequest {
  id: string;
  patientName: string;
  patientPhone: string;
  patientAge: string;
  patientGender: string;
  departmentId: string;
  doctorId: string;
  appointmentDate: string;
  preferredSlot: 'Morning (10:00 AM - 01:00 PM)' | 'Evening (05:00 PM - 08:00 PM)';
  notes: string;
  status: 'confirmed' | 'pending';
  createdAt: string;
}

export interface Testimonial {
  id: string;
  patientName: string;
  relation: string;
  hometown: string;
  department: string;
  content: string;
  verifiedAttendant: boolean;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'opd' | 'admission' | 'emergency' | 'insurance';
}
