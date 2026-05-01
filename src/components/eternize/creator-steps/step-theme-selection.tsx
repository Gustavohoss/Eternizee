
'use client';

import React, { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ChevronLeft, ChevronRight, Play } from 'lucide-react';
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
    <div className="relative z-10 container mx-auto px-4 pt-16 md:pt-20 pb-16 max-w-4xl min-h-[calc(100vh-80px)] flex flex-col justify-center">
      <Link href="/">
        <button className="group flex items-center gap-2 text-white/40 hover:text-white transition-colors text-[10px] md:text-[11px] font-bold mb-6 md:mb-8 w-fit mx-auto md:mx-0">
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Sair do Criador
        </button>
      </Link>
      
      <div className="space-y-2 mb-8 md:mb-12 text-center md:text-left">
        <h2 className="text-3xl md:text-5xl font-black tracking-tight">Qual tema você quer usar?</h2>
        <p className="text-xs md:text-base text-white/40 font-medium">Escolha o estilo da página e personalizamos tudo para você.</p>
      </div>

      <div className="relative flex flex-col items-center">
        {/* Carousel Container */}
        <div className="w-full max-w-[500px] overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {THEME_OPTIONS.map((theme) => (
              <div key={theme.id} className="flex-[0_0_100%] min-w-0 px-4 md:px-8">
                <div 
                  className={cn(
                    "relative bg-[#141414] rounded-[20px] overflow-hidden transition-all duration-500 w-full max-w-[340px] mx-auto",
                    "border-[1.5px] border-[#e50914]/40 shadow-[0_10px_40px_rgba(0,0,0,0.8)]",
                    selectedTheme === theme.id ? "scale-100 opacity-100" : "scale-90 opacity-40"
                  )}
                >
                  {/* Top Glow Line */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#e50914] to-transparent z-10" />

                  {/* Media Area */}
                  <div className="relative w-full h-[300px] bg-gradient-to-b from-[#1f1f1f] to-[#141414]">
                    <Image 
                      src={theme.image} 
                      fill 
                      className="object-cover opacity-90" 
                      alt={theme.name} 
                    />
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-3">
                      <h2 className="text-white text-xl md:text-[1.4rem] font-bold m-0 font-inter">{theme.name}</h2>
                      <span className="bg-[#e50914]/15 text-[#ff4d4d] px-3.5 py-1 rounded-[15px] text-[0.75rem] font-semibold border border-[#e50914]/30">
                        {theme.badge}
                      </span>
                    </div>

                    <p className="text-[#b3b3b3] text-[0.95rem] leading-[1.5] mb-6 font-medium line-clamp-2">
                      {theme.description}
                    </p>

                    <button className="w-full bg-white/5 border border-[#2b2b2b] text-white py-3.5 rounded-[12px] text-base font-semibold flex items-center justify-center gap-2.5 transition-all hover:bg-white/10 hover:border-[#b3b3b3] active:scale-95">
                      <Play className="w-[18px] h-[18px] fill-current" />
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
          className="absolute left-0 md:-left-12 top-[40%] -translate-y-1/2 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all active:scale-90 z-20"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={scrollNext}
          className="absolute right-0 md:-right-12 top-[40%] -translate-y-1/2 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all active:scale-90 z-20"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Pagination Dots */}
        <div className="flex gap-2 mt-8">
          {THEME_OPTIONS.map((_, i) => (
            <div 
              key={i} 
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === selectedIndex ? "w-8 bg-primary" : "w-2 bg-white/10"
              )} 
            />
          ))}
        </div>
      </div>

      <div className="mt-12 flex flex-col items-center gap-6">
        <div className="text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-1">Tema selecionado</p>
          <h4 className="text-xl font-black text-white">{THEME_OPTIONS[selectedIndex].name}</h4>
        </div>
        <button 
          onClick={onNext} 
          className="w-full max-w-[280px] bg-[#e50914] hover:bg-[#b20710] text-white h-12 md:h-14 rounded-xl font-black text-sm md:text-base shadow-2xl active:scale-95 transition-all"
        >
          Próximo
        </button>
      </div>
    </div>
  );
}
