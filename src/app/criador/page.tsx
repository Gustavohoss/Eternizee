'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Heart, 
  ChevronRight, 
  Star, 
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
  Palette,
  Globe,
  LogIn,
  Sparkles,
  Ban,
  Type,
  Plus,
  X,
  ImageIcon,
  Upload,
  Trash2,
  Layers,
  Copy,
  Bold,
  Zap,
  AlignVerticalJustifyStart,
  AlignVerticalJustifyEnd
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { ColorPicker } from '@/components/eternize/color-picker';
import { EmojiPicker } from '@/components/eternize/emoji-picker';
import { DeviceMockup } from '@/components/eternize/device-mockup';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

type Step = 'theme-selection' | 'gift-type' | 'customize-background' | 'photos' | 'page-title' | 'data-location';

const MOCK_CITIES = [
  "São Paulo, SP", "Rio de Janeiro, RJ", "Belo Horizonte, MG", 
  "Curitiba, PR", "Florianópolis, SC", "Salvador, BA", 
  "Fortaleza, CE", "Brasília, DF", "Porto Alegre, RS", 
  "Recife, PE", "Manaus, AM", "Goiânia, GO"
];

const FONT_OPTIONS = [
  { id: 'dancing-script', name: 'Dancing Script', class: 'font-["Dancing_Script"]' },
  { id: 'pacifico', name: 'Pacifico', class: 'font-["Pacifico"]' },
  { id: 'playfair', name: 'Playfair Display', class: 'font-["Playfair_Display"]' },
  { id: 'inter', name: 'Inter Sans', class: 'font-["Inter"]' },
];

function getContrastColor(hexColor: string) {
  let color = hexColor.replace('#', '');
  if (color.length === 3) {
    color = color.split('').map(char => char + char).join('');
  }
  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return (yiq >= 128) ? '#111111' : '#ffffff';
}

