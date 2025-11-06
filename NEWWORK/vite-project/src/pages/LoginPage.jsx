import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom'; // 
import './LoginPage.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted:', { email, password });

    //  Simulation de vérification des identifiants
    if (email === 'admin@example.com' && password === '1234') {
      localStorage.setItem('isAuthenticated', 'true'); 
      navigate('/app'); // redirection simulée
    } else {
      alert('Identifiants incorrects');
    }
  };

  return (
    <div className="app-container" style={{ background: 'linear-gradient(135deg, #f8edeb 0%, #f9dcc4 50%, #fec89a 100%)' }}>
      <div className="login-container" style={{
        background: 'white',
        borderRadius: '24px',
        padding: '48px',
        maxWidth: '450px',
        width: '100%',
        boxShadow: '0 20px 60px rgba(129, 88, 57, 0.15)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <h1>Bon retour !</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <Mail className="input-icon" size={20} />
            <input
              type="email"
              className="input-field"
              placeholder="Adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <Lock className="input-icon" size={20} />
            <input
              type={showPassword ? 'text' : 'password'}
              className="input-field"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>

          <div style={{ textAlign: 'right', marginBottom: '24px' }}>
            <Link to="/ForgotPasswordPage" className="link-text" style={{ fontSize: '14px' }}>
              Mot de passe oublié ?
            </Link>
          </div>

          <button type="submit" className="submit-btn">
            Se connecter <ArrowRight size={20} />
          </button>
        </form>

        <p style={{ marginTop: '16px', textAlign: 'center' }}>
          Pas encore de compte ? <Link to="/signup" className="link-text">S'inscrire</Link>
        </p>
      </div>
    </div>
  );
}

