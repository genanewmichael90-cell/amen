import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Heart, Sparkles } from 'lucide-react';

interface SurpriseHeartProps {
  onFirework: () => void;
}

export function SurpriseHeart({ onFirework }: SurpriseHeartProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
    onFirework();
  };

  return (
    <div className="w-full max-w-lg mx-auto my-12 px-4 relative z-10 text-center">
      <h3 className="text-xl md:text-2xl font-serif font-light text-[#E2B170] mb-6 tracking-widest uppercase italic">
        Something Kept inside...
      </h3>

      <div className="relative inline-block w-full">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="closed"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ scale: 1.02 }}
              onClick={handleOpen}
              className="mx-auto cursor-pointer max-w-sm rounded-sm p-8 glass-morphic glow-box-amber flex flex-col items-center justify-center gap-4 transition-all group border-[#E2B170]/20"
            >
              <div className="p-5 rounded-full bg-[#E2B170]/10 border border-[#E2B170]/20 group-hover:bg-[#E2B170]/20 transition-all text-[#E2B170] relative">
                {/* Floating mini heart behind it */}
                <Heart className="w-12 h-12 animate-pulse text-[#E2B170]" />
                <Mail className="w-6 h-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white fill-white/10" />
              </div>

              <div>
                <h4 className="font-mono text-sm tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-100 uppercase">
                  Open My Heart 💌
                </h4>
                <p className="text-xs text-[#E2B170]/70 mt-1 max-w-xs font-serif italic">
                  Click the envelope to release the deepest truth.
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="opened"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="mx-auto max-w-md rounded-sm p-8 glass-morphic border-[#E2B170]/30 glow-box-amber relative overflow-hidden text-center"
              style={{
                boxShadow: '0 0 25px rgba(226, 177, 112, 0.15), inset 0 0 12px rgba(226, 177, 112, 0.05)',
              }}
            >
              {/* Confetti sparkling lights inside card */}
              <div className="absolute top-2 left-2 text-[#E2B170]/60 opacity-60">
                <Sparkles className="w-5 h-5 animate-spin" style={{ animationDuration: '6s' }} />
              </div>
              <div className="absolute bottom-2 right-2 text-[#E2B170]/60 opacity-60">
                <Heart className="w-5 h-5 animate-pulse" />
              </div>

              <div className="mb-4">
                <span className="text-[9px] font-mono tracking-widest text-[#E2B170] uppercase bg-[#E2B170]/10 px-3 py-1 rounded-sm border border-[#E2B170]/20">
                  A Message For Eternity
                </span>
              </div>

              <p className="font-serif italic text-lg md:text-xl text-white/95 leading-relaxed font-light my-6">
                “No matter how far life takes us, a part of my heart will always stay with you.”
              </p>

              <button
                onClick={handleOpen}
                className="mt-4 px-5 py-2 text-[10px] font-mono uppercase tracking-widest text-[#050505] bg-[#E2B170] hover:bg-[#ebd5ab] rounded-sm transition-all active:scale-95 cursor-pointer font-bold"
              >
                Close Letter
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Aesthetic glowing trail */}
      <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 w-48 h-48 bg-[#E2B170]/5 rounded-full blur-[80px] pointer-events-none" />
    </div>
  );
}
