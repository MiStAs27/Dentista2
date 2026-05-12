import { User, Patient, Appointment, Treatment, MedicalHistory, Odontogram, ToothStatus, DashboardStats, ClinicSettings, Notification } from '../types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'dr.garcia@dentasync.com',
    name: 'Dr. Carlos García',
    role: 'dentist',
    phone: '+591 70123456',
    specialization: 'Odontología General',
    licenseNumber: 'ODT-2018-1234',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop'
  },
  {
    id: '2',
    email: 'ana.lopez@dentasync.com',
    name: 'Ana López',
    role: 'assistant',
    phone: '+591 71234567',
    avatar: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=400&fit=crop'
  },
];

// Mock Patients
export const mockPatients: Patient[] = [
  {
    id: 'p1',
    firstName: 'María',
    lastName: 'Fernández',
    email: 'maria.fernandez@email.com',
    phone: '+591 72345678',
    dateOfBirth: '1985-03-15',
    gender: 'female',
    address: 'Av. Ballivián 1234',
    city: 'La Paz',
    emergencyContact: 'Juan Fernández',
    emergencyPhone: '+591 73456789',
    bloodType: 'O+',
    allergies: ['Penicilina'],
    medicalConditions: ['Hipertensión'],
    currentMedications: ['Losartán 50mg'],
    registrationDate: '2024-01-15',
    lastVisit: '2026-02-10',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    status: 'active'
  },
  {
    id: 'p2',
    firstName: 'Roberto',
    lastName: 'Mendoza',
    email: 'roberto.mendoza@email.com',
    phone: '+591 74567890',
    dateOfBirth: '1992-07-22',
    gender: 'male',
    address: 'Calle Comercio 567',
    city: 'La Paz',
    emergencyContact: 'Carmen Mendoza',
    emergencyPhone: '+591 75678901',
    bloodType: 'A+',
    allergies: [],
    medicalConditions: [],
    currentMedications: [],
    registrationDate: '2024-03-20',
    lastVisit: '2026-02-18',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    status: 'active'
  },
  {
    id: 'p3',
    firstName: 'Carmen',
    lastName: 'Quispe',
    email: 'carmen.quispe@email.com',
    phone: '+591 76789012',
    dateOfBirth: '1978-11-08',
    gender: 'female',
    address: 'Zona Sur, Calle 21',
    city: 'La Paz',
    emergencyContact: 'Pedro Quispe',
    emergencyPhone: '+591 77890123',
    bloodType: 'B+',
    allergies: ['Latex'],
    medicalConditions: ['Diabetes Tipo 2'],
    currentMedications: ['Metformina 850mg'],
    registrationDate: '2023-11-10',
    lastVisit: '2026-02-20',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
    status: 'active'
  },
  {
    id: 'p4',
    firstName: 'Luis',
    lastName: 'Torrez',
    email: 'luis.torrez@email.com',
    phone: '+591 78901234',
    dateOfBirth: '2000-05-12',
    gender: 'male',
    address: 'Sopocachi, Av. 6 de Agosto',
    city: 'La Paz',
    emergencyContact: 'Rosa Torrez',
    emergencyPhone: '+591 79012345',
    bloodType: 'AB+',
    allergies: [],
    medicalConditions: [],
    currentMedications: [],
    registrationDate: '2025-06-15',
    lastVisit: '2026-02-15',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    status: 'active'
  },
  {
    id: 'p5',
    firstName: 'Sofía',
    lastName: 'Vargas',
    email: 'sofia.vargas@email.com',
    phone: '+591 70111222',
    dateOfBirth: '1995-09-30',
    gender: 'female',
    address: 'Miraflores, Calle 15',
    city: 'La Paz',
    emergencyContact: 'Jorge Vargas',
    emergencyPhone: '+591 71222333',
    bloodType: 'O-',
    allergies: ['Ibuprofeno'],
    medicalConditions: [],
    currentMedications: [],
    registrationDate: '2025-02-10',
    lastVisit: '2026-02-22',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    status: 'active'
  },
  {
    id: 'p6',
    firstName: 'Diego',
    lastName: 'Chávez',
    email: 'diego.chavez@email.com',
    phone: '+591 72333444',
    dateOfBirth: '1988-02-14',
    gender: 'male',
    address: 'Calacoto, Av. Montenegro',
    city: 'La Paz',
    emergencyContact: 'Laura Chávez',
    emergencyPhone: '+591 73444555',
    bloodType: 'A-',
    allergies: [],
    medicalConditions: ['Asma'],
    currentMedications: ['Salbutamol'],
    registrationDate: '2024-08-05',
    lastVisit: '2026-02-19',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
    status: 'active'
  },
];

