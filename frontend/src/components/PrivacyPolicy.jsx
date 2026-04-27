import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <>
      

<nav className="fixed top-0 w-full z-50 backdrop-blur-xl shadow-2xl shadow-emerald-900/10 flex justify-between items-center px-8 h-20 w-full max-w-none" style={{"backgroundColor":"#10b981"}}>
<img alt="15 Minute City Logo" className="w-auto object-contain hover:scale-105 transition-transform duration-300 cursor-pointer h-20" src="/logo.png"/>
<div className="hidden md:flex items-center gap-8">
<Link className="text-emerald-50/80 hover:text-white transition-colors hover:scale-105 duration-300 font-semibold" to="/">Home</Link>
<Link className="text-emerald-50/80 hover:text-white transition-colors hover:scale-105 duration-300 font-semibold" to="/about">About</Link>
</div>
<div className="flex items-center gap-4">
<button className="material-symbols-outlined text-white text-2xl hover:scale-105 transition-all">language</button>
<button className="bg-white text-primary px-6 py-2 rounded-full font-bold hover:scale-105 active:scale-95 transition-all shadow-lg">Sign In</button>
</div>
</nav>
<main className="max-w-[1000px] mx-auto px-6 md:px-12 py-12 md:py-32 min-h-screen">

<header className="mb-20 text-center">
<h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-on-surface mb-8 leading-[1.1]">
                Privacy at the heart of the <span className="text-primary-container">Living Grid</span>.
            </h1>
</header>

<div className="space-y-24">

<section className="scroll-mt-32" id="collection">
<div className="flex items-center gap-4 mb-8">
<div className="w-12 h-12 rounded-2xl bg-primary-container flex items-center justify-center text-on-primary-container">
<span className="material-symbols-outlined">dataset</span>
</div>
<h2 className="text-3xl font-bold tracking-tight text-on-surface">Information Collection</h2>
</div>
<div className="bg-surface-container-lowest rounded-3xl p-8 md:p-12 shadow-sm space-y-6">
<p className="text-lg text-on-surface-variant leading-relaxed">
                        To facilitate the 15-minute city ecosystem, we collect specific data points that allow for optimized urban planning and local service discovery.
                    </p>
<div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
<div className="p-6 rounded-2xl bg-surface">
<h3 className="font-bold text-primary mb-3">Direct Input</h3>
<p className="text-sm text-on-surface-variant">Name, email, and preferred transit modes provided during your UrbanGrid account setup.</p>
</div>
<div className="p-6 rounded-2xl bg-surface">
<h3 className="font-bold text-primary mb-3">Geospatial Data</h3>
<p className="text-sm text-on-surface-variant">Anonymized location pings used to calculate proximity to essential services and amenities.</p>
</div>
</div>
</div>
</section>

<section className="scroll-mt-32" id="usage">
<div className="flex items-center gap-4 mb-8">
<div className="w-12 h-12 rounded-2xl bg-primary-container flex items-center justify-center text-on-primary-container">
<span className="material-symbols-outlined">insights</span>
</div>
<h2 className="text-3xl font-bold tracking-tight text-on-surface">Data Usage</h2>
</div>
<div className="space-y-12">
<p className="text-lg text-on-surface-variant leading-relaxed max-w-3xl">
                        We use your data to create a more livable urban environment. This information is processed to improve infrastructure and personalize your neighborhood experience.
                    </p>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
<div className="flex flex-col gap-4">
<div className="h-1 bg-primary w-12 rounded-full"></div>
<h4 className="font-bold">Grid Optimization</h4>
<p className="text-sm text-on-surface-variant">Analyzing traffic patterns to recommend new pedestrian zones and cycling lanes.</p>
</div>
<div className="flex flex-col gap-4">
<div className="h-1 bg-primary w-12 rounded-full"></div>
<h4 className="font-bold">Local Sourcing</h4>
<p className="text-sm text-on-surface-variant">Connecting users with the closest sustainable merchants and service providers.</p>
</div>
<div className="flex flex-col gap-4">
<div className="h-1 bg-primary w-12 rounded-full"></div>
<h4 className="font-bold">Metric Insights</h4>
<p className="text-sm text-on-surface-variant">Providing you with personal sustainability scores based on your 15-minute radius usage.</p>
</div>
</div>
</div>
</section>

