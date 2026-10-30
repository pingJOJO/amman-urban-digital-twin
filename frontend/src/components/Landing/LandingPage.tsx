import React, { useState } from 'react';
import {
  ArrowRight,
  Play,
  Siren,
  Activity,
  Cpu,
  Wind,
  Thermometer,
  Network,
  ArrowUpRight,
  CheckCircle2,
  DollarSign,
  Building2,
  Globe,
  ShieldCheck,
  Radio
} from 'lucide-react';

interface LandingPageProps {
  onExplore: () => void;
  onLaunch: () => void;
}

// 12 drifting botanical leaves floating gently in the background
const LEAF_PARTICLES = [
  { id: 1, left: '6%', delay: '0s', duration: '16s', size: 18, sway: '35px' },
  { id: 2, left: '16%', delay: '3.5s', duration: '20s', size: 22, sway: '-45px' },
  { id: 3, left: '26%', delay: '1.2s', duration: '18s', size: 16, sway: '40px' },
  { id: 4, left: '38%', delay: '5s', duration: '22s', size: 20, sway: '-30px' },
  { id: 5, left: '48%', delay: '2s', duration: '19s', size: 24, sway: '50px' },
  { id: 6, left: '58%', delay: '6.5s', duration: '23s', size: 17, sway: '-40px' },
  { id: 7, left: '68%', delay: '0.8s', duration: '17s', size: 21, sway: '45px' },
  { id: 8, left: '78%', delay: '4.2s', duration: '21s', size: 19, sway: '-35px' },
  { id: 9, left: '88%', delay: '2.8s', duration: '24s', size: 23, sway: '50px' },
  { id: 10, left: '94%', delay: '7s', duration: '18s', size: 15, sway: '-25px' },
  { id: 11, left: '12%', delay: '8.5s', duration: '21s', size: 20, sway: '40px' },
  { id: 12, left: '82%', delay: '9s', duration: '19s', size: 18, sway: '-45px' }
];

