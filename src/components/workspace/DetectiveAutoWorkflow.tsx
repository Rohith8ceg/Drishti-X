'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Search, Car, Users, FileText } from 'lucide-react';

const steps = [
  { title: 'Incident logged', detail: 'New complaint matched to existing case patterns', icon: Sparkles },
  { title: 'Similar crimes found', detail: '3 prior cases in the same radius and time window', icon: Search },
  { title: 'Vehicles linked', detail: 'Black Pulsar and a white sedan were identified', icon: Car },
  { title: 'Suspects shortlisted', detail: '4 persons with high overlap and elevated risk', icon: Users },
  { title: 'Brief prepared', detail: 'Evidence bundle and next action recommendations ready', icon: FileText },
];

export default function DetectiveAutoWorkflow() {
  const [activeStep, setActiveStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    if (activeStep >= steps.length - 1) {
      setIsRunning(false);
      return;
    }

    const timer = window.setTimeout(() => setActiveStep((prev) => prev + 1), 900);
    return () => window.clearTimeout(timer);
  }, [activeStep, isRunning]);

  return (
    <div className="rounded-2xl border border-drishti-cyan/20 bg-black/20 p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-[10px] uppercase tracking-[0.24em] text-drishti-cyan">Detective Mode</div>
          <div className="text-sm font-semibold text-white">Automatic investigation workflow</div>
        </div>
        <button
          onClick={() => {
            setActiveStep(0);
            setIsRunning(true);
          }}
          className="rounded-full border border-drishti-cyan/40 bg-drishti-cyan/10 px-3 py-1.5 text-[11px] font-semibold text-drishti-cyan"
        >
          Trigger
        </button>
      </div>

      <div className="space-y-2">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isCurrent = index === activeStep;
          const isDone = index < activeStep;

          return (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex items-start gap-3 rounded-xl border px-3 py-2 ${
                isDone
                  ? 'border-emerald-500/20 bg-emerald-500/10'
                  : isCurrent
                    ? 'border-drishti-cyan/30 bg-drishti-cyan/10'
                    : 'border-white/10 bg-white/5'
              }`}
            >
              <div className={`mt-0.5 rounded-full p-1.5 ${isCurrent ? 'bg-drishti-cyan/20' : 'bg-white/5'}`}>
                <Icon className={`w-3.5 h-3.5 ${isCurrent ? 'text-drishti-cyan' : 'text-gray-400'}`} />
              </div>
              <div>
                <div className="text-[11px] font-semibold text-white">{step.title}</div>
                <div className="text-[10px] text-gray-400">{step.detail}</div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
