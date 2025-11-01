// src/components/PaymentIcons.jsx - VERSION AMÉLIORÉE
import React from 'react';

// Import des images
import momoIcon from '../assets/images/payments/mtn.jpg';
import moovIcon from '../assets/images/payments/moov.png';
import celtisIcon from '../assets/images/payments/Celtis.jpeg';
import visaIcon from '../assets/images/payments/visa.png';

const PaymentIcons = ({ method, size = 32, className = "" }) => {
  // Style optimisé pour éviter le flou
  const imgStyle = {
    width: size,
    height: size,
    objectFit: 'contain', // Garde les proportions sans déformation
    imageRendering: '-webkit-optimize-contrast', // Améliore la netteté
    imageRendering: 'crisp-edges', // Rend les bords nets
  };

  const icons = {
    momo: <img src={momoIcon} alt="MTN Mobile Money" className={className} style={imgStyle} />,
    moov: <img src={moovIcon} alt="Moov Money" className={className} style={imgStyle} />,
    celtis: <img src={celtisIcon} alt="Celtis" className={className} style={imgStyle} />,
    visa: <img src={visaIcon} alt="Visa" className={className} style={imgStyle} />,
  };

  return icons[method] || null;
};

export default PaymentIcons;