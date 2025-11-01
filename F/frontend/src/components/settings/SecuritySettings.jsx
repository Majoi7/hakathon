// src/components/settings/SecuritySettings.jsx
import React, { useState } from 'react';
import api from '../../services/api';

const SecuritySettings = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [activeSession, setActiveSession] = useState('password');
  const [passwordForm, setPasswordForm] = useState({
    current_password: '',
    new_password: '',
    new_password_confirmation: ''
  });

  // Données mock pour les sessions actives
  const [activeSessions, setActiveSessions] = useState([
    {
      id: 1,
      device: 'Chrome sur Windows',
      location: 'Cotonou, BJ',
      ip: '197.155.84.124',
      last_active: '2024-01-15 14:30',
      current: true
    },
    {
      id: 2,
      device: 'Safari sur iPhone',
      location: 'Porto-Novo, BJ',
      ip: '197.155.84.125',
      last_active: '2024-01-14 09:15',
      current: false
    }
  ]);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (passwordForm.new_password !== passwordForm.new_password_confirmation) {
      setMessage('❌ Les mots de passe ne correspondent pas');
      setLoading(false);
      return;
    }

    try {
      await api.put('/profile/password', {
        current_password: passwordForm.current_password,
        new_password: passwordForm.new_password,
        new_password_confirmation: passwordForm.new_password_confirmation
      });
      
      setMessage('✅ Mot de passe changé avec succès');
      setPasswordForm({
        current_password: '',
        new_password: '',
        new_password_confirmation: ''
      });
    } catch (error) {
      setMessage('❌ ' + (error.response?.data?.message || 'Erreur lors du changement de mot de passe'));
    } finally {
      setLoading(false);
    }
  };

  const handleTerminateSession = (sessionId) => {
    setActiveSessions(prev => prev.filter(session => session.id !== sessionId));
    setMessage('✅ Session terminée avec succès');
  };

  const handleTerminateAllSessions = () => {
    setActiveSessions(prev => prev.filter(session => session.current));
    setMessage('✅ Toutes les autres sessions ont été terminées');
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Sécurité du compte</h2>

      {message && (
        <div className={`p-4 rounded-md mb-6 ${
          message.includes('✅') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
        }`}>
          {message}
        </div>
      )}

      {/* Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveSession('password')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeSession === 'password'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Mot de passe
          </button>
          <button
            onClick={() => setActiveSession('sessions')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeSession === 'sessions'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Sessions actives
          </button>
        </nav>
      </div>

      {/* Changement de mot de passe */}
      {activeSession === 'password' && (
        <div className="max-w-2xl">
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Changer le mot de passe</h3>
            <p className="text-sm text-gray-600">
              Utilisez un mot de passe fort que vous n'utilisez pas sur d'autres sites.
            </p>
          </div>

          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe actuel
              </label>
              <input
                type="password"
                value={passwordForm.current_password}
                onChange={(e) => setPasswordForm({...passwordForm, current_password: e.target.value})}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Entrez votre mot de passe actuel"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nouveau mot de passe
              </label>
              <input
                type="password"
                value={passwordForm.new_password}
                onChange={(e) => setPasswordForm({...passwordForm, new_password: e.target.value})}
                required
                minLength="6"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Au moins 6 caractères"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirmer le nouveau mot de passe
              </label>
              <input
                type="password"
                value={passwordForm.new_password_confirmation}
                onChange={(e) => setPasswordForm({...passwordForm, new_password_confirmation: e.target.value})}
                required
                minLength="6"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Répétez le nouveau mot de passe"
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-blue-800 mb-2">Conseils de sécurité</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Utilisez au moins 8 caractères</li>
                <li>• Combinez lettres, chiffres et caractères spéciaux</li>
                <li>• Évitez les mots de passe courants</li>
                <li>• Ne réutilisez pas vos mots de passe</li>
              </ul>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Changement en cours...' : 'Changer le mot de passe'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Sessions actives */}
      {activeSession === 'sessions' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Sessions actives</h3>
              <p className="text-sm text-gray-600">
                Gérez les appareils connectés à votre compte
              </p>
            </div>
            {activeSessions.filter(s => !s.current).length > 0 && (
              <button
                onClick={handleTerminateAllSessions}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Terminer toutes les autres sessions
              </button>
            )}
          </div>

          <div className="space-y-4">
            {activeSessions.map(session => (
              <div key={session.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      session.current ? 'bg-green-500' : 'bg-gray-300'
                    }`}></div>
                    <div>
                      <p className="font-medium text-gray-900">{session.device}</p>
                      <p className="text-sm text-gray-600">
                        {session.location} • {session.ip} • Dernière activité: {session.last_active}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {session.current && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                        Session actuelle
                      </span>
                    )}
                    {!session.current && (
                      <button
                        onClick={() => handleTerminateSession(session.id)}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        Terminer la session
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">Sécurité des sessions</h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>
                    Si vous voyez une session que vous ne reconnaissez pas, terminez-la immédiatement 
                    et changez votre mot de passe.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecuritySettings;