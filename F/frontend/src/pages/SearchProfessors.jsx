import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const SearchProfessors = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');

  const subjects = ['Mathématiques', 'Physique', 'Chimie', 'Français', 'Anglais', 'Histoire', 'Informatique', 'Soutien scolaire'];
  const levels = ['Collège', 'Lycée', 'Universitaire', 'Adulte'];

  // Données mock pour les professeurs inspirées de l'image
  const professors = [
    {
      id: 1,
      name: 'Marie D.',
      subject: 'Soutien scolaire',
      level: 'Tous niveaux',
      description: 'Professeur à temps plein, propose des cours collectifs dès le primaire jusqu au lycée avec méthodologie adaptée',
      rating: 4.9,
      reviews: 142,
      price: 30,
      location: 'Cotonou',
      experience: '15 ans d expérience',
      badge: '10 cours offerts',
      image: '/api/placeholder/80/80'
    },
    {
      id: 2,
      name: 'Florent K.',
      subject: 'Mathématiques',
      level: 'Universitaire',
      description: 'Diplômé de l université nationale, vingt années d expérience, spécialiste en analyse et algèbre avancée',
      rating: 4.8,
      reviews: 89,
      price: 100,
      location: 'Porto-Novo',
      experience: '20 ans d expérience',
      badge: '10 cours offerts',
      image: '/api/placeholder/80/80'
    },
    {
      id: 3,
      name: 'Angélique M.',
      subject: 'Anglais',
      level: 'Tous niveaux',
      description: 'Formatrice certifiée, méthode immersive, préparation aux examens internationaux TOEFL et IELTS',
      rating: 4.7,
      reviews: 203,
      price: 45,
      location: 'Abomey-Calavi',
      experience: '8 ans d expérience',
      badge: '10 cours offerts',
      image: '/api/placeholder/80/80'
    },
    {
      id: 4,
      name: 'David S.',
      subject: 'Physique-Chimie',
      level: 'Lycée',
      description: 'Ancien chercheur, passionné par la transmission du savoir scientifique aux jeunes générations',
      rating: 4.9,
      reviews: 76,
      price: 35,
      location: 'Parakou',
      experience: '12 ans d expérience',
      badge: '10 cours offerts',
      image: '/api/placeholder/80/80'
    },
    {
      id: 5,
      name: 'Sophie T.',
      subject: 'Français',
      level: 'Collège/Lycée',
      description: 'Spécialiste en littérature française, préparation au baccalauréat et perfectionnement en expression écrite',
      rating: 4.6,
      reviews: 118,
      price: 28,
      location: 'Godomey',
      experience: '10 ans d expérience',
      badge: '10 cours offerts',
      image: '/api/placeholder/80/80'
    },
    {
      id: 6,
      name: 'Jean P.',
      subject: 'Informatique',
      level: 'Débutant à Avancé',
      description: 'Développeur full-stack, cours de programmation web et mobile avec projets pratiques concrets',
      rating: 4.8,
      reviews: 95,
      price: 50,
      location: 'Cotonou',
      experience: '6 ans d expérience',
      badge: '10 cours offerts',
      image: '/api/placeholder/80/80'
    }
  ];

  const stats = [
    { number: '35k+', label: 'professeurs particuliers' },
    { number: '4.9/5', label: 'note moyenne' },
    { number: '500k+', label: 'cours dispensés' },
    { number: '95%', label: 'de satisfaction' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-2xl font-bold text-blue-600">monprof.bj</Link>
              <nav className="hidden md:flex space-x-6">
                <Link to="/student-dashboard" className="text-gray-700 hover:text-blue-600">Accueil</Link>
                <Link to="/search-professors" className="text-blue-600 font-medium">Trouver un Prof</Link>
                <Link to="/my-courses" className="text-gray-700 hover:text-blue-600">Mes Cours</Link>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">Bonjour, {user?.name}</span>
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

      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Trouvez le professeur
              <span className="text-blue-600"> parfait</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Des milliers de professeurs qualifiés pour vous accompagner dans votre réussite scolaire
            </p>
            
            {/* Barre de recherche principale */}
            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-2 mb-8">
              <div className="flex flex-col md:flex-row gap-2">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Rechercher une matière, un professeur..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg"
                  />
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition duration-200">
                  Rechercher
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-blue-600">{stat.number}</div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Filtres */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Matière</label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Toutes les matières</option>
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Niveau</label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Tous les niveaux</option>
                {levels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Localisation</label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="">Partout au Bénin</option>
                <option value="cotonou">Cotonou</option>
                <option value="porto-novo">Porto-Novo</option>
                <option value="abomey-calavi">Abomey-Calavi</option>
              </select>
            </div>
          </div>
        </div>

        {/* Liste des professeurs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {professors.map(professor => (
            <div key={professor.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg">
                      {professor.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{professor.name}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                          {professor.subject}
                        </span>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                          {professor.level}
                        </span>
                      </div>
                      <div className="flex items-center mt-2">
                        <div className="flex text-yellow-400">
                          {'★'.repeat(Math.floor(professor.rating))}
                          <span className="text-gray-300">
                            {'★'.repeat(5 - Math.floor(professor.rating))}
                          </span>
                        </div>
                        <span className="ml-2 text-sm text-gray-600">
                          {professor.rating} ({professor.reviews} avis)
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">{professor.price}€/h</div>
                    <div className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium mt-1">
                      {professor.badge}
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 mb-4 leading-relaxed">
                  {professor.description}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
                    <span>📍 {professor.location}</span>
                    <span>🎓 {professor.experience}</span>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button className="flex-1 bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 py-3 px-4 rounded-xl font-semibold transition duration-200">
                    Voir le profil
                  </button>
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-semibold transition duration-200">
                    Réserver un cours
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <button className="bg-white border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-3 rounded-xl font-semibold transition duration-200">
            Charger plus de professeurs
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchProfessors;