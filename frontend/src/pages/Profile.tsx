import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Phone, Building, Shield } from 'lucide-react';

const Profile: React.FC = () => {
  const { currentDoctor } = useAuth();

  // Mock data for the doctor profile
  const doctorDetails = {
    name: currentDoctor?.name || 'Dr. Martin Dubois',
    email: currentDoctor?.email || 'doctor@example.com',
    phone: '+33 1 23 45 67 89',
    specialty: 'Médecine générale',
    hospital: 'Centre Médical Saint-Louis',
    licenseNumber: 'MED-75-12345',
    lastLogin: new Date().toLocaleString('fr-FR'),
    accessLevel: 'Niveau 3 - Accès complet aux dossiers',
  };

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Profil médecin</h1>
        
        <div className="bg-white shadow overflow-hidden rounded-lg">
          <div className="px-4 py-5 sm:px-6 bg-blue-50 border-b border-blue-100">
            <div className="flex items-center">
              <div className="h-14 w-14 rounded-full bg-blue-200 flex items-center justify-center">
                <User className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-semibold text-gray-900">{doctorDetails.name}</h2>
                <p className="text-sm text-gray-500">{doctorDetails.specialty}</p>
              </div>
            </div>
          </div>
          
          <div className="px-4 py-5 sm:p-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-gray-400" />
                  Adresse email
                </dt>
                <dd className="mt-1 text-sm text-gray-900">{doctorDetails.email}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-gray-400" />
                  Téléphone
                </dt>
                <dd className="mt-1 text-sm text-gray-900">{doctorDetails.phone}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <Building className="h-4 w-4 mr-2 text-gray-400" />
                  Établissement
                </dt>
                <dd className="mt-1 text-sm text-gray-900">{doctorDetails.hospital}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <Shield className="h-4 w-4 mr-2 text-gray-400" />
                  Numéro de licence
                </dt>
                <dd className="mt-1 text-sm text-gray-900">{doctorDetails.licenseNumber}</dd>
              </div>
              <div className="sm:col-span-2">
                <div className="py-3 border-t border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Informations de sécurité</h3>
                </div>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Dernière connexion</dt>
                <dd className="mt-1 text-sm text-gray-900">{doctorDetails.lastLogin}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Niveau d'accès</dt>
                <dd className="mt-1 text-sm font-medium text-green-600">
                  {doctorDetails.accessLevel}
                </dd>
              </div>
            </dl>
          </div>
          
          <div className="px-4 py-4 sm:px-6 bg-gray-50 border-t border-gray-200">
            <div className="flex space-x-3">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Modifier le profil
              </button>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Changer le mot de passe
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-6 bg-white shadow overflow-hidden rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Paramètres du compte</h2>
          </div>
          <div className="px-4 py-5 sm:p-6 space-y-6">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="notifications"
                  name="notifications"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  defaultChecked
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="notifications" className="font-medium text-gray-700">
                  Notifications par email
                </label>
                <p className="text-gray-500">Recevoir des notifications pour les nouveaux dossiers et mises à jour.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="two_factor"
                  name="two_factor"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="two_factor" className="font-medium text-gray-700">
                  Authentification à deux facteurs
                </label>
                <p className="text-gray-500">Améliorer la sécurité de votre compte avec l'authentification à deux facteurs.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;