// src/pages/ConfirmationEmail.jsx
import React from 'react';

const ConfirmationEmail = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Email de confirmation envoyé</h1>
        <p className="text-gray-600">Veuillez vérifier votre boîte email pour confirmer votre compte.</p>
      </div>
    </div>
  );
};

export default ConfirmationEmail; // ⚠️ Export par défaut