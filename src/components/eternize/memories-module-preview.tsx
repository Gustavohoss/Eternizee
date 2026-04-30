'use client';

import React from 'react';
import Image from 'next/image';
import { Heart, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export function MemoriesModulePreview() {
  return (
    <div className="bg-[#050508] text-white min-h-full overflow-x-hidden relative">
      {/* Grão/Ruído no fundo */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' /%3E%3C/svg%3E")` }} />

      {/* Header da Seção */}
      <div className="flex flex-col items-center pt-16 pb-8 px-4 relative z-10">
        <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 bg-red-500/10 border border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
          <Heart className="w-5 h-5 text-red-500 opacity-70 fill-current" />
        </div>
        <h1 className="font-['Dancing_Script'] text-5xl mb-2 bg-gradient-to-br from-white to-red-400 bg-clip-text text-transparent">Memórias</h1>
        <div className="flex items-center gap-2 mb-4">
          <div className="h-px w-8 bg-red-500/30"></div>
          <span className="text-red-500/40 text-xs">❤</span>
          <div className="h-px w-8 bg-red-500/30"></div>
        </div>
        <p className="text-white/40 text-sm text-center max-w-[280px] font-medium">Reviva os momentos especiais da sua história.</p>
      </div>

      {/* Timeline Container */}
      <div className="relative max-w-[450px] mx-auto px-4 pb-20">
        
        {/* Linha pontilhada vertical central */}
        <div className="absolute top-0 bottom-0 left-50% left-1/2 -translate-x-1/2 w-px border-l border-dashed border-white/20 z-0" />

        {/* Item 01 */}
        <div className="flex w-full items-start mb-12 relative z-10">
          {/* Lado Esquerdo: Texto */}
          <div className="flex-1 pr-4 pt-4 text-right">
            <span className="text-5xl font-bold opacity-10 block leading-none mb-2 font-headline">01</span>
            <p className="font-['Space_Mono'] text-[10px] text-red-500 uppercase tracking-tighter mb-1">13 de fevereiro, 2022</p>
            <p className="text-white/40 text-[11px] leading-relaxed font-medium">Foi num café pequeno no centro. Eu estava nervosa, mas seu sorriso me deixou à vontade na hora.</p>
          </div>

          {/* Centro: Indicador */}
          <div className="w-10 flex flex-col items-center pt-8 shrink-0">
            <div className="w-7 h-7 rounded-full bg-red-600 flex items-center justify-center shadow-[0_0_15px_rgba(220,38,38,0.6)]">
              <Heart className="w-3.5 h-3.5 text-white fill-current" />
            </div>
          </div>

          {/* Lado Direito: Polaroid */}
          <div className="flex-1 pl-4">
            <div className="bg-white p-2 shadow-2xl transition-transform hover:scale-105 duration-300 transform -rotate-2">
              <div className="aspect-square relative overflow-hidden bg-neutral-900">
                <Image src="https://picsum.photos/seed/mem-1/400/400" fill className="object-cover" alt="" />
              </div>
              <p className="font-['Dancing_Script'] text-neutral-800 text-center mt-2 text-[10px] font-bold">Nosso primeiro encontro</p>
            </div>
          </div>
        </div>

        {/* Item 02 */}
        <div className="flex w-full items-start mb-12 relative z-10">
          {/* Lado Esquerdo: Polaroid */}
          <div className="flex-1 pr-4">
            <div className="bg-white p-2 shadow-2xl transition-transform hover:scale-105 duration-300 transform rotate-2">
              <div className="aspect-square relative overflow-hidden bg-neutral-900">
                <Image src="https://picsum.photos/seed/mem-2/400/400" fill className="object-cover" alt="" />
              </div>
              <p className="font-['Dancing_Script'] text-neutral-800 text-center mt-2 text-[10px] font-bold">Viagem para o litoral</p>
            </div>
          </div>

          {/* Centro: Indicador */}
          <div className="w-10 flex flex-col items-center pt-8 shrink-0">
            <div className="w-7 h-7 rounded-full bg-red-600 flex items-center justify-center shadow-[0_0_15px_rgba(220,38,38,0.6)]">
              <Heart className="w-3.5 h-3.5 text-white fill-current" />
            </div>
          </div>

          {/* Lado Direito: Texto */}
          <div className="flex-1 pl-4 pt-4 text-left">
            <span className="text-5xl font-bold opacity-10 block leading-none mb-2 font-headline">02</span>
            <p className="font-['Space_Mono'] text-[10px] text-red-500 uppercase tracking-tighter mb-1">09 de julho, 2022</p>
            <p className="text-white/40 text-[11px] leading-relaxed font-medium">Três dias com os pés na areia, sem pressa. A melhor viagem da minha vida até então.</p>
          </div>
        </div>

        {/* Footer da Timeline */}
        <div className="flex flex-col items-center mt-10 gap-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-red-500/10 border border-red-500/30">
            <Sparkles className="w-4 h-4 text-red-500" />
          </div>
          <p className="font-['Space_Mono'] text-[10px] text-white/50 uppercase tracking-widest">2 memórias</p>
        </div>

      </div>
    </div>
  );
}
