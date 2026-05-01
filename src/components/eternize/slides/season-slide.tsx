'use client';

import React from 'react';

interface SeasonSlideProps {
  season: string;
}

function SummerSun() {
  const rays = Array.from({ length: 12 }, (_, i) => ({
    angle: i * 30,
    isLong: i % 3 === 0,
  }));

  return (
    <div className="relative flex items-center justify-center animate-float" style={{ width: 160, height: 160 }}>
      <div className="absolute inset-0 animate-spin-sun flex items-center justify-center">
        <div 
          className="absolute rounded-full animate-pulse-glow"
          style={{
            width: 160,
            height: 160,
            background: "radial-gradient(circle, rgba(250, 204, 21, 0.35) 0%, rgba(234, 179, 8, 0.12) 50%, transparent 75%)"
          }}
        />
        <div className="absolute w-full h-full">
          {rays.map((ray, i) => (
            <div
              key={i}
              className="absolute left-1/2 top-1/2"
              style={{
                transformOrigin: "0px 0px",
                transform: `rotate(${ray.angle}deg) translateX(46px)`,
                width: ray.isLong ? 18 : 11,
                height: ray.isLong ? 4 : 3,
                marginTop: ray.isLong ? -2 : -1.5,
                borderRadius: 4,
                background: ray.isLong 
                  ? "linear-gradient(90deg, rgba(253, 230, 138, 0.9), rgba(253, 230, 138, 0))"
                  : "linear-gradient(90deg, rgba(250, 204, 21, 0.7), rgba(250, 204, 21, 0))"
              }}
            />
          ))}
        </div>
      </div>
      <div className="absolute rounded-full w-[88px] h-[88px] sun-glow-shadow" />
      <div className="absolute rounded-full w-[80px] h-[80px] sun-main-body" />
      <div className="absolute rounded-full pointer-events-none w-[80px] h-[80px] sun-inner-reflection" />
    </div>
  );
}

function AutumnLeaf() {
  return (
    <div className="relative flex items-center justify-center animate-float-slow" style={{ width: 160, height: 160 }}>
      <div 
        className="absolute rounded-full animate-pulse-glow"
        style={{
          width: 160,
          height: 160,
          background: "radial-gradient(circle, rgba(251, 146, 60, 0.3) 0%, rgba(234, 88, 12, 0.1) 50%, transparent 75%)"
        }}
      />
      <svg width="90" height="90" viewBox="0 0 100 100" className="drop-shadow-[0_0_20px_rgba(251,146,60,0.6)]">
        <path
          d="M50 10 C20 30, 10 60, 50 90 C90 60, 80 30, 50 10"
          fill="rgb(251, 146, 60)"
        />
        <path d="M50 20 L50 85" stroke="rgba(0,0,0,0.2)" strokeWidth="2" />
        <path d="M50 35 L35 50 M50 50 L65 65 M50 45 L30 60 M50 55 L70 70" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" fill="none" />
      </svg>
    </div>
  );
}

function WinterSnowflake() {
  return (
    <div className="relative flex items-center justify-center animate-float" style={{ width: 160, height: 160 }}>
      <div 
        className="absolute rounded-full animate-pulse-glow"
        style={{
          width: 160,
          height: 160,
          background: "radial-gradient(circle, rgba(147, 197, 253, 0.3) 0%, rgba(59, 130, 246, 0.1) 50%, transparent 75%)"
        }}
      />
      <svg 
        width="90" 
        height="90" 
        viewBox="0 0 100 100" 
        className="drop-shadow-[0_0_20px_rgba(147,197,253,0.6)] animate-spin-sun"
        style={{ animationDuration: '20s' }}
      >
        {[0, 60, 120].map((angle) => (
          <g key={angle} transform={`rotate(${angle} 50 50)`}>
            <line x1="50" y1="10" x2="50" y2="90" stroke="rgb(191, 219, 254)" strokeWidth="3" strokeLinecap="round" />
            <line x1="50" y1="25" x2="35" y2="15" stroke="rgb(191, 219, 254)" strokeWidth="2" strokeLinecap="round" />
            <line x1="50" y1="25" x2="65" y2="15" stroke="rgb(191, 219, 254)" strokeWidth="2" strokeLinecap="round" />
            <line x1="50" y1="75" x2="35" y2="85" stroke="rgb(191, 219, 254)" strokeWidth="2" strokeLinecap="round" />
            <line x1="50" y1="75" x2="65" y2="85" stroke="rgb(191, 219, 254)" strokeWidth="2" strokeLinecap="round" />
          </g>
        ))}
        <circle cx="50" cy="50" r="6" fill="rgb(191, 219, 254)" />
      </svg>
    </div>
  );
}

function SpringFlower() {
  return (
    <div className="relative flex items-center justify-center animate-float" style={{ width: 160, height: 160 }}>
      <div 
        className="absolute rounded-full animate-pulse-glow"
        style={{
          width: 160,
          height: 160,
          background: "radial-gradient(circle, rgba(244, 114, 182, 0.3) 0%, rgba(236, 72, 153, 0.1) 50%, transparent 75%)"
        }}
      />
      <svg 
        width="90" 
        height="90" 
        viewBox="0 0 100 100" 
        className="drop-shadow-[0_0_20px_rgba(244,114,182,0.6)] animate-spin-sun"
        style={{ animationDuration: '25s' }}
      >
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <ellipse
            key={angle}
            cx="50"
            cy="25"
            rx="12"
            ry="20"
            fill="rgb(244, 114, 182)"
            transform={`rotate(${angle} 50 50)`}
          />
        ))}
        <circle cx="50" cy="50" r="14" fill="rgb(253, 224, 71)" />
        <circle cx="50" cy="50" r="8" fill="rgb(250, 204, 21)" />
      </svg>
    </div>
  );
}

export function SeasonSlide({ season }: SeasonSlideProps) {
  const getSeasonIcon = () => {
    switch (season) {
      case "Verão": return <SummerSun />;
      case "Outono": return <AutumnLeaf />;
      case "Inverno": return <WinterSnowflake />;
      case "Primavera": return <SpringFlower />;
      default: return <SummerSun />;
    }
  };

  const getTextClass = () => {
    switch (season) {
      case "Verão": return "text-summer-glow";
      case "Outono": return "text-autumn-glow";
      case "Inverno": return "text-winter-glow";
      case "Primavera": return "text-spring-glow";
      default: return "text-summer-glow";
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center px-8 pb-28 text-center">
      <h2 className="text-3xl font-bold tracking-tight mb-10 text-title-gradient animate-fade-in-up">
        Curiosidades
      </h2>
      <div className="flex flex-col items-center w-full">
        <div className="mb-8 animate-scale-in animation-delay-100">
          {getSeasonIcon()}
        </div>
        <p className="text-white/70 text-xl font-medium tracking-wide mb-3 animate-fade-in-up animation-delay-200">
          Durante a estação de
        </p>
        <p className={`text-5xl font-extrabold mb-5 leading-tight ${getTextClass()} animate-fade-in-up animation-delay-300`}>
          {season}
        </p>
        <p className="text-white/55 text-base leading-relaxed max-w-[300px] animate-fade-in-up animation-delay-400">
          Foi nesse clima que a história de vocês começou.
        </p>
      </div>
    </div>
  );
}
