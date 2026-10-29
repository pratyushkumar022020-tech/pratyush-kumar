import { Department, Doctor, Facility, FAQ, Testimonial } from '../types';

export const HOSPITAL_CONTACT = {
  name: 'Sarphi Hospital',
  legalName: 'Sarphi Hospital & Healthcare Centre',
  taglineHindi: 'बेस्ट हॉस्पिटल इन धनबाद',
  taglineEnglish: 'Best Hospital in Dhanbad',
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
  mapEmbedQuery: 'Memco More, Dhanbad, Jharkhand',
};

export const DEPARTMENTS: Department[] = [
  {
    id: 'gen-med',
    name: 'General Medicine',
    shortDesc: 'Comprehensive care for adult acute and chronic illnesses, fevers, lifestyle disorders, and diabetic management.',
    fullDesc: 'The Department of General Medicine at Sarphi Hospital provides dedicated primary, secondary, and preventive medical care. Our physician team diagnoses and manages infectious fevers (dengue, typhoid, malaria), hypertension, metabolic syndromes, diabetes complications, respiratory infections, and elder-care geriatric conditions.',
    headOfDept: 'Dr. R. K. Choudhary, MD (General Medicine)',
    commonTreatments: [
      'Type 1 & Type 2 Diabetes Management',
      'Hypertension & Cardiovascular Risk Assessment',
      'Seasonal Viral Fevers, Dengue & Malaria Protocol',
      'Respiratory Tract Infections & Bronchial Asthma'
    ],
    facilities: ['Dedicated Inpatient Step-Down Beds', 'Continuous Bedside Monitoring', 'Point-of-Care Blood Gas & Glucometry'],
    opdSchedule: 'Mon - Sat: 10:00 AM - 02:00 PM & 05:00 PM - 08:00 PM',
    iconName: 'Stethoscope'
  },
  {
    id: 'emergency-care',
    name: 'Emergency Care',
    shortDesc: '24×7 emergency triage, acute trauma care, cardiac emergency response, and ambulance coordination.',
    fullDesc: 'Operating round the clock on the ground floor with direct ambulance bay access, our casualty triage team provides immediate resuscitation, emergency wound care, oxygen support, and doctor on duty assessment.',
    headOfDept: 'Dr. Vivek Kumar, DA, DNB (Critical Care & Anaesthesia)',
    commonTreatments: [
      'Acute Trauma & Road Accident Resuscitation',
      'Chest Pain & Cardiac Arrest Initial Triage',
      'Acute Respiratory Distress & Oxygen Therapy',
      'Poisoning, Snakebite & Emergency Medical Stabilization'
    ],
    facilities: ['Direct Ambulance Bay Access', 'Emergency Resuscitation Beds', 'Defibrillator & Crash Cart'],
    opdSchedule: 'Emergency & Casualty Desk: Open 24 Hours, 7 Days a Week',
    iconName: 'ShieldAlert'
  },
  {
    id: 'diagnostic-services',
    name: 'Diagnostic Services',
    shortDesc: 'High-frequency digital radiography (X-Ray), computerized 12-lead ECG, and non-invasive cardiopulmonary diagnostics.',
    fullDesc: 'Immediate diagnostic imaging and cardiac tracing facilitating rapid medical evaluation. Digital X-rays ensure crystal clear skeletal and thoracic visualization with reduced radiation exposure.',
    headOfDept: 'Dr. Pratibha Kumari, MD (Pathology & Diagnostics)',
    commonTreatments: [
      'Digital Radiography (X-Ray) - Chest, Spine, Extremities',
      '12-Lead Computerised Electrocardiogram (ECG)',
      'Pre-Operative Fitness Radiological Clearance',
      'Orthopaedic Trauma Fracture Imaging'
    ],
    facilities: ['High-Frequency Digital X-Ray Suite', 'Computerized Multi-Channel ECG', 'Emergency Stat Film Processing'],
    opdSchedule: 'Mon - Sat: 08:00 AM - 08:00 PM (Emergency X-Ray & ECG 24x7)',
    iconName: 'Activity'
  },
  {
    id: 'laboratory',
    name: 'Laboratory',
    shortDesc: 'In-house automated pathology laboratory delivering fast-turnaround hematology, biochemistry, and clinical serology.',
    fullDesc: 'Quality-calibrated clinical pathology laboratory providing automated blood counts, diabetic monitoring (HbA1c), liver and kidney panels, and infectious disease screenings with verified accuracy.',
    headOfDept: 'Dr. Pratibha Kumari, MD (Pathology)',
    commonTreatments: [
      'Complete Blood Count (CBC) with 5-Part Cell Counter',
      'Blood Glucose, HbA1c, Liver & Renal Function Profiles',
      'Dengue NS1/IgM/IgG, Typhoid, Malaria Rapid Serology',
      'Urine Routine & Microscopic Culture Testing'
    ],
    facilities: ['Automated Biochemistry Analyser', 'Automated Hematology Counter', 'Cold-Chain Reagent Storage'],
    opdSchedule: 'Sample Collection: Mon - Sat: 07:30 AM - 07:30 PM (Stat testing 24x7)',
    iconName: 'Microscope'
  },
  {
    id: 'surgical-services',
    name: 'Surgical Services',
    shortDesc: 'State-of-the-art modular operation theatres for general, laparoscopic, and emergency trauma surgical procedures.',
    fullDesc: 'Equipped with sterile laminar airflow positive-pressure systems, laparoscopic surgical video towers, and C-Arm fluoroscopy for safe, minimally invasive, and open abdominal surgeries.',
    headOfDept: 'Dr. Alok Verma, MS (General Surgery), FMAS',
    commonTreatments: [
      'Laparoscopic Cholecystectomy (Gallbladder Removal)',
      'Laparoscopic & Open Hernia Repair',
      'Emergency Laparoscopic Appendectomy',
      'Anorectal Surgery (Piles, Fistula, Fissure Care)'
    ],
    facilities: ['Laminar Airflow Positive-Pressure Modular OTs', 'High-Definition Laparoscopy System', 'Post-Anaesthesia Care Unit (PACU)'],
    opdSchedule: 'Mon - Sat: 11:00 AM - 03:00 PM & 06:00 PM - 08:30 PM',
    iconName: 'Activity'
  },
  {
    id: 'maternity-care',
    name: 'Maternity Care',
    shortDesc: 'Comprehensive antenatal monitoring, safe institutional deliveries, high-risk pregnancy care, and women’s health.',
    fullDesc: 'Compassionate maternal healthcare dedicated to safe childbearing, maternal dignity, routine antenatal consultations, normal vaginal delivery, and emergency caesarean sections.',
    headOfDept: 'Dr. (Smt.) Meenakshi Sinha, MD (Obstetrics & Gynaecology)',
    commonTreatments: [
      'Antenatal Care & Fetal Well-being Tracking',
      'Safe Normal Delivery & Caesarean Section (C-Section)',
      'High-Risk Pregnancy (Hypertension & Gestational Diabetes)',
      'Gynaecological Screening & Menstrual Disorder Management'
    ],
    facilities: ['Sterile Labour Room with Fetal Doppler', 'Maternal High Dependency Beds', 'Neonatal Warmers'],
    opdSchedule: 'Mon - Sat: 09:30 AM - 01:30 PM & 04:30 PM - 07:30 PM',
    iconName: 'Baby'
  },
  {
    id: 'pharmacy',
    name: 'Pharmacy',
    shortDesc: '24×7 in-house dispensary stocked with genuine prescription medicines, surgical consumables, and emergency injectables.',
    fullDesc: 'Ensures patients and attendants have seamless, immediate access to prescribed pharmaceuticals, pediatric drops, intravenous fluids, and critical emergency medications under temperature-controlled storage.',
    headOfDept: 'Registered Pharmacist on Duty (24x7)',
    commonTreatments: [
      'Temperature-Controlled Vaccine & Insulin Storage',
      'Emergency Resuscitation & Critical Care Injectables',
      'Post-Surgical Dressing & Wound Care Consumables',
      'Transparent Computerized Invoicing'
    ],
    facilities: ['Cold-Chain Refrigeration', 'Direct Ground Floor Access', 'Computerized Inventory System'],
    opdSchedule: 'Open 24 Hours, 7 Days a Week (Ground Floor)',
    iconName: 'ShieldPlus'
  },
  {
    id: 'specialist-consultation',
    name: 'Specialist Consultation',
    shortDesc: 'Daily outpatient consultations across Orthopaedics, Paediatrics, Internal Medicine, and General Surgery.',
    fullDesc: 'Multi-disciplinary outpatient department chambers where patients can discuss health concerns, receive detailed clinical examinations, and get clear medical advice from qualified medical consultants.',
    headOfDept: 'Senior Medical Roster Faculty',
    commonTreatments: [
      'Orthopaedic Fracture & Joint Arthritis Consultations',
      'Paediatric Newborn Health & Immunization Clinic',
      'Chronic Lifestyle & Metabolic Disease Management',
      'Pre-Surgical Opinion & Second Consultations'
    ],
    facilities: ['Private Examination Chambers', 'Digital Token Queue Management', 'Wheelchair Accessible Corridors'],
    opdSchedule: 'Monday to Saturday: 09:30 AM – 08:30 PM (Sundays: 10:00 AM – 02:00 PM)',
    iconName: 'UserCheck'
  }
];

