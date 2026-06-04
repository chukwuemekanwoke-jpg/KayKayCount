/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { Building2, Heart, Sparkles, Briefcase, Award } from 'lucide-react';

import CountdownClock from './components/CountdownClock';
import DailyMessage from './components/DailyMessage';
import Milestones from './components/Milestones';
import InteractiveLove from './components/InteractiveLove';

export default function App() {
  // June 4, 2026 is Day 1 (index 0)
  // July 1, 2026 is Day 28 (index 27)
  const getTodayIndex = (): number => {
    const startDate = new Date('2026-06-04T00:00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    startDate.setHours(0, 0, 0, 0);

    const diffTime = today.getTime() - startDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return 0;
    if (diffDays > 27) return 27;
    return diffDays;
  };

  const todayIndex = getTodayIndex();

  return (
    <div 
      className="bg-gradient-to-br from-[#FCFBF8] via-[#FFF8F5] to-[#F5ECE2] min-h-screen text-gray-800 flex flex-col justify-between selection:bg-rose-100 selection:text-rose-900 relative overflow-hidden"
      id="app-root-container"
    >
      {/* Decorative ambient subtle light orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-red-200/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-amber-200/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Content Area */}
      <main className="w-full max-w-5xl mx-auto px-4 py-8 sm:py-12 md:py-14 z-10 flex-grow" id="app-main-view">
        
        {/* Top Header Section */}
        <div className="text-center mb-10 max-w-2xl mx-auto" id="app-header-block">
          
          {/* UBA Branded Sub-badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-red-500/10 shadow-[0_2px_8px_-2px_rgba(239,68,68,0.06)] text-red-600 mb-4"
            id="uba-brand-badge"
          >
            <Building2 size={13} className="text-red-600" />
            <span className="text-[10px] sm:text-xs font-sans font-bold uppercase tracking-widest">
              United Bank for Africa
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-gray-900 leading-tight mb-3"
            id="hero-title"
          >
            Let's Count Down, <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-amber-600 to-red-700 font-semibold">KayKay!</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xs sm:text-sm font-sans font-medium text-amber-900/75 leading-relaxed"
            id="hero-subtitle"
          >
            Celebrating your brilliance and counting down the days until your official career debut as <span className="font-semibold text-gray-900">Communications Executive</span> on July 1st, 2026.
          </motion.p>
        </div>

        {/* Real-time Ticking Countdown */}
        <motion.section 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mb-10 sm:mb-12"
          id="countdown-clock-section"
        >
          <CountdownClock />
        </motion.section>

        {/* Dashboard Grid (Daily Letter + Trackers/Interactions) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start" id="app-dashboard-columns">
          
          {/* Main Column - Heartfelt Message of the Day */}
          <div className="md:col-span-7" id="dashboard-col-left">
            <DailyMessage todayIndex={todayIndex} />
          </div>

          {/* Sidebar Column - Milestones and Virtual Love */}
          <div className="md:col-span-5 space-y-6 sm:space-y-8" id="dashboard-col-right">
            <InteractiveLove />
            <Milestones todayIndex={todayIndex} />
          </div>

        </div>

      </main>

      {/* Crafted with love Footer */}
      <footer className="w-full text-center py-6 border-t border-amber-500/5 bg-[#FFFDFB]/40 backdrop-blur-xs z-10" id="app-footer-block">
        <p className="text-[11px] sm:text-xs font-sans font-medium text-amber-800/50 flex items-center justify-center gap-1">
          <span>Crafted with endless admiration & love for KayKay</span>
          <Heart size={10} className="text-red-500 fill-red-500 animate-pulse" />
          <span>• 2026</span>
        </p>
      </footer>
    </div>
  );
}
