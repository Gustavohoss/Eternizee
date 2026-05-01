'use client';

import React from 'react';
import { Palette, Sparkles, Ban, Heart, Type, Star, Wind, Grid, Gauge } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ColorPicker } from '@/components/eternize/color-picker';
import { EmojiPicker } from '@/components/eternize/emoji-picker';
import { cn } from '@/lib/utils';
import { SparklesCore } from '@/components/ui/sparkles';
import { SmokeBackground } from '@/components/ui/spooky-smoke-animation';
import { FallingPattern } from '@/components/ui/falling-pattern';

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
  
  sparklesDensity: number;
  onSparklesDensityChange: (val: number) => void;
  sparklesSpeed: number;
  onSparklesSpeedChange: (val: number) => void;
  sparklesColor: string;
  onSparklesColorChange: (val: string) => void;
  
  smokeIntensity: number;
  onSmokeIntensityChange: (val: number) => void;
  smokeColor: string;
  onSmokeColorChange: (val: string) => void;
  
  patternDuration: number;
  onPatternDurationChange: (val: number) => void;
  patternDensity: number;
  onPatternDensityChange: (val: number) => void;
  patternColor: string;
  onPatternColorChange: (val: string) => void;

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

  sparklesDensity,
  onSparklesDensityChange,
  sparklesSpeed,
  onSparklesSpeedChange,
  sparklesColor,
  onSparklesColorChange,
  smokeIntensity,
  onSmokeIntensityChange,
  smokeColor,
  onSmokeColorChange,
  patternDuration,
  onPatternDurationChange,
  patternDensity,
  onPatternDensityChange,
  patternColor,
  onPatternColorChange,
}: StepCustomizeBackgroundProps) {
  return (
    <div className="space-y-8 md:space-y-10 flex flex-col items-center md:items-start">
      <div className="space-y-3 text-center md:text-left">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="bg-white/5 p-2 rounded-2xl border border-white/10">
            <Palette className="w-5 h-5 md:w-6 md:h-6 text-white/80" />
          </div>
          <h2 className="text-2xl md:text-4xl font-black tracking-tight">Personalizar Fundo</h2>
        </div>
        <p className="text-xs md:text-base text-white/40 font-medium max-w-md">Escolha a cor base e adicione efeitos especiais para sua página.</p>
      </div>

      <div className="w-full max-w-md space-y-8">
        <ColorPicker selectedBgColor={selectedBgColor} onChange={onBgColorChange} />
        
        <div className="space-y-5">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h3 className="text-[10px] md:text-sm font-black uppercase tracking-widest text-white/60">Efeito Visual de Fundo</h3>
          </div>

          <div className="flex flex-col gap-4">
            {/* SEM EFEITO */}
            <div 
              onClick={() => onEffectChange('none')} 
              className={cn(
                "relative cursor-pointer border rounded-[2rem] h-24 overflow-hidden transition-all duration-300 group",
                selectedEffect === 'none' ? "border-primary ring-1 ring-primary/40" : "border-white/10 hover:border-white/20"
              )}
            >
              <div className="absolute inset-0 bg-[#0a0a0a] z-0" />
              <div className="relative z-10 h-full flex items-center gap-4 px-6">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                  <Ban className="w-6 h-6 text-white/40" />
                </div>
                <div>
                  <p className="text-[13px] font-black uppercase tracking-wider text-white">Sem efeito</p>
                  <p className="text-[11px] text-white/40 font-medium">Fundo estático</p>
                </div>
              </div>
            </div>

            {/* FUNDO ESTRELADO */}
            <div 
              onClick={() => onEffectChange('sparkles')} 
              className={cn(
                "relative cursor-pointer border rounded-[2rem] h-24 overflow-hidden transition-all duration-300 group",
                selectedEffect === 'sparkles' ? "border-primary ring-1 ring-primary/40" : "border-white/10 hover:border-white/20"
              )}
            >
              <div className="absolute inset-0 bg-black z-0">
                <SparklesCore 
                  id="preview-sparkles"
                  background="transparent"
                  minSize={0.6}
                  maxSize={1.8}
                  particleDensity={1800}
                  className="w-full h-full"
                  particleColor="#ffffff"
                  speed={0.5}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-[1]" />
              <div className="relative z-10 h-full flex items-center gap-4 px-6">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10 backdrop-blur-sm">
                  <Star className="w-6 h-6 text-white fill-white" />
                </div>
                <div>
                  <p className="text-[13px] font-black uppercase tracking-wider text-white">Fundo Estrelado</p>
                  <p className="text-[11px] text-white/40 font-medium">Céu com estrelas</p>
                </div>
              </div>
            </div>

            {/* NUVEM DE FUMAÇA */}
            <div 
              onClick={() => onEffectChange('smoke')} 
              className={cn(
                "relative cursor-pointer border rounded-[2rem] h-24 overflow-hidden transition-all duration-300 group",
                selectedEffect === 'smoke' ? "border-primary ring-1 ring-primary/40" : "border-white/10 hover:border-white/20"
              )}
            >
              <div className="absolute inset-0 z-0">
                <SmokeBackground smokeColor="#808080" backgroundColor="#000000" intensity={0.6} />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/20 to-transparent z-[1]" />
              <div className="relative z-10 h-full flex items-center gap-4 px-6">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10 backdrop-blur-sm">
                  <Wind className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-[13px] font-black uppercase tracking-wider text-white">Nuvem de Fumaça</p>
                  <p className="text-[11px] text-white/40 font-medium">Fumaça animada</p>
                </div>
              </div>
            </div>

            {/* PADRÃO EM QUEDA */}
            <div 
              onClick={() => onEffectChange('pattern')} 
              className={cn(
                "relative cursor-pointer border rounded-[2rem] h-24 overflow-hidden transition-all duration-300 group",
                selectedEffect === 'pattern' ? "border-primary ring-1 ring-primary/40" : "border-white/10 hover:border-white/20"
              )}
            >
              <div className="absolute inset-0 z-0 opacity-60">
                <FallingPattern color="#ffffff" backgroundColor="transparent" density={1} duration={50} className="p-0" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-[1]" />
              <div className="relative z-10 h-full flex items-center gap-4 px-6">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10 backdrop-blur-sm">
                  <Grid className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-[13px] font-black uppercase tracking-wider text-white">Padrão em Queda</p>
                  <p className="text-[11px] text-white/40 font-medium">Elementos caindo</p>
                </div>
              </div>
            </div>
          </div>

          {selectedEffect !== 'none' && (
            <div className="bg-[#141414] rounded-[2rem] p-8 border border-[#222] space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="flex items-center gap-2 mb-2">
                <Gauge className="w-4 h-4 text-primary" />
                <h3 className="text-[11px] font-black uppercase tracking-widest text-white/60">Ajustes do Efeito</h3>
              </div>
              
              {selectedEffect === 'sparkles' && (
                <>
                  <div className="space-y-4">
                    <Label className="text-[10px] font-bold text-white/50 uppercase tracking-wider">Cor das Estrelas</Label>
                    <div className="flex items-center gap-3">
                      <Popover>
                        <PopoverTrigger asChild>
                          <button className="flex items-center gap-3 bg-white/5 border border-white/10 p-2 rounded-xl hover:bg-white/10 transition-all group">
                            <div className="w-8 h-8 rounded-lg shadow-inner border border-white/10" style={{ backgroundColor: sparklesColor }} />
                            <div className="text-left pr-2">
                              <p className="text-[9px] font-black uppercase text-white/30">Cor Estrelas</p>
                              <p className="text-[10px] font-mono font-bold">{sparklesColor}</p>
                            </div>
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 border-none bg-transparent shadow-none" align="start">
                          <ColorPicker selectedBgColor={sparklesColor} onChange={onStarColorChangeWrapper} />
                        </PopoverContent>
                      </Popover>
                      <div className="flex flex-wrap gap-1">
                        {['#ffffff', '#fff9c4', '#ffeb3b', '#e11d48', '#2563eb'].map((color) => (
                          <button key={color} onClick={() => onSparklesColorChange(color)} className={cn("w-5 h-5 rounded-full border transition-transform active:scale-90", sparklesColor === color ? "border-white scale-110" : "border-white/10")} style={{ backgroundColor: color }} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-[10px] font-bold text-white/50 uppercase tracking-wider">Densidade de Estrelas</Label>
                      <span className="text-[10px] font-black text-primary">{sparklesDensity}</span>
                    </div>
                    <Slider value={[sparklesDensity]} onValueChange={(val) => onSparklesDensityChange(val[0])} min={50} max={800} step={10} />
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-[10px] font-bold text-white/50 uppercase tracking-wider">Velocidade</Label>
                      <span className="text-[10px] font-black text-primary">{sparklesSpeed.toFixed(1)}x</span>
                    </div>
                    <Slider value={[sparklesSpeed]} onValueChange={(val) => onSparklesSpeedChange(val[0])} min={0.1} max={5} step={0.1} />
                  </div>
                </>
              )}

              {selectedEffect === 'smoke' && (
                <>
                  <div className="space-y-4">
                    <Label className="text-[10px] font-bold text-white/50 uppercase tracking-wider">Cor da Fumaça</Label>
                    <div className="flex items-center gap-3">
                      <Popover>
                        <PopoverTrigger asChild>
                          <button className="flex items-center gap-3 bg-white/5 border border-white/10 p-2 rounded-xl hover:bg-white/10 transition-all group">
                            <div className="w-8 h-8 rounded-lg shadow-inner border border-white/10" style={{ backgroundColor: smokeColor }} />
                            <div className="text-left pr-2">
                              <p className="text-[9px] font-black uppercase text-white/30">Cor Fumaça</p>
                              <p className="text-[10px] font-mono font-bold">{smokeColor}</p>
                            </div>
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 border-none bg-transparent shadow-none" align="start">
                          <ColorPicker selectedBgColor={smokeColor} onChange={onSmokeColorChange} />
                        </PopoverContent>
                      </Popover>
                      <div className="flex flex-wrap gap-1">
                        {['#ffffff', '#808080', '#e11d48', '#7c3aed', '#2563eb'].map((color) => (
                          <button key={color} onClick={() => onSmokeColorChange(color)} className={cn("w-5 h-5 rounded-full border transition-transform active:scale-90", smokeColor === color ? "border-white scale-110" : "border-white/10")} style={{ backgroundColor: color }} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-[10px] font-bold text-white/50 uppercase tracking-wider">Intensidade da Fumaça</Label>
                      <span className="text-[10px] font-black text-primary">{(smokeIntensity * 100).toFixed(0)}%</span>
                    </div>
                    <Slider value={[smokeIntensity]} onValueChange={(val) => onSmokeIntensityChange(val[0])} min={0.1} max={1} step={0.05} />
                  </div>
                </>
              )}

              {selectedEffect === 'pattern' && (
                <>
                  <div className="space-y-4">
                    <Label className="text-[10px] font-bold text-white/50 uppercase tracking-wider">Cor do Padrão</Label>
                    <div className="flex items-center gap-3">
                      <Popover>
                        <PopoverTrigger asChild>
                          <button className="flex items-center gap-3 bg-white/5 border border-white/10 p-2 rounded-xl hover:bg-white/10 transition-all group">
                            <div className="w-8 h-8 rounded-lg shadow-inner border border-white/10" style={{ backgroundColor: patternColor }} />
                            <div className="text-left pr-2">
                              <p className="text-[9px] font-black uppercase text-white/30">Cor Elementos</p>
                              <p className="text-[10px] font-mono font-bold">{patternColor}</p>
                            </div>
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 border-none bg-transparent shadow-none" align="start">
                          <ColorPicker selectedBgColor={patternColor} onChange={onPatternColorChange} />
                        </PopoverContent>
                      </Popover>
                      <div className="flex flex-wrap gap-1">
                        {['#ffffff', '#ff4da6', '#e11d48', '#2563eb', '#111111'].map((color) => (
                          <button key={color} onClick={() => onPatternColorChange(color)} className={cn("w-5 h-5 rounded-full border transition-transform active:scale-90", patternColor === color ? "border-white scale-110" : "border-white/10")} style={{ backgroundColor: color }} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-[10px] font-bold text-white/50 uppercase tracking-wider">Velocidade da Queda</Label>
                      <span className="text-[10px] font-black text-primary">{((300 - patternDuration) / 2.8).toFixed(0)}%</span>
                    </div>
                    <Slider value={[patternDuration]} onValueChange={(val) => onPatternDurationChange(val[0])} min={20} max={300} step={5} />
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-[10px] font-bold text-white/50 uppercase tracking-wider">Densidade</Label>
                      <span className="text-[10px] font-black text-primary">{patternDensity.toFixed(1)}x</span>
                    </div>
                    <Slider value={[patternDensity]} onValueChange={(val) => onPatternDensityChange(val[0])} min={0.5} max={4} step={0.1} />
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        <div className={cn(
          "relative overflow-hidden space-y-5 bg-white/5 p-6 rounded-[2rem] border transition-all duration-300",
          isEmojiRainEnabled ? "border-primary ring-1 ring-primary/40 shadow-[0_0_30px_rgba(225,29,72,0.1)]" : "border-white/10"
        )}>
          {/* Efeito de Chuva de Emojis no Fundo do Bloco */}
          {isEmojiRainEnabled && (
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-20">
              {[...Array(6)].map((_, i) => (
                <span 
                  key={i} 
                  className="absolute animate-fall" 
                  style={{ 
                    left: `${10 + (i * 18)}%`, 
                    top: '-30px',
                    animationDuration: `${3 + (i % 2)}s`,
                    animationDelay: `${i * 0.6}s`,
                    fontSize: `${emojiSize * 0.7}px`
                  }}
                >
                  {selectedEmojis[i % selectedEmojis.length]}
                </span>
              ))}
            </div>
          )}

          <div className="relative z-10 space-y-5">
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
      </div>
    </div>
  );

  function onStarColorChangeWrapper(hex: string) {
    onSparklesColorChange(hex);
  }
}
