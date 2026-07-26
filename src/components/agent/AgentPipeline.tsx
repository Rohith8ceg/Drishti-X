'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Search, BarChart2, Network, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';
import { useEffect, useState } from 'react';

const AGENTS = [
  { id: 'investigator', name: 'Investigator Agent', icon: Search, task: 'Scanning CCTNS records...', color: 'text-blue-400', bg: 'bg-blue-400/20' },
  { id: 'analyst', name: 'Analyst Agent', icon: BarChart2, task: 'Extracting crime velocity patterns...', color: 'text-purple-400', bg: 'bg-purple-400/20' },
  { id: 'network', name: 'Network Agent', icon: Network, task: 'Tracing 3rd-degree suspect ties...', color: 'text-orange-400', bg: 'bg-orange-400/20' },
  { id: 'predictor', name: 'Predictor Agent', icon: ShieldCheck, task: 'Calculating spatial risk matrix...', color: 'text-red-400', bg: 'bg-red-400/20' },
  { id: 'reporter', name: 'Reporter Agent', icon: FileText, task: 'Compiling executive intelligence...', color: 'text-green-400', bg: 'bg-green-400/20' }
];

export default function AgentPipeline({ isActive, onComplete }: { isActive: boolean, onComplete?: () => void }) {
  const [activeAgentIndex, setActiveAgentIndex] = useState(-1);

  useEffect(() => {
    if (isActive) {
      setActiveAgentIndex(0);
      
      const interval = setInterval(() => {
        setActiveAgentIndex(prev => {
          if (prev >= AGENTS.length - 1) {
            clearInterval(interval);
            setTimeout(() => onComplete?.(), 1000);
            return prev + 1; // All complete
          }
          return prev + 1;
        });
      }, 1500); // Sequence every 1.5s
      
      return () => clearInterval(interval);
    } else {
      setActiveAgentIndex(-1);
    }
  }, [isActive, onComplete]);

  if (!isActive && activeAgentIndex === -1) return null;

  return (
    <div className="absolute inset-0 z-50 bg-[#0B0F19]/90 backdrop-blur-md flex flex-col items-center justify-center p-8 overflow-hidden">
      
      {/* Background Tech Rings */}
      <div className="absolute w-[600px] h-[600px] border border-drishti-cyan/10 rounded-full animate-[spin_20s_linear_infinite]"></div>
      <div className="absolute w-[800px] h-[800px] border border-drishti-cyan/5 rounded-full animate-[spin_30s_linear_infinite_reverse]"></div>
      
      <h2 className="text-3xl font-mono text-drishti-cyan uppercase tracking-[0.3em] mb-12 text-glow-cyan">
        Autonomous Orchestration
      </h2>

      <div className="flex flex-col gap-4 w-full max-w-2xl relative z-10">
        <AnimatePresence>
          {AGENTS.map((agent, index) => {
            const isWaiting = index > activeAgentIndex;
            const isWorking = index === activeAgentIndex;
            const isDone = index < activeAgentIndex;
            
            const Icon = agent.icon;

            return (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: isWaiting ? 0.3 : 1, x: 0, scale: isWorking ? 1.05 : 1 }}
                className={`flex items-center gap-6 p-4 rounded-xl border transition-all duration-500 ${isWorking ? 'bg-white/10 border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.1)]' : 'bg-black/40 border-white/5'}`}
              >
                <div className={`p-3 rounded-full ${agent.bg} relative`}>
                  {isWorking && (
                    <div className={`absolute inset-0 rounded-full border-2 border-t-transparent animate-spin ${agent.color.replace('text', 'border')}`}></div>
                  )}
                  <Icon className={`w-6 h-6 ${isDone ? 'text-gray-500' : agent.color}`} />
                </div>
                
                <div className="flex-1">
                  <h3 className={`font-bold ${isDone ? 'text-gray-500 line-through' : 'text-white'}`}>{agent.name}</h3>
                  <p className={`text-sm font-mono mt-1 ${isWorking ? agent.color : 'text-gray-500'}`}>
                    {isDone ? 'Task Completed.' : agent.task}
                  </p>
                </div>

                {isDone && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    <CheckCircle2 className="w-8 h-8 text-drishti-cyan" />
                  </motion.div>
                )}
                {isWorking && (
                  <div className="flex gap-1">
                    <span className={`w-1.5 h-1.5 rounded-full ${agent.bg.replace('/20', '')} animate-bounce`} style={{ animationDelay: '0ms' }}></span>
                    <span className={`w-1.5 h-1.5 rounded-full ${agent.bg.replace('/20', '')} animate-bounce`} style={{ animationDelay: '150ms' }}></span>
                    <span className={`w-1.5 h-1.5 rounded-full ${agent.bg.replace('/20', '')} animate-bounce`} style={{ animationDelay: '300ms' }}></span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
