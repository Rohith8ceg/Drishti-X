import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { getTimelineEvents } from '@/lib/mockData';

const replaySteps = [
  { emoji: '🚨', label: 'Incident logged' },
  { emoji: '📹', label: 'CCTV reviewed' },
  { emoji: '🚗', label: 'Vehicle linked' },
  { emoji: '🤖', label: 'AI recommendation' },
];

export default function TimelineReplay() {
  const [events, setEvents] = useState<Array<{ time: string; title: string }>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const data = getTimelineEvents();
    setEvents(data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!playing || events.length === 0) return;

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % events.length);
    }, 900);

    return () => window.clearInterval(timer);
  }, [playing, events.length]);

  const currentEvent = useMemo(() => events[activeIndex] ?? events[0], [events, activeIndex]);

  return (
    <div className="glass-panel p-4 rounded-lg shadow-lg max-w-4xl mx-auto h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-drishti-cyan">Case Replay</h2>
          <p className="text-xs text-gray-400">Cinematic investigation timeline</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setPlaying((prev) => !prev)}
            className="rounded-full border border-drishti-cyan/40 bg-drishti-cyan/10 px-3 py-1.5 text-[11px] font-semibold text-drishti-cyan flex items-center gap-2"
          >
            {playing ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {playing ? 'Pause' : 'Play'}
          </button>
          <button
            onClick={() => {
              setPlaying(false);
              setActiveIndex(0);
            }}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-semibold text-gray-200 flex items-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-48">
          <svg className="animate-spin h-8 w-8 text-drishti-cyan" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
          </svg>
        </div>
      ) : (
        <>
          <div className="mb-4 rounded-2xl border border-white/10 bg-black/20 p-3">
            <div className="text-[10px] uppercase tracking-[0.24em] text-drishti-cyan">Current frame</div>
            <div className="mt-2 text-sm font-semibold text-white">{currentEvent?.title}</div>
            <div className="text-[11px] text-gray-400">{currentEvent?.time}</div>
          </div>

          <div className="flex-1 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex gap-3 overflow-x-auto pb-2">
              {replaySteps.map((step, index) => {
                const isActive = index <= activeIndex % replaySteps.length;
                return (
                  <motion.div
                    key={step.label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 }}
                    className={`min-w-[120px] rounded-xl border px-3 py-3 ${isActive ? 'border-drishti-cyan/30 bg-drishti-cyan/10' : 'border-white/10 bg-black/20'}`}
                  >
                    <div className="text-2xl">{step.emoji}</div>
                    <div className="mt-2 text-[11px] font-semibold text-white">{step.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
