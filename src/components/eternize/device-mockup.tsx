
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
  ChevronDown
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
  patternColor = '#ffffff'
}: DeviceMockupProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    duration: 30,
    align: 'center',
    containScroll: false,
    skipSnaps: false
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
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
    fontFamily: selectedTheme === 'netflix' ? "'Inter', sans-serif" : getFontFamily(titleFont),
    fontWeight: selectedTheme === 'netflix' ? '900' : (titleIsBold ? '700' : '400'),
    textShadow: neonShadowTitle,
    textTransform: selectedTheme === 'netflix' ? 'uppercase' : 'none' as any
  };

  return (
    <div className="w-full max-w-[300px]">
      <div className="mb-6 text-center"><p className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Prévia em tempo real</p></div>
      <div className="bg-[#1a1a1a] rounded-t-2xl border-x border-t border-white/10 p-2.5 flex items-center gap-3"><div className="flex gap-1"><div className="w-1.5 h-1.5 rounded-full bg-red-500/20" /><div className="w-1.5 h-1.5 rounded-full bg-yellow-500/20" /><div className="w-1.5 h-1.5 rounded-full bg-green-500/20" /></div><div className="flex-1 bg-black/40 rounded-full h-4 flex items-center px-3 gap-2"><div className="w-2 h-2 text-white/20 text-[6px]">🔒</div><div className="text-[7px] font-medium text-white/40 truncate">heartzzu.com/presente</div></div></div>
      <div className="relative aspect-[9/19] bg-black border-x border-b border-white/10 rounded-b-[2.5rem] overflow-hidden shadow-2xl">
        <div className="absolute inset-0 transition-colors duration-500" style={{ backgroundColor: selectedTheme === 'netflix' ? '#000000' : selectedBgColor }}>
          {selectedEffect === 'sparkles' && (
            <div className="absolute inset-0 pointer-events-none z-10">
              <SparklesCore background="transparent" minSize={0.4} maxSize={1.2} particleDensity={sparklesDensity} className="w-full h-full" particleColor={sparklesColor} speed={sparklesSpeed} />
            </div>
          )}
          {selectedEffect === 'smoke' && (
            <div className="absolute inset-0 pointer-events-none z-10">
              <SmokeBackground smokeColor={smokeColor} backgroundColor={selectedBgColor} intensity={smokeIntensity} />
            </div>
          )}
          {selectedEffect === 'pattern' && (
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
                  <div className="w-full min-h-full flex flex-col bg-black" style={{ background: 'linear-gradient(180deg, #1a0505 0%, #000000 20%)' }}>
                    <header className="flex justify-between items-center px-5 py-4">
                      <div className="text-[#e50914] font-black tracking-tighter text-xl">HEARTZZU</div>
                      <div className="bg-[#e50914] text-white px-2 py-1 rounded text-xs font-bold">HZ</div>
                    </header>

                    <div className="px-5 space-y-4">
                      {/* Hero Image / Placeholder */}
                      <div className="w-full aspect-video bg-[#2f2f2f] rounded-lg overflow-hidden relative">
                        {uploadedPhotos.length > 0 ? (
                          <Image src={uploadedPhotos[0]} fill className="object-cover" alt="Hero" />
                        ) : null}
                      </div>

                      <div className="flex items-center gap-1 text-[#e50914] text-[10px] font-extrabold uppercase">
                        <span className="text-xs">❤</span> HEARTZZU ORIGINAL
                      </div>

                      {/* Page Title / Skeleton */}
                      {pageTitle ? (
                        <div style={titleStyle} className="text-3xl font-black leading-tight uppercase tracking-tighter break-words">
                          {pageTitle}
                        </div>
                      ) : (
                        <div className="w-[70%] h-9 bg-[#2f2f2f] rounded-sm" />
                      )}

                      <div className="flex items-center gap-2">
                        <span className="text-[#00a651] text-[10px] font-bold">98% compatível</span>
                        <span className="text-white/60 text-[10px]">{date ? date.getFullYear() : '2026'}</span>
                        <span className="text-white/60 text-[10px]">1 Temporada</span>
                        <div className="border border-white/20 text-white/60 text-[8px] px-1 py-0.5 rounded font-bold">L</div>
                        <div className="border border-white/20 text-white/60 text-[8px] px-1 py-0.5 rounded font-bold">HD</div>
                      </div>

                      <div className="space-y-2">
                        {message ? (
                          <div 
                            className="text-[10px] text-white/80 leading-relaxed italic"
                            style={{ color: messageColor, fontFamily: getFontFamily(messageFont) }}
                            dangerouslySetInnerHTML={{ __html: message }}
                          />
                        ) : (
                          <>
                            <div className="w-full h-2 bg-[#2f2f2f] rounded-sm" />
                            <div className="w-full h-2 bg-[#2f2f2f] rounded-sm" />
                            <div className="w-4/5 h-2 bg-[#2f2f2f] rounded-sm" />
                          </>
                        )}
                      </div>

                      <button className="w-full bg-white text-black font-black py-2.5 rounded flex items-center justify-center gap-2 text-sm mt-5">
                        <span className="text-base">▶</span> Reproduzir
                      </button>

                      <div className="action-row flex gap-2">
                        <button className="flex-1 bg-[#2f2f2f] text-white font-bold py-2.5 rounded flex items-center justify-center gap-2 text-sm">
                          <span className="text-base">+</span> Minha lista
                        </button>
                        <button className="bg-[#2f2f2f] text-white p-2.5 rounded flex items-center justify-center"><ThumbsUp className="w-4 h-4" /></button>
                        <button className="bg-[#2f2f2f] text-white p-2.5 rounded flex items-center justify-center"><Heart className="w-4 h-4" /></button>
                      </div>

                      {/* Stat Cards */}
                      <div className="grid grid-cols-3 gap-2 mt-4">
                        <div className="bg-[#1a1a1a] border border-white/5 rounded-md p-3 text-center">
                          <div style={dateStyle} className="text-xl tabular-nums leading-none mb-1">{timeDiff?.years || 0}</div>
                          <div className="text-[8px] text-[#808080] font-bold uppercase">Anos Juntos</div>
                        </div>
                        <div className="bg-[#1a1a1a] border border-white/5 rounded-md p-3 text-center">
                          <div style={dateStyle} className="text-xl tabular-nums leading-none mb-1">{totalDays || 0}</div>
                          <div className="text-[8px] text-[#808080] font-bold uppercase">Dias de História</div>
                        </div>
                        <div className="bg-[#1a1a1a] border border-white/5 rounded-md p-3 text-center">
                          <div style={dateStyle} className="text-xl tabular-nums leading-none mb-1">{date ? `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}` : '06/04'}</div>
                          <div className="text-[8px] text-[#808080] font-bold uppercase">Data Especial</div>
                        </div>
                      </div>

                      <div className="flex gap-5 border-b border-[#333] pt-4">
                        <div className="pb-2 text-sm font-bold text-white border-b-[3px] border-white">Episódios</div>
                        <div className="pb-2 text-sm font-bold text-[#808080]">Detalhes</div>
                      </div>

                      <div className="flex justify-between items-center mt-5">
                        <div className="font-bold flex items-center gap-1.5 text-sm text-white">
                          Temporada 1 <ChevronDown className="w-3 h-3" />
                        </div>
                        <div className="text-[#808080] text-xs">{uploadedPhotos.length || 8} episódios</div>
                      </div>

                      {/* Episodes List / Skeleton */}
                      <div className="space-y-5 pb-10">
                        {uploadedPhotos.length > 0 ? (
                          uploadedPhotos.map((photo, i) => (
                            <div key={i} className="flex gap-4">
                              <div className="w-28 h-16 bg-[#2f2f2f] rounded-md shrink-0 relative overflow-hidden">
                                <Image src={photo} fill className="object-cover" alt={`Ep ${i}`} />
                              </div>
                              <div className="flex-1 flex flex-col justify-center gap-2">
                                <div className="h-2 bg-[#2f2f2f] rounded-sm w-[70%]" />
                                <div className="h-2 bg-[#2f2f2f] rounded-sm w-[90%]" />
                                <div className="h-2 bg-[#2f2f2f] rounded-sm w-[60%]" />
                              </div>
                            </div>
                          ))
                        ) : (
                          [1, 2, 3].map((_, i) => (
                            <div key={i} className="flex gap-4">
                              <div className="w-28 h-16 bg-[#2f2f2f] rounded-md shrink-0" />
                              <div className="flex-1 flex flex-col justify-center gap-2">
                                <div className="h-2 bg-[#2f2f2f] rounded-sm w-[70%]" />
                                <div className="h-2 bg-[#2f2f2f] rounded-sm w-[90%]" />
                                <div className="h-2 bg-[#2f2f2f] rounded-sm w-[60%]" />
                              </div>
                            </div>
                          ))
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
