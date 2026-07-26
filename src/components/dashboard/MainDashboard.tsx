'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Activity, Radar, Crosshair, ShieldAlert, TrendingUp, BarChart3, AlertTriangle, HelpCircle, ClipboardList } from 'lucide-react';
import TimelineReplay from '@/components/visualizers/TimelineReplay';
import NetworkGraph from '@/components/intelligence/NetworkGraph';
import ChatInterface from '@/components/copilot/ChatInterface';
import AgentPipeline from '@/components/agent/AgentPipeline';
import BrainCircuit from '@/components/ui/icons/BrainCircuit';
import RiskForecastCard from '@/components/intelligence/RiskForecastCard';
import ActionRecommendations from '@/components/intelligence/ActionRecommendations';
import ConfidenceMeter from '@/components/ui/ConfidenceMeter';
import WhyModal from '@/components/intelligence/WhyModal';
import AuditLogs from '@/components/tools/AuditLogs';
import NLFilterBar from '@/components/dashboard/NLFilterBar';
import InvestigationCanvas from '@/components/workspace/InvestigationCanvas';
import DetectiveAutoWorkflow from '@/components/workspace/DetectiveAutoWorkflow';
import BriefingGenerator from '@/components/intelligence/BriefingGenerator';

type Module = 'timeline' | 'network' | 'heatmap' | 'forecast';
type RightPanel = 'threats' | 'forecast' | 'recommendations' | 'audit';

const rightTabs: { id: RightPanel; label: string; icon: React.ReactNode }[] = [
  { id: 'threats', label: 'Threats', icon: <ShieldAlert className="w-3 h-3" /> },
  { id: 'forecast', label: 'Forecast', icon: <TrendingUp className="w-3 h-3" /> },
  { id: 'recommendations', label: 'Actions', icon: <Zap className="w-3 h-3" /> },
  { id: 'audit', label: 'Audit', icon: <ClipboardList className="w-3 h-3" /> },
];

const DEFAULT_METRICS = [
  { label: 'Open FIRs', value: '127', delta: '+3 today', color: 'text-red-400' },
  { label: 'Suspects Tracked', value: '84', delta: 'Live', color: 'text-orange-400' },
  { label: 'Risk Zones', value: '5', delta: '↑ from 3', color: 'text-yellow-400' },
  { label: 'Cases Solved', value: '341', delta: 'This month', color: 'text-green-400' },
];

