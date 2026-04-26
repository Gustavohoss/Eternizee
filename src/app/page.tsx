'use client';

import React from 'react';
import Image from 'next/image';
import { Heart, ChevronRight, Star, Play, Plus, ThumbsUp, ChevronLeft, Globe, LogIn } from 'lucide-react';
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
    <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-white">
      {/* Top Banner */}
      <div className="bg-[#4a0e1c] py-2 text-center text-xs font-medium flex items-center justify-center gap-2">
        <Badge variant="outline" className="text-white border-white/20 bg-white/10 text-[10px] py-0 px-1.5 h-auto">
          50% OFF
        </Badge>
        <p>
          Apenas hoje — Todos os planos com 50% OFF de desconto, aproveite!{' '}
          <span className="underline cursor-pointer hover:text-white/80">Ver planos ›</span>
        </p>
      </div>

      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-primary p-1.5 rounded-full">
            <Heart className="w-6 h-6 fill-white text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight">
            Eternize<span className="text-primary">.</span>
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
          <a href="#" className="hover:text-white transition-colors">Início</a>
          <a href="#" className="hover:text-white transition-colors">Como funciona?</a>
          <a href="#" className="hover:text-white transition-colors">Planos</a>
          <a href="#" className="hover:text-white transition-colors">F.A.Q</a>
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="hidden sm:flex gap-2 text-white/70 hover:text-white">
            <Globe className="w-4 h-4" /> BR PT
          </Button>
          <Button variant="ghost" size="sm" className="hidden sm:flex gap-2 text-white/70 hover:text-white">
            <LogIn className="w-4 h-4" /> Fazer Login
          </Button>
          <Button className="bg-primary hover:bg-primary/90 rounded-full px-6 text-white font-semibold">
            Criar minha página
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-12 md:pt-24 pb-20 relative overflow-hidden">
        <div className="bg-hero-gradient absolute inset-0 pointer-events-none" />
        
        <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* Hero Text */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm font-medium text-white/80">
              <span className="text-primary">✨</span> Nós te ajudamos a criar em 5 minutos
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight">
              Declare seu amor<br />
              <span className="text-primary italic">para a sua vovó!|</span>
            </h1>

            <p className="text-lg md:text-xl text-white/60 max-w-lg leading-relaxed">
              Crie um presente digital com fotos, música e textos personalizados, para quem você ama e surpreenda a pessoa. Pronto em 5 minutos.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 h-16 rounded-xl px-8 text-lg font-bold flex items-center gap-3">
                <Heart className="w-5 h-5 fill-current" />
                Quero criar agora! ❤️
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-3">
                {avatars.map((avatar, i) => (
                  <Avatar key={i} className="border-2 border-black w-10 h-10">
                    <AvatarImage src={avatar.imageUrl} />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-primary">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                  <span className="text-white text-xs font-bold ml-1">Camila R.</span>
                </div>
                <p className="text-xs text-white/50">
                  A minha bestie amou! Ficou perfeito com as fotos a gente juntas 💜<br />
                  <span className="opacity-70">Mais de 75.000 usuários satisfeitos</span>
                </p>
              </div>
            </div>
          </div>

          {/* Phone Mockup Carousel */}
          <div className="flex flex-col items-center justify-center relative">
            <Carousel className="w-full max-w-[320px]">
              <CarouselContent>
                <CarouselItem>
                  <div className="relative aspect-[9/19] rounded-[3rem] border-8 border-white/5 bg-black overflow-hidden shadow-2xl ring-1 ring-white/10">
                    <div className="absolute inset-0">
                      <Image 
                        src={giftPreview?.imageUrl || ''} 
                        fill 
                        className="object-cover opacity-60" 
                        alt="Preview"
                        data-ai-hint="couple love"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />
                    </div>

                    {/* Mockup UI */}
                    <div className="absolute inset-x-0 bottom-0 p-6 space-y-4">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-white/80">
                        <Heart className="w-3 h-3 text-primary fill-primary" />
                        ETERNIZE ORIGINAL
                      </div>
                      <h2 className="text-3xl font-black leading-none uppercase italic">
                        Eu te amo para<br />sempre!
                      </h2>
                      <div className="flex items-center gap-3 text-[10px] font-bold">
                        <span className="text-green-500">99% compatível</span>
                        <span className="text-white/60">2024</span>
                        <span className="border border-white/40 px-1 rounded text-[8px]">L</span>
                        <span className="text-white/60">HD</span>
                      </div>
                      <p className="text-[10px] text-white/60 line-clamp-3">
                        Hoje não é nenhuma data especial, mas eu só queria dizer o quanto te amo. Você é tudo pra mim, minha felicidade...
                      </p>
                      
                      <div className="flex gap-2 pt-2">
                        <Button variant="secondary" size="sm" className="flex-1 h-9 bg-white text-black font-bold text-xs gap-2">
                          <Play className="w-3 h-3 fill-current" /> Reproduzir
                        </Button>
                      </div>
                      <div className="flex items-center justify-between text-white/60 pt-2">
                        <div className="flex flex-col items-center gap-1">
                          <Plus className="w-5 h-5 text-white" />
                          <span className="text-[8px]">Minha lista</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <ThumbsUp className="w-5 h-5" />
                          <span className="text-[8px]">Classificar</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <Heart className="w-5 h-5" />
                          <span className="text-[8px]">Favoritar</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-4 border-t border-white/10">
                        <div className="bg-[#e50914] text-[8px] font-bold px-1 rounded-sm">NETFLIX</div>
                        <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                          <div className="w-3/4 h-full bg-[#e50914]" />
                        </div>
                      </div>
                    </div>

                    {/* Video Button */}
                    <div className="absolute right-4 bottom-40">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
                        <Play className="w-5 h-5 fill-white" />
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="left-[-60px] bg-white/5 border-white/10 hover:bg-white/10 text-white" />
              <CarouselNext className="right-[-60px] bg-white/5 border-white/10 hover:bg-white/10 text-white" />
            </Carousel>
            
            <div className="flex gap-2 mt-8">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <div className="w-2 h-2 rounded-full bg-white/20" />
              <div className="w-2 h-2 rounded-full bg-white/20" />
              <div className="w-2 h-2 rounded-full bg-white/20" />
            </div>

            <div className="mt-8 text-[10px] font-bold text-white/40 tracking-[0.2em] uppercase">
              NETFLIX — ETERNIZE
            </div>
          </div>
        </div>
      </main>

      {/* Floating Action Button (for help) */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button className="w-14 h-14 rounded-full bg-red-600 hover:bg-red-700 shadow-xl flex items-center justify-center p-0">
          <div className="w-2 h-2 bg-white rounded-full animate-ping absolute top-3 right-3" />
          <svg className="w-8 h-8 text-white fill-current" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12c0 1.83.5 3.53 1.36 5L2 22l5-1.36c1.47.86 3.17 1.36 5 1.36 5.52 0 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
          </svg>
        </Button>
      </div>
    </div>
  );
}