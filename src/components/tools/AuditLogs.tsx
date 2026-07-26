'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipboardList, Shield, MessageSquare, Bot, TrendingUp, FileText, User, ChevronDown, ChevronUp } from 'lucide-react';

type LogLevel = 'info' | 'warning' | 'ai' | 'action' | 'system';

interface AuditEntry {
  id: string;
  timestamp: string;
  level: LogLevel;
  agent: string;
  message: string;
  detail?: string;
  metadata?: Record<string, string | number>;
}

const INITIAL_LOGS: AuditEntry[] = [
  {
    id: 'a1',
    timestamp: '2026-07-26 07:02:11',
    level: 'system',
    agent: 'System',
    message: 'DRISHTI-X session started — SP Rohith Kumar authenticated',
    metadata: { Role: 'Superintendent of Police', District: 'Bengaluru Urban', Session: 'SES-9821' },
  },
  {
    id: 'a2',
    timestamp: '2026-07-26 07:02:14',
    level: 'ai',
    agent: 'Analyst Agent',
    message: 'Daily delta computed — 4 new criminal networks, 12 repeat offenders flagged',
    detail: 'Cross-referenced 505 crimes across 5 districts. Hotspot delta since yesterday: +2 zones.',
  },
  {
    id: 'a3',
    timestamp: '2026-07-26 07:04:33',
    level: 'info',
    agent: 'Investigator Agent',
    message: 'Query received: "Show chain snatching cases near Whitefield on weekends"',
    detail: 'NL parsed → type:Chain Snatching, zone:Whitefield, temporal:Weekend. Matched 34 FIRs.',
  },
  {
    id: 'a4',
    timestamp: '2026-07-26 07:04:37',
    level: 'ai',
    agent: 'Predictor Agent',
    message: 'Risk forecast computed — Whitefield ORR: 92% (CRITICAL)',
    detail: '4 signals converged: temporal pattern (88%), suspect proximity (79%), crowd density (85%), network activity (91%).',
    metadata: { Confidence: '92%', Zone: 'Whitefield ORR', Window: 'Next 48 hrs' },
  },
  {
    id: 'a5',
    timestamp: '2026-07-26 07:04:39',
    level: 'warning',
    agent: 'Legal Agent',
    message: 'Applicable IPC sections identified: §379, §356, §34',
    detail: 'Based on historical case pattern match (similarity: 94% to FIR-2025-441).',
  },
  {
    id: 'a6',
    timestamp: '2026-07-26 07:04:41',
    level: 'action',
    agent: 'Reporter Agent',
    message: 'Recommendation generated: Deploy 2 patrol units — Whitefield ORR (Fri–Sun 8PM–2AM)',
    detail: 'Action logged and pending SP approval. Priority: CRITICAL.',
  },
  {
    id: 'a7',
    timestamp: '2026-07-26 07:06:12',
    level: 'info',
    agent: 'Investigator Agent',
    message: 'Network Graph rendered — 25 criminal networks, 155 suspects, 487 edges',
  },
  {
    id: 'a8',
    timestamp: '2026-07-26 07:08:55',
    level: 'action',
    agent: 'SP Rohith Kumar',
    message: 'Action executed: "Activate CCTV Monitoring — KR Market Bus Depot"',
    metadata: { Status: 'Dispatched', Unit: 'Tech Surveillance Cell', Priority: 'CRITICAL' },
  },
  {
    id: 'a9',
    timestamp: '2026-07-26 07:09:20',
    level: 'ai',
    agent: 'Analyst Agent',
    message: 'Pattern explainer triggered — Vehicle theft NH-48 cluster identified',
    detail: 'Suspect vehicle KA-25-M-3421 pinged 3× in 6 hrs. Low patrol density window: 01:00–04:00.',
  },
  {
    id: 'a10',
    timestamp: '2026-07-26 07:11:03',
    level: 'system',
    agent: 'System',
    message: 'Auto-Investigate pipeline triggered by SP',
    detail: '5 agents spawned in parallel. ETA: 12 seconds.',
    metadata: { Agents: 5, Crimes: 505, Suspects: 155 },
  },
];

