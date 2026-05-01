'use client';

import React from 'react';

interface DayOfWeekSlideProps {
  dayOfWeek: string;
  daysSince: number;
}

function CalendarMoonIcon() {
  return (
    <div className="relative flex items-center justify-center animate-float-slow" style={{ width: 160, height: 160 }}>
      <div 
        className="absolute rounded-full animate-pulse-glow"
        style={{
          width: 160,
          height: 160,
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)"
        }}
      />
      <div 
        className="absolute rounded-full"
        style={{
          width: 104,
          height: 104,
          border: "1.5px solid rgba(255, 255, 255, 0.15)",
          boxShadow: "rgba(255, 255, 255, 0.15) 0px 0px 24px 6px"
        }}
      />
      <div 
        className="absolute rounded-full overflow-hidden"
        style={{
          width: 84,
          height: 84,
          background: "radial-gradient(circle at 40% 35%, rgb(241, 245, 249) 0%, rgb(203, 213, 225) 45%, rgb(148, 163, 184) 80%, rgb(100, 116, 139) 100%)",
          boxShadow: "0 0 30px rgba(255,255,255,0.2)"
        }}
      >
        <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 70% 30%, transparent 30%, rgba(0,0,0,0.2) 100%)" }} />
        <div className="absolute inset-0 rounded-full" style={{ background: "radial-gradient(circle at 32% 28%, rgba(255, 255, 255, 0.3) 0%, transparent 50%)" }} />
      </div>
    </div>
  );
}

export function DayOfWeekSlide({ dayOfWeek, daysSince }: DayOfWeekSlideProps) {
  const displayDay = dayOfWeek.replace("-feira", "");

  return (
    <div className="h-full flex flex-col items-center justify-center px-8 pb-28 text-center">
      <h2 className="text-3xl font-bold tracking-tight mb-10 text-title-gradient animate-fade-in-up">
        Curiosidades
      </h2>
      <div className="flex flex-col items-center w-full">
        <div className="mb-8 animate-scale-in animation-delay-100">
          <CalendarMoonIcon />
        </div>
        <p className="text-white/70 text-xl font-medium tracking-wide mb-3 animate-fade-in-up animation-delay-200">
          Tudo começou em
        </p>
        <p className="text-5xl font-extrabold mb-5 leading-tight text-day-glow animate-fade-in-up animation-delay-300">
          {displayDay}
        </p>
        <p className="text-white/55 text-base leading-relaxed max-w-[300px] animate-fade-in-up animation-delay-400">
          E esse momento especial já completa {daysSince.toLocaleString("pt-BR")} dias.
        </p>
      </div>
    </div>
  );
}
