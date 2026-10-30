import React, { useState } from 'react';
import {
  FolderKanban,
  Bus,
  Siren,
  Thermometer,
  ArrowRight,
  CheckCircle2,
  Calendar,
  MapPin,
  Cpu
} from 'lucide-react';

interface ProjectsPageProps {
  theme: 'day' | 'night';
  onExplore: () => void;
  onLaunch: () => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  theme,
  onExplore,
  onLaunch
}) => {
  const isNight = theme === 'night';
  const [selectedProjectId, setSelectedProjectId] = useState<number>(0);

  const projects = [
    {
      id: 0,
      title: 'Queen Rania St. BRT Corridor & Thermal Mitigation',
      category: 'Public Transit & Microclimate',
      location: 'University of Jordan, Amman',
      date: '2026',
      icon: Bus,
      summary:
        'A digital twin of Queen Rania Al-Abdullah Street evaluating dedicated BRT bus lanes alongside campus pine tree shading to mitigate the 35.2°C asphalt heat island.',
      metrics: [
        { label: 'Heat Mitigation', value: '-3.8°C', highlight: '28.6°C Target' },
        { label: 'BRT Velocity', value: '+34.5%', highlight: 'Dedicated Red Lane' },
        { label: 'Conflict Points', value: '-92%', highlight: 'Pedestrian Flow' }
      ],
      features: [
        '18,400 daily vehicle agent microscopic simulation using SUMO 1.21',
        'Physical microclimate solver targeting asphalt surface heat traps',
        'Dedicated red BRT corridor priority timing at University gates',
        'Pedestrian bridge throughput and crowd movement synchronization'
      ],
      image: '/queen-rania-corridor-twin-v2.png'
    },
    {
      id: 1,
      title: 'Emergency Green Wave Preemption (Civil Defense)',
      category: 'Emergency Logistics',
      location: 'JUH Hospital to 8th Circle',
      date: '2026',
      icon: Siren,
      summary:
        'Autonomous TraCI signal preemption algorithm detecting civil defense ambulances and flushing traffic queues 1,200 meters ahead of vehicle arrival.',
      metrics: [
        { label: 'Response Time', value: '-4.2 min', highlight: '-38% Delay' },
        { label: 'Signal Preemption', value: '100%', highlight: '6 Junctions' },
        { label: 'Queue Clearance', value: '88 sec', highlight: 'Fast Recovery' }
      ],
      features: [
        'TraCI trajectory override across 6 consecutive signalized junctions',
        'Dynamic phase extension for upstream and downstream corridors',
        'Emergency siren sensor modeling and connected vehicle protocols',
        'Zero collision risk via automated safety clearance intervals'
      ],
      image: '/queen-rania-corridor-twin-v2.png'
    },
    {
      id: 2,
      title: '7th & 8th Circles Congestion Dissolution Engine',
      category: 'Arterial Optimization',
      location: 'Zahran Arterial Corridor, Amman',
      date: '2026',
      icon: Cpu,
      summary:
        'Reinforcement learning loop assessing queue backlogs in real time and modulating circular phase splits to prevent gridlock spillback onto expressways.',
      metrics: [
        { label: 'Peak Delay', value: '-32.4%', highlight: 'Roundabout Flow' },
        { label: 'Spillback Prevention', value: '94.2%', highlight: 'Expressway' },
        { label: 'Idling Fuel', value: '-22.0%', highlight: 'Cost Saving' }
      ],
      features: [
        'Microscopic vehicle queue tracking on 12 inbound arterial approaches',
        'Real-time phase modulation preventing circle interior deadlock',
        'Carbon and NOx emissions minimization modeling',
        'Dynamic detour routing recommendations for peripheral traffic'
      ],
      image: '/queen-rania-corridor-twin-v2.png'
    },
    {
      id: 3,
      title: 'Urban Canopy Buffer & Carbon Sequestration Twin',
      category: 'Ecological Intelligence',
      location: 'Greater Amman Urban Basin',
      date: '2026',
      icon: Thermometer,
      summary:
        'Satellite land surface temperature mapping matched with microscopic emissions data to position pine buffer belts that absorb traffic CO2.',
      metrics: [
        { label: 'Carbon Sink', value: '-18.5%', highlight: 'Annual Drop' },
        { label: 'Thermal Offset', value: '-3.8°C', highlight: 'Shaded Belts' },
        { label: 'Green Area', value: '120k m²', highlight: 'Targeted Canopy' }
      ],
      features: [
        'Satellite land surface temperature (LST) overlay on SUMO grid',
        'Microclimate wind canyon and heat dispersion simulation',
        'Native Jordanian drought-resistant species selection (Pinus halepensis)',
        'Urban forestry economic cost-benefit analysis'
      ],
      image: '/queen-rania-corridor-twin-v2.png'
    }
  ];

  const currentProj = projects[selectedProjectId];

  return (
    <div className="space-y-10 py-6">
      {/* 1. PORTFOLIO HERO */}
      <section className="text-center max-w-3xl mx-auto space-y-3">
        <div
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono font-bold tracking-wider uppercase shadow-sm ${
            isNight
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
              : 'bg-white/70 border-white/90 text-emerald-900'
          }`}
        >
          <FolderKanban className="w-4 h-4 text-emerald-500" />
          <span>Digital Twin Portfolio • Doha Ziad 2026</span>
        </div>

        <h1
          className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${
            isNight ? 'text-white' : 'text-slate-900'
          }`}
        >
          Civic Co-Simulation Projects
        </h1>
        <p
          className={`text-sm sm:text-base leading-relaxed max-w-xl mx-auto ${
            isNight ? 'text-slate-300' : 'text-slate-600'
          }`}
        >
          Microscopic case studies demonstrating how digital twin algorithms reduce traffic congestion, mitigate asphalt heat islands, and cut municipal capital waste.
        </p>
      </section>

      {/* 2. PROJECT SELECTOR TILES */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {projects.map((proj, idx) => {
          const isSelected = selectedProjectId === idx;
          const Icon = proj.icon;
          return (
            <div
              key={idx}
              onClick={() => setSelectedProjectId(idx)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                isSelected
                  ? isNight
                    ? 'bg-[#0B1711] border-emerald-500 shadow-md scale-[1.02]'
                    : 'bg-white border-emerald-500 shadow-md scale-[1.02]'
                  : isNight
                  ? 'bg-[#0B1711]/75 hover:bg-[#0E2018] border-emerald-500/15'
                  : 'bg-white/60 hover:bg-white/80 border-white/85'
              }`}
            >
              <div className="space-y-2 text-left">
                <div className="flex items-center justify-between">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      isSelected
                        ? isNight ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-emerald-500 text-white font-bold'
                        : isNight ? 'bg-emerald-500/15 text-emerald-400' : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    <Icon className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 opacity-70">
                    Case 0{idx + 1}
                  </span>
                </div>

                <div className="text-[11px] font-mono text-emerald-500 font-semibold truncate">
                  {proj.category}
                </div>

                <h3 className={`text-sm font-bold line-clamp-1 ${isNight ? 'text-white' : 'text-slate-900'}`}>
                  {proj.title}
                </h3>
              </div>

              <div className="pt-2 mt-3 border-t border-current/10 flex items-center justify-between text-xs font-mono">
                <span className="opacity-60">{proj.location.split(',')[0]}</span>
                <span className="font-bold text-emerald-400">{proj.metrics[0].value}</span>
              </div>
            </div>
          );
        })}
      </section>

      {/* 3. SELECTED PROJECT DETAILS CARD */}
      <section
        className={`p-6 sm:p-8 rounded-3xl border shadow-xl ${
          isNight
            ? 'bg-[#0B1711]/90 border-emerald-500/25 text-white'
            : 'bg-white/70 border-white/90 text-slate-900'
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-4 text-left">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                {currentProj.category}
              </span>
              <span className="flex items-center gap-1 text-xs font-mono opacity-70">
                <MapPin className="w-3.5 h-3.5" />
                <span>{currentProj.location}</span>
              </span>
              <span className="flex items-center gap-1 text-xs font-mono opacity-70">
                <Calendar className="w-3.5 h-3.5" />
                <span>{currentProj.date}</span>
              </span>
            </div>

            <h2 className="text-2xl font-bold tracking-tight">
              {currentProj.title}
            </h2>

            <p className={`text-xs sm:text-sm leading-relaxed ${isNight ? 'text-slate-300' : 'text-slate-600'}`}>
              {currentProj.summary}
            </p>

            {/* Metrics Trio */}
            <div className="grid grid-cols-3 gap-2.5 pt-1">
              {currentProj.metrics.map((m, mIdx) => (
                <div
                  key={mIdx}
                  className="p-3 rounded-xl border border-current/10 bg-white/5 text-center"
                >
                  <div className="text-[10.5px] font-mono opacity-60 truncate">{m.label}</div>
                  <div className="text-xl font-bold font-mono text-emerald-400 mt-0.5">{m.value}</div>
                  <div className="text-[10px] font-mono opacity-50 mt-0.5">{m.highlight}</div>
                </div>
              ))}
            </div>

            {/* Features List */}
            <div className="space-y-1.5 pt-1">
              {currentProj.features.slice(0, 3).map((feat, fIdx) => (
                <div key={fIdx} className="flex items-start gap-2 text-xs font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className={isNight ? 'text-slate-300' : 'text-slate-700'}>{feat}</span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={onExplore}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#44C2D0] to-[#51D3BE] text-[#14261B] text-xs font-extrabold tracking-tight shadow-md hover:scale-105 transition-all cursor-pointer"
              >
                <span>Run This Case Study</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="rounded-2xl overflow-hidden border border-white/20 shadow-md">
              <img
                src={currentProj.image}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/queen-rania-corridor-twin.png';
                }}
                alt={currentProj.title}
                className="w-full h-auto object-cover max-h-[260px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. VALUE COMPARISON TABLE */}
      <section className="space-y-4">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-500">
            Civic Feasibility
          </div>
          <h3 className={`text-2xl font-bold tracking-tight ${isNight ? 'text-white' : 'text-slate-900'}`}>
            Physical Trials vs. Digital Twin Simulation
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table
            className={`w-full rounded-2xl border overflow-hidden text-xs font-mono ${
              isNight
                ? 'bg-[#0B1711]/90 border-emerald-500/20 text-white'
                : 'bg-white/70 border-white/90 text-slate-900'
            }`}
          >
            <thead>
              <tr className={`border-b ${isNight ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-white/60'}`}>
                <th className="p-3 text-left font-bold uppercase">Factor</th>
                <th className="p-3 text-left font-bold text-red-400">Physical Road Trial</th>
                <th className="p-3 text-left font-bold text-emerald-400">Digital Twin (SUMO)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-current/10">
              <tr>
                <td className="p-3 font-bold">Capital Cost</td>
                <td className="p-3 text-red-400 font-semibold">Millions of Dinars (Asphalt, Closures)</td>
                <td className="p-3 text-emerald-400 font-bold">Zero Trial Cost (100% In-Silicon)</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">Timeline</td>
                <td className="p-3 text-red-400 font-semibold">6 to 18 Months of Public Gridlock</td>
                <td className="p-3 text-emerald-400 font-bold">Minutes via Accelerated Solver</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">Public Safety</td>
                <td className="p-3 text-red-400 font-semibold">Live Traffic Risk & Congestion</td>
                <td className="p-3 text-emerald-400 font-bold">Zero Risk Virtual Sandbox</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="pt-4 text-center">
          <button
            onClick={onLaunch}
            className="group inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-[#44C2D0] to-[#51D3BE] text-[#14261B] text-xs font-extrabold tracking-tight shadow-md hover:scale-105 transition-all cursor-pointer"
          >
            <span>Launch Simulation Workspace</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>
    </div>
  );
};
