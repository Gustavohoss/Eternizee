
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

  const showMusic = step === 'music' || step === 'data-location' || step === 'landing';

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
      left: `${Math.random() * 100}%`,
      duration: `${Math.random() * 3 + 2}s`,
      delay: `${Math.random() * 5}s`,
      opacity: Math.random() * 0.5 + 0.3,
      emoji: selectedEmojis[Math.floor(Math.random() * selectedEmojis.length)]
    }));
  }, [selectedEmojis]);

  const getSlidePosition = (index: number) => {
    const total = uploadedPhotos.length;
    if (total === 0) return 'active';
    let diff = index - selectedIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    if (diff === 0) return 'active';
    if (diff > 0) return 'next';
    return 'prev';
  };

  const getFontFamily = (font: string) => {
    switch (font) {
      case 'pacifico': return "'Pacifico', cursive";
      case 'playfair': return "'Playfair Display', serif";
      case 'inter': return "'Inter', sans-serif";
      default: return "'Dancing Script', cursive";
    }
  };

  const RenderTitle = () => {
    const shadowSize = titleNeonStrength;
    const neonShadow = titleHasNeon 
      ? `0 0 ${shadowSize/2}px ${titleColor}, 0 0 ${shadowSize}px ${titleColor}, 0 0 ${shadowSize*1.5}px ${titleColor}` 
      : 'none';

    return (
      <div className={cn("w-full text-center", titlePosition === 'top' ? "mb-4" : "mt-4")}>
        <span 
          style={{ 
            color: titleColor,
            fontFamily: getFontFamily(titleFont),
            fontWeight: titleIsBold ? '700' : '400',
            textShadow: neonShadow
          }}
          className="text-[26px] block px-2 tracking-[1px] leading-relaxed break-words"
        >
          {pageTitle || "Seu Nome Aqui"}
        </span>
      </div>
    );
  };

  const RenderCounter = () => {
    if (!date || !timeDiff) return null;
    const units = [
      { label: 'anos', value: timeDiff.years, netflixLabel: 'ANOS JUNTOS' },
      { label: 'meses', value: timeDiff.months, netflixLabel: 'MESES' },
      { label: 'dias', value: timeDiff.days, netflixLabel: 'DIAS' },
      { label: 'horas', value: timeDiff.hours, netflixLabel: 'HORAS' },
      { label: 'min', value: timeDiff.minutes, netflixLabel: 'MIN' },
      { label: 'seg', value: timeDiff.seconds, netflixLabel: 'SEG' },
    ];

    const shadowSize = dateNeonStrength;
    const neonShadow = dateHasNeon 
      ? `0 0 ${shadowSize/2}px ${dateColor}, 0 0 ${shadowSize}px ${dateColor}, 0 0 ${shadowSize*1.5}px ${dateColor}` 
      : 'none';
    const dateStyle: React.CSSProperties = {
      color: dateColor,
      fontFamily: getFontFamily(dateFont),
      fontWeight: dateIsBold ? '700' : '400',
      textShadow: neonShadow
    };

    switch (selectedCountStyle) {
      case 'simples':
        return (
          <div className="w-full text-center space-y-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Estamos juntos há</p>
            <p style={dateStyle} className="text-sm tabular-nums">
              {timeDiff.years > 0 && `${timeDiff.years}a `}
              {timeDiff.months > 0 && `${timeDiff.months}m `}
              {timeDiff.days}d {timeDiff.hours}h {timeDiff.minutes}m {timeDiff.seconds}s
            </p>
          </div>
        );
      case 'classico':
        return (
          <div className="w-full grid grid-cols-3 gap-2">
            {units.map((u) => (
              <div key={u.label} className="bg-white/5 border border-white/10 rounded-xl p-2 text-center min-w-[70px]">
                <p style={dateStyle} className="text-base tabular-nums">{u.value}</p>
                <p className="text-[8px] font-bold uppercase tracking-tighter text-white/30">{u.label}</p>
              </div>
            ))}
          </div>
        );
      case 'data-grande':
        return (
          <div className="w-full text-center space-y-2">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
              <CalendarIcon className="w-3 h-3 text-primary" />
              <span className="text-[10px] font-black text-primary uppercase">Desde</span>
            </div>
            <p style={dateStyle} className="text-2xl tracking-tighter tabular-nums">{date.toLocaleDateString('pt-BR')}</p>
          </div>
        );
      case 'dias-grandes':
        const totalDays = Math.floor((new Date().getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
        return (
          <div className="w-full text-center space-y-1">
            <p style={dateStyle} className="text-[40px] leading-none tracking-tighter tabular-nums">{totalDays > 0 ? totalDays : 0}</p>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Dias de puro amor</p>
          </div>
        );
      default:
        return (
          <div className="w-full space-y-4">
            <div className="flex items-center gap-2 justify-center"><div className="h-px bg-white/10 flex-1" /><Clock className="w-3 h-3 text-white/20" /><div className="h-px bg-white/10 flex-1" /></div>
            <div className="flex justify-center gap-3">{units.slice(0, 3).map((u) => (<div key={u.label} className="text-center min-w-[40px]"><p style={dateStyle} className="text-lg leading-none tabular-nums">{u.value}</p><p className="text-[8px] font-bold uppercase text-white/30">{u.label}</p></div>))}</div>
            <div className="flex justify-center gap-4 text-white/40">{units.slice(3).map((u) => (<div key={u.label} className="flex items-baseline gap-0.5 min-w-[30px]"><span style={dateStyle} className="text-xs tabular-nums">{u.value}</span><span className="text-[7px] font-bold uppercase">{u.label}</span></div>))}</div>
          </div>
        );
    }
  };

  const NetflixLayout = () => {
    return (
      <div className="w-full min-h-full flex flex-col animate-in fade-in duration-700 bg-black" style={{ background: 'linear-gradient(180deg, #1a0505 0%, #000000 20%)' }}>
        <header className="flex justify-between items-center px-5 py-4">
          <div className="text-[#e50914] font-black tracking-tighter text-xl">HEARTZZU</div>
          <div className="bg-[#e50914] text-white px-2 py-1 rounded text-xs font-bold">HZ</div>
        </header>

        <div className="px-5 space-y-4">
          <div className="w-full aspect-video bg-[#2f2f2f] rounded-lg overflow-hidden relative">
            {uploadedPhotos.length > 0 ? (
              <Image src={uploadedPhotos[0]} fill className="object-cover" alt="Hero" />
            ) : null}
          </div>

          <div className="flex items-center gap-1 text-[#e50914] text-[10px] font-extrabold uppercase">
            <span className="text-xs">❤</span> HEARTZZU ORIGINAL
          </div>

          {pageTitle ? (
            <div className="text-2xl font-black leading-tight uppercase tracking-tighter" style={{ fontFamily: 'sans-serif' }}>
              {pageTitle}
            </div>
          ) : (
            <div className="w-2/3 h-8 bg-[#2f2f2f] rounded" />
          )}

          <div className="flex items-center gap-2">
            <div className="w-10 h-3 bg-[#2f2f2f] rounded-sm" />
            <div className="bg-[#00a651] px-1.5 py-0.5 rounded text-[10px] font-bold text-white uppercase">L</div>
            <div className="border border-[#808080] text-[#808080] text-[8px] px-1 py-0.5 rounded font-bold">HD</div>
          </div>

          <div className="space-y-2">
            {message ? (
              <div 
                className="text-[10px] text-white/80 leading-relaxed line-clamp-4 italic"
                dangerouslySetInnerHTML={{ __html: message }}
              />
            ) : (
              <>
                <div className="w-full h-2.5 bg-[#2f2f2f] rounded-sm" />
                <div className="w-full h-2.5 bg-[#2f2f2f] rounded-sm" />
                <div className="w-4/5 h-2.5 bg-[#2f2f2f] rounded-sm" />
                <div className="w-1/2 h-2.5 bg-[#2f2f2f] rounded-sm" />
              </>
            )}
          </div>

          <button className="w-full bg-white text-black font-black py-2.5 rounded flex items-center justify-center gap-2 text-sm mt-5">
            <span className="text-base">▶</span> Reproduzir
          </button>

          <div className="flex gap-2 mb-8">
            <button className="flex-1 bg-[#2f2f2f] text-white font-bold py-2.5 rounded flex items-center justify-center gap-2 text-sm">
              <span className="text-base">+</span> Minha lista
            </button>
            <button className="bg-[#2f2f2f] text-white p-2.5 rounded aspect-square flex items-center justify-center">👍</button>
            <button className="bg-[#2f2f2f] text-white p-2.5 rounded aspect-square flex items-center justify-center text-lg leading-none">♡</button>
          </div>

          <div className="flex gap-5 border-b border-[#333]">
            <div className="pb-2 text-sm font-bold text-white border-b-[3px] border-white">Episódios</div>
            <div className="pb-2 text-sm font-bold text-[#808080]">Detalhes</div>
          </div>

          <div className="flex justify-between items-center mt-5">
            <div className="font-bold flex items-center gap-1.5 text-sm">
              Temporada 1 <small className="text-[8px]">▼</small>
            </div>
            <div className="text-[#808080] text-xs">{uploadedPhotos.length} episódios</div>
          </div>

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
              [1, 2, 3].map((i) => (
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
    );
  };

  return (
    <div className="w-full max-w-[300px]">
      <div className="mb-6 text-center"><p className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Prévia em tempo real</p></div>
      <div className="bg-[#1a1a1a] rounded-t-2xl border-x border-t border-white/10 p-2.5 flex items-center gap-3"><div className="flex gap-1"><div className="w-1.5 h-1.5 rounded-full bg-red-500/20" /><div className="w-1.5 h-1.5 rounded-full bg-yellow-500/20" /><div className="w-1.5 h-1.5 rounded-full bg-green-500/20" /></div><div className="flex-1 bg-black/40 rounded-full h-4 flex items-center px-3 gap-2"><div className="w-2 h-2 text-white/20 text-[6px]">🔒</div><div className="text-[7px] font-medium text-white/40 truncate">eternize.com/...</div></div></div>
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
                  <NetflixLayout />
                ) : (
                  /* CLASSIC THEME LAYOUT */
                  <div className="w-full flex flex-col items-center pt-8 px-5 gap-6">
                    <div style={showCard ? { backgroundColor: cardColor } : { backgroundColor: 'transparent' }} className={cn("w-full rounded-[8px] z-20 animate-in fade-in duration-500 flex flex-col items-center", showCard ? "shadow-[0_15px_35px_rgba(0,0,0,0.5)] p-[12px]" : "p-0", showCard && (photoEffect === 'cards' ? "pb-[40px]" : "pb-[35px]") )}>
                      {titlePosition === 'top' && <RenderTitle />}
                      <div className={cn("w-full aspect-square relative photo-display-area", photoEffect === 'slide' ? "overflow-hidden rounded-[4px]" : "overflow-visible")} style={{ perspective: '1000px' }}>
                        {uploadedPhotos.length > 0 ? (
                          <div className="w-full h-full overflow-visible" ref={emblaRef}>
                            <div className="flex h-full items-center">
                              {uploadedPhotos.map((photo, i) => {
                                const position = getSlidePosition(i);
                                const isActive = position === 'active';
                                const total = uploadedPhotos.length;
                                let diff = i - selectedIndex;
                                if (diff > total / 2) diff -= total;
                                if (diff < -total / 2) diff += total;
                                const absDiff = Math.abs(diff);
                                return (
                                  <div key={i} className={cn("relative aspect-square flex-shrink-0 flex items-center justify-center", photoEffect === 'coverflow' ? "flex-[0_0_100%] absolute inset-0" : photoEffect === 'cards' ? "flex-[0_0_100%] absolute inset-0" : "flex-[0_0_100%]")} style={photoEffect === 'cards' ? { zIndex: isActive ? 10 : 10 - absDiff, opacity: absDiff > 4 ? 0 : 1, pointerEvents: isActive ? 'auto' : 'none', transform: `translateY(${absDiff * 12}px) rotate(${absDiff * 2}deg) scale(${1 - absDiff * 0.05})`, transition: 'transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1), opacity 0.6s ease' } : photoEffect === 'coverflow' ? { zIndex: isActive ? 10 : 5, transform: isActive ? 'scale(1) rotateY(0deg) translateZ(0)' : position === 'prev' ? 'scale(0.85) rotateY(30deg) translateZ(-80px) translateX(30px)' : 'scale(0.85) rotateY(-30deg) translateZ(-80px) translateX(-30px)', transition: 'transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1), opacity 0.6s ease' } : {}}>
                                    <div className={cn("w-full h-full relative overflow-hidden rounded-[4px]", photoEffect === 'coverflow' && !isActive && "opacity-70 grayscale-[20%]", photoEffect === 'cards' && "shadow-[0_10px_25px_rgba(0,0,0,0.4)]")}>
                                      <Image src={photo} fill className="object-cover block" alt={`Foto ${i + 1}`} sizes="300px" priority />
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                            {uploadedPhotos.length > 1 && (<div className="absolute bottom-[10px] left-1/2 -translate-x-1/2 flex gap-[7px] z-30 pointer-events-none">{uploadedPhotos.map((_, i) => (<div key={i} className={cn("w-[7px] h-[7px] rounded-full transition-all duration-400", i === selectedIndex ? "bg-primary scale-[1.3] shadow-[0_0_10px_rgba(var(--primary),0.5)] opacity-1" : "bg-white/60 opacity-50")} />))}</div>)}
                          </div>
                        ) : (<div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#f5f5f5] rounded-[4px]"><ImageIcon className="w-12 h-12 text-black/10" /><span className="text-[8px] font-black uppercase tracking-[0.2em] text-black/10">Sua Foto Aqui</span></div>)}
                      </div>
                      {titlePosition === 'bottom' && <RenderTitle />}
                    </div>

                    {message && (
                      <div className="w-full text-center px-2 animate-in fade-in slide-in-from-bottom-2 duration-500 z-20">
                        <div style={{ color: messageColor, fontFamily: getFontFamily(messageFont) }} className="text-xs md:text-sm italic leading-relaxed whitespace-pre-wrap break-words message-html-content" dangerouslySetInnerHTML={{ __html: message }} />
                      </div>
                    )}

                    {showMusic && (
                      <div className="w-full animate-in zoom-in-95 duration-500 z-20">
                        <MusicPlayer musicData={musicData} musicBoxColor={musicBoxColor} musicTextColor={musicTextColor} musicHasNeon={musicHasNeon} musicNeonStrength={musicNeonStrength} isAutoPlay={isAutoPlay} />
                      </div>
                    )}

                    <div className="w-full z-20">
                      {RenderCounter()}
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
