import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import RecentPatients from '../components/dashboard/RecentPatients';
import StatsCard from '../components/dashboard/StatsCard';
import { patients } from '../data/mockData';
import { Scan, Users, Calendar, ClipboardList } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { currentDoctor } = useAuth();
  const navigate = useNavigate();
  
  // Only show the first 3 patients for recent list
  const recentPatients = patients.slice(0, 3);
  
  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Bienvenue, Dr. {currentDoctor?.name.split(' ')[1]}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Voici un aperçu de votre activité récente
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button 
            variant="primary"
            icon={<Scan size={20} />}
            onClick={() => navigate('/scan')}
            className="transition-transform hover:scale-105"
          >
            Scanner carte NFC
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard 
          title="Patients consultés"
          value="28"
          icon={<Users size={20} className="text-blue-600" />}
          trend={{ value: "12%", positive: true }}
        />
        <StatsCard 
          title="Consultations aujourd'hui"
          value="5"
          icon={<Calendar size={20} className="text-green-600" />}
        />
        <StatsCard 
          title="Dossiers mis à jour"
          value="14"
          icon={<ClipboardList size={20} className="text-purple-600" />}
          trend={{ value: "5%", positive: true }}
        />
      </div>
      
      <div className="mb-8">
        <RecentPatients patients={recentPatients} />
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Actions rapides</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <button
            onClick={() => navigate('/search')}
            className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-md border border-gray-200 hover:bg-gray-100 transition-colors"
          >
            <Users size={24} className="text-blue-600 mb-2" />
            <span className="text-sm font-medium">Rechercher un patient</span>
          </button>
          <button
            onClick={() => navigate('/history')}
            className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-md border border-gray-200 hover:bg-gray-100 transition-colors"
          >
            <Calendar size={24} className="text-green-600 mb-2" />
            <span className="text-sm font-medium">Consultations du jour</span>
          </button>
          <button
            onClick={() => navigate('/profile')}
            className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-md border border-gray-200 hover:bg-gray-100 transition-colors"
          >
            <ClipboardList size={24} className="text-purple-600 mb-2" />
            <span className="text-sm font-medium">Mes rapports</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;