<section className="scroll-mt-32" id="rights">
<div className="flex items-center gap-4 mb-8">
<div className="w-12 h-12 rounded-2xl bg-primary-container flex items-center justify-center text-on-primary-container">
<span className="material-symbols-outlined">gavel</span>
</div>
<h2 className="text-3xl font-bold tracking-tight text-on-surface">User Rights</h2>
</div>
<div className="bg-primary text-white rounded-3xl p-10 shadow-xl shadow-primary/10">
<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
<div>
<h3 className="text-2xl font-bold mb-6">Your Sovereignty</h3>
<p className="opacity-90 leading-relaxed mb-8">
                                In the UrbanGrid ecosystem, you own your data. You have the right to access, rectify, or erase your personal information at any time.
                            </p>
<button className="px-8 py-4 bg-white text-primary rounded-xl font-bold hover:scale-[1.02] transition-transform">
                                Request Data Export
                            </button>
</div>
<ul className="space-y-4">
<li className="flex items-start gap-3">
<span className="material-symbols-outlined text-primary-fixed">check_circle</span>
<span>Right to be forgotten (Permanent Deletion)</span>
</li>
<li className="flex items-start gap-3">
<span className="material-symbols-outlined text-primary-fixed">check_circle</span>
<span>Right to data portability</span>
</li>
<li className="flex items-start gap-3">
<span className="material-symbols-outlined text-primary-fixed">check_circle</span>
<span>Right to object to automated processing</span>
</li>
<li className="flex items-start gap-3">
<span className="material-symbols-outlined text-primary-fixed">check_circle</span>
<span>Right to restrict processing in specific zones</span>
</li>
</ul>
</div>
</div>
</section>

<section className="scroll-mt-32 bg-surface-container-low rounded-3xl p-8 md:p-12" id="security">
<div className="max-w-2xl">
<h2 className="text-2xl font-bold text-on-surface mb-4">Security &amp; Architecture</h2>
<p className="text-on-surface-variant mb-8">
                        We employ AES-256 encryption for all data at rest and TLS 1.3 for all data in transit. Our servers are located in carbon-neutral data centers within the jurisdiction of the EU.
                    </p>
<Link className="inline-flex items-center gap-2 text-primary font-bold hover:underline" to="/privacy">
                        Contact Privacy Officer
                        <span className="material-symbols-outlined">open_in_new</span>
</Link>
</div>
</section>
</div>
</main>

<footer className="w-full py-12 px-8 bg-slate-900 dark:bg-black flex flex-col items-center gap-6 w-full md:grid md:grid-cols-3">
<div className="flex flex-col items-center md:items-start">
<div className="text-emerald-400 font-bold text-xl tracking-tight uppercase">15 MINUTE CITY</div>
<div className="text-slate-500 text-xs mt-1">Built by <span className="font-bold text-emerald-400">Arman</span></div>
</div>
<div className="flex flex-wrap justify-center gap-8">
<Link className="text-sm font-medium Inter uppercase tracking-widest text-slate-400 hover:text-emerald-300 transition-colors underline-offset-4 hover:underline" to="/privacy">Privacy</Link>
<Link className="text-sm font-medium Inter uppercase tracking-widest text-slate-400 hover:text-emerald-300 transition-colors underline-offset-4 hover:underline" to="/terms">Terms</Link>
<Link className="text-sm font-medium Inter uppercase tracking-widest text-slate-400 hover:text-emerald-300 transition-colors underline-offset-4 hover:underline" to="/contact">Contact</Link>
</div>
<div className="text-slate-400 text-sm font-medium Inter uppercase tracking-widest md:text-right">
            © 2026 15 MINUTES CITY. ALL RIGHTS RESERVED.
        </div>
</footer>

    </>
  );
};

export default PrivacyPolicy;
