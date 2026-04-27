
'use client';

import React from 'react';
import { 
  Heart, 
  Smile, 
  Leaf, 
  Dog, 
  PartyPopper,
  Plus,
  X 
} from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

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
    emojis: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🐤', '🦆', '🦅', '🦉', '🦇', '🐺', '🐗', '🐴', '🦄', '🐝', '🐛', '🦋', '🐌', '🐞', '🐜', '🦗', '🕷️', '🐢', '🐍', '🦎', '🐙', '🦑', '🦐', '🦞', '🦀', '🐡', '🐠', '🐟', '🐬', '🐳', '🐋', '🦈', '🐊', '🐅', '🐆', '🦓', '🦍', '🦧', '🐘', '🦛', '🦏', '🐪', '🐫', '🦒', '🦘', '🐄', '🐎', '🐖', '🐏', '🐑', '🐐', '🦌', '🐕', '🐩', '🐈', '🐓', '🦃', '🦚', '🦜', '🦢', '🦩', '🕊️', '🐇', '🦝', '🦨', '🦡', '🦦', '🦥', '🐿️', '🦔', '🐾', '🐉', '🐲'] 
  },
  { 
    id: 'party', 
    icon: PartyPopper, 
    emojis: ['🎈', '🎆', '🎇', '🧨', '✨', '🎉', '🎊', '🎁', '🎂', '🍰', '🧁', '🍦', '🍪', '🍬', '🍭', '🍫', '🍩', '🥤', '🧋', '🍻', '🥂', '🍷', '🍸', '🍹', '🥃', '🍾', '🍕', '🍔', '🍟', '🌭', '🌮', '🌯', '🍳', '🥘', '🍲', '🥣', '🥗', '🍿', '🍱', '🍘', '🍙', '🍚', '🍛', '🍜', '🍝', '🍠', '🍢', '🍣', '🍤', '🍥', '🥮', '🍡', '🥟', '🥠', '🥡'] 
  }
];

interface EmojiPickerProps {
  selectedEmojis: string[];
  onToggle: (emoji: string) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EmojiPicker({ selectedEmojis, onToggle, open, onOpenChange }: EmojiPickerProps) {
  return (
    <div className="flex flex-wrap gap-2 items-center justify-center md:justify-start">
      {selectedEmojis.map((emoji) => (
        <div 
          key={emoji}
          className="group relative w-12 h-12 rounded-2xl border border-primary bg-primary/10 flex items-center justify-center text-xl shadow-lg animate-in zoom-in-50"
        >
          {emoji}
          <button 
            onClick={() => onToggle(emoji)}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center scale-0 group-hover:scale-100 transition-transform"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ))}
      
      {selectedEmojis.length < 3 && (
        <Popover open={open} onOpenChange={onOpenChange}>
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
                            onToggle(emoji);
                            if (selectedEmojis.length === 2) onOpenChange(false);
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
  );
}
