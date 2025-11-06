import React from 'react';
import './Parametres.css';

const Parametres = () => {
  const notificationSettings = [
    { label: 'Nouvelles réservations', checked: true },
    { label: 'Messages des étudiants', checked: true },
    { label: 'Avis et commentaires', checked: true },
    { label: 'Rappels de cours', checked: false },
    { label: 'Newsletter Monprof.bj', checked: true }
  ];

  const securityOptions = [
    { 
      title: 'Changer le mot de passe', 
      description: 'Dernière modification il y a 3 mois' 
    },
    { 
      title: 'Authentification à deux facteurs', 
      description: 'Ajouter une couche de sécurité supplémentaire' 
    }
  ];

  return (
    <div className="parametres">
      <h2 className="parametres-title">Paramètres</h2>

      {/* Notifications Section */}
      <div className="settings-card">
        <h3 className="settings-card-title">Notifications</h3>
        <div className="settings-list">
          {notificationSettings.map((item, idx) => (
            <div key={idx} className="setting-item">
              <span className="setting-label">{item.label}</span>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  defaultChecked={item.checked} 
                  className="toggle-input" 
                />
                <div className="toggle-slider"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Security Section */}
      <div className="settings-card">
        <h3 className="settings-card-title">Sécurité</h3>
        <div className="settings-list">
          {securityOptions.map((option, idx) => (
            <button key={idx} className="security-option">
              <div>
                <p className="security-title">{option.title}</p>
                <p className="security-description">{option.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Parametres;