export default function CriadorApp() {
  const [step, setStep] = useState<Step>('theme-selection');
  const [selectedGiftType, setSelectedGiftType] = useState<string>('amor');
  const [selectedBgColor, setSelectedBgColor] = useState<string>('#000000');
  const [selectedEffect, setSelectedEffect] = useState<string>('none');
  const [selectedEmojis, setSelectedEmojis] = useState<string[]>(['❤️']);
  const [emojiSize, setEmojiSize] = useState<number>(20);
  const [selectedCountStyle, setSelectedCountStyle] = useState<string>('padrao');
  const [photoEffect, setPhotoEffect] = useState<'slide' | 'coverflow' | 'cards'>('slide');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [pageTitle, setPageTitle] = useState<string>('');
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  
  // Card customization state
  const [cardColor, setCardColor] = useState<string>('#ffffff');
  const [showCard, setShowCard] = useState<boolean>(true);
  const [titlePosition, setTitlePosition] = useState<'top' | 'bottom'>('bottom');
  
  // Title customization state
  const [titleColor, setTitleColor] = useState<string>('#111111');
  const [titleFont, setTitleFont] = useState<string>('dancing-script');
  const [titleIsBold, setTitleIsBold] = useState<boolean>(false);
  const [titleHasNeon, setTitleHasNeon] = useState<boolean>(false);
  const [titleNeonStrength, setTitleNeonStrength] = useState<number>(10);
  const [userHasManuallyChangedTitleColor, setUserHasManuallyChangedTitleColor] = useState(false);
  
  // Location States
  const [locationQuery, setLocationQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const giftPreview = PlaceHolderImages.find(img => img.id === 'gift-preview');

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

  const handleNextToPageTitle = () => {
    setStep('page-title');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextToDataLocation = () => {
    setStep('data-location');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    if (step === 'theme-selection') {
      // Return to landing page
      window.location.href = '/';
      return;
    }
    if (step === 'gift-type') setStep('theme-selection');
    if (step === 'customize-background') setStep('gift-type');
    if (step === 'photos') setStep('customize-background');
    if (step === 'page-title') setStep('photos');
    if (step === 'data-location') setStep('page-title');
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
        setUploadedPhotos(prev => [...prev, reader.result as string].slice(0, 8));
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

  // Auto-contrast logic for title color
  useEffect(() => {
    if (!userHasManuallyChangedTitleColor) {
      const surfaceColor = showCard ? cardColor : selectedBgColor;
      setTitleColor(getContrastColor(surfaceColor));
    }
  }, [cardColor, selectedBgColor, showCard, userHasManuallyChangedTitleColor]);

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
      <div className="fixed inset-0 bg-hero-glow pointer-events-none z-0" />

      {/* Progress header or navigation */}
      <div className="fixed inset-x-0 top-0 z-[100] bg-[#3d0b17] border-b border-white/5 py-1.5 md:py-2 text-center text-[10px] md:text-xs font-medium flex items-center justify-center gap-4">
        <div className="bg-white/10 px-2 py-0.5 rounded border border-white/20 text-[9px] md:text-[10px] font-black uppercase">Criador</div>
        <p className="tracking-tight">Personalizando seu presente digital</p>
      </div>

      {step === 'theme-selection' && (
        <div className="relative z-10 container mx-auto px-4 pt-16 md:pt-20 pb-16 max-w-3xl min-h-[calc(100vh-80px)] flex flex-col justify-center">
          <Link href="/">
            <button className="group flex items-center gap-2 text-white/40 hover:text-white transition-colors text-[10px] md:text-[11px] font-bold mb-6 md:mb-8 w-fit mx-auto md:mx-0">
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Sair do Criador
            </button>
          </Link>
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

      {(step === 'customize-background' || step === 'photos' || step === 'page-title' || step === 'data-location') && (
        <div className="relative z-10 container mx-auto px-4 pt-16 md:pt-20 pb-12 max-w-6xl">
          <div className="flex items-center justify-center mb-8 md:mb-10">
            <div className="w-full max-w-md text-center">
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className={cn(
                  "h-full bg-primary transition-all duration-500", 
                  step === 'customize-background' ? "w-[25%]" : 
                  step === 'photos' ? "w-[50%]" : 
                  step === 'page-title' ? "w-[75%]" : "w-[100%]"
                )} />
              </div>
              <div className="mt-4 text-xs md:text-sm font-black text-white/40 uppercase tracking-[0.2em]">
                Passo {step === 'customize-background' ? '1' : step === 'photos' ? '2' : step === 'page-title' ? '3' : '4'} de 4
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
                  <ColorPicker selectedBgColor={selectedBgColor} onChange={setSelectedBgColor} />

                  <div className="space-y-5">
                    <div className="flex items-center justify-center md:justify-start gap-2">
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

                  {selectedEffect === 'emoji-rain' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
                      <div className="space-y-4">
                        <Label className="text-[11px] font-black uppercase tracking-wider text-white/60 flex items-center justify-center md:justify-start gap-2">
                          <Heart className="w-3.5 h-3.5" /> Escolha os emojis (Até 3)
                        </Label>
                        <EmojiPicker 
                          selectedEmojis={selectedEmojis} 
                          onToggle={toggleEmoji} 
                          onOpenChange={setIsEmojiPickerOpen} 
                          open={isEmojiPickerOpen}
                        />
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
                  <Button onClick={handleBack} variant="outline" className="w-full sm:w-auto px-8 h-12 rounded-xl border-white/10 bg-white/5 font-black text-sm hover:bg-white/10 transition-all flex items-center gap-2">
                    <ChevronLeft className="w-4 h-4" /> Voltar
                  </Button>
                  <Button onClick={handleNextToPhotos} className="w-full sm:flex-1 h-12 rounded-xl bg-primary text-white font-black text-sm hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
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
                    Adicione até 8 fotos especiais e personalize a moldura.
                  </p>
                </div>

                <div className="w-full max-md space-y-8">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
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
                    {uploadedPhotos.length < 8 && (
                      <label className="aspect-square rounded-2xl border-2 border-dashed border-white/10 bg-white/5 hover:bg-white/10 transition-all flex flex-col items-center justify-center gap-3 cursor-pointer group">
                        <div className="bg-white/5 p-3 rounded-full group-hover:scale-110 transition-transform">
                          <Upload className="w-6 h-6 text-white/40" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-white/30 text-center px-1">Adicionar Foto</span>
                        <input type="file" className="hidden" accept="image/*" multiple onChange={handlePhotoUpload} />
                      </label>
                    )}
                  </div>

                  <div className="space-y-6 bg-white/5 p-6 rounded-2xl border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Layout className="w-4 h-4 text-primary" />
                      <h3 className="text-[11px] font-black uppercase tracking-widest text-white/60">Estilo da Polaroid</h3>
                    </div>

                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-white border border-white/20 rounded-sm" />
                        <Label className="text-[11px] font-bold text-white/50 uppercase cursor-pointer" htmlFor="show-card">Mostrar Moldura</Label>
                      </div>
                      <Switch id="show-card" checked={showCard} onCheckedChange={setShowCard} />
                    </div>

                    {showCard && (
                      <div className="space-y-4 pt-4 border-t border-white/5 animate-in fade-in duration-300">
                        <Label className="text-[11px] font-bold text-white/50 uppercase">Cor da Moldura</Label>
                        <div className="flex items-center gap-4">
                          <Popover>
                            <PopoverTrigger asChild>
                              <button className="flex items-center gap-3 bg-white/5 border border-white/10 p-2 rounded-xl hover:bg-white/10 transition-all">
                                <div className="w-8 h-8 rounded-lg border border-white/10" style={{ backgroundColor: cardColor }} />
                                <div className="text-left pr-2">
                                  <p className="text-[9px] font-black uppercase text-white/30">Cor do Card</p>
                                  <p className="text-[10px] font-mono font-bold">{cardColor}</p>
                                </div>
                              </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 border-none bg-transparent" align="start">
                              <ColorPicker selectedBgColor={cardColor} onChange={setCardColor} />
                            </PopoverContent>
                          </Popover>
                          <div className="flex flex-wrap gap-1.5">
                            {['#ffffff', '#fdfdfd', '#f4f4f5', '#111111', '#000000'].map((color) => (
                              <button
                                key={color}
                                onClick={() => setCardColor(color)}
                                className={cn(
                                  "w-6 h-6 rounded-full border transition-all",
                                  cardColor === color ? "border-primary scale-110" : "border-white/10"
                                )}
                                style={{ backgroundColor: color }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="space-y-4 pt-4 border-t border-white/5">
                      <Label className="text-[11px] font-bold text-white/50 uppercase">Posição do Nome</Label>
                      <RadioGroup value={titlePosition} onValueChange={(v: any) => setTitlePosition(v)} className="grid grid-cols-2 gap-2">
                        <Label className={cn("flex items-center justify-center gap-2 p-3 rounded-xl border cursor-pointer transition-all", titlePosition === 'top' ? "border-primary bg-primary/10 text-primary" : "border-white/10 bg-black/20 text-white/40")}>
                          <RadioGroupItem value="top" className="sr-only" />
                          <AlignVerticalJustifyStart className="w-4 h-4" />
                          <span className="text-[10px] font-black uppercase">Topo</span>
                        </Label>
                        <Label className={cn("flex items-center justify-center gap-2 p-3 rounded-xl border cursor-pointer transition-all", titlePosition === 'bottom' ? "border-primary bg-primary/10 text-primary" : "border-white/10 bg-black/20 text-white/40")}>
                          <RadioGroupItem value="bottom" className="sr-only" />
                          <AlignVerticalJustifyEnd className="w-4 h-4" />
                          <span className="text-[10px] font-black uppercase">Base</span>
                        </Label>
                      </RadioGroup>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div className="flex items-center justify-center md:justify-start gap-2">
                      <Layers className="w-5 h-5 text-primary" />
                      <h3 className="text-[10px] md:text-sm font-black uppercase tracking-widest text-white/60">Efeito de Passagem</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div 
                        onClick={() => setPhotoEffect('slide')}
                        className={cn(
                          "cursor-pointer border rounded-2xl p-4 transition-all duration-300 flex flex-col items-center gap-2 text-center",
                          photoEffect === 'slide' ? "border-primary bg-primary/5 ring-1 ring-primary/20" : "border-white/10 bg-white/5 hover:border-white/20"
                        )}
                      >
                        <Layout className={cn("w-6 h-6", photoEffect === 'slide' ? "text-primary" : "text-white/40")} />
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-wider">Slide Suave</p>
                        </div>
                      </div>

                      <div 
                        onClick={() => setPhotoEffect('coverflow')}
                        className={cn(
                          "cursor-pointer border rounded-2xl p-4 transition-all duration-300 flex flex-col items-center gap-2 text-center",
                          photoEffect === 'coverflow' ? "border-primary bg-primary/5 ring-1 ring-primary/20" : "border-white/10 bg-white/5 hover:border-white/20"
                        )}
                      >
                        <Sparkles className={cn("w-6 h-6", photoEffect === 'coverflow' ? "text-primary" : "text-white/40")} />
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-wider">Coverflow 3D</p>
                        </div>
                      </div>

                      <div 
                        onClick={() => setPhotoEffect('cards')}
                        className={cn(
                          "cursor-pointer border rounded-2xl p-4 transition-all duration-300 flex flex-col items-center gap-2 text-center",
                          photoEffect === 'cards' ? "border-primary bg-primary/5 ring-1 ring-primary/20" : "border-white/10 bg-white/5 hover:border-white/20"
                        )}
                      >
                        <Copy className={cn("w-6 h-6", photoEffect === 'cards' ? "text-primary" : "text-white/40")} />
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-wider">Cards Pilha</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="hidden lg:flex flex-col sm:flex-row items-center gap-5 pt-10 border-t border-white/5 w-full max-md">
                  <Button onClick={handleBack} variant="outline" className="w-full sm:w-auto px-8 h-12 rounded-xl border-white/10 bg-white/5 font-black text-sm hover:bg-white/10 transition-all flex items-center gap-2">
                    <ChevronLeft className="w-4 h-4" /> Voltar
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
                    Escreva o título dedicatório e personalize o estilo para sua página.
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

                  <div className="space-y-6 bg-white/5 p-6 rounded-2xl border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Palette className="w-4 h-4 text-primary" />
                      <h3 className="text-[11px] font-black uppercase tracking-widest text-white/60">Personalizar Texto</h3>
                    </div>
                    
                    <div className="space-y-4">
                       <Label className="text-[11px] font-bold text-white/50 uppercase">Fonte do Título</Label>
                       <div className="grid grid-cols-2 gap-2">
                         {FONT_OPTIONS.map((f) => (
                           <button
                             key={f.id}
                             onClick={() => setTitleFont(f.id)}
                             className={cn(
                               "px-4 py-3 rounded-xl border text-xs transition-all",
                               titleFont === f.id ? "border-primary bg-primary/10 text-primary font-bold" : "border-white/10 bg-black/20 text-white/40 hover:border-white/20",
                               f.class
                             )}
                           >
                             {f.name}
                           </button>
                         ))}
                       </div>
                    </div>

                    <div className="flex items-center justify-between py-2 border-t border-white/5">
                      <div className="flex items-center gap-2">
                        <Bold className="w-4 h-4 text-white/40" />
                        <Label className="text-[11px] font-bold text-white/50 uppercase cursor-pointer" htmlFor="bold-toggle">Negrito</Label>
                      </div>
                      <Switch id="bold-toggle" checked={titleIsBold} onCheckedChange={setTitleIsBold} />
                    </div>

                    <div className="space-y-4 py-2 border-t border-white/5">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-white/40" />
                          <Label className="text-[11px] font-bold text-white/50 uppercase cursor-pointer" htmlFor="neon-toggle">Efeito Neon</Label>
                        </div>
                        <Switch id="neon-toggle" checked={titleHasNeon} onCheckedChange={setTitleHasNeon} />
                      </div>
                      {titleHasNeon && (
                        <div className="space-y-3 pt-2 animate-in fade-in slide-in-from-top-2">
                          <div className="flex items-center justify-between">
                            <Label className="text-[9px] font-black uppercase tracking-wider text-white/40">Força do Neon</Label>
                            <span className="text-[10px] font-black text-primary">{titleNeonStrength}</span>
                          </div>
                          <Slider 
                            value={[titleNeonStrength]} 
                            onValueChange={(val) => setTitleNeonStrength(val[0])}
                            min={2} 
                            max={30} 
                            step={1}
                          />
                        </div>
                      )}
                    </div>

                    <div className="space-y-4 pt-4 border-t border-white/5">
                      <Label className="text-[11px] font-bold text-white/50 uppercase">Cor do Texto</Label>
                      <div className="flex items-center gap-4">
                        <Popover>
                          <PopoverTrigger asChild>
                            <button 
                              className="flex items-center gap-3 bg-white/5 border border-white/10 p-2 rounded-xl hover:bg-white/10 transition-all group"
                            >
                              <div 
                                className="w-10 h-10 rounded-lg shadow-inner border border-white/10"
                                style={{ backgroundColor: titleColor }}
                              />
                              <div className="text-left pr-4">
                                <p className="text-[10px] font-black uppercase text-white/30 group-hover:text-primary transition-colors">Personalizar</p>
                                <p className="text-xs font-mono font-bold">{titleColor}</p>
                              </div>
                            </button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 border-none bg-transparent shadow-none" align="start">
                            <ColorPicker 
                              selectedBgColor={titleColor} 
                              onChange={(color) => {
                                setTitleColor(color);
                                setUserHasManuallyChangedTitleColor(true);
                              }} 
                            />
                          </PopoverContent>
                        </Popover>

                        <div className="flex flex-wrap gap-1.5">
                          {['#ffffff', '#e11d48', '#ff4da6', '#7c3aed', '#2563eb', '#111111'].map((color) => (
                            <button
                              key={color}
                              onClick={() => {
                                setTitleColor(color);
                                setUserHasManuallyChangedTitleColor(true);
                              }}
                              className={cn(
                                "w-6 h-6 rounded-full border transition-transform active:scale-90",
                                titleColor === color ? "border-white scale-110" : "border-white/10"
                              )}
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="hidden lg:flex flex-col sm:flex-row items-center gap-5 pt-10 border-t border-white/5 w-full max-md">
                  <Button onClick={handleBack} variant="outline" className="w-full sm:w-auto px-8 h-12 rounded-xl border-white/10 bg-white/5 font-black text-sm hover:bg-white/10 transition-all flex items-center gap-2">
                    <ChevronLeft className="w-4 h-4" /> Voltar
                  </Button>
                  <Button 
                    onClick={handleNextToDataLocation} 
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
                            {date ? date.toLocaleDateString('pt-BR') : <span className="text-white/20">Selecione uma data</span>}
                          </div>
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 border-none bg-transparent shadow-none" align="start">
                        <Calendar selected={date} onSelect={setDate} />
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
                  <RadioGroup defaultValue="padrao" value={selectedCountStyle} onValueChange={setSelectedCountStyle} className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                    {[
                      { id: 'padrao', label: 'Padrão', icon: Clock },
                      { id: 'classico', label: 'Clássico', icon: Layout },
                      { id: 'simples', label: 'Simples', icon: Hash },
                      { id: 'data-grande', label: 'Data Grande', icon: CalendarIcon },
                      { id: 'dias-grandes', label: 'Dias Grandes', icon: Hash },
                    ].map((style) => (
                      <Label key={style.id} className={cn("relative flex items-center gap-4 p-4 md:p-5 rounded-2xl border cursor-pointer transition-all duration-300", selectedCountStyle === style.id ? "border-primary bg-primary/5 ring-1 ring-primary/20" : "border-white/5 bg-white/5 hover:border-white/10")}>
                        <RadioGroupItem value={style.id} className="sr-only" />
                        <div className={cn("w-4 h-4 md:w-5 md:h-5 rounded-full border flex items-center justify-center transition-colors", selectedCountStyle === style.id ? "border-primary bg-primary" : "border-white/20 bg-transparent")}>
                          {selectedCountStyle === style.id && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                        <style.icon className={cn("w-4 h-4 md:w-5 md:h-5", selectedCountStyle === style.id ? "text-primary" : "text-white/40")} />
                        <span className="text-[11px] md:text-xs font-black">{style.label}</span>
                      </Label>
                    ))}
                  </RadioGroup>
                </div>

                <div className="hidden lg:flex flex-col sm:flex-row items-center gap-5 pt-10 border-t border-white/5 w-full max-md">
                  <Button onClick={handleBack} variant="outline" className="w-full sm:w-auto px-8 h-12 rounded-xl border-white/10 bg-white/5 font-black text-sm hover:bg-white/10 transition-all flex items-center gap-2">
                    <ChevronLeft className="w-4 h-4" /> Voltar
                  </Button>
                  <Button className="w-full sm:flex-1 h-12 rounded-xl bg-primary text-white font-black text-sm hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
                    Finalizar criação <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            <div className="lg:sticky lg:top-24 flex flex-col items-center mt-12 lg:mt-0">
               <DeviceMockup 
                 selectedBgColor={selectedBgColor}
                 selectedEffect={selectedEffect}
                 selectedEmojis={selectedEmojis}
                 emojiSize={emojiSize}
                 step={step}
                 uploadedPhotos={uploadedPhotos}
                 pageTitle={pageTitle}
                 date={date}
                 selectedCountStyle={selectedCountStyle}
                 photoEffect={photoEffect}
                 titleColor={titleColor}
                 titleFont={titleFont}
                 titleIsBold={titleIsBold}
                 titleHasNeon={titleHasNeon}
                 titleNeonStrength={titleNeonStrength}
                 cardColor={cardColor}
                 showCard={showCard}
                 titlePosition={titlePosition}
               />

               <div className="lg:hidden mt-10 space-y-5 w-full">
                 <div className="flex flex-col gap-3">
                   <Button onClick={handleBack} variant="outline" className="w-full h-12 rounded-xl border-white/10 bg-white/5 font-black text-sm">
                     <ChevronLeft className="w-4 h-4" /> Voltar
                   </Button>
                   <Button 
                     onClick={() => {
                        if (step === 'customize-background') handleNextToPhotos();
                        else if (step === 'photos') handleNextToPageTitle();
                        else if (step === 'page-title') handleNextToDataLocation();
                        else if (step === 'data-location') {
                           // Logic to finish or proceed to payment/preview
                        }
                     }}
                     className="w-full h-12 rounded-xl bg-primary text-white font-black text-sm"
                   >
                     {step === 'data-location' ? 'Finalizar criação' : 'Próxima etapa'} <ChevronRight className="w-4 h-4" />
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
      )}
    </div>
  );
}
