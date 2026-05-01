'use client';

import React from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-white relative flex items-center justify-center overflow-hidden font-body">
      <div className="fixed inset-0 bg-hero-glow pointer-events-none z-0" />

      <main className="relative z-10 text-center space-y-8 animate-in fade-in zoom-in-95 duration-1000">
        <div className="flex flex-col items-center gap-4">
          <div className="bg-primary p-3 rounded-full shadow-2xl shadow-primary/40 animate-pulse">
            <Heart className="w-8 h-8 fill-white text-white" />
          </div>
          <h1 className="text-2xl font-black tracking-tighter uppercase italic">Eternize<span className="text-primary">.</span></h1>
        </div>

        <Link href="/criador">
          <Button 
            size="lg" 
            className="bg-white text-black hover:bg-neutral-200 h-14 px-12 rounded-2xl font-black text-base shadow-2xl transition-all active:scale-95 group"
          >
            Começar criação
            <Heart className="ml-2 w-4 h-4 fill-primary text-primary group-hover:scale-125 transition-transform" />
          </Button>
        </Link>
      </main>
    </div>
  );
}
