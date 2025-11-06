
// SidebarApp.jsx
import React, { useState } from 'react';
import { Bell, Search } from 'lucide-react';

// Import des composants (tous dans pages/)
import Sidebar from './pages/Sidebar';
import TableauDeBord from './pages/TableaudeBord';
import MesAnnonces from './pages/MesAnnonces';
import Finances from './pages/Finances';
import Profil from './pages/Profil';
import Parametres from './pages/Parametres';



import './App.css';

const SidebarApp = () => {
  const [activePage, setActivePage] = useState('accueil');
  const [showNotifications, setShowNotifications] = useState(false);

  // Données simulées
  const [userProfile] = useState({
    name: 'Dr. Marie ADJOVI',
    email: 'marie.adjovi@example.com',
    phone: '+229 96 00 00 00',
    subjects: 'Mathématiques, Physique',
    level: 'Enseignant certifié',
    rating: 4.8,
    totalStudents: 47,
    totalEarnings: 1275000,
    completedLessons: 156
  });

  const [announcements, setAnnouncements] = useState([
    { id: 1, title: 'Mathématiques Avancées', subject: 'Mathématiques', price: 5000, status: 'active', date: '2025-11-01', students: 12, views: 145 },
    { id: 2, title: 'Physique-Chimie Terminale', subject: 'Physique', price: 4500, status: 'active', date: '2025-10-28', students: 8, views: 89 },
    { id: 3, title: 'Algèbre et Géométrie', subject: 'Mathématiques', price: 4800, status: 'active', date: '2025-10-20', students: 15, views: 203 }
  ]);

  const [withdrawals] = useState([
    { id: 1, amount: 45000, method: 'MTN Mobile Money', date: '2025-10-30', status: 'completed' },
    { id: 2, amount: 30000, method: 'Moov Money', date: '2025-10-15', status: 'completed' },
    { id: 3, amount: 25000, method: 'Virement bancaire', date: '2025-09-28', status: 'pending' }
  ]);

  const [notifications] = useState([
    { id: 1, message: 'Nouveau message de Jean Kouassi', time: 'Il y a 2h', read: false, type: 'message' },
    { id: 2, message: 'Votre retrait de 45000 FCFA a été traité', time: 'Il y a 5h', read: false, type: 'payment' },
    { id: 3, message: 'Nouvelle demande de cours en ligne', time: 'Hier', read: true, type: 'request' }
  ]);

  // Obtenir le titre de la page active
  const getPageTitle = () => {
    const titles = {
      'accueil': 'Tableau de bord',
      'annonces': 'Mes Annonces',
      'retraits': 'Finances',
      'profil': 'Mon Profil',
      'parametres': 'Paramètres'
    };
    return titles[activePage] || 'Tableau de bord';
  };

  // Rendu du contenu selon la page active
  const renderContent = () => {
    switch (activePage) {
      case 'accueil':
        return <TableauDeBord userProfile={userProfile} announcements={announcements} onNavigate={setActivePage} />;
      case 'annonces':
        return <MesAnnonces announcements={announcements} setAnnouncements={setAnnouncements} />;
      case 'retraits':
        return <Finances withdrawals={withdrawals} />;
      case 'profil':
        return <Profil userProfile={userProfile} />;
      case 'parametres':
        return <Parametres />;
      default:
        return <TableauDeBord userProfile={userProfile} announcements={announcements} onNavigate={setActivePage} />;
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <Sidebar activePage={activePage} onNavigate={setActivePage} balance={127500} />

      {/* Main Content */}
      <div className="main-content">
        {/* Top Bar */}
        <div className="top-bar">
          <div className="top-bar-left">
            <h2 className="page-title">{getPageTitle()}</h2>
          </div>

          <div className="top-bar-right">
            {/* Barre de recherche */}
            <div className="search-wrapper">
              <input type="text" placeholder="Rechercher..." className="search-input" />
              <Search className="search-icon" size={18} />
            </div>

            {/* Notifications */}
            <div className="notifications-wrapper">
              <button onClick={() => setShowNotifications(!showNotifications)} className="notification-btn">
                <Bell size={24} />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="notification-badge">{notifications.filter(n => !n.read).length}</span>
                )}
              </button>

              {showNotifications && (
                <div className="notifications-dropdown">
                  <div className="notifications-header">
                    <h3 className="notifications-title">Notifications</h3>
                    <button className="mark-read-btn">Tout marquer comme lu</button>
                  </div>
                  <div className="notifications-list">
                    {notifications.map(notif => (
                      <div key={notif.id} className={`notification-item ${!notif.read ? 'notification-unread' : ''}`}>
                        <div className="notification-content">
                          <div className={`notification-dot ${!notif.read ? 'dot-active' : ''}`}></div>
                          <div className="notification-text">
                            <p className="notification-message">{notif.message}</p>
                            <p className="notification-time">{notif.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="notifications-footer">
                    <button className="view-all-notifications">Voir toutes les notifications</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Contenu de la page */}
        <div className="page-content">{renderContent()}</div>
      </div>
    </div>
  );
};

export default SidebarApp;
