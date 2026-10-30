import React, { useState } from 'react';
import {
  Activity,
  Siren,
  Thermometer,
  Cpu,
  ArrowRight,
  Sliders,
  RotateCcw,
  Zap,
  Bus,
  ShieldCheck,
  TrendingDown,
  Gauge
} from 'lucide-react';

interface TwinExplorePageProps {
  lang: 'EN' | 'AR';
  theme: 'day' | 'night';
  onExplore: () => void;
  onLaunch: () => void;
}

export const TwinExplorePage: React.FC<TwinExplorePageProps> = ({
  lang,
  theme,
  onLaunch
}) => {
  const isAr = lang === 'AR';
  const isNight = theme === 'night';

  // Interactive Sandbox Controls (Mock parameters)
  const [trafficDensity, setTrafficDensity] = useState<number>(14500); // 5000 to 25000 vehicles
  const [surfaceTemp, setSurfaceTemp] = useState<number>(35.2); // 20 to 45 °C
  const [emergencyActive, setEmergencyActive] = useState<boolean>(true);
  const [treeCanopyActive, setTreeCanopyActive] = useState<boolean>(true);
  const [activeScenarioId, setActiveScenarioId] = useState<number>(0);

  // Dynamic calculations based on sliders
  const calculatedDelay = Math.round((trafficDensity / 400) * (emergencyActive ? 0.65 : 1.0));
  const calculatedTemp = treeCanopyActive ? (surfaceTemp - 3.8).toFixed(1) : surfaceTemp.toFixed(1);
  const calculatedCO2 = Math.round(trafficDensity * 0.12 * (treeCanopyActive ? 0.82 : 1.0));
  const brtEfficiency = treeCanopyActive ? '+34.5%' : '+18.0%';

  const scenarios = [
    {
      id: 0,
      titleEn: 'Queen Rania BRT & Thermal Mitigation',
      titleAr: 'شارع الملكة رانيا • الباص السريع والتبريد',
      badgeEn: 'University Corridor',
      badgeAr: 'شريان الجامعة الأردنية',
      icon: Bus,
      descEn:
        'Analyzes dedicated red BRT lane speed vs mixed private vehicle congestion alongside the 35.2°C asphalt heat trap at the University gate.',
      descAr:
        'محاكاة سرعة وانسيابية الباص السريع في مساره المخصص مقابل ازدحام المركبات، وتبريد بؤرة 35.2°C الإسفلتية بأشجار سور الجامعة.',
      node: 'UOJ-CORRIDOR-01'
    },
    {
      id: 1,
      titleEn: 'Emergency Green Wave Preemption',
      titleAr: 'الموجة الخضراء الذكية لمركبات الإسعاف',
      badgeEn: 'Ambulance Priority',
      badgeAr: 'أولوية الدفاع المدني',
      icon: Siren,
      descEn:
        'Overrides 6 consecutive signal phases dynamically to allow Civil Defense ambulances swift clearance between Jordan University Hospital and 8th Circle.',
      descAr:
        'فتح 6 إشارات ضوئية متتالية استباقياً لمركبات الإسعاف بين مستشفى الجامعة الأردنية والدوار الثامن لتقليص زمن الاستجابة.',
      node: 'AMBULANCE-WAVE-09'
    },
    {
      id: 2,
      titleEn: 'Adaptive Congestion Dissolution (7th Circle)',
      titleAr: 'خوارزمية فك الاختناقات التلقائية (الدوار السابع)',
      badgeEn: 'Roundabout Flow',
      badgeAr: 'إدارة تدفق الدوار',
      icon: Cpu,
      descEn:
        'Modulates green phase splits dynamically via Python TraCI loop to prevent traffic spillback onto Zahran arterial street.',
      descAr:
        'تعديل ديناميكي لأزمنة الإشارات الضوئية ذاتياً عبر خوارزمية بايثون لمنع ارتداد الطوابير إلى شارع زهران الرئيسي.',
      node: 'ZAHRAN-CIRCLE-07'
    },
    {
      id: 3,
      titleEn: 'Urban Canopy & Carbon Dispersion',
      titleAr: 'التخضير الحضري وتشتيت الكربون',
      badgeEn: 'Ecological Twin',
      badgeAr: 'التوأم البيئي',
      icon: Thermometer,
      descEn:
        'Maps urban heat island relief and calculates atmospheric CO2 sink capacity using pine and olive green buffer belts.',
      badge2: 'Clean Air',
      descAr:
        'حساب امتصاص غاز ثاني أكسيد الكربون وخفض الحرارة عبر أحزمة الصنوبر والمسطحات الخضراء في العاصمة.',
      node: 'ECO-BUFFER-03'
    }
  ];

  return (
    <div className="space-y-12 py-8">
      {/* 1. HEADER BANNER */}
      <section className="text-center max-w-4xl mx-auto space-y-4">
        <div
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-mono font-bold tracking-wider uppercase shadow-sm ${
            isNight
              ? 'bg-[#10B981]/10 border-[#10B981]/30 text-[#34D399]'
              : 'bg-white/65 border-white/85 text-[#1F5435]'
          }`}
        >
          <Activity className="w-4 h-4 text-[#10B981] animate-pulse" />
          <span>
            {isAr
              ? 'مختبر المحاكاة التفاعلي • التوأم الرقمي لعمان'
              : 'Interactive Twin Explorer • Live Simulation Sandbox'}
          </span>
        </div>

        <h1
          className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight ${
            isNight ? 'text-white' : 'text-[#133020]'
          }`}
        >
          {isAr ? 'استكشاف التوأم الرقمي' : 'Explore the Digital Twin'}
        </h1>
        <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-[#3FB8C5] via-[#48C3CB] to-[#5BCF7B] bg-clip-text text-transparent">
          {isAr ? 'اختبر الفرضيات وتحكم بالمتغيرات لحظياً' : 'Stress-Test Scenarios & Observe Real-Time Dynamics'}
        </h2>

        <p
          className={`text-sm sm:text-base leading-relaxed max-w-2xl mx-auto ${
            isNight ? 'text-[#94A3B8]' : 'text-[#2E4738]'
          }`}
        >
          {isAr
            ? 'لوحة تفاعلية تتيح لك تغيير كثافة المركبات، اختبار درجات الحرارة السطحية، تفعيل أولويات الإسعاف، وملاحظة كيف يستجيب التوأم الرقمي فمع الخوارزميات الذكية فوراً.'
            : 'Manipulate vehicle densities, trigger emergency ambulance preemption, observe microclimate thermal drops, and inspect how AI algorithms dissolve congestion in real-time.'}
        </p>
      </section>

      {/* 2. INTERACTIVE CONTROLLER SANDBOX & TELEMETRY */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Live Parameter Tuning (Sliders & Toggles) */}
        <div
          className={`lg:col-span-5 p-6 sm:p-8 rounded-3xl border shadow-lg space-y-6 ${
            isNight
              ? 'bg-[#0B1812]/90 border-[#10B981]/30 text-white'
              : 'bg-white/70 border-white/90 text-[#142A1D]'
          }`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-current opacity-20">
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider">
              <Sliders className="w-4 h-4 text-[#10B981]" />
              <span>{isAr ? 'معايير المحاكاة الحية' : 'Simulation Parameters'}</span>
            </div>
            <button
              onClick={() => {
                setTrafficDensity(14500);
                setSurfaceTemp(35.2);
                setEmergencyActive(true);
                setTreeCanopyActive(true);
              }}
              className="text-[11px] font-mono text-[#10B981] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{isAr ? 'إعادة الضبط' : 'Reset Defaults'}</span>
            </button>
          </div>

          {/* Slider 1: Traffic Density (Active Vehicles) */}
          <div className="space-y-2 text-left rtl:text-right">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className={isNight ? 'text-[#94A3B8]' : 'text-[#4A6854]'}>
                {isAr ? 'كثافة المركبات (SUMO Agents)' : 'Active Vehicle Agents'}
              </span>
              <span className="font-bold text-[#10B981] text-sm">
                {trafficDensity.toLocaleString()} {isAr ? 'مركبة' : 'Vehicles'}
              </span>
            </div>
            <input
              type="range"
              min="5000"
              max="25000"
              step="500"
              value={trafficDensity}
              onChange={(e) => setTrafficDensity(Number(e.target.value))}
              className="w-full accent-[#10B981] cursor-pointer h-2 bg-gray-200 dark:bg-gray-700 rounded-lg"
            />
            <div className="flex justify-between text-[10px] font-mono opacity-50">
              <span>5,000 (Off-Peak)</span>
              <span>15,000 (Normal)</span>
              <span>25,000 (Gridlock)</span>
            </div>
          </div>

          {/* Slider 2: Surface Ambient Temperature */}
          <div className="space-y-2 text-left rtl:text-right">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className={isNight ? 'text-[#94A3B8]' : 'text-[#4A6854]'}>
                {isAr ? 'حرارة سطح الإسفلت المكشوف' : 'Asphalt Surface Heat Trap'}
              </span>
              <span className="font-bold text-red-500 text-sm">{surfaceTemp}°C</span>
            </div>
            <input
              type="range"
              min="20"
              max="45"
              step="0.5"
              value={surfaceTemp}
              onChange={(e) => setSurfaceTemp(Number(e.target.value))}
              className="w-full accent-red-500 cursor-pointer h-2 bg-gray-200 dark:bg-gray-700 rounded-lg"
            />
            <div className="flex justify-between text-[10px] font-mono opacity-50">
              <span>20°C (Spring)</span>
              <span>35°C (Amman Summer)</span>
              <span>45°C (Heatwave)</span>
            </div>
          </div>

          {/* Toggle 1: Emergency Ambulance Wave */}
          <div className="p-3.5 rounded-2xl border flex items-center justify-between transition-colors bg-white/40 dark:bg-white/5 border-current/15">
            <div className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                  emergencyActive ? 'bg-red-500 text-white' : 'bg-gray-300 dark:bg-gray-700 text-gray-500'
                }`}
              >
                <Siren className="w-4 h-4 stroke-[2.2]" />
              </div>
              <div className="text-left rtl:text-right">
                <div className="text-xs font-bold font-sans">
                  {isAr ? 'الموجة الخضراء للإسعاف' : 'Emergency Green Corridor'}
                </div>
                <div className="text-[10.5px] font-mono opacity-60">
                  {isAr ? 'فتح أولوية الإشارات الضوئية' : 'TraCI Trajectory Preemption'}
                </div>
              </div>
            </div>

            <button
              onClick={() => setEmergencyActive(!emergencyActive)}
              className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                emergencyActive
                  ? 'bg-red-500 text-white shadow-sm'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}
            >
              {emergencyActive ? (isAr ? 'مُفعّل' : 'ENABLED') : (isAr ? 'مُعطّل' : 'DISABLED')}
            </button>
          </div>

          {/* Toggle 2: Tree Canopy Cooling Buffer */}
          <div className="p-3.5 rounded-2xl border flex items-center justify-between transition-colors bg-white/40 dark:bg-white/5 border-current/15">
            <div className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                  treeCanopyActive ? 'bg-emerald-500 text-white' : 'bg-gray-300 dark:bg-gray-700 text-gray-500'
                }`}
              >
                <Thermometer className="w-4 h-4 stroke-[2.2]" />
              </div>
              <div className="text-left rtl:text-right">
                <div className="text-xs font-bold font-sans">
                  {isAr ? 'تشجير الصنوبر وتخفيف الحرارة' : 'Pine Tree Canopy Buffer'}
                </div>
                <div className="text-[10.5px] font-mono opacity-60">
                  {isAr ? 'تبريد سور الجامعة الأردنية (-3.8°C)' : 'UOJ Campus Perimeter Cooling'}
                </div>
              </div>
            </div>

            <button
              onClick={() => setTreeCanopyActive(!treeCanopyActive)}
              className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                treeCanopyActive
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}
            >
              {treeCanopyActive ? (isAr ? 'مُفعّل' : 'ACTIVE') : (isAr ? 'مُعطّل' : 'OFF')}
            </button>
          </div>

          {/* Workspace Launch Quick Action */}
          <button
            onClick={onLaunch}
            className="w-full group inline-flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r from-[#44C2D0] to-[#51D3BE] text-[#14261B] text-xs sm:text-sm font-extrabold tracking-tight shadow-md hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
          >
            <span>{isAr ? 'فتح المحاكي الكامل (SUMO HUD)' : 'Launch Full Interactive HUD'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Right Column: Real-Time Recalculated HUD Display */}
        <div className="lg:col-span-7 space-y-6">
          {/* 4 Live Recalculating KPI Tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div
              className={`p-4 rounded-2xl border shadow-sm text-left rtl:text-right ${
                isNight ? 'bg-[#0B1812]/90 border-[#10B981]/20' : 'bg-white/60 border-white/85'
              }`}
            >
              <div className="flex items-center gap-1.5 text-xs font-mono text-[#10B981] mb-1">
                <Gauge className="w-3.5 h-3.5" />
                <span>{isAr ? 'التأخير' : 'Intersection Delay'}</span>
              </div>
              <div className="text-2xl font-black font-mono">{calculatedDelay}s</div>
              <p className="text-[10px] font-mono text-emerald-600">
                {emergencyActive ? (isAr ? '-35% بالموجة الخضراء' : 'Preempted') : (isAr ? 'عادي' : 'Standard')}
              </p>
            </div>

            <div
              className={`p-4 rounded-2xl border shadow-sm text-left rtl:text-right ${
                isNight ? 'bg-[#0B1812]/90 border-emerald-500/20' : 'bg-white/60 border-white/85'
              }`}
            >
              <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-600 mb-1">
                <Thermometer className="w-3.5 h-3.5" />
                <span>{isAr ? 'الحرارة المهدئة' : 'Cooled Temp'}</span>
              </div>
              <div className="text-2xl font-black font-mono text-emerald-500">{calculatedTemp}°C</div>
              <p className="text-[10px] font-mono text-emerald-600">
                {treeCanopyActive ? '-3.8°C Canopy' : 'No Buffer'}
              </p>
            </div>

            <div
              className={`p-4 rounded-2xl border shadow-sm text-left rtl:text-right ${
                isNight ? 'bg-[#0B1812]/90 border-cyan-500/20' : 'bg-white/60 border-white/85'
              }`}
            >
              <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-600 mb-1">
                <Bus className="w-3.5 h-3.5" />
                <span>{isAr ? 'انسياب BRT' : 'BRT Flow'}</span>
              </div>
              <div className="text-2xl font-black font-mono text-cyan-500">{brtEfficiency}</div>
              <p className="text-[10px] font-mono text-cyan-600">
                {isAr ? 'مسار مخصص' : 'Dedicated Lane'}
              </p>
            </div>

            <div
              className={`p-4 rounded-2xl border shadow-sm text-left rtl:text-right ${
                isNight ? 'bg-[#0B1812]/90 border-indigo-500/20' : 'bg-white/60 border-white/85'
              }`}
            >
              <div className="flex items-center gap-1.5 text-xs font-mono text-indigo-500 mb-1">
                <TrendingDown className="w-3.5 h-3.5" />
                <span>{isAr ? 'انبعاثات CO2' : 'Carbon PPM'}</span>
              </div>
              <div className="text-2xl font-black font-mono text-indigo-400">{calculatedCO2} kg</div>
              <p className="text-[10px] font-mono text-indigo-500">
                {treeCanopyActive ? (isAr ? '-18% امتصاص' : '-18% Absorbed') : (isAr ? 'بدون شجر' : 'Bare')}
              </p>
            </div>
          </div>

          {/* Visual Corridor Display with Live Status Badge */}
          <div
            className={`p-5 rounded-3xl border shadow-lg space-y-4 ${
              isNight
                ? 'bg-[#0B1812]/90 border-[#10B981]/30 text-white'
                : 'bg-white/65 border-white/90 text-[#142A1D]'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider">
                  {scenarios[activeScenarioId].node}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30">
                  {isAr ? scenarios[activeScenarioId].badgeAr : scenarios[activeScenarioId].badgeEn}
                </span>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden border shadow-inner">
              <img
                src="/queen-rania-corridor-twin.png"
                alt="Amman Digital Twin Visualization"
                className="w-full h-auto object-cover max-h-[340px]"
              />

              <div className="absolute top-3 left-3 bg-[#070F0B]/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#10B981]/40 flex items-center gap-2 text-xs font-mono text-[#34D399]">
                <Zap className="w-3.5 h-3.5 animate-pulse text-[#38BDF8]" />
                <span>
                  {isAr
                    ? `نشط: ${trafficDensity.toLocaleString()} مركبة | الحرارة: ${calculatedTemp}°C`
                    : `Active: ${trafficDensity.toLocaleString()} Agents | Temp: ${calculatedTemp}°C`}
                </span>
              </div>
            </div>

            {/* Scenario Quick Selector Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              {scenarios.map((sc) => {
                const isSelected = activeScenarioId === sc.id;
                const Icon = sc.icon;
                return (
                  <button
                    key={sc.id}
                    onClick={() => setActiveScenarioId(sc.id)}
                    className={`p-2.5 rounded-xl border text-left rtl:text-right transition-all cursor-pointer ${
                      isSelected
                        ? isNight
                          ? 'bg-[#10B981] text-[#070F0B] border-[#10B981] font-bold shadow-md'
                          : 'bg-[#44C2D0] text-[#14261B] border-[#44C2D0] font-bold shadow-md'
                        : isNight
                        ? 'bg-white/5 hover:bg-white/10 border-white/10 text-white'
                        : 'bg-white/50 hover:bg-white/80 border-white/80 text-[#142A1D]'
                    }`}
                  >
                    <Icon className="w-4 h-4 mb-1" />
                    <div className="text-[11px] font-sans truncate">
                      {isAr ? sc.titleAr : sc.titleEn}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 3. SIMULATION WORKSPACE CALLOUT */}
      <section
        className={`p-8 sm:p-10 rounded-3xl border text-center space-y-4 shadow-xl backdrop-blur-md ${
          isNight
            ? 'bg-gradient-to-r from-[#0D261B] via-[#0F3022] to-[#0A1F16] border-[#10B981]/30'
            : 'bg-gradient-to-r from-white/70 via-white/85 to-white/70 border-white/90 shadow-[0_16px_40px_rgba(20,40,25,0.08)]'
        }`}
      >
        <div className="max-w-2xl mx-auto space-y-3">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono font-bold tracking-wider uppercase shadow-sm ${
              isNight ? 'bg-[#10B981]/15 text-[#34D399] border-[#10B981]/30' : 'bg-white/80 text-[#1F5435] border-white/90'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
            <span>{isAr ? 'دخول المهندسين والباحثين' : 'Authorized Engineer Access'}</span>
          </div>
          <h3 className={`text-3xl sm:text-4xl font-extrabold ${isNight ? 'text-white' : 'text-[#133020]'}`}>
            {isAr ? 'جاهز لتشغيل محاكاة ثلاثية الأبعاد كاملة؟' : 'Ready to Launch High-Resolution Micro-Simulation?'}
          </h3>
          <p className={`text-xs sm:text-sm leading-relaxed ${isNight ? 'text-[#94A3B8]' : 'text-[#385141]'}`}>
            {isAr
              ? 'سجل دخولك الآن للوصول إلى لوحة تحكم التوأم الرقمي الكاملة، عرض الخريطة ثلاثية الأبعاد التفاعلية، وتصدير تقارير الأداء.'
              : 'Sign in to access full 3D viewport control, detailed telemetry charts, vehicle trajectory inspection, and CSV scenario exports.'}
          </p>
          <div className="pt-2">
            <button
              onClick={onLaunch}
              className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#44C2D0] to-[#51D3BE] text-[#14261B] text-sm font-extrabold tracking-tight shadow-[0_6px_22px_rgba(68,194,208,0.45)] hover:shadow-[0_8px_30px_rgba(68,194,208,0.65)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              <span>{isAr ? 'الدخول للمحاكي ولوحة التحكم' : 'Launch Simulation Workspace'}</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5] group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