export const DOCTORS: Doctor[] = [
  {
    id: 'doc-1',
    name: 'Dr. R. K. Choudhary',
    title: 'Senior Consultant Physician',
    departmentId: 'gen-med',
    departmentName: 'General Medicine',
    qualifications: 'MBBS, MD (General Medicine) - PMCH Patna',
    experience: 'Over 18 years clinical practice',
    opdTimings: '10:00 AM – 02:00 PM & 05:00 PM – 07:30 PM',
    opdDays: 'Monday to Saturday',
    roomNumber: 'OPD Chamber 101, First Floor',
    bio: 'Respected internist with extensive experience in managing complex diabetic cases, cardiovascular risk profiles, geriatric illnesses, and refractory tropical fevers.',
    specializations: ['Diabetes Mellitus', 'Tropical Fevers', 'Hypertension', 'Geriatric Health'],
    gender: 'male'
  },
  {
    id: 'doc-2',
    name: 'Dr. Alok Verma',
    title: 'Senior General & Laparoscopic Surgeon',
    departmentId: 'surgery',
    departmentName: 'General & Laparoscopic Surgery',
    qualifications: 'MBBS, MS (General Surgery), FMAS',
    experience: 'Over 15 years surgical practice',
    opdTimings: '11:00 AM – 03:00 PM & 06:00 PM – 08:30 PM',
    opdDays: 'Monday to Saturday',
    roomNumber: 'OPD Chamber 104, First Floor',
    bio: 'Specialist in minimally invasive keyhole abdominal surgeries, complex hernia repair, emergency abdominal trauma, and modern anorectal procedures.',
    specializations: ['Laparoscopic Cholecystectomy', 'Hernia Surgery', 'Appendectomy', 'Emergency Trauma'],
    gender: 'male'
  },
  {
    id: 'doc-3',
    name: 'Dr. S. N. Mishra',
    title: 'Senior Consultant Orthopaedic Surgeon',
    departmentId: 'ortho',
    departmentName: 'Orthopaedics & Joint Trauma',
    qualifications: 'MBBS, MS (Orthopaedics), DNB (Ortho)',
    experience: 'Over 14 years clinical & trauma experience',
    opdTimings: '10:30 AM – 02:30 PM & 05:30 PM – 08:00 PM',
    opdDays: 'Monday to Saturday',
    roomNumber: 'OPD Chamber 102, First Floor',
    bio: 'Experienced in acute road trauma resuscitation, complex peri-articular fractures, joint pain management, and bone deformity corrections.',
    specializations: ['Trauma Fixation', 'Arthritis Protocol', 'Spine Conservative Management', 'C-Arm Surgeries'],
    gender: 'male'
  },
  {
    id: 'doc-4',
    name: 'Dr. (Smt.) Meenakshi Sinha',
    title: 'Consultant Obstetrician & Gynaecologist',
    departmentId: 'gynae',
    departmentName: 'Obstetrics & Gynaecology',
    qualifications: 'MBBS, MD (Obstetrics & Gynaecology), DGO',
    experience: 'Over 16 years clinical practice',
    opdTimings: '09:30 AM – 01:30 PM & 04:30 PM – 07:30 PM',
    opdDays: 'Monday to Saturday',
    roomNumber: 'OPD Chamber 106, First Floor',
    bio: 'Dedicated to dignified, safe maternal healthcare, antenatal counseling, high-risk pregnancy monitoring, and comprehensive reproductive wellness.',
    specializations: ['High-Risk Pregnancy', 'Normal & C-Section Deliveries', 'PCOS / PCOD', 'Infertility Evaluation'],
    gender: 'female'
  },
  {
    id: 'doc-5',
    name: 'Dr. Abhishek Anand',
    title: 'Consultant Paediatrician & Child Health Specialist',
    departmentId: 'paediatrics',
    departmentName: 'Paediatrics & Child Health',
    qualifications: 'MBBS, MD (Paediatrics)',
    experience: 'Over 11 years paediatric practice',
    opdTimings: '10:00 AM – 02:00 PM & 05:00 PM – 08:00 PM',
    opdDays: 'Monday to Saturday',
    roomNumber: 'OPD Chamber 105, First Floor',
    bio: 'Gentle, approachable child specialist managing newborn health, infantile chest conditions, immunization schedules, and developmental assessments.',
    specializations: ['Newborn Care', 'Vaccination', 'Childhood Infections', 'Nutritional Guidance'],
    gender: 'male'
  },
  {
    id: 'doc-6',
    name: 'Dr. Vivek Kumar',
    title: 'Chief Critical Care & Anaesthesia Specialist',
    departmentId: 'critical-care',
    departmentName: 'ICU & Emergency Care',
    qualifications: 'MBBS, DA, DNB (Critical Care & Anaesthesiology)',
    experience: 'Over 13 years intensive care practice',
    opdTimings: '24x7 ICU In-charge & Consultation by Appointment',
    opdDays: 'Daily Rounds & Emergency On-Call',
    roomNumber: 'ICU Station, Ground Floor',
    bio: 'Oversees advanced ventilator management, emergency resuscitation protocols, central line placement, and post-operative critical patient stabilization.',
    specializations: ['Advanced Mechanical Ventilation', 'Hemodynamic Monitoring', 'Toxico-Trauma Care', 'Pain Management'],
    gender: 'male'
  },
  {
    id: 'doc-7',
    name: 'Dr. Pratibha Kumari',
    title: 'Consultant Clinical Pathologist',
    departmentId: 'diagnostics',
    departmentName: 'Diagnostics & Pathology',
    qualifications: 'MBBS, MD (Pathology)',
    experience: 'Over 12 years diagnostic practice',
    opdTimings: '08:30 AM – 03:00 PM',
    opdDays: 'Monday to Saturday',
    roomNumber: 'Diagnostic Centre, Ground Floor',
    bio: 'Directs the diagnostic laboratory ensuring strict quality control, accurate automated blood counts, biochemistry calibration, and rapid clinical reporting.',
    specializations: ['Hematology', 'Biochemistry', 'Serology Testing', 'Clinical Cytology'],
    gender: 'female'
  }
];

