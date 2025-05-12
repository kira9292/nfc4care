import React from 'react';
import { Patient } from '../../types';
import { User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RecentPatientsProps {
  patients: Patient[];
}

const RecentPatients: React.FC<RecentPatientsProps> = ({ patients }) => {
  if (patients.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Derniers patients consultés</h2>
        <p className="text-gray-500 text-center py-6">Aucun patient récemment consulté</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-4 py-3 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Derniers patients consultés</h2>
      </div>
      <ul className="divide-y divide-gray-200">
        {patients.map(patient => (
          <li key={patient.id} className="px-4 py-3 hover:bg-gray-50 transition-colors">
            <Link to={`/patient/${patient.id}`} className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{patient.name}</p>
                  <p className="text-xs text-gray-500">{patient.recordNumber} · {patient.age} ans</p>
                </div>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <span className="mr-2">
                  {patient.lastVisit ? new Date(patient.lastVisit).toLocaleDateString('fr-FR') : 'N/A'}
                </span>
                <ArrowRight size={16} className="text-gray-400" />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentPatients;