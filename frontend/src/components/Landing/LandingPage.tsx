import React, { useState } from 'react';
import {
  ArrowRight,
  Play,
  Siren,
  Activity,
  Cpu,
  Thermometer,
  ArrowUpRight,
  DollarSign,
  ShieldCheck,
  Radio,
  Sun,
  Moon,
  Bus,
  CheckCircle2,
  Sparkles,
  LogOut
} from 'lucide-react';
import { AboutPage } from './AboutPage';
import { TwinExplorePage } from './TwinExplorePage';
import { ProjectsPage } from './ProjectsPage';

interface LandingPageProps {
  initialTab?: 'home' | 'about' | 'twin' | 'projects';
  authenticatedUser?: { full_name: string; email: string } | null;
  onSignOut?: () => void;
  onExplore: () => void;
  onLaunch: () => void;
}

// 12 Drifting botanical leaves with organic swaying
const LEAF_PARTICLES = [
  { id: 1, left: '6%', delay: '0s', duration: '16s', size: 20 },
  { id: 2, left: '16%', delay: '3.5s', duration: '20s', size: 24 },
  { id: 3, left: '26%', delay: '1.2s', duration: '17s', size: 18 },
  { id: 4, left: '38%', delay: '5.0s', duration: '22s', size: 22 },
  { id: 5, left: '50%', delay: '2.0s', duration: '18s', size: 26 },
  { id: 6, left: '62%', delay: '6.5s', duration: '21s', size: 19 },
  { id: 7, left: '72%', delay: '0.8s', duration: '17s', size: 23 },
  { id: 8, left: '82%', delay: '4.2s', duration: '21s', size: 21 },
  { id: 9, left: '90%', delay: '2.8s', duration: '23s', size: 25 },
  { id: 10, left: '95%', delay: '7.5s', duration: '18s', size: 17 },
  { id: 11, left: '12%', delay: '8.5s', duration: '19s', size: 22 },
  { id: 12, left: '85%', delay: '9.0s', duration: '20s', size: 20 }
];

