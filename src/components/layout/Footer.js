import React from 'react';
import { Shirt } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-6">
              <Shirt className="h-8 w-8 text-blue-400 mr-2" />
              <span className="text-2xl font-bold">Riyobi</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Empowering dhobi businesses across India with modern management tools. 
              Streamline your operations and grow your business with Riyobi.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Services</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Pricing</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Support</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="text-gray-300">+91 77777 77777</li>
              <li className="text-gray-300">support@riyobi.com</li>
              <li className="text-gray-300">Pilani, Rajasthan</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 mt-8 text-center">
          <p className="text-gray-400">
            © 2025 Riyobi. All rights reserved. Made with ❤️ for the dhobi community.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;