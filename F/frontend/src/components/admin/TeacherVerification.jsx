// src/components/admin/TeacherVerification.jsx
import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';

const TeacherVerification = () => {
  const { admin } = useAdminAuth();
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [verificationModal, setVerificationModal] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');

  useEffect(() => {
    fetchPendingTeachers();
  }, []);

  const fetchPendingTeachers = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch('http://localhost:8000/api/admin/admin/teachers/pending', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setTeachers(data.data || data);
      }
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const openVerificationModal = (teacher, status) => {
    setSelectedTeacher(teacher);
    setVerificationStatus(status);
    setRejectionReason('');
    setVerificationModal(true);
  };

  const closeVerificationModal = () => {
    setVerificationModal(false);
    setSelectedTeacher(null);
    setVerificationStatus('');
    setRejectionReason('');
  };

  const submitVerification = async () => {
    if (verificationStatus === 'rejected' && !rejectionReason.trim()) {
      alert('Veuillez fournir une raison de rejet');
      return;
    }

    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`http://localhost:8000/api/admin/admin/teachers/${selectedTeacher.id}/verify`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          status: verificationStatus,
          reason: rejectionReason
        })
      });

      if (response.ok) {
        alert(`Professeur ${verificationStatus === 'approved' ? 'approuvé' : 'rejeté'} avec succès`);
        closeVerificationModal();
        fetchPendingTeachers(); // Rafraîchir la liste
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Erreur lors de la vérification');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la vérification');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Validation des professeurs</h1>
        <p className="text-gray-600">
          {teachers.length} professeur(s) en attente de vérification
        </p>
      </div>

      {/* Liste des professeurs en attente */}
      <div className="grid gap-6">
        {teachers.map((teacher) => (
          <div key={teacher.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="flex-1">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                      {teacher.user?.name?.split(' ').map(n => n[0]).join('') || 'P'}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {teacher.user?.name || 'Nom non disponible'}
                    </h3>
                    <p className="text-sm text-gray-500 truncate">
                      {teacher.user?.email || 'Email non disponible'}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {teacher.specialties?.map((specialty, index) => (
                        <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {specialty}
                        </span>
                      ))}
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      <p><strong>Niveaux enseignés:</strong> {teacher.levels_taught?.join(', ') || 'Non spécifié'}</p>
                      <p><strong>Tarif horaire:</strong> {teacher.hourly_rate ? `${teacher.hourly_rate}€/h` : 'Non spécifié'}</p>
                      <p><strong>Ville:</strong> {teacher.city || 'Non spécifié'}</p>
                    </div>
                    {teacher.professional_bio && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-600 line-clamp-2">{teacher.professional_bio}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mt-4 lg:mt-0 lg:ml-6 flex space-x-2">
                <button
                  onClick={() => openVerificationModal(teacher, 'approved')}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-200"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Approuver
                </button>
                <button
                  onClick={() => openVerificationModal(teacher, 'rejected')}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-200"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Rejeter
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {teachers.length === 0 && (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun professeur en attente</h3>
          <p className="mt-1 text-sm text-gray-500">
            Tous les professeurs ont été vérifiés.
          </p>
        </div>
      )}

      {/* Modal de vérification */}
      {verificationModal && selectedTeacher && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-1/2 lg:w-1/3 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {verificationStatus === 'approved' ? 'Approuver le professeur' : 'Rejeter le professeur'}
              </h3>
              
              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  Vous êtes sur le point de <strong>{verificationStatus === 'approved' ? 'approuver' : 'rejeter'}</strong> le professeur :
                </p>
                <p className="font-semibold mt-2">{selectedTeacher.user?.name}</p>
              </div>

              {verificationStatus === 'rejected' && (
                <div className="mb-4">
                  <label htmlFor="rejectionReason" className="block text-sm font-medium text-gray-700 mb-2">
                    Raison du rejet *
                  </label>
                  <textarea
                    id="rejectionReason"
                    rows="3"
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Expliquez pourquoi ce professeur est rejeté..."
                    required
                  />
                </div>
              )}

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={closeVerificationModal}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition duration-200"
                >
                  Annuler
                </button>
                <button
                  onClick={submitVerification}
                  className={`px-4 py-2 text-white rounded-md transition duration-200 ${
                    verificationStatus === 'approved' 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'bg-red-600 hover:bg-red-700'
                  }`}
                >
                  Confirmer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherVerification;