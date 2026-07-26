'use client';

import { useRef } from 'react';
import { FileDown, ShieldCheck, Users, MapPin } from 'lucide-react';

export default function BriefingGenerator() {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleExport = async () => {
    if (!contentRef.current) return;

    try {
      const html2pdf = (await import('html2pdf.js')).default;
      await html2pdf().set({
        margin: 0.3,
        filename: 'drishti-x-briefing.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      }).from(contentRef.current).save();
    } catch {
      window.print();
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-[10px] uppercase tracking-[0.24em] text-drishti-cyan">Briefing Generator</div>
          <div className="text-sm font-semibold text-white">District executive summary</div>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 rounded-full border border-drishti-cyan/40 bg-drishti-cyan/10 px-3 py-1.5 text-[11px] font-semibold text-drishti-cyan"
        >
          <FileDown className="w-3.5 h-3.5" />
          Export PDF
        </button>
      </div>

      <div ref={contentRef} className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="flex items-center gap-2 text-drishti-cyan">
          <ShieldCheck className="w-4 h-4" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.24em]">DRISHTI-X briefing</span>
        </div>
        <h3 className="mt-2 text-lg font-semibold text-white">Whitefield and KR Market require immediate patrol reinforcement</h3>
        <p className="mt-2 text-sm text-gray-400">The latest intelligence review identifies 4 new networks, 12 repeat offenders, and 3 emerging hotspots across the urban district.</p>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-black/20 p-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <Users className="w-4 h-4 text-drishti-cyan" />
              Repeat offenders
            </div>
            <div className="mt-2 text-2xl font-semibold text-white">12</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-black/20 p-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <MapPin className="w-4 h-4 text-orange-400" />
              Hotspots
            </div>
            <div className="mt-2 text-2xl font-semibold text-white">3</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-black/20 p-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Recommended priority
            </div>
            <div className="mt-2 text-sm font-semibold text-emerald-400">Critical</div>
          </div>
        </div>
      </div>
    </div>
  );
}
