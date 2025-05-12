import React, { useState } from 'react';
import { MedicalRecord } from '../../types';
import { ClipboardList, Pill as Pills, AlertTriangle, Activity } from 'lucide-react';

interface MedicalTabsProps {
  medicalRecord: MedicalRecord;
}

const MedicalTabs: React.FC<MedicalTabsProps> = ({ medicalRecord }) => {
  const [activeTab, setActiveTab] = useState('history');

  const tabs = [
    { id: 'history', label: 'Historique médical', icon: <ClipboardList size={18} /> },
    { id: 'prescriptions', label: 'Ordonnances', icon: <Pills size={18} /> },
    { id: 'allergies', label: 'Allergies', icon: <AlertTriangle size={18} /> },
    { id: 'testResults', label: 'Résultats d\'analyse', icon: <Activity size={18} /> },
  ];

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm flex items-center
                ${activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      
      <div className="p-6">
        {activeTab === 'history' && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Historique des consultations</h3>
            {medicalRecord.history.length === 0 ? (
              <p className="text-gray-500">Aucun historique médical enregistré.</p>
            ) : (
              <ul className="space-y-4">
                {medicalRecord.history.map((item) => (
                  <li key={item.id} className="bg-gray-50 p-4 rounded-md">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium text-gray-900">
                        {new Date(item.date).toLocaleDateString('fr-FR')}
                      </p>
                      <p className="text-sm text-gray-500">{item.doctorName}</p>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">{item.description}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
        
        {activeTab === 'prescriptions' && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Ordonnances</h3>
            {medicalRecord.prescriptions.length === 0 ? (
              <p className="text-gray-500">Aucune ordonnance enregistrée.</p>
            ) : (
              <ul className="space-y-4">
                {medicalRecord.prescriptions.map((prescription) => (
                  <li key={prescription.id} className="bg-gray-50 p-4 rounded-md">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium text-gray-900">
                        {prescription.medication} - {prescription.dosage}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(prescription.date).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">{prescription.instructions}</p>
                    <p className="mt-2 text-xs text-gray-500">Prescrit par: {prescription.doctorName}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
        
        {activeTab === 'allergies' && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Allergies</h3>
            {medicalRecord.allergies.length === 0 ? (
              <p className="text-gray-500">Aucune allergie enregistrée.</p>
            ) : (
              <ul className="space-y-4">
                {medicalRecord.allergies.map((allergy) => (
                  <li key={allergy.id} className="bg-gray-50 p-4 rounded-md">
                    <div className="flex items-center">
                      <div className={`
                        w-3 h-3 rounded-full mr-2
                        ${allergy.severity === 'Mild' ? 'bg-yellow-400' : ''}
                        ${allergy.severity === 'Moderate' ? 'bg-orange-500' : ''}
                        ${allergy.severity === 'Severe' ? 'bg-red-600' : ''}
                      `}></div>
                      <p className="text-sm font-medium text-gray-900">
                        {allergy.allergen}
                      </p>
                      <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-gray-200 text-gray-800">
                        {allergy.severity}
                      </span>
                    </div>
                    {allergy.notes && (
                      <p className="mt-2 text-sm text-gray-600">{allergy.notes}</p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
        
        {activeTab === 'testResults' && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Résultats d'analyses</h3>
            {medicalRecord.testResults.length === 0 ? (
              <p className="text-gray-500">Aucun résultat d'analyse enregistré.</p>
            ) : (
              <ul className="space-y-4">
                {medicalRecord.testResults.map((test) => (
                  <li key={test.id} className="bg-gray-50 p-4 rounded-md">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium text-gray-900">{test.testName}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(test.date).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center">
                      <span className="text-sm text-gray-600 font-medium">Résultat:</span>
                      <span className="ml-2 text-sm text-gray-900">{test.result}</span>
                      {test.normalRange && (
                        <span className="ml-2 text-xs text-gray-500">
                          (Valeur normale: {test.normalRange})
                        </span>
                      )}
                    </div>
                    {test.notes && (
                      <p className="mt-2 text-sm text-gray-600">{test.notes}</p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicalTabs;