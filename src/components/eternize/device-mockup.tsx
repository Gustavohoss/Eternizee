
'use client';

import React, { useMemo, useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { 
  Heart, 
  ImageIcon, 
  Clock,
  Calendar as CalendarIcon,
  Play,
  Pause,
  Plus,
  ThumbsUp,
  ChevronDown,
  Lock,
  Music2,
  Hash,
  X,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Shuffle,
  Volume2,
  ListMusic,
  Check
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
  isAutoPlay = false,

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

  // States for Special Experiences
  const [isIntroActive, setIsIntroActive] = useState(false);
  const [introPhase, setIntroPhase] = useState<'idle' | 'closing' | 'blackout' | 'logo'>('idle');
  const [showStories, setShowStories] = useState(false);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [storyProgress, setStoryProgress] = useState(0);
  const [isStoryPaused, setIsStoryPaused] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [activeTab, setActiveTab] = useState<'músicas' | 'eventos' | 'loja'>('músicas');
  const [experienceAutoPlay, setExperienceAutoPlay] = useState(false);
  const [showSpotifyAudioOverlay, setShowSpotifyAudioOverlay] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isInList, setIsInList] = useState(false);

  useEffect(() => {
    if (selectedTheme === 'spotify') {
      setActiveTab('músicas');
    } else {
      setActiveTab('episodios' as any);
    }
  }, [selectedTheme]);

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

  const totalDays = useMemo(() => {
    if (!date) return 26; 
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

  const startNetflixExperience = () => {
    if (uploadedPhotos.length === 0) return;
    setExperienceAutoPlay(true);
    setIsStoryPaused(false);
    setIsIntroActive(true);
    setIntroPhase('closing');
    setTimeout(() => setIntroPhase('blackout'), 1500);
    setTimeout(() => setIntroPhase('logo'), 1600);
    setTimeout(() => {
      setIsIntroActive(false);
      setIntroPhase('idle');
      setShowStories(true);
      setCurrentStoryIndex(0);
      setStoryProgress(0);
    }, 4500); 
  };

  const triggerFade = useCallback((callback: () => void) => {
    setIsFading(true);
    setTimeout(() => {
      callback();
      setIsFading(false);
    }, 800);
  }, []);

  const nextStory = useCallback(() => {
    if (isFading) return;
    triggerFade(() => {
      setCurrentStoryIndex(prev => (prev < uploadedPhotos.length - 1 ? prev + 1 : 0));
      setStoryProgress(0);
    });
  }, [uploadedPhotos.length, triggerFade, isFading]);

  const prevStory = useCallback(() => {
    if (isFading) return;
    triggerFade(() => {
      setCurrentStoryIndex(prev => (prev > 0 ? prev - 1 : uploadedPhotos.length - 1));
      setStoryProgress(0);
    });
  }, [uploadedPhotos.length, triggerFade, isFading]);

  useEffect(() => {
    if (!showStories || uploadedPhotos.length === 0 || isStoryPaused || isFading) return;
    const intervalTime = 50; 
    const duration = 5000; 
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
  }, [showStories, nextStory, uploadedPhotos.length, isStoryPaused, isFading]);

  const togglePause = () => {
    setIsStoryPaused(!isStoryPaused);
    setExperienceAutoPlay(!isStoryPaused ? false : true);
  };

  const dateStyle: React.CSSProperties = {
    color: dateColor,
    fontFamily: getFontFamily(dateFont || 'inter'),
    fontWeight: dateIsBold ? '700' : '400',
    textShadow: dateHasNeon ? `0 0 ${dateNeonStrength!/2}px ${dateColor}, 0 0 ${dateNeonStrength!}px ${dateColor}` : 'none'
  };

  const titleStyle: React.CSSProperties = { 
    color: titleColor,
    fontFamily: (selectedTheme === 'netflix' || selectedTheme === 'spotify') ? "'DM Sans', sans-serif" : getFontFamily(titleFont || 'dancing-script'),
    fontWeight: (selectedTheme === 'netflix' || selectedTheme === 'spotify') ? '900' : (titleIsBold ? '700' : '400'),
    textShadow: titleHasNeon ? `0 0 ${titleNeonStrength!/2}px ${titleColor}, 0 0 ${titleNeonStrength!}px ${titleColor}` : 'none',
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
        <div className="absolute inset-0 z-[500] bg-black flex flex-col animate-in fade-in duration-700">
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
          <button 
            onClick={() => { setShowStories(false); setExperienceAutoPlay(false); setIsStoryPaused(false); }}
            className="absolute top-8 right-4 z-[520] p-2 bg-black/40 backdrop-blur-md rounded-full text-white/80 hover:text-white transition-all border border-white/10 shadow-2xl"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute inset-0 z-[505] flex">
            <div className="flex-1 h-full cursor-pointer" onClick={prevStory} />
            <div className="flex-1 h-full cursor-pointer" onClick={nextStory} />
          </div>
          <div className={cn(
            "flex-1 relative transition-all duration-[1200ms] ease-in-out bg-black",
            isFading ? "opacity-0 scale-95" : "opacity-100 scale-100"
          )}>
            <Image src={uploadedPhotos[currentStoryIndex]} fill className="object-cover" alt={`Story ${currentStoryIndex}`} priority />
            <div className="absolute inset-x-0 bottom-0 p-8 pt-20 bg-gradient-to-t from-black via-black/90 to-transparent">
              <div className="flex justify-center gap-1.5 mb-6">
                {uploadedPhotos.map((_, i) => (
                  <div key={i} className={cn(
                    "h-1 rounded-full transition-all duration-300",
                    i === currentStoryIndex ? "w-6 bg-[#E50914]" : "w-2 bg-white/30"
                  )} />
                ))}
              </div>
              <p className="text-white/50 text-[10px] font-bold uppercase tracking-wider mb-1">MEMÓRIA {currentStoryIndex + 1} / {uploadedPhotos.length}</p>
              <h2 style={titleStyle} className="text-3xl font-bebas text-white tracking-tight leading-none mb-8">{pageTitle || 'ETERNIZE'}</h2>
              <button onClick={togglePause} className="w-full bg-white text-black py-4 rounded-lg flex items-center justify-center gap-3 text-sm font-black active:scale-95 transition-transform shadow-2xl">
                {isStoryPaused ? <><Play className="w-4 h-4 fill-current" /> Retomar</> : <><Pause className="w-4 h-4 fill-current" /> Pausar</>}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Spotify Audio Animation Overlay */}
      {showSpotifyAudioOverlay && (
        <div className="absolute inset-0 z-[500] bg-black/95 flex flex-col items-center justify-center gap-8 animate-in fade-in duration-500">
           <div className="flex items-end gap-1.5 h-32">
              {[...Array(6)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-1.5 bg-[#1DB954] rounded-full" 
                  style={{ 
                    animation: `equalize 1s ease-in-out infinite alternate`,
                    animationDelay: `${i * 0.1}s`,
                    height: '15px'
                  }} 
                />
              ))}
           </div>
           <div className="text-center">
              <h2 className="text-white text-2xl font-black">Tocando agora...</h2>
              <p className="text-[#1DB954] text-sm font-bold">O som do nosso amor</p>
           </div>
           <button 
             onClick={() => { setShowSpotifyAudioOverlay(false); setExperienceAutoPlay(false); }}
             className="mt-4 bg-white/10 text-white border border-white/20 px-8 py-2 rounded-full text-xs font-bold active:scale-95 transition-all backdrop-blur-md"
           >
             Voltar
           </button>
           <style jsx>{`
             @keyframes equalize {
               0%, 100% { height: 8px; }
               50% { height: 60px; }
             }
           `}</style>
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
          <div className="text-[11px] text-neutral-600 font-medium truncate">eternize.com/{slugifiedTitle || 'seu-nome'}</div>
        </div>
      </div>

      <div className={cn(
        "relative bg-black border-x border-b border-white/10 overflow-hidden shadow-2xl flex-1",
        isFullscreen ? "rounded-none h-full" : "rounded-b-[2.5rem] aspect-[9/19]"
      )}>
        <div className="absolute inset-0 transition-colors duration-500" style={{ backgroundColor: (selectedTheme === 'netflix' || selectedTheme === 'spotify') ? '#121212' : selectedBgColor }}>
          {/* Efeitos de Fundo */}
          {selectedEffect === 'sparkles' && (selectedTheme !== 'netflix' && selectedTheme !== 'spotify') && (
            <div className="absolute inset-0 pointer-events-none z-10">
              <SparklesCore background="transparent" minSize={0.4} maxSize={1.2} particleDensity={sparklesDensity} className="w-full h-full" particleColor={sparklesColor} speed={sparklesSpeed} />
            </div>
          )}
          {selectedEffect === 'smoke' && (selectedTheme !== 'netflix' && selectedTheme !== 'spotify') && (
            <div className="absolute inset-0 pointer-events-none z-10">
              <SmokeBackground smokeColor={smokeColor} backgroundColor={selectedBgColor} intensity={smokeIntensity} />
            </div>
          )}
          
          <div className="absolute inset-0 flex flex-col items-center overflow-y-auto no-scrollbar">
            {selectedTheme === 'netflix' ? (
              /* THEME NETFLIX */
              <div className="w-full h-full bg-[#141414] text-white font-inter relative flex flex-col custom-scroll overflow-y-auto">
                <header className="sticky top-0 z-50 px-4 py-4 flex items-center justify-between bg-gradient-to-b from-black via-black/80 to-transparent">
                  <div className="text-[#e50914] font-bebas text-2xl tracking-tighter uppercase">ETERNIZE</div>
                  <div className="w-8 h-8 rounded-sm bg-[#e50914] flex items-center justify-center text-[11px] font-black tracking-tight">EZ</div>
                </header>
                <section className="relative min-h-[65vh] flex flex-col justify-end -mt-16">
                  <div className="absolute inset-0 z-0 bg-cover bg-top transition-all duration-700" style={{ background: 'linear-gradient(135deg, rgb(35, 10, 10) 0%, rgb(15, 15, 15) 100%)' }}>
                    {uploadedPhotos.length > 0 && <Image src={uploadedPhotos[activeHeroIndex] || uploadedPhotos[0]} fill className="object-cover opacity-60" alt="Hero" priority />}
                  </div>
                  <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#141414] via-[#141414]/40 to-transparent"></div>
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#141414] via-[#141414]/20 to-transparent"></div>
                  <div className="relative z-20 px-4 pb-6 pt-48">
                    <div className="mb-1"><span className="text-[#e50914] text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-1"><span className="text-xs">❤️</span> Eternize Original</span></div>
                    {pageTitle ? <h1 style={titleStyle} className="text-5xl font-bebas uppercase leading-[0.9] mb-3 drop-shadow-2xl tracking-tight break-words">{pageTitle}</h1> : <div className="w-[70%] h-12 bg-white/10 rounded-sm mb-3 animate-pulse-custom" />}
                    <div className="flex items-center gap-3 mb-2 text-[12px] font-semibold">
                      <span className="text-[#46d369]">98% compatível</span>
                      <span className="text-neutral-400 font-medium">{date ? date.getFullYear() : '2026'}</span>
                      <span className="text-neutral-400 font-medium">{uploadedPhotos.length || 8} Temporadas</span>
                      <div className="border border-neutral-600 px-1 rounded-sm text-[9px] bg-black/40 font-bold">HD</div>
                    </div>
                    <div className="mb-4">{message ? <div className="text-[13px] text-white/70 leading-relaxed line-clamp-3" dangerouslySetInnerHTML={{ __html: message }} /> : <div className="space-y-2 animate-pulse-custom"><div className="h-2 bg-white/5 w-full rounded-full" /><div className="h-2 bg-white/5 w-full rounded-full" /><div className="h-2 bg-white/5 w-2/3 rounded-full" /></div>}</div>
                    <div className="flex flex-col gap-2">
                      <button onClick={startNetflixExperience} className="w-full bg-white text-black py-2.5 rounded flex items-center justify-center gap-2 text-sm font-bold active:scale-95 transition-transform"><span className="text-base">▶</span> Reproduzir</button>
                      <div className="flex gap-2">
                        <button onClick={() => setIsInList(!isInList)} className={cn("flex-1 bg-[#2a2a2a]/80 backdrop-blur-md border border-white/10 py-2.5 rounded font-bold text-xs flex items-center justify-center gap-2 transition-all", isInList ? "text-[#46d369]" : "text-white")}><span className="text-lg leading-none">{isInList ? "✓" : "+"}</span> Minha lista</button>
                        <button className={cn("w-12 h-11 bg-[#2a2a2a]/80 backdrop-blur-md border border-white/10 rounded flex items-center justify-center transition-all text-white")}><ThumbsUp className="w-5 h-5" /></button>
                        <button className={cn("w-12 h-11 bg-[#2a2a2a]/80 backdrop-blur-md border border-white/10 rounded flex items-center justify-center transition-all text-white")}><Heart className="w-5 h-5" /></button>
                      </div>
                    </div>
                  </div>
                </section>
                <div className="px-4 py-4 bg-[#141414]">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-[#1e1e1e] rounded-lg p-3 text-center border border-white/5"><p style={dateStyle} className="text-2xl font-bebas">{timeDiff?.years || 0}</p><p className="text-neutral-500 text-[8px] uppercase tracking-wider font-bold">Anos juntos</p></div>
                    <div className="bg-[#1e1e1e] rounded-lg p-3 text-center border border-white/5"><p style={dateStyle} className="text-2xl font-bebas">{totalDays.toLocaleString('pt-BR')}</p><p className="text-neutral-500 text-[8px] uppercase tracking-wider font-bold">Dias</p></div>
                    <div className="bg-[#1e1e1e] rounded-lg p-3 text-center border border-white/5"><p style={dateStyle} className="text-2xl font-bebas">{date ? format(date, 'dd/MM') : '06/04'}</p><p className="text-neutral-500 text-[8px] uppercase tracking-wider font-bold">Desde</p></div>
                  </div>
                </div>
                <div className="px-4 mt-2 pb-20">
                  <div className="flex gap-8 border-neutral-800 border-b mb-4">
                    <button onClick={() => setActiveTab('episodios' as any)} className={cn("pb-3 text-sm font-bold tracking-tight transition-all", activeTab === ('episodios' as any) ? "border-b-[3px] border-[#e50914] text-white" : "text-neutral-500")}>Episódios</button>
                    <button onClick={() => setActiveTab('detalhes' as any)} className={cn("pb-3 text-sm font-bold tracking-tight transition-all", activeTab === ('detalhes' as any) ? "border-b-[3px] border-[#e50914] text-white" : "text-neutral-500")}>Detalhes</button>
                  </div>
                  {activeTab === ('episodios' as any) ? (
                    <div className="space-y-6">{uploadedPhotos.map((photo, i) => (
                      <div key={i} className="flex gap-3 items-center" onClick={() => setActiveHeroIndex(i)}>
                        <div className="w-32 h-[72px] bg-[#2a2a2a] rounded-md relative overflow-hidden"><Image src={photo} fill className="object-cover" alt={`Ep ${i}`} /></div>
                        <div className="flex-1 min-w-0"><p className="text-xs font-bold text-white mb-0.5">{(i + 1)}. Memória {(i + 1)}</p><p className="text-[10px] text-neutral-500 leading-tight">Capítulo especial da nossa história.</p></div>
                      </div>
                    ))}</div>
                  ) : (
                    <div className="space-y-4 text-[13px]"><div className="flex gap-2"><span className="text-neutral-500 min-w-[100px]">Data:</span><span className="text-neutral-200">{date ? format(date, "dd/MM/yyyy") : '07/04/2017'}</span></div></div>
                  )}
                </div>
              </div>
            ) : selectedTheme === 'spotify' ? (
              /* THEME SPOTIFY CLONE (REF) */
              <div className="w-full h-full bg-[#121212] text-white font-inter relative flex flex-col no-scrollbar">
                
                {/* Header fixo com Logo e Perfil */}
                <div className="absolute top-6 left-0 right-0 z-30 px-6 flex items-center justify-between pointer-events-none">
                  <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
                    <circle cx="20" cy="20" r="20" fill="#1DB954"></circle>
                    <path d="M10 26.5 Q20 22 31 24.5" stroke="black" strokeWidth="2.5" strokeLinecap="round" fill="none"></path>
                    <path d="M9 21 Q20 15.5 32 19" stroke="black" strokeWidth="2.5" strokeLinecap="round" fill="none"></path>
                    <path d="M8 15 Q20 8 33 13" stroke="black" strokeWidth="2.5" strokeLinecap="round" fill="none"></path>
                  </svg>
                  <div className="w-8 h-8 rounded-full bg-[#1DB954] flex items-center justify-center text-[10px] font-black text-black">HZ</div>
                </div>

                <div className="flex-1 overflow-y-auto no-scrollbar relative">
                  {/* Banner do Artista */}
                  <section className="relative h-[400px]">
                    <div className="absolute inset-0">
                      {uploadedPhotos.length > 0 ? (
                        <Image src={uploadedPhotos[activeHeroIndex] || uploadedPhotos[0]} fill className="object-cover" alt="Hero" priority />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#0d4a2a] to-[#121212]" />
                      )}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent"></div>
                    <div className="absolute bottom-2 left-6 right-6">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="bg-[#1DB954] w-5 h-5 rounded-full flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 text-white" strokeWidth={4} />
                        </div>
                        <span className="text-white text-[11px] font-bold">Artista verificado</span>
                      </div>
                      <h1 className="text-white text-5xl font-black leading-[0.9] tracking-tighter mb-1 break-words font-['DM_Sans']">
                        {pageTitle || 'Nossa Playlist'}
                      </h1>
                      <p className="text-neutral-300 text-sm font-bold font-['DM_Sans']">
                        {totalDays.toLocaleString('pt-BR')} dias de história
                      </p>
                    </div>
                  </section>

                  {/* Controles de Ação */}
                  <div className="px-6 py-4 flex items-center gap-4">
                    <div className="w-10 h-10 bg-neutral-800 rounded shadow-lg relative overflow-hidden shrink-0">
                        {uploadedPhotos.length > 0 && <Image src={uploadedPhotos[0]} fill className="object-cover" alt="" />}
                    </div>
                    <button onClick={() => setIsLiked(!isLiked)} className="border border-neutral-500 rounded-full px-4 py-1.5 text-xs font-bold text-white hover:border-white transition-colors">
                      {isLiked ? 'Seguindo' : 'Seguir'}
                    </button>
                    <button className="text-neutral-400 hover:text-white"><MoreHorizontal className="w-6 h-6" /></button>
                    
                    <div className="flex-1 flex justify-end items-center gap-5">
                      <button className="text-neutral-400 hover:text-white"><Shuffle className="w-6 h-6" /></button>
                      <button 
                        onClick={() => { setShowSpotifyAudioOverlay(true); setExperienceAutoPlay(true); }}
                        className="w-14 h-14 bg-[#1DB954] rounded-full flex items-center justify-center shadow-xl active:scale-90 transition-transform"
                      >
                        <Play className="w-6 h-6 text-black fill-black ml-1" />
                      </button>
                    </div>
                  </div>

                  {/* Tab Navigation */}
                  <div className="px-6 mb-6">
                    <div className="flex gap-8 border-white/5 border-b pb-2">
                        {['Músicas', 'Eventos', 'Loja'].map((tab) => (
                          <button 
                            key={tab}
                            onClick={() => setActiveTab(tab.toLowerCase() as any)} 
                            className="relative"
                          >
                            <span className={cn(
                              "font-bold text-sm transition-colors", 
                              activeTab === tab.toLowerCase() ? "text-white" : "text-neutral-400"
                            )}>{tab}</span>
                            {activeTab === tab.toLowerCase() && <div className="absolute -bottom-[10px] left-0 w-full h-[3px] bg-[#1DB954]"></div>}
                          </button>
                        ))}
                    </div>
                  </div>

                  {/* Grid de Estatísticas (Cards Rápidos) */}
                  <div className="px-6 mb-8">
                    <div className="grid grid-cols-3 gap-2">
                        <div className="bg-[#181818] rounded-lg p-3 text-center border border-white/5">
                            <p className="font-black text-xl text-[#1DB954] leading-none mb-1">{timeDiff?.years || 0}</p>
                            <p className="text-[8px] text-neutral-400 uppercase font-bold tracking-wider">Anos juntos</p>
                        </div>
                        <div className="bg-[#181818] rounded-lg p-3 text-center border border-white/5">
                            <p className="font-black text-xl text-[#1DB954] leading-none mb-1">{totalDays.toLocaleString('pt-BR')}</p>
                            <p className="text-[8px] text-neutral-400 uppercase font-bold tracking-wider">Dias de história</p>
                        </div>
                        <div className="bg-[#181818] rounded-lg p-3 text-center border border-white/5">
                            <p className="font-black text-xl text-[#1DB954] leading-none mb-1">{date ? format(date, 'dd/MM') : '06/04'}</p>
                            <p className="text-[8px] text-neutral-400 uppercase font-bold tracking-wider">Desde</p>
                        </div>
                    </div>
                  </div>

                  {activeTab === 'músicas' && (
                    <>
                      {/* Seção Populares */}
                      <section className="px-6 mb-8">
                        <h2 className="text-white text-xl font-black mb-4">Populares</h2>
                        <div className="space-y-4">
                          {uploadedPhotos.length > 0 ? (
                            uploadedPhotos.map((photo, i) => (
                              <div key={i} className="flex items-center gap-4 group" onClick={() => setActiveHeroIndex(i)}>
                                <span className="text-neutral-500 text-sm w-4">{i + 1}</span>
                                <div className="w-12 h-12 bg-neutral-800 rounded shadow-lg relative overflow-hidden">
                                  <Image src={photo} fill className="object-cover" alt="" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h3 className="text-white text-sm font-bold truncate">Memória {i + 1}</h3>
                                  <p className="text-neutral-500 text-[10px] uppercase font-bold tracking-wider">{date ? date.getFullYear() : '2026'} • 03:45</p>
                                </div>
                                <button className="text-neutral-400 group-hover:text-[#1DB954]"><Heart className="w-5 h-5" /></button>
                              </div>
                            ))
                          ) : (
                            <div className="flex items-center gap-4 group">
                              <span className="text-neutral-500 text-sm w-4">1</span>
                              <div className="w-12 h-12 bg-neutral-800 rounded shadow-lg"></div>
                              <div className="flex-1">
                                <h3 className="text-white text-sm font-bold">Nossa Primeira Música</h3>
                                <p className="text-neutral-500 text-[10px] uppercase font-bold tracking-wider">2018 • 03:45</p>
                              </div>
                              <button className="text-neutral-400 group-hover:text-white"><Heart className="w-5 h-5" /></button>
                            </div>
                          )}
                        </div>
                      </section>

                      {/* Seção Sobre */}
                      {message && (
                        <section className="px-6 pb-20">
                          <h2 className="text-white text-xl font-black mb-4">Sobre</h2>
                          <div className="bg-[#181818] rounded-2xl p-4 overflow-hidden relative group">
                            {uploadedPhotos.length > 0 && (
                              <div className="absolute inset-0 grayscale opacity-40 transition-transform duration-500 group-hover:scale-110">
                                <Image src={uploadedPhotos[0]} fill className="object-cover" alt="" />
                              </div>
                            )}
                            <div className="relative z-10">
                              <div 
                                className="text-neutral-200 text-sm leading-relaxed mb-4 font-['DM_Sans']" 
                                dangerouslySetInnerHTML={{ __html: message }} 
                              />
                              <span className="bg-[#1DB954] text-black text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider font-['DM_Sans']">#TOP1DOSEUCORAÇÃO</span>
                            </div>
                          </div>
                        </section>
                      )}
                    </>
                  )}
                </div>

                {/* Mini Player Footer Spotify Style */}
                {musicData && !showSpotifyAudioOverlay && (
                  <footer className="fixed bottom-0 left-0 right-0 z-[60] px-3 pb-8">
                    <div className="bg-[#282828] rounded-lg p-3 flex flex-col gap-2 shadow-2xl border border-white/5 backdrop-blur-xl mx-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded overflow-hidden relative bg-black shrink-0">
                          <img src={musicData.thumb} className="w-full h-full object-cover" alt="" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-white truncate font-['DM_Sans']">{musicData.title}</p>
                          <p className="text-[10px] text-white/50 font-bold font-['DM_Sans']">YouTube Original</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <Volume2 className="w-5 h-5 text-white/50" />
                          <button className="text-white"><Play className="w-5 h-5 fill-current" /></button>
                        </div>
                      </div>
                      <div className="w-full h-[3px] bg-white/10 rounded-full overflow-hidden">
                         <div className="h-full bg-white w-[45%]" />
                      </div>
                    </div>
                  </footer>
                )}
              </div>
            ) : (
              /* THEME CLASSIC / OTHERS */
              <div className="w-full flex flex-col items-center pt-8 px-5 gap-6">
                <div 
                  style={showCard ? { backgroundColor: cardColor } : { backgroundColor: 'transparent' }} 
                  className={cn("w-full rounded-[8px] z-20 flex flex-col items-center transition-all duration-300", showCard ? "shadow-[0_15px_35px_rgba(0,0,0,0.5)] p-[12px]" : "p-0", showCard && (photoEffect === 'cards' ? "pb-[40px]" : "pb-[35px]"))}
                >
                  {titlePosition === 'top' && <div className="w-full text-center mb-4"><span style={titleStyle} className="text-[26px] block px-2 tracking-[1px] leading-relaxed break-words">{pageTitle || "Seu Nome"}</span></div>}
                  <div className="w-full aspect-square relative">{uploadedPhotos.length > 0 ? (<div className="w-full h-full overflow-visible" ref={emblaRef}><div className="flex h-full items-center">{uploadedPhotos.map((photo, i) => (<div key={i} className="relative aspect-square flex-[0_0_100%] flex items-center justify-center"><div className="w-full h-full relative overflow-hidden rounded-[4px]"><Image src={photo} fill className="object-cover block" alt={`Foto ${i + 1}`} sizes="300px" priority /></div></div>))}</div></div>) : (<div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#f5f5f5] rounded-[4px]"><ImageIcon className="w-12 h-12 text-black/10" /><span className="text-[8px] font-black uppercase tracking-[0.2em] text-black/10">Sua Foto</span></div>)}</div>
                  {titlePosition === 'bottom' && <div className="w-full text-center mt-4"><span style={titleStyle} className="text-[26px] block px-2 tracking-[1px] leading-relaxed break-words">{pageTitle || "Seu Nome"}</span></div>}
                </div>
                {date && (
                  <div className="w-full py-4">
                    {selectedCountStyle === 'padrao' && (
                      <div className="w-full text-center">
                        <h2 className="text-[#55b2d4] text-[10px] font-bold uppercase tracking-[0.2em] mb-6">Uau, estão juntos há</h2>
                        <div className="bg-[#181818] rounded-[24px] border border-white/5 overflow-hidden p-6 shadow-2xl relative">
                          <div className="grid grid-cols-3 gap-y-8 relative">
                            <div className="absolute inset-x-0 top-1/2 h-[1px] bg-white/5 -translate-y-1/2"></div>
                            <div className="absolute left-1/3 inset-y-0 w-[1px] bg-white/5"></div>
                            <div className="absolute left-2/3 inset-y-0 w-[1px] bg-white/5"></div>
                            <div className="flex flex-col items-center py-2"><span style={dateStyle} className="text-4xl">{timeDiff?.years || 0}</span><span className="text-neutral-500 text-[9px] uppercase tracking-widest mt-1 font-bold">Anos</span></div>
                            <div className="flex flex-col items-center py-2"><span style={dateStyle} className="text-4xl">{timeDiff?.months || 0}</span><span className="text-neutral-500 text-[9px] uppercase tracking-widest mt-1 font-bold">Meses</span></div>
                            <div className="flex flex-col items-center py-2"><span style={dateStyle} className="text-4xl">{timeDiff?.days || 0}</span><span className="text-neutral-500 text-[9px] uppercase tracking-widest mt-1 font-bold">Dias</span></div>
                            <div className="flex flex-col items-center py-2"><span style={dateStyle} className="text-4xl">{timeDiff?.hours || 0}</span><span className="text-neutral-500 text-[9px] uppercase tracking-widest mt-1 font-bold">Horas</span></div>
                            <div className="flex flex-col items-center py-2"><span style={dateStyle} className="text-4xl">{timeDiff?.minutes || 0}</span><span className="text-neutral-500 text-[9px] uppercase tracking-widest mt-1 font-bold">Minutos</span></div>
                            <div className="flex flex-col items-center py-2"><span style={dateStyle} className="text-4xl">{timeDiff?.seconds || 0}</span><span className="text-neutral-500 text-[9px] uppercase tracking-widest mt-1 font-bold">Segundos</span></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {message && <div className="w-full px-2 mt-2"><div style={{ color: messageColor, fontFamily: getFontFamily(messageFont || 'inter') }} className="text-center text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: message }} /></div>}
                {musicData && <div className="w-full px-1 mt-4"><MusicPlayer musicData={musicData} musicBoxColor={musicBoxColor} musicTextColor={musicTextColor} musicHasNeon={musicHasNeon} musicNeonStrength={musicNeonStrength} isAutoPlay={isAutoPlay} /></div>}
                <div className="h-20 shrink-0" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