// Mock Appointments
export const mockAppointments: Appointment[] = [
  {
    id: 'a1',
    patientId: 'p1',
    patientName: 'María Fernández',
    dentistId: '1',
    dentistName: 'Dr. Carlos García',
    date: '2026-02-24',
    time: '09:00',
    duration: 30,
    type: 'consultation',
    status: 'confirmed',
    notes: 'Revisión de rutina',
    reminderSent: true,
    createdAt: '2026-02-17T10:00:00Z'
  },
  {
    id: 'a2',
    patientId: 'p2',
    patientName: 'Roberto Mendoza',
    dentistId: '1',
    dentistName: 'Dr. Carlos García',
    date: '2026-02-24',
    time: '10:00',
    duration: 60,
    type: 'cleaning',
    status: 'confirmed',
    notes: 'Limpieza profunda',
    reminderSent: true,
    createdAt: '2026-02-18T14:30:00Z'
  },
  {
    id: 'a3',
    patientId: 'p3',
    patientName: 'Carmen Quispe',
    dentistId: '1',
    dentistName: 'Dr. Carlos García',
    date: '2026-02-24',
    time: '14:00',
    duration: 45,
    type: 'filling',
    status: 'scheduled',
    notes: 'Relleno molar superior izquierdo',
    reminderSent: false,
    createdAt: '2026-02-20T09:15:00Z'
  },
  {
    id: 'a4',
    patientId: 'p4',
    patientName: 'Luis Torrez',
    dentistId: '1',
    dentistName: 'Dr. Carlos García',
    date: '2026-02-24',
    time: '16:00',
    duration: 30,
    type: 'follow_up',
    status: 'scheduled',
    notes: 'Seguimiento post-extracción',
    reminderSent: false,
    createdAt: '2026-02-21T11:00:00Z'
  },
  {
    id: 'a5',
    patientId: 'p5',
    patientName: 'Sofía Vargas',
    dentistId: '1',
    dentistName: 'Dr. Carlos García',
    date: '2026-02-25',
    time: '09:00',
    duration: 90,
    type: 'root_canal',
    status: 'scheduled',
    notes: 'Endodoncia segundo premolar',
    reminderSent: false,
    createdAt: '2026-02-22T15:45:00Z'
  },
  {
    id: 'a6',
    patientId: 'p6',
    patientName: 'Diego Chávez',
    dentistId: '1',
    dentistName: 'Dr. Carlos García',
    date: '2026-02-25',
    time: '11:00',
    duration: 60,
    type: 'orthodontics',
    status: 'confirmed',
    notes: 'Evaluación para ortodoncia',
    reminderSent: true,
    createdAt: '2026-02-19T08:20:00Z'
  },
  {
    id: 'a7',
    patientId: 'p1',
    patientName: 'María Fernández',
    dentistId: '1',
    dentistName: 'Dr. Carlos García',
    date: '2026-02-26',
    time: '10:00',
    duration: 30,
    type: 'consultation',
    status: 'scheduled',
    notes: '',
    reminderSent: false,
    createdAt: '2026-02-23T12:00:00Z'
  },
];

