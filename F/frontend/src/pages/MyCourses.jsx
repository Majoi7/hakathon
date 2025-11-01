import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const MyCourses = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('ongoing');

  // Données mock pour les cours
  const courses = {
    ongoing: [
      {
        id: 1,
        title: 'Mathématiques Avancées',
        professor: 'Prof. Dupont',
        nextSession: '2024-01-20 14:00',
        progress: 60,
        totalSessions: 10,
        completedSessions: 6
      },
      {
        id: 2,
        title: 'Physique Quantique',
        professor: 'Prof. Martin',
        nextSession: '2024-01-22 16:00',
        progress: 30,
        totalSessions: 12,
        completedSessions: 4
      }
    ],
    completed: [
      {
        id: 3,
        title: 'Chimie Organique',
        professor: 'Prof. Leroy',
        completedDate: '2024-01-10',
        finalGrade: 'A',
        rating: 5
      }
    ],
    upcoming: [
      {
        id: 4,
        title: 'Programmation Python',
        professor: 'Prof. Silva',
        startDate: '2024-02-01',
        duration: '8 semaines'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-2xl font-bold text-blue-600">monprof.bg</Link>
              <nav className="hidden md:flex space-x-6">
                <Link to="/student-dashboard" className="text-gray-700 hover:text-blue-600">Accueil</Link>
                <Link to="/search-professors" className="text-gray-700 hover:text-blue-600">Trouver un Prof</Link>
                <Link to="/my-courses" className="text-blue-600 font-medium">Mes Cours</Link>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link 
                to="/become-teacher" 
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
              >
                Devenir Prof
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Mes Cours</h1>
          <p className="text-gray-600">Gérez votre apprentissage et suivez votre progression</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b">
            <nav className="flex -mb-px">
              {[
                { id: 'ongoing', label: 'En cours', count: courses.ongoing.length },
                { id: 'upcoming', label: 'À venir', count: courses.upcoming.length },
                { id: 'completed', label: 'Terminés', count: courses.completed.length }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-4 px-6 text-center border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Contenu des tabs */}
        <div className="space-y-6">
          {courses[activeTab].map(course => (
            <div key={course.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{course.title}</h3>
                  <p className="text-gray-600">avec {course.professor}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  activeTab === 'ongoing' ? 'bg-blue-100 text-blue-800' :
                  activeTab === 'upcoming' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {activeTab === 'ongoing' ? 'En cours' :
                   activeTab === 'upcoming' ? 'À venir' : 'Terminé'}
                </span>
              </div>

              {activeTab === 'ongoing' && (
                <div className="space-y-3">
                  <div>
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
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Prochaine session:</span>
                      <p className="font-medium">{course.nextSession}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Sessions:</span>
                      <p className="font-medium">{course.completedSessions}/{course.totalSessions}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'upcoming' && (
                <div className="space-y-2">
                  <p><span className="text-gray-600">Début:</span> {course.startDate}</p>
                  <p><span className="text-gray-600">Durée:</span> {course.duration}</p>
                </div>
              )}

              {activeTab === 'completed' && (
                <div className="flex justify-between items-center">
                  <div>
                    <p><span className="text-gray-600">Terminé le:</span> {course.completedDate}</p>
                    <p><span className="text-gray-600">Note finale:</span> {course.finalGrade}</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-yellow-400 text-lg">⭐</span>
                    <span className="ml-1 font-medium">{course.rating}/5</span>
                  </div>
                </div>
              )}

              <div className="mt-4 flex space-x-3">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm transition duration-200">
                  {activeTab === 'ongoing' ? 'Accéder au cours' :
                   activeTab === 'upcoming' ? 'Voir les détails' :
                   'Donner un avis'}
                </button>
                <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-50 transition duration-200">
                  Contacter le professeur
                </button>
              </div>
            </div>
          ))}

          {courses[activeTab].length === 0 && (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-gray-400 text-2xl">📚</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun cours {activeTab}</h3>
              <p className="text-gray-600 mb-4">
                {activeTab === 'ongoing' ? 'Commencez un nouveau cours pour voir votre progression ici.' :
                 activeTab === 'upcoming' ? 'Aucun cours programmé pour le moment.' :
                 'Aucun cours terminé pour le moment.'}
              </p>
              {activeTab !== 'completed' && (
                <Link 
                  to="/search-professors"
                  className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition duration-200"
                >
                  Trouver un cours
                </Link>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MyCourses;