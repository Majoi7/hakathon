import React, { useState, useEffect } from 'react';
import { Mail, ArrowLeft, Lock, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import './ForgotPasswordPage.css';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [ripples, setRipples] = useState([]);

    useEffect(() => {
        const newRipples = Array.from({ length: 15 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            delay: Math.random() * 5,
            duration: Math.random() * 4 + 3,
        }));
        setRipples(newRipples);
    }, []);

    useEffect(() => {
        let timer;
        if (isSubmitted) {
            timer = setTimeout(() => setIsSubmitted(false), 3000);
        }
        return () => clearTimeout(timer);
    }, [isSubmitted]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
    };

    return (
        <div
            className="forgot-page"
            style={{
                background: 'linear-gradient(135deg, #f8edeb 0%, #fefae0 50%, #f9dcc4 100%)',
            }}
        >
            {ripples.map((ripple) => (
                <div
                    key={ripple.id}
                    className="ripple-effect"
                    style={{
                        left: `${ripple.x}%`,
                        top: `${ripple.y}%`,
                        animationDuration: `${ripple.duration}s`,
                        animationDelay: `${ripple.delay}s`,
                    }}
                />
            ))}

            <div className="forgot-container">
                <div className="wave-blob wave-1"></div>
                <div className="wave-blob wave-2"></div>
                <div className="wave-blob wave-3"></div>

                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div className="lock-icon-container">
                        <Lock size={45} style={{ color: '#815839' }} />
                    </div>

                    <div className="forgot-title">
                        <h1>Mot de passe oublié ?</h1>
                        <div className="animated-underline"></div>
                    </div>

                    <p className="forgot-subtext">
                        Pas de souci ! Entrez votre email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
                    </p>

                    {!isSubmitted ? (
                        <form onSubmit={handleSubmit}>
                            <div className="input-group">
                                <div className="input-wrapper">
                                    <Mail className="input-icon" size={22} />
                                    <input
                                        type="email"
                                        className="input-field"
                                        placeholder="Votre adresse email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        aria-label="Adresse email"
                                    />
                                </div>
                            </div>

                            <button type="submit" className={`submit-btn ${isSubmitted ? 'submitted' : ''}`}>
                                <span>Envoyer le lien</span>
                                <Send className="send-icon" size={22} />
                            </button>
                        </form>
                    ) : (
                        <div className="success-message">
                            <div className="success-icon">✉</div>
                            <p className="success-text">Email envoyé avec succès !</p>
                            <p className="success-subtext">Vérifiez votre boîte de réception</p>
                        </div>
                    )}

                    <Link to="/login" className="back-link">
                        <span className="link-text">
                            <ArrowLeft className="arrow-left" size={18} />
                            Retour à la connexion
                        </span>
                    </Link>
                </div>
            </div>
        </div >
    );
}