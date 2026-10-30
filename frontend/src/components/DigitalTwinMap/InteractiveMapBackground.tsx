import React, { useEffect, useRef } from 'react';

// Drifting botanical leaves overlay for atmospheric living motion
const BACKGROUND_LEAVES = [
  { id: 1, left: '8%', delay: '0s', duration: '15s', size: 22 },
  { id: 2, left: '22%', delay: '2.5s', duration: '18s', size: 18 },
  { id: 3, left: '38%', delay: '5.2s', duration: '20s', size: 24 },
  { id: 4, left: '55%', delay: '1.2s', duration: '16s', size: 20 },
  { id: 5, left: '72%', delay: '4.0s', duration: '19s', size: 25 },
  { id: 6, left: '86%', delay: '6.5s', duration: '22s', size: 19 },
  { id: 7, left: '94%', delay: '3.0s', duration: '17s', size: 21 },
];

export const InteractiveMapBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animFrameId: number;
    let trafficRunning = true;
    const speedMultiplier = 1;
    const svgNS = 'http://www.w3.org/2000/svg';

    // 1. Traffic Signals State Machine (4 phases)
    let signalPhase = 0;
    let signalTimer = 0;
    const PHASE_DURATIONS = [840, 150, 840, 150]; // frames at ~60fps

    function updateTrafficSignals() {
      signalTimer += speedMultiplier;
      if (signalTimer >= PHASE_DURATIONS[signalPhase]) {
        signalTimer = 0;
        signalPhase = (signalPhase + 1) % 4;
      }

      const sSouth = document.getElementById('mapSignalSouth');
      const sNorth = document.getElementById('mapSignalNorth');
      const sEast = document.getElementById('mapSignalEast');
      const sWest = document.getElementById('mapSignalWest');
      if (!sSouth || !sNorth || !sEast || !sWest) return;

      if (signalPhase === 0) {
        sSouth.setAttribute('fill', '#5FE39B');
        sNorth.setAttribute('fill', '#5FE39B');
        sEast.setAttribute('fill', '#FF5C5C');
        sWest.setAttribute('fill', '#FF5C5C');
      } else if (signalPhase === 1) {
        sSouth.setAttribute('fill', '#F7C948');
        sNorth.setAttribute('fill', '#F7C948');
        sEast.setAttribute('fill', '#FF5C5C');
        sWest.setAttribute('fill', '#FF5C5C');
      } else if (signalPhase === 2) {
        sSouth.setAttribute('fill', '#FF5C5C');
        sNorth.setAttribute('fill', '#FF5C5C');
        sEast.setAttribute('fill', '#5FE39B');
        sWest.setAttribute('fill', '#5FE39B');
      } else if (signalPhase === 3) {
        sSouth.setAttribute('fill', '#FF5C5C');
        sNorth.setAttribute('fill', '#FF5C5C');
        sEast.setAttribute('fill', '#F7C948');
        sWest.setAttribute('fill', '#F7C948');
      }
    }

    // 2. Intelligent Car-Following Traffic System
    const lanes = [
      {
        id: 'vert-south',
        axis: 'y',
        dir: 1,
        fixedCoord: 666,
        min: -380,
        max: 1300,
        stopLine: 556,
        angle: 90,
        vehicles: [
          { type: 'vehicle-bus', length: 44, cruiseSpeed: 0.65, currentSpeed: 0.65, pos: -180, scale: 0.95, el: null as SVGElement | null },
          { type: 'vehicle-sedan-dark', length: 24, cruiseSpeed: 0.88, currentSpeed: 0.88, pos: 190, scale: 0.92, el: null as SVGElement | null },
          { type: 'vehicle-car-olive', length: 20, cruiseSpeed: 0.82, currentSpeed: 0.82, pos: 580, scale: 0.90, el: null as SVGElement | null },
          { type: 'vehicle-sedan-dark', length: 24, cruiseSpeed: 0.86, currentSpeed: 0.86, pos: 970, scale: 0.92, el: null as SVGElement | null },
        ],
      },
      {
        id: 'vert-north',
        axis: 'y',
        dir: -1,
        fixedCoord: 684,
        min: -380,
        max: 1300,
        stopLine: 624,
        angle: -90,
        vehicles: [
          { type: 'vehicle-bus', length: 44, cruiseSpeed: 0.65, currentSpeed: 0.65, pos: 1120, scale: 0.95, el: null as SVGElement | null },
          { type: 'vehicle-car-olive', length: 20, cruiseSpeed: 0.82, currentSpeed: 0.82, pos: 740, scale: 0.90, el: null as SVGElement | null },
          { type: 'vehicle-sedan-dark', length: 24, cruiseSpeed: 0.88, currentSpeed: 0.88, pos: 340, scale: 0.92, el: null as SVGElement | null },
          { type: 'vehicle-car-olive', length: 20, cruiseSpeed: 0.80, currentSpeed: 0.80, pos: -60, scale: 0.90, el: null as SVGElement | null },
        ],
      },
      {
        id: 'horiz-east',
        axis: 'x',
        dir: 1,
        fixedCoord: 596.5,
        min: -300,
        max: 1600,
        stopLine: 640,
        angle: 0,
        vehicles: [
          { type: 'vehicle-bus', length: 44, cruiseSpeed: 0.64, currentSpeed: 0.64, pos: -120, scale: 0.94, el: null as SVGElement | null },
          { type: 'vehicle-sedan-dark', length: 24, cruiseSpeed: 0.88, currentSpeed: 0.88, pos: 320, scale: 0.90, el: null as SVGElement | null },
          { type: 'vehicle-car-olive', length: 20, cruiseSpeed: 0.82, currentSpeed: 0.82, pos: 790, scale: 0.90, el: null as SVGElement | null },
          { type: 'vehicle-sedan-dark', length: 24, cruiseSpeed: 0.86, currentSpeed: 0.86, pos: 1220, scale: 0.92, el: null as SVGElement | null },
        ],
      },
      {
        id: 'horiz-west',
        axis: 'x',
        dir: -1,
        fixedCoord: 583.5,
        min: -300,
        max: 1600,
        stopLine: 710,
        angle: 180,
        vehicles: [
          { type: 'vehicle-bus', length: 44, cruiseSpeed: 0.66, currentSpeed: 0.66, pos: 1450, scale: 0.94, el: null as SVGElement | null },
          { type: 'vehicle-car-olive', length: 20, cruiseSpeed: 0.80, currentSpeed: 0.80, pos: 980, scale: 0.90, el: null as SVGElement | null },
          { type: 'vehicle-sedan-dark', length: 24, cruiseSpeed: 0.86, currentSpeed: 0.86, pos: 510, scale: 0.92, el: null as SVGElement | null },
          { type: 'vehicle-car-olive', length: 20, cruiseSpeed: 0.82, currentSpeed: 0.82, pos: 80, scale: 0.90, el: null as SVGElement | null },
        ],
      },
    ];

    const trafficContainer = document.getElementById('mapRoadTrafficContainer');
    if (trafficContainer) {
      trafficContainer.innerHTML = '';
      lanes.forEach((lane) => {
        lane.vehicles.forEach((veh) => {
          const g = document.createElementNS(svgNS, 'g');
          const use = document.createElementNS(svgNS, 'use');
          use.setAttribute('href', `#${veh.type}`);
          g.appendChild(use);
          trafficContainer.appendChild(g);
          veh.el = g;
        });
      });
    }

    // 3. Dynamic Pedestrian System
    const pedestrianWalkers = [
      { axis: 'x', dir: 1, fixedY: 260, minX: 840, maxX: 1090, pos: 850, speed: 0.35, el: null as SVGElement | null },
      { axis: 'x', dir: -1, fixedY: 380, minX: 840, maxX: 1090, pos: 1080, speed: 0.32, el: null as SVGElement | null },
      { axis: 'y', dir: 1, fixedX: 920, minY: 200, maxY: 430, pos: 210, speed: 0.30, el: null as SVGElement | null },
      { axis: 'x', dir: 1, fixedY: 320, minX: 1140, maxX: 1260, pos: 1145, speed: 0.33, el: null as SVGElement | null },
    ];

    const pedContainer = document.getElementById('mapPedestriansWalkersContainer');
    if (pedContainer) {
      pedContainer.innerHTML = '';
      pedestrianWalkers.forEach((p) => {
        const use = document.createElementNS(svgNS, 'use');
        use.setAttribute('href', '#pedestrian-grid');
        pedContainer.appendChild(use);
        p.el = use;
      });
    }

    function animateTraffic() {
      if (!trafficRunning) return;
      updateTrafficSignals();

      lanes.forEach((lane) => {
        const numVeh = lane.vehicles.length;
        for (let i = 0; i < numVeh; i++) {
          const v = lane.vehicles[i];
          const nextIdx = (i + 1) % numVeh;
          const lead = lane.vehicles[nextIdx];

          let distToLead: number;
          if (lane.dir === 1) {
            distToLead = lead.pos > v.pos ? lead.pos - v.pos : lane.max - v.pos + (lead.pos - lane.min);
          } else {
            distToLead = lead.pos < v.pos ? v.pos - lead.pos : v.pos - lane.min + (lane.max - lead.pos);
          }

          let mustStopAtSignal = false;
          let distToStopLine = Infinity;

          if (lane.axis === 'y') {
            const isRedOrYellow = signalPhase === 2 || signalPhase === 3 || signalPhase === 1;
            if (isRedOrYellow) {
              if (lane.dir === 1 && v.pos < lane.stopLine && lane.stopLine - v.pos < 170) {
                mustStopAtSignal = true;
                distToStopLine = lane.stopLine - v.pos;
              } else if (lane.dir === -1 && v.pos > lane.stopLine && v.pos - lane.stopLine < 170) {
                mustStopAtSignal = true;
                distToStopLine = v.pos - lane.stopLine;
              }
            }
          } else {
            const isRedOrYellow = signalPhase === 0 || signalPhase === 1 || signalPhase === 3;
            if (isRedOrYellow) {
              if (lane.dir === 1 && v.pos < lane.stopLine && lane.stopLine - v.pos < 170) {
                mustStopAtSignal = true;
                distToStopLine = lane.stopLine - v.pos;
              } else if (lane.dir === -1 && v.pos > lane.stopLine && v.pos - lane.stopLine < 170) {
                mustStopAtSignal = true;
                distToStopLine = v.pos - lane.stopLine;
              }
            }
          }

          let targetSpeed = v.cruiseSpeed;
          if (distToLead < 55) {
            targetSpeed = 0;
          } else if (distToLead < 100) {
            targetSpeed = Math.min(targetSpeed, lead.currentSpeed * 0.85);
          }

          if (mustStopAtSignal) {
            if (distToStopLine < 14) {
              targetSpeed = 0;
            } else if (distToStopLine < 70) {
              targetSpeed = Math.min(targetSpeed, 0.28);
            }
          }

          if (v.currentSpeed < targetSpeed) {
            v.currentSpeed += 0.022 * speedMultiplier;
          } else if (v.currentSpeed > targetSpeed) {
            v.currentSpeed -= 0.045 * speedMultiplier;
          }
          v.currentSpeed = Math.max(0, Math.min(v.currentSpeed, v.cruiseSpeed));

          v.pos += v.currentSpeed * lane.dir * speedMultiplier;

          if (lane.dir === 1 && v.pos > lane.max) v.pos = lane.min;
          if (lane.dir === -1 && v.pos < lane.min) v.pos = lane.max;

          if (v.el) {
            const posX = lane.axis === 'x' ? v.pos : lane.fixedCoord;
            const posY = lane.axis === 'y' ? v.pos : lane.fixedCoord;
            v.el.setAttribute('transform', `translate(${posX}, ${posY}) rotate(${lane.angle}) scale(${v.scale})`);
          }
        }
      });

      pedestrianWalkers.forEach((p) => {
        p.pos += p.speed * p.dir * speedMultiplier;
        if (p.axis === 'x' && p.maxX !== undefined && p.minX !== undefined) {
          if (p.pos > p.maxX) p.dir = -1;
          if (p.pos < p.minX) p.dir = 1;
          if (p.el) p.el.setAttribute('transform', `translate(${p.pos}, ${p.fixedY})`);
        } else if (p.axis === 'y' && p.maxY !== undefined && p.minY !== undefined) {
          if (p.pos > p.maxY) p.dir = -1;
          if (p.pos < p.minY) p.dir = 1;
          if (p.el) p.el.setAttribute('transform', `translate(${p.fixedX}, ${p.pos})`);
        }
      });

      animFrameId = requestAnimationFrame(animateTraffic);
    }

    animateTraffic();

    return () => {
      trafficRunning = false;
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#EDF6E8]">
      {/* Gentle Falling Leaves Overlay for Atmospheric Living Motion */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {BACKGROUND_LEAVES.map((leaf) => (
          <div
            key={leaf.id}
            className="absolute -top-10 opacity-30 text-[#3C8D66]"
            style={{
              left: leaf.left,
              animation: `driftFall ${leaf.duration} linear infinite`,
              animationDelay: leaf.delay
            }}
          >
            <svg width={leaf.size} height={leaf.size} viewBox="0 0 24 24" fill="currentColor">
              <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
            </svg>
          </div>
        ))}
      </div>

      <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
        <defs>
          <filter id="softShadow" x="-20%" y="-20%" width="150%" height="150%">
            <feDropShadow dx="2" dy="4" stdDeviation="2.5" floodColor="#384B34" floodOpacity="0.22" />
          </filter>
          <filter id="blockBevel" x="-5%" y="-5%" width="110%" height="110%">
            <feDropShadow dx="1.5" dy="2.5" stdDeviation="1" floodColor="#5E7758" floodOpacity="0.18" />
          </filter>

          {/* Upright Isometric Round Tree */}
          <g id="tree-round-grid">
            <g transform="rotate(36)">
              <ellipse cx="3" cy="11" rx="7.5" ry="3.8" fill="#6E8667" opacity="0.38" />
              <rect x="-1.1" y="3.5" width="2.2" height="7.5" fill="#5B5349" />
              <circle cx="0" cy="0" r="9" fill="#6E8667" />
              <circle cx="-2.5" cy="-2.5" r="6.4" fill="#89A381" />
              <circle cx="-4" cy="-4" r="3.2" fill="#A3BC9B" opacity="0.7" />
            </g>
          </g>

          {/* Upright Small Bush */}
          <g id="tree-small-grid">
            <g transform="rotate(36)">
              <ellipse cx="2" cy="7" rx="5.2" ry="2.5" fill="#6E8667" opacity="0.32" />
              <rect x="-0.8" y="2" width="1.6" height="5" fill="#5B5349" />
              <circle cx="0" cy="0" r="5.8" fill="#5E7458" />
              <circle cx="-1.6" cy="-1.6" r="4" fill="#7E9676" />
            </g>
          </g>

          {/* Upright Conical Cypress Tree */}
          <g id="tree-cone-grid">
            <g transform="rotate(36)">
              <ellipse cx="3" cy="12" rx="6" ry="3" fill="#6E8667" opacity="0.35" />
              <rect x="-1" y="5" width="2" height="7" fill="#554D44" />
              <path d="M 0 -13.5 C 5 -4, 7.2 4, 6 7 C 2 8.5, -2 8.5, -6 7 C -7.2 4, -5 -4, 0 -13.5 Z" fill="#5E7458" />
              <path d="M 0 -13.5 C 2 -4, 3 4, 2 7 C 0 8, -2 7, -5 6 C -6 3, -3 -4, 0 -13.5 Z" fill="#7E9676" />
            </g>
          </g>

          {/* Upright Pedestrian Figure */}
          <g id="pedestrian-grid">
            <g transform="rotate(36) scale(1.12)">
              <ellipse cx="3.5" cy="5.5" rx="3.5" ry="1.2" transform="rotate(25 3.5 5.5)" fill="#5E7259" opacity="0.35" />
              <line x1="-0.8" y1="1.5" x2="-2" y2="5.5" stroke="#2D382B" strokeWidth="1.3" strokeLinecap="round" />
              <line x1="0.8" y1="1.5" x2="2" y2="5.5" stroke="#2D382B" strokeWidth="1.3" strokeLinecap="round" />
              <path d="M -1.8 -2.2 L 1.8 -2.2 L 1.4 2 L -1.4 2 Z" fill="#2D382B" />
              <circle cx="0" cy="-4.2" r="1.7" fill="#2D382B" />
            </g>
          </g>

          {/* Vehicles */}
          <g id="vehicle-bus">
            <rect x="-21" y="-5.5" width="42" height="12" rx="3" fill="#1E281C" opacity="0.28" transform="translate(1.5, 2.5)" />
            <rect x="-21" y="-6" width="42" height="12" rx="3" fill="#283526" />
            <path d="M 15 -5 L 20 -4 L 20 4 L 15 5 Z" fill="#CFE2CA" />
            <rect x="-18" y="-4.5" width="32" height="9" rx="1.5" fill="#A9BCA4" />
            <rect x="-11" y="-3" width="6.5" height="6" rx="1" fill="#889B83" />
            <rect x="1" y="-3" width="6.5" height="6" rx="1" fill="#889B83" />
            <line x1="-15" y1="5.2" x2="13" y2="5.2" stroke="#D2E4CE" strokeWidth="1.4" strokeDasharray="3.5 1.8" />
            <line x1="-15" y1="-5.2" x2="13" y2="-5.2" stroke="#D2E4CE" strokeWidth="1.4" strokeDasharray="3.5 1.8" />
            <circle cx="20.5" cy="-3.5" r="1.1" fill="#F4FBE8" />
            <circle cx="20.5" cy="3.5" r="1.1" fill="#F4FBE8" />
          </g>

          <g id="vehicle-sedan-dark">
            <rect x="-11" y="-4.5" width="22" height="9.5" rx="3.5" fill="#1E281C" opacity="0.24" transform="translate(1.2, 2)" />
            <rect x="-11" y="-4.8" width="22" height="9.6" rx="3.5" fill="#2F3E2D" />
            <path d="M 2.5 -3.6 L 6.5 -2.8 L 6.5 2.8 L 2.5 3.6 Z" fill="#C5D9C0" />
            <path d="M -7.5 -2.8 L -4.5 -3.4 L -4.5 3.4 L -7.5 2.8 Z" fill="#8FA38A" />
            <rect x="-4.5" y="-3.6" width="7" height="7.2" rx="1.2" fill="#9EB299" />
            <circle cx="10.6" cy="-3" r="0.9" fill="#F7FDE8" />
            <circle cx="10.6" cy="3" r="0.9" fill="#F7FDE8" />
          </g>

          <g id="vehicle-car-olive">
            <rect x="-9.5" y="-4.2" width="19" height="8.8" rx="3.2" fill="#1E281C" opacity="0.22" transform="translate(1.2, 2)" />
            <rect x="-9.5" y="-4.5" width="19" height="9" rx="3.2" fill="#465943" />
            <path d="M 2 -3.4 L 5.5 -2.6 L 5.5 2.6 L 2 3.4 Z" fill="#D0E3CB" />
            <rect x="-6" y="-3.4" width="8" height="6.8" rx="1.4" fill="#B5C8B0" />
            <circle cx="9.2" cy="-2.8" r="0.9" fill="#F7FDE8" />
            <circle cx="9.2" cy="2.8" r="0.9" fill="#F7FDE8" />
          </g>
        </defs>

        <rect width="1600" height="1000" fill="#EDF6E8" />

        {/* Rotated Urban Grid (-36 deg) with Full Extruded Buildings and Parks */}
        <g id="urbanGridSpace" transform="translate(980, 480) rotate(-36) translate(-800, -500)">
          {/* Secondary streets */}
          <g stroke="#DCE8D6" strokeWidth="2" fill="none">
            <rect x="-500" y="-500" width="2600" height="2000" fill="#F3F9EF" />
            <path d="M 100 -400 L 100 1400 M 240 -400 L 240 1400 M 380 -400 L 380 1400 M 520 -400 L 520 1400 M 820 -400 L 820 1400 M 960 -400 L 960 1400 M 1115 -400 L 1115 1400 M 1280 -400 L 1280 1400 M 1420 -400 L 1420 1400" />
            <path d="M -300 60 L 1800 60 M -300 180 L 1800 180 M -300 320 L 1800 320 M -300 450 L 1800 450 M -300 730 L 1800 730 M -300 870 L 1800 870" />
          </g>

          {/* Urban City Blocks, Residential Quarters & 3D Extruded Buildings */}
          <g filter="url(#blockBevel)">
            {/* Upper Left Quadrant Blocks */}
            <rect x="115" y="-120" width="110" height="165" rx="4" fill="#DFEDD9" />
            <rect x="115" y="75" width="110" height="90" rx="4" fill="#D5E7CE" />
            <rect x="255" y="-80" width="110" height="125" rx="4" fill="#D5E7CE" />
            <rect x="255" y="75" width="110" height="90" rx="4" fill="#E3F0DE" />
            <rect x="395" y="-80" width="110" height="125" rx="6" fill="#C9E1C0" />
            <rect x="395" y="75" width="110" height="90" rx="5" fill="#C5DFB8" />

            {/* Mid Left Blocks */}
            <rect x="115" y="195" width="110" height="105" rx="5" fill="#CEE5C5" />
            <rect x="255" y="195" width="110" height="105" rx="5" fill="#E1EFE0" />
            <rect x="395" y="195" width="110" height="105" rx="5" fill="#C7E0BC" />
            <rect x="535" y="75" width="112" height="90" rx="6" fill="#DCECD5" />
            <rect x="535" y="195" width="112" height="105" rx="6" fill="#C4DFB8" />
            <rect x="550" y="210" width="82" height="75" rx="3" fill="#B5D4A7" />

            {/* High-detail 3D Extruded Building Massing with Rooftops */}
            <g transform="translate(525, -145)">
              <rect x="0" y="0" width="122" height="190" rx="4" fill="#9FB09A" />
              <rect x="12" y="12" width="98" height="166" rx="2" fill="#D8E5D3" />
              <rect x="22" y="24" width="78" height="65" fill="#BACBB4" />
              <rect x="22" y="102" width="78" height="62" fill="#C7D7C2" />
            </g>
            <g transform="translate(703, -180)">
              <rect x="0" y="0" width="102" height="140" rx="4" fill="#92A38D" />
              <rect x="10" y="10" width="82" height="120" rx="2" fill="#DCE9D7" />
            </g>

            {/* Central & Right Sector Blocks */}
            <rect x="703" y="-10" width="102" height="55" rx="5" fill="#D5E7CE" />
            <rect x="703" y="75" width="102" height="90" rx="6" fill="#CBE2C2" />
            <rect x="835" y="-120" width="110" height="165" rx="6" fill="#D3E7CA" />
            <rect x="835" y="75" width="110" height="90" rx="6" fill="#C5DFB8" />
            <rect x="975" y="-60" width="125" height="105" rx="6" fill="#CBE2C2" />
            <rect x="975" y="75" width="125" height="90" rx="6" fill="#D6E8CE" />
            <rect x="1130" y="75" width="135" height="90" rx="6" fill="#C4DFB8" />

            {/* Large Central Botanical Park */}
            <rect x="835" y="195" width="265" height="240" rx="10" fill="#C2DEB6" />
            <path d="M 835 260 Q 960 310 1100 240" stroke="#EEF7EA" strokeWidth="5.5" fill="none" />
            <path d="M 890 195 Q 950 320 920 435" stroke="#EEF7EA" strokeWidth="5" fill="none" />
            <path d="M 835 380 Q 980 340 1100 395" stroke="#EEF7EA" strokeWidth="5" fill="none" />

            {/* East Botanical Annex Park */}
            <rect x="1130" y="195" width="135" height="240" rx="8" fill="#C9E2BE" />
            <rect x="1148" y="215" width="100" height="95" rx="5" fill="#B8D7AB" />

            {/* Block Left of Central Park */}
            <rect x="703" y="195" width="102" height="110" rx="6" fill="#D9EAD2" />
            <rect x="703" y="335" width="102" height="100" rx="6" fill="#C8E1BD" />

            {/* Blocks Between Y=320 and Y=450 */}
            <rect x="255" y="335" width="110" height="100" rx="4" fill="#DCECD5" />
            <rect x="395" y="335" width="110" height="100" rx="4" fill="#C9E1C0" />
            <rect x="535" y="335" width="112" height="100" rx="4" fill="#D1E6C8" />

            {/* Blocks Between Y=450 and Main Arterial Y=590 */}
            <rect x="255" y="465" width="110" height="102" rx="5" fill="#CBE2C2" />
            <rect x="395" y="465" width="110" height="102" rx="5" fill="#D5E8CD" />
            <rect x="535" y="465" width="112" height="102" rx="5" fill="#C6DFB9" />
            <rect x="703" y="465" width="102" height="102" rx="5" fill="#C7E0BC" />
            <rect x="835" y="465" width="110" height="102" rx="5" fill="#DFEDD9" />
            <rect x="975" y="465" width="125" height="102" rx="5" fill="#D1E6C8" />
            <rect x="995" y="482" width="60" height="50" rx="3" fill="#B5D3A8" />
            <rect x="1130" y="465" width="135" height="102" rx="6" fill="#C4DFB8" />
            <rect x="1295" y="465" width="115" height="102" rx="6" fill="#D1E6C8" />

            {/* Blocks South of Main Arterial Y=590 */}
            <rect x="255" y="613" width="110" height="102" rx="5" fill="#D4E8CC" />
            <rect x="395" y="613" width="110" height="102" rx="5" fill="#E2F0DC" />
            <rect x="535" y="613" width="112" height="102" rx="5" fill="#C8E1BD" />
            <rect x="552" y="628" width="78" height="68" rx="3" fill="#B4D2A7" />
            <rect x="703" y="613" width="102" height="102" rx="5" fill="#DCECD5" />
            <rect x="835" y="613" width="110" height="102" rx="5" fill="#C5DFB8" />
            <rect x="975" y="613" width="125" height="102" rx="5" fill="#E2F0DC" />
            <rect x="1130" y="613" width="135" height="102" rx="6" fill="#C4DFB8" />
            <rect x="1295" y="613" width="115" height="102" rx="6" fill="#CBE2C2" />

            {/* Lower Southern Blocks (Below Y=730) */}
            <rect x="255" y="748" width="250" height="108" rx="8" fill="#C2DEB6" />
            <rect x="535" y="748" width="112" height="108" rx="5" fill="#DCECD5" />
            <rect x="703" y="748" width="102" height="108" rx="5" fill="#D1E6C8" />
            <rect x="835" y="748" width="110" height="108" rx="6" fill="#CBE3C0" />
            <rect x="975" y="748" width="125" height="108" rx="6" fill="#C2DEB6" />
            <rect x="1130" y="748" width="135" height="108" rx="6" fill="#D5E8CD" />
            <rect x="703" y="885" width="242" height="120" rx="6" fill="#C6DFB9" />
            <rect x="975" y="885" width="290" height="120" rx="6" fill="#CDE4C3" />
          </g>

          {/* Secondary streets */}
          <g stroke="#F7FBF4" strokeWidth="14" fill="none">
            <line x1="240" y1="-350" x2="240" y2="1200" />
            <line x1="380" y1="-350" x2="380" y2="1200" />
            <line x1="520" y1="-350" x2="520" y2="1200" />
            <line x1="820" y1="-350" x2="820" y2="1200" />
            <line x1="960" y1="-350" x2="960" y2="1200" />
            <line x1="1115" y1="-350" x2="1115" y2="1200" />
            <line x1="1280" y1="-350" x2="1280" y2="1200" />
            <line x1="-100" y1="60" x2="1550" y2="60" />
            <line x1="-100" y1="180" x2="1550" y2="180" />
            <line x1="-100" y1="320" x2="820" y2="320" />
            <line x1="-100" y1="450" x2="1550" y2="450" />
            <line x1="-100" y1="730" x2="1550" y2="730" />
            <line x1="-100" y1="870" x2="1550" y2="870" />
          </g>

          {/* TWO MAIN ARTERIAL HIGHWAYS (Dark Olive-Grey Asphalt) */}
          <line x1="-350" y1="590" x2="1650" y2="590" stroke="#DCE8D6" strokeWidth="34" />
          <line x1="-350" y1="590" x2="1650" y2="590" stroke="#7C8D76" strokeWidth="28" />
          <line x1="-350" y1="590" x2="1650" y2="590" stroke="#E6F1E2" strokeWidth="1.8" strokeDasharray="14 12" />

          {/* Vertical Primary Arterial X = 675 */}
          <line x1="675" y1="-450" x2="675" y2="1350" stroke="#DCE8D6" strokeWidth="44" />
          <line x1="675" y1="-450" x2="675" y2="1350" stroke="#73846D" strokeWidth="36" />
          <line x1="675" y1="-450" x2="675" y2="1350" stroke="#DFECE0" strokeWidth="2.2" />

          {/* Intersection Box & Stop Lines */}
          <rect x="657" y="576" width="36" height="28" fill="#73846D" />
          <line x1="659" y1="558" x2="673" y2="558" stroke="#E6F1E2" strokeWidth="2.2" />
          <line x1="677" y1="622" x2="691" y2="622" stroke="#E6F1E2" strokeWidth="2.2" />
          <line x1="642" y1="591" x2="642" y2="602" stroke="#E6F1E2" strokeWidth="2.2" />
          <line x1="708" y1="578" x2="708" y2="589" stroke="#E6F1E2" strokeWidth="2.2" />

          {/* Smart Traffic Signal Indicators */}
          <circle id="mapSignalSouth" cx="653" cy="558" r="3" fill="#5FE39B" className="traffic-signal" />
          <circle id="mapSignalNorth" cx="697" cy="622" r="3" fill="#5FE39B" className="traffic-signal" />
          <circle id="mapSignalEast" cx="642" cy="606" r="3" fill="#FF5C5C" className="traffic-signal" />
          <circle id="mapSignalWest" cx="708" cy="574" r="3" fill="#FF5C5C" className="traffic-signal" />

          {/* Dynamic Traffic Layer */}
          <g id="mapRoadTrafficContainer"></g>

          {/* Dynamic Pedestrians Layer */}
          <g id="mapPedestriansWalkersContainer"></g>

          {/* Static Citizens & Resting Walkers */}
          <g id="pedestriansRestingContainer">
            <use href="#pedestrian-grid" transform="translate(956, 335)" />
            <use href="#pedestrian-grid" transform="translate(964, 338)" />
            <use href="#pedestrian-grid" transform="translate(1045, 310)" />
            <use href="#pedestrian-grid" transform="translate(885, 240)" />
            <use href="#pedestrian-grid" transform="translate(1185, 320)" />
            <use href="#pedestrian-grid" transform="translate(1193, 324)" />
            <use href="#pedestrian-grid" transform="translate(755, 515)" />
            <use href="#pedestrian-grid" transform="translate(763, 518)" />
            <use href="#pedestrian-grid" transform="translate(588, 662)" />
            <use href="#pedestrian-grid" transform="translate(890, 658)" />
            <use href="#pedestrian-grid" transform="translate(1035, 805)" />
            <use href="#pedestrian-grid" transform="translate(1043, 808)" />
          </g>

          {/* Dense Architectural 2.5D Tree Canopy (Over 50+ Trees across Parks and Streets) */}
          <g filter="url(#softShadow)">
            {/* 1. Large Central Botanical Park */}
            <use href="#tree-round-grid" transform="translate(860, 222) scale(1.25)" />
            <use href="#tree-small-grid" transform="translate(882, 215) scale(1.05)" />
            <use href="#tree-cone-grid"  transform="translate(918, 228) scale(1.15)" />
            <use href="#tree-round-grid" transform="translate(972, 220) scale(1.2)" />
            <use href="#tree-small-grid" transform="translate(998, 232) scale(1.0)" />
            <use href="#tree-round-grid" transform="translate(1058, 218) scale(1.3)" />
            <use href="#tree-cone-grid"  transform="translate(1080, 235) scale(1.1)" />

            <use href="#tree-round-grid" transform="translate(858, 295) scale(1.2)" />
            <use href="#tree-small-grid" transform="translate(876, 312) scale(1.0)" />
            <use href="#tree-cone-grid"  transform="translate(945, 310) scale(1.2)" />
            <use href="#tree-round-grid" transform="translate(968, 295) scale(1.1)" />
            <use href="#tree-round-grid" transform="translate(1022, 292) scale(1.25)" />
            <use href="#tree-small-grid" transform="translate(1045, 308) scale(1.05)" />
            <use href="#tree-cone-grid"  transform="translate(1078, 298) scale(1.15)" />

            <use href="#tree-round-grid" transform="translate(862, 408) scale(1.25)" />
            <use href="#tree-small-grid" transform="translate(888, 415) scale(1.0)" />
            <use href="#tree-round-grid" transform="translate(960, 382) scale(1.2)" />
            <use href="#tree-cone-grid"  transform="translate(1012, 410) scale(1.15)" />
            <use href="#tree-round-grid" transform="translate(1072, 412) scale(1.25)" />
            <use href="#tree-small-grid" transform="translate(1042, 418) scale(0.95)" />

            {/* 2. East Botanical Annex */}
            <use href="#tree-round-grid" transform="translate(1155, 225) scale(1.2)" />
            <use href="#tree-small-grid" transform="translate(1180, 218) scale(1.0)" />
            <use href="#tree-cone-grid"  transform="translate(1235, 230) scale(1.15)" />
            <use href="#tree-round-grid" transform="translate(1160, 325) scale(1.25)" />
            <use href="#tree-small-grid" transform="translate(1188, 338) scale(1.05)" />
            <use href="#tree-round-grid" transform="translate(1240, 315) scale(1.15)" />
            <use href="#tree-cone-grid"  transform="translate(1158, 412) scale(1.15)" />
            <use href="#tree-round-grid" transform="translate(1232, 405) scale(1.25)" />

            {/* 3. Upper Sector Blocks */}
            <use href="#tree-round-grid" transform="translate(420, -40) scale(1.15)" />
            <use href="#tree-small-grid" transform="translate(445, -25) scale(0.95)" />
            <use href="#tree-cone-grid"  transform="translate(480, 15) scale(1.1)" />
            <use href="#tree-round-grid" transform="translate(425, 105) scale(1.2)" />
            <use href="#tree-small-grid" transform="translate(480, 135) scale(1.0)" />
            <use href="#tree-round-grid" transform="translate(560, 102) scale(1.15)" />
            <use href="#tree-small-grid" transform="translate(618, 138) scale(1.0)" />
            <use href="#tree-cone-grid"  transform="translate(730, 105) scale(1.15)" />
            <use href="#tree-round-grid" transform="translate(778, 138) scale(1.15)" />
            <use href="#tree-round-grid" transform="translate(862, -75) scale(1.2)" />
            <use href="#tree-small-grid" transform="translate(915, -40) scale(1.0)" />
            <use href="#tree-cone-grid"  transform="translate(865, 15) scale(1.15)" />
            <use href="#tree-round-grid" transform="translate(918, 22) scale(1.1)" />
            <use href="#tree-round-grid" transform="translate(860, 102) scale(1.2)" />
            <use href="#tree-round-grid" transform="translate(1002, -25) scale(1.25)" />
            <use href="#tree-round-grid" transform="translate(1075, 140) scale(1.2)" />
            <use href="#tree-round-grid" transform="translate(1165, 110) scale(1.2)" />

            {/* 4. Mid & Central Parcels */}
            <use href="#tree-round-grid" transform="translate(285, 230) scale(1.15)" />
            <use href="#tree-round-grid" transform="translate(420, 225) scale(1.2)" />
            <use href="#tree-cone-grid"  transform="translate(480, 275) scale(1.1)" />
            <use href="#tree-round-grid" transform="translate(555, 220) scale(1.2)" />
            <use href="#tree-round-grid" transform="translate(728, 225) scale(1.2)" />
            <use href="#tree-cone-grid"  transform="translate(730, 365) scale(1.15)" />
            <use href="#tree-round-grid" transform="translate(780, 410) scale(1.2)" />
            <use href="#tree-round-grid" transform="translate(422, 362) scale(1.15)" />
            <use href="#tree-cone-grid"  transform="translate(558, 362) scale(1.15)" />
            <use href="#tree-round-grid" transform="translate(622, 412) scale(1.2)" />

            {/* 5. Along Arterial Roads */}
            <use href="#tree-round-grid" transform="translate(420, 495) scale(1.15)" />
            <use href="#tree-round-grid" transform="translate(558, 492) scale(1.2)" />
            <use href="#tree-cone-grid"  transform="translate(622, 542) scale(1.15)" />
            <use href="#tree-round-grid" transform="translate(728, 492) scale(1.2)" />
            <use href="#tree-round-grid" transform="translate(862, 492) scale(1.2)" />
            <use href="#tree-cone-grid"  transform="translate(920, 542) scale(1.1)" />
            <use href="#tree-round-grid" transform="translate(1072, 495) scale(1.25)" />
            <use href="#tree-round-grid" transform="translate(1158, 492) scale(1.2)" />
            <use href="#tree-cone-grid"  transform="translate(1235, 540) scale(1.15)" />
            <use href="#tree-round-grid" transform="translate(1330, 505) scale(1.2)" />

            {/* 6. Southern Residential Suburbs */}
            <use href="#tree-round-grid" transform="translate(425, 640) scale(1.15)" />
            <use href="#tree-round-grid" transform="translate(555, 638) scale(1.2)" />
            <use href="#tree-cone-grid"  transform="translate(625, 692) scale(1.15)" />
            <use href="#tree-round-grid" transform="translate(728, 638) scale(1.2)" />
            <use href="#tree-round-grid" transform="translate(860, 640) scale(1.25)" />
            <use href="#tree-cone-grid"  transform="translate(1002, 640) scale(1.15)" />
            <use href="#tree-round-grid" transform="translate(1075, 690) scale(1.2)" />
            <use href="#tree-round-grid" transform="translate(1158, 642) scale(1.25)" />
            <use href="#tree-round-grid" transform="translate(1335, 655) scale(1.2)" />
            <use href="#tree-round-grid" transform="translate(295, 780) scale(1.25)" />
            <use href="#tree-round-grid" transform="translate(472, 825) scale(1.25)" />
            <use href="#tree-round-grid" transform="translate(560, 778) scale(1.2)" />
            <use href="#tree-cone-grid"  transform="translate(730, 778) scale(1.15)" />
            <use href="#tree-round-grid" transform="translate(780, 830) scale(1.2)" />
            <use href="#tree-round-grid" transform="translate(862, 778) scale(1.25)" />
            <use href="#tree-round-grid" transform="translate(1005, 778) scale(1.25)" />
            <use href="#tree-cone-grid"  transform="translate(1072, 830) scale(1.15)" />
            <use href="#tree-round-grid" transform="translate(1162, 780) scale(1.2)" />
            <use href="#tree-round-grid" transform="translate(745, 915) scale(1.25)" />
            <use href="#tree-round-grid" transform="translate(1020, 918) scale(1.3)" />
          </g>
        </g>
      </svg>
    </div>
  );
};
