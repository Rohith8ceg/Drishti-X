'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw } from 'lucide-react';

const replaySteps = [
  { emoji: '🚨', label: 'Incident logged', time: 'Fri, 20:42', detail: 'Chain-snatching FIR registered near Whitefield Metro.' },
  { emoji: '📹', label: 'CCTV reviewed', time: 'Fri, 21:05', detail: 'Camera 17 identifies a black Pulsar and two riders.' },
  { emoji: '🚗', label: 'Vehicle linked', time: 'Fri, 21:18', detail: 'Plate pattern matches three prior cases in the district.' },
  { emoji: '🤖', label: 'AI recommendation', time: 'Fri, 21:31', detail: 'Deploy a patrol on the KR Market–Whitefield corridor.' },
];

export default function TimelineReplay() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;

    const timer = window.setInterval(() => {
      setActiveIndex((previous) => {
        if (previous === replaySteps.length - 1) {
          setPlaying(false);
          return previous;
        }
        return previous + 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [playing]);

  const currentEvent = replaySteps[activeIndex];

  const togglePlayback = () => {
    if (activeIndex === replaySteps.length - 1) setActiveIndex(0);
    setPlaying((previous) => !previous);
  };

  return (
    <div className="glass-panel p-4 rounded-lg shadow-lg max-w-4xl mx-auto h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-drishti-cyan">Case Replay</h2>
          <p className="text-xs text-gray-400">Select a frame or play the investigation sequence</p>
        </div>
        <div className="flex gap-2">
          <button onClick={togglePlayback} className="rounded-full border border-drishti-cyan/40 bg-drishti-cyan/10 px-3 py-1.5 text-[11px] font-semibold text-drishti-cyan flex items-center gap-2">
            {playing ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {playing ? 'Pause' : 'Play'}
          </button>
          <button onClick={() => { setPlaying(false); setActiveIndex(0); }} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-semibold text-gray-200 flex items-center gap-2">
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
        </div>
      </div>

      <motion.div key={activeIndex} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="mb-4 rounded-2xl border border-white/10 bg-black/20 p-3">
        <div className="text-[10px] uppercase tracking-[0.24em] text-drishti-cyan">Current frame · {activeIndex + 1} of {replaySteps.length}</div>
        <div className="mt-2 text-sm font-semibold text-white">{currentEvent.label}</div>
        <div className="text-[11px] text-gray-400">{currentEvent.time} · {currentEvent.detail}</div>
      </motion.div>

      <div className="flex-1 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="flex h-full items-center gap-3 overflow-x-auto pb-2">
          {replaySteps.map((step, index) => {
            const isComplete = index < activeIndex;
            const isCurrent = index === activeIndex;
            return (
              <button key={step.label} onClick={() => { setActiveIndex(index); setPlaying(false); }} className="flex items-center gap-3 text-left">
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }} className={`min-w-[165px] rounded-xl border px-3 py-3 transition-colors ${isCurrent ? 'border-drishti-cyan bg-drishti-cyan/15' : isComplete ? 'border-drishti-cyan/30 bg-drishti-cyan/10' : 'border-white/10 bg-black/20 hover:bg-white/10'}`}>
                  <div className="text-2xl">{step.emoji}</div>
                  <div className="mt-2 text-[11px] font-semibold text-white">{step.label}</div>
                  <div className="mt-1 text-[10px] text-gray-500">{step.time}</div>
                </motion.div>
                {index < replaySteps.length - 1 && <div className={`h-px w-8 shrink-0 ${isComplete ? 'bg-drishti-cyan' : 'bg-white/15'}`} />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
