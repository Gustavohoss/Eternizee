'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { collection, query, where, orderBy } from 'firebase/firestore';
import { useFirestore, useUser, useCollection } from '@/firebase';
import { Heart, ExternalLink, Calendar, Loader2, Plus, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function MyPages() {
  const firestore = useFirestore();
  const { user, isUserLoading } = useUser();

  // Query memoizada para buscar apenas as páginas do usuário logado
  const mySitesQuery = useMemo(() => {
    if (!firestore || !user) return null;
    return query(
      collection(firestore, 'published_sites'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );
  }, [firestore, user]);

  const { data: sites, isLoading, error } = useCollection(mySitesQuery as any);

  if (isUserLoading || isLoading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4 text-white">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Buscando suas histórias...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 relative overflow-x-hidden">
      <div className="fixed inset-0 bg-hero-glow pointer-events-none z-0" />

      <div className="max-w-4xl mx-auto relative z-10">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 animate-in slide-in-from-top-4 duration-700">
          <div className="space-y-2">
            <Link href="/" className="group flex items-center gap-2 text-white/30 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest mb-4">
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Voltar
            </Link>
            <h1 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase">Minhas Páginas<span className="text-primary">.</span></h1>
            <p className="text-white/40 text-sm font-medium">Aqui estão todos os seus presentes eternizados.</p>
          </div>
          
          <Link href="/criador">
            <Button className="bg-primary hover:bg-primary/90 h-12 rounded-xl font-black text-xs uppercase tracking-widest gap-2 shadow-2xl shadow-primary/20">
              <Plus className="w-4 h-4" /> Criar nova
            </Button>
          </Link>
        </header>

        {(!sites || sites.length === 0) ? (
          <div className="bg-white/5 border border-white/10 rounded-[2rem] p-12 text-center flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-700">
            <div className="bg-white/5 p-5 rounded-full mb-6 border border-white/10">
              <Heart className="w-10 h-10 text-white/10" />
            </div>
            <h2 className="text-xl font-black uppercase italic mb-2 tracking-tight">Nenhuma página encontrada</h2>
            <p className="text-white/30 text-sm max-w-xs mb-8">Você ainda não criou nenhum presente digital. Que tal começar agora?</p>
            <Link href="/criador">
              <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 rounded-xl font-bold">
                Criar meu primeiro presente
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {sites.map((site: any) => (
              <div key={site.id} className="group relative bg-[#0c0c0c] border border-white/5 rounded-3xl p-6 hover:border-primary/30 transition-all duration-500 overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                   <div className="bg-primary/20 p-2 rounded-lg">
                      <Heart className="w-3 h-3 text-primary fill-current" />
                   </div>
                </div>

                <div className="flex flex-col gap-4 relative z-10">
                  <div className="space-y-1">
                    <h3 className="text-lg font-black uppercase italic tracking-tight text-white group-hover:text-primary transition-colors truncate pr-8">
                      {site.name || 'Sem título'}
                    </h3>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-white/20 uppercase tracking-wider">
                      <Calendar className="w-3 h-3" />
                      {site.createdAt ? format(site.createdAt.toDate(), "dd 'de' MMMM", { locale: ptBR }) : 'Recentemente'}
                    </div>
                  </div>

                  <div className="bg-black/50 border border-white/5 rounded-xl p-3 flex items-center justify-between">
                    <div className="text-[10px] font-mono text-white/30 truncate max-w-[180px]">
                      site/{site.id}
                    </div>
                    <Link href={`/site/${site.id}`} target="_blank">
                      <Button size="sm" variant="ghost" className="h-8 rounded-lg text-[9px] font-black uppercase tracking-widest text-primary hover:text-primary hover:bg-primary/10 gap-1.5 px-3">
                        Acessar <ExternalLink className="w-3 h-3" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