export const LandingPage: React.FC<LandingPageProps> = ({
  initialTab = 'home',
  authenticatedUser,
  onSignOut,
  onExplore,
  onLaunch
}) => {
  const [theme, setTheme] = useState<'day' | 'night'>('day');
  const [activeTab, setActiveTab] = useState<'home' | 'about' | 'twin' | 'projects'>(initialTab);
  const [selectedScenario, setSelectedScenario] = useState<number>(0);
  const [corridorLayer, setCorridorLayer] = useState<'all' | 'thermal' | 'brt' | 'traffic'>('all');

  const isNight = theme === 'night';

  const scenarios = [
    {
      title: 'Emergency Green Corridor',
      desc: 'Dynamic signal preemption for Civil Defense ambulances, slashing response times across Amman arteries by 4.2 minutes.',
      statLabel: 'Response Time Reduction',
      statValue: '-38%',
      icon: Siren,
      tag: 'TraCI Autonomous Override'
    },
    {
      title: 'Adaptive Congestion Dissolution',
      desc: 'Real-time queue monitoring modulating phase splits to dissolve spillback at critical nodes like 7th & 8th Circles.',
      statLabel: 'Peak Intersection Delay',
      statValue: '-32.4%',
      icon: Activity,
      tag: 'Dynamic Phase Optimization'
    },
    {
      title: 'Queen Rania St. Heat Island',
      desc: 'Modeling 35.2°C open asphalt traps at the University gate and validating -3.8°C cooling via native pine tree canopies.',
      statLabel: 'Simulated Surface Drop',
      statValue: '-3.8°C',
      icon: Thermometer,
      tag: 'Microclimate Thermal Solver'
    },
    {
      title: 'BRT Rapid Transit Priority',
      desc: 'Simulating dedicated red lane velocity gains and CO2 emission dispersal compared to mixed traffic corridors.',
      statLabel: 'Transit Velocity Gain',
      statValue: '+34.5%',
      icon: Bus,
      tag: 'Amman BRT Simulation Node'
    }
  ];

  return (
    <div
      dir="ltr"
      className={`relative min-h-screen w-full overflow-x-hidden font-sans transition-colors duration-700 ${
        isNight
          ? 'bg-gradient-to-br from-[#060D09] via-[#091510] to-[#0A1A12] text-slate-100 selection:bg-emerald-500 selection:text-slate-950'
          : 'bg-gradient-to-br from-[#E2F5DD] via-[#EDF9EC] to-[#DCF5DA] text-slate-900 selection:bg-[#44C2D0] selection:text-white'
      }`}
    >
      {/* 1. BACKGROUND PARTICLES: GENTLY DRIFTING BOTANICAL LEAVES & SMART TRAFFIC MOBILITY FLOW */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {/* Animated Botanical Leaves */}
        {LEAF_PARTICLES.map((leaf) => (
          <div
            key={leaf.id}
            className={`absolute -top-12 transition-opacity ${
              isNight ? 'opacity-25 text-emerald-400' : 'opacity-40 text-[#4AA883]'
            }`}
            style={{
              left: leaf.left,
              animation: `driftFall ${leaf.duration} linear infinite`,
              animationDelay: leaf.delay
            }}
          >
            <svg
              width={leaf.size}
              height={leaf.size}
              viewBox="0 0 24 24"
              fill="currentColor"
              className="transform rotate-45 drop-shadow-sm"
            >
              <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
            </svg>
          </div>
        ))}

        {/* Ambient Smart City Traffic Mobility Flow Layer (Subtle, High-Tech, Clean) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30 select-none">
          {/* Arterial Corridor 1 (Upper Horizontal Stream) */}
          <div className="absolute top-[32%] left-0 w-full h-[2px]">
            <svg className="w-full h-8 -top-3 absolute" preserveAspectRatio="none">
              <line
                x1="0"
                y1="16"
                x2="100%"
                y2="16"
                stroke={isNight ? 'rgba(74, 222, 128, 0.25)' : 'rgba(40, 110, 70, 0.18)'}
                strokeWidth="1.5"
                strokeDasharray="16 14"
                style={{ animation: 'trafficFlowDash 18s linear infinite' }}
              />
            </svg>
            {/* Small Sleek Cruising Sedan Eastbound */}
            <div
              className={`absolute -top-2 flex items-center gap-1 px-1.5 py-0.5 rounded-full ${
                isNight
                  ? 'bg-cyan-400/80 text-slate-950 shadow-[0_0_10px_rgba(34,211,238,0.7)]'
                  : 'bg-[#2E7752] text-white shadow-[0_0_8px_rgba(46,119,82,0.4)]'
              }`}
              style={{ animation: 'carCruiseEast 24s cubic-bezier(0.4, 0, 0.2, 1) infinite', animationDelay: '2s' }}
            >
              <div className="w-2.5 h-1.5 rounded-sm bg-white/90" />
              <div className="w-1 h-1 rounded-full bg-amber-300" />
            </div>

            {/* Small Sleek BRT Transit Bus Eastbound */}
            <div
              className={`absolute -top-2.5 flex items-center gap-1 px-2 py-0.5 rounded-sm ${
                isNight
                  ? 'bg-emerald-400/90 text-slate-950 shadow-[0_0_12px_rgba(52,211,153,0.7)]'
                  : 'bg-[#1E583C] text-white shadow-[0_0_8px_rgba(30,88,60,0.5)]'
              }`}
              style={{ animation: 'carCruiseEast 32s linear infinite', animationDelay: '14s' }}
            >
              <div className="w-4 h-1.5 rounded-sm bg-emerald-200/90" />
              <div className="w-1 h-1 rounded-full bg-cyan-300" />
            </div>
          </div>

          {/* Arterial Corridor 2 (Lower Horizontal Stream) */}
          <div className="absolute top-[72%] left-0 w-full h-[2px]">
            <svg className="w-full h-8 -top-3 absolute" preserveAspectRatio="none">
              <line
                x1="0"
                y1="16"
                x2="100%"
                y2="16"
                stroke={isNight ? 'rgba(56, 189, 248, 0.25)' : 'rgba(50, 120, 85, 0.18)'}
                strokeWidth="1.5"
                strokeDasharray="20 18"
                style={{ animation: 'trafficFlowDash 16s linear infinite reverse' }}
              />
            </svg>
            {/* Small Sleek Cruising Sedan Westbound */}
            <div
              className={`absolute -top-2 flex items-center gap-1 px-1.5 py-0.5 rounded-full ${
                isNight
                  ? 'bg-emerald-400/80 text-slate-950 shadow-[0_0_10px_rgba(52,211,153,0.7)]'
                  : 'bg-[#37855C] text-white shadow-[0_0_8px_rgba(55,133,92,0.4)]'
              }`}
              style={{ animation: 'carCruiseWest 26s cubic-bezier(0.4, 0, 0.2, 1) infinite', animationDelay: '6s' }}
            >
              <div className="w-1 h-1 rounded-full bg-amber-300" />
              <div className="w-2.5 h-1.5 rounded-sm bg-white/90" />
            </div>
          </div>
        </div>

        {/* Ambient Radial Depth Glows */}
        <div
          className={`absolute top-[-10%] right-[10%] w-[650px] h-[650px] rounded-full blur-[140px] transition-colors duration-700 ${
            isNight ? 'bg-emerald-600/15' : 'bg-[#75E2D9]/30'
          }`}
        />
        <div
          className={`absolute bottom-[5%] left-[5%] w-[600px] h-[600px] rounded-full blur-[150px] transition-colors duration-700 ${
            isNight ? 'bg-cyan-600/10' : 'bg-[#82E69F]/30'
          }`}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8 lg:px-12 py-4 flex flex-col justify-between min-h-screen">
        {/* 2. TOP EXECUTIVE NAVBAR */}
        <header
          className={`flex items-center justify-between py-3 border-b backdrop-blur-md transition-colors duration-500 ${
            isNight ? 'border-emerald-500/20' : 'border-[#3B654C]/15'
          }`}
        >
          {/* Brand Identity: 100% Transparent Floating Logo */}
          <div
            onClick={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3.5 cursor-pointer group"
          >
            <img
              src="/logo.png"
              alt="Amman Urban Digital Twin Logo"
              className="w-11 h-11 sm:w-12 sm:h-12 object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-300"
            />
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-sm sm:text-base font-extrabold tracking-tight transition-colors ${
                    isNight ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  Amman Urban Digital Twin
                </span>
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold border ${
                    isNight
                      ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                      : 'bg-[#32855B]/15 text-[#185337] border-[#32855B]/25'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  SUMO v1.21
                </span>
              </div>
              <span
                className={`block text-[11px] font-mono tracking-wider uppercase transition-colors ${
                  isNight ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                Co-Simulation & Mobility Intelligence
              </span>
            </div>
          </div>

          {/* Navigation Anchors: 4 Dedicated Pages (100% English) */}
          <nav
            className={`hidden lg:flex items-center gap-1 p-1.5 rounded-full backdrop-blur-md border shadow-sm transition-all ${
              isNight
                ? 'bg-[#0B1711]/85 border-emerald-500/20'
                : 'bg-white/50 border-white/70 shadow-[0_4px_16px_rgba(20,40,25,0.04)]'
            }`}
          >
            {[
              { id: 'home', label: 'Home' },
              { id: 'about', label: 'About' },
              { id: 'twin', label: 'Innovation' },
              { id: 'projects', label: 'Projects' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                  activeTab === tab.id
                    ? isNight
                      ? 'bg-emerald-500 text-slate-950 shadow-sm font-bold'
                      : 'bg-[#9AB3E6] text-[#14261B] shadow-sm font-bold'
                    : isNight
                    ? 'text-slate-300 hover:text-white hover:bg-white/5'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-white/40'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Right Actions: Day/Night Mode & Launch CTA */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Day / Night Mode Toggle */}
            <button
              onClick={() => setTheme(isNight ? 'day' : 'night')}
              className={`p-2 rounded-full border transition-all cursor-pointer flex items-center justify-center ${
                isNight
                  ? 'border-emerald-500/30 bg-[#0E2018]/80 text-[#FEF08A] hover:bg-emerald-500/15'
                  : 'border-[#2D4D37]/25 bg-white/50 text-[#1B4B32] hover:bg-white/80'
              }`}
              title={isNight ? 'Switch to Day Mode' : 'Switch to Night Mode'}
            >
              {isNight ? <Sun className="w-4 h-4 text-[#FDE047]" /> : <Moon className="w-4 h-4 text-[#164E33]" />}
            </button>

            {/* Authenticated User Pill & Sign Out vs Launch CTA */}
            {authenticatedUser ? (
              <div className="flex items-center gap-2">
                <div
                  className={`hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold ${
                    isNight
                      ? 'bg-[#0E2018]/90 border-emerald-500/35 text-emerald-300'
                      : 'bg-white/75 border-white/95 text-[#142A1D] shadow-sm'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-bold">{authenticatedUser.full_name}</span>
                </div>
                {onSignOut && (
                  <button
                    onClick={onSignOut}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 active:bg-red-500/30 text-red-700 text-xs font-semibold transition-all cursor-pointer shadow-sm"
                    title="Sign Out of Session"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                )}
              </div>
            ) : (
              <button
                onClick={onLaunch}
                className="group relative inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#44C2D0] to-[#51D3BE] text-[#14261B] text-xs sm:text-[13px] font-extrabold tracking-tight shadow-md hover:scale-105 active:scale-100 transition-all duration-300 cursor-pointer"
              >
                <span>Launch Experience</span>
                <span className="w-5 h-5 rounded-full bg-[#182B20] text-white flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowRight className="w-3 h-3 stroke-[2.5]" />
                </span>
              </button>
            )}
          </div>
        </header>

        {/* ================================================================= */}
        {/* PAGE 1: HOME VIEW (Refined, Crisp, Luxury Effects, Zero Clutter)   */}
        {/* ================================================================= */}
        {activeTab === 'home' && (
          <>
            {/* 3. HERO SECTION: Smooth Elongated Robotic Arm & Hologram 3D Amman City */}
            <section id="overview" className="pt-8 sm:pt-12 pb-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
              {/* Left Column: Crisp 2-line copy with subtle high-tech effects */}
              <div className="lg:col-span-6 xl:col-span-6 space-y-4 text-left">
                <div
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono tracking-wide shadow-sm backdrop-blur-md ${
                    isNight
                      ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400'
                      : 'bg-white/60 border-white/80 text-[#1F5435]'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Precision Urban Simulation • Zero Capital Risk</span>
                </div>

                <div className="space-y-1">
                  <h1
                    className={`text-4xl sm:text-5xl lg:text-[56px] font-extrabold tracking-tight leading-[1.08] ${
                      isNight ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    A Smarter Way to
                  </h1>
                  <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold tracking-tight leading-[1.08] bg-gradient-to-r from-[#4A72DF] via-[#48C3CB] to-[#5BCF7B] bg-clip-text text-transparent pb-1">
                    Move Amman
                  </h1>
                </div>

                <p
                  className={`text-sm sm:text-base font-normal leading-relaxed max-w-lg ${
                    isNight ? 'text-slate-300' : 'text-slate-700'
                  }`}
                >
                  Simulate urban mobility scenarios, emergency signal preemption, and microclimate heat mitigation in high fidelity before breaking ground.
                </p>

                {/* Key Metric Tickers with Subtle Elevation & Border Glow */}
                <div className="grid grid-cols-3 gap-2.5 pt-1 max-w-lg">
                  <div
                    className={`p-3 rounded-2xl border shadow-sm transition-transform duration-300 hover:scale-[1.02] ${
                      isNight
                        ? 'bg-[#0B1711]/90 border-emerald-500/25'
                        : 'bg-white/55 border-white/80 shadow-[0_4px_16px_rgba(30,60,40,0.05)]'
                    }`}
                  >
                    <div className="flex items-center gap-1 text-xs font-mono font-bold mb-0.5 text-emerald-500">
                      <DollarSign className="w-3.5 h-3.5" />
                      <span>Zero Trial Cost</span>
                    </div>
                    <div className={`text-xl sm:text-2xl font-black font-mono ${isNight ? 'text-white' : 'text-slate-900'}`}>100%</div>
                    <p className={`text-[10.5px] ${isNight ? 'text-slate-400' : 'text-slate-600'}`}>Virtual Validation</p>
                  </div>

                  <div
                    className={`p-3 rounded-2xl border shadow-sm transition-transform duration-300 hover:scale-[1.02] ${
                      isNight
                        ? 'bg-[#0B1711]/90 border-cyan-500/25'
                        : 'bg-white/55 border-white/80 shadow-[0_4px_16px_rgba(30,60,40,0.05)]'
                    }`}
                  >
                    <div className="flex items-center gap-1 text-xs font-mono font-bold mb-0.5 text-cyan-400">
                      <Siren className="w-3.5 h-3.5" />
                      <span>Emergency Wave</span>
                    </div>
                    <div className={`text-xl sm:text-2xl font-black font-mono ${isNight ? 'text-white' : 'text-slate-900'}`}>-4.2m</div>
                    <p className={`text-[10.5px] ${isNight ? 'text-slate-400' : 'text-slate-600'}`}>Corridor Clearance</p>
                  </div>

                  <div
                    className={`p-3 rounded-2xl border shadow-sm transition-transform duration-300 hover:scale-[1.02] ${
                      isNight
                        ? 'bg-[#0B1711]/90 border-emerald-500/25'
                        : 'bg-white/55 border-white/80 shadow-[0_4px_16px_rgba(30,60,40,0.05)]'
                    }`}
                  >
                    <div className="flex items-center gap-1 text-xs font-mono font-bold mb-0.5 text-emerald-400">
                      <Thermometer className="w-3.5 h-3.5" />
                      <span>Heat Offset</span>
                    </div>
                    <div className={`text-xl sm:text-2xl font-black font-mono ${isNight ? 'text-white' : 'text-slate-900'}`}>-3.8°C</div>
                    <p className={`text-[10.5px] ${isNight ? 'text-slate-400' : 'text-slate-600'}`}>Canopy Relief</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={onExplore}
                    className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-[#42C2D0] to-[#55D5BB] text-[#14261B] text-xs sm:text-sm font-bold tracking-tight shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    <span>Explore the Digital Twin</span>
                    <span className="w-5 h-5 rounded-full bg-[#182B20] text-white flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                      <ArrowRight className="w-3 h-3 stroke-[2.5]" />
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      const el = document.getElementById('corridor');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`inline-flex items-center gap-2 px-5 py-3 rounded-full border text-xs sm:text-sm font-semibold tracking-tight backdrop-blur-sm transition-all cursor-pointer shadow-sm ${
                      isNight
                        ? 'border-emerald-500/30 bg-[#0E2018]/80 text-slate-200 hover:bg-emerald-500/15'
                        : 'border-[#2D4D37]/30 bg-white/45 text-slate-800 hover:bg-white/75'
                    }`}
                  >
                    <Play className="w-3.5 h-3.5 fill-current text-emerald-500" />
                    <span>Queen Rania Simulation</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Restored Silky Smooth Hero Hand & 3D Amman Hologram */}
              <div className="lg:col-span-6 xl:col-span-6 flex justify-center lg:justify-end relative">
                <div className="relative w-full max-w-[640px] lg:max-w-[700px] group transform scale-105">
                  {/* Radiant Ambient Backglow */}
                  <div
                    className={`absolute inset-0 rounded-full blur-[85px] -z-10 transform scale-95 transition-colors duration-700 ${
                      isNight ? 'bg-emerald-500/25' : 'bg-[#51D3BE]/30'
                    }`}
                  />

                  {/* Restored Smooth 3D City & Robotic Hand */}
                  <img
                    src="/hero-hand-smooth.png"
                    alt="Amman Digital Twin Holographic City on Smartphone"
                    className="w-full h-auto object-contain filter drop-shadow-[0_24px_45px_rgba(20,45,28,0.25)] transition-transform duration-700 ease-out group-hover:scale-[1.02] pointer-events-none select-none"
                  />

                  {/* Floating Telemetry HUD Overlays with Soft Glassmorphism */}
                  <div
                    className={`absolute top-4 left-2 sm:left-4 backdrop-blur-md rounded-2xl p-2.5 shadow-lg text-left flex items-center gap-2.5 border transition-all duration-300 hover:scale-105 ${
                      isNight
                        ? 'bg-[#070F0B]/85 border-emerald-500/40'
                        : 'bg-white/75 border-white/90 shadow-[0_8px_24px_rgba(20,40,25,0.08)]'
                    }`}
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <div>
                      <div className={`text-[10px] font-mono uppercase ${isNight ? 'text-slate-400' : 'text-slate-600'}`}>SUMO Active Agents</div>
                      <div className={`text-xs font-bold font-mono ${isNight ? 'text-white' : 'text-slate-900'}`}>18,420 Live Vehicles</div>
                    </div>
                  </div>

                  <div
                    className={`absolute bottom-4 right-2 sm:right-4 backdrop-blur-md rounded-2xl p-2.5 shadow-lg text-left flex items-center gap-2.5 border transition-all duration-300 hover:scale-105 ${
                      isNight
                        ? 'bg-[#070F0B]/85 border-cyan-500/40'
                        : 'bg-white/75 border-white/90 shadow-[0_8px_24px_rgba(20,40,25,0.08)]'
                    }`}
                  >
                    <Radio className="w-4 h-4 animate-pulse text-cyan-400" />
                    <div>
                      <div className={`text-[10px] font-mono uppercase ${isNight ? 'text-slate-400' : 'text-slate-600'}`}>Emergency Priority</div>
                      <div className={`text-xs font-bold font-mono ${isNight ? 'text-cyan-400' : 'text-cyan-700'}`}>Green Wave Active</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 4. SCENARIOS SECTION: 4 Core Modules with Clean 2-Line Descriptions */}
            <section id="capabilities" className={`pt-10 pb-10 border-t transition-colors ${isNight ? 'border-emerald-500/20' : 'border-[#3B654C]/15'}`}>
              <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
                <div
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono font-bold tracking-wider uppercase shadow-sm ${
                    isNight
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                      : 'bg-white/60 border-white/80 text-[#1F5435]'
                  }`}
                >
                  <Cpu className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Scenario Sandbox Engine</span>
                </div>
                <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${isNight ? 'text-white' : 'text-slate-900'}`}>
                  Test Any Urban Hypothesis in Silicon Before Asphalt
                </h2>
                <p className={`text-xs sm:text-sm ${isNight ? 'text-slate-300' : 'text-slate-600'}`}>
                  Four core microscopic simulation modules validating real-world traffic scenarios.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {scenarios.map((sc, idx) => {
                  const IconComponent = sc.icon;
                  const isSelected = selectedScenario === idx;
                  return (
                    <div
                      key={idx}
                      onClick={() => setSelectedScenario(idx)}
                      className={`p-4 rounded-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between border group ${
                        isSelected
                          ? isNight
                            ? 'bg-[#0B1711] border-emerald-500 shadow-md scale-[1.02]'
                            : 'bg-white border-[#44C2D0] shadow-md scale-[1.02]'
                          : isNight
                          ? 'bg-[#0B1711]/75 hover:bg-[#0E2018] border-emerald-500/15'
                          : 'bg-white/45 hover:bg-white/70 border-white/80 shadow-sm'
                      }`}
                    >
                      <div className="space-y-2 text-left">
                        <div className="flex items-center justify-between">
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                              isSelected
                                ? isNight ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-[#44C2D0] text-slate-900 font-bold'
                                : isNight ? 'bg-emerald-500/15 text-emerald-400 group-hover:bg-emerald-500/25' : 'bg-emerald-100 text-emerald-800 group-hover:bg-[#44C2D0] group-hover:text-white'
                            }`}
                          >
                            <IconComponent className="w-4 h-4 stroke-[2.2]" />
                          </div>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border bg-white/5 border-current/15">
                            {sc.tag}
                          </span>
                        </div>

                        <h3 className={`text-sm font-bold ${isNight ? 'text-white' : 'text-slate-900'}`}>
                          {sc.title}
                        </h3>

                        <p className={`text-xs leading-relaxed ${isNight ? 'text-slate-300' : 'text-slate-600'}`}>
                          {sc.desc}
                        </p>
                      </div>

                      <div className={`pt-3 mt-3 border-t flex items-center justify-between ${isNight ? 'border-white/10' : 'border-[#3B654C]/15'}`}>
                        <div>
                          <div className="text-[10px] font-mono opacity-60">{sc.statLabel}</div>
                          <div className="text-base font-black font-mono text-emerald-400">{sc.statValue}</div>
                        </div>
                        <span className="w-6 h-6 rounded-full flex items-center justify-center bg-white/10 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* 5. QUEEN RANIA CORRIDOR: Modern Architectural Render & Layer Controls */}
            <section id="corridor" className={`pt-10 pb-10 border-t transition-colors ${isNight ? 'border-emerald-500/20' : 'border-[#3B654C]/15'} grid grid-cols-1 lg:grid-cols-12 gap-8 items-center`}>
              <div className="lg:col-span-6 flex justify-center lg:justify-start">
                <div className="relative w-full max-w-[540px] group">
                  <div className={`absolute inset-0 rounded-3xl blur-[60px] -z-10 ${isNight ? 'bg-emerald-500/20' : 'bg-[#51D3BE]/25'}`} />

                  <div
                    className={`relative overflow-hidden rounded-3xl p-3 border shadow-xl ${
                      isNight
                        ? 'bg-[#0B1711]/90 border-emerald-500/30'
                        : 'bg-white/60 border-white/80 shadow-[0_16px_40px_rgba(20,40,25,0.08)]'
                    }`}
                  >
                    {/* Layer Selector */}
                    <div className="flex items-center gap-1.5 mb-2 overflow-x-auto pb-1">
                      {[
                        { id: 'all', label: 'All Layers' },
                        { id: 'thermal', label: 'Thermal (35.2°C)' },
                        { id: 'brt', label: 'BRT Lane' },
                        { id: 'traffic', label: 'Tree Canopy' }
                      ].map((l) => (
                        <button
                          key={l.id}
                          onClick={() => setCorridorLayer(l.id as any)}
                          className={`px-3 py-1 rounded-full text-[10.5px] font-mono font-semibold transition-all cursor-pointer ${
                            corridorLayer === l.id
                              ? isNight
                                ? 'bg-emerald-500 text-slate-950 font-bold'
                                : 'bg-[#44C2D0] text-slate-900 font-bold'
                              : 'bg-white/10 text-slate-300 hover:bg-white/20'
                          }`}
                        >
                          {l.label}
                        </button>
                      ))}
                    </div>

                    <img
                      src="/queen-rania-corridor-twin-v2.png"
                      alt="Queen Rania St. Corridor Twin - BRT and Microclimate Heatmap"
                      className="w-full h-auto object-contain rounded-2xl transition-transform duration-500 group-hover:scale-[1.01]"
                    />

                    <div className="absolute top-4 left-4 bg-[#070F0B]/85 backdrop-blur-md rounded-2xl px-3 py-1.5 flex items-center gap-2 border border-emerald-500/40 text-xs font-mono text-emerald-400">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      <span>BRT Transit: Dedicated Red Lane</span>
                    </div>

                    <div className="absolute bottom-4 right-4 bg-[#070F0B]/90 backdrop-blur-md rounded-2xl px-3.5 py-2 flex items-center gap-2.5 border border-cyan-500/40 text-left font-mono">
                      <Thermometer className="w-4 h-4 text-emerald-400" />
                      <div>
                        <div className="text-[10px] text-slate-400">UOJ TREE CANOPY BUFFER</div>
                        <div className="text-xs font-bold text-emerald-400">35.2°C Asphalt → 28.6°C Cooled</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Short 2-line explanation */}
              <div className="lg:col-span-6 space-y-3.5 lg:pl-4 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-current/20 text-xs font-mono font-bold uppercase text-emerald-500">
                  <Bus className="w-3.5 h-3.5" />
                  <span>Scope: Queen Rania St. (Univ. of Jordan)</span>
                </div>

                <div>
                  <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${isNight ? 'text-white' : 'text-slate-900'}`}>
                    Simulating Urban Heat Islands & Dedicated BRT Lanes
                  </h2>
                </div>

                <p className={`text-xs sm:text-sm leading-relaxed ${isNight ? 'text-slate-300' : 'text-slate-700'}`}>
                  Focusing on Queen Rania Al-Abdullah Street by University of Jordan. Evaluating 35.2°C asphalt heat reduction via pine canopies alongside dedicated BRT priority phases.
                </p>

                <div className="space-y-2 pt-1 font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>35.2°C Asphalt heat island alleviation down to 28.6°C via canopies</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Smart adaptive signal priority for BRT buses at University gates</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Carbon emissions dispersal modeling and pedestrian bridge flows</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={onExplore}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#44C2D0] to-[#51D3BE] text-[#14261B] text-xs font-extrabold tracking-tight shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    <span>Test Queen Rania Scenario</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </section>

            {/* 6. FINAL CTA BANNER */}
            <section
              className={`my-8 rounded-3xl p-8 border text-center space-y-3 backdrop-blur-md shadow-xl transition-all relative overflow-hidden ${
                isNight
                  ? 'bg-gradient-to-r from-[#07130E] via-[#0A1F16] to-[#07130E] border-emerald-500/30'
                  : 'bg-gradient-to-r from-white/70 via-white/85 to-white/70 border-white/90 shadow-[0_16px_40px_rgba(20,40,25,0.08)]'
              }`}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 text-[11px] font-mono text-emerald-500 bg-emerald-500/10">
                <Sparkles className="w-3 h-3" />
                <span>Next-Generation Urban Digital Twin</span>
              </div>
              <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${isNight ? 'text-white' : 'text-slate-900'}`}>
                Ready to Experience Amman’s Digital Twin?
              </h2>
              <p className={`text-xs sm:text-sm max-w-lg mx-auto ${isNight ? 'text-slate-300' : 'text-slate-700'}`}>
                Join researchers and civil engineers testing live simulation scenarios and microclimate heat mapping.
              </p>
              <div className="pt-1">
                <button
                  onClick={onExplore}
                  className="group inline-flex items-center gap-2.5 px-8 py-3 rounded-full bg-gradient-to-r from-[#44C2D0] to-[#51D3BE] text-[#14261B] text-xs font-extrabold tracking-tight shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <span>Launch Simulation Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5] group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </section>
          </>
        )}

        {/* ================================================================= */}
        {/* PAGE 2: ABOUT VIEW (100% English, Crisp)                         */}
        {/* ================================================================= */}
        {activeTab === 'about' && (
          <AboutPage theme={theme} onExplore={onExplore} onLaunch={onLaunch} />
        )}

        {/* ================================================================= */}
        {/* PAGE 3: DIGITAL TWIN / INNOVATION VIEW (Interactive Dashboard)   */}
        {/* ================================================================= */}
        {activeTab === 'twin' && (
          <TwinExplorePage theme={theme} onExplore={onExplore} onLaunch={onLaunch} />
        )}

        {/* ================================================================= */}
        {/* PAGE 4: PROJECTS VIEW (4 Cases & Comparison Table)               */}
        {/* ================================================================= */}
        {activeTab === 'projects' && (
          <ProjectsPage theme={theme} onExplore={onExplore} onLaunch={onLaunch} />
        )}

        {/* 7. EXECUTIVE FOOTER: Custom Intellectual Property Attribution */}
        <footer
          className={`py-4 border-t flex flex-col sm:flex-row items-center justify-between text-xs font-mono transition-colors ${
            isNight ? 'border-emerald-500/20 text-slate-400' : 'border-[#3B654C]/15 text-[#4A6453]'
          }`}
        >
          <div className="flex items-center gap-2.5 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Doha Ziad 2026 Amman Urban Digital Twin</span>
          </div>

          <div className="flex items-center gap-4 mt-2 sm:mt-0 font-sans">
            <button
              onClick={onLaunch}
              className={`transition-colors cursor-pointer ${isNight ? 'hover:text-emerald-400' : 'hover:text-slate-900'}`}
            >
              Enter Platform
            </button>
            <span>•</span>
            <button
              onClick={onExplore}
              className={`transition-colors cursor-pointer ${isNight ? 'hover:text-emerald-400' : 'hover:text-slate-900'}`}
            >
              Sign In
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};
