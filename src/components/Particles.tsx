import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: string;
  size: string;
  duration: string;
  delay: string;
  color: string;
  type: 'heart' | 'star' | 'circle';
}

export function AmbientParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const types: ('heart' | 'star' | 'circle')[] = ['heart', 'star', 'circle'];
    const colors = [
      'rgba(244, 63, 137, 0.4)',  // Soft romantic pink (pink-500)
      'rgba(168, 85, 247, 0.3)',  // Soft lavender (purple-500)
      'rgba(251, 191, 36, 0.35)', // Warm gold (amber-400)
      'rgba(255, 255, 255, 0.25)', // Pure starry white
    ];

    const isMobileDevice = typeof window !== 'undefined' && window.innerWidth < 768;
    const initialParticles = Array.from({ length: isMobileDevice ? 10 : 30 }).map((_, i) => {
      const x = Math.random() * 100;
      const size = Math.random() * 14 + 6; // 6px to 20px
      const duration = Math.random() * 12 + 10; // 10s to 22s
      const delay = Math.random() * -15; // Negative delay to prevent all starting from bottom simultaneously
      const color = colors[Math.floor(Math.random() * colors.length)];
      const type = types[Math.floor(Math.random() * types.length)];

      return {
        id: i,
        x: `${x}%`,
        size: `${size}px`,
        duration: `${duration}s`,
        delay: `${delay}s`,
        color,
        type,
      };
    });

    setParticles(initialParticles);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute bottom-0"
          style={{
            left: p.x,
            animationName: 'drift-particle',
            animationDuration: p.duration,
            animationDelay: p.delay,
            animationIterationCount: 'infinite',
            animationTimingFunction: 'linear',
            fontSize: p.size,
            color: p.color,
            textShadow: p.type !== 'circle' ? `0 0 6px ${p.color}` : 'none',
          } as React.CSSProperties}
        >
          {p.type === 'heart' && (
            <svg
              className="w-full h-full opacity-60"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{ width: p.size, height: p.size }}
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          )}
          {p.type === 'star' && (
            <svg
              className="w-full h-full opacity-70 animate-pulse"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{ width: p.size, height: p.size }}
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          )}
          {p.type === 'circle' && (
            <div
              className="rounded-full opacity-40 blur-[1px]"
              style={{
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                boxShadow: `0 0 8px ${p.color}`,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
