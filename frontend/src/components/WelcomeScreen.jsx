import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchScore } from '../services/api';

const WelcomeScreen = ({ onDataReceived }) => {
  const [postcode, setPostcode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!postcode.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const data = await fetchScore(postcode);
      onDataReceived(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl shadow-2xl shadow-emerald-900/10 flex justify-between items-center px-8 h-20 max-w-none" style={{ backgroundColor: '#10b981' }}>
        <Link to="/">
          <img alt="15 Minute City Logo" className="h-20 w-auto object-contain hover:scale-110 transition-transform duration-300 cursor-pointer" src="/logo.png" />
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link className="text-white font-bold border-b-2 border-white pb-1 hover:scale-105 transition-all duration-300" to="/">Home</Link>
          <Link className="text-emerald-50/80 hover:text-white transition-colors hover:scale-105 duration-300" to="/about">About</Link>
        </div>
        <div className="flex items-center gap-4">
          <button className="material-symbols-outlined text-white text-2xl hover:scale-105 transition-all">language</button>
        </div>
      </nav>

      {/* Main Content Canvas */}
      <main className="flex-grow flex flex-col items-center justify-center px-6 pt-24 pb-12 relative overflow-hidden">
        {/* Background Architectural Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary-container/20 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-[100px]"></div>
        </div>

        <section className="relative z-10 w-full max-w-4xl text-center flex flex-col items-center">
          {/* Icon Cluster (The Urban Pulse) */}
          <div className="flex gap-4 mb-10 overflow-x-auto pb-4 no-scrollbar max-w-full justify-center">
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-surface-container-lowest shadow-xl shadow-primary/5 text-primary hover:scale-110 transition-transform cursor-default">
              <span className="material-symbols-outlined text-3xl">location_pin</span>
            </div>
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-surface-container-lowest shadow-xl shadow-primary/5 text-primary hover:scale-110 transition-transform cursor-default">
              <span className="material-symbols-outlined text-3xl">train</span>
            </div>
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-surface-container-lowest shadow-xl shadow-primary/5 text-primary hover:scale-110 transition-transform cursor-default">
              <span className="material-symbols-outlined text-3xl">shopping_cart</span>
            </div>
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-surface-container-lowest shadow-xl shadow-primary/5 text-primary hover:scale-110 transition-transform cursor-default">
              <span className="material-symbols-outlined text-3xl">child_hat</span>
            </div>
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-surface-container-lowest shadow-xl shadow-primary/5 text-primary hover:scale-110 transition-transform cursor-default">
              <span className="material-symbols-outlined text-3xl">pin</span>
            </div>
          </div>

          {/* Typography Hierarchy (Editorial Authority) */}
          <h1 className="text-5xl md:text-7xl font-bold text-on-surface tracking-tight mb-6 leading-tight">
            Find your <span className="text-primary italic">15 Minute</span> City
          </h1>
          <p className="text-xl md:text-2xl text-on-surface-variant font-medium max-w-2xl mb-12">
            Enter your postcode to check your local livability score. Discover how accessible your world is on foot.
          </p>

          {/* Search Interaction */}
          <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-surface-container-lowest p-3 rounded-xl shadow-2xl shadow-emerald-900/5 flex flex-col md:flex-row gap-4 relative">
            <div className="flex-grow relative">
              <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-slate-400">search</span>
              </div>
              <input 
                className="w-full h-16 pl-14 pr-6 bg-surface-container-low border-none rounded-lg text-lg font-medium focus:ring-4 focus:ring-primary/20 focus:bg-white transition-all placeholder:text-slate-400" 
                placeholder="Enter your postcode (e.g. SW1A 1AA)" 
                type="text"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                disabled={loading}
              />
            </div>
            <button 
              type="submit"
              disabled={loading || !postcode.trim()}
              className="h-16 px-10 bg-gradient-to-br from-primary to-primary-container text-white font-bold text-lg rounded-lg shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-70 disabled:hover:scale-100"
            >
              {loading ? "Analyzing..." : "Check Score"}
              {!loading && <span className="material-symbols-outlined">arrow_forward</span>}
            </button>
          </form>
          {error && <div className="text-error font-bold mt-4">{error}</div>}

          {/* Bento-Style Feature Previews */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 w-full">
            <div className="bg-surface-container-low p-8 rounded-lg text-left group hover:bg-white transition-colors duration-500">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Sustainable Living</h3>
              <p className="text-on-surface-variant leading-relaxed">Lower your carbon footprint by choosing neighborhoods designed for pedestrians.</p>
            </div>
            <div className="bg-surface-container-low p-8 rounded-lg text-left group hover:bg-white transition-colors duration-500">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>health_and_safety</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Health First</h3>
              <p className="text-on-surface-variant leading-relaxed">Integrated walking paths and local gyms ensure wellness is just minutes away.</p>
            </div>
            <div className="bg-surface-container-low p-8 rounded-lg text-left group hover:bg-white transition-colors duration-500">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>communities</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Hyper-Local</h3>
              <p className="text-on-surface-variant leading-relaxed">Connect with your community. Find markets, parks, and schools in your orbit.</p>
            </div>
          </div>
        </section>

        {/* Visual Anchor (Map Concept) */}
        <div className="mt-24 w-full max-w-5xl h-96 rounded-xl overflow-hidden shadow-inner-xl bg-surface-container-highest relative">
          <img alt="Modern urban landscape with greenery" className="w-full h-full object-cover opacity-60 mix-blend-multiply grayscale hover:grayscale-0 transition-all duration-1000" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBvi98iXwi45EauPd5jpnT7Ci3Is7Tp09UCLYiJ7XJcOfopv-XbdAFIoY9-25EkJNhfegKaLfADSnQNkPcbxUiNLTe8gxb-GuC-wAPVjGeNmo6uW8jNk8YIZBB5u7Hf97Vfk6D4jq-kYNMIEmZRRCVCemnHgmLcKL4Mk2E9QzYAuUg-Pae3U9rP3mtBIJMgrSkOHhJl6xDMcghhzuvtj4Ros_TVAXlxSLIPQmYAd8yvTCalDewSMv9gJ-7vD0eYA3RuiXOXAF1Sd0" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
          <div className="absolute bottom-8 left-12">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full text-primary font-bold shadow-lg">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              Live Urban Data Processing
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-12 px-8 bg-slate-900 dark:bg-black flex flex-col items-center gap-6 md:grid md:grid-cols-3">
        <div className="flex flex-col items-center md:items-start">
          <Link to="/">
            <img alt="15 Minute City Logo" className="h-16 w-auto object-contain mb-2 hover:scale-105 transition-transform brightness-0 invert" src="/footer-logo.png" />
          </Link>
          <div className="text-emerald-400 font-bold text-xl tracking-tight">15 Minute City</div>
          <div className="text-slate-500 text-xs mt-1">Built by <a href="https://www.linkedin.com/in/arman-shk/" target="_blank" rel="noopener noreferrer" className="text-[#10b981] font-bold hover:underline">Arman</a></div>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          <Link className="text-sm font-medium uppercase tracking-widest text-slate-400 hover:text-emerald-300 transition-colors" to="/privacy">Privacy</Link>
          <Link className="text-sm font-medium uppercase tracking-widest text-slate-400 hover:text-emerald-300 transition-colors" to="/terms">Terms</Link>
          <Link className="text-sm font-medium uppercase tracking-widest text-slate-400 hover:text-emerald-300 transition-colors" to="/contact">Contact</Link>
        </div>
        <div className="text-slate-400 text-sm font-medium uppercase tracking-widest md:text-right">
          © 2026 15 minutes city. All rights reserved.
        </div>
      </footer>
    </>
  );
};

export default WelcomeScreen;
