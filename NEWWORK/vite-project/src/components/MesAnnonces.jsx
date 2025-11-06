import React, { useState } from 'react';
import { Plus, X, Users, TrendingUp, Calendar, Settings } from 'lucide-react';
import './MesAnnonces.css';

const MesAnnonces = ({ announcements, setAnnouncements }) => {
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);

  return (
    <div className="mes-annonces">
      <div className="annonces-header">
        <div>
          <h2 className="annonces-title">Gestion des Annonces</h2>
          <p className="annonces-subtitle">Créez et gérez vos offres de cours</p>
        </div>
        <button
          onClick={() => setShowAnnouncementModal(true)}
          className="new-announcement-btn"
        >
          <Plus size={20} />
          Nouvelle annonce
        </button>
      </div>

      {showAnnouncementModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Créer une nouvelle annonce</h3>
              <button 
                onClick={() => setShowAnnouncementModal(false)} 
                className="modal-close-btn"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="modal-form">
              <div className="form-group">
                <label className="form-label">Titre de l'annonce</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Ex: Cours de Mathématiques - Terminale"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Matière</label>
                  <select className="form-input">
                    <option>Mathématiques</option>
                    <option>Physique-Chimie</option>
                    <option>Français</option>
                    <option>Anglais</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Niveau</label>
                  <select className="form-input">
                    <option>Primaire</option>
                    <option>Collège</option>
                    <option>Lycée</option>
                    <option>Supérieur</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Tarif horaire (FCFA)</label>
                <input
                  type="number"
                  className="form-input"
                  placeholder="5000"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Mode de cours</label>
                <div className="radio-group">
                  {['Présentiel', 'En ligne', 'Hybride'].map(mode => (
                    <label key={mode} className="radio-option">
                      <input type="radio" name="mode" className="radio-input" />
                      <span className="radio-label">{mode}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  rows="4"
                  className="form-textarea"
                  placeholder="Décrivez votre offre de cours..."
                />
              </div>

              <div className="modal-actions">
                <button
                  onClick={() => setShowAnnouncementModal(false)}
                  className="btn-cancel"
                >
                  Annuler
                </button>
                <button
                  onClick={() => setShowAnnouncementModal(false)}
                  className="btn-submit"
                >
                  Publier
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="annonces-grid">
        {announcements.map(ann => (
          <div key={ann.id} className="annonce-card">
            <div className="annonce-card-header">
              <span className="annonce-status">Active</span>
              <button className="annonce-settings-btn">
                <Settings size={18} />
              </button>
            </div>
            <h3 className="annonce-card-title">{ann.title}</h3>
            <p className="annonce-card-price">{ann.price.toLocaleString()} FCFA/h</p>
            <div className="annonce-card-stats">
              <div className="annonce-stat">
                <Users size={16} className="stat-icon" />
                <span>{ann.students} étudiants actifs</span>
              </div>
              <div className="annonce-stat">
                <TrendingUp size={16} className="stat-icon" />
                <span>{ann.views} vues cette semaine</span>
              </div>
              <div className="annonce-stat">
                <Calendar size={16} className="stat-icon" />
                <span>Publié le {ann.date}</span>
              </div>
            </div>
            <div className="annonce-card-actions">
              <button className="btn-edit">Modifier</button>
              <button className="btn-stats">Stats</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MesAnnonces;