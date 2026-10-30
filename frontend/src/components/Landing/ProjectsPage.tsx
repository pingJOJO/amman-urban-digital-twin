import React from 'react';
import {
  FolderKanban,
  CheckCircle2,
  XCircle,
  Bus,
  Activity,
  Thermometer,
  Siren,
  ArrowRight
} from 'lucide-react';

interface ProjectsPageProps {
  theme: 'day' | 'night';
  onExplore: () => void;
  onLaunch: () => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ theme, onLaunch }) => {
  const isNight = theme === 'night';

  const projects = [
    {
      id: 'PRJ-BRT-01',
      title: 'Amman BRT Transit Corridor Priority',
      corridor: 'Queen Rania Al-Abdullah Street',
      desc: 'Simulating dedicated red lane signal preemption at University gates, achieving +34.5% transit velocity gains while containing cross-traffic delays.',
      metrics: [
        { label: 'Transit Velocity', value: '+34.5%' },
        { label: 'Passenger Delay', value: '-28.0%' }
      ],
      icon: Bus,
      tag: 'Public Transit'
    },
    {
      id: 'PRJ-CIRC-02',
      title: '7th & 8th Circles Congestion Dissolution',
      corridor: 'Zahran Arterial Highway',
      desc: 'Microscopic agent testing of adaptive signal metering. Modulating phase splits to eliminate roundabout queue spillback during peak morning hours.',
      metrics: [
        { label: 'Queue Length', value: '-32.4%' },
        { label: 'Intersection Delay', value: '-4.8 min' }
      ],
      icon: Activity,
      tag: 'Adaptive Signal AI'
    },
    {
      id: 'PRJ-HEAT-03',
      title: 'University Gate Urban Heat Island Offset',
      corridor: 'Queen Rania - UOJ Campus Buffer',
      desc: 'Spatial microclimate modeling of 35.2°C open asphalt traps and evaluating native pine canopy shade to achieve a -3.8°C thermal drop.',
      metrics: [
        { label: 'Asphalt Heat', value: '-3.8°C' },
        { label: 'Pedestrian Comfort', value: '+46.0%' }
      ],
      icon: Thermometer,
      tag: 'Microclimate'
    },
    {
      id: 'PRJ-EMRG-04',
      title: 'Civil Defense Green Wave Preemption',
      corridor: 'Citywide Emergency Grid',
      desc: 'Autonomous TraCI signal override granting green waves to ambulances, cutting emergency response times by 4.2 minutes across Amman.',
      metrics: [
        { label: 'Response Time', value: '-4.2 min' },
        { label: 'Incident Clearance', value: '100%' }
      ],
      icon: Siren,
      tag: 'Emergency Services'
    }
  ];

  const comparison = [
    {
      criteria: 'Capital Expenditure',
      physical: 'Millions of Dinars in physical roadworks & asphalt modifications',
      digital: 'Zero physical spend; 100% verified in high-fidelity simulation',
      better: 'digital'
    },
    {
      criteria: 'Public Traffic Disruption',
      physical: 'Months of detours, gridlock, and commuter frustration',
      digital: 'Zero citizen disruption; millions of vehicles tested in silicon',
      better: 'digital'
    },
    {
      criteria: 'Iteration Speed',
      physical: '6 to 18 months per physical trial with irreversible risks',
      digital: 'Instant parameter tweaking; 60 FPS microscopic validation',
      better: 'digital'
    },
    {
      criteria: 'Environmental Impact Modeling',
      physical: 'Difficult to quantify before construction is complete',
      digital: 'Predictive CO2 dispersion and 35.2°C thermal heat island mapping',
      better: 'digital'
    }
  ];

  return (
    <div className="space-y-16 py-8">
      {/* 1. HEADER */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <div
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-mono font-bold tracking-wider uppercase shadow-sm ${
            isNight
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
              : 'bg-white/65 border-white/85 text-[#1F5435]'
          }`}
        >
          <FolderKanban className="w-4 h-4 text-emerald-500" />
          <span>Municipal Simulation Portfolio 2026</span>
        </div>

        <div className="space-y-1">
          <h1
            className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${
              isNight ? 'text-white' : 'text-[#133020]'
            }`}
          >
            Digital Twin Project Showcase
          </h1>
          <h2 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-[#4A72DF] via-[#48C3CB] to-[#5BCF7B] bg-clip-text text-transparent pb-1">
            Real Infrastructure Scenarios Simulated Before Construction
          </h2>
        </div>

        <p
          className={`text-sm sm:text-base leading-relaxed max-w-xl mx-auto ${
            isNight ? 'text-slate-300' : 'text-slate-700'
          }`}
        >
          Four targeted microscopic co-simulation case studies across Amman's vital transport corridors, balancing mobility, emergency access, and microclimates.
        </p>
      </section>

      {/* 2. FOUR PROJECT CARDS */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((proj) => {
          const Icon = proj.icon;
          return (
            <div
              key={proj.id}
              className={`p-6 rounded-3xl border shadow-sm flex flex-col justify-between transition-all duration-300 hover:scale-[1.01] ${
                isNight
                  ? 'bg-[#0B1812]/85 border-emerald-500/20 hover:border-emerald-500/50'
                  : 'bg-white/60 border-white/85 shadow-[0_8px_24px_rgba(20,40,25,0.05)] hover:bg-white/80'
              }`}
            >
              <div className="space-y-3 text-left">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-slate-500 uppercase">{proj.id}</span>
                      <div className="text-xs font-mono font-semibold text-emerald-500">{proj.corridor}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full border bg-white/5 border-current/15">
                    {proj.tag}
                  </span>
                </div>

                <h3 className={`text-lg font-bold ${isNight ? 'text-white' : 'text-[#133020]'}`}>
                  {proj.title}
                </h3>

                <p className={`text-xs sm:text-sm leading-relaxed ${isNight ? 'text-slate-300' : 'text-slate-600'}`}>
                  {proj.desc}
                </p>
              </div>

              <div className={`grid grid-cols-2 gap-3 pt-4 mt-4 border-t ${isNight ? 'border-white/10' : 'border-[#3B654C]/15'}`}>
                {proj.metrics.map((m, idx) => (
                  <div key={idx} className="text-left font-mono">
                    <div className="text-[10px] text-slate-500 uppercase">{m.label}</div>
                    <div className="text-lg font-black text-emerald-400">{m.value}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* 3. COMPARISON: PHYSICAL TRIALS VS DIGITAL TWIN */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h3 className={`text-2xl sm:text-3xl font-extrabold ${isNight ? 'text-white' : 'text-[#133020]'}`}>
            Physical Road Trials vs Digital Twin Feasibility
          </h3>
          <p className={`text-xs sm:text-sm ${isNight ? 'text-slate-300' : 'text-slate-600'}`}>
            Why testing infrastructure hypotheses in virtual simulation outperforms risky on-ground modifications.
          </p>
        </div>

        <div
          className={`rounded-3xl border overflow-hidden shadow-lg ${
            isNight ? 'bg-[#0B1812]/90 border-emerald-500/25' : 'bg-white/70 border-white/90 shadow-md'
          }`}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className={`border-b font-mono text-[11px] uppercase tracking-wider ${isNight ? 'border-white/10 text-slate-400 bg-white/5' : 'border-slate-200 text-slate-600 bg-slate-50'}`}>
                  <th className="p-4 pl-6">Evaluation Criteria</th>
                  <th className="p-4 text-red-400">Physical Road Trial</th>
                  <th className="p-4 pr-6 text-emerald-400">Digital Twin Co-Simulation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-current/10">
                {comparison.map((row, idx) => (
                  <tr key={idx} className="transition-colors hover:bg-white/5">
                    <td className="p-4 pl-6 font-bold font-mono text-xs">{row.criteria}</td>
                    <td className="p-4 text-slate-400">
                      <div className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                        <span>{row.physical}</span>
                      </div>
                    </td>
                    <td className="p-4 pr-6 font-semibold">
                      <div className="flex items-start gap-2 text-emerald-500">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span className={isNight ? 'text-slate-200' : 'text-slate-800'}>{row.digital}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. BOTTOM ACTION */}
      <section className="text-center pt-2">
        <button
          onClick={onLaunch}
          className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#44C2D0] to-[#51D3BE] text-[#14261B] text-sm font-extrabold tracking-tight shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <span>Launch Municipal Simulation Workspace</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-1 transition-transform" />
        </button>
      </section>
    </div>
  );
};
