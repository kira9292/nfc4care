import React, { ReactNode } from 'react';
import { Activity } from 'lucide-react';
import Sidebar from './Sidebar';
import { useAuth } from '../../context/AuthContext';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  // If not authenticated, just render children (which should be Login page)
  if (!isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="hidden md:flex md:w-64 md:flex-col">
        <Sidebar />
      </div>
      
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Mobile header with menu */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white">
          <div className="flex items-center">
            <Activity className="h-6 w-6 text-blue-600" />
            <h1 className="ml-2 text-lg font-bold">MediScan</h1>
          </div>
          {/* Mobile menu button could go here */}
        </div>
        
        <main className="flex-1 overflow-auto bg-white">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;