import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const success = await login(email, password);
      
      if (success) {
        toast.success('¡Bienvenido a DentaSync!');
        navigate('/dashboard');
      } else {
        toast.error('Credenciales incorrectas');
      }
    } catch (error) {
      toast.error('Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left side - Branding */}
        <div className="hidden md:block">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-3xl">D</span>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900">DentaSync</h1>
                <p className="text-gray-600">Gestión Odontológica Integral</p>
              </div>
            </div>

            <div className="space-y-4 mt-12">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">📅</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Agenda Inteligente</h3>
                  <p className="text-sm text-gray-600">Gestiona citas con IA y reduce tiempos muertos</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🦷</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Historias Clínicas Digitales</h3>
                  <p className="text-sm text-gray-600">Odontogramas interactivos y expedientes completos</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">📊</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Reportes y Analítica</h3>
                  <p className="text-sm text-gray-600">Métricas de rendimiento y rentabilidad</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">☁️</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">En la Nube 24/7</h3>
                  <p className="text-sm text-gray-600">Accede desde cualquier dispositivo, en cualquier momento</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Login Form */}
        <div>
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle>Iniciar Sesión</CardTitle>
              <CardDescription>Ingresa tus credenciales para acceder al sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                </Button>
              </form>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-xs font-semibold text-gray-700 mb-2">Credenciales de prueba:</p>
                <div className="text-xs text-gray-600 space-y-1">
                  <p><strong>Odontólogo:</strong> dr.garcia@dentasync.com</p>
                  <p><strong>Asistente:</strong> ana.lopez@dentasync.com</p>
                  <p className="text-gray-500 mt-2">Cualquier contraseña funciona en modo demo</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <p className="text-center text-sm text-gray-500 mt-6">
            DentaSync © 2026 - Sistema de Gestión Odontológica
          </p>
        </div>
      </div>
    </div>
  );
}
