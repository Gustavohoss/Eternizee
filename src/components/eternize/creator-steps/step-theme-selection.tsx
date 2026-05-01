
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
        <div className="w-full max-w-[480px] overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {THEME_OPTIONS.map((theme) => (
              <div key={theme.id} className="flex-[0_0_100%] min-w-0 px-6 md:px-10 flex items-center justify-center">
                <div 
                  className={cn(
                    "relative bg-[#141414] rounded-[20px] overflow-hidden transition-all duration-500 w-full max-w-[260px] aspect-[3/4] border-2",
                    selectedTheme === theme.id 
                      ? "scale-100 opacity-100 border-[#e50914] shadow-[0_0_20px_rgba(229,9,20,0.6),0_0_40px_rgba(229,9,20,0.2)]" 
                      : "scale-90 opacity-40 border-[#2b2b2b] shadow-none"
                  )}
                >
                  {/* Top Glow Line */}
                  <div className={cn(
                    "absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#e50914] to-transparent z-30 transition-opacity duration-500",
                    selectedTheme === theme.id ? "opacity-100" : "opacity-0"
                  )} />

                  {/* Media Area */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#1f1f1f] to-[#141414] z-10">
                    <Image 
                      src={theme.image} 
                      fill 
                      className="object-cover opacity-90" 
                      alt={theme.name} 
                    />
                    {/* Gradient Overlay for Text */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-20" />
                  </div>

                  {/* Card Body Overlay - Compacto */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-30">
                    <div className="flex justify-between items-center mb-1.5">
                      <h2 className="text-white text-base font-bold m-0 font-inter">{theme.name}</h2>
                      <span className="bg-[#e50914]/20 text-[#ff4d4d] px-2 py-0.5 rounded-[12px] text-[0.6rem] font-black uppercase tracking-wider border border-[#e50914]/30">
                        {theme.badge}
                      </span>
                    </div>

                    <p className="text-[#b3b3b3] text-[0.7rem] leading-[1.3] mb-3 font-medium line-clamp-2">
                      {theme.description}
                    </p>

                    <button className="w-full bg-white/5 border border-[#2b2b2b] text-white py-1.5 rounded-[10px] text-[0.7rem] font-bold flex items-center justify-center gap-2 transition-all hover:bg-white/10 hover:border-[#b3b3b3] active:scale-95">
                      <ExternalLink className="w-3 h-3" />
                      Ver demo
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button 
          onClick={scrollPrev}
          className="absolute left-0 md:left-2 top-[42%] -translate-y-1/2 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all active:scale-90 z-20"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button 
          onClick={scrollNext}
          className="absolute right-0 md:right-2 top-[42%] -translate-y-1/2 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all active:scale-90 z-20"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Pagination Dots */}
        <div className="flex gap-1 mt-4">
          {THEME_OPTIONS.map((_, i) => (
            <div 
              key={i} 
              className={cn(
                "h-1 rounded-full transition-all duration-300",
                i === selectedIndex ? "w-5 bg-[#e50914]" : "w-1.5 bg-white/10"
              )} 
            />
          ))}
        </div>
      </div>

      <div className="mt-5 flex flex-col items-center gap-3">
        <div className="text-center">
          <p className="text-[8px] font-black uppercase tracking-[0.2em] text-white/30 mb-0.5">Tema selecionado: <span className="text-white">{THEME_OPTIONS[selectedIndex].name}</span></p>
        </div>
        <button 
          onClick={onNext} 
          className="w-full min-w-[240px] md:min-w-[280px] bg-[#e50914] hover:bg-[#b20710] text-white h-11 md:h-12 rounded-xl font-black text-sm shadow-[0_10px_25px_rgba(229,9,20,0.3)] active:scale-95 transition-all"
        >
          Próximo
        </button>
      </div>
    </div>
  );
}