export const LandingPage: React.FC<LandingPageProps> = ({ onExplore, onLaunch }) => {
  const [lang, setLang] = useState<'EN' | 'AR'>('EN');
  const [activeTab, setActiveTab] = useState<'overview' | 'capabilities' | 'thermal' | 'about'>('overview');
  const [selectedScenario, setSelectedScenario] = useState<number>(0);

  const isAr = lang === 'AR';

  const scenarios = [
    {
      titleEn: 'Emergency Green Corridor (Ambulance Priority)',
      titleAr: 'الموجة الخضراء الذكية (أولوية الإسعاف والطوارئ)',
      descEn: 'Detects approaching civil defense units, dynamically clears downstream queues, and holds conflicting phases. Reduces ambulance transit time by 4.2 minutes.',
      descAr: 'رصد فوري لمركبات الدفاع المدني والإسعاف عبر الحساسات، وفتح الإشارات الخضراء استباقياً وتفريغ التقاطعات لتقليص زمن الاستجابة بمعدل 4.2 دقيقة.',
      statLabelEn: 'Response Time Reduction',
      statLabelAr: 'تقليص زمن الاستجابة',
      statValue: '-38%',
      icon: Siren,
      tagEn: 'TraCI Autonomous Override',
      tagAr: 'تحكم فوري عبر بروتوكول TraCI'
    },
    {
      titleEn: 'Adaptive Congestion Dissolution Logic',
      titleAr: 'خوارزمية تفكيك الاختناقات المرورية اللحظية',
      descEn: 'Real-time computer vision queue assessment. Modulates phase splits and cycle lengths to prevent spillback at complex roundabouts like 7th & 8th Circles.',
      descAr: 'تحليل دقيق لأطوال طوابير المركبات عبر خوارزميات ذكية، وإعادة توزيع أزمنة الإشارات الضوئية ذاتياً لفك الاختناقات عند الدوارين السابع والثامن.',
      statLabelEn: 'Peak Intersection Delay',
      statLabelAr: 'تخفيض تأخير التقاطعات',
      statValue: '-32.4%',
      icon: Activity,
      tagEn: 'Dynamic Phase Optimization',
      tagAr: 'إدارة متكيفة للدورات المرورية'
    },
    {
      titleEn: 'Urban Heat Island (35°C Hotspot Cooling)',
      titleAr: 'محاكاة الجزر الحرارية (تخفيض بؤر 35° مئوية)',
      descEn: 'Detects high-density concrete heat traps exceeding 35°C. Simulates microclimate thermal alleviation by placing targeted vegetative canopies and bioswales.',
      descAr: 'رصد الجزر الحرارية التي تتجاوز 35° مئوية في المناطق الإسفلتية المزدحمة، ومحاكاة التبريد بالمساحات الخضراء لخفض الحرارة حتى 3.2° مئوية.',
      statLabelEn: 'Simulated Surface Temperature Drop',
      statLabelAr: 'معدل التبريد السطحي المحاكى',
      statValue: '-3.2°C',
      icon: Thermometer,
      tagEn: 'Microclimate Thermal Solver',
      tagAr: 'نمذجة المناخ الحضري المصغر'
    },
    {
      titleEn: 'Carbon Dispersion & Corridor Emission Footprint',
      titleAr: 'نمذجة انتشار انبعاثات الكربون والشريان الأخضر',
      descEn: 'Continuous vehicular CO2 emission mapping across Queen Rania and Zahran corridors. Evaluates fleet electrification policies and stop-and-go mitigation.',
      descAr: 'حساب مسارات انبعاثات ثاني أكسيد الكربون لحظياً على محاور الملكة رانيا وزهران، واختبار سياسات كهربة النقل وتفادي التوقف المتكرر.',
      statLabelEn: 'Simulated Fleet Emission Reduction',
      statLabelAr: 'وفر الانبعاثات المتوقع',
      statValue: '-24.8%',
      icon: Wind,
      tagEn: 'HBEFA Emission Standards',
      tagAr: 'معايير انبعاثات HBEFA المعتمدة'
    }
  ];

  return (
    <div
      dir={isAr ? 'rtl' : 'ltr'}
      className="relative min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-[#E2F5DD] via-[#EDF9EC] to-[#DCF5DA] text-[#142A1D] font-sans selection:bg-[#44C2D0] selection:text-white"
    >
      {/* ================================================================= */}
      {/* 1. BACKGROUND PARTICLES: GENTLY DRIFTING BOTANICAL LEAVES         */}
      {/* ================================================================= */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {/* Falling Leaves Stream */}
        {LEAF_PARTICLES.map((leaf) => (
          <div
            key={leaf.id}
            className="absolute -top-8 text-[#3F8560]/40 transition-opacity"
            style={{
              left: leaf.left,
              animation: `leafDrift ${leaf.duration} cubic-bezier(0.4, 0, 0.2, 1) infinite`,
              animationDelay: leaf.delay
            }}
          >
            <svg
              width={leaf.size}
              height={leaf.size}
              viewBox="0 0 24 24"
              fill="currentColor"
              className="transform rotate-45 opacity-60 drop-shadow-sm"
            >
              <path d="M12 2C6.5 2 2 6.5 2 12c0 4 2.5 7.5 6 9 .5-2 1.5-4.5 3-6.5 1.5-2 3.5-3.5 5.5-4.5.5-2.5-.5-5.5-2.5-7.5C13.2 2.2 12.6 2 12 2z" />
            </svg>
          </div>
        ))}

        {/* Subtle Constellation / Sensor Mesh */}
        <div className="absolute inset-0 opacity-35 mix-blend-multiply">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="light-grid" width="160" height="160" patternUnits="userSpaceOnUse">
                <circle cx="80" cy="80" r="1.5" fill="#4AA883" opacity="0.6" />
                <circle cx="20" cy="30" r="1.5" fill="#4AA883" opacity="0.4" />
                <circle cx="140" cy="120" r="1.5" fill="#4AA883" opacity="0.4" />
                <line x1="80" y1="80" x2="20" y2="30" stroke="#4AA883" strokeWidth="0.5" strokeDasharray="3,3" opacity="0.3" />
                <line x1="80" y1="80" x2="140" y2="120" stroke="#4AA883" strokeWidth="0.5" strokeDasharray="3,3" opacity="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#light-grid)" />
          </svg>
        </div>

        {/* Dynamic Curved Flow Arteries (Simulating Urban Mobility Currents) */}
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M -100 250 C 300 200, 600 450, 1400 300"
            fill="none"
            stroke="#3FA37E"
            strokeWidth="2.5"
            strokeDasharray="8,12"
            className="animate-pulse"
          />
          <path
            d="M 100 650 C 450 500, 800 750, 1600 550"
            fill="none"
            stroke="#44C2D0"
            strokeWidth="2"
            strokeDasharray="6,10"
          />
        </svg>

        {/* Soft Ambient Radiant Center Glows */}
        <div className="absolute top-[-10%] right-[10%] w-[600px] h-[600px] rounded-full bg-[#75E2D9]/25 blur-[130px]" />
        <div className="absolute bottom-[5%] left-[5%] w-[550px] h-[550px] rounded-full bg-[#82E69F]/25 blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8 lg:px-12 py-5 flex flex-col justify-between min-h-screen">
        {/* ================================================================= */}
        {/* 2. TOP EXECUTIVE NAVBAR                                           */}
        {/* ================================================================= */}
        <header className="flex items-center justify-between py-3 border-b border-[#3B654C]/15 backdrop-blur-md">
          {/* Brand Identity */}
          <div
            onClick={() => setActiveTab('overview')}
            className="flex items-center gap-3.5 cursor-pointer group"
          >
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white/60 p-1.5 border border-white/80 shadow-[0_4px_16px_rgba(30,60,40,0.08)] flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <img
                src="/logo.png"
                alt="Amman Urban Digital Twin Logo"
                className="w-full h-full object-contain filter drop-shadow-sm"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-extrabold tracking-tight text-[#142A1D]">
                  {isAr ? 'التوأم الرقمي لعمان' : 'Amman Urban Digital Twin'}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-[#32855B]/15 text-[#185337] border border-[#32855B]/25">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#208351] animate-pulse" />
                  SUMO v1.21
                </span>
              </div>
              <span className="block text-[11px] font-mono text-[#3D5A46] tracking-wider uppercase">
                {isAr ? 'محاكاة مجهرية • ذكاء بيئي ومروري' : 'Co-Simulation & Mobility Intelligence'}
              </span>
            </div>
          </div>

          {/* Navigation Anchors (Frosted Glass Pills) */}
          <nav className="hidden lg:flex items-center gap-1 p-1.5 rounded-full bg-white/50 backdrop-blur-md border border-white/70 shadow-[0_4px_16px_rgba(20,40,25,0.04)]">
            {[
              { id: 'overview', labelEn: 'Home', labelAr: 'الرئيسية' },
              { id: 'capabilities', labelEn: 'Simulation Sandbox', labelAr: 'بيئة المحاكاة' },
              { id: 'thermal', labelEn: 'Heat & Carbon', labelAr: 'الحرارة والكربون' },
              { id: 'about', labelEn: 'About The Twin', labelAr: 'عن المشروع' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  const el = document.getElementById(tab.id);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#BFE2F8] text-[#142C2A] shadow-sm font-bold'
                    : 'text-[#36503F] hover:text-[#142A1D] hover:bg-white/40'
                }`}
              >
                {isAr ? tab.labelAr : tab.labelEn}
              </button>
            ))}
          </nav>

          {/* Language Switcher & Executive Launch CTA */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === 'EN' ? 'AR' : 'EN')}
              className="px-3 py-1.5 rounded-full border border-[#2D4D37]/30 bg-white/40 hover:bg-white/70 text-xs font-mono font-semibold text-[#1C3626] transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
              title="Toggle Language"
            >
              <Globe className="w-3.5 h-3.5 text-[#2D6C48]" />
              <span>{lang === 'EN' ? 'العربية' : 'English'}</span>
            </button>

            <button
              onClick={onLaunch}
              className="group relative inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#44C2D0] to-[#51D3BE] text-[#14261B] text-xs sm:text-[13px] font-extrabold tracking-tight shadow-[0_4px_16px_rgba(68,194,208,0.35)] hover:shadow-[0_6px_22px_rgba(68,194,208,0.5)] hover:scale-105 active:scale-100 transition-all duration-300 cursor-pointer"
            >
              <span>{isAr ? 'بدء تجربة التوأم' : 'Launch Experience'}</span>
              <span className="w-5 h-5 rounded-full bg-[#182B20] text-white flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5">
                <ArrowRight className="w-3 h-3 stroke-[2.5]" />
              </span>
            </button>
          </div>
        </header>

        {/* ================================================================= */}
        {/* 3. HERO SECTION: "A SMARTER WAY TO MOVE AMMAN"                   */}
        {/* ================================================================= */}
        <section id="overview" className="pt-8 sm:pt-12 lg:pt-14 pb-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-5 text-left rtl:text-right">
            {/* Top Mission Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/60 border border-white/80 text-[#1F5435] text-xs font-mono tracking-wide shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-[#267C4E]" />
              <span>
                {isAr
                  ? 'محاكاة حضرية دقيقة • تجنب الهدر المالي والمخاطر الميدانية'
                  : 'Precision Urban Simulation • Zero Capital Risk'}
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-extrabold tracking-[-0.02em] leading-[1.08] text-[#133020]">
                {isAr ? 'طريقة أذكى لإدارة' : 'A Smarter Way to'}
              </h1>
              <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-extrabold tracking-[-0.02em] leading-[1.08] bg-gradient-to-r from-[#4A72DF] via-[#48C3CB] to-[#5BCF7B] bg-clip-text text-transparent pb-1">
                {isAr ? 'عمان الكبرى' : 'Move Amman'}
              </h1>
            </div>

            {/* Subtext */}
            <p className="text-sm sm:text-base text-[#2E4738] font-normal leading-relaxed max-w-xl">
              {isAr
                ? 'لماذا نخاطر بملايين الدنانير وأشهر من الاختناقات على أرض الواقع؟ التوأم الرقمي يتيح لك تطبيق أي سيناريو هندسي أو مروري في بيئة افتراضية متطورة، رصد مسارات الإسعاف التلقائية، اختبار الإشارات الذكية، ومحاكاة تبريد الجزر الحرارية قبل إنفاق دينار واحد.'
                : 'Why risk millions of Dinars and months of public gridlock in real-world trials? Amman Urban Digital Twin lets you simulate any infrastructure scenario in a microscopic virtual environment: test ambulance green corridors, autonomous signal logic, and microclimate heat mitigation before breaking ground.'}
            </p>

            {/* Key Metric Tickers (Organic Frosted Cards) */}
            <div className="grid grid-cols-3 gap-3 pt-1 max-w-lg">
              <div className="p-3 rounded-2xl bg-white/55 backdrop-blur-sm border border-white/80 shadow-[0_4px_16px_rgba(30,60,40,0.05)]">
                <div className="flex items-center gap-1 text-[#227246] text-xs font-mono font-bold mb-1">
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>{isAr ? 'توفير التكاليف' : 'Zero Trial Cost'}</span>
                </div>
                <div className="text-xl sm:text-2xl font-black text-[#133020] font-mono">100%</div>
                <p className="text-[10.5px] text-[#4A6453] mt-0.5">{isAr ? 'اختبار رقمي آمن' : 'Virtual Validation'}</p>
              </div>

              <div className="p-3 rounded-2xl bg-white/55 backdrop-blur-sm border border-white/80 shadow-[0_4px_16px_rgba(30,60,40,0.05)]">
                <div className="flex items-center gap-1 text-[#1E748B] text-xs font-mono font-bold mb-1">
                  <Siren className="w-3.5 h-3.5" />
                  <span>{isAr ? 'سرعة الإسعاف' : 'Emergency Wave'}</span>
                </div>
                <div className="text-xl sm:text-2xl font-black text-[#133020] font-mono">-4.2m</div>
                <p className="text-[10.5px] text-[#4A6453] mt-0.5">{isAr ? 'فتح مسار تلقائي' : 'Corridor Clearance'}</p>
              </div>

              <div className="p-3 rounded-2xl bg-white/55 backdrop-blur-sm border border-white/80 shadow-[0_4px_16px_rgba(30,60,40,0.05)]">
                <div className="flex items-center gap-1 text-[#238050] text-xs font-mono font-bold mb-1">
                  <Thermometer className="w-3.5 h-3.5" />
                  <span>{isAr ? 'تبريد الجزر' : 'Heat Offset'}</span>
                </div>
                <div className="text-xl sm:text-2xl font-black text-[#133020] font-mono">-3.2°C</div>
                <p className="text-[10.5px] text-[#4A6453] mt-0.5">{isAr ? '35° -> مناطق خضراء' : 'Thermal Relief'}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExplore}
                className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#42C2D0] to-[#55D5BB] text-[#14261B] text-sm font-bold tracking-tight shadow-[0_6px_20px_rgba(66,194,208,0.4)] hover:shadow-[0_8px_26px_rgba(66,194,208,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                <span>{isAr ? 'استكشف التوأم الرقمي' : 'Explore the Digital Twin'}</span>
                <span className="w-6 h-6 rounded-full bg-[#182B20] text-white flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </span>
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('capabilities');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full border border-[#2D4D37]/30 bg-white/45 backdrop-blur-sm text-[#1A3323] text-sm font-semibold tracking-tight hover:bg-white/75 hover:border-[#2D4D37]/50 active:scale-95 transition-all duration-200 cursor-pointer shadow-sm"
              >
                <Play className="w-3.5 h-3.5 text-[#206742] fill-current" />
                <span>{isAr ? 'مشاهدة سيناريوهات المحاكاة' : 'View Simulation Scenarios'}</span>
              </button>
            </div>
          </div>

          {/* Right Visual Stage: Seamless Floating Holographic Amman (No Boxes, No Rectangles) */}
          <div className="lg:col-span-6 xl:col-span-6 flex justify-center lg:justify-end relative">
            <div className="relative w-full max-w-[560px] lg:max-w-[620px] group">
              {/* Soft Radial Ambient Backglow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#51D3BE]/35 via-[#4A72DF]/20 to-transparent rounded-full blur-[75px] -z-10 transform scale-90" />

              {/* Floating Cutout Image - Zero Box, Zero Rectangular Frame */}
              <img
                src="/hero-hand-cutout.png"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/hero-city-hand-feathered.png';
                }}
                alt="Amman Digital Twin Holographic Model"
                className="w-full h-auto object-contain drop-shadow-[0_20px_35px_rgba(20,45,28,0.22)] transition-transform duration-700 ease-out group-hover:scale-[1.02] pointer-events-none select-none"
              />

              {/* Floating Real-Time Telemetry HUD Overlays (Frosted Glass Pills) */}
              <div className="absolute top-4 left-2 sm:left-4 bg-white/70 backdrop-blur-md border border-white/80 rounded-2xl p-2.5 shadow-[0_8px_24px_rgba(20,40,25,0.08)] text-left rtl:text-right flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#1EA565] animate-ping" />
                <div>
                  <div className="text-[10px] font-mono text-[#4A6854] uppercase">SUMO Active Agents</div>
                  <div className="text-xs font-bold font-mono text-[#133020]">18,420 Live Vehicles</div>
                </div>
              </div>

              <div className="absolute bottom-4 right-2 sm:right-4 bg-white/70 backdrop-blur-md border border-white/80 rounded-2xl p-2.5 shadow-[0_8px_24px_rgba(20,40,25,0.08)] text-left rtl:text-right flex items-center gap-2.5">
                <Radio className="w-4 h-4 text-[#1E748B] animate-pulse" />
                <div>
                  <div className="text-[10px] font-mono text-[#4A6854] uppercase">Emergency Priority</div>
                  <div className="text-xs font-bold font-mono text-[#185366]">Green Wave Active</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 4. SIMULATION CAPABILITIES (Zero Emojis - Frosted Glass Cards)    */}
        {/* ================================================================= */}
        <section id="capabilities" className="pt-14 pb-12 border-t border-[#3B654C]/15">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/60 border border-white/80 text-[#1F5435] text-xs font-mono font-bold tracking-wider uppercase shadow-sm">
              <Cpu className="w-3.5 h-3.5 text-[#267C4E]" />
              <span>{isAr ? 'محرك السيناريوهات الافتراضية' : 'Scenario Sandbox Engine'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#133020] tracking-tight">
              {isAr
                ? 'طبق أي سيناريو ببالك افتراضياً دون خسارة فلس واحد'
                : 'Test Any Urban Hypothesis in Silicon Before Asphalt'}
            </h2>
            <p className="text-xs sm:text-sm text-[#385141] leading-relaxed">
              {isAr
                ? 'تتيح منصة التوأم الرقمي لمهندسي أمانة عمان الكبرى وخبراء النقل محاكاة الواقع الحقيقي بدقة متناهية عبر 4 ركائز تكنولوجية ذكية.'
                : 'Amman Urban Digital Twin enables urban engineers and transport authorities to stress-test radical urban solutions in high-fidelity simulation.'}
            </p>
          </div>

          {/* Interactive Scenario Grid (Organic Rounded Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {scenarios.map((sc, idx) => {
              const IconComponent = sc.icon;
              const isSelected = selectedScenario === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedScenario(idx)}
                  className={`p-5 rounded-3xl transition-all duration-300 cursor-pointer flex flex-col justify-between border relative overflow-hidden group ${
                    isSelected
                      ? 'bg-white/85 border-[#44C2D0] shadow-[0_12px_32px_rgba(68,194,208,0.22)] scale-[1.02]'
                      : 'bg-white/45 hover:bg-white/70 border-white/80 shadow-[0_8px_24px_rgba(20,40,25,0.04)]'
                  }`}
                >
                  <div className="space-y-3 text-left rtl:text-right">
                    <div className="flex items-center justify-between">
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-colors ${
                        isSelected ? 'bg-[#44C2D0] text-[#14261B]' : 'bg-[#D6F3E0] text-[#227246] group-hover:bg-[#44C2D0] group-hover:text-white'
                      }`}>
                        <IconComponent className="w-5 h-5 stroke-[2.2]" />
                      </div>
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/70 text-[#385141] border border-white/90">
                        {isAr ? sc.tagAr : sc.tagEn}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-[#133020] group-hover:text-[#194C31] transition-colors">
                      {isAr ? sc.titleAr : sc.titleEn}
                    </h3>

                    <p className="text-xs text-[#385141] leading-relaxed line-clamp-4">
                      {isAr ? sc.descAr : sc.descEn}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#3B654C]/15 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-mono text-[#52725D]">
                        {isAr ? sc.statLabelAr : sc.statLabelEn}
                      </div>
                      <div className="text-lg font-black font-mono text-[#1A683E]">
                        {sc.statValue}
                      </div>
                    </div>
                    <span className="w-7 h-7 rounded-full bg-white/80 group-hover:bg-[#44C2D0] group-hover:text-white text-[#385141] flex items-center justify-center transition-colors shadow-sm">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ================================================================= */}
        {/* 5. REAL-TIME INSIGHTS & THERMAL HEATMAP SHOWCASE                  */}
        {/* ================================================================= */}
        <section id="thermal" className="pt-10 pb-12 border-t border-[#3B654C]/15 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Seamless Organic Mist Night Image (No Square Box) */}
          <div className="lg:col-span-6 xl:col-span-6 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[500px] group">
              <div className="absolute inset-0 bg-[#51D3BE]/20 rounded-full blur-[65px] -z-10" />

              {/* Seamlessly Blended Image with Organic Mist Mask */}
              <img
                src="/realtime-insights-mist.png"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/realtime-insights.jpg';
                }}
                alt="Amman Real Time City Insights & Thermal Heatmaps"
                className="w-full h-auto object-contain drop-shadow-[0_16px_36px_rgba(20,40,25,0.18)] transition-transform duration-700 group-hover:scale-105"
              />

              {/* Floating HUD Indicator */}
              <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-md border border-white/90 rounded-2xl px-3.5 py-2 flex items-center gap-3 shadow-[0_8px_24px_rgba(20,40,25,0.1)]">
                <div className="w-2.5 h-2.5 rounded-full bg-[#1EA565] animate-ping" />
                <div className="text-left rtl:text-right font-mono">
                  <div className="text-[10px] text-[#4A6854]">URBAN HEAT ISLAND REDUCTION</div>
                  <div className="text-xs font-bold text-[#195232]">35.0°C Hotspot → 31.8°C with Green Canopy</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Environmental & Heat Details */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-4 lg:pl-4 text-left rtl:text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/60 border border-white/80 text-[#1B6072] text-xs font-mono font-bold tracking-wide uppercase shadow-sm">
              <Thermometer className="w-3.5 h-3.5 text-[#1B6072]" />
              <span>{isAr ? 'المناخ الحضري وانبعاثات الكربون' : 'Microclimate & Emissions'}</span>
            </div>

            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#133020] tracking-tight leading-tight">
                {isAr ? 'محاكاة درجات الحرارة' : 'Simulating Urban Heat Islands'}
              </h2>
              <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-[#3FB8C5] to-[#4EB96A] bg-clip-text text-transparent tracking-tight leading-tight">
                {isAr ? 'وتخفيضها بالمساحات الخضراء' : '& Carbon Plume Dynamics'}
              </h2>
            </div>

            <p className="text-xs sm:text-[13.5px] text-[#2E4738] leading-relaxed font-normal">
              {isAr
                ? 'تصل درجات الحرارة في البؤر الإسفلتية المكتظة بعمان إلى 35° مئوية بسبب غياب الظلال وامتصاص الإسفلت للحرارة. يحاكي التوأم الرقمي الأثر التبريدي لغرس أحزمة الأشجار والمسطحات الخضراء بدقة، لحساب كمية الهبوط الحراري وتوزيع الكثافة السكانية ومسارات تشتت ثاني أكسيد الكربون قبل تنفيذ المشاريع ميدانياً.'
                : 'Dense asphalt intersections across Amman frequently reach surface temperatures exceeding 35°C. Amman Urban Digital Twin models microclimate radiative physics, quantifying the exact cooling degree drop achieved by planting urban vegetation corridors, green roofs, and bioswales before committing municipal funds.'}
            </p>

            <div className="space-y-2 pt-1 font-mono text-xs text-[#2A4735]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#208351] shrink-0" />
                <span>{isAr ? 'رصد فوري لدرجات الحرارة السطحية (22°C - 35°C)' : 'Localized surface temperature thermal mapping (22°C - 35°C)'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#208351] shrink-0" />
                <span>{isAr ? 'محاكاة انبعاثات أساطيل النقل ونقاط التلوث المركز' : 'Microscopic fleet emission dispersal & corridor carbon tracking'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#208351] shrink-0" />
                <span>{isAr ? 'تنبؤ ديناميكي بتحركات الكثافة السكانية وساعات الذروة' : 'Dynamic demographic population flow & pedestrian accessibility'}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onExplore}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/70 hover:bg-white/95 border border-[#2D4D37]/30 text-[#144229] text-xs font-mono font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-sm"
              >
                <span>{isAr ? 'عرض خريطة الحرارة الحية' : 'Launch Thermal HUD'}</span>
                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </button>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 6. ABOUT THE PROJECT DEEP-DIVE (Frosted Glass Panels)             */}
        {/* ================================================================= */}
        <section id="about" className="pt-12 pb-12 border-t border-[#3B654C]/15">
          <div className="max-w-4xl mx-auto text-center space-y-3 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/60 border border-white/80 text-[#1F5435] text-xs font-mono font-bold tracking-wider uppercase shadow-sm">
              <Building2 className="w-3.5 h-3.5 text-[#267C4E]" />
              <span>{isAr ? 'عن مشروع التوأم الرقمي' : 'About The Digital Twin Project'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#133020] tracking-tight">
              {isAr
                ? 'هندسة مدن المستقبل: دمج الذكاء الاصطناعي مع الواقع الحضري'
                : 'Architecting Future Cities: Bridging Artificial Intelligence & Urban Reality'}
            </h2>
            <p className="text-xs sm:text-sm text-[#385141] leading-relaxed max-w-2xl mx-auto">
              {isAr
                ? 'مشروع تخرج نوعي يهدف إلى تزويد مهندسي المرور ومتخذي القرار بنموذج محاكاة عالي الدقة مبني على محرك SUMO المفتوح المصدر وخوادم بايثون فائقة السرعة.'
                : 'An advanced urban co-simulation platform bridging SUMO (Simulation of Urban MObility) with Python AI controllers, FastAPI backends, and modern spatial data systems.'}
            </p>
          </div>

          {/* 3 Pillars (Organic Frosted Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-6 rounded-3xl bg-white/50 backdrop-blur-md border border-white/80 shadow-[0_8px_24px_rgba(20,40,25,0.05)] space-y-3 text-left rtl:text-right">
              <div className="w-10 h-10 rounded-2xl bg-[#D6F3E0] text-[#227246] flex items-center justify-center">
                <Network className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#133020]">
                {isAr ? 'محرك المحاكاة المجهري SUMO' : 'SUMO Microscopic Engine'}
              </h3>
              <p className="text-xs text-[#385141] leading-relaxed">
                {isAr
                  ? 'محاكاة كل مركبة وسائق على حدة، بما في ذلك تسارع المركبات، تغيير المسارب، أزمنة ردة الفعل، وتفاعلات التقاطعات المعقدة على خريطة عمان الحقيقية.'
                  : 'Microscopic agent-based vehicle modeling factoring driver behavior, lane changes, reaction delays, and multi-modal transit across authentic OSM Amman road geometry.'}
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white/50 backdrop-blur-md border border-white/80 shadow-[0_8px_24px_rgba(20,40,25,0.05)] space-y-3 text-left rtl:text-right">
              <div className="w-10 h-10 rounded-2xl bg-[#CEEEF7] text-[#196075] flex items-center justify-center">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#133020]">
                {isAr ? 'التحكم الذكي عبر TraCI Python' : 'TraCI Python AI Controllers'}
              </h3>
              <p className="text-xs text-[#385141] leading-relaxed">
                {isAr
                  ? 'ربط مباشر عبر مكتبة TraCI لتعديل بروتوكولات الإشارات الضوئية لحظياً، فرض أولويات الطوارئ، وتطبيق خوارزميات التعلم المعزز لتفكيك الأزمات.'
                  : 'Real-time bidirectional Python control loop querying queue states and dynamically overriding phase durations to dismantle emerging gridlock bottlenecks.'}
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white/50 backdrop-blur-md border border-white/80 shadow-[0_8px_24px_rgba(20,40,25,0.05)] space-y-3 text-left rtl:text-right">
              <div className="w-10 h-10 rounded-2xl bg-[#D6F3E0] text-[#208351] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#133020]">
                {isAr ? 'حماية الميزانية العامة' : 'Zero Infrastructure Capital Waste'}
              </h3>
              <p className="text-xs text-[#385141] leading-relaxed">
                {isAr
                  ? 'اختبار الأنفاق والجسور وخطوط الباص السريع قبل البناء يوفر تكاليف باهظة بالملايين ويضمن نجاح المشاريع الهندسية بنسبة 100% قبل وضع حجر الأساس.'
                  : 'Validating bridges, tunnels, and Bus Rapid Transit (BRT) lane conversions in simulation prevents costly engineering failures and guarantees civic return on investment.'}
              </p>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 7. EXECUTIVE FINAL CTA BANNER                                     */}
        {/* ================================================================= */}
        <section className="my-8 rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-white/70 via-white/85 to-white/70 backdrop-blur-md border border-white/90 shadow-[0_16px_40px_rgba(20,40,25,0.08)] text-center relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#133020] tracking-tight">
              {isAr ? 'جاهز لتجربة التوأم الرقمي لعمان؟' : 'Ready to Experience Amman’s Digital Twin?'}
            </h2>
            <p className="text-xs sm:text-sm text-[#385141] leading-relaxed">
              {isAr
                ? 'انضم إلى المنصة لاختبار سيناريوهات المرور الحية، استكشاف خرائط الحرارة الحضرية، وإطلاق محاكاة الواقع الحقيقي بنقرة واحدة.'
                : 'Join urban researchers and civil engineers testing live simulation scenarios, green wave preemption, and microclimate heat mapping.'}
            </p>
            <div className="pt-2">
              <button
                onClick={onExplore}
                className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#44C2D0] to-[#51D3BE] text-[#14261B] text-sm font-extrabold tracking-tight shadow-[0_6px_22px_rgba(68,194,208,0.45)] hover:shadow-[0_8px_30px_rgba(68,194,208,0.65)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                <span>{isAr ? 'الدخول إلى لوحة التحكم والمحاكاة' : 'Launch Simulation Workspace'}</span>
                <span className="w-6 h-6 rounded-full bg-[#182B20] text-white flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 8. EXECUTIVE FOOTER                                               */}
        {/* ================================================================= */}
        <footer className="py-5 border-t border-[#3B654C]/15 flex flex-col sm:flex-row items-center justify-between text-xs text-[#4A6453] font-mono">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#208351]" />
            <span>
              {isAr
                ? 'مشروع التوأم الرقمي الحضري لعمان الكبرى © 2026'
                : 'Amman Urban Digital Twin • Precision Co-Simulation © 2026'}
            </span>
          </div>

          <div className="flex items-center gap-4 mt-3 sm:mt-0 font-sans">
            <span className="font-mono text-[#587563]">31.9539° N, 35.9106° E</span>
            <span>•</span>
            <button onClick={onLaunch} className="hover:text-[#133020] transition-colors cursor-pointer">
              {isAr ? 'الدخول للمنصة' : 'Enter Platform'}
            </button>
            <span>•</span>
            <button onClick={onExplore} className="hover:text-[#133020] transition-colors cursor-pointer">
              {isAr ? 'تسجيل الدخول' : 'Sign In'}
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};
