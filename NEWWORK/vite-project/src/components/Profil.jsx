import React from 'react';
import { Check, Star, Award } from 'lucide-react';
import './Profil.css';

const Profil = ({ userProfile }) => {
  const weekDays = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
  
  const documents = [
    { name: 'Diplôme vérifié', verified: true },
    { name: 'Pièce d\'identité', verified: true },
    { name: 'Casier judiciaire', verified: true }
  ];

  return (
    <div className="profil">
      <h2 className="profil-title">Mon Profil</h2>

      {/* Profile Card */}
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar-wrapper">
            <div className="profile-avatar">
              {userProfile.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="profile-verified-badge">
              <Check size={20} />
            </div>
          </div>
          <div className="profile-info">
            <h3 className="profile-name">{userProfile.name}</h3>
            <p className="profile-level">{userProfile.level}</p>
            <div className="profile-badges">
              <div className="badge badge-rating">
                <Star className="badge-icon-filled" size={18} />
                <span className="badge-value">{userProfile.rating}</span>
                <span className="badge-count">({userProfile.totalStudents} avis)</span>
              </div>
              <div className="badge badge-lessons">
                <Award className="badge-icon" size={18} />
                <span className="badge-text">{userProfile.completedLessons} cours donnés</span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div className="profile-form">
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                value={userProfile.email}
                className="form-input"
                readOnly
              />
            </div>
            <div className="form-group">
              <label className="form-label">Téléphone</label>
              <input
                type="tel"
                value={userProfile.phone}
                className="form-input"
                readOnly
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Matières enseignées</label>
              <input
                type="text"
                value={userProfile.subjects}
                className="form-input"
                readOnly
              />
            </div>
            <div className="form-group">
              <label className="form-label">Statut</label>
              <input
                type="text"
                value={userProfile.level}
                className="form-input"
                readOnly
              />
            </div>
          </div>
        </div>

        <button className="edit-profile-btn">
          Modifier mon profil
        </button>
      </div>

      {/* Additional Info */}
      <div className="info-grid">
        {/* Availability */}
        <div className="info-card">
          <h3 className="info-card-title">Disponibilités</h3>
          <div className="availability-list">
            {weekDays.map(day => (
              <div key={day} className="availability-item">
                <span className="availability-day">{day}</span>
                <span className="availability-time">14h00 - 18h00</span>
              </div>
            ))}
          </div>
        </div>

        {/* Documents */}
        <div className="info-card">
          <h3 className="info-card-title">Documents & Certifications</h3>
          <div className="documents-list">
            {documents.map((doc, idx) => (
              <div key={idx} className="document-item">
                <Check className="document-check" size={20} />
                <span className="document-name">{doc.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profil;