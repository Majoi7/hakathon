// Activites.jsx
import React, { useState } from 'react';
import { Info, Users, DollarSign,BookMarked  } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

// Sample data for the chart
const bookingData = [
  { month: 'Jan', sessions: 4 },
  { month: 'Feb', sessions: 6 },
  { month: 'Mar', sessions: 3 },
  { month: 'Apr', sessions: 7 },
  { month: 'May', sessions: 5 },
  { month: 'Jun', sessions: 8 },
];

export default function Activites({ userName = 'User' }) {
  // Random values for example
  const randomBookings = Math.floor(Math.random() * 10) + 1;
  const randomSessions = Math.floor(Math.random() * 10) + 1;
  const randomTotal = [30000, 50000, 70000][Math.floor(Math.random() * 3)];

  const [tooltipVisible, setTooltipVisible] = useState({ bookings: false, sessions: false, total: false });

  const boxes = [
    {
      key: 'bookings',
      title: 'Nombre de bookings',
      value: randomBookings,
      icon: <Users />,
      description: "Nombre de cours ou professeurs engagés sur la plateforme.",
      color: 'rgba(60, 9, 108, 0.3)', // persian-indigo transparent
    },
    {
      key: 'sessions',
      title: 'Sessions à venir',
      value: randomSessions,
      icon: <BookMarked/>,
      description: "Nombre de sessions réservées mais pas encore effectuées.",
      color: 'rgba(90, 24, 154, 0.3)', // tekhelet transparent
    },
    {
      key: 'total',
      title: 'Total dépensé',
      value: `${randomTotal} XOF`,
      icon: <DollarSign />,
      description: "Somme totale dépensée depuis votre inscription sur la plateforme.",
      color: 'rgba(123, 44, 191, 0.3)', // french-violet transparent
    },
  ];

  return (
    <div className="flex flex-col w-full p-4">
      {/* Heading */}
      <h1 className="text-2xl font-bold mb-6">Hello {userName}</h1>

      {/* Stats Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {boxes.map((box) => (
          <div key={box.key} className="relative bg-white p-4 rounded-lg shadow flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="p-2 rounded-md"
                  style={{ backgroundColor: box.color }}
                >
                  {React.cloneElement(box.icon, { className: 'w-6 h-6 text-black' })}
                </div>
                <span className="font-medium">{box.title}</span>
              </div>
              <button
                onClick={() => setTooltipVisible((prev) => ({ ...prev, [box.key]: !prev[box.key] }))}
                className="text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                <Info className="w-4 h-4" />
              </button>
            </div>
            {tooltipVisible[box.key] && (
              <p className="absolute top-12 right-4 z-10 bg-gray-50 p-2 text-sm rounded shadow-md w-56">
                {box.description}
              </p>
            )}
            <div className="mt-4 text-2xl font-bold">{box.value}</div>
          </div>
        ))}
      </div>

      {/* Booking Activity Chart */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-bold mb-4">Activité des bookings dans le temps</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={bookingData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <XAxis dataKey="month" />
            <YAxis />
            <Line type="monotone" dataKey="sessions" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
