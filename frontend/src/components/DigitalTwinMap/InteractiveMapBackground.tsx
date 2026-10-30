import React, { useEffect, useRef } from 'react';

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
          { type: 'vehicle-sedan-dark', length: 24, cruiseSpeed: 0.86, currentSpeed: 0.86, pos: 1220, scale: 0.90, el: null as SVGElement | null },
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
          { type: 'vehicle-bus', length: 44, cruiseSpeed: 0.64, currentSpeed: 0.64, pos: 1420, scale: 0.94, el: null as SVGElement | null },
          { type: 'vehicle-car-olive', length: 20, cruiseSpeed: 0.82, currentSpeed: 0.82, pos: 970, scale: 0.90, el: null as SVGElement | null },
          { type: 'vehicle-sedan-dark', length: 24, cruiseSpeed: 0.88, currentSpeed: 0.88, pos: 520, scale: 0.90, el: null as SVGElement | null },
          { type: 'vehicle-car-olive', length: 20, cruiseSpeed: 0.80, currentSpeed: 0.80, pos: 70, scale: 0.90, el: null as SVGElement | null },
        ],
      },
    ];

    const trafficContainer = document.getElementById('mapRoadTrafficContainer');
    if (trafficContainer) {
      trafficContainer.innerHTML = '';
      lanes.forEach((lane) => {
        lane.vehicles.forEach((v) => {
          const useEl = document.createElementNS(svgNS, 'use');
          useEl.setAttribute('href', `#${v.type}`);
          v.el = useEl;
          trafficContainer.appendChild(useEl);
        });
      });
    }

    function updateVehiclePositions() {
      const STOP_GAP = 28;
      const SLOW_GAP = 95;

      lanes.forEach((lane) => {
        const isVert = lane.axis === 'y';
        const hasStopSignal = isVert ? signalPhase !== 0 : signalPhase !== 2;

        const sorted = lane.dir === 1
          ? [...lane.vehicles].sort((a, b) => a.pos - b.pos)
          : [...lane.vehicles].sort((a, b) => b.pos - a.pos);

        const count = sorted.length;

        for (let i = 0; i < count; i++) {
          const v = sorted[i];
          const leader = sorted[(i + 1) % count];

          let distToLeader: number;
          if (lane.dir === 1) {
            distToLeader = leader.pos > v.pos
              ? leader.pos - v.pos
              : (lane.max - v.pos) + (leader.pos - lane.min);
          } else {
            distToLeader = leader.pos < v.pos
              ? v.pos - leader.pos
              : (v.pos - lane.min) + (lane.max - leader.pos);
          }
          const leaderClearance = distToLeader - (v.length / 2 + leader.length / 2);

          let signalClearance = 9999;
          if (hasStopSignal) {
            const dStop = lane.dir === 1 ? lane.stopLine - v.pos : v.pos - lane.stopLine;
            if (dStop > 0 && dStop < 240) {
              signalClearance = dStop - v.length / 2;
            }
          }

          const effectiveGap = Math.min(leaderClearance, signalClearance);

          let targetSpeed = v.cruiseSpeed;
          if (effectiveGap <= STOP_GAP) {
            targetSpeed = 0;
          } else if (effectiveGap < SLOW_GAP) {
            const ratio = (effectiveGap - STOP_GAP) / (SLOW_GAP - STOP_GAP);
            const leaderSpeed = leader ? Math.abs(leader.currentSpeed) : v.cruiseSpeed;
            targetSpeed = Math.min(v.cruiseSpeed * ratio, Math.max(0.08, leaderSpeed * 0.96));
          }

          if (targetSpeed < v.currentSpeed) {
            v.currentSpeed += (targetSpeed - v.currentSpeed) * 0.12;
          } else {
            v.currentSpeed += (targetSpeed - v.currentSpeed) * 0.04;
          }

          if (effectiveGap <= STOP_GAP - 2) {
            v.currentSpeed = 0;
          }

          v.pos += v.currentSpeed * lane.dir * speedMultiplier;

          if (lane.dir === 1) {
            if (leader.pos > v.pos) {
              const maxAllowed = leader.pos - (v.length / 2 + leader.length / 2 + 18);
              if (v.pos > maxAllowed) v.pos = maxAllowed;
            }
            if (hasStopSignal && v.pos > lane.stopLine - (v.length / 2 + 3) && v.pos < lane.stopLine + 15) {
              v.pos = lane.stopLine - (v.length / 2 + 3);
            }
            if (v.pos > lane.max) v.pos = lane.min;
          } else {
            if (leader.pos < v.pos) {
              const minAllowed = leader.pos + (v.length / 2 + leader.length / 2 + 18);
              if (v.pos < minAllowed) v.pos = minAllowed;
            }
            if (hasStopSignal && v.pos < lane.stopLine + (v.length / 2 + 3) && v.pos > lane.stopLine - 15) {
              v.pos = lane.stopLine + (v.length / 2 + 3);
            }
            if (v.pos < lane.min) v.pos = lane.max;
          }

          if (v.el) {
            const x = lane.axis === 'x' ? v.pos : lane.fixedCoord;
            const y = lane.axis === 'y' ? v.pos : lane.fixedCoord;
            v.el.setAttribute(
              'transform',
              `translate(${x.toFixed(2)}, ${y.toFixed(2)}) rotate(${lane.angle}) scale(${v.scale})`
            );
          }
        }
      });
    }

    // 3. Pedestrian Walking Engine
    interface PedestrianData {
      type: 'bezier' | 'linear';
      p0?: { x: number; y: number };
      p1?: { x: number; y: number };
      p2?: { x: number; y: number };
      start?: { x: number; y: number };
      end?: { x: number; y: number };
      t: number;
      dir: number;
      speed: number;
      pauseFrames: number;
      color: string;
      stride: number;
      el?: SVGElement | null;
      legL?: SVGLineElement | null;
      legR?: SVGLineElement | null;
    }

    const pedestrians: PedestrianData[] = [
      { type: 'bezier', p0: { x: 845, y: 260 }, p1: { x: 960, y: 310 }, p2: { x: 1085, y: 242 }, t: 0.15, dir: 1, speed: 0.0011, pauseFrames: 0, color: '#263324', stride: 0 },
      { type: 'bezier', p0: { x: 895, y: 205 }, p1: { x: 950, y: 320 }, p2: { x: 925, y: 425 }, t: 0.75, dir: -1, speed: 0.0013, pauseFrames: 0, color: '#344532', stride: 0 },
      { type: 'bezier', p0: { x: 845, y: 380 }, p1: { x: 975, y: 345 }, p2: { x: 1085, y: 395 }, t: 0.45, dir: 1, speed: 0.0010, pauseFrames: 0, color: '#2A3828', stride: 0 },
      { type: 'linear', start: { x: 1155, y: 235 }, end: { x: 1220, y: 410 }, t: 0.3, dir: 1, speed: 0.0014, pauseFrames: 0, color: '#243022', stride: 0 },
      { type: 'linear', start: { x: 880, y: 115 }, end: { x: 1045, y: 120 }, t: 0.55, dir: 1, speed: 0.0012, pauseFrames: 0, color: '#334431', stride: 0 },
      { type: 'linear', start: { x: 565, y: 235 }, end: { x: 625, y: 280 }, t: 0.35, dir: 1, speed: 0.0015, pauseFrames: 0, color: '#2C3A2A', stride: 0 },
      { type: 'linear', start: { x: 740, y: 795 }, end: { x: 890, y: 805 }, t: 0.8, dir: -1, speed: 0.0012, pauseFrames: 0, color: '#233021', stride: 0 },
      { type: 'linear', start: { x: 310, y: 795 }, end: { x: 460, y: 810 }, t: 0.4, dir: 1, speed: 0.0013, pauseFrames: 0, color: '#2D3C2B', stride: 0 },
    ];

    const pContainer = document.getElementById('mapPedestriansWalkersContainer');
    if (pContainer) {
      pContainer.innerHTML = '';
      pedestrians.forEach((p) => {
        const g = document.createElementNS(svgNS, 'g');

        const shadow = document.createElementNS(svgNS, 'ellipse');
        shadow.setAttribute('cx', '2.5');
        shadow.setAttribute('cy', '5.5');
        shadow.setAttribute('rx', '3.6');
        shadow.setAttribute('ry', '1.3');
        shadow.setAttribute('fill', '#5E7259');
        shadow.setAttribute('opacity', '0.35');
        g.appendChild(shadow);

        const legL = document.createElementNS(svgNS, 'line');
        legL.setAttribute('x1', '-0.7');
        legL.setAttribute('y1', '1.5');
        legL.setAttribute('x2', '-1.8');
        legL.setAttribute('y2', '5.5');
        legL.setAttribute('stroke', '#2D382B');
        legL.setAttribute('stroke-width', '1.3');
        legL.setAttribute('stroke-linecap', 'round');
        g.appendChild(legL);

        const legR = document.createElementNS(svgNS, 'line');
        legR.setAttribute('x1', '0.7');
        legR.setAttribute('y1', '1.5');
        legR.setAttribute('x2', '1.8');
        legR.setAttribute('y2', '5.5');
        legR.setAttribute('stroke', '#2D382B');
        legR.setAttribute('stroke-width', '1.3');
        legR.setAttribute('stroke-linecap', 'round');
        g.appendChild(legR);

        const torso = document.createElementNS(svgNS, 'path');
        torso.setAttribute('d', 'M -1.8 -2.2 L 1.8 -2.2 L 1.4 2 L -1.4 2 Z');
        torso.setAttribute('fill', p.color);
        g.appendChild(torso);

        const head = document.createElementNS(svgNS, 'circle');
        head.setAttribute('cx', '0');
        head.setAttribute('cy', '-4.2');
        head.setAttribute('r', '1.7');
        head.setAttribute('fill', '#2D382B');
        g.appendChild(head);

        p.el = g;
        p.legL = legL;
        p.legR = legR;
        pContainer.appendChild(g);
      });
    }

    function updatePedestrians() {
      pedestrians.forEach((p) => {
        if (!p.el || !p.legL || !p.legR) return;

        if (p.pauseFrames > 0) {
          p.pauseFrames -= speedMultiplier;
          p.legL.setAttribute('x2', '-1.5');
          p.legR.setAttribute('x2', '1.5');
          return;
        }

        p.t += p.speed * p.dir * speedMultiplier;
        p.stride += 0.22 * speedMultiplier;

        let x = 0, y = 0, dx = 0;
        if (p.type === 'bezier' && p.p0 && p.p1 && p.p2) {
          const t = p.t;
          const mt = 1 - t;
          x = mt * mt * p.p0.x + 2 * mt * t * p.p1.x + t * t * p.p2.x;
          y = mt * mt * p.p0.y + 2 * mt * t * p.p1.y + t * t * p.p2.y;
          dx = 2 * mt * (p.p1.x - p.p0.x) + 2 * t * (p.p2.x - p.p1.x);
        } else if (p.start && p.end) {
          x = p.start.x + (p.end.x - p.start.x) * p.t;
          y = p.start.y + (p.end.y - p.start.y) * p.t;
          dx = p.end.x - p.start.x;
        }

        if (p.t >= 1) {
          p.t = 1;
          p.dir = -1;
          p.pauseFrames = 80 + Math.random() * 60;
        } else if (p.t <= 0) {
          p.t = 0;
          p.dir = 1;
          p.pauseFrames = 80 + Math.random() * 60;
        }

        const moveDirX = dx * p.dir;
        const facing = moveDirX >= 0 ? 1 : -1;

        const swing = Math.sin(p.stride) * 2.2;
        p.legL.setAttribute('x2', (-0.6 + swing).toFixed(1));
        p.legR.setAttribute('x2', (0.6 - swing).toFixed(1));

        const bob = Math.abs(Math.sin(p.stride)) * 0.45;

        p.el.setAttribute(
          'transform',
          `translate(${x.toFixed(1)}, ${(y - bob).toFixed(1)}) rotate(36) scale(${facing}, 1)`
        );
      });
    }

    function loop() {
      if (trafficRunning) {
        updateTrafficSignals();
        updateVehiclePositions();
        updatePedestrians();
      }
      animFrameId = requestAnimationFrame(loop);
    }

    animFrameId = requestAnimationFrame(loop);

    return () => {
      trafficRunning = false;
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  return (
    <div
      id="svgMapLayer"
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 map-mask-container select-none overflow-hidden"
    >
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

          {/* Upright Isometric Small Bush/Tree */}
          <g id="tree-small-grid">
            <g transform="rotate(36)">
              <ellipse cx="2" cy="7" rx="5.2" ry="2.5" fill="#6E8667" opacity="0.32" />
              <rect x="-0.8" y="2" width="1.6" height="5" fill="#5B5349" />
              <circle cx="0" cy="0" r="5.8" fill="#5E7458" />
              <circle cx="-1.6" cy="-1.6" r="4" fill="#7E9676" />
            </g>
          </g>

          {/* Upright Isometric Cypress Tree */}
          <g id="tree-cone-grid">
            <g transform="rotate(36)">
              <ellipse cx="3" cy="12" rx="6" ry="3" fill="#6E8667" opacity="0.35" />
              <rect x="-1" y="5" width="2" height="7" fill="#554D44" />
              <path d="M 0 -13.5 C 5 -4, 7.2 4, 6 7 C 2 8.5, -2 8.5, -6 7 C -7.2 4, -5 -4, 0 -13.5 Z" fill="#5E7458" />
              <path d="M 0 -13.5 C 2 -4, 3 4, 2 7 C 0 8, -2 7, -5 6 C -6 3, -3 -4, 0 -13.5 Z" fill="#7E9676" />
            </g>
          </g>

          {/* Standing Citizen Symbol */}
          <g id="pedestrian-grid">
            <g transform="rotate(36) scale(1.12)">
              <ellipse cx="3.5" cy="5.5" rx="3.5" ry="1.2" transform="rotate(25 3.5 5.5)" fill="#5E7259" opacity="0.35" />
              <line x1="-0.8" y1="1.5" x2="-2" y2="5.5" stroke="#2D382B" strokeWidth="1.3" strokeLinecap="round" />
              <line x1="0.8" y1="1.5" x2="2" y2="5.5" stroke="#2D382B" strokeWidth="1.3" strokeLinecap="round" />
              <path d="M -1.8 -2.2 L 1.8 -2.2 L 1.4 2 L -1.4 2 Z" fill="#2D382B" />
              <circle cx="0" cy="-4.2" r="1.7" fill="#2D382B" />
            </g>
          </g>

          {/* City Bus */}
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

          {/* Sedan Car */}
          <g id="vehicle-sedan-dark">
            <rect x="-11" y="-4.5" width="22" height="9.5" rx="3.5" fill="#1E281C" opacity="0.24" transform="translate(1.2, 2)" />
            <rect x="-11" y="-4.8" width="22" height="9.6" rx="3.5" fill="#2F3E2D" />
            <path d="M 2.5 -3.6 L 6.5 -2.8 L 6.5 2.8 L 2.5 3.6 Z" fill="#C5D9C0" />
            <path d="M -7.5 -2.8 L -4.5 -3.4 L -4.5 3.4 L -7.5 2.8 Z" fill="#8FA38A" />
            <rect x="-4.5" y="-3.6" width="7" height="7.2" rx="1.2" fill="#9EB299" />
            <circle cx="10.6" cy="-3" r="0.9" fill="#F7FDE8" />
            <circle cx="10.6" cy="3" r="0.9" fill="#F7FDE8" />
          </g>

          {/* Compact Olive Car */}
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

        {/* Rotated Urban Grid (-36 deg) */}
        <g id="urbanGridSpace" transform="translate(980, 480) rotate(-36) translate(-800, -500)">
          {/* Secondary streets */}
          <g stroke="#DCE8D6" strokeWidth="2" fill="none">
            <rect x="-500" y="-500" width="2600" height="2000" fill="#F3F9EF" />
            <path d="M 100 -400 L 100 1400 M 240 -400 L 240 1400 M 380 -400 L 380 1400 M 520 -400 L 520 1400 M 820 -400 L 820 1400 M 960 -400 L 960 1400 M 1115 -400 L 1115 1400 M 1280 -400 L 1280 1400" />
            <path d="M -300 60 L 1800 60 M -300 180 L 1800 180 M -300 320 L 1800 320 M -300 450 L 1800 450 M -300 730 L 1800 730 M -300 870 L 1800 870" />
          </g>

          {/* Urban City Blocks & Green Parks */}
          <g filter="url(#blockBevel)">
            <rect x="115" y="-120" width="110" height="165" rx="4" fill="#DFEDD9" />
            <rect x="115" y="75" width="110" height="90" rx="4" fill="#D5E7CE" />
            <rect x="255" y="-80" width="110" height="125" rx="4" fill="#D5E7CE" />
            <rect x="255" y="75" width="110" height="90" rx="4" fill="#E3F0DE" />
            <rect x="395" y="-80" width="110" height="125" rx="6" fill="#C9E1C0" />
            <rect x="395" y="75" width="110" height="90" rx="5" fill="#C5DFB8" />

            <rect x="115" y="195" width="110" height="105" rx="5" fill="#CEE5C5" />
            <rect x="255" y="195" width="110" height="105" rx="5" fill="#E1EFE0" />
            <rect x="395" y="195" width="110" height="105" rx="5" fill="#C7E0BC" />
            <rect x="535" y="75" width="112" height="90" rx="6" fill="#DCECD5" />
            <rect x="535" y="195" width="112" height="105" rx="6" fill="#C4DFB8" />

            {/* Central Botanical Park */}
            <rect x="835" y="195" width="265" height="240" rx="10" fill="#C2DEB6" />
            <path d="M 835 260 Q 960 310 1100 240" stroke="#EEF7EA" strokeWidth="5.5" fill="none" />
            <path d="M 890 195 Q 950 320 920 435" stroke="#EEF7EA" strokeWidth="5" fill="none" />
            <path d="M 835 380 Q 980 340 1100 395" stroke="#EEF7EA" strokeWidth="5" fill="none" />

            {/* East Annex */}
            <rect x="1130" y="195" width="135" height="240" rx="8" fill="#C9E2BE" />
            <rect x="703" y="195" width="102" height="110" rx="6" fill="#D9EAD2" />
            <rect x="703" y="335" width="102" height="100" rx="6" fill="#C8E1BD" />

            {/* Blocks along highway */}
            <rect x="255" y="465" width="110" height="102" rx="5" fill="#CBE2C2" />
            <rect x="395" y="465" width="110" height="102" rx="5" fill="#D5E8CD" />
            <rect x="535" y="465" width="112" height="102" rx="5" fill="#C6DFB9" />
            <rect x="703" y="465" width="102" height="102" rx="5" fill="#C7E0BC" />
            <rect x="835" y="465" width="110" height="102" rx="5" fill="#DFEDD9" />
            <rect x="975" y="465" width="125" height="102" rx="5" fill="#D1E6C8" />
            <rect x="1130" y="465" width="135" height="102" rx="6" fill="#C4DFB8" />

            {/* South of intersection */}
            <rect x="255" y="613" width="110" height="102" rx="5" fill="#D4E8CC" />
            <rect x="395" y="613" width="110" height="102" rx="5" fill="#E2F0DC" />
            <rect x="535" y="613" width="112" height="102" rx="5" fill="#C8E1BD" />
            <rect x="703" y="613" width="102" height="102" rx="5" fill="#DCECD5" />
            <rect x="835" y="613" width="110" height="102" rx="5" fill="#C5DFB8" />
            <rect x="975" y="613" width="125" height="102" rx="5" fill="#E2F0DC" />
            <rect x="1130" y="613" width="135" height="102" rx="6" fill="#C4DFB8" />
          </g>

          {/* Secondary streets */}
          <g stroke="#F7FBF4" strokeWidth="14" fill="none">
            <line x1="240" y1="-350" x2="240" y2="1200" />
            <line x1="380" y1="-350" x2="380" y2="1200" />
            <line x1="520" y1="-350" x2="520" y2="1200" />
            <line x1="820" y1="-350" x2="820" y2="1200" />
            <line x1="960" y1="-350" x2="960" y2="1200" />
            <line x1="1115" y1="-350" x2="1115" y2="1200" />
            <line x1="-100" y1="450" x2="1550" y2="450" />
            <line x1="-100" y1="730" x2="1550" y2="730" />
          </g>

          {/* TWO MAIN ARTERIAL HIGHWAYS (Dark Olive-Grey Asphalt) */}
          {/* Horizontal Arterial Y = 590 */}
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

          {/* Resting Citizens */}
          <g>
            <use href="#pedestrian-grid" transform="translate(956, 335)" />
            <use href="#pedestrian-grid" transform="translate(964, 338)" />
            <use href="#pedestrian-grid" transform="translate(1045, 310)" />
            <use href="#pedestrian-grid" transform="translate(1185, 320)" />
            <use href="#pedestrian-grid" transform="translate(1193, 324)" />
            <use href="#pedestrian-grid" transform="translate(755, 515)" />
            <use href="#pedestrian-grid" transform="translate(763, 518)" />
          </g>

          {/* Architectural 2.5D Trees */}
          <g filter="url(#softShadow)">
            <use href="#tree-round-grid" transform="translate(860, 222) scale(1.25)" />
            <use href="#tree-cone-grid" transform="translate(918, 228) scale(1.15)" />
            <use href="#tree-round-grid" transform="translate(972, 220) scale(1.2)" />
            <use href="#tree-round-grid" transform="translate(1058, 218) scale(1.3)" />
            <use href="#tree-round-grid" transform="translate(858, 295) scale(1.2)" />
            <use href="#tree-cone-grid" transform="translate(945, 310) scale(1.2)" />
            <use href="#tree-round-grid" transform="translate(1022, 292) scale(1.25)" />
            <use href="#tree-round-grid" transform="translate(1155, 225) scale(1.2)" />
            <use href="#tree-cone-grid" transform="translate(1235, 230) scale(1.15)" />
            <use href="#tree-round-grid" transform="translate(728, 225) scale(1.2)" />
            <use href="#tree-cone-grid" transform="translate(730, 365) scale(1.15)" />
            <use href="#tree-round-grid" transform="translate(420, 495) scale(1.15)" />
            <use href="#tree-round-grid" transform="translate(558, 492) scale(1.2)" />
            <use href="#tree-round-grid" transform="translate(862, 492) scale(1.2)" />
            <use href="#tree-cone-grid" transform="translate(920, 542) scale(1.1)" />
          </g>
        </g>
      </svg>
    </div>
  );
};
