import { useState } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { Header } from '../components/layout/Header';
import { useData } from '../context/DataContext';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Plus, Search, Calendar, Clock, User, Phone } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Appointment } from '../types';
import { Textarea } from '../components/ui/textarea';

export function AppointmentsPage() {
  const { appointments, patients, addAppointment, updateAppointment } = useData();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | Appointment['status']>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const [newAppointment, setNewAppointment] = useState({
    patientId: '',
    date: '',
    time: '',
    duration: '30',
    type: 'consultation' as Appointment['type'],
    notes: '',
  });

  const filteredAppointments = appointments.filter(appointment => {
    const patient = patients.find(p => p.id === appointment.patientId);
    const matchesSearch = 
      appointment.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (patient?.phone.includes(searchQuery));

    const matchesStatus = filterStatus === 'all' || appointment.status === filterStatus;

    return matchesSearch && matchesStatus;
  }).sort((a, b) => {
    const dateCompare = b.date.localeCompare(a.date);
    if (dateCompare !== 0) return dateCompare;
    return b.time.localeCompare(a.time);
  });

  const handleAddAppointment = () => {
    if (!newAppointment.patientId || !newAppointment.date || !newAppointment.time) {
      toast.error('Por favor completa los campos obligatorios');
      return;
    }

    const patient = patients.find(p => p.id === newAppointment.patientId);
    if (!patient) {
      toast.error('Paciente no encontrado');
      return;
    }

    const appointment: Appointment = {
      id: `a${Date.now()}`,
      patientId: newAppointment.patientId,
      patientName: `${patient.firstName} ${patient.lastName}`,
      dentistId: '1',
      dentistName: 'Dr. Carlos García',
      date: newAppointment.date,
      time: newAppointment.time,
      duration: parseInt(newAppointment.duration),
      type: newAppointment.type,
      status: 'scheduled',
      notes: newAppointment.notes,
      reminderSent: false,
      createdAt: new Date().toISOString(),
    };

    addAppointment(appointment);
    toast.success('Cita creada exitosamente');
    setIsAddDialogOpen(false);
    
    setNewAppointment({
      patientId: '',
      date: '',
      time: '',
      duration: '30',
      type: 'consultation',
      notes: '',
    });
  };

  const handleStatusChange = (appointmentId: string, newStatus: Appointment['status']) => {
    updateAppointment(appointmentId, { status: newStatus });
    toast.success('Estado de la cita actualizado');
  };

  const getStatusBadge = (status: Appointment['status']) => {
    const statusConfig = {
      scheduled: { label: 'Programada', variant: 'secondary' as const },
      confirmed: { label: 'Confirmada', variant: 'default' as const },
      in_progress: { label: 'En curso', variant: 'default' as const },
      completed: { label: 'Completada', variant: 'outline' as const },
      cancelled: { label: 'Cancelada', variant: 'destructive' as const },
      no_show: { label: 'No asistió', variant: 'destructive' as const },
    };

    return statusConfig[status];
  };

  const getTypeLabel = (type: Appointment['type']) => {
    const types = {
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
    return types[type];
  };

  return (
    <MainLayout>
      <Header 
        title="Gestión de Citas" 
        subtitle={`${appointments.length} citas en total`}
        actions={
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Nueva Cita
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Programar Nueva Cita</DialogTitle>
                <DialogDescription>
                  Completa la información de la cita
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="patient">Paciente *</Label>
                  <Select
                    value={newAppointment.patientId}
                    onValueChange={(value) => setNewAppointment({ ...newAppointment, patientId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar paciente" />
                    </SelectTrigger>
                    <SelectContent>
                      {patients.map((patient) => (
                        <SelectItem key={patient.id} value={patient.id}>
                          {patient.firstName} {patient.lastName} - {patient.phone}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Fecha *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newAppointment.date}
                      onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Hora *</Label>
                    <Input
                      id="time"
                      type="time"
                      value={newAppointment.time}
                      onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Tipo de Cita *</Label>
                    <Select
                      value={newAppointment.type}
                      onValueChange={(value: any) => setNewAppointment({ ...newAppointment, type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="consultation">Consulta</SelectItem>
                        <SelectItem value="cleaning">Limpieza</SelectItem>
                        <SelectItem value="extraction">Extracción</SelectItem>
                        <SelectItem value="filling">Relleno</SelectItem>
                        <SelectItem value="root_canal">Endodoncia</SelectItem>
                        <SelectItem value="orthodontics">Ortodoncia</SelectItem>
                        <SelectItem value="cosmetic">Cosmética</SelectItem>
                        <SelectItem value="emergency">Emergencia</SelectItem>
                        <SelectItem value="follow_up">Seguimiento</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duración (minutos)</Label>
                    <Input
                      id="duration"
                      type="number"
                      value={newAppointment.duration}
                      onChange={(e) => setNewAppointment({ ...newAppointment, duration: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notas</Label>
                  <Textarea
                    id="notes"
                    value={newAppointment.notes}
                    onChange={(e) => setNewAppointment({ ...newAppointment, notes: e.target.value })}
                    placeholder="Notas adicionales sobre la cita..."
                    rows={3}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAddAppointment}>
                  Crear Cita
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="p-6 space-y-6">
        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar por paciente o teléfono..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterStatus} onValueChange={(value: any) => setFilterStatus(value)}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las citas</SelectItem>
                  <SelectItem value="scheduled">Programadas</SelectItem>
                  <SelectItem value="confirmed">Confirmadas</SelectItem>
                  <SelectItem value="in_progress">En curso</SelectItem>
                  <SelectItem value="completed">Completadas</SelectItem>
                  <SelectItem value="cancelled">Canceladas</SelectItem>
                  <SelectItem value="no_show">No asistió</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Appointments List */}
        <div className="space-y-4">
          {filteredAppointments.map((appointment) => {
            const patient = patients.find(p => p.id === appointment.patientId);
            const statusConfig = getStatusBadge(appointment.status);

            return (
              <Card key={appointment.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between gap-6">
                    <div className="flex items-center gap-4 flex-1">
                      <div 
                        className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0 cursor-pointer"
                        onClick={() => navigate(`/patients/${appointment.patientId}`)}
                      >
                        {patient?.avatar ? (
                          <img src={patient.avatar} alt={appointment.patientName} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-600 font-semibold">
                            {appointment.patientName.split(' ').map(n => n.charAt(0)).join('')}
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 
                            className="font-semibold text-gray-900 cursor-pointer hover:text-blue-600"
                            onClick={() => navigate(`/patients/${appointment.patientId}`)}
                          >
                            {appointment.patientName}
                          </h3>
                          <Badge variant={statusConfig.variant}>
                            {statusConfig.label}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{format(new Date(appointment.date), "d 'de' MMM, yyyy", { locale: es })}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{appointment.time} ({appointment.duration} min)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span>{getTypeLabel(appointment.type)}</span>
                          </div>
                          {patient && (
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4" />
                              <span>{patient.phone}</span>
                            </div>
                          )}
                        </div>

                        {appointment.notes && (
                          <p className="text-xs text-gray-500 mt-2">{appointment.notes}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2 flex-shrink-0">
                      <Select
                        value={appointment.status}
                        onValueChange={(value: any) => handleStatusChange(appointment.id, value)}
                      >
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="scheduled">Programada</SelectItem>
                          <SelectItem value="confirmed">Confirmada</SelectItem>
                          <SelectItem value="in_progress">En curso</SelectItem>
                          <SelectItem value="completed">Completada</SelectItem>
                          <SelectItem value="cancelled">Cancelada</SelectItem>
                          <SelectItem value="no_show">No asistió</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredAppointments.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-gray-500">No se encontraron citas</p>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
}
