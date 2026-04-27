'use client';

import React, { useMemo, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { 
  Heart, 
  ImageIcon, 
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { cn } from '@/lib/utils';

interface DeviceMockupProps {
  selectedBgColor: string;
  selectedEffect: string;
  selectedEmojis: string[];
  emojiSize: number;
  step: string;
  uploadedPhotos: string[];
  pageTitle: string;
  date?: Date;
  timeDiff?: any;
  selectedCountStyle: string;
  photoEffect: 'slide' | 'coverflow' | 'cards';
  // Novas props de personalização do título
  titleColor?: string;
  titleFont?: string;
  titleIsBold?: boolean;
  titleHasNeon?: boolean;
}

export function DeviceMockup({
  selectedBgColor,
  selectedEffect,
  selectedEmojis,
  emojiSize,
  step,
  uploadedPhotos,
  pageTitle,
  photoEffect = 'slide',
  titleColor = '#111111',
  titleFont = 'dancing-script',
  titleIsBold = false,
  titleHasNeon = false
}: DeviceMockupProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    duration: 30,
    align: 'center',
    containScroll: false,
    skipSnaps: false
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

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

  return (
    <div className="w-full max-w-[300px]">
      <div className="mb-6 text-center">
        <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Prévia em tempo real</p>
      </div>

      <div className="bg-[#1a1a1a] rounded-t-2xl border-x border-t border-white/10 p-2.5 flex items-center gap-3">
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500/20" />
          <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/20" />
          <div className="w-1.5 h-1.5 rounded-full bg-green-500/20" />
        </div>
        <div className="flex-1 bg-black/40 rounded-full h-4 flex items-center px-3 gap-2">
          <div className="w-2 h-2 text-white/20 text-[6px]">🔒</div>
          <div className="text-[7px] font-medium text-white/40 truncate">eternize.com/...</div>
        </div>
      </div>
      
      <div className="relative aspect-[9/19] bg-black border-x border-b border-white/10 rounded-b-[2.5rem] overflow-hidden shadow-2xl">
        <div className="absolute inset-0 transition-colors duration-500" style={{ backgroundColor: selectedBgColor }}>
          
          {selectedEffect === 'emoji-rain' && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
              {raindrops.map((drop) => (
                <div 
                  key={drop.id}
                  className="absolute animate-fall"
                  style={{
                    left: drop.left,
                    top: `-40px`,
                    animationDuration: drop.duration,
                    animationDelay: drop.delay,
                    opacity: drop.opacity,
                    fontSize: `${emojiSize}px`
                  }}
                >
                  {drop.emoji}
                </div>
              ))}
            </div>
          )}

          <div className="absolute inset-0 flex flex-col items-center pt-10 px-6 gap-4 md:gap-6 overflow-y-auto hide-scrollbar">
            
            {(step === 'photos' || step === 'data-location' || step === 'page-title') && (
              <div 
                className={cn(
                  "w-full bg-[#ffffff] rounded-[8px] shadow-[0_40px_100px_rgba(0,0,0,0.9)] z-20 animate-in fade-in duration-500 flex flex-col items-center",
                  photoEffect === 'cards' ? "p-[12px] pb-[40px]" : "p-[12px] pb-[35px]"
                )}
              >
                <div 
                  className={cn(
                    "w-full aspect-square relative photo-display-area",
                    photoEffect === 'slide' ? "overflow-hidden rounded-[4px]" : "overflow-visible"
                  )}
                  style={{ perspective: '1000px' }}
                >
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
                            <div 
                              key={i} 
                              className={cn(
                                "relative aspect-square flex-shrink-0 flex items-center justify-center",
                                photoEffect === 'coverflow' ? "flex-[0_0_100%] absolute inset-0" : 
                                photoEffect === 'cards' ? "flex-[0_0_100%] absolute inset-0" : "flex-[0_0_100%]"
                              )}
                              style={photoEffect === 'cards' ? {
                                zIndex: isActive ? 10 : 10 - absDiff,
                                opacity: absDiff > 4 ? 0 : 1,
                                pointerEvents: isActive ? 'auto' : 'none',
                                transform: `translateY(${absDiff * 12}px) rotate(${absDiff * 2}deg) scale(${1 - absDiff * 0.05})`,
                                transition: 'transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1), opacity 0.6s ease'
                              } : photoEffect === 'coverflow' ? {
                                zIndex: isActive ? 10 : 5,
                                transform: isActive 
                                  ? 'scale(1) rotateY(0deg) translateZ(0)' 
                                  : position === 'prev' 
                                    ? 'scale(0.85) rotateY(30deg) translateZ(-80px) translateX(30px)' 
                                    : 'scale(0.85) rotateY(-30deg) translateZ(-80px) translateX(-30px)',
                                transition: 'transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1), opacity 0.6s ease'
                              } : {}}
                            >
                              <div 
                                className={cn(
                                  "w-full h-full relative overflow-hidden rounded-[4px]",
                                  photoEffect === 'coverflow' && !isActive && "opacity-70 grayscale-[20%]",
                                  photoEffect === 'cards' && "shadow-[0_10px_25px_rgba(0,0,0,0.4)]"
                                )}
                              >
                                <Image 
                                  src={photo} 
                                  fill 
                                  className="object-cover block" 
                                  alt={`Foto ${i + 1}`} 
                                  sizes="300px"
                                  priority
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      
                      {uploadedPhotos.length > 1 && (
                        <div className="absolute bottom-[10px] left-1/2 -translate-x-1/2 flex gap-[7px] z-30 pointer-events-none">
                          {uploadedPhotos.map((_, i) => (
                            <div 
                              key={i} 
                              className={cn(
                                "w-[7px] h-[7px] rounded-full transition-all duration-400",
                                i === selectedIndex 
                                  ? "bg-[#ff0000] scale-[1.3] shadow-[0_0_10px_rgba(255,0,0,0.5)] opacity-1" 
                                  : "bg-white/60 opacity-50"
                              )}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#f5f5f5] rounded-[4px]">
                      <ImageIcon className="w-12 h-12 text-black/10" />
                      <span className="text-[8px] font-black uppercase tracking-[0.2em] text-black/10">Sua Foto Aqui</span>
                    </div>
                  )}
                </div>

                <div className="w-full text-center mt-[15px]">
                  <span 
                    style={{ 
                      color: titleColor,
                      fontFamily: getFontFamily(titleFont),
                      fontWeight: titleIsBold ? 'bold' : 'normal',
                      textShadow: titleHasNeon ? `0 0 5px ${titleColor}, 0 0 10px ${titleColor}` : 'none'
                    }}
                    className="text-[26px] block px-2 tracking-[1px] leading-relaxed break-words"
                  >
                    {pageTitle || "Seu Nome Aqui"}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
