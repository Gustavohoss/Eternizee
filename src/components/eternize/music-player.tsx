
'use client';

import React, { useState } from 'react';
import { Music2, ChevronUp, Volume2, Play, Pause } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MusicPlayerProps {
  spotifyUrl?: string;
}

export function MusicPlayer({ spotifyUrl }: MusicPlayerProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);
  
  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(!isPlaying);
    // Nota: Para tocar música real do Spotify com um botão customizado
    // seria necessário o SDK de reprodução do Spotify (Premium).
    // Aqui mantemos a funcionalidade visual solicitada.
  };

  return (
    <div 
      className={cn(
        "w-full bg-[#0e0e0e] rounded-[20px] border border-[#1f1f1f] overflow-hidden cursor-pointer p-[12px] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
        isExpanded ? "pb-[20px]" : ""
      )}
      onClick={toggleExpand}
    >
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <div className={cn(
          "bg-[#1a1a1a] rounded-[12px] flex items-center justify-center text-white transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
          isExpanded ? "w-[64px] h-[64px]" : "w-[48px] h-[48px]"
        )}>
          <Music2 size={isExpanded ? 24 : 20} />
        </div>
        <div className={cn(
          "text-[#666] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
          isExpanded ? "rotate-180" : ""
        )}>
          <ChevronUp size={20} />
        </div>
      </div>

      {/* Área Expansível */}
      <div className={cn(
        "overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
        isExpanded ? "max-h-[200px] opacity-100 mt-[20px]" : "max-h-0 opacity-0"
      )}>
        {/* Barra de Progresso */}
        <div className="mt-[20px] mb-[10px]">
          <div className="w-full h-[2px] bg-[#222] relative">
            <div className="absolute top-0 left-0 h-full bg-[#666] w-[30%]" />
          </div>
          <div className="flex justify-between text-[#666] text-[11px] mt-[8px]">
            <span>0:00</span>
            <span>0:00</span>
          </div>
        </div>

        {/* Controles */}
        <div className="flex items-center justify-between mt-[15px] px-[5px]">
          <div className="text-white opacity-80 cursor-pointer">
            <Volume2 size={18} />
          </div>
          
          <button 
            onClick={handlePlayClick}
            className="w-[45px] h-[45px] bg-[#7a1a1a] rounded-full flex items-center justify-center text-white shadow-[0_4px_15px_rgba(0,0,0,0.4)] transition-transform active:scale-95 hover:scale-105"
          >
            {isPlaying ? (
              <Pause size={20} fill="white" />
            ) : (
              <Play size={20} fill="white" className="ml-[3px]" />
            )}
          </button>

          <div className="w-[18px]" />
        </div>
      </div>
    </div>
  );
}
