import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md shadow-lg flex justify-between items-center px-4 md:px-12 h-20" style={{ backgroundColor: '#10b981' }}>
        <Link to="/" onClick={() => setIsMenuOpen(false)}>
          <img alt="15 Minute City Logo" className="h-16 md:h-20 w-auto object-contain hover:scale-110 transition-transform duration-300 cursor-pointer" src="/logo.png" />
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link className="text-emerald-50/80 hover:text-white transition-colors hover:scale-105 duration-300 font-semibold" to="/">Home</Link>
          <Link className="text-white border-b-2 border-white pb-1 transition-colors hover:scale-105 duration-300 font-semibold" to="/about">About</Link>
          <Link className="text-emerald-50/80 hover:text-white transition-colors hover:scale-105 duration-300 font-semibold" to="/contact">Contact</Link>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <button className="material-symbols-outlined text-white text-2xl hover:scale-105 transition-all">language</button>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden material-symbols-outlined text-white text-3xl p-1"
          >
            {isMenuOpen ? 'close' : 'menu'}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 top-20 bg-emerald-600 z-40 md:hidden flex flex-col p-8 gap-6 animate-fade-in-up">
            <Link className="text-white text-2xl font-bold border-b border-white/20 pb-4" to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link className="text-emerald-50 text-2xl font-bold border-b border-white/20 pb-4" to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
            <Link className="text-emerald-50 text-2xl font-bold border-b border-white/20 pb-4" to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
            <Link className="text-emerald-50 text-2xl font-bold border-b border-white/20 pb-4" to="/terms" onClick={() => setIsMenuOpen(false)}>Terms</Link>
            <Link className="text-emerald-50 text-2xl font-bold border-b border-white/20 pb-4" to="/privacy" onClick={() => setIsMenuOpen(false)}>Privacy</Link>
          </div>
        )}
      </nav>
      <main className="pt-32">

        <section className="px-6 md:px-12 max-w-screen-2xl mx-auto mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center lg:items-end">
            <div className="lg:col-span-7">
              <h1 className="text-4xl md:text-[3.5rem] leading-[1.1] font-bold text-on-surface tracking-tighter mb-8">
                The world is better <br />
                <span className="text-primary">at human scale.</span>
              </h1>
              <p className="text-lg md:text-xl text-on-surface-variant max-w-xl leading-relaxed">Urban life is being redesigned around the principle that essential needs—work, grocery, education, and health—should be accessible within a 15-minute walk or bike ride from home.</p>
            </div>
            <div className="lg:col-span-5 flex justify-end">
              <div className="w-full h-[300px] md:h-[400px] bg-surface-container rounded-3xl overflow-hidden relative shadow-xl">
                <img className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" data-alt="Modern sustainable urban street with lush greenery, bicycle lanes, and people walking in a clean European city environment" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDd46SK6nIGinsZWuwtwHZ_cQedkgG4k2VAMxBsTh_xjLCJc6A_koJMy_h3BN8O-_WdByglNCgBoVrt9_yv1YA859YWE7FNunx5rZGKAroZXKabbHHq_jKdBnE0r074RXo9272LZmuBSj0PE65FieuoSgCO_d5eNC8TzadZqc-l7snEr5eEJ_TJ1tglFkNOhQV0WlwElvyzw_FzrZCRo_CgkRTDQaegFSw8MQzgg_5DupAfK5hOXd4r-UD6uCBCrkN22auPH2RL6M" />
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 md:px-12 max-w-screen-2xl mx-auto mb-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <div className="bg-surface-container-lowest p-8 md:p-10 rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,33,21,0.06)] flex flex-col justify-between aspect-auto md:aspect-square group hover:bg-primary transition-all duration-500 gap-6">
              <div className="flex flex-col gap-6">
                <span className="material-symbols-outlined text-primary text-4xl group-hover:text-on-primary transition-colors" data-icon="directions_walk">directions_walk</span>
                <h3 className="text-2xl font-bold group-hover:text-on-primary transition-colors">Accessibility</h3>
                <p className="text-on-surface-variant group-hover:text-on-primary/80 transition-colors">The dependence on cars is reduced by creating dense, mixed-use neighborhoods where essential services are localized.</p>
              </div>
              <div className="h-1 w-12 bg-primary group-hover:bg-on-primary transition-colors"></div>
            </div>

            <div className="bg-surface-container-low p-8 md:p-10 rounded-2xl flex flex-col justify-between aspect-auto md:aspect-square border-none relative overflow-hidden group gap-6">
              <div className="z-10 flex flex-col gap-6">
                <span className="material-symbols-outlined text-primary text-4xl" data-icon="eco">eco</span>
                <h3 className="text-2xl font-bold">Sustainability</h3>
                <p className="text-on-surface-variant">Carbon footprints are lowered through active transport and optimized logistics within urban micro-hubs.</p>
              </div>
              <img className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity" data-alt="abstract close up of green leaves with sunlight filtering through, clean and organic aesthetic" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGLjCt5Ickc42rvSQCbQKuGk0B-ekK9LkI_9YC3QXPtdBQtoG6-MBSuJzuaFZ00rnN3Qr-o0d04fgXI6n3V9OB5l5EabvmCIZV_Ztes_65Oq3b2OCL0N2g_SAEA-Gh3nX88_6neuYtwJNF9bHklcuxnWiltIu6qOQ552n-YfcSkX7mKHVm3pfvnVnZICBO9ZDdOigvMykZKfDKXBjXuaZJlhntmiTHqjI8G0jLAhDZ46g4bHqWsdhxRRTidVLj4sWeHIB4RSg0Jog" />
            </div>

            <div className="bg-surface-container-high p-8 md:p-10 rounded-2xl flex flex-col justify-between aspect-auto md:aspect-square gap-6">
              <div className="flex flex-col gap-6">
                <span className="material-symbols-outlined text-primary text-4xl" data-icon="diversity_3">diversity_3</span>
                <h3 className="text-2xl font-bold">Community</h3>
                <p className="text-on-surface-variant">Social ties are strengthened by reclaiming street space for people, parks, and shared public experiences.</p>
              </div>
              <div className="flex -space-x-4">
                <div className="w-12 h-12 rounded-full border-4 border-surface-container-high bg-slate-200 overflow-hidden">
                  <img alt="User" data-alt="portrait of a smiling young professional man in a bright urban setting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDT2-qDk-0Lmqh43og6Aha_GySDQm074_ZMhqx01DZ4mx1sjITA8AejEqXO_EVGZKMoyEhSQCJ3ks4GXRQJQJGoTNkxomOiOVquAnU4wysASYGZ4vo9zUFxiqX5DeaFUZabgtuxfVT0LUPdvTbeDg3aycXtzVE0EASEamjWWOcTfGZ59N_FJCCfGJPWUSatar3Hi0nWCUkkg4segra7_AgrsoCyeV02UzOPYnO6OOWkVqkKJkDRZpRmCUb0ykBumxpKlVyJm7TT6k0" />
                </div>
                <div className="w-12 h-12 rounded-full border-4 border-surface-container-high bg-slate-300 overflow-hidden">
                  <img alt="User" data-alt="portrait of a smiling woman outdoors in a city park" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnhZsdnTEr80p1gsE_fDTEMBAZiAbxwMtzCSyQu1lyEucqhTSB-55KNxfJY7v311E_Oo-kw5HmjnSuSK745Amfy7sQeq2t1ui38K7hdeyuorCjen7GuArFKfqniasH8w-Bjk94zRZ4Hc87goG_nxP34ABcXsCxOZ_eV69XQjs6EBYmsSG5h_qQa7PHUr-5H_c8VhQw-5NPHxP0VDmtt___waKoXiuv9vS7H2T0UPN7CXi1cwQtSIZ0jzKIJQ3jcDfr_3XHDYiqE5Q" />
                </div>
                <div className="w-12 h-12 rounded-full border-4 border-surface-container-high bg-slate-400 overflow-hidden flex items-center justify-center text-xs font-bold text-primary bg-primary-fixed">
                  +12k
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-24">
          <div className="px-6 md:px-12 max-w-screen-2xl mx-auto">
            <div className="flex flex-col md:flex-row gap-12 md:gap-20">
              <div className="md:w-1/3">
                <p className="text-sm font-bold uppercase tracking-widest text-primary mb-4">Our Methodology</p>
                <h2 className="text-2xl md:text-3xl font-bold text-on-surface">Data-Driven Urbanism</h2>
              </div>
              <div className="md:w-2/3 space-y-8">
                <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed">Advanced geospatial analysis is utilized to map the accessibility of cities worldwide. Proximity of residential zones is measured against six essential pillars: social functions, living, working, supplying, caring, learning, and enjoying.</p>
                <div className="grid grid-cols-2 gap-8 pt-8">
                  <div>
                    <div className="text-3xl md:text-4xl font-bold text-primary mb-2">84%</div>
                    <p className="text-xs md:text-sm font-medium text-slate-500">Reduction in local CO2 emissions within 15-minute pilot zones.</p>
                  </div>
                  <div>
                    <div className="text-3xl md:text-4xl font-bold text-primary mb-2">2.4x</div>
                    <p className="text-xs md:text-sm font-medium text-slate-500">Increase in local business revenue through pedestrian traffic.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 md:px-12 max-w-screen-2xl mx-auto my-32">
          <div className="bg-primary rounded-3xl p-8 md:p-16 text-center text-on-primary relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to see your city?</h2>
              <p className="text-on-primary/80 mb-10 max-w-xl mx-auto text-base md:text-lg">Thousands of urban planners and citizens utilize the platform to advocate for more livable streets.</p>
              <Link to="/">
                <button className="bg-surface-container-lowest text-primary px-10 py-4 rounded-full font-bold hover:scale-105 transition-transform shadow-2xl">
                  Launch Map Analytics
                </button>
              </Link>
            </div>

            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400/20 rounded-full -mr-20 -mt-20 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-300/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>
          </div>
        </section>
      </main>

      <footer className="w-full py-12 px-8 bg-slate-900 dark:bg-black flex flex-col items-center gap-6 w-full md:grid md:grid-cols-3">
        <div className="flex flex-col items-center md:items-start">
          <Link to="/">
            <img alt="15 Minute City Logo" className="h-16 w-auto object-contain mb-2 hover:scale-105 transition-transform brightness-0 invert" src="/footer-logo.png" />
          </Link>
          <div className="text-emerald-400 font-bold text-xl tracking-tight uppercase">15 MINUTE CITY</div>
          <div className="text-slate-500 text-xs mt-1">Built by <a href="https://linkedin.com/in/arman-shk/" target="_blank" rel="noopener noreferrer" className="text-[#10b981] font-bold hover:underline">Arman</a></div>
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
    </>
  );
};

export default AboutUs;
