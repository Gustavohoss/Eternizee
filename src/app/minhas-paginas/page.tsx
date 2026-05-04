'use client';

import React from 'react';
import Link from 'next/link';
import { collection, query, where, orderBy } from 'firebase/firestore';
import { useFirestore, useUser, useCollection, useAuth, useMemoFirebase } from '@/firebase';
import { Heart, ExternalLink, Calendar, Loader2, Plus, ArrowLeft, LogOut, Layout, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { signOut } from 'firebase/auth';

export default function MyPages() {
  const firestore = useFirestore();
  const auth = useAuth();
  const { user, isUserLoading } = useUser();

  // Query memoizada para buscar apenas as páginas do usuário logado
  const mySitesQuery = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return query(
      collection(firestore, 'published_sites'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );
  }, [firestore, user]);

  const { data: sites, isLoading, error } = useCollection(mySitesQuery as any);

  const handleLogout = () => {
    signOut(auth);
  };

  if (isUserLoading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4 text-white">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Verificando acesso...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center text-white">
        <div className="fixed inset-0 bg-hero-glow pointer-events-none z-0" />
        <div className="relative z-10 space-y-6">
          <div className="bg-white/5 p-6 rounded-3xl border border-white/10 w-fit mx-auto mb-4">
             <Layout className="w-10 h-10 text-white/20" />
          </div>
          <h1 className="text-3xl font-black italic uppercase tracking-tighter">Área Restrita</h1>
          <p className="text-white/40 text-sm max-w-xs mx-auto font-medium leading-relaxed">Você precisa estar logado para ver seus presentes eternizados.</p>
          <div className="flex flex-col gap-3 max-w-[240px] mx-auto pt-4">
            <Link href="/login" className="w-full">
              <Button className="w-full bg-primary hover:bg-primary/90 h-12 rounded-xl font-black text-xs uppercase tracking-widest">
                Fazer Login
              </Button>
            </Link>
            <Link href="/" className="w-full">
              <Button variant="ghost" className="w-full text-white/30 hover:text-white text-xs font-bold uppercase tracking-widest">
                Voltar ao início
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 relative overflow-x-hidden">
      <div className="fixed inset-0 bg-hero-glow pointer-events-none z-0" />

      <div className="max-w-4xl mx-auto relative z-10">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 animate-in slide-in-from-top-4 duration-700">
          <div className="space-y-2">
            <div className="flex items-center gap-4 mb-4">
              <Link href="/" className="group flex items-center gap-2 text-white/30 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest">
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Voltar
              </Link>
              <div className="h-3 w-px bg-white/10" />
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary">
                <User className="w-3 h-3" /> {user.email?.split('@')[0]}
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase">Minhas Páginas<span className="text-primary">.</span></h1>
            <p className="text-white/40 text-sm font-medium">Gerencie seus presentes e histórias eternizadas.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Link href="/criador">
              <Button className="bg-primary hover:bg-primary/90 h-12 rounded-xl font-black text-xs uppercase tracking-widest gap-2 shadow-2xl shadow-primary/20">
                <Plus className="w-4 h-4" /> Criar nova
              </Button>
            </Link>
            <Button onClick={handleLogout} variant="outline" className="border-white/10 bg-white/5 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 h-12 rounded-xl px-4">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </header>

        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-4">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30">Buscando documentos...</p>
          </div>
        ) : (!sites || sites.length === 0) ? (
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
