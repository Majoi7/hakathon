import React from 'react';
import { Check, Clock } from 'lucide-react';
import './Finances.css';

const Finances = ({ withdrawals }) => {
  const paymentMethods = [
    { name: 'MTN Mobile Money', delay: 'Instantané', icon: '📱' },
    { name: 'Moov Money', delay: 'Instantané', icon: '💰' },
    { name: 'Virement bancaire', delay: '2-3 jours', icon: '🏦' }
  ];

  return (
    <div className="finances">
      <h2 className="finances-title">Finances & Retraits</h2>

      {/* Balance Cards */}
      <div className="balance-grid">
        <div className="balance-card balance-available">
          <div className="balance-blur"></div>
          <div className="balance-content">
            <p className="balance-label">Solde disponible</p>
            <p className="balance-amount">127,500 FCFA</p>
            <button className="withdraw-btn">
              Demander un retrait
            </button>
          </div>
        </div>

        <div className="balance-card balance-earnings">
          <div className="balance-blur"></div>
          <div className="balance-content">
            <p className="balance-label">Gains ce mois</p>
            <p className="balance-amount">45,000 FCFA</p>
            <p className="balance-comparison">+23% vs mois dernier</p>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="payment-methods-section">
        <h3 className="section-title">Moyens de virement</h3>
        <div className="payment-methods-grid">
          {paymentMethods.map((method, idx) => (
            <div key={idx} className="payment-method-card">
              <div className="payment-icon">{method.icon}</div>
              <p className="payment-name">{method.name}</p>
              <p className="payment-delay">{method.delay}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Transactions History */}
      <div className="transactions-section">
        <div className="transactions-header">
          <h3 className="section-title">Historique des transactions</h3>
        </div>
        <div className="transactions-list">
          {withdrawals.map(w => (
            <div key={w.id} className="transaction-item">
              <div className="transaction-info">
                <div className={`transaction-icon ${
                  w.status === 'completed' ? 'status-completed' : 'status-pending'
                }`}>
                  {w.status === 'completed' ? 
                    <Check size={24} /> : 
                    <Clock size={24} />
                  }
                </div>
                <div className="transaction-details">
                  <p className="transaction-amount">{w.amount.toLocaleString()} FCFA</p>
                  <p className="transaction-method">{w.method}</p>
                </div>
              </div>
              <div className="transaction-meta">
                <p className="transaction-date">{w.date}</p>
                <span className={`transaction-status ${
                  w.status === 'completed' ? 'status-completed-text' : 'status-pending-text'
                }`}>
                  {w.status === 'completed' ? 'Complété' : 'En cours'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Finances;