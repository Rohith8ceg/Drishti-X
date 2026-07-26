'use client';

import { motion } from 'framer-motion';
import { Activity, MapPin, Users, AlertTriangle, Crosshair } from 'lucide-react';

export default function SPLoginView({ onProceed }: { onProceed: () => void }) {
  const changes = [
    { id: 1, title: 'New Networks', value: 4, icon: <Users className="w-6 h-6 text-drishti-cyan" />, glow: 'shadow-[0_0_15px_rgba(0,240,255,0.2)]' },
    { id: 2, title: 'Repeat Offenders', value: 12, icon: <Activity className="w-6 h-6 text-drishti-amber" />, glow: 'shadow-[0_0_15px_rgba(255,184,0,0.2)]' },
    { id: 3, title: 'Emerging Hotspots', value: 3, icon: <MapPin className="w-6 h-6 text-drishti-red" />, glow: 'shadow-[0_0_15px_rgba(255,42,42,0.2)]' },
    { id: 4, title: 'High Risk Areas', value: 2, icon: <AlertTriangle className="w-6 h-6 text-drishti-red" />, glow: 'shadow-[0_0_15px_rgba(255,42,42,0.2)]' },
    { id: 5, title: 'Gang Becoming Active', value: 1, icon: <Crosshair className="w-6 h-6 text-drishti-amber" />, glow: 'shadow-[0_0_15px_rgba(255,184,0,0.2)]' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300 } }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-[#0B0F19] relative overflow-hidden">
      {/* Background radial gradient for deep space look */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-drishti-cyan/10 via-transparent to-transparent opacity-50 blur-3xl pointer-events-none"></div>
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-12 z-10"
      >
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2 text-white">
          DRISHTI<span className="text-drishti-cyan">-X</span>
        </h1>
        <p className="text-gray-400 text-lg">Welcome back, Superintendent. Here is what changed since yesterday.</p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full z-10 mb-12"
      >
        {changes.map((change, i) => (
          <motion.div 
            key={change.id}
            variants={itemVariants}
            className={`glass-panel p-6 rounded-2xl flex items-center space-x-6 hover:-translate-y-1 transition-transform cursor-default ${change.glow}`}
            whileHover={{ scale: 1.02 }}
          >
            <div className="p-4 bg-white/5 rounded-full border border-white/10">
              {change.icon}
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-1">{change.value}</div>
              <div className="text-gray-400 font-medium">{change.title}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onProceed}
        className="z-10 px-8 py-4 bg-drishti-cyan/20 border border-drishti-cyan/50 text-drishti-cyan rounded-full font-bold hover:bg-drishti-cyan/30 hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all flex items-center gap-2"
      >
        Enter Intelligence Copilot
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
      </motion.button>
    </div>
  );
}
