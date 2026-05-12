import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Calendar, Clock, FileText, User, Phone, Mail } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { mockPatients, mockAppointments, mockTreatments } from '../data/mockData';

export function PatientPortalPage() {
  // Simulate a patient logged in (first patient)
  const patient = mockPatients[0];
  const patientAppointments = mockAppointments.filter(a => a.patientId === patient.id);
  const patientTreatments = mockTreatments.filter(t => t.patientId === patient.id);

  const upcomingAppointments = patientAppointments
    .filter(a => {
      const aptDate = new Date(a.date);
      const today = new Date('2026-02-24');
      return aptDate >= today && a.status !== 'cancelled';
    })
    .sort((a, b) => {
      const dateCompare = a.date.localeCompare(b.date);
      if (dateCompare !== 0) return dateCompare;
      return a.time.localeCompare(b.time);
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">D</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">DentaSync</h1>
                <p className="text-sm text-gray-500">Portal del Paciente</p>
              </div>
            </div>
            <Button variant="outline">Cerrar Sesión</Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                {patient.avatar ? (
                  <img src={patient.avatar} alt={`${patient.firstName} ${patient.lastName}`} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-600 font-semibold text-2xl">
                    {patient.firstName.charAt(0)}{patient.lastName.charAt(0)}
                  </div>
                )}
              </div>

              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900">
                  Bienvenido, {patient.firstName} {patient.lastName}
                </h2>
                <p className="text-gray-600 mt-1">
                  Paciente desde {format(new Date(patient.registrationDate), "MMMM 'de' yyyy", { locale: es })}
                </p>
              </div>

              <div className="text-right">
                <Badge variant="default" className="mb-2">Activo</Badge>
                <p className="text-sm text-gray-600">
                  {upcomingAppointments.length} cita{upcomingAppointments.length !== 1 ? 's' : ''} próxima{upcomingAppointments.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming Appointments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Próximas Citas
                </CardTitle>
                <CardDescription>
                  Tus citas programadas
                </CardDescription>
              </CardHeader>
              <CardContent>
                {upcomingAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingAppointments.map((apt) => (
                      <div key={apt.id} className="p-4 bg-gradient-to-r from-blue-50 to-white rounded-lg border border-blue-200">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">
                            {apt.type === 'consultation' && 'Consulta General'}
                            {apt.type === 'cleaning' && 'Limpieza Dental'}
                            {apt.type === 'filling' && 'Relleno'}
                            {apt.type === 'root_canal' && 'Endodoncia'}
                            {apt.type === 'orthodontics' && 'Ortodoncia'}
                            {apt.type === 'follow_up' && 'Seguimiento'}
                          </h4>
                          <Badge variant={apt.status === 'confirmed' ? 'default' : 'secondary'}>
                            {apt.status === 'confirmed' ? 'Confirmada' : 'Programada'}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{format(new Date(apt.date), "EEEE, d 'de' MMMM", { locale: es })}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{apt.time} ({apt.duration} minutos)</span>
                          </div>
                        </div>
                        {apt.notes && (
                          <p className="text-xs text-gray-500 mt-2 italic">{apt.notes}</p>
                        )}
                        <div className="flex gap-2 mt-4">
                          {apt.status === 'scheduled' && (
                            <Button size="sm" className="flex-1">Confirmar Cita</Button>
                          )}
                          <Button size="sm" variant="outline" className="flex-1">Reprogramar</Button>
                          <Button size="sm" variant="destructive">Cancelar</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500 py-8">No tienes citas programadas</p>
                )}
              </CardContent>
            </Card>

            {/* Treatment History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Historial de Tratamientos
                </CardTitle>
                <CardDescription>
                  Tratamientos realizados
                </CardDescription>
              </CardHeader>
              <CardContent>
                {patientTreatments.length > 0 ? (
                  <div className="space-y-4">
                    {patientTreatments.map((treatment) => (
                      <div key={treatment.id} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{treatment.diagnosis}</h4>
                            <p className="text-sm text-gray-600 mt-1">{treatment.treatment}</p>
                          </div>
                          <Badge variant={treatment.paid ? 'default' : 'destructive'}>
                            {treatment.paid ? 'Pagado' : 'Pendiente'}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                          <span>📅 {format(new Date(treatment.date), "d 'de' MMMM, yyyy", { locale: es })}</span>
                          {treatment.tooth && <span>🦷 Diente #{treatment.tooth}</span>}
                          <span>💰 {treatment.cost.toLocaleString()} BOB</span>
                        </div>
                        {treatment.prescriptions && treatment.prescriptions.length > 0 && (
                          <div className="mt-3 p-3 bg-blue-50 rounded border border-blue-200">
                            <p className="text-xs font-semibold text-gray-700 mb-2">Recetas:</p>
                            {treatment.prescriptions.map((rx) => (
                              <div key={rx.id} className="text-xs text-gray-600 mb-1">
                                <strong>{rx.medication}</strong> - {rx.dosage}, {rx.frequency}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500 py-8">No hay tratamientos registrados</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Mi Información
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">{patient.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">{patient.email}</span>
                </div>
                <Button variant="outline" className="w-full mt-4" size="sm">
                  Actualizar Datos
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Acciones Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Calendar className="w-4 h-4" />
                  Agendar Nueva Cita
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <FileText className="w-4 h-4" />
                  Ver Historial Completo
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Phone className="w-4 h-4" />
                  Contactar Consultorio
                </Button>
              </CardContent>
            </Card>

            {/* Clinic Info */}
            <Card>
              <CardHeader>
                <CardTitle>Información del Consultorio</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold text-gray-900">DentaSync Consultorio Dental</p>
                  <p className="text-gray-600 text-xs mt-1">
                    Av. Arce 2525, Edif. Multicentro Torre B, Piso 8
                  </p>
                </div>
                <div className="pt-3 border-t">
                  <p className="text-gray-600 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    +591 2 2441234
                  </p>
                  <p className="text-gray-600 flex items-center gap-2 mt-1">
                    <Mail className="w-4 h-4" />
                    contacto@dentasync.com
                  </p>
                </div>
                <div className="pt-3 border-t">
                  <p className="text-xs font-semibold text-gray-700 mb-1">Horarios:</p>
                  <p className="text-xs text-gray-600">Lun - Vie: 8:00 - 18:00</p>
                  <p className="text-xs text-gray-600">Sábado: 9:00 - 13:00</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
