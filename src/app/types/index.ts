export type UserRole = 'dentist' | 'assistant' | 'patient';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
  specialization?: string; // Para odontólogos
  licenseNumber?: string; // Para odontólogos
}

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  address: string;
  city: string;
  emergencyContact: string;
  emergencyPhone: string;
  bloodType?: string;
  allergies?: string[];
  medicalConditions?: string[];
  currentMedications?: string[];
  registrationDate: string;
  lastVisit?: string;
  avatar?: string;
  status: 'active' | 'inactive';
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  dentistId: string;
  dentistName: string;
  date: string;
  time: string;
  duration: number; // en minutos
  type: 'consultation' | 'cleaning' | 'extraction' | 'filling' | 'root_canal' | 'orthodontics' | 'cosmetic' | 'emergency' | 'follow_up';
  status: 'scheduled' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'no_show';
  notes?: string;
  reminderSent?: boolean;
  createdAt: string;
}

export interface Treatment {
  id: string;
  patientId: string;
  appointmentId?: string;
  date: string;
  diagnosis: string;
  treatment: string;
  tooth?: number | number[];
  cost: number;
  paid: boolean;
  notes?: string;
  prescriptions?: Prescription[];
}

export interface Prescription {
  id: string;
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
}

export interface MedicalHistory {
  id: string;
  patientId: string;
  allergies: string[];
  medicalConditions: string[];
  currentMedications: string[];
  previousDentalWork: string[];
  lastDentalVisit?: string;
  notes?: string;
  updatedAt: string;
}

export interface ToothStatus {
  number: number;
  status: 'healthy' | 'cavity' | 'filled' | 'crown' | 'missing' | 'root_canal' | 'implant' | 'bridge';
  notes?: string;
  lastUpdated: string;
}

export interface Odontogram {
  id: string;
  patientId: string;
  teeth: ToothStatus[];
  updatedAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'appointment_reminder' | 'appointment_confirmed' | 'appointment_cancelled' | 'payment_due' | 'system';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}

export interface ClinicSettings {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  workingHours: {
    [key: string]: { start: string; end: string; enabled: boolean };
  };
  appointmentDuration: number; // duración por defecto en minutos
  bookingBuffer: number; // tiempo de espera entre citas
  logo?: string;
  timezone: string;
  currency: string;
}

export interface DashboardStats {
  totalPatients: number;
  todayAppointments: number;
  upcomingAppointments: number;
  completedToday: number;
  revenue: {
    today: number;
    week: number;
    month: number;
  };
  noShowRate: number;
  averageRating: number;
}
