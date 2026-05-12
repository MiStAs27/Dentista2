import { NavLink } from 'react-router';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  CalendarCheck, 
  BarChart3, 
  Settings, 
  LogOut,
  Bell,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useData } from '../../context/DataContext';
import { useState } from 'react';

export function Sidebar() {
  const { user, logout } = useAuth();
  const { notifications } = useData();
  const unreadCount = notifications.filter(n => !n.read).length;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/patients', icon: Users, label: 'Pacientes' },
    { to: '/appointments', icon: CalendarCheck, label: 'Citas' },
    { to: '/calendar', icon: Calendar, label: 'Agenda' },
    { to: '/reports', icon: BarChart3, label: 'Reportes' },
    { to: '/settings', icon: Settings, label: 'Configuración' },
  ];

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">D</span>
          </div>
          <div>
            <h1 className="font-bold text-xl text-gray-900">DentaSync</h1>
            <p className="text-xs text-gray-500">Gestión Odontológica</p>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-600 font-semibold">
                {user?.name.charAt(0)}
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm text-gray-900 truncate">{user?.name}</p>
            <p className="text-xs text-gray-500 capitalize">{user?.role === 'dentist' ? 'Odontólogo' : 'Asistente'}</p>
          </div>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="rounded-full w-6 h-6 p-0 flex items-center justify-center">
              {unreadCount}
            </Badge>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navigationItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={() => setIsMobileMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className={`w-5 h-5 ${isActive ? 'text-blue-700' : 'text-gray-500'}`} />
                <span className="font-medium text-sm">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-3 text-gray-700 hover:text-red-600 hover:bg-red-50"
          onClick={logout}
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium text-sm">Cerrar Sesión</span>
        </Button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </Button>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 bg-white border-r border-gray-200 flex-col h-screen fixed left-0 top-0">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <aside className={`lg:hidden fixed left-0 top-0 w-64 bg-white border-r border-gray-200 flex-col h-screen z-50 transition-transform duration-300 ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      } flex`}>
        <SidebarContent />
      </aside>
    </>
  );
}