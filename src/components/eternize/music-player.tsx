
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Music2, ChevronDown, Volume2, Play, Pause } from 'lucide-react';
import { cn } from '@/lib/utils';

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

interface MusicPlayerProps {
  musicData?: {
    id: string;
    title: string;
    thumb: string;
  };
}

export function MusicPlayer({ musicData }: MusicPlayerProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const playerRef = useRef<any>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const initPlayer = () => {
      if (window.YT && window.YT.Player && !playerRef.current) {
        playerRef.current = new window.YT.Player('youtube-audio-element', {
          height: '1',
          width: '1',
          videoId: musicData?.id || '',
          playerVars: {
            playsinline: 1,
            controls: 0,
            disablekb: 1,
            fs: 0,
            rel: 0,
            origin: window.location.origin
          },
          events: {
            onStateChange: (event: any) => {
              if (event.data === window.YT.PlayerState.PLAYING) {
                setIsPlaying(true);
                setDuration(playerRef.current.getDuration());
                playerRef.current.unMute();
                playerRef.current.setVolume(100);
                startTimer();
              } else {
                setIsPlaying(false);
                stopTimer();
              }
            },
            onReady: () => {
              if (musicData?.id) {
                playerRef.current.cueVideoById(musicData.id);
              }
            }
          },
        });
      }
    };

    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      window.onYouTubeIframeAPIReady = initPlayer;
    } else {
      initPlayer();
    }

    return () => {
      stopTimer();
    };
  }, []);

  useEffect(() => {
    if (playerRef.current && musicData?.id && playerRef.current.loadVideoById) {
      playerRef.current.loadVideoById(musicData.id);
      if (!isExpanded) setIsExpanded(true);
    }
  }, [musicData?.id]);

  const startTimer = () => {
    stopTimer();
    timerRef.current = setInterval(() => {
      if (playerRef.current && playerRef.current.getCurrentTime) {
        setCurrentTime(playerRef.current.getCurrentTime());
      }
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!playerRef.current || !playerRef.current.getPlayerState) return;
    const state = playerRef.current.getPlayerState();
    if (state === 1) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.unMute();
      playerRef.current.setVolume(100);
      playerRef.current.playVideo();
    }
  };

  const formatTime = (time: number) => {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? '0' + sec : sec}`;
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!playerRef.current || duration === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const perc = x / rect.width;
    playerRef.current.seekTo(duration * perc);
  };

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <div 
      className={cn(
        "w-full bg-[#0e0e0e] rounded-[20px] border border-[#1f1f1f] overflow-hidden p-[12px] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-2xl",
        isExpanded ? "pb-[20px]" : ""
      )}
    >
      <div className="flex items-center justify-between cursor-pointer" onClick={toggleExpand}>
        <div className="w-[48px] h-[48px] bg-[#1a1a1a] rounded-[12px] flex items-center justify-center overflow-hidden shrink-0">
          {musicData?.thumb ? (
            <img src={musicData.thumb} className="w-full h-full object-cover" alt="Album Art" />
          ) : (
            <Music2 className="text-white w-5 h-5" />
          )}
        </div>
        
        <div className="flex-1 ml-[15px] overflow-hidden">
          <div className="text-white text-[14px] font-semibold truncate">
            {musicData?.title || "Nenhuma música"}
          </div>
          <div className="text-[#666] text-[12px] truncate">
            {musicData?.id ? "YouTube Audio" : "Selecione uma opção"}
          </div>
        </div>

        <div className={cn("text-[#666] transition-transform duration-500", isExpanded ? "rotate-180" : "")}>
          <ChevronDown size={20} />
        </div>
      </div>

      <div className={cn(
        "overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
        isExpanded ? "max-h-[200px] opacity-100 mt-[20px]" : "max-h-0 opacity-0"
      )}>
        <div className="progress-container group px-1" onClick={seek}>
          <div className="w-full h-[2px] bg-[#222] relative cursor-pointer">
            <div 
              className="absolute top-0 left-0 h-full bg-[#7a1a1a] transition-all duration-100" 
              style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
            />
          </div>
          
          <div className="flex justify-between text-[#666] text-[11px] mt-[8px]">
            <span className="tabular-nums">{formatTime(currentTime)}</span>
            <span className="tabular-nums">{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-[15px] px-[5px]">
          <Volume2 size={18} className="text-[#666]" />
          <button 
            className="w-[45px] h-[45px] bg-[#7a1a1a] rounded-full flex items-center justify-center text-white active:scale-95 transition-transform shadow-[0_4px_15px_rgba(0,0,0,0.4)]"
            onClick={togglePlay}
          >
            {isPlaying ? <Pause size={20} fill="white" /> : <Play size={20} fill="white" className="ml-[3px]" />}
          </button>
          <div className="w-[18px]" />
        </div>
      </div>

      <div id="youtube-audio-element" className="hidden"></div>
    </div>
  );
}
