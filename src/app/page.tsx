
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import NextLink from 'next/link';
import Image from 'next/image';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { THEME_OPTIONS } from '@/app/criador/constants';
import { cn } from '@/lib/utils';

export default function LandingPage() {
  const [text, setText] = useState('');
  const phrases = ["para o seu mozão!", "para a sua vovó!", "com a sua trilha sonora!", "para o seu amor!"];
  const [pIndex, setPIndex] = useState(0);
  const [cIndex, setCIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Embla Carousel Logic (Same as creator)
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    align: 'center', 
    skipSnaps: false,
    duration: 30
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  // Typewriter Effect
  useEffect(() => {
    const current = phrases[pIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (cIndex < current.length) {
          setText(current.substring(0, cIndex + 1));
          setCIndex(cIndex + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (cIndex > 0) {
          setText(current.substring(0, cIndex - 1));
          setCIndex(cIndex - 1);
        } else {
          setIsDeleting(false);
          setPIndex((pIndex + 1) % phrases.length);
        }
      }
    }, isDeleting ? 50 : 120);

    return () => clearTimeout(timeout);
  }, [cIndex, isDeleting, pIndex]);

  const currentTheme = THEME_OPTIONS[selectedIndex];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-[#ff4d6d] overflow-x-hidden">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');
        
        .typing-container {
          font-family: 'Great Vibes', cursive;
        }

        .cursor {
          width: 2px;
          height: 35px;
          background-color: #ff4d6d;
          margin-left: 5px;
          animation: blink 0.8s infinite;
        }

        @keyframes blink { 50% { opacity: 0; } }

        .cta-button {
          background: linear-gradient(90deg, #ff4d6d, #c9184a);
          box-shadow: 0 8px 20px rgba(255, 77, 109, 0.2);
        }
      `}</style>

      {/* Top Bar */}
      <div className="bg-gradient-to-r from-[#5c1421] to-[#1a0a0d] text-[12px] text-center py-2 text-[#ffb3c1] font-medium">
        ⚡ Apenas hoje — Todos os planos com <strong>50% OFF</strong> de desconto, aproveite! <u className="cursor-pointer ml-1">Ver planos</u>
      </div>

      {/* Header */}
      <header className="flex justify-between items-center px-[5%] md:px-[8%] py-4 bg-[#0a0a0a]/95 border-b border-[#1a1a1a] sticky top-0 z-[100] backdrop-blur-md">
        <div className="logo text-white font-bold text-[22px] flex items-center tracking-tight">
          Eternize.
        </div>
        <nav className="hidden lg:flex">
          <NextLink href="/" className="mx-4 text-[13px] opacity-80 hover:opacity-100 hover:text-[#ff4d6d] transition-all">Início</NextLink>
          <NextLink href="#" className="mx-4 text-[13px] opacity-80 hover:opacity-100 hover:text-[#ff4d6d] transition-all">Como funciona?</NextLink>
          <NextLink href="#" className="mx-4 text-[13px] opacity-80 hover:opacity-100 hover:text-[#ff4d6d] transition-all">Planos</NextLink>
          <NextLink href="#" className="mx-4 text-[13px] opacity-80 hover:opacity-100 hover:text-[#ff4d6d] transition-all">F.A.Q</NextLink>
        </nav>
        <div className="flex items-center gap-4 md:gap-6">
          <NextLink href="/minhas-paginas" className="hidden md:block text-[13px] font-semibold hover:text-[#ff4d6d] transition-colors">Fazer Login</NextLink>
          <NextLink href="/criador" className="bg-[#ff4d6d] px-5 py-2.5 rounded-full text-white font-bold text-[13px] hover:bg-[#ff4d6d]/90 transition-all active:scale-95 shadow-lg shadow-[#ff4d6d]/20">
            Criar minha página
          </NextLink>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center justify-center min-h-[calc(100vh-120px)] px-[5%] md:px-[8%] gap-12 lg:gap-20 py-12 lg:py-0">
        <div className="flex-1 max-w-[550px] text-center lg:text-left flex flex-col items-center lg:items-start animate-in fade-in slide-in-from-left-8 duration-1000">
          <div className="bg-[#ff4d6d]/10 text-[#ff4d6d] px-4 py-1.5 rounded-full text-[11px] border border-[#ff4d6d]/20 mb-6 inline-block font-bold tracking-wide uppercase italic">
            ✨ Nós te ajudamos a criar em 5 minutos
          </div>
          
          <h1 className="text-[48px] md:text-[62px] font-black leading-[1.1] m-0 tracking-tighter">
            Declare seu amor
          </h1>
          
          <div className="typing-container text-[36px] md:text-[48px] text-[#ff4d6d] h-[60px] md:h-[70px] mb-4 flex items-center justify-center lg:justify-start">
            <span>{text}</span>
            <span className="cursor" />
          </div>
          
          <p className="text-[16px] md:text-[18px] text-[#b3b3b3] leading-relaxed mb-10 max-w-[90%] md:max-w-[480px] font-medium">
            Crie um presente digital com fotos, música e textos personalizados, para quem você ama e surpreenda a pessoa. Pronto em 5 minutos.
          </p>

          <NextLink href="/criador" className="cta-button text-white px-8 py-4 md:px-10 md:py-5 rounded-xl text-[18px] md:text-[20px] font-black inline-flex items-center gap-3 transition-all hover:brightness-110 active:scale-95 w-full sm:w-auto justify-center group uppercase italic tracking-tight">
            Quero criar agora! <span className="text-2xl transition-transform group-hover:translate-x-1">›</span>
          </NextLink>

          <div className="flex items-center mt-10 gap-4 social-proof">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <img key={i} src={`https://i.pravatar.cc/100?u=${i + 10}`} className="w-[34px] h-[34px] rounded-full border-2 border-[#0a0a0a] shadow-lg" alt="usuário satisfeito" />
              ))}
            </div>
            <div className="text-[12px] md:text-[13px] text-[#b3b3b3] font-medium">
              <span className="text-[#ffb703] block mb-0.5 text-sm">★★★★★</span>
              Mais de 75.000 usuários satisfeitos
            </div>
          </div>
        </div>

        {/* Visual Carousel (Same as Theme Selection) */}
        <div className="flex-1 flex flex-col items-center justify-center w-full lg:w-auto relative animate-in fade-in slide-in-from-right-8 duration-1000 delay-200 py-10">
          <div className="relative w-full max-w-[400px] flex flex-col items-center">
            {/* Carousel Container */}
            <div className="w-full overflow-visible" ref={emblaRef}>
              <div className="flex">
                {THEME_OPTIONS.map((theme, i) => {
                  const isSelected = selectedIndex === i;
                  return (
                    <div 
                      key={theme.id} 
                      className="flex-[0_0_75%] sm:flex-[0_0_100%] min-w-0 px-4 flex items-center justify-center transition-opacity duration-500"
                      style={{ 
                        opacity: isSelected ? 1 : 0.2,
                        zIndex: isSelected ? 50 : 10
                      }}
                    >
                      <div 
                        className={cn(
                          "relative bg-[#141414] rounded-[24px] overflow-hidden transition-all duration-500 w-full max-w-[280px] aspect-[3/4] border-2",
                          isSelected 
                            ? "scale-100 opacity-100" 
                            : "scale-85 opacity-50 border-transparent grayscale-[0.3]"
                        )}
                        style={isSelected ? { 
                          borderColor: theme.color,
                          boxShadow: `0 0 40px ${theme.color}66, 0 0 80px ${theme.color}33`
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
                            data-ai-hint="theme preview"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-20" />
                        </div>

                        {/* Card Body Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-5 z-30">
                          <div className="flex justify-between items-center mb-1">
                            <h2 className="text-white text-lg font-black m-0 font-inter">{theme.name}</h2>
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

                          <p className="text-[#b3b3b3] text-[10px] leading-snug mb-4 font-medium line-clamp-2">
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

            {/* Navigation Arrows */}
            <button 
              onClick={scrollPrev}
              className="absolute left-[-20px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all active:scale-90 z-20"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button 
              onClick={scrollNext}
              className="absolute right-[-20px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all active:scale-90 z-20"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>

            {/* Pagination Dots */}
            <div className="flex gap-2.5 mt-8 shrink-0 z-20">
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

            <div className="mt-8 text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
                Selecionado: <span className="text-white" style={{ color: currentTheme.color }}>{currentTheme.name}</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-[8%] border-t border-[#1a1a1a] flex flex-col md:flex-row justify-between items-center gap-4 text-[#555] text-[12px] font-medium">
        <p>© 2025 Eternize - Presentes Digitais Eternos.</p>
        <div className="flex gap-6">
          <NextLink href="#" className="hover:text-white transition-colors">Termos de Uso</NextLink>
          <NextLink href="#" className="hover:text-white transition-colors">Privacidade</NextLink>
          <NextLink href="#" className="hover:text-white transition-colors">Suporte</NextLink>
        </div>
      </footer>
    </div>
  );
}
