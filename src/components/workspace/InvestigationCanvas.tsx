'use client';

import { motion } from 'framer-motion';
import { MapPin, FileSearch, Users, ShieldAlert } from 'lucide-react';

const entities = [
  { label: 'Victim', detail: 'Witness statement', icon: FileSearch, color: 'text-cyan-400' },
  { label: 'Crime Scene', detail: 'ORR stretch', icon: MapPin, color: 'text-orange-400' },
  { label: 'Suspect', detail: 'Known associate', icon: Users, color: 'text-purple-400' },
  { label: 'Evidence', detail: 'Vehicle plate / CCTV', icon: ShieldAlert, color: 'text-red-400' },
];

export default function InvestigationCanvas() {
  return (
    <div className="h-full rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(6,182,212,0.16),_transparent_55%)] p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-[10px] uppercase tracking-[0.24em] text-drishti-cyan">Investigation Canvas</div>
          <div className="text-sm font-semibold text-white">Live detective board</div>
        </div>
        <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] text-gray-400">
          Auto-updating case view
        </div>
      </div>

      <div className="relative h-[320px] overflow-hidden rounded-2xl border border-white/10 bg-black/20">
        <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-drishti-cyan/20" />
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />

        {entities.map((entity, index) => {
          const position = [
            { left: '18%', top: '28%' },
            { left: '72%', top: '30%' },
            { left: '18%', top: '70%' },
            { left: '72%', top: '70%' },
          ][index];

          const Icon = entity.icon;

          return (
            <motion.div
              key={entity.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.12 }}
              className="absolute rounded-2xl border border-white/10 bg-white/5 px-3 py-2 backdrop-blur"
              style={position}
            >
              <div className="flex items-center gap-2">
                <div className={`rounded-full bg-white/10 p-1.5 ${entity.color}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-white">{entity.label}</div>
                  <div className="text-[10px] text-gray-400">{entity.detail}</div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
