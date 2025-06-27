import React from 'react';
import { Calendar, User, Clock } from 'lucide-react';

// Mock data for the history page
const historyData = [
  {
    id: 'h1',
    date: '2023-06-15',
    time: '09:15',
    patientName: 'Sophie Laurent',
    patientId: 'p1',
    action: 'Consultation',
    recordNumber: 'PA-20589'
  },
  {
    id: 'h2',
    date: '2023-06-15',
    time: '10:30',
    patientName: 'Marc Dupont',
    patientId: 'p2',
    action: 'Mise à jour ordonnance',
    recordNumber: 'PA-18754'
  },
  {
    id: 'h3',
    date: '2023-06-14',
    time: '14:45',
    patientName: 'Émilie Moreau',
    patientId: 'p3',
    action: 'Consultation',
    recordNumber: 'PA-21435'
  },
  {
    id: 'h4',
    date: '2023-06-14',
    time: '16:00',
    patientName: 'Thomas Petit',
    patientId: 'p4',
    action: 'Résultats d\'analyses',
    recordNumber: 'PA-19876'
  },
  {
    id: 'h5',
    date: '2023-06-13',
    time: '11:15',
    patientName: 'Sophie Laurent',
    patientId: 'p1',
    action: 'Consultation de suivi',
    recordNumber: 'PA-20589'
  }
];

// Group history entries by date
const groupByDate = (entries) => {
  const grouped = {};
  entries.forEach(entry => {
    if (!grouped[entry.date]) {
      grouped[entry.date] = [];
    }
    grouped[entry.date].push(entry);
  });
  return grouped;
};

const History: React.FC = () => {
  const groupedHistory = groupByDate(historyData);
  const sortedDates = Object.keys(groupedHistory).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Historique des activités</h1>
        
        <div className="bg-white shadow overflow-hidden rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">Activités récentes</h2>
              <button
                type="button"
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Exporter
              </button>
            </div>
          </div>
          
          <div className="divide-y divide-gray-200">
            {sortedDates.map(date => (
              <div key={date} className="px-4 py-5 sm:p-6">
                <div className="flex items-center mb-4">
                  <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                  <h3 className="text-base font-medium text-gray-900">
                    {new Date(date).toLocaleDateString('fr-FR', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </h3>
                </div>
                
                <ul className="space-y-4">
                  {groupedHistory[date].map(entry => (
                    <li key={entry.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <User className="h-5 w-5 text-blue-600" />
                          </div>
                        </div>
                        <div className="ml-3 flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">
                              {entry.patientName}
                            </p>
                            <p className="text-sm text-gray-500 flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {entry.time}
                            </p>
                          </div>
                          <div className="mt-1 flex items-center">
                            <span className="text-sm text-gray-500 mr-2">
                              {entry.recordNumber}
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {entry.action}
                            </span>
                          </div>
                          <div className="mt-2">
                            <a 
                              href={`/patient/${entry.patientId}`}
                              className="text-sm font-medium text-blue-600 hover:text-blue-500"
                            >
                              Voir dossier
                            </a>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="px-4 py-4 sm:px-6 bg-gray-50 border-t border-gray-200 text-center">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Afficher plus d'historique
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;