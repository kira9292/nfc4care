import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, History, User, LogOut, Activity } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar: React.FC = () => {
  const { logout, currentDoctor } = useAuth();

  const navLinks = [
    { to: "/dashboard", label: "Accueil", icon: <Home size={20} /> },
    { to: "/search", label: "Rechercher patient", icon: <Search size={20} /> },
    { to: "/history", label: "Historique", icon: <History size={20} /> },
    { to: "/profile", label: "Profil médecin", icon: <User size={20} /> },
  ];

  return (
    <div className="h-full flex flex-col bg-gray-50 border-r border-gray-200 text-gray-700">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center">
          <Activity className="h-8 w-8 text-blue-600" />
          <h1 className="ml-2 text-xl font-bold">MediScan</h1>
        </div>
      </div>
      
      {currentDoctor && (
        <div className="px-4 py-3 text-sm font-medium border-b border-gray-200">
          <p className="text-gray-500">Dr. {currentDoctor.name}</p>
        </div>
      )}
      
      <nav className="flex-1 py-4 px-2">
        <ul className="space-y-1">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) => `
                  flex items-center px-3 py-2 rounded-md text-sm font-medium
                  ${isActive 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}
                `}
              >
                <span className="mr-3">{link.icon}</span>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-3 mt-auto border-t border-gray-200">
        <button 
          onClick={logout}
          className="flex w-full items-center px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md"
        >
          <LogOut size={20} className="mr-3" />
          Déconnexion
        </button>
      </div>
    </div>
  );
};

export default Sidebar;