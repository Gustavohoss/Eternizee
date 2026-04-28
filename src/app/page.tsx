'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Heart, 
  ChevronRight, 
  Star, 
  Users, 
  Globe,
  LogIn
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DeviceMockup } from '@/components/eternize/device-mockup';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function LandingPage() {
  const avatars = PlaceHolderImages.filter(img => img.id.startsWith('avatar-'));

  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-white relative overflow-x-hidden font-body">
      <div className="fixed inset-0 bg-hero-glow pointer-events-none z-0" />

      {/* Top Banner Promo */}
      <div className="fixed inset-x-0 top-0 z-[100] bg-[#3d0b17] border-b border-white/5 py-1.5 md:py-2 text-center text-[10px] md:text-xs font-medium flex items-center justify-center gap-4">
        <div className="bg-white/10 px-2 py-0.5 rounded border border-white/20 text-[9px] md:text-[10px] font-black uppercase">50% OFF</div>
        <p className="tracking-tight">
          ✨ Apenas hoje — Todos os planos com <span className="font-black">50% OFF</span> de desconto!{' '}
          <span className="underline cursor-pointer hover:text-white/80 font-bold ml-1">Ver planos ›</span>
        </p>
      </div>

      <header className="relative z-20 container mx-auto px-4 py-1.5 md:py-2 mt-6 md:mt-8 flex items-center justify-between max-w-6xl">
        <div className="flex items-center gap-2">
          <div className="bg-primary p-1 rounded-full shadow-lg shadow-primary/20">
            <Heart className="w-3.5 h-3.5 fill-white text-white" />
          </div>
          <span className="text-base font-black tracking-tighter">
            Eternize<span className="text-primary">.</span>
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-[10px] font-bold text-white/50 uppercase tracking-wider">
          <a href="#" className="hover:text-white transition-colors">Início</a>
          <a href="#" className="hover:text-white transition-colors">Como funciona?</a>
          <a href="#" className="hover:text-white transition-colors">Planos</a>
          <a href="#" className="hover:text-white transition-colors">F.A.Q</a>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-4 text-[9px] font-bold text-white/50 uppercase">
            <button className="flex items-center gap-1 hover:text-white transition-colors">
              <Globe className="w-2.5 h-2.5" /> BR PT
            </button>
            <button className="flex items-center gap-1 hover:text-white transition-colors">
              <LogIn className="w-2.5 h-2.5" /> Login
            </button>
          </div>
          <Link href="/criador">
            <Button className="bg-primary hover:bg-primary/90 rounded-full px-4 h-7 text-[10px] font-bold shadow-lg shadow-primary/20 transition-all active:scale-95">
              Criar minha página
            </Button>
          </Link>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-4 pt-2 md:pt-4 pb-12">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center max-w-5xl mx-auto">
          <div className="space-y-4 md:space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1 text-[10px] font-bold text-white/70 backdrop-blur-sm">
              <span className="text-primary text-sm">✨</span> Crie em 5 minutos
            </div>

            <div className="space-y-2 md:space-y-3 text-center md:text-left">
              <h1 className="text-3xl md:text-[68px] font-black leading-[1.1] md:leading-[1] tracking-tight">
                Declare seu amor<br />
                <span className="text-primary italic inline-block transform -skew-x-6">para quem você ama!</span>
              </h1>
              <p className="text-xs md:text-sm text-white/40 font-medium leading-relaxed max-w-md mx-auto md:mx-0">
                Crie um presente digital com fotos, música e textos personalizados para surpreender quem você ama de um jeito inesquecível.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2 justify-center md:justify-start">
              <Link href="/criador">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 h-10 md:h-12 rounded-xl px-6 md:px-8 text-xs md:text-sm font-black flex items-center justify-center gap-3 shadow-2xl shadow-primary/30 active:scale-95 transition-all w-full sm:w-auto"
                >
                  <Heart className="w-4 h-4 fill-current" />
                  Quero criar agora! ❤️
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-4 pt-4 md:pt-6 border-t border-white/5 justify-center md:justify-start">
              <div className="flex -space-x-2">
                {avatars.map((avatar, i) => (
                  <Avatar key={i} className="border-2 border-black w-6 h-6 md:w-8 md:h-8 ring-1 ring-white/10">
                    <AvatarImage src={avatar.imageUrl} />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-1 text-primary">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-2.5 h-2.5 md:w-3 h-3 fill-current" />
                  ))}
                  <span className="text-white text-[8px] md:text-[10px] font-black ml-1 uppercase tracking-wider">Camila R.</span>
                </div>
                <p className="text-[8px] md:text-[10px] leading-tight text-white/30 font-medium">
                  Mais de 75.000 usuários satisfeitos em todo o Brasil
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center relative">
            <DeviceMockup 
              selectedBgColor="#000"
              selectedEffect="none"
              selectedEmojis={['❤️']}
              emojiSize={20}
              step="landing"
              uploadedPhotos={[]}
              pageTitle=""
              selectedCountStyle="padrao"
              photoEffect="slide"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
