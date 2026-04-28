
'use client';

import React, { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
                    "relative aspect-[3.5/5] bg-[#0c0c0c] border rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-500",
                    selectedTheme === theme.id ? "border-primary/50 ring-4 ring-primary/10 scale-100" : "border-white/10 opacity-40 scale-90"
                  )}
                >
                  <Image 
                    src={theme.image} 
                    fill 
                    className="object-cover opacity-80" 
                    alt={theme.name} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-transparent to-transparent" />
                  
                  {/* Theme Info Overlay */}
                  <div className="absolute bottom-8 left-8 right-8 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl md:text-3xl font-black italic tracking-tighter">{theme.name}</h3>
                      <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/20 text-[10px] uppercase font-black px-3 py-1">
                        {theme.badge}
                      </Badge>
                    </div>
                    <p className="text-xs text-white/60 font-medium leading-relaxed">
                      {theme.description}
                    </p>
                    <Button variant="outline" className="w-full bg-white/5 border-white/10 rounded-xl h-10 text-[10px] font-bold uppercase tracking-wider group hover:bg-white/10">
                      <Play className="w-3 h-3 fill-current mr-2" /> Ver demo
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button 
          onClick={scrollPrev}
          className="absolute left-0 md:-left-12 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all active:scale-90"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={scrollNext}
          className="absolute right-0 md:-right-12 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all active:scale-90"
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
        <Button 
          onClick={onNext} 
          className="w-full max-w-[280px] bg-primary hover:bg-primary/90 h-12 md:h-14 rounded-xl font-black text-sm md:text-base shadow-2xl shadow-primary/20 active:scale-95 transition-all"
        >
          Próximo
        </Button>
      </div>
    </div>
  );
}
