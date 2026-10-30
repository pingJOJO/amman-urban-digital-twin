import React from 'react';
import {
  ShieldCheck,
  Building2,
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
  lang: 'EN' | 'AR';
  theme: 'day' | 'night';
  onExplore: () => void;
  onLaunch: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ lang, theme, onExplore }) => {
  const isAr = lang === 'AR';
  const isNight = theme === 'night';

  const pillars = [
    {
      titleEn: 'Zero-Risk Virtual Prototyping',
      titleAr: 'التحقق الافتراضي الآمن 100%',
      descEn:
        'Eliminating costly physical construction blunders by running high-fidelity microscopic simulations prior to allocating municipal capital.',
      descAr:
        'إلغاء مخاطر الإنشاء والتكاليف الباهظة للمشاريع الميدانية عبر محاكاة مجهرية دقيقة لجميع الفرضيات الهندسية قبل اعتماد الموازنات الرأسمالية.',
      icon: ShieldCheck,
      stat: '100%',
      statLabelEn: 'Capital Risk Elimination',
      statLabelAr: 'تجنب الهدر المالي'
    },
    {
      titleEn: 'Autonomous Micro-Simulation Core',
      titleAr: 'محرك المحاكاة المجهرية SUMO',
      descEn:
        'Every vehicle, pedestrian, bus, and traffic light is simulated as an autonomous agent adhering to authentic Amman road network topologies.',
      descAr:
        'محاكاة تفاعلية لكل مركبة، حافلة، وممر مشاة على حدة وفق شبكة طرق عمان الدقيقة المستخرجة من نظم المعلومات الجغرافية.',
      icon: Cpu,
      stat: '18,400+',
      statLabelEn: 'Active Micro-Agents',
      statLabelAr: 'مركبة محاكاة لحظية'
    },
    {
      titleEn: 'Urban Microclimate & Thermal Solver',
      titleAr: 'نمذجة الجزر الحرارية والمناخ الحضري',
      descEn:
        'Measuring surface asphalt heat islands along Queen Rania Corridor and testing the cooling effects of native pine canopies and shaded BRT walkways.',
      descAr:
        'رصد درجات حرارة الإسفلت التي تصل إلى 35.2° مئوية واختبار أثر التبريد الطبيعي لأشجار الصنوبر المحاذية لسور الجامعة الأردنية.',
      icon: Activity,
      stat: '-3.8°C',
      statLabelEn: 'Thermal Island Mitigation',
      statLabelAr: 'خفض درجة الحرارة'
    },
    {
      titleEn: 'TraCI Real-Time AI Control Loop',
      titleAr: 'التحكم الذكي الفوري عبر خوارزميات TraCI',
      descEn:
        'Dynamic traffic signal optimization that automatically grants green corridors for civil defense ambulances and dissolves junction bottlenecks.',
      descAr:
        'ربط فوري بين بايثون ومحرك السيموليشن لفتح الموجات الخضراء لمركبات الإسعاف وإعادة توزيع أزمنة الإشارات الضوئية ذاتياً.',
      icon: Network,
      stat: '-4.2 min',
      statLabelEn: 'Ambulance Response Time',
      statLabelAr: 'تقليص زمن الطوارئ'
    }
  ];

  const techStack = [
    { name: 'SUMO 1.21', categoryEn: 'Simulation Engine', categoryAr: 'محرك المحاكاة المجهري', icon: Layers },
    { name: 'Python 3.11 + TraCI', categoryEn: 'AI & Real-time Control', categoryAr: 'التحكم الذكي بالمرور', icon: FileCode2 },
    { name: 'FastAPI (Python)', categoryEn: 'High-Speed Backend', categoryAr: 'خادم معالجة البيانات', icon: Database },
    { name: 'React 18 & TypeScript', categoryEn: 'Spatial HUD Frontend', categoryAr: 'واجهة التوأم التفاعلية', icon: Compass },
    { name: 'OpenStreetMap (OSM)', categoryEn: 'Amman Road Network', categoryAr: 'شبكة شوارع عمان الدقيقة', icon: GitBranch },
    { name: 'Microclimate Grid', categoryEn: 'Thermal Model (35.2°C)', categoryAr: 'مستشعرات الحرارة والانبعاثات', icon: BarChart3 }
  ];

  return (
    <div className="space-y-16 py-8">
      {/* 1. HERO SECTION OF ABOUT PAGE */}
      <section className="text-center max-w-4xl mx-auto space-y-5">
        <div
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-mono font-bold tracking-wider uppercase shadow-sm ${
            isNight
              ? 'bg-[#10B981]/10 border-[#10B981]/30 text-[#34D399]'
              : 'bg-white/65 border-white/85 text-[#1F5435]'
          }`}
        >
          <GraduationCap className={`w-4 h-4 ${isNight ? 'text-[#10B981]' : 'text-[#207B4A]'}`} />
          <span>
            {isAr
              ? 'مشروع تخرج نوعي • إشراف وتطوير أكاديمي متقدم 2026'
              : 'Graduation Capstone Project • Advanced Academic Research 2026'}
          </span>
        </div>

        <div className="space-y-2">
          <h1
            className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight ${
              isNight ? 'text-white' : 'text-[#133020]'
            }`}
          >
            {isAr ? 'التوأم الرقمي لعمان الكبرى' : 'Amman Urban Digital Twin'}
          </h1>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#4A72DF] via-[#48C3CB] to-[#5BCF7B] bg-clip-text text-transparent pb-1">
            {isAr ? 'محاكاة الواقع قبل إنفاق دينار واحد' : 'Precision Co-Simulation for Smart Mobility'}
          </h2>
        </div>

        <p
          className={`text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-normal ${
            isNight ? 'text-[#94A3B8]' : 'text-[#2E4738]'
          }`}
        >
          {isAr
            ? 'مشروع تخرج مبتكر بقيادة المهندسة ضحى زياد (2026)، يدمج محاكاة المرور المجهرية المتقدمة (SUMO) والتحكم الذكي بالذكاء الاصطناعي مع دراسة المناخ الحضري وانبعاثات الكربون، لتقديم منصة متكاملة تدعم متخذي القرار في أمانة عمان الكبرى ووزارة النقل.'
            : 'An innovative graduation capstone led by Doha Ziad (2026), bridging microscopic traffic co-simulation (SUMO), Python AI controllers (TraCI), and microclimate thermal modeling to provide Greater Amman Municipality with actionable, zero-risk infrastructure analytics.'}
        </p>

        {/* Researcher Credit Card */}
        <div
          className={`inline-flex flex-col sm:flex-row items-center gap-4 p-4 px-6 rounded-3xl border shadow-md ${
            isNight
              ? 'bg-[#0B1812]/90 border-[#10B981]/30 text-white'
              : 'bg-white/70 border-white/90 text-[#142A1D]'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#10B981] to-[#38BDF8] flex items-center justify-center text-[#070F0B] font-bold shadow-md">
              <Award className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div className="text-left rtl:text-right">
              <div className="text-xs font-mono text-[#587563] uppercase tracking-wider">
                {isAr ? 'إعداد الباحثة والمطوّرة' : 'Lead Researcher & Developer'}
              </div>
              <div className="text-base font-bold font-sans">
                {isAr ? 'ضحى زياد' : 'Doha Ziad'}
              </div>
            </div>
          </div>

          <div className="hidden sm:block w-px h-8 bg-current opacity-15" />

          <div className="text-left rtl:text-right text-xs font-mono">
            <div className="text-[#587563] uppercase">
              {isAr ? 'سنة التخرج والاعتماد' : 'Capstone Year'}
            </div>
            <div className="font-bold text-[#10B981]">2026 Academic Edition</div>
          </div>
        </div>
      </section>

      {/* 2. THE FOUR SYSTEM PILLARS */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono font-bold tracking-wider uppercase shadow-sm ${
              isNight
                ? 'bg-[#10B981]/10 border-[#10B981]/30 text-[#34D399]'
                : 'bg-white/60 border-white/80 text-[#1F5435]'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>{isAr ? 'الركائز الهندسية الأربعة' : 'Four Core Engineering Pillars'}</span>
          </div>
          <h3
            className={`text-2xl sm:text-3xl font-extrabold ${
              isNight ? 'text-white' : 'text-[#133020]'
            }`}
          >
            {isAr ? 'كيف يحاكي التوأم الرقمي أرض الواقع بدقة؟' : 'How the Digital Twin Mirrors Reality'}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((pil, idx) => {
            const Icon = pil.icon;
            return (
              <div
                key={idx}
                className={`p-6 rounded-3xl border shadow-sm flex flex-col justify-between transition-all hover:scale-[1.02] ${
                  isNight
                    ? 'bg-[#0B1812]/85 border-[#10B981]/20 hover:border-[#10B981]/50'
                    : 'bg-white/60 border-white/85 shadow-[0_8px_24px_rgba(20,40,25,0.05)] hover:bg-white/80'
                }`}
              >
                <div className="space-y-3 text-left rtl:text-right">
                  <div className="w-11 h-11 rounded-2xl bg-[#D6F3E0] text-[#208351] flex items-center justify-center">
                    <Icon className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <h4 className={`text-base font-bold ${isNight ? 'text-white' : 'text-[#133020]'}`}>
                    {isAr ? pil.titleAr : pil.titleEn}
                  </h4>
                  <p className={`text-xs leading-relaxed ${isNight ? 'text-[#94A3B8]' : 'text-[#385141]'}`}>
                    {isAr ? pil.descAr : pil.descEn}
                  </p>
                </div>

                <div
                  className={`pt-4 mt-5 border-t text-left rtl:text-right ${
                    isNight ? 'border-white/10' : 'border-[#3B654C]/15'
                  }`}
                >
                  <div className={`text-[10.5px] font-mono ${isNight ? 'text-[#64748B]' : 'text-[#587563]'}`}>
                    {isAr ? pil.statLabelAr : pil.statLabelEn}
                  </div>
                  <div className={`text-2xl font-black font-mono ${isNight ? 'text-[#34D399]' : 'text-[#166534]'}`}>
                    {pil.stat}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. CASE STUDY FOCUS: QUEEN RANIA & UNIVERSITY OF JORDAN */}
      <section
        className={`rounded-3xl p-8 sm:p-10 border shadow-lg ${
          isNight
            ? 'bg-[#0B1812]/90 border-[#10B981]/30 text-white'
            : 'bg-white/65 border-white/90 text-[#142A1D]'
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4 text-left rtl:text-right">
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono font-bold tracking-wider uppercase ${
                isNight
                  ? 'bg-[#06B6D4]/10 border-[#06B6D4]/30 text-[#38BDF8]'
                  : 'bg-white/70 border-white/90 text-[#196075]'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>{isAr ? 'نطاق التطبيق الميداني للبحث' : 'Primary Urban Field Scope'}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {isAr
                ? 'شريان شارع الملكة رانيا العبدالله والجامعة الأردنية'
                : 'Queen Rania Al-Abdullah Street & UOJ Corridor'}
            </h3>

            <p className={`text-xs sm:text-sm leading-relaxed ${isNight ? 'text-[#94A3B8]' : 'text-[#385141]'}`}>
              {isAr
                ? 'تم اختيار شريان شارع الجامعة الأردنية كنطاق محوري للدراسة لما يشهده من أزمات مرورية خانقة في ساعات الذروة، بالإضافة إلى تشغيل مسار الباص السريع الترددي (BRT) وارتفاع حرارة الإسفلت المكشوف إلى 35.2°C صيفاً. يثبت التوأم الرقمي أن تشجير أطراف الشارع بالصنوبر يخفض حرارة السطح بمعدل 3.8°C، بينما تضمن برمجة الإشارات التكيفية سرعة انسياب الباص السريع بنسبة +34.5%.'
                : 'Selected as the core experimental corridor due to extreme peak congestion, dedicated Bus Rapid Transit (BRT) integration, and intense summer asphalt heat trapping exceeding 35.2°C. The Digital Twin validates that dense vegetative buffers along campus boundaries decrease microclimate heat by 3.8°C while adaptive signal prioritization boosts BRT throughput by 34.5%.'}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div
                className={`p-3 rounded-2xl border text-center ${
                  isNight ? 'bg-white/5 border-white/10' : 'bg-white/70 border-white/90'
                }`}
              >
                <div className="text-xs font-mono text-[#587563]">{isAr ? 'حرارة الإسفلت' : 'Asphalt Hotspot'}</div>
                <div className="text-xl font-black font-mono text-red-500">35.2°C</div>
              </div>

              <div
                className={`p-3 rounded-2xl border text-center ${
                  isNight ? 'bg-white/5 border-white/10' : 'bg-white/70 border-white/90'
                }`}
              >
                <div className="text-xs font-mono text-[#587563]">{isAr ? 'التبريد بالتشجير' : 'Shaded Canopy'}</div>
                <div className="text-xl font-black font-mono text-emerald-500">28.6°C</div>
              </div>

              <div
                className={`p-3 rounded-2xl border text-center col-span-2 sm:col-span-1 ${
                  isNight ? 'bg-white/5 border-white/10' : 'bg-white/70 border-white/90'
                }`}
              >
                <div className="text-xs font-mono text-[#587563]">{isAr ? 'كفاءة الباص السريع' : 'BRT Throughput'}</div>
                <div className="text-xl font-black font-mono text-cyan-500">+34.5%</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm rounded-3xl overflow-hidden border shadow-xl p-2 bg-white/40 backdrop-blur-md">
              <img
                src="/queen-rania-corridor-twin.png"
                alt="Queen Rania Corridor Twin"
                className="w-full h-auto object-cover rounded-2xl"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-[#070F0B]/85 backdrop-blur-md p-2.5 rounded-xl text-center text-xs font-mono text-[#34D399] border border-[#10B981]/40">
                {isAr ? 'شارع الملكة رانيا • مسار BRT والأشجار' : 'Queen Rania St. • BRT Lane & Pine Canopy'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TECHNOLOGICAL SPECIFICATIONS & ARCHITECTURE */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono font-bold tracking-wider uppercase shadow-sm ${
              isNight
                ? 'bg-[#10B981]/10 border-[#10B981]/30 text-[#34D399]'
                : 'bg-white/60 border-white/80 text-[#1F5435]'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>{isAr ? 'البنية التقنية المعتمدة' : 'Technical Architecture Stack'}</span>
          </div>
          <h3
            className={`text-2xl sm:text-3xl font-extrabold ${
              isNight ? 'text-white' : 'text-[#133020]'
            }`}
          >
            {isAr ? 'التقنيات والمكتبات المشغلة للمشروع' : 'Built with World-Class Engineering Tools'}
          </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {techStack.map((tech, idx) => {
            const Icon = tech.icon;
            return (
              <div
                key={idx}
                className={`p-4 rounded-2xl border text-center space-y-2 transition-all hover:scale-105 ${
                  isNight
                    ? 'bg-[#0B1812]/80 border-[#10B981]/20 text-white'
                    : 'bg-white/60 border-white/85 text-[#142A1D]'
                }`}
              >
                <div className="w-9 h-9 mx-auto rounded-xl bg-[#D6F3E0] text-[#208351] flex items-center justify-center">
                  <Icon className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div className="text-xs font-bold font-sans">{tech.name}</div>
                <div className={`text-[10px] font-mono ${isNight ? 'text-[#94A3B8]' : 'text-[#587563]'}`}>
                  {isAr ? tech.categoryAr : tech.categoryEn}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. CALL TO ACTION: EXPLORE SIMULATION */}
      <section
        className={`p-8 sm:p-12 rounded-3xl border text-center space-y-4 shadow-xl backdrop-blur-md ${
          isNight
            ? 'bg-gradient-to-r from-[#0D261B] via-[#0F3022] to-[#0A1F16] border-[#10B981]/30'
            : 'bg-gradient-to-r from-white/70 via-white/85 to-white/70 border-white/90 shadow-[0_16px_40px_rgba(20,40,25,0.08)]'
        }`}
      >
        <h3
          className={`text-3xl sm:text-4xl font-extrabold ${
            isNight ? 'text-white' : 'text-[#133020]'
          }`}
        >
          {isAr ? 'انتقل إلى بيئة المحاكاة الحية' : 'Experience the Co-Simulation Engine'}
        </h3>
        <p
          className={`text-xs sm:text-sm max-w-xl mx-auto leading-relaxed ${
            isNight ? 'text-[#94A3B8]' : 'text-[#385141]'
          }`}
        >
          {isAr
            ? 'استكشف سيناريوهات الإسعاف، التحكم المروري، وتبريد الجزر الحرارية على خريطة عمان الحقيقية.'
            : 'Test emergency green waves, adaptive roundabout signals, and microclimate mitigation on authentic Amman maps.'}
        </p>
        <div className="pt-2">
          <button
            onClick={onExplore}
            className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#44C2D0] to-[#51D3BE] text-[#14261B] text-sm font-extrabold tracking-tight shadow-[0_6px_22px_rgba(68,194,208,0.45)] hover:shadow-[0_8px_30px_rgba(68,194,208,0.65)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <span>{isAr ? 'استكشف التوأم الرقمي' : 'Explore the Digital Twin'}</span>
            <span className="w-6 h-6 rounded-full bg-[#182B20] text-white flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </span>
          </button>
        </div>
      </section>
    </div>
  );
};
