import { useEffect, useState, useRef } from 'react';

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  shape: 'circle' | 'square' | 'heart' | 'star';
  angle: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
}

export function ConfettiRain({ trigger }: { trigger: number }) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);
  const nextId = useRef(0);

  const colors = [
    '#f43f89', // hot pink
    '#a855f7', // soft purple
    '#fbbf24', // golden amber
    '#ffffff', // starry white
    '#ff85a2', // soft petal pink
    '#fbcfe8', // pastel pink
  ];

  const shapesByChance: ('circle' | 'square' | 'heart' | 'star')[] = ['circle', 'square', 'heart', 'star'];

  const spawnBurst = () => {
    const isMobileDevice = typeof window !== 'undefined' && window.innerWidth < 768;
    const freshPieces: ConfettiPiece[] = [];
    const count = isMobileDevice ? 35 : 100; // Highly optimized light burst on mobile, full gorgeous count on desktop

    for (let i = 0; i < count; i++) {
      const isLeftOrRight = Math.random() > 0.5;
      const x = isLeftOrRight ? Math.random() * 20 : 80 + Math.random() * 20; // blast from outer margins
      const y = 80 + Math.random() * 15; // starting low on screen

      const angle = isLeftOrRight 
        ? (Math.random() * -60 - 30) * (Math.PI / 180)  // shooting right-up
        : (Math.random() * -60 - 90) * (Math.PI / 180); // shooting left-up

      const force = Math.random() * 14 + 10;
      const speedX = Math.cos(angle) * force;
      const speedY = Math.sin(angle) * force;

      freshPieces.push({
        id: nextId.current++,
        x: (x / 100) * (window.innerWidth || 800),
        y: (y / 100) * (window.innerHeight || 800),
        size: Math.random() * 11 + 7,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: shapesByChance[Math.floor(Math.random() * shapesByChance.length)],
        angle: Math.random() * 360,
        speedX,
        speedY,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() * 8 + 3) * (Math.random() > 0.5 ? 1 : -1),
        opacity: 1,
      });
    }

    setPieces((prev) => [...prev, ...freshPieces]);
  };

  useEffect(() => {
    if (trigger > 0) {
      spawnBurst();
    }
  }, [trigger]);

  useEffect(() => {
    if (pieces.length === 0) return;

    let animFrame: number;
    const gravity = 0.28;
    const drag = 0.982;

    const updatePhysics = () => {
      setPieces((prev) => {
        const updated = prev
          .map((p) => {
            const nextSpeedX = p.speedX * drag;
            const nextSpeedY = (p.speedY + gravity) * drag;
            const nextX = p.x + nextSpeedX;
            const nextY = p.y + nextSpeedY;
            const nextRotation = p.rotation + p.rotationSpeed;
            // slowly fade out after crossing peak arc
            const nextOpacity = nextY > 200 ? p.opacity - 0.0075 : p.opacity;

            return {
              ...p,
              x: nextX,
              y: nextY,
              speedX: nextSpeedX,
              speedY: nextSpeedY,
              rotation: nextRotation,
              opacity: nextOpacity,
            };
          })
          .filter((p) => p.y < (window.innerHeight || 1200) + 50 && p.opacity > 0);
        
        return updated;
      });

      animFrame = requestAnimationFrame(updatePhysics);
    };

    animFrame = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animFrame);
  }, [pieces.length]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={{
            transform: `translate3d(${p.x}px, ${p.y}px, 0) rotate(${p.rotation}deg)`,
            opacity: p.opacity,
            width: p.size,
            height: p.size,
            color: p.color,
            fontSize: p.size,
          }}
        >
          {p.shape === 'heart' && (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          )}
          {p.shape === 'star' && (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          )}
          {p.shape === 'circle' && (
            <div
              className="rounded-full w-full h-full"
              style={{ backgroundColor: p.color, boxShadow: `0 0 4px ${p.color}` }}
            />
          )}
          {p.shape === 'square' && (
            <div
              className="w-full h-full"
              style={{ backgroundColor: p.color }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
