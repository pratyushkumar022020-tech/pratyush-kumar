import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  CmsConfig, CmsTheme, CmsHospitalInfo, CmsLogo, CmsHero, CmsAbout, 
  Department, Doctor, GalleryItem, AppointmentRequest, ContactLead 
} from '../types';
import { INITIAL_CMS_CONFIG } from '../data/cmsDefaults';

interface CmsContextType {
  config: CmsConfig;
  updateTheme: (theme: Partial<CmsTheme>) => void;
  updateHospital: (hospital: Partial<CmsHospitalInfo>) => void;
  updateLogo: (logo: Partial<CmsLogo>) => void;
  updateHero: (hero: Partial<CmsHero>) => void;
  updateAbout: (about: Partial<CmsAbout>) => void;
  updateDepartments: (departments: Department[]) => void;
  updateDoctors: (doctors: Doctor[]) => void;
  updateGalleryItems: (items: GalleryItem[]) => void;
  addAppointment: (appointment: Omit<AppointmentRequest, 'id' | 'createdAt' | 'status'>) => void;
  deleteAppointment: (id: string) => void;
  updateAppointmentStatus: (id: string, status: 'confirmed' | 'pending') => void;
  // Lead methods
  addLead: (lead: Omit<ContactLead, 'id' | 'submittedAt' | 'status' | 'sentToEmail'>) => Promise<{ success: boolean; message?: string }>;
  deleteLead: (id: string) => void;
  updateLeadStatus: (id: string, status: 'new' | 'contacted' | 'resolved') => void;
  updateLeadRecipientEmail: (email: string) => void;
  // Privyr Webhook methods
  updatePrivyrWebhookUrl: (url: string) => void;
  postToPrivyr: (leadData: Record<string, any>) => Promise<{ success: boolean; data?: any }>;
  // Admin & Data methods
  updateAdminPassword: (newPass: string) => void;
  resetToDefaults: () => void;
  exportConfigJson: () => void;
  importConfigJson: (jsonString: string) => boolean;
  savePhotoFile: (file: File) => Promise<string>;
}

const STORAGE_KEY = 'sarphi_hospital_cms_config_v1';

const CmsContext = createContext<CmsContextType | undefined>(undefined);

