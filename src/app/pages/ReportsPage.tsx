import { MainLayout } from '../components/layout/MainLayout';
import { Header } from '../components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { useData } from '../context/DataContext';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend 
} from 'recharts';
import { Button } from '../components/ui/button';
import { Download, TrendingUp, Users, Calendar, DollarSign } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useState } from 'react';

export function ReportsPage() {
  const { appointments, patients, treatments } = useData();
  const [timePeriod, setTimePeriod] = useState('month');

  // Statistics
  const totalPatients = patients.length;
  const totalAppointments = appointments.length;
  const completedAppointments = appointments.filter(a => a.status === 'completed').length;
  const totalRevenue = treatments.reduce((sum, t) => sum + t.cost, 0);
  const paidRevenue = treatments.filter(t => t.paid).reduce((sum, t) => sum + t.cost, 0);
  const pendingRevenue = totalRevenue - paidRevenue;

  // Monthly data
  const monthlyData = [
    { month: 'Ago', pacientes: 42, citas: 156, ingresos: 12400 },
    { month: 'Sep', pacientes: 48, citas: 172, ingresos: 14800 },
    { month: 'Oct', pacientes: 51, citas: 189, ingresos: 16200 },
    { month: 'Nov', pacientes: 55, citas: 198, ingresos: 17600 },
    { month: 'Dic', pacientes: 58, citas: 205, ingresos: 18200 },
    { month: 'Ene', pacientes: 62, citas: 218, ingresos: 19400 },
    { month: 'Feb', pacientes: 66, citas: 224, ingresos: 20800 },
  ];

  // Treatment types distribution
  const treatmentTypes = [
    { name: 'Consultas', value: 145, color: '#3b82f6' },
    { name: 'Limpiezas', value: 98, color: '#10b981' },
    { name: 'Rellenos', value: 76, color: '#f59e0b' },
    { name: 'Extracciones', value: 42, color: '#ef4444' },
    { name: 'Endodoncias', value: 35, color: '#8b5cf6' },
    { name: 'Ortodoncia', value: 28, color: '#ec4899' },
    { name: 'Otros', value: 24, color: '#6b7280' },
  ];

  // Daily appointments data
  const dailyAppointmentsData = [
    { day: 'Lun', cantidad: 12 },
    { day: 'Mar', cantidad: 15 },
    { day: 'Mié', cantidad: 10 },
    { day: 'Jue', cantidad: 18 },
    { day: 'Vie', cantidad: 14 },
    { day: 'Sáb', cantidad: 8 },
    { day: 'Dom', cantidad: 0 },
  ];

  // Patient age distribution
  const ageDistribution = [
    { range: '0-18', cantidad: 45 },
    { range: '19-30', cantidad: 78 },
    { range: '31-45', cantidad: 92 },
    { range: '46-60', cantidad: 67 },
    { range: '60+', cantidad: 34 },
  ];

  const handleExportReport = () => {
    // Mock export functionality
    alert('Exportando reporte a PDF...');
  };

  return (
    <MainLayout>
      <Header 
        title="Reportes y Analítica" 
        subtitle="Análisis de rendimiento y métricas del consultorio"
        actions={
          <div className="flex gap-2">
            <Select value={timePeriod} onValueChange={setTimePeriod}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Esta semana</SelectItem>
                <SelectItem value="month">Este mes</SelectItem>
                <SelectItem value="quarter">Este trimestre</SelectItem>
                <SelectItem value="year">Este año</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2" onClick={handleExportReport}>
              <Download className="w-4 h-4" />
              Exportar PDF
            </Button>
          </div>
        }
      />

      <div className="p-6 space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Pacientes
              </CardTitle>
              <Users className="w-4 h-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalPatients}</div>
              <p className="text-xs text-green-600 mt-1">+8% vs. mes anterior</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Citas Completadas
              </CardTitle>
              <Calendar className="w-4 h-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedAppointments}</div>
              <p className="text-xs text-green-600 mt-1">+12% vs. mes anterior</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Ingresos Totales
              </CardTitle>
              <DollarSign className="w-4 h-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalRevenue.toLocaleString()} BOB</div>
              <p className="text-xs text-green-600 mt-1">+15% vs. mes anterior</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Tasa de Asistencia
              </CardTitle>
              <TrendingUp className="w-4 h-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">95.8%</div>
              <p className="text-xs text-green-600 mt-1">+2.3% vs. mes anterior</p>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Ingresos Cobrados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {paidRevenue.toLocaleString()} BOB
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {((paidRevenue / totalRevenue) * 100).toFixed(1)}% del total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ingresos Pendientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">
                {pendingRevenue.toLocaleString()} BOB
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {((pendingRevenue / totalRevenue) * 100).toFixed(1)}% del total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ingreso Promedio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">
                {Math.round(totalRevenue / completedAppointments).toLocaleString()} BOB
              </div>
              <p className="text-sm text-gray-600 mt-2">Por cita completada</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Tendencia Mensual</CardTitle>
              <CardDescription>Evolución de pacientes, citas e ingresos</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="citas" stroke="#3b82f6" name="Citas" strokeWidth={2} />
                  <Line yAxisId="right" type="monotone" dataKey="ingresos" stroke="#10b981" name="Ingresos (BOB)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Treatment Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Distribución de Tratamientos</CardTitle>
              <CardDescription>Por tipo de procedimiento</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={treatmentTypes}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {treatmentTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Daily Appointments */}
          <Card>
            <CardHeader>
              <CardTitle>Citas por Día de la Semana</CardTitle>
              <CardDescription>Promedio semanal</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dailyAppointmentsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="cantidad" fill="#3b82f6" name="Citas" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Age Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Distribución por Edad</CardTitle>
              <CardDescription>Rango de edades de pacientes</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={ageDistribution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="cantidad" fill="#10b981" name="Pacientes" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Top Treatments Table */}
        <Card>
          <CardHeader>
            <CardTitle>Top 10 Tratamientos Más Realizados</CardTitle>
            <CardDescription>Procedimientos más frecuentes este mes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {treatmentTypes.slice(0, 10).map((treatment, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-100 text-blue-700 font-semibold text-sm">
                      {index + 1}
                    </div>
                    <span className="font-medium">{treatment.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-48 bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full" 
                        style={{ 
                          width: `${(treatment.value / treatmentTypes[0].value) * 100}%`,
                          backgroundColor: treatment.color 
                        }}
                      />
                    </div>
                    <span className="font-semibold text-gray-700 w-12 text-right">{treatment.value}</span>
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
