import React, { useState } from 'react';
import { 
  LayoutDashboard,
  LogOut,
  Settings,
  Search, 
  Square, 
  Inbox, 
  Users, 
  Menu
} from 'lucide-react';
import { FiSidebar } from 'react-icons/fi';
import SettingsComponent from '../components/Dashboard_student/settings';
import SignOutAlert from '../components/Dashboard_student/signoutalert';
import Notifications from '../components/Dashboard_student/notifications';
import Activites from '../components/Dashboard_student/activities';
import SearchTeacher from '../components/Dashboard_student/findteacher';

export default function CollapsibleSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [showSignOut, setShowSignOut] = useState(false);
  const [currentSection, setCurrentSection] = useState('Search'); // default section

  const menuItems = [
    { icon: Search, label: 'Trouver un professeur', section: 'Search' },
    { icon: Square, label: 'Activités', section: 'Activites' },
    { icon: Inbox, label: 'Notifications', section: 'Notifications' },
    { icon: Settings, label: 'Paramètres', section: 'Settings' },
    {
      icon: LogOut,
      label: 'Déconnexion',
      action: () => setShowSignOut(true)
    },
  ];

  const handleSignOutConfirm = () => {
    console.log('User signed out');
    setShowSignOut(false);
  };

  const showText = !isCollapsed || isMobileOpen;

  return (
    <div className="min-h-screen bg-gray-100 font-body">
      {/* -------------------- Navbar -------------------- */}
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                <Menu className="w-6 h-6" />
              </button>
              
              <a href="#" className="flex ms-2 md:me-24">
                <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 me-3" alt="Logo" />
                <span
                  className="self-center text-xl font-bold sm:text-2xl whitespace-nowrap text-gray-800"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Flowbite
                </span>
              </a>
            </div>

            <div className="flex items-center">
              <div className="flex items-center ms-3 relative">
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex text-sm bg-gray-200 rounded-full focus:ring-4 focus:ring-gray-300"
                >
                  <img
                    className="w-8 h-8 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                    alt="user"
                  />
                </button>

                {isUserDropdownOpen && (
                  <div className="absolute right-0 top-12 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow">
                    <div className="px-4 py-3">
                      <p className="text-sm text-gray-900 font-body">Neil Sims</p>
                      <p className="text-sm font-medium text-gray-700 truncate font-body">
                        neil.sims@flowbite.com
                      </p>
                    </div>
                    <ul className="py-1">
                      <li>
                        <button
                          onClick={() => {
                            setCurrentSection('Settings');
                            setIsUserDropdownOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-body"
                        >
                          Paramètres
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => setShowSignOut(true)}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-body"
                        >
                          Déconnexion
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      {/* -------------------- End Navbar -------------------- */}

      {/* -------------------- Sidebar -------------------- */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen pt-20 transition-all duration-300 border-r border-gray-200 ${
          isCollapsed ? 'w-20' : 'w-64'
        } ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`}
        style={{
          background: '#3c096c',
          color: 'white'
        }}
      >
        <div className="h-full px-3 pb-4 overflow-y-auto">
          {/* Sidebar Toggle */}
          <div
            className="flex items-center p-2 mb-4 cursor-pointer rounded-lg hover:bg-white/10 transition-all"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <FiSidebar className="w-6 h-6 text-white flex-shrink-0" />
            <span
              className={`ms-3 font-body whitespace-nowrap transition-all duration-300 overflow-hidden`}
              style={{ textAlign: 'left', opacity: showText ? 1 : 0, width: showText ? 'auto' : 0 }}
            >
              Menu
            </span>
          </div>

          <ul className="space-y-2 font-medium">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <li key={index}>
                  <button
                    onClick={() => item.section ? setCurrentSection(item.section) : item.action?.()}
                    className="flex items-center w-full p-2 rounded-lg hover:bg-white/20 transition"
                    title={!showText ? item.label : ''}
                  >
                    <Icon className="w-5 h-5 text-white transition duration-75 flex-shrink-0" />
                    {showText && (
                      <span className="flex-1 ms-3 whitespace-nowrap font-body" style={{ textAlign: 'left' }}>
                        {item.label}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Sidebar Button at bottom */}
          {!isCollapsed && (
            <button
              className="mt-6 w-full py-3 font-bold rounded-lg border border-white bg-white text-[#3c096c] hover:bg-violet-100 transition"
            >
              Devenir Prof
            </button>
          )}
        </div>
      </aside>

      {/* Main content area */}
      <div className={`py-2 transition-all duration-300 ${isCollapsed ? 'sm:ml-20' : 'sm:ml-64'}`}>
        <div className="mt-[4rem] w-full relative">
          {currentSection === 'Activites' && <Activites />}
          {currentSection === 'Notifications' && <Notifications />}
          {currentSection === 'Settings' && <SettingsComponent />}
          {currentSection === 'Search' && <SearchTeacher />}
        </div>
      </div>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-gray-900 bg-opacity-50 sm:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sign Out Alert */}
      <SignOutAlert
        isOpen={showSignOut}
        onClose={() => setShowSignOut(false)}
        onConfirm={handleSignOutConfirm}
      />
    </div>
  );
}