export const FACILITIES: Facility[] = [
  {
    id: 'fac-1',
    title: 'Modular Operation Theatre Complex',
    category: 'surgical',
    description: 'Equipped with HEPA filter laminar airflow positive-pressure system, anti-bacterial seamless flooring, modern LED surgical illumination, and high-precision anesthesia workstations.',
    keyFeatures: ['Laminar Airflow with HEPA-14 Filtration', 'High-Definition Laparoscopy Tower', 'Central Anaesthesia Gas Scavenging', 'Digital C-Arm Fluoroscopy'],
    badge: 'Sterile Surgical Suite',
    floorLocation: 'Second Floor (Surgical Wing)',
    capacity: '2 Dedicated Modular Theatres',
    specialistInCharge: 'Dr. Alok Verma, MS (Gen Surgery)',
    visitingHours: 'Restricted sterile zone - patient attendants permitted only in pre-op waiting lounge',
    sanitationProtocol: 'Class 10,000 cleanroom standard, daily UV fumigation, four-stage instrument autoclaving',
    equipmentSpecs: [
      'Positive pressure laminar air ceiling with HEPA filters',
      'Dual-dome LED surgical lights with integrated HD camera',
      'Karl Storz high-definition laparoscopy video tower',
      'Multi-parameter anesthesia delivery workstation with ventilator',
      'High-frequency electrosurgical cautery unit with smoke evacuator'
    ],
    visualType: 'ot'
  },
  {
    id: 'fac-2',
    title: 'Intensive Care Unit (ICU) & HDU',
    category: 'critical',
    description: 'Equipped for round-the-clock monitoring of critically ill patients with dedicated invasive ventilators, multipara cardiac monitors, and 1:1 trained nursing ratio for ventilated patients.',
    keyFeatures: ['Advanced Mechanical Ventilators', 'Multiparameter Cardiac Monitors', 'Uninterrupted Central Oxygen Supply', 'Emergency Defibrillator & Crash Cart'],
    badge: '24×7 Critical Care',
    floorLocation: 'Ground Floor (East Wing)',
    capacity: 'Dedicated Multi-bed Critical Care Pods',
    specialistInCharge: 'Dr. Vivek Kumar, DNB (Critical Care)',
    visitingHours: 'Strict: 11:30 AM – 12:30 PM & 05:30 PM – 06:30 PM (1 attendant only with barrier gown)',
    sanitationProtocol: 'Continuous HEPA air exchange, barrier nursing protocols, daily terminal surface disinfection',
    equipmentSpecs: [
      'Invasive and non-invasive mechanical ventilators (Dräger & Philips)',
      'Multiparameter bedside monitors (ECG, SpO2, NIBP, EtCO2, Temp)',
      'Centralized medical gas and vacuum pipeline distribution (MGPS)',
      'Automated syringe infusion pumps for critical drug titration',
      'Biphasic defibrillator with synchronized external pacemaker'
    ],
    visualType: 'icu'
  },
  {
    id: 'fac-3',
    title: '24×7 Emergency & Trauma Casualty',
    category: 'critical',
    description: 'Ground floor emergency triage wing with dedicated ambulance drop-off bay, immediate physician assessment, emergency minor OT, and quick trauma stabilization.',
    keyFeatures: ['Direct Ambulance Bay Access', 'Emergency Resuscitation Beds', 'Rapid Point-of-Care Diagnostics', 'Trauma Stabilization Team'],
    badge: 'Always Open (24×7)',
    floorLocation: 'Ground Floor (Direct Street Portico)',
    capacity: 'Casualty Triage, Trauma Bays & Minor OT',
    specialistInCharge: 'Casualty Medical Officer on Duty (24×7)',
    visitingHours: '24 Hours Open for Immediate Patient Admissions',
    sanitationProtocol: 'Rapid turnaround chemical sanitization after trauma resuscitation, sterile disposable kits',
    equipmentSpecs: [
      'Level-1 emergency trauma resuscitation crash carts',
      'Multipara emergency cardiac monitors and automated external defibrillators',
      'Emergency minor procedure OT for suturing and wound debridement',
      'High-flow oxygen ports and suction catheters at every trauma bed',
      'Rapid point-of-care capillary blood glucose and cardiac biomarker testing'
    ],
    visualType: 'emergency'
  },
  {
    id: 'fac-4',
    title: 'Automated Diagnostic & Pathology Laboratory',
    category: 'diagnostic',
    description: 'Fully equipped automated pathology laboratory with computerised cell counters, automated biochemistry analyzers, and barcoded specimen testing for rapid reporting.',
    keyFeatures: ['Barcoded Sample Processing', '5-Part Hematology Counter', 'Automated Clinical Biochemistry', 'Stat Emergency Testing 24×7'],
    badge: 'Quality Calibrated',
    floorLocation: 'First Floor (Diagnostic Wing)',
    capacity: 'Over 200 clinical samples processed daily',
    specialistInCharge: 'Dr. Pratibha Kumari, MD (Pathology)',
    visitingHours: 'Sample Collection: Mon - Sat 07:30 AM – 07:30 PM (Stat emergency 24×7)',
    sanitationProtocol: 'Biosafety Level 2 containment, calibrated controls, strict biohazard waste segregation',
    equipmentSpecs: [
      'Fully automated 5-part differential hematology cell analyzer',
      'Computerized clinical biochemistry photometer & electrolyte analyzer',
      'Centrifugation systems with digital tachometer control',
      'Temperature-monitored cold storage for reagents and serum specimens',
      'Integrated computerized reporting software with barcode sample matching'
    ],
    visualType: 'lab'
  },
  {
    id: 'fac-5',
    title: 'Digital High-Frequency X-Ray & ECG Suite',
    category: 'diagnostic',
    description: 'Lead-shielded digital radiology room providing low-radiation digital radiography for bone trauma, pulmonary evaluations, and 12-lead computerized electrocardiograms.',
    keyFeatures: ['Digital Radiography (DR) System', 'Lead-Lined Radiation Shielding', '12-Lead Computerized ECG', 'Immediate Digital Preview'],
    badge: 'Low Radiation Digital',
    floorLocation: 'First Floor (Diagnostic Wing Room 108)',
    capacity: 'Walk-in OPD and Inpatient Mobile Radiography',
    specialistInCharge: 'Registered Radiology Technologists & Panel Radiologists',
    visitingHours: '08:00 AM – 08:00 PM (Emergency portable X-Ray available 24×7)',
    sanitationProtocol: 'AERB-compliant lead shielding walls, sanitised patient positioning surfaces',
    equipmentSpecs: [
      'High-frequency digital radiography generator with flat panel detector',
      'Computerized 12-channel resting ECG with automated rhythm interpretation',
      'Radiation safety lead aprons, thyroid shields, and gonadal guards',
      'High-resolution medical-grade diagnostic display monitors',
      'Direct integration with hospital patient records for digital film review'
    ],
    visualType: 'xray'
  },
  {
    id: 'fac-6',
    title: 'Deluxe & Single Private Inpatient Rooms',
    category: 'inpatient',
    description: 'Thoughtfully planned patient accommodation designed with privacy, cleanliness, natural daylight, comfortable attendant couch, and nurse call-bell systems.',
    keyFeatures: ['Motorized Ergonomic Patient Bed', 'Comfortable Attendant Settee', 'Attached Clean Sanitised Washroom', 'Bedside Emergency Call Buzzer'],
    badge: 'Private & Dignified',
    floorLocation: 'Second Floor (Inpatient Wing)',
    capacity: 'Individual Air-Conditioned Patient Suites',
    specialistInCharge: 'Nursing Superintendent & Attending Consultant',
    visitingHours: 'General Visiting: 10:00 AM – 12:00 PM & 05:00 PM – 07:00 PM (1 resident attendant pass)',
    sanitationProtocol: 'Twice daily deep sanitization, fresh linen changes, touchpoint chemical wipes',
    equipmentSpecs: [
      'Remote-controlled 3-function motorized hospital bed with side rails',
      'Bedside medical gas console (oxygen flowmeter and vacuum port)',
      'Ergonomic attendant sleeper sofa bed with clean linen',
      'En-suite sanitised ceramic bathroom with grab bars and hot water geyser',
      'Digital patient nurse call buzzer and room intercom system'
    ],
    visualType: 'ward'
  },
  {
    id: 'fac-7',
    title: 'Semi-Private & General Patient Wards',
    category: 'inpatient',
    description: 'Spacious, well-ventilated wards designed for affordable inpatient recovery with privacy curtains, hygienic surroundings, and attentive round-the-clock nursing care.',
    keyFeatures: ['Privacy Curtain Partitions', 'Central Medical Gas Supply', 'Attendant Stool & Storage Locker', '24×7 Ward Nursing Station'],
    badge: 'Clean & Comfortable',
    floorLocation: 'First Floor (Inpatient Block)',
    capacity: 'Organized Multi-bed Step-Down Wards',
    specialistInCharge: 'Floor In-charge Sister & Resident Medical Officers',
    visitingHours: 'Evening: 04:30 PM – 06:30 PM (Attendant pass required)',
    sanitationProtocol: 'Scheduled morning and evening wet mop sanitization with hospital-grade disinfectant',
    equipmentSpecs: [
      'Multi-position hospital beds with sturdy safety side guardrails',
      'Dedicated bedside oxygen supply flowmeter and suction connection',
      'Overbed adjustable dining tables and individual attendant lockers',
      'Direct sightline to central ward nursing station for rapid response',
      'Separate male and female ward bays with dedicated sanitary blocks'
    ],
    visualType: 'ward'
  },
  {
    id: 'fac-8',
    title: '24×7 In-House Hospital Pharmacy',
    category: 'general',
    description: 'Stocked with genuine, temperature-controlled medicines, surgical consumables, pediatric drops, and critical emergency injectables right within the hospital premises.',
    keyFeatures: ['Cold-Chain Vaccine & Insulin Storage', 'Emergency ICU Injectables Stock', 'Round-the-Clock Dispensary', 'Transparent Itemised Invoicing'],
    badge: '24×7 Medicine Counter',
    floorLocation: 'Ground Floor (Main Lobby, Opp Reception)',
    capacity: 'Complete hospital formulary inventory',
    specialistInCharge: 'Registered Pharmacists on Rotational Duty',
    visitingHours: 'Open 24 Hours, 365 Days a Year',
    sanitationProtocol: 'Temperature and humidity controlled room (20°C - 24°C), sealed medicine dispensers',
    equipmentSpecs: [
      'Medical-grade cold chain refrigerator (2°C to 8°C) with continuous temperature logging',
      'Computerized inventory and point-of-sale ERP system with batch tracking',
      'Complete range of parenteral fluids, critical care vasopressors, and antibiotics',
      'Surgical disposables, orthopedic splints, abdominal binders, and catheter kits',
      'Transparent printed GST receipts with batch number and expiry dates'
    ],
    visualType: 'pharmacy'
  },
  {
    id: 'fac-9',
    title: 'Central Reception & Patient Attendant Lounge',
    category: 'general',
    description: 'Air-conditioned front desk and waiting lounge providing smooth patient registration, OPD token management, admission counseling, and attendant seating.',
    keyFeatures: ['Token Queue Management Desk', 'Comfortable Attendant Seating', 'RO Purified Drinking Water', 'Admission Counseling Counter'],
    badge: 'Patient First Desk',
    floorLocation: 'Ground Floor (Main Entrance)',
    capacity: 'Seating for 40+ patient attendants and visitors',
    specialistInCharge: 'Hospital Reception & Patient Relations Team',
    visitingHours: '08:00 AM – 08:30 PM for OPD Inquiries (Emergency admission open 24×7)',
    sanitationProtocol: 'Periodic seating sanitization, clean entryway floor mats, air purification',
    equipmentSpecs: [
      'Digital token calling display board and multi-window billing counters',
      'Commercial multi-stage RO drinking water dispensing station with paper cups',
      'Ergonomic heavy-duty waiting lounge seating for patient attendants',
      'Wheelchair parking bay and stretcher ramp at the portico threshold',
      'Digital feedback kiosk and official hospital information bulletin boards'
    ],
    visualType: 'reception'
  },
  {
    id: 'fac-10',
    title: '24×7 Emergency Ambulance Service',
    category: 'critical',
    description: 'Dedicated patient transfer ambulance stationed at Memco More Chowk equipped with oxygen support, scoop stretchers, and emergency medical kits.',
    keyFeatures: ['On-Board Central Oxygen Cylinder', 'Foldable Ambulance Stretcher', 'Trained Emergency Driver & EMT', 'Direct Memco More Bypass Access'],
    badge: 'Rapid Response Fleet',
    floorLocation: 'Ground Floor Portico & Dedicated Parking Bay',
    capacity: 'Immediate dispatch for Dhanbad & surrounding areas',
    specialistInCharge: 'Emergency Dispatch Coordinator',
    visitingHours: 'On Standby 24 Hours, 7 Days a Week',
    sanitationProtocol: 'Complete interior vehicle fumigation and sanitization after every patient transit',
    equipmentSpecs: [
      'Main medical oxygen cylinder with humidifier and nasal cannulas',
      'Auto-loading stainless steel ambulance stretcher and scoop stretcher',
      'Portable emergency suction unit and ambu bags (adult and pediatric)',
      'First-aid stabilization trauma kit and cervical immobilization collars',
      'Direct mobile phone and VHF radio communication with casualty desk'
    ],
    visualType: 'ambulance'
  }
];

