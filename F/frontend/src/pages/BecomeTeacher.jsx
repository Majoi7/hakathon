// src/pages/BecomeTeacher.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const BecomeTeacher = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleBecomeTeacher = () => {
    // Rediriger vers le dashboard professeur pour compléter les informations
    navigate('/teacher-dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Devenez Professeur sur <span className="text-orange-600">monprof.bg</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Partagez votre savoir et générez des revenus en enseignant ce que vous maîtrisez
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l-9-5m9 5l9-5m-9 5v6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Enseignez à votre rythme</h3>
            <p className="text-gray-600">
              Définissez vos propres horaires et tarifs. Enseignez depuis chez vous ou en présentiel.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v1m0 6v0m0 0h.01M12 12h.01M12 12v.01M12 12h-.01" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Revenus garantis</h3>
            <p className="text-gray-600">
              Recevez vos paiements directement sur la plateforme. Retraits faciles et sécurisés.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Processus de validation</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <h3 className="font-semibold mb-2">Inscription</h3>
              <p className="text-sm text-gray-600">Renseignez vos informations de base</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-orange-600 font-bold">2</span>
              </div>
              <h3 className="font-semibold mb-2">Validation</h3>
              <p className="text-sm text-gray-600">Notre équipe valide votre profil sous 24h</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-green-600 font-bold">3</span>
              </div>
              <h3 className="font-semibold mb-2">Enseignement</h3>
              <p className="text-sm text-gray-600">Commencez à créer vos annonces et enseignez</p>
            </div>
          </div>

          <div className="text-center">
            {user ? (
              <button
                onClick={handleBecomeTeacher}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-medium transition duration-200"
              >
                Commencer la validation
              </button>
            ) : (
              <div className="space-y-4">
                <p className="text-gray-600">Vous devez être connecté pour devenir professeur</p>
                <Link
                  to="/register"
                  className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-medium transition duration-200"
                >
                  Créer un compte
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeTeacher;