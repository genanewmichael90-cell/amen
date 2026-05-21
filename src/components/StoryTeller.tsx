import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, Quote, Calendar, Gift } from 'lucide-react';

interface StoryTellerProps {
  onTimelinePrompt: () => void;
  onFirework: () => void;
}

export function StoryTeller({ onTimelinePrompt, onFirework }: StoryTellerProps) {
  const letterText = `You remember the first day we met?
The first time I saw you was back in 7th grade at Young Roots. From that very moment, it felt like love at first sight. You looked stunning — so beautiful that I couldn’t stop looking at you.

We ended up in the same classes, and from the very first day, I kept finding every little opportunity just to talk to you. Slowly, we became friends, but through all that time, my feelings for you never changed.

Even when you were with other guys, I stayed silent, carrying those feelings quietly in my heart.

Then came Grade 8 — honestly, some of the sweetest years of my life. I still remember our moments together so clearly. The school trips to Kuriftu, the laughs we shared, the late conversations when you were in the USA and I was still here… those moments meant everything to me.

And then we found ourselves together again at Andinet — same place, same classes, same memories growing even stronger. Every second I spent with you felt special. Every conversation, every smile, every moment around you became a memory I’ll never forget.

Now your birthday is here, and I truly wish you the happiest birthday ever. Soon I’ll be leaving this country, and maybe I won’t come back for a long time… but no matter where life takes me, I know I’ll miss you deeply.

And honestly, if you’d ever feel comfortable with it, I’d love for us to meet one day before I leave — maybe watch a movie together, walk around the city, laugh together, or simply spend time together doing anything you enjoy.

Because the truth is… I really love you.

I loved you yesterday.
I love you today.
And I’ll love you tomorrow and every day after that.

Happy Birthday, Amen ❤️`;

  const [displayedText] = useState(letterText);
  const [isTyping] = useState(false);
  const letterEndRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  // Trigger celebratory firework once on mount
  useEffect(() => {
    onFirework();
  }, [onFirework]);

  return (
    <div className="w-full max-w-2xl mx-auto px-4 relative z-10" id="letter-storytell">
      <div className="relative glass-morphic rounded-sm p-6 md:p-8 min-h-[500px] flex flex-col justify-between overflow-hidden shadow-2xl transition-all duration-500 glow-box-amber border-[#E2B170]/20 bg-black/60">
        
        {/* Soft, low-intensity background glows */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-[#2d131e]/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-36 h-36 bg-[#E2B170]/5 rounded-full blur-2xl pointer-events-none" />

        {/* Absolute Gold Badge */}
        <div className="absolute top-[1px] left-6 transform -translate-y-1/2 bg-[#E2B170] text-[#050505] font-mono text-[9px] font-black tracking-widest uppercase px-3.5 py-1 shadow-md z-20 rounded-sm">
          A Letter For You
        </div>

        {/* Header section of the letter - Static design matching editorial */}
        <div className="flex justify-between items-start gap-3 pb-4 border-b border-white/5 mb-6 mt-2">
          <div>
            <span className="text-[9px] font-mono text-[#E2B170] tracking-widest uppercase bg-[#E2B170]/10 px-2.5 py-1 rounded-sm border border-[#E2B170]/20 inline-block mb-1.5">
              Addis Ababa Chapter
            </span>
            <h3 className="text-xl md:text-3xl font-serif font-light text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-amber-100 tracking-wide glow-text-gold">
              Happy Birthday Amen 🎂✨
            </h3>
          </div>
          <Heart className={`w-5 h-5 ${isTyping ? 'text-[#E2B170] animate-pulse' : 'text-[#E2B170] fill-[#E2B170]'} shrink-0`} />
        </div>

        {/* Letter Text Box in Georgia-serif styled layout with soft glow on characters */}
        <div 
          ref={textContainerRef}
          className="flex-1 overflow-y-auto max-h-[420px] pr-2 my-2 text-white/90 text-sm md:text-base leading-relaxed whitespace-pre-line font-serif italic tracking-wide select-text custom-scrollbar"
        >
          {displayedText}
          {isTyping && (
            <span className="inline-block w-2.5 h-4 ml-1 bg-[#E2B170] animate-pulse rounded-sm" />
          )}
          <div ref={letterEndRef} />
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t border-white/5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono tracking-widest uppercase text-amber-300 flex items-center gap-1.5">
              <Gift className="w-3.5 h-3.5 text-[#E2B170] animate-bounce" /> Letter Opened 
            </span>
          </div>

          <div className="flex gap-2.5 w-full sm:w-auto justify-end">
            <button
              onClick={onTimelinePrompt}
              className="px-5 py-2.5 rounded-sm text-[10px] font-bold uppercase tracking-widest bg-[#E2B170] hover:bg-[#ebd5ab] text-[#050505] shadow-lg shadow-[#E2B170]/15 active:scale-95 transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer w-full sm:w-auto"
            >
              <span>Explore Memories</span>
              <Sparkles className="w-3.5 h-3.5 text-[#050505]" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Decorative emotional prompt */}
      <p className="text-center text-xs text-white/40 mt-3 italic font-serif flex items-center justify-center gap-1.5">
        <Quote className="w-3 h-3 text-[#E2B170]/50" />
        "A piece of my past, written in starlight for you"
      </p>
    </div>
  );
}
