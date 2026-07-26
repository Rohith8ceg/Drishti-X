'use client';

import { useState } from 'react';
import SPLoginView from '@/components/dashboard/SPLoginView';
import MainDashboard from '@/components/dashboard/MainDashboard';

export default function Home() {
  const [view, setView] = useState<'login' | 'dashboard'>('login');

  if (view === 'login') {
    return <SPLoginView onProceed={() => setView('dashboard')} />;
  }

  return <MainDashboard />;
}