export const CmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<CmsConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Merge with initial defaults to ensure newly added properties exist
        return {
          ...INITIAL_CMS_CONFIG,
          ...parsed,
          leadRecipientEmail: parsed.leadRecipientEmail || INITIAL_CMS_CONFIG.leadRecipientEmail || 'roadydigital@gmail.com',
          privyrWebhookUrl: parsed.privyrWebhookUrl || INITIAL_CMS_CONFIG.privyrWebhookUrl || 'https://www.privyr.com/api/v1/incoming-leads/0vZfjMQw/d4Sj1sEf',
          theme: { ...INITIAL_CMS_CONFIG.theme, ...parsed.theme },
          hospital: { ...INITIAL_CMS_CONFIG.hospital, ...parsed.hospital },
          logo: { ...INITIAL_CMS_CONFIG.logo, ...parsed.logo },
          hero: { ...INITIAL_CMS_CONFIG.hero, ...parsed.hero },
          about: { ...INITIAL_CMS_CONFIG.about, ...parsed.about },
          departments: parsed.departments || INITIAL_CMS_CONFIG.departments,
          doctors: parsed.doctors || INITIAL_CMS_CONFIG.doctors,
          galleryItems: parsed.galleryItems || INITIAL_CMS_CONFIG.galleryItems,
          appointments: parsed.appointments || [],
          leads: parsed.leads || []
        };
      }
    } catch (e) {
      console.error('Failed to load CMS configuration from localStorage', e);
    }
    return INITIAL_CMS_CONFIG;
  });

  // Apply theme colors dynamically to CSS variables on :root
  useEffect(() => {
    const root = document.documentElement;
    if (config.theme) {
      root.style.setProperty('--primary', config.theme.primaryColor);
      root.style.setProperty('--primary-dark', config.theme.primaryDark);
      root.style.setProperty('--secondary', config.theme.secondaryColor);
      root.style.setProperty('--accent', config.theme.accentColor);
      root.style.setProperty('--canvas', config.theme.bgColor);
      root.style.setProperty('--dark-text', config.theme.textColor);
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch (e) {
      console.error('Failed to persist CMS configuration', e);
    }
  }, [config]);

  // Dispatch data to Privyr generic webhook
  const postToPrivyr = async (payload: Record<string, any>): Promise<{ success: boolean; data?: any }> => {
    const rawUrl = config.privyrWebhookUrl || 'https://www.privyr.com/api/v1/incoming-leads/0vZfjMQw/d4Sj1sEf';
    const cleanUrl = rawUrl.split('#')[0].trim();
    if (!cleanUrl) return { success: false, data: 'No webhook URL' };

    try {
      const response = await fetch(cleanUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      const resJson = await response.json().catch(() => ({}));
      return { success: response.ok, data: resJson };
    } catch (err) {
      console.warn('Privyr webhook submission error:', err);
      return { success: false, data: err };
    }
  };

  const updatePrivyrWebhookUrl = (url: string) => {
    setConfig(prev => ({
      ...prev,
      privyrWebhookUrl: url,
      lastUpdated: new Date().toISOString()
    }));
  };

  const updateTheme = (themeUpdates: Partial<CmsTheme>) => {
    setConfig(prev => ({
      ...prev,
      theme: { ...prev.theme, ...themeUpdates },
      lastUpdated: new Date().toISOString()
    }));
  };

  const updateHospital = (hospitalUpdates: Partial<CmsHospitalInfo>) => {
    setConfig(prev => ({
      ...prev,
      hospital: { ...prev.hospital, ...hospitalUpdates },
      lastUpdated: new Date().toISOString()
    }));
  };

  const updateLogo = (logoUpdates: Partial<CmsLogo>) => {
    setConfig(prev => ({
      ...prev,
      logo: { ...prev.logo, ...logoUpdates },
      lastUpdated: new Date().toISOString()
    }));
  };

  const updateHero = (heroUpdates: Partial<CmsHero>) => {
    setConfig(prev => ({
      ...prev,
      hero: { ...prev.hero, ...heroUpdates },
      lastUpdated: new Date().toISOString()
    }));
  };

  const updateAbout = (aboutUpdates: Partial<CmsAbout>) => {
    setConfig(prev => ({
      ...prev,
      about: { ...prev.about, ...aboutUpdates },
      lastUpdated: new Date().toISOString()
    }));
  };

  const updateDepartments = (departments: Department[]) => {
    setConfig(prev => ({
      ...prev,
      departments,
      lastUpdated: new Date().toISOString()
    }));
  };

  const updateDoctors = (doctors: Doctor[]) => {
    setConfig(prev => ({
      ...prev,
      doctors,
      lastUpdated: new Date().toISOString()
    }));
  };

  const updateGalleryItems = (galleryItems: GalleryItem[]) => {
    setConfig(prev => ({
      ...prev,
      galleryItems,
      lastUpdated: new Date().toISOString()
    }));
  };

  const addAppointment = (appt: Omit<AppointmentRequest, 'id' | 'createdAt' | 'status'>) => {
    const newAppointment: AppointmentRequest = {
      ...appt,
      id: 'apt-' + Date.now(),
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    setConfig(prev => ({
      ...prev,
      appointments: [newAppointment, ...prev.appointments],
      lastUpdated: new Date().toISOString()
    }));

    // Post appointment lead immediately to Privyr Webhook
    postToPrivyr({
      name: appt.patientName,
      phone: appt.patientPhone,
      department: appt.departmentId,
      doctor: appt.doctorId,
      appointment_date: appt.appointmentDate,
      preferred_slot: appt.preferredSlot,
      notes: `Appointment Booking Request\nDepartment: ${appt.departmentId}\nDoctor: ${appt.doctorId}\nAge: ${appt.patientAge}\nGender: ${appt.patientGender}\nDate: ${appt.appointmentDate}\nSlot: ${appt.preferredSlot}\nNotes: ${appt.notes || 'None'}`,
      lead_source: 'Sarphi Hospital - Book Appointment Form'
    });

    // Also send email alert via FormSubmit to roadydigital@gmail.com
    try {
      const targetEmail = config.leadRecipientEmail || 'roadydigital@gmail.com';
      fetch(`https://formsubmit.co/ajax/${encodeURIComponent(targetEmail)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `New Appointment Booking: ${appt.patientName} (${appt.departmentId})`,
          _template: 'table',
          "Lead Source": "Book Appointment Modal",
          "Patient Name": appt.patientName,
          "Phone Number": appt.patientPhone,
          "Age / Gender": `${appt.patientAge} / ${appt.patientGender}`,
          "Department": appt.departmentId,
          "Doctor": appt.doctorId,
          "Date": appt.appointmentDate,
          "Slot": appt.preferredSlot,
          "Notes": appt.notes || 'None'
        })
      }).catch(() => {});
    } catch {}
  };

  const deleteAppointment = (id: string) => {
    setConfig(prev => ({
      ...prev,
      appointments: prev.appointments.filter(a => a.id !== id),
      lastUpdated: new Date().toISOString()
    }));
  };

  const updateAppointmentStatus = (id: string, status: 'confirmed' | 'pending') => {
    setConfig(prev => ({
      ...prev,
      appointments: prev.appointments.map(a => a.id === id ? { ...a, status } : a),
      lastUpdated: new Date().toISOString()
    }));
  };

  // Add Contact Lead & dispatch to Privyr Webhook + email to roadydigital@gmail.com
  const addLead = async (leadData: Omit<ContactLead, 'id' | 'submittedAt' | 'status' | 'sentToEmail'>): Promise<{ success: boolean; message?: string }> => {
    const targetEmail = config.leadRecipientEmail || 'roadydigital@gmail.com';
    const newLead: ContactLead = {
      ...leadData,
      id: 'lead-' + Date.now(),
      submittedAt: new Date().toISOString(),
      sentToEmail: targetEmail,
      status: 'new'
    };

    // Store lead immediately into state & localStorage
    setConfig(prev => ({
      ...prev,
      leads: [newLead, ...(prev.leads || [])],
      lastUpdated: new Date().toISOString()
    }));

    // 1. Post directly to Privyr Generic Webhook (https://www.privyr.com/api/v1/incoming-leads/0vZfjMQw/d4Sj1sEf)
    postToPrivyr({
      name: leadData.name,
      phone: leadData.phone,
      email: leadData.email || '',
      service: leadData.service,
      date_of_birth: leadData.dateOfBirth,
      preferred_date: leadData.preferredDate || '',
      preferred_time: leadData.preferredTime || '',
      notes: `Service: ${leadData.service}\nDOB: ${leadData.dateOfBirth}\nPreferred Date: ${leadData.preferredDate || 'Flexible'}\nPreferred Time: ${leadData.preferredTime || 'Anytime'}\nMessage: ${leadData.message || 'None'}`,
      lead_source: 'Sarphi Hospital - Contact Us Lead Form'
    });

    // 2. Also send email to target email (roadydigital@gmail.com) via FormSubmit AJAX service
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(targetEmail)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `New Lead: ${leadData.name} (${leadData.service}) - Sarphi Hospital`,
          _template: 'table',
          "Lead Source": "Sarphi Hospital Contact Us Form",
          "Patient Name": leadData.name,
          "Phone Number": leadData.phone,
          "Email Address": leadData.email || 'Not provided',
          "Selected Service": leadData.service,
          "Date of Birth": leadData.dateOfBirth || 'Not provided',
          "Preferred Date": leadData.preferredDate || 'Not specified',
          "Preferred Time": leadData.preferredTime || 'Not specified',
          "Message": leadData.message || 'No additional note',
          "Submission Time": new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
        })
      });

      const resData = await response.json().catch(() => ({}));
      return { success: true, message: resData?.message || 'Email & Webhook sent successfully' };
    } catch (err) {
      console.warn('Network email dispatch:', err);
      // Lead is still safely stored in state & localStorage and posted to Privyr
      return { success: true, message: 'Saved to hospital leads' };
    }
  };

  const deleteLead = (id: string) => {
    setConfig(prev => ({
      ...prev,
      leads: (prev.leads || []).filter(l => l.id !== id),
      lastUpdated: new Date().toISOString()
    }));
  };

  const updateLeadStatus = (id: string, status: 'new' | 'contacted' | 'resolved') => {
    setConfig(prev => ({
      ...prev,
      leads: (prev.leads || []).map(l => l.id === id ? { ...l, status } : l),
      lastUpdated: new Date().toISOString()
    }));
  };

  const updateLeadRecipientEmail = (email: string) => {
    setConfig(prev => ({
      ...prev,
      leadRecipientEmail: email,
      lastUpdated: new Date().toISOString()
    }));
  };

  const updateAdminPassword = (newPass: string) => {
    setConfig(prev => ({
      ...prev,
      adminPasswordHash: newPass,
      lastUpdated: new Date().toISOString()
    }));
  };

  const resetToDefaults = () => {
    setConfig(INITIAL_CMS_CONFIG);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_CMS_CONFIG));
    } catch (e) {
      console.error(e);
    }
  };

  const exportConfigJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(config, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `sarphi-cms-config-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importConfigJson = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && parsed.hospital && parsed.theme) {
        setConfig({
          ...INITIAL_CMS_CONFIG,
          ...parsed,
          leadRecipientEmail: parsed.leadRecipientEmail || INITIAL_CMS_CONFIG.leadRecipientEmail || 'roadydigital@gmail.com',
          privyrWebhookUrl: parsed.privyrWebhookUrl || INITIAL_CMS_CONFIG.privyrWebhookUrl || 'https://www.privyr.com/api/v1/incoming-leads/0vZfjMQw/d4Sj1sEf',
          leads: parsed.leads || [],
          lastUpdated: new Date().toISOString()
        });
        return true;
      }
    } catch (e) {
      console.error('Invalid JSON file', e);
    }
    return false;
  };

  const savePhotoFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  };

  return (
    <CmsContext.Provider
      value={{
        config,
        updateTheme,
        updateHospital,
        updateLogo,
        updateHero,
        updateAbout,
        updateDepartments,
        updateDoctors,
        updateGalleryItems,
        addAppointment,
        deleteAppointment,
        updateAppointmentStatus,
        addLead,
        deleteLead,
        updateLeadStatus,
        updateLeadRecipientEmail,
        updatePrivyrWebhookUrl,
        postToPrivyr,
        updateAdminPassword,
        resetToDefaults,
        exportConfigJson,
        importConfigJson,
        savePhotoFile
      }}
    >
      {children}
    </CmsContext.Provider>
  );
};

export const useCms = (): CmsContextType => {
  const context = useContext(CmsContext);
  if (!context) {
    throw new Error('useCms must be used within a CmsProvider');
  }
  return context;
};
