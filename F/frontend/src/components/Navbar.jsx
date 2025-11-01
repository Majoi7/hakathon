import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-sm">
      
      {/* Logo */}
      <Link
        to="/"
        className="text-[26px] font-poppins font-bold text-primaryBlue"
      >
        MonProf<span className="text-gray-900">.bj</span>
      </Link>

      {/* Liens de navigation */}
      <div className="flex items-center space-x-6 font-poppins font-medium">
        <Link
          to="/teach"
          className="text-gray-700 hover:text-buttonBlue transition-colors duration-200"
        >
          Donner des cours
        </Link>
        <Link
          to="/login"
          className="text-gray-700 hover:text-buttonBlue transition-colors duration-200"
        >
          Connexion
        </Link>
      </div>
    </nav>
  );
}
