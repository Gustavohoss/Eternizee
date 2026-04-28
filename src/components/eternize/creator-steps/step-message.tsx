
'use client';

import React from 'react';
import { MessageSquare, Palette, Bold, Italic, Strikethrough, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ColorPicker } from '@/components/eternize/color-picker';
import { FONT_OPTIONS } from '@/app/criador/constants';
import { cn } from '@/lib/utils';

interface StepMessageProps {
  message: string;
  onMessageChange: (msg: string) => void;
  messageFont: string;
  onMessageFontChange: (font: string) => void;
  messageColor: string;
  onMessageColorChange: (color: string) => void;
  onBack: () => void;
  onNext: () => void;
}

export function StepMessage({
  message,
  onMessageChange,
  messageFont,
  onMessageFontChange,
  messageColor,
  onMessageColorChange,
  onBack,
  onNext
}: StepMessageProps) {
  return (
    <div className="space-y-8 md:space-y-10 flex flex-col items-center md:items-start">
      <div className="space-y-3 text-center md:text-left">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="bg-white/5 p-2 rounded-2xl border border-white/10"><MessageSquare className="w-5 h-5 md:w-6 md:h-6 text-white/80" /></div>
          <h2 className="text-2xl md:text-4xl font-black tracking-tight">Mensagem</h2>
        </div>
        <p className="text-xs md:text-base text-white/40 font-medium max-w-md">Escreva uma mensagem especial. Seja criativo e demonstre todo seu carinho.</p>
      </div>

      <div className="space-y-8 w-full max-w-md">
         <div className="space-y-4">
           <Label className="text-[11px] font-black uppercase tracking-wider text-white/60 text-center md:text-left block">O que você quer dizer pro seu mozão? 📩</Label>
           <div className="relative group">
             <Textarea 
               value={message}
               onChange={(e) => onMessageChange(e.target.value)}
               placeholder="Escreva aqui sua dedicatória..."
               className="bg-white/5 border-white/10 min-h-[160px] rounded-xl text-sm md:text-base font-medium focus:border-primary/50 transition-all shadow-inner p-5"
             />
             <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 pt-3 border-t border-white/5">
               <button className="p-1.5 rounded-md hover:bg-white/5 text-white/40 hover:text-white transition-all"><Bold className="w-4 h-4" /></button>
               <button className="p-1.5 rounded-md hover:bg-white/5 text-white/40 hover:text-white transition-all"><Italic className="w-4 h-4" /></button>
               <button className="p-1.5 rounded-md hover:bg-white/5 text-white/40 hover:text-white transition-all"><Strikethrough className="w-4 h-4" /></button>
             </div>
           </div>
         </div>

         <div className="space-y-6 bg-white/5 p-6 rounded-2xl border border-white/10">
          <div className="flex items-center gap-2 mb-2"><Palette className="w-4 h-4 text-primary" /><h3 className="text-[11px] font-black uppercase tracking-widest text-white/60">Personalizar Mensagem</h3></div>
          <div className="space-y-4"><Label className="text-[11px] font-bold text-white/50 uppercase">Fonte da Mensagem</Label><div className="grid grid-cols-2 gap-2">{FONT_OPTIONS.map((f) => (<button key={f.id} onClick={() => onMessageFontChange(f.id)} className={cn("px-4 py-3 rounded-xl border text-xs transition-all", messageFont === f.id ? "border-primary bg-primary/10 text-primary font-bold" : "border-white/10 bg-black/20 text-white/40 hover:border-white/20", f.class)}>{f.name}</button>))}</div></div>
          <div className="space-y-4 pt-4 border-t border-white/5"><Label className="text-[11px] font-bold text-white/50 uppercase">Cor da Mensagem</Label><div className="flex items-center gap-4">
              <Popover><PopoverTrigger asChild><button className="flex items-center gap-3 bg-white/5 border border-white/10 p-2 rounded-xl hover:bg-white/10 transition-all group"><div className="w-10 h-10 rounded-lg shadow-inner border border-white/10" style={{ backgroundColor: messageColor }} /><div className="text-left pr-4"><p className="text-[10px] font-black uppercase text-white/30 group-hover:text-primary transition-colors">Personalizar</p><p className="text-xs font-mono font-bold">{messageColor}</p></div></button></PopoverTrigger><PopoverContent className="w-auto p-0 border-none bg-transparent shadow-none" align="start"><ColorPicker selectedBgColor={messageColor} onChange={onMessageColorChange} /></PopoverContent></Popover>
              <div className="flex flex-wrap gap-1.5">{['#ffffff', '#ff4da6', '#e11d48', '#7c3aed', '#111111'].map((color) => (<button key={color} onClick={() => onMessageColorChange(color)} className={cn("w-6 h-6 rounded-full border transition-transform active:scale-90", messageColor === color ? "border-white scale-110" : "border-white/10")} style={{ backgroundColor: color }} />))}</div>
          </div></div>
        </div>
      </div>

      <div className="hidden lg:flex flex-col sm:flex-row items-center gap-5 pt-10 border-t border-white/5 w-full max-md">
        <Button onClick={onBack} variant="outline" className="w-full sm:w-auto px-8 h-12 rounded-xl border-white/10 bg-white/5 font-black text-sm hover:bg-white/10 transition-all flex items-center gap-2"><ChevronLeft className="w-4 h-4" /> Voltar</Button>
        <Button onClick={onNext} className="w-full sm:flex-1 h-12 rounded-xl bg-primary text-white font-black text-sm hover:bg-primary/90 transition-all flex items-center justify-center gap-2">Próxima etapa <ChevronRight className="w-4 h-4" /></Button>
      </div>
    </div>
  );
}
