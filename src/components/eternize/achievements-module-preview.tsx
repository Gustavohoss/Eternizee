'use client';

import React from 'react';
import { Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AchievementsModulePreview() {
  return (
    <div className="bg-[#050508] text-white min-h-full overflow-x-hidden relative font-inter">
      {/* Glow de fundo superior */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-gradient-to-b from-[#f0c060]/10 to-transparent pointer-events-none" />

      <div className="w-full max-w-[450px] mx-auto px-5 pt-16 pb-12 relative z-10">
        
        {/* Título */}
        <div className="text-center mb-8">
            <h2 className="text-4xl font-bold tracking-tight mb-1 bg-gradient-to-br from-white to-[#f0c060] bg-clip-text text-transparent">Conquistas</h2>
            <p className="text-sm text-white/40">Marcos desbloqueados ao longo da jornada</p>
        </div>

        {/* Barra de Progresso Geral */}
        <div className="rounded-2xl p-4 flex items-center gap-4 mb-10 bg-gradient-to-br from-white/5 to-black/80 border border-[#f0c060]/30 shadow-[0_0_20px_rgba(240,192,96,0.1)]">
            <span className="text-3xl">🏆</span>
            <div className="flex-1">
                <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-[#f0c060]">10</span>
                    <span className="text-sm text-white/45">de 15 Conquistadas</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#f0c060] to-[#fb923c]" style={{ width: '67%' }}></div>
                </div>
            </div>
        </div>

        {/* Seção: Linha do Tempo */}
        <div className="mb-6">
            <div className="flex items-center gap-2 mb-4 px-1">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-white/30">Linha do Tempo</span>
                <div className="flex-1 h-px bg-white/10"></div>
                <span className="text-[11px] text-white/30">5/7</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
                
                {/* Card: Um Mês (Verde) */}
                <div className="rounded-2xl p-3.5 flex flex-col gap-3 relative overflow-hidden bg-gradient-to-br from-white/5 to-black/80 border border-[#34d399]/40 shadow-[0_0_20px_rgba(52,211,153,0.1)] text-[#34d399]">
                    <div className="flex justify-between items-start">
                        <div className="w-9 h-9 rounded-xl bg-[#34d399]/20 flex items-center justify-center text-lg border border-[#34d399]/30">🌱</div>
                        <div className="text-right">
                            <p className="text-[9px] font-bold uppercase">Nível 1</p>
                            <p className="text-[9px]">★★★★★</p>
                        </div>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-white">Um Mês Juntos</p>
                        <p className="text-[10px] text-white/40 leading-snug">Completaram 1 mês de história</p>
                    </div>
                    <div className="mt-auto">
                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-1">
                            <div className="h-full bg-[#34d399]" style={{ width: '100%' }}></div>
                        </div>
                        <div className="flex justify-between text-[8px] font-bold">
                            <span className="text-white/30">30/30 dias</span>
                            <span>✓ CONQUISTADA</span>
                        </div>
                    </div>
                </div>

                {/* Card: Um Ano (Amarelo) */}
                <div className="rounded-2xl p-3.5 flex flex-col gap-3 relative overflow-hidden bg-gradient-to-br from-white/5 to-black/80 border border-[#f0c060]/40 shadow-[0_0_20px_rgba(240,192,96,0.1)] text-[#f0c060]">
                    <div className="flex justify-between items-start">
                        <div className="w-9 h-9 rounded-xl bg-[#f0c060]/20 flex items-center justify-center text-lg border border-[#f0c060]/30">🎂</div>
                        <div className="text-right">
                            <p className="text-[9px] font-bold uppercase">Nível 4</p>
                            <p className="text-[9px]">★★★★☆</p>
                        </div>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-white">Um Ano!</p>
                        <p className="text-[10px] text-white/40 leading-snug">Um ano inteiro de cumplicidade</p>
                    </div>
                    <div className="mt-auto">
                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-1">
                            <div className="h-full bg-[#f0c060]" style={{ width: '100%' }}></div>
                        </div>
                        <div className="flex justify-between text-[8px] font-bold">
                            <span className="text-white/30">365/365 dias</span>
                            <span>✓ CONQUISTADA</span>
                        </div>
                    </div>
                </div>

                {/* Card: Três Anos (Azul) */}
                <div className="rounded-2xl p-3.5 flex flex-col gap-3 relative overflow-hidden bg-gradient-to-br from-white/5 to-black/80 border border-[#60befa]/40 shadow-[0_0_20px_rgba(96,191,250,0.1)] text-[#60befa]">
                    <div className="flex justify-between items-start">
                        <div className="w-9 h-9 rounded-xl bg-[#60befa]/20 flex items-center justify-center text-lg border border-[#60befa]/30">💎</div>
                        <div className="text-right">
                            <p className="text-[9px] font-bold uppercase">Nível 5</p>
                            <p className="text-[9px]">★★★★★</p>
                        </div>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-white">Três Anos</p>
                        <p className="text-[10px] text-white/40 leading-snug">Uma linda história que só cresce</p>
                    </div>
                    <div className="mt-auto">
                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-1">
                            <div className="h-full bg-[#60befa]" style={{ width: '100%' }}></div>
                        </div>
                        <div className="flex justify-between text-[8px] font-bold">
                            <span className="text-white/30">1095/1095 dias</span>
                            <span>✓ CONQUISTADA</span>
                        </div>
                    </div>
                </div>

                {/* Card Bloqueado */}
                <div className="rounded-2xl p-3.5 flex flex-col gap-3 relative overflow-hidden bg-gradient-to-br from-white/5 to-black/80 border border-white/10 opacity-40 grayscale filter">
                    <div className="flex justify-between items-start">
                        <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-lg border border-white/10 text-white/20">🏆</div>
                        <div className="absolute bottom-2 right-2 opacity-20"><Lock className="w-3 h-3" /></div>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-white/20">Uma Década!</p>
                        <p className="text-[10px] text-white/10 leading-snug">Dez anos de uma história épica</p>
                    </div>
                    <div className="mt-auto">
                        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mb-1">
                            <div className="h-full bg-white/10" style={{ width: '42%' }}></div>
                        </div>
                        <p className="text-[8px] text-white/10">1536/3650 dias</p>
                    </div>
                </div>

            </div>
        </div>

      </div>
    </div>
  );
}
