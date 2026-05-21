import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Bookmark, Sparkles, Flame, Gift, Clock } from 'lucide-react';

export function QuotesSection() {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0, isBirthday: false });

  // Countdown timer calculation to May 22nd!
  useEffect(() => {
    const calculateTime = () => {
      // Set target to May 22, 2026 UTC
      const now = new Date();
      const target = new Date(Date.UTC(2026, 4, 22, 0, 0, 0)); // Month index 4 is May
      
      const difference = target.getTime() - now.getTime();
      
      if (difference <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0, isBirthday: true });
        return;
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds, isBirthday: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const quotes = [
    {
      text: "“Some people become memories. Others become part of your soul.”",
      subtitle: "Written in the skies for Amen",
      gradient: "from-[#2d131e]/15 to-[#050505]",
      icon: <Bookmark className="w-5 h-5 text-[#E2B170]" />
    },
    {
      text: "“You were my favorite chapter.”",
      subtitle: "And you always will be...",
      gradient: "from-[#100810] to-[#050505]",
      icon: <Flame className="w-5 h-5 text-[#E2B170]" />
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto my-16 px-4 relative z-10" id="quotes-section">
      <div className="text-center mb-10">
        <h3 className="text-2xl md:text-4xl font-serif font-light text-white italic tracking-wide uppercase">
          Whispers of My Heart
        </h3>
        <p className="text-xs text-[#E2B170]/75 mt-2 font-mono uppercase tracking-widest leading-relaxed">
          Timeless verses dedicated to an unforgettable soul
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch mb-8">
        {quotes.map((q, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -4 }}
            className={`rounded-sm p-6 md:p-8 bg-gradient-to-br ${q.gradient} border border-[#E2B170]/15 shadow-xl glass-morphic flex flex-col justify-between`}
          >
            <div className="flex justify-between items-center mb-6">
              <span className="text-[10px] font-mono tracking-widest text-[#E2B170] uppercase">
                Verse 0{idx + 1}
              </span>
              <div className="p-2.5 rounded-full bg-[#E2B170]/5 border border-[#E2B170]/20 shadow-inner">
                {q.icon}
              </div>
            </div>

            <p className="font-serif italic text-xl md:text-2xl text-white/90 leading-relaxed tracking-wide my-4 font-light select-none">
              {q.text}
            </p>

            <span className="text-xs font-mono text-[#E2B170]/60 mt-4 tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E2B170]" />
              {q.subtitle}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Birthday Banner & Time Countdown (May 22 is her birthday!) */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="rounded-sm p-6 md:p-8 glass-morphic border-[#E2B170]/20 glow-box-amber text-center relative overflow-hidden bg-gradient-to-br from-[#050505] via-[#100810] to-[#050505]"
      >
        <div className="absolute top-0 right-0 -mr-12 -mt-12 w-24 h-24 bg-amber-500/5 rounded-full blur-xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-12 -mb-12 w-24 h-24 bg-[#2d131e]/5 rounded-full blur-xl pointer-events-none" />

        <div className="flex flex-col items-center gap-3">
          <div className="p-3 rounded-full bg-[#E2B170]/10 border border-[#E2B170]/25 text-[#E2B170] relative">
            <Gift className="w-8 h-8 animate-bounce" />
            <Sparkles className="w-4 h-4 absolute top-1 right-1 text-white animate-pulse" />
          </div>

          <h4 className="font-serif text-2xl md:text-3xl font-light italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-amber-100 tracking-tight">
            “22 May — the day someone unforgettable was born.”
          </h4>

          {timeLeft.isBirthday ? (
            <div className="mt-4 p-4 rounded-sm bg-[#E2B170]/10 border border-[#E2B170]/25 inline-block">
              <p className="text-sm font-semibold tracking-wider text-[#E2B170] animate-pulse flex items-center gap-2 justify-center uppercase">
                🎉 HAPPY BIRTHDAY AMEN! Today is your beautiful day! 🎉
              </p>
            </div>
          ) : (
            <div className="mt-4 flex flex-col items-center gap-2">
              <span className="text-[10px] font-mono tracking-widest text-[#E2B170] uppercase flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 animate-spin text-[#E2B170]" style={{ animationDuration: '4s' }} /> Countdown to her magical Day:
              </span>
              <div className="flex items-center gap-3 mt-1.5">
                <div className="glass-morphic px-5 py-2.5 rounded-sm border border-[#E2B170]/20 min-w-[70px]">
                  <div className="text-2xl font-bold text-white font-mono">{timeLeft.hours}</div>
                  <div className="text-[9px] font-mono text-white/40 uppercase">Hours</div>
                </div>
                <div className="text-xl text-[#E2B170] animate-pulse">:</div>
                <div className="glass-morphic px-5 py-2.5 rounded-sm border border-[#E2B170]/20 min-w-[70px]">
                  <div className="text-2xl font-bold text-white font-mono">{timeLeft.minutes}</div>
                  <div className="text-[9px] font-mono text-white/40 uppercase">Mins</div>
                </div>
                <div className="text-xl text-[#E2B170] animate-pulse">:</div>
                <div className="glass-morphic px-5 py-2.5 rounded-sm border border-[#E2B170]/20 min-w-[70px]">
                  <div className="text-2xl font-bold text-[#E2B170] font-mono">{timeLeft.seconds}</div>
                  <div className="text-[9px] font-mono text-white/40 uppercase">Secs</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
