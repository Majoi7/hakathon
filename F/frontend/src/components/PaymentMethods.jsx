// src/components/PaymentMethods.jsx
import React from 'react';
import PaymentIcons from './PaymentIcons';

export const getPaymentMethodsData = () => {
  return [
    { 
      id: 'momo', 
      name: 'MTN Mobile Money', 
      icon: <PaymentIcons method="mtn" size={32} />,
      description: 'Paiement via votre compte MTN Mobile Money',
      regex: /^229[0-9]{8}$/,
      placeholder: '229 XX XX XX XX'
    },
    { 
      id: 'moov', 
      name: 'Moov Money', 
      icon: <PaymentIcons method="moov" size={32} />,
      description: 'Paiement via votre compte Moov Money',
      regex: /^229[0-9]{8}$/,
      placeholder: '229 XX XX XX XX'
    },
    { 
      id: 'celtis', 
      name: 'Celtis', 
      icon: <PaymentIcons method="Celtis" size={32} />,
      description: 'Paiement avec votre carte Celtis',
      regex: /^[0-9]{16}$/,
      placeholder: '1234 5678 9012 3456'
    },
    { 
      id: 'visa', 
      name: 'Visa', 
      icon: <PaymentIcons method="visa" size={32} />,
      description: 'Paiement sécurisé par carte Visa',
      regex: /^4[0-9]{12}(?:[0-9]{3})?$/,
      placeholder: '1234 5678 9012 3456'
    },
   
  ];
};

export const getPaymentMethodById = (id) => {
  return getPaymentMethodsData().find(method => method.id === id);
};

export default getPaymentMethodsData;