const levelConfig: Record<LogLevel, { icon: React.ReactNode; color: string; bg: string; border: string; label: string }> = {
  system: {
    icon: <Shield className="w-3 h-3" />,
    color: 'text-gray-400',
    bg: 'bg-gray-800/40',
    border: 'border-gray-600/30',
    label: 'SYSTEM',
  },
  ai: {
    icon: <Bot className="w-3 h-3" />,
    color: 'text-drishti-cyan',
    bg: 'bg-cyan-900/20',
    border: 'border-cyan-500/30',
    label: 'AI',
  },
  info: {
    icon: <MessageSquare className="w-3 h-3" />,
    color: 'text-blue-400',
    bg: 'bg-blue-900/15',
    border: 'border-blue-500/20',
    label: 'INFO',
  },
  warning: {
    icon: <TrendingUp className="w-3 h-3" />,
    color: 'text-yellow-400',
    bg: 'bg-yellow-900/15',
    border: 'border-yellow-500/20',
    label: 'WARN',
  },
  action: {
    icon: <FileText className="w-3 h-3" />,
    color: 'text-green-400',
    bg: 'bg-green-900/15',
    border: 'border-green-500/20',
    label: 'ACTION',
  },
};

function LogRow({ entry, idx }: { entry: AuditEntry; idx: number }) {
  const [expanded, setExpanded] = useState(false);
  const cfg = levelConfig[entry.level];

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: idx * 0.04 }}
      className={`rounded-lg border ${cfg.border} ${cfg.bg} overflow-hidden`}
    >
      <div
        className="flex items-start gap-2.5 p-2.5 cursor-pointer"
        onClick={() => (entry.detail || entry.metadata) && setExpanded(!expanded)}
      >
        {/* Level badge */}
        <div className={`shrink-0 mt-0.5 flex items-center gap-1 ${cfg.color}`}>
          {cfg.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-0.5">
            <span className={`text-[9px] font-bold tracking-widest ${cfg.color} font-mono`}>
              {cfg.label}
            </span>
            <span className="text-[10px] text-gray-500 font-mono">{entry.timestamp}</span>
            <span className="text-[10px] text-gray-400 flex items-center gap-1">
              <User className="w-2.5 h-2.5" />{entry.agent}
            </span>
          </div>
          <p className="text-[11px] text-gray-200 leading-snug">{entry.message}</p>
        </div>
        {(entry.detail || entry.metadata) && (
          <div className="shrink-0 text-gray-600">
            {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </div>
        )}
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-2.5 pb-2.5 pt-0 border-t border-white/5 space-y-2">
              {entry.detail && (
                <p className="text-[11px] text-gray-400 leading-relaxed mt-2">{entry.detail}</p>
              )}
              {entry.metadata && (
                <div className="flex flex-wrap gap-2 mt-1">
                  {Object.entries(entry.metadata).map(([k, v]) => (
                    <span key={k} className="text-[10px] font-mono bg-white/5 text-gray-300 px-2 py-0.5 rounded">
                      <span className="text-gray-500">{k}:</span> {v}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

interface AuditLogsProps {
  newEntries?: AuditEntry[];
}

export default function AuditLogs({ newEntries = [] }: AuditLogsProps) {
  const [filter, setFilter] = useState<LogLevel | 'all'>('all');
  const [logs, setLogs] = useState<AuditEntry[]>(INITIAL_LOGS);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Append new entries if passed
  useEffect(() => {
    if (newEntries.length > 0) {
      setLogs((prev) => [...prev, ...newEntries]);
    }
  }, [newEntries]);

  // Auto-scroll to bottom on new logs
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const filtered = filter === 'all' ? logs : logs.filter((l) => l.level === filter);

  const counts = {
    all: logs.length,
    ai: logs.filter(l => l.level === 'ai').length,
    action: logs.filter(l => l.level === 'action').length,
    warning: logs.filter(l => l.level === 'warning').length,
    info: logs.filter(l => l.level === 'info').length,
    system: logs.filter(l => l.level === 'system').length,
  };

  return (
    <div className="h-full flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between shrink-0">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <ClipboardList className="w-4 h-4 text-drishti-cyan" />
          Audit Trail
        </h2>
        <span className="text-[10px] font-mono text-green-400 bg-green-900/20 border border-green-500/20 px-2 py-1 rounded flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          IMMUTABLE LOG
        </span>
      </div>

      {/* Filter chips */}
      <div className="flex flex-wrap gap-1.5 shrink-0">
        {(['all', 'ai', 'action', 'warning', 'info', 'system'] as const).map((lvl) => (
          <button
            key={lvl}
            onClick={() => setFilter(lvl)}
            className={`text-[10px] font-bold px-2.5 py-1 rounded-full border transition-all ${
              filter === lvl
                ? 'bg-drishti-cyan/20 text-drishti-cyan border-drishti-cyan/40'
                : 'text-gray-500 border-white/10 hover:bg-white/5'
            }`}
          >
            {lvl.toUpperCase()} ({counts[lvl]})
          </button>
        ))}
      </div>

      {/* Log entries */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
        <AnimatePresence>
          {filtered.map((entry, idx) => (
            <LogRow key={entry.id} entry={entry} idx={idx} />
          ))}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
