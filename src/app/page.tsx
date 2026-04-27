'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Heart, ChevronRight, Star, Play, Plus, ThumbsUp, Globe, LogIn, ArrowLeft, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function EternizeApp() {
  const [step, setStep] = useState<'landing' | 'theme-selection'>('landing');
  const giftPreview = PlaceHolderImages.find(img => img.id === 'gift-preview');
  const avatars = PlaceHolderImages.filter(img => img.id.startsWith('avatar-'));

  const handleStart = () => {
    setStep('theme-selection');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setStep('landing');
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-white relative overflow-x-hidden">
      {/* Background Glows */}
      <div className="fixed inset-0 bg-hero-glow pointer-events-none z-0" />

      {/* Top Banner */}
      <div className="relative z-50 bg-[#3d0b17] border-b border-white/5 py-1.5 text-center text-[10px] sm:text-[11px] font-medium flex items-center justify-center gap-2">
        <Badge variant="outline" className="text-white border-white/20 bg-white/10 text-[8px] py-0 px-1 h-auto leading-tight">
          50% OFF
        </Badge>
        <p>
          Apenas hoje — Todos os planos com 50% OFF de desconto, aproveite!{' '}
          <span className="underline cursor-pointer hover:text-white/80 font-bold ml-1">Ver planos ›</span>
        </p>
      </div>

      {step === 'landing' ? (
        <>
          {/* Header */}
          <header className="relative z-20 container mx-auto px-4 py-4 sm:py-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-primary p-1.5 rounded-full shadow-lg shadow-primary/20">
                <Heart className="w-4 h-4 fill-white text-white" />
              </div>
              <span className="text-lg sm:text-xl font-black tracking-tighter">
                Eternize<span className="text-primary">.</span>
              </span>
            </div>

            <nav className="hidden lg:flex items-center gap-6 text-[13px] font-semibold text-white/60">
              <a href="#" className="hover:text-white transition-colors">Início</a>
              <a href="#" className="hover:text-white transition-colors">Como funciona?</a>
              <a href="#" className="hover:text-white transition-colors">Planos</a>
              <a href="#" className="hover:text-white transition-colors">F.A.Q</a>
            </nav>

            <div className="flex items-center gap-3 sm:gap-6">
              <div className="hidden sm:flex items-center gap-4 text-[11px] font-bold text-white/50">
                <button className="flex items-center gap-1.5 hover:text-white transition-colors uppercase tracking-tight">
                  <Globe className="w-3.5 h-3.5" /> BR PT
                </button>
                <button className="flex items-center gap-1.5 hover:text-white transition-colors uppercase tracking-tight">
                  <LogIn className="w-3.5 h-3.5" /> Fazer Login
                </button>
              </div>
              <Button 
                onClick={handleStart}
                className="bg-primary hover:bg-primary/90 rounded-full px-5 h-9 text-[12px] font-bold shadow-xl shadow-primary/20 transition-all active:scale-95"
              >
                Criar minha página
              </Button>
            </div>
          </header>

          {/* Main Content */}
          <main className="relative z-10 container mx-auto px-4 pt-8 md:pt-14 pb-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              {/* Hero Text */}
              <div className="space-y-6 max-w-xl">
                <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 text-[10px] font-bold text-white/70 backdrop-blur-sm">
                  <span className="text-primary text-sm">✨</span> Nós te ajudamos a criar em 5 minutos
                </div>

                <div className="space-y-3">
                  <h1 className="text-4xl sm:text-5xl md:text-[68px] font-black leading-[1] tracking-tight">
                    Declare seu amor<br />
                    <span className="text-primary italic inline-block transform -skew-x-6">para quem você ama!|</span>
                  </h1>
                  <p className="text-sm sm:text-base text-white/40 font-medium leading-relaxed max-w-md">
                    Crie um presente digital com fotos, música e textos personalizados para surpreender quem você ama. Pronto em 5 minutos.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Button 
                    onClick={handleStart}
                    size="lg" 
                    className="bg-primary hover:bg-primary/90 h-12 sm:h-14 rounded-xl px-6 text-sm sm:text-base font-black flex items-center justify-center gap-2.5 shadow-2xl shadow-primary/30 active:scale-95 transition-all"
                  >
                    <Heart className="w-4 h-4 fill-current" />
                    Quero criar agora! ❤️
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>

                {/* Social Proof */}
                <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                  <div className="flex -space-x-2.5">
                    {avatars.map((avatar, i) => (
                      <Avatar key={i} className="border-2 border-black w-8 h-8 ring-1 ring-white/10">
                        <AvatarImage src={avatar.imageUrl} />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1 text-primary">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-2.5 h-2.5 fill-current" />
                      ))}
                      <span className="text-white text-[10px] font-black ml-1 uppercase tracking-wider">Camila R.</span>
                    </div>
                    <p className="text-[11px] leading-tight text-white/30 font-medium">
                      A minha bestie amou! Ficou perfeito com as fotos a gente juntas 💜<br />
                      <span className="text-white/50 font-bold">Mais de 75.000 usuários satisfeitos</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone Mockup Carousel */}
              <div className="flex flex-col items-center justify-center relative perspective-[1000px]">
                <Carousel className="w-full max-w-[280px] sm:max-w-[300px]">
                  <CarouselContent>
                    <CarouselItem>
                      <div className="relative aspect-[9/18.5] rounded-[2.5rem] border-[6px] border-white/5 bg-black overflow-hidden shadow-[0_0_80px_rgba(225,29,72,0.12)] ring-1 ring-white/10">
                        <div className="absolute inset-0">
                          <Image 
                            src={giftPreview?.imageUrl || ''} 
                            fill 
                            className="object-cover opacity-60 scale-105" 
                            alt="Preview"
                            data-ai-hint="couple love"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/70" />
                        </div>

                        {/* Mockup UI */}
                        <div className="absolute inset-x-0 bottom-0 p-5 space-y-3.5">
                          <div className="flex items-center gap-1.5 text-[9px] font-black tracking-widest text-white/90">
                            <Heart className="w-2.5 h-2.5 text-primary fill-primary" />
                            ETERNIZE ORIGINAL
                          </div>
                          
                          <div className="space-y-0.5">
                            <h2 className="text-2xl font-black leading-none uppercase italic tracking-tighter">
                              Eu te amo<br />para sempre!
                            </h2>
                          </div>

                          <div className="flex items-center gap-2.5 text-[9px] font-black">
                            <span className="text-[#46d369]">99% compatível</span>
                            <span className="text-white/60">2024</span>
                            <span className="border border-white/40 px-1 rounded-[2px] text-[7px] flex items-center justify-center">L</span>
                            <span className="text-white/60 tracking-tighter">HD</span>
                          </div>

                          <p className="text-[9px] text-white/50 font-medium leading-relaxed line-clamp-3">
                            Hoje não é nenhuma data especial, mas eu só queria dizer o quanto te amo. Você é tudo pra mim, minha felicidade...
                          </p>
                          
                          <div className="flex gap-2 pt-0.5">
                            <Button variant="secondary" size="sm" className="flex-1 h-8 bg-white text-black font-black text-[10px] gap-1.5 hover:bg-white/90 transition-colors rounded-sm">
                              <Play className="w-3 h-3 fill-current" /> Reproduzir
                            </Button>
                          </div>

                          <div className="flex items-center justify-around text-white/80 pt-1">
                            <div className="flex flex-col items-center gap-1 group cursor-pointer">
                              <Plus className="w-4 h-4 transition-transform group-hover:scale-110" />
                              <span className="text-[7px] font-bold">Minha lista</span>
                            </div>
                            <div className="flex flex-col items-center gap-1 group cursor-pointer">
                              <ThumbsUp className="w-4 h-4 transition-transform group-hover:scale-110" />
                              <span className="text-[7px] font-bold">Classificar</span>
                            </div>
                            <div className="flex flex-col items-center gap-1 group cursor-pointer">
                              <Heart className="w-4 h-4 transition-transform group-hover:scale-110" />
                              <span className="text-[7px] font-bold">Favoritar</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 pt-3 border-t border-white/10">
                            <div className="bg-[#e50914] text-[7px] font-black px-1 py-0.5 rounded-[1px] tracking-tight">NETFLIX</div>
                            <div className="flex-1 h-0.5 bg-white/20 rounded-full overflow-hidden">
                              <div className="w-3/4 h-full bg-[#e50914] shadow-[0_0_8px_#e50914]" />
                            </div>
                          </div>
                        </div>

                        {/* Floating Play Button */}
                        <div className="absolute right-4 bottom-40">
                          <div className="w-10 h-10 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20 shadow-2xl active:scale-90 transition-transform cursor-pointer">
                            <Play className="w-4 h-4 fill-white text-white ml-0.5" />
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  </CarouselContent>
                  <CarouselPrevious className="hidden sm:flex -left-10 bg-white/5 border-white/10 hover:bg-white/10 text-white w-8 h-8" />
                  <CarouselNext className="hidden sm:flex -right-10 bg-white/5 border-white/10 hover:bg-white/10 text-white w-8 h-8" />
                </Carousel>
                
                <div className="flex gap-2 mt-8">
                  <div className="w-1 h-1 rounded-full bg-primary" />
                  <div className="w-1 h-1 rounded-full bg-white/20" />
                  <div className="w-1 h-1 rounded-full bg-white/20" />
                </div>

                <div className="mt-6 text-[8px] font-black text-white/20 tracking-[0.4em] uppercase">
                  NETFLIX — ETERNIZE
                </div>
              </div>
            </div>
          </main>
        </>
      ) : (
        /* Theme Selection Step */
        <div className="relative z-10 container mx-auto px-4 pt-12 pb-20 max-w-4xl min-h-[calc(100vh-100px)] flex flex-col">
          <button 
            onClick={handleBack}
            className="group flex items-center gap-2 text-white/50 hover:text-white transition-colors text-xs font-bold mb-10"
          >
            <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" />
            Voltar
          </button>

          <div className="space-y-2 mb-12">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Qual tema você quer usar?
            </h2>
            <p className="text-white/40 font-medium">
              Escolha o estilo da página e personalizamos tudo para você.
            </p>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-sm group">
              <div className="absolute -inset-4 bg-primary/20 blur-3xl opacity-30 pointer-events-none group-hover:opacity-50 transition-opacity" />
              
              <div className="relative bg-[#0c0c0c] border border-white/10 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/5">
                <div className="aspect-[4/5] relative bg-black">
                   <Image 
                      src={giftPreview?.imageUrl || ''} 
                      fill 
                      className="object-cover opacity-80" 
                      alt="Theme Preview"
                      data-ai-hint="romantic gift"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-transparent to-transparent" />
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-black tracking-tight">Default</h3>
                    <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/20 text-[10px] uppercase font-black px-2 py-0.5">
                      Clássico
                    </Badge>
                  </div>
                  
                  <p className="text-xs text-white/50 font-medium leading-relaxed">
                    Design romântico com contador de dias, fotos e animações personalizadas.
                  </p>

                  <Button variant="outline" className="w-full h-10 border-white/10 bg-white/5 hover:bg-white/10 text-[11px] font-bold flex items-center justify-center gap-2 rounded-xl transition-all">
                    <ExternalLink className="w-3.5 h-3.5" />
                    Ver demo
                  </Button>
                </div>
              </div>

              {/* Pagination Dots (Mockup) */}
              <div className="flex justify-center gap-2 mt-8">
                <div className="w-6 h-1.5 rounded-full bg-primary" />
                <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center gap-6">
            <div className="text-[11px] font-bold text-white/40">
              Tema selecionado: <span className="text-white font-black">Default</span>
            </div>

            <Button 
              className="w-full max-w-sm bg-primary hover:bg-primary/90 h-14 rounded-2xl font-black text-sm shadow-[0_0_40px_rgba(225,29,72,0.3)] active:scale-95 transition-all"
            >
              Próximo
            </Button>
          </div>
        </div>
      )}

      {/* Floating Action Button (WhatsApp) */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="w-12 h-12 rounded-full bg-[#25d366] hover:bg-[#20bd5c] shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 group relative">
          <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-black animate-pulse" />
          <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.765-5.764-5.765zm3.374 8.163c-.144.405-.833.78-1.145.828-.312.048-.609.063-1.032-.083-.246-.085-.573-.197-1.139-.441-2.42-1.041-3.993-3.513-4.111-3.672-.119-.159-1.019-1.354-1.019-2.58 0-1.226.646-1.83.877-2.078.231-.248.503-.31.67-.31h.536c.172 0 .4-.012.58.423l.53 1.282c.058.147.1.319.002.525-.098.205-.144.332-.294.507l-.234.27c-.147.168-.3.351-.129.642.171.291.761 1.258 1.632 2.034.871.776 1.603 1.017 1.894 1.163.291.146.463.123.635-.075.172-.198.733-.854.928-1.147.195-.294.39-.245.658-.146l1.295.632c.268.132.447.225.513.344.067.119.067.688-.177 1.092z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
