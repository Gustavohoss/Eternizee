'use client';

import React from 'react';
import Image from 'next/image';
import { Heart, ChevronRight, Star, Play, Plus, ThumbsUp, Globe, LogIn } from 'lucide-react';
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

export default function LandingPage() {
  const giftPreview = PlaceHolderImages.find(img => img.id === 'gift-preview');
  const avatars = PlaceHolderImages.filter(img => img.id.startsWith('avatar-'));

  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-white relative">
      {/* Background Glows */}
      <div className="fixed inset-0 bg-hero-glow pointer-events-none z-0" />

      {/* Top Banner */}
      <div className="relative z-20 bg-[#3d0b17] border-b border-white/5 py-2 text-center text-[11px] sm:text-xs font-medium flex items-center justify-center gap-2">
        <Badge variant="outline" className="text-white border-white/20 bg-white/10 text-[9px] py-0 px-1.5 h-auto leading-tight">
          50% OFF
        </Badge>
        <p>
          Apenas hoje — Todos os planos com 50% OFF de desconto, aproveite!{' '}
          <span className="underline cursor-pointer hover:text-white/80 font-bold ml-1">Ver planos ›</span>
        </p>
      </div>

      {/* Header */}
      <header className="relative z-20 container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-primary p-1.5 rounded-full shadow-lg shadow-primary/20">
            <Heart className="w-5 h-5 fill-white text-white" />
          </div>
          <span className="text-xl sm:text-2xl font-black tracking-tighter">
            Eternize<span className="text-primary">.</span>
          </span>
        </div>

        <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-white/60">
          <a href="#" className="hover:text-white transition-colors">Início</a>
          <a href="#" className="hover:text-white transition-colors">Como funciona?</a>
          <a href="#" className="hover:text-white transition-colors">Planos</a>
          <a href="#" className="hover:text-white transition-colors">F.A.Q</a>
        </nav>

        <div className="flex items-center gap-3 sm:gap-6">
          <div className="hidden sm:flex items-center gap-4 text-xs font-bold text-white/50">
            <button className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Globe className="w-4 h-4" /> BR PT
            </button>
            <button className="flex items-center gap-1.5 hover:text-white transition-colors">
              <LogIn className="w-4 h-4" /> Fazer Login
            </button>
          </div>
          <Button className="bg-primary hover:bg-primary/90 rounded-full px-5 sm:px-7 h-10 text-xs sm:text-sm font-bold shadow-xl shadow-primary/20 transition-all active:scale-95">
            Criar minha página
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 pt-12 md:pt-20 pb-24">
        <div className="grid lg:grid-cols-[1.1fr,0.9fr] gap-16 items-center">
          {/* Hero Text */}
          <div className="space-y-8 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-xs font-bold text-white/80 backdrop-blur-sm">
              <span className="text-primary text-base">✨</span> Nós te ajudamos a criar em 5 minutos
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-black leading-[1.05] tracking-tight">
                Declare seu amor<br />
                <span className="text-primary italic inline-block transform -skew-x-6">para a sua vovó!|</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white/50 font-medium leading-relaxed max-w-lg">
                Crie um presente digital com fotos, música e textos personalizados, para quem você ama e surpreenda a pessoa. Pronto em 5 minutos.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button size="lg" className="bg-primary hover:bg-primary/90 h-14 sm:h-16 rounded-xl px-8 text-base sm:text-lg font-black flex items-center justify-center gap-3 shadow-2xl shadow-primary/30 active:scale-95 transition-all">
                <Heart className="w-5 h-5 fill-current" />
                Quero criar agora! ❤️
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex items-start gap-4 pt-6 border-t border-white/5 max-w-md">
              <div className="flex -space-x-3 pt-1">
                {avatars.map((avatar, i) => (
                  <Avatar key={i} className="border-2 border-black w-10 h-10 ring-1 ring-white/10">
                    <AvatarImage src={avatar.imageUrl} />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-1 text-primary">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                  <span className="text-white text-[11px] font-black ml-1 uppercase tracking-wider">Camila R.</span>
                </div>
                <p className="text-[12px] leading-relaxed text-white/40 font-medium">
                  A minha bestie amou! Ficou perfeito com as fotos a gente juntas 💜<br />
                  <span className="text-white/60 font-bold">Mais de 75.000 usuários satisfeitos</span>
                </p>
              </div>
            </div>
          </div>

          {/* Phone Mockup Carousel */}
          <div className="flex flex-col items-center justify-center relative perspective-[1000px]">
            <Carousel className="w-full max-w-[310px] sm:max-w-[330px]">
              <CarouselContent>
                <CarouselItem>
                  <div className="relative aspect-[9/19] rounded-[3rem] border-8 border-white/5 bg-black overflow-hidden shadow-[0_0_100px_rgba(225,29,72,0.1)] ring-1 ring-white/10 transform rotate-1">
                    <div className="absolute inset-0">
                      <Image 
                        src={giftPreview?.imageUrl || ''} 
                        fill 
                        className="object-cover opacity-60 scale-110" 
                        alt="Preview"
                        data-ai-hint="couple love"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/60" />
                    </div>

                    {/* Mockup UI */}
                    <div className="absolute inset-x-0 bottom-0 p-6 space-y-4">
                      <div className="flex items-center gap-2 text-[10px] font-black tracking-widest text-white/90">
                        <Heart className="w-3 h-3 text-primary fill-primary" />
                        ETERNIZE ORIGINAL
                      </div>
                      
                      <div className="space-y-1">
                        <h2 className="text-3xl font-black leading-none uppercase italic tracking-tighter">
                          Eu te amo<br />para sempre!
                        </h2>
                      </div>

                      <div className="flex items-center gap-3 text-[10px] font-black">
                        <span className="text-[#46d369]">99% compatível</span>
                        <span className="text-white/60">2024</span>
                        <span className="border border-white/40 px-1.5 rounded-[3px] text-[8px] flex items-center justify-center">L</span>
                        <span className="text-white/60 tracking-tighter">HD</span>
                      </div>

                      <p className="text-[10px] text-white/60 font-medium leading-relaxed line-clamp-3">
                        Hoje não é nenhuma data especial, mas eu só queria dizer o quanto te amo. Você é tudo pra mim, minha felicidade...
                      </p>
                      
                      <div className="flex gap-2 pt-1">
                        <Button variant="secondary" size="sm" className="flex-1 h-9 bg-white text-black font-black text-xs gap-2 hover:bg-white/90 transition-colors">
                          <Play className="w-3.5 h-3.5 fill-current" /> Reproduzir
                        </Button>
                      </div>

                      <div className="flex items-center justify-around text-white/80 pt-2">
                        <div className="flex flex-col items-center gap-1.5 group cursor-pointer">
                          <Plus className="w-5 h-5 transition-transform group-hover:scale-110" />
                          <span className="text-[8px] font-bold">Minha lista</span>
                        </div>
                        <div className="flex flex-col items-center gap-1.5 group cursor-pointer">
                          <ThumbsUp className="w-5 h-5 transition-transform group-hover:scale-110" />
                          <span className="text-[8px] font-bold">Classificar</span>
                        </div>
                        <div className="flex flex-col items-center gap-1.5 group cursor-pointer">
                          <Heart className="w-5 h-5 transition-transform group-hover:scale-110" />
                          <span className="text-[8px] font-bold">Favoritar</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-4 border-t border-white/10">
                        <div className="bg-[#e50914] text-[8px] font-black px-1.5 py-0.5 rounded-[2px] tracking-tight">NETFLIX</div>
                        <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                          <div className="w-3/4 h-full bg-[#e50914] shadow-[0_0_10px_#e50914]" />
                        </div>
                      </div>
                    </div>

                    {/* Floating Play Button */}
                    <div className="absolute right-4 bottom-44">
                      <div className="w-12 h-12 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20 shadow-2xl active:scale-90 transition-transform cursor-pointer">
                        <Play className="w-5 h-5 fill-white text-white ml-1" />
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex -left-12 bg-white/5 border-white/10 hover:bg-white/10 text-white" />
              <CarouselNext className="hidden sm:flex -right-12 bg-white/5 border-white/10 hover:bg-white/10 text-white" />
            </Carousel>
            
            <div className="flex gap-2.5 mt-10">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
              <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
              <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
            </div>

            <div className="mt-8 text-[10px] font-black text-white/30 tracking-[0.4em] uppercase">
              NETFLIX — ETERNIZE
            </div>
          </div>
        </div>
      </main>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="w-14 h-14 rounded-full bg-[#25d366] hover:bg-[#20bd5c] shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 group relative">
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-black animate-pulse" />
          <svg className="w-7 h-7 text-white fill-current" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.765-5.764-5.765zm3.374 8.163c-.144.405-.833.78-1.145.828-.312.048-.609.063-1.032-.083-.246-.085-.573-.197-1.139-.441-2.42-1.041-3.993-3.513-4.111-3.672-.119-.159-1.019-1.354-1.019-2.58 0-1.226.646-1.83.877-2.078.231-.248.503-.31.67-.31h.536c.172 0 .4-.012.58.423l.53 1.282c.058.147.1.319.002.525-.098.205-.144.332-.294.507l-.234.27c-.147.168-.3.351-.129.642.171.291.761 1.258 1.632 2.034.871.776 1.603 1.017 1.894 1.163.291.146.463.123.635-.075.172-.198.733-.854.928-1.147.195-.294.39-.245.658-.146l1.295.632c.268.132.447.225.513.344.067.119.067.688-.177 1.092z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
