'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Pencil, Maximize2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DeviceMockup } from '@/components/eternize/device-mockup';
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { getContrastColor } from '@/lib/color-utils';
import { Step, MOCK_CITIES, ThemeId } from './constants';

// Step Components
import { StepThemeSelection } from '@/components/eternize/creator-steps/step-theme-selection';
import { StepGiftType } from '@/components/eternize/creator-steps/step-gift-type';
import { StepCustomizeBackground } from '@/components/eternize/creator-steps/step-customize-background';
import { StepPhotos } from '@/components/eternize/creator-steps/step-photos';
import { StepPageTitle } from '@/components/eternize/creator-steps/step-page-title';
import { StepMessage } from '@/components/eternize/creator-steps/step-message';
import { StepMusic } from '@/components/eternize/creator-steps/step-music';
import { StepDataLocation } from '@/components/eternize/creator-steps/step-data-location';

export default function CriadorApp() {
  const [step, setStep] = useState<Step>('theme-selection');
  const [selectedTheme, setSelectedTheme] = useState<ThemeId>('classic');
  const [selectedGiftType, setSelectedGiftType] = useState<string>('amor');
  const [selectedBgColor, setSelectedBgColor] = useState<string>('#000000');
  const [selectedEffect, setSelectedEffect] = useState<string>('none');
  const [isEmojiRainEnabled, setIsEmojiRainEnabled] = useState<boolean>(false);
  const [selectedEmojis, setSelectedEmojis] = useState<string[]>(['❤️']);
  const [emojiSize, setEmojiSize] = useState<number>(20);
  const [selectedCountStyle, setSelectedCountStyle] = useState<string>('padrao');
  const [photoEffect, setPhotoEffect] = useState<'slide' | 'coverflow' | 'cards'>('slide');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [pageTitle, setPageTitle] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [musicData, setMusicData] = useState<{id: string, title: string, thumb: string} | undefined>(undefined);
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  
  // Customization states for specific effects
  const [sparklesDensity, setSparklesDensity] = useState<number>(100);
  const [sparklesSpeed, setSparklesSpeed] = useState<number>(0.5);
  const [sparklesColor, setSparklesColor] = useState<string>('#ffffff');
  
  const [smokeIntensity, setSmokeIntensity] = useState<number>(0.5);
  const [smokeColor, setSmokeColor] = useState<string>('#ffffff');
  
  const [patternDuration, setPatternDuration] = useState<number>(150);
  const [patternDensity, setPatternDensity] = useState<number>(1);
  const [patternColor, setPatternColor] = useState<string>('#ffffff');

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

  // Date customization state
  const [dateColor, setDateColor] = useState<string>('#ff0000');
  const [dateFont, setDateFont] = useState<string>('inter');
  const [dateIsBold, setDateIsBold] = useState<boolean>(true);
  const [dateHasNeon, setDateHasNeon] = useState<boolean>(false);
  const [dateNeonStrength, setDateNeonStrength] = useState<number>(10);
  const [userHasManuallyChangedDateColor, setUserHasManuallyChangedDateColor] = useState(false);

  // Message customization state
  const [messageColor, setMessageColor] = useState<string>('#ffffff');
  const [messageFont, setMessageFont] = useState<string>('inter');
  const [userHasManuallyChangedMessageColor, setUserHasManuallyChangedMessageColor] = useState(false);
  
  // Music box customization state
  const [musicBoxColor, setMusicBoxColor] = useState<string>('#0e0e0e');
  const [musicTextColor, setMusicTextColor] = useState<string>('#ffffff');
  const [musicHasNeon, setMusicHasNeon] = useState<boolean>(false);
  const [musicNeonStrength, setMusicNeonStrength] = useState<number>(15);
  const [isMusicAutoPlay, setIsMusicAutoPlay] = useState<boolean>(true);

  // Location States
  const [locationQuery, setLocationQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Step sequence management based on theme
  const stepSequence = useMemo((): Step[] => {
    const base: Step[] = ['theme-selection', 'gift-type'];
    if (selectedTheme === 'netflix') {
      return [...base, 'data-location', 'page-title', 'photos', 'message', 'music'];
    }
    return [...base, 'customize-background', 'photos', 'page-title', 'message', 'music', 'data-location'];
  }, [selectedTheme]);

  const currentStepIndex = stepSequence.indexOf(step);

  const handleBack = () => {
    if (currentStepIndex <= 0) { window.location.href = '/'; return; }
    setStep(stepSequence[currentStepIndex - 1]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNext = () => {
    if (currentStepIndex < stepSequence.length - 1) {
      setStep(stepSequence[currentStepIndex + 1]);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleEmoji = (emoji: string) => {
    if (selectedEmojis.includes(emoji)) {
      if (selectedEmojis.length > 1) setSelectedEmojis(selectedEmojis.filter(e => e !== emoji));
    } else {
      if (selectedEmojis.length < 3) setSelectedEmojis([...selectedEmojis, emoji]);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => setUploadedPhotos(prev => [...prev, reader.result as string].slice(0, 8));
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index: number) => setUploadedPhotos(prev => prev.filter((_, i) => i !== index));

  const filteredCities = locationQuery.length > 0 
    ? MOCK_CITIES.filter(city => city.toLowerCase().includes(locationQuery.toLowerCase()))
    : [];

  useEffect(() => {
    if (selectedTheme === 'netflix') {
      setTitleColor('#ffffff');
      setDateColor('#ff0000');
    } else if (!userHasManuallyChangedTitleColor) {
      const surfaceColor = showCard ? cardColor : selectedBgColor;
      setTitleColor(getContrastColor(surfaceColor));
    }
  }, [cardColor, selectedBgColor, showCard, userHasManuallyChangedTitleColor, selectedTheme]);

  useEffect(() => {
    if (selectedTheme !== 'netflix' && !userHasManuallyChangedDateColor) {
      setDateColor(getContrastColor(selectedBgColor));
    }
  }, [selectedBgColor, userHasManuallyChangedDateColor, selectedTheme]);

  useEffect(() => {
    if (!userHasManuallyChangedMessageColor) setMessageColor(getContrastColor(selectedBgColor));
  }, [selectedBgColor, userHasManuallyChangedMessageColor]);

  const isInitialSteps = step === 'theme-selection' || step === 'gift-type';

  const previewProps = {
    selectedTheme,
    selectedBgColor,
    selectedEffect,
    isEmojiRainEnabled,
    selectedEmojis,
    emojiSize,
    step,
    uploadedPhotos,
    pageTitle,
    message,
    musicData,
    date,
    selectedCountStyle,
    photoEffect,
    titleColor,
    titleFont,
    titleIsBold,
    titleHasNeon,
    titleNeonStrength,
    cardColor,
    showCard,
    titlePosition,
    dateColor,
    dateFont,
    dateIsBold,
    dateHasNeon,
    dateNeonStrength,
    messageColor,
    messageFont,
    musicBoxColor,
    musicTextColor,
    musicHasNeon,
    musicNeonStrength,
    isAutoPlay: isMusicAutoPlay,
    sparklesDensity,
    sparklesSpeed,
    sparklesColor,
    smokeIntensity,
    smokeColor,
    patternDuration,
    patternDensity,
    patternColor
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-white relative font-body overflow-x-hidden">
      <div className="fixed inset-0 bg-hero-glow pointer-events-none z-0" />

      {/* Header Banner */}
      <div className="fixed inset-x-0 top-0 z-[100] bg-[#3d0b17] border-b border-white/5 py-1.5 md:py-2 text-center text-[10px] md:text-xs font-medium flex items-center justify-center gap-4">
        <div className="bg-white/10 px-2 py-0.5 rounded border border-white/20 text-[9px] md:text-[10px] font-black uppercase">Criador</div>
        <p className="tracking-tight">Personalizando seu presente digital</p>
      </div>

      {step === 'theme-selection' && (
        <StepThemeSelection 
          selectedTheme={selectedTheme} 
          onThemeSelect={setSelectedTheme} 
          onNext={handleNext} 
        />
      )}

      {step === 'gift-type' && (
        <StepGiftType 
          selectedGiftType={selectedGiftType} 
          onSelect={setSelectedGiftType} 
          onNext={handleNext} 
          onBack={handleBack} 
        />
      )}

      {!isInitialSteps && (
        <div className="relative z-10 container mx-auto px-4 pt-16 md:pt-20 pb-12 max-w-7xl">
          
          {/* Progress Bar - Netflix Style */}
          <div className="fixed top-[32px] md:top-[40px] left-0 right-0 z-[110] px-4 md:px-10">
            <div className="max-w-7xl mx-auto flex items-center gap-4 h-8">
               <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-500" 
                    style={{ width: `${(currentStepIndex / (stepSequence.length - 1)) * 100}%` }}
                  />
               </div>
               <span className="text-[10px] md:text-xs font-black text-white/50 tracking-widest">
                 {currentStepIndex}/{stepSequence.length - 1}
               </span>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr_420px] gap-8 md:gap-16 items-start pt-8">
            
            {/* Form Column */}
            <div className="w-full min-w-0">
              {step === 'customize-background' && (
                <StepCustomizeBackground 
                  selectedBgColor={selectedBgColor}
                  onBgColorChange={setSelectedBgColor}
                  selectedEffect={selectedEffect}
                  onEffectChange={setSelectedEffect}
                  isEmojiRainEnabled={isEmojiRainEnabled}
                  onEmojiRainToggle={setIsEmojiRainEnabled}
                  selectedEmojis={selectedEmojis}
                  onToggleEmoji={toggleEmoji}
                  emojiSize={emojiSize}
                  onEmojiSizeChange={setEmojiSize}
                  isEmojiPickerOpen={isEmojiPickerOpen}
                  onEmojiPickerOpenChange={setIsEmojiPickerOpen}
                  
                  sparklesDensity={sparklesDensity}
                  onSparklesDensityChange={setSparklesDensity}
                  sparklesSpeed={sparklesSpeed}
                  onSparklesSpeedChange={setSparklesSpeed}
                  sparklesColor={sparklesColor}
                  onSparklesColorChange={setSparklesColor}
                  
                  smokeIntensity={smokeIntensity}
                  onSmokeIntensityChange={setSmokeIntensity}
                  smokeColor={smokeColor}
                  onSmokeColorChange={setSmokeColor}
                  
                  patternDuration={patternDuration}
                  onPatternDurationChange={setPatternDuration}
                  patternDensity={patternDensity}
                  onPatternDensityChange={setPatternDensity}
                  patternColor={patternColor}
                  onPatternColorChange={setPatternColor}

                  onBack={handleBack}
                  onNext={handleNext}
                />
              )}

              {step === 'photos' && (
                <StepPhotos 
                  uploadedPhotos={uploadedPhotos}
                  onPhotoUpload={handlePhotoUpload}
                  onRemovePhoto={removePhoto}
                  showCard={showCard}
                  onShowCardChange={setShowCard}
                  cardColor={cardColor}
                  onCardColorChange={setCardColor}
                  titlePosition={titlePosition}
                  onTitlePositionChange={setTitlePosition}
                  photoEffect={photoEffect}
                  onPhotoEffectChange={setPhotoEffect}
                  onBack={handleBack}
                  onNext={handleNext}
                />
              )}

              {step === 'page-title' && (
                <StepPageTitle 
                  selectedTheme={selectedTheme}
                  pageTitle={pageTitle}
                  onPageTitleChange={setPageTitle}
                  titleFont={titleFont}
                  onTitleFontChange={setTitleFont}
                  titleIsBold={titleIsBold}
                  onTitleIsBoldChange={setTitleIsBold}
                  titleHasNeon={titleHasNeon}
                  onTitleHasNeonChange={setTitleHasNeon}
                  titleNeonStrength={titleNeonStrength}
                  onTitleNeonStrengthChange={setTitleNeonStrength}
                  titleColor={titleColor}
                  onTitleColorChange={(c) => { setTitleColor(c); setUserHasManuallyChangedTitleColor(true); }}
                  onBack={handleBack}
                  onNext={handleNext}
                />
              )}

              {step === 'message' && (
                <StepMessage 
                  message={message}
                  onMessageChange={setMessage}
                  messageFont={messageFont}
                  onMessageFontChange={setMessageFont}
                  messageColor={messageColor}
                  onMessageColorChange={(c) => { setMessageColor(c); setUserHasManuallyChangedMessageColor(true); }}
                  onBack={handleBack}
                  onNext={handleNext}
                />
              )}

              {step === 'music' && (
                <StepMusic 
                  musicData={musicData}
                  onMusicSelect={setMusicData}
                  musicBoxColor={musicBoxColor}
                  onMusicBoxColorChange={setMusicBoxColor}
                  musicTextColor={musicTextColor}
                  onMusicTextColorChange={setMusicTextColor}
                  musicHasNeon={musicHasNeon}
                  onMusicHasNeonChange={setMusicHasNeon}
                  musicNeonStrength={musicNeonStrength}
                  onMusicNeonStrengthChange={setMusicNeonStrength}
                  isAutoPlay={isMusicAutoPlay}
                  onAutoPlayChange={setIsMusicAutoPlay}
                  onBack={handleBack}
                  onNext={handleNext}
                />
              )}

              {step === 'data-location' && (
                <StepDataLocation 
                  selectedTheme={selectedTheme}
                  date={date}
                  onDateSelect={setDate}
                  locationQuery={locationQuery}
                  onLocationQueryChange={setLocationQuery}
                  showSuggestions={showSuggestions}
                  onShowSuggestionsChange={setShowSuggestions}
                  filteredCities={filteredCities}
                  selectedCountStyle={selectedCountStyle}
                  onCountStyleChange={setSelectedCountStyle}
                  dateFont={dateFont}
                  onDateFontChange={setDateFont}
                  dateIsBold={dateIsBold}
                  onDateIsBoldChange={setDateIsBold}
                  dateHasNeon={dateHasNeon}
                  onDateHasNeonChange={setDateHasNeon}
                  dateNeonStrength={dateNeonStrength}
                  onDateNeonStrengthChange={setDateNeonStrength}
                  dateColor={dateColor}
                  onDateColorChange={(c) => { setDateColor(c); setUserHasManuallyChangedDateColor(true); }}
                  onBack={handleBack}
                  onFinish={() => { console.log('Finish Creation'); }}
                />
              )}

              {/* Mobile View Mockup - Placed between content and buttons on mobile */}
              <div className="lg:hidden flex flex-col items-center mt-12 w-full gap-4">
                 <Dialog>
                   <DialogTrigger asChild>
                     <Button variant="outline" className="w-full h-11 rounded-xl border-white/10 bg-white/5 font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2">
                       <Maximize2 className="w-4 h-4" /> Ver em tela cheia
                     </Button>
                   </DialogTrigger>
                   <DialogContent className="max-w-[450px] h-[95vh] p-0 bg-transparent border-none overflow-hidden flex flex-col">
                     <DialogTitle className="sr-only">Prévia do Presente</DialogTitle>
                     <DialogDescription className="sr-only">Visualização em tela cheia do seu presente personalizado.</DialogDescription>
                     
                     {/* Fullscreen Header based on image */}
                     <div className="bg-black px-4 py-3 flex items-center justify-between shrink-0">
                       <span className="text-white text-sm font-bold">Preview</span>
                       <DialogClose className="text-white/60 hover:text-white transition-colors">
                         <X className="w-5 h-5" />
                       </DialogClose>
                     </div>
                     
                     <div className="flex-1 overflow-hidden flex justify-center items-center">
                       <DeviceMockup {...previewProps} isFullscreen />
                     </div>
                   </DialogContent>
                 </Dialog>
                 <DeviceMockup {...previewProps} />
              </div>

              {/* Form Footer - Buttons and purchase disclaimer */}
              <div className="mt-12 flex flex-col gap-6 max-w-md mx-auto md:mx-0">
                <div className="flex flex-col gap-4 pt-10 border-t border-white/5">
                  <Button 
                    onClick={handleBack} 
                    variant="outline" 
                    className="w-full h-14 rounded-2xl border-white/10 bg-white/5 font-black text-sm hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" /> Voltar etapa
                  </Button>
                  <Button 
                    onClick={handleNext} 
                    className={cn(
                      "w-full h-14 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-2",
                      currentStepIndex === stepSequence.length - 1 ? "bg-primary text-white" : "bg-white text-black hover:bg-white/90"
                    )}
                  >
                    {currentStepIndex === stepSequence.length - 1 ? 'Finalizar criação' : 'Próxima etapa'} 
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex justify-center md:justify-start">
                   <p className="text-[11px] font-medium text-white/30 italic flex items-center gap-2">
                     <Pencil className="w-3 h-3" /> Você poderá editar isso após a compra
                   </p>
                </div>
              </div>
            </div>

            {/* Sticky Preview Column - Only visible on desktop */}
            <div className="lg:sticky lg:top-20 self-start hidden lg:flex flex-col items-center gap-6">
               <Dialog>
                 <DialogTrigger asChild>
                   <Button variant="outline" size="sm" className="bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all rounded-full px-4 gap-2 text-[10px] font-black uppercase">
                     <Maximize2 className="w-3 h-3" /> Ver em tela cheia
                   </Button>
                 </DialogTrigger>
                 <DialogContent className="max-w-[450px] h-[95vh] p-0 bg-transparent border-none overflow-hidden flex flex-col">
                   <DialogTitle className="sr-only">Prévia do Presente</DialogTitle>
                   <DialogDescription className="sr-only">Visualização em tela cheia do seu presente personalizado.</DialogDescription>
                   
                   {/* Fullscreen Header based on image */}
                   <div className="bg-black px-4 py-3 flex items-center justify-between shrink-0">
                     <span className="text-white text-sm font-bold">Preview</span>
                     <DialogClose className="text-white/60 hover:text-white transition-colors">
                       <X className="w-5 h-5" />
                     </DialogClose>
                   </div>

                   <div className="flex-1 overflow-hidden flex justify-center items-center">
                     <DeviceMockup {...previewProps} isFullscreen />
                   </div>
                 </DialogContent>
               </Dialog>
               <DeviceMockup {...previewProps} />
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
