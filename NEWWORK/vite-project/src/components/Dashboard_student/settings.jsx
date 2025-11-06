import React from "react";
import { User, Bell, Headset, CreditCard, ChevronRight } from "lucide-react";

export default function Settings() {
  const options = [
    {
      title: "Modifier son profil utilisateur",
      description: "Mettez à jour vos informations personnelles et photo de profil.",
      icon: <User />,
    },
    {
      title: "Paramètres de notifications",
      description: "Gérez vos préférences de notification par email et push.",
      icon: <Bell />,
    },
    {
      title: "Support client",
      description: "Contactez notre équipe pour toute aide ou question.",
      icon: <Headset />,
    },
    {
      title: "Paramètres de paiement",
      description: "Gérez vos méthodes de paiement et factures.",
      icon: <CreditCard />,
    },
  ];

  return (
    <div className=" p-2 mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
      {options.map((option, idx) => (
        <div
          key={idx}
          className="flex items-center justify-between p-5 bg-white rounded-lg shadow-sm transition-colors duration-200 cursor-pointer hover:bg-[#7b2cbf]/10 desktop:hover:bg-[#7b2cbf]/10"
        >
          <div className="flex items-center space-x-4 flex-1">
           <button
  className="flex items-center justify-center w-12 h-12 min-w-[3rem] min-h-[3rem] rounded-full bg-[#7b2cbf]/20 cursor-pointer flex-shrink-0"
  disabled
>
  {option.icon}
</button>
            <div className="flex-1">
              <h3 className="font-heading text-lg mb-1 cursor-pointer">{option.title}</h3>
              <p className="font-body text-sm text-gray-600 cursor-pointer">
                {option.description}
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 cursor-pointer" />
        </div>
      ))}
    </div>
  );
}
