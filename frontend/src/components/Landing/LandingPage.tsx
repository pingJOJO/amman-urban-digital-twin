import React, { useState } from 'react';
import { ArrowRight, Play, Car, Leaf, BarChart3, Globe } from 'lucide-react';

interface LandingPageProps {
  onExplore: () => void;
  onLaunch: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onExplore, onLaunch }) => {
  const [lang, setLang] = useState<'EN' | 'AR'>('EN');
  const [activeNav, setActiveNav] = useState<'Home' | 'About' | 'Innovation' | 'Projects'>('Home');

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-[#E2F5DD] via-[#EDF9EC] to-[#DCF5DA] text-[#162719] font-sans selection:bg-[#53C2D0] selection:text-white">
      {/* Background Subtle Geometric Network Mesh / Constellations */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-40 mix-blend-multiply">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="mesh-pattern" width="160" height="160" patternUnits="userSpaceOnUse">
              <circle cx="80" cy="80" r="1.5" fill="#4AA883" opacity="0.6" />
              <circle cx="20" cy="30" r="1.5" fill="#4AA883" opacity="0.4" />
              <circle cx="140" cy="120" r="1.5" fill="#4AA883" opacity="0.4" />
              <line x1="80" y1="80" x2="20" y2="30" stroke="#4AA883" strokeWidth="0.5" strokeDasharray="3,3" opacity="0.3" />
              <line x1="80" y1="80" x2="140" y2="120" stroke="#4AA883" strokeWidth="0.5" strokeDasharray="3,3" opacity="0.3" />
              <line x1="140" y1="120" x2="160" y2="160" stroke="#4AA883" strokeWidth="0.5" strokeDasharray="3,3" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#mesh-pattern)" />
        </svg>
      </div>

      {/* Floating Ambient Glow Orbs */}
      <div className="pointer-events-none absolute top-[-10%] right-[10%] w-[500px] h-[500px] rounded-full bg-[#75E2D9]/20 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[10%] left-[5%] w-[450px] h-[450px] rounded-full bg-[#82E69F]/20 blur-[130px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10 lg:px-12 py-6 flex flex-col justify-between min-h-screen">
        {/* ================================================================= */}
        {/* 1. TOP NAVBAR                                                     */}
        {/* ================================================================= */}
        <header className="flex items-center justify-between py-2">
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setActiveNav('Home')}>
            <img
              src="/logo.png"
              alt="Amman Urban Digital Twin Logo"
              className="w-10 h-10 sm:w-11 sm:h-11 object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
            />
            <div className="leading-tight">
              <span className="block text-sm sm:text-[15px] font-bold text-[#142A1D] tracking-tight">
                Amman Urban
              </span>
              <span className="block text-xs sm:text-[12.5px] font-medium text-[#385141] tracking-wide">
                Digital Twin
              </span>
            </div>
          </div>

          {/* Center Navigation Pills */}
          <nav className="hidden md:flex items-center p-1 rounded-full bg-white/40 backdrop-blur-md border border-white/60 shadow-[0_2px_10px_rgba(20,40,25,0.04)]">
            {(['Home', 'About', 'Innovation', 'Projects'] as const).map((item) => (
              <button
                key={item}
                onClick={() => setActiveNav(item)}
                className={`px-5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                  activeNav === item
                    ? 'bg-[#BFE2F8] text-[#142C2A] shadow-sm'
                    : 'text-[#3D5545] hover:text-[#142A1D] hover:bg-white/40'
                }`}
              >
                {item}
              </button>
            ))}
          </nav>

          {/* Right Actions: Lang Switcher & CTA */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => setLang(lang === 'EN' ? 'AR' : 'EN')}
              className="px-2.5 py-1 rounded-md text-xs font-semibold text-[#2D4536] hover:text-[#142A1D] hover:bg-white/40 transition-colors flex items-center gap-1 cursor-pointer"
              title="Toggle Language (EN / AR)"
            >
              <Globe className="w-3.5 h-3.5 text-[#3D7A5C]" />
              <span>{lang === 'EN' ? 'EN | AR' : 'عربي | EN'}</span>
            </button>

            <button
              onClick={onLaunch}
              className="group relative inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-[#44C2D0] to-[#51D3BE] text-[#14261B] text-xs sm:text-[13px] font-bold tracking-tight shadow-[0_4px_16px_rgba(68,194,208,0.35)] hover:shadow-[0_6px_22px_rgba(68,194,208,0.5)] hover:scale-105 active:scale-100 transition-all duration-300 cursor-pointer"
            >
              <span>Launch Experience</span>
              <span className="w-5 h-5 rounded-full bg-[#182B20] text-white flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowRight className="w-3 h-3 stroke-[2.5]" />
              </span>
            </button>
          </div>
        </header>

        {/* ================================================================= */}
        {/* 2. HERO SECTION: "A Smarter Way to Move Amman"                   */}
        {/* ================================================================= */}
        <section className="pt-6 sm:pt-10 lg:pt-12 pb-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 xl:col-span-5 space-y-5 lg:space-y-6 text-left">
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-extrabold tracking-[-0.02em] leading-[1.08] text-[#133020]">
                A Smarter Way to
              </h1>
              <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-extrabold tracking-[-0.02em] leading-[1.08] bg-gradient-to-r from-[#4A72DF] via-[#48C3CB] to-[#7EDF89] bg-clip-text text-transparent pb-1">
                Move Amman
              </h1>
            </div>

            <p className="text-sm sm:text-base text-[#2E4738] font-normal leading-relaxed max-w-md">
              Explore traffic scenarios. Connect urban mobility. Build a greener city.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              {/* PRIMARY CTA: Explore the Digital Twin (Opens Sign In) */}
              <button
                onClick={onExplore}
                id="btnExploreHero"
                className="group inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-[#42C2D0] to-[#55D5BB] text-[#14261B] text-sm font-bold tracking-tight shadow-[0_6px_20px_rgba(66,194,208,0.4)] hover:shadow-[0_8px_26px_rgba(66,194,208,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                <span>Explore the Digital Twin</span>
                <span className="w-6 h-6 rounded-full bg-[#182B20] text-white flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </span>
              </button>

              {/* SECONDARY CTA: Discover Our Vision */}
              <button
                onClick={onExplore}
                className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full border border-[#2D4D37]/30 bg-white/35 backdrop-blur-sm text-[#1A3323] text-sm font-semibold tracking-tight hover:bg-white/65 hover:border-[#2D4D37]/50 active:scale-95 transition-all duration-200 cursor-pointer shadow-sm"
              >
                <span>Discover Our Vision</span>
                <span className="w-5 h-5 rounded-full bg-[#BFE2F8] text-[#1E5D88] flex items-center justify-center">
                  <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                </span>
              </button>
            </div>
          </div>

          {/* Right Visual Column: Robotic Hand Holding Amman Miniature City */}
          <div className="lg:col-span-6 xl:col-span-7 flex justify-center lg:justify-end relative">
            <div className="relative w-full max-w-[560px] lg:max-w-[620px] group">
              {/* Soft ambient backglow behind the phone and city */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#51D3BE]/30 to-[#4A72DF]/20 rounded-full blur-[70px] -z-10 transform scale-90" />

              <img
                src="/hero-city-hand-blended.png"
                alt="Amman Digital Twin on Robotic Hand"
                className="w-full h-auto object-contain drop-shadow-[0_20px_35px_rgba(15,35,22,0.25)] transition-transform duration-700 ease-out group-hover:scale-[1.02] pointer-events-none select-none"
                onError={(e) => {
                  // Fallback to original jpg if blended not found
                  (e.currentTarget as HTMLImageElement).src = '/hero-city-hand.jpg';
                }}
              />
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 3. SECTION 2: REAL-TIME INSIGHTS ("Explore Amman in Real Time")   */}
        {/* ================================================================= */}
        <section className="pt-6 sm:pt-10 pb-6 border-t border-[#B8D8BF]/40 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Illuminated Night Digital Twin View with IoT Telemetry */}
          <div className="lg:col-span-6 xl:col-span-6 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[500px] rounded-[22px] overflow-hidden p-1 bg-gradient-to-b from-white/40 to-white/10 backdrop-blur-md border border-white/60 shadow-[0_16px_36px_rgba(20,40,25,0.12)] group">
              <img
                src="/realtime-insights-blended.png"
                alt="Amman Real Time City Insights"
                className="w-full h-auto rounded-[18px] object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/realtime-insights.jpg';
                }}
              />
            </div>
          </div>

          {/* Right Column: Real-Time Description & Feature Badges */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-4 lg:pl-6 text-left">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-[#2A7650] tracking-[0.12em] uppercase">
                REAL-TIME INSIGHTS
              </span>
              <span className="w-8 h-[1.5px] bg-[#2A7650]/60 inline-block" />
            </div>

            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#142D1E] tracking-tight leading-tight">
                Explore Amman
              </h2>
              <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-[#3FB8C5] to-[#73D890] bg-clip-text text-transparent tracking-tight leading-tight">
                in Real Time
              </h2>
            </div>

            <p className="text-xs sm:text-[13.5px] text-[#334D3D] leading-relaxed max-w-lg font-normal">
              Visualize traffic flow, test scenarios, and make smarter decisions for a more connected, sustainable Amman.
            </p>

            {/* 3 Feature Badges */}
            <div className="grid grid-cols-3 gap-3 pt-3">
              {/* Feature 1: Traffic Management */}
              <div
                onClick={onExplore}
                className="p-3 rounded-xl bg-white/45 backdrop-blur-sm border border-white/70 hover:bg-white/80 hover:scale-105 transition-all duration-200 cursor-pointer text-center group shadow-sm"
              >
                <div className="w-9 h-9 mx-auto rounded-full bg-[#D6F3E0] flex items-center justify-center text-[#266F4A] mb-1.5 group-hover:bg-[#44C2D0] group-hover:text-white transition-colors">
                  <Car className="w-4 h-4 stroke-[2.2]" />
                </div>
                <h4 className="text-[11.5px] font-bold text-[#14261B] leading-tight">
                  Traffic Management
                </h4>
              </div>

              {/* Feature 2: Greener Mobility */}
              <div
                onClick={onExplore}
                className="p-3 rounded-xl bg-white/45 backdrop-blur-sm border border-white/70 hover:bg-white/80 hover:scale-105 transition-all duration-200 cursor-pointer text-center group shadow-sm"
              >
                <div className="w-9 h-9 mx-auto rounded-full bg-[#D6F3E0] flex items-center justify-center text-[#266F4A] mb-1.5 group-hover:bg-[#73D890] group-hover:text-[#14261B] transition-colors">
                  <Leaf className="w-4 h-4 stroke-[2.2]" />
                </div>
                <h4 className="text-[11.5px] font-bold text-[#14261B] leading-tight">
                  Greener Mobility
                </h4>
              </div>

              {/* Feature 3: Data-Driven Planning */}
              <div
                onClick={onExplore}
                className="p-3 rounded-xl bg-white/45 backdrop-blur-sm border border-white/70 hover:bg-white/80 hover:scale-105 transition-all duration-200 cursor-pointer text-center group shadow-sm"
              >
                <div className="w-9 h-9 mx-auto rounded-full bg-[#D6F3E0] flex items-center justify-center text-[#266F4A] mb-1.5 group-hover:bg-[#4A72DF] group-hover:text-white transition-colors">
                  <BarChart3 className="w-4 h-4 stroke-[2.2]" />
                </div>
                <h4 className="text-[11.5px] font-bold text-[#14261B] leading-tight">
                  Data-Driven Planning
                </h4>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-4 border-t border-[#B8D8BF]/30 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#4A6453]">
          <p>© 2026 Amman Urban Digital Twin. Connected with SUMO Simulation Engine.</p>
          <div className="flex items-center gap-4 mt-2 sm:mt-0 font-medium">
            <button onClick={onLaunch} className="hover:text-[#183623] cursor-pointer">Explore Platform</button>
            <span>•</span>
            <button onClick={onExplore} className="hover:text-[#183623] cursor-pointer">Sign In / Register</button>
          </div>
        </footer>
      </div>
    </div>
  );
};

