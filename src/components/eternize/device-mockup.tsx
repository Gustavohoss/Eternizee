'use client';

import React, { useMemo, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { 
  Heart, 
  ImageIcon, 
  Clock,
  Calendar as CalendarIcon,
  Play,
  Plus,
  ThumbsUp,
  ChevronDown,
  Lock
} from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { cn } from '@/lib/utils';
import { intervalToDuration } from 'date-fns';
import { MusicPlayer } from './music-player';
import { SparklesCore } from '@/components/ui/sparkles';
import { SmokeBackground } from '@/components/ui/spooky-smoke-animation';
import { FallingPattern } from '@/components/ui/falling-pattern';
import { ThemeId } from '@/app/criador/constants';

interface DeviceMockupProps {
  selectedTheme?: ThemeId;
  selectedBgColor: string;
  selectedEffect: string;
  isEmojiRainEnabled: boolean;
  selectedEmojis: string[];
  emojiSize: number;
  step: string;
  uploadedPhotos: string[];
  pageTitle: string;
  message?: string;
  musicData?: {
    id: string;
    title: string;
    thumb: string;
  };
  date?: Date;
  selectedCountStyle: string;
  photoEffect: 'slide' | 'coverflow' | 'cards';
  titleColor?: string;
  titleFont?: string;
  titleIsBold?: boolean;
  titleHasNeon?: boolean;
  titleNeonStrength?: number;
  cardColor?: string;
  showCard?: boolean;
  titlePosition?: 'top' | 'bottom';
  dateColor?: string;
  dateFont?: string;
  dateIsBold?: boolean;
  dateHasNeon?: boolean;
  dateNeonStrength?: number;
  messageColor?: string;
  messageFont?: string;
  musicBoxColor?: string;
  musicTextColor?: string;
  musicHasNeon?: boolean;
  musicNeonStrength?: number;
  isAutoPlay?: boolean;

  sparklesDensity?: number;
  sparklesSpeed?: number;
  sparklesColor?: string;
  smokeIntensity?: number;
  smokeColor?: string;
  patternDuration?: number;
  patternDensity?: number;
  patternColor?: string;
  
  isFullscreen?: boolean;
}

export function DeviceMockup({
  selectedTheme = 'classic',
  selectedBgColor,
  selectedEffect,
  isEmojiRainEnabled,
  selectedEmojis,
  emojiSize,
  step,
  uploadedPhotos,
  pageTitle,
  message,
  musicData,
  date,
  selectedCountStyle,
  photoEffect = 'slide',
  titleColor = '#111111',
  titleFont = 'dancing-script',
  titleIsBold = false,
  titleHasNeon = false,
  titleNeonStrength = 10,
  cardColor = '#ffffff',
  showCard = true,
  titlePosition = 'bottom',
  dateColor = '#ffffff',
  dateFont = 'inter',
  dateIsBold = true,
  dateHasNeon = false,
  dateNeonStrength = 10,
  messageColor = '#ffffff',
  messageFont = 'inter',
  musicBoxColor = '#0e0e0e',
  musicTextColor = '#ffffff',
  musicHasNeon = false,
  musicNeonStrength = 15,
  isAutoPlay = true,

  sparklesDensity = 120,
  sparklesSpeed = 0.5,
  sparklesColor = '#ffffff',
  smokeIntensity = 0.5,
  smokeColor = '#ffffff',
  patternDuration = 150,
  patternDensity = 1,
  patternColor = '#ffffff',
  
  isFullscreen = false
}: DeviceMockupProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    duration: 30,
    align: 'center',
    containScroll: false,
    skipSnaps: false
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const [timeDiff, setTimeDiff] = useState<any>(null);

  useEffect(() => {
    if (!date) {
      setTimeDiff(null);
      return;
    }
    const updateCounter = () => {
      const now = new Date();
      if (now < date) {
        setTimeDiff({ years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      const duration = intervalToDuration({ start: date, end: now });
      setTimeDiff({
        years: duration.years || 0,
        months: duration.months || 0,
        days: duration.days || 0,
        hours: duration.hours || 0,
        minutes: duration.minutes || 0,
        seconds: duration.seconds || 0,
      });
    };
    updateCounter();
    const interval = setInterval(updateCounter, 1000);
    return () => clearInterval(interval);
  }, [date]);

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

  const raindrops = useMemo(() => {
    return [...Array(20)].map((_, i) => ({
      id: i,
      left: `${(i * 7) % 100}%`,
      duration: `${(i % 3) + 2}s`,
      delay: `${(i % 5)}s`,
      opacity: 0.6,
      emoji: selectedEmojis[i % selectedEmojis.length]
    }));
  }, [selectedEmojis]);

  const totalDays = useMemo(() => {
    if (!date) return 0;
    const now = new Date();
    if (now < date) return 0;
    return Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  }, [date]);

  const getFontFamily = (font: string) => {
    switch (font) {
      case 'pacifico': return "'Pacifico', cursive";
      case 'playfair': return "'Playfair Display', serif";
      case 'inter': return "'Inter', sans-serif";
      default: return "'Dancing Script', cursive";
    }
  };

  const shadowSizeDate = dateNeonStrength;
  const neonShadowDate = dateHasNeon 
    ? `0 0 ${shadowSizeDate/2}px ${dateColor}, 0 0 ${shadowSizeDate}px ${dateColor}, 0 0 ${shadowSizeDate*1.5}px ${dateColor}` 
    : 'none';
    
  const dateStyle: React.CSSProperties = {
    color: dateColor,
    fontFamily: getFontFamily(dateFont),
    fontWeight: dateIsBold ? '700' : '400',
    textShadow: neonShadowDate
  };

  const shadowSizeTitle = titleNeonStrength;
  const neonShadowTitle = titleHasNeon 
    ? `0 0 ${shadowSizeTitle/2}px ${titleColor}, 0 0 ${shadowSizeTitle}px ${titleColor}, 0 0 ${shadowSizeTitle*1.5}px ${titleColor}` 
    : 'none';

  const titleStyle: React.CSSProperties = { 
    color: titleColor,
    fontFamily: selectedTheme === 'netflix' ? "'Bebas Neue', cursive" : getFontFamily(titleFont),
    fontWeight: selectedTheme === 'netflix' ? 'normal' : (titleIsBold ? '700' : '400'),
    textShadow: neonShadowTitle,
    textTransform: selectedTheme === 'netflix' ? 'uppercase' : 'none' as any
  };

  const slugifiedTitle = pageTitle.toLowerCase().replace(/\s+/g, '-').normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  return (
    <div className={cn("w-full transition-all duration-500", isFullscreen ? "max-w-[450px]" : "max-w-[380px]")}>
      {!isFullscreen && (
        <div className="mb-6 text-center"><p className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Prévia em tempo real</p></div>
      )}
      
      {/* Browser Address Bar */}
      <div className={cn(
        "bg-white border-x border-t border-neutral-200 p-2.5 flex items-center justify-center transition-all",
        isFullscreen ? "rounded-none" : "rounded-t-2xl"
      )}>
        <div className="bg-neutral-100 rounded-full h-8 w-full flex items-center px-4 gap-2 border border-neutral-200">
          <Lock className="w-3 h-3 text-neutral-400" />
          <div className="text-[11px] text-neutral-600 font-medium truncate">
            eternize.com/{slugifiedTitle || 'seu-nome'}
          </div>
        </div>
      </div>

      <div className={cn(
        "relative aspect-[9/19] bg-black border-x border-b border-white/10 overflow-hidden shadow-2xl",
        isFullscreen ? "rounded-none h-[calc(90vh-90px)]" : "rounded-b-[2.5rem]"
      )}>
        <div className="absolute inset-0 transition-colors duration-500" style={{ backgroundColor: selectedTheme === 'netflix' ? '#141414' : selectedBgColor }}>
          {selectedEffect === 'sparkles' && selectedTheme !== 'netflix' && (
            <div className="absolute inset-0 pointer-events-none z-10">
              <SparklesCore background="transparent" minSize={0.4} maxSize={1.2} particleDensity={sparklesDensity} className="w-full h-full" particleColor={sparklesColor} speed={sparklesSpeed} />
            </div>
          )}
          {selectedEffect === 'smoke' && selectedTheme !== 'netflix' && (
            <div className="absolute inset-0 pointer-events-none z-10">
              <SmokeBackground smokeColor={smokeColor} backgroundColor={selectedBgColor} intensity={smokeIntensity} />
            </div>
          )}
          {selectedEffect === 'pattern' && selectedTheme !== 'netflix' && (
            <div className="absolute inset-0 pointer-events-none z-10">
              <FallingPattern backgroundColor={selectedBgColor} color={patternColor} blurIntensity="0px" duration={patternDuration} density={patternDensity} />
            </div>
          )}
          {isEmojiRainEnabled && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-[15]">{raindrops.map((drop) => (<div key={drop.id} className="absolute animate-fall" style={{ left: drop.left, top: `-40px`, animationDuration: drop.duration, animationDelay: drop.delay, opacity: drop.opacity, fontSize: `${emojiSize}px` }}>{drop.emoji}</div>))}</div>
          )}
          
          <div className="absolute inset-0 flex flex-col items-center overflow-y-auto hide-scrollbar">
            {(step !== 'theme-selection' && step !== 'gift-type') && (
              <>
                {selectedTheme === 'netflix' ? (
                  <div className="w-full h-full bg-[#141414] text-white font-inter relative flex flex-col custom-scroll overflow-y-auto">
                    {/* Header */}
                    <header className="sticky top-0 z-50 px-4 py-4 flex items-center justify-between bg-gradient-to-b from-black via-black/80 to-transparent">
                      <div className="text-[#e50914] font-bebas text-2xl tracking-tighter uppercase">ETERNIZE</div>
                      <div className="w-8 h-8 rounded-sm bg-[#e50914] flex items-center justify-center text-[11px] font-black tracking-tight">EZ</div>
                    </header>

                    {/* Hero Section */}
                    <section className="relative min-h-[65vh] flex flex-col justify-end -mt-16">
                      <div className="absolute inset-0 z-0 bg-cover bg-top transition-all duration-700" style={{ background: 'linear-gradient(135deg, rgb(35, 10, 10) 0%, rgb(15, 15, 15) 100%)' }}>
                        {uploadedPhotos.length > 0 && (
                          <Image src={uploadedPhotos[activeHeroIndex] || uploadedPhotos[0]} fill className="object-cover opacity-60" alt="Hero" priority />
                        )}
                      </div>
                      <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#141414] via-[#141414]/40 to-transparent"></div>
                      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#141414] via-[#141414]/20 to-transparent"></div>

                      <div className="relative z-20 px-4 pb-6 pt-48">
                        <div className="mb-1">
                          <span className="text-[#e50914] text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-1">
                            <span className="text-xs">❤️</span> Eternize Original
                          </span>
                        </div>
                        
                        {pageTitle ? (
                          <h1 style={titleStyle} className="text-5xl font-bebas uppercase leading-[0.9] mb-3 drop-shadow-2xl tracking-tight break-words">
                            {pageTitle}
                          </h1>
                        ) : (
                          <div className="w-[70%] h-12 bg-white/10 rounded-sm mb-3 animate-pulse-custom" />
                        )}

                        <div className="flex items-center gap-3 mb-5 text-[12px] font-semibold">
                          <span className="text-[#46d369]">98% compatível</span>
                          <span className="text-neutral-400 font-medium">{date ? date.getFullYear() : '2026'}</span>
                          <span className="text-neutral-400 font-medium">{uploadedPhotos.length || 8} Temporadas</span>
                          <div className="border border-neutral-600 px-1 rounded-sm text-[9px] bg-black/40 font-bold">HD</div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <button className="w-full bg-white text-black py-2.5 rounded flex items-center justify-center gap-2 text-sm font-bold active:scale-95 transition-transform">
                            <span className="text-base">▶</span> Reproduzir
                          </button>
                          <div className="flex gap-2">
                            <button className="flex-1 bg-[#2a2a2a]/80 backdrop-blur-md border border-white/10 py-2.5 rounded font-bold text-xs flex items-center justify-center gap-2 text-white">
                              <span className="text-lg leading-none">+</span> Minha lista
                            </button>
                            <button className="w-12 h-11 bg-[#2a2a2a]/80 backdrop-blur-md border border-white/10 rounded flex items-center justify-center text-lg active:bg-white/20 text-white">
                              👍
                            </button>
                            <button className="w-12 h-11 bg-[#2a2a2a]/80 backdrop-blur-md border border-white/10 rounded flex items-center justify-center text-lg active:bg-white/20 text-white">
                              ❤
                            </button>
                          </div>
                        </div>

                        {/* Netflix Synopsis/Description */}
                        <div className="mt-6">
                          {message ? (
                            <div 
                              className="text-[13px] text-white/70 leading-relaxed line-clamp-3" 
                              dangerouslySetInnerHTML={{ __html: message }}
                            />
                          ) : (
                            <div className="space-y-2 animate-pulse-custom">
                              <div className="h-2 bg-white/5 w-full rounded-full" />
                              <div className="h-2 bg-white/5 w-full rounded-full" />
                              <div className="h-2 bg-white/5 w-2/3 rounded-full" />
                            </div>
                          )}
                        </div>
                      </div>
                    </section>

                    {/* Stats Cards */}
                    <div className="px-4 py-4 bg-[#141414]">
                      <div className="grid grid-cols-3 gap-2">
                        <div className="bg-[#1e1e1e] rounded-lg p-3 text-center border border-white/5 shadow-inner">
                          <p style={dateStyle} className="text-2xl font-bebas">{timeDiff?.years || 0}</p>
                          <p className="text-neutral-500 text-[8px] uppercase tracking-wider font-bold">Anos juntos</p>
                        </div>
                        <div className="bg-[#1e1e1e] rounded-lg p-3 text-center border border-white/5 shadow-inner">
                          <p style={dateStyle} className="text-2xl font-bebas">{totalDays || 0}</p>
                          <p className="text-neutral-500 text-[8px] uppercase tracking-wider font-bold">Dias de história</p>
                        </div>
                        <div className="bg-[#1e1e1e] rounded-lg p-3 text-center border border-white/5 shadow-inner">
                          <p style={dateStyle} className="text-2xl font-bebas">{date ? `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}` : '06/04'}</p>
                          <p className="text-neutral-500 text-[8px] uppercase tracking-wider font-bold">Data especial</p>
                        </div>
                      </div>
                    </div>

                    {/* Tabs & Episodes */}
                    <div className="px-4 mt-2">
                      <div className="flex gap-8 border-b border-neutral-800 mb-4">
                        <button className="pb-3 text-sm font-bold border-b-[3px] border-[#e50914] tracking-tight">Episódios</button>
                        <button className="pb-3 text-sm font-bold text-neutral-500 tracking-tight">Detalhes</button>
                      </div>
                      
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-white text-sm font-bold flex items-center gap-1.5 uppercase text-[12px] tracking-tight">
                          Temporada 1 
                          <svg className="w-3 h-3 text-neutral-400" fill="currentColor" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                        </span>
                        <span className="text-neutral-600 text-[11px] font-semibold">{uploadedPhotos.length || 8} episódios</span>
                      </div>

                      <div className="space-y-6 pb-10">
                        {uploadedPhotos.length > 0 ? (
                          uploadedPhotos.map((photo, i) => (
                            <div 
                              key={i} 
                              className={cn(
                                "flex gap-3 items-center cursor-pointer group/ep transition-all",
                                activeHeroIndex === i ? "opacity-100" : "opacity-60 hover:opacity-100"
                              )}
                              onClick={() => setActiveHeroIndex(i)}
                            >
                              <div className="w-32 h-[72px] bg-[#2a2a2a] rounded-md flex-shrink-0 relative overflow-hidden">
                                <Image src={photo} fill className="object-cover" alt={`Ep ${i}`} />
                                <div className="absolute inset-0 bg-black/20 group-hover/ep:bg-black/0 transition-all flex items-center justify-center">
                                  {activeHeroIndex === i && (
                                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                      <Play className="w-4 h-4 text-white fill-white" />
                                    </div>
                                  )}
                                </div>
                                <div className="absolute bottom-1 right-1 bg-black/60 px-1 rounded-sm text-[7px] font-black border border-white/20">HD</div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-bold text-white mb-0.5">{(i + 1)}. Memória {(i + 1)}</p>
                                <p className="text-[10px] text-neutral-500 leading-tight font-medium">Reviva este capítulo especial da nossa história.</p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <>
                            <div className="flex gap-3 items-center animate-pulse-custom">
                                <div className="w-32 h-[72px] bg-[#2a2a2a] rounded-md flex-shrink-0"></div>
                                <div className="flex-1 space-y-2">
                                    <div className="h-3 bg-[#2a2a2a] w-3/4 rounded-full"></div>
                                    <div className="h-2 bg-[#2a2a2a] w-full rounded-full"></div>
                                    <div className="h-2 bg-[#2a2a2a] w-2/3 rounded-full"></div>
                                </div>
                            </div>
                            <div className="flex gap-3 items-center animate-pulse-custom opacity-60">
                                <div className="w-32 h-[72px] bg-[#2a2a2a] rounded-md flex-shrink-0"></div>
                                <div className="flex-1 space-y-2">
                                    <div className="h-3 bg-[#2a2a2a] w-2/4 rounded-full"></div>
                                    <div className="h-2 bg-[#2a2a2a] w-full rounded-full"></div>
                                </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full flex flex-col items-center pt-8 px-5 gap-6">
                    <div style={showCard ? { backgroundColor: cardColor } : { backgroundColor: 'transparent' }} className={cn("w-full rounded-[8px] z-20 flex flex-col items-center", showCard ? "shadow-[0_15px_35px_rgba(0,0,0,0.5)] p-[12px]" : "p-0", showCard && (photoEffect === 'cards' ? "pb-[40px]" : "pb-[35px]") )}>
                      <div className="w-full aspect-square relative photo-display-area" style={{ perspective: '1000px' }}>
                        {uploadedPhotos.length > 0 ? (
                          <div className="w-full h-full overflow-visible" ref={emblaRef}>
                            <div className="flex h-full items-center">
                              {uploadedPhotos.map((photo, i) => (
                                <div key={i} className="relative aspect-square flex-[0_0_100%] flex items-center justify-center">
                                  <div className="w-full h-full relative overflow-hidden rounded-[4px]">
                                    <Image src={photo} fill className="object-cover block" alt={`Foto ${i + 1}`} sizes="300px" priority />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (<div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#f5f5f5] rounded-[4px]"><ImageIcon className="w-12 h-12 text-black/10" /><span className="text-[8px] font-black uppercase tracking-[0.2em] text-black/10">Sua Foto Aqui</span></div>)}
                      </div>
                      <div className="w-full text-center mt-4">
                        <span style={titleStyle} className="text-[26px] block px-2 tracking-[1px] leading-relaxed break-words">
                          {pageTitle || "Seu Nome Aqui"}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
