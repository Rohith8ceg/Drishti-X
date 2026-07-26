'use client';

import { useState } from 'react';
import SPLoginView from '@/components/dashboard/SPLoginView';
// Import MainDashboard (to be implemented)
// import MainDashboard from '@/components/dashboard/MainDashboard';

export default function Home() {
  const [view, setView] = useState<'login' | 'dashboard'>('login');

  if (view === 'login') {
    return <SPLoginView onProceed={() => setView('dashboard')} />;
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white flex items-center justify-center">
      <div className="glass-panel p-12 rounded-2xl text-center max-w-2xl">
        <h2 className="text-3xl font-bold text-drishti-cyan mb-4">Intelligence Workspace</h2>
        <p className="text-gray-400 mb-8">
          The main Investigation Canvas and Natural Language Copilot will be loaded here.
        </p>
        <div className="agent-thinking inline-block w-4 h-4 rounded-full bg-drishti-cyan"></div>
        <span className="ml-3 text-drishti-cyan font-mono text-sm uppercase tracking-widest">System Initializing...</span>
      </div>
    </div>
  );
}