// Mock Treatments
export const mockTreatments: Treatment[] = [
  {
    id: 't1',
    patientId: 'p1',
    appointmentId: 'a1',
    date: '2026-02-10',
    diagnosis: 'Caries leve en molar 16',
    treatment: 'Relleno de composite',
    tooth: 16,
    cost: 350,
    paid: true,
    notes: 'Paciente tolera bien el procedimiento',
    prescriptions: []
  },
  {
    id: 't2',
    patientId: 'p2',
    appointmentId: 'a2',
    date: '2026-02-18',
    diagnosis: 'Acumulación de sarro moderada',
    treatment: 'Profilaxis dental',
    cost: 280,
    paid: true,
    notes: 'Recomendar cepillado tres veces al día',
    prescriptions: []
  },
  {
    id: 't3',
    patientId: 'p4',
    date: '2026-02-15',
    diagnosis: 'Muela del juicio impactada',
    treatment: 'Extracción quirúrgica',
    tooth: 38,
    cost: 650,
    paid: false,
    notes: 'Procedimiento sin complicaciones',
    prescriptions: [
      {
        id: 'pr1',
        medication: 'Ibuprofeno',
        dosage: '400mg',
        frequency: 'Cada 8 horas',
        duration: '5 días',
        instructions: 'Tomar con alimentos'
      },
      {
        id: 'pr2',
        medication: 'Amoxicilina',
        dosage: '500mg',
        frequency: 'Cada 8 horas',
        duration: '7 días',
        instructions: 'Completar el tratamiento'
      }
    ]
  },
];

// Mock Medical Histories
export const mockMedicalHistories: MedicalHistory[] = [
  {
    id: 'mh1',
    patientId: 'p1',
    allergies: ['Penicilina'],
    medicalConditions: ['Hipertensión'],
    currentMedications: ['Losartán 50mg'],
    previousDentalWork: ['Relleno molar 16 (2026)', 'Limpieza (2025)'],
    lastDentalVisit: '2026-02-10',
    notes: 'Paciente con buena salud dental general',
    updatedAt: '2026-02-10T14:30:00Z'
  },
  {
    id: 'mh2',
    patientId: 'p2',
    allergies: [],
    medicalConditions: [],
    currentMedications: [],
    previousDentalWork: ['Limpieza (2026)', 'Extracción muela del juicio (2024)'],
    lastDentalVisit: '2026-02-18',
    notes: 'Higiene dental adecuada',
    updatedAt: '2026-02-18T11:00:00Z'
  },
  {
    id: 'mh3',
    patientId: 'p3',
    allergies: ['Latex'],
    medicalConditions: ['Diabetes Tipo 2'],
    currentMedications: ['Metformina 850mg'],
    previousDentalWork: ['Corona molar 26 (2024)', 'Múltiples rellenos'],
    lastDentalVisit: '2026-02-20',
    notes: 'Requiere control estricto de glucosa antes de procedimientos',
    updatedAt: '2026-02-20T10:15:00Z'
  },
];

// Mock Odontograms
const generateHealthyTeeth = (): ToothStatus[] => {
  const teeth: ToothStatus[] = [];
  // Dientes superiores (11-18, 21-28)
  for (let i = 11; i <= 18; i++) {
    teeth.push({
      number: i,
      status: 'healthy',
      lastUpdated: '2026-02-01T00:00:00Z'
    });
  }
  for (let i = 21; i <= 28; i++) {
    teeth.push({
      number: i,
      status: 'healthy',
      lastUpdated: '2026-02-01T00:00:00Z'
    });
  }
  // Dientes inferiores (31-38, 41-48)
  for (let i = 31; i <= 38; i++) {
    teeth.push({
      number: i,
      status: 'healthy',
      lastUpdated: '2026-02-01T00:00:00Z'
    });
  }
  for (let i = 41; i <= 48; i++) {
    teeth.push({
      number: i,
      status: 'healthy',
      lastUpdated: '2026-02-01T00:00:00Z'
    });
  }
  return teeth;
};

