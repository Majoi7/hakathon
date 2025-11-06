import React from 'react';
import { Home, DollarSign, Users, BookOpen, Star, TrendingUp, Plus, Settings, ChevronRight, Calendar } from 'lucide-react';
import './TableauDeBord.css';

const TableauDeBord = ({ userProfile, announcements, onNavigate }) => {
  const stats = [
    { label: 'Revenus totaux', value: `${userProfile.totalEarnings.toLocaleString()} FCFA`, icon: DollarSign, color: 'from-emerald-500 to-teal-600', trend: '+12%' },
    { label: 'Étudiants actifs', value: userProfile.totalStudents, icon: Users, color: 'from-blue-500 to-indigo-600', trend: '+8%' },
    { label: 'Cours complétés', value: userProfile.completedLessons, icon: BookOpen, color: 'from-purple-500 to-pink-600', trend: '+15%' },
    { label: 'Note moyenne', value: `${userProfile.rating}/5`, icon: Star, color: 'from-amber-500 to-orange-600', trend: '+0.3' }
  ];

  const recentActivities = [
    { id: 1, student: 'Jean K.', action: 'a réservé un cours de Mathématiques', time: 'Il y a 1h', avatar: 'JK' },
    { id: 2, student: 'Sarah M.', action: 'a laissé un avis 5★', time: 'Il y a 3h', avatar: 'SM' },
    { id: 3, student: 'David A.', action: 'a annulé un cours', time: 'Il y a 5h', avatar: 'DA' }
  ];

  return (
    <div className="tableau-de-bord">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-blur hero-blur-1"></div>
        <div className="hero-blur hero-blur-2"></div>
        <div className="hero-content">
          <h2 className="hero-title">
            Bonjour, {userProfile.name.split(' ')[1]} ! 👋
          </h2>
          <p className="hero-subtitle">Voici un aperçu de votre activité aujourd'hui</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="stat-card">
              <div className={`stat-bg-blur ${stat.color}`}></div>
              <div className="stat-content">
                <div className="stat-header">
                  <div className={`stat-icon-wrapper ${stat.color}`}>
                    <Icon className="stat-icon" size={24} />
                  </div>
                  <span className="stat-trend">
                    {stat.trend}
                  </span>
                </div>
                <p className="stat-label">{stat.label}</p>
                <p className="stat-value">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="content-grid">
        {/* Recent Activities */}
        <div className="activities-section">
          <div className="section-header">
            <h3 className="section-title">Activités récentes</h3>
            <button className="view-all-btn">
              Tout voir <ChevronRight size={16} />
            </button>
          </div>
          <div className="activities-list">
            {recentActivities.map(activity => (
              <div key={activity.id} className="activity-item">
                <div className="activity-avatar">
                  {activity.avatar}
                </div>
                <div className="activity-details">
                  <p className="activity-text">
                    <span className="activity-student">{activity.student}</span> {activity.action}
                  </p>
                  <p className="activity-time">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions-section">
          <h3 className="section-title">Actions rapides</h3>
          <div className="quick-actions-list">
            <button 
              onClick={() => {
                onNavigate('annonces');
              }}
              className="quick-action-btn"
            >
              <Plus size={20} />
              <span>Créer une annonce</span>
            </button>
            <button 
              onClick={() => onNavigate('retraits')}
              className="quick-action-btn"
            >
              <DollarSign size={20} />
              <span>Demander un retrait</span>
            </button>
            <button 
              onClick={() => onNavigate('profil')}
              className="quick-action-btn"
            >
              <Settings size={20} />
              <span>Gérer mon profil</span>
            </button>
          </div>
        </div>
      </div>

      {/* Announcements Preview */}
      <div className="announcements-preview">
        <div className="section-header">
          <h3 className="section-title">Mes annonces actives</h3>
          <button 
            onClick={() => onNavigate('annonces')}
            className="view-all-btn"
          >
            Voir toutes <ChevronRight size={16} />
          </button>
        </div>
        <div className="announcements-grid">
          {announcements.slice(0, 2).map(ann => (
            <div key={ann.id} className="announcement-card">
              <div className="announcement-header">
                <h4 className="announcement-title">{ann.title}</h4>
                <span className="announcement-status">Active</span>
              </div>
              <p className="announcement-price">{ann.price.toLocaleString()} FCFA/h</p>
              <div className="announcement-stats">
                <span className="announcement-stat">
                  <Users size={16} /> {ann.students} étudiants
                </span>
                <span className="announcement-stat">
                  <TrendingUp size={16} /> {ann.views} vues
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableauDeBord;