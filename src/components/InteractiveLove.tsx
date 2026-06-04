/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Smile, Star } from 'lucide-react';

interface FloatingElement {
  id: number;
  emoji: string;
  x: number; // random offset in px
}

const CHEER_COMPLIMENTS = [
  "You carry yourself with a rare blend of elegance and intellectual superpower.",
  "Your beautiful, radiant smile has the power to brighten the most stressful boardroom.",
  "Your storytelling eye is magic—UBA does not know what a legend they just hired!",
  "Never forget: your voice is clear, persuasive, trustworthy, and belongs in high places.",
  "I am unconditionally in your corner, celebrating every sentence, slide, and victory you make.",
  "Your focus and determination are awe-inspiring. You make dreams happen.",
  "You're not just ready for UBA—UBA has been waiting for the exact light you bring.",
  "Communications is an art, and you, my darling, are a master artist.",
  "Take a deep breath. You are incredibly loved, exceptionally brilliant, and destined for success.",
  "Your potential is limitboundless! Rest today and let the excitement wash over you."
];

export default function InteractiveLove() {
  const [elements, setElements] = useState<FloatingElement[]>([]);
  const [complimentIndex, setComplimentIndex] = useState<number>(-1);
  const [elementId, setElementId] = useState<number>(0);

  const triggerFloatingEmoji = (emoji: string) => {
    const newId = elementId;
    setElementId(newId + 1);
    
    // Random relative coordinate offset from center
    const randomX = Math.floor(Math.random() * 220) - 110;
    
    setElements((prev) => [...prev, { id: newId, emoji, x: randomX }]);

    // Remove element after animation completes to avoid memory leaks
    setTimeout(() => {
      setElements((prev) => prev.filter((el) => el.id !== newId));
    }, 1800);
  };

  const handleComplimentClick = () => {
    // Generate random index distinct from current one if possible
    let nextIdx = Math.floor(Math.random() * CHEER_COMPLIMENTS.length);
    if (nextIdx === complimentIndex) {
      nextIdx = (nextIdx + 1) % CHEER_COMPLIMENTS.length;
    }
    setComplimentIndex(nextIdx);
    triggerFloatingEmoji('✨');
  };

  return (
    <div className="w-full bg-white/70 backdrop-blur-md rounded-3xl border border-amber-100/60 p-5 sm:p-6 shadow-[0_4px_20px_-4px_rgba(212,175,55,0.04)] relative" id="interactive-love-card">
      
      {/* Floating Emitter Stage */}
      <div className="absolute pointer-events-none inset-x-0 bottom-full h-80 overflow-hidden flex justify-center z-50">
        <AnimatePresence>
          {elements.map((el) => (
            <motion.div
              key={el.id}
              initial={{ opacity: 1, y: 150, x: el.x, scale: 0.8 }}
              animate={{ opacity: [1, 0.8, 0], y: -120, x: el.x + (Math.sin(el.id) * 30), scale: [1, 1.4, 1.8] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.6, ease: "easeOut" }}
              className="absolute text-3xl drop-shadow-md select-none"
            >
              {el.emoji}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <h3 className="text-xs font-sans font-bold text-amber-950 uppercase tracking-widest flex items-center gap-1.5 mb-4" id="interactive-header">
        <Heart size={13} className="text-red-500 fill-red-500" />
        Lover's Sweet Support
      </h3>

      <p className="text-xs text-gray-500 leading-relaxed font-sans mb-5 font-normal">
        Whenever you feel nervous, overwhelmed, or just want a sprinkle of warmth, click these buttons to receive immediate sweet gestures:
      </p>

      {/* Button controls */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-5" id="love-buttons-grid">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => triggerFloatingEmoji('💖')}
          className="py-3 px-2 rounded-2xl bg-rose-50 border border-rose-100 flex flex-col items-center justify-center text-rose-700 hover:bg-rose-100/80 transition-colors"
          id="btn-virtual-hug"
        >
          <span className="text-lg sm:text-2xl mb-1">🫂</span>
          <span className="text-[10px] sm:text-xs font-sans font-bold tracking-tight uppercase">Warm Hug</span>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => triggerFloatingEmoji('💋')}
          className="py-3 px-2 rounded-2xl bg-red-50 border border-red-100 flex flex-col items-center justify-center text-red-700 hover:bg-red-100/80 transition-colors"
          id="btn-sweet-kiss"
        >
          <span className="text-lg sm:text-2xl mb-1">😘</span>
          <span className="text-[10px] sm:text-xs font-sans font-bold tracking-tight uppercase">Sweet Kiss</span>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => triggerFloatingEmoji('🌟')}
          className="py-3 px-2 rounded-2xl bg-amber-50 border border-amber-100 flex flex-col items-center justify-center text-amber-700 hover:bg-amber-100/80 transition-colors"
          id="btn-star-glow"
        >
          <span className="text-lg sm:text-2xl mb-1">✨</span>
          <span className="text-[10px] sm:text-xs font-sans font-bold tracking-tight uppercase">Star Sparks</span>
        </motion.button>
      </div>

      {/* Encouragement Card segment */}
      <div className="mt-2" id="compliment-feedback-section">
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={handleComplimentClick}
          className="w-full py-2.5 px-4 rounded-xl text-xs font-sans font-bold text-white bg-gradient-to-r from-red-600 via-amber-600 to-red-700 hover:brightness-110 shadow-sm flex items-center justify-center gap-1.5 transition-all text-center uppercase tracking-wider"
          id="btn-generate-cheer"
        >
          <Smile size={14} />
          <span>Need a Spark of Encouragement?</span>
        </motion.button>

        <AnimatePresence mode="wait">
          {complimentIndex >= 0 && (
            <motion.div
              key={complimentIndex}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="mt-3.5 bg-rose-50/40 rounded-2xl p-4 border border-rose-100/50 shadow-2xs flex gap-2.5 items-start"
              id="cheer-message-bubble"
            >
              <span className="text-lg select-none mt-0.5">💬</span>
              <p className="text-[13px] font-sans text-rose-900 leading-relaxed font-normal italic">
                "{CHEER_COMPLIMENTS[complimentIndex]}"
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