export const TRUST_PILLARS = [
  {
    title: 'Experienced Medical Team',
    desc: 'Qualified specialists with MBBS, MD, MS, and DNB credentials providing dedicated and patient-first care.',
    iconName: 'Award'
  },
  {
    title: 'Patient-Centered Care',
    desc: 'Transparent medical advice, respectful communication with patient families, and ethical treatment protocols.',
    iconName: 'HeartHandshake'
  },
  {
    title: 'Modern Facilities',
    desc: 'Modular operation theatres, ventilated intensive care, digital X-Ray, and fully automated in-house diagnostics.',
    iconName: 'Building2'
  },
  {
    title: 'Accessible Location',
    desc: 'Conveniently situated at Memco More Chowk on the GT Road bypass with smooth road connectivity across Dhanbad.',
    iconName: 'MapPin'
  },
  {
    title: '24×7 Emergency Support',
    desc: 'Round-the-clock emergency casualty, inpatient nursing care, pharmacy access, and ambulance coordination.',
    iconName: 'Clock'
  }
];

export const WHY_CHOOSE_CARDS = [
  {
    id: 'why-1',
    title: 'Patient-Centered Care',
    description: 'A healthcare experience designed around patient needs and comfort.',
    iconName: 'HeartHandshake'
  },
  {
    id: 'why-2',
    title: 'Professional Medical Team',
    description: 'Access to qualified healthcare professionals.',
    iconName: 'Award'
  },
  {
    id: 'why-3',
    title: 'Modern Facilities',
    description: 'A clean and organized healthcare environment.',
    iconName: 'Building2'
  },
  {
    id: 'why-4',
    title: 'Accessible Location',
    description: 'Conveniently located at Memco More, Dhanbad.',
    iconName: 'MapPin'
  },
  {
    id: 'why-5',
    title: 'Healthcare Support',
    description: 'Clear communication and assistance for patients and attendants.',
    iconName: 'Clock'
  },
  {
    id: 'why-6',
    title: 'Comprehensive Care',
    description: 'Healthcare services organized to support different patient needs.',
    iconName: 'ShieldCheck'
  }
];

