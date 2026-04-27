import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import WelcomeScreen from './components/WelcomeScreen';
import Dashboard from './components/Dashboard';
import AboutUs from './components/AboutUs';
import TermsOfService from './components/TermsOfService';
import PrivacyPolicy from './components/PrivacyPolicy';
import ContactUs from './components/ContactUs';
import './index.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const handleDataReceived = (fetchedData) => {
    setData(fetchedData);
    navigate('/dashboard');
  };

  const handleReset = () => {
    setData(null);
    navigate('/');
  };

  return (
    <div className="app">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<WelcomeScreen onDataReceived={handleDataReceived} />} />
        <Route path="/dashboard" element={
          data ? <Dashboard data={data} onReset={handleReset} /> : <WelcomeScreen onDataReceived={handleDataReceived} />
        } />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
    </div>
  );
}

export default App;
