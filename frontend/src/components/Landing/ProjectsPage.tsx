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
  Cpu,
  ShieldCheck
} from 'lucide-react';

interface ProjectsPageProps {
  lang: 'EN' | 'AR';
  theme: 'day' | 'night';
  onExplore: () => void;
  onLaunch: () => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  lang,
  theme,
  onExplore,
  onLaunch
}) => {
  const isAr = lang === 'AR';
  const isNight = theme === 'night';
  const [selectedProjectId, setSelectedProjectId] = useState<number>(0);

  const projects = [
    {
      id: 0,
      titleEn: 'Queen Rania St. BRT Corridor & Thermal Mitigation',
      titleAr: 'شريان شارع الملكة رانيا • الباص السريع وتبريد الإسفلت',
      categoryEn: 'Public Transit & Microclimate',
      categoryAr: 'النقل العام والمناخ الحضري',
      locationEn: 'University of Jordan, Amman',
      locationAr: 'الجامعة الأردنية، عمان',
      date: '2026',
      icon: Bus,
      summaryEn:
        'A comprehensive digital twin of Queen Rania Al-Abdullah Street evaluating the dual impact of dedicated red BRT bus lanes and campus pine tree canopy shading to offset the 35.2°C asphalt heat island.',
      summaryAr:
        'نموذج توأم رقمي متكامل لشريان شارع الملكة رانيا العبدالله لتقييم الأثر المزدوج لتشغيل مسار الباص السريع الترددي (BRT) مع تبريد الجزر الحرارية الإسفلتية (35.2°C) عبر أحزمة أشجار الصنوبر المحاذية لسور الجامعة.',
      metrics: [
        { labelEn: 'Asphalt Heat Mitigation', labelAr: 'خفض حرارة الإسفلت', value: '-3.8°C', highlight: '28.6°C' },
        { labelEn: 'BRT Transit Velocity', labelAr: 'سرعة الباص السريع', value: '+34.5%', highlight: 'Dedicated' },
        { labelEn: 'Student Crossing Conflicts', labelAr: 'تقليص حوادث المشاة', value: '-92%', highlight: 'Safe Flow' }
      ],
      featuresEn: [
        'High-density 18,400 daily vehicle agent simulation using SUMO 1.21',
        'Microscopic heat island solver targeting asphalt surface thermal traps',
        'Dedicated red BRT corridor priority timing at University gates',
        'Pedestrian bridge throughput and crowd movement synchronization'
      ],
      featuresAr: [
        'محاكاة مجهرية لـ 18,400 مركبة يومياً عبر محرك SUMO v1.21',
        'نمذجة فيزيائية للجزر الحرارية لمعالجة فخاخ الحرارة الإسفلتية المكشوفة',
        'برمجة الإشارات التكيفية لإعطاء أولوية المرور لحافلات الباص السريع',
        'تحليل انسياب حركة آلاف الطلاب عبر جسور المشاة الذكية عند بوابات الجامعة'
      ],
      image: '/queen-rania-corridor-twin.png'
    },
    {
      id: 1,
      titleEn: 'Emergency Green Wave Preemption (Ambulance Wave)',
      titleAr: 'الموجة الخضراء الذكية لمركبات الإسعاف والطوارئ',
      categoryEn: 'Emergency Logistics',
      categoryAr: 'إدارة الطوارئ والدفاع المدني',
      locationEn: 'Jordan University Hospital to 8th Circle',
      locationAr: 'من مستشفى الجامعة الأردنية إلى الدوار الثامن',
      date: '2026',
      icon: Siren,
      summaryEn:
        'Autonomous TraCI signal preemption algorithm detecting civil defense ambulances and clearing downstream traffic queues 1,200 meters ahead of vehicle arrival.',
      summaryAr:
        'خوارزمية ذكية مدمجة في مكتبة TraCI لرصد مركبات الإسعاف والدفاع المدني عن بُعد 1,200 متر، وتفريغ طوابير الإشارات الضوئية استباقياً لفتح مسار أخضر متواصل.',
      metrics: [
        { labelEn: 'Ambulance Response Time', labelAr: 'تقليص زمن الاستجابة', value: '-4.2 min', highlight: '-38%' },
        { labelEn: 'Signal Preemption Success', labelAr: 'نجاح فتح الإشارات', value: '100%', highlight: '6 Junctions' },
        { labelEn: 'Secondary Queue Clearance', labelAr: 'تفريغ طوابير المركبات', value: '88 sec', highlight: 'Rapid Recovery' }
      ],
      featuresEn: [
        'Automated TraCI trajectory override over 6 consecutive junctions',
        'Dynamic phase elongation for upstream and downstream corridors',
        'Emergency siren sensor simulation and connected vehicle protocol',
        'Zero secondary collision risk through automated clearance intervals'
      ],
      featuresAr: [
        'تحكم فوري في 6 إشارات ضوئية متعاقبة دون تدخل بشري يدوي',
        'تمديد أزمنة الإشارة الخضراء وتفريغ التقاطعات قبل وصول الإسعاف',
        'محاكاة مستشعرات الإنذار وبروتوكولات المركبات المتصلة V2X',
        'تصفير احتمالية الحوادث الثانوية بفضل فترات الأمان التلقائية'
      ],
      image: '/queen-rania-corridor-twin.png'
    },
    {
      id: 2,
      titleEn: '7th & 8th Circles Congestion Dissolution Engine',
      titleAr: 'خوارزمية تفكيك الاختناقات المرورية (الدوار السابع والثامن)',
      categoryEn: 'Arterial Optimization',
      categoryAr: 'إدارة وتفكيك الاختناقات',
      locationEn: 'Zahran Arterial Corridor, Amman',
      locationAr: 'شارع زهران، الدوار السابع والثامن',
      date: '2026',
      icon: Cpu,
      summaryEn:
        'Reinforcement learning loop assessing queue backlogs in real time and modulating circular phase allocations to prevent gridlock spillback onto Amman expressways.',
      summaryAr:
        'حلقة ذكاء اصطناعي تراقب أطوال طوابير المركبات لحظياً على الدوارين السابع والثامن، وتضبط أزمنة التناوب الضوئي لمنع ارتداد الأزمة نحو طريق المطار وشوارع عمان الحيوية.',
      metrics: [
        { labelEn: 'Peak Roundabout Delay', labelAr: 'تخفيض تأخير الدوار', value: '-32.4%', highlight: 'Peak Hours' },
        { labelEn: 'Spillback Prevention', labelAr: 'منع ارتداد الطوابير', value: '94.2%', highlight: 'Expressway' },
        { labelEn: 'Idling Fuel Consumption', labelAr: 'توفير وقود التوقف', value: '-22.0%', highlight: 'Cost Saving' }
      ],
      featuresEn: [
        'Microscopic vehicle queue tracking on 12 inbound arterial approaches',
        'Real-time phase modulation preventing circle interior deadlock',
        'Carbon and NOx emissions minimization modeling',
        'Dynamic detour routing recommendations for peripheral traffic'
      ],
      featuresAr: [
        'تتبع مجهري لطوابير المركبات على 12 مدخلاً رئيسياً متفرعاً',
        'إعادة ضبط فورية للأزمنة تمنع إغلاق الساحات الداخلية للدوار',
        'خفض انبعاثات أكاسيد النيتروجين والغازات السامة الناتجة عن التوقف',
        'اقتراح مسارات التفافية بديلة ذاتياً للمركبات لتخفيف الضغط'
      ],
      image: '/queen-rania-corridor-twin.png'
    },
    {
      id: 3,
      titleEn: 'Urban Canopy Buffer & Carbon Sequestration Twin',
      titleAr: 'أحزمة التخضير الحضري وامتصاص انبعاثات الكربون',
      categoryEn: 'Ecological Intelligence',
      categoryAr: 'الذكاء البيئي والاستدامة',
      locationEn: 'Greater Amman Urban Basin',
      locationAr: 'حوض عمان الحضري',
      date: '2026',
      icon: Thermometer,
      summaryEn:
        'Geographic satellite mapping coupled with microscopic road emissions data to position strategic pine and evergreen buffer corridors that actively absorb traffic CO2.',
      summaryAr:
        'مطابقة البيانات المناخية والخرائط الحرارية مع انبعاثات المركبات لتحديد المواقع المثالية لزراعة أحزمة الصنوبر والأشجار الدائمة الخضرة لامتصاص الكربون وتلطيف الجو.',
      metrics: [
        { labelEn: 'Carbon Sequestration', labelAr: 'امتصاص الكربون', value: '-18.5%', highlight: 'Annual Sink' },
        { labelEn: 'Thermal Footprint Drop', labelAr: 'تخفيض البصمة الحرارية', value: '-3.8°C', highlight: 'Shaded Belts' },
        { labelEn: 'Vegetative Buffer Area', labelAr: 'المساحة الخضراء الموصى بها', value: '120k m²', highlight: 'Targeted' }
      ],
      featuresEn: [
        'Satellite land surface temperature (LST) overlay on SUMO grid',
        'Microclimate wind canyon and heat dispersion simulation',
        'Native Jordanian drought-resistant species selection (Pinus halepensis)',
        'Urban forestry economic cost-benefit analysis'
      ],
      featuresAr: [
        'ربط خرائط الأقمار الصناعية للحرارة السطحية مع شبكة المحاكاة',
        'محاكاة التيارات الهوائية بين المباني وتشتيت الغازات الحارة',
        'اختيار أصناف الأشجار المحلية المقاومة للجفاف كالصنوبر الحلبي',
        'دراسة الجدوى الاقتصادية والبيئية لعائد الاستثمار في التخضير'
      ],
      image: '/queen-rania-corridor-twin.png'
    }
  ];

  const currentProj = projects[selectedProjectId];

  return (
    <div className="space-y-14 py-8">
      {/* 1. PORTFOLIO HERO */}
      <section className="text-center max-w-4xl mx-auto space-y-4">
        <div
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-mono font-bold tracking-wider uppercase shadow-sm ${
            isNight
              ? 'bg-[#10B981]/10 border-[#10B981]/30 text-[#34D399]'
              : 'bg-white/65 border-white/85 text-[#1F5435]'
          }`}
        >
          <FolderKanban className="w-4 h-4 text-[#10B981]" />
          <span>
            {isAr
              ? 'حزمة مشاريع التوأم الرقمي • إعداد ضحى زياد 2026'
              : 'Digital Twin Projects Portfolio • Doha Ziad 2026'}
          </span>
        </div>

        <h1
          className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight ${
            isNight ? 'text-white' : 'text-[#133020]'
          }`}
        >
          {isAr ? 'مشاريع التوأم الرقمي' : 'Civic Co-Simulation Projects'}
        </h1>
        <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-[#4A72DF] via-[#48C3CB] to-[#5BCF7B] bg-clip-text text-transparent pb-1">
          {isAr ? 'حلول هندسية مبنية على البيانات لمدينة عمان' : 'Data-Driven Engineering Case Studies for Amman'}
        </h2>

        <p
          className={`text-sm sm:text-base leading-relaxed max-w-2xl mx-auto ${
            isNight ? 'text-[#94A3B8]' : 'text-[#2E4738]'
          }`}
        >
          {isAr
            ? 'مجموعة من دراسات الحالة الميدانية والمحاكاة الافتراضية عالية الدقة التي تم تطبيقها على أهم شرايين العاصمة عمان لإثبات كفاءة التوأم الرقمي في حل الأزمات وتبريد المناخ وتوفير الميزانية.'
            : 'Applied microscopic case studies across Amman’s vital transportation arteries, validating how autonomous AI signal loops and microclimate buffers save municipal resources and streamline urban mobility.'}
        </p>
      </section>

      {/* 2. PROJECT SELECTOR TILES */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {projects.map((proj, idx) => {
          const isSelected = selectedProjectId === idx;
          const Icon = proj.icon;
          return (
            <div
              key={idx}
              onClick={() => setSelectedProjectId(idx)}
              className={`p-5 rounded-3xl border shadow-sm cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                isSelected
                  ? isNight
                    ? 'bg-[#0B1812] border-[#10B981] shadow-[0_0_24px_rgba(16,185,129,0.3)] scale-[1.02]'
                    : 'bg-white/90 border-[#44C2D0] shadow-[0_12px_30px_rgba(68,194,208,0.25)] scale-[1.02]'
                  : isNight
                  ? 'bg-[#0B1812]/80 hover:bg-[#0E2018] border-[#10B981]/15'
                  : 'bg-white/50 hover:bg-white/75 border-white/85 shadow-[0_6px_20px_rgba(20,40,25,0.04)]'
              }`}
            >
              <div className="space-y-3 text-left rtl:text-right">
                <div className="flex items-center justify-between">
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-colors ${
                      isSelected
                        ? isNight ? 'bg-[#10B981] text-[#070F0B]' : 'bg-[#44C2D0] text-[#14261B]'
                        : isNight ? 'bg-[#10B981]/15 text-[#10B981]' : 'bg-[#D6F3E0] text-[#227246]'
                    }`}
                  >
                    <Icon className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border bg-white/10 border-current/20">
                    Project 0{idx + 1}
                  </span>
                </div>

                <div className="text-[11px] font-mono text-[#587563]">
                  {isAr ? proj.categoryAr : proj.categoryEn}
                </div>

                <h3 className={`text-sm sm:text-base font-bold line-clamp-2 ${isNight ? 'text-white' : 'text-[#133020]'}`}>
                  {isAr ? proj.titleAr : proj.titleEn}
                </h3>
              </div>

              <div
                className={`pt-3 mt-4 border-t flex items-center justify-between text-xs font-mono ${
                  isNight ? 'border-white/10 text-[#64748B]' : 'border-[#3B654C]/15 text-[#587563]'
                }`}
              >
                <span>{proj.locationEn}</span>
                <span className="font-bold text-[#10B981]">
                  {proj.metrics[0].value}
                </span>
              </div>
            </div>
          );
        })}
      </section>

      {/* 3. SELECTED PROJECT DEEP-DIVE CARD */}
      <section
        className={`p-6 sm:p-10 rounded-3xl border shadow-xl ${
          isNight
            ? 'bg-[#0B1812]/90 border-[#10B981]/30 text-white'
            : 'bg-white/70 border-white/90 text-[#142A1D]'
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Details */}
          <div className="lg:col-span-7 space-y-5 text-left rtl:text-right">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30">
                {isAr ? currentProj.categoryAr : currentProj.categoryEn}
              </span>
              <span className="flex items-center gap-1 text-xs font-mono text-[#587563]">
                <MapPin className="w-3.5 h-3.5" />
                <span>{isAr ? currentProj.locationAr : currentProj.locationEn}</span>
              </span>
              <span className="flex items-center gap-1 text-xs font-mono text-[#587563]">
                <Calendar className="w-3.5 h-3.5" />
                <span>{currentProj.date}</span>
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {isAr ? currentProj.titleAr : currentProj.titleEn}
            </h2>

            <p className={`text-xs sm:text-sm leading-relaxed ${isNight ? 'text-[#94A3B8]' : 'text-[#385141]'}`}>
              {isAr ? currentProj.summaryAr : currentProj.summaryEn}
            </p>

            {/* Metrics Trio */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {currentProj.metrics.map((m, mIdx) => (
                <div
                  key={mIdx}
                  className={`p-3.5 rounded-2xl border text-center ${
                    isNight ? 'bg-white/5 border-white/10' : 'bg-white/70 border-white/90'
                  }`}
                >
                  <div className="text-[10.5px] font-mono text-[#587563] truncate">
                    {isAr ? m.labelAr : m.labelEn}
                  </div>
                  <div className="text-xl sm:text-2xl font-black font-mono text-[#10B981] mt-0.5">
                    {m.value}
                  </div>
                  <div className="text-[10px] font-mono text-[#587563] mt-0.5 opacity-70">
                    {m.highlight}
                  </div>
                </div>
              ))}
            </div>

            {/* Checklist */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#10B981]">
                {isAr ? 'الميزات والنتائج المحققة:' : 'Key Engineering Deliverables:'}
              </div>
              {(isAr ? currentProj.featuresAr : currentProj.featuresEn).map((feat, fIdx) => (
                <div key={fIdx} className="flex items-start gap-2.5 text-xs font-mono">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                  <span className={isNight ? 'text-[#CBD5E1]' : 'text-[#2A4735]'}>{feat}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onExplore}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#44C2D0] to-[#51D3BE] text-[#14261B] text-xs font-extrabold tracking-tight shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <span>{isAr ? 'اختبار هذا السيناريو' : 'Run This Case Study'}</span>
                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </button>
            </div>
          </div>

          {/* Right Image Display */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md rounded-3xl overflow-hidden border shadow-xl p-2 bg-white/40 backdrop-blur-md">
              <img
                src={currentProj.image}
                alt={currentProj.titleEn}
                className="w-full h-auto object-cover rounded-2xl"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-[#070F0B]/85 backdrop-blur-md p-2.5 rounded-xl text-center text-xs font-mono text-[#34D399] border border-[#10B981]/40">
                {isAr ? 'محاكاة مجهرية ثلاثية الأبعاد • SUMO v1.21' : '3D Microscopic Visualizer • SUMO v1.21'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. COMPARISON MATRIX (PHYSICAL TRIALS VS DIGITAL TWIN) */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono font-bold tracking-wider uppercase shadow-sm ${
              isNight ? 'bg-[#10B981]/15 text-[#34D399] border-[#10B981]/30' : 'bg-white/60 text-[#1F5435] border-white/80'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
            <span>{isAr ? 'مقارنة الجدوى والعائد' : 'Value & Feasibility Comparison'}</span>
          </div>
          <h3 className={`text-2xl sm:text-3xl font-extrabold ${isNight ? 'text-white' : 'text-[#133020]'}`}>
            {isAr ? 'التجربة الميدانية التقليدية مقابل التوأم الرقمي' : 'Conventional Trials vs. Digital Twin Simulation'}
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table
            className={`w-full rounded-3xl border overflow-hidden text-xs font-mono shadow-md ${
              isNight
                ? 'bg-[#0B1812]/90 border-[#10B981]/25 text-white'
                : 'bg-white/70 border-white/90 text-[#142A1D]'
            }`}
          >
            <thead>
              <tr className={`border-b ${isNight ? 'border-white/10 bg-white/5' : 'border-[#3B654C]/15 bg-white/60'}`}>
                <th className="p-4 text-left rtl:text-right font-bold uppercase">{isAr ? 'المعيار الهندسي' : 'Benchmark Factor'}</th>
                <th className="p-4 text-left rtl:text-right font-bold text-red-500">{isAr ? 'التجربة الميدانية (على الشارع)' : 'Real-World Road Trial'}</th>
                <th className="p-4 text-left rtl:text-right font-bold text-[#10B981]">{isAr ? 'محاكاة التوأم الرقمي (SUMO)' : 'Digital Twin Simulation'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-current/10">
              <tr>
                <td className="p-4 font-bold">{isAr ? 'التكلفة المالية والميزانية' : 'Capital Cost & Risk'}</td>
                <td className="p-4 text-red-500 font-semibold">{isAr ? 'ملايين الدنانير (إسفلت، إغلاقات، تعديلات)' : 'Millions of Dinars (Pavement, Detours)'}</td>
                <td className="p-4 text-[#10B981] font-bold">{isAr ? 'صفر تكلفة إضافية (محاكاة برمجية 100%)' : 'Zero Additional Cost (100% In-Silicon)'}</td>
              </tr>
              <tr>
                <td className="p-4 font-bold">{isAr ? 'المدة الزمنية للاختبار' : 'Validation Timeline'}</td>
                <td className="p-4 text-red-500 font-semibold">{isAr ? '6 إلى 18 شهراً من الإرباك المروري' : '6 to 18 Months of Public Gridlock'}</td>
                <td className="p-4 text-[#10B981] font-bold">{isAr ? 'دقائق معدودة عبر تسريع المحاكاة' : 'Minutes via 64x Accelerated Solver'}</td>
              </tr>
              <tr>
                <td className="p-4 font-bold">{isAr ? 'السلامة المرورية العامة' : 'Public Safety & Risk'}</td>
                <td className="p-4 text-red-500 font-semibold">{isAr ? 'احتمالية وقوع حوادث أثناء التجارب' : 'Live Collision & Congestion Exposure'}</td>
                <td className="p-4 text-[#10B981] font-bold">{isAr ? 'أمان مطلق وبيئة تجريبية معزولة' : 'Zero Risk Virtual Sandbox'}</td>
              </tr>
              <tr>
                <td className="p-4 font-bold">{isAr ? 'قياس الحرارة والانبعاثات' : 'Microclimate & Emissions'}</td>
                <td className="p-4 text-red-500 font-semibold">{isAr ? 'صعوبة الرصد الشامل لكل متر مربع' : 'Sparse Physical Weather Stations'}</td>
                <td className="p-4 text-[#10B981] font-bold">{isAr ? 'خرائط حرارية وانبعاثات لحظية كاملة' : 'Continuous Spatial Heatmap & CO2 Grids'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. CALL TO ACTION */}
      <section
        className={`p-8 sm:p-12 rounded-3xl border text-center space-y-4 shadow-xl backdrop-blur-md ${
          isNight
            ? 'bg-gradient-to-r from-[#0D261B] via-[#0F3022] to-[#0A1F16] border-[#10B981]/30'
            : 'bg-gradient-to-r from-white/70 via-white/85 to-white/70 border-white/90 shadow-[0_16px_40px_rgba(20,40,25,0.08)]'
        }`}
      >
        <h3 className={`text-3xl sm:text-4xl font-extrabold ${isNight ? 'text-white' : 'text-[#133020]'}`}>
          {isAr ? 'هل ترغب في اختبار بيانات مشروعك الخاص؟' : 'Ready to Run Your Custom Urban Data?'}
        </h3>
        <p className={`text-xs sm:text-sm max-w-xl mx-auto leading-relaxed ${isNight ? 'text-[#94A3B8]' : 'text-[#385141]'}`}>
          {isAr
            ? 'منصة التوأم الرقمي تتيح استيراد ملفات شبكات الطرق OSM، تدفقات المرور، وبيانات الحساسات البيئية لمحاكاة أي شارع أو تقاطع في المملكة.'
            : 'Import your OSM network files, vehicle demand matrices, and sensor feeds to simulate any arterial intersection in Jordan.'}
        </p>
        <div className="pt-2">
          <button
            onClick={onLaunch}
            className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#44C2D0] to-[#51D3BE] text-[#14261B] text-sm font-extrabold tracking-tight shadow-[0_6px_22px_rgba(68,194,208,0.45)] hover:shadow-[0_8px_30px_rgba(68,194,208,0.65)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <span>{isAr ? 'دخول لوحة التحكم والمحاكاة' : 'Launch Simulation Workspace'}</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5] group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
          </button>
        </div>
      </section>
    </div>
  );
};
