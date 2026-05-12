import { useState } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { Header } from '../components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { toast } from 'sonner';
import { useData } from '../context/DataContext';
import { Building2, Clock, Bell, User, Shield } from 'lucide-react';

export function SettingsPage() {
  const { clinicSettings } = useData();
  const [settings, setSettings] = useState(clinicSettings);

  const handleSaveGeneral = () => {
    toast.success('Configuración general guardada');
  };

  const handleSaveSchedule = () => {
    toast.success('Horarios actualizados');
  };

  const handleSaveNotifications = () => {
    toast.success('Preferencias de notificaciones guardadas');
  };

  return (
    <MainLayout>
      <Header 
        title="Configuración" 
        subtitle="Administra la configuración del consultorio"
      />

      <div className="p-6">
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="schedule">Horarios</TabsTrigger>
            <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
            <TabsTrigger value="security">Seguridad</TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  Información del Consultorio
                </CardTitle>
                <CardDescription>
                  Configura los datos generales de tu consultorio
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="clinicName">Nombre del Consultorio</Label>
                    <Input
                      id="clinicName"
                      value={settings.name}
                      onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input
                      id="phone"
                      value={settings.phone}
                      onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={settings.email}
                      onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Moneda</Label>
                    <Input
                      id="currency"
                      value={settings.currency}
                      onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Dirección</Label>
                  <Input
                    id="address"
                    value={settings.address}
                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="appointmentDuration">Duración por defecto (minutos)</Label>
                    <Input
                      id="appointmentDuration"
                      type="number"
                      value={settings.appointmentDuration}
                      onChange={(e) => setSettings({ ...settings, appointmentDuration: parseInt(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bookingBuffer">Buffer entre citas (minutos)</Label>
                    <Input
                      id="bookingBuffer"
                      type="number"
                      value={settings.bookingBuffer}
                      onChange={(e) => setSettings({ ...settings, bookingBuffer: parseInt(e.target.value) })}
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button onClick={handleSaveGeneral}>Guardar Cambios</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Schedule Settings */}
          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Horarios de Atención
                </CardTitle>
                <CardDescription>
                  Configura los días y horarios de trabajo
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(settings.workingHours).map(([day, hours]) => {
                  const dayLabels: { [key: string]: string } = {
                    monday: 'Lunes',
                    tuesday: 'Martes',
                    wednesday: 'Miércoles',
                    thursday: 'Jueves',
                    friday: 'Viernes',
                    saturday: 'Sábado',
                    sunday: 'Domingo',
                  };

                  return (
                    <div key={day} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-32">
                        <span className="font-semibold text-gray-900">{dayLabels[day]}</span>
                      </div>
                      <Switch
                        checked={hours.enabled}
                        onCheckedChange={(checked) => {
                          setSettings({
                            ...settings,
                            workingHours: {
                              ...settings.workingHours,
                              [day]: { ...hours, enabled: checked }
                            }
                          });
                        }}
                      />
                      {hours.enabled && (
                        <div className="flex items-center gap-2 flex-1">
                          <Input
                            type="time"
                            value={hours.start}
                            onChange={(e) => {
                              setSettings({
                                ...settings,
                                workingHours: {
                                  ...settings.workingHours,
                                  [day]: { ...hours, start: e.target.value }
                                }
                              });
                            }}
                            className="w-32"
                          />
                          <span className="text-gray-500">a</span>
                          <Input
                            type="time"
                            value={hours.end}
                            onChange={(e) => {
                              setSettings({
                                ...settings,
                                workingHours: {
                                  ...settings.workingHours,
                                  [day]: { ...hours, end: e.target.value }
                                }
                              });
                            }}
                            className="w-32"
                          />
                        </div>
                      )}
                    </div>
                  );
                })}

                <div className="flex justify-end pt-4">
                  <Button onClick={handleSaveSchedule}>Guardar Horarios</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Settings */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Preferencias de Notificaciones
                </CardTitle>
                <CardDescription>
                  Configura cómo y cuándo recibir notificaciones
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-gray-900">Recordatorios de Citas</h4>
                      <p className="text-sm text-gray-600">Enviar recordatorios automáticos a pacientes</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-gray-900">Confirmaciones de Citas</h4>
                      <p className="text-sm text-gray-600">Recibir notificación cuando un paciente confirma</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-gray-900">Pagos Pendientes</h4>
                      <p className="text-sm text-gray-600">Alertas sobre pagos por cobrar</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-gray-900">Resumen Diario</h4>
                      <p className="text-sm text-gray-600">Recibir resumen de citas del día</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-gray-900">Notificaciones por Email</h4>
                      <p className="text-sm text-gray-600">Enviar notificaciones también por correo</p>
                    </div>
                    <Switch />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reminderTime">Enviar recordatorios con</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="reminderTime"
                      type="number"
                      defaultValue="24"
                      className="w-24"
                    />
                    <span className="text-sm text-gray-600">horas de anticipación</span>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button onClick={handleSaveNotifications}>Guardar Preferencias</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Mi Perfil
                  </CardTitle>
                  <CardDescription>
                    Información personal y profesional
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Nombre Completo</Label>
                      <Input id="fullName" defaultValue="Dr. Carlos García" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="specialization">Especialización</Label>
                      <Input id="specialization" defaultValue="Odontología General" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="license">Número de Licencia</Label>
                      <Input id="license" defaultValue="ODT-2018-1234" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="profileEmail">Email</Label>
                      <Input id="profileEmail" type="email" defaultValue="dr.garcia@dentasync.com" />
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button>Actualizar Perfil</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Seguridad
                  </CardTitle>
                  <CardDescription>
                    Configura tu contraseña y opciones de seguridad
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Contraseña Actual</Label>
                    <Input id="currentPassword" type="password" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Nueva Contraseña</Label>
                    <Input id="newPassword" type="password" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mt-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">Autenticación de Dos Factores</h4>
                      <p className="text-sm text-gray-600">Mayor seguridad para tu cuenta</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button>Cambiar Contraseña</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
