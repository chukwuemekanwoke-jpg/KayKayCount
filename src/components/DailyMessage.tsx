/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Lock, Sparkles, ChevronLeft, ChevronRight, Award, Compass, Eye, EyeOff } from 'lucide-react';
import { DAILY_MESSAGES } from '../messages';
import { DailyMessage as DayMsgType } from '../types';

interface DailyMessageProps {
  todayIndex: number; // 0 to 27
}

export default function DailyMessage({ todayIndex }: DailyMessageProps) {
  // We keep track of the selected day index being inspected. Defaults to today.
  const [selectedIndex, setSelectedIndex] = useState<number>(todayIndex);
  // Optional bypass key for the user/developer to test or unlock future days
  const [isDebugUnlocked, setIsDebugUnlocked] = useState<boolean>(false);

  const selectedMsg: DayMsgType = DAILY_MESSAGES[selectedIndex];
  
  // A message is unlocked if its index is <= todayIndex OR if the debug bypass is on
  const isUnlocked = selectedIndex <= todayIndex || isDebugUnlocked;

  // Friendly date formatting for display
  const getDaysRemainingStr = () => {
    const diff = 27 - selectedIndex;
    if (diff === 0) return "Starting Today!";
    if (diff === 1) return "1 day left";
    return `${diff} days left`;
  };

  const handlePrev = () => {
    if (selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  const handleNext = () => {
    if (selectedIndex < DAILY_MESSAGES.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  const handleJumpToToday = () => {
    setSelectedIndex(todayIndex);
  };

  // Categories helper icons & styles
  const categoryConfig = {
    motivation: { bg: 'bg-amber-50 text-amber-700 border-amber-100', icon: Sparkles, label: 'Inspiration' },
    love: { bg: 'bg-rose-50 text-rose-700 border-rose-100', icon: Heart, label: 'From My Heart' },
    'career-tip': { bg: 'bg-red-50 text-red-700 border-red-100', icon: Compass, label: 'PR & Corporate Strategy' },
    celebration: { bg: 'bg-emerald-50 text-emerald-700 border-emerald-100', icon: Award, label: 'Celebration' },
  };

  const currentCat = categoryConfig[selectedMsg.category] || categoryConfig.motivation;
  const CatIcon = currentCat.icon;

  return (
    <div className="w-full max-w-xl mx-auto" id="daily-message-container">
      {/* Calendar Header Nav */}
      <div className="flex items-center justify-between mb-4 px-1" id="message-navigator">
        <button
          onClick={handlePrev}
          disabled={selectedIndex === 0}
          className={`p-2 rounded-xl border border-amber-100 bg-white/60 shadow-xs transition-all ${
            selectedIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-amber-50 text-amber-900 active:scale-95'
          }`}
          id="btn-prev-message"
          aria-label="Previous day"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="text-center">
          <span className="text-xs font-sans font-semibold tracking-widest text-amber-800 uppercase block">
            Day {selectedMsg.dayNumber} of 28
          </span>
          <span className="text-sm font-sans text-gray-400 font-medium">
            {selectedMsg.dateString} • <span className="text-red-600 font-medium">{getDaysRemainingStr()}</span>
          </span>
        </div>

        <button
          onClick={handleNext}
          disabled={selectedIndex === DAILY_MESSAGES.length - 1}
          className={`p-2 rounded-xl border border-amber-100 bg-white/60 shadow-xs transition-all ${
            selectedIndex === DAILY_MESSAGES.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-amber-50 text-amber-900 active:scale-95'
          }`}
          id="btn-next-message"
          aria-label="Next day"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Main Letter Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedIndex}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="relative min-h-[360px] bg-white rounded-3xl border border-amber-100/70 p-6 sm:p-8 shadow-[0_10px_30px_-8px_rgba(212,175,55,0.06)] flex flex-col justify-between overflow-hidden"
          id="daily-letter-card"
        >
          {/* Top category pill and watermark */}
          <div className="flex items-center justify-between mb-5 z-10">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full border ${currentCat.bg}`}>
              <CatIcon size={12} />
              {currentCat.label}
            </span>

            {selectedIndex !== todayIndex && (
              <button
                onClick={handleJumpToToday}
                className="text-xs font-sans font-medium text-amber-800 hover:text-red-600 hover:underline transition-all"
                id="btn-jump-today"
              >
                Go to Today
              </button>
            )}
          </div>

          <div className="flex-1 flex flex-col justify-center z-10">
            {!isUnlocked ? (
              /* LOCKED VIEW */
              <div className="flex flex-col items-center justify-center text-center py-8" id="locked-card-view">
                <motion.div
                  initial={{ rotate: -10 }}
                  animate={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4, repeatDelay: 2 }}
                  className="w-16 h-16 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-red-500 mb-4 shadow-xs"
                >
                  <Lock size={28} />
                </motion.div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-gray-800 mb-2">Patience, My Love!</h3>
                <p className="text-sm font-sans text-gray-500 max-w-sm leading-relaxed mb-4">
                  This heartfelt message is sealed with a love-lock until <span className="font-medium text-amber-800">{selectedMsg.dateString}</span>. 
                  Keep counting down, each day is a step closer!
                </p>
                <span className="text-[11px] font-sans font-medium text-red-500 uppercase tracking-wider bg-rose-50/50 px-3 py-1 rounded-full border border-rose-100/40">
                  Unlocks in {selectedIndex - todayIndex} more {selectedIndex - todayIndex === 1 ? 'day' : 'days'}
                </span>
              </div>
            ) : (
              /* UNLOCKED VIEW */
              <div id="unlocked-card-view">
                <h2 className="font-serif text-2xl sm:text-3.5xl font-bold text-gray-900 tracking-tight leading-tight mb-4 text-center sm:text-left">
                  {selectedMsg.headline}
                </h2>
                
                <p className="font-sans text-sm sm:text-[15px] leading-relaxed text-gray-700 whitespace-pre-wrap font-normal mb-6">
                  {selectedMsg.body}
                </p>

                {selectedMsg.tip && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-amber-50/60 rounded-2xl p-4 border border-amber-100/60 shadow-2xs relative overflow-hidden"
                    id="executive-tip-section"
                  >
                    <span className="absolute right-3 top-3 text-amber-600/10">
                      <Award size={48} />
                    </span>
                    <h4 className="text-xs font-sans font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1 mb-1.5">
                      <Sparkles size={12} className="text-amber-500" />
                      Executive Comm Spotlight
                    </h4>
                    <p className="text-xs sm:text-[13px] font-sans text-amber-800/90 leading-relaxed font-normal">
                      {selectedMsg.tip}
                    </p>
                  </motion.div>
                )}
              </div>
            )}
          </div>

          {/* Decorative Backdrops */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100/10 rounded-full blur-3xl -z-1" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-red-100/10 rounded-full blur-3xl -z-1" />
        </motion.div>
      </AnimatePresence>

      {/* Lover's Debug Bypass Key */}
      <div className="mt-4 flex justify-center" id="developer-lock-bypass">
        <button
          onClick={() => setIsDebugUnlocked(!isDebugUnlocked)}
          className="inline-flex items-center gap-1 text-[11px] font-sans font-medium text-gray-400 hover:text-amber-800 transition-colors"
          id="btn-lovers-secret-bypass"
        >
          {isDebugUnlocked ? (
            <>
              <EyeOff size={12} />
              <span>Lock Future Days</span>
            </>
          ) : (
            <>
              <Eye size={12} />
              <span>🔑 Lover's Preview Secret Key (Reveal All)</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
