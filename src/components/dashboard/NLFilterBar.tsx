'use client';

import { Sparkles, Filter, MapPin, Clock3 } from 'lucide-react';

interface NLFilterBarProps {
  query: string;
  summary: string;
  filters: string[];
}

export default function NLFilterBar({ query, summary, filters }: NLFilterBarProps) {
  return (
    <div className="px-4 pb-3">
      <div className="glass-panel rounded-xl border border-white/10 bg-white/5 p-3">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-drishti-cyan mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          Natural language focus
        </div>

        <div className="flex flex-wrap items-center gap-2 text-sm text-white">
          <span className="rounded-full border border-drishti-cyan/30 bg-drishti-cyan/10 px-3 py-1 text-[11px] font-medium">
            {summary}
          </span>
          {filters.map((filter) => (
            <span
              key={filter}
              className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-gray-300"
            >
              {filter.includes('Mysuru') || filter.includes('Whitefield') || filter.includes('Belagavi') ? (
                <MapPin className="w-3 h-3" />
              ) : (
                <Clock3 className="w-3 h-3" />
              )}
              {filter}
            </span>
          ))}
        </div>

        <div className="mt-2 flex items-center gap-2 text-[11px] text-gray-400">
          <Filter className="w-3.5 h-3.5" />
          <span className="truncate">{query || 'Ask the copilot to focus the investigation board.'}</span>
        </div>
      </div>
    </div>
  );
}
