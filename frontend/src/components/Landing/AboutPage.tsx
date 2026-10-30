import React from 'react';
import {
  ShieldCheck,
  Building2,
  Cpu,
  Network,
  GraduationCap,
  Award,
  Layers,
  Activity,
  ArrowRight,
  Database,
  BarChart3,
  FileCode2,
  Compass,
  GitBranch
} from 'lucide-react';

interface AboutPageProps {
  theme: 'day' | 'night';
  onExplore: () => void;
  onLaunch: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ theme, onExplore }) => {
  const isNight = theme === 'night';

  const pillars = [
    {
      title: 'Zero-Risk Virtual Prototyping',
      desc: 'Eliminating costly physical construction blunders by running high-fidelity microscopic simulations prior to allocating municipal capital.',
      icon: ShieldCheck,
      stat: '100%',
      statLabel: 'Capital Risk Elimination'
    },
    {
      title: 'Autonomous Micro-Simulation Core',
      desc: 'Every vehicle, pedestrian, bus, and traffic signal is simulated as an autonomous agent adhering to authentic OSM road network topologies.',
      icon: Cpu,
      stat: '18,400+',
      statLabel: 'Active Micro-Agents'
    },
    {
      title: 'Urban Microclimate & Thermal Solver',
      desc: 'Measuring surface asphalt heat islands along Queen Rania Corridor and modeling the cooling effects of native pine canopies and shaded BRT walkways.',
      icon: Activity,
      stat: '-3.8°C',
      statLabel: 'Thermal Island Mitigation'
    },
    {
      title: 'TraCI Real-Time AI Control Loop',
      desc: 'Dynamic traffic signal optimization that automatically grants green corridors for civil defense ambulances and dissolves junction bottlenecks.',
      icon: Network,
      stat: '-4.2 min',
      statLabel: 'Ambulance Response Time'
    }
  ];

  const techStack = [
    { name: 'SUMO 1.21', category: 'Simulation Engine', icon: Layers },
    { name: 'Python 3.11 + TraCI', category: 'AI & Real-time Control', icon: FileCode2 },
    { name: 'FastAPI (Python)', category: 'High-Speed Backend', icon: Database },
    { name: 'React 18 & TypeScript', category: 'Spatial HUD Frontend', icon: Compass },
    { name: 'OpenStreetMap (OSM)', category: 'Amman Road Network', icon: GitBranch },
    { name: 'Microclimate Grid', category: 'Thermal Model (35.2°C)', icon: BarChart3 }
  ];

  return (
    <div className="space-y-16 py-8">
      {/* 1. HERO SECTION OF ABOUT PAGE */}
      <section className="text-center max-w-4xl mx-auto space-y-4">
        <div
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-mono font-bold tracking-wider uppercase shadow-sm ${
            isNight
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
              : 'bg-white/65 border-white/85 text-[#1F5435]'
          }`}
        >
          <GraduationCap className="w-4 h-4 text-emerald-500" />
          <span>Graduation Capstone Project • Advanced Academic Research 2026</span>
        </div>

        <div className="space-y-1">
          <h1
            className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight ${
              isNight ? 'text-white' : 'text-[#133020]'
            }`}
          >
            Amman Urban Digital Twin
          </h1>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#4A72DF] via-[#48C3CB] to-[#5BCF7B] bg-clip-text text-transparent pb-1">
            Precision Co-Simulation for Smart Mobility
          </h2>
        </div>

        <p
          className={`text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-normal ${
            isNight ? 'text-slate-300' : 'text-slate-700'
          }`}
        >
          An innovative graduation capstone led by Doha Ziad (2026), bridging microscopic traffic co-simulation (SUMO), Python AI controllers (TraCI), and microclimate thermal modeling to provide Greater Amman Municipality with actionable, zero-risk infrastructure analytics.
        </p>

        {/* Researcher Credit Card */}
        <div
          className={`inline-flex flex-col sm:flex-row items-center gap-4 p-4 px-6 rounded-3xl border shadow-md transition-all duration-300 hover:scale-[1.02] ${
            isNight
              ? 'bg-[#0B1812]/90 border-emerald-500/30 text-white'
              : 'bg-white/70 border-white/90 text-[#142A1D]'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-400 flex items-center justify-center text-slate-950 font-bold shadow-md">
              <Award className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div className="text-left">
              <div className="text-xs font-mono text-[#587563] uppercase tracking-wider">
                Lead Researcher & Developer
              </div>
              <div className="text-base font-bold font-sans">
                Doha Ziad
              </div>
            </div>
          </div>

          <div className="hidden sm:block w-px h-8 bg-current opacity-15" />

          <div className="text-left text-xs font-mono">
            <div className="text-[#587563] uppercase">
              Capstone Year
            </div>
            <div className="font-bold text-emerald-500">2026 Academic Edition</div>
          </div>
        </div>
      </section>

      {/* 2. THE FOUR SYSTEM PILLARS */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono font-bold tracking-wider uppercase shadow-sm ${
              isNight
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : 'bg-white/60 border-white/80 text-[#1F5435]'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Four Core Engineering Pillars</span>
          </div>
          <h3
            className={`text-2xl sm:text-3xl font-extrabold ${
              isNight ? 'text-white' : 'text-[#133020]'
            }`}
          >
            How the Digital Twin Mirrors Reality
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((pil, idx) => {
            const Icon = pil.icon;
            return (
              <div
                key={idx}
                className={`p-6 rounded-3xl border shadow-sm flex flex-col justify-between transition-all hover:scale-[1.02] ${
                  isNight
                    ? 'bg-[#0B1812]/85 border-emerald-500/20 hover:border-emerald-500/50'
                    : 'bg-white/60 border-white/85 shadow-[0_8px_24px_rgba(20,40,25,0.05)] hover:bg-white/80'
                }`}
              >
                <div className="space-y-3 text-left">
                  <div className="w-11 h-11 rounded-2xl bg-[#D6F3E0] text-[#208351] flex items-center justify-center">
                    <Icon className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <h4 className={`text-base font-bold ${isNight ? 'text-white' : 'text-[#133020]'}`}>
                    {pil.title}
                  </h4>
                  <p className={`text-xs leading-relaxed ${isNight ? 'text-slate-300' : 'text-slate-600'}`}>
                    {pil.desc}
                  </p>
                </div>

                <div className={`pt-4 mt-4 border-t ${isNight ? 'border-white/10' : 'border-[#3B654C]/15'}`}>
                  <div className="text-xl font-black font-mono text-emerald-400">{pil.stat}</div>
                  <div className={`text-[10.5px] font-mono ${isNight ? 'text-slate-400' : 'text-slate-600'}`}>
                    {pil.statLabel}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. TECHNICAL ARCHITECTURE */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h3 className={`text-2xl sm:text-3xl font-extrabold ${isNight ? 'text-white' : 'text-[#133020]'}`}>
            Modern Co-Simulation Stack
          </h3>
          <p className={`text-xs sm:text-sm ${isNight ? 'text-slate-300' : 'text-slate-600'}`}>
            Built on robust open standards, high-throughput micro-simulation, and real-time Python AI feedback loops.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {techStack.map((tech, idx) => {
            const Icon = tech.icon;
            return (
              <div
                key={idx}
                className={`p-4 rounded-2xl border text-center space-y-2 transition-transform duration-300 hover:scale-105 ${
                  isNight
                    ? 'bg-[#0B1812]/80 border-emerald-500/20'
                    : 'bg-white/50 border-white/80 shadow-sm'
                }`}
              >
                <div className="w-10 h-10 mx-auto rounded-xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <div className={`text-xs font-bold font-mono ${isNight ? 'text-white' : 'text-slate-900'}`}>
                  {tech.name}
                </div>
                <div className="text-[10px] text-slate-500 font-mono">
                  {tech.category}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. CALL TO ACTION */}
      <section className="text-center pt-4">
        <button
          onClick={onExplore}
          className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#44C2D0] to-[#51D3BE] text-[#14261B] text-sm font-extrabold tracking-tight shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <span>Launch Digital Twin Experience</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-1 transition-transform" />
        </button>
      </section>
    </div>
  );
};
