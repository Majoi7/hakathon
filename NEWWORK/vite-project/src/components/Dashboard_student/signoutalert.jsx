// SignOutAlert.jsx
import React from 'react';
import { X } from 'lucide-react';

export default function SignOutAlert({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative ms-2 me-2">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 md:hover:text-gray-800"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-lg font-bold mb-2">Déconnexion</h2>
        <p className="mb-6 text-gray-700">Êtes-vous sûr de vouloir vous déconnecter ?</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-[10px] md:hover:bg-red-700 font-bold"
          >
            Oui
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white border border-gray text-black rounded-[10px] md:hover:bg-violet-800 md:hover:text-white font-bold"
          >
            Non
          </button>
        </div>
      </div>
    </div>
  );
}
