import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">MonProf</h1>
            </div>
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <span className="text-gray-700">Bonjour, {user?.name}</span>
                  <Link
                    to={user?.role === 'prof' ? '/teacher-dashboard' : '/student-dashboard'}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-200"
                  >
                    Tableau de bord
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-200"
                  >
                    Connexion
                  </Link>
                  <Link
                    to="/register"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-200"
                  >
                    S'inscrire
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            La plateforme qui 
            <span className="text-blue-600"> connecte</span><br />
            élèves et professeurs
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Que vous soyez étudiant cherchant à progresser ou professeur souhaitant partager votre savoir, 
            MonProf est la solution idéale pour des cours particuliers de qualité.
          </p>
          <div className="flex justify-center space-x-4">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/register"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium transition duration-200"
                >
                  Commencer gratuitement
                </Link>
                <Link
                  to="/login"
                  className="border border-blue-500 text-blue-500 hover:bg-blue-50 px-8 py-3 rounded-lg text-lg font-medium transition duration-200"
                >
                  Se connecter
                </Link>
              </>
            ) : (
              <div className="flex space-x-4">
                <Link
                  to={user?.role === 'prof' ? '/teacher-dashboard' : '/student-dashboard'}
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-medium transition duration-200"
                >
                  Accéder à mon espace
                </Link>
                {user?.role === 'apprenant' && (
                  <Link
                    to="/become-teacher"
                    className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg text-lg font-medium transition duration-200"
                  >
                    Devenir Professeur
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Features pour étudiants */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Pour les <span className="text-blue-600">Étudiants</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Trouvez le professeur idéal</h3>
              <p className="text-gray-600">
                Recherchez par matière, niveau et localisation. Des centaines de professeurs qualifiés à votre disposition.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Cours personnalisés</h3>
              <p className="text-gray-600">
                Des cours adaptés à vos objectifs et votre rythme d'apprentissage. Suivi personnalisé garanti.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Flexibilité horaire</h3>
              <p className="text-gray-600">
                Planifiez vos cours selon vos disponibilités. En présentiel ou en ligne, à vous de choisir.
              </p>
            </div>
          </div>
        </div>

        {/* Features pour professeurs */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Pour les <span className="text-orange-600">Professeurs</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v1m0 6v0m0 0h.01M12 12h.01M12 12v.01M12 12h-.01" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Générez des revenus</h3>
              <p className="text-gray-600">
                Fixez vos tarifs et enseignez à votre rythme. Des revenus complémentaires ou à temps plein.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Étudiants garantis</h3>
              <p className="text-gray-600">
                Notre plateforme vous met en relation avec des étudiants motivés. Plus besoin de chercher des élèves.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Gestion simplifiée</h3>
              <p className="text-gray-600">
                Outils de planning, gestion des paiements et communication intégrée. Concentrez-vous sur l'enseignement.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-blue-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Prêt à commencer votre aventure pédagogique ?
          </h2>
          <p className="text-xl mb-6 opacity-90">
            Rejoignez la communauté MonProf et transformez votre passion pour l'enseignement en opportunité
          </p>
          <div className="flex justify-center space-x-4">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/register?role=apprenant"
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg text-lg font-medium transition duration-200"
                >
                  Je suis étudiant
                </Link>
                <Link
                  to="/register?role=prof"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg text-lg font-medium transition duration-200"
                >
                  Je suis professeur
                </Link>
              </>
            ) : (
              <Link
                to={user?.role === 'prof' ? '/teacher-dashboard' : '/student-dashboard'}
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg text-lg font-medium transition duration-200"
              >
                Accéder à ma plateforme
              </Link>
            )}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
            <div className="text-gray-600">Professeurs actifs</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600 mb-2">2,000+</div>
            <div className="text-gray-600">Étudiants satisfaits</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
            <div className="text-gray-600">Matières enseignées</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-orange-600 mb-2">98%</div>
            <div className="text-gray-600">Taux de satisfaction</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">MonProf</h3>
              <p className="text-gray-400">
                La plateforme de référence pour les cours particuliers entre étudiants et professeurs.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Étudiants</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/search-professors" className="hover:text-white">Trouver un professeur</Link></li>
                <li><Link to="/how-it-works" className="hover:text-white">Comment ça marche</Link></li>
                <li><Link to="/pricing" className="hover:text-white">Tarifs</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Professeurs</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/become-teacher" className="hover:text-white">Devenir professeur</Link></li>
                <li><Link to="/teacher-guide" className="hover:text-white">Guide du professeur</Link></li>
                <li><Link to="/teacher-pricing" className="hover:text-white">Rémunération</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>support@monprof.bj</li>
                <li>+229 1 23 45 67 89</li>
                <li>Paris, France</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 MonProf. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;