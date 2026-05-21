import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Compass, Globe, GraduationCap, Plane, Award } from 'lucide-react';

interface TimelineEvent {
  year: string;
  badge: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  details?: string;
}

interface TimelineProps {
  onFirework: () => void;
}

export function MemoryTimeline({ onFirework }: TimelineProps) {
  const events: TimelineEvent[] = [
    {
      year: "Grade 7",
      badge: "The Beginning",
      title: "Young Roots School",
      description: "Where our stories crossed paths. Love at first sight under the quiet corridors. You looked incredibly stunning, and from that very second, I was completely captivated.",
      icon: <GraduationCap className="w-5 h-5 text-[#E2B170]" />,
      details: "7th grade back in school, finding excuses simply to ask you questions or catch your beautiful gaze."
    },
    {
      year: "Grade 8",
      badge: "Pure Sweetness",
      title: "Kuriftu School Trip",
      description: "The sweetest years of my life. Whispering stories, laughing out loud together during school bus journeys, and the unforgettable sun-drenched moments on the trip to Kuriftu.",
      icon: <Compass className="w-5 h-5 text-[#E2B170]" />,
      details: "School excursions filled with shared smiles, inside jokes, and a gentle connection that began to bloom."
    },
    {
      year: "Grade 8 - USA Gap",
      badge: "In the Distance",
      title: "Late-Night Ocean Conversations",
      description: "You flew to the USA, yet distance couldn't fade my feelings. We talked late into the night, across thousands of miles. Listening to your voice was the sweetest comfort.",
      icon: <Globe className="w-5 h-5 text-[#E2B170]" />,
      details: "We stayed connected through late hours, keeping the secret hope in my heart alive and warming."
    },
    {
      year: "High School Days",
      badge: "Stronger Bonds",
      title: "Reunited at Andinet",
      description: "We found ourselves together again in the same classes, same schools, building even stronger memories. Every single second spent around you was deeply special.",
      icon: <Award className="w-5 h-5 text-[#E2B170]" />,
      details: "Every shared laugh, and every quiet smile in Andinet classrooms became locked into my memory forever."
    },
    {
      year: "The Present & Future",
      badge: "The Departure",
      title: "My Bittersweet Farewell",
      description: "Soon, I will be leaving this country. I might not return for a very long time. But no matter where my destination is, or how wide the distance gets, I will miss you deeply.",
      icon: <Plane className="w-5 h-5 text-[#E2B170]" />,
      details: "A reality of departure, yet school memories stand firm. Sharing quiet walks through the city remains memory's gold standard."
    }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 relative z-10" id="memory-timeline">
      <div className="text-center mb-16">
        <span className="text-[10px] font-mono tracking-widest text-[#E2B170] bg-[#E2B170]/10 px-3 py-1.5 rounded-sm border border-[#E2B170]/20 uppercase">
          Timeline of Us
        </span>
        <h3 className="text-3xl md:text-5xl font-serif font-light text-white italic mt-2 uppercase">
          Our Shared Chapters
        </h3>
        <p className="text-xs text-white/50 mt-2 max-w-md mx-auto font-light leading-relaxed">
          From the nervous corridors of Young Roots to our heartfelt present. Click any event node to celebrate.
        </p>
      </div>

      <div className="relative border-l border-white/10 md:border-l-0 md:flex md:flex-col md:items-center">
        {/* Animated timeline center vertical line for desktop */}
        <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#E2B170]/10 via-[#E2B170]/30 to-transparent" />

        {events.map((event, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              onClick={onFirework}
              className={`relative mb-12 md:mb-16 md:w-1/2 flex flex-col cursor-pointer group ${
                isEven ? 'md:mr-auto md:pr-12 md:items-end' : 'md:ml-auto md:pl-12 md:items-start'
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute -left-[17px] md:left-auto md:right-auto top-2 w-[34px] h-[34px] rounded-full bg-[#050505] border-2 border-[#E2B170]/35 flex items-center justify-center shadow-lg group-hover:border-[#E2B170] group-hover:scale-110 transition-all z-20 
                md:absolute md:top-2 md:left-1/2 md:-translate-x-1/2"
              >
                {event.icon}
              </div>

              {/* Memory Card */}
              <div className="ml-8 md:ml-0 w-full max-w-md">
                <div className="glass-morphic hover:glass-morphic-pink rounded-sm p-6 transition-all duration-300 shadow-xl border border-white/5 hover:border-[#E2B170]/30 glow-box-amber relative overflow-hidden">
                  
                  {/* Card glow flare */}
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-[#E2B170] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-semibold text-[#E2B170] tracking-widest uppercase">
                      {event.year}
                    </span>
                    <span className="text-[9px] font-mono tracking-widest text-[#E2B170] border border-[#E2B170]/35 bg-[#E2B170]/10 px-2.5 py-0.5 rounded-sm uppercase">
                      {event.badge}
                    </span>
                  </div>

                  <h4 className="font-serif text-lg md:text-xl font-light italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-amber-100 group-hover:text-amber-200 transition-colors uppercase">
                    {event.title}
                  </h4>

                  <p className="text-xs md:text-sm text-white/70 leading-relaxed font-light mt-3">
                    {event.description}
                  </p>

                  {event.details && (
                    <div className="mt-4 pt-4 border-t border-white/5 text-xs text-[#E2B170]/60 font-serif italic select-none">
                      {event.details}
                    </div>
                  )}

                  {/* Gentle sparkle trigger on hover */}
                  <div className="absolute bottom-2 right-2 text-white/5 opacity-0 group-hover:opacity-30 transition-opacity duration-350">
                    <Sparkles className="w-5 h-5 animate-spin" style={{ animationDuration: '8s' }} />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
