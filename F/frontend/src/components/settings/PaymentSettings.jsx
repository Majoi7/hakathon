// src/components/settings/PaymentSettings.jsx - VERSION AVEC IMAGES
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import PaymentIcons from '../../components/PaymentIcons';
import { getPaymentMethodsData } from '../../components/PaymentMethods';

const PaymentSettings = ({ profileData, onUpdate }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('methods');

  const [paymentMethods, setPaymentMethods] = useState([
    { type: 'momo', number: '', isDefault: true },
    { type: 'moov', number: '', isDefault: false },
    { type: 'celtis', number: '', isDefault: false },
    { type: 'visa', number: '', isDefault: false },
  ]);

  const [preferences, setPreferences] = useState({
    preferred_payment_method: 'momo',
    auto_low_balance_alert: true,
    low_balance_threshold: 5000,
  });

  // Récupérer les données des méthodes de paiement
  const paymentMethodsData = getPaymentMethodsData();

  const paymentIcons = {
    momo: { 
      label: 'MTN Mobile Money', 
      icon: <PaymentIcons method="momo" size={32} />,
      placeholder: '229 XX XX XX XX'
    },
    moov: { 
      label: 'Moov Money', 
      icon: <PaymentIcons method="moov" size={32} />,
      placeholder: '229 XX XX XX XX'
    },
    celtis: { 
      label: 'Celtis', 
      icon: <PaymentIcons method="celtis" size={32} />,
      placeholder: 'Numéro de carte'
    },
    visa: { 
      label: 'Visa/Mastercard', 
      icon: <PaymentIcons method="visa" size={32} />,
      placeholder: 'Numéro de carte'
    },
    bank: { 
      label: 'Virement bancaire', 
      icon: <PaymentIcons method="bank" size={32} />,
      placeholder: 'Numéro de compte'
    }
  };

  const handleSavePreferences = async () => {
    setLoading(true);
    try {
      await api.put('/settings/payment-preferences', preferences);
      setMessage('✅ Préférences de paiement mises à jour');
      onUpdate();
    } catch (error) {
      setMessage('❌ Erreur lors de la mise à jour');
    } finally {
      setLoading(false);
    }
  };

  const handleAddPaymentMethod = () => {
    setPaymentMethods(prev => [...prev, { type: 'momo', number: '', isDefault: false }]);
  };

  const handleRemovePaymentMethod = (index) => {
    setPaymentMethods(prev => prev.filter((_, i) => i !== index));
  };

  const handleSetDefault = (index) => {
    setPaymentMethods(prev => 
      prev.map((method, i) => ({
        ...method,
        isDefault: i === index
      }))
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Paramètres de paiement</h2>

      {message && (
        <div className={`p-4 rounded-md mb-6 ${
          message.includes('✅') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
        }`}>
          {message}
        </div>
      )}

      {/* Navigation par onglets */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('methods')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'methods'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Méthodes de paiement
          </button>
          <button
            onClick={() => setActiveTab('preferences')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'preferences'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Préférences
          </button>
          {user?.role === 'prof' && (
            <button
              onClick={() => setActiveTab('withdrawal')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'withdrawal'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Retraits
            </button>
          )}
        </nav>
      </div>

      {/* Méthodes de paiement */}
      {activeTab === 'methods' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Méthodes de paiement enregistrées</h3>
            
            <div className="space-y-4">
              {paymentMethods.map((method, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        {paymentIcons[method.type]?.icon}
                      </div>
                      <div>
                        <span className="font-medium">{paymentIcons[method.type]?.label}</span>
                        {method.isDefault && (
                          <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Par défaut</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {!method.isDefault && (
                        <button
                          onClick={() => handleSetDefault(index)}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          Définir par défaut
                        </button>
                      )}
                      <button
                        onClick={() => handleRemovePaymentMethod(index)}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Numéro/Compte
                    </label>
                    <input
                      type="text"
                      value={method.number}
                      onChange={(e) => {
                        const newMethods = [...paymentMethods];
                        newMethods[index].number = e.target.value;
                        setPaymentMethods(newMethods);
                      }}
                      placeholder={paymentIcons[method.type]?.placeholder}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleAddPaymentMethod}
              className="mt-4 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              + Ajouter une méthode de paiement
            </button>
          </div>

          {/* Méthodes de paiement acceptées */}
          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Méthodes de paiement acceptées</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {paymentMethodsData.map((method) => (
                <div key={method.id} className="text-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors bg-white">
                  <div className="flex justify-center mb-3">
                    {method.icon}
                  </div>
                  <span className="text-xs text-gray-600 font-medium">{method.name}</span>
                  <p className="text-xs text-gray-500 mt-1 hidden md:block">{method.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">Sécurité des paiements</h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>Vos informations de paiement sont cryptées et sécurisées. Nous ne stockons jamais vos codes confidentiels.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Préférences de paiement */}
      {activeTab === 'preferences' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Préférences générales</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Méthode de paiement préférée
                </label>
                <select
                  value={preferences.preferred_payment_method}
                  onChange={(e) => setPreferences({...preferences, preferred_payment_method: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {Object.entries(paymentIcons).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">Alerte solde faible automatique</label>
                  <p className="text-sm text-gray-500">Recevoir une alerte quand le solde est faible</p>
                </div>
                <button
                  onClick={() => setPreferences({...preferences, auto_low_balance_alert: !preferences.auto_low_balance_alert})}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    preferences.auto_low_balance_alert ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      preferences.auto_low_balance_alert ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {preferences.auto_low_balance_alert && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Seuil d'alerte (FCFA)
                  </label>
                  <input
                    type="number"
                    value={preferences.low_balance_threshold}
                    onChange={(e) => setPreferences({...preferences, low_balance_threshold: parseInt(e.target.value)})}
                    min="1000"
                    max="50000"
                    step="1000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleSavePreferences}
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md font-medium transition-colors disabled:opacity-50"
            >
              {loading ? 'Enregistrement...' : 'Enregistrer les préférences'}
            </button>
          </div>
        </div>
      )}

      {/* Paramètres de retrait (Professeurs uniquement) */}
      {activeTab === 'withdrawal' && user?.role === 'prof' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Paramètres de retrait</h3>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">Informations importantes</h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>Les retraits sont traités sous 24-48 heures. Un frais de transfert de 1.5% est appliqué.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Méthode de retrait actuelle
                </label>
                <div className="p-3 bg-gray-50 rounded-md border">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">
                      {paymentIcons[profileData?.teacher_profile?.withdrawal_method]?.split(' ')[0]}
                    </span>
                    <span>
                      {paymentIcons[profileData?.teacher_profile?.withdrawal_method]?.split(' ').slice(1).join(' ')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {profileData?.teacher_profile?.withdrawal_account || 'Non configuré'}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Solde disponible
                </label>
                <div className="p-3 bg-green-50 rounded-md border border-green-200">
                  <p className="text-2xl font-bold text-green-600">0 FCFA</p>
                  <p className="text-sm text-green-600 mt-1">Montant disponible pour retrait</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">Historique des retraits récents</h4>
            <div className="text-center py-8 text-gray-500">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v1m0 6v0m0 0h.01M12 12h.01M12 12v.01M12 12h-.01" />
              </svg>
              <p className="mt-2">Aucun retrait effectué pour le moment</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentSettings;