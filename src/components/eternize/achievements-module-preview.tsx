'use client';

import React from 'react';
import { Lock, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AchievementCardProps {
  level: number;
  stars: number;
  title: string;
  description: string;
  icon: string;
  currentValue: number;
  targetValue: number;
  color: string;
  isLocked?: boolean;
  unit?: string;
}

function AchievementCard({ 
  level, 
  stars, 
  title, 
  description, 
  icon, 
  currentValue, 
  targetValue, 
  color, 
  isLocked = false,
  unit = "dias"
}: AchievementCardProps) {
  const progress = Math.min(100, (currentValue / targetValue) * 100);
  const isConquered = currentValue >= targetValue && !isLocked;

  if (isLocked && !isConquered) {
    return (
      <div 
        className="rounded-[2rem] p-4 flex flex-col gap-4 relative overflow-hidden bg-[#0c0c0c] border border-white/5 group transition-all duration-500"
        style={{ boxShadow: `0 0 0px ${color}00` }}
      >
        <div className="flex justify-between items-start">
          <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-xl border border-white/10 text-white/20">
            {icon}
          </div>
          <div className="text-right">
            <p className="text-[8px] font-black uppercase tracking-widest text-white/20">Nível {level}</p>
            <div className="flex gap-0.5 mt-0.5 justify-end">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={cn("w-2 h-2", i < stars ? "fill-white/10 text-transparent" : "hidden")} />
              ))}
            </div>
          </div>
        </div>
        <div>
          <p className="text-sm font-black text-white/20 tracking-tight">{title}</p>
          <p className="text-[10px] text-white/10 leading-tight font-medium">{description}</p>
        </div>
        <div className="mt-auto space-y-2">
          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full transition-all duration-1000" style={{ backgroundColor: color, width: `${progress}%`, opacity: 0.3 }}></div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[9px] font-bold text-white/10">{currentValue}/{targetValue} {unit}</span>
            <div className="bg-white/5 p-1 rounded-full border border-white/5">
               <Lock className="w-2.5 h-2.5 text-white/10" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="rounded-[2rem] p-4 flex flex-col gap-4 relative overflow-hidden bg-[#0c0c0c] border transition-all duration-500 shadow-2xl"
      style={{ borderColor: `${color}40`, boxShadow: `0 0 20px ${color}10` }}
    >
      <div className="flex justify-between items-start">
        <div 
          className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl border shadow-inner"
          style={{ backgroundColor: `${color}20`, borderColor: `${color}30` }}
        >
          {icon}
        </div>
        <div className="text-right">
          <p className="text-[8px] font-black uppercase tracking-widest" style={{ color }}>Nível {level}</p>
          <div className="flex gap-0.5 mt-0.5 justify-end">
            {[...Array(stars)].map((_, i) => (
              <Star 
                key={i} 
                className="w-2 h-2 fill-current" 
                style={{ color }}
              />
            ))}
          </div>
        </div>
      </div>
      <div>
        <p className="text-sm font-black text-white tracking-tight">{title}</p>
        <p className="text-[10px] text-white/40 leading-tight font-medium">{description}</p>
      </div>
      <div className="mt-auto space-y-2">
        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
          <div className="h-full transition-all duration-1000" style={{ backgroundColor: color, width: `${progress}%` }}></div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[9px] font-bold text-white/30">{currentValue}/{targetValue} {unit}</span>
          <div 
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-widest shadow-lg"
            style={{ backgroundColor: `${color}20`, color: color, border: `1px solid ${color}40` }}
          >
            ✓ Conquistada
          </div>
        </div>
      </div>
    </div>
  );
}

export function AchievementsModulePreview() {
  return (
    <div className="bg-[#050508] text-white min-h-full overflow-x-hidden relative font-inter pb-20">
      {/* Glow de fundo superior */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-gradient-to-b from-[#f0c060]/10 to-transparent pointer-events-none" />

      <div className="w-full max-w-[450px] mx-auto px-5 pt-16 relative z-10">
        
        {/* Título Principal */}
        <div className="text-center mb-8">
            <h2 className="text-4xl font-bold tracking-tight mb-1 bg-gradient-to-br from-white to-[#f0c060] bg-clip-text text-transparent">Conquistas</h2>
            <p className="text-sm text-white/40 font-medium">Marcos desbloqueados ao longo da jornada</p>
        </div>

        {/* Barra de Progresso Geral */}
        <div className="rounded-[2rem] p-5 flex items-center gap-5 mb-12 bg-[#0c0c0c] border border-[#f0c060]/20 shadow-[0_0_40px_rgba(240,192,96,0.05)]">
            <div className="w-12 h-12 rounded-2xl bg-[#f0c060]/10 flex items-center justify-center text-3xl border border-[#f0c060]/20">🏆</div>
            <div className="flex-1">
                <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-black text-[#f0c060] tracking-tighter">11</span>
                    <span className="text-xs font-bold text-white/40 uppercase tracking-widest">de 19 Conquistadas</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full mt-2.5 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#f0c060] to-[#fb923c] shadow-[0_0_10px_rgba(240,192,96,0.3)]" style={{ width: '58%' }}></div>
                </div>
            </div>
        </div>

        {/* Seção: Memórias */}
        <div className="mb-10">
            <div className="flex items-center gap-3 mb-6 px-1">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 whitespace-nowrap">Memórias</span>
                <div className="flex-1 h-px bg-white/5"></div>
                <span className="text-[10px] font-black text-white/30">1/4</span>
            </div>

            <div className="grid grid-cols-2 gap-3.5">
                <AchievementCard 
                  level={1}
                  stars={1}
                  title="Primeira Memória"
                  description="Registrou o primeiro momento especial"
                  icon="📸"
                  currentValue={1}
                  targetValue={1}
                  color="#ef4444"
                  unit="memória"
                />
                <AchievementCard 
                  level={2}
                  stars={2}
                  title="Colecionador"
                  description="5 memórias registradas"
                  icon="🎞️"
                  currentValue={2}
                  targetValue={5}
                  color="#a855f7"
                  unit="memórias"
                  isLocked
                />
                <AchievementCard 
                  level={3}
                  stars={3}
                  title="Historiador"
                  description="10 memórias registradas"
                  icon="📚"
                  currentValue={2}
                  targetValue={10}
                  color="#3b82f6"
                  unit="memórias"
                  isLocked
                />
                <AchievementCard 
                  level={4}
                  stars={4}
                  title="Arquivo Vivo"
                  description="20 memórias registradas"
                  icon="🏛️"
                  currentValue={2}
                  targetValue={20}
                  color="#a5915f"
                  unit="memórias"
                  isLocked
                />
            </div>
        </div>

        {/* Seção: Linha do Tempo */}
        <div className="mb-6">
            <div className="flex items-center gap-3 mb-6 px-1">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 whitespace-nowrap">Linha do Tempo</span>
                <div className="flex-1 h-px bg-white/5"></div>
                <span className="text-[10px] font-black text-white/30">10/15</span>
            </div>

            <div className="grid grid-cols-2 gap-3.5">
                <AchievementCard 
                  level={1}
                  stars={1}
                  title="Um Mês Juntos"
                  description="Completaram 1 mês de história"
                  icon="🌱"
                  currentValue={1536}
                  targetValue={30}
                  color="#34d399"
                />
                <AchievementCard 
                  level={2}
                  stars={2}
                  title="Três Meses"
                  description="Três meses de momentos especiais"
                  icon="🌿"
                  currentValue={1536}
                  targetValue={90}
                  color="#10b981"
                />
                <AchievementCard 
                  level={3}
                  stars={3}
                  title="Seis Meses"
                  description="Meio ano de histórias compartilhadas"
                  icon="🌺"
                  currentValue={1536}
                  targetValue={180}
                  color="#ec4899"
                />
                <AchievementCard 
                  level={4}
                  stars={4}
                  title="Um Ano!"
                  description="Um ano inteiro de cumplicidade"
                  icon="🎂"
                  currentValue={1536}
                  targetValue={365}
                  color="#f59e0b"
                />
                <AchievementCard 
                  level={5}
                  stars={5}
                  title="Três Anos"
                  description="Uma linda história que só cresce"
                  icon="💎"
                  currentValue={1536}
                  targetValue={1095}
                  color="#3b82f6"
                />
                <AchievementCard 
                  level={5}
                  stars={5}
                  title="Cinco Anos"
                  description="Meio caminho para a lenda"
                  icon="👑"
                  currentValue={1536}
                  targetValue={1825}
                  color="#f0c060"
                  isLocked
                />
                <AchievementCard 
                  level={5}
                  stars={5}
                  title="Uma Década!"
                  description="Dez anos de uma história épica"
                  icon="🏆"
                  currentValue={1536}
                  targetValue={3650}
                  color="#f0c060"
                  isLocked
                />
            </div>
        </div>

      </div>
    </div>
  );
}
