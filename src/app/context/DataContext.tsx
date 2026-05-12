import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Patient, Appointment, Treatment, MedicalHistory, Odontogram, Notification, ClinicSettings } from '../types';
import { 
  mockPatients, 
  mockAppointments, 
  mockTreatments, 
  mockMedicalHistories, 
  mockOdontograms, 
  mockNotifications,
  mockClinicSettings 
} from '../data/mockData';

interface DataContextType {
  patients: Patient[];
  appointments: Appointment[];
  treatments: Treatment[];
  medicalHistories: MedicalHistory[];
  odontograms: Odontogram[];
  notifications: Notification[];
  clinicSettings: ClinicSettings;
  
  // Patient methods
  addPatient: (patient: Patient) => void;
  updatePatient: (id: string, patient: Partial<Patient>) => void;
  getPatient: (id: string) => Patient | undefined;
  
  // Appointment methods
  addAppointment: (appointment: Appointment) => void;
  updateAppointment: (id: string, appointment: Partial<Appointment>) => void;
  deleteAppointment: (id: string) => void;
  getAppointment: (id: string) => Appointment | undefined;
  
  // Treatment methods
  addTreatment: (treatment: Treatment) => void;
  getTreatmentsByPatient: (patientId: string) => Treatment[];
  
  // Medical History methods
  updateMedicalHistory: (patientId: string, history: Partial<MedicalHistory>) => void;
  getMedicalHistory: (patientId: string) => MedicalHistory | undefined;
  
  // Odontogram methods
  updateOdontogram: (patientId: string, odontogram: Partial<Odontogram>) => void;
  getOdontogram: (patientId: string) => Odontogram | undefined;
  
  // Notification methods
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [patients, setPatients] = useState<Patient[]>(mockPatients);
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [treatments, setTreatments] = useState<Treatment[]>(mockTreatments);
  const [medicalHistories, setMedicalHistories] = useState<MedicalHistory[]>(mockMedicalHistories);
  const [odontograms, setOdontograms] = useState<Odontogram[]>(mockOdontograms);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [clinicSettings] = useState<ClinicSettings>(mockClinicSettings);

  // Patient methods
  const addPatient = (patient: Patient) => {
    setPatients(prev => [...prev, patient]);
  };

  const updatePatient = (id: string, updatedPatient: Partial<Patient>) => {
    setPatients(prev => prev.map(p => p.id === id ? { ...p, ...updatedPatient } : p));
  };

  const getPatient = (id: string) => {
    return patients.find(p => p.id === id);
  };

  // Appointment methods
  const addAppointment = (appointment: Appointment) => {
    setAppointments(prev => [...prev, appointment]);
  };

  const updateAppointment = (id: string, updatedAppointment: Partial<Appointment>) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, ...updatedAppointment } : a));
  };

  const deleteAppointment = (id: string) => {
    setAppointments(prev => prev.filter(a => a.id !== id));
  };

  const getAppointment = (id: string) => {
    return appointments.find(a => a.id === id);
  };

  // Treatment methods
  const addTreatment = (treatment: Treatment) => {
    setTreatments(prev => [...prev, treatment]);
  };

  const getTreatmentsByPatient = (patientId: string) => {
    return treatments.filter(t => t.patientId === patientId);
  };

  // Medical History methods
  const updateMedicalHistory = (patientId: string, history: Partial<MedicalHistory>) => {
    setMedicalHistories(prev => {
      const existing = prev.find(h => h.patientId === patientId);
      if (existing) {
        return prev.map(h => h.patientId === patientId ? { ...h, ...history, updatedAt: new Date().toISOString() } : h);
      } else {
        return [...prev, { 
          id: `mh${Date.now()}`, 
          patientId, 
          allergies: [],
          medicalConditions: [],
          currentMedications: [],
          previousDentalWork: [],
          updatedAt: new Date().toISOString(),
          ...history 
        } as MedicalHistory];
      }
    });
  };

  const getMedicalHistory = (patientId: string) => {
    return medicalHistories.find(h => h.patientId === patientId);
  };

  // Odontogram methods
  const updateOdontogram = (patientId: string, odontogram: Partial<Odontogram>) => {
    setOdontograms(prev => {
      const existing = prev.find(o => o.patientId === patientId);
      if (existing) {
        return prev.map(o => o.patientId === patientId ? { ...o, ...odontogram, updatedAt: new Date().toISOString() } : o);
      } else {
        return [...prev, { 
          id: `od${Date.now()}`, 
          patientId, 
          teeth: [],
          updatedAt: new Date().toISOString(),
          ...odontogram 
        } as Odontogram];
      }
    });
  };

  const getOdontogram = (patientId: string) => {
    return odontograms.find(o => o.patientId === patientId);
  };

  // Notification methods
  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <DataContext.Provider value={{
      patients,
      appointments,
      treatments,
      medicalHistories,
      odontograms,
      notifications,
      clinicSettings,
      addPatient,
      updatePatient,
      getPatient,
      addAppointment,
      updateAppointment,
      deleteAppointment,
      getAppointment,
      addTreatment,
      getTreatmentsByPatient,
      updateMedicalHistory,
      getMedicalHistory,
      updateOdontogram,
      getOdontogram,
      markNotificationAsRead,
      markAllNotificationsAsRead,
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
