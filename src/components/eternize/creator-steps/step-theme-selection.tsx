
'use client';

import React, { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { THEME_OPTIONS, ThemeId } from '@/app/criador/constants';
import useEmblaCarousel from 'embla-carousel-react';
import { cn } from '@/lib/utils';

interface StepThemeSelectionProps {
  selectedTheme: ThemeId;
  onThemeSelect: (theme: ThemeId) => void;
  onNext: () => void;
}

export function StepThemeSelection({ selectedTheme, onThemeSelect, onNext }: StepThemeSelectionProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    align: 'center', 
    skipSnaps: false 
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const currentTheme = THEME_OPTIONS[selectedIndex];
  const themeColor = currentTheme.color;

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    const index = emblaApi.selectedScrollSnap();
    setSelectedIndex(index);
    onThemeSelect(THEME_OPTIONS[index].id as ThemeId);
  }, [emblaApi, onThemeSelect]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative z-10 container mx-auto px-4 h-screen flex flex-col items-center justify-center overflow-hidden py-4">
      
      {/* Header Compacto */}
      <div className="w-full max-w-4xl flex flex-col mb-4 shrink-0">
        <Link href="/">
          <button className="group flex items-center gap-2 text-white/40 hover:text-white transition-colors text-[10px] font-bold mb-2 w-fit mx-auto md:mx-0">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Voltar
          </button>
        </Link>
        
        <div className="space-y-0.5 text-center md:text-left">
          <h2 className="text-xl md:text-3xl font-black tracking-tight uppercase italic">Qual tema você quer usar?</h2>
          <p className="text-[10px] md:text-xs text-white/40 font-medium">Personalizamos tudo para você automaticamente.</p>
        </div>
      </div>

      <div className="relative w-full flex flex-col items-center flex-1 min-h-0 justify-center">
        {/* Carousel Container */}
        <div className="w-full max-w-[600px] overflow-visible" ref={emblaRef}>
          <div className="flex">
            {THEME_OPTIONS.map((theme) => {
              const isSelected = selectedTheme === theme.id;
              return (
                <div 
                  key={theme.id} 
                  className="flex-[0_0_80%] sm:flex-[0_0_100%] min-w-0 px-2 sm:px-10 flex items-center justify-center"
                >
                  <div 
                    className={cn(
                      "relative bg-[#141414] rounded-[28px] overflow-hidden transition-all duration-500 w-full max-w-[280px] aspect-[3/4.2] border-2",
                      isSelected 
                        ? "scale-100 opacity-100" 
                        : "scale-90 opacity-30 border-transparent shadow-none grayscale-[0.5]"
                    )}
                    style={isSelected ? { 
                      borderColor: theme.color,
                      boxShadow: `0 0 25px ${theme.color}66, 0 0 50px ${theme.color}33`
                    } : {}}
                  >
                    {/* Top Glow Line */}
                    <div className={cn(
                      "absolute top-0 left-0 right-0 h-[3px] z-30 transition-opacity duration-500",
                      isSelected ? "opacity-100" : "opacity-0"
                    )} 
                    style={{ background: `linear-gradient(90deg, transparent, ${theme.color}, transparent)` }}
                    />

                    {/* Media Area */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#1f1f1f] to-[#141414] z-10">
                      <Image 
                        src={theme.image} 
                        fill 
                        className="object-cover" 
                        alt={theme.name} 
                        priority
                      />
                      {/* Gradient Overlay for Text */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-20" />
                    </div>

                    {/* Card Body Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 z-30">
                      <div className="flex justify-between items-center mb-1.5">
                        <h2 className="text-white text-xl font-black m-0 font-inter">{theme.name}</h2>
                        <span 
                          className="px-2.5 py-0.5 rounded-full text-[0.6rem] font-black uppercase tracking-wider border"
                          style={{ 
                            backgroundColor: `${theme.color}22`, 
                            color: theme.color, 
                            borderColor: `${theme.color}44` 
                          }}
                        >
                          {theme.badge}
                        </span>
                      </div>

                      <p className="text-[#b3b3b3] text-[11px] leading-snug mb-4 font-medium line-clamp-2">
                        {theme.description}
                      </p>

                      <button className="w-full bg-white/5 border border-white/10 text-white py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all hover:bg-white/10 active:scale-95">
                        <ExternalLink className="w-3 h-3" />
                        Ver demo
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation Arrows (Desktop Only) */}
        <button 
          onClick={scrollPrev}
          className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 items-center justify-center hover:bg-white/10 transition-all active:scale-90 z-20"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <button 
          onClick={scrollNext}
          className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 items-center justify-center hover:bg-white/10 transition-all active:scale-90 z-20"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>

        {/* Pagination Dots */}
        <div className="flex gap-2.5 mt-6 shrink-0">
          {THEME_OPTIONS.map((theme, i) => (
            <div 
              key={i} 
              className={cn(
                "h-1.5 rounded-full transition-all duration-500",
                i === selectedIndex ? "w-7" : "w-1.5 bg-white/10"
              )} 
              style={i === selectedIndex ? { backgroundColor: theme.color } : {}}
            />
          ))}
        </div>
      </div>

      {/* Footer Button */}
      <div className="mt-6 flex flex-col items-center gap-4 w-full max-w-[320px] shrink-0">
        <div className="text-center">
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30">
            Selecionado: <span className="text-white" style={{ color: themeColor }}>{currentTheme.name}</span>
          </p>
        </div>
        <button 
          onClick={onNext} 
          className="w-full text-white h-14 rounded-2xl font-black text-sm shadow-2xl active:scale-95 transition-all uppercase tracking-widest"
          style={{ 
            backgroundColor: themeColor,
            boxShadow: `0 10px 30px ${themeColor}55`
          }}
        >
          Próximo
        </button>
      </div>
    </div>
  );
}
