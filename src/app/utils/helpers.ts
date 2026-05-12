import { format, differenceInYears } from 'date-fns';
import { es } from 'date-fns/locale';

/**
 * Calculate age from date of birth
 */
export function calculateAge(dateOfBirth: string): number {
  return differenceInYears(new Date(), new Date(dateOfBirth));
}

/**
 * Format currency in BOB
 */
export function formatCurrency(amount: number): string {
  return `${amount.toLocaleString('es-BO')} BOB`;
}

/**
 * Format date in Spanish
 */
export function formatDate(date: string | Date, formatStr: string = "d 'de' MMMM, yyyy"): string {
  return format(new Date(date), formatStr, { locale: es });
}

/**
 * Get initials from name
 */
export function getInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone format (Bolivia)
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^\+?591\s?\d{8}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * Generate unique ID
 */
export function generateId(prefix: string = ''): string {
  return `${prefix}${Date.now()}${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Get appointment type label in Spanish
 */
export function getAppointmentTypeLabel(type: string): string {
  const labels: { [key: string]: string } = {
    consultation: 'Consulta',
    cleaning: 'Limpieza',
    extraction: 'Extracción',
    filling: 'Relleno',
    root_canal: 'Endodoncia',
    orthodontics: 'Ortodoncia',
    cosmetic: 'Cosmética',
    emergency: 'Emergencia',
    follow_up: 'Seguimiento',
  };
  return labels[type] || type;
}

/**
 * Get appointment status label in Spanish
 */
export function getAppointmentStatusLabel(status: string): string {
  const labels: { [key: string]: string } = {
    scheduled: 'Programada',
    confirmed: 'Confirmada',
    in_progress: 'En curso',
    completed: 'Completada',
    cancelled: 'Cancelada',
    no_show: 'No asistió',
  };
  return labels[status] || status;
}

/**
 * Get tooth status label in Spanish
 */
export function getToothStatusLabel(status: string): string {
  const labels: { [key: string]: string } = {
    healthy: 'Sano',
    cavity: 'Caries',
    filled: 'Relleno',
    crown: 'Corona',
    missing: 'Faltante',
    root_canal: 'Endodoncia',
    implant: 'Implante',
    bridge: 'Puente',
  };
  return labels[status] || status;
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
}

/**
 * Group array by key
 */
export function groupBy<T>(array: T[], key: keyof T): { [key: string]: T[] } {
  return array.reduce((result, item) => {
    const groupKey = String(item[key]);
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {} as { [key: string]: T[] });
}

/**
 * Calculate percentage
 */
export function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
}

/**
 * Sort array by date
 */
export function sortByDate<T>(array: T[], dateKey: keyof T, descending: boolean = true): T[] {
  return [...array].sort((a, b) => {
    const dateA = new Date(a[dateKey] as any).getTime();
    const dateB = new Date(b[dateKey] as any).getTime();
    return descending ? dateB - dateA : dateA - dateB;
  });
}
