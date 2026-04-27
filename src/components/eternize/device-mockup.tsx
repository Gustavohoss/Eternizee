
'use client';

import React, { useMemo, useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  Heart, 
  ImageIcon, 
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
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
}

export function DeviceMockup({
  selectedBgColor,
  selectedEffect,
  selectedEmojis,
  emojiSize,
  step,
  uploadedPhotos,
  pageTitle,
}: DeviceMockupProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // Reset index when photos change
  useEffect(() => {
    if (currentPhotoIndex >= uploadedPhotos.length) {
      setCurrentPhotoIndex(Math.max(0, uploadedPhotos.length - 1));
    }
  }, [uploadedPhotos.length, currentPhotoIndex]);

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

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentPhotoIndex((prev) => (prev + 1) % uploadedPhotos.length);
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentPhotoIndex((prev) => (prev - 1 + uploadedPhotos.length) % uploadedPhotos.length);
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
          <div className="text-[7px] font-medium text-white/40 truncate">heartzzu.com/...</div>
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
            
            {/* Photos Card Section */}
            {(step === 'photos' || step === 'data-location' || step === 'page-title') && (
              <div className="w-full aspect-square bg-white rounded-[2rem] relative overflow-hidden shrink-0 animate-in fade-in duration-500 shadow-2xl z-20 group/photo">
                {uploadedPhotos.length > 0 ? (
                  <>
                    <div className="absolute inset-0 flex transition-transform duration-500 h-[85%]">
                      <Image 
                        src={uploadedPhotos[currentPhotoIndex]} 
                        fill 
                        className="object-cover" 
                        alt={`Photo ${currentPhotoIndex + 1}`} 
                      />
                    </div>
                    
                    {uploadedPhotos.length > 1 && (
                      <>
                        <button 
                          onClick={prevPhoto}
                          className="absolute left-2 top-[42.5%] -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white p-1 rounded-full backdrop-blur-sm transition-all"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={nextPhoto}
                          className="absolute right-2 top-[42.5%] -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white p-1 rounded-full backdrop-blur-sm transition-all"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                        
                        {/* Indicators */}
                        <div className="absolute bottom-[18%] left-1/2 -translate-x-1/2 flex gap-1 z-30">
                          {uploadedPhotos.map((_, i) => (
                            <div 
                              key={i} 
                              className={cn(
                                "w-1 h-1 rounded-full transition-all",
                                i === currentPhotoIndex ? "bg-white w-2" : "bg-white/40"
                              )}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                    <ImageIcon className="w-12 h-12 text-black/10" />
                    <span className="text-[8px] font-black uppercase tracking-[0.2em] text-black/10">Sua Foto Aqui</span>
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 h-[15%] flex flex-col items-center justify-center pb-1">
                  {pageTitle ? (
                    <span className="text-black font-serif italic text-[10px] md:text-xs leading-none break-words text-center px-4 truncate max-w-full">
                      {pageTitle}
                    </span>
                  ) : (
                    <div className="w-10 h-1 bg-black/5 rounded-full" />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
