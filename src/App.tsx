import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Music, Volume2, VolumeX, Heart, ChevronDown, RotateCcw, Calendar, Star, Sun, Moon } from 'lucide-react';

// Custom components
import { soundscape } from './utils/audio';
import { AmbientParticles } from './components/Particles';
import { ConfettiRain } from './components/Confetti';
import { StoryTeller } from './components/StoryTeller';
import { MemoryTimeline } from './components/Timeline';
import { SurpriseHeart } from './components/SurpriseHeart';
import { QuotesSection } from './components/Quotes';

// Import the generated Amen portrait
// @ts-ignore
import amenPortrait from './assets/images/amen_portrait_1779392341172.png';

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [confettiTrigger, setConfettiTrigger] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [audioVolume, setAudioVolume] = useState(0.35);
  const [showTimelinePrompt, setShowTimelinePrompt] = useState(false);
  const [floatingStars, setFloatingStars] = useState<{ id: number; top: string; left: string; size: string; delay: string }[]>([]);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Toggle classes on body element
  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('theme-light');
      document.body.classList.remove('theme-dark');
    } else {
      document.body.classList.add('theme-dark');
      document.body.classList.remove('theme-light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Generate slow starry twinkles for the background
  useEffect(() => {
    const isMobileDevice = typeof window !== 'undefined' && window.innerWidth < 768;
    const starsCount = isMobileDevice ? 15 : 45;
    const stars = Array.from({ length: starsCount }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 2.5 + 1}px`,
      delay: `${Math.random() * 6}s`,
    }));
    setFloatingStars(stars);
  }, []);

  const handleEnterStory = async () => {
    setHasEntered(true);
    setConfettiTrigger((prev) => prev + 1);
    
    // Start ambient emotional synthesized tracker on interact
    await soundscape.start();
    setIsMuted(soundscape.getMutedState());
  };

  const handleFirework = useCallback(() => {
    setConfettiTrigger((prev) => prev + 1);
  }, []);

  const toggleMute = () => {
    const nextMute = soundscape.toggleMute();
    setIsMuted(nextMute);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setAudioVolume(val);
    soundscape.setVolume(val);
  };

  const handleRestart = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setConfettiTrigger((prev) => prev + 1);
  };

  return (
    <div className={`min-h-screen bg-[#050505] editorial-bg text-[#ffffff] relative font-sans selection:bg-[#E2B170]/35 overflow-hidden stars-bg transition-colors duration-500 ${theme === 'light' ? 'theme-light' : 'theme-dark'}`}>
      {/* Dynamic Confetti Master Layer */}
      <ConfettiRain trigger={confettiTrigger} />

      {/* Floating Sparkles, Hearts, and Stars Background Element */}
      {hasEntered && <AmbientParticles />}

      <AnimatePresence>
        {/* PHASE 1: SPLASH SPLASH SCREEN (Cinematic Portal Gate) */}
        {!hasEntered && (
          <motion.div
            id="splash-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 bg-[#050505] editorial-bg"
          >
            {/* Soft decorative visual light bleed behind */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] bg-[#2d131e]/25 rounded-full blur-[110px] pointer-events-none" />
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] bg-[#E2B170]/5 rounded-full blur-[130px] pointer-events-none" />

            {/* Ambient stars in overlay */}
            {floatingStars.slice(0, 20).map((star) => (
              <div
                key={star.id}
                className="absolute rounded-full bg-white opacity-40 animate-pulse"
                style={{
                  top: star.top,
                  left: star.left,
                  width: star.size,
                  height: star.size,
                  animationDelay: star.delay,
                  animationDuration: '3s',
                }}
              />
            ))}

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="max-w-xl text-center flex flex-col items-center gap-6 glass-morphic-pink rounded-xl p-8 md:p-12 border-gold-accent shadow-2xl relative"
            >
              <div className="relative">
                <span className="text-[10px] font-mono tracking-widest text-[#E2B170] border border-[#E2B170]/35 px-4 py-1.5 rounded bg-[#E2B170]/10 inline-block uppercase">
                  May 22 — ADDIS ABABA
                </span>
              </div>

              <div className="space-y-3">
                <h1 className="text-3xl md:text-5xl font-serif font-light tracking-tight text-white leading-tight">
                  Happy Birthday <br />
                  <span className="gold-accent italic font-semibold glow-text-gold">Amen</span>
                </h1>
                <p className="text-white/60 font-serif italic text-sm md:text-base max-w-sm mx-auto leading-relaxed">
                  “Some people become memories. <br />Others become part of your soul.”
                </p>
              </div>

              <p className="text-[11px] text-white/40 font-mono tracking-wider max-w-xs mt-2 uppercase">
                🎧 Put on headphones for the full slow-piano cinematic soundscape.
              </p>

              <button
                id="btn-enter-story"
                onClick={handleEnterStory}
                className="group relative mt-4 px-8 py-4 bg-[#E2B170] text-[#050505] font-bold text-xs uppercase tracking-widest hover:bg-[#f3ca8c] transition-all outline-none border-none shadow-xl shadow-[#E2B170]/20 hover:shadow-[#E2B170]/35 active:scale-95 cursor-pointer flex items-center gap-2 rounded-sm"
              >
                <span>Read Amen's Birthday Letter</span>
                <Sparkles className="w-4 h-4 text-[#050505]" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PHASE 2: MAIN IMMERSIVE WEBPAGE */}
      {hasEntered && (
        <div className="relative min-h-screen z-10">
          
          {/* Unified Controller Widget (Theme + Audio) */}
          <div className="fixed top-4 right-4 z-40 flex items-center gap-2.5 glass-morphic hover:glass-morphic-pink rounded-lg p-2 px-3 border border-[#E2B170]/20 shadow-lg transition-all">
            {/* Theme Toggle Button */}
            <button
              id="btn-toggle-theme"
              onClick={toggleTheme}
              className="p-1.5 text-amber-200 hover:text-white transition-colors focus:outline-none cursor-pointer flex items-center justify-center border-r border-[#E2B170]/20 pr-2"
              title={theme === 'dark' ? "Switch to Light Theme" : "Switch to Dark Theme"}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-[#E2B170]" />
              ) : (
                <Moon className="w-4 h-4 text-[#E2B170]" />
              )}
            </button>

            <div className="flex items-center gap-2 border-r border-white/10 pr-2">
              <button
                id="btn-toggle-mute"
                onClick={toggleMute}
                className="p-1.5 text-amber-200 hover:text-white transition-colors focus:outline-none cursor-pointer"
                title={isMuted ? "Unmute" : "Mute ambient tracks"}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-white/40" /> : <Volume2 className="w-4 h-4 text-[#E2B170] animate-bounce" />}
              </button>

              {/* Little soundwave tracker layout */}
              <div className="flex items-end gap-[2px] h-3 w-4">
                <div className={`w-[2px] bg-[#E2B170] rounded-full transition-all duration-300 ${isMuted ? 'h-[2px]' : 'h-3 animate-pulse'}`} />
                <div className={`w-[2px] bg-[#E2B170] rounded-full transition-all duration-300 ${isMuted ? 'h-[2px]' : 'h-[6px] animate-pulse'}`} style={{ animationDelay: '0.15s' }} />
                <div className={`w-[2px] bg-[#E2B170] rounded-full transition-all duration-300 ${isMuted ? 'h-[2px]' : 'h-2 animate-pulse'}`} style={{ animationDelay: '0.3s' }} />
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-[10px] font-mono text-white/50">
              <span className="hidden sm:inline">Volume:</span>
              <input
                type="range"
                min="0"
                max="0.8"
                step="0.05"
                value={isMuted ? 0 : audioVolume}
                onChange={handleVolumeChange}
                disabled={isMuted}
                className="w-14 sm:w-16 accent-[#E2B170] h-[3px] bg-white/10 rounded-full appearance-none cursor-pointer"
              />
            </div>
          </div>

          {/* BACKGROUND FADING TWINKLES */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            {floatingStars.map((star) => (
              <div
                key={star.id}
                className="absolute rounded-full bg-white opacity-25 animate-pulse"
                style={{
                  top: star.top,
                  left: star.left,
                  width: star.size,
                  height: star.size,
                  animationDelay: star.delay,
                  animationDuration: '4s',
                }}
              />
            ))}
          </div>

          {/* HERO SECTION */}
          <header className="relative w-full pt-16 pb-12 flex flex-col md:flex-row items-center justify-center max-w-6xl mx-auto px-6 overflow-hidden mt-8 md:gap-12">
            
            {/* Custom Glowing Centerpiece image of Amen: Portrait frame style */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="relative mb-8 md:mb-0 shrink-0"
              onClick={handleFirework}
            >
              {/* Premium Portrait Frame styling */}
              <div className="portrait-frame w-56 h-76 md:w-68 md:h-92 shadow-2xl animate-float-slow ring-1 ring-[#E2B170]/20 cursor-pointer">
                <div className="portrait-inner w-full h-full">
                  <img
                    src="https://www.image2url.com/r2/default/images/1779393260980-3972f60e-5c93-438c-aa04-09c7a32a48ca.jpg"
                    alt="Amen portrait"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-all duration-1000"
                  />
                  <div className="portrait-overlay" />
                </div>
              </div>

              {/* Offset decorative circle badge exactly like the prompt markup */}
              <div className="absolute -bottom-4 -right-4 w-14 h-14 border border-[#E2B170] rounded-full flex items-center justify-center bg-[#050505] text-lg select-none shadow-lg animate-pulse">
                ✨
              </div>
            </motion.div>

            {/* Title / Subheadings */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="max-w-xl text-center md:text-left relative z-10 flex flex-col items-center md:items-start"
            >
              <div className="font-mono text-[10px] tracking-[0.3em] text-white/45 uppercase mb-2">
                May 22, 2026 — Addis Ababa
              </div>

              <h2 className="text-4xl md:text-7xl font-serif font-light tracking-tight text-white leading-tight">
                Happy Birthday <br />
                <span className="gold-accent italic font-semibold glow-text-gold">Amen</span>
              </h2>
              
              <div className="flex items-center gap-2 mt-4 text-xs font-mono tracking-wider text-[#E2B170]">
                <Calendar className="w-4 h-4 shrink-0 text-[#E2B170]" />
                <span className="uppercase tracking-widest">
                  TO MY FAVORITE CHAPTER.
                </span>
              </div>

              {/* Simple arrow down prompt to read her narrative */}
              <motion.p
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-xs text-[#E2B170]/60 font-mono tracking-widest uppercase mt-12 flex items-center gap-2 cursor-pointer select-none"
                onClick={() => {
                  const el = document.getElementById('letter-storytell');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span>Read Scroll Letter</span>
                <ChevronDown className="w-4 h-4 text-[#E2B170]" />
              </motion.p>
            </motion.div>
          </header>

          {/* MAIN LETTER STORY GUIDE */}
          <section className="py-8" id="section-letter">
            <StoryTeller
              onTimelinePrompt={() => {
                setShowTimelinePrompt(true);
                // Scroll nicely to timeline
                const el = document.getElementById('memory-timeline');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onFirework={handleFirework}
            />
          </section>

          {/* MEMORY TIMELINE SECTION */}
          <section className="py-12" id="section-timeline">
            <MemoryTimeline onFirework={handleFirework} />
          </section>

          {/* INTERACTIVE ENVELOPE SURPRISE CARD */}
          <section className="py-8" id="section-surprise">
            <SurpriseHeart onFirework={handleFirework} />
          </section>

          {/* THE BEAUTIFUL QUOTES SECTION */}
          <section className="py-8" id="section-quotes">
            <QuotesSection />
          </section>

          {/* EPILOGUE (FINAL GLOW DEEP END) */}
          <footer className="relative w-full pt-16 pb-24 text-center px-4 overflow-hidden" id="footer-credits">
            {/* Glowing spot background */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-[#2d131e]/20 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-xl mx-auto space-y-8 relative z-10">
              <div className="p-[1px] inline-block bg-[#E2B170]/40 rounded-sm">
                <div className="bg-[#050505] p-2 py-1.5 px-6">
                  <Star className="w-4 h-4 text-[#E2B170] animate-spin inline-block mr-1.5" style={{ animationDuration: '9s' }} />
                  <span className="text-[10px] font-mono tracking-widest text-[#E2B170] uppercase">
                    My Promise
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl md:text-4xl font-serif font-light tracking-tight text-[#E2B170] leading-snug glow-text-gold">
                  “I’ll Always Remember You, Amen”
                </h2>
                <p className="text-white/50 text-xs md:text-sm font-serif italic max-w-sm mx-auto leading-relaxed">
                  No matter how far I travel or how much time slips away, every chapter we lived stays bright in my memories.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-6">
                <button
                  onClick={handleRestart}
                  className="px-5 py-3 rounded-sm text-[10px] font-mono uppercase tracking-widest text-[#E2B170] border border-[#E2B170]/30 hover:border-[#E2B170] hover:text-white glass-morphic-pink cursor-pointer transition-all flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Repeat Cycle
                </button>
                <a
                  href="#splash-screen"
                  onClick={() => setHasEntered(false)}
                  className="px-5 py-3 rounded-sm text-[10px] font-mono uppercase tracking-widest text-white/40 hover:text-white border border-white/10 hover:border-white/20 glass-morphic cursor-pointer transition-all flex items-center justify-center gap-1.5 active:scale-95"
                >
                  Return to Splash
                </a>
              </div>

              <div className="pt-12 text-[10px] font-mono text-white/20 select-none uppercase tracking-widest">
                <p>© 2026 Amen's Birthday Memoir Album</p>
                <p className="mt-1">Designed with quiet devotion</p>
              </div>
            </div>
          </footer>
        </div>
      )}
    </div>
  );
}
