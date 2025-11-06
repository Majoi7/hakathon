import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Lock, ArrowRight, Check, Shield, Zap, Key } from 'lucide-react';
import { Link } from 'react-router-dom';
import './ResetPasswordPage.css';

export default function ResetPasswordPage() {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [energyOrbs, setEnergyOrbs] = useState([]);

  useEffect(() => {
    const newOrbs = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 3,
      delay: Math.random() * 4,
      duration: Math.random() * 6 + 4
    }));
    setEnergyOrbs(newOrbs);
  }, []);

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    setIsSuccess(true);
  };

  const passwordStrength = (password) => {
    if (password.length === 0) return 0;
    if (password.length < 6) return 33;
    if (password.length < 10) return 66;
    return 100;
  };

  const strength = passwordStrength(formData.password);
  const passwordsMatch = formData.password && formData.confirmPassword && formData.password === formData.confirmPassword;

  const requirements = [
    { text: 'Au moins 8 caractères', met: formData.password.length >= 8 },
    { text: 'Une majuscule', met: /[A-Z]/.test(formData.password) },
    { text: 'Un chiffre', met: /[0-9]/.test(formData.password) },
    { text: 'Un caractère spécial', met: /[!@#$%^&*]/.test(formData.password) }
  ];

  return (
    <div className="reset-page-container">
      {energyOrbs.map(orb => (
        <div
          key={orb.id}
          className="energy-orb"
          style={{
            left: `${orb.x}%`,
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            animationDuration: `${orb.duration}s`,
            animationDelay: `${orb.delay}s`
          }}
        />
      ))}

      <div className="reset-container">
        <div className="plasma-blob plasma-1"></div>
        <div className="plasma-blob plasma-2"></div>
        <div className="plasma-blob plasma-3"></div>
        
        <div className="reset-content">
          {!isSuccess ? (
            <>
              <div className="shield-icon-container">
                <Shield size={50} style={{ color: 'white' }} />
              </div>

              <div className="header-section">
                <div className="title-wrapper">
                  <div className="title-epic">
                    <h1>Nouveau mot de passe</h1>
                    <div className="epic-underline"></div>
                  </div>
                  <Zap className="zap-icon" size={32} style={{ color: '#fec89a' }} />
                </div>
              </div>

              <p className="subtitle">
                Créez un mot de passe fort et sécurisé pour protéger votre compte
              </p>
              
              <div>
                <div className="input-group">
                  <div className="input-wrapper">
                    <Lock className="input-icon" size={22} />
                    <input
                      type={showPassword ? "text" : "password"}
                      className="input-field"
                      placeholder="Nouveau mot de passe"
                      value={formData.password}
                      onChange={(e) => updateField('password', e.target.value)}
                    />
                    <div 
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                    </div>
                  </div>
                  {formData.password && (
                    <div>
                      <div className="strength-bar">
                        <div 
                          className="strength-fill"
                          style={{
                            width: `${strength}%`,
                            background: strength < 50 
                              ? 'linear-gradient(90deg, #ef4444, #f87171)' 
                              : strength < 80 
                              ? 'linear-gradient(90deg, #f59e0b, #fbbf24)' 
                              : 'linear-gradient(90deg, #22c55e, #4ade80)'
                          }}
                        />
                      </div>
                      <div className="strength-text" style={{ 
                        color: strength < 50 ? '#ef4444' : strength < 80 ? '#f59e0b' : '#22c55e'
                      }}>
                        {strength < 50 ? '🔓 Faible' : strength < 80 ? '🔐 Moyen' : '🔒 Fort'}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="input-group">
                  <div className="input-wrapper">
                    <Key className="input-icon" size={22} />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      className="input-field"
                      placeholder="Confirmer le mot de passe"
                      value={formData.confirmPassword}
                      onChange={(e) => updateField('confirmPassword', e.target.value)}
                    />
                    <div 
                      className="password-toggle"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                    </div>
                    {passwordsMatch && (
                      <Check className="check-icon" size={24} />
                    )}
                  </div>
                </div>

                {formData.password && (
                  <div className="requirements-list">
                    <div className="requirements-title">
                      Exigences du mot de passe:
                    </div>
                    {requirements.map((req, index) => (
                      <div key={index} className={`requirement-item ${req.met ? 'met' : ''}`}>
                        <div className={`requirement-check ${req.met ? 'met' : 'unmet'}`}>
                          {req.met && <Check size={14} style={{ color: 'white' }} />}
                        </div>
                        <span style={{ fontWeight: req.met ? '600' : '400' }}>
                          {req.text}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                
                <button 
                  type="button" 
                  className={`submit-btn ${isSuccess ? 'success' : ''}`}
                  onClick={handleSubmit}
                >
                  <span className="btn-text">Réinitialiser</span>
                  <ArrowRight className="arrow-icon" size={24} />
                </button>
              </div>
            </>
          ) : (
            <div className="success-modal">
              <div className="success-icon-wrapper">
                <Check size={60} style={{ color: 'white' }} />
              </div>
              <h2 className="success-title">
                Mot de passe mis à jour !
              </h2>
              <p className="success-text">
                Votre mot de passe a été réinitialisé avec succès. Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.
              </p>
              <button 
                type="button" 
                className="submit-btn"
              >
                <span className="btn-text">Se connecter maintenant</span>
                <ArrowRight className="arrow-icon" size={24} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}