// src/components/settings/AccountSettings.jsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const AccountSettings = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [deactivateForm, setDeactivateForm] = useState({
    password: '',
    reason: ''
  });

  const accountStats = {
    member_since: 'Jan 2024',
    total_courses: user?.role === 'prof' ? 12 : 8,
    completed_sessions: user?.role === 'prof' ? 45 : 24,
    student_rating: user?.role === 'prof' ? 4.8 : null,
  };

  const handleExportData = async () => {
    setLoading(true);
    try {
      // Simuler l'export de données
      await new Promise(resolve => setTimeout(resolve, 2000));
      setMessage('✅ Données exportées avec succès. Vous recevrez un email avec le lien de téléchargement.');
    } catch (error) {
      setMessage('❌ Erreur lors de l\'export des données');
    } finally {
      setLoading(false);
    }
  };

  const handleDeactivateAccount = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post('/account/deactivate', deactivateForm);
      setMessage('✅ Compte désactivé avec succès');
      setShowDeactivateModal(false);
      
      // Déconnexion et redirection
      setTimeout(() => {
        logout();
        navigate('/');
      }, 2000);
    } catch (error) {
      setMessage('❌ ' + (error.response?.data?.message || 'Erreur lors de la désactivation'));
    } finally {
      setLoading(false);
    }
  };

  const reasons = [
    'Je n\'utilise plus la plateforme',
    'Problèmes techniques',
    'Préoccupations concernant la confidentialité',
    'Trop de notifications',
    'Service trop cher',
    'Autre'
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Paramètres du compte</h2>

      {message && (
        <div className={`p-4 rounded-md mb-6 ${
          message.includes('✅') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
        }`}>
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Statistiques du compte */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Aperçu du compte</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{accountStats.member_since}</div>
                <div className="text-sm text-gray-600">Membre depuis</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{accountStats.total_courses}</div>
                <div className="text-sm text-gray-600">
                  {user?.role === 'prof' ? 'Cours créés' : 'Cours suivis'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{accountStats.completed_sessions}</div>
                <div className="text-sm text-gray-600">Sessions terminées</div>
              </div>
              {user?.role === 'prof' && (
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">{accountStats.student_rating}</div>
                  <div className="text-sm text-gray-600">Note moyenne</div>
                </div>
              )}
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h4 className="font-medium text-gray-900 mb-2">Informations du compte</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Rôle:</span>
                  <span className="font-medium">{user?.role === 'prof' ? 'Professeur' : 'Étudiant'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium">{user?.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Compte vérifié:</span>
                  <span className="font-medium text-green-600">✅ Oui</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Dernière connexion:</span>
                  <span className="font-medium">Aujourd'hui</span>
                </div>
              </div>
            </div>
          </div>

          {/* Export des données */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Export des données</h3>
            <p className="text-sm text-gray-600 mb-4">
              Téléchargez une copie de vos données personnelles, y compris votre profil, 
              vos cours, vos messages et votre historique de paiements.
            </p>
            <button
              onClick={handleExportData}
              disabled={loading}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50"
            >
              {loading ? 'Génération en cours...' : 'Exporter mes données'}
            </button>
          </div>
        </div>

        {/* Actions du compte */}
        <div className="space-y-6">
          {/* Changement de rôle */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Changer de rôle</h3>
            <p className="text-sm text-gray-600 mb-4">
              {user?.role === 'prof' 
                ? 'Vous êtes actuellement professeur. Accédez à votre compte étudiant.'
                : 'Vous êtes actuellement étudiant. Devenez professeur.'
              }
            </p>
            {user?.role === 'prof' ? (
              <button
                onClick={() => navigate('/student-dashboard')}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Accéder au compte étudiant
              </button>
            ) : (
              <button
                onClick={() => navigate('/become-teacher')}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Devenir professeur
              </button>
            )}
          </div>

          {/* Désactivation du compte */}
          <div className="bg-white border border-red-200 rounded-lg p-6">
            <h3 className="text-lg font-medium text-red-900 mb-4">Zone de danger</h3>
            <p className="text-sm text-red-600 mb-4">
              La désactivation de votre compte est permanente. Toutes vos données seront supprimées 
              et vous ne pourrez plus accéder à vos cours et historique.
            </p>
            <button
              onClick={() => setShowDeactivateModal(true)}
              className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Désactiver mon compte
            </button>
          </div>
        </div>
      </div>

      {/* Modal de désactivation */}
      {showDeactivateModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-red-900 mb-4">Désactiver votre compte</h3>
              
              <form onSubmit={handleDeactivateAccount} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mot de passe *
                  </label>
                  <input
                    type="password"
                    value={deactivateForm.password}
                    onChange={(e) => setDeactivateForm({...deactivateForm, password: e.target.value})}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Confirmez votre mot de passe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Raison (optionnel)
                  </label>
                  <select
                    value={deactivateForm.reason}
                    onChange={(e) => setDeactivateForm({...deactivateForm, reason: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="">Sélectionnez une raison</option>
                    {reasons.map(reason => (
                      <option key={reason} value={reason}>{reason}</option>
                    ))}
                  </select>
                </div>

                {deactivateForm.reason === 'Autre' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Précisez
                    </label>
                    <textarea
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Décrivez la raison de votre départ..."
                    />
                  </div>
                )}

                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">Action irréversible</h3>
                      <div className="mt-2 text-sm text-red-700">
                        <p>
                          Cette action ne peut pas être annulée. Toutes vos données seront 
                          définitivement supprimées.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowDeactivateModal(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-400 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-red-500 text-white rounded-md text-sm font-medium hover:bg-red-600 transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Désactivation...' : 'Confirmer la désactivation'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountSettings;