
'use client';

import React from 'react';
import { Music, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface StepMusicProps {
  spotifyUrl: string;
  onSpotifyUrlChange: (url: string) => void;
  onBack: () => void;
  onNext: () => void;
}

export function StepMusic({
  spotifyUrl,
  onSpotifyUrlChange,
  onBack,
  onNext
}: StepMusicProps) {
  return (
    <div className="space-y-8 md:space-y-10 flex flex-col items-center md:items-start">
      <div className="space-y-3 text-center md:text-left">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="bg-white/5 p-2 rounded-2xl border border-white/10"><Music className="w-5 h-5 md:w-6 md:h-6 text-white/80" /></div>
          <h2 className="text-2xl md:text-4xl font-black tracking-tight">Trilha Sonora</h2>
        </div>
        <p className="text-xs md:text-base text-white/40 font-medium max-w-md">Escolha a música que representa a história de vocês através do Spotify.</p>
      </div>

      <div className="space-y-8 w-full max-w-md">
        <div className="space-y-4">
          <Label className="text-[11px] font-black uppercase tracking-wider text-white/60 text-center md:text-left block">Link da música no Spotify 🎵</Label>
          <div className="relative group">
            <Input 
              value={spotifyUrl}
              onChange={(e) => onSpotifyUrlChange(e.target.value)}
              placeholder="https://open.spotify.com/track/..."
              className="bg-white/5 border-white/10 h-14 md:h-16 rounded-xl text-sm md:text-base font-medium focus:border-primary/50 transition-all shadow-inner"
            />
          </div>
          <p className="text-[10px] text-white/30 italic">Abra o Spotify, clique nos {"'...'"} da música &gt; Compartilhar &gt; Copiar link.</p>
        </div>

        <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary/20 p-2 rounded-lg">
              <Music className="w-4 h-4 text-primary" />
            </div>
            <h3 className="text-xs font-black uppercase tracking-wider">Dica Especial</h3>
          </div>
          <p className="text-[11px] text-white/50 leading-relaxed font-medium">
            A música escolhida será exibida com um player personalizado na sua página, permitindo que quem receba o presente sinta toda a emoção do momento.
          </p>
        </div>
      </div>

      <div className="hidden lg:flex flex-col sm:flex-row items-center gap-5 pt-10 border-t border-white/5 w-full max-md">
        <Button onClick={onBack} variant="outline" className="w-full sm:w-auto px-8 h-12 rounded-xl border-white/10 bg-white/5 font-black text-sm hover:bg-white/10 transition-all flex items-center gap-2"><ChevronLeft className="w-4 h-4" /> Voltar</Button>
        <Button onClick={onNext} className="w-full sm:flex-1 h-12 rounded-xl bg-primary text-white font-black text-sm hover:bg-primary/90 transition-all flex items-center justify-center gap-2">Próxima etapa <ChevronRight className="w-4 h-4" /></Button>
      </div>
    </div>
  );
}
