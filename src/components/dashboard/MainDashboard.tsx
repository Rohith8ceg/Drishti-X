'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Crosshair, Radar, BrainCircuit, Activity, Zap } from 'lucide-react';
import ChatInterface from '@/components/copilot/ChatInterface';
import AgentPipeline from '@/components/agent/AgentPipeline';

export default function MainDashboard() {
  const [activeModule, setActiveModule] = useState<'timeline' | 'network' | 'heatmap'>('network');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isPipelineActive, setIsPipelineActive] = useState(false);

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white flex flex-col overflow-hidden relative">
      <AgentPipeline isActive={isPipelineActive} onComplete={() => setIsPipelineActive(false)} />
      {/* Background ambient grid & glowing orbs */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-drishti-cyan/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      {/* Header Bar */}
      <header className="glass-panel border-b border-white/5 h-16 flex items-center justify-between px-6 z-20">
        <div className="flex items-center gap-3">
          <BrainCircuit className="w-8 h-8 text-drishti-cyan" />
          <h1 className="text-xl font-bold tracking-widest text-white">
            DRISHTI<span className="text-drishti-cyan">-X</span>
          </h1>
          <div className="h-4 w-[1px] bg-white/20 mx-2"></div>
          <span className="text-xs font-mono text-drishti-cyan bg-drishti-cyan/10 px-2 py-1 rounded border border-drishti-cyan/20 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-drishti-cyan animate-pulse"></span>
            AI AGENTS ACTIVE
          </span>
        </div>
        
        <div className="flex gap-4">
          <button onClick={() => setIsPipelineActive(true)} className="flex items-center gap-2 bg-drishti-cyan/20 text-drishti-cyan px-4 py-1 rounded-full border border-drishti-cyan/50 hover:bg-drishti-cyan/40 transition-colors">
            <Zap className="w-4 h-4" />
            <span className="text-sm font-bold">Auto-Investigate</span>
          </button>
          <button className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Intelligence Brief</button>
          <button className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Audit Logs</button>
          <div className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full border border-white/10">
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-drishti-cyan to-blue-600"></div>
            <span className="text-sm font-semibold">SP Profile</span>
          </div>
        </div>
      </header>

      {/* 3-Column Layout */}
      <main className="flex-1 flex overflow-hidden z-10 p-4 gap-4">
        
        {/* Left: Chat Copilot (Module 1) */}
        <section className="w-[380px] flex flex-col glass-panel rounded-xl overflow-hidden relative border border-white/10">
          <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
            <h2 className="font-semibold text-gray-200 flex items-center gap-2">
              <Activity className="w-4 h-4 text-drishti-cyan" />
              Investigation Copilot
            </h2>
          </div>
          <div className="flex-1 overflow-hidden relative">
            <ChatInterface onAnalyzeStart={() => setIsAnalyzing(true)} onAnalyzeEnd={() => setIsAnalyzing(false)} />
          </div>
        </section>

        {/* Center: Canvas Workspace (Standout 7) */}
        <section className="flex-1 flex flex-col glass-panel rounded-xl overflow-hidden border border-white/10 relative">
          <div className="p-3 border-b border-white/10 bg-white/5 flex gap-2">
            <button onClick={() => setActiveModule('network')} className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${activeModule === 'network' ? 'bg-drishti-cyan/20 text-drishti-cyan border border-drishti-cyan/30' : 'text-gray-400 hover:bg-white/5'}`}>Network Graph</button>
            <button onClick={() => setActiveModule('timeline')} className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${activeModule === 'timeline' ? 'bg-drishti-cyan/20 text-drishti-cyan border border-drishti-cyan/30' : 'text-gray-400 hover:bg-white/5'}`}>Investigation Timeline</button>
            <button onClick={() => setActiveModule('heatmap')} className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${activeModule === 'heatmap' ? 'bg-drishti-cyan/20 text-drishti-cyan border border-drishti-cyan/30' : 'text-gray-400 hover:bg-white/5'}`}>Risk Heatmap</button>
          </div>
          
          <div className="flex-1 relative flex items-center justify-center p-8">
            {/* Analyzing Overlay */}
            {isAnalyzing && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 z-50 bg-[#0B0F19]/80 backdrop-blur-sm flex flex-col items-center justify-center"
              >
                <div className="relative w-32 h-32 flex items-center justify-center mb-6">
                  {/* Radar Scanner Animation */}
                  <div className="absolute inset-0 rounded-full border border-drishti-cyan/30"></div>
                  <div className="absolute inset-0 rounded-full border border-drishti-cyan border-t-transparent animate-spin" style={{ animationDuration: '3s' }}></div>
                  <div className="absolute inset-2 rounded-full border border-drishti-cyan/50 border-b-transparent animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }}></div>
                  <Radar className="w-10 h-10 text-drishti-cyan absolute" />
                  
                  {/* Scanning beam */}
                  <div className="absolute top-1/2 left-1/2 w-16 h-16 origin-top-left bg-gradient-to-br from-drishti-cyan/40 to-transparent animate-spin" style={{ animationDuration: '3s' }}></div>
                </div>
                <h3 className="text-xl font-mono text-drishti-cyan tracking-widest uppercase text-glow-cyan mb-2">Analyzing Patterns...</h3>
                <div className="flex gap-2">
                  <span className="w-2 h-2 rounded-full bg-drishti-cyan animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-2 h-2 rounded-full bg-drishti-cyan animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-2 h-2 rounded-full bg-drishti-cyan animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </motion.div>
            )}
            
            {/* Placeholder for Canvas Modules */}
            <div className="text-center">
              <Crosshair className="w-16 h-16 text-gray-700 mx-auto mb-4" />
              <p className="text-gray-500 font-mono">CANVAS RENDERER WAITING FOR QUERY...</p>
            </div>
          </div>
        </section>

        {/* Right: Insights & Recommendations */}
        <section className="w-[320px] flex flex-col gap-4">
          <div className="flex-1 glass-panel rounded-xl p-5 border border-white/10">
            <h3 className="font-semibold text-gray-200 mb-4 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-drishti-red" />
              Active Threats
            </h3>
            {/* Placeholder items */}
            <div className="space-y-3">
              <div className="p-3 bg-red-900/20 border border-red-500/20 rounded-lg">
                <div className="text-xs text-red-400 font-bold uppercase mb-1">92% Risk Level</div>
                <div className="text-sm text-gray-300">Whitefield Weekend Surge Predicted</div>
              </div>
            </div>
          </div>
          
          <div className="h-[250px] glass-panel rounded-xl p-5 border border-white/10">
            <h3 className="font-semibold text-gray-200 mb-4">AI Recommendations</h3>
            <div className="flex items-center justify-center h-32 text-sm text-gray-500 italic">
              Run an investigation to see actionable intelligence.
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
