import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StatsCard from "../components/StatsCard";
import CourseCard from "../components/CourseCard";

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

 useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  if (token) {
    localStorage.setItem("token", token);
    // éventuellement stocker l'utilisateur si tu l'as en query param ou à récupérer via API
    navigate("/dashboard");
  }
}, [navigate]);


  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">👋 Bienvenue, {user?.name} !</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard title="Cours suivis" value="3" icon="📘" />
        <StatsCard title="Professeurs contactés" value="2" icon="🧑‍🏫" />
        <StatsCard title="Total payé" value="15 000 XOF" icon="💳" />
        <StatsCard title="Heures d’apprentissage" value="8 h" icon="⌛" />
      </div>

      <h2 className="text-2xl font-semibold mb-4">📅 Prochains cours</h2>
      <div className="grid gap-4">
        <CourseCard professor="M. Koffi" subject="Maths" date="29/10" status="🕓 En attente" />
        <CourseCard professor="Mme Sarah" subject="Anglais" date="30/10" status="✅ Confirmé" />
      </div>
    </div>
  );
}
