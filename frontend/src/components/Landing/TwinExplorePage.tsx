import React, { useState } from 'react';
import {
  Thermometer,
  Wind,
  Layers,
  TrendingDown,
  Gauge,
  Sliders,
  History,
  RotateCcw,
  Play,
  Pause,
  Camera,
  X,
  Clock
} from 'lucide-react';

interface TwinExplorePageProps {
  theme: 'day' | 'night';
  onExplore: () => void;
  onLaunch: () => void;
}

export const TwinExplorePage: React.FC<TwinExplorePageProps> = ({ theme }) => {
  const isNight = theme === 'night';

  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [activeIntervention, setActiveIntervention] = useState<'normal' | 'emergency' | 'cooling' | 'congestion'>('cooling');
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [vehicleCount, setVehicleCount] = useState<number>(18420);

  const scenarioHistory = [
    {
      id: 'SC-108',
      time: '14:25:00',
      scenario: 'Queen Rania Pine Canopy Buffer Activation',
      result: 'Surface temperature dropped -3.8°C at UOJ Gate',
      status: 'Validated'
    },
    {
      id: 'SC-107',
      time: '13:50:12',
      scenario: 'Emergency Ambulance Wave - Zahran Corridor',
      result: 'Downstream queues flushed, response time -4.2 min',
      status: 'Validated'
    },
    {
      id: 'SC-106',
      time: '12:15:40',
      scenario: 'BRT Transit Dedicated Signal Override',
      result: 'Transit throughput +34.5%, passenger delay -28%',
      status: 'Validated'
    },
    {
      id: 'SC-105',
      time: '11:00:22',
      scenario: '7th Circle Adaptive Split Balancing',
      result: 'Roundabout spillback dissolved, flow velocity +18%',
      status: 'Validated'
    }
  ];

  return (
    <div className="space-y-8 py-6">
      {/* 1. TOP EXECUTIVE TELEMETRY ROW (5 KPIs) */}
      <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {/* KPI 1: Heat Island */}
        <div
          className={`p-4 rounded-2xl border transition-all duration-300 hover:scale-[1.02] shadow-sm ${
            isNight
              ? 'bg-[#0B1812]/90 border-emerald-500/25'
              : 'bg-white/60 border-white/80 shadow-[0_4px_16px_rgba(20,40,25,0.04)]'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono text-emerald-500 mb-1">
            <span className="flex items-center gap-1.5">
              <Thermometer className="w-3.5 h-3.5" />
              <span>Junction Heat</span>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <div className={`text-2xl font-black font-mono ${isNight ? 'text-white' : 'text-slate-900'}`}>
            28.6°C
          </div>
          <div className="text-[10px] font-mono text-emerald-500 font-semibold mt-0.5">
            -3.8°C with Pine Canopy
          </div>
        </div>

        {/* KPI 2: Air Quality */}
        <div
          className={`p-4 rounded-2xl border transition-all duration-300 hover:scale-[1.02] shadow-sm ${
            isNight
              ? 'bg-[#0B1812]/90 border-cyan-500/25'
              : 'bg-white/60 border-white/80 shadow-[0_4px_16px_rgba(20,40,25,0.04)]'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono text-cyan-400 mb-1">
            <span className="flex items-center gap-1.5">
              <Wind className="w-3.5 h-3.5" />
              <span>Air Quality</span>
            </span>
            <span className="text-[10px] bg-cyan-500/15 px-1.5 rounded">AQI 42</span>
          </div>
          <div className={`text-2xl font-black font-mono ${isNight ? 'text-white' : 'text-slate-900'}`}>
            Optimal
          </div>
          <div className="text-[10px] font-mono text-slate-400 mt-0.5">
            418 ppm CO2 Level
          </div>
        </div>

        {/* KPI 3: Corridor Capacity */}
        <div
          className={`p-4 rounded-2xl border transition-all duration-300 hover:scale-[1.02] shadow-sm ${
            isNight
              ? 'bg-[#0B1812]/90 border-emerald-500/25'
              : 'bg-white/60 border-white/80 shadow-[0_4px_16px_rgba(20,40,25,0.04)]'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono text-emerald-500 mb-1">
            <span className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span>Corridor Capacity</span>
            </span>
            <span className="text-[10px] bg-emerald-500/15 px-1.5 rounded">94.2%</span>
          </div>
          <div className={`text-2xl font-black font-mono ${isNight ? 'text-white' : 'text-slate-900'}`}>
            18,420
          </div>
          <div className="text-[10px] font-mono text-slate-400 mt-0.5">
            Vehicles Per Hour
          </div>
        </div>

        {/* KPI 4: Carbon Emissions Offset */}
        <div
          className={`p-4 rounded-2xl border transition-all duration-300 hover:scale-[1.02] shadow-sm ${
            isNight
              ? 'bg-[#0B1812]/90 border-emerald-500/25'
              : 'bg-white/60 border-white/80 shadow-[0_4px_16px_rgba(20,40,25,0.04)]'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono text-emerald-500 mb-1">
            <span className="flex items-center gap-1.5">
              <TrendingDown className="w-3.5 h-3.5" />
              <span>Carbon Offset</span>
            </span>
            <span className="text-[10px] bg-emerald-500/15 px-1.5 rounded">Green</span>
          </div>
          <div className={`text-2xl font-black font-mono ${isNight ? 'text-white' : 'text-slate-900'}`}>
            -24.8%
          </div>
          <div className="text-[10px] font-mono text-emerald-500 font-semibold mt-0.5">
            Avoided Idling Losses
          </div>
        </div>

        {/* KPI 5: Transit Velocity */}
        <div
          className={`p-4 rounded-2xl border transition-all duration-300 hover:scale-[1.02] shadow-sm col-span-2 sm:col-span-1 ${
            isNight
              ? 'bg-[#0B1812]/90 border-cyan-500/25'
              : 'bg-white/60 border-white/80 shadow-[0_4px_16px_rgba(20,40,25,0.04)]'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono text-cyan-400 mb-1">
            <span className="flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5" />
              <span>BRT Velocity</span>
            </span>
            <span className="text-[10px] bg-cyan-500/15 px-1.5 rounded">+38.4%</span>
          </div>
          <div className={`text-2xl font-black font-mono ${isNight ? 'text-white' : 'text-slate-900'}`}>
            42 km/h
          </div>
          <div className="text-[10px] font-mono text-slate-400 mt-0.5">
            Dedicated Red Lane
          </div>
        </div>
      </section>

      {/* 2. SUMO MICROSCOPIC VIEWPORT CONTAINER */}
      <section
        className={`relative rounded-3xl border overflow-hidden shadow-2xl transition-all ${
          isNight ? 'bg-[#070F0B] border-emerald-500/30' : 'bg-slate-900 border-slate-700'
        }`}
      >
        {/* Top Viewport Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-black/40 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              SUMO ENGINE v1.21
            </span>
            <span className="text-xs font-mono text-slate-400">
              Corridor: Queen Rania St. (31.9875° N, 35.8752° E)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              title={isRunning ? 'Pause Simulation' : 'Resume Simulation'}
            >
              {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setVehicleCount((v) => (v === 18420 ? 19800 : 18420))}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              title="Reset View"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              title="Camera Switch"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Viewport Render Area with Crosshairs and Live Simulation Graphic */}
        <div className="relative min-h-[420px] lg:min-h-[500px] flex items-center justify-center overflow-hidden">
          {/* Architectural Digital Twin Viewport */}
          <img
            src="/queen-rania-corridor-twin-v2.png"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/queen-rania-corridor-twin.png';
            }}
            alt="SUMO Simulation Viewport"
            className="w-full h-full object-cover max-h-[540px] opacity-90 transition-transform duration-700"
          />

          {/* Center Targeting Crosshair */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="w-32 h-32 rounded-full border border-emerald-400/30 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399]" />
            </div>
            <div className="absolute w-48 h-px bg-emerald-400/25" />
            <div className="absolute h-48 w-px bg-emerald-400/25" />
          </div>

          {/* Floating Live Telemetry Chips */}
          <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-md rounded-2xl px-3.5 py-2 border border-emerald-500/40 font-mono text-xs text-left">
            <div className="text-[10px] text-slate-400 uppercase">ACTIVE AGENTS (SUMO)</div>
            <div className="text-sm font-bold text-emerald-400">{vehicleCount.toLocaleString()} Live Micro-Vehicles</div>
            <div className="text-[10px] text-cyan-300">TraCI Loop: 60 FPS Locked</div>
          </div>

          <div className="absolute bottom-4 left-4 bg-black/75 backdrop-blur-md rounded-2xl px-3.5 py-2 border border-white/20 font-mono text-xs text-left">
            <div className="text-[10px] text-slate-400 uppercase">SELECTED INTERVENTION</div>
            <div className="text-xs font-bold text-white capitalize">{activeIntervention} Protocol Active</div>
          </div>

          <div className="absolute bottom-4 right-4 bg-black/75 backdrop-blur-md rounded-2xl px-3.5 py-2 border border-cyan-500/40 font-mono text-xs text-right">
            <div className="text-[10px] text-slate-400 uppercase">SIGNAL COORDINATION</div>
            <div className="text-xs font-bold text-cyan-400">Green Wave: Autonomous Sync</div>
          </div>
        </div>
      </section>

      {/* 3. CONTROL YOUR SCENARIO PANEL */}
      <section
        className={`p-6 rounded-3xl border transition-all ${
          isNight ? 'bg-[#0B1812]/90 border-emerald-500/20' : 'bg-white/60 border-white/80 shadow-md'
        }`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-current/10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-500">
              <Sliders className="w-3.5 h-3.5" />
              <span>Control Your Scenario</span>
            </div>
            <h3 className={`text-xl font-extrabold tracking-tight mt-0.5 ${isNight ? 'text-white' : 'text-slate-900'}`}>
              Autonomous Intervention Controller
            </h3>
          </div>

          {/* Dedicated Scenario History Button */}
          <button
            onClick={() => setShowHistory(true)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-mono font-bold transition-all cursor-pointer ${
              isNight
                ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'
                : 'border-[#3B654C]/25 bg-white text-slate-800 hover:bg-slate-50'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Scenario History</span>
          </button>
        </div>

        {/* Intervention Selection Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-4">
          {[
            {
              id: 'normal',
              label: 'Standard Traffic Flow',
              desc: 'Baseline morning peak with fixed signal timing plans.'
            },
            {
              id: 'emergency',
              label: 'Emergency Green Corridor',
              desc: 'Dynamic preemption opening signals for approaching ambulances.'
            },
            {
              id: 'cooling',
              label: 'Microclimate Pine Canopy',
              desc: 'Thermal shadow cooling reducing asphalt heat by -3.8°C.'
            },
            {
              id: 'congestion',
              label: 'Adaptive Queue Dissolution',
              desc: 'Real-time phase modulation eliminating circle spillback.'
            }
          ].map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveIntervention(item.id as any)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer text-left ${
                activeIntervention === item.id
                  ? isNight
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md scale-[1.02] font-semibold'
                    : 'bg-[#44C2D0] text-slate-950 border-[#44C2D0] shadow-md scale-[1.02] font-semibold'
                  : isNight
                  ? 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-200'
                  : 'bg-white/40 border-white/70 hover:bg-white/80 text-slate-800'
              }`}
            >
              <div className="text-xs font-bold font-mono mb-1">{item.label}</div>
              <p className="text-[11px] leading-relaxed opacity-80">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SCENARIO HISTORY MODAL / DRAWER */}
      {showHistory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div
            className={`w-full max-w-xl rounded-3xl border p-6 space-y-4 shadow-2xl ${
              isNight ? 'bg-[#0B1812] border-emerald-500/30 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-current/10">
              <div className="flex items-center gap-2">
                <History className="w-5 h-5 text-emerald-500" />
                <h4 className="text-lg font-bold">Scenario Execution Log</h4>
              </div>
              <button
                onClick={() => setShowHistory(false)}
                className="p-1 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2.5 max-h-[340px] overflow-y-auto pr-1">
              {scenarioHistory.map((item) => (
                <div
                  key={item.id}
                  className={`p-3.5 rounded-2xl border text-xs font-mono text-left flex items-start justify-between gap-3 ${
                    isNight ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-emerald-500">{item.id}</span>
                      <span className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {item.time}
                      </span>
                    </div>
                    <div className="font-semibold font-sans">{item.scenario}</div>
                    <div className="text-[11px] text-slate-400 font-sans">{item.result}</div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/15 text-emerald-500 border border-emerald-500/30 font-semibold shrink-0">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setShowHistory(false)}
                className="px-5 py-2 rounded-full bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors cursor-pointer"
              >
                Close History
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
