import React from 'react';
import { Link } from 'react-router-dom';

const ContactUs = () => {
  return (
    <>
      

<nav className="fixed top-0 w-full z-50 backdrop-blur-xl shadow-2xl shadow-emerald-900/10 flex justify-between items-center px-8 h-20 bg-[#10b981]">
<div className="flex items-center gap-8">
<img alt="15 Minute City Logo" className="h-24 w-auto object-contain hover:scale-105 transition-transform duration-300 cursor-pointer" src="/logo.png"/>
<div className="hidden md:flex items-center gap-8">
<Link className="text-white font-bold border-b-2 border-white pb-1 hover:scale-105 transition-all duration-300" to="/">Home</Link>
<Link className="text-emerald-50/80 hover:text-white transition-colors hover:scale-105 duration-300" to="/about">About</Link>
</div>
</div>
<div className="flex items-center gap-4">
<button className="material-symbols-outlined text-white text-2xl hover:scale-105 transition-all">language</button>
<button className="bg-white text-primary px-6 py-2 rounded-full font-bold hover:scale-105 active:scale-95 transition-all shadow-lg">Sign In</button>
</div>
</nav>
<main className="flex-grow max-w-[1440px] mx-auto px-12 pt-32 pb-32">

<section className="mb-24 flex flex-col md:flex-row gap-12 items-center">
<div className="flex-1">
<h1 className="text-[3.5rem] font-bold tracking-tight text-on-surface leading-[1.1]">
                Let's Build the <br/>
<span className="text-primary italic">Living Grid</span> Together.
            </h1>
</div>
<div className="w-full md:w-1/3 aspect-square bg-surface-container-low rounded-3xl overflow-hidden relative group">
<div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent z-10"></div>
<img alt="Urban planning illustration" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="clean modern architectural shot of a green city intersection with trees and pedestrian pathways at bright daylight" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAB3rT-nN64FNE6Ir7hb3ZjgHdMBJn3aGpTwcRi0dO2K0DTJIu2hQ68OOVhRFsT8ba8TLYeEWvMqXFdlfs6JDG5UTAZ4yAW9J2wf_Uk1R7Z2K76sF3AyWOsGvL33fOLa6O6hMb39EhPSZSFJjUGJiqejkIEcsdTyJQSn28jCzncts56PaWr7YDbk5kBI9Z4ZLJwnIzHCHWiXjjesLqOGU8XpjOajbd78YhWVH697xh5fvtKgcPiJnKsIsSLOQyNulO8Llkx4MvQZU"/>
</div>
</section>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

<div className="lg:col-span-7 bg-surface-container-low p-10 rounded-3xl">
<form className="space-y-8">
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
<div className="space-y-2">
<label className="text-xs font-semibold tracking-widest uppercase text-on-surface-variant px-2">Full Name</label>
<input className="w-full h-16 bg-surface-container-lowest border-none rounded-2xl px-6 focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-on-surface-variant/30 text-on-surface" placeholder="John Doe" type="text"/>
</div>
<div className="space-y-2">
<label className="text-xs font-semibold tracking-widest uppercase text-on-surface-variant px-2">Email Address</label>
<input className="w-full h-16 bg-surface-container-lowest border-none rounded-2xl px-6 focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-on-surface-variant/30 text-on-surface" placeholder="john@urban-grid.io" type="email"/>
</div>
</div>
<div className="space-y-2">
<label className="text-xs font-semibold tracking-widest uppercase text-on-surface-variant px-2">Subject</label>
<select className="w-full h-16 bg-surface-container-lowest border-none rounded-2xl px-6 focus:ring-4 focus:ring-primary/10 transition-all text-on-surface appearance-none">
<option>Urban Planning Inquiry</option>
<option>Sustainability Partnership</option>
<option>Platform Technical Support</option>
<option>Media &amp; PR</option>
</select>
</div>
<div className="space-y-2">
<label className="text-xs font-semibold tracking-widest uppercase text-on-surface-variant px-2">Message</label>
<textarea className="w-full bg-surface-container-lowest border-none rounded-2xl p-6 focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-on-surface-variant/30 text-on-surface resize-none" placeholder="How can we help reshape your city?" rows="6"></textarea>
</div>
<button className="w-full md:w-auto px-12 h-16 bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-full font-bold text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all" type="submit">
                    Send Message
                </button>
</form>
</div>

<div className="lg:col-span-5 space-y-12">

<div className="bg-surface-container-highest p-10 rounded-3xl space-y-10">
<div className="flex items-start gap-6">
<div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
<span className="material-symbols-outlined">alternate_email</span>
</div>
<div>
<h4 className="font-bold text-lg text-on-surface mb-1">Electronic Mail</h4>
<p className="text-on-surface-variant">hello@urbangrid.city</p>
<p className="text-on-surface-variant text-sm mt-1">Response within 24 hours</p>
</div>
</div>
<div className="flex items-start gap-6">
<div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
<span className="material-symbols-outlined">location_on</span>
</div>
<div>
<h4 className="font-bold text-lg text-on-surface mb-1">Urban Headquarters</h4>
<p className="text-on-surface-variant">London, United Kingdom</p>
</div>
</div>
</div>

<div className="space-y-6">
<h3 className="text-sm font-bold tracking-widest uppercase text-on-surface-variant">Connect with me:</h3>
                    <div className="grid grid-cols-3 gap-6">
                    <a className="group bg-surface-container-low p-6 rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-primary hover:text-white transition-all duration-300" href="https://www.linkedin.com/in/arman-shk/" target="_blank" rel="noopener noreferrer">
                      <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">public</span>
                      <span className="text-[10px] font-bold tracking-widest uppercase text-center">LinkedIn</span>
                    </a>
                    <a className="group bg-surface-container-low p-6 rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-primary hover:text-white transition-all duration-300" href="https://arman-shk.vercel.app/" target="_blank" rel="noopener noreferrer">
                      <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">person</span>
                      <span className="text-[10px] font-bold tracking-widest uppercase text-center">Portfolio</span>
                    </a>
                    <a className="group bg-surface-container-low p-6 rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-primary hover:text-white transition-all duration-300" href="https://github.com/arman-shk" target="_blank" rel="noopener noreferrer">
                      <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">code</span>
                      <span className="text-[10px] font-bold tracking-widest uppercase text-center">Github</span>
                    </a>
                  </div>
</div>
</div>
</div>
</main>

<footer className="w-full py-12 px-8 bg-slate-900 dark:bg-black flex flex-col items-center gap-6 md:grid md:grid-cols-3">
<div className="flex flex-col items-center md:items-start">
<div className="text-emerald-400 font-bold text-xl tracking-tight uppercase">15 MINUTE CITY</div>
          <div className="text-slate-500 text-xs mt-1">Built by <a href="https://www.linkedin.com/in/arman-shk/" target="_blank" rel="noopener noreferrer" className="font-bold text-emerald-400 hover:underline">Arman</a></div>
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

export default ContactUs;
