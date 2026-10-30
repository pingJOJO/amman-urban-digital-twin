import React, { useState } from 'react';
import {
  ArrowRight,
  Play,
  Siren,
  Activity,
  Cpu,
  Thermometer,
  Network,
  ArrowUpRight,
  CheckCircle2,
  DollarSign,
  Building2,
  Globe,
  ShieldCheck,
  Radio,
  Sun,
  Moon,
  Bus
} from 'lucide-react';
import { AboutPage } from './AboutPage';
import { TwinExplorePage } from './TwinExplorePage';
import { ProjectsPage } from './ProjectsPage';

interface LandingPageProps {
  onExplore: () => void;
  onLaunch: () => void;
}

// 12 Drifting botanical leaves with organic swaying
const LEAF_PARTICLES = [
  { id: 1, left: '5%', delay: '0s', duration: '15s', size: 20, sway: '35px' },
  { id: 2, left: '15%', delay: '3.2s', duration: '19s', size: 24, sway: '-40px' },
  { id: 3, left: '25%', delay: '1.5s', duration: '17s', size: 18, sway: '38px' },
  { id: 4, left: '38%', delay: '4.8s', duration: '22s', size: 22, sway: '-30px' },
  { id: 5, left: '48%', delay: '2.1s', duration: '18s', size: 26, sway: '45px' },
  { id: 6, left: '58%', delay: '6.2s', duration: '20s', size: 19, sway: '-35px' },
  { id: 7, left: '68%', delay: '0.9s', duration: '16s', size: 23, sway: '40px' },
  { id: 8, left: '78%', delay: '4.5s', duration: '21s', size: 21, sway: '-32px' },
  { id: 9, left: '88%', delay: '2.6s', duration: '23s', size: 25, sway: '48px' },
  { id: 10, left: '94%', delay: '7.1s', duration: '17s', size: 17, sway: '-25px' },
  { id: 11, left: '11%', delay: '8.3s', duration: '20s', size: 22, sway: '38px' },
  { id: 12, left: '83%', delay: '8.8s', duration: '19s', size: 20, sway: '-42px' }
];

