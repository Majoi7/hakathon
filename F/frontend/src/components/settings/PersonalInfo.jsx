// src/components/settings/PersonalInfo.jsx
import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const PersonalInfo = ({ profileData, onUpdate }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [photoLoading, setPhotoLoading] = useState(false);
  
  // Fonction pour formater la date
  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) return dateString;
    return dateString.split('T')[0];
  };

  // Fonction pour obtenir l'URL complète de la photo
  const getProfilePhotoUrl = (photoUrl, photoPath) => {
    const baseUrl = 'http://localhost:8000'; // URL fixe pour le développement
    
    // Priorité 1: URL complète de l'API
    if (photoUrl && photoUrl.startsWith('http')) {
      return photoUrl;
    }
    
    // Priorité 2: URL relative de l'API
    if (photoUrl && photoUrl.startsWith('/storage')) {
      return `${baseUrl}${photoUrl}`;
    }
    
    // Priorité 3: Chemin de stockage
    if (photoPath) {
      return `${baseUrl}/storage/${photoPath}`;
    }
    
    // Fallback
    return '/api/placeholder/150/150';
  };

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    gender: '',
    birth_date: '',
    city: '',
    school: '',
    study_level: '',
    field_of_study: '',
    bio: '',
  });

  const cities = [
    'Cotonou', 'Abomey-Calavi', 'Porto-Novo', 'Parakou', 'Godomey',
    'Kandi', 'Lokossa', 'Ouidah', 'Abomey', 'Natitingou',
    'Djougou', 'Bohicon', 'Sèmè-Podji', 'Save', 'Malanville',
    'Pobé', 'Kétou', 'Cové', 'Aplahoué', 'Bembèrèkè'
  ];

  const studyLevels = [
    'Collège', 'Lycée', 'Bac', 'Licence', 'Master', 'Doctorat', 'Autre'
  ];

  // Mettre à jour formData quand profileData change
  useEffect(() => {
    if (profileData) {
      setFormData({
        name: profileData?.user?.name || '',
        phone: profileData?.profile?.phone || '',
        gender: profileData?.profile?.gender || '',
        birth_date: formatDateForInput(profileData?.profile?.birth_date),
        city: profileData?.profile?.city || '',
        school: profileData?.profile?.school || '',
        study_level: profileData?.profile?.study_level || '',
        field_of_study: profileData?.profile?.field_of_study || '',
        bio: profileData?.profile?.bio || '',
      });
    }
  }, [profileData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await api.put('/profile/personal', formData);
      setMessage('✅ Profil mis à jour avec succès');
      onUpdate();
    } catch (error) {
      setMessage('❌ Erreur lors de la mise à jour');
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadFormData = new FormData();
    uploadFormData.append('profile_photo', file);

    setPhotoLoading(true);
    setMessage('');

    try {
      const response = await api.post('/profile/photo', uploadFormData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      console.log('✅ Réponse upload photo:', response.data);
      
      setMessage('✅ Photo de profil mise à jour');
      onUpdate();
    } catch (error) {
      console.error('❌ Erreur upload:', error.response?.data);
      setMessage('❌ Erreur lors du téléchargement de la photo');
    } finally {
      setPhotoLoading(false);
      e.target.value = '';
    }
  };

  // URL de la photo actuelle
  const currentPhotoUrl = getProfilePhotoUrl(
    profileData?.profile?.profile_photo_url,
    profileData?.profile?.profile_photo
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Informations personnelles</h2>

      {message && (
        <div className={`p-4 rounded-md mb-6 ${
          message.includes('✅') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
        }`}>
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Photo de profil */}
        <div className="lg:col-span-1">
          <div className="text-center">
            <div className="relative inline-block">
              {photoLoading ? (
                <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center border-4 border-white shadow-lg mx-auto">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                <img
                  src={currentPhotoUrl}
                  alt="Photo de profil"
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg mx-auto"
                  onError={(e) => {
                    e.target.src = '/api/placeholder/150/150';
                  }}
                />
              )}
              <label 
                htmlFor="photo-upload" 
                className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600 transition-colors shadow-lg"
                title="Changer la photo"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </label>
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
                disabled={photoLoading}
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {photoLoading ? 'Téléchargement...' : 'Cliquez sur l\'icône pour changer de photo'}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              JPG, PNG, WEBP (max. 5MB)
            </p>
          </div>
        </div>

        {/* Formulaire */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom complet *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Votre nom complet"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Téléphone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="229 XX XX XX XX"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Genre
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="">Sélectionner</option>
                  <option value="male">Homme</option>
                  <option value="female">Femme</option>
                  <option value="other">Autre</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date de naissance
                </label>
                <input
                  type="date"
                  name="birth_date"
                  value={formData.birth_date}
                  onChange={handleChange}
                  max={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ville *
                </label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="">Sélectionner une ville</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Établissement
                </label>
                <input
                  type="text"
                  name="school"
                  value={formData.school}
                  onChange={handleChange}
                  placeholder="Nom de votre école/université"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Niveau d'étude
                </label>
                <select
                  name="study_level"
                  value={formData.study_level}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="">Sélectionner</option>
                  {studyLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filière / Domaine d'étude
              </label>
              <input
                type="text"
                name="field_of_study"
                value={formData.field_of_study}
                onChange={handleChange}
                placeholder="Ex: Mathématiques, Informatique, Médecine..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio / Présentation
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows="4"
                placeholder="Parlez-nous un peu de vous, vos centres d'intérêt, vos objectifs..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical"
                maxLength="500"
              />
              <div className="text-right text-sm text-gray-500 mt-1">
                {formData.bio.length}/500 caractères
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
              >
                {loading ? 'Mise à jour...' : 'Enregistrer les modifications'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;