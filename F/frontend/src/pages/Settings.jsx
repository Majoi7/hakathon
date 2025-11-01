// src/pages/Settings.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import PersonalInfo from '../components/settings/PersonalInfo';
import TeacherProfile from '../components/settings/TeacherProfile';
import NotificationSettings from '../components/settings/NotificationSettings';
import PaymentSettings from '../components/settings/PaymentSettings';
import SecuritySettings from '../components/settings/SecuritySettings';
import AccountSettings from '../components/settings/AccountSettings';
import api from '../services/api';

const Settings = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('personal');
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfileData();
    
    // Gérer l'onglet actif depuis l'URL
    const hash = location.hash.replace('#', '');
    if (hash && ['personal', 'teacher', 'notifications', 'payment', 'security', 'account'].includes(hash)) {
      setActiveTab(hash);
    }
  }, [location]);

  const fetchProfileData = async () => {
    try {
      const response = await api.get('/profile');
      setProfileData(response.data);
    } catch (error) {
      console.error('Erreur chargement profil:', error);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'personal', label: '👤 Informations personnelles', icon: '👤' },
    ...(user?.role === 'prof' ? [{ id: 'teacher', label: '👨‍🏫 Profil professeur', icon: '👨‍🏫' }] : []),
    { id: 'notifications', label: '🔔 Notifications', icon: '🔔' },
    { id: 'payment', label: '💰 Paiements', icon: '💰' },
    { id: 'security', label: '🔒 Sécurité', icon: '🔒' },
    { id: 'account', label: '⚙️ Compte', icon: '⚙️' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-2xl font-bold text-blue-600">MonProf</Link>
              <nav className="hidden md:flex space-x-6">
                <Link 
                  to={user?.role === 'prof' ? '/teacher-dashboard' : '/student-dashboard'} 
                  className="text-gray-700 hover:text-blue-600"
                >
                  Tableau de bord
                </Link>
                <Link to="/settings" className="text-blue-600 font-medium">
                  Paramètres
                </Link>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                {user?.name} ({user?.role === 'prof' ? 'Professeur' : 'Étudiant'})
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Paramètres du compte</h1>
          <p className="text-gray-600 mt-2">
            Gérez vos informations personnelles, vos préférences et la sécurité de votre compte
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Navigation latérale */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <nav className="space-y-1 p-4">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span className="mr-3 text-lg">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Contenu */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              {activeTab === 'personal' && (
                <PersonalInfo 
                  profileData={profileData} 
                  onUpdate={fetchProfileData} 
                />
              )}
              
              {activeTab === 'teacher' && user?.role === 'prof' && (
                <TeacherProfile 
                  profileData={profileData} 
                  onUpdate={fetchProfileData} 
                />
              )}
              
              {activeTab === 'notifications' && (
                <NotificationSettings 
                  settings={profileData?.settings} 
                  onUpdate={fetchProfileData} 
                />
              )}
              
              {activeTab === 'payment' && (
                <PaymentSettings 
                  profileData={profileData}
                  onUpdate={fetchProfileData} 
                />
              )}
              
              {activeTab === 'security' && (
                <SecuritySettings />
              )}
              
              {activeTab === 'account' && (
                <AccountSettings />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;