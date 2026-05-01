'use client';

import React, { useMemo } from 'react';
import { useParams } from 'next/navigation';
import { doc } from 'firebase/firestore';
import { useDoc, useFirestore } from '@/firebase';
import { DeviceMockup } from '@/components/eternize/device-mockup';
import { Loader2, Heart } from 'lucide-react';

export default function PublishedSitePage() {
  const params = useParams();
  const subdomain = params.subdomain as string;
  const firestore = useFirestore();

  const siteRef = useMemo(() => {
    if (!firestore || !subdomain) return null;
    return doc(firestore, 'published_sites', subdomain);
  }, [firestore, subdomain]);

  const { data: siteData, isLoading, error } = useDoc(siteRef as any);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4 text-white">
        <div className="relative">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
          <Heart className="w-4 h-4 text-primary absolute inset-0 m-auto animate-pulse" />
        </div>
        <p className="text-xs font-black uppercase tracking-[0.3em] animate-pulse">Carregando sua história...</p>
      </div>
    );
  }

  if (error || !siteData) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center text-white">
        <Heart className="w-12 h-12 text-white/10 mb-4" />
        <h1 className="text-2xl font-black mb-2 uppercase italic tracking-tighter">Site não encontrado</h1>
        <p className="text-white/40 text-sm max-w-xs mb-8 font-medium">O link que você acessou pode estar incorreto ou a página foi removida.</p>
        <a href="/" className="px-8 py-3 bg-white text-black rounded-xl font-black text-xs uppercase tracking-widest hover:bg-neutral-200 transition-all">
          Criar meu presente
        </a>
      </div>
    );
  }

  // Parse the content data
  let config = {};
  try {
    config = JSON.parse(siteData.contentJson);
  } catch (e) {
    console.error("Error parsing site config", e);
  }

  // Convert string date back to Date object if it exists
  const processedConfig = {
    ...config,
    date: (config as any).date ? new Date((config as any).date) : undefined
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-black overflow-hidden">
      <DeviceMockup {...(processedConfig as any)} isFullscreen />
    </div>
  );
}
