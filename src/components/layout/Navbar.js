// src/components/layout/Navbar.js (Enhanced with Ryobi-inspired Design)
import React, { useState } from 'react';
import { Menu, X, Shirt, User, Settings, Bell } from 'lucide-react';
import { handleWhatsAppContact } from '../../utils/whatsapp';
import PreRegisterModal from '../ui/PreRegisterModal';

const Navbar = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPreRegisterOpen, setIsPreRegisterOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const handleDashboardClick = () => {
    if (onNavigate) {
      onNavigate('dashboard');
    }
  };

  const handlePreRegisterClick = () => {
    setIsPreRegisterOpen(true);
    setIsMenuOpen(false);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  return (
    <>
      <nav className="fixed w-full bg-white shadow-lg z-50 border-b-2 border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-18">
            {/* Logo Section - Enhanced */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center group cursor-pointer">
                <div className="relative">
                  <Shirt className="h-10 w-10 text-blue-500 mr-3 transition-all duration-300 group-hover:scale-110" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-gray-900 tracking-tight">Riyobi</span>
                  <span className="text-xs text-blue-600 font-medium -mt-1">Laundry Solutions</span>
                </div>
              </div>
            </div>

            {/* Center Navigation Links - New Section */}
            <div className="hidden lg:flex items-center space-x-8">
              <a href="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group">
                Services
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group">
                Pricing
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group">
                Track Order
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <button 
                onClick={() => onNavigate('customer-dashboard')}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group"
              >
                Customer Dashboard
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </button>
            </div>

            {/* Desktop Menu - Enhanced */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Notification Bell */}
              <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-full transition-all duration-200 relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
              </button>

              {/* Action Buttons */}
              <button 
                onClick={handlePreRegisterClick}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Pre Register
              </button>
              
              <button 
                onClick={() => handleWhatsAppContact()}
                className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Contact Dhobi
              </button>

              {/* Profile Dropdown */}
              <div className="relative">
                <button 
                  onClick={toggleProfileDropdown}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 bg-gray-50 hover:bg-gray-100 px-4 py-2.5 rounded-xl font-medium transition-all duration-200"
                >
                  <User className="h-5 w-5" />
                  <span className="hidden lg:block">Dashboard</span>
                </button>
                
                {/* Dropdown Menu */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                    <button 
                      onClick={() => onNavigate('customer-dashboard')}
                      className="flex items-center w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200"
                    >
                      <User className="h-4 w-4 mr-3" />
                      Customer Dashboard
                    </button>
                    <button 
                      onClick={handleDashboardClick}
                      className="flex items-center w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200"
                    >
                      <User className="h-4 w-4 mr-3" />
                      Dhobi Dashboard
                    </button>
                    <button className="flex items-center w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200">
                      <Settings className="h-4 w-4 mr-3" />
                      Settings
                    </button>
                    <hr className="my-2" />
                    <button className="flex items-center w-full px-4 py-3 text-left text-red-600 hover:bg-red-50 transition-colors duration-200">
                      <X className="h-4 w-4 mr-3" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile menu button - Enhanced */}
            <div className="md:hidden flex items-center space-x-2">
              <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-full transition-all duration-200 relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-blue-600 p-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu - Enhanced */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-4 space-y-3 bg-white border-t border-gray-100">
                {/* Mobile Navigation Links */}
                <div className="space-y-2 pb-4 border-b border-gray-100">
                  <a href="/" className="block text-gray-700 hover:text-blue-600 px-4 py-2 rounded-lg font-medium transition-colors duration-200">
                    Customer Dashboard
                  </a>
                  <a href="/" className="block text-gray-700 hover:text-blue-600 px-4 py-2 rounded-lg font-medium transition-colors duration-200">
                    Services
                  </a>
                  <a href="/" className="block text-gray-700 hover:text-blue-600 px-4 py-2 rounded-lg font-medium transition-colors duration-200">
                    Pricing
                  </a>
                  <a href="/" className="block text-gray-700 hover:text-blue-600 px-4 py-2 rounded-lg font-medium transition-colors duration-200">
                    Track Order
                  </a>
                </div>
                
                {/* Mobile Action Buttons */}
                <button 
                  onClick={handlePreRegisterClick}
                  className="block w-full text-left bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-3 rounded-xl font-semibold mb-3 transition-all duration-300"
                >
                  Pre Register
                </button>
                <button 
                  onClick={() => handleWhatsAppContact()}
                  className="block w-full text-left bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white px-4 py-3 rounded-xl font-semibold mb-3 transition-all duration-300"
                >
                  Contact Dhobi
                </button>
                <button 
                  onClick={handleDashboardClick}
                  className="block w-full text-left text-gray-700 hover:text-blue-600 bg-gray-50 hover:bg-gray-100 px-4 py-3 rounded-xl font-medium transition-all duration-200"
                >
                  <User className="h-4 w-4 mr-2 inline" />
                  Dhobi Dashboard
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Pre-Register Modal */}
      <PreRegisterModal 
        isOpen={isPreRegisterOpen}
        onClose={() => setIsPreRegisterOpen(false)}
      />
    </>
  );
};

export default Navbar;