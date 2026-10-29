import React, { useState } from 'react';
import { Page } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { AppointmentModal } from './components/AppointmentModal';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { DoctorsPage } from './pages/DoctorsPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { AdminPage } from './pages/AdminPage';
import { CmsProvider } from './context/CmsContext';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [preselectedDoctorId, setPreselectedDoctorId] = useState<string | undefined>(undefined);
  const [preselectedDepartmentId, setPreselectedDepartmentId] = useState<string | undefined>(undefined);

  const handleOpenAppointmentModal = (doctorId?: string, departmentId?: string) => {
    setPreselectedDoctorId(doctorId);
    setPreselectedDepartmentId(departmentId);
    setIsAppointmentModalOpen(true);
  };

  const handleCloseAppointmentModal = () => {
    setIsAppointmentModalOpen(false);
    setPreselectedDoctorId(undefined);
    setPreselectedDepartmentId(undefined);
  };

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-800 selection:bg-[#0B4F6C]/15 selection:text-[#0B4F6C]">
      {/* Universal Sticky Header with Admin Button & Dynamic Topbar */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenAppointmentModal={handleOpenAppointmentModal}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenAppointmentModal={handleOpenAppointmentModal}
          />
        )}
        {currentPage === 'about' && (
          <AboutPage
            onNavigate={handleNavigate}
            onOpenAppointmentModal={() => handleOpenAppointmentModal()}
          />
        )}
        {currentPage === 'services' && (
          <ServicesPage
            onNavigate={handleNavigate}
            onOpenAppointmentModal={handleOpenAppointmentModal}
          />
        )}
        {currentPage === 'doctors' && (
          <DoctorsPage
            onNavigate={handleNavigate}
            onOpenAppointmentModal={handleOpenAppointmentModal}
          />
        )}
        {currentPage === 'gallery' && (
          <GalleryPage
            onNavigate={handleNavigate}
            onOpenAppointmentModal={handleOpenAppointmentModal}
          />
        )}
        {currentPage === 'contact' && (
          <ContactPage
            onNavigate={handleNavigate}
            onOpenAppointmentModal={handleOpenAppointmentModal}
          />
        )}
        {currentPage === 'privacy' && (
          <PrivacyPolicyPage
            onNavigate={handleNavigate}
            onOpenAppointmentModal={handleOpenAppointmentModal}
          />
        )}
        {currentPage === 'terms' && (
          <TermsPage
            onNavigate={handleNavigate}
            onOpenAppointmentModal={handleOpenAppointmentModal}
          />
        )}
        {currentPage === 'admin' && (
          <AdminPage
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Universal 4-Column Footer with Admin Panel Link */}
      <Footer
        onNavigate={handleNavigate}
        onOpenAppointmentModal={() => handleOpenAppointmentModal()}
      />

      {/* Floating Action Controls */}
      {currentPage !== 'admin' && (
        <FloatingActions
          onOpenAppointmentModal={() => handleOpenAppointmentModal()}
        />
      )}

      {/* Interactive Universal Appointment Booking Modal */}
      <AppointmentModal
        isOpen={isAppointmentModalOpen}
        onClose={handleCloseAppointmentModal}
        preselectedDoctorId={preselectedDoctorId}
        preselectedDepartmentId={preselectedDepartmentId}
      />
    </div>
  );
}

export default function App() {
  return (
    <CmsProvider>
      <AppContent />
    </CmsProvider>
  );
}
