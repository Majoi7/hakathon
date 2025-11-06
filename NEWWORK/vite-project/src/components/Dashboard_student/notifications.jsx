// Notifications.jsx
import React from 'react';
import InboxEmpty from '../../assets/images/InboxEmpty.svg'; // adjust path if needed

export default function Notifications() {
  return (
    <div className="flex flex-col items-center justify-center mt-10">
      {/* SVG Illustration */}
    <img 
  src={InboxEmpty} 
  alt="Aucune notification" 
  className="w-96 h-96 sm:w-96 sm:h-96 md:w-[20rem] md:h-[20rem] lg:w-[20rem] lg:h-[20rem]"
/>

      
      {/* Text */}
      <p className="mt-4 text-gray-600 text-lg font-medium text-center">
        Aucune notification recue pour le moment sur votre compte
      </p>
    </div>
  );
}
