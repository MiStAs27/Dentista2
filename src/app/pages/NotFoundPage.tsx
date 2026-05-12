import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-blue-100 rounded-full mb-6">
            <span className="text-6xl">🦷</span>
          </div>
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Página no encontrada</h2>
          <p className="text-gray-600 max-w-md mx-auto">
            Lo sentimos, la página que buscas no existe o ha sido movida.
          </p>
        </div>

        <div className="flex gap-4 justify-center">
          <Button onClick={() => navigate(-1)} variant="outline" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Volver
          </Button>
          <Button onClick={() => navigate('/dashboard')} className="gap-2">
            <Home className="w-4 h-4" />
            Ir al Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
