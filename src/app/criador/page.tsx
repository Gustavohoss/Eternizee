
'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DeviceMockup } from '@/components/eternize/device-mockup';
import { cn } from '@/lib/utils';
import { getContrastColor } from '@/lib/color-utils';
import { Step, MOCK_CITIES } from './constants';

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
  const [selectedGiftType, setSelectedGiftType] = useState<string>('amor');
  const [selectedBgColor, setSelectedBgColor] = useState<string>('#000000');
  const [selectedEffect, setSelectedEffect] = useState<string>('none');
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
  const [dateColor, setDateColor] = useState<string>('#ffffff');
  const [dateFont, setDateFont] = useState<string>('inter');
  const [dateIsBold, setDateIsBold] = useState<boolean>(true);
  const [dateHasNeon, setDateHasNeon] = useState<boolean>(false);
  const [dateNeonStrength, setDateNeonStrength] = useState<number>(10);
  const [userHasManuallyChangedDateColor, setUserHasManuallyChangedDateColor] = useState(false);

  // Message customization state
  const [messageColor, setMessageColor] = useState<string>('#ffffff');
  const [messageFont, setMessageFont] = useState<string>('inter');
  const [userHasManuallyChangedMessageColor, setUserHasManuallyChangedMessageColor] = useState(false);
  
  // Location States
  const [locationQuery, setLocationQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleBack = () => {
    if (step === 'theme-selection') { window.location.href = '/'; return; }
    if (step === 'gift-type') setStep('theme-selection');
    if (step === 'customize-background') setStep('gift-type');
    if (step === 'photos') setStep('customize-background');
    if (step === 'page-title') setStep('photos');
    if (step === 'message') setStep('page-title');
    if (step === 'music') setStep('message');
    if (step === 'data-location') setStep('music');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNext = () => {
    if (step === 'theme-selection') setStep('gift-type');
    else if (step === 'gift-type') setStep('customize-background');
    else if (step === 'customize-background') setStep('photos');
    else if (step === 'photos') setStep('page-title');
    else if (step === 'page-title') setStep('message');
    else if (step === 'message') setStep('music');
    else if (step === 'music') setStep('data-location');
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
    if (!userHasManuallyChangedTitleColor) {
      const surfaceColor = showCard ? cardColor : selectedBgColor;
      setTitleColor(getContrastColor(surfaceColor));
    }
  }, [cardColor, selectedBgColor, showCard, userHasManuallyChangedTitleColor]);

  useEffect(() => {
    if (!userHasManuallyChangedDateColor) setDateColor(getContrastColor(selectedBgColor));
  }, [selectedBgColor, userHasManuallyChangedDateColor]);

  useEffect(() => {
    if (!userHasManuallyChangedMessageColor) setMessageColor(getContrastColor(selectedBgColor));
  }, [selectedBgColor, userHasManuallyChangedMessageColor]);

  const isInitialSteps = step === 'theme-selection' || step === 'gift-type';

  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-white relative overflow-x-hidden font-body">
      <div className="fixed inset-0 bg-hero-glow pointer-events-none z-0" />

      <div className="fixed inset-x-0 top-0 z-[100] bg-[#3d0b17] border-b border-white/5 py-1.5 md:py-2 text-center text-[10px] md:text-xs font-medium flex items-center justify-center gap-4">
        <div className="bg-white/10 px-2 py-0.5 rounded border border-white/20 text-[9px] md:text-[10px] font-black uppercase">Criador</div>
        <p className="tracking-tight">Personalizando seu presente digital</p>
      </div>

      {step === 'theme-selection' && (
        <StepThemeSelection onNext={handleNext} />
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
        <div className="relative z-10 container mx-auto px-4 pt-16 md:pt-20 pb-12 max-w-6xl">
          <div className="flex items-center justify-center mb-8 md:mb-10">
            <div className="w-full max-w-md text-center">
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className={cn(
                  "h-full bg-primary transition-all duration-500", 
                  step === 'customize-background' ? "w-[15%]" : 
                  step === 'photos' ? "w-[30%]" : 
                  step === 'page-title' ? "w-[45%]" : 
                  step === 'message' ? "w-[60%]" : 
                  step === 'music' ? "w-[75%]" : "w-[100%]"
                )} />
              </div>
              <div className="mt-4 text-xs md:text-sm font-black text-white/40 uppercase tracking-[0.2em]">
                Passo {step === 'customize-background' ? '1' : step === 'photos' ? '2' : step === 'page-title' ? '3' : step === 'message' ? '4' : step === 'music' ? '5' : '6'} de 6
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr_400px] gap-8 md:gap-12 items-start">
            
            {step === 'customize-background' && (
              <StepCustomizeBackground 
                selectedBgColor={selectedBgColor}
                onBgColorChange={setSelectedBgColor}
                selectedEffect={selectedEffect}
                onEffectChange={setSelectedEffect}
                selectedEmojis={selectedEmojis}
                onToggleEmoji={toggleEmoji}
                emojiSize={emojiSize}
                onEmojiSizeChange={setEmojiSize}
                isEmojiPickerOpen={isEmojiPickerOpen}
                onEmojiPickerOpenChange={setIsEmojiPickerOpen}
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
                onBack={handleBack}
                onNext={handleNext}
              />
            )}

            {step === 'data-location' && (
              <StepDataLocation 
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

            <div className="lg:sticky lg:top-24 flex flex-col items-center mt-12 lg:mt-0">
               <DeviceMockup 
                 selectedBgColor={selectedBgColor}
                 selectedEffect={selectedEffect}
                 selectedEmojis={selectedEmojis}
                 emojiSize={emojiSize}
                 step={step}
                 uploadedPhotos={uploadedPhotos}
                 pageTitle={pageTitle}
                 message={message}
                 musicData={musicData}
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
                 dateColor={dateColor}
                 dateFont={dateFont}
                 dateIsBold={dateIsBold}
                 dateHasNeon={dateHasNeon}
                 dateNeonStrength={dateNeonStrength}
                 messageColor={messageColor}
                 messageFont={messageFont}
               />
               <div className="lg:hidden mt-10 space-y-5 w-full">
                 <div className="flex flex-col gap-3">
                   <Button onClick={handleBack} variant="outline" className="w-full h-12 rounded-xl border-white/10 bg-white/5 font-black text-sm"><ChevronLeft className="w-4 h-4" /> Voltar</Button>
                   <Button onClick={handleNext} className="w-full h-12 rounded-xl bg-primary text-white font-black text-sm">{step === 'data-location' ? 'Finalizar criação' : 'Próxima etapa'} <ChevronRight className="w-4 h-4" /></Button>
                 </div>
                 <div className="flex justify-center pb-6"><p className="text-[10px] font-medium text-white/20 italic flex items-center gap-2"><span className="not-italic">✏️</span> Você poderá editar isso após a compra</p></div>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
