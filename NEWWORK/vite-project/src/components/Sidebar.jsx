import React from 'react';
import { Home, BookOpen, DollarSign, User, Settings, LogOut } from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ activePage, onNavigate, balance }) => {
  const navItems = [
    { id: 'accueil', label: 'Tableau de bord', icon: Home },
    { id: 'annonces', label: 'Mes Annonces', icon: BookOpen },
    { id: 'retraits', label: 'Finances', icon: DollarSign },
    { id: 'profil', label: 'Mon Profil', icon: User },
    { id: 'parametres', label: 'Paramètres', icon: Settings },
  ];

  return (
    <div className="sidebar">
      {/* Logo */}
      <div className="sidebar-header">
        <h1 className="sidebar-logo">Monprof.bj</h1>
        <p className="sidebar-subtitle">Espace Enseignant</p>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {navItems.map(item => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`nav-item ${activePage === item.id ? 'nav-item-active' : ''}`}
            >
              <Icon size={22} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <div className="balance-card">
          <p className="balance-label">Solde disponible</p>
          <p className="balance-amount">{balance.toLocaleString()} FCFA</p>
        </div>
        <button className="logout-btn">
          <LogOut size={20} />
          Déconnexion
        </button>
      </div>
    </div>
  );
};

export default Sidebar;