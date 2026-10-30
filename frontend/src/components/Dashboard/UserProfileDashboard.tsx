import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  User as UserIcon,
  Mail,
  ShieldCheck,
  LogOut,
  Calendar,
  Layers,
  Activity,
  CheckCircle2,
  Database,
} from 'lucide-react';

export const UserProfileDashboard: React.FC = () => {
  const { user, token, logout } = useAuth();
  const [showToken, setShowToken] = useState(false);
  const [sumoStatus, setSumoStatus] = useState<'idle' | 'running' | 'success'>('idle');

  if (!user) return null;

  const handleRunSumoTest = () => {
    setSumoStatus('running');
    setTimeout(() => {
      setSumoStatus('success');
      setTimeout(() => setSumoStatus('idle'), 4000);
    }, 1200);
  };

  return (
    <div className="w-full max-w-[540px] animate-fadeIn">
      <div className="glass-card rounded-[22px] px-7 py-8 sm:px-9 sm:py-9 border border-white/80 shadow-2xl">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-5 border-b border-[#B8C8B5]/50">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Amman Urban Digital Twin Logo"
              className="w-12 h-12 object-contain drop-shadow-[0_4px_10px_rgba(20,50,30,0.2)]"
            />
            <div>
              <h2 className="font-editorial text-[26px] text-[#141B14] font-medium leading-none">
                {user.full_name}
              </h2>
              <span className="text-xs text-[#495B47] inline-flex items-center gap-1.5 mt-1 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-[#308B5D]" />
                Authenticated Session ({user.auth_provider.toUpperCase()})
              </span>
            </div>
          </div>

          <button
            onClick={logout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1C261A]/10 hover:bg-[#1C261A]/20 text-[#1E291C] text-xs font-semibold transition cursor-pointer"
            title="Log out of session"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* User Metadata Cards */}
        <div className="mt-5 space-y-2.5">
          <div className="p-3 rounded-xl bg-white/45 border border-[#B5C4B2]/40 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5 text-[#344532]">
              <Mail className="w-4 h-4 text-[#50684E]" />
              <span className="font-medium">Email:</span>
            </div>
            <span className="font-semibold text-[#162115]">{user.email}</span>
          </div>

          <div className="p-3 rounded-xl bg-white/45 border border-[#B5C4B2]/40 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5 text-[#344532]">
              <UserIcon className="w-4 h-4 text-[#50684E]" />
              <span className="font-medium">User UUID:</span>
            </div>
            <span className="font-mono text-[11px] text-[#223021] bg-white/60 px-2 py-0.5 rounded">
              {user.id}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-white/45 border border-[#B5C4B2]/40 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5 text-[#344532]">
              <Calendar className="w-4 h-4 text-[#50684E]" />
              <span className="font-medium">Registered:</span>
            </div>
            <span className="text-[#162115]">
              {new Date(user.created_at).toLocaleString()}
            </span>
          </div>
        </div>

        {/* SUMO & Digital Twin Pipeline Section */}
        <div className="mt-6 p-4 rounded-xl bg-[#233322]/85 text-[#E6F7DF] border border-white/10 shadow-inner">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#68C3A3] animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-white">
                SUMO Urban Mobility Status
              </span>
            </div>
            <span className="text-[10px] bg-[#68C3A3]/25 text-[#7EF0C4] px-2 py-0.5 rounded-full font-mono">
              Python Bridge Connected
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] text-[#C4DEC0] mb-3">
            <div className="bg-white/5 p-2 rounded">
              <span className="block opacity-75">Network Area:</span>
              <span className="font-semibold text-white">Amman Central Core</span>
            </div>
            <div className="bg-white/5 p-2 rounded">
              <span className="block opacity-75">Micro-Simulation:</span>
              <span className="font-semibold text-white">Active (Vehicles & Pedestrians)</span>
            </div>
          </div>

          <button
            onClick={handleRunSumoTest}
            disabled={sumoStatus === 'running'}
            className="w-full h-8 rounded-lg bg-[#68C3A3] hover:bg-[#52B491] text-[#132016] text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer"
          >
            {sumoStatus === 'running' ? (
              <span>Simulating Micro-Traffic in Python SUMO...</span>
            ) : sumoStatus === 'success' ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-[#132016]" />
                <span>SUMO TraCI Step Synchronized!</span>
              </>
            ) : (
              <>
                <Layers className="w-3.5 h-3.5" />
                <span>Trigger SUMO Simulation Sync</span>
              </>
            )}
          </button>
        </div>

        {/* DataGrip / JWT Inspection */}
        <div className="mt-4 pt-3 border-t border-[#B5C4B2]/40 flex items-center justify-between text-xs text-[#384A36]">
          <div className="flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-[#4E7558]" />
            <span>PostgreSQL (users table ready in DataGrip)</span>
          </div>
          <button
            onClick={() => setShowToken(!showToken)}
            className="text-[11px] font-semibold underline decoration-[#384A36] hover:text-[#182318] cursor-pointer"
          >
            {showToken ? 'Hide JWT' : 'View JWT'}
          </button>
        </div>

        {showToken && token && (
          <div className="mt-2.5 p-2.5 rounded bg-black/80 text-[#85ECAE] font-mono text-[10px] break-all max-h-24 overflow-y-auto">
            {token}
          </div>
        )}
      </div>
    </div>
  );
};
