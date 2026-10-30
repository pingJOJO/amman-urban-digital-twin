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

export const LandingPage: React.FC<LandingPageProps> = ({ onExplore, onLaunch }) => {
  const [lang, setLang] = useState<'EN' | 'AR'>('EN');
  const [activeTab, setActiveTab] = useState<'overview' | 'capabilities' | 'thermal' | 'about'>('overview');
  const [selectedScenario, setSelectedScenario] = useState<number>(0);

  const isAr = lang === 'AR';

  const scenarios = [
    {
      titleEn: 'Emergency Green Corridor (Ambulance Priority)',
      titleAr: 'الموجة الخضراء الذكية (أولوية مركبات الإسعاف والطوارئ)',
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
      className="relative min-h-screen w-full overflow-x-hidden bg-[#070F0B] text-[#F1F5F9] font-sans selection:bg-[#10B981] selection:text-[#070F0B]"
    >
      {/* Precision Background Laser Grid & Radial Lighting */}
      <div className="pointer-events-none fixed inset-0 z-0">
        {/* Subtle Engineering Matrix Pattern */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `linear-gradient(to right, #10B981 1px, transparent 1px), linear-gradient(to bottom, #10B981 1px, transparent 1px)`,
            backgroundSize: '48px 48px'
          }}
        />

        {/* Ambient Radial Energy Centers */}
        <div className="absolute top-[-15%] right-[-5%] w-[800px] h-[800px] rounded-full bg-gradient-to-br from-[#10B981]/15 to-[#06B6D4]/10 blur-[150px]" />
        <div className="absolute top-[35%] left-[-10%] w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-[#059669]/10 to-[#10B981]/5 blur-[160px]" />
        <div className="absolute bottom-[-10%] right-[15%] w-[900px] h-[900px] rounded-full bg-gradient-to-tl from-[#06B6D4]/10 to-[#047857]/15 blur-[180px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8 lg:px-12 py-5 flex flex-col justify-between min-h-screen">
        {/* ================================================================= */}
        {/* 1. TOP EXECUTIVE NAVBAR (Tesla / Microsoft Enterprise Caliber)   */}
        {/* ================================================================= */}
        <header className="flex items-center justify-between py-3 border-b border-[#10B981]/15 backdrop-blur-xl">
          {/* Brand Identity */}
          <div
            onClick={() => setActiveTab('overview')}
            className="flex items-center gap-3.5 cursor-pointer group"
          >
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#10B981]/20 to-[#06B6D4]/10 p-1.5 border border-[#10B981]/30 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.2)] group-hover:border-[#10B981]/60 transition-all duration-300">
              <img
                src="/logo.png"
                alt="Amman Urban Digital Twin Logo"
                className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(0,229,153,0.5)] group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-extrabold tracking-tight text-white">
                  {isAr ? 'التوأم الرقمي لعمان' : 'Amman Urban Digital Twin'}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-[#10B981]/15 text-[#34D399] border border-[#10B981]/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                  SUMO v1.21
                </span>
              </div>
              <span className="block text-[11px] font-mono text-[#94A3B8] tracking-wider uppercase">
                {isAr ? 'محاكاة مجهرية • ذكاء بيئي ومروري' : 'Co-Simulation & Mobility Intelligence'}
              </span>
            </div>
          </div>

          {/* Navigation Anchors */}
          <nav className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#0D1F17]/80 backdrop-blur-md border border-[#10B981]/20 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
            {[
              { id: 'overview', labelEn: 'Platform Overview', labelAr: 'نظرة عامة' },
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
                    ? 'bg-[#10B981] text-[#070F0B] shadow-[0_0_15px_rgba(16,185,129,0.4)] font-bold'
                    : 'text-[#CBD5E1] hover:text-white hover:bg-white/5'
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
              className="px-3 py-1.5 rounded-lg border border-[#10B981]/30 bg-[#0E2018]/60 hover:bg-[#10B981]/15 text-xs font-mono font-semibold text-[#6EE7B7] transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
              title="Toggle Language"
            >
              <Globe className="w-3.5 h-3.5 text-[#10B981]" />
              <span>{lang === 'EN' ? 'العربية' : 'English'}</span>
            </button>

            <button
              onClick={onLaunch}
              className="group relative inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#10B981] to-[#06B6D4] text-[#070F0B] text-xs sm:text-[13px] font-extrabold tracking-tight shadow-[0_0_25px_rgba(16,185,129,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] hover:scale-105 active:scale-100 transition-all duration-300 cursor-pointer"
            >
              <span>{isAr ? 'بدء تجربة التوأم' : 'Launch Experience'}</span>
              <span className="w-5 h-5 rounded-full bg-[#070F0B] text-[#10B981] flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5">
                <ArrowRight className="w-3 h-3 stroke-[2.5]" />
              </span>
            </button>
          </div>
        </header>

        {/* ================================================================= */}
        {/* 2. HERO SECTION: "A SMARTER WAY TO MOVE AMMAN"                   */}
        {/* ================================================================= */}
        <section id="overview" className="pt-8 sm:pt-14 lg:pt-16 pb-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left / Primary Text Column */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-6 text-left rtl:text-right">
            {/* Top Mission Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#10B981]/10 border border-[#10B981]/25 text-[#34D399] text-xs font-mono tracking-wide">
              <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
              <span>
                {isAr
                  ? 'محاكاة حضرية دقيقة • تجنب الهدر المالي والمخاطر الميدانية'
                  : 'Precision Urban Simulation • Zero Capital Risk'}
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-5xl lg:text-[62px] font-black tracking-[-0.03em] leading-[1.06] text-white">
                {isAr ? 'طريقة أذكى لإدارة' : 'A Smarter Way to'}
              </h1>
              <h1 className="text-4xl sm:text-5xl lg:text-[62px] font-black tracking-[-0.03em] leading-[1.06] bg-gradient-to-r from-[#10B981] via-[#06B6D4] to-[#38BDF8] bg-clip-text text-transparent pb-1">
                {isAr ? 'عمان الكبرى' : 'Move Amman'}
              </h1>
            </div>

            {/* Subtext: Core Value Proposition */}
            <p className="text-sm sm:text-base text-[#94A3B8] font-normal leading-relaxed max-w-xl">
              {isAr
                ? 'لماذا نخاطر بملايين الدنانير وأشهر من الاختناقات على أرض الواقع؟ التوأم الرقمي يتيح لك تطبيق أي سيناريو هندسي أو مروري في بيئة افتراضية متطورة، رصد مسارات الإسعاف التلقائية، اختبار الإشارات الذكية، ومحاكاة تبريد الجزر الحرارية قبل إنفاق دينار واحد.'
                : 'Why risk millions of Dinars and months of public gridlock in real-world trials? Amman Urban Digital Twin lets you simulate any infrastructure scenario in a microscopic virtual environment: test ambulance green corridors, autonomous signal logic, and microclimate heat mitigation before breaking ground.'}
            </p>

            {/* Key Metric Tickers */}
            <div className="grid grid-cols-3 gap-3 pt-2 max-w-lg">
              <div className="p-3 rounded-xl bg-[#0D1F17]/90 border border-[#10B981]/20 shadow-inner">
                <div className="flex items-center gap-1.5 text-[#10B981] text-xs font-mono font-bold mb-1">
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>{isAr ? 'توفير التكاليف' : 'Zero Trial Cost'}</span>
                </div>
                <div className="text-xl sm:text-2xl font-black text-white font-mono">100%</div>
                <p className="text-[10.5px] text-[#64748B] mt-0.5">{isAr ? 'اختبار رقمي آمن' : 'Virtual Validation'}</p>
              </div>

              <div className="p-3 rounded-xl bg-[#0D1F17]/90 border border-[#06B6D4]/20 shadow-inner">
                <div className="flex items-center gap-1.5 text-[#06B6D4] text-xs font-mono font-bold mb-1">
                  <Siren className="w-3.5 h-3.5" />
                  <span>{isAr ? 'سرعة الإسعاف' : 'Emergency Wave'}</span>
                </div>
                <div className="text-xl sm:text-2xl font-black text-white font-mono">-4.2m</div>
                <p className="text-[10.5px] text-[#64748B] mt-0.5">{isAr ? 'فتح مسار تلقائي' : 'Corridor Clearance'}</p>
              </div>

              <div className="p-3 rounded-xl bg-[#0D1F17]/90 border border-[#10B981]/20 shadow-inner">
                <div className="flex items-center gap-1.5 text-[#34D399] text-xs font-mono font-bold mb-1">
                  <Thermometer className="w-3.5 h-3.5" />
                  <span>{isAr ? 'تبريد الجزر' : 'Heat Offset'}</span>
                </div>
                <div className="text-xl sm:text-2xl font-black text-white font-mono">-3.2°C</div>
                <p className="text-[10.5px] text-[#64748B] mt-0.5">{isAr ? '35° -> مناطق خضراء' : 'Thermal Relief'}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                onClick={onExplore}
                className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#10B981] to-[#06B6D4] text-[#070F0B] text-sm font-extrabold tracking-tight shadow-[0_0_30px_rgba(16,185,129,0.35)] hover:shadow-[0_0_45px_rgba(6,182,212,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                <span>{isAr ? 'استكشف التوأم الرقمي' : 'Explore the Digital Twin'}</span>
                <span className="w-6 h-6 rounded-full bg-[#070F0B] text-[#10B981] flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </span>
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('capabilities');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full border border-[#10B981]/30 bg-[#0E2018]/80 backdrop-blur-md text-[#E2E8F0] text-sm font-semibold tracking-tight hover:bg-[#10B981]/10 hover:border-[#10B981]/60 active:scale-95 transition-all duration-200 cursor-pointer shadow-sm"
              >
                <Play className="w-3.5 h-3.5 text-[#10B981] fill-current" />
                <span>{isAr ? 'مشاهدة سيناريوهات المحاكاة' : 'View Simulation Scenarios'}</span>
              </button>
            </div>
          </div>

          {/* Right Visual Stage: Seamless Holographic Amman 3D Simulation */}
          <div className="lg:col-span-6 xl:col-span-6 flex justify-center lg:justify-end relative">
            <div className="relative w-full max-w-[580px] lg:max-w-[640px] group">
              {/* Radial Multi-Layer Atmospheric Lighting (Zero hard edges) */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#10B981]/25 via-[#06B6D4]/20 to-transparent rounded-full blur-[80px] -z-10 transform scale-95" />
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#10B981]/20 rounded-full blur-[60px] -z-10" />

              {/* Seamlessly Blended Image with Radial Mask */}
              <div className="relative overflow-hidden rounded-3xl p-1 bg-gradient-to-b from-[#10B981]/20 via-transparent to-[#10B981]/10 border border-[#10B981]/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                <img
                  src="/hero-city-hand-feathered.png"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/hero-city-hand.jpg';
                  }}
                  alt="Amman Digital Twin Holographic Model"
                  className="w-full h-auto object-contain transition-transform duration-700 ease-out group-hover:scale-[1.02] select-none"
                  style={{
                    maskImage: 'radial-gradient(ellipse at center, black 65%, transparent 100%)',
                    WebkitMaskImage: 'radial-gradient(ellipse at center, black 65%, transparent 100%)'
                  }}
                />

                {/* Floating Real-Time Telemetry HUD Overlays (Tesla Autopilot Style) */}
                <div className="absolute top-4 left-4 bg-[#070F0B]/85 backdrop-blur-md border border-[#10B981]/40 rounded-xl p-2.5 shadow-xl text-left rtl:text-right flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping" />
                  <div>
                    <div className="text-[10px] font-mono text-[#94A3B8] uppercase">SUMO Active Agents</div>
                    <div className="text-xs font-bold font-mono text-white">18,420 Live Vehicles</div>
                  </div>
                </div>

                <div className="absolute bottom-4 right-4 bg-[#070F0B]/85 backdrop-blur-md border border-[#06B6D4]/40 rounded-xl p-2.5 shadow-xl text-left rtl:text-right flex items-center gap-2.5">
                  <Radio className="w-4 h-4 text-[#06B6D4] animate-pulse" />
                  <div>
                    <div className="text-[10px] font-mono text-[#94A3B8] uppercase">Emergency Priority</div>
                    <div className="text-xs font-bold font-mono text-[#38BDF8]">Green Wave Active</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 3. SIMULATION CAPABILITIES (Deeply Addressing User Requirements) */}
        {/* ================================================================= */}
        <section id="capabilities" className="pt-16 pb-14 border-t border-[#10B981]/15">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 text-[#34D399] text-xs font-mono font-bold tracking-wider uppercase">
              <Cpu className="w-3.5 h-3.5 text-[#10B981]" />
              <span>{isAr ? 'محرك السيناريوهات الافتراضية' : 'Scenario Sandbox Engine'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {isAr
                ? 'طبق أي سيناريو ببالك افتراضياً دون خسارة فلس واحد'
                : 'Test Any Urban Hypothesis in Silicon Before Asphalt'}
            </h2>
            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
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
                  className={`p-5 rounded-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between border relative overflow-hidden group ${
                    isSelected
                      ? 'bg-gradient-to-b from-[#10B981]/20 to-[#0A1B14] border-[#10B981] shadow-[0_0_30px_rgba(16,185,129,0.25)]'
                      : 'bg-[#0B1812]/80 hover:bg-[#0E2018] border-[#10B981]/15 hover:border-[#10B981]/40'
                  }`}
                >
                  <div className="space-y-3 text-left rtl:text-right">
                    <div className="flex items-center justify-between">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected ? 'bg-[#10B981] text-[#070F0B]' : 'bg-[#10B981]/15 text-[#10B981] group-hover:bg-[#10B981]/25'
                      }`}>
                        <IconComponent className="w-5 h-5 stroke-[2.2]" />
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-[#94A3B8] border border-white/10">
                        {isAr ? sc.tagAr : sc.tagEn}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-[#6EE7B7] transition-colors">
                      {isAr ? sc.titleAr : sc.titleEn}
                    </h3>

                    <p className="text-xs text-[#94A3B8] leading-relaxed line-clamp-4">
                      {isAr ? sc.descAr : sc.descEn}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-mono text-[#64748B]">
                        {isAr ? sc.statLabelAr : sc.statLabelEn}
                      </div>
                      <div className="text-lg font-black font-mono text-[#34D399]">
                        {sc.statValue}
                      </div>
                    </div>
                    <span className="w-7 h-7 rounded-full bg-white/5 group-hover:bg-[#10B981] group-hover:text-[#070F0B] text-[#94A3B8] flex items-center justify-center transition-colors">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ================================================================= */}
        {/* 4. REAL-TIME TELEMETRY & HEAT ISLAND SHOWCASE                     */}
        {/* ================================================================= */}
        <section id="thermal" className="pt-12 pb-14 border-t border-[#10B981]/15 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Dark Control-Center Telemetry Image */}
          <div className="lg:col-span-6 xl:col-span-7 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[620px] rounded-3xl overflow-hidden p-1.5 bg-gradient-to-b from-[#10B981]/30 via-[#0B1C15] to-[#06B6D4]/20 border border-[#10B981]/30 shadow-[0_25px_60px_rgba(0,0,0,0.9)] group">
              {/* Backglow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#10B981]/20 to-[#06B6D4]/15 rounded-3xl blur-[70px] -z-10" />

              <img
                src="/realtime-insights-feathered.png"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/realtime-insights.jpg';
                }}
                alt="Amman Real Time City Insights & Thermal Heatmaps"
                className="w-full h-auto rounded-2xl object-cover transition-transform duration-700 group-hover:scale-105"
                style={{
                  maskImage: 'radial-gradient(ellipse at center, black 70%, transparent 100%)',
                  WebkitMaskImage: 'radial-gradient(ellipse at center, black 70%, transparent 100%)'
                }}
              />

              {/* Live HUD Pins (Simulating the 35°C Microclimate detection) */}
              <div className="absolute bottom-6 left-6 bg-[#070F0B]/90 backdrop-blur-md border border-[#10B981]/40 rounded-xl px-3.5 py-2 flex items-center gap-3 shadow-2xl">
                <div className="w-3 h-3 rounded-full bg-[#10B981] animate-ping" />
                <div className="text-left rtl:text-right font-mono">
                  <div className="text-[10px] text-[#94A3B8]">URBAN HEAT ISLAND REDUCTION</div>
                  <div className="text-xs font-bold text-[#34D399]">35.0°C Hotspot → 31.8°C with Green Canopy</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Deep Environmental & Heat Explanation */}
          <div className="lg:col-span-6 xl:col-span-5 space-y-5 text-left rtl:text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#06B6D4]/10 border border-[#06B6D4]/30 text-[#38BDF8] text-xs font-mono font-bold tracking-wide uppercase">
              <Thermometer className="w-3.5 h-3.5 text-[#06B6D4]" />
              <span>{isAr ? 'المناخ الحضري وانبعاثات الكربون' : 'Microclimate & Emissions'}</span>
            </div>

            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                {isAr ? 'محاكاة درجات الحرارة' : 'Simulating Urban Heat Islands'}
              </h2>
              <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-[#10B981] to-[#06B6D4] bg-clip-text text-transparent tracking-tight leading-tight">
                {isAr ? 'وتخفيضها بالمساحات الخضراء' : '& Carbon Plume Dynamics'}
              </h2>
            </div>

            <p className="text-xs sm:text-[13.5px] text-[#94A3B8] leading-relaxed font-normal">
              {isAr
                ? 'تصل درجات الحرارة في البؤر الإسفلتية المكتظة بعمان إلى 35° مئوية بسبب غياب الظلال وامتصاص الإسفلت للحرارة. يحاكي التوأم الرقمي الأثر التبريدي لغرس أحزمة الأشجار والمسطحات الخضراء بدقة، لحساب كمية الهبوط الحراري وتوزيع الكثافة السكانية ومسارات تشتت ثاني أكسيد الكربون قبل تنفيذ المشاريع ميدانياً.'
                : 'Dense asphalt intersections across Amman frequently reach surface temperatures exceeding 35°C. Amman Urban Digital Twin models microclimate radiative physics, quantifying the exact cooling degree drop achieved by planting urban vegetation corridors, green roofs, and bioswales before committing municipal funds.'}
            </p>

            {/* Micro-Features Checklist */}
            <div className="space-y-2.5 pt-2 font-mono text-xs text-[#CBD5E1]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                <span>{isAr ? 'رصد فوري لدرجات الحرارة السطحية (22°C - 35°C)' : 'Localized surface temperature thermal mapping (22°C - 35°C)'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                <span>{isAr ? 'محاكاة انبعاثات أساطيل النقل ونقاط التلوث المركز' : 'Microscopic fleet emission dispersal & corridor carbon tracking'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                <span>{isAr ? 'تنبؤ ديناميكي بتحركات الكثافة السكانية وساعات الذروة' : 'Dynamic demographic population flow & pedestrian accessibility'}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onExplore}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#10B981]/15 hover:bg-[#10B981]/25 border border-[#10B981]/40 text-[#6EE7B7] text-xs font-mono font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer"
              >
                <span>{isAr ? 'عرض خريطة الحرارة الحية' : 'Launch Thermal HUD'}</span>
                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </button>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 5. ABOUT THE PROJECT DEEP-DIVE (Expanded & Enriched)             */}
        {/* ================================================================= */}
        <section id="about" className="pt-14 pb-14 border-t border-[#10B981]/15">
          <div className="max-w-4xl mx-auto text-center space-y-4 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 text-[#34D399] text-xs font-mono font-bold tracking-wider uppercase">
              <Building2 className="w-3.5 h-3.5 text-[#10B981]" />
              <span>{isAr ? 'عن مشروع التوأم الرقمي' : 'About The Digital Twin Project'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {isAr
                ? 'هندسة مدن المستقبل: دمج الذكاء الاصطناعي مع الواقع الحضري'
                : 'Architecting Future Cities: Bridging Artificial Intelligence & Urban Reality'}
            </h2>
            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed max-w-2xl mx-auto">
              {isAr
                ? 'مشروع تخرج نوعي يهدف إلى تزويد مهندسي المرور ومتخذي القرار بنموذج محاكاة عالي الدقة مبني على محرك SUMO المفتوح المصدر وخوادم بايثون فائقة السرعة.'
                : 'An advanced urban co-simulation platform bridging SUMO (Simulation of Urban MObility) with Python AI controllers, FastAPI backends, and modern spatial data systems.'}
            </p>
          </div>

          {/* 3 Pillars of Architecture */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-6 rounded-2xl bg-[#0B1812]/90 border border-[#10B981]/20 shadow-xl space-y-3 text-left rtl:text-right">
              <div className="w-10 h-10 rounded-xl bg-[#10B981]/15 text-[#10B981] flex items-center justify-center">
                <Network className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">
                {isAr ? 'محرك المحاكاة المجهري SUMO' : 'SUMO Microscopic Engine'}
              </h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                {isAr
                  ? 'محاكاة كل مركبة وسائق على حدة، بما في ذلك تسارع المركبات، تغيير المسارب، أزمنة ردة الفعل، وتفاعلات التقاطعات المعقدة على خريطة عمان الحقيقية.'
                  : 'Microscopic agent-based vehicle modeling factoring driver behavior, lane changes, reaction delays, and multi-modal transit across authentic OSM Amman road geometry.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0B1812]/90 border border-[#06B6D4]/20 shadow-xl space-y-3 text-left rtl:text-right">
              <div className="w-10 h-10 rounded-xl bg-[#06B6D4]/15 text-[#06B6D4] flex items-center justify-center">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">
                {isAr ? 'التحكم الذكي عبر TraCI Python' : 'TraCI Python AI Controllers'}
              </h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                {isAr
                  ? 'ربط مباشر عبر مكتبة TraCI لتعديل بروتوكولات الإشارات الضوئية لحظياً، فرض أولويات الطوارئ، وتطبيق خوارزميات التعلم المعزز لتفكيك الأزمات.'
                  : 'Real-time bidirectional Python control loop querying queue states and dynamically overriding phase durations to dismantle emerging gridlock bottlenecks.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0B1812]/90 border border-[#10B981]/20 shadow-xl space-y-3 text-left rtl:text-right">
              <div className="w-10 h-10 rounded-xl bg-[#10B981]/15 text-[#34D399] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">
                {isAr ? 'حماية الميزانية العامة' : 'Zero Infrastructure Capital Waste'}
              </h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                {isAr
                  ? 'اختبار الأنفاق والجسور وخطوط الباص السريع قبل البناء يوفر تكاليف باهظة بالملايين ويضمن نجاح المشاريع الهندسية بنسبة 100% قبل وضع حجر الأساس.'
                  : 'Validating bridges, tunnels, and Bus Rapid Transit (BRT) lane conversions in simulation prevents costly engineering failures and guarantees civic return on investment.'}
              </p>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 6. EXECUTIVE FINAL CTA BANNER                                     */}
        {/* ================================================================= */}
        <section className="my-10 rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-[#0D261B] via-[#0F3022] to-[#0A1F16] border border-[#10B981]/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-center relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#10B981]/15 blur-[90px] -z-0" />
          <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-[#06B6D4]/15 blur-[90px] -z-0" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-5">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {isAr ? 'جاهز لتجربة التوأم الرقمي لعمان؟' : 'Ready to Experience Amman’s Digital Twin?'}
            </h2>
            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
              {isAr
                ? 'انضم إلى المنصة لاختبار سيناريوهات المرور الحية، استكشاف خرائط الحرارة الحضرية، وإطلاق محاكاة الواقع الحقيقي بنقرة واحدة.'
                : 'Join urban researchers and civil engineers testing live simulation scenarios, green wave preemption, and microclimate heat mapping.'}
            </p>
            <div className="pt-2">
              <button
                onClick={onExplore}
                className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#10B981] to-[#06B6D4] text-[#070F0B] text-sm font-extrabold tracking-tight shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:shadow-[0_0_45px_rgba(6,182,212,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                <span>{isAr ? 'الدخول إلى لوحة التحكم والمحاكاة' : 'Launch Simulation Workspace'}</span>
                <span className="w-6 h-6 rounded-full bg-[#070F0B] text-[#10B981] flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 7. EXECUTIVE FOOTER                                               */}
        {/* ================================================================= */}
        <footer className="py-6 border-t border-[#10B981]/15 flex flex-col sm:flex-row items-center justify-between text-xs text-[#64748B] font-mono">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#10B981]" />
            <span>
              {isAr
                ? 'مشروع التوأم الرقمي الحضري لعمان الكبرى © 2026'
                : 'Amman Urban Digital Twin • Precision Co-Simulation © 2026'}
            </span>
          </div>

          <div className="flex items-center gap-4 mt-3 sm:mt-0">
            <span className="text-[#94A3B8]">31.9539° N, 35.9106° E</span>
            <span>•</span>
            <button onClick={onLaunch} className="hover:text-[#10B981] transition-colors cursor-pointer">
              {isAr ? 'الدخول للمنصة' : 'Enter Platform'}
            </button>
            <span>•</span>
            <button onClick={onExplore} className="hover:text-[#10B981] transition-colors cursor-pointer">
              {isAr ? 'تسجيل الدخول' : 'Sign In'}
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};
