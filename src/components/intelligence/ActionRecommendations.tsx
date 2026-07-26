'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertOctagon, Radio, Eye, FileText, Shield, Zap } from 'lucide-react';
import { useState } from 'react';

interface Recommendation {
  id: string;
  priority: 'critical' | 'high' | 'medium';
  action: string;
  zone: string;
  rationale: string;
  icon: React.ReactNode;
  impact: string;
  executed: boolean;
}

const INITIAL_RECS: Recommendation[] = [
  {
    id: 'r1',
    priority: 'critical',
    action: 'Deploy 2 Additional Patrol Units',
    zone: 'Whitefield ORR — Weekend 8PM–2AM',
    rationale: '92% predicted chain snatching risk. Historical data confirms 3× spike on weekend evenings.',
    icon: <Shield className="w-4 h-4" />,
    impact: '↓ Estimated 40% incident reduction',
    executed: false,
  },
  {
    id: 'r2',
    priority: 'critical',
    action: 'Activate CCTV Monitoring — Sector 4',
    zone: 'KR Market Bus Depot, Bengaluru',
    rationale: 'Network "Mysuru Boys" flagged near perimeter. 2 suspects match existing FIR descriptions.',
    icon: <Eye className="w-4 h-4" />,
    impact: '↑ 65% detection probability',
    executed: false,
  },
  {
    id: 'r3',
    priority: 'high',
    action: 'Issue Lookout Notice — 3 Suspects',
    zone: 'Mangaluru Port Zone',
    rationale: 'Phone CDR analysis reveals suspects in port area. Narcotics pattern matches Mar 2025 case.',
    icon: <Radio className="w-4 h-4" />,
    impact: 'Links to active open case CRM-4521',
    executed: false,
  },
  {
    id: 'r4',
    priority: 'high',
    action: 'Coordinate Night Highway Checkpost',
    zone: 'NH-48, Hubballi — 01:00–04:00',
    rationale: 'Vehicle KA-25-M-3421 pinged 3 times near this stretch. Low patrol density detected.',
    icon: <AlertOctagon className="w-4 h-4" />,
    impact: '↓ Vehicle theft exposure by 55%',
    executed: false,
  },
  {
    id: 'r5',
    priority: 'medium',
    action: 'Generate Cyber Fraud Advisory',
    zone: 'Mysuru Palace Road Cluster',
    rationale: '14 UPI complaints in 9 days. SIM swap pattern confirmed. Public advisory needed.',
    icon: <FileText className="w-4 h-4" />,
    impact: 'Prevent estimated 30+ future victims',
    executed: false,
  },
];

const priorityStyle = {
  critical: {
    label: 'CRITICAL',
    border: 'border-red-500/40',
    bg: 'bg-red-900/20',
    badge: 'bg-red-500/20 text-red-400',
    glow: 'shadow-red-500/20',
    btn: 'bg-red-500/20 hover:bg-red-500/40 text-red-300 border-red-500/40',
  },
  high: {
    label: 'HIGH',
    border: 'border-orange-500/40',
    bg: 'bg-orange-900/15',
    badge: 'bg-orange-500/20 text-orange-400',
    glow: 'shadow-orange-500/10',
    btn: 'bg-orange-500/20 hover:bg-orange-500/40 text-orange-300 border-orange-500/40',
  },
  medium: {
    label: 'MEDIUM',
    border: 'border-yellow-500/30',
    bg: 'bg-yellow-900/10',
    badge: 'bg-yellow-500/20 text-yellow-400',
    glow: 'shadow-yellow-500/10',
    btn: 'bg-yellow-500/20 hover:bg-yellow-500/40 text-yellow-300 border-yellow-500/40',
  },
};

export default function ActionRecommendations() {
  const [recs, setRecs] = useState(INITIAL_RECS);
  const [executing, setExecuting] = useState<string | null>(null);

  const handleExecute = (id: string) => {
    setExecuting(id);
    setTimeout(() => {
      setRecs((prev) => prev.map((r) => r.id === id ? { ...r, executed: true } : r));
      setExecuting(null);
    }, 1800);
  };

  return (
    <div className="h-full flex flex-col gap-3 overflow-y-auto pr-1 scrollbar-thin">
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Zap className="w-4 h-4 text-drishti-cyan" />
          AI Recommendations
        </h2>
        <span className="text-[10px] font-mono text-drishti-cyan bg-drishti-cyan/10 px-2 py-1 rounded border border-drishti-cyan/20">
          {recs.filter(r => !r.executed).length} PENDING
        </span>
      </div>

      <AnimatePresence>
        {recs.map((rec, idx) => {
          const style = priorityStyle[rec.priority];
          return (
            <motion.div
              key={rec.id}
              layout
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: rec.executed ? 0.5 : 1, x: 0 }}
              transition={{ delay: idx * 0.06 }}
              className={`rounded-xl border ${style.border} ${style.bg} shadow-lg ${style.glow} p-3`}
            >
              <div className="flex items-start gap-3">
                {/* Priority icon */}
                <div className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${style.badge}`}>
                  {rec.executed ? <CheckCircle2 className="w-4 h-4" /> : rec.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className={`text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded ${style.badge}`}>
                      {style.label}
                    </span>
                    {rec.executed && (
                      <span className="text-[9px] font-bold text-green-400 bg-green-900/30 px-1.5 py-0.5 rounded">
                        ✓ EXECUTED
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-semibold text-white leading-snug">{rec.action}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">📍 {rec.zone}</p>
                  <p className="text-[10px] text-gray-500 mt-1 leading-relaxed">{rec.rationale}</p>
                  <p className="text-[10px] text-drishti-cyan mt-1 font-mono">{rec.impact}</p>

                  {/* Execute button */}
                  {!rec.executed && (
                    <button
                      onClick={() => handleExecute(rec.id)}
                      disabled={executing === rec.id}
                      className={`mt-2 text-[10px] font-bold px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 ${style.btn}`}
                    >
                      {executing === rec.id ? (
                        <>
                          <span className="w-2.5 h-2.5 border border-current border-t-transparent rounded-full animate-spin" />
                          Dispatching...
                        </>
                      ) : (
                        <>
                          <Zap className="w-3 h-3" />
                          Execute Action
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
