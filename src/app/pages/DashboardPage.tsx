import { MainLayout } from '../components/layout/MainLayout';
import { Header } from '../components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { useData } from '../context/DataContext';
import { mockDashboardStats } from '../data/mockData';
import { 
  Users, 
  Calendar, 
  CheckCircle2, 
  TrendingUp, 
  Clock,
  DollarSign
} from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useNavigate } from 'react-router';

export function DashboardPage() {
  const { appointments, patients } = useData();
  const navigate = useNavigate();
  const stats = mockDashboardStats;

  const today = '2026-02-24';
  const todayAppointments = appointments
    .filter(a => a.date === today)
    .sort((a, b) => a.time.localeCompare(b.time));

  const upcomingAppointments = appointments
    .filter(a => {
      const aptDate = new Date(a.date);
      const currentDate = new Date(today);
      return aptDate >= currentDate && a.status !== 'cancelled';
    })
    .sort((a, b) => {
      const dateCompare = a.date.localeCompare(b.date);
      if (dateCompare !== 0) return dateCompare;
      return a.time.localeCompare(b.time);
    })
    .slice(0, 5);

  // Chart data
  const weeklyData = [
    { day: 'Lun', pacientes: 12, ingresos: 3200 },
    { day: 'Mar', pacientes: 15, ingresos: 4100 },
    { day: 'Mié', pacientes: 10, ingresos: 2800 },
    { day: 'Jue', pacientes: 18, ingresos: 5200 },
    { day: 'Vie', pacientes: 14, ingresos: 3900 },
    { day: 'Sáb', pacientes: 8, ingresos: 2400 },
  ];

  const appointmentTypeData = [
    { name: 'Consulta', value: 35, color: '#3b82f6' },
    { name: 'Limpieza', value: 25, color: '#10b981' },
    { name: 'Ortodoncia', value: 20, color: '#f59e0b' },
    { name: 'Endodoncia', value: 12, color: '#ef4444' },
    { name: 'Otros', value: 8, color: '#8b5cf6' },
  ];

  const statCards = [
    {
      title: 'Total Pacientes',
      value: stats.totalPatients,
      icon: Users,
      color: 'bg-blue-500',
      trend: '+12%',
      description: 'vs. mes anterior'
    },
    {
      title: 'Citas Hoy',
      value: stats.todayAppointments,
      icon: Calendar,
      color: 'bg-green-500',
      trend: '4 confirmadas',
      description: 'Ver agenda'
    },
    {
      title: 'Ingresos del Mes',
      value: `${stats.revenue.month.toLocaleString()} BOB`,
      icon: DollarSign,
      color: 'bg-purple-500',
      trend: '+18%',
      description: 'vs. mes anterior'
    },
    {
      title: 'Tasa de Asistencia',
      value: `${(100 - stats.noShowRate).toFixed(1)}%`,
      icon: CheckCircle2,
      color: 'bg-orange-500',
      trend: '+2.3%',
      description: 'Excelente rendimiento'
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      scheduled: { label: 'Programada', variant: 'secondary' as const },
      confirmed: { label: 'Confirmada', variant: 'default' as const },
      in_progress: { label: 'En curso', variant: 'default' as const },
      completed: { label: 'Completada', variant: 'outline' as const },
      cancelled: { label: 'Cancelada', variant: 'destructive' as const },
      no_show: { label: 'No asistió', variant: 'destructive' as const },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.scheduled;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <MainLayout>
      <Header 
        title="Dashboard" 
        subtitle={`Bienvenido - ${format(new Date(today), "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })}`}
      />
      
      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`${stat.color} p-2 rounded-lg`}>
                  <stat.icon className="w-4 h-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm font-semibold text-green-600">{stat.trend}</span>
                  <span className="text-xs text-gray-500">{stat.description}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Rendimiento Semanal</CardTitle>
              <CardDescription>Pacientes atendidos e ingresos</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Bar yAxisId="left" dataKey="pacientes" fill="#3b82f6" name="Pacientes" />
                  <Bar yAxisId="right" dataKey="ingresos" fill="#10b981" name="Ingresos (BOB)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Appointment Types */}
          <Card>
            <CardHeader>
              <CardTitle>Distribución de Tratamientos</CardTitle>
              <CardDescription>Por tipo de cita este mes</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={appointmentTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {appointmentTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Appointments Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Today's Appointments */}
          <Card>
            <CardHeader>
              <CardTitle>Citas de Hoy</CardTitle>
              <CardDescription>{todayAppointments.length} citas programadas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {todayAppointments.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">No hay citas programadas para hoy</p>
                ) : (
                  todayAppointments.map((apt) => (
                    <div 
                      key={apt.id}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      onClick={() => navigate(`/patients/${apt.patientId}`)}
                    >
                      <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg flex-shrink-0">
                        <Clock className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900">{apt.patientName}</p>
                        <p className="text-sm text-gray-600">
                          {apt.time} • {apt.duration} min
                        </p>
                      </div>
                      {getStatusBadge(apt.status)}
                    </div>
                  ))
                )}
              </div>
              <Button 
                variant="outline" 
                className="w-full mt-4"
                onClick={() => navigate('/calendar')}
              >
                Ver Agenda Completa
              </Button>
            </CardContent>
          </Card>

          {/* Upcoming Appointments */}
          <Card>
            <CardHeader>
              <CardTitle>Próximas Citas</CardTitle>
              <CardDescription>Siguientes {upcomingAppointments.length} citas programadas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingAppointments.map((apt) => (
                  <div 
                    key={apt.id}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    onClick={() => navigate(`/patients/${apt.patientId}`)}
                  >
                    <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg flex-shrink-0">
                      <Calendar className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900">{apt.patientName}</p>
                      <p className="text-sm text-gray-600">
                        {format(new Date(apt.date), "d 'de' MMM", { locale: es })} • {apt.time}
                      </p>
                    </div>
                    {getStatusBadge(apt.status)}
                  </div>
                ))}
              </div>
              <Button 
                variant="outline" 
                className="w-full mt-4"
                onClick={() => navigate('/appointments')}
              >
                Ver Todas las Citas
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Patients */}
        <Card>
          <CardHeader>
            <CardTitle>Pacientes Recientes</CardTitle>
            <CardDescription>Últimos pacientes registrados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {patients.slice(0, 6).map((patient) => (
                <div 
                  key={patient.id}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={() => navigate(`/patients/${patient.id}`)}
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                    {patient.avatar ? (
                      <img src={patient.avatar} alt={`${patient.firstName} ${patient.lastName}`} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-600 font-semibold">
                        {patient.firstName.charAt(0)}{patient.lastName.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900">{patient.firstName} {patient.lastName}</p>
                    <p className="text-xs text-gray-500">{patient.phone}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
