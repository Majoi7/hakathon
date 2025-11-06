import { useRef, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { MdCalculate, MdBiotech } from "react-icons/md";
import { GrLanguage } from "react-icons/gr";
import { SlChemistry } from "react-icons/sl";
import { RiEnglishInput } from "react-icons/ri";
import { CiImageOn } from "react-icons/ci";
import { BsFillGeoAltFill } from "react-icons/bs";
import { FaPaintBrush, FaMusic } from "react-icons/fa";

// Import teacher images
import johnDoe from "../../assets/images/johnDoe.avif";
import janeSmith from "../../assets/images/janeSmith.avif";
import aliceJohnson from "../../assets/images/aliceJohnson.avif";
import bobMartin from "../../assets/images/bobMartin.avif";
import emilyDavis from "../../assets/images/emilyDavis.avif";
import michaelBrown from "../../assets/images/michaelBrown.avif";
import sarahWilson from "../../assets/images/sarahWilson.avif";
import davidLee from "../../assets/images/davidLee.avif";
import lauraAdams from "../../assets/images/lauraAdams.avif";
import kevinWhite from "../../assets/images/kevinWhite.avif";
import oliviaTaylor from "../../assets/images/oliviaTaylor.avif";
import danielHarris from "../../assets/images/danielHarris.avif";

// Map teacher names to images
const teacherImages = {
  "John Doe": johnDoe,
  "Jane Smith": janeSmith,
  "Alice Johnson": aliceJohnson,
  "Bob Martin": bobMartin,
  "Emily Davis": emilyDavis,
  "Michael Brown": michaelBrown,
  "Sarah Wilson": sarahWilson,
  "David Lee": davidLee,
  "Laura Adams": lauraAdams,
  "Kevin White": kevinWhite,
  "Olivia Taylor": oliviaTaylor,
  "Daniel Harris": danielHarris,
};

export default function SearchTeacher() {
  const scrollRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchedSubject, setSearchedSubject] = useState("");

  const courses = [
    { name: "Maths", icon: <MdCalculate className="text-5xl mb-3 text-[#7b2cbf]" />, teachers: 35 },
    { name: "Français", icon: <GrLanguage className="text-5xl mb-3 text-[#7b2cbf]" />, teachers: 40 },
    { name: "Physics", icon: <SlChemistry className="text-5xl mb-3 text-[#7b2cbf]" />, teachers: 28 },
    { name: "Biology", icon: <MdBiotech className="text-5xl mb-3 text-[#7b2cbf]" />, teachers: 32 },
    { name: "Chemistry", icon: <SlChemistry className="text-5xl mb-3 text-[#7b2cbf]" />, teachers: 30 },
    { name: "English", icon: <RiEnglishInput className="text-5xl mb-3 text-[#7b2cbf]" />, teachers: 25 },
    { name: "History", icon: <CiImageOn className="text-5xl mb-3 text-[#7b2cbf]" />, teachers: 20 },
    { name: "Geography", icon: <BsFillGeoAltFill className="text-5xl mb-3 text-[#7b2cbf]" />, teachers: 18 },
    { name: "Art", icon: <FaPaintBrush className="text-5xl mb-3 text-[#7b2cbf]" />, teachers: 22 },
    { name: "Music", icon: <FaMusic className="text-5xl mb-3 text-[#7b2cbf]" />, teachers: 15 },
  ];

  const teachersData = [
    "John Doe","Jane Smith","Alice Johnson","Bob Martin",
    "Emily Davis","Michael Brown","Sarah Wilson","David Lee",
    "Laura Adams","Kevin White","Olivia Taylor","Daniel Harris"
  ];

  const handleSearch = () => {
    if (!searchTerm) return;
    setSearchedSubject(searchTerm);
    setLoading(true);
    setTimeout(() => {
      const results = Array.from({ length: Math.floor(Math.random() * 11) + 10 }, () => {
        const name = teachersData[Math.floor(Math.random() * teachersData.length)];
        return {
          name,
          subject: searchTerm,
          rating: (Math.random() * 2 + 3).toFixed(1),
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          image: teacherImages[name],
        };
      });
      setSearchResults(results);
      setLoading(false);
    }, 800);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="mt-16 w-full grid grid-cols-1 gap-4 px-4">
      {/* Heading centered above input */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Roboto Slab, serif' }}>
          Trouvez votre professeur idéal
        </h1>
        <p className="text-gray-600 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Recherchez un enseignant passionné dans votre matière préférée.
        </p>
      </div>

      {/* Search Box */}
      <div className="w-full bg-gray-100 p-4 rounded-lg shadow-md flex flex-col sm:flex-row items-center">
        <div className="flex flex-1 w-full relative">
          <input
            type="text"
            placeholder="Recherchez une matière ou un professeur"
            className="block p-2.5 w-full text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-[#c77dff] focus:border-[#c77dff]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            type="button"
            onClick={handleSearch}
            className="absolute top-0 right-0 h-full p-2.5 text-sm font-medium text-white bg-[#5a189a] hover:bg-[#7b2cbf] focus:ring-4 focus:outline-none focus:ring-[#c77dff] rounded-r-lg"
          >
            Rechercher
          </button>
        </div>
      </div>

      {/* Popular Courses Box */}
      {!searchResults.length && !loading && (
        <div className="w-full bg-white p-4 rounded-lg shadow-md flex flex-col relative">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 text-center" style={{ fontFamily: 'Roboto Slab, serif' }}>
            Nos cours les plus demandés
          </h2>
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-200 rounded-full shadow hover:bg-gray-300 z-10"
          >
            <AiOutlineLeft className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-gray-200 rounded-full shadow hover:bg-gray-300 z-10"
          >
            <AiOutlineRight className="w-5 h-5 text-gray-700" />
          </button>
          <div ref={scrollRef} className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
            {courses.map((course, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-52 bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center 
                           md:transform md:transition md:duration-300 md:hover:-translate-y-2 md:hover:shadow-lg"
              >
                {course.icon}
                <span className="font-medium text-gray-900 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {course.name}
                </span>
                <span className="text-sm text-gray-500" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {course.teachers} profs disponibles
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Teacher Cards Heading */}
      {searchResults.length > 0 && (
        <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Roboto Slab, serif' }}>
          Professeurs de {searchedSubject} disponibles
        </h2>
      )}

      {/* Teacher Cards Grid / Loader */}
      {loading ? (
        <div className="w-full flex justify-center items-center py-20">
          <div className="w-12 h-12 border-4 border-[#c77dff] border-t-[#5a189a] rounded-full animate-spin"></div>
        </div>
      ) : searchResults.length > 0 ? (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchResults.map((teacher, idx) => (
            <div
              key={idx}
              className="w-full bg-white border border-gray-200 rounded-lg shadow-sm"
            >
              <a href="#">
                <img
                  className="w-full h-60 p-4 rounded-[20px] object-cover"
                  src={teacher.image}
                  alt={teacher.name}
                />
              </a>
              <div className="px-5 pb-5">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 mb-2" style={{ fontFamily: 'Roboto Slab, serif' }}>
                  {teacher.name}
                </h5>
                <div className="flex items-center mt-2.5 mb-4">
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(teacher.rating) ? "text-yellow-300" : "text-gray-200"}`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                      </svg>
                    ))}
                  </div>
                  <span className="bg-[#e0aaff] text-[#3c096c] text-xs font-semibold px-2.5 py-0.5 rounded-sm ml-3">
                    {teacher.rating}
                  </span>
                </div>
                <p className="text-gray-500 text-sm mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {teacher.description}
                </p>
                <a
                  href="#"
                  className="text-white bg-[#5a189a] hover:bg-[#7b2cbf] focus:ring-4 focus:outline-none focus:ring-[#c77dff] font-medium rounded-lg text-sm px-5 py-2.5 text-center block w-full"
                >
                  Voir le profil
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
