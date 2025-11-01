import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const TeacherBalance = () => {
  const { user } = useAuth();
  const [withdrawalAmount, setWithdrawalAmount] = useState('');

  // Données mock pour le solde et l'historique
  const balanceData = {
    currentBalance: 1250.50,
    pendingBalance: 320.00,
    totalEarnings: 4570.75
  };

  const transactions = [
    { id: 1, date: '2024-01-15', description: 'Cours de Mathématiques', amount: 45.00, type: 'credit' },
    { id: 2, date: '2024-01-14', description: 'Cours de Physique', amount: 60.00, type: 'credit' },
    { id: 3, date: '2024-01-10', description: 'Retrait bancaire', amount: 500.00, type: 'debit' },
    { id: 4, date: '2024-01-08', description: 'Cours de Chimie', amount: 35.00, type: 'credit' }
  ];

  const handleWithdrawal = (e) => {
    e.preventDefault();
    if (withdrawalAmount > 0 && withdrawalAmount <= balanceData.currentBalance) {
      alert(`Demande de retrait de ${withdrawalAmount}€ envoyée!`);
      setWithdrawalAmount('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-2xl font-bold text-blue-600">MonProf</Link>
              <nav className="hidden md:flex space-x-6">
                <Link to="/teacher-dashboard" className="text-gray-700 hover:text-blue-600">Tableau de bord</Link>
                <Link to="/teacher-balance" className="text-blue-600 font-medium">Solde</Link>
                <Link to="/teacher-announcements" className="text-gray-700 hover:text-blue-600">Annonces</Link>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link 
                to="/student-dashboard" 
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
              >
                Compte Étudiant
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Gestion des revenus</h1>
          <p className="text-gray-600">Consultez votre solde et effectuez des retraits</p>
        </div>

        {/* Cartes de solde */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Solde disponible</p>
                <p className="text-3xl font-bold text-green-600">{balanceData.currentBalance}€</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-xl">€</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">En attente</p>
                <p className="text-3xl font-bold text-yellow-600">{balanceData.pendingBalance}€</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-yellow-600 text-xl">⏱️</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Gains totaux</p>
                <p className="text-3xl font-bold text-blue-600">{balanceData.totalEarnings}€</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-xl">📈</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulaire de retrait */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Effectuer un retrait</h2>
            <form onSubmit={handleWithdrawal}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Montant du retrait (€)
                </label>
                <input
                  type="number"
                  min="10"
                  max={balanceData.currentBalance}
                  value={withdrawalAmount}
                  onChange={(e) => setWithdrawalAmount(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Montant minimum: 10€"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Solde disponible: {balanceData.currentBalance}€
                </p>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Méthode de retrait
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option>Virement bancaire</option>
                  <option>PayPal</option>
                  <option>Mobile Money</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={!withdrawalAmount || withdrawalAmount < 10}
                className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white py-3 px-4 rounded-lg font-medium transition duration-200"
              >
                Demander le retrait
              </button>
            </form>

            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                💡 Les retraits sont traités sous 24-48 heures. Frais de transfert: 1.5%
              </p>
            </div>
          </div>

          {/* Historique des transactions */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Historique des transactions</h2>
            <div className="space-y-3">
              {transactions.map(transaction => (
                <div key={transaction.id} className="flex justify-between items-center p-3 border-b">
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-gray-500">{transaction.date}</p>
                  </div>
                  <div className={`text-lg font-semibold ${
                    transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'credit' ? '+' : '-'}{transaction.amount}€
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeacherBalance;