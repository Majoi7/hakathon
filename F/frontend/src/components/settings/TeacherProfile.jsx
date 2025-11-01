// src/components/settings/TeacherProfile.jsx
import React, { useState } from 'react';
import api from '../../services/api';

const TeacherProfile = ({ profileData, onUpdate }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    specialties: profileData?.teacher_profile?.specialties || [],
    levels_taught: profileData?.teacher_profile?.levels_taught || [],
    professional_bio: profileData?.teacher_profile?.professional_bio || '',
    hourly_rate: profileData?.teacher_profile?.hourly_rate || '',
    withdrawal_method: profileData?.teacher_profile?.withdrawal_method || 'momo',
    withdrawal_account: profileData?.teacher_profile?.withdrawal_account || '',
  });

  const [diplomaUploading, setDiplomaUploading] = useState(false);

  const subjects = [
    'Mathématiques', 'Physique', 'Chimie', 'Français', 'Anglais', 
    'Histoire-Géographie', 'Philosophie', 'SVT', 'Économie', 
    'Informatique', 'Programmation', 'Espagnol', 'Allemand',
    'Comptabilité', 'Droit', 'Marketing', 'Arts', 'Musique'
  ];

  const levels = ['Collège', 'Lycée', 'Universitaire', 'Adulte'];
  const withdrawalMethods = [
    { value: 'momo', label: 'MTN Mobile Money', icon: '📱' },
    { value: 'moov', label: 'Moov Money', icon: '📱' },
    { value: 'celtis', label: 'Celtis', icon: '💳' },
    { value: 'visa', label: 'Visa/Mastercard', icon: '💳' },
    { value: 'bank', label: 'Virement bancaire', icon: '🏦' },
  ];

  const handleArrayChange = (field, value) => {
    setFormData(prev => {
      const currentArray = prev[field] || [];
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];
      return { ...prev, [field]: newArray };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await api.put('/profile/teacher', formData);
      setMessage('✅ Profil professeur mis à jour avec succès');
      onUpdate();
    } catch (error) {
      setMessage('❌ Erreur lors de la mise à jour: ' + (error.response?.data?.message || 'Erreur inconnue'));
    } finally {
      setLoading(false);
    }
  };

  const handleDiplomaUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('diploma_file', file);
    formData.append('diploma_name', file.name);

    setDiplomaUploading(true);
    try {
      await api.post('/profile/upload-diploma', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage('✅ Diplôme uploadé avec succès');
      onUpdate();
    } catch (error) {
      setMessage('❌ Erreur lors du téléchargement du diplôme');
    } finally {
      setDiplomaUploading(false);
    }
  };

  const toggleProfilePause = async () => {
    try {
      await api.post('/profile/toggle-pause');
      setMessage('✅ Statut du profil mis à jour');
      onUpdate();
    } catch (error) {
      setMessage('❌ Erreur lors de la modification du statut');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Profil Professeur</h2>
        {profileData?.teacher_profile && (
          <button
            onClick={toggleProfilePause}
            className={`px-4 py-2 rounded-md font-medium ${
              profileData.teacher_profile.profile_paused
                ? 'bg-green-500 hover:bg-green-600 text-white'
                : 'bg-yellow-500 hover:bg-yellow-600 text-white'
            }`}
          >
            {profileData.teacher_profile.profile_paused ? 'Activer le profil' : 'Mettre en pause'}
          </button>
        )}
      </div>

      {message && (
        <div className={`p-4 rounded-md mb-6 ${
          message.includes('✅') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
        }`}>
          {message}
        </div>
      )}

      {/* Statut de vérification */}
      {profileData?.teacher_profile && (
        <div className={`p-4 rounded-md mb-6 ${
          profileData.teacher_profile.verified 
            ? 'bg-green-50 border border-green-200 text-green-700'
            : 'bg-yellow-50 border border-yellow-200 text-yellow-700'
        }`}>
          <div className="flex items-center">
            {profileData.teacher_profile.verified ? (
              <>
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>✅ Votre profil est vérifié et approuvé</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>⏳ Votre profil est en attente de vérification</span>
              </>
            )}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Spécialités */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Matières enseignées *
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {subjects.map(subject => (
              <label key={subject} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.specialties.includes(subject)}
                  onChange={() => handleArrayChange('specialties', subject)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{subject}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Niveaux enseignés */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Niveaux enseignés *
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {levels.map(level => (
              <label key={level} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.levels_taught.includes(level)}
                  onChange={() => handleArrayChange('levels_taught', level)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{level}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Bio professionnelle */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Présentation professionnelle *
          </label>
          <textarea
            name="professional_bio"
            value={formData.professional_bio}
            onChange={(e) => setFormData({...formData, professional_bio: e.target.value})}
            rows="4"
            required
            placeholder="Décrivez votre expérience, votre méthodologie d'enseignement, vos succès..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="text-sm text-gray-500 mt-1">
            Minimum 50 caractères. Cette description sera visible par les étudiants.
          </p>
        </div>

        {/* Tarif horaire */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tarif horaire (FCFA) *
            </label>
            <input
              type="number"
              name="hourly_rate"
              value={formData.hourly_rate}
              onChange={(e) => setFormData({...formData, hourly_rate: e.target.value})}
              required
              min="1000"
              max="50000"
              step="500"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-sm text-gray-500 mt-1">
              Entre 1 000 et 50 000 FCFA/heure
            </p>
          </div>

          {/* Upload diplômes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Diplômes & Certifications
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleDiplomaUpload}
                disabled={diplomaUploading}
                className="hidden"
                id="diploma-upload"
              />
              <label
                htmlFor="diploma-upload"
                className="cursor-pointer text-blue-600 hover:text-blue-700 font-medium"
              >
                {diplomaUploading ? 'Téléchargement...' : '📄 Ajouter un diplôme'}
              </label>
              <p className="text-sm text-gray-500 mt-1">
                PDF, JPG, PNG (max 5MB)
              </p>
            </div>
          </div>
        </div>

        {/* Méthode de retrait */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Méthode de retrait *
            </label>
            <select
              name="withdrawal_method"
              value={formData.withdrawal_method}
              onChange={(e) => setFormData({...formData, withdrawal_method: e.target.value})}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {withdrawalMethods.map(method => (
                <option key={method.value} value={method.value}>
                  {method.icon} {method.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Compte de retrait *
            </label>
            <input
              type="text"
              name="withdrawal_account"
              value={formData.withdrawal_account}
              onChange={(e) => setFormData({...formData, withdrawal_account: e.target.value})}
              required
              placeholder={
                formData.withdrawal_method === 'momo' || formData.withdrawal_method === 'moov' 
                  ? '229 XX XX XX XX' 
                  : 'Numéro de compte'
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Mise à jour...' : 'Enregistrer le profil'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TeacherProfile;