export const LandingPage: React.FC<LandingPageProps> = ({ onExplore, onLaunch }) => {
  const [lang, setLang] = useState<'EN' | 'AR'>('EN');
  const [theme, setTheme] = useState<'day' | 'night'>('day');
  const [activeTab, setActiveTab] = useState<'home' | 'about' | 'twin' | 'projects'>('home');
  const [selectedScenario, setSelectedScenario] = useState<number>(0);
  const [corridorLayer, setCorridorLayer] = useState<'all' | 'thermal' | 'brt' | 'traffic'>('all');

  const isAr = lang === 'AR';
  const isNight = theme === 'night';

  const scenarios = [
    {
      titleEn: 'Emergency Green Corridor (Ambulance Priority)',
      titleAr: 'الموجة الخضراء الذكية (أولوية الإسعاف والطوارئ)',
      descEn: 'Detects approaching civil defense units along Queen Rania and Zahran corridors. Dynamically flushes downstream queues, cutting ambulance response times by 4.2 minutes.',
      descAr: 'رصد فوري لمركبات الدفاع المدني والإسعاف عبر الحساسات، وفتح الإشارات الخضراء استباقياً وتفريغ التقاطعات لتقليص زمن الاستجابة بمعدل 4.2 دقيقة.',
      statLabelEn: 'Response Time Reduction',
      statLabelAr: 'تقليص زمن الاستجابة',
      statValue: '-38%',
      icon: Siren,
      tagEn: 'TraCI Autonomous Override',
      tagAr: 'تحكم فوري عبر TraCI'
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
      titleEn: 'Queen Rania St. Heat Island (35°C Hotspot Cooling)',
      titleAr: 'محاكاة حرارة شارع الملكة رانيا (تبريد بؤر 35° مئوية)',
      descEn: 'Pinpoints open asphalt traps exceeding 35.2°C at University of Jordan main gate. Simulates thermal drop through dense pine tree canopies and shaded BRT walkways.',
      descAr: 'رصد الجزر الحرارية التي تتجاوز 35.2° مئوية عند بوابة الجامعة الأردنية، ومحاكاة التبريد بأشجار الصنوبر ومظلات الباص السريع لخفض الحرارة بمعدل 3.8° مئوية.',
      statLabelEn: 'Simulated Surface Temperature Drop',
      statLabelAr: 'معدل التبريد السطحي المحاكى',
      statValue: '-3.8°C',
      icon: Thermometer,
      tagEn: 'Microclimate Thermal Solver',
      tagAr: 'نمذجة المناخ الحضري المصغر'
    },
    {
      titleEn: 'BRT Corridor Priority & Carbon Dispersion',
      titleAr: 'أولوية الباص السريع (BRT) وانتشار الكربون',
      descEn: 'Models dedicated red BRT bus throughput vs mixed vehicle lanes, assessing continuous CO2 dispersal and pedestrian transit accessibility across the university sector.',
      descAr: 'محاكاة انسيابية الباص السريع في مساره المخصص مقابل مسارب المركبات، وحساب انبعاثات ثاني أكسيد الكربون وسلاسة وصول الطلاب والركاب للجامعة.',
      statLabelEn: 'Transit Corridor Efficiency',
      statLabelAr: 'كفاءة المسار الترددي',
      statValue: '+34.5%',
      icon: Bus,
      tagEn: 'Amman BRT Simulation Node',
      tagAr: 'محاكاة الباص السريع عمان'
    }
  ];

  return (
    <div
      dir={isAr ? 'rtl' : 'ltr'}
      className={`relative min-h-screen w-full overflow-x-hidden font-sans transition-colors duration-700 ${
        isNight
          ? 'bg-gradient-to-br from-[#070F0B] via-[#0A1610] to-[#0D1E15] text-[#F1F5F9] selection:bg-[#10B981] selection:text-[#070F0B]'
          : 'bg-gradient-to-br from-[#E2F5DD] via-[#EDF9EC] to-[#DCF5DA] text-[#142A1D] selection:bg-[#44C2D0] selection:text-white'
      }`}
    >
      {/* ================================================================= */}
      {/* 1. BACKGROUND PARTICLES: GENTLY DRIFTING BOTANICAL LEAVES & CARS  */}
      {/* ================================================================= */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {/* Animated Botanical Leaves */}
        {LEAF_PARTICLES.map((leaf) => (
          <div
            key={leaf.id}
            className={`absolute -top-12 transition-opacity ${
              isNight ? 'text-[#34D399]/40' : 'text-[#367954]/50'
            }`}
            style={{
              left: leaf.left,
              animation: `leafDrift ${leaf.duration} cubic-bezier(0.4, 0, 0.2, 1) infinite`,
              animationDelay: leaf.delay
            }}
          >
            {/* Elegant botanical leaf with delicate central vein */}
            <svg
              width={leaf.size}
              height={leaf.size * 1.5}
              viewBox="0 0 32 48"
              fill="none"
              className="transform rotate-12 drop-shadow-sm"
            >
              <path
                d="M16 2 C26 12 28 28 16 42 C4 28 6 12 16 2 Z"
                fill="currentColor"
                fillOpacity={isNight ? '0.65' : '0.55'}
              />
              <path
                d="M16 8 L16 44"
                stroke={isNight ? '#0B291A' : '#1D452E'}
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeOpacity="0.6"
              />
              <path
                d="M16 16 C20 14 22 17 22 17"
                stroke={isNight ? '#0B291A' : '#1D452E'}
                strokeWidth="0.8"
                strokeLinecap="round"
                strokeOpacity="0.5"
              />
              <path
                d="M16 24 C10 22 8 25 8 25"
                stroke={isNight ? '#0B291A' : '#1D452E'}
                strokeWidth="0.8"
                strokeLinecap="round"
                strokeOpacity="0.5"
              />
              <path
                d="M16 31 C21 29 23 32 23 32"
                stroke={isNight ? '#0B291A' : '#1D452E'}
                strokeWidth="0.8"
                strokeLinecap="round"
                strokeOpacity="0.5"
              />
            </svg>
          </div>
        ))}

        {/* Dynamic Curved Highway Paths with Smooth Animated Moving Cars */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <path
              id="highwayPath1"
              d="M -100 240 C 350 180, 700 460, 1600 280"
              fill="none"
            />
            <path
              id="highwayPath2"
              d="M 100 700 C 450 540, 850 750, 1650 560"
              fill="none"
            />
          </defs>

          {/* Road Visual Lines */}
          <use
            href="#highwayPath1"
            stroke={isNight ? 'rgba(16, 185, 129, 0.22)' : 'rgba(45, 120, 85, 0.28)'}
            strokeWidth="3.5"
            strokeDasharray="8,12"
          />
          <use
            href="#highwayPath2"
            stroke={isNight ? 'rgba(56, 189, 248, 0.22)' : 'rgba(68, 194, 208, 0.28)'}
            strokeWidth="3"
            strokeDasharray="6,10"
          />

          {/* Car 1 Moving Smoothly Along Highway 1 */}
          <g>
            <animateMotion dur="16s" repeatCount="indefinite" rotate="auto">
              <mpath href="#highwayPath1" />
            </animateMotion>
            {/* Minimalist modern car body */}
            <rect x="-14" y="-6" width="28" height="12" rx="4" fill={isNight ? '#34D399' : '#10B981'} />
            <rect x="-4" y="-4" width="12" height="8" rx="2" fill={isNight ? '#072014' : '#0B301C'} />
            {/* Glowing headlights */}
            <circle cx="13" cy="-3.5" r="1.5" fill="#FEF08A" />
            <circle cx="13" cy="3.5" r="1.5" fill="#FEF08A" />
          </g>

          {/* Car 2 Moving Smoothly Along Highway 2 */}
          <g>
            <animateMotion dur="20s" repeatCount="indefinite" rotate="auto">
              <mpath href="#highwayPath2" />
            </animateMotion>
            <rect x="-14" y="-6" width="28" height="12" rx="4" fill={isNight ? '#38BDF8' : '#0284C7'} />
            <rect x="-4" y="-4" width="12" height="8" rx="2" fill={isNight ? '#082F49' : '#0C4A6E'} />
            <circle cx="13" cy="-3.5" r="1.5" fill="#FEF08A" />
            <circle cx="13" cy="3.5" r="1.5" fill="#FEF08A" />
          </g>
        </svg>

        {/* Ambient Center Glows */}
        <div
          className={`absolute top-[-10%] right-[10%] w-[600px] h-[600px] rounded-full blur-[130px] transition-all duration-700 ${
            isNight ? 'bg-[#10B981]/15' : 'bg-[#75E2D9]/25'
          }`}
        />
        <div
          className={`absolute bottom-[5%] left-[5%] w-[550px] h-[550px] rounded-full blur-[140px] transition-all duration-700 ${
            isNight ? 'bg-[#06B6D4]/12' : 'bg-[#82E69F]/25'
          }`}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8 lg:px-12 py-5 flex flex-col justify-between min-h-screen">
        {/* ================================================================= */}
        {/* 2. TOP EXECUTIVE NAVBAR (Transparent Logo + Day/Night Toggle)     */}
        {/* ================================================================= */}
        <header
          className={`flex items-center justify-between py-3 border-b backdrop-blur-md transition-colors duration-500 ${
            isNight ? 'border-[#10B981]/15' : 'border-[#3B654C]/15'
          }`}
        >
          {/* Brand Identity: 100% Transparent Logo (Zero Background Box) */}
          <div
            onClick={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3.5 cursor-pointer group"
          >
            {/* Pure Floating Logo with NO background box */}
            <img
              src="/logo.png"
              alt="Amman Urban Digital Twin Logo"
              className="w-11 h-11 sm:w-12 sm:h-12 object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-300"
            />
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-sm sm:text-base font-extrabold tracking-tight transition-colors ${
                    isNight ? 'text-white' : 'text-[#142A1D]'
                  }`}
                >
                  {isAr ? 'التوأم الرقمي لعمان' : 'Amman Urban Digital Twin'}
                </span>
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold border ${
                    isNight
                      ? 'bg-[#10B981]/15 text-[#34D399] border-[#10B981]/30'
                      : 'bg-[#32855B]/15 text-[#185337] border-[#32855B]/25'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                  SUMO v1.21
                </span>
              </div>
              <span
                className={`block text-[11px] font-mono tracking-wider uppercase transition-colors ${
                  isNight ? 'text-[#94A3B8]' : 'text-[#3D5A46]'
                }`}
              >
                {isAr ? 'محاكاة مجهرية • ذكاء بيئي ومروري' : 'Co-Simulation & Mobility Intelligence'}
              </span>
            </div>
          </div>

          {/* Navigation Anchors: 4 Dedicated Pages */}
          <nav
            className={`hidden lg:flex items-center gap-1 p-1.5 rounded-full backdrop-blur-md border shadow-sm transition-all ${
              isNight
                ? 'bg-[#0B1812]/80 border-[#10B981]/20'
                : 'bg-white/50 border-white/70 shadow-[0_4px_16px_rgba(20,40,25,0.04)]'
            }`}
          >
            {[
              { id: 'home', labelEn: 'Home', labelAr: 'الرئيسية' },
              { id: 'about', labelEn: 'About', labelAr: 'عن المشروع' },
              { id: 'twin', labelEn: 'Innovation', labelAr: 'استكشاف التوأم' },
              { id: 'projects', labelEn: 'Projects', labelAr: 'المشاريع' }
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
                      ? 'bg-[#10B981] text-[#070F0B] shadow-sm font-bold'
                      : 'bg-[#BFE2F8] text-[#142C2A] shadow-sm font-bold'
                    : isNight
                    ? 'text-[#CBD5E1] hover:text-white hover:bg-white/5'
                    : 'text-[#36503F] hover:text-[#142A1D] hover:bg-white/40'
                }`}
              >
                {isAr ? tab.labelAr : tab.labelEn}
              </button>
            ))}
          </nav>

          {/* Right Actions: Day/Night Mode, Lang Switcher & Executive Launch CTA */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Day / Night Mode Toggle (نهار و ليل) */}
            <button
              onClick={() => setTheme(isNight ? 'day' : 'night')}
              className={`p-2 rounded-full border transition-all cursor-pointer flex items-center justify-center ${
                isNight
                  ? 'border-[#10B981]/30 bg-[#0E2018]/80 text-[#FEF08A] hover:bg-[#10B981]/15'
                  : 'border-[#2D4D37]/25 bg-white/50 text-[#1B4B32] hover:bg-white/80'
              }`}
              title={isNight ? (isAr ? 'التبديل إلى الوضع النهاري' : 'Switch to Day Mode') : (isAr ? 'التبديل إلى الوضع الليلي' : 'Switch to Night Mode')}
            >
              {isNight ? <Sun className="w-4 h-4 text-[#FDE047]" /> : <Moon className="w-4 h-4 text-[#164E33]" />}
            </button>

            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'EN' ? 'AR' : 'EN')}
              className={`px-3 py-1.5 rounded-full border text-xs font-mono font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm ${
                isNight
                  ? 'border-[#10B981]/30 bg-[#0E2018]/80 text-[#6EE7B7] hover:bg-[#10B981]/15'
                  : 'border-[#2D4D37]/30 bg-white/40 text-[#1C3626] hover:bg-white/70'
              }`}
              title="Toggle Language"
            >
              <Globe className={`w-3.5 h-3.5 ${isNight ? 'text-[#10B981]' : 'text-[#2D6C48]'}`} />
              <span>{lang === 'EN' ? 'العربية' : 'English'}</span>
            </button>

            {/* Launch CTA */}
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
        {/* PAGE 1: HOME VIEW (The Full Rich Landing Page - Untouched)        */}
        {/* ================================================================= */}
        {activeTab === 'home' && (
          <>
            {/* 3. HERO SECTION: Silky Smooth Cutout (No Ink Splatter / No Box)    */}
            <section id="overview" className="pt-8 sm:pt-12 lg:pt-14 pb-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-5 text-left rtl:text-right">
            <div
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono tracking-wide shadow-sm ${
                isNight
                  ? 'bg-[#10B981]/10 border-[#10B981]/25 text-[#34D399]'
                  : 'bg-white/60 border-white/80 text-[#1F5435]'
              }`}
            >
              <ShieldCheck className={`w-3.5 h-3.5 ${isNight ? 'text-[#10B981]' : 'text-[#267C4E]'}`} />
              <span>
                {isAr
                  ? 'محاكاة حضرية دقيقة • تجنب الهدر المالي والمخاطر الميدانية'
                  : 'Precision Urban Simulation • Zero Capital Risk'}
              </span>
            </div>

            <div className="space-y-1">
              <h1
                className={`text-4xl sm:text-5xl lg:text-[58px] font-extrabold tracking-[-0.02em] leading-[1.08] ${
                  isNight ? 'text-white' : 'text-[#133020]'
                }`}
              >
                {isAr ? 'طريقة أذكى لإدارة' : 'A Smarter Way to'}
              </h1>
              <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-extrabold tracking-[-0.02em] leading-[1.08] bg-gradient-to-r from-[#4A72DF] via-[#48C3CB] to-[#5BCF7B] bg-clip-text text-transparent pb-1">
                {isAr ? 'عمان الكبرى' : 'Move Amman'}
              </h1>
            </div>

            <p
              className={`text-sm sm:text-base font-normal leading-relaxed max-w-xl ${
                isNight ? 'text-[#94A3B8]' : 'text-[#2E4738]'
              }`}
            >
              {isAr
                ? 'لماذا نخاطر بملايين الدنانير وأشهر من الاختناقات على أرض الواقع؟ التوأم الرقمي يتيح لك تطبيق أي سيناريو هندسي أو مروري في بيئة افتراضية متطورة، رصد مسارات الإسعاف التلقائية، اختبار الإشارات الذكية، ومحاكاة تبريد الجزر الحرارية قبل إنفاق دينار واحد.'
                : 'Why risk millions of Dinars and months of public gridlock in real-world trials? Amman Urban Digital Twin lets you simulate any infrastructure scenario in a microscopic virtual environment: test ambulance green corridors, autonomous signal logic, and microclimate heat mitigation before breaking ground.'}
            </p>

            {/* Key Metric Tickers */}
            <div className="grid grid-cols-3 gap-3 pt-1 max-w-lg">
              <div
                className={`p-3 rounded-2xl border shadow-sm ${
                  isNight
                    ? 'bg-[#0B1812]/90 border-[#10B981]/20'
                    : 'bg-white/55 border-white/80 shadow-[0_4px_16px_rgba(30,60,40,0.05)]'
                }`}
              >
                <div className={`flex items-center gap-1 text-xs font-mono font-bold mb-1 ${isNight ? 'text-[#10B981]' : 'text-[#227246]'}`}>
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>{isAr ? 'توفير التكاليف' : 'Zero Trial Cost'}</span>
                </div>
                <div className={`text-xl sm:text-2xl font-black font-mono ${isNight ? 'text-white' : 'text-[#133020]'}`}>100%</div>
                <p className={`text-[10.5px] mt-0.5 ${isNight ? 'text-[#64748B]' : 'text-[#4A6453]'}`}>{isAr ? 'اختبار رقمي آمن' : 'Virtual Validation'}</p>
              </div>

              <div
                className={`p-3 rounded-2xl border shadow-sm ${
                  isNight
                    ? 'bg-[#0B1812]/90 border-[#06B6D4]/20'
                    : 'bg-white/55 border-white/80 shadow-[0_4px_16px_rgba(30,60,40,0.05)]'
                }`}
              >
                <div className={`flex items-center gap-1 text-xs font-mono font-bold mb-1 ${isNight ? 'text-[#06B6D4]' : 'text-[#1E748B]'}`}>
                  <Siren className="w-3.5 h-3.5" />
                  <span>{isAr ? 'سرعة الإسعاف' : 'Emergency Wave'}</span>
                </div>
                <div className={`text-xl sm:text-2xl font-black font-mono ${isNight ? 'text-white' : 'text-[#133020]'}`}>-4.2m</div>
                <p className={`text-[10.5px] mt-0.5 ${isNight ? 'text-[#64748B]' : 'text-[#4A6453]'}`}>{isAr ? 'فتح مسار تلقائي' : 'Corridor Clearance'}</p>
              </div>

              <div
                className={`p-3 rounded-2xl border shadow-sm ${
                  isNight
                    ? 'bg-[#0B1812]/90 border-[#10B981]/20'
                    : 'bg-white/55 border-white/80 shadow-[0_4px_16px_rgba(30,60,40,0.05)]'
                }`}
              >
                <div className={`flex items-center gap-1 text-xs font-mono font-bold mb-1 ${isNight ? 'text-[#34D399]' : 'text-[#238050]'}`}>
                  <Thermometer className="w-3.5 h-3.5" />
                  <span>{isAr ? 'تبريد الجزر' : 'Heat Offset'}</span>
                </div>
                <div className={`text-xl sm:text-2xl font-black font-mono ${isNight ? 'text-white' : 'text-[#133020]'}`}>-3.8°C</div>
                <p className={`text-[10.5px] mt-0.5 ${isNight ? 'text-[#64748B]' : 'text-[#4A6453]'}`}>{isAr ? '35° -> تخضير حضري' : 'Thermal Relief'}</p>
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
                  const el = document.getElementById('corridor');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full border text-sm font-semibold tracking-tight backdrop-blur-sm active:scale-95 transition-all duration-200 cursor-pointer shadow-sm ${
                  isNight
                    ? 'border-[#10B981]/30 bg-[#0E2018]/80 text-[#E2E8F0] hover:bg-[#10B981]/15'
                    : 'border-[#2D4D37]/30 bg-white/45 text-[#1A3323] hover:bg-white/75'
                }`}
              >
                <Play className={`w-3.5 h-3.5 fill-current ${isNight ? 'text-[#10B981]' : 'text-[#206742]'}`} />
                <span>{isAr ? 'محاكاة شارع الملكة رانيا' : 'Queen Rania Simulation'}</span>
              </button>
            </div>
          </div>

          {/* Right Visual Stage: Silky Smooth De-Fringed Cutout (NO Black Ink Splatter) */}
          <div className="lg:col-span-6 xl:col-span-6 flex justify-center lg:justify-end relative">
            <div className="relative w-full max-w-[560px] lg:max-w-[620px] group">
              {/* Radiant Ambient Backglow */}
              <div
                className={`absolute inset-0 rounded-full blur-[80px] -z-10 transform scale-90 transition-colors duration-700 ${
                  isNight ? 'bg-[#10B981]/25' : 'bg-[#51D3BE]/30'
                }`}
              />

              {/* Ultra-Smooth 3D City & Robotic Hand (De-fringed & smooth antialiased edges) */}
              <img
                src="/hero-hand-smooth.png"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/hero-city-hand-feathered.png';
                }}
                alt="Amman Digital Twin Holographic City on Smartphone"
                className="w-full h-auto object-contain filter drop-shadow-[0_22px_40px_rgba(20,45,28,0.24)] transition-transform duration-700 ease-out group-hover:scale-[1.02] pointer-events-none select-none"
              />

              {/* Floating Real-Time Telemetry HUD Overlays */}
              <div
                className={`absolute top-4 left-2 sm:left-4 backdrop-blur-md rounded-2xl p-2.5 shadow-lg text-left rtl:text-right flex items-center gap-2.5 border ${
                  isNight
                    ? 'bg-[#070F0B]/85 border-[#10B981]/40'
                    : 'bg-white/75 border-white/90 shadow-[0_8px_24px_rgba(20,40,25,0.08)]'
                }`}
              >
                <div className="w-2.5 h-2.5 rounded-full bg-[#1EA565] animate-ping" />
                <div>
                  <div className={`text-[10px] font-mono uppercase ${isNight ? 'text-[#94A3B8]' : 'text-[#4A6854]'}`}>SUMO Active Agents</div>
                  <div className={`text-xs font-bold font-mono ${isNight ? 'text-white' : 'text-[#133020]'}`}>18,420 Live Vehicles</div>
                </div>
              </div>

              <div
                className={`absolute bottom-4 right-2 sm:right-4 backdrop-blur-md rounded-2xl p-2.5 shadow-lg text-left rtl:text-right flex items-center gap-2.5 border ${
                  isNight
                    ? 'bg-[#070F0B]/85 border-[#06B6D4]/40'
                    : 'bg-white/75 border-white/90 shadow-[0_8px_24px_rgba(20,40,25,0.08)]'
                }`}
              >
                <Radio className={`w-4 h-4 animate-pulse ${isNight ? 'text-[#38BDF8]' : 'text-[#1E748B]'}`} />
                <div>
                  <div className={`text-[10px] font-mono uppercase ${isNight ? 'text-[#94A3B8]' : 'text-[#4A6854]'}`}>Emergency Priority</div>
                  <div className={`text-xs font-bold font-mono ${isNight ? 'text-[#38BDF8]' : 'text-[#185366]'}`}>Green Wave Active</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 4. SIMULATION CAPABILITIES                                        */}
        {/* ================================================================= */}
        <section id="capabilities" className={`pt-14 pb-12 border-t transition-colors ${isNight ? 'border-[#10B981]/15' : 'border-[#3B654C]/15'}`}>
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono font-bold tracking-wider uppercase shadow-sm ${
                isNight
                  ? 'bg-[#10B981]/10 border-[#10B981]/30 text-[#34D399]'
                  : 'bg-white/60 border-white/80 text-[#1F5435]'
              }`}
            >
              <Cpu className={`w-3.5 h-3.5 ${isNight ? 'text-[#10B981]' : 'text-[#267C4E]'}`} />
              <span>{isAr ? 'محرك السيناريوهات الافتراضية' : 'Scenario Sandbox Engine'}</span>
            </div>
            <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${isNight ? 'text-white' : 'text-[#133020]'}`}>
              {isAr
                ? 'طبق أي سيناريو ببالك افتراضياً دون خسارة فلس واحد'
                : 'Test Any Urban Hypothesis in Silicon Before Asphalt'}
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed ${isNight ? 'text-[#94A3B8]' : 'text-[#385141]'}`}>
              {isAr
                ? 'تتيح منصة التوأم الرقمي لمهندسي أمانة عمان الكبرى وخبراء النقل محاكاة الواقع الحقيقي بدقة متناهية عبر 4 ركائز تكنولوجية ذكية.'
                : 'Amman Urban Digital Twin enables urban engineers and transport authorities to stress-test radical urban solutions in high-fidelity simulation.'}
            </p>
          </div>

          {/* Interactive Scenario Grid */}
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
                      ? isNight
                        ? 'bg-[#0B1812] border-[#10B981] shadow-[0_0_30px_rgba(16,185,129,0.3)] scale-[1.02]'
                        : 'bg-white/85 border-[#44C2D0] shadow-[0_12px_32px_rgba(68,194,208,0.22)] scale-[1.02]'
                      : isNight
                      ? 'bg-[#0B1812]/80 hover:bg-[#0E2018] border-[#10B981]/15'
                      : 'bg-white/45 hover:bg-white/70 border-white/80 shadow-[0_8px_24px_rgba(20,40,25,0.04)]'
                  }`}
                >
                  <div className="space-y-3 text-left rtl:text-right">
                    <div className="flex items-center justify-between">
                      <div
                        className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-colors ${
                          isSelected
                            ? isNight ? 'bg-[#10B981] text-[#070F0B]' : 'bg-[#44C2D0] text-[#14261B]'
                            : isNight ? 'bg-[#10B981]/15 text-[#10B981]' : 'bg-[#D6F3E0] text-[#227246] group-hover:bg-[#44C2D0] group-hover:text-white'
                        }`}
                      >
                        <IconComponent className="w-5 h-5 stroke-[2.2]" />
                      </div>
                      <span
                        className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${
                          isNight ? 'bg-white/5 text-[#94A3B8] border-white/10' : 'bg-white/70 text-[#385141] border-white/90'
                        }`}
                      >
                        {isAr ? sc.tagAr : sc.tagEn}
                      </span>
                    </div>

                    <h3 className={`text-base font-bold transition-colors ${isNight ? 'text-white group-hover:text-[#6EE7B7]' : 'text-[#133020] group-hover:text-[#194C31]'}`}>
                      {isAr ? sc.titleAr : sc.titleEn}
                    </h3>

                    <p className={`text-xs leading-relaxed line-clamp-4 ${isNight ? 'text-[#94A3B8]' : 'text-[#385141]'}`}>
                      {isAr ? sc.descAr : sc.descEn}
                    </p>
                  </div>

                  <div className={`pt-4 mt-4 border-t flex items-center justify-between ${isNight ? 'border-white/10' : 'border-[#3B654C]/15'}`}>
                    <div>
                      <div className={`text-[10px] font-mono ${isNight ? 'text-[#64748B]' : 'text-[#52725D]'}`}>
                        {isAr ? sc.statLabelAr : sc.statLabelEn}
                      </div>
                      <div className={`text-lg font-black font-mono ${isNight ? 'text-[#34D399]' : 'text-[#1A683E]'}`}>
                        {sc.statValue}
                      </div>
                    </div>
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors shadow-sm ${
                        isNight
                          ? 'bg-white/5 group-hover:bg-[#10B981] group-hover:text-[#070F0B] text-[#94A3B8]'
                          : 'bg-white/80 group-hover:bg-[#44C2D0] group-hover:text-white text-[#385141]'
                      }`}
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ================================================================= */}
        {/* 5. QUEEN RANIA CORRIDOR: BRT, THERMAL HEATMAP & TREE CANOPY       */}
        {/* ================================================================= */}
        <section id="corridor" className={`pt-10 pb-12 border-t transition-colors ${isNight ? 'border-[#10B981]/15' : 'border-[#3B654C]/15'} grid grid-cols-1 lg:grid-cols-12 gap-8 items-center`}>
          {/* Left Column: Queen Rania St. Digital Twin Visualizer */}
          <div className="lg:col-span-6 xl:col-span-6 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[540px] group">
              {/* Backglow */}
              <div className={`absolute inset-0 rounded-3xl blur-[60px] -z-10 ${isNight ? 'bg-[#10B981]/20' : 'bg-[#51D3BE]/25'}`} />

              {/* Dedicated Queen Rania & BRT Digital Twin Graphic */}
              <div
                className={`relative overflow-hidden rounded-3xl p-3 border shadow-xl transition-all ${
                  isNight
                    ? 'bg-[#0B1812]/90 border-[#10B981]/30'
                    : 'bg-white/60 border-white/80 shadow-[0_16px_40px_rgba(20,40,25,0.08)]'
                }`}
              >
                {/* Interactive Simulation Layer Selector */}
                <div className="flex items-center gap-1.5 mb-2 overflow-x-auto pb-1">
                  {[
                    { id: 'all', labelEn: 'All Layers', labelAr: 'كافة الطبقات' },
                    { id: 'thermal', labelEn: 'Thermal (35.2°C)', labelAr: 'حرارة الإسفلت (35.2°)' },
                    { id: 'brt', labelEn: 'BRT Rapid Bus', labelAr: 'مسار الباص السريع' },
                    { id: 'traffic', labelEn: 'Tree Canopy', labelAr: 'أشجار الجامعة' }
                  ].map((l) => (
                    <button
                      key={l.id}
                      onClick={() => setCorridorLayer(l.id as any)}
                      className={`px-3 py-1 rounded-full text-[10.5px] font-mono font-semibold transition-all cursor-pointer ${
                        corridorLayer === l.id
                          ? isNight
                            ? 'bg-[#10B981] text-[#070F0B] shadow-sm'
                            : 'bg-[#44C2D0] text-[#14261B] shadow-sm'
                          : isNight
                          ? 'bg-white/5 text-[#94A3B8] hover:bg-white/10'
                          : 'bg-white/50 text-[#385141] hover:bg-white/80'
                      }`}
                    >
                      {isAr ? l.labelAr : l.labelEn}
                    </button>
                  ))}
                </div>
                <img
                  src="/queen-rania-corridor-twin.png"
                  alt="Queen Rania St. Corridor Twin - BRT and Microclimate Heatmap"
                  className="w-full h-auto object-contain rounded-2xl transition-transform duration-700 group-hover:scale-[1.02]"
                />

                {/* Live Corridor Telemetry Floating HUDs */}
                <div
                  className={`absolute top-4 left-4 backdrop-blur-md rounded-2xl px-3 py-1.5 flex items-center gap-2 border text-xs font-mono shadow-md ${
                    isNight
                      ? 'bg-[#070F0B]/85 border-[#10B981]/40 text-[#6EE7B7]'
                      : 'bg-white/85 border-white/90 text-[#14532D]'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span>{isAr ? 'الباص السريع: مسار مخصص' : 'BRT Transit: Dedicated'}</span>
                </div>

                <div
                  className={`absolute bottom-4 right-4 backdrop-blur-md rounded-2xl px-3.5 py-2 flex items-center gap-2.5 border shadow-lg ${
                    isNight
                      ? 'bg-[#070F0B]/90 border-[#06B6D4]/40'
                      : 'bg-white/85 border-white/90 shadow-[0_6px_20px_rgba(20,40,25,0.08)]'
                  }`}
                >
                  <Thermometer className="w-4 h-4 text-emerald-500" />
                  <div className="text-left rtl:text-right font-mono">
                    <div className={`text-[10px] ${isNight ? 'text-[#94A3B8]' : 'text-[#4A6854]'}`}>
                      {isAr ? 'تخفيف الجزر الحرارية بالجامعة' : 'UOJ TREE CANOPY BUFFER'}
                    </div>
                    <div className={`text-xs font-bold ${isNight ? 'text-[#34D399]' : 'text-[#166534]'}`}>
                      35.2°C Asphalt → 28.6°C Cooled
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Corridor Explanation & Scope */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-4 lg:pl-4 text-left rtl:text-right">
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono font-bold tracking-wide uppercase shadow-sm ${
                isNight
                  ? 'bg-[#06B6D4]/10 border-[#06B6D4]/30 text-[#38BDF8]'
                  : 'bg-white/60 border-white/80 text-[#1B6072]'
              }`}
            >
              <Bus className="w-3.5 h-3.5" />
              <span>{isAr ? 'نطاق الدراسة: شارع الملكة رانيا (الجامعة الأردنية)' : 'Scope: Queen Rania St. (Univ. of Jordan)'}</span>
            </div>

            <div>
              <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight ${isNight ? 'text-white' : 'text-[#133020]'}`}>
                {isAr ? 'محاكاة الجزر الحرارية' : 'Simulating Urban Heat Islands'}
              </h2>
              <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-[#3FB8C5] to-[#4EB96A] bg-clip-text text-transparent tracking-tight leading-tight">
                {isAr ? 'ومسار الباص السريع والتخضير' : '& BRT Rapid Transit Corridors'}
              </h2>
            </div>

            <p className={`text-xs sm:text-[13.5px] leading-relaxed font-normal ${isNight ? 'text-[#94A3B8]' : 'text-[#2E4738]'}`}>
              {isAr
                ? 'يركز نطاق المشروع على شريان شارع الملكة رانيا العبدالله المحاذي للجامعة الأردنية. حيث ترتفع حرارة سطح الإسفلت المكشوف إلى 35.2° مئوية صيفاً. يحاكي التوأم الرقمي الأثر المزدوج لتبريد أشجار الصنوبر المحاذية لسور الجامعة (-3.8°C هبوط حراري) مع أولوية إشارات الباص السريع الترددي (BRT) لحل الأزمة المزمنة.'
                : 'Focusing on the vital Queen Rania Al-Abdullah arterial corridor bordering the University of Jordan campus. The Digital Twin models asphalt heat trapping reaching 35.2°C and simulates the dual cooling impact of pine tree canopies (-3.8°C relief) synchronized with dedicated Bus Rapid Transit (BRT) priority phases.'}
            </p>

            {/* Checklist */}
            <div className={`space-y-2 pt-1 font-mono text-xs ${isNight ? 'text-[#CBD5E1]' : 'text-[#2A4735]'}`}>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#208351] shrink-0" />
                <span>{isAr ? 'محاكاة بؤرة 35.2°C الإسفلتية وخفضها إلى 28.6°C بالتشجير' : '35.2°C Asphalt heat island alleviation down to 28.6°C via canopies'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#208351] shrink-0" />
                <span>{isAr ? 'أولوية إشارات المرور الذكية للباص السريع عند بوابات الجامعة' : 'Smart adaptive signal priority for BRT buses at University gates'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#208351] shrink-0" />
                <span>{isAr ? 'تشتت انبعاثات الكربون وحركة المشاة عبر جسور المشاة الذكية' : 'Emissions dispersal modeling and smart pedestrian bridge flows'}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onExplore}
                className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full border text-xs font-mono font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-sm ${
                  isNight
                    ? 'bg-[#10B981]/20 hover:bg-[#10B981]/30 border-[#10B981]/40 text-[#6EE7B7]'
                    : 'bg-white/70 hover:bg-white/95 border-[#2D4D37]/30 text-[#144229]'
                }`}
              >
                <span>{isAr ? 'اختبار سيناريو شارع الجامعة' : 'Test Queen Rania Scenario'}</span>
                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </button>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 6. ABOUT THE PROJECT DEEP-DIVE                                    */}
        {/* ================================================================= */}
        <section id="about" className={`pt-12 pb-12 border-t transition-colors ${isNight ? 'border-[#10B981]/15' : 'border-[#3B654C]/15'}`}>
          <div className="max-w-4xl mx-auto text-center space-y-3 mb-10">
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono font-bold tracking-wider uppercase shadow-sm ${
                isNight
                  ? 'bg-[#10B981]/10 border-[#10B981]/30 text-[#34D399]'
                  : 'bg-white/60 border-white/80 text-[#1F5435]'
              }`}
            >
              <Building2 className={`w-3.5 h-3.5 ${isNight ? 'text-[#10B981]' : 'text-[#267C4E]'}`} />
              <span>{isAr ? 'عن مشروع التوأم الرقمي' : 'About The Digital Twin Project'}</span>
            </div>
            <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${isNight ? 'text-white' : 'text-[#133020]'}`}>
              {isAr
                ? 'هندسة مدن المستقبل: دمج الذكاء الاصطناعي مع الواقع الحضري'
                : 'Architecting Future Cities: Bridging Artificial Intelligence & Urban Reality'}
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto ${isNight ? 'text-[#94A3B8]' : 'text-[#385141]'}`}>
              {isAr
                ? 'مشروع تخرج نوعي يهدف إلى تزويد مهندسي المرور ومتخذي القرار بنموذج محاكاة عالي الدقة مبني على محرك SUMO المفتوح المصدر وخوادم بايثون فائقة السرعة.'
                : 'An advanced urban co-simulation platform bridging SUMO (Simulation of Urban MObility) with Python AI controllers, FastAPI backends, and modern spatial data systems.'}
            </p>
          </div>

          {/* 3 Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div
              className={`p-6 rounded-3xl border shadow-sm space-y-3 text-left rtl:text-right ${
                isNight
                  ? 'bg-[#0B1812]/90 border-[#10B981]/20'
                  : 'bg-white/50 border-white/80 shadow-[0_8px_24px_rgba(20,40,25,0.05)]'
              }`}
            >
              <div className="w-10 h-10 rounded-2xl bg-[#D6F3E0] text-[#227246] flex items-center justify-center">
                <Network className="w-5 h-5" />
              </div>
              <h3 className={`text-base font-bold ${isNight ? 'text-white' : 'text-[#133020]'}`}>
                {isAr ? 'محرك المحاكاة المجهري SUMO' : 'SUMO Microscopic Engine'}
              </h3>
              <p className={`text-xs leading-relaxed ${isNight ? 'text-[#94A3B8]' : 'text-[#385141]'}`}>
                {isAr
                  ? 'محاكاة كل مركبة وسائق على حدة، بما في ذلك تسارع المركبات، تغيير المسارب، أزمنة ردة الفعل، وتفاعلات التقاطعات المعقدة على خريطة عمان الحقيقية.'
                  : 'Microscopic agent-based vehicle modeling factoring driver behavior, lane changes, reaction delays, and multi-modal transit across authentic OSM Amman road geometry.'}
              </p>
            </div>

            <div
              className={`p-6 rounded-3xl border shadow-sm space-y-3 text-left rtl:text-right ${
                isNight
                  ? 'bg-[#0B1812]/90 border-[#06B6D4]/20'
                  : 'bg-white/50 border-white/80 shadow-[0_8px_24px_rgba(20,40,25,0.05)]'
              }`}
            >
              <div className="w-10 h-10 rounded-2xl bg-[#CEEEF7] text-[#196075] flex items-center justify-center">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className={`text-base font-bold ${isNight ? 'text-white' : 'text-[#133020]'}`}>
                {isAr ? 'التحكم الذكي عبر TraCI Python' : 'TraCI Python AI Controllers'}
              </h3>
              <p className={`text-xs leading-relaxed ${isNight ? 'text-[#94A3B8]' : 'text-[#385141]'}`}>
                {isAr
                  ? 'ربط مباشر عبر مكتبة TraCI لتعديل بروتوكولات الإشارات الضوئية لحظياً، فرض أولويات الطوارئ، وتطبيق خوارزميات التعلم المعزز لتفكيك الأزمات.'
                  : 'Real-time bidirectional Python control loop querying queue states and dynamically overriding phase durations to dismantle emerging gridlock bottlenecks.'}
              </p>
            </div>

            <div
              className={`p-6 rounded-3xl border shadow-sm space-y-3 text-left rtl:text-right ${
                isNight
                  ? 'bg-[#0B1812]/90 border-[#10B981]/20'
                  : 'bg-white/50 border-white/80 shadow-[0_8px_24px_rgba(20,40,25,0.05)]'
              }`}
            >
              <div className="w-10 h-10 rounded-2xl bg-[#D6F3E0] text-[#208351] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className={`text-base font-bold ${isNight ? 'text-white' : 'text-[#133020]'}`}>
                {isAr ? 'حماية الميزانية العامة' : 'Zero Infrastructure Capital Waste'}
              </h3>
              <p className={`text-xs leading-relaxed ${isNight ? 'text-[#94A3B8]' : 'text-[#385141]'}`}>
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
        <section
          className={`my-8 rounded-3xl p-8 sm:p-12 border text-center relative overflow-hidden backdrop-blur-md shadow-xl transition-all ${
            isNight
              ? 'bg-gradient-to-r from-[#0D261B] via-[#0F3022] to-[#0A1F16] border-[#10B981]/30'
              : 'bg-gradient-to-r from-white/70 via-white/85 to-white/70 border-white/90 shadow-[0_16px_40px_rgba(20,40,25,0.08)]'
          }`}
        >
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${isNight ? 'text-white' : 'text-[#133020]'}`}>
              {isAr ? 'جاهز لتجربة التوأم الرقمي لعمان؟' : 'Ready to Experience Amman’s Digital Twin?'}
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed ${isNight ? 'text-[#94A3B8]' : 'text-[#385141]'}`}>
              {isAr
                ? 'انضم إلى المنصة لاختبار سيناريوهات المرور الحية، استكشاف خرائط حرارة شارع الجامعة، وإطلاق محاكاة الواقع الحقيقي بنقرة واحدة.'
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
        </>
      )}

      {/* ================================================================= */}
      {/* PAGE 2: ABOUT VIEW (Graduation Capstone, Doha Ziad 2026, Tech)    */}
      {/* ================================================================= */}
      {activeTab === 'about' && (
        <AboutPage
          lang={lang}
          theme={theme}
          onExplore={onExplore}
          onLaunch={onLaunch}
        />
      )}

      {/* ================================================================= */}
      {/* PAGE 3: DIGITAL TWIN / INNOVATION VIEW (Interactive Sandbox HUD)  */}
      {/* ================================================================= */}
      {activeTab === 'twin' && (
        <TwinExplorePage
          lang={lang}
          theme={theme}
          onExplore={onExplore}
          onLaunch={onLaunch}
        />
      )}

      {/* ================================================================= */}
      {/* PAGE 4: PROJECTS VIEW (Corridors, BRT, Green Waves, Benchmarks)   */}
      {/* ================================================================= */}
      {activeTab === 'projects' && (
        <ProjectsPage
          lang={lang}
          theme={theme}
          onExplore={onExplore}
          onLaunch={onLaunch}
        />
      )}

        {/* ================================================================= */}
        {/* 8. EXECUTIVE FOOTER: Custom Intellectual Property Attribution    */}
        {/* ================================================================= */}
        <footer
          className={`py-5 border-t flex flex-col sm:flex-row items-center justify-between text-xs font-mono transition-colors ${
            isNight ? 'border-[#10B981]/15 text-[#94A3B8]' : 'border-[#3B654C]/15 text-[#4A6453]'
          }`}
        >
          {/* Custom IP Copyright as requested */}
          <div className="flex items-center gap-3 font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#208351]" />
            <span>
              {isAr
                ? 'ضحى زياد 2026 عمان ايربان ديجيتال توين'
                : 'Doha Ziad 2026 Amman Urban Digital Twin'}
            </span>
          </div>

          <div className="flex items-center gap-4 mt-3 sm:mt-0 font-sans">
            <button
              onClick={onLaunch}
              className={`transition-colors cursor-pointer ${isNight ? 'hover:text-[#10B981]' : 'hover:text-[#133020]'}`}
            >
              {isAr ? 'الدخول للمنصة' : 'Enter Platform'}
            </button>
            <span>•</span>
            <button
              onClick={onExplore}
              className={`transition-colors cursor-pointer ${isNight ? 'hover:text-[#10B981]' : 'hover:text-[#133020]'}`}
            >
              {isAr ? 'تسجيل الدخول' : 'Sign In'}
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};
