// src/components/settings/NotificationSettings.jsx
import React, { useState } from 'react';
import api from '../../services/api';

const NotificationSettings = ({ settings, onUpdate }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    email_notifications: settings?.email_notifications ?? true,
    sms_notifications: settings?.sms_notifications ?? false,
    whatsapp_notifications: settings?.whatsapp_notifications ?? false,
    low_balance_alert: settings?.low_balance_alert ?? true,
    low_balance_threshold: settings?.low_balance_threshold ?? 5000,
    language: settings?.language ?? 'fr',
    two_factor_auth: settings?.two_factor_auth ?? false,
    notification_types: settings?.notification_types || {
      new_courses: true,
      new_messages: true,
      booking_reminders: true,
      payment_confirmation: true,
      teacher_requests: true,
      course_cancellations: true,
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await api.put('/settings', formData);
      setMessage('✅ Paramètres de notification mis à jour');
      onUpdate();
    } catch (error) {
      setMessage('❌ Erreur lors de la mise à jour');
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleNotificationTypeToggle = (type) => {
    setFormData(prev => ({
      ...prev,
      notification_types: {
        ...prev.notification_types,
        [type]: !prev.notification_types[type]
      }
    }));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Paramètres de notification</h2>

      {message && (
        <div className={`p-4 rounded-md mb-6 ${
          message.includes('✅') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
        }`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Canaux de notification */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Canaux de réception</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">Notifications par email</label>
                <p className="text-sm text-gray-500">Recevoir les notifications par email</p>
              </div>
              <button
                type="button"
                onClick={() => handleToggle('email_notifications')}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  formData.email_notifications ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    formData.email_notifications ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">Notifications SMS</label>
                <p className="text-sm text-gray-500">Recevoir les notifications par SMS</p>
              </div>
              <button
                type="button"
                onClick={() => handleToggle('sms_notifications')}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  formData.sms_notifications ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    formData.sms_notifications ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">Notifications WhatsApp</label>
                <p className="text-sm text-gray-500">Recevoir les notifications sur WhatsApp</p>
              </div>
              <button
                type="button"
                onClick={() => handleToggle('whatsapp_notifications')}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  formData.whatsapp_notifications ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    formData.whatsapp_notifications ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Types de notification */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Types de notification</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">Nouveaux cours disponibles</label>
                <p className="text-sm text-gray-500">Être alerté des nouveaux cours correspondant à mes critères</p>
              </div>
              <button
                type="button"
                onClick={() => handleNotificationTypeToggle('new_courses')}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  formData.notification_types.new_courses ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    formData.notification_types.new_courses ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">Nouveaux messages</label>
                <p className="text-sm text-gray-500">Recevoir des notifications pour les nouveaux messages</p>
              </div>
              <button
                type="button"
                onClick={() => handleNotificationTypeToggle('new_messages')}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  formData.notification_types.new_messages ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    formData.notification_types.new_messages ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">Rappels de réservation</label>
                <p className="text-sm text-gray-500">Rappel avant le début d'un cours</p>
              </div>
              <button
                type="button"
                onClick={() => handleNotificationTypeToggle('booking_reminders')}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  formData.notification_types.booking_reminders ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    formData.notification_types.booking_reminders ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">Confirmations de paiement</label>
                <p className="text-sm text-gray-500">Notification lors de la confirmation d'un paiement</p>
              </div>
              <button
                type="button"
                onClick={() => handleNotificationTypeToggle('payment_confirmation')}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  formData.notification_types.payment_confirmation ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    formData.notification_types.payment_confirmation ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Alertes de solde */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Alertes de solde</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">Alerte solde faible</label>
                <p className="text-sm text-gray-500">Recevoir une alerte quand le solde est faible</p>
              </div>
              <button
                type="button"
                onClick={() => handleToggle('low_balance_alert')}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  formData.low_balance_alert ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    formData.low_balance_alert ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {formData.low_balance_alert && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Seuil d'alerte (FCFA)
                </label>
                <input
                  type="number"
                  value={formData.low_balance_threshold}
                  onChange={(e) => setFormData({...formData, low_balance_threshold: parseInt(e.target.value)})}
                  min="1000"
                  max="50000"
                  step="1000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Recevoir une alerte quand le solde descend en dessous de ce montant
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Langue */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Préférences linguistiques</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Langue de l'interface</label>
            <select
              value={formData.language}
              onChange={(e) => setFormData({...formData, language: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="fr">🇫🇷 Français</option>
              <option value="en">🇬🇧 English</option>
            </select>
          </div>
        </div>

        {/* Authentification à deux facteurs */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Sécurité</h3>
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">Authentification à deux facteurs</label>
              <p className="text-sm text-gray-500">Renforcer la sécurité de votre compte</p>
            </div>
            <button
              type="button"
              onClick={() => handleToggle('two_factor_auth')}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                formData.two_factor_auth ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  formData.two_factor_auth ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t border-gray-200">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Mise à jour...' : 'Enregistrer les paramètres'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NotificationSettings;