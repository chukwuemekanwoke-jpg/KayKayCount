/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { CheckCircle2, Circle, Sparkles, Building2, CalendarRange, HeartHandshake } from 'lucide-react';
import { Milestone } from '../types';

interface MilestonesProps {
  todayIndex: number;
}

export default function Milestones({ todayIndex }: MilestonesProps) {
  const milestones: Milestone[] = [
    {
      id: "offer",
      title: "The Dream Secured",
      date: "Late May 2026",
      status: "completed",
      description: "KayKay gets selected as the Communications Executive for United Bank for Africa (UBA)."
    },
    {
      id: "preparation",
      title: "Preparation & Support",
      date: "June 4 - 30, 2026",
      status: "current",
      description: "Daily warm letters, notes of reassurance, and expert PR tips to set her up for stardom."
    },
    {
      id: "night-before",
      title: "The Beautiful Eve",
      date: "June 30, 2026",
      status: todayIndex >= 26 ? "current" : "upcoming",
      description: "Ironing the perfect corporate outfit, preping her laptop, and getting early rest."
    },
    {
      id: "launch",
      title: "UBA Induction Day!",
      date: "July 1, 2026",
      status: todayIndex === 27 ? "current" : "upcoming",
      description: "First step into the lobby! The birth of a legendary corporate storyteller."
    }
  ];

  return (
    <div className="w-full bg-white/70 backdrop-blur-md rounded-3xl border border-amber-100/60 p-5 sm:p-6 shadow-[0_4px_20px_-4px_rgba(212,175,55,0.04)]" id="milestones-card">
      <h3 className="text-xs font-sans font-bold text-amber-950 uppercase tracking-widest flex items-center gap-1.5 mb-5" id="milestones-header">
        <Sparkles size={13} className="text-red-500" />
        Executive Launch Track
      </h3>

      <div className="space-y-4 md:space-y-5" id="milestone-timeline">
        {milestones.map((item, idx) => {
          const isCompleted = item.status === 'completed';
          const isCurrent = item.status === 'current';

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex gap-3 md:gap-4 relative group"
              id={`milestone-item-${item.id}`}
            >
              {/* Connecting line between icons */}
              {idx < milestones.length - 1 && (
                <div 
                  className={`absolute left-3.5 top-7 bottom-[-16px] w-[1.5px] ${
                    isCompleted ? 'bg-gradient-to-b from-red-400 to-amber-200' : 'bg-gray-150'
                  }`} 
                />
              )}

              {/* Icon Container */}
              <div className="flex-shrink-0 mt-0.5">
                {isCompleted ? (
                  <CheckCircle2 size={18} className="text-red-600 fill-red-50" />
                ) : isCurrent ? (
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="flex items-center justify-center"
                  >
                    <Sparkles size={18} className="text-amber-500 fill-amber-50" />
                  </motion.div>
                ) : (
                  <Circle size={18} className="text-gray-300" />
                )}
              </div>

              {/* Text Content */}
              <div className="flex-1">
                <div className="flex items-baseline justify-between gap-1">
                  <h4 className={`text-[13px] font-sans font-bold tracking-tight ${
                    isCompleted ? 'text-gray-700 font-medium line-through' : isCurrent ? 'text-amber-950 font-bold' : 'text-gray-500'
                  }`}>
                    {item.title}
                  </h4>
                  <span className={`text-[10px] font-sans font-medium uppercase tracking-wider ${
                    isCurrent ? 'text-red-600' : 'text-gray-400'
                  }`}>
                    {item.date}
                  </span>
                </div>
                <p className={`text-xs font-sans leading-relaxed mt-1 ${
                  isCompleted ? 'text-gray-400 line-through' : isCurrent ? 'text-gray-600 font-medium' : 'text-gray-400'
                }`}>
                  {item.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
