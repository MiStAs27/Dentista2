import { useParams, useNavigate } from 'react-router';
import { MainLayout } from '../components/layout/MainLayout';
import { Header } from '../components/layout/Header';
import { useData } from '../context/DataContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  ArrowLeft, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  User, 
  Heart,
  Pill,
  AlertCircle,
  FileText,
  DollarSign,
  Plus
} from 'lucide-react';
import { Odontogram } from '../components/odontogram/Odontogram';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useState } from 'react';
import { Treatment, ToothStatus } from '../types';

export function PatientDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    getPatient, 
    getMedicalHistory, 
    getOdontogram, 
    getTreatmentsByPatient,
    updateOdontogram,
    addTreatment,
    appointments 
  } = useData();

  const patient = getPatient(id!);
  const medicalHistory = getMedicalHistory(id!);
  const odontogram = getOdontogram(id!);
  const treatments = getTreatmentsByPatient(id!);
  const patientAppointments = appointments.filter(a => a.patientId === id);

  const [isTreatmentDialogOpen, setIsTreatmentDialogOpen] = useState(false);
  const [newTreatment, setNewTreatment] = useState({
    diagnosis: '',
    treatment: '',
    tooth: '',
    cost: '',
    notes: '',
    paid: false,
  });

  if (!patient) {
    return (
      <MainLayout>
        <div className="p-6">
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-gray-500">Paciente no encontrado</p>
              <Button className="mt-4" onClick={() => navigate('/patients')}>
                Volver a Pacientes
              </Button>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  }

  const handleUpdateTooth = (toothNumber: number, status: ToothStatus['status'], notes?: string) => {
    if (!odontogram) return;

    const updatedTeeth = odontogram.teeth.map(tooth => 
      tooth.number === toothNumber 
        ? { ...tooth, status, notes, lastUpdated: new Date().toISOString() }
        : tooth
    );

    updateOdontogram(id!, { teeth: updatedTeeth });
  };

  const handleAddTreatment = () => {
    if (!newTreatment.diagnosis || !newTreatment.treatment) {
      toast.error('Por favor completa los campos obligatorios');
      return;
    }

    const treatment: Treatment = {
      id: `t${Date.now()}`,
      patientId: id!,
      date: new Date().toISOString().split('T')[0],
      diagnosis: newTreatment.diagnosis,
      treatment: newTreatment.treatment,
      tooth: newTreatment.tooth ? parseInt(newTreatment.tooth) : undefined,
      cost: parseFloat(newTreatment.cost) || 0,
      paid: newTreatment.paid,
      notes: newTreatment.notes,
      prescriptions: [],
    };

    addTreatment(treatment);
    toast.success('Tratamiento registrado exitosamente');
    setIsTreatmentDialogOpen(false);
    
    // Reset form
    setNewTreatment({
      diagnosis: '',
      treatment: '',
      tooth: '',
      cost: '',
      notes: '',
      paid: false,
    });
  };

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const totalDebt = treatments
    .filter(t => !t.paid)
    .reduce((sum, t) => sum + t.cost, 0);

  return (
    <MainLayout>
      <Header 
        title={`${patient.firstName} ${patient.lastName}`}
        subtitle={`Paciente desde ${format(new Date(patient.registrationDate), "MMMM 'de' yyyy", { locale: es })}`}
        actions={
          <Button variant="outline" onClick={() => navigate('/patients')} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Volver
          </Button>
        }
      />

      <div className="p-6 space-y-6">
        {/* Patient Summary */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-6">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                {patient.avatar ? (
                  <img 
                    src={patient.avatar} 
                    alt={`${patient.firstName} ${patient.lastName}`} 
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-600 font-semibold text-3xl">
                    {patient.firstName.charAt(0)}{patient.lastName.charAt(0)}
                  </div>
                )}
              </div>

              <div className="flex-1 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">Edad:</span>
                    <span className="font-semibold">{calculateAge(patient.dateOfBirth)} años</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{patient.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600 truncate">{patient.email}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{patient.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">Nació:</span>
                    <span className="font-semibold">
                      {format(new Date(patient.dateOfBirth), "d 'de' MMM, yyyy", { locale: es })}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Contacto de Emergencia</p>
                    <p className="text-sm font-semibold">{patient.emergencyContact}</p>
                    <p className="text-xs text-gray-600">{patient.emergencyPhone}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Saldo Pendiente</p>
                    <p className="text-2xl font-bold text-red-600">{totalDebt.toLocaleString()} BOB</p>
                  </div>
                  <Badge variant={patient.status === 'active' ? 'default' : 'secondary'}>
                    {patient.status === 'active' ? 'Activo' : 'Inactivo'}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="history" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="history">Historia Clínica</TabsTrigger>
            <TabsTrigger value="odontogram">Odontograma</TabsTrigger>
            <TabsTrigger value="treatments">Tratamientos</TabsTrigger>
            <TabsTrigger value="appointments">Citas</TabsTrigger>
          </TabsList>

          {/* Medical History Tab */}
          <TabsContent value="history" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    Alergias
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {medicalHistory?.allergies && medicalHistory.allergies.length > 0 ? (
                    <div className="space-y-2">
                      {medicalHistory.allergies.map((allergy, index) => (
                        <Badge key={index} variant="destructive">{allergy}</Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">Sin alergias registradas</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-blue-500" />
                    Condiciones Médicas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {medicalHistory?.medicalConditions && medicalHistory.medicalConditions.length > 0 ? (
                    <div className="space-y-2">
                      {medicalHistory.medicalConditions.map((condition, index) => (
                        <Badge key={index} variant="secondary">{condition}</Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">Sin condiciones registradas</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Pill className="w-5 h-5 text-green-500" />
                    Medicamentos Actuales
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {medicalHistory?.currentMedications && medicalHistory.currentMedications.length > 0 ? (
                    <div className="space-y-2">
                      {medicalHistory.currentMedications.map((medication, index) => (
                        <p key={index} className="text-sm">{medication}</p>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">Sin medicamentos registrados</p>
                  )}
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Trabajos Dentales Previos</CardTitle>
              </CardHeader>
              <CardContent>
                {medicalHistory?.previousDentalWork && medicalHistory.previousDentalWork.length > 0 ? (
                  <ul className="list-disc list-inside space-y-1">
                    {medicalHistory.previousDentalWork.map((work, index) => (
                      <li key={index} className="text-sm text-gray-700">{work}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">Sin trabajos dentales previos registrados</p>
                )}
              </CardContent>
            </Card>

            {medicalHistory?.notes && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Notas Adicionales
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700">{medicalHistory.notes}</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Odontogram Tab */}
          <TabsContent value="odontogram">
            <Card>
              <CardHeader>
                <CardTitle>Odontograma Digital</CardTitle>
                <CardDescription>
                  Haz clic en un diente para actualizar su estado
                </CardDescription>
              </CardHeader>
              <CardContent>
                {odontogram ? (
                  <Odontogram 
                    teeth={odontogram.teeth} 
                    onUpdateTooth={handleUpdateTooth}
                  />
                ) : (
                  <p className="text-sm text-gray-500 text-center py-8">
                    No hay odontograma disponible para este paciente
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Treatments Tab */}
          <TabsContent value="treatments" className="space-y-4">
            <div className="flex justify-end">
              <Dialog open={isTreatmentDialogOpen} onOpenChange={setIsTreatmentDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="w-4 h-4" />
                    Nuevo Tratamiento
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Registrar Nuevo Tratamiento</DialogTitle>
                    <DialogDescription>
                      Completa la información del tratamiento realizado
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="diagnosis">Diagnóstico *</Label>
                        <Input
                          id="diagnosis"
                          value={newTreatment.diagnosis}
                          onChange={(e) => setNewTreatment({ ...newTreatment, diagnosis: e.target.value })}
                          placeholder="Ej: Caries en molar 16"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="treatment">Tratamiento *</Label>
                        <Input
                          id="treatment"
                          value={newTreatment.treatment}
                          onChange={(e) => setNewTreatment({ ...newTreatment, treatment: e.target.value })}
                          placeholder="Ej: Relleno de composite"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="tooth">Diente (número)</Label>
                        <Input
                          id="tooth"
                          type="number"
                          value={newTreatment.tooth}
                          onChange={(e) => setNewTreatment({ ...newTreatment, tooth: e.target.value })}
                          placeholder="Ej: 16"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cost">Costo (BOB)</Label>
                        <Input
                          id="cost"
                          type="number"
                          value={newTreatment.cost}
                          onChange={(e) => setNewTreatment({ ...newTreatment, cost: e.target.value })}
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="notes">Notas</Label>
                      <Textarea
                        id="notes"
                        value={newTreatment.notes}
                        onChange={(e) => setNewTreatment({ ...newTreatment, notes: e.target.value })}
                        placeholder="Notas adicionales sobre el tratamiento..."
                        rows={3}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="paid"
                        checked={newTreatment.paid}
                        onChange={(e) => setNewTreatment({ ...newTreatment, paid: e.target.checked })}
                        className="w-4 h-4"
                      />
                      <Label htmlFor="paid">Tratamiento pagado</Label>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsTreatmentDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={handleAddTreatment}>
                      Registrar Tratamiento
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {treatments.length > 0 ? (
              <div className="space-y-4">
                {treatments.map((treatment) => (
                  <Card key={treatment.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-gray-900">{treatment.diagnosis}</h3>
                            <Badge variant={treatment.paid ? 'default' : 'destructive'}>
                              {treatment.paid ? 'Pagado' : 'Pendiente'}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{treatment.treatment}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span>📅 {format(new Date(treatment.date), "d 'de' MMMM, yyyy", { locale: es })}</span>
                            {treatment.tooth && <span>🦷 Diente #{treatment.tooth}</span>}
                            <span className="flex items-center gap-1">
                              <DollarSign className="w-3 h-3" />
                              {treatment.cost.toLocaleString()} BOB
                            </span>
                          </div>
                          {treatment.notes && (
                            <p className="text-xs text-gray-500 mt-2 italic">{treatment.notes}</p>
                          )}
                          {treatment.prescriptions && treatment.prescriptions.length > 0 && (
                            <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                              <p className="text-xs font-semibold text-gray-700 mb-2">Recetas:</p>
                              {treatment.prescriptions.map((rx) => (
                                <div key={rx.id} className="text-xs text-gray-600 mb-1">
                                  <strong>{rx.medication}</strong> - {rx.dosage}, {rx.frequency}, por {rx.duration}
                                  {rx.instructions && <span className="text-gray-500"> ({rx.instructions})</span>}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-gray-500">No hay tratamientos registrados</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Appointments Tab */}
          <TabsContent value="appointments">
            {patientAppointments.length > 0 ? (
              <div className="grid gap-4">
                {patientAppointments
                  .sort((a, b) => {
                    const dateCompare = b.date.localeCompare(a.date);
                    if (dateCompare !== 0) return dateCompare;
                    return b.time.localeCompare(a.time);
                  })
                  .map((appointment) => (
                    <Card key={appointment.id}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-gray-900">
                                {appointment.type === 'consultation' && 'Consulta'}
                                {appointment.type === 'cleaning' && 'Limpieza'}
                                {appointment.type === 'extraction' && 'Extracción'}
                                {appointment.type === 'filling' && 'Relleno'}
                                {appointment.type === 'root_canal' && 'Endodoncia'}
                                {appointment.type === 'orthodontics' && 'Ortodoncia'}
                                {appointment.type === 'cosmetic' && 'Cosmética'}
                                {appointment.type === 'emergency' && 'Emergencia'}
                                {appointment.type === 'follow_up' && 'Seguimiento'}
                              </h3>
                              <Badge>
                                {appointment.status === 'scheduled' && 'Programada'}
                                {appointment.status === 'confirmed' && 'Confirmada'}
                                {appointment.status === 'in_progress' && 'En curso'}
                                {appointment.status === 'completed' && 'Completada'}
                                {appointment.status === 'cancelled' && 'Cancelada'}
                                {appointment.status === 'no_show' && 'No asistió'}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600">
                              {format(new Date(appointment.date), "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })} • {appointment.time} ({appointment.duration} min)
                            </p>
                            {appointment.notes && (
                              <p className="text-xs text-gray-500 mt-2">{appointment.notes}</p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-gray-500">No hay citas registradas</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