export const TRUST_HIGHLIGHTS = [
  {
    id: 'th-1',
    title: 'Professional Healthcare',
    subtitle: 'Standardized clinical protocols'
  },
  {
    id: 'th-2',
    title: 'Patient-Focused Approach',
    subtitle: 'Compassionate, respectful care'
  },
  {
    id: 'th-3',
    title: 'Modern Healthcare Environment',
    subtitle: 'Clean, hygienic infrastructure'
  },
  {
    id: 'th-4',
    title: 'Accessible Location',
    subtitle: 'Memco More Chowk, Dhanbad'
  }
];

export const FAQS: FAQ[] = [
  {
    id: 'faq-1',
    category: 'opd',
    question: 'Where is Sarphi Hospital located?',
    answer: 'Sarphi Hospital is located at Memco More, Near GT Road By-pass, Dhanbad, Jharkhand, Pin - 826004, India. It is easily reachable from Dhanbad Railway Station, Bank More, and Steel Gate.'
  },
  {
    id: 'faq-2',
    category: 'emergency',
    question: 'How can I contact Sarphi Hospital?',
    answer: 'You can contact Sarphi Hospital by calling our primary OPD desk at +91 80022 34567, reception landline at 0326-2204567, or 24×7 emergency helpline at +91 80022 34568. Email inquiries can be sent to care@sarphihospital.com.'
  },
  {
    id: 'faq-3',
    category: 'opd',
    question: 'How can I request an appointment?',
    answer: 'You can easily request an OPD appointment using the "Book an Appointment" button on this website, calling our hospital reception, or walking in directly to the registration counter on the Ground Floor.'
  },
  {
    id: 'faq-4',
    category: 'admission',
    question: 'What healthcare services are available?',
    answer: 'Sarphi Hospital provides General Medicine, Emergency Care, Diagnostic Services (Digital X-Ray & ECG), Laboratory Pathology, Surgical Services (Modular Laparoscopic OT), Maternity Care, 24×7 Pharmacy, and Specialist Consultations.'
  },
  {
    id: 'faq-5',
    category: 'opd',
    question: 'How can I find information about doctors?',
    answer: 'You can view our complete roster of consultant physicians, surgeons, and specialists on the "Doctors" page, detailing qualifications (MBBS, MD, MS, DNB), OPD timings, and chamber locations.'
  },
  {
    id: 'faq-6',
    category: 'emergency',
    question: 'Is emergency assistance available?',
    answer: 'Yes. Emergency triage and trauma assistance are available 24 hours a day, 7 days a week on the ground floor with ambulance drop-off bay, resuscitation beds, and on-call medical staff.'
  },
  {
    id: 'faq-7',
    category: 'admission',
    question: 'Where can I find the hospital?',
    answer: 'Sarphi Hospital is situated directly at Memco More Chowk on the GT Road bypass in Dhanbad. Local auto-rickshaws, e-rickshaws, and city transport connect Memco More directly to all parts of Dhanbad.'
  },
  {
    id: 'faq-8',
    category: 'insurance',
    question: 'How can I get more information about a service?',
    answer: 'For detailed queries regarding a specific clinical department, investigation charges, or hospitalization guidelines, please use the Contact page form, message our WhatsApp helpdesk, or call +91 80022 34567.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    patientName: 'Sunil Kumar Mahto',
    relation: 'Patient Attendant (Govindpur, Dhanbad)',
    hometown: 'Govindpur, Dhanbad',
    department: 'Surgical Services',
    content: 'The laparoscopic surgery and post-operative care provided to my mother was handled with genuine compassion and hygiene. Clear explanations were given at every step.',
    verifiedAttendant: true
  },
  {
    id: 't-2',
    patientName: 'Rajesh Pandey',
    relation: 'Emergency Trauma Patient (Saraidhela, Dhanbad)',
    hometown: 'Saraidhela, Dhanbad',
    department: 'Emergency & Orthopaedics',
    content: 'Following a road mishap near Memco More, the casualty team at Sarphi Hospital attended immediately without delay. The fracture was stabilized promptly.',
    verifiedAttendant: true
  },
  {
    id: 't-3',
    patientName: 'Anjali Srivastava',
    relation: 'Newborn Mother (Bank More, Dhanbad)',
    hometown: 'Bank More, Dhanbad',
    department: 'Maternity Care',
    content: 'A peaceful, clean, and dignified environment for childbirth. The nursing staff was very attentive and the pediatrician gave us calm guidance as first-time parents.',
    verifiedAttendant: true
  }
];
