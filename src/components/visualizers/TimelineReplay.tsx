import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getTimelineEvents } from '@/lib/mockData';

export default function TimelineReplay() {
  const [events, setEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const data = getTimelineEvents();
    setEvents(data);
    setIsLoading(false);
  }, []);

  return (
    <div className="glass-panel p-4 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-drishti-cyan">Case Replay</h2>
      {isLoading ? (
        <div className="flex items-center justify-center h-48">
          <svg className="animate-spin h-8 w-8 text-drishti-cyan" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
          </svg>
        </div>
      ) : (
        <div className="relative h-64 overflow-x-auto">
          {events.map((e, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-mono">{e.time}</span>
                <span className="font-medium">{e.title}</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
