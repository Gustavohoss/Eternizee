'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import { 
  Heart, 
  ChevronRight, 
  Star, 
  Play, 
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
  Volume2,
  AlertCircle,
  Palette,
  Globe,
  LogIn,
  Sparkles,
  Ban,
  Type,
  Plus,
  X,
  Smile,
  Leaf,
  Dog,
  PartyPopper,
  Image as ImageIcon,
  Upload,
  Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { format, intervalToDuration } from 'date-fns';
import { ptBR } from 'date-fns/locale';

type Step = 'landing' | 'theme-selection' | 'gift-type' | 'customize-background' | 'photos' | 'data-location' | 'page-title';

const MOCK_CITIES = [
  "São Paulo, SP", "Rio de Janeiro, RJ", "Belo Horizonte, MG", 
  "Curitiba, PR", "Florianópolis, SC", "Salvador, BA", 
  "Fortaleza, CE", "Brasília, DF", "Porto Alegre, RS", 
  "Recife, PE", "Manaus, AM", "Goiânia, GO"
];

const EMOJI_CATEGORIES = [
  { 
    id: 'smiles', 
    icon: Smile, 
    emojis: ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣', '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤗', '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑', '😬', '🙄', '😯', '😦', '😧', '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '🤐', '🥴', '🤢', '🤮', '🤧', '😷', '🤒', '🤕', '🤑', '🤠'] 
  },
  { 
    id: 'love', 
    icon: Heart, 
    emojis: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '💍', '💎', '💌', '💒', '💏', '💑'] 
  },
  { 
    id: 'nature', 
    icon: Leaf, 
    emojis: ['🌸', '🌼', '🌻', '🌹', '🌷', '🌿', '☘️', '🍀', '🍁', '🍂', '🍃', '🍄', '🌵', '🌴', '🌲', '🌳', '🌊', '☀️', '🌤️', '☁️', '🌦️', '🌧️', '⛈️', '🌩️', '❄️', '☃️', '⛄', '🌬️', '💨', '🔥', '💧', '🫧', '🌈', '⭐', '🌟', '✨', '🌙', '🌚'] 
  },
  { 
    id: 'animals', 
    icon: Dog, 
    emojis: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🐤', '🦆', '🦅', '🦉', '🦇', '🐺', '🐗', '🐴', '🦄', '🐝', '🐛', '🦋', '🐌', '🐞', '🐜', '🦗', '🕷️', '🦂', '🐢', '🐍', '🦎', '🐙', '🦑', '🦐', '🦞', '🦀', '🐡', '🐠', '🐟', '🐬', '🐳', '🐋', '🦈', '🐊', '🐅', '🐆', '🦓', '🦍', '🦧', '🐘', '🦛', '🦏', '🐪', '🐫', '🦒', '🦘', '🐄', '🐎', '🐖', '🐏', '🐑', '🐐', '🦌', '🐕', '🐩', '🐈', '🐓', '🦃', '🦚', '🦜', '🦢', '🦩', '🕊️', '🐇', '🦝', '🦨', '🦡', '🦦', '🦥', '🐿️', '🦔', '🐾', '🐉', '🐲'] 
  },
  { 
    id: 'party', 
    icon: PartyPopper, 
    emojis: ['🎈', '🎆', '🎇', '🧨', '✨', '🎉', '🎊', '🎁', '🎂', '🍰', '🧁', '🍦', '🍪', '🍬', '🍭', '🍫', '🍩', '🥤', '🧋', '🍻', '🥂', '🍷', '🍸', '🍹', '🥃', '🍾', '🍕', '🍔', '🍟', '🌭', '🌮', '🌯', '🍳', '🥘', '🍲', '🥣', '🥗', '🍿', '🍱', '🍘', '🍙', '🍚', '🍛', '🍜', '🍝', '🍠', '🍢', '🍣', '🍤', '🍥', '🥮', '🍡', '🥟', '🥠', '🥡'] 
  }
];

export default function EternizeApp() {
  const [step, setStep] = useState<Step>('landing');
  const [selectedGiftType, setSelectedGiftType] = useState<string>('amor');
  const [selectedBgColor, setSelectedBgColor] = useState<string>('#008ED4');
  const [selectedEffect, setSelectedEffect] = useState<string>('none');
  const [selectedEmojis, setSelectedEmojis] = useState<string[]>(['❤️']);
  const [emojiSize, setEmojiSize] = useState<number>(20);
  const [selectedCountStyle, setSelectedCountStyle] = useState<string>('padrao');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [pageTitle, setPageTitle] = useState<string>('');
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const [isPlayerExpanded, setIsPlayerExpanded] = useState(false);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  
  // Real-time counter state
  const [timeDiff, setTimeDiff] = useState<{
    years: number;
    months: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
  } | null>(null);

  // Location States
  const [locationQuery, setLocationQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Canvas Color Picker Refs
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [hue, setHue] = useState(200);
  const isDragging = useRef(false);

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

  const handleNextToCustomizeBackground = () => {
    setStep('customize-background');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextToPhotos = () => {
    setStep('photos');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextToDataLocation = () => {
    setStep('data-location');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextToPageTitle = () => {
    setStep('page-title');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    if (step === 'theme-selection') setStep('landing');
    if (step === 'gift-type') setStep('theme-selection');
    if (step === 'customize-background') setStep('gift-type');
    if (step === 'photos') setStep('customize-background');
    if (step === 'data-location') setStep('photos');
    if (step === 'page-title') setStep('data-location');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleEmoji = (emoji: string) => {
    if (selectedEmojis.includes(emoji)) {
      if (selectedEmojis.length > 1) {
        setSelectedEmojis(selectedEmojis.filter(e => e !== emoji));
      }
    } else {
      if (selectedEmojis.length < 3) {
        setSelectedEmojis([...selectedEmojis, emoji]);
      }
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedPhotos(prev => [...prev, reader.result as string].slice(0, 4));
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index: number) => {
    setUploadedPhotos(prev => prev.filter((_, i) => i !== index));
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
        setTimeDiff({ years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
        return;
      }
      const duration = intervalToDuration({ start: date, end: now });
      const msTotal = now.getTime() - date.getTime();
      
      setTimeDiff({
        years: duration.years || 0,
        months: duration.months || 0,
        days: duration.days || 0,
        hours: duration.hours || 0,
        minutes: duration.minutes || 0,
        seconds: duration.seconds || 0,
        milliseconds: msTotal % 1000,
      });
    };

    updateCounter();
    const interval = setInterval(updateCounter, 50);
    return () => clearInterval(interval);
  }, [date]);

  // Color Picker Logic
  useEffect(() => {
    if (step !== 'customize-background') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const drawSpectrum = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      
      ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const whiteGrad = ctx.createLinearGradient(0, 0, canvas.width, 0);
      whiteGrad.addColorStop(0, 'rgba(255,255,255,1)');
      whiteGrad.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = whiteGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const blackGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      blackGrad.addColorStop(0, 'rgba(0,0,0,0)');
      blackGrad.addColorStop(1, 'rgba(0,0,0,1)');
      ctx.fillStyle = blackGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const updateColorFromPos = (x: number, y: number) => {
      const canvasX = Math.max(0, Math.min(x, canvas.width - 1));
      const canvasY = Math.max(0, Math.min(y, canvas.height - 1));

      if (cursorRef.current) {
        cursorRef.current.style.left = canvasX + 'px';
        cursorRef.current.style.top = canvasY + 'px';
      }

      const pixel = ctx.getImageData(canvasX, canvasY, 1, 1).data;
      const r = pixel[0];
      const g = pixel[1];
      const b = pixel[2];
      const hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
      setSelectedBgColor(hex.toUpperCase());
    };

    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging.current) return;
      const rect = canvas.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      updateColorFromPos(x, y);
    };

    const handleDown = (e: MouseEvent | TouchEvent) => {
      isDragging.current = true;
      handleMove(e);
    };

    const handleUp = () => {
      isDragging.current = false;
    };

    drawSpectrum();
    
    if (cursorRef.current && !cursorRef.current.style.left) {
      updateColorFromPos(canvas.width - 1, 30);
    }

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousedown', handleDown as any);
      container.addEventListener('touchstart', handleDown as any);
    }
    window.addEventListener('mousemove', handleMove as any);
    window.addEventListener('touchmove', handleMove as any);
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('touchend', handleUp);

    return () => {
      if (container) {
        container.removeEventListener('mousedown', handleDown as any);
        container.removeEventListener('touchstart', handleDown as any);
      }
      window.removeEventListener('mousemove', handleMove as any);
      window.removeEventListener('touchmove', handleMove as any);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchend', handleUp);
    };
  }, [step, hue]);

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

  const raindrops = useMemo(() => {
    return [...Array(20)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      duration: `${Math.random() * 3 + 2}s`,
      delay: `${Math.random() * 5}s`,
      opacity: Math.random() * 0.5 + 0.3,
      emoji: selectedEmojis[Math.floor(Math.random() * selectedEmojis.length)]
    }));
  }, [selectedEmojis]);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-white relative overflow-x-hidden font-body">
      <div className="fixed inset-0 bg-hero-glow pointer-events-none z-0" />

      <div className="fixed inset-x-0 top-0 z-[100] bg-[#3d0b17] border-b border-white/5 py-1.5 md:py-2 text-center text-[10px] md:text-xs font-medium flex items-center justify-center gap-4">
        <div className="bg-white/10 px-2 py-0.5 rounded border border-white/20 text-[9px] md:text-[10px] font-black uppercase">50% OFF</div>
        <p className="tracking-tight">
          ✨ Apenas hoje — Todos os planos com <span className="font-black">50% OFF</span> de desconto!{' '}
          <span className="underline cursor-pointer hover:text-white/80 font-bold ml-1">Ver planos ›</span>
        </p>
      </div>

      {step === 'landing' && (
        <>
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
              <Button 
                onClick={handleStart}
                className="bg-primary hover:bg-primary/90 rounded-full px-4 h-7 text-[10px] font-bold shadow-lg shadow-primary/20 transition-all active:scale-95"
              >
                Criar minha página
              </Button>
            </div>
          </header>

          <main className="relative z-10 container mx-auto px-4 pt-2 md:pt-4 pb-12">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center max-w-5xl mx-auto">
              <div className="space-y-4 md:space-y-6">
                <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1 text-[10px] font-bold text-white/70 backdrop-blur-sm">
                  <span className="text-primary text-sm">✨</span> Crie em 5 minutos
                </div>

                <div className="space-y-2 md:space-y-3">
                  <h1 className="text-3xl md:text-[68px] font-black leading-[1.1] md:leading-[1] tracking-tight">
                    Declare seu amor<br />
                    <span className="text-primary italic inline-block transform -skew-x-6">para quem você ama!</span>
                  </h1>
                  <p className="text-xs md:text-sm text-white/40 font-medium leading-relaxed max-w-md">
                    Crie um presente digital com fotos, música e textos personalizados para surpreender quem você ama de um jeito inesquecível.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Button 
                    onClick={handleStart}
                    size="lg" 
                    className="bg-primary hover:bg-primary/90 h-10 md:h-12 rounded-xl px-6 md:px-8 text-xs md:text-sm font-black flex items-center justify-center gap-3 shadow-2xl shadow-primary/30 active:scale-95 transition-all"
                  >
                    <Heart className="w-4 h-4 fill-current" />
                    Quero criar agora! ❤️
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-4 pt-4 md:pt-6 border-t border-white/5">
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
                <div className="relative w-full max-w-[180px] md:max-w-[240px]">
                  <div className="relative aspect-[9/19] rounded-[2rem] md:rounded-[2.5rem] border-[4px] md:border-[6px] border-[#1a1a1a] bg-black overflow-hidden shadow-2xl ring-1 ring-white/10">
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

                    <div className="absolute inset-x-0 bottom-0 p-4 md:p-5 space-y-2 md:space-y-3">
                      <div className="flex items-center gap-1 text-[7px] md:text-[8px] font-black tracking-widest text-white/90">
                        <Heart className="w-2 h-2 text-primary fill-primary" />
                        ETERNIZE ORIGINAL
                      </div>
                      <h2 className="text-lg md:text-xl font-black leading-none uppercase italic tracking-tighter">
                        Eu te amo<br />para sempre!
                      </h2>
                      <div className="flex items-center gap-2 text-[8px] md:text-[9px] font-black">
                        <span className="text-[#46d369]">99% compatível</span>
                        <span className="text-white/60">2024</span>
                        <span className="border border-white/40 px-1 rounded-[2px] text-[6px] md:text-[7px]">L</span>
                        <span className="text-white/60 tracking-tighter uppercase">HD</span>
                      </div>
                      <p className="text-[8px] md:text-[9px] text-white/50 font-medium leading-tight line-clamp-2">
                        Hoje não é nenhuma data especial, mas eu só queria dizer o quanto você é importante na minha vida...
                      </p>
                      <Button variant="secondary" size="sm" className="w-full h-7 md:h-8 bg-white text-black font-black text-[9px] md:text-[10px] gap-2 hover:bg-white/90 rounded-sm">
                        <Play className="w-2.5 h-2.5 md:w-3 h-3 fill-current" /> Reproduzir
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </>
      )}

      {step === 'theme-selection' && (
        <div className="relative z-10 container mx-auto px-4 pt-16 md:pt-20 pb-16 max-w-3xl min-h-[calc(100vh-80px)] flex flex-col justify-center">
          <button 
            onClick={handleBack}
            className="group flex items-center gap-2 text-white/40 hover:text-white transition-colors text-[10px] md:text-[11px] font-bold mb-6 md:mb-8 w-fit mx-auto md:mx-0"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Voltar
          </button>
          <div className="space-y-2 mb-8 md:mb-10 text-center">
            <h2 className="text-2xl md:text-3xl font-black tracking-tight">
              Qual tema você quer usar?
            </h2>
            <p className="text-xs md:text-sm text-white/40 font-medium">
              Escolha o estilo da página e personalizamos tudo para você.
            </p>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-[220px] md:max-w-[260px] group cursor-pointer" onClick={handleNextToGiftType}>
              <div className="absolute -inset-4 bg-primary/20 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="relative bg-[#0c0c0c] border border-white/10 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl ring-1 ring-white/5 transition-transform hover:scale-[1.02]">
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
                      <div className="text-lg md:text-xl font-black tracking-tighter italic">Default</div>
                      <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/20 text-[8px] md:text-[9px] uppercase font-black px-2 py-1 leading-none">
                        Clássico
                      </Badge>
                    </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 md:mt-10 flex flex-col items-center gap-4">
            <Button 
              onClick={handleNextToGiftType}
              className="w-full max-w-[220px] md:max-w-[260px] bg-primary hover:bg-primary/90 h-10 md:h-12 rounded-xl font-black text-xs md:text-sm shadow-2xl shadow-primary/20 active:scale-95 transition-all"
            >
              Próximo
            </Button>
          </div>
        </div>
      )}

      {step === 'gift-type' && (
        <div className="relative z-10 container mx-auto px-4 pt-16 md:pt-20 pb-16 max-w-4xl min-h-[calc(100vh-80px)] flex flex-col items-center">
          <div className="w-full max-w-2xl text-center md:text-left">
             <button 
              onClick={handleBack}
              className="group flex items-center gap-2 text-white/40 hover:text-white transition-colors text-[10px] md:text-[11px] font-bold mb-6 md:mb-8 w-fit mx-auto md:mx-0"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Voltar
            </button>
            <div className="space-y-2 mb-8 md:mb-10 text-center">
              <h2 className="text-2xl md:text-3xl font-black tracking-tight">
                Que tipo de presente vamos criar?
              </h2>
              <p className="text-xs md:text-sm text-white/40 font-medium">
                Escolha para quem é o presente e personalizamos tudo para você.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 w-full max-w-2xl">
            <div 
              onClick={() => setSelectedGiftType('amor')}
              className={cn(
                "relative group cursor-pointer border rounded-2xl p-5 md:p-6 transition-all duration-300 md:col-span-2",
                selectedGiftType === 'amor' ? "border-primary bg-primary/5 ring-1 ring-primary/20" : "border-white/10 bg-white/5 hover:border-white/20"
              )}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-[7px] md:text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest text-white flex items-center gap-1 shadow-lg">
                <Star className="w-2 h-2 fill-current" /> MAIS POPULAR
              </div>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-primary font-black text-xs md:text-sm italic">
                    <Heart className="w-3.5 h-3.5 md:w-4 md:h-4 fill-current" /> Presente de Amor
                  </div>
                  <p className="text-[10px] md:text-[11px] text-white/50 font-medium">Para namorado(a) ou cônjuge</p>
                </div>
              </div>
            </div>
            <div 
               onClick={() => setSelectedGiftType('bestie')}
               className={cn(
                "group cursor-pointer border rounded-2xl p-5 md:p-6 transition-all duration-300",
                selectedGiftType === 'bestie' ? "border-primary bg-primary/5 ring-1 ring-primary/20" : "border-white/10 bg-white/5 hover:border-white/20"
              )}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-white font-black text-xs md:text-sm italic">
                  <Users className="w-3.5 h-3.5 md:w-4 md:h-4" /> Presente para Bestie
                </div>
                <p className="text-[10px] md:text-[11px] text-white/50 font-medium">Surpreenda sua bestie</p>
              </div>
            </div>
            <div 
               onClick={() => setSelectedGiftType('maes')}
               className={cn(
                "relative group cursor-pointer border rounded-2xl p-5 md:p-6 transition-all duration-300",
                selectedGiftType === 'maes' ? "border-primary bg-primary/5 ring-1 ring-primary/20" : "border-white/10 bg-white/5 hover:border-white/20"
              )}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#ff4da6] text-[7px] md:text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest text-white flex items-center gap-1 shadow-lg">
                <Star className="w-2 h-2 fill-current" /> DATA ESPECIAL
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-white font-black text-xs md:text-sm italic">
                  <Gift className="w-3.5 h-3.5 md:w-4 md:h-4" /> Dia das Mães
                </div>
                <p className="text-[10px] md:text-[11px] text-white/50 font-medium">Surpreenda a mãe mais especial da sua vida 🌸</p>
              </div>
            </div>
          </div>
          <div className="mt-10 md:mt-12 w-full max-w-2xl flex justify-center">
            <Button 
              onClick={handleNextToCustomizeBackground}
              className="w-full max-w-[220px] md:max-w-[260px] bg-primary hover:bg-primary/90 h-11 md:h-12 rounded-xl font-black text-xs md:text-sm shadow-2xl shadow-primary/20 active:scale-95 transition-all"
            >
              Próximo
            </Button>
          </div>
        </div>
      )}

      {(step === 'customize-background' || step === 'photos' || step === 'data-location' || step === 'page-title') && (
        <div className="relative z-10 container mx-auto px-4 pt-16 md:pt-20 pb-12 max-w-6xl">
          <div className="flex items-center justify-center mb-8 md:mb-10">
            <div className="w-full max-w-md text-center">
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className={cn(
                  "h-full bg-primary transition-all duration-500", 
                  step === 'customize-background' ? "w-[25%]" : 
                  step === 'photos' ? "w-[50%]" : 
                  step === 'data-location' ? "w-[75%]" : "w-[100%]"
                )} />
              </div>
              <div className="mt-4 text-xs md:text-sm font-black text-white/40 uppercase tracking-[0.2em]">
                Passo {step === 'customize-background' ? '1' : step === 'photos' ? '2' : step === 'data-location' ? '3' : '4'} de 4
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr_400px] gap-8 md:gap-12 items-start">
            {step === 'customize-background' && (
              <div className="space-y-8 md:space-y-10 flex flex-col items-center md:items-start">
                <div className="space-y-3 text-center md:text-left">
                  <div className="flex flex-col md:flex-row items-center gap-4">
                    <div className="bg-white/5 p-2 rounded-2xl border border-white/10">
                      <Palette className="w-5 h-5 md:w-6 md:h-6 text-white/80" />
                    </div>
                    <h2 className="text-2xl md:text-4xl font-black tracking-tight">Personalizar Fundo</h2>
                  </div>
                  <p className="text-xs md:text-base text-white/40 font-medium max-w-md">
                    Escolha a cor base e adicione efeitos especiais para sua página.
                  </p>
                </div>

                <div className="w-full max-w-md space-y-8">
                  {/* Color Picker Section */}
                  <div className="bg-[#141414] rounded-[24px] p-6 w-full shadow-[0_30px_60px_rgba(0,0,0,0.8)] border border-[#222]">
                    <span className="text-[11px] text-[#555] uppercase tracking-[1.5px] font-bold mb-3 block">Escolha a cor</span>
                    
                    <div ref={containerRef} className="w-full h-[180px] rounded-[12px] relative cursor-crosshair overflow-hidden mb-6">
                        <canvas ref={canvasRef} className="w-full h-full block spectrum-canvas" />
                        <div ref={cursorRef} className="spectrum-cursor" />
                    </div>

                    <input 
                      type="range" 
                      className="hue-slider w-full h-4 rounded-full outline-none mb-8 cursor-pointer appearance-none" 
                      min="0" 
                      max="360" 
                      value={hue}
                      onChange={(e) => setHue(parseInt(e.target.value))}
                      style={{ background: 'linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)' }}
                    />

                    <div className="flex items-end gap-3">
                        <div 
                          className="w-[50px] h-[50px] rounded-[12px] border border-[#222] shrink-0" 
                          style={{ backgroundColor: selectedBgColor }}
                        />
                        <div className="grow min-w-0">
                            <span className="text-[11px] text-[#555] uppercase tracking-[1.5px] font-bold mb-1.5 block">Hex Code</span>
                            <div className="bg-black border border-[#222] rounded-[12px] flex items-center h-[45px] overflow-hidden">
                                <input 
                                  type="text" 
                                  className="w-full bg-transparent border-none text-white font-mono text-base px-4 outline-none" 
                                  value={selectedBgColor} 
                                  readOnly 
                                />
                            </div>
                        </div>
                    </div>
                  </div>

                  {/* Effects Section */}
                  <div className="space-y-5">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-primary" />
                      <h3 className="text-[10px] md:text-sm font-black uppercase tracking-widest text-white/60">Efeitos Especiais</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div 
                        onClick={() => setSelectedEffect('none')}
                        className={cn(
                          "cursor-pointer border rounded-2xl p-5 transition-all duration-300 flex items-center gap-4",
                          selectedEffect === 'none' ? "border-primary bg-primary/5 ring-1 ring-primary/20" : "border-white/10 bg-white/5 hover:border-white/20"
                        )}
                      >
                        <div className="bg-white/5 p-2.5 rounded-xl">
                          <Ban className="w-5 h-5 text-white/40" />
                        </div>
                        <div>
                          <p className="text-[11px] font-black uppercase tracking-wider">Sem efeito</p>
                          <p className="text-[10px] text-white/40">Fundo estático</p>
                        </div>
                      </div>

                      <div 
                        onClick={() => setSelectedEffect('emoji-rain')}
                        className={cn(
                          "cursor-pointer border rounded-2xl p-5 transition-all duration-300 flex items-center gap-4",
                          selectedEffect === 'emoji-rain' ? "border-primary bg-primary/5 ring-1 ring-primary/20" : "border-white/10 bg-white/5 hover:border-white/20"
                        )}
                      >
                        <div className="bg-primary/10 p-2.5 rounded-xl">
                          <Heart className="w-5 h-5 text-primary fill-primary" />
                        </div>
                        <div>
                          <p className="text-[11px] font-black uppercase tracking-wider">Chuva de Emojis</p>
                          <p className="text-[10px] text-white/40">Emojis caindo</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Emoji Configuration (Conditional) */}
                  {selectedEffect === 'emoji-rain' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
                      <div className="space-y-4">
                        <Label className="text-[11px] font-black uppercase tracking-wider text-white/60 flex items-center justify-center md:justify-start gap-2">
                          <Heart className="w-3.5 h-3.5" /> Escolha os emojis (Até 3)
                        </Label>
                        
                        <div className="flex flex-wrap gap-2 items-center justify-center md:justify-start">
                          {selectedEmojis.map((emoji) => (
                            <div 
                              key={emoji}
                              className="group relative w-12 h-12 rounded-2xl border border-primary bg-primary/10 flex items-center justify-center text-xl shadow-lg animate-in zoom-in-50"
                            >
                              {emoji}
                              <button 
                                onClick={() => toggleEmoji(emoji)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center scale-0 group-hover:scale-100 transition-transform"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                          
                          {selectedEmojis.length < 3 && (
                            <Popover open={isEmojiPickerOpen} onOpenChange={setIsEmojiPickerOpen}>
                              <PopoverTrigger asChild>
                                <button className="w-12 h-12 rounded-2xl border border-dashed border-white/20 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/40 transition-colors">
                                  <Plus className="w-5 h-5" />
                                </button>
                              </PopoverTrigger>
                              <PopoverContent className="w-[320px] p-0 border-white/10 bg-[#141414] shadow-2xl rounded-2xl overflow-hidden" align="start">
                                <Tabs defaultValue="smiles" className="w-full">
                                  <TabsList className="w-full grid grid-cols-5 bg-black/40 rounded-none h-10">
                                    {EMOJI_CATEGORIES.map(cat => (
                                      <TabsTrigger key={cat.id} value={cat.id} className="data-[state=active]:bg-white/5">
                                        <cat.icon className="w-3.5 h-3.5" />
                                      </TabsTrigger>
                                    ))}
                                  </TabsList>
                                  {EMOJI_CATEGORIES.map(cat => (
                                    <TabsContent key={cat.id} value={cat.id} className="mt-0">
                                      <ScrollArea className="h-64 p-3">
                                        <div className="grid grid-cols-6 gap-2">
                                          {cat.emojis.map(emoji => (
                                            <button
                                              key={emoji}
                                              onClick={() => {
                                                toggleEmoji(emoji);
                                                if (selectedEmojis.length === 2) setIsEmojiPickerOpen(false);
                                              }}
                                              className={cn(
                                                "w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-all hover:bg-white/10 active:scale-90",
                                                selectedEmojis.includes(emoji) && "bg-primary/20 pointer-events-none opacity-50"
                                              )}
                                            >
                                              {emoji}
                                            </button>
                                          ))}
                                        </div>
                                      </ScrollArea>
                                    </TabsContent>
                                  ))}
                                </Tabs>
                              </PopoverContent>
                            </Popover>
                          )}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label className="text-[11px] font-black uppercase tracking-wider text-white/60 flex items-center gap-2">
                            <Type className="w-3.5 h-3.5" /> Tamanho dos Emojis
                          </Label>
                          <span className="text-[10px] font-black text-primary">{emojiSize}px</span>
                        </div>
                        <Slider 
                          value={[emojiSize]} 
                          onValueChange={(val) => setEmojiSize(val[0])}
                          min={12} 
                          max={48} 
                          step={1}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="hidden lg:flex flex-col sm:flex-row items-center gap-5 pt-10 border-t border-white/5 w-full max-w-md">
                  <Button 
                    onClick={handleBack}
                    variant="outline" 
                    className="w-full sm:w-auto px-8 h-12 rounded-xl border-white/10 bg-white/5 font-black text-sm hover:bg-white/10 transition-all flex items-center gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" /> Voltar
                  </Button>
                  <Button 
                    onClick={handleNextToPhotos}
                    className="w-full sm:flex-1 h-12 rounded-xl bg-primary text-white font-black text-sm hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                  >
                    Próxima etapa <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {step === 'photos' && (
              <div className="space-y-8 md:space-y-10 flex flex-col items-center md:items-start">
                <div className="space-y-3 text-center md:text-left">
                  <div className="flex flex-col md:flex-row items-center gap-4">
                    <div className="bg-white/5 p-2 rounded-2xl border border-white/10">
                      <ImageIcon className="w-5 h-5 md:w-6 md:h-6 text-white/80" />
                    </div>
                    <h2 className="text-2xl md:text-4xl font-black tracking-tight">As Fotos</h2>
                  </div>
                  <p className="text-xs md:text-base text-white/40 font-medium max-w-md">
                    Adicione até 4 fotos especiais para sua página.
                  </p>
                </div>

                <div className="w-full max-w-md space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    {uploadedPhotos.map((photo, i) => (
                      <div key={i} className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 group bg-white/5">
                        <Image src={photo} fill className="object-cover" alt={`Photo ${i + 1}`} />
                        <button 
                          onClick={() => removePhoto(i)}
                          className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    {uploadedPhotos.length < 4 && (
                      <label className="aspect-square rounded-2xl border-2 border-dashed border-white/10 bg-white/5 hover:bg-white/10 transition-all flex flex-col items-center justify-center gap-3 cursor-pointer group">
                        <div className="bg-white/5 p-3 rounded-full group-hover:scale-110 transition-transform">
                          <Upload className="w-6 h-6 text-white/40" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-white/30">Adicionar Foto</span>
                        <input type="file" className="hidden" accept="image/*" multiple onChange={handlePhotoUpload} />
                      </label>
                    )}
                  </div>

                  <div className="bg-[#1a1107] border border-[#452b12] p-4 rounded-2xl flex items-start gap-4">
                    <AlertCircle className="w-5 h-5 text-[#ff9900] mt-0.5 shrink-0" />
                    <p className="text-[10px] md:text-xs text-[#ff9900] font-bold leading-relaxed">
                      Dica: Fotos no formato vertical (9:16) ficam melhores na página.
                    </p>
                  </div>
                </div>

                <div className="hidden lg:flex flex-col sm:flex-row items-center gap-5 pt-10 border-t border-white/5 w-full max-w-md">
                  <Button 
                    onClick={handleBack}
                    variant="outline" 
                    className="w-full sm:w-auto px-8 h-12 rounded-xl border-white/10 bg-white/5 font-black text-sm hover:bg-white/10 transition-all flex items-center gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" /> Voltar
                  </Button>
                  <Button 
                    onClick={handleNextToDataLocation}
                    disabled={uploadedPhotos.length === 0}
                    className="w-full sm:flex-1 h-12 rounded-xl bg-primary text-white font-black text-sm hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                  >
                    Próxima etapa <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {step === 'data-location' && (
              <div className="space-y-8 md:space-y-10 flex flex-col items-center md:items-start">
                <div className="space-y-3 text-center md:text-left">
                  <div className="flex flex-col md:flex-row items-center gap-4">
                    <div className="bg-white/5 p-2 rounded-2xl border border-white/10">
                      <CalendarIcon className="w-5 h-5 md:w-6 md:h-6 text-white/80" />
                    </div>
                    <h2 className="text-2xl md:text-4xl font-black tracking-tight">Data e localização</h2>
                  </div>
                  <p className="text-xs md:text-base text-white/40 font-medium max-w-md">
                    Informe quando e onde esse momento especial aconteceu.
                  </p>
                </div>

                <div className="space-y-6 md:space-y-8 w-full max-w-md">
                  <div className="space-y-4">
                    <Label className="text-[11px] font-black uppercase tracking-wider text-white/60 flex items-center justify-center md:justify-start gap-2">
                      <Clock className="w-4 h-4" /> Quando essa história de amor começou? <span className="text-primary">*</span>
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <button className="relative w-full text-left group">
                          <CalendarIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-hover:text-primary transition-colors z-10 pointer-events-none" />
                          <div className="bg-white/5 border border-white/10 h-14 md:h-16 pl-14 pr-5 rounded-xl text-sm md:text-base font-medium flex items-center group-hover:border-primary/50 transition-all shadow-inner">
                            {date ? format(date, "PPP", { locale: ptBR }) : <span className="text-white/20">Selecione uma data</span>}
                          </div>
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 border-none bg-transparent shadow-none" align="start">
                        <Calendar
                          selected={date}
                          onSelect={setDate}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-[11px] font-black uppercase tracking-wider text-white/60 flex items-center justify-center md:justify-start gap-2">
                      <MapPin className="w-4 h-4" /> Onde foi? <span className="text-white/30 font-medium">(opcional)</span>
                    </Label>
                    <div className="relative group" ref={suggestionsRef}>
                      <Globe className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-primary transition-colors" />
                      <Input 
                        value={locationQuery}
                        onChange={(e) => {
                          setLocationQuery(e.target.value);
                          setShowSuggestions(true);
                        }}
                        onFocus={() => setShowSuggestions(true)}
                        placeholder="Pesquisar cidade ou lugar..." 
                        className="bg-white/5 border-white/10 h-14 md:h-16 pl-14 rounded-xl text-sm md:text-base font-medium focus:border-primary/50 transition-all shadow-inner"
                      />
                      {showSuggestions && filteredCities.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-3 bg-[#1a1a1a] border border-white/10 rounded-2xl overflow-hidden z-[100] shadow-[0_30px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
                          {filteredCities.map((city) => (
                            <button
                              key={city}
                              onClick={() => {
                                setLocationQuery(city);
                                setShowSuggestions(false);
                              }}
                              className="w-full text-left px-5 py-4 text-xs md:text-sm font-bold hover:bg-primary/10 hover:text-primary transition-all border-b border-white/5 last:border-0 flex items-center gap-4 group/item"
                            >
                              <Search className="w-4 h-4 text-white/20 group-hover/item:text-primary transition-colors" />
                              {city}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-5 w-full max-w-md">
                  <div className="space-y-1 text-center md:text-left">
                    <h3 className="text-sm md:text-base font-black tracking-tight">Como mostrar a contagem</h3>
                    <p className="text-[11px] text-white/40 font-medium">Escolha como a data será exibida na página.</p>
                  </div>
                  <RadioGroup 
                    defaultValue="padrao" 
                    value={selectedCountStyle}
                    onValueChange={setSelectedCountStyle}
                    className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4"
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
                          "relative flex items-center gap-4 p-4 md:p-5 rounded-2xl border cursor-pointer transition-all duration-300",
                          selectedCountStyle === style.id 
                            ? "border-primary bg-primary/5 ring-1 ring-primary/20" 
                            : "border-white/5 bg-white/5 hover:border-white/10"
                        )}
                      >
                        <RadioGroupItem value={style.id} className="sr-only" />
                        <div className={cn(
                          "w-4 h-4 md:w-5 md:h-5 rounded-full border flex items-center justify-center transition-colors",
                          selectedCountStyle === style.id ? "border-primary bg-primary" : "border-white/20 bg-transparent"
                        )}>
                          {selectedCountStyle === style.id && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                        <style.icon className={cn("w-4 h-4 md:w-5 md:h-5", selectedCountStyle === style.id ? "text-primary" : "text-white/40")} />
                        <span className="text-[11px] md:text-xs font-black">{style.label}</span>
                      </Label>
                    ))}
                  </RadioGroup>
                </div>

                <div className="hidden lg:flex flex-col sm:flex-row items-center gap-5 pt-10 border-t border-white/5 w-full max-w-md">
                  <Button 
                    onClick={handleBack}
                    variant="outline" 
                    className="w-full sm:w-auto px-8 h-12 rounded-xl border-white/10 bg-white/5 font-black text-sm hover:bg-white/10 transition-all flex items-center gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" /> Voltar etapa
                  </Button>
                  <Button 
                    onClick={handleNextToPageTitle}
                    className="w-full sm:flex-1 h-12 rounded-xl bg-primary text-white font-black text-sm hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                  >
                    Próxima etapa <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {step === 'page-title' && (
              <div className="space-y-8 md:space-y-10 flex flex-col items-center md:items-start">
                <div className="space-y-3 text-center md:text-left">
                  <div className="flex flex-col md:flex-row items-center gap-4">
                    <div className="bg-white/5 p-2 rounded-2xl border border-white/10">
                      <Heart className="w-5 h-5 md:w-6 md:h-6 text-white/80" />
                    </div>
                    <h2 className="text-2xl md:text-4xl font-black tracking-tight">Título da página</h2>
                  </div>
                  <p className="text-xs md:text-base text-white/40 font-medium max-w-md">
                    Escreva o título dedicatório para a página. Ex: João & Maria ou Feliz Aniversário ou etc!
                  </p>
                </div>

                <div className="space-y-8 w-full max-w-md">
                  <div className="space-y-4">
                    <Label className="text-[11px] font-black uppercase tracking-wider text-white/60 text-center md:text-left block">
                      Como vai se chamar a história de vocês?
                    </Label>
                    <Input 
                      value={pageTitle}
                      onChange={(e) => setPageTitle(e.target.value)}
                      placeholder="Ex: João & Maria ou Nossa Historinha" 
                      className="bg-white/5 border-white/10 h-14 md:h-16 rounded-xl text-sm md:text-base font-medium focus:border-primary/50 transition-all shadow-inner"
                    />
                  </div>

                  <div className="bg-[#1a1107] border border-[#452b12] p-4 rounded-2xl flex items-start gap-4">
                    <AlertCircle className="w-5 h-5 text-[#ff9900] mt-0.5 shrink-0" />
                    <p className="text-[10px] md:text-xs text-[#ff9900] font-bold leading-relaxed">
                      Evite usar acentos ou caracteres especiais. Use apenas letras, números e espaços.
                    </p>
                  </div>
                </div>

                <div className="hidden lg:flex flex-col sm:flex-row items-center gap-5 pt-10 border-t border-white/5 w-full max-w-md">
                  <Button 
                    onClick={handleBack}
                    variant="outline" 
                    className="w-full sm:w-auto px-8 h-12 rounded-xl border-white/10 bg-white/5 font-black text-sm hover:bg-white/10 transition-all flex items-center gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" /> Voltar etapa
                  </Button>
                  <Button 
                    className="w-full sm:flex-1 h-12 rounded-xl bg-primary text-white font-black text-sm hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                  >
                    Finalizar criação <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            <div className="lg:sticky lg:top-24 flex flex-col items-center mt-12 lg:mt-0">
               <div className="w-full max-w-[300px]">
                  <div className="mb-6 text-center">
                    <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Prévia em tempo real</p>
                  </div>

                  <div className="bg-[#1a1a1a] rounded-t-2xl border-x border-t border-white/10 p-2.5 flex items-center gap-3">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500/20" />
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/20" />
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500/20" />
                    </div>
                    <div className="flex-1 bg-black/40 rounded-full h-4 flex items-center px-3 gap-2">
                      <div className="w-2 h-2 text-white/20 text-[6px]">🔒</div>
                      <div className="text-[7px] font-medium text-white/40 truncate">heartzzu.com/...</div>
                    </div>
                  </div>
                  
                  <div className="relative aspect-[9/19] bg-black border-x border-b border-white/10 rounded-b-[2.5rem] overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 transition-colors duration-500" style={{ backgroundColor: selectedBgColor }}>
                      
                      {selectedEffect === 'emoji-rain' && (
                        <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
                          {raindrops.map((drop) => (
                            <div 
                              key={drop.id}
                              className="absolute animate-fall"
                              style={{
                                left: drop.left,
                                top: `-40px`,
                                animationDuration: drop.duration,
                                animationDelay: drop.delay,
                                opacity: drop.opacity,
                                fontSize: `${emojiSize}px`
                              }}
                            >
                              {drop.emoji}
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="absolute inset-0 flex flex-col items-center pt-10 px-6 gap-4 md:gap-6 overflow-y-auto hide-scrollbar">
                        
                        {/* Countdown Section */}
                        {(step === 'data-location' || step === 'page-title') && date && timeDiff && (
                          <div className="w-full animate-in fade-in duration-700">
                            {selectedCountStyle === 'simples' && (
                              <div className="w-full text-center space-y-2 pb-3">
                                <div className="text-lg">⌛</div>
                                <p className="text-xs md:text-sm font-bold leading-relaxed text-white">
                                  {timeDiff.years.toString().padStart(2, '0')} anos {timeDiff.months.toString().padStart(2, '0')} meses {timeDiff.days.toString().padStart(2, '0')} dias {timeDiff.hours.toString().padStart(2, '0')} horas {timeDiff.minutes.toString().padStart(2, '0')} minutos {timeDiff.seconds.toString().padStart(2, '0')} segundos {timeDiff.milliseconds.toString().padStart(3, '0')} milissegundos
                                </p>
                              </div>
                            )}

                            {selectedCountStyle === 'classico' && (
                              <div className="text-center space-y-4 pt-3">
                                <p className="text-xs md:text-sm font-bold leading-relaxed px-2 text-white">
                                  Uau, estão juntos há {timeDiff.years.toString().padStart(2, '0')} anos {timeDiff.months.toString().padStart(2, '0')} meses {timeDiff.days.toString().padStart(2, '0')} dias {timeDiff.hours.toString().padStart(2, '0')} horas {timeDiff.minutes.toString().padStart(2, '0')} minutos {timeDiff.seconds.toString().padStart(2, '0')} segundos ❤️🔥
                                </p>
                                <p className="text-[10px] md:text-[11px] font-bold text-white/90">
                                  Desde {format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                                </p>
                              </div>
                            )}

                            {selectedCountStyle === 'padrao' && (
                              <div className="w-full space-y-4">
                                <div className="text-center">
                                  <p className="text-[8px] md:text-[10px] font-black text-white/30 tracking-[0.2em] uppercase">UAU, ESTÃO JUNTOS HÁ</p>
                                </div>
                                <div className="grid grid-cols-3 gap-2 md:gap-3">
                                  {[
                                    { val: timeDiff.years, label: 'ANOS' },
                                    { val: timeDiff.months, label: 'MESES' },
                                    { val: timeDiff.days, label: 'DIAS' },
                                    { val: timeDiff.hours, label: 'HORAS' },
                                    { val: timeDiff.minutes, label: 'MINUTOS' },
                                    { val: timeDiff.seconds, label: 'SEGUNDOS' },
                                  ].map((item, i) => (
                                    <div key={i} className="bg-white/5 border border-white/5 rounded-2xl py-3 flex flex-col items-center justify-center">
                                      <span className="text-sm md:text-lg font-black leading-none">{item.val.toString().padStart(2, '0')}</span>
                                      <span className="text-[6px] font-bold text-white/30 mt-1 uppercase tracking-wider">{item.label}</span>
                                    </div>
                                  ))}
                                </div>
                                <div className="text-center pt-2">
                                  <p className="text-[7px] md:text-[9px] font-medium text-white/40 italic">
                                    Desde {format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                                  </p>
                                </div>
                              </div>
                            )}

                            {selectedCountStyle === 'data-grande' && (
                              <div className="w-full space-y-6">
                                <div className="text-center">
                                  <div className="w-full space-y-2 mb-4 opacity-20">
                                    <div className="h-0.5 bg-white rounded-full w-[80%] mx-auto" />
                                    <div className="h-0.5 bg-white rounded-full w-[60%] mx-auto" />
                                  </div>
                                  <p className="text-[8px] md:text-[10px] font-black text-white/30 tracking-[0.2em] uppercase">UAU, ESTÃO JUNTOS HÁ</p>
                                </div>
                                <div className="bg-white/5 border border-white/10 rounded-[2.5rem] py-8 px-6 flex items-center justify-around shadow-inner">
                                  <div className="flex flex-col items-center">
                                    <span className="text-4xl font-serif font-bold leading-none">{timeDiff.years.toString().padStart(2, '0')}</span>
                                    <span className="text-[7px] font-bold text-white/30 mt-3 uppercase tracking-widest">ANOS</span>
                                  </div>
                                  <div className="w-px h-12 bg-white/10" />
                                  <div className="flex flex-col items-center">
                                    <span className="text-4xl font-serif font-bold leading-none">{timeDiff.months.toString().padStart(2, '0')}</span>
                                    <span className="text-[7px] font-bold text-white/30 mt-3 uppercase tracking-widest">MESES</span>
                                  </div>
                                  <div className="w-px h-12 bg-white/10" />
                                  <div className="flex flex-col items-center">
                                    <span className="text-4xl font-serif font-bold leading-none">{timeDiff.days.toString().padStart(2, '0')}</span>
                                    <span className="text-[7px] font-bold text-white/30 mt-3 uppercase tracking-widest">DIAS</span>
                                  </div>
                                </div>
                              </div>
                            )}

                            {selectedCountStyle === 'dias-grandes' && (
                              <div className="w-full space-y-6 pt-2">
                                <div className="text-center">
                                  <div className="w-full space-y-2 mb-4 opacity-20">
                                    <div className="h-0.5 bg-white rounded-full w-[80%] mx-auto" />
                                    <div className="h-0.5 bg-white rounded-full w-[60%] mx-auto" />
                                  </div>
                                  <p className="text-[8px] md:text-[10px] font-black text-white/30 tracking-[0.2em] uppercase">UAU, ESTÃO JUNTOS HÁ</p>
                                </div>
                                <div className="bg-white/5 border border-white/10 rounded-[2.5rem] py-10 px-6 flex flex-col items-center justify-center gap-3 shadow-inner">
                                  <span className="text-5xl font-serif font-bold leading-none tracking-tighter">
                                    {Math.floor((new Date().getTime() - date.getTime()) / (1000 * 60 * 60 * 24)).toLocaleString('pt-BR')}
                                  </span>
                                  <span className="text-[8px] font-bold text-white/30 uppercase tracking-[0.3em]">DIAS</span>
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Photos Card Section */}
                        {(step === 'photos' || step === 'data-location' || step === 'page-title') && (
                          <div className="w-full aspect-square bg-white rounded-[2rem] relative overflow-hidden shrink-0 animate-in fade-in duration-500 shadow-2xl z-20">
                            {uploadedPhotos.length > 0 ? (
                              <div className="absolute inset-0 flex transition-transform duration-500 h-[85%]">
                                <Image src={uploadedPhotos[0]} fill className="object-cover" alt="Selected Photo" />
                              </div>
                            ) : (
                              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-5">
                                <ImageIcon className="w-12 h-12 text-black" />
                                <span className="text-[8px] font-black uppercase tracking-widest text-black">Sua Foto Aqui</span>
                              </div>
                            )}
                            <div className="absolute inset-x-0 bottom-0 h-[15%] flex flex-col items-center justify-center pb-1">
                              {pageTitle ? (
                                <span className="text-black font-serif italic text-[10px] md:text-xs leading-none break-words text-center px-4 truncate max-w-full">
                                  {pageTitle}
                                </span>
                              ) : (
                                <div className="w-10 h-1 bg-black/5 rounded-full" />
                              )}
                            </div>
                          </div>
                        )}

                        {step === 'customize-background' && (
                          <div className="flex-1 flex flex-col items-center justify-center space-y-5 opacity-20">
                            <Palette className="w-12 h-12 text-white/40" />
                            <p className="text-[10px] font-black uppercase tracking-[0.4em]">Design em construção</p>
                          </div>
                        )}
                      </div>

                      {/* Music Player Mockup */}
                      {(step === 'page-title' || step === 'data-location' || step === 'photos') && (
                        <div 
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsPlayerExpanded(!isPlayerExpanded);
                          }}
                          className={cn(
                            "absolute bottom-8 inset-x-5 bg-[#0e0e0e] border border-white/5 rounded-[24px] transition-all duration-500 cursor-pointer overflow-hidden p-3 z-50",
                            isPlayerExpanded ? "h-[200px] pb-6" : "h-[64px]"
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <div className={cn(
                              "bg-[#1a1a1a] rounded-2xl flex items-center justify-center text-white transition-all duration-500",
                              isPlayerExpanded ? "w-12 h-12" : "w-10 h-10"
                            )}>
                              <Music2 className={isPlayerExpanded ? "w-6 h-6" : "w-4 h-4"} />
                            </div>
                            <div className={cn(
                              "text-white/40 transition-transform duration-500",
                              isPlayerExpanded && "rotate-180"
                            )}>
                              <ChevronUp className="w-4 h-4" />
                            </div>
                          </div>

                          <div className={cn(
                            "mt-5 transition-all duration-500 space-y-5",
                            isPlayerExpanded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"
                          )}>
                            <div className="space-y-3">
                              <div className="w-full h-[3px] bg-[#222] relative overflow-hidden rounded-full">
                                <div className="absolute left-0 top-0 h-full w-[30%] bg-white/30" />
                              </div>
                              <div className="flex justify-between text-[10px] font-bold text-white/20 uppercase tracking-widest">
                                <span>0:00</span>
                                <span>0:00</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between px-2">
                              <div className="text-white/60">
                                <Volume2 className="w-5 h-5" />
                              </div>
                              <div className="w-[45px] h-[45px] bg-primary rounded-full flex items-center justify-center text-white shadow-[0_10px_25px_rgba(0,0,0,0.6)] active:scale-95 transition-all">
                                <Play className="w-5 h-5 fill-white ml-0.5" />
                              </div>
                              <div className="w-[22px]" />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="lg:hidden mt-10 space-y-5">
                    <div className="flex flex-col gap-3">
                      <Button 
                        onClick={handleBack}
                        variant="outline" 
                        className="w-full h-12 rounded-xl border-white/10 bg-white/5 font-black text-sm hover:bg-white/10 transition-all flex items-center justify-center gap-3"
                      >
                        <ChevronLeft className="w-4 h-4" /> Voltar
                      </Button>
                      <Button 
                        onClick={
                          step === 'customize-background' ? handleNextToPhotos :
                          step === 'photos' ? handleNextToDataLocation :
                          step === 'data-location' ? handleNextToPageTitle : undefined
                        }
                        disabled={step === 'photos' && uploadedPhotos.length === 0}
                        className="w-full h-12 rounded-xl bg-primary text-white font-black text-sm hover:bg-primary/90 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-primary/20"
                      >
                        Próxima etapa <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="flex justify-center pb-6">
                      <p className="text-[10px] font-medium text-white/20 italic flex items-center gap-2">
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
