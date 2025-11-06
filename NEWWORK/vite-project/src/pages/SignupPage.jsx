import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import './SignupPage.css';

export default function SignupPage() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signup submitted:', formData);
  };

  const updateField = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  return (
    <div className="signup-page" style={{ background: 'linear-gradient(135deg, #fec89a 0%, #fefae0 50%, #f8edeb 100%)' }}>
      <div className="signup-container" style={{ 
        background: 'white',
        borderRadius: '24px',
        padding: '48px',
        maxWidth: '500px',
        width: '100%',
        boxShadow: '0 20px 60px rgba(129, 88, 57, 0.15)',
        position: 'relative',
        overflow: 'hidden', 
      }}>
        <h1>Créer un compte</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <User className="input-icon" size={20} />
            <input type="text" className="input-field" placeholder="Nom complet" value={formData.name} onChange={(e) => updateField('name', e.target.value)} />
          </div>
          <div className="input-group">
            <Mail className="input-icon" size={20} />
            <input type="email" className="input-field" placeholder="Adresse email" value={formData.email} onChange={(e) => updateField('email', e.target.value)} />
          </div>
          <div className="input-group">
            <Lock className="input-icon" size={20} />
            <input type={showPassword ? "text" : "password"} className="input-field" placeholder="Mot de passe" value={formData.password} onChange={(e) => updateField('password', e.target.value)} />
            <div className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>
          <div className="input-group">
            <Lock className="input-icon" size={20} />
            <input type={showConfirmPassword ? "text" : "password"} className="input-field" placeholder="Confirmer le mot de passe" value={formData.confirmPassword} onChange={(e) => updateField('confirmPassword', e.target.value)} />
            <div className="password-toggle" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>
          <button type="submit" className="submit-btn">
            S'inscrire <ArrowRight size={20} />
          </button>
        </form>
        <p style={{ marginTop: '16px', textAlign: 'center' }}>
          Vous avez déjà un compte ? <Link to="/login" className="link-text">Se connecter</Link>
        </p>
      </div>
    </div>
  );
}