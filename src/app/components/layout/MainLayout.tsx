import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Sidebar } from './Sidebar';
import { useAuth } from '../../context/AuthContext';
import { ChatbotWidget } from '../chatbot/ChatbotWidget';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 lg:ml-64 w-full">
        {children}
      </main>
      <ChatbotWidget />
    </div>
  );
}