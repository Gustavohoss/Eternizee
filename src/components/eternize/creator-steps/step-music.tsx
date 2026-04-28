
'use client';

import React, { useState, useEffect } from 'react';
import { Music, Search, ChevronLeft, ChevronRight, X, Play, Palette, Zap, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ColorPicker } from '@/components/eternize/color-picker';
import { cn } from '@/lib/utils';

const API_KEY = 'AIzaSyAzbeELZ6u1jXGKVGvNXHnlaqIZhJSmD0A';

interface MusicData {
  id: string;
  title: string;
  thumb: string;
}

interface StepMusicProps {
  musicData?: MusicData;
  onMusicSelect: (data: MusicData | undefined) => void;
  musicBoxColor: string;
  onMusicBoxColorChange: (color: string) => void;
  musicTextColor: string;
  onMusicTextColorChange: (color: string) => void;
  musicHasNeon: boolean;
  onMusicHasNeonChange: (has: boolean) => void;
  musicNeonStrength: number;
  onMusicNeonStrengthChange: (strength: number) => void;
  isAutoPlay: boolean;
  onAutoPlayChange: (autoPlay: boolean) => void;
  onBack: () => void;
  onNext: () => void;
}

export function StepMusic({
  musicData,
  onMusicSelect,
  musicBoxColor,
  onMusicBoxColorChange,
  musicTextColor,
  onMusicTextColorChange,
  musicHasNeon,
  onMusicHasNeonChange,
  musicNeonStrength,
  onMusicNeonStrengthChange,
  isAutoPlay,
  onAutoPlayChange,
  onBack,
  onNext
}: StepMusicProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.length >= 3) {
        handleSearch();
      } else {
        setResults([]);
        setShowResults(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearch = async () => {
    setIsSearching(true);
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${encodeURIComponent(searchQuery)}&type=video&key=${API_KEY}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.items) {
        setResults(data.items);
        setShowResults(true);
      }
    } catch (error) {
      console.error("Erro na busca do YouTube:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const selectTrack = (item: any) => {
    onMusicSelect({
      id: item.id.videoId,
      title: item.snippet.title,
      thumb: item.snippet.thumbnails.default.url
    });
    setSearchQuery('');
    setShowResults(false);
  };

  return (
    <div className="space-y-8 md:space-y-10 flex flex-col items-center md:items-start">
      <div className="space-y-3 text-center md:text-left">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="bg-white/5 p-2 rounded-2xl border border-white/10"><Music className="w-5 h-5 md:w-6 md:h-6 text-white/80" /></div>
          <h2 className="text-2xl md:text-4xl font-black tracking-tight">Trilha Sonora</h2>
        </div>
        <p className="text-xs md:text-base text-white/40 font-medium max-w-md">Pesquise a música que representa a história de vocês através do YouTube.</p>
      </div>

      <div className="space-y-8 w-full max-w-md">
        <div className="space-y-4 relative">
          <Label className="text-[11px] font-black uppercase tracking-wider text-white/60 text-center md:text-left block">Pesquisar música 🎵</Label>
          <div className="relative group">
            <Search className={cn(
              "absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors",
              isSearching ? "text-primary animate-pulse" : "text-white/30 group-focus-within:text-primary"
            )} />
            <Input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Digite o nome da música ou artista..."
              className="bg-white/5 border-white/10 h-14 md:h-16 pl-14 pr-12 rounded-xl text-sm md:text-base font-medium focus:border-primary/50 transition-all shadow-inner"
            />
            {searchQuery && (
              <button 
                onClick={() => { setSearchQuery(''); setShowResults(false); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-white/30" />
              </button>
            )}
          </div>

          {showResults && results.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-3 bg-[#0e0e0e] border border-[#1f1f1f] rounded-2xl overflow-hidden z-[100] shadow-[0_30px_60px_rgba(0,0,0,0.8)] animate-in fade-in slide-in-from-top-2">
              {results.map((item) => (
                <div 
                  key={item.id.videoId}
                  onClick={() => selectTrack(item)}
                  className="flex items-center gap-4 p-3 hover:bg-[#161616] cursor-pointer transition-colors border-b border-[#161616] last:border-0"
                >
                  <img src={item.snippet.thumbnails.default.url} className="w-10 h-10 rounded-lg object-cover" alt="" />
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-xs font-bold truncate">{item.snippet.title}</div>
                    <div className="text-white/30 text-[10px] uppercase font-bold tracking-wider">YouTube Audio</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {musicData && (
          <div className="space-y-6">
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 flex items-center gap-4 animate-in zoom-in-95 group/card">
              <div className="relative shrink-0 overflow-hidden rounded-xl w-14 h-14 flex items-center justify-center bg-black">
                <img src={musicData.thumb} className="w-full h-full object-cover opacity-80" alt="" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover/card:bg-black/20 transition-all cursor-pointer">
                    <Play className="w-6 h-6 text-white fill-white" />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-black uppercase text-primary tracking-widest mb-1">Música Selecionada</div>
                <div className="text-white text-xs font-bold truncate pr-2">{musicData.title}</div>
              </div>

              <button 
                onClick={() => onMusicSelect(undefined)}
                className="p-2 hover:bg-white/5 rounded-full text-white/30 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-6 bg-white/5 p-6 rounded-2xl border border-white/10">
                <div className="flex items-center gap-2 mb-2"><Palette className="w-4 h-4 text-primary" /><h3 className="text-[11px] font-black uppercase tracking-widest text-white/60">Personalizar Caixa de Música</h3></div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <Play className="w-4 h-4 text-white/40" />
                        <Label className="text-[11px] font-bold text-white/50 uppercase cursor-pointer" htmlFor="music-autoplay-toggle">Auto Play</Label>
                      </div>
                      <p className="text-[9px] text-white/30 italic flex items-center gap-1"><Info className="w-2.5 h-2.5" /> A música iniciará sozinha quando a página abrir.</p>
                    </div>
                    <Switch id="music-autoplay-toggle" checked={isAutoPlay} onCheckedChange={onAutoPlayChange} />
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/5">
                  <Label className="text-[11px] font-bold text-white/50 uppercase">Cor da Caixa</Label>
                  <div className="flex items-center gap-4">
                    <Popover><PopoverTrigger asChild><button className="flex items-center gap-3 bg-white/5 border border-white/10 p-2 rounded-xl hover:bg-white/10 transition-all"><div className="w-10 h-10 rounded-lg shadow-inner border border-white/10" style={{ backgroundColor: musicBoxColor }} /><div className="text-left pr-4"><p className="text-[10px] font-black uppercase text-white/30">Fundo</p><p className="text-xs font-mono font-bold">{musicBoxColor}</p></div></button></PopoverTrigger><PopoverContent className="w-auto p-0 border-none bg-transparent shadow-none" align="start"><ColorPicker selectedBgColor={musicBoxColor} onChange={onMusicBoxColorChange} /></PopoverContent></Popover>
                    <div className="flex flex-wrap gap-1.5">{['#0e0e0e', '#1a1a1a', '#7a1a1a', '#ffffff', '#111111'].map((color) => (<button key={color} onClick={() => onMusicBoxColorChange(color)} className={cn("w-6 h-6 rounded-full border transition-transform active:scale-90", musicBoxColor === color ? "border-white scale-110" : "border-white/10")} style={{ backgroundColor: color }} />))}</div>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/5">
                  <Label className="text-[11px] font-bold text-white/50 uppercase">Cor do Texto</Label>
                  <div className="flex items-center gap-4">
                    <Popover><PopoverTrigger asChild><button className="flex items-center gap-3 bg-white/5 border border-white/10 p-2 rounded-xl hover:bg-white/10 transition-all"><div className="w-10 h-10 rounded-lg shadow-inner border border-white/10" style={{ backgroundColor: musicTextColor }} /><div className="text-left pr-4"><p className="text-[10px] font-black uppercase text-white/30">Texto</p><p className="text-xs font-mono font-bold">{musicTextColor}</p></div></button></PopoverTrigger><PopoverContent className="w-auto p-0 border-none bg-transparent shadow-none" align="start"><ColorPicker selectedBgColor={musicTextColor} onChange={onMusicTextColorChange} /></PopoverContent></Popover>
                    <div className="flex flex-wrap gap-1.5">{['#ffffff', '#ff4da6', '#e11d48', '#7a1a1a', '#111111'].map((color) => (<button key={color} onClick={() => onMusicTextColorChange(color)} className={cn("w-6 h-6 rounded-full border transition-transform active:scale-90", musicTextColor === color ? "border-white scale-110" : "border-white/10")} style={{ backgroundColor: color }} />))}</div>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/5">
                  <div className="flex items-center justify-between mb-2"><div className="flex items-center gap-2"><Zap className="w-4 h-4 text-white/40" /><Label className="text-[11px] font-bold text-white/50 uppercase cursor-pointer" htmlFor="music-neon-toggle">Efeito Neon no Botão</Label></div><Switch id="music-neon-toggle" checked={musicHasNeon} onCheckedChange={onMusicHasNeonChange} /></div>
                  {musicHasNeon && (<div className="space-y-3 pt-2 animate-in fade-in slide-in-from-top-2"><div className="flex items-center justify-between"><Label className="text-[9px] font-black uppercase tracking-wider text-white/40">Força do Neon</Label><span className="text-[10px] font-black text-primary">{musicNeonStrength}</span></div><Slider value={[musicNeonStrength]} onValueChange={(val) => onMusicNeonStrengthChange(val[0])} min={5} max={40} step={1} /></div>)}
                </div>
            </div>
          </div>
        )}

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary/20 p-2 rounded-lg">
              <Music className="w-4 h-4 text-primary" />
            </div>
            <h3 className="text-xs font-black uppercase tracking-wider">Como funciona?</h3>
          </div>
          <p className="text-[11px] text-white/50 leading-relaxed font-medium">
            Integramos sua página diretamente com o YouTube. A música escolhida será exibida com um player personalizado na sua página.
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
