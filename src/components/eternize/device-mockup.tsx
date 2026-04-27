
'use client';

import React, { useMemo } from 'react';
import Image from 'next/image';
import { 
  Heart, 
  ImageIcon, 
  Clock,
  Layout,
  Hash,
  Calendar as CalendarIcon
} from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
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
  date,
  timeDiff,
  selectedCountStyle
}: DeviceMockupProps) {
  
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
            
            {/* Countdown Section */}
            {(step === 'data-location' || step === 'page-title') && date && timeDiff && (
              <div className="w-full animate-in fade-in duration-700">
                {selectedCountStyle === 'simples' && (
                  <div className="w-full text-center space-y-2 pb-3">
                    <div className="text-lg">⌛</div>
                    <p className="text-xs md:text-sm font-bold leading-relaxed text-white">
                      {timeDiff.years.toString().padStart(2, '0')} anos {timeDiff.months.toString().padStart(2, '0')} meses {timeDiff.days.toString().padStart(2, '0')} dias {timeDiff.hours.toString().padStart(2, '0')} horas {timeDiff.minutes.toString().padStart(2, '0')} minutos {timeDiff.seconds.toString().padStart(2, '0')} segundos {timeDiff.milliseconds.toString().padStart(3, '0')} milissegundos
                    </p>
                  </div>
                )}

                {selectedCountStyle === 'classico' && (
                  <div className="text-center space-y-4 pt-3">
                    <p className="text-xs md:text-sm font-bold leading-relaxed px-2 text-white">
                      Uau, estão juntos há {timeDiff.years.toString().padStart(2, '0')} anos {timeDiff.months.toString().padStart(2, '0')} meses {timeDiff.days.toString().padStart(2, '0')} dias {timeDiff.hours.toString().padStart(2, '0')} horas {timeDiff.minutes.toString().padStart(2, '0')} minutos {timeDiff.seconds.toString().padStart(2, '0')} segundos ❤️🔥
                    </p>
                    <p className="text-[10px] md:text-[11px] font-bold text-white/90">
                      Desde {format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                    </p>
                  </div>
                )}

                {selectedCountStyle === 'padrao' && (
                  <div className="w-full space-y-4">
                    <div className="text-center">
                      <p className="text-[8px] md:text-[10px] font-black text-white/30 tracking-[0.2em] uppercase">UAU, ESTÃO JUNTOS HÁ</p>
                    </div>
                    <div className="grid grid-cols-3 gap-2 md:gap-3">
                      {[
                        { val: timeDiff.years, label: 'ANOS' },
                        { val: timeDiff.months, label: 'MESES' },
                        { val: timeDiff.days, label: 'DIAS' },
                        { val: timeDiff.hours, label: 'HORAS' },
                        { val: timeDiff.minutes, label: 'MINUTOS' },
                        { val: timeDiff.seconds, label: 'SEGUNDOS' },
                      ].map((item, i) => (
                        <div key={i} className="bg-white/5 border border-white/5 rounded-2xl py-3 flex flex-col items-center justify-center">
                          <span className="text-sm md:text-lg font-black leading-none">{item.val.toString().padStart(2, '0')}</span>
                          <span className="text-[6px] font-bold text-white/30 mt-1 uppercase tracking-wider">{item.label}</span>
                        </div>
                      ))}
                    </div>
                    <div className="text-center pt-2">
                      <p className="text-[7px] md:text-[9px] font-medium text-white/40 italic">
                        Desde {format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                      </p>
                    </div>
                  </div>
                )}

                {selectedCountStyle === 'data-grande' && (
                  <div className="w-full space-y-6">
                    <div className="text-center">
                      <div className="w-full space-y-2 mb-4 opacity-20">
                        <div className="h-0.5 bg-white rounded-full w-[80%] mx-auto" />
                        <div className="h-0.5 bg-white rounded-full w-[60%] mx-auto" />
                      </div>
                      <p className="text-[8px] md:text-[10px] font-black text-white/30 tracking-[0.2em] uppercase">UAU, ESTÃO JUNTOS HÁ</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-[2.5rem] py-8 px-6 flex items-center justify-around shadow-inner">
                      <div className="flex flex-col items-center">
                        <span className="text-4xl font-serif font-bold leading-none">{timeDiff.years.toString().padStart(2, '0')}</span>
                        <span className="text-[7px] font-bold text-white/30 mt-3 uppercase tracking-widest">ANOS</span>
                      </div>
                      <div className="w-px h-12 bg-white/10" />
                      <div className="flex flex-col items-center">
                        <span className="text-4xl font-serif font-bold leading-none">{timeDiff.months.toString().padStart(2, '0')}</span>
                        <span className="text-[7px] font-bold text-white/30 mt-3 uppercase tracking-widest">MESES</span>
                      </div>
                      <div className="w-px h-12 bg-white/10" />
                      <div className="flex flex-col items-center">
                        <span className="text-4xl font-serif font-bold leading-none">{timeDiff.days.toString().padStart(2, '0')}</span>
                        <span className="text-[7px] font-bold text-white/30 mt-3 uppercase tracking-widest">DIAS</span>
                      </div>
                    </div>
                  </div>
                )}

                {selectedCountStyle === 'dias-grandes' && (
                  <div className="w-full space-y-6 pt-2">
                    <div className="text-center">
                      <div className="w-full space-y-2 mb-4 opacity-20">
                        <div className="h-0.5 bg-white rounded-full w-[80%] mx-auto" />
                        <div className="h-0.5 bg-white rounded-full w-[60%] mx-auto" />
                      </div>
                      <p className="text-[8px] md:text-[10px] font-black text-white/30 tracking-[0.2em] uppercase">UAU, ESTÃO JUNTOS HÁ</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-[2.5rem] py-10 px-6 flex flex-col items-center justify-center gap-3 shadow-inner">
                      <span className="text-5xl font-serif font-bold leading-none tracking-tighter">
                        {Math.floor((new Date().getTime() - date.getTime()) / (1000 * 60 * 60 * 24)).toLocaleString('pt-BR')}
                      </span>
                      <span className="text-[8px] font-bold text-white/30 uppercase tracking-[0.3em]">DIAS</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Photos Card Section */}
            {(step === 'photos' || step === 'data-location' || step === 'page-title') && (
              <div className="w-full aspect-square bg-white rounded-[2rem] relative overflow-hidden shrink-0 animate-in fade-in duration-500 shadow-2xl z-20">
                {uploadedPhotos.length > 0 ? (
                  <div className="absolute inset-0 flex transition-transform duration-500 h-[85%]">
                    <Image src={uploadedPhotos[0]} fill className="object-cover" alt="Selected Photo" />
                  </div>
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
