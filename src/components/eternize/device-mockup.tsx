'use client';

import React, { useMemo, useState, useEffect, useCallback, useRef } from 'react';
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
  Lock,
  Music2,
  Hash,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { cn } from '@/lib/utils';
import { intervalToDuration, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
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

  // States for Netflix Experience
  const [isIntroActive, setIsIntroActive] = useState(false);
  const [introPhase, setIntroPhase] = useState<'idle' | 'closing' | 'blackout' | 'logo'>('idle');
  const [showStories, setShowStories] = useState(false);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [storyProgress, setStoryProgress] = useState(0);

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
      case 'dancing-script': return "'Dancing Script', cursive";
      case 'lora': return "'Lora', serif";
      default: return "'Inter', sans-serif";
    }
  };

  const startExperience = () => {
    if (uploadedPhotos.length === 0) return;
    
    setIsIntroActive(true);
    setIntroPhase('closing');
    
    setTimeout(() => {
      setIntroPhase('blackout');
    }, 1500);

    setTimeout(() => {
      setIntroPhase('logo');
    }, 1600);

    setTimeout(() => {
      setIsIntroActive(false);
      setIntroPhase('idle');
      setShowStories(true);
      setCurrentStoryIndex(0);
      setStoryProgress(0);
    }, 4500); 
  };

  const nextStory = useCallback(() => {
    if (currentStoryIndex < uploadedPhotos.length - 1) {
      setCurrentStoryIndex(prev => prev + 1);
      setStoryProgress(0);
    } else {
      setShowStories(false);
      setStoryProgress(0);
    }
  }, [currentStoryIndex, uploadedPhotos.length]);

  const prevStory = useCallback(() => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(prev => prev - 1);
      setStoryProgress(0);
    }
  }, [currentStoryIndex]);

  // Automatic progression for stories
  useEffect(() => {
    if (!showStories || uploadedPhotos.length === 0) return;

    const intervalTime = 50; // Update every 50ms for smooth progress
    const duration = 5000; // 5 seconds per story
    const step = (intervalTime / duration) * 100;

    const timer = setInterval(() => {
      setStoryProgress(prev => {
        if (prev >= 100) {
          nextStory();
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [showStories, nextStory, uploadedPhotos.length]);

  const shadowSizeDate = dateNeonStrength || 10;
  const neonShadowDate = dateHasNeon 
    ? `0 0 ${shadowSizeDate/2}px ${dateColor}, 0 0 ${shadowSizeDate}px ${dateColor}, 0 0 ${shadowSizeDate*1.5}px ${dateColor}` 
    : 'none';
    
  const dateStyle: React.CSSProperties = {
    color: dateColor,
    fontFamily: getFontFamily(dateFont || 'inter'),
    fontWeight: dateIsBold ? '700' : '400',
    textShadow: neonShadowDate
  };

  const shadowSizeTitle = titleNeonStrength || 10;
  const neonShadowTitle = titleHasNeon 
    ? `0 0 ${shadowSizeTitle/2}px ${titleColor}, 0 0 ${shadowSizeTitle}px ${titleColor}, 0 0 ${shadowSizeTitle*1.5}px ${titleColor}` 
    : 'none';

  const titleStyle: React.CSSProperties = { 
    color: titleColor,
    fontFamily: selectedTheme === 'netflix' ? "'Bebas Neue', cursive" : getFontFamily(titleFont || 'dancing-script'),
    fontWeight: selectedTheme === 'netflix' ? 'normal' : (titleIsBold ? '700' : '400'),
    textShadow: neonShadowTitle,
    textTransform: selectedTheme === 'netflix' ? 'uppercase' : 'none' as any
  };

  const slugifiedTitle = (pageTitle || '').toLowerCase().replace(/\s+/g, '-').normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  return (
    <div className={cn(
      "w-full transition-all duration-500 flex flex-col relative", 
      isFullscreen ? "h-full max-w-none" : "max-w-[380px]"
    )}>
      {/* Intro Curtain Animation */}
      {isIntroActive && (
        <div className="absolute inset-0 z-[1000] overflow-hidden bg-black flex items-center justify-center">
          <div className="absolute inset-0 flex z-10 pointer-events-none">
            {[...Array(30)].map((_, i) => (
              <div 
                key={i} 
                className={cn(
                  "flex-1 h-full transition-all duration-[1200ms] cubic-bezier(0.45, 0.05, 0.55, 0.95)",
                  (i + 1) % 2 !== 0 ? "-translate-y-full" : "translate-y-full",
                  introPhase !== 'idle' && "translate-y-0",
                  (introPhase === 'blackout' || introPhase === 'logo') && "animate-fade-out-bars"
                )}
                style={{
                  backgroundColor: `rgb(${Math.floor(26 + (i * (192 / 30)))}, 0, 0)`,
                  transitionDelay: `${i * 0.02}s`,
                }}
              />
            ))}
          </div>

          <h1 className={cn(
            "logo-text absolute z-20 text-[#E50914] text-4xl md:text-6xl font-bebas tracking-[15px] uppercase transition-all duration-1000 pointer-events-none",
            introPhase === 'logo' ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-90 blur-xl"
          )}>
            ETERNIZE
          </h1>
        </div>
      )}

      {/* Story Viewer Interface */}
      {showStories && uploadedPhotos.length > 0 && (
        <div className="absolute inset-0 z-[500] bg-black flex flex-col animate-in fade-in duration-500">
          {/* Progress Bars */}
          <div className="absolute top-4 left-0 right-0 z-[510] px-3 flex gap-1">
            {uploadedPhotos.map((_, i) => (
              <div key={i} className="flex-1 h-0.5 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className={cn(
                    "h-full bg-white transition-all duration-100 ease-linear",
                    i < currentStoryIndex ? "w-full" : i === currentStoryIndex ? "" : "w-0"
                  )} 
                  style={i === currentStoryIndex ? { width: `${storyProgress}%` } : {}}
                />
              </div>
            ))}
          </div>

          {/* Close Button */}
          <button 
            onClick={() => setShowStories(false)}
            className="absolute top-8 right-4 z-[520] p-2 bg-black/40 backdrop-blur-md rounded-full text-white/80 hover:text-white transition-all border border-white/10 shadow-2xl"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Interaction Layers */}
          <div className="absolute inset-0 z-[505] flex">
            <div className="flex-1 h-full cursor-pointer" onClick={prevStory} />
            <div className="flex-1 h-full cursor-pointer" onClick={nextStory} />
          </div>

          {/* Main Content */}
          <div className="flex-1 relative">
            <Image 
              src={uploadedPhotos[currentStoryIndex]} 
              fill 
              className="object-cover" 
              alt={`Story ${currentStoryIndex}`} 
              priority
            />
            {/* Bottom Info Overlay */}
            <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black via-black/40 to-transparent">
              <p className="text-[#e50914] text-[10px] font-black uppercase tracking-[0.2em] mb-2">
                Memória {currentStoryIndex + 1} / {uploadedPhotos.length}
              </p>
              <h2 style={titleStyle} className="text-3xl font-bebas text-white tracking-tight leading-none mb-4">
                {pageTitle || 'ETERNIZE'}
              </h2>
            </div>
          </div>
        </div>
      )}

      {!isFullscreen && (
        <div className="mb-6 text-center"><p className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Prévia em tempo real</p></div>
      )}
      
      <div className={cn(
        "bg-white border-x border-t border-neutral-200 p-2.5 flex items-center justify-center shrink-0",
        isFullscreen ? "rounded-none" : "rounded-t-2xl"
      )}>
        <div className="bg-neutral-100 rounded-full h-8 w-full flex items-center px-4 gap-2 border border-neutral-200 max-w-[400px]">
          <Lock className="w-3 h-3 text-neutral-400" />
          <div className="text-[11px] text-neutral-600 font-medium truncate">
            eternize.com/{slugifiedTitle || 'seu-nome'}
          </div>
        </div>
      </div>

      <div className={cn(
        "relative bg-black border-x border-b border-white/10 overflow-hidden shadow-2xl flex-1",
        isFullscreen ? "rounded-none h-full" : "rounded-b-[2.5rem] aspect-[9/19]"
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
            {selectedTheme === 'netflix' ? (
              <div className="w-full h-full bg-[#141414] text-white font-inter relative flex flex-col custom-scroll overflow-y-auto">
                <header className="sticky top-0 z-50 px-4 py-4 flex items-center justify-between bg-gradient-to-b from-black via-black/80 to-transparent">
                  <div className="text-[#e50914] font-bebas text-2xl tracking-tighter uppercase">ETERNIZE</div>
                  <div className="w-8 h-8 rounded-sm bg-[#e50914] flex items-center justify-center text-[11px] font-black tracking-tight">EZ</div>
                </header>

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

                    <div className="flex items-center gap-3 mb-2 text-[12px] font-semibold">
                      <span className="text-[#46d369]">98% compatível</span>
                      <span className="text-neutral-400 font-medium">{date ? date.getFullYear() : '2026'}</span>
                      <span className="text-neutral-400 font-medium">{uploadedPhotos.length || 8} Temporadas</span>
                      <div className="border border-neutral-600 px-1 rounded-sm text-[9px] bg-black/40 font-bold">HD</div>
                    </div>

                    <div className="mb-4">
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

                    <div className="flex flex-col gap-2">
                      <button 
                        onClick={startExperience}
                        className="w-full bg-white text-black py-2.5 rounded flex items-center justify-center gap-2 text-sm font-bold active:scale-95 transition-transform"
                      >
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
                  </div>
                </section>

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
                      </>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              /* THEME CLASSIC / OTHERS */
              <div className="w-full flex flex-col items-center pt-8 px-5 gap-6">
                <div 
                  style={showCard ? { backgroundColor: cardColor } : { backgroundColor: 'transparent' }} 
                  className={cn(
                    "w-full rounded-[8px] z-20 flex flex-col items-center transition-all duration-300", 
                    showCard ? "shadow-[0_15px_35px_rgba(0,0,0,0.5)] p-[12px]" : "p-0", 
                    showCard && (photoEffect === 'cards' ? "pb-[40px]" : "pb-[35px]")
                  )}
                >
                  {titlePosition === 'top' && (
                    <div className="w-full text-center mb-4">
                      <span style={titleStyle} className="text-[26px] block px-2 tracking-[1px] leading-relaxed break-words">
                        {pageTitle || "Seu Nome"}
                      </span>
                    </div>
                  )}
                  
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
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#f5f5f5] rounded-[4px]">
                        <ImageIcon className="w-12 h-12 text-black/10" />
                        <span className="text-[8px] font-black uppercase tracking-[0.2em] text-black/10">Sua Foto</span>
                      </div>
                    )}
                  </div>

                  {titlePosition === 'bottom' && (
                    <div className="w-full text-center mt-4">
                      <span style={titleStyle} className="text-[26px] block px-2 tracking-[1px] leading-relaxed break-words">
                        {pageTitle || "Seu Nome"}
                      </span>
                    </div>
                  )}
                </div>

                {date && (
                  <div className="w-full py-4">
                    {selectedCountStyle === 'padrao' && (
                      <div className="w-full text-center">
                        <h2 className="text-[#55b2d4] text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
                          Uau, estão juntos há
                        </h2>
                        <div className="bg-[#181818] rounded-[24px] border border-white/5 overflow-hidden p-6 shadow-2xl relative">
                          <div className="grid grid-cols-3 gap-y-8 relative">
                            <div className="absolute inset-x-0 top-1/2 h-[1px] bg-white/5 -translate-y-1/2"></div>
                            <div className="absolute left-1/3 inset-y-0 w-[1px] bg-white/5"></div>
                            <div className="absolute left-2/3 inset-y-0 w-[1px] bg-white/5"></div>

                            <div className="flex flex-col items-center py-2">
                              <span style={{ ...dateStyle, fontFamily: "'Lora', serif" }} className="text-4xl">{timeDiff?.years || 0}</span>
                              <span className="text-neutral-500 text-[9px] uppercase tracking-widest mt-1 font-bold">Anos</span>
                            </div>
                            <div className="flex flex-col items-center py-2">
                              <span style={{ ...dateStyle, fontFamily: "'Lora', serif" }} className="text-4xl">{timeDiff?.months || 0}</span>
                              <span className="text-neutral-500 text-[9px] uppercase tracking-widest mt-1 font-bold">Meses</span>
                            </div>
                            <div className="flex flex-col items-center py-2">
                              <span style={{ ...dateStyle, fontFamily: "'Lora', serif" }} className="text-4xl">{timeDiff?.days || 0}</span>
                              <span className="text-neutral-500 text-[9px] uppercase tracking-widest mt-1 font-bold">Dias</span>
                            </div>
                            <div className="flex flex-col items-center py-2">
                              <span style={{ ...dateStyle, fontFamily: "'Lora', serif" }} className="text-4xl">{timeDiff?.hours || 0}</span>
                              <span className="text-neutral-500 text-[9px] uppercase tracking-widest mt-1 font-bold">Horas</span>
                            </div>
                            <div className="flex flex-col items-center py-2">
                              <span style={{ ...dateStyle, fontFamily: "'Lora', serif" }} className="text-4xl">{timeDiff?.minutes || 0}</span>
                              <span className="text-neutral-500 text-[9px] uppercase tracking-widest mt-1 font-bold">Minutos</span>
                            </div>
                            <div className="flex flex-col items-center py-2">
                              <span style={{ ...dateStyle, fontFamily: "'Lora', serif" }} className="text-4xl">{timeDiff?.seconds || 0}</span>
                              <span className="text-neutral-500 text-[9px] uppercase tracking-widest mt-1 font-bold">Segundos</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-neutral-500 text-xs mt-8 font-medium">
                          Desde {format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                        </p>
                      </div>
                    )}

                    {selectedCountStyle === 'classico' && (
                      <div className="grid grid-cols-4 gap-3">
                        <div className="text-center bg-white/5 p-2 rounded-lg border border-white/5">
                          <p style={dateStyle} className="text-xl">{timeDiff?.years || 0}</p>
                          <p className="text-[8px] uppercase font-black opacity-40">Anos</p>
                        </div>
                        <div className="text-center bg-white/5 p-2 rounded-lg border border-white/5">
                          <p style={dateStyle} className="text-xl">{timeDiff?.months || 0}</p>
                          <p className="text-[8px] uppercase font-black opacity-40">Meses</p>
                        </div>
                        <div className="text-center bg-white/5 p-2 rounded-lg border border-white/5">
                          <p style={dateStyle} className="text-xl">{timeDiff?.days || 0}</p>
                          <p className="text-[8px] uppercase font-black opacity-40">Dias</p>
                        </div>
                        <div className="text-center bg-white/5 p-2 rounded-lg border border-white/5">
                          <p style={dateStyle} className="text-xl">{timeDiff?.hours || 0}</p>
                          <p className="text-[8px] uppercase font-black opacity-40">Horas</p>
                        </div>
                      </div>
                    )}

                    {selectedCountStyle === 'simples' && (
                      <div className="text-center">
                        <p style={dateStyle} className="text-base">Desde {date.toLocaleDateString('pt-BR')}</p>
                      </div>
                    )}

                    {selectedCountStyle === 'data-grande' && (
                      <div className="text-center px-4">
                        <p style={dateStyle} className="text-2xl leading-tight">
                          {format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                        </p>
                        <p className="text-[10px] uppercase tracking-[0.2em] font-black opacity-30 mt-1">O dia que tudo começou</p>
                      </div>
                    )}

                    {selectedCountStyle === 'dias-grandes' && (
                      <div className="text-center w-full py-8">
                        <p style={{ ...dateStyle, fontFamily: "'Lora', serif" }} className="text-7xl mb-2">
                          {totalDays}
                        </p>
                        <p className="text-neutral-500 text-[10px] uppercase tracking-[0.4em] font-bold">
                          Dias de Felicidade
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {message && (
                  <div className="w-full px-2 mt-2">
                    <div 
                      style={{ color: messageColor, fontFamily: getFontFamily(messageFont || 'inter') }} 
                      className="text-center text-sm leading-relaxed" 
                      dangerouslySetInnerHTML={{ __html: message }}
                    />
                  </div>
                )}

                {musicData && (
                  <div className="w-full px-1 mt-4">
                    <MusicPlayer 
                      musicData={musicData}
                      musicBoxColor={musicBoxColor}
                      musicTextColor={musicTextColor}
                      musicHasNeon={musicHasNeon}
                      musicNeonStrength={musicNeonStrength}
                      isAutoPlay={isAutoPlay}
                    />
                  </div>
                )}
                
                <div className="h-20 shrink-0" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
