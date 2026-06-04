/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Clock } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isCompleted: boolean;
}

export default function CountdownClock() {
  const targetDate = new Date('2026-07-01T00:00:00').getTime();

  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isCompleted: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
      isCompleted: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []); // Empty array is fine since our values are primitives and targetDate is static outside of the effect loop

  const timeBlocks = [
    { label: 'Days', value: timeLeft.days, color: 'border-red-500/10 text-red-600' },
    { label: 'Hours', value: timeLeft.hours, color: 'border-amber-500/10 text-amber-600' },
    { label: 'Minutes', value: timeLeft.minutes, color: 'border-emerald-500/10 text-emerald-600' },
    { label: 'Seconds', value: timeLeft.seconds, color: 'border-rose-500/10 text-rose-600' },
  ];

  return (
    <div className="w-full flex flex-col items-center">
      {timeLeft.isCompleted ? (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center bg-gradient-to-r from-red-50 to-amber-50 border border-amber-200 rounded-2xl p-6 shadow-sm max-w-md"
          id="countdown-completed"
        >
          <span className="text-3xl font-serif text-amber-800 font-semibold block mb-2">🎉 The Day Has Arrived!</span>
          <p className="text-sm text-amber-700 font-sans leading-relaxed">
            KayKay, you are officially the Communications Executive for United Bank for Africa! The wait is over, now go shine!
          </p>
        </motion.div>
      ) : (
        <div className="w-full max-w-xl" id="countdown-grid">
          <div className="grid grid-cols-4 gap-3 sm:gap-4 md:gap-5">
            {timeBlocks.map((block) => (
              <motion.div
                key={block.label}
                id={`countdown-block-${block.label.toLowerCase()}`}
                whileHover={{ y: -4 }}
                className="bg-white/80 backdrop-blur-md rounded-2xl p-3 sm:p-5 border border-amber-100/60 shadow-[0_4px_20px_-4px_rgba(212,175,55,0.08)] text-center flex flex-col items-center justify-center relative overflow-hidden group"
              >
                {/* Decorative gold shimmer line */}
                <span className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-red-500 via-amber-400 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <span className={`text-2xl sm:text-4xl font-serif font-bold ${block.color} tracking-tight tabular-nums`}>
                  {String(block.value).padStart(2, '0')}
                </span>
                
                <span className="text-[10px] sm:text-xs font-sans font-medium text-gray-400 uppercase tracking-widest mt-1">
                  {block.label}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-1.5 mt-4 text-[11px] font-sans font-medium text-amber-800/60 uppercase tracking-wider">
            <Clock size={12} className="text-red-500" />
            <span>Counting down to July 1st, 2026</span>
          </div>
        </div>
      )}
    </div>
  );
}
