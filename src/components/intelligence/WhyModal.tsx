'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Brain, Scale, FileSearch, AlertTriangle, CheckCircle2, ChevronRight } from 'lucide-react';
import ConfidenceMeter from '@/components/ui/ConfidenceMeter';

interface Evidence {
  type: string;
  description: string;
  weight: number; // 0-100
}

interface PriorCase {
  fir: string;
  district: string;
  year: number;
  outcome: string;
  similarity: number;
}

interface WhyData {
  claim: string;
  overallConfidence: number;
  reasoning: string;
  evidence: Evidence[];
  priorCases: PriorCase[];
  ipcSections: string[];
  limitations: string[];
}

interface WhyModalProps {
  isOpen: boolean;
  onClose: () => void;
  data?: WhyData;
}

const DEFAULT_DATA: WhyData = {
  claim: 'Whitefield ORR — 92% Chain Snatching Risk (Next 48 hrs)',
  overallConfidence: 92,
  reasoning:
    'The AI identified a convergence of 4 independent signals: (1) temporal pattern matching with prior incidents, (2) active movement of known suspects in the zone, (3) festival-driven crowd density forecast, and (4) historical weekend spike analysis across 3 years of FIR data.',
  evidence: [
    { type: 'Temporal Pattern', description: 'Same zone recorded 14 chain snatching incidents in last 6 weekend evenings', weight: 88 },
    { type: 'Suspect Proximity', description: 'Raju Blade (risk score 87) last pinged 1.2 km from zone at 21:45', weight: 79 },
    { type: 'Crowd Density Forecast', description: 'Kalyanamantapa event — est. 8,000 attendees within 2 km radius on Saturday', weight: 85 },
    { type: 'Network Signal', description: 'Gang-7 internal communication spike detected (CDR analysis) — 3 members active', weight: 91 },
    { type: 'Historical Baseline', description: '3-year weekend crime index for Whitefield: 2.4× above district average', weight: 76 },
  ],
  priorCases: [
    { fir: 'FIR-2025-441', district: 'Bengaluru Urban', year: 2025, outcome: 'Conviction — 2 arrested', similarity: 94 },
    { fir: 'FIR-2024-882', district: 'Bengaluru Urban', year: 2024, outcome: 'Under investigation', similarity: 81 },
    { fir: 'FIR-2024-103', district: 'Mysuru', year: 2024, outcome: 'Closed — insufficient evidence', similarity: 67 },
  ],
  ipcSections: ['IPC §379 — Theft', 'IPC §356 — Assault to commit theft', 'IPC §34 — Common intention'],
  limitations: [
    'Suspect movement data limited to last 72 hours',
    'Crowd density forecast based on permit data, not real-time sensors',
    'Gang-7 CDR pattern inferred — not direct interception',
  ],
};

export default function WhyModal({ isOpen, onClose, data = DEFAULT_DATA }: WhyModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto pointer-events-auto rounded-2xl border border-drishti-cyan/30 bg-[#0d1117]/95 backdrop-blur-xl shadow-2xl shadow-drishti-cyan/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-[#0d1117]/95 backdrop-blur-xl p-5 border-b border-white/10 flex items-start justify-between gap-4 rounded-t-2xl z-10">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-drishti-cyan/20 border border-drishti-cyan/30 flex items-center justify-center shrink-0">
                    <Brain className="w-5 h-5 text-drishti-cyan" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-drishti-cyan uppercase tracking-widest mb-0.5">AI Explainability Report</div>
                    <h2 className="text-sm font-bold text-white leading-snug">{data.claim}</h2>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="shrink-0 w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              <div className="p-5 space-y-6">
                {/* Overall confidence + summary */}
                <div className="flex items-start gap-5 p-4 rounded-xl bg-white/5 border border-white/10">
                  <ConfidenceMeter value={data.overallConfidence} label="Overall Confidence" size="lg" />
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-gray-200 mb-2 flex items-center gap-2">
                      <Scale className="w-4 h-4 text-drishti-cyan" /> AI Reasoning Chain
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed">{data.reasoning}</p>
                  </div>
                </div>

                {/* Evidence signals */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-200 mb-3 flex items-center gap-2">
                    <FileSearch className="w-4 h-4 text-orange-400" /> Evidence Signals
                  </h3>
                  <div className="space-y-2">
                    {data.evidence.map((ev, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06 }}
                        className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5"
                      >
                        <div className="shrink-0">
                          <ConfidenceMeter value={ev.weight} size="sm" color="#06b6d4" />
                        </div>
                        <div className="flex-1">
                          <div className="text-xs font-semibold text-gray-200">{ev.type}</div>
                          <div className="text-[11px] text-gray-500 mt-0.5">{ev.description}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Prior cases */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-200 mb-3 flex items-center gap-2">
                    <FileSearch className="w-4 h-4 text-violet-400" /> Precedent Cases
                  </h3>
                  <div className="space-y-2">
                    {data.priorCases.map((pc, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-3 rounded-lg bg-violet-900/10 border border-violet-500/20"
                      >
                        <div>
                          <div className="text-xs font-mono text-violet-400">{pc.fir}</div>
                          <div className="text-[11px] text-gray-400">{pc.district} · {pc.year} · {pc.outcome}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-violet-400">{pc.similarity}%</div>
                          <div className="text-[10px] text-gray-500">Similarity</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* IPC Sections */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-200 mb-2 flex items-center gap-2">
                    <Scale className="w-4 h-4 text-yellow-400" /> Applicable IPC Sections
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {data.ipcSections.map((sec, i) => (
                      <span key={i} className="text-[11px] font-mono text-yellow-400 bg-yellow-900/20 border border-yellow-500/20 px-3 py-1 rounded-full">
                        {sec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Limitations */}
                <div className="p-3 rounded-xl bg-orange-900/10 border border-orange-500/20">
                  <h3 className="text-xs font-semibold text-orange-400 mb-2 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" /> Known Limitations
                  </h3>
                  <ul className="space-y-1">
                    {data.limitations.map((lim, i) => (
                      <li key={i} className="text-[11px] text-gray-500 flex items-start gap-1.5">
                        <ChevronRight className="w-3 h-3 text-orange-500 mt-0.5 shrink-0" /> {lim}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
