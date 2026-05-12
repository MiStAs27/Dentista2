import { RouterProvider } from 'react-router';
import { Outlet } from 'react-router';
import { router } from './routes';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { Toaster } from './components/ui/sonner';

export function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Outlet />
        <Toaster position="top-right" />
      </DataProvider>
    </AuthProvider>
  );
}

export default function Root() {
  return <RouterProvider router={router} />;
}