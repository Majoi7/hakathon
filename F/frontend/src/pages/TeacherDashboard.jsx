// src/pages/TeacherDashboard.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

const TeacherDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [teacherInfo, setTeacherInfo] = useState({
    specialty: '',
    experience: '',
    diploma: '',
    description: '',
    hourlyRate: ''
  });

  // Données mock pour le dashboard
  const dashboardStats = {
    totalEarnings: 125000,
    pendingBalance: 25000,
    studentsCount: 15,
    coursesCount: 8,
    rating: 4.8,
    nextSession: 'Mathématiques - Aujourd\'hui, 14:00'
  };

  const recentStudents = [
    { id: 1, name: 'Marie K.', course: 'Mathématiques', joinDate: '15 Jan' },
    { id: 2, name: 'Jean D.', course: 'Physique', joinDate: '14 Jan' },
    { id: 3, name: 'Alice M.', course: 'Chimie', joinDate: '13 Jan' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Soumettre les informations pour validation
    alert('Vos informations ont été soumises pour validation. Vous serez notifié sous 24 heures.');
  };

  // Vérifier si le professeur est validé
  const isTeacherValidated = user?.teacher_status === 'approved';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-2xl font-bold text-blue-600">MonProf</Link>
              <nav className="hidden md:flex space-x-6">
                <Link to="/teacher-dashboard" className="text-blue-600 font-medium">Tableau de bord</Link>
                {isTeacherValidated && (
                  <>
                    <Link to="/teacher-announcements" className="text-gray-700 hover:text-blue-600">Mes Annonces</Link>
                    <Link to="/teacher-schedule" className="text-gray-700 hover:text-blue-600">Emploi du temps</Link>
                  </>
                )}
                <Link to="/teacher-balance" className="text-gray-700 hover:text-blue-600">Solde</Link>
                <Link to="/messages" className="text-gray-700 hover:text-blue-600">Messages</Link>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative group">
                <button className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {user?.name?.charAt(0)}
                  </div>
                  <span className="hidden md:block">Prof. {user?.name}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Menu déroulant profil */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    ⚙️ Paramètres
                  </Link>
                  <Link to="/settings#teacher" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    👨‍🏫 Profil professeur
                  </Link>
                  <Link to="/teacher-balance" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    💰 Solde & retraits
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
                to="/student-dashboard" 
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-200"
              >
                Compte Étudiant
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {!isTeacherValidated ? (
          /* Formulaire de validation professeur */
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Devenir Professeur sur MonProf
              </h1>
              <p className="text-gray-600">
                Complétez vos informations pour être validé comme professeur
              </p>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-blue-800">
                  ⏱️ Votre compte sera validé sous 24 heures maximum
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Spécialité principale *
                  </label>
                  <select
                    required
                    value={teacherInfo.specialty}
                    onChange={(e) => setTeacherInfo({...teacherInfo, specialty: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Choisir une matière</option>
                    <option value="mathematiques">Mathématiques</option>
                    <option value="physique">Physique</option>
                    <option value="chimie">Chimie</option>
                    <option value="francais">Français</option>
                    <option value="anglais">Anglais</option>
                    <option value="informatique">Informatique</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Années d'expérience *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={teacherInfo.experience}
                    onChange={(e) => setTeacherInfo({...teacherInfo, experience: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Nombre d'années"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Diplôme le plus élevé *
                </label>
                <input
                  type="text"
                  required
                  value={teacherInfo.diploma}
                  onChange={(e) => setTeacherInfo({...teacherInfo, diploma: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ex: Master, Doctorat, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description de votre approche pédagogique *
                </label>
                <textarea
                  required
                  rows="4"
                  value={teacherInfo.description}
                  onChange={(e) => setTeacherInfo({...teacherInfo, description: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Décrivez votre méthode d'enseignement, vos spécialités..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tarif horaire (FCFA) *
                </label>
                <input
                  type="number"
                  required
                  min="1000"
                  step="500"
                  value={teacherInfo.hourlyRate}
                  onChange={(e) => setTeacherInfo({...teacherInfo, hourlyRate: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ex: 5000"
                />
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-yellow-800 text-sm">
                  💡 Pendant la validation, vous pouvez utiliser votre compte étudiant normalement. 
                  Vous serez notifié par email dès que votre statut professeur sera approuvé.
                </p>
              </div>

              <div className="flex justify-end space-x-4">
                <Link 
                  to="/student-dashboard"
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition duration-200"
                >
                  Retour au compte étudiant
                </Link>
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition duration-200"
                >
                  Soumettre pour validation
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Dashboard professeur validé */
          <div className="space-y-6">
            {/* En-tête avec stats */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Bonjour, Professeur {user?.name} ! 👨‍🏫
                  </h1>
                  <p className="text-gray-600">Voici l'aperçu de votre activité</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">{dashboardStats.totalEarnings.toLocaleString()} FCFA</div>
                  <div className="text-sm text-gray-500">Revenus totaux</div>
                </div>
              </div>

              {/* Stats rapides */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{dashboardStats.studentsCount}</div>
                  <div className="text-sm text-blue-800">Étudiants actifs</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{dashboardStats.coursesCount}</div>
                  <div className="text-sm text-green-800">Cours créés</div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">{dashboardStats.rating}</div>
                  <div className="text-sm text-yellow-800">Note moyenne</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{dashboardStats.pendingBalance.toLocaleString()} FCFA</div>
                  <div className="text-sm text-purple-800">En attente</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Colonne gauche - Actions rapides */}
              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <Link 
                    to="/create-announcement" 
                    className="bg-blue-500 hover:bg-blue-600 text-white p-6 rounded-lg text-center transition duration-200"
                  >
                    <div className="text-3xl mb-3">📢</div>
                    <h3 className="font-semibold text-lg mb-2">Créer une annonce</h3>
                    <p className="text-sm opacity-90">Proposer un nouveau cours</p>
                  </Link>
                  
                  <Link 
                    to="/teacher-schedule" 
                    className="bg-green-500 hover:bg-green-600 text-white p-6 rounded-lg text-center transition duration-200"
                  >
                    <div className="text-3xl mb-3">📅</div>
                    <h3 className="font-semibold text-lg mb-2">Gérer l'emploi du temps</h3>
                    <p className="text-sm opacity-90">Définir vos disponibilités</p>
                  </Link>
                </div>

                {/* Prochaine session */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <h2 className="text-xl font-semibold mb-4">Prochaine session</h2>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-blue-900">{dashboardStats.nextSession}</h3>
                        <p className="text-sm text-blue-700">avec Marie K.</p>
                      </div>
                      <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm">
                        Rejoindre
                      </button>
                    </div>
                  </div>
                </div>

                {/* Élèves récents */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold mb-4">Élèves récents</h2>
                  <div className="space-y-3">
                    {recentStudents.map(student => (
                      <div key={student.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-gray-600 font-medium">{student.name.charAt(0)}</span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{student.name}</p>
                            <p className="text-sm text-gray-600">{student.course} • Inscrit le {student.joinDate}</p>
                          </div>
                        </div>
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                          Contacter
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Colonne droite - Actions et statistiques */}
              <div className="space-y-6">
                {/* Actions rapides */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Actions rapides</h3>
                  <div className="space-y-3">
                    <Link 
                      to="/settings#teacher" 
                      className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                        <span className="text-orange-600">👨‍🏫</span>
                      </div>
                      <span className="text-sm font-medium">Modifier mon profil</span>
                    </Link>
                    
                    <Link 
                      to="/teacher-balance" 
                      className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <span className="text-green-600">💰</span>
                      </div>
                      <span className="text-sm font-medium">Gérer les retraits</span>
                    </Link>
                    
                    <Link 
                      to="/settings#notifications" 
                      className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600">🔔</span>
                      </div>
                      <span className="text-sm font-medium">Paramètres notifications</span>
                    </Link>
                  </div>
                </div>

                {/* Statistiques de performance */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Votre performance</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Taux de réponse</span>
                      <span className="font-semibold text-green-600">95%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Sessions complétées</span>
                      <span className="font-semibold">45</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Annulations</span>
                      <span className="font-semibold text-red-600">2</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Temps moyen de réponse</span>
                      <span className="font-semibold">2h</span>
                    </div>
                  </div>
                </div>

                {/* Support */}
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h4 className="font-medium text-orange-900 mb-2">Support professeur</h4>
                  <p className="text-sm text-orange-700 mb-3">
                    Notre équipe dédiée aux professeurs est là pour vous aider.
                  </p>
                  <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded text-sm font-medium transition-colors">
                    Contacter le support
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default TeacherDashboard;