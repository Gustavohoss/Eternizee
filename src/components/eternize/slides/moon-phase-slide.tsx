'use client';

import React from 'react';

interface MoonPhaseSlideProps {
  phase: string;
}

function MoonIcon({ phase }: { phase: string }) {
  const getShadowStyle = () => {
    switch (phase) {
      case "Lua Nova":
        return { background: "radial-gradient(circle at 50% 50%, rgba(10, 15, 30, 0.95) 0%, rgba(10, 15, 30, 0.9) 100%)" };
      case "Lua Crescente":
        return { background: "radial-gradient(circle at 75% 45%, rgba(10, 15, 30, 0.88) 40%, transparent 70%)" };
      case "Quarto Crescente":
        return { background: "radial-gradient(circle at 68% 45%, rgba(10, 15, 30, 0.88) 30%, transparent 65%)" };
      case "Gibosa Crescente":
        return { background: "radial-gradient(circle at 60% 45%, rgba(10, 15, 30, 0.88) 20%, transparent 55%)" };
      case "Lua Cheia":
        return { background: "transparent" };
      case "Gibosa Minguante":
        return { background: "radial-gradient(circle at 40% 45%, rgba(10, 15, 30, 0.88) 20%, transparent 55%)" };
      case "Quarto Minguante":
        return { background: "radial-gradient(circle at 32% 45%, rgba(10, 15, 30, 0.88) 30%, transparent 65%)" };
      case "Lua Minguante":
        return { background: "radial-gradient(circle at 25% 45%, rgba(10, 15, 30, 0.88) 40%, transparent 70%)" };
      default:
        return { background: "radial-gradient(circle at 68% 45%, rgba(10, 15, 30, 0.88) 30%, transparent 65%)" };
    }
  };

  const stars = [
    { left: '60.2%', top: '16.2%', size: 3.6, delay: 0 },
    { left: '86.8%', top: '30.8%', size: 2.4, delay: 0.3 },
    { left: '46.6%', top: '40.6%', size: 2.8, delay: 0.6 },
    { left: '10%', top: '57%', size: 2, delay: 0.9 },
    { left: '28.4%', top: '68.4%', size: 3.2, delay: 1.2 },
    { left: '73.9%', top: '78.9%', size: 2.2, delay: 1.5 },
  ];

  return (
    <div className="relative flex items-center justify-center animate-float" style={{ width: 160, height: 160 }}>
      <div 
        className="absolute rounded-full animate-pulse-glow"
        style={{
          width: 160,
          height: 160,
          background: "radial-gradient(circle, rgba(186, 230, 253, 0.18) 0%, rgba(148, 163, 184, 0.08) 50%, transparent 75%)"
        }}
      />
      <div 
        className="absolute rounded-full"
        style={{
          width: 104,
          height: 104,
          border: "1.5px solid rgba(226, 232, 240, 0.18)",
          boxShadow: "rgba(186, 230, 253, 0.2) 0px 0px 24px 6px, rgba(148, 163, 184, 0.1) 0px 0px 50px 14px"
        }}
      />
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-twinkle"
          style={{
            width: star.size,
            height: star.size,
            left: star.left,
            top: star.top,
            background: "white",
            boxShadow: `rgba(255, 255, 255, 0.6) 0px 0px ${star.size}px ${star.size / 2}px`,
            animationDelay: `${star.delay}s`
          }}
        />
      ))}
      <div 
        className="absolute rounded-full overflow-hidden"
        style={{
          width: 84,
          height: 84,
          background: "radial-gradient(circle at 40% 35%, rgb(241, 245, 249) 0%, rgb(203, 213, 225) 45%, rgb(148, 163, 184) 80%, rgb(100, 116, 139) 100%)",
          boxShadow: "rgba(186, 230, 253, 0.25) 0px 0px 20px 4px"
        }}
      >
        <div className="absolute inset-0 rounded-full" style={getShadowStyle()} />
        <div className="absolute inset-0 rounded-full" style={{ background: "radial-gradient(circle at 32% 28%, rgba(255, 255, 255, 0.3) 0%, transparent 50%)" }} />
      </div>
    </div>
  );
}

export function MoonPhaseSlide({ phase }: MoonPhaseSlideProps) {
  return (
    <div className="h-full flex flex-col items-center justify-center px-8 pb-28 text-center">
      <h2 className="text-3xl font-bold tracking-tight mb-10 text-title-gradient animate-fade-in-up">
        Curiosidades
      </h2>
      <div className="flex flex-col items-center w-full">
        <div className="mb-8 animate-scale-in animation-delay-100">
          <MoonIcon phase={phase} />
        </div>
        <p className="text-white/70 text-xl font-medium tracking-wide mb-3 animate-fade-in-up animation-delay-200">
          Essa história começou sob
        </p>
        <p className="text-5xl font-extrabold mb-5 leading-tight text-moon-glow text-balance animate-fade-in-up animation-delay-300">
          {phase}
        </p>
        <p className="text-white/55 text-base leading-relaxed max-w-[300px] animate-fade-in-up animation-delay-400">
          O céu já estava conspirando por vocês.
        </p>
      </div>
    </div>
  );
}
