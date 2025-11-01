// src/pages/Courses.jsx - CORRIGÉ
import React from 'react';

const Courses = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Cours</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-gray-600">Liste des cours disponibles...</p>
        {/* Ajoutez votre contenu ici */}
      </div>
    </div>
  );
};

export default Courses; // ⚠️ Très important : "export default"