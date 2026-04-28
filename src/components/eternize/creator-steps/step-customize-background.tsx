'use client';

import React from 'react';
import { Palette, Sparkles, Ban, Heart, Type, ChevronLeft, ChevronRight, Star, Wind, Grid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { ColorPicker } from '@/components/eternize/color-picker';
import { EmojiPicker } from '@/components/eternize/emoji-picker';
import { cn } from '@/lib/utils';

interface StepCustomizeBackgroundProps {
  selectedBgColor: string;
  onBgColorChange: (color: string) => void;
  selectedEffect: string;
  onEffectChange: (effect: string) => void;
  isEmojiRainEnabled: boolean;
  onEmojiRainToggle: (enabled: boolean) => void;
  selectedEmojis: string[];
  onToggleEmoji: (emoji: string) => void;
  emojiSize: number;
  onEmojiSizeChange: (size: number) => void;
  isEmojiPickerOpen: boolean;
  onEmojiPickerOpenChange: (open: boolean) => void;
  onBack: () => void;
  onNext: () => void;
}

export function StepCustomizeBackground({
  selectedBgColor,
  onBgColorChange,
  selectedEffect,
  onEffectChange,
  isEmojiRainEnabled,
  onEmojiRainToggle,
  selectedEmojis,
  onToggleEmoji,
  emojiSize,
  onEmojiSizeChange,
  isEmojiPickerOpen,
  onEmojiPickerOpenChange,
  onBack,
  onNext
}: StepCustomizeBackgroundProps) {
  return (
    <div className="space-y-8 md:space-y-10 flex flex-col items-center md:items-start">
      <div className="space-y-3 text-center md:text-left">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="bg-white/5 p-2 rounded-2xl border border-white/10"><Palette className="w-5 h-5 md:w-6 md:h-6 text-white/80" /></div>
          <h2 className="text-2xl md:text-4xl font-black tracking-tight">Personalizar Fundo</h2>
        </div>
        <p className="text-xs md:text-base text-white/40 font-medium max-w-md">Escolha a cor base e adicione efeitos especiais para sua página.</p>
      </div>
      <div className="w-full max-w-md space-y-8">
        <ColorPicker selectedBgColor={selectedBgColor} onChange={onBgColorChange} />
        
        <div className="space-y-5">
          <div className="flex items-center justify-center md:justify-start gap-2"><Sparkles className="w-5 h-5 text-primary" /><h3 className="text-[10px] md:text-sm font-black uppercase tracking-widest text-white/60">Efeito Visual de Fundo</h3></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div onClick={() => onEffectChange('none')} className={cn("cursor-pointer border rounded-2xl p-5 transition-all duration-300 flex items-center gap-4", selectedEffect === 'none' ? "border-primary bg-primary/5 ring-1 ring-primary/20" : "border-white/10 bg-white/5 hover:border-white/20")}><div className="bg-white/5 p-2.5 rounded-xl"><Ban className="w-5 h-5 text-white/40" /></div><div><p className="text-[11px] font-black uppercase tracking-wider">Sem efeito</p><p className="text-[10px] text-white/40">Fundo estático</p></div></div>
            <div onClick={() => onEffectChange('sparkles')} className={cn("cursor-pointer border rounded-2xl p-5 transition-all duration-300 flex items-center gap-4", selectedEffect === 'sparkles' ? "border-primary bg-primary/5 ring-1 ring-primary/20" : "border-white/10 bg-white/5 hover:border-white/20")}><div className="bg-white/10 p-2.5 rounded-xl"><Star className="w-5 h-5 text-white fill-white" /></div><div><p className="text-[11px] font-black uppercase tracking-wider">Fundo Estrelado</p><p className="text-[10px] text-white/40">Céu com estrelas</p></div></div>
            <div onClick={() => onEffectChange('smoke')} className={cn("cursor-pointer border rounded-2xl p-5 transition-all duration-300 flex items-center gap-4", selectedEffect === 'smoke' ? "border-primary bg-primary/5 ring-1 ring-primary/20" : "border-white/10 bg-white/5 hover:border-white/20")}><div className="bg-white/10 p-2.5 rounded-xl"><Wind className="w-5 h-5 text-white" /></div><div><p className="text-[11px] font-black uppercase tracking-wider">Nuvem de Fumaça</p><p className="text-[10px] text-white/40">Fumaça animada</p></div></div>
            <div onClick={() => onEffectChange('pattern')} className={cn("cursor-pointer border rounded-2xl p-5 transition-all duration-300 flex items-center gap-4", selectedEffect === 'pattern' ? "border-primary bg-primary/5 ring-1 ring-primary/20" : "border-white/10 bg-white/5 hover:border-white/20")}><div className="bg-white/10 p-2.5 rounded-xl"><Grid className="w-5 h-5 text-white" /></div><div><p className="text-[11px] font-black uppercase tracking-wider">Padrão em Queda</p><p className="text-[10px] text-white/40">Elementos caindo</p></div></div>
          </div>
        </div>

        <div className="space-y-5 bg-white/5 p-6 rounded-2xl border border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-xl"><Heart className="w-5 h-5 text-primary fill-primary" /></div>
              <div>
                <p className="text-[11px] font-black uppercase tracking-wider">Chuva de Emojis</p>
                <p className="text-[10px] text-white/40">Ativar emojis caindo</p>
              </div>
            </div>
            <Switch checked={isEmojiRainEnabled} onCheckedChange={onEmojiRainToggle} />
          </div>

          {isEmojiRainEnabled && (
            <div className="space-y-6 pt-4 border-t border-white/5 animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="space-y-4">
                <Label className="text-[11px] font-black uppercase tracking-wider text-white/60 flex items-center gap-2">
                  <Heart className="w-3.5 h-3.5" /> Escolha os emojis (Até 3)
                </Label>
                <EmojiPicker selectedEmojis={selectedEmojis} onToggle={onToggleEmoji} onOpenChange={onEmojiPickerOpenChange} open={isEmojiPickerOpen} />
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-[11px] font-black uppercase tracking-wider text-white/60 flex items-center gap-2">
                    <Type className="w-3.5 h-3.5" /> Tamanho
                  </Label>
                  <span className="text-[10px] font-black text-primary">{emojiSize}px</span>
                </div>
                <Slider value={[emojiSize]} onValueChange={(val) => onEmojiSizeChange(val[0])} min={12} max={48} step={1} />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="hidden lg:flex flex-col sm:flex-row items-center gap-5 pt-10 border-t border-white/5 w-full max-w-md">
        <Button onClick={onBack} variant="outline" className="w-full sm:w-auto px-8 h-12 rounded-xl border-white/10 bg-white/5 font-black text-sm hover:bg-white/10 transition-all flex items-center gap-2"><ChevronLeft className="w-4 h-4" /> Voltar</Button>
        <Button onClick={onNext} className="w-full sm:flex-1 h-12 rounded-xl bg-primary text-white font-black text-sm hover:bg-primary/90 transition-all flex items-center justify-center gap-2">Próxima etapa <ChevronRight className="w-4 h-4" /></Button>
      </div>
    </div>
  );
}
