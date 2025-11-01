// src/pages/EmailVerified.jsx
import React from 'react';

const EmailVerified = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Email vérifié avec succès!</h1>
        <p className="text-gray-600">Votre adresse email a été confirmée. Vous pouvez maintenant accéder à votre compte.</p>
      </div>
    </div>
  );
};

export default EmailVerified; // ⚠️ Export par défaut