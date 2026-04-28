import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Map from './Map';
import { fetchScore } from '../services/api';

const Dashboard = ({ data, onReset, onDataReceived }) => {
  const { postcode, coordinates, overall_score, categories } = data;
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedAmenity, setSelectedAmenity] = useState(null);
  const [searchPostcode, setSearchPostcode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchPostcode.trim()) return;
    
    setLoading(true);
    try {
      const newData = await fetchScore(searchPostcode);
      onDataReceived(newData);
      setSearchPostcode('');
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleCategory = (cat) => {
    setSelectedCategory(prev => prev === cat ? null : cat);
    setSelectedAmenity(null); // Clear specific amenity if category changes
  };

  const toggleAmenity = (am) => {
    setSelectedAmenity(prev => (prev?.lat === am.lat && prev?.lon === am.lon) ? null : am);
  };

  const getClosestDistance = (catKey) => {
    const list = categories[catKey]?.amenities_list || [];
    if (list.length === 0) return 'N/A';
    const sorted = [...list].sort((a, b) => a.distance_km - b.distance_km);
    return `${(sorted[0].distance_km * 1000).toFixed(0)}m`;
  };

  // Calculate percentages for City Ability Radar
  // In the layout, there are 4 pillars: Mobility, Commerce, Education, Ecology
  // Transport = Mobility, Groceries = Commerce, Education = Education, Parks = Ecology
  const getPercentage = (cat) => ((categories[cat]?.score || 0) * 10).toFixed(0);

  const mobility = getPercentage('transport');
  const commerce = getPercentage('groceries');
  const education = getPercentage('education');
  const ecology = getPercentage('parks');
  const health = getPercentage('healthcare');

  return (
    <>
      {/* Main Wrapper for Sidebar + Content */}
      <div className="flex flex-grow w-full overflow-hidden min-h-screen">
        {/* SideNavBar Shell */}
        <aside className="w-72 bg-emerald-50 dark:bg-slate-950 flex flex-col py-10 gap-2 shadow-xl z-50 overflow-y-auto">
          <div className="px-8 mb-10">
            <Link to="/">
              <img alt="15MinCity Logo" className="h-20 w-auto mb-6 object-contain hover:scale-105 transition-transform" src="/logo.png" />
            </Link>
          </div>
          <nav className="flex-grow flex flex-col gap-2 px-4">
            <a onClick={onReset} className="flex items-center gap-4 text-on-surface-variant hover:bg-emerald-100/50 rounded-full px-6 py-4 cursor-pointer transition-all">
              <span className="material-symbols-outlined">arrow_back</span>
              <span className="font-medium text-sm">New Search</span>
            </a>
            {/* Active Tab: Command Center */}
            <Link className="flex items-center gap-4 bg-gradient-to-r from-primary to-primary-container text-white rounded-full px-6 py-4 shadow-lg shadow-primary/20 cursor-pointer active:brightness-90 transition-all duration-300" to="/">
              <span className="material-symbols-outlined" data-icon="dashboard">dashboard</span>
              <span className="font-medium text-sm">Dashboard</span>
            </Link>
          </nav>
        </aside>

        {/* Content Area */}
        <div className="flex-grow flex flex-col min-w-0 overflow-y-auto">
          {/* TopNavBar Shell */}
          <header className="flex justify-between items-center px-8 h-20 w-full bg-emerald-50/70 backdrop-blur-xl sticky top-0 z-40 shadow-[0_20px_40px_-10px_rgba(0,33,21,0.06)]">
            <div className="flex items-center gap-6">
              <form onSubmit={handleSearch} className="relative">
                <span className="absolute inset-y-0 left-4 flex items-center text-on-surface-variant pointer-events-none">
                  <span className="material-symbols-outlined" data-icon="search">search</span>
                </span>
                <input 
                  className="pl-12 pr-6 py-2.5 bg-surface-container-lowest rounded-full border-none focus:ring-2 focus:ring-primary/20 w-64 text-sm font-medium transition-all" 
                  placeholder={loading ? "Analyzing..." : "Search District Grid..."} 
                  type="text" 
                  value={searchPostcode}
                  onChange={(e) => setSearchPostcode(e.target.value)}
                  disabled={loading}
                />
              </form>
            </div>
            <div className="flex items-center gap-4">
            </div>
          </header>

          {/* Canvas Area */}
          <div className="p-8 space-y-8 max-w-[1400px] mx-auto w-full">
            {/* Hero Row: Livability XP & Stats Radar */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Livability XP Circle */}
              <div className="lg:col-span-4 bg-surface-container-lowest p-10 rounded-xl flex flex-col items-center justify-center relative overflow-hidden shadow-sm">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
                <h3 className="text-xl font-bold text-on-surface mb-8">Livables</h3>
                <div className="relative">
                  <svg className="w-48 h-48 transform -rotate-90">
                    <circle className="text-surface-container" cx="96" cy="96" fill="transparent" r="88" stroke="currentColor" strokeWidth="12"></circle>
                    <circle className="text-primary transition-all duration-1000" cx="96" cy="96" fill="transparent" r="88" stroke="currentColor" strokeDasharray="552.92" strokeDashoffset={552.92 - (552.92 * (overall_score / 100))} strokeWidth="12"></circle>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl font-extrabold text-on-surface">{(overall_score / 10).toFixed(1)}</span>
                    <span className="text-on-surface-variant font-bold">/ 10 Livables</span>
                  </div>
                </div>
              </div>

              {/* City Ability Radar */}
              <div className="lg:col-span-8 bg-surface-container-low p-10 rounded-xl flex flex-col md:flex-row items-center gap-10 shadow-sm">
                <div className="flex-grow">
                  <h2 className="text-2xl font-headline font-bold text-on-surface mb-2">City Ability Radar</h2>
                  <p className="text-on-surface-variant text-sm max-w-sm mb-8">Comprehensive district performance across key urban pillars. Optimize your grid to reach Paragon status.</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Mobility</span>
                      <span className="text-sm font-mono font-bold text-primary">{mobility}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Commerce</span>
                      <span className="text-sm font-mono font-bold text-primary">{commerce}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Education</span>
                      <span className="text-sm font-mono font-bold text-primary">{education}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-sky-500"></span> Ecology</span>
                      <span className="text-sm font-mono font-bold text-primary">{ecology}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-rose-500"></span> Healthcare</span>
                      <span className="text-sm font-mono font-bold text-primary">{health}%</span>
                    </div>
                  </div>
                </div>
                
                <div className="relative w-64 h-64 flex items-center justify-center">
                  <div className="absolute inset-0 radar-hex border-2 border-primary/20 bg-primary/5"></div>
                  <div className="absolute inset-4 radar-hex border-2 border-primary/10"></div>
                  <div className="absolute inset-8 radar-hex border-2 border-primary/5"></div>
                  
                  {/* Category Icons */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 flex flex-col items-center">
                    <span className="material-symbols-outlined text-emerald-600 scale-75" data-icon="forest" style={{ fontVariationSettings: "'FILL' 1" }}>forest</span>
                  </div>
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center">
                    <span className="material-symbols-outlined text-blue-600 scale-75" data-icon="directions_bus" style={{ fontVariationSettings: "'FILL' 1" }}>directions_bus</span>
                  </div>
                  <div className="absolute top-[25%] left-2 flex flex-col items-center">
                    <span className="material-symbols-outlined text-rose-600 scale-75" data-icon="medical_services" style={{ fontVariationSettings: "'FILL' 1" }}>medical_services</span>
                  </div>
                  <div className="absolute top-[25%] right-2 flex flex-col items-center">
                    <span className="material-symbols-outlined text-amber-600 scale-75" data-icon="school" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
                  </div>
                  <div className="absolute bottom-[30%] right-4 flex flex-col items-center">
                    <span className="material-symbols-outlined text-sky-600 scale-75" data-icon="shopping_cart" style={{ fontVariationSettings: "'FILL' 1" }}>shopping_cart</span>
                  </div>
                  
                  {/* Dynamic SVG Polygon (Pentagon) */}
                  <svg className="w-full h-full drop-shadow-2xl" viewBox="0 0 100 100">
                    {/* Points: Ecology (Top), Education (Right-Top), Commerce (Right-Bottom), Mobility (Bottom), Health (Left) */}
                    <polygon 
                      fill="rgba(16, 185, 129, 0.4)" 
                      points={`
                        50,${50 - (ecology * 0.4)} 
                        ${50 + (education * 0.4)},${50 - (education * 0.2)} 
                        ${50 + (commerce * 0.4)},${50 + (commerce * 0.3)} 
                        50,${50 + (mobility * 0.4)} 
                        ${50 - (health * 0.4)},${50 - (health * 0.2)}
                      `} 
                      stroke="#006c49" 
                      strokeWidth="2"
                    ></polygon>
                  </svg>
                </div>
              </div>
            </div>

            {/* Second Row: Amenities Proximity & Map */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Amenities Proximity Card */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm border-l-4 border-primary h-full">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-bold text-on-surface">Amenities Proximity</h3>
                    <span className="text-[10px] font-bold px-3 py-1 bg-primary/10 text-primary rounded-full uppercase tracking-tighter">Live Scan</span>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      { key: 'groceries', label: 'Supermarket', icon: 'shopping_cart', desc: 'Closest Option' },
                      { key: 'transport', label: 'Transport Hub', icon: 'train', desc: 'District Hub' },
                      { key: 'healthcare', label: 'Healthcare', icon: 'medical_services', desc: 'Medical Center' },
                      { key: 'parks', label: 'Local Park', icon: 'park', desc: 'Green Reserve' },
                      { key: 'education', label: 'Education', icon: 'school', desc: 'Education Zone' }
                    ].map(item => (
                      <div 
                        key={item.key} 
                        onClick={() => toggleCategory(item.key)}
                        className={`group flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all ${selectedCategory === item.key ? 'bg-primary text-white scale-105 shadow-lg' : 'bg-surface-container-low hover:bg-primary/10'}`}
                      >
                        <div className="flex items-center gap-4">
                          <span className={`material-symbols-outlined ${selectedCategory === item.key ? 'text-white' : 'text-primary'}`} data-icon={item.icon}>{item.icon}</span>
                          <div>
                            <p className="text-sm font-bold">{item.label}</p>
                            <p className={`text-[10px] ${selectedCategory === item.key ? 'text-white/70' : 'opacity-70'}`}>{item.desc}</p>
                          </div>
                        </div>
                        <span className="font-mono font-bold text-sm">
                          {getClosestDistance(item.key)}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <button className="w-full mt-8 py-3 text-sm font-bold text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center gap-2">
                    View Detailed Analysis
                    <span className="material-symbols-outlined text-lg" data-icon="arrow_forward">arrow_forward</span>
                  </button>
                </div>
              </div>

              {/* Enhanced Interactive Amenities Map */}
              <div className="lg:col-span-8 relative rounded-xl overflow-hidden shadow-xl bg-slate-900 h-[500px] flex flex-col md:flex-row">
                {/* Left Side: Amenities List & Proximity */}
                <div className="w-full md:w-72 bg-slate-800/80 backdrop-blur-xl border-r border-slate-700/50 p-6 z-10 overflow-y-auto scrollbar-hide">
                  <div className="mb-6">
                    <h4 className="text-white font-bold text-lg flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-xl" data-icon="location_on">location_on</span>
                      Postcode: {postcode.split(' ')[0]}
                    </h4>
                    <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest mt-1">District Overview</p>
                  </div>
                  
                  <div className="space-y-5">
                    <div>
                      <p className="text-primary-fixed-dim text-[10px] font-bold uppercase mb-3">Found Amenities</p>
                      <div className="space-y-3">
                        {[
                          { key: 'groceries', label: 'Groceries', icon: 'shopping_cart', color: 'blue' },
                          { key: 'transport', label: 'Transport', icon: 'directions_bus', color: 'amber' },
                          { key: 'healthcare', label: 'Healthcare', icon: 'medical_services', color: 'rose' },
                          { key: 'parks', label: 'Parks', icon: 'park', color: 'emerald' },
                          { key: 'education', label: 'Education', icon: 'school', color: 'orange' }
                        ].map(item => (
                          <div 
                            key={item.key} 
                            onClick={() => toggleCategory(item.key)}
                            className={`flex items-center justify-between p-2 rounded-lg border cursor-pointer transition-all ${selectedCategory === item.key ? 'bg-primary border-primary ring-2 ring-primary/50' : 'bg-slate-700/30 border-slate-600/20 hover:bg-slate-700/50'}`}
                          >
                            <div className="flex items-center gap-3">
                              <span className={`material-symbols-outlined text-${item.color}-400 text-lg`} data-icon={item.icon}>{item.icon}</span>
                              <span className="text-xs text-white font-medium">{item.label}</span>
                            </div>
                            <span className={`text-[10px] font-mono text-${item.color}-300`}>{categories[item.key]?.amenities_found || 0}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side: The Map Area */}
                <div className="flex-grow relative group" style={{ zIndex: 0 }}>
                  <Map categories={categories} coordinates={coordinates} selectedAmenity={selectedAmenity} selectedCategory={selectedCategory} />
                </div>
              </div>
            </div>
            {/* Third Row: Detailed Amenity List */}
            <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm border border-emerald-100/50">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-on-surface">Detailed District Inventory</h3>
                  <p className="text-on-surface-variant text-sm mt-1">Full breakdown organized by proximity (Closest to Farthest).</p>
                </div>
                <div className="flex gap-2">
                   {(selectedCategory || selectedAmenity) && (
                     <button onClick={() => { setSelectedCategory(null); setSelectedAmenity(null); }} className="px-4 py-2 bg-rose-50 text-rose-600 rounded-full text-xs font-bold border border-rose-100 hover:bg-rose-100 transition-colors">
                       Clear Filter
                     </button>
                   )}
                   <span className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold border border-emerald-100 flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Live Sync Active
                   </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {Object.keys(categories).map(catKey => (
                  <div key={catKey} className={`flex flex-col gap-4 p-4 rounded-xl transition-all ${selectedCategory === catKey ? 'bg-primary/5 ring-2 ring-primary/20 scale-[1.02]' : ''}`}>
                    <div onClick={() => toggleCategory(catKey)} className="flex items-center justify-between border-b border-emerald-50 pb-2 cursor-pointer group">
                      <h4 className="text-sm font-extrabold uppercase tracking-widest text-primary flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                        {catKey === 'groceries' && <span className="material-symbols-outlined text-lg" data-icon="shopping_cart">shopping_cart</span>}
                        {catKey === 'healthcare' && <span className="material-symbols-outlined text-lg" data-icon="medical_services">medical_services</span>}
                        {catKey === 'transport' && <span className="material-symbols-outlined text-lg" data-icon="directions_bus">directions_bus</span>}
                        {catKey === 'education' && <span className="material-symbols-outlined text-lg" data-icon="school">school</span>}
                        {catKey === 'parks' && <span className="material-symbols-outlined text-lg" data-icon="forest">forest</span>}
                        {catKey}
                      </h4>
                      <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {categories[catKey].amenities_found}
                      </span>
                    </div>
                    
                    <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                      {(categories[catKey].amenities_list || []).length > 0 ? (
                        [...(categories[catKey].amenities_list || [])]
                          .sort((a, b) => a.distance_km - b.distance_km)
                          .map((am, i) => (
                            <div 
                              key={i} 
                              onClick={() => toggleAmenity(am)}
                              className={`group p-3 rounded-lg border transition-all cursor-pointer ${selectedAmenity?.lat === am.lat && selectedAmenity?.lon === am.lon ? 'bg-primary text-white border-primary shadow-md' : 'bg-surface-container-low hover:bg-white border-transparent hover:border-emerald-100'}`}
                            >
                              <p className={`text-xs font-bold line-clamp-1 ${selectedAmenity?.lat === am.lat && selectedAmenity?.lon === am.lon ? 'text-white' : 'text-on-surface'}`}>{am.name}</p>
                              <div className="flex items-center justify-between mt-1">
                                <span className={`text-[10px] font-medium ${selectedAmenity?.lat === am.lat && selectedAmenity?.lon === am.lon ? 'text-white/80' : 'text-on-surface-variant'}`}>{(am.distance_km * 1000).toFixed(0)}m away</span>
                                <span className={`text-[10px] font-mono font-bold ${selectedAmenity?.lat === am.lat && selectedAmenity?.lon === am.lon ? 'text-white' : 'text-primary'} group-hover:scale-110 transition-transform`}>XP {am.score.toFixed(1)}</span>
                              </div>
                            </div>
                          ))
                      ) : (
                        <div className="py-10 flex flex-col items-center justify-center opacity-30 text-center">
                          <span className="material-symbols-outlined text-3xl mb-2">inventory_2</span>
                          <p className="text-[10px] font-bold uppercase">No Assets Found</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Shell (Full Width) */}
          <footer className="w-full py-12 px-8 bg-slate-900 dark:bg-black flex flex-col items-center gap-6 md:grid md:grid-cols-3 border-t border-slate-800">
            <div className="flex flex-col items-center md:items-start">
              <Link to="/">
                <img alt="15 Minute City Logo" className="h-16 w-auto object-contain mb-2 hover:scale-105 transition-transform brightness-0 invert" src="/footer-logo.png" />
              </Link>
              <div className="text-emerald-400 font-bold text-xl tracking-tight uppercase">15 MINUTE CITY</div>
              <div className="text-slate-500 text-xs mt-1">Built by <a href="https://www.linkedin.com/in/arman-shk/" target="_blank" rel="noopener noreferrer" className="font-bold text-[#10b981] hover:underline">Arman</a></div>
            </div>
            <div className="flex flex-wrap justify-center gap-8">
              <Link className="text-sm font-medium uppercase tracking-widest text-slate-400 hover:text-emerald-300 transition-colors underline-offset-4 hover:underline" to="/privacy">Privacy</Link>
              <Link className="text-sm font-medium uppercase tracking-widest text-slate-400 hover:text-emerald-300 transition-colors underline-offset-4 hover:underline" to="/terms">Terms</Link>
              <Link className="text-sm font-medium uppercase tracking-widest text-slate-400 hover:text-emerald-300 transition-colors underline-offset-4 hover:underline" to="/contact">Contact</Link>
            </div>
            <div className="text-slate-400 text-sm font-medium uppercase tracking-widest md:text-right">
              © 2026 15 MINUTES CITY. ALL RIGHTS RESERVED.
            </div>
          </footer>
        </div>
      </div>

      {/* FAB Removed */}
    </>
  );
};

export default Dashboard;
