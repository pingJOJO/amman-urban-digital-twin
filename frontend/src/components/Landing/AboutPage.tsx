import React from 'react';
import {
  ShieldCheck,
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
      desc: 'Validating urban engineering hypotheses in microscopic simulation before committing municipal capital.',
      icon: ShieldCheck,
      stat: '100%',
      statLabel: 'Capital Waste Prevention'
    },
    {
      title: 'SUMO Microscopic Core',
      desc: 'Simulating every vehicle, bus, and pedestrian individually along authentic OpenStreetMap Amman network geometry.',
      icon: Cpu,
      stat: '18,400+',
      statLabel: 'Daily Active Agents'
    },
    {
      title: 'Microclimate Thermal Solver',
      desc: 'Modeling open asphalt heat radiation (35.2°C) and canopy cooling drops along University of Jordan perimeter.',
      icon: Activity,
      stat: '-3.8°C',
      statLabel: 'Surface Heat Offset'
    },
    {
      title: 'TraCI Real-Time AI Control',
      desc: 'Bidirectional Python TraCI algorithms granting emergency ambulance priority and dissolving circular queue backlogs.',
      icon: Network,
      stat: '-4.2 min',
      statLabel: 'Response Time Reduction'
    }
  ];

  const techStack = [
    { name: 'SUMO 1.21', category: 'Microscopic Engine', icon: Layers },
    { name: 'Python 3.11 + TraCI', category: 'AI Controllers', icon: FileCode2 },
    { name: 'FastAPI Backend', category: 'High-Speed API', icon: Database },
    { name: 'React 18 & Vite', category: 'Digital Twin HUD', icon: Compass },
    { name: 'OpenStreetMap (OSM)', category: 'Amman Road Geometry', icon: GitBranch },
    { name: 'Microclimate Grid', category: 'Thermal Physics', icon: BarChart3 }
  ];

  return (
    <div className="space-y-12 py-6">
      {/* 1. HERO SECTION */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <div
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono font-bold tracking-wider uppercase shadow-sm ${
            isNight
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
              : 'bg-white/70 border-white/90 text-emerald-900'
          }`}
        >
          <GraduationCap className="w-4 h-4 text-emerald-500" />
          <span>Advanced Capstone Research • 2026 Academic Edition</span>
        </div>

        <div className="space-y-1">
          <h1
            className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${
              isNight ? 'text-white' : 'text-slate-900'
            }`}
          >
            Amman Urban Digital Twin
          </h1>
          <h2 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-[#4A72DF] via-[#48C3CB] to-[#5BCF7B] bg-clip-text text-transparent">
            Precision Co-Simulation for Sustainable Mobility
          </h2>
        </div>

        <p
          className={`text-sm sm:text-base leading-relaxed max-w-xl mx-auto ${
            isNight ? 'text-slate-300' : 'text-slate-700'
          }`}
        >
          An engineering capstone developed by Doha Ziad (2026), fusing SUMO microscopic traffic simulation with real-time Python AI controllers and thermal microclimate modeling for Greater Amman.
        </p>

        {/* Lead Researcher Credit */}
        <div
          className={`inline-flex items-center gap-4 p-3.5 px-6 rounded-2xl border shadow-sm ${
            isNight
              ? 'bg-[#0B1711]/90 border-emerald-500/30 text-white'
              : 'bg-white/80 border-white/95 text-slate-900'
          }`}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center text-slate-950 font-bold">
            <Award className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div className="text-left font-mono">
            <div className="text-[10.5px] uppercase opacity-70">Lead Researcher & Developer</div>
            <div className="text-sm font-bold font-sans">Doha Ziad • Class of 2026</div>
          </div>
        </div>
      </section>

      {/* 2. FOUR PILLARS */}
      <section className="space-y-4">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-500">
            System Architecture
          </div>
          <h3 className={`text-2xl font-bold tracking-tight ${isNight ? 'text-white' : 'text-slate-900'}`}>
            Four Core Engineering Pillars
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((pil, idx) => {
            const Icon = pil.icon;
            return (
              <div
                key={idx}
                className={`p-5 rounded-2xl border flex flex-col justify-between transition-all hover:scale-[1.02] ${
                  isNight
                    ? 'bg-[#0B1711]/85 border-emerald-500/20 text-white'
                    : 'bg-white/70 border-white/90 text-slate-900 shadow-sm'
                }`}
              >
                <div className="space-y-2.5 text-left">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center">
                    <Icon className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <h4 className="text-sm font-bold">{pil.title}</h4>
                  <p className={`text-xs leading-relaxed ${isNight ? 'text-slate-300' : 'text-slate-600'}`}>
                    {pil.desc}
                  </p>
                </div>

                <div className="pt-3 mt-4 border-t border-current/10 text-left">
                  <div className="text-[10px] font-mono opacity-60">{pil.statLabel}</div>
                  <div className="text-xl font-black font-mono text-emerald-400">{pil.stat}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. FIELD SCOPE: QUEEN RANIA ST & UOJ */}
      <section
        className={`p-6 sm:p-8 rounded-3xl border shadow-lg ${
          isNight
            ? 'bg-[#0B1711]/90 border-emerald-500/25 text-white'
            : 'bg-white/70 border-white/90 text-slate-900'
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-3 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-current/20 text-[11px] font-mono font-bold uppercase text-emerald-400">
              <Activity className="w-3.5 h-3.5" />
              <span>Primary Experimental Corridor</span>
            </div>

            <h3 className="text-2xl font-bold tracking-tight">
              Queen Rania Al-Abdullah Street & UOJ Corridor
            </h3>

            <p className={`text-xs sm:text-sm leading-relaxed ${isNight ? 'text-slate-300' : 'text-slate-600'}`}>
              Selected as the benchmark corridor due to high peak congestion, dedicated Bus Rapid Transit (BRT) integration, and summer asphalt heat traps reaching 35.2°C. The Digital Twin validates that university pine tree buffers drop surface heat to 28.6°C while adaptive signal timing elevates BRT flow by +34.5%.
            </p>

            <div className="grid grid-cols-3 gap-2.5 pt-1 font-mono text-center">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <div className="text-[10px] opacity-60">Asphalt Hotspot</div>
                <div className="text-lg font-bold text-red-400">35.2°C</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <div className="text-[10px] opacity-60">Pine Canopy</div>
                <div className="text-lg font-bold text-emerald-400">28.6°C</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <div className="text-[10px] opacity-60">BRT Velocity</div>
                <div className="text-lg font-bold text-cyan-400">+34.5%</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="rounded-2xl overflow-hidden border border-white/20 shadow-md">
              <img
                src="/queen-rania-corridor-twin-v2.png"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/queen-rania-corridor-twin.png';
                }}
                alt="Queen Rania Corridor Architectural Render"
                className="w-full h-auto object-cover max-h-[240px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. TECH STACK */}
      <section className="space-y-4">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-500">
            Open-Source Architecture
          </div>
          <h3 className={`text-2xl font-bold tracking-tight ${isNight ? 'text-white' : 'text-slate-900'}`}>
            Built with World-Class Engineering Tools
          </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {techStack.map((tech, idx) => {
            const Icon = tech.icon;
            return (
              <div
                key={idx}
                className={`p-3.5 rounded-2xl border text-center space-y-1.5 transition-all hover:scale-105 ${
                  isNight
                    ? 'bg-[#0B1711]/80 border-emerald-500/20 text-white'
                    : 'bg-white/70 border-white/90 text-slate-900'
                }`}
              >
                <div className="w-8 h-8 mx-auto rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                  <Icon className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div className="text-xs font-bold">{tech.name}</div>
                <div className="text-[10px] font-mono opacity-60">{tech.category}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. CALL TO ACTION */}
      <section
        className={`p-8 rounded-3xl border text-center space-y-3 shadow-lg ${
          isNight
            ? 'bg-gradient-to-r from-[#07150E] via-[#0B2117] to-[#07150E] border-emerald-500/30 text-white'
            : 'bg-gradient-to-r from-white/70 via-white/85 to-white/70 border-white/90 text-slate-900'
        }`}
      >
        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Explore the Simulation Sandbox
        </h3>
        <p className="text-xs sm:text-sm opacity-80 max-w-md mx-auto">
          Test live traffic preemption, microclimate mitigation, and autonomous signal overrides in real time.
        </p>
        <div className="pt-1">
          <button
            onClick={onExplore}
            className="group inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-[#44C2D0] to-[#51D3BE] text-[#14261B] text-xs font-extrabold tracking-tight shadow-md hover:scale-105 transition-all cursor-pointer"
          >
            <span>Launch Live Sandbox</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>
    </div>
  );
};
