// src/App.js - FIXED COMPLETE WORKING VERSION
import React, { useState } from 'react';

import Navbar from './components/layout/Navbar';
import HeroSection from './components/sections/HeroSection';
import ServicesSection from './components/sections/ServicesSection';
import ContactSection from './components/sections/ContactSection';
import Footer from './components/layout/Footer';
import DhobiDashboard from './components/Dashboard/DhobiDashboard';
import CustomerDashboard from './components/Dashboard/CustomerDashboard'; // Import your CustomerDashboard
import './App.css';
import ClothesInput from './components/sections/ClothesInput';

function App() {
  const [currentView, setCurrentView] = useState('landing');

  console.log('Current view:', currentView); // Debug log

  // Navigation handler function
  const handleNavigation = (page) => {
    console.log('Navigating to:', page); // Debug log
    setCurrentView(page);
  };

  // If dashboard view is selected, show only the dashboard
  if (currentView === 'dashboard') {
    return <DhobiDashboard onNavigateHome={() => setCurrentView('landing')} />;
  }

  // If customer dashboard view is selected, show only the customer dashboard
  if (currentView === 'customer-dashboard') {
    return <CustomerDashboard onNavigateHome={() => setCurrentView('landing')} />;
  }

   if (currentView === 'clothes-input') {
    return <ClothesInput onNavigateHome={() => setCurrentView('landing')} />;
  }

  // Otherwise show the landing page
  return (
    <div className="min-h-screen bg-white">
      <Navbar onNavigate={handleNavigation} />
      <HeroSection />
      <ServicesSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;