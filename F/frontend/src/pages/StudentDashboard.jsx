// src/pages/StudentDashboard.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');

  const subjects = ['Mathématiques', 'Physique', 'Chimie', 'Français', 'Anglais', 'Histoire', 'Informatique'];

  // Données mock pour les cours récents
  const recentCourses = [
    {
      id: 1,
      title: 'Mathématiques Avancées',
      professor: 'Prof. Dupont',
      progress: 60,
      nextSession: 'Aujourd\'hui, 14:00'
    },
    {
      id: 2,
      title: 'Physique Quantique',
      professor: 'Prof. Martin',
      progress: 30,
      nextSession: 'Demain, 16:00'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-2xl font-bold text-blue-600">MonProf</Link>
              <nav className="hidden md:flex space-x-6">
                <Link to="/student-dashboard" className="text-blue-600 font-medium">Accueil</Link>
                <Link to="/search-professors" className="text-gray-700 hover:text-blue-600">Trouver un Prof</Link>
                <Link to="/my-courses" className="text-gray-700 hover:text-blue-600">Mes Cours</Link>
                <Link to="/messages" className="text-gray-700 hover:text-blue-600">Messages</Link>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative group">
                <button className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {user?.name?.charAt(0)}
                  </div>
                  <span className="hidden md:block">{user?.name}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Menu déroulant profil */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    ⚙️ Paramètres
                  </Link>
                  <Link to="/settings#personal" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    👤 Mon profil
                  </Link>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    🚪 Déconnexion
                  </button>
                </div>
              </div>

              <Link 
                to="/become-teacher" 
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-200"
              >
                Devenir Prof
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Bonjour, {user?.name} ! 👋
              </h1>
              <p className="text-gray-600">Prêt pour votre prochaine session d'apprentissage ?</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">5,000 FCFA</div>
              <div className="text-sm text-gray-500">Solde disponible</div>
              <Link 
                to="/settings#payment" 
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Recharger →
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Link 
            to="/search-professors" 
            className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-lg text-center transition duration-200"
          >
            <div className="text-2xl mb-2">🔍</div>
            <div className="font-semibold">Trouver un Prof</div>
          </Link>
          
          <Link 
            to="/my-courses" 
            className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-lg text-center transition duration-200"
          >
            <div className="text-2xl mb-2">📚</div>
            <div className="font-semibold">Mes Cours</div>
          </Link>
          
          <Link 
            to="/messages" 
            className="bg-purple-500 hover:bg-purple-600 text-white p-4 rounded-lg text-center transition duration-200"
          >
            <div className="text-2xl mb-2">💬</div>
            <div className="font-semibold">Messages</div>
          </Link>
          
          <Link 
            to="/settings" 
            className="bg-gray-500 hover:bg-gray-600 text-white p-4 rounded-lg text-center transition duration-200"
          >
            <div className="text-2xl mb-2">⚙️</div>
            <div className="font-semibold">Paramètres</div>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Colonne gauche - Recherche rapide */}
          <div className="lg:col-span-2">
            {/* Search Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Rechercher un professeur</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="Nom du professeur..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Toutes les matières</option>
                    {subjects.map(subject => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium">
                  Rechercher
                </button>
              </div>
            </div>

            {/* Cours récents */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Cours en cours</h2>
              <div className="space-y-4">
                {recentCourses.map(course => (
                  <div key={course.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{course.title}</h3>
                        <p className="text-sm text-gray-600">avec {course.professor}</p>
                      </div>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Prochaine: {course.nextSession}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Progression</span>
                          <span>{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <button className="ml-4 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm">
                        Continuer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              {recentCourses.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-4xl mb-2">📚</div>
                  <p>Aucun cours en cours</p>
                  <Link 
                    to="/search-professors" 
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Trouver votre premier cours →
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Colonne droite - Statistiques et actions rapides */}
          <div className="space-y-6">
            {/* Stats rapides */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Votre progression</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Cours suivis</span>
                    <span className="font-semibold">8</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Heures d'apprentissage</span>
                    <span className="font-semibold">24h</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Professeurs suivis</span>
                    <span className="font-semibold">3</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions rapides */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Actions rapides</h3>
              <div className="space-y-3">
                <Link 
                  to="/settings#personal" 
                  className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600">👤</span>
                  </div>
                  <span className="text-sm font-medium">Compléter mon profil</span>
                </Link>
                
                <Link 
                  to="/settings#notifications" 
                  className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-green-600">🔔</span>
                  </div>
                  <span className="text-sm font-medium">Gérer les notifications</span>
                </Link>
                
                <Link 
                  to="/become-teacher" 
                  className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <span className="text-orange-600">👨‍🏫</span>
                  </div>
                  <span className="text-sm font-medium">Devenir professeur</span>
                </Link>
              </div>
            </div>

            {/* Support */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Besoin d'aide ?</h4>
              <p className="text-sm text-blue-700 mb-3">
                Notre équipe est là pour vous accompagner dans votre apprentissage.
              </p>
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded text-sm font-medium transition-colors">
                Contacter le support
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;