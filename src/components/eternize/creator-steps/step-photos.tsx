'use client';

import React from 'react';
import Image from 'next/image';
import { 
  ImageIcon, 
  Trash2, 
  Upload, 
  Layout, 
  AlignVerticalJustifyStart, 
  AlignVerticalJustifyEnd, 
  Layers, 
  Sparkles, 
  Copy,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ColorPicker } from '@/components/eternize/color-picker';
import { cn } from '@/lib/utils';
import { ThemeId } from '@/app/criador/constants';

interface StepPhotosProps {
  selectedTheme?: ThemeId;
  uploadedPhotos: string[];
  onPhotoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemovePhoto: (index: number) => void;
  showCard: boolean;
  onShowCardChange: (show: boolean) => void;
  cardColor: string;
  onCardColorChange: (color: string) => void;
  titlePosition: 'top' | 'bottom';
  onTitlePositionChange: (pos: 'top' | 'bottom') => void;
  photoEffect: 'slide' | 'coverflow' | 'cards';
  onPhotoEffectChange: (effect: 'slide' | 'coverflow' | 'cards') => void;
  onBack: () => void;
  onNext: () => void;
}

export function StepPhotos({
  selectedTheme,
  uploadedPhotos,
  onPhotoUpload,
  onRemovePhoto,
  showCard,
  onShowCardChange,
  cardColor,
  onCardColorChange,
  titlePosition,
  onTitlePositionChange,
  photoEffect,
  onPhotoEffectChange,
  onBack,
  onNext
}: StepPhotosProps) {
  const isNetflix = selectedTheme === 'netflix';

  return (
    <div className="space-y-8 md:space-y-10 flex flex-col items-center md:items-start">
      <div className="space-y-3 text-center md:text-left">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="bg-white/5 p-2 rounded-2xl border border-white/10"><ImageIcon className="w-5 h-5 md:w-6 md:h-6 text-white/80" /></div>
          <h2 className="text-2xl md:text-4xl font-black tracking-tight">As Fotos</h2>
        </div>
        <p className="text-xs md:text-base text-white/40 font-medium max-w-md">Adicione até 8 fotos especiais para a sua história.</p>
      </div>
      
      <div className="w-full max-w-md space-y-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {uploadedPhotos.map((photo, i) => (
            <div key={i} className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 group bg-white/5">
              <Image src={photo} fill className="object-cover" alt={`Photo ${i + 1}`} />
              <button onClick={() => onRemovePhoto(i)} className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"><Trash2 className="w-4 h-4" /></button>
            </div>
          ))}
          {uploadedPhotos.length < 8 && (
            <label className="aspect-square rounded-2xl border-2 border-dashed border-white/10 bg-white/5 hover:bg-white/10 transition-all flex flex-col items-center justify-center gap-3 cursor-pointer group"><div className="bg-white/5 p-3 rounded-full group-hover:scale-110 transition-transform"><Upload className="w-6 h-6 text-white/40" /></div><span className="text-[10px] font-black uppercase tracking-wider text-white/30 text-center px-1">Adicionar Foto</span><input type="file" className="hidden" accept="image/*" multiple onChange={onPhotoUpload} /></label>
          )}
        </div>

        {/* Customization only for non-netflix themes */}
        {!isNetflix && (
          <>
            <div className="space-y-6 bg-white/5 p-6 rounded-2xl border border-white/10">
              <div className="flex items-center gap-2 mb-2"><Layout className="w-4 h-4 text-primary" /><h3 className="text-[11px] font-black uppercase tracking-widest text-white/60">Estilo da Polaroid</h3></div>
              <div className="flex items-center justify-between py-2"><div className="flex items-center gap-2"><div className="w-4 h-4 bg-white border border-white/20 rounded-sm" /><Label className="text-[11px] font-bold text-white/50 uppercase cursor-pointer" htmlFor="show-card">Mostrar Moldura</Label></div><Switch id="show-card" checked={showCard} onCheckedChange={onShowCardChange} /></div>
              {showCard && (
                <div className="space-y-4 pt-4 border-t border-white/5 animate-in fade-in duration-300">
                  <Label className="text-[11px] font-bold text-white/50 uppercase">Cor da Moldura</Label>
                  <div className="flex items-center gap-4">
                    <Popover><PopoverTrigger asChild><button className="flex items-center gap-3 bg-white/5 border border-white/10 p-2 rounded-xl hover:bg-white/10 transition-all"><div className="w-8 h-8 rounded-lg border border-white/10" style={{ backgroundColor: cardColor }} /><div className="text-left pr-2"><p className="text-[9px] font-black uppercase text-white/30">Cor do Card</p><p className="text-[10px] font-mono font-bold">{cardColor}</p></div></button></PopoverTrigger><PopoverContent className="w-auto p-0 border-none bg-transparent" align="start"><ColorPicker selectedBgColor={cardColor} onChange={onCardColorChange} /></PopoverContent></Popover>
                    <div className="flex flex-wrap gap-1.5">{['#ffffff', '#fdfdfd', '#f4f4f5', '#111111', '#000000'].map((color) => (<button key={color} onClick={() => onCardColorChange(color)} className={cn("w-6 h-6 rounded-full border transition-all", cardColor === color ? "border-primary scale-110" : "border-white/10")} style={{ backgroundColor: color }} />))}</div>
                  </div>
                </div>
              )}
              <div className="space-y-4 pt-4 border-t border-white/5">
                <Label className="text-[11px] font-bold text-white/50 uppercase">Posição do Nome</Label>
                <RadioGroup value={titlePosition} onValueChange={(v: any) => onTitlePositionChange(v)} className="grid grid-cols-2 gap-2">
                  <Label className={cn("flex items-center justify-center gap-2 p-3 rounded-xl border cursor-pointer transition-all", titlePosition === 'top' ? "border-primary bg-primary/10 text-primary" : "border-white/10 bg-black/20 text-white/40")}><RadioGroupItem value="top" className="sr-only" /><AlignVerticalJustifyStart className="w-4 h-4" /><span className="text-[10px] font-black uppercase">Topo</span></Label>
                  <Label className={cn("flex items-center justify-center gap-2 p-3 rounded-xl border cursor-pointer transition-all", titlePosition === 'bottom' ? "border-primary bg-primary/10 text-primary" : "border-white/10 bg-black/20 text-white/40")}><RadioGroupItem value="bottom" className="sr-only" /><AlignVerticalJustifyEnd className="w-4 h-4" /><span className="text-[10px] font-black uppercase">Base</span></Label>
                </RadioGroup>
              </div>
            </div>
            
            <div className="space-y-5">
              <div className="flex items-center justify-center md:justify-start gap-2"><Layers className="w-5 h-5 text-primary" /><h3 className="text-[10px] md:text-sm font-black uppercase tracking-widest text-white/60">Efeito de Passagem</h3></div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div onClick={() => onPhotoEffectChange('slide')} className={cn("cursor-pointer border rounded-2xl p-4 transition-all duration-300 flex flex-col items-center gap-2 text-center", photoEffect === 'slide' ? "border-primary bg-primary/5 ring-1 ring-primary/20" : "border-white/10 bg-white/5 hover:border-white/20")}><Layout className={cn("w-6 h-6", photoEffect === 'slide' ? "text-primary" : "text-white/40")} /><div><p className="text-[10px] font-black uppercase tracking-wider">Slide Suave</p></div></div>
                <div onClick={() => onPhotoEffectChange('coverflow')} className={cn("cursor-pointer border rounded-2xl p-4 transition-all duration-300 flex flex-col items-center gap-2 text-center", photoEffect === 'coverflow' ? "border-primary bg-primary/5 ring-1 ring-primary/20" : "border-white/10 bg-white/5 hover:border-white/20")}><Sparkles className={cn("w-6 h-6", photoEffect === 'coverflow' ? "text-primary" : "text-white/40")} /><div><p className="text-[10px] font-black uppercase tracking-wider">Coverflow 3D</p></div></div>
                <div onClick={() => onPhotoEffectChange('cards')} className={cn("cursor-pointer border rounded-2xl p-4 transition-all duration-300 flex flex-col items-center gap-2 text-center", photoEffect === 'cards' ? "border-primary bg-primary/5 ring-1 ring-primary/20" : "border-white/10 bg-white/5 hover:border-white/20")}><Copy className={cn("w-6 h-6", photoEffect === 'cards' ? "text-primary" : "text-white/40")} /><div><p className="text-[10px] font-black uppercase tracking-wider">Cards Pilha</p></div></div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="hidden lg:flex flex-col sm:flex-row items-center gap-5 pt-10 border-t border-white/5 w-full max-w-md">
        <Button onClick={onBack} variant="outline" className="w-full sm:w-auto px-8 h-12 rounded-xl border-white/10 bg-white/5 font-black text-sm hover:bg-white/10 transition-all flex items-center gap-2"><ChevronLeft className="w-4 h-4" /> Voltar</Button>
        <Button onClick={onNext} className="w-full sm:flex-1 h-12 rounded-xl bg-primary text-white font-black text-sm hover:bg-primary/90 transition-all flex items-center justify-center gap-2">Próxima etapa <ChevronRight className="w-4 h-4" /></Button>
      </div>
    </div>
  );
}
