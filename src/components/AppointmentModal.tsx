import React, { useState, useEffect } from 'react';
import { X, Calendar, User, Phone, CheckCircle, Clock, MapPin, Printer, Share2, AlertCircle } from 'lucide-react';
import { AppointmentRequest } from '../types';
import { useCms } from '../context/CmsContext';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedDoctorId?: string;
  preselectedDepartmentId?: string;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  preselectedDoctorId,
  preselectedDepartmentId,
}) => {
  const cms = useCms();
  const DEPARTMENTS = cms.config.departments;
  const DOCTORS = cms.config.doctors;
  const HOSPITAL_CONTACT = cms.config.hospital;

  const [departmentId, setDepartmentId] = useState<string>(preselectedDepartmentId || DEPARTMENTS[0]?.id || 'gen-med');
  const [doctorId, setDoctorId] = useState<string>(preselectedDoctorId || '');
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [patientGender, setPatientGender] = useState('Male');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [preferredSlot, setPreferredSlot] = useState<'Morning (10:00 AM - 01:00 PM)' | 'Evening (05:00 PM - 08:00 PM)'>('Morning (10:00 AM - 01:00 PM)');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<AppointmentRequest | null>(null);

  // Sync with preselected props
  useEffect(() => {
    if (preselectedDepartmentId) {
      setDepartmentId(preselectedDepartmentId);
    }
  }, [preselectedDepartmentId]);

  useEffect(() => {
    if (preselectedDoctorId) {
      setDoctorId(preselectedDoctorId);
      const doc = DOCTORS.find((d) => d.id === preselectedDoctorId);
      if (doc) {
        setDepartmentId(doc.departmentId);
      }
    }
  }, [preselectedDoctorId]);

  // Set default minimum date to tomorrow or today
  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    setAppointmentDate(`${yyyy}-${mm}-${dd}`);
  }, []);

  if (!isOpen) return null;

  // Filter available doctors for the selected department
  const departmentDoctors = DOCTORS.filter((d) => d.departmentId === departmentId);
  const selectedDoctor = DOCTORS.find((d) => d.id === doctorId) || (departmentDoctors.length > 0 ? departmentDoctors[0] : null);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!patientName.trim()) newErrors.patientName = 'Please enter patient full name';
    if (!patientPhone.trim()) {
      newErrors.patientPhone = 'Please enter mobile number';
    } else if (!/^[6-9]\d{9}$/.test(patientPhone.replace(/\s+/g, ''))) {
      newErrors.patientPhone = 'Please enter a valid 10-digit Indian mobile number';
    }
    if (!patientAge.trim()) newErrors.patientAge = 'Please enter patient age';
    if (!appointmentDate) newErrors.appointmentDate = 'Please select a date';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newAppointment: AppointmentRequest = {
      id: `SARPHI-OPD-${randomNum}`,
      patientName,
      patientPhone,
      patientAge,
      patientGender,
      departmentId,
      doctorId: selectedDoctor?.id || 'doc-1',
      appointmentDate,
      preferredSlot,
      notes,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    setConfirmedBooking(newAppointment);
    setIsSubmitted(true);

    // Save to CMS context so it appears in the Admin Panel
    cms.addAppointment({
      patientName,
      patientPhone,
      patientAge,
      patientGender,
      departmentId,
      doctorId: selectedDoctor?.id || 'doc-1',
      appointmentDate,
      preferredSlot,
      notes
    });
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setConfirmedBooking(null);
    setPatientName('');
    setPatientPhone('');
    setPatientAge('');
    setNotes('');
  };

  const handlePrint = () => {
    window.print();
  };

  const selectedDepartment = DEPARTMENTS.find((d) => d.id === departmentId);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="appointment-title"
      >
        {/* Modal Header */}
        <div className="bg-[#0B4F6C] text-white px-6 py-5 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#1995AD] block">
              Outpatient Department (OPD)
            </span>
            <h2 id="appointment-title" className="text-xl font-bold tracking-tight text-white mt-0.5">
              {isSubmitted ? 'Appointment Confirmation' : 'Book a Specialist Consultation'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close appointment modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 max-h-[80vh] overflow-y-auto">
          {isSubmitted && confirmedBooking ? (
            /* Confirmation View */
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3.5">
                <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-base font-bold text-emerald-900">
                    OPD Appointment Registered Successfully
                  </h3>
                  <p className="text-xs text-emerald-700 mt-1">
                    Your appointment reference ID is{' '}
                    <strong className="font-mono text-emerald-900 underline">{confirmedBooking.id}</strong>.
                    Please present this at the Sarphi Hospital OPD desk on arrival.
                  </p>
                </div>
              </div>

              {/* Printable Appointment Slip */}
              <div className="p-6 rounded-2xl bg-[#F8FAFC] border-2 border-dashed border-slate-300 space-y-4 text-slate-800">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div>
                    <span className="font-bold text-[#0B4F6C] text-base block">SARPHI HOSPITAL</span>
                    <span className="text-xs text-slate-500">Memco More, Dhanbad, Jharkhand</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-medium text-slate-500 block">Token / Ref</span>
                    <span className="font-mono font-bold text-sm text-[#0B4F6C] bg-white px-2.5 py-1 rounded border border-slate-200">
                      {confirmedBooking.id}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-500 block">Patient Name:</span>
                    <span className="font-semibold text-sm text-slate-900">{confirmedBooking.patientName}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Age & Gender:</span>
                    <span className="font-semibold text-sm text-slate-900">{confirmedBooking.patientAge} Yrs / {confirmedBooking.patientGender}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Consulting Doctor:</span>
                    <span className="font-semibold text-sm text-[#0B4F6C]">
                      {selectedDoctor ? selectedDoctor.name : 'Attending Specialist'}
                    </span>
                    <span className="text-[11px] text-slate-500 block">{selectedDoctor?.title}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Department:</span>
                    <span className="font-semibold text-sm text-slate-900">{selectedDepartment?.name}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Date of Visit:</span>
                    <span className="font-semibold text-sm text-slate-900">{confirmedBooking.appointmentDate}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Preferred Slot:</span>
                    <span className="font-semibold text-sm text-slate-900">{confirmedBooking.preferredSlot}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 text-[11px] text-slate-600 space-y-1">
                  <div className="flex items-center gap-1.5 font-medium text-[#0B4F6C]">
                    <MapPin className="w-3.5 h-3.5 text-[#1995AD]" />
                    <span>Location: First Floor OPD Chambers, Sarphi Hospital, Memco More</span>
                  </div>
                  <p className="text-slate-500">
                    * Please arrive 15 minutes prior to your preferred slot with your past prescriptions and diagnostic reports.
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="w-full sm:w-1/2 py-2.5 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-slate-500" />
                  Print Appointment Slip
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-1/2 py-2.5 px-4 rounded-xl bg-[#0B4F6C] hover:bg-[#08384D] text-white font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  Done
                </button>
              </div>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs text-[#0B4F6C] hover:underline font-medium cursor-pointer"
                >
                  Book another appointment for a family member
                </button>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Department Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  1. Clinical Department <span className="text-rose-500">*</span>
                </label>
                <select
                  value={departmentId}
                  onChange={(e) => {
                    setDepartmentId(e.target.value);
                    const docs = DOCTORS.filter((d) => d.departmentId === e.target.value);
                    if (docs.length > 0) setDoctorId(docs[0].id);
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-800 text-sm focus:ring-2 focus:ring-[#0B4F6C] focus:border-transparent outline-hidden transition-all"
                >
                  {DEPARTMENTS.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Doctor Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  2. Consulting Specialist <span className="text-rose-500">*</span>
                </label>
                <select
                  value={doctorId || (selectedDoctor?.id || '')}
                  onChange={(e) => setDoctorId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-800 text-sm focus:ring-2 focus:ring-[#0B4F6C] focus:border-transparent outline-hidden transition-all"
                >
                  {departmentDoctors.length > 0 ? (
                    departmentDoctors.map((doc) => (
                      <option key={doc.id} value={doc.id}>
                        {doc.name} — {doc.title} ({doc.opdDays})
                      </option>
                    ))
                  ) : (
                    <option value="">Consultant on Duty</option>
                  )}
                </select>
                {selectedDoctor && (
                  <div className="mt-2 p-2.5 rounded-lg bg-[#EBF4F7] text-xs text-[#0B4F6C] flex items-center justify-between">
                    <span className="font-medium">Chamber: {selectedDoctor.roomNumber}</span>
                    <span className="text-slate-600">Timings: {selectedDoctor.opdTimings}</span>
                  </div>
                )}
              </div>

              {/* Date & Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    3. Preferred Date <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl border ${
                      errors.appointmentDate ? 'border-rose-400 bg-rose-50' : 'border-slate-300'
                    } bg-white text-slate-800 text-sm focus:ring-2 focus:ring-[#0B4F6C] outline-hidden`}
                  />
                  {errors.appointmentDate && (
                    <p className="text-rose-500 text-xs mt-1">{errors.appointmentDate}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    4. Time Slot <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={preferredSlot}
                    onChange={(e) => setPreferredSlot(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-800 text-sm focus:ring-2 focus:ring-[#0B4F6C] outline-hidden"
                  >
                    <option value="Morning (10:00 AM - 01:00 PM)">Morning (10:00 AM - 01:00 PM)</option>
                    <option value="Evening (05:00 PM - 08:00 PM)">Evening (05:00 PM - 08:00 PM)</option>
                  </select>
                </div>
              </div>

              {/* Patient Details */}
              <div className="space-y-4 pt-2 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  5. Patient Information
                </h4>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Patient Full Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      placeholder="e.g. Ramesh Kumar"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border ${
                        errors.patientName ? 'border-rose-400 bg-rose-50' : 'border-slate-300'
                      } text-sm focus:ring-2 focus:ring-[#0B4F6C] outline-hidden`}
                    />
                  </div>
                  {errors.patientName && (
                    <p className="text-rose-500 text-xs mt-1">{errors.patientName}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Mobile Number <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="tel"
                        maxLength={10}
                        placeholder="10-digit mobile number"
                        value={patientPhone}
                        onChange={(e) => setPatientPhone(e.target.value)}
                        className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border ${
                          errors.patientPhone ? 'border-rose-400 bg-rose-50' : 'border-slate-300'
                        } text-sm focus:ring-2 focus:ring-[#0B4F6C] outline-hidden`}
                      />
                    </div>
                    {errors.patientPhone && (
                      <p className="text-rose-500 text-xs mt-1">{errors.patientPhone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Age <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="120"
                      placeholder="Age"
                      value={patientAge}
                      onChange={(e) => setPatientAge(e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl border ${
                        errors.patientAge ? 'border-rose-400 bg-rose-50' : 'border-slate-300'
                      } text-sm focus:ring-2 focus:ring-[#0B4F6C] outline-hidden`}
                    />
                    {errors.patientAge && (
                      <p className="text-rose-500 text-xs mt-1">{errors.patientAge}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Gender
                    </label>
                    <select
                      value={patientGender}
                      onChange={(e) => setPatientGender(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#0B4F6C] outline-hidden"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Brief Symptoms / Reason (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Fever since 3 days, knee pain"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#0B4F6C] outline-hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Information disclaimer */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-[#0B4F6C] shrink-0 mt-0.5" />
                <span>
                  OPD consultations are scheduled during doctor chamber hours. Emergency casualties are attended immediately in the Ground Floor Casualty Wing without prior appointment.
                </span>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#0B4F6C] hover:bg-[#08384D] active:scale-[0.98] text-white text-sm font-semibold transition-all shadow-sm flex items-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-[#1995AD]" />
                  Confirm OPD Booking
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
