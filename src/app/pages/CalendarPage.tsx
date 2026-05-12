import { useState } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { Header } from '../components/layout/Header';
import { useData } from '../context/DataContext';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { format, addDays, startOfWeek, isSameDay } from 'date-fns';
import { es } from 'date-fns/locale';
import { useNavigate } from 'react-router';

export function CalendarPage() {
  const { appointments } = useData();
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date('2026-02-24'));
  const [view, setView] = useState<'day' | 'week'>('week');

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  
  const workingHours = Array.from({ length: 11 }, (_, i) => 8 + i); // 8:00 to 18:00

  const getAppointmentsForDateTime = (date: Date, hour: number) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return appointments.filter(apt => {
      if (apt.date !== dateStr) return false;
      const [aptHour] = apt.time.split(':').map(Number);
      return aptHour === hour;
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 border-blue-300 text-blue-700';
      case 'confirmed': return 'bg-green-100 border-green-300 text-green-700';
      case 'in_progress': return 'bg-yellow-100 border-yellow-300 text-yellow-700';
      case 'completed': return 'bg-gray-100 border-gray-300 text-gray-700';
      case 'cancelled': return 'bg-red-100 border-red-300 text-red-700';
      default: return 'bg-blue-100 border-blue-300 text-blue-700';
    }
  };

  const goToPrevious = () => {
    if (view === 'day') {
      setCurrentDate(addDays(currentDate, -1));
    } else {
      setCurrentDate(addDays(currentDate, -7));
    }
  };

  const goToNext = () => {
    if (view === 'day') {
      setCurrentDate(addDays(currentDate, 1));
    } else {
      setCurrentDate(addDays(currentDate, 7));
    }
  };

  const goToToday = () => {
    setCurrentDate(new Date('2026-02-24'));
  };

  return (
    <MainLayout>
      <Header 
        title="Agenda" 
        subtitle={
          view === 'day' 
            ? format(currentDate, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })
            : `Semana del ${format(weekStart, "d 'de' MMMM", { locale: es })} al ${format(addDays(weekStart, 6), "d 'de' MMMM", { locale: es })}`
        }
      />

      <div className="p-6 space-y-6">
        {/* Controls */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={goToPrevious}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={goToNext}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={goToToday}>
                  Hoy
                </Button>
              </div>

              <div className="flex gap-2">
                <Button 
                  variant={view === 'day' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setView('day')}
                >
                  Día
                </Button>
                <Button 
                  variant={view === 'week' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setView('week')}
                >
                  Semana
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Calendar Grid */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              {view === 'week' ? (
                <div className="min-w-[900px]">
                  {/* Week Header */}
                  <div className="grid grid-cols-8 border-b bg-gray-50 sticky top-0">
                    <div className="p-3 border-r">
                      <span className="text-sm font-semibold text-gray-600">Hora</span>
                    </div>
                    {weekDays.map((day, idx) => {
                      const isToday = isSameDay(day, new Date('2026-02-24'));
                      return (
                        <div 
                          key={idx} 
                          className={`p-3 border-r text-center ${isToday ? 'bg-blue-50' : ''}`}
                        >
                          <div className="text-xs text-gray-500">
                            {format(day, 'EEE', { locale: es })}
                          </div>
                          <div className={`text-lg font-semibold ${isToday ? 'text-blue-600' : 'text-gray-900'}`}>
                            {format(day, 'd')}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Week Grid */}
                  {workingHours.map((hour) => (
                    <div key={hour} className="grid grid-cols-8 border-b min-h-[80px]">
                      <div className="p-3 border-r bg-gray-50 flex items-start">
                        <span className="text-sm text-gray-600">
                          {hour.toString().padStart(2, '0')}:00
                        </span>
                      </div>
                      {weekDays.map((day, idx) => {
                        const dayAppointments = getAppointmentsForDateTime(day, hour);
                        const isToday = isSameDay(day, new Date('2026-02-24'));
                        
                        return (
                          <div 
                            key={idx} 
                            className={`p-2 border-r ${isToday ? 'bg-blue-50/30' : ''} space-y-1`}
                          >
                            {dayAppointments.map((apt) => (
                              <div
                                key={apt.id}
                                className={`p-2 rounded border-l-4 cursor-pointer hover:shadow-md transition-shadow ${getStatusColor(apt.status)}`}
                                onClick={() => navigate(`/patients/${apt.patientId}`)}
                              >
                                <div className="font-semibold text-xs truncate">
                                  {apt.patientName}
                                </div>
                                <div className="text-xs flex items-center gap-1 mt-1">
                                  <Clock className="w-3 h-3" />
                                  {apt.time} ({apt.duration}min)
                                </div>
                              </div>
                            ))}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              ) : (
                /* Day View */
                <div>
                  {workingHours.map((hour) => {
                    const hourAppointments = getAppointmentsForDateTime(currentDate, hour);
                    
                    return (
                      <div key={hour} className="flex border-b min-h-[100px]">
                        <div className="w-24 p-4 border-r bg-gray-50 flex-shrink-0">
                          <span className="text-sm font-semibold text-gray-600">
                            {hour.toString().padStart(2, '0')}:00
                          </span>
                        </div>
                        <div className="flex-1 p-4 space-y-2">
                          {hourAppointments.length === 0 ? (
                            <div className="text-sm text-gray-400 italic">Sin citas programadas</div>
                          ) : (
                            hourAppointments.map((apt) => (
                              <div
                                key={apt.id}
                                className={`p-4 rounded-lg border-l-4 cursor-pointer hover:shadow-md transition-shadow ${getStatusColor(apt.status)}`}
                                onClick={() => navigate(`/patients/${apt.patientId}`)}
                              >
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <h4 className="font-semibold">{apt.patientName}</h4>
                                    <div className="flex items-center gap-4 mt-2 text-sm">
                                      <span className="flex items-center gap-1">
                                        <Clock className="w-4 h-4" />
                                        {apt.time} - {apt.duration} minutos
                                      </span>
                                      <span>
                                        {apt.type === 'consultation' && 'Consulta'}
                                        {apt.type === 'cleaning' && 'Limpieza'}
                                        {apt.type === 'extraction' && 'Extracción'}
                                        {apt.type === 'filling' && 'Relleno'}
                                        {apt.type === 'root_canal' && 'Endodoncia'}
                                        {apt.type === 'orthodontics' && 'Ortodoncia'}
                                        {apt.type === 'cosmetic' && 'Cosmética'}
                                        {apt.type === 'emergency' && 'Emergencia'}
                                        {apt.type === 'follow_up' && 'Seguimiento'}
                                      </span>
                                    </div>
                                    {apt.notes && (
                                      <p className="text-xs mt-2 text-gray-600">{apt.notes}</p>
                                    )}
                                  </div>
                                  <Badge>
                                    {apt.status === 'scheduled' && 'Programada'}
                                    {apt.status === 'confirmed' && 'Confirmada'}
                                    {apt.status === 'in_progress' && 'En curso'}
                                    {apt.status === 'completed' && 'Completada'}
                                    {apt.status === 'cancelled' && 'Cancelada'}
                                    {apt.status === 'no_show' && 'No asistió'}
                                  </Badge>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Legend */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-blue-100 border-2 border-blue-300" />
                <span className="text-sm text-gray-700">Programada</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-green-100 border-2 border-green-300" />
                <span className="text-sm text-gray-700">Confirmada</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-yellow-100 border-2 border-yellow-300" />
                <span className="text-sm text-gray-700">En curso</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-gray-100 border-2 border-gray-300" />
                <span className="text-sm text-gray-700">Completada</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-red-100 border-2 border-red-300" />
                <span className="text-sm text-gray-700">Cancelada</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
