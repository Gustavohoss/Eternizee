'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getMoonPhase, getSeason, getDayOfWeek, getDaysSince } from '@/lib/date-utils';
import { SeasonSlide } from './slides/season-slide';
import { MoonPhaseSlide } from './slides/moon-phase-slide';
import { DayOfWeekSlide } from './slides/day-of-week-slide';

interface CuriosidadesModulePreviewProps {
  date?: Date;
}

export function CuriosidadesModulePreview({ date = new Date(2026, 3, 16) }: CuriosidadesModulePreviewProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);
  const totalSlides = 3;

  const moonPhase = getMoonPhase(date);
  const season = getSeason(date);
  const dayOfWeek = getDayOfWeek(date);
  const daysSince = getDaysSince(date);

  const changeSlide = (newSlide: number) => {
    setAnimationKey((prev) => prev + 1);
    setCurrentSlide(newSlide);
  };

  const nextSlide = () => changeSlide((currentSlide + 1) % totalSlides);
  const prevSlide = () => changeSlide((currentSlide - 1 + totalSlides) % totalSlides);
  const goToSlide = (index: number) => {
    if (index !== currentSlide) changeSlide(index);
  };

  const getGlassClass = () => {
    if (currentSlide === 0) {
      switch (season.season) {
        case "Verão": return "glass-summer";
        case "Outono": return "glass-autumn";
        case "Inverno": return "glass-winter";
        case "Primavera": return "glass-spring";
        default: return "glass-summer";
      }
    }
    if (currentSlide === 1) return "glass-moon";
    return "glass-day";
  };

  const getDotColor = () => {
    if (currentSlide === 0) {
      switch (season.season) {
        case "Verão": return "rgb(250, 204, 21)";
        case "Outono": return "rgb(251, 146, 60)";
        case "Inverno": return "rgb(147, 197, 253)";
        case "Primavera": return "rgb(244, 114, 182)";
        default: return "rgb(250, 204, 21)";
      }
    }
    if (currentSlide === 1) return "rgb(186, 230, 253)";
    return "rgb(226, 232, 240)";
  };

  return (
    <div className={`relative w-full h-full min-h-[600px] overflow-hidden transition-all duration-500 bg-[#050508] ${getGlassClass()}`}>
      <div className="noise-overlay" />

      <div className="relative z-10 h-full overflow-hidden">
        <div key={animationKey} className="h-full">
          {currentSlide === 0 && <SeasonSlide season={season.season} />}
          {currentSlide === 1 && <MoonPhaseSlide phase={moonPhase.phase} />}
          {currentSlide === 2 && <DayOfWeekSlide dayOfWeek={dayOfWeek} daysSince={daysSince} />}
        </div>
      </div>

      <div 
        className="absolute bottom-0 left-0 right-0 z-20 flex flex-col items-center pb-12 pt-4"
        style={{ background: "linear-gradient(to top, rgba(5, 5, 8, 0.85) 0%, transparent 100%)" }}
      >
        <div className="flex items-center gap-2 mb-6">
          {[0, 1, 2].map((index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="rounded-full cursor-pointer transition-all duration-300"
              style={{
                width: currentSlide === index ? "22px" : "7px",
                height: "7px",
                background: currentSlide === index ? getDotColor() : "rgba(255, 255, 255, 0.22)"
              }}
            />
          ))}
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={prevSlide}
            className="w-[52px] h-[52px] rounded-full flex items-center justify-center border transition-all active:scale-95 shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
            style={{ background: "rgba(255, 255, 255, 0.07)", borderColor: "rgba(255, 255, 255, 0.15)" }}
          >
            <ChevronLeft className="w-6 h-6 text-white/80" />
          </button>
          <button
            onClick={nextSlide}
            className="w-[52px] h-[52px] rounded-full flex items-center justify-center border transition-all active:scale-95 shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
            style={{ background: "rgba(255, 255, 255, 0.07)", borderColor: "rgba(255, 255, 255, 0.15)" }}
          >
            <ChevronRight className="w-6 h-6 text-white/80" />
          </button>
        </div>
      </div>
    </div>
  );
}
