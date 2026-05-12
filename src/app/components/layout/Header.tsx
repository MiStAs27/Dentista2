import { Bell, Search } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from '../ui/dropdown-menu';
import { Badge } from '../ui/badge';
import { useData } from '../../context/DataContext';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

interface HeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export function Header({ title, subtitle, actions }: HeaderProps) {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead } = useData();
  const unreadNotifications = notifications.filter(n => !n.read);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'appointment_reminder':
        return '📅';
      case 'appointment_confirmed':
        return '✅';
      case 'appointment_cancelled':
        return '❌';
      case 'payment_due':
        return '💰';
      default:
        return '🔔';
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input 
              placeholder="Buscar pacientes..." 
              className="pl-10 w-64"
            />
          </div>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                {unreadNotifications.length > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 rounded-full w-5 h-5 p-0 flex items-center justify-center text-xs"
                  >
                    {unreadNotifications.length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="flex items-center justify-between px-4 py-2 border-b">
                <h3 className="font-semibold">Notificaciones</h3>
                {unreadNotifications.length > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-auto p-0 text-xs text-blue-600"
                    onClick={markAllNotificationsAsRead}
                  >
                    Marcar todas como leídas
                  </Button>
                )}
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center text-gray-500 text-sm">
                    No hay notificaciones
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <DropdownMenuItem
                      key={notification.id}
                      className={`flex items-start gap-3 p-4 cursor-pointer ${
                        !notification.read ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => markNotificationAsRead(notification.id)}
                    >
                      <span className="text-2xl">{getNotificationIcon(notification.type)}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-gray-900">{notification.title}</p>
                        <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {formatDistanceToNow(new Date(notification.createdAt), { 
                            addSuffix: true,
                            locale: es 
                          })}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-1" />
                      )}
                    </DropdownMenuItem>
                  ))
                )}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Actions */}
          {actions}
        </div>
      </div>
    </header>
  );
}
