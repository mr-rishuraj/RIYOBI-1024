// src/components/layout/Navbar.js (Updated with Pre-Register Modal)
import React, { useState } from 'react';
import { Menu, X, Shirt } from 'lucide-react';
import { handleWhatsAppContact } from '../../utils/whatsapp';
import PreRegisterModal from '../ui/PreRegisterModal';

const Navbar = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPreRegisterOpen, setIsPreRegisterOpen] = useState(false); // New state for modal

  const handleDashboardClick = () => {
    if (onNavigate) {
      onNavigate('dashboard');
    }
  };

  const handlePreRegisterClick = () => {
    setIsPreRegisterOpen(true);
    setIsMenuOpen(false); // Close mobile menu if open
  };

  return (
    <>
      <nav className="fixed w-full bg-white/95 backdrop-blur-sm shadow-sm z-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <Shirt className="h-8 w-8 text-blue-600 mr-2" />
                <span className="text-2xl font-bold text-gray-900">Riyobi</span>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <button 
                  onClick={handlePreRegisterClick}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Pre Register
                </button>
                <button 
                  onClick={() => handleWhatsAppContact()}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Contact Dhobi
                </button>
                <button 
                  onClick={handleDashboardClick}
                  className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Dhobi Dashboard
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-blue-600 p-2"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
                <button 
                  onClick={handlePreRegisterClick}
                  className="block w-full text-left bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium mb-2"
                >
                  Pre Register
                </button>
                <button 
                  onClick={() => handleWhatsAppContact()}
                  className="block w-full text-left bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium mb-2"
                >
                  Contact Dhobi
                </button>
                <button 
                  onClick={handleDashboardClick}
                  className="block w-full text-left text-gray-700 hover:text-blue-600 px-4 py-2 rounded-lg font-medium"
                >
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