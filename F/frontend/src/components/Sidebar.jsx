import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import api from "./api";

import {
  HomeIcon,
  UserGroupIcon,
  CreditCardIcon,
  ChatBubbleLeftRightIcon,
  ClipboardDocumentListIcon,
  StarIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon
} from "@heroicons/react/24/outline";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await api.post(
          "/api/logout",
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  const links = [
    { name: "Dashboard", to: "/dashboard", icon: <HomeIcon className="h-5 w-5" /> },
    { name: "Professeurs", to: "/professors", icon: <UserGroupIcon className="h-5 w-5" /> },
    { name: "Paiements", to: "/payments", icon: <CreditCardIcon className="h-5 w-5" /> },
    { name: "Messages", to: "/messages", icon: <ChatBubbleLeftRightIcon className="h-5 w-5" /> },
    { name: "Cours", to: "/courses", icon: <ClipboardDocumentListIcon className="h-5 w-5" /> },
    { name: "Évaluations", to: "/ratings", icon: <StarIcon className="h-5 w-5" /> },
    { name: "Paramètres", to: "/settings", icon: <Cog6ToothIcon className="h-5 w-5" /> },
  ];

  return (
    <div className="w-64 bg-white shadow-lg flex flex-col p-6 min-h-screen border-r border-gray-100 font-poppins">
      
      {/* Logo */}
      <div className="text-[26px] font-bold mb-8 text-primaryBlue tracking-tight">
        MonProf<span className="text-gray-900">.bj</span>
      </div>

      {/* Liens de navigation */}
      <nav className="flex flex-col space-y-2 flex-grow">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 ${
                isActive
                  ? "bg-primaryBlue text-white font-semibold"
                  : "text-gray-700 hover:bg-blue-50 hover:text-buttonBlue"
              }`
            }
          >
            {link.icon}
            <span>{link.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Déconnexion */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 p-3 rounded-lg text-red-500 hover:bg-red-100 hover:text-red-600 transition mt-4 font-medium"
      >
        <ArrowRightOnRectangleIcon className="h-5 w-5" />
        <span>Déconnexion</span>
      </button>
    </div>
  );
}