export const mockOdontograms: Odontogram[] = [
  {
    id: 'od1',
    patientId: 'p1',
    teeth: generateHealthyTeeth().map(tooth => {
      if (tooth.number === 16) return { ...tooth, status: 'filled' as const, notes: 'Composite 2026', lastUpdated: '2026-02-10T00:00:00Z' };
      return tooth;
    }),
    updatedAt: '2026-02-10T14:30:00Z'
  },
  {
    id: 'od2',
    patientId: 'p2',
    teeth: generateHealthyTeeth().map(tooth => {
      if (tooth.number === 38) return { ...tooth, status: 'missing' as const, notes: 'Extraída 2024', lastUpdated: '2024-06-15T00:00:00Z' };
      return tooth;
    }),
    updatedAt: '2026-02-18T11:00:00Z'
  },
  {
    id: 'od3',
    patientId: 'p3',
    teeth: generateHealthyTeeth().map(tooth => {
      if (tooth.number === 26) return { ...tooth, status: 'crown' as const, notes: 'Corona de porcelana 2024', lastUpdated: '2024-03-20T00:00:00Z' };
      if (tooth.number === 36) return { ...tooth, status: 'filled' as const, notes: 'Amalgama antigua', lastUpdated: '2020-01-10T00:00:00Z' };
      if (tooth.number === 46) return { ...tooth, status: 'filled' as const, notes: 'Composite', lastUpdated: '2023-08-15T00:00:00Z' };
      return tooth;
    }),
    updatedAt: '2026-02-20T10:15:00Z'
  },
];

// Mock Dashboard Stats
export const mockDashboardStats: DashboardStats = {
  totalPatients: mockPatients.length,
  todayAppointments: mockAppointments.filter(a => a.date === '2026-02-24').length,
  upcomingAppointments: mockAppointments.filter(a => {
    const appointmentDate = new Date(a.date);
    const today = new Date('2026-02-24');
    return appointmentDate >= today && a.status !== 'cancelled';
  }).length,
  completedToday: mockAppointments.filter(a => a.date === '2026-02-24' && a.status === 'completed').length,
  revenue: {
    today: 1250,
    week: 4680,
    month: 18950
  },
  noShowRate: 4.2,
  averageRating: 4.8
};

// Mock Clinic Settings
export const mockClinicSettings: ClinicSettings = {
  id: 'clinic1',
  name: 'DentaSync Consultorio Dental',
  address: 'Av. Arce 2525, Edif. Multicentro Torre B, Piso 8',
  phone: '+591 2 2441234',
  email: 'contacto@dentasync.com',
  workingHours: {
    monday: { start: '08:00', end: '18:00', enabled: true },
    tuesday: { start: '08:00', end: '18:00', enabled: true },
    wednesday: { start: '08:00', end: '18:00', enabled: true },
    thursday: { start: '08:00', end: '18:00', enabled: true },
    friday: { start: '08:00', end: '17:00', enabled: true },
    saturday: { start: '09:00', end: '13:00', enabled: true },
    sunday: { start: '00:00', end: '00:00', enabled: false },
  },
  appointmentDuration: 30,
  bookingBuffer: 10,
  timezone: 'America/La_Paz',
  currency: 'BOB'
};

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: 'n1',
    userId: '1',
    type: 'appointment_reminder',
    title: 'Cita próxima',
    message: 'Tiene una cita con María Fernández a las 09:00',
    read: false,
    createdAt: '2026-02-24T08:00:00Z',
    actionUrl: '/appointments'
  },
  {
    id: 'n2',
    userId: '1',
    type: 'appointment_confirmed',
    title: 'Cita confirmada',
    message: 'Roberto Mendoza confirmó su cita de las 10:00',
    read: false,
    createdAt: '2026-02-23T16:30:00Z',
    actionUrl: '/appointments'
  },
  {
    id: 'n3',
    userId: '1',
    type: 'payment_due',
    title: 'Pago pendiente',
    message: 'Luis Torrez tiene un pago pendiente de 650 BOB',
    read: true,
    createdAt: '2026-02-22T10:00:00Z',
    actionUrl: '/patients/p4'
  },
];
