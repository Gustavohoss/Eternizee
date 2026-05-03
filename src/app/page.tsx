
'use client';

import React, { useState, useEffect } from 'react';
import NextLink from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCreative } from 'swiper/modules';
import { ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-creative';

export default function LandingPage() {
  const [text, setText] = useState('');
  const phrases = ["para o seu mozão!", "para a sua vovó!", "com a sua trilha sonora!", "para o seu amor!"];
  const [pIndex, setPIndex] = useState(0);
  const [cIndex, setCIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Efeito de Digitação (Typewriter)
  useEffect(() => {
    const current = phrases[pIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (cIndex < current.length) {
          setText(current.substring(0, cIndex + 1));
          setCIndex(cIndex + 1);
        } else {
          // Pausa no final da frase
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (cIndex > 0) {
          setText(current.substring(0, cIndex - 1));
          setCIndex(cIndex - 1);
        } else {
          setIsDeleting(false);
          setPIndex((pIndex + 1) % phrases.length);
        }
      }
    }, isDeleting ? 50 : 120);

    return () => clearTimeout(timeout);
  }, [cIndex, isDeleting, pIndex]);

  const THEME_COLOR = '#ff4d6d';

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-[#ff4d6d] overflow-x-hidden">
      {/* Estilos Globais Customizados */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');
        
        .typing-container {
          font-family: 'Great Vibes', cursive;
        }

        .cursor {
          width: 2px;
          height: 35px;
          background-color: #ff4d6d;
          margin-left: 5px;
          animation: blink 0.8s infinite;
        }

        @keyframes blink { 50% { opacity: 0; } }

        .cta-button {
          background: linear-gradient(90deg, #ff4d6d, #c9184a);
          box-shadow: 0 8px 20px rgba(255, 77, 109, 0.2);
        }
      `}</style>

      {/* Top Bar de Promoção */}
      <div className="bg-gradient-to-r from-[#5c1421] to-[#1a0a0d] text-[12px] text-center py-2 text-[#ffb3c1] font-medium">
        ⚡ Apenas hoje — Todos os planos com <strong>50% OFF</strong> de desconto, aproveite! <u className="cursor-pointer ml-1">Ver planos</u>
      </div>

      {/* Header */}
      <header className="flex justify-between items-center px-[5%] md:px-[8%] py-4 bg-[#0a0a0a]/95 border-b border-[#1a1a1a] sticky top-0 z-[100] backdrop-blur-md">
        <div className="logo text-white font-bold text-[22px] flex items-center tracking-tight">
          Eternize.
        </div>
        <nav className="hidden lg:flex">
          <NextLink href="/" className="mx-4 text-[13px] opacity-80 hover:opacity-100 hover:text-[#ff4d6d] transition-all">Início</NextLink>
          <NextLink href="#" className="mx-4 text-[13px] opacity-80 hover:opacity-100 hover:text-[#ff4d6d] transition-all">Como funciona?</NextLink>
          <NextLink href="#" className="mx-4 text-[13px] opacity-80 hover:opacity-100 hover:text-[#ff4d6d] transition-all">Planos</NextLink>
          <NextLink href="#" className="mx-4 text-[13px] opacity-80 hover:opacity-100 hover:text-[#ff4d6d] transition-all">F.A.Q</NextLink>
        </nav>
        <div className="flex items-center gap-4 md:gap-6">
          <NextLink href="/minhas-paginas" className="hidden md:block text-[13px] font-semibold hover:text-[#ff4d6d] transition-colors">Fazer Login</NextLink>
          <NextLink href="/criador" className="bg-[#ff4d6d] px-5 py-2.5 rounded-full text-white font-bold text-[13px] hover:bg-[#ff4d6d]/90 transition-all active:scale-95 shadow-lg shadow-[#ff4d6d]/20">
            Criar minha página
          </NextLink>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center justify-center min-h-[calc(100vh-120px)] px-[5%] md:px-[8%] gap-12 lg:gap-20 py-12 lg:py-0">
        <div className="flex-1 max-w-[550px] text-center lg:text-left flex flex-col items-center lg:items-start animate-in fade-in slide-in-from-left-8 duration-1000">
          <div className="bg-[#ff4d6d]/10 text-[#ff4d6d] px-4 py-1.5 rounded-full text-[11px] border border-[#ff4d6d]/20 mb-6 inline-block font-bold tracking-wide uppercase italic">
            ✨ Nós te ajudamos a criar em 5 minutos
          </div>
          
          <h1 className="text-[48px] md:text-[62px] font-black leading-[1.1] m-0 tracking-tighter">
            Declare seu amor
          </h1>
          
          <div className="typing-container text-[36px] md:text-[48px] text-[#ff4d6d] h-[60px] md:h-[70px] mb-4 flex items-center justify-center lg:justify-start">
            <span>{text}</span>
            <span className="cursor" />
          </div>
          
          <p className="text-[16px] md:text-[18px] text-[#b3b3b3] leading-relaxed mb-10 max-w-[90%] md:max-w-[480px] font-medium">
            Crie um presente digital com fotos, música e textos personalizados, para quem você ama e surpreenda a pessoa. Pronto em 5 minutos.
          </p>

          <NextLink href="/criador" className="cta-button text-white px-8 py-4 md:px-10 md:py-5 rounded-xl text-[18px] md:text-[20px] font-black inline-flex items-center gap-3 transition-all hover:brightness-110 active:scale-95 w-full sm:w-auto justify-center group uppercase italic tracking-tight">
            Quero criar agora! <span className="text-2xl transition-transform group-hover:translate-x-1">›</span>
          </NextLink>

          <div className="flex items-center mt-10 gap-4 social-proof">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <img key={i} src={`https://i.pravatar.cc/100?u=${i + 10}`} className="w-[34px] h-[34px] rounded-full border-2 border-[#0a0a0a] shadow-lg" alt="usuário satisfeito" />
              ))}
            </div>
            <div className="text-[12px] md:text-[13px] text-[#b3b3b3] font-medium">
              <span className="text-[#ffb703] block mb-0.5 text-sm">★★★★★</span>
              Mais de 75.000 usuários satisfeitos
            </div>
          </div>
        </div>

        {/* Galeria Visual (Lado Direito) */}
        <div className="flex-1 flex justify-center w-full lg:w-auto animate-in fade-in slide-in-from-right-8 duration-1000 delay-200">
          <div className="w-[300px] h-[420px] md:w-[320px] md:h-[450px] relative">
            {/* Glow decorativo atrás do carrossel */}
            <div className="absolute inset-0 bg-[#ff4d6d]/20 blur-[80px] rounded-full -z-10 scale-110 opacity-50" />
            
            <Swiper
              effect={'creative'}
              grabCursor={true}
              loop={true}
              autoplay={{ 
                delay: 2500,
                disableOnInteraction: false 
              }}
              creativeEffect={{
                prev: { 
                  translate: ["-120%", 0, -500], 
                  opacity: 0 
                },
                next: { 
                  translate: ["0%", 0, -50], 
                  scale: 0.9, 
                  opacity: 0.6 
                },
              }}
              modules={[Autoplay, EffectCreative]}
              className="w-full h-full rounded-[24px] overflow-visible"
            >
              {[
                { id: 101, name: 'Clássico', badge: 'Eterno', desc: 'O estilo romântico e atemporal para surpreender.', img: 'https://picsum.photos/seed/classic-theme/400/600' },
                { id: 102, name: 'Netflix', badge: 'Cinema', desc: 'Transforme sua história em uma série épica.', img: 'https://picsum.photos/seed/netflix-theme/400/600' },
                { id: 103, name: 'Spotify', badge: 'Música', desc: 'A trilha sonora perfeita para o seu amor.', img: 'https://picsum.photos/seed/spotify-theme/400/600' }
              ].map((theme) => (
                <SwiperSlide key={theme.id} className="rounded-[24px] overflow-visible">
                  <div 
                    className="relative bg-[#141414] rounded-[24px] overflow-hidden transition-all duration-500 w-full h-full border-2"
                    style={{ 
                      borderColor: THEME_COLOR,
                      boxShadow: `0 0 40px ${THEME_COLOR}66, 0 0 80px ${THEME_COLOR}33`
                    }}
                  >
                    {/* Top Glow Line */}
                    <div className="absolute top-0 left-0 right-0 h-[3px] z-30 transition-opacity duration-500" 
                      style={{ background: `linear-gradient(90deg, transparent, ${THEME_COLOR}, transparent)` }}
                    />

                    {/* Media Area */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#1f1f1f] to-[#141414] z-10">
                      <Image 
                        src={theme.img} 
                        fill 
                        className="object-cover" 
                        alt={theme.name} 
                        data-ai-hint="theme preview"
                      />
                      {/* Gradient Overlay for Text */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-20" />
                    </div>

                    {/* Card Body Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 z-30">
                      <div className="flex justify-between items-center mb-1">
                        <h2 className="text-white text-lg font-black m-0 font-inter">{theme.name}</h2>
                        <span 
                          className="px-2.5 py-0.5 rounded-full text-[0.6rem] font-black uppercase tracking-wider border"
                          style={{ 
                            backgroundColor: `${THEME_COLOR}22`, 
                            color: THEME_COLOR, 
                            borderColor: `${THEME_COLOR}44` 
                          }}
                        >
                          {theme.badge}
                        </span>
                      </div>

                      <p className="text-[#b3b3b3] text-[10px] leading-snug mb-4 font-medium line-clamp-2">
                        {theme.desc}
                      </p>

                      <button className="w-full bg-white/5 border border-white/10 text-white py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all hover:bg-white/10 active:scale-95">
                        <ExternalLink className="w-3 h-3" />
                        Ver demo
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* Rodapé Simples */}
      <footer className="py-8 px-[8%] border-t border-[#1a1a1a] flex flex-col md:flex-row justify-between items-center gap-4 text-[#555] text-[12px] font-medium">
        <p>© 2025 Eternize - Presentes Digitais Eternos.</p>
        <div className="flex gap-6">
          <NextLink href="#" className="hover:text-white transition-colors">Termos de Uso</NextLink>
          <NextLink href="#" className="hover:text-white transition-colors">Privacidade</NextLink>
          <NextLink href="#" className="hover:text-white transition-colors">Suporte</NextLink>
        </div>
      </footer>
    </div>
  );
}
