
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
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center', skipSnaps: false });
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
    <div className="relative z-10 container mx-auto px-4 h-[calc(100vh-40px)] flex flex-col items-center justify-center overflow-hidden">
      
      {/* Header Compacto */}
      <div className="w-full max-w-4xl flex flex-col mb-4 md:mb-6">
        <Link href="/">
          <button className="group flex items-center gap-2 text-white/40 hover:text-white transition-colors text-[10px] md:text-[11px] font-bold mb-2 md:mb-4 w-fit mx-auto md:mx-0">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Voltar
          </button>
        </Link>
        
        <div className="space-y-1 text-center md:text-left">
          <h2 className="text-2xl md:text-4xl font-black tracking-tight">Qual tema você quer usar?</h2>
          <p className="text-[10px] md:text-sm text-white/40 font-medium">Escolha o estilo da página e personalizamos tudo para você.</p>
        </div>
      </div>

      <div className="relative w-full flex flex-col items-center min-h-0">
        {/* Carousel Container */}
        <div className="w-full max-w-[480px] overflow-visible" ref={emblaRef}>
          <div className="flex">
            {THEME_OPTIONS.map((theme) => {
              const isSelected = selectedTheme === theme.id;
              return (
                <div key={theme.id} className="flex-[0_0_100%] min-w-0 px-6 md:px-10 flex items-center justify-center">
                  <div 
                    className={cn(
                      "relative bg-[#141414] rounded-[24px] overflow-hidden transition-all duration-500 w-full max-w-[280px] aspect-[3/4.2] border-2",
                      isSelected 
                        ? "scale-100 opacity-100 shadow-[0_0_30px_rgba(0,0,0,0.5)]" 
                        : "scale-90 opacity-40 border-[#2b2b2b] shadow-none"
                    )}
                    style={isSelected ? { 
                      borderColor: theme.color,
                      boxShadow: `0 0 20px ${theme.color}44, 0 0 40px ${theme.color}22`
                    } : {}}
                  >
                    {/* Top Glow Line */}
                    <div className={cn(
                      "absolute top-0 left-0 right-0 h-[3.5px] z-30 transition-opacity duration-500",
                      isSelected ? "opacity-100" : "opacity-0"
                    )} 
                    style={{ background: `linear-gradient(90deg, transparent, ${theme.color}, transparent)` }}
                    />

                    {/* Media Area */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#1f1f1f] to-[#141414] z-10">
                      <Image 
                        src={theme.image} 
                        fill 
                        className="object-cover opacity-90" 
                        alt={theme.name} 
                      />
                      {/* Gradient Overlay for Text */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-20" />
                    </div>

                    {/* Card Body Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 z-30">
                      <div className="flex justify-between items-center mb-2">
                        <h2 className="text-white text-xl font-black m-0 font-inter">{theme.name}</h2>
                        <span 
                          className="px-3 py-1 rounded-full text-[0.65rem] font-black uppercase tracking-wider border"
                          style={{ 
                            backgroundColor: `${theme.color}22`, 
                            color: theme.color, 
                            borderColor: `${theme.color}44` 
                          }}
                        >
                          {theme.badge}
                        </span>
                      </div>

                      <p className="text-[#b3b3b3] text-xs leading-relaxed mb-4 font-medium line-clamp-2">
                        {theme.description}
                      </p>

                      <button className="w-full bg-white/5 border border-[#2b2b2b] text-white py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all hover:bg-white/10 hover:border-[#b3b3b3] active:scale-95">
                        <ExternalLink className="w-3.5 h-3.5" />
                        Ver demo
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button 
          onClick={scrollPrev}
          className="absolute left-0 md:left-4 top-[40%] -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all active:scale-90 z-20"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <button 
          onClick={scrollNext}
          className="absolute right-0 md:right-4 top-[40%] -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all active:scale-90 z-20"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>

        {/* Pagination Dots */}
        <div className="flex gap-2 mt-5">
          {THEME_OPTIONS.map((theme, i) => (
            <div 
              key={i} 
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === selectedIndex ? "w-6" : "w-2 bg-white/10"
              )} 
              style={i === selectedIndex ? { backgroundColor: theme.color } : {}}
            />
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center gap-4 w-full max-w-[320px]">
        <div className="text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-white/40">
            Tema selecionado: <span className="font-black" style={{ color: themeColor }}>{currentTheme.name}</span>
          </p>
        </div>
        <button 
          onClick={onNext} 
          className="w-full text-white h-14 rounded-2xl font-black text-sm shadow-2xl active:scale-95 transition-all"
          style={{ 
            backgroundColor: themeColor,
            boxShadow: `0 10px 25px ${themeColor}44`
          }}
        >
          Próximo
        </button>
      </div>
    </div>
  );
}
