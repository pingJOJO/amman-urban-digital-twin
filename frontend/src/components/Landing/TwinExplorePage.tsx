import React, { useState } from 'react';
import {
  Thermometer,
  Wind,
  Gauge,
  TrendingDown,
  Bus,
  Siren,
  Sliders,
  RotateCcw,
  History,
  Maximize2,
  Play,
  Pause,
  ArrowRight
} from 'lucide-react';

interface TwinExplorePageProps {
  theme: 'day' | 'night';
  onExplore: () => void;
  onLaunch: () => void;
}

export const TwinExplorePage: React.FC<TwinExplorePageProps> = ({
  theme,
  onLaunch
}) => {
  const isNight = theme === 'night';

  // Live Scenario Parameters (Mock Controls)
  const [trafficDensity, setTrafficDensity] = useState<number>(14500);
  const [surfaceTemp, setSurfaceTemp] = useState<number>(35.2);
  const [emergencyActive, setEmergencyActive] = useState<boolean>(true);
  const [canopyActive, setCanopyActive] = useState<boolean>(true);
  const [brtSurgeActive, setBrtSurgeActive] = useState<boolean>(true);
  const [simPlaying, setSimPlaying] = useState<boolean>(true);
  const [showHistoryModal, setShowHistoryModal] = useState<boolean>(false);

  // Dynamic calculations
  const calculatedDelay = Math.round((trafficDensity / 420) * (emergencyActive ? 0.62 : 1.0));
  const calculatedTemp = canopyActive ? (surfaceTemp - 3.8).toFixed(1) : surfaceTemp.toFixed(1);
  const calculatedCO2 = Math.round(trafficDensity * 0.11 * (canopyActive ? 0.8 : 1.0));
  const brtVelocity = brtSurgeActive ? '+38.4%' : '+18.2%';
  const aqiScore = canopyActive ? 42 : 68;

  // Mock History Records
  const historyRuns = [
    {
      id: 'RUN-2026-089',
      timestamp: 'Today, 10:45 AM',
      scenario: 'Emergency Wave: JUH to 8th Circle',
      result: '-4.2m Response Time (100% Preempted)',
      status: 'Passed'
    },
    {
      id: 'RUN-2026-088',
      timestamp: 'Today, 09:12 AM',
      scenario: 'Queen Rania BRT Frequency Surge',
      result: '+34.5% Velocity, Zero Deadlock',
      status: 'Validated'
    },
    {
      id: 'RUN-2026-087',
      timestamp: 'Yesterday, 16:30 PM',
      scenario: 'Canopy Microclimate Cooling (35.2°C)',
      result: '-3.8°C Asphalt Drop, 28.6°C Ambient',
      status: 'Target Met'
    },
    {
      id: 'RUN-2026-086',
      timestamp: 'Yesterday, 14:15 PM',
      scenario: '7th Circle Queue Flushing Algorithm',
      result: '-32.4% Spillback Prevention',
      status: 'Optimized'
    }
  ];

  return (
    <div className="space-y-8 py-6">
      {/* 1. TOP EXECUTIVE KPI DASHBOARD (5 Core Urban Metrics) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className={isNight ? 'text-slate-300' : 'text-slate-700'}>
              Live Telemetry Dashboard • SUMO Pipeline
            </span>
          </div>
          <span className="text-[11px] font-mono text-emerald-500 font-semibold">
            Network Sync: 60 FPS
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {/* 1. Junction Heat */}
          <div
            className={`p-4 rounded-2xl border transition-all ${
              isNight
                ? 'bg-[#0B1711]/90 border-emerald-500/25 shadow-sm'
                : 'bg-white/70 border-white/90 shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className={`text-[11px] font-mono ${isNight ? 'text-slate-400' : 'text-slate-600'}`}>
                Junction Heat
              </span>
              <Thermometer className="w-4 h-4 text-emerald-500" />
            </div>
            <div className={`text-2xl font-black font-mono ${isNight ? 'text-white' : 'text-slate-900'}`}>
              {calculatedTemp}°C
            </div>
            <div className="text-[10.5px] font-mono text-emerald-500 mt-0.5">
              {canopyActive ? '-3.8°C via Canopy' : '35.2°C Asphalt Trap'}
            </div>
          </div>

          {/* 2. Air Quality & Dispersion */}
          <div
            className={`p-4 rounded-2xl border transition-all ${
              isNight
                ? 'bg-[#0B1711]/90 border-cyan-500/25 shadow-sm'
                : 'bg-white/70 border-white/90 shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className={`text-[11px] font-mono ${isNight ? 'text-slate-400' : 'text-slate-600'}`}>
                Air Quality
              </span>
              <Wind className="w-4 h-4 text-cyan-400" />
            </div>
            <div className={`text-2xl font-black font-mono ${isNight ? 'text-white' : 'text-slate-900'}`}>
              AQI {aqiScore}
            </div>
            <div className="text-[10.5px] font-mono text-cyan-400 mt-0.5">
              {canopyActive ? 'Good • 418 ppm CO2' : 'Moderate'}
            </div>
          </div>

          {/* 3. Corridor Capacity */}
          <div
            className={`p-4 rounded-2xl border transition-all ${
              isNight
                ? 'bg-[#0B1711]/90 border-emerald-500/25 shadow-sm'
                : 'bg-white/70 border-white/90 shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className={`text-[11px] font-mono ${isNight ? 'text-slate-400' : 'text-slate-600'}`}>
                Corridor Flow
              </span>
              <Gauge className="w-4 h-4 text-emerald-400" />
            </div>
            <div className={`text-2xl font-black font-mono ${isNight ? 'text-white' : 'text-slate-900'}`}>
              {trafficDensity.toLocaleString()}
            </div>
            <div className="text-[10.5px] font-mono text-emerald-400 mt-0.5">
              VPH • Normal Service
            </div>
          </div>

          {/* 4. Carbon Emissions Mitigation */}
          <div
            className={`p-4 rounded-2xl border transition-all ${
              isNight
                ? 'bg-[#0B1711]/90 border-indigo-500/25 shadow-sm'
                : 'bg-white/70 border-white/90 shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className={`text-[11px] font-mono ${isNight ? 'text-slate-400' : 'text-slate-600'}`}>
                Carbon Offset
              </span>
              <TrendingDown className="w-4 h-4 text-indigo-400" />
            </div>
            <div className={`text-2xl font-black font-mono ${isNight ? 'text-white' : 'text-slate-900'}`}>
              -24.8%
            </div>
            <div className="text-[10.5px] font-mono text-indigo-400 mt-0.5">
              {calculatedCO2} kg/hr Dispersed
            </div>
          </div>

          {/* 5. Transit Reliability */}
          <div
            className={`p-4 rounded-2xl border col-span-2 md:col-span-1 transition-all ${
              isNight
                ? 'bg-[#0B1711]/90 border-amber-500/25 shadow-sm'
                : 'bg-white/70 border-white/90 shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className={`text-[11px] font-mono ${isNight ? 'text-slate-400' : 'text-slate-600'}`}>
                BRT Velocity
              </span>
              <Bus className="w-4 h-4 text-amber-400" />
            </div>
            <div className={`text-2xl font-black font-mono ${isNight ? 'text-white' : 'text-slate-900'}`}>
              {brtVelocity}
            </div>
            <div className="text-[10.5px] font-mono text-amber-400 mt-0.5">
              Dedicated Red Lane
            </div>
          </div>
        </div>
      </section>

      {/* 2. SUMO MICROSCOPIC VIEWPORT CONTAINER */}
      <section
        className={`rounded-3xl border overflow-hidden shadow-2xl transition-all ${
          isNight
            ? 'bg-[#08120D] border-emerald-500/30'
            : 'bg-white/80 border-slate-300/80 shadow-[0_16px_40px_rgba(20,40,25,0.08)]'
        }`}
      >
        {/* Viewport Top Bar */}
        <div
          className={`px-5 py-3 border-b flex items-center justify-between text-xs font-mono ${
            isNight
              ? 'bg-[#0D1D16] border-emerald-500/20 text-slate-300'
              : 'bg-slate-100/80 border-slate-200 text-slate-700'
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/15 text-emerald-400 font-bold border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              SUMO ENGINE v1.21
            </span>
            <span className="hidden sm:inline-block opacity-75">
              TraCI AI Control Loop: Active
            </span>
            <span className="hidden md:inline-block opacity-50">•</span>
            <span className="hidden md:inline-block opacity-75">
              Nodes: Queen Rania & UOJ Gateway
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSimPlaying(!simPlaying)}
              className={`p-1.5 rounded-lg border flex items-center gap-1 transition-all cursor-pointer ${
                simPlaying
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                  : 'bg-amber-500/20 border-amber-500/40 text-amber-400'
              }`}
            >
              {simPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span className="text-[11px]">{simPlaying ? 'Live' : 'Paused'}</span>
            </button>
            <button
              onClick={onLaunch}
              className="p-1.5 rounded-lg border border-current/20 hover:bg-current/10 cursor-pointer"
              title="Full Viewport"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Viewport Canvas / Stream Screen */}
        <div className="relative aspect-video w-full max-h-[460px] overflow-hidden bg-slate-950 flex items-center justify-center group">
          <img
            src="/queen-rania-corridor-twin-v2.png"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/queen-rania-corridor-twin.png';
            }}
            alt="SUMO Microscopic Corridor Simulation"
            className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-[1.02]"
          />

          {/* High-tech Viewport Crosshairs & HUD Overlays */}
          <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-4">
            <div className="flex justify-between items-start">
              <div className="backdrop-blur-md bg-black/70 border border-emerald-500/40 rounded-xl p-2.5 text-left font-mono text-[11px] text-emerald-400 space-y-0.5">
                <div>LAT 31.9892° N • LON 35.8714° E</div>
                <div className="text-white font-bold">Active Agents: {trafficDensity.toLocaleString()}</div>
                <div className="text-cyan-400">Delay: {calculatedDelay}s • Clearance: 94.2%</div>
              </div>

              <div className="backdrop-blur-md bg-black/70 border border-cyan-500/40 rounded-xl px-3 py-1.5 text-xs font-mono text-cyan-300">
                Ready for SUMO Canvas / WebSocket Feed
              </div>
            </div>

            <div className="flex justify-between items-end">
              <div className="backdrop-blur-md bg-black/70 border border-white/20 rounded-xl px-3 py-1.5 text-[11px] font-mono text-slate-300">
                Queen Rania Al-Abdullah Dedicated BRT Segment
              </div>
              <div className="backdrop-blur-md bg-black/70 border border-emerald-500/40 rounded-xl px-3 py-1.5 text-xs font-mono text-emerald-400 font-bold">
                {emergencyActive ? 'Emergency Corridor Active' : 'Standard Routine'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CONTROL YOUR SCENARIO & HISTORY CONTROLLER */}
      <section
        className={`p-6 sm:p-8 rounded-3xl border shadow-lg space-y-6 ${
          isNight
            ? 'bg-[#0B1711]/90 border-emerald-500/25 text-white'
            : 'bg-white/70 border-white/90 text-slate-900'
        }`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-current/15">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-500">
              <Sliders className="w-4 h-4" />
              <span>Control Your Scenario</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight mt-0.5">
              Live Parameter Tuning & Interventions
            </h2>
          </div>

          {/* Scenario History Log Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowHistoryModal(!showHistoryModal)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-mono font-bold tracking-wider transition-all cursor-pointer ${
                showHistoryModal
                  ? 'bg-emerald-500 text-slate-950 border-emerald-500 shadow-md'
                  : 'bg-white/10 hover:bg-white/20 border-current/20'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>Scenario History</span>
            </button>

            <button
              onClick={() => {
                setTrafficDensity(14500);
                setSurfaceTemp(35.2);
                setEmergencyActive(true);
                setCanopyActive(true);
                setBrtSurgeActive(true);
              }}
              className="p-2 rounded-xl border border-current/20 hover:bg-current/10 cursor-pointer"
              title="Reset Parameters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Live Scenario History Drawer / Modal */}
        {showHistoryModal && (
          <div className="p-4 rounded-2xl border border-emerald-500/30 bg-black/30 backdrop-blur-md space-y-2.5 animate-fadeIn">
            <div className="flex items-center justify-between text-xs font-mono text-emerald-400 font-bold border-b border-white/10 pb-2">
              <span>Historical Simulation Benchmarks</span>
              <span>Validated Logs</span>
            </div>
            <div className="space-y-2">
              {historyRuns.map((run, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono gap-1"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-200">{run.id}</span>
                    <span className="text-slate-400">• {run.scenario}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-emerald-400">{run.result}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 font-bold">
                      {run.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4 Interactive Intervention Toggles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Toggle 1: Emergency Preemption */}
          <div
            onClick={() => setEmergencyActive(!emergencyActive)}
            className={`p-4 rounded-2xl border cursor-pointer transition-all ${
              emergencyActive
                ? isNight
                  ? 'bg-emerald-950/40 border-emerald-500 text-white'
                  : 'bg-emerald-50 border-emerald-500 text-emerald-950'
                : 'bg-white/5 border-current/10 opacity-70'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <Siren className={`w-5 h-5 ${emergencyActive ? 'text-red-400' : 'text-slate-400'}`} />
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${emergencyActive ? 'bg-red-500/20 text-red-400' : 'bg-slate-500/20 text-slate-400'}`}>
                {emergencyActive ? 'ACTIVE' : 'OFF'}
              </span>
            </div>
            <div className="text-sm font-bold">Emergency Wave</div>
            <p className="text-xs opacity-75 mt-0.5">Preempts 6 signals for JUH ambulances.</p>
          </div>

          {/* Toggle 2: Pine Canopy Cooling */}
          <div
            onClick={() => setCanopyActive(!canopyActive)}
            className={`p-4 rounded-2xl border cursor-pointer transition-all ${
              canopyActive
                ? isNight
                  ? 'bg-emerald-950/40 border-emerald-500 text-white'
                  : 'bg-emerald-50 border-emerald-500 text-emerald-950'
                : 'bg-white/5 border-current/10 opacity-70'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <Thermometer className="w-5 h-5 text-emerald-400" />
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${canopyActive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-500/20 text-slate-400'}`}>
                {canopyActive ? '-3.8°C' : 'OFF'}
              </span>
            </div>
            <div className="text-sm font-bold">Pine Canopy Buffer</div>
            <p className="text-xs opacity-75 mt-0.5">Cooling 35.2°C asphalt at university gate.</p>
          </div>

          {/* Toggle 3: BRT Frequency Surge */}
          <div
            onClick={() => setBrtSurgeActive(!brtSurgeActive)}
            className={`p-4 rounded-2xl border cursor-pointer transition-all ${
              brtSurgeActive
                ? isNight
                  ? 'bg-emerald-950/40 border-emerald-500 text-white'
                  : 'bg-emerald-50 border-emerald-500 text-emerald-950'
                : 'bg-white/5 border-current/10 opacity-70'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <Bus className="w-5 h-5 text-amber-400" />
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${brtSurgeActive ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-500/20 text-slate-400'}`}>
                {brtSurgeActive ? '+38.4%' : 'OFF'}
              </span>
            </div>
            <div className="text-sm font-bold">BRT Express Surge</div>
            <p className="text-xs opacity-75 mt-0.5">Dedicated lane bus interval priority.</p>
          </div>

          {/* Toggle 4: Traffic Demand Slider */}
          <div className="p-4 rounded-2xl border border-current/10 bg-white/5 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="opacity-75">Vehicle Density</span>
              <span className="font-bold text-emerald-400">{trafficDensity.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="5000"
              max="25000"
              step="1000"
              value={trafficDensity}
              onChange={(e) => setTrafficDensity(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-700 rounded-lg"
            />
            <div className="flex justify-between text-[10px] font-mono opacity-50">
              <span>Off-Peak</span>
              <span>Gridlock</span>
            </div>
          </div>
        </div>

        {/* Bottom CTA to Launch Simulation Workspace */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs font-mono opacity-75">
            Microscopic TraCI execution loop ready for socket handshakes.
          </div>
          <button
            onClick={onLaunch}
            className="group inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-gradient-to-r from-[#44C2D0] to-[#51D3BE] text-[#14261B] text-xs font-extrabold tracking-tight shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <span>Launch Simulation Workspace</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>
    </div>
  );
};