export default function MainDashboard() {
  const [activeModule, setActiveModule] = useState<Module>('network');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isPipelineActive, setIsPipelineActive] = useState(false);
  const [rightPanel, setRightPanel] = useState<RightPanel>('threats');
  const [whyOpen, setWhyOpen] = useState(false);
  const [nlQuery, setNlQuery] = useState('');
  const [nlSummary, setNlSummary] = useState('Investigation focus');
  const [nlFilters, setNlFilters] = useState<string[]>(['Live intelligence', 'Open cases']);

  const handleQueryChange = (query: string, summary: string, filters: string[]) => {
    setNlQuery(query);
    setNlSummary(summary);
    setNlFilters(filters);
  };

  const liveMetrics = useMemo(() => {
    const lowerQuery = nlQuery.toLowerCase();

    if (lowerQuery.includes('chain snatching')) {
      return [
        { label: 'Chain Snatching', value: '34', delta: 'Last 30 days', color: 'text-red-400' },
        { label: 'Vehicle Matches', value: '14', delta: 'Black Pulsar', color: 'text-orange-400' },
        { label: 'Hotspot Density', value: 'High', delta: 'Mysuru West', color: 'text-yellow-400' },
        { label: 'Priority', value: 'Critical', delta: 'Weekend focus', color: 'text-green-400' },
      ];
    }

    if (lowerQuery.includes('repeat offender')) {
      return [
        { label: 'Repeat Offenders', value: '12', delta: 'Flagged', color: 'text-red-400' },
        { label: 'Priority Cases', value: '6', delta: 'High risk', color: 'text-orange-400' },
        { label: 'District Links', value: '3', delta: 'Belagavi', color: 'text-yellow-400' },
        { label: 'Follow-up', value: 'Live', delta: 'Monitor now', color: 'text-green-400' },
      ];
    }

    if (lowerQuery.includes('burglary') || lowerQuery.includes('hotspot')) {
      return [
        { label: 'Hotspot Risk', value: '92%', delta: 'Whitefield', color: 'text-red-400' },
        { label: 'Crowd Surge', value: '8k', delta: 'Expected', color: 'text-orange-400' },
        { label: 'Patrol Gap', value: '2 hrs', delta: 'Needs fill', color: 'text-yellow-400' },
        { label: 'Deploy', value: 'Immediate', delta: 'Critical', color: 'text-green-400' },
      ];
    }

    return DEFAULT_METRICS;
  }, [nlQuery]);

  return (
    <>
    <WhyModal isOpen={whyOpen} onClose={() => setWhyOpen(false)} />
    <div className="h-screen bg-[#0B0F19] text-white flex flex-col overflow-hidden relative">
      <AgentPipeline isActive={isPipelineActive} onComplete={() => setIsPipelineActive(false)} />

      {/* Ambient background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-drishti-cyan/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* ── HEADER ── */}
      <header className="glass-panel border-b border-white/5 h-16 flex items-center justify-between px-6 z-20 shrink-0">
        <div className="flex items-center gap-3">
          <BrainCircuit className="w-8 h-8 text-drishti-cyan" />
          <h1 className="text-xl font-bold tracking-widest text-white">
            DRISHTI<span className="text-drishti-cyan">-X</span>
          </h1>
          <div className="h-4 w-[1px] bg-white/20 mx-2" />
          <span className="text-xs font-mono text-drishti-cyan bg-drishti-cyan/10 px-2 py-1 rounded border border-drishti-cyan/20 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-drishti-cyan animate-pulse" />
            AI AGENTS ACTIVE
          </span>
        </div>

        {/* Live metrics strip */}
        <div className="hidden lg:flex items-center gap-6">
          {liveMetrics.map((m) => (
            <div key={m.label} className="text-center">
              <div className={`text-lg font-bold leading-none ${m.color}`}>{m.value}</div>
              <div className="text-[10px] text-gray-500">{m.label}</div>
              <div className="text-[9px] text-gray-600">{m.delta}</div>
            </div>
          ))}
        </div>

        <div className="flex gap-3 items-center">
          <button
            onClick={() => setIsPipelineActive(true)}
            className="flex items-center gap-2 bg-drishti-cyan/20 text-drishti-cyan px-4 py-1.5 rounded-full border border-drishti-cyan/50 hover:bg-drishti-cyan/40 transition-all text-sm font-bold"
          >
            <Zap className="w-4 h-4" />
            Auto-Investigate
          </button>
          <button className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Intelligence Brief</button>
          <button className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Audit Logs</button>
          <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-drishti-cyan to-blue-600" />
            <span className="text-sm font-semibold">SP Profile</span>
          </div>
        </div>
      </header>

      {/* ── MAIN 3-COLUMN LAYOUT ── */}
      <main className="flex-1 flex min-h-0 overflow-hidden z-10 p-4 gap-4">

        {/* ── LEFT: Copilot Chat ── */}
        <section className="w-[360px] flex flex-col glass-panel rounded-xl overflow-hidden relative border border-white/10 shrink-0">
          <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
            <h2 className="font-semibold text-gray-200 flex items-center gap-2">
              <Activity className="w-4 h-4 text-drishti-cyan" />
              Investigation Copilot
            </h2>
            {isAnalyzing && (
              <span className="text-[10px] font-mono text-drishti-cyan flex items-center gap-1 animate-pulse">
                <span className="w-1.5 h-1.5 bg-drishti-cyan rounded-full" /> ANALYZING
              </span>
            )}
          </div>
          <div className="flex-1 overflow-hidden">
            <ChatInterface
              onAnalyzeStart={() => setIsAnalyzing(true)}
              onAnalyzeEnd={() => setIsAnalyzing(false)}
              onQueryChange={handleQueryChange}
            />
          </div>
        </section>

        {/* ── CENTER: Canvas Workspace ── */}
        <section className="flex-1 flex flex-col min-h-0 glass-panel rounded-xl overflow-hidden border border-white/10 relative">
          {/* Module tab bar */}
          <div className="p-3 border-b border-white/10 bg-white/5 flex gap-2 flex-wrap">
            {(
              [
                { id: 'network', label: 'Network Graph', icon: <BarChart3 className="w-3 h-3" /> },
                { id: 'timeline', label: 'Case Timeline', icon: <Activity className="w-3 h-3" /> },
                { id: 'forecast', label: 'Risk Heatmap', icon: <AlertTriangle className="w-3 h-3" /> },
              ] as { id: Module; label: string; icon: React.ReactNode }[]
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveModule(tab.id)}
                className={`px-4 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 ${
                  activeModule === tab.id
                    ? 'bg-drishti-cyan/20 text-drishti-cyan border border-drishti-cyan/30'
                    : 'text-gray-400 hover:bg-white/5'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          <div className="flex-1 min-h-0 relative overflow-hidden flex flex-col">
            <div className="shrink-0">
              <NLFilterBar query={nlQuery} summary={nlSummary} filters={nlFilters} />
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-4">
              {activeModule === 'network' ? (
                <div className="h-full min-h-[420px]">
                  <NetworkGraph />
                </div>
              ) : activeModule === 'timeline' ? (
                <div className="h-full min-h-[420px]">
                  <TimelineReplay />
                </div>
              ) : activeModule === 'forecast' ? (
                <div className="h-full min-h-[420px]">
                  <RiskForecastCard />
                </div>
              ) : (
                <div className="space-y-4">
                  <InvestigationCanvas />
                  <DetectiveAutoWorkflow />
                  <BriefingGenerator />
                </div>
              )}
            </div>

            {/* Analyzing overlay */}
            <AnimatePresence>
              {isAnalyzing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-50 bg-[#0B0F19]/85 backdrop-blur-sm flex flex-col items-center justify-center"
                >
                  <div className="relative w-32 h-32 flex items-center justify-center mb-6">
                    <div className="absolute inset-0 rounded-full border border-drishti-cyan/20" />
                    <div
                      className="absolute inset-0 rounded-full border border-drishti-cyan border-t-transparent animate-spin"
                      style={{ animationDuration: '3s' }}
                    />
                    <div
                      className="absolute inset-2 rounded-full border border-drishti-cyan/50 border-b-transparent animate-spin"
                      style={{ animationDuration: '2s', animationDirection: 'reverse' }}
                    />
                    <Radar className="w-10 h-10 text-drishti-cyan absolute" />
                    <div
                      className="absolute top-1/2 left-1/2 w-16 h-16 origin-top-left bg-gradient-to-br from-drishti-cyan/30 to-transparent animate-spin"
                      style={{ animationDuration: '3s' }}
                    />
                  </div>
                  <h3 className="text-lg font-mono text-drishti-cyan tracking-widest uppercase mb-3">
                    Analyzing Patterns...
                  </h3>
                  <div className="flex gap-6">
                    <ConfidenceMeter value={87} label="Pattern Match" size="sm" />
                    <ConfidenceMeter value={72} label="Suspect Link" size="sm" color="#f97316" />
                    <ConfidenceMeter value={94} label="Risk Forecast" size="sm" color="#ef4444" />
                  </div>
                  <div className="flex gap-2 mt-4">
                    {['Searching FIRs', 'Linking Suspects', 'Predicting Risk'].map((step, i) => (
                      <span
                        key={step}
                        className="text-[10px] text-gray-500 font-mono bg-white/5 px-2 py-1 rounded animate-pulse"
                        style={{ animationDelay: `${i * 0.4}s` }}
                      >
                        {step}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </section>

        {/* ── RIGHT: Intelligence Panel ── */}
        <section className="w-[320px] flex flex-col gap-0 shrink-0">
          {/* Tab switcher */}
          <div className="glass-panel rounded-t-xl border border-white/10 border-b-0 p-2 flex gap-1">
            {rightTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setRightPanel(tab.id)}
                className={`flex-1 py-1.5 rounded-md text-[11px] font-medium transition-all flex items-center justify-center gap-1.5 ${
                  rightPanel === tab.id
                    ? 'bg-drishti-cyan/20 text-drishti-cyan border border-drishti-cyan/30'
                    : 'text-gray-400 hover:bg-white/5'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* Panel content */}
          <div className="flex-1 glass-panel rounded-b-xl border border-white/10 border-t-0 p-4 overflow-hidden">
            <AnimatePresence mode="wait">
              {rightPanel === 'threats' && (
                <motion.div
                  key="threats"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="h-full overflow-y-auto space-y-3 pr-1"
                >
                  <h3 className="font-semibold text-gray-200 mb-3 flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-red-400" />
                    Active Threats
                  </h3>
                  {/* Confidence meters row */}
                  <div className="flex justify-around py-3 border border-white/5 rounded-xl bg-white/5 mb-3">
                    <ConfidenceMeter value={92} label="Whitefield" size="sm" color="#ef4444" />
                    <ConfidenceMeter value={78} label="KR Market" size="sm" color="#f97316" />
                    <ConfidenceMeter value={68} label="Mangaluru" size="sm" color="#eab308" />
                  </div>
                  {[
                    { pct: '92%', label: 'Whitefield Weekend Surge', color: 'red', detail: 'Chain snatching — Gang-7 active' },
                    { pct: '78%', label: 'KR Market Pickpocket Zone', color: 'orange', detail: 'Burglary — Fri–Sun spike' },
                    { pct: '68%', label: 'Mangaluru Port Narcotics', color: 'yellow', detail: 'Vessel arrival window' },
                    { pct: '55%', label: 'NH-48 Vehicle Theft', color: 'yellow', detail: 'Night hours — low patrol' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className={`p-3 bg-${item.color}-900/20 border border-${item.color}-500/20 rounded-lg`}
                    >
                      <div className={`text-xs text-${item.color}-400 font-bold uppercase mb-0.5`}>
                        {item.pct} Risk Level
                      </div>
                      <div className="text-sm text-gray-200 font-medium">{item.label}</div>
                      <div className="text-[11px] text-gray-500 mt-0.5">{item.detail}</div>
                      <button
                        onClick={() => setWhyOpen(true)}
                        className="mt-2 text-[10px] font-bold text-drishti-cyan bg-drishti-cyan/10 hover:bg-drishti-cyan/20 border border-drishti-cyan/30 px-2.5 py-1 rounded-full flex items-center gap-1 transition-all"
                      >
                        <HelpCircle className="w-3 h-3" /> Why?
                      </button>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {rightPanel === 'forecast' && (
                <motion.div
                  key="forecast"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="h-full"
                >
                  <RiskForecastCard />
                </motion.div>
              )}

              {rightPanel === 'recommendations' && (
                <motion.div
                  key="recommendations"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="h-full"
                >
                  <ActionRecommendations />
                </motion.div>
              )}

              {rightPanel === 'audit' && (
                <motion.div
                  key="audit"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="h-full"
                >
                  <AuditLogs />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>
    </div>
    </>
  );
}
