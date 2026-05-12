import { useState } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { Header } from '../components/layout/Header';
import { useData } from '../context/DataContext';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Plus, Search, Filter, Phone, Mail, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from 'sonner';
import { Patient } from '../types';

export function PatientsPage() {
  const { patients, addPatient } = useData();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // New patient form state
  const [newPatient, setNewPatient] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: 'female' as 'male' | 'female' | 'other',
    address: '',
    city: 'La Paz',
    emergencyContact: '',
    emergencyPhone: '',
  });

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = 
      patient.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.phone.includes(searchQuery);

    const matchesStatus = filterStatus === 'all' || patient.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const handleAddPatient = () => {
    if (!newPatient.firstName || !newPatient.lastName || !newPatient.phone) {
      toast.error('Por favor completa los campos obligatorios');
      return;
    }

    const patient: Patient = {
      id: `p${Date.now()}`,
      ...newPatient,
      allergies: [],
      medicalConditions: [],
      currentMedications: [],
      registrationDate: new Date().toISOString().split('T')[0],
      status: 'active',
    };

    addPatient(patient);
    toast.success('Paciente agregado exitosamente');
    setIsAddDialogOpen(false);
    
    // Reset form
    setNewPatient({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      gender: 'female',
      address: '',
      city: 'La Paz',
      emergencyContact: '',
      emergencyPhone: '',
    });
  };

  return (
    <MainLayout>
      <Header 
        title="Pacientes" 
        subtitle={`${patients.length} pacientes registrados`}
        actions={
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Nuevo Paciente
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Registrar Nuevo Paciente</DialogTitle>
                <DialogDescription>
                  Completa la información del paciente
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Nombre *</Label>
                  <Input
                    id="firstName"
                    value={newPatient.firstName}
                    onChange={(e) => setNewPatient({ ...newPatient, firstName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Apellido *</Label>
                  <Input
                    id="lastName"
                    value={newPatient.lastName}
                    onChange={(e) => setNewPatient({ ...newPatient, lastName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newPatient.email}
                    onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono *</Label>
                  <Input
                    id="phone"
                    value={newPatient.phone}
                    onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Fecha de Nacimiento</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={newPatient.dateOfBirth}
                    onChange={(e) => setNewPatient({ ...newPatient, dateOfBirth: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Género</Label>
                  <Select
                    value={newPatient.gender}
                    onValueChange={(value) => setNewPatient({ ...newPatient, gender: value as 'male' | 'female' | 'other' })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="female">Femenino</SelectItem>
                      <SelectItem value="male">Masculino</SelectItem>
                      <SelectItem value="other">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="address">Dirección</Label>
                  <Input
                    id="address"
                    value={newPatient.address}
                    onChange={(e) => setNewPatient({ ...newPatient, address: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">Ciudad</Label>
                  <Input
                    id="city"
                    value={newPatient.city}
                    onChange={(e) => setNewPatient({ ...newPatient, city: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">Contacto de Emergencia</Label>
                  <Input
                    id="emergencyContact"
                    value={newPatient.emergencyContact}
                    onChange={(e) => setNewPatient({ ...newPatient, emergencyContact: e.target.value })}
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="emergencyPhone">Teléfono de Emergencia</Label>
                  <Input
                    id="emergencyPhone"
                    value={newPatient.emergencyPhone}
                    onChange={(e) => setNewPatient({ ...newPatient, emergencyPhone: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAddPatient}>
                  Registrar Paciente
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
                  placeholder="Buscar por nombre, email o teléfono..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterStatus} onValueChange={(value: any) => setFilterStatus(value)}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los pacientes</SelectItem>
                  <SelectItem value="active">Activos</SelectItem>
                  <SelectItem value="inactive">Inactivos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Patients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPatients.map((patient) => (
            <Card 
              key={patient.id} 
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate(`/patients/${patient.id}`)}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                    {patient.avatar ? (
                      <img 
                        src={patient.avatar} 
                        alt={`${patient.firstName} ${patient.lastName}`} 
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-600 font-semibold text-xl">
                        {patient.firstName.charAt(0)}{patient.lastName.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-gray-900">
                        {patient.firstName} {patient.lastName}
                      </h3>
                      <Badge variant={patient.status === 'active' ? 'default' : 'secondary'}>
                        {patient.status === 'active' ? 'Activo' : 'Inactivo'}
                      </Badge>
                    </div>
                    
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="w-3 h-3" />
                        <span>{patient.phone}</span>
                      </div>
                      {patient.email && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="w-3 h-3" />
                          <span className="truncate">{patient.email}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-3 h-3" />
                        <span>{patient.city}</span>
                      </div>
                    </div>

                    {patient.lastVisit && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-xs text-gray-500">
                          Última visita: {new Date(patient.lastVisit).toLocaleDateString('es-ES')}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPatients.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-gray-500">No se encontraron pacientes</p>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
}
