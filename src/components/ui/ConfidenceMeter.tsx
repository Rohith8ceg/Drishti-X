'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

interface ConfidenceMeterProps {
  value: number; // 0-100
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

export default function ConfidenceMeter({
  value,
  label,
  size = 'md',
  color = '#06b6d4',
}: ConfidenceMeterProps) {
  const motionVal = useMotionValue(0);
  const displayVal = useTransform(motionVal, (v) => Math.round(v));

  useEffect(() => {
    const controls = animate(motionVal, value, { duration: 1.5, ease: 'easeOut' });
    return controls.stop;
  }, [value, motionVal]);

  const sizeMap = { sm: 64, md: 88, lg: 120 };
  const strokeMap = { sm: 5, md: 7, lg: 9 };
  const dim = sizeMap[size];
  const stroke = strokeMap[size];
  const radius = (dim - stroke * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  const fontMap = { sm: 'text-xs', md: 'text-sm', lg: 'text-lg' };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: dim, height: dim }}>
        {/* Track */}
        <svg width={dim} height={dim} className="rotate-[-90deg]">
          <circle
            cx={dim / 2}
            cy={dim / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.07)"
            strokeWidth={stroke}
          />
          {/* Progress arc */}
          <motion.circle
            cx={dim / 2}
            cy={dim / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            style={{ filter: `drop-shadow(0 0 6px ${color})` }}
          />
        </svg>
        {/* Centre text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className={`font-bold text-white ${fontMap[size]}`}
          >
            {Math.round(value)}%
          </motion.span>
        </div>
      </div>
      {label && (
        <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider text-center leading-tight">
          {label}
        </span>
      )}
    </div>
  );
}
