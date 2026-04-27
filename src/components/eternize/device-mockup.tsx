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
            
            {/* Polaroid Frame Section - Exact Match to HTML Template */}
            {(step === 'photos' || step === 'data-location' || step === 'page-title') && (
              <div 
                className="w-full bg-[#ffffff] p-[15px] pb-[40px] rounded-[4px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-20 animate-in fade-in duration-500 flex flex-col items-center"
              >
                <div 
                  className="w-full aspect-[1/1.1] bg-[#111] relative overflow-hidden rounded-[2px] group/photo"
                >
                  {uploadedPhotos.length > 0 ? (
                    <>
                      <Image 
                        src={uploadedPhotos[currentPhotoIndex]} 
                        fill 
                        className="object-cover" 
                        alt={`Foto ${currentPhotoIndex + 1}`} 
                      />
                      
                      {uploadedPhotos.length > 1 && (
                        <>
                          <button 
                            onClick={prevPhoto}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white p-1 rounded-full backdrop-blur-sm transition-all z-40"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={nextPhoto}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white p-1 rounded-full backdrop-blur-sm transition-all z-40"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                          
                          {/* Pagination Dots over the photo */}
                          <div className="absolute bottom-[20px] left-1/2 -translate-x-1/2 flex gap-[5px] z-30">
                            {uploadedPhotos.map((_, i) => (
                              <div 
                                key={i} 
                                className={cn(
                                  "w-[8px] h-[8px] rounded-full transition-all duration-300",
                                  i === currentPhotoIndex ? "bg-[#ff0000] scale-[1.2]" : "bg-[#bbb]"
                                )}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#f5f5f5]">
                      <ImageIcon className="w-12 h-12 text-black/10" />
                      <span className="text-[8px] font-black uppercase tracking-[0.2em] text-black/10">Sua Foto Aqui</span>
                    </div>
                  )}
                </div>

                {/* Couple Name below photo */}
                <div className="mt-[20px] w-full text-center">
                  <span 
                    className="text-[#1a1a1a] font-['Dancing_Script'] text-[24px] leading-none break-words px-2 block truncate"
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
