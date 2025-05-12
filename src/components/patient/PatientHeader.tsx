import React from 'react';
import { Patient } from '../../types';
import { Calendar, FileText } from 'lucide-react';

interface PatientHeaderProps {
  patient: Patient;
}

const PatientHeader: React.FC<PatientHeaderProps> = ({ patient }) => {
  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="px-4 py-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              {patient.name}
            </h1>
            <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <Calendar className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                {patient.age} ans
              </div>
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <FileText className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                Dossier: {patient.recordNumber}
              </div>
            </div>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Éditer informations
            </button>
            <button
              type="button"
              className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Ajouter commentaire
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientHeader;