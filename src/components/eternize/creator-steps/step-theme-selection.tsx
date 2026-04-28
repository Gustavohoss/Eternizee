
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface StepThemeSelectionProps {
  onNext: () => void;
}

export function StepThemeSelection({ onNext }: StepThemeSelectionProps) {
  const giftPreview = PlaceHolderImages.find(img => img.id === 'gift-preview');

  return (
    <div className="relative z-10 container mx-auto px-4 pt-16 md:pt-20 pb-16 max-w-3xl min-h-[calc(100vh-80px)] flex flex-col justify-center">
      <Link href="/">
        <button className="group flex items-center gap-2 text-white/40 hover:text-white transition-colors text-[10px] md:text-[11px] font-bold mb-6 md:mb-8 w-fit mx-auto md:mx-0">
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Sair do Criador
        </button>
      </Link>
      <div className="space-y-2 mb-8 md:mb-10 text-center">
        <h2 className="text-2xl md:text-3xl font-black tracking-tight">Qual tema você quer usar?</h2>
        <p className="text-xs md:text-sm text-white/40 font-medium">Escolha o estilo da página e personalizamos tudo para você.</p>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="relative w-full max-w-[220px] md:max-w-[260px] group cursor-pointer" onClick={onNext}>
          <div className="absolute -inset-4 bg-primary/20 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" />
          <div className="relative bg-[#0c0c0c] border border-white/10 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl ring-1 ring-white/5 transition-transform hover:scale-[1.02]">
            <div className="aspect-[3.5/5] relative bg-black">
               <Image src={giftPreview?.imageUrl || ''} fill className="object-cover opacity-80" alt="Theme Preview" data-ai-hint="romantic gift" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                  <div className="text-lg md:text-xl font-black tracking-tighter italic">Default</div>
                  <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/20 text-[8px] md:text-[9px] uppercase font-black px-2 py-1 leading-none">Clássico</Badge>
                </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 md:mt-10 flex flex-col items-center gap-4">
        <Button onClick={onNext} className="w-full max-w-[220px] md:max-w-[260px] bg-primary hover:bg-primary/90 h-10 md:h-12 rounded-xl font-black text-xs md:text-sm shadow-2xl shadow-primary/20 active:scale-95 transition-all">Próximo</Button>
      </div>
    </div>
  );
}
