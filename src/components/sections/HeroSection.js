import React from 'react';
import { ChevronRight } from 'lucide-react';
import { handleWhatsAppContact } from '../../utils/whatsapp';

const HeroSection = () => {
  return (
    <section className="pt-20 pb-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Revolutionize Your
                <span className="text-blue-600 block">Dhobi Business</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                The complete online management solution for dhobi services. Streamline orders, 
                track deliveries, manage customers, and grow your laundry business with Riyobi.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg">
                Get Started Today
                <ChevronRight className="inline-block ml-2 h-5 w-5" />
              </button>
              <button 
                onClick={() => handleWhatsAppContact()}
                className="bg-white hover:bg-gray-50 text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg border-2 border-blue-600 transition-all"
              >
                Contact Us
              </button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8 border-t">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">500+</div>
                <div className="text-gray-600">Happy Dhobis</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">10K+</div>
                <div className="text-gray-600">Orders Managed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">24/7</div>
                <div className="text-gray-600">Support</div>
              </div>
            </div>
          </div>

          <div className="lg:pl-8">
            <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-2 hover:rotate-0 transition-transform duration-300">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Today's Orders</h3>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">+12</span>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">Sharma Family</div>
                      <div className="text-sm text-gray-600">5 Shirts, 3 Pants</div>
                    </div>
                    <div className="text-blue-600 font-semibold">₹240</div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">Hotel Raj</div>
                      <div className="text-sm text-gray-600">20 Bed Sheets</div>
                    </div>
                    <div className="text-yellow-600 font-semibold">₹600</div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">Priya Textiles</div>
                      <div className="text-sm text-gray-600">8 Sarees</div>
                    </div>
                    <div className="text-green-600 font-semibold">₹320</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;