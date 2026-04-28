
'use client';

import React from 'react';
import { Heart, Users, Gift, Star, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface StepGiftTypeProps {
  selectedGiftType: string;
  onSelect: (type: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepGiftType({ selectedGiftType, onSelect, onNext, onBack }: StepGiftTypeProps) {
  return (
    <div className="relative z-10 container mx-auto px-4 pt-16 md:pt-20 pb-16 max-w-4xl min-h-[calc(100vh-80px)] flex flex-col items-center">
      <div className="w-full max-w-2xl text-center md:text-left">
         <button onClick={onBack} className="group flex items-center gap-2 text-white/40 hover:text-white transition-colors text-[10px] md:text-[11px] font-bold mb-6 md:mb-8 w-fit mx-auto md:mx-0">
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Voltar
        </button>
        <div className="space-y-2 mb-8 md:mb-10 text-center">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight">Que tipo de presente vamos criar?</h2>
          <p className="text-xs md:text-sm text-white/40 font-medium">Escolha para quem é o presente e personalizamos tudo para você.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 w-full max-w-2xl">
        <div onClick={() => onSelect('amor')} className={cn("relative group cursor-pointer border rounded-2xl p-5 md:p-6 transition-all duration-300 md:col-span-2", selectedGiftType === 'amor' ? "border-primary bg-primary/5 ring-1 ring-primary/20" : "border-white/10 bg-white/5 hover:border-white/20")}>
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-[7px] md:text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest text-white flex items-center gap-1 shadow-lg"><Star className="w-2 h-2 fill-current" /> MAIS POPULAR</div>
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-primary font-black text-xs md:text-sm italic"><Heart className="w-3.5 h-3.5 md:w-4 md:h-4 fill-current" /> Presente de Amor</div>
              <p className="text-[10px] md:text-[11px] text-white/50 font-medium">Para namorado(a) ou cônjuge</p>
            </div>
          </div>
        </div>
        <div onClick={() => onSelect('bestie')} className={cn("group cursor-pointer border rounded-2xl p-5 md:p-6 transition-all duration-300", selectedGiftType === 'bestie' ? "border-primary bg-primary/5 ring-1 ring-primary/20" : "border-white/10 bg-white/5 hover:border-white/20")}>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-white font-black text-xs md:text-sm italic"><Users className="w-3.5 h-3.5 md:w-4 md:h-4" /> Presente para Bestie</div>
            <p className="text-[10px] md:text-[11px] text-white/50 font-medium">Surpreenda sua bestie</p>
          </div>
        </div>
        <div onClick={() => onSelect('maes')} className={cn("relative group cursor-pointer border rounded-2xl p-5 md:p-6 transition-all duration-300", selectedGiftType === 'maes' ? "border-primary bg-primary/5 ring-1 ring-primary/20" : "border-white/10 bg-white/5 hover:border-white/20")}>
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#ff4da6] text-[7px] md:text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest text-white flex items-center gap-1 shadow-lg"><Star className="w-2 h-2 fill-current" /> DATA ESPECIAL</div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-white font-black text-xs md:text-sm italic"><Gift className="w-3.5 h-3.5 md:w-4 md:h-4" /> Dia das Mães</div>
            <p className="text-[10px] md:text-[11px] text-white/50 font-medium">Surpreenda a mãe mais especial da sua vida 🌸</p>
          </div>
        </div>
      </div>
      <div className="mt-10 md:mt-12 w-full max-w-2xl flex justify-center">
        <Button onClick={onNext} className="w-full max-w-[220px] md:max-w-[260px] bg-primary hover:bg-primary/90 h-11 md:h-12 rounded-xl font-black text-xs md:text-sm shadow-2xl shadow-primary/20 active:scale-95 transition-all">Próximo</Button>
      </div>
    </div>
  );
}
