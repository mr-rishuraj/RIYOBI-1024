// src/App.js - COMPLETE WORKING VERSION
import React, { useState } from 'react';
import Navbar from './components/layout/Navbar';
import HeroSection from './components/sections/HeroSection';
import ServicesSection from './components/sections/ServicesSection';
import ContactSection from './components/sections/ContactSection';
import Footer from './components/layout/Footer';
import './App.css';
import DhobiDashboard from './components/Dashboard/DhobiDashboard';

function App() {
  const [currentView, setCurrentView] = useState('landing');

  console.log('Current view:', currentView); // Debug log

  // If dashboard view is selected, show only the dashboard
  if (currentView === 'dashboard') {
    return <DhobiDashboard  onNavigateHome={() => setCurrentView('landing')}  />;
  }

  // Otherwise show the landing page
  return (
    <div className="min-h-screen bg-white">
      <Navbar onNavigate={setCurrentView} />
      <HeroSection />
      <ServicesSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;