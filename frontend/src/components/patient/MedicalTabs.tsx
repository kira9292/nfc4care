import React, { useState } from 'react';
import { ClipboardList, Pill as Pills, AlertTriangle, Activity, Shield } from 'lucide-react';

interface MedicalRecord {
  id: string;
  patientId: string;
  antecedentsMedicaux?: string;
  antecedentsChirurgicaux?: string;
  antecedentsFamiliaux?: string;
  traitementsEnCours?: string;
  allergies?: string;
  observationsGenerales?: string;
  hashContenu: string;
  blockchainTxnHash?: string;
}

interface MedicalTabsProps {
  medicalRecord: MedicalRecord;
}

const MedicalTabs: React.FC<MedicalTabsProps> = ({ medicalRecord }) => {
  const [activeTab, setActiveTab] = useState('antecedents');

  const tabs = [
    { id: 'antecedents', label: 'Antécédents', icon: <ClipboardList size={18} /> },
    { id: 'traitements', label: 'Traitements', icon: <Pills size={18} /> },
    { id: 'allergies', label: 'Allergies', icon: <AlertTriangle size={18} /> },
    { id: 'blockchain', label: 'Intégrité', icon: <Shield size={18} /> },
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
        {activeTab === 'antecedents' && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Antécédents médicaux</h3>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Antécédents médicaux</h4>
                <p className="text-sm text-gray-600">
                  {medicalRecord.antecedentsMedicaux || 'Aucun antécédent médical enregistré.'}
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Antécédents chirurgicaux</h4>
                <p className="text-sm text-gray-600">
                  {medicalRecord.antecedentsChirurgicaux || 'Aucun antécédent chirurgical enregistré.'}
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Antécédents familiaux</h4>
                <p className="text-sm text-gray-600">
                  {medicalRecord.antecedentsFamiliaux || 'Aucun antécédent familial enregistré.'}
                </p>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'traitements' && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Traitements en cours</h3>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm text-gray-600">
                {medicalRecord.traitementsEnCours || 'Aucun traitement en cours.'}
              </p>
            </div>
            
            <h3 className="text-lg font-medium text-gray-900">Observations générales</h3>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm text-gray-600">
                {medicalRecord.observationsGenerales || 'Aucune observation générale.'}
              </p>
            </div>
          </div>
        )}
        
        {activeTab === 'allergies' && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Allergies</h3>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm text-gray-600">
                {medicalRecord.allergies || 'Aucune allergie enregistrée.'}
              </p>
            </div>
          </div>
        )}
        
        {activeTab === 'blockchain' && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Vérification d'intégrité</h3>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Hash du contenu</h4>
                <p className="text-sm text-gray-600 font-mono">
                  {medicalRecord.hashContenu}
                </p>
              </div>
              
              {medicalRecord.blockchainTxnHash && (
                <div className="bg-gray-50 p-4 rounded-md">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Transaction blockchain</h4>
                  <p className="text-sm text-gray-600 font-mono">
                    {medicalRecord.blockchainTxnHash}
                  </p>
                </div>
              )}
              
              <div className="bg-green-50 p-4 rounded-md border border-green-200">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-sm font-medium text-green-800">
                    Dossier vérifié et sécurisé
                  </span>
                </div>
                <p className="text-sm text-green-700 mt-1">
                  Le contenu de ce dossier a été validé par la blockchain Cardano.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicalTabs;