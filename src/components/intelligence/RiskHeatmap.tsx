'use client';

const hotspots = [
  { name: 'Whitefield – ORR', position: { left: '77%', top: '52%' }, risk: 92, color: '#ef4444' },
  { name: 'KR Market', position: { left: '53%', top: '61%' }, risk: 78, color: '#f97316' },
  { name: 'Mysuru Palace Road', position: { left: '31%', top: '81%' }, risk: 44, color: '#eab308' },
];

export default function RiskHeatmap() {
  return (
    <div className="relative h-44 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-[#09131d]" aria-label="Karnataka predictive risk map">
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute left-[21%] top-[21%] text-[10px] font-mono tracking-[0.22em] text-cyan-100/60">KARNATAKA · PREDICTIVE RISK</div>
      <div className="absolute left-[12%] top-[34%] h-20 w-56 rotate-[15deg] rounded-[48%] border border-cyan-300/20 bg-cyan-400/5" />
      {hotspots.map((hotspot) => (
        <div key={hotspot.name} className="group absolute -translate-x-1/2 -translate-y-1/2" style={hotspot.position}>
          <div className="h-5 w-5 rounded-full border-2 border-white/80 shadow-[0_0_18px_currentColor]" style={{ color: hotspot.color, backgroundColor: hotspot.color }} />
          <div className="pointer-events-none absolute bottom-7 left-1/2 z-10 w-max -translate-x-1/2 rounded bg-black/90 px-2 py-1 text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100">
            {hotspot.name}: {hotspot.risk}% risk
          </div>
        </div>
      ))}
      <div className="absolute bottom-2 right-3 text-[9px] text-gray-400">Hover a hotspot for risk detail</div>
    </div>
  );
}
