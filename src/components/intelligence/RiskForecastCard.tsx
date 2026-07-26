'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, TrendingUp, MapPin, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import ConfidenceMeter from '@/components/ui/ConfidenceMeter';
import RiskHeatmap from '@/components/intelligence/RiskHeatmap';

interface ForecastItem {
  id: string;
  zone: string;
  district: string;
  risk: number;       // 0–100
  crimeType: string;
  window: string;     // e.g. "Next 48 hrs"
  reason: string;
  trend: 'up' | 'down' | 'stable';
  delta: string;      // e.g. "+34%"
}

const FORECASTS: ForecastItem[] = [
  {
    id: 'f1',
    zone: 'Whitefield – ORR Stretch',
    district: 'Bengaluru Urban',
    risk: 92,
    crimeType: 'Chain Snatching',
    window: 'Next 48 hrs',
    reason: 'Weekend festival surge + Gang-7 activity detected. 3 prior hotspot matches within 2 km.',
    trend: 'up',
    delta: '+34%',
  },
  {
    id: 'f2',
    zone: 'KR Market – City Bus Depot',
    district: 'Bengaluru Urban',
    risk: 78,
    crimeType: 'Pickpocketing / Burglary',
    window: 'Fri–Sun',
    reason: 'High foot traffic + historical spike every last weekend of month. Network "Mysuru Boys" spotted near perimeter.',
    trend: 'up',
    delta: '+21%',
  },
  {
    id: 'f3',
    zone: 'Mangaluru Port Area',
    district: 'Mangaluru',
    risk: 68,
    crimeType: 'Narcotics',
    window: 'Next 72 hrs',
    reason: 'Vessel arrival schedule + 2 flagged phone contacts active in area. Similar pattern in Mar 2025.',
    trend: 'stable',
    delta: '±5%',
  },
  {
    id: 'f4',
    zone: 'Hubballi NH-48',
    district: 'Hubballi-Dharwad',
    risk: 55,
    crimeType: 'Vehicle Theft',
    window: 'Mon–Wed Night',
    reason: 'Low patrol density during 01:00–04:00. Suspect vehicle (KA-25-M-3421) last pinged nearby.',
    trend: 'down',
    delta: '-8%',
  },
  {
    id: 'f5',
    zone: 'Mysuru Palace Road',
    district: 'Mysuru',
    risk: 44,
    crimeType: 'Cybercrime',
    window: 'Ongoing',
    reason: 'UPI fraud cluster active — 14 complaints in 9 days. SIM swap pattern matches prior Mysuru case.',
    trend: 'up',
    delta: '+12%',
  },
];

function riskColor(risk: number) {
  if (risk >= 80) return { bar: '#ef4444', text: 'text-red-400', border: 'border-red-500/30', bg: 'bg-red-900/20', badge: 'CRITICAL', meterColor: '#ef4444' };
  if (risk >= 60) return { bar: '#f97316', text: 'text-orange-400', border: 'border-orange-500/30', bg: 'bg-orange-900/20', badge: 'HIGH', meterColor: '#f97316' };
  if (risk >= 40) return { bar: '#eab308', text: 'text-yellow-400', border: 'border-yellow-500/30', bg: 'bg-yellow-900/20', badge: 'MODERATE', meterColor: '#eab308' };
  return { bar: '#22c55e', text: 'text-green-400', border: 'border-green-500/30', bg: 'bg-green-900/20', badge: 'LOW', meterColor: '#22c55e' };
}

export default function RiskForecastCard() {
  const [expanded, setExpanded] = useState<string | null>('f1');

  return (
    <div className="flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-orange-400" />
          Predictive Risk Forecast
        </h2>
        <span className="text-[10px] font-mono text-gray-500 bg-white/5 px-2 py-1 rounded">
          7-DAY WINDOW
        </span>
      </div>

      <RiskHeatmap />

      {FORECASTS.map((fc, idx) => {
        const col = riskColor(fc.risk);
        const isOpen = expanded === fc.id;

        return (
          <motion.div
            key={fc.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.07 }}
            className={`rounded-xl border ${col.border} ${col.bg} overflow-hidden cursor-pointer`}
            onClick={() => setExpanded(isOpen ? null : fc.id)}
          >
            {/* Card header row */}
            <div className="p-3 flex items-center gap-3">
              {/* Confidence ring */}
              <div className="shrink-0">
                <ConfidenceMeter value={fc.risk} size="sm" color={col.meterColor} />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[9px] font-bold uppercase tracking-widest ${col.text} bg-white/5 px-1.5 py-0.5 rounded`}>
                    {col.badge}
                  </span>
                  <span className="text-[10px] text-gray-500 font-mono">{fc.window}</span>
                  {fc.trend === 'up' && <TrendingUp className="w-3 h-3 text-red-400" />}
                  {fc.trend === 'down' && <TrendingUp className="w-3 h-3 text-green-400 rotate-180" />}
                  <span className={`text-[10px] font-bold ${fc.trend === 'up' ? 'text-red-400' : fc.trend === 'down' ? 'text-green-400' : 'text-gray-400'}`}>
                    {fc.delta}
                  </span>
                </div>
                <p className="text-xs font-semibold text-white truncate">{fc.zone}</p>
                <p className="text-[10px] text-gray-400 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-2.5 h-2.5" />{fc.district} · {fc.crimeType}
                </p>
              </div>

              {isOpen ? <ChevronUp className="w-4 h-4 text-gray-500 shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-500 shrink-0" />}
            </div>

            {/* Expanded reason */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-3 pb-3 border-t border-white/5">
                    <p className="text-[11px] text-gray-300 leading-relaxed mt-2">
                      🔍 <span className="text-gray-400 font-semibold">AI Reasoning:</span> {fc.reason}
                    </p>
                    {/* Risk bar */}
                    <div className="mt-3">
                      <div className="flex justify-between text-[10px] text-gray-500 mb-1">
                        <span>Risk Probability</span><span>{fc.risk}%</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: col.bar, boxShadow: `0 0 8px ${col.bar}` }}
                          initial={{ width: 0 }}
                          animate={{ width: `${fc.risk}%` }}
                          transition={{ duration: 0.9, ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
