import React from 'react';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
  return (
    <>
      

<nav className="fixed top-0 w-full z-50 backdrop-blur-xl shadow-2xl shadow-emerald-900/10 flex justify-between items-center px-8 h-20 w-full max-w-none" style={{"backgroundColor":"#10b981"}}>
<img alt="15 Minute City Logo" className="h-20 w-auto object-contain hover:scale-110 transition-transform duration-300 cursor-pointer" src="/logo.png"/>
<div className="hidden md:flex items-center gap-8">
<Link className="text-white font-bold border-b-2 border-white pb-1 hover:scale-105 transition-all duration-300" to="/">Home</Link>
<Link className="text-emerald-50/80 hover:text-white transition-colors hover:scale-105 duration-300" to="/about">About</Link>
</div>
<div className="flex items-center gap-4">
<button className="material-symbols-outlined text-white text-2xl hover:scale-105 transition-all">language</button>
<button className="bg-white text-primary px-6 py-2 rounded-full font-bold hover:scale-105 active:scale-95 transition-all shadow-lg">Sign In</button>
</div>
</nav>
<main className="max-w-4xl mx-auto px-6 md:px-12 py-32">

<header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-12">
<div className="max-w-2xl">
<h1 className="text-[3.5rem] font-bold leading-none tracking-tight text-on-surface">
                Terms of <span className="text-primary">Service</span>
</h1>
</div>
<div className="text-right">
<p className="text-sm font-semibold text-on-surface-variant uppercase tracking-widest">Last Updated</p>
<p className="text-2xl font-bold text-primary">April 07, 2026</p>
</div>
</header>

<div className="space-y-24 pb-32">

<section className="scroll-mt-32" id="acceptance">
<div className="flex flex-col gap-6">
<h2 className="text-[1.75rem] font-semibold text-on-surface flex items-center gap-4">
<span className="material-symbols-outlined text-primary text-3xl p-3 bg-surface-container-low rounded-2xl">verified_user</span>
                    01. Acceptance of Terms
                </h2>
<div className="bg-surface-container-lowest p-8 md:p-12 rounded-3xl space-y-6 text-on-surface-variant leading-loose border-l-4 border-primary shadow-sm">
<p>
                        By accessing or using the <span className="font-bold text-on-surface">UrbanGrid</span> platform, including our mobile applications, web portals, and 15-minute city infrastructure services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you are prohibited from using our services.
                    </p>
<p>
                        We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to this page. Continued use of the platform after changes implies your acceptance of the new terms. We encourage you to review this page periodically to stay informed about your rights and obligations.
                    </p>
</div>
</div>
</section>

<section className="scroll-mt-32" id="responsibilities">
<div className="flex flex-col gap-6">
<h2 className="text-[1.75rem] font-semibold text-on-surface flex items-center gap-4">
<span className="material-symbols-outlined text-primary text-3xl p-3 bg-surface-container-low rounded-2xl">groups</span>
                    02. User Responsibilities
                </h2>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
<div className="bg-surface-container p-8 rounded-3xl hover:bg-surface-container-high transition-colors">
<span className="material-symbols-outlined text-primary mb-4" style={{"fontVariationSettings":"'FILL' 1"}}>person_pin_circle</span>
<h3 className="text-lg font-bold text-on-surface mb-2">Account Integrity</h3>
<p className="text-sm text-on-surface-variant leading-relaxed">Users are responsible for maintaining the confidentiality of their login credentials and all activities occurring under their UrbanGrid account.</p>
</div>
<div className="bg-surface-container p-8 rounded-3xl hover:bg-surface-container-high transition-colors">
<span className="material-symbols-outlined text-primary mb-4" style={{"fontVariationSettings":"'FILL' 1"}}>eco</span>
<h3 className="text-lg font-bold text-on-surface mb-2">Sustainable Conduct</h3>
<p className="text-sm text-on-surface-variant leading-relaxed">All users agree to use city resources in a manner that aligns with our sustainability goals and does not intentionally harm the local ecosystem.</p>
</div>
<div className="bg-surface-container p-8 rounded-3xl hover:bg-surface-container-high transition-colors md:col-span-2">
<h3 className="text-lg font-bold text-on-surface mb-4">Prohibited Actions</h3>
<ul className="space-y-4 text-sm text-on-surface-variant">
<li className="flex items-center gap-3">
<span className="material-symbols-outlined text-error text-sm">block</span>
                                Circumventing any technological measure implemented by UrbanGrid.
                            </li>
<li className="flex items-center gap-3">
<span className="material-symbols-outlined text-error text-sm">block</span>
                                Harassing or disrupting the 15-minute city experience for other residents.
                            </li>
<li className="flex items-center gap-3">
<span className="material-symbols-outlined text-error text-sm">block</span>
                                Uploading malicious code or attempting to breach our data infrastructure.
                            </li>
</ul>
</div>
</div>
</div>
</section>

<section className="scroll-mt-32" id="liability">
<div className="flex flex-col gap-6">
<h2 className="text-[1.75rem] font-semibold text-on-surface flex items-center gap-4">
<span className="material-symbols-outlined text-primary text-3xl p-3 bg-surface-container-low rounded-2xl">gavel</span>
                    03. Limitations of Liability
                </h2>
<div className="bg-white p-12 rounded-3xl shadow-2xl shadow-emerald-900/5 space-y-8">
<p className="text-on-surface-variant leading-loose italic border-l-2 border-emerald-100 pl-6">
                        "UrbanGrid provides its services on an 'as-is' and 'as-available' basis. We make no warranties, expressed or implied, regarding the continuous availability or absolute accuracy of our urban data modeling."
                    </p>
<div className="text-sm text-on-surface-variant space-y-6">
<p>
                            To the maximum extent permitted by law, <span className="font-bold">UrbanGrid</span>, its directors, employees, and partners shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
                        </p>
<p>
                            Our platform integrates with third-party urban mobility and utility services. We do not control these services and cannot be held responsible for their uptime, performance, or privacy practices.
                        </p>
</div>
</div>
</div>
</section>

<section className="bg-primary p-12 rounded-3xl text-on-primary flex flex-col md:flex-row items-center justify-between gap-8">
<div className="max-w-md">
<h2 className="text-2xl font-bold mb-2">Have legal questions?</h2>
<p className="opacity-80">Our legal and governance team is ready to assist you with any clarifications regarding these terms.</p>
</div>
<button className="bg-on-primary text-primary px-10 py-4 rounded-full font-bold hover:scale-[1.05] transition-transform shadow-xl">
                Contact Support
            </button>
</section>
</div>
</main>

<footer className="w-full py-12 px-8 bg-slate-900 dark:bg-black flex flex-col items-center gap-6 w-full md:grid md:grid-cols-3">
<div className="flex flex-col items-center md:items-start">
<div className="text-emerald-400 font-bold text-xl tracking-tight">15 MINUTE CITY</div>
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

export default TermsOfService;
