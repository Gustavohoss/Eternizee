'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Heart, 
  ChevronRight, 
  Star, 
  Play, 
  Plus, 
  ThumbsUp, 
  Globe, 
  LogIn, 
  ArrowLeft, 
  Users, 
  Gift,
  Calendar as CalendarIcon,
  MapPin,
  Clock,
  Layout,
  Hash,
  ChevronLeft,
  Search,
  Music2,
  ChevronUp,
  Volume2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { format, intervalToDuration } from 'date-fns';
import { ptBR } from 'date-fns/locale';

type Step = 'landing' | 'theme-selection' | 'gift-type' | 'data-location';

const MOCK_CITIES = [
  "São Paulo, SP", "Rio de Janeiro, RJ", "Belo Horizonte, MG", 
  "Curitiba, PR", "Florianópolis, SC", "Salvador, BA", 
  "Fortaleza, CE", "Brasília, DF", "Porto Alegre, RS", 
  "Recife, PE", "Manaus, AM", "Goiânia, GO"
];

export default function EternizeApp() {
  const [step, setStep] = useState<Step>('landing');
  const [selectedGiftType, setSelectedGiftType] = useState<string>('amor');
  const [selectedCountStyle, setSelectedCountStyle] = useState<string>('padrao');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [isPlayerExpanded, setIsPlayerExpanded] = useState(false);
  
  // Real-time counter state
  const [timeDiff, setTimeDiff] = useState<{
    years: number;
    months: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  // Location States
  const [locationQuery, setLocationQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const giftPreview = PlaceHolderImages.find(img => img.id === 'gift-preview');
  const avatars = PlaceHolderImages.filter(img => img.id.startsWith('avatar-'));

  const handleStart = () => {
    setStep('theme-selection');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextToGiftType = () => {
    setStep('gift-type');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextToDataLocation = () => {
    setStep('data-location');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    if (step === 'theme-selection') setStep('landing');
    if (step === 'gift-type') setStep('theme-selection');
    if (step === 'data-location') setStep('gift-type');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredCities = locationQuery.length > 0 
    ? MOCK_CITIES.filter(city => city.toLowerCase().includes(locationQuery.toLowerCase()))
    : [];

  // Counter logic
  useEffect(() => {
    if (!date) {
      setTimeDiff(null);
      return;
    }

    const updateCounter = () => {
      const now = new Date();
      if (now < date) {
        setTimeDiff({ years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      const duration = intervalToDuration({ start: date, end: now });
      setTimeDiff({
        years: duration.years || 0,
        months: duration.months || 0,
        days: duration.days || 0,
        hours: duration.hours || 0,
        minutes: duration.minutes || 0,
        seconds: duration.seconds || 0,
      });
    };

    updateCounter();
    const interval = setInterval(updateCounter, 1000);
    return () => clearInterval(interval);
  }, [date]);

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-white relative overflow-x-hidden font-body">
      {/* Background Glows */}
      <div className="fixed inset-0 bg-hero-glow pointer-events-none z-0" />

      {/* Top Banner */}
      <div className="relative z-50 bg-[#3d0b17] border-b border-white/5 py-1.5 text-center text-[10px] sm:text-[11px] font-medium flex items-center justify-center gap-2">
        <div className="bg-white/10 px-1.5 py-0.5 rounded border border-white/20 text-[9px] font-black uppercase">50% OFF</div>
        <p className="tracking-tight">
          ✨ Apenas hoje — Todos os planos com <span className="font-black">50% OFF</span> de desconto, aproveite!{' '}
          <span className="underline cursor-pointer hover:text-white/80 font-bold ml-1">Ver planos ›</span>
        </p>
      </div>

      {step === 'landing' && (
        <>
          {/* Header */}
          <header className="relative z-20 container mx-auto px-4 py-4 flex items-center justify-between max-w-6xl">
            <div className="flex items-center gap-2">
              <div className="bg-primary p-1.5 rounded-full shadow-lg shadow-primary/20">
                <Heart className="w-4 h-4 fill-white text-white" />
              </div>
              <span className="text-lg font-black tracking-tighter">
                Eternize<span className="text-primary">.</span>
              </span>
            </div>

            <nav className="hidden md:flex items-center gap-6 text-[11px] font-bold text-white/50 uppercase tracking-wider">
              <a href="#" className="hover:text-white transition-colors">Início</a>
              <a href="#" className="hover:text-white transition-colors">Como funciona?</a>
              <a href="#" className="hover:text-white transition-colors">Planos</a>
              <a href="#" className="hover:text-white transition-colors">F.A.Q</a>
            </nav>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-4 text-[10px] font-bold text-white/50 uppercase">
                <button className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <Globe className="w-3 h-3" /> BR PT
                </button>
                <button className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <LogIn className="w-3 h-3" /> Login
                </button>
              </div>
              <Button 
                onClick={handleStart}
                className="bg-primary hover:bg-primary/90 rounded-full px-5 h-8 text-[11px] font-bold shadow-lg shadow-primary/20 transition-all active:scale-95"
              >
                Criar minha página
              </Button>
            </div>
          </header>

          {/* Main Content */}
          <main className="relative z-10 container mx-auto px-4 pt-8 pb-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
              {/* Hero Text */}
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1 text-[10px] font-bold text-white/70 backdrop-blur-sm">
                  <span className="text-primary text-sm">✨</span> Crie em 5 minutos
                </div>

                <div className="space-y-3">
                  <h1 className="text-4xl md:text-[68px] font-black leading-[1] tracking-tight">
                    Declare seu amor<br />
                    <span className="text-primary italic inline-block transform -skew-x-6">para quem você ama!</span>
                  </h1>
                  <p className="text-sm text-white/40 font-medium leading-relaxed max-w-md">
                    Crie um presente digital com fotos, música e textos personalizados para surpreender quem você ama de um jeito inesquecível.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Button 
                    onClick={handleStart}
                    size="lg" 
                    className="bg-primary hover:bg-primary/90 h-12 rounded-xl px-8 text-sm font-black flex items-center justify-center gap-3 shadow-2xl shadow-primary/30 active:scale-95 transition-all"
                  >
                    <Heart className="w-4 h-4 fill-current" />
                    Quero criar agora! ❤️
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>

                {/* Social Proof */}
                <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                  <div className="flex -space-x-2">
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
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                      <span className="text-white text-[10px] font-black ml-1 uppercase tracking-wider">Camila R.</span>
                    </div>
                    <p className="text-[10px] leading-tight text-white/30 font-medium">
                      Mais de 75.000 usuários satisfeitos em todo o Brasil
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone Mockup */}
              <div className="flex flex-col items-center justify-center relative">
                <div className="relative w-full max-w-[240px]">
                  <div className="relative aspect-[9/19] rounded-[2.5rem] border-[6px] border-[#1a1a1a] bg-black overflow-hidden shadow-2xl ring-1 ring-white/10">
                    <div className="absolute inset-0">
                      <Image 
                        src={giftPreview?.imageUrl || ''} 
                        fill 
                        className="object-cover opacity-60" 
                        alt="Preview"
                        data-ai-hint="couple love"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/60" />
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-5 space-y-3">
                      <div className="flex items-center gap-1 text-[8px] font-black tracking-widest text-white/90">
                        <Heart className="w-2 h-2 text-primary fill-primary" />
                        ETERNIZE ORIGINAL
                      </div>
                      
                      <h2 className="text-xl font-black leading-none uppercase italic tracking-tighter">
                        Eu te amo<br />para sempre!
                      </h2>

                      <div className="flex items-center gap-2 text-[9px] font-black">
                        <span className="text-[#46d369]">99% compatível</span>
                        <span className="text-white/60">2024</span>
                        <span className="border border-white/40 px-1 rounded-[2px] text-[7px]">L</span>
                        <span className="text-white/60 tracking-tighter uppercase">HD</span>
                      </div>

                      <p className="text-[9px] text-white/50 font-medium leading-tight line-clamp-2">
                        Hoje não é nenhuma data especial, mas eu só queria dizer o quanto você é importante na minha vida...
                      </p>
                      
                      <Button variant="secondary" size="sm" className="w-full h-8 bg-white text-black font-black text-[10px] gap-2 hover:bg-white/90 rounded-sm">
                        <Play className="w-3 h-3 fill-current" /> Reproduzir
                      </Button>

                      <div className="flex items-center justify-around text-white/80 pt-1">
                        <div className="flex flex-col items-center gap-1 group">
                          <Plus className="w-4 h-4" />
                          <span className="text-[7px] font-bold uppercase">Lista</span>
                        </div>
                        <div className="flex flex-col items-center gap-1 group">
                          <ThumbsUp className="w-4 h-4" />
                          <span className="text-[7px] font-bold uppercase">Classificar</span>
                        </div>
                        <div className="flex flex-col items-center gap-1 group">
                          <Heart className="w-4 h-4" />
                          <span className="text-[7px] font-bold uppercase">Favoritar</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                        <div className="bg-[#e50914] text-[7px] font-black px-1 py-0.5 rounded-[1px] tracking-tight">NETFLIX</div>
                        <div className="flex-1 h-0.5 bg-white/20 rounded-full overflow-hidden">
                          <div className="w-3/4 h-full bg-[#e50914] shadow-[0_0_8px_#e50914]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 text-[8px] font-black text-white/20 tracking-[0.4em] uppercase">
                  NETFLIX — ETERNIZE
                </div>
              </div>
            </div>
          </main>
        </>
      )}

      {step === 'theme-selection' && (
        <div className="relative z-10 container mx-auto px-4 pt-12 pb-16 max-w-3xl min-h-[calc(100vh-80px)] flex flex-col justify-center">
          <button 
            onClick={handleBack}
            className="group flex items-center gap-2 text-white/40 hover:text-white transition-colors text-[11px] font-bold mb-8 w-fit"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Voltar
          </button>

          <div className="space-y-2 mb-10 text-center">
            <h2 className="text-3xl font-black tracking-tight">
              Qual tema você quer usar?
            </h2>
            <p className="text-sm text-white/40 font-medium">
              Escolha o estilo da página e personalizamos tudo para você.
            </p>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-[260px] group cursor-pointer" onClick={handleNextToGiftType}>
              <div className="absolute -inset-4 bg-primary/20 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" />
              
              <div className="relative bg-[#0c0c0c] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl ring-1 ring-white/5 transition-transform hover:scale-[1.02]">
                <div className="aspect-[3.5/5] relative bg-black">
                   <Image 
                      src={giftPreview?.imageUrl || ''} 
                      fill 
                      className="object-cover opacity-80" 
                      alt="Theme Preview"
                      data-ai-hint="romantic gift"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-transparent to-transparent" />
                    
                    <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                      <div className="text-xl font-black tracking-tighter italic">Default</div>
                      <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/20 text-[9px] uppercase font-black px-2 py-1 leading-none">
                        Clássico
                      </Badge>
                    </div>
                </div>
              </div>

              <div className="flex justify-center gap-2 mt-6">
                <div className="w-6 h-1 rounded-full bg-primary" />
                <div className="w-1.5 h-1 rounded-full bg-white/20" />
                <div className="w-1.5 h-1 rounded-full bg-white/20" />
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center gap-4">
            <div className="text-[11px] font-bold text-white/40">
              Tema selecionado: <span className="text-white font-black uppercase">Default</span>
            </div>

            <Button 
              onClick={handleNextToGiftType}
              className="w-full max-w-[260px] bg-primary hover:bg-primary/90 h-12 rounded-xl font-black text-sm shadow-2xl shadow-primary/20 active:scale-95 transition-all"
            >
              Próximo
            </Button>
          </div>
        </div>
      )}

      {step === 'gift-type' && (
        <div className="relative z-10 container mx-auto px-4 pt-12 pb-16 max-w-4xl min-h-[calc(100vh-80px)] flex flex-col items-center">
          <div className="w-full max-w-2xl">
             <button 
              onClick={handleBack}
              className="group flex items-center gap-2 text-white/40 hover:text-white transition-colors text-[11px] font-bold mb-8 w-fit"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Voltar
            </button>

            <div className="space-y-2 mb-10">
              <h2 className="text-3xl font-black tracking-tight">
                Que tipo de presente vamos criar?
              </h2>
              <p className="text-sm text-white/40 font-medium">
                Escolha para quem é o presente e personalizamos tudo para você.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
            {/* Presente de Amor */}
            <div 
              onClick={() => setSelectedGiftType('amor')}
              className={cn(
                "relative group cursor-pointer border rounded-2xl p-6 transition-all duration-300 md:col-span-2",
                selectedGiftType === 'amor' ? "border-primary bg-primary/5 ring-1 ring-primary/20" : "border-white/10 bg-white/5 hover:border-white/20"
              )}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest text-white flex items-center gap-1 shadow-lg">
                <Star className="w-2 h-2 fill-current" /> MAIS POPULAR
              </div>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-primary font-black text-sm italic">
                    <Heart className="w-4 h-4 fill-current" /> Presente de Amor
                  </div>
                  <p className="text-[11px] text-white/50 font-medium">Para namorado(a) ou cônjuge</p>
                  <div className="inline-flex items-center gap-1 bg-white/5 text-[8px] font-bold px-1.5 py-0.5 rounded mt-2 uppercase text-white/60 border border-white/5">
                    + Módulo Adicional
                  </div>
                </div>
              </div>
            </div>

            {/* Presente para Bestie */}
            <div 
               onClick={() => setSelectedGiftType('bestie')}
               className={cn(
                "group cursor-pointer border rounded-2xl p-6 transition-all duration-300",
                selectedGiftType === 'bestie' ? "border-primary bg-primary/5 ring-1 ring-primary/20" : "border-white/10 bg-white/5 hover:border-white/20"
              )}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-white font-black text-sm italic">
                  <Users className="w-4 h-4" /> Presente para Bestie
                </div>
                <p className="text-[11px] text-white/50 font-medium">Surpreenda sua bestie</p>
                <div className="inline-flex items-center gap-1 bg-white/5 text-[8px] font-bold px-1.5 py-0.5 rounded mt-2 uppercase text-white/60 border border-white/5">
                  + Módulo Adicional
                </div>
              </div>
            </div>

            {/* Dia das Mães */}
            <div 
               onClick={() => setSelectedGiftType('maes')}
               className={cn(
                "relative group cursor-pointer border rounded-2xl p-6 transition-all duration-300",
                selectedGiftType === 'maes' ? "border-primary bg-primary/5 ring-1 ring-primary/20" : "border-white/10 bg-white/5 hover:border-white/20"
              )}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#ff4da6] text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest text-white flex items-center gap-1 shadow-lg">
                <Star className="w-2 h-2 fill-current" /> DATA ESPECIAL
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-white font-black text-sm italic">
                  <Gift className="w-4 h-4" /> Dia das Mães
                </div>
                <p className="text-[11px] text-white/50 font-medium">Surpreenda a mãe mais especial da sua vida 🌸</p>
              </div>
            </div>
          </div>

          {/* Nuvem de Tags */}
          <div className="mt-12 space-y-4 w-full max-w-2xl text-center">
            <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Ou homenageie diretamente:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {['Mãe ♡', 'Pai', 'Vovó', 'Vovô', 'Titia', 'Titio', 'Mana', 'Mano', 'Filhinha', 'Filhinho', 'Dinda', 'Padrinho', 'Sogra', 'Professora', 'Chefona'].map((tag) => (
                <button 
                  key={tag}
                  className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[11px] font-bold text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-12 w-full max-w-2xl flex justify-center">
            <Button 
              onClick={handleNextToDataLocation}
              className="w-full max-w-[260px] bg-primary hover:bg-primary/90 h-12 rounded-xl font-black text-sm shadow-2xl shadow-primary/20 active:scale-95 transition-all"
            >
              Próximo
            </Button>
          </div>
        </div>
      )}

      {step === 'data-location' && (
        <div className="relative z-10 container mx-auto px-4 pt-6 pb-12 max-w-6xl">
          {/* Header Step / Progress */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex-1 max-w-xs">
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="w-[12.5%] h-full bg-primary" />
              </div>
              <div className="mt-2 text-[10px] font-black text-white/40 uppercase tracking-widest">
                Passo 1 de 8
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr_400px] gap-12 items-start">
            {/* Left Column: Form Content */}
            <div className="space-y-10">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="bg-white/5 p-2.5 rounded-xl border border-white/10">
                    <CalendarIcon className="w-5 h-5 text-white/80" />
                  </div>
                  <h2 className="text-3xl font-black tracking-tight">Data e localização</h2>
                </div>
                <p className="text-sm text-white/40 font-medium">
                  Informe quando e onde esse momento especial aconteceu.
                </p>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-[11px] font-black uppercase tracking-wider text-white/60 flex items-center gap-2">
                    <Clock className="w-3 h-3" /> Quando essa história de amor começou? <span className="text-primary">*</span>
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="relative w-full text-left group">
                        <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-hover:text-primary transition-colors z-10 pointer-events-none" />
                        <div className="bg-white/5 border border-white/10 h-14 pl-12 pr-4 rounded-xl text-sm font-medium flex items-center group-hover:border-primary/50 transition-all">
                          {date ? format(date, "PPP", { locale: ptBR }) : <span className="text-white/20">Selecione uma data</span>}
                        </div>
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 border-none bg-transparent" align="start">
                      <Calendar
                        selected={date}
                        onSelect={setDate}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-3">
                  <Label className="text-[11px] font-black uppercase tracking-wider text-white/60 flex items-center gap-2">
                    <MapPin className="w-3 h-3" /> Onde foi? <span className="text-white/30 font-medium">(opcional)</span>
                  </Label>
                  <div className="relative group" ref={suggestionsRef}>
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-primary transition-colors" />
                    <Input 
                      value={locationQuery}
                      onChange={(e) => {
                        setLocationQuery(e.target.value);
                        setShowSuggestions(true);
                      }}
                      onFocus={() => setShowSuggestions(true)}
                      placeholder="Pesquisar cidade ou lugar..." 
                      className="bg-white/5 border-white/10 h-14 pl-12 rounded-xl text-sm font-medium focus:border-primary/50 transition-all"
                    />
                    
                    {/* Suggestions Dropdown */}
                    {showSuggestions && filteredCities.length > 0 && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden z-[100] shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl">
                        {filteredCities.map((city) => (
                          <button
                            key={city}
                            onClick={() => {
                              setLocationQuery(city);
                              setShowSuggestions(false);
                            }}
                            className="w-full text-left px-4 py-3.5 text-xs font-bold hover:bg-primary/10 hover:text-primary transition-all border-b border-white/5 last:border-0 flex items-center gap-3 group/item"
                          >
                            <Search className="w-3 h-3 text-white/20 group-hover/item:text-primary transition-colors" />
                            {city}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <p className="text-[10px] font-bold text-white/20 flex items-center gap-1.5 px-1">
                    <Plus className="w-3 h-3" /> Usado no Mapa Astral e Curiosidades
                  </p>
                </div>
              </div>

              {/* Contagem Style Selection */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-sm font-black tracking-tight">Como mostrar a contagem</h3>
                  <p className="text-[11px] text-white/40 font-medium">Escolha como a data será exibida na página.</p>
                </div>

                <RadioGroup 
                  defaultValue="padrao" 
                  value={selectedCountStyle}
                  onValueChange={setSelectedCountStyle}
                  className="grid grid-cols-1 md:grid-cols-3 gap-3"
                >
                  {[
                    { id: 'padrao', label: 'Padrão', icon: Clock },
                    { id: 'classico', label: 'Clássico', icon: Layout },
                    { id: 'simples', label: 'Simples', icon: Hash },
                    { id: 'data-grande', label: 'Data Grande', icon: CalendarIcon },
                    { id: 'dias-grandes', label: 'Dias Grandes', icon: Hash },
                  ].map((style) => (
                    <Label
                      key={style.id}
                      className={cn(
                        "relative flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-300",
                        selectedCountStyle === style.id 
                          ? "border-primary bg-primary/5 ring-1 ring-primary/20" 
                          : "border-white/5 bg-white/5 hover:border-white/10"
                      )}
                    >
                      <RadioGroupItem value={style.id} className="sr-only" />
                      <div className={cn(
                        "w-4 h-4 rounded-full border flex items-center justify-center transition-colors",
                        selectedCountStyle === style.id ? "border-primary bg-primary" : "border-white/20 bg-transparent"
                      )}>
                        {selectedCountStyle === style.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      <style.icon className={cn("w-4 h-4", selectedCountStyle === style.id ? "text-primary" : "text-white/40")} />
                      <span className="text-xs font-black">{style.label}</span>
                    </Label>
                  ))}
                </RadioGroup>
              </div>

              {/* Footer Buttons - Desktop only here */}
              <div className="hidden lg:flex flex-col sm:flex-row items-center gap-4 pt-8 border-t border-white/5">
                <Button 
                  onClick={handleBack}
                  variant="outline" 
                  className="w-full sm:w-auto px-8 h-12 rounded-xl border-white/10 bg-white/5 font-black text-sm hover:bg-white/10 transition-all flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" /> Voltar etapa
                </Button>
                <Button 
                  className="w-full sm:flex-1 h-12 rounded-xl bg-[#2a2a2a] text-white/90 font-black text-sm hover:bg-[#333] transition-all flex items-center justify-center gap-2"
                >
                  Próxima etapa <ChevronRight className="w-4 h-4" />
                </Button>
              </div>

              <div className="hidden lg:flex justify-center">
                 <p className="text-[10px] font-medium text-white/20 italic">
                  ✏️ Você poderá editar isso após a compra
                </p>
              </div>
            </div>

            {/* Right Column: Preview (Referência) */}
            <div className="lg:sticky lg:top-12 flex flex-col items-center mt-12 lg:mt-0">
               <div className="w-full max-w-[280px]">
                  <div className="mb-4 text-center">
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Prévia em tempo real</p>
                  </div>

                  {/* Browser-like Mockup */}
                  <div className="bg-[#1a1a1a] rounded-t-2xl border-x border-t border-white/10 p-2.5 flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-red-500/20" />
                      <div className="w-2 h-2 rounded-full bg-yellow-500/20" />
                      <div className="w-2 h-2 rounded-full bg-green-500/20" />
                    </div>
                    <div className="flex-1 bg-black/40 rounded-full h-5 flex items-center px-3 gap-2">
                      <div className="w-2 h-2 text-white/20">🔒</div>
                      <div className="text-[8px] font-medium text-white/40 truncate">heartzzu.com/...</div>
                    </div>
                  </div>
                  
                  <div className="relative aspect-[9/19] bg-black border-x border-b border-white/10 rounded-b-[2rem] overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-[#0c0c0c]">
                      {/* Fake Content Skeleton / Actual Content */}
                      <div className="absolute inset-0 flex flex-col items-center pt-10 px-6 gap-4 overflow-y-auto hide-scrollbar">
                        {/* Fake Image */}
                        <div className="w-full aspect-square bg-white rounded-2xl relative overflow-hidden">
                           <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-10 h-1.5 bg-black/5 rounded-full" />
                        </div>
                        
                        {/* Counter Section */}
                        {date && timeDiff ? (
                          <div className="w-full space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700 pt-2">
                            {selectedCountStyle === 'classico' ? (
                              <div className="text-center space-y-4">
                                <p className="text-[11px] font-bold leading-relaxed px-2 text-white">
                                  Uau, estão juntos há {timeDiff.years.toString().padStart(2, '0')} anos {timeDiff.months.toString().padStart(2, '0')} meses {timeDiff.days.toString().padStart(2, '0')} dias {timeDiff.hours.toString().padStart(2, '0')} horas {timeDiff.minutes.toString().padStart(2, '0')} minutos {timeDiff.seconds.toString().padStart(2, '0')} segundos ❤️🔥
                                </p>
                                <p className="text-[9px] font-bold text-white/90">
                                  Desde {format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                                </p>
                                {/* Fake Text Lines below as per image */}
                                <div className="space-y-2 w-full flex flex-col items-center pt-2">
                                  <div className="h-1.5 w-3/4 bg-white/10 rounded-full" />
                                  <div className="h-1.5 w-2/3 bg-white/5 rounded-full" />
                                  <div className="h-1.5 w-1/2 bg-white/5 rounded-full" />
                                </div>
                              </div>
                            ) : (
                              <>
                                <div className="text-center">
                                  <p className="text-[8px] font-black text-white/30 tracking-[0.2em] uppercase">UAU, ESTÃO JUNTOS HÁ</p>
                                </div>
                                
                                <div className="grid grid-cols-3 gap-1.5">
                                  {[
                                    { val: timeDiff.years, label: 'ANOS' },
                                    { val: timeDiff.months, label: 'MESES' },
                                    { val: timeDiff.days, label: 'DIAS' },
                                    { val: timeDiff.hours, label: 'HORAS' },
                                    { val: timeDiff.minutes, label: 'MINUTOS' },
                                    { val: timeDiff.seconds, label: 'SEGUNDOS' },
                                  ].map((item, i) => (
                                    <div key={i} className="bg-white/5 border border-white/5 rounded-xl py-2.5 flex flex-col items-center justify-center">
                                      <span className="text-base font-black leading-none">{item.val.toString().padStart(2, '0')}</span>
                                      <span className="text-[5px] font-bold text-white/30 mt-1 uppercase tracking-wider">{item.label}</span>
                                    </div>
                                  ))}
                                </div>

                                <div className="text-center pt-2">
                                  <p className="text-[7px] font-medium text-white/40 italic">
                                    Desde {format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                                  </p>
                                </div>

                                {/* Fake Text Lines for Padrao */}
                                <div className="space-y-2 w-full flex flex-col items-center pt-2">
                                  <div className="h-1.5 w-3/4 bg-white/10 rounded-full animate-pulse" />
                                  <div className="h-1.5 w-1/2 bg-white/5 rounded-full animate-pulse" />
                                </div>
                              </>
                            )}
                          </div>
                        ) : (
                          <div className="w-full flex flex-col items-center gap-4">
                            {/* Fake Text Lines when no date */}
                            <div className="space-y-2 w-full flex flex-col items-center">
                              <div className="h-2 w-3/4 bg-white/10 rounded-full animate-pulse" />
                              <div className="h-1.5 w-1/2 bg-white/5 rounded-full animate-pulse" />
                            </div>
                            <div className="w-full h-32 bg-white/5 rounded-2xl animate-pulse mt-4 flex items-center justify-center">
                               <p className="text-[8px] font-bold text-white/10 uppercase tracking-widest">Aguardando data...</p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Music Player Mockup Expansível */}
                      <div 
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsPlayerExpanded(!isPlayerExpanded);
                        }}
                        className={cn(
                          "absolute bottom-6 inset-x-4 bg-[#0e0e0e] border border-white/5 rounded-[20px] transition-all duration-500 cursor-pointer overflow-hidden p-3",
                          isPlayerExpanded ? "h-[185px] pb-5" : "h-[62px]"
                        )}
                      >
                        {/* Header Sempre Visível */}
                        <div className="flex items-center justify-between">
                          <div className={cn(
                            "bg-[#1a1a1a] rounded-xl flex items-center justify-center text-white transition-all duration-500",
                            isPlayerExpanded ? "w-12 h-12" : "w-9 h-9"
                          )}>
                            <Music2 className={isPlayerExpanded ? "w-5 h-5" : "w-4 h-4"} />
                          </div>
                          <div className={cn(
                            "text-white/40 transition-transform duration-500",
                            isPlayerExpanded && "rotate-180"
                          )}>
                            <ChevronUp className="w-4 h-4" />
                          </div>
                        </div>

                        {/* Conteúdo Expansível */}
                        <div className={cn(
                          "mt-4 transition-all duration-500 space-y-4",
                          isPlayerExpanded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
                        )}>
                          {/* Progress Bar */}
                          <div className="space-y-2">
                            <div className="w-full h-[2px] bg-[#222] relative overflow-hidden">
                              <div className="absolute left-0 top-0 h-full w-[30%] bg-white/30" />
                            </div>
                            <div className="flex justify-between text-[8px] font-bold text-white/20 uppercase tracking-widest">
                              <span>0:00</span>
                              <span>0:00</span>
                            </div>
                          </div>

                          {/* Bottom Controls */}
                          <div className="flex items-center justify-between px-1">
                            <div className="text-white/60">
                              <Volume2 className="w-4 h-4" />
                            </div>
                            
                            <div className="w-11 h-11 bg-primary rounded-full flex items-center justify-center text-white shadow-lg shadow-primary/20 active:scale-90 transition-transform">
                              <Play className="w-5 h-5 fill-white ml-0.5" />
                            </div>

                            <div className="w-4" /> {/* Spacer */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Navigation Buttons + Edit Notice - Mobile only here */}
                  <div className="lg:hidden mt-8 space-y-6">
                    <div className="flex flex-col gap-3">
                      <Button 
                        onClick={handleBack}
                        variant="outline" 
                        className="w-full h-14 rounded-xl border-white/10 bg-white/5 font-black text-sm hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                      >
                        <ChevronLeft className="w-4 h-4" /> Voltar etapa
                      </Button>
                      <Button 
                        className="w-full h-14 rounded-xl bg-[#2a2a2a] text-white/90 font-black text-sm hover:bg-[#333] transition-all flex items-center justify-center gap-2"
                      >
                        Próxima etapa <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="flex justify-center pb-4">
                      <p className="text-[10px] font-medium text-white/20 italic flex items-center gap-1.5">
                        <span className="not-italic">✏️</span> Você poderá editar isso após a compra
                      </p>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
