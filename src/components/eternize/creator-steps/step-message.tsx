'use client';

import React, { useRef, useEffect } from 'react';
import { 
  Bold, 
  Italic, 
  Underline, 
  Strikethrough, 
  Baseline, 
  Highlighter, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  List, 
  Link as LinkIcon, 
  Trash2,
  Palette,
  MessageSquare
} from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ColorPicker } from '@/components/eternize/color-picker';
import { FONT_OPTIONS, ThemeId } from '@/app/criador/constants';
import { cn } from '@/lib/utils';

interface StepMessageProps {
  selectedTheme?: ThemeId;
  message: string;
  onMessageChange: (msg: string) => void;
  messageFont: string;
  onMessageFontChange: (font: string) => void;
  messageColor: string;
  onMessageColorChange: (color: string) => void;
}

export function StepMessage({
  selectedTheme,
  message,
  onMessageChange,
  messageFont,
  onMessageFontChange,
  messageColor,
  onMessageColorChange,
}: StepMessageProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const isNetflix = selectedTheme === 'netflix';
  const isSpotify = selectedTheme === 'spotify';
  const isFixedTheme = isNetflix || isSpotify;

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== message) {
      editorRef.current.innerHTML = message;
    }
  }, []);

  const execCmd = (command: string, value: string | null = null) => {
    document.execCommand(command, false, value || undefined);
    if (editorRef.current) {
      editorRef.current.focus();
      onMessageChange(editorRef.current.innerHTML);
    }
  };

  const createLink = () => {
    const url = prompt("Insira a URL:", "https://");
    if (url) execCmd('createLink', url);
  };

  const handleInput = () => {
    if (editorRef.current) {
      onMessageChange(editorRef.current.innerHTML);
    }
  };

  const preventDefault = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <div className="space-y-8 md:space-y-10 flex flex-col items-center md:items-start">
      <div className="space-y-3 text-center md:text-left">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="bg-white/5 p-2 rounded-2xl border border-white/10">
            <MessageSquare className="w-5 h-5 md:w-6 md:h-6 text-white/80" />
          </div>
          <h2 className="text-2xl md:text-4xl font-black tracking-tight">
            {isNetflix ? 'Descrição da história' : isSpotify ? 'Letra da Música / Bio' : 'Mensagem'}
          </h2>
        </div>
        <p className="text-xs md:text-base text-white/40 font-medium max-w-md">
          {isNetflix 
            ? 'Escreva uma breve sinopse sobre a história de vocês. Ela aparecerá logo abaixo dos botões de reproduzir.' 
            : isSpotify
            ? 'Escreva uma mensagem ou letra que represente vocês. No Spotify, isso aparecerá no card de "Letra" e na biografia do artista.'
            : 'Escreva uma mensagem especial. Seja criativo e use as ferramentas de formatação para deixar do seu jeito.'}
        </p>
      </div>

      <div className="space-y-8 w-full max-w-md">
        <div className="space-y-4">
          <Label className="text-[11px] font-black uppercase tracking-wider text-white/60 text-center md:text-left block">
            {isNetflix ? 'O que resume vocês? ✍️' : isSpotify ? 'Sua letra ou biografia ✍️' : 'O que você quer dizer pro seu mozão? 📩'}
          </Label>
          
          <div className="editor-container w-full bg-[#0a0a0a] border border-[#222] rounded-xl overflow-hidden shadow-2xl">
            <div 
              ref={editorRef}
              id="editor"
              contentEditable="true"
              onInput={handleInput}
              className="editor-content min-h-[250px] p-5 text-white outline-none text-base leading-relaxed overflow-y-auto empty:before:content-['Escreva_algo_especial...'] empty:before:text-[#444] empty:before:pointer-events-none"
            />

            <div className="toolbar bg-[#111] border-t border-[#222] p-2 flex flex-wrap gap-1 items-center">
              <button className="tool-btn p-2 text-[#888] hover:bg-[#1a1a1a] hover:text-white rounded-md transition-all active:text-[#e11d48]" onMouseDown={preventDefault} onClick={() => execCmd('bold')} title="Negrito">
                <Bold className="w-4.5 h-4.5" />
              </button>
              <button className="tool-btn p-2 text-[#888] hover:bg-[#1a1a1a] hover:text-white rounded-md transition-all active:text-[#e11d48]" onMouseDown={preventDefault} onClick={() => execCmd('italic')} title="Itálico">
                <Italic className="w-4.5 h-4.5" />
              </button>
              <button className="tool-btn p-2 text-[#888] hover:bg-[#1a1a1a] hover:text-white rounded-md transition-all active:text-[#e11d48]" onMouseDown={preventDefault} onClick={() => execCmd('underline')} title="Sublinhado">
                <Underline className="w-4.5 h-4.5" />
              </button>
              <button className="tool-btn p-2 text-[#888] hover:bg-[#1a1a1a] hover:text-white rounded-md transition-all active:text-[#e11d48]" onMouseDown={preventDefault} onClick={() => execCmd('strikeThrough')} title="Riscado">
                <Strikethrough className="w-4.5 h-4.5" />
              </button>

              <div className="w-[1px] h-5 bg-[#222] mx-1" />

              <div className="relative group">
                <button className="tool-btn p-2 text-[#888] hover:bg-[#1a1a1a] hover:text-white rounded-md transition-all" title="Cor do Texto">
                  <Baseline className="w-4.5 h-4.5" />
                  <input 
                    type="color" 
                    className="absolute inset-0 opacity-0 cursor-pointer" 
                    onInput={(e) => execCmd('foreColor', (e.target as HTMLInputElement).value)} 
                  />
                </button>
              </div>

              <div className="relative group">
                <button className="tool-btn p-2 text-[#888] hover:bg-[#1a1a1a] hover:text-white rounded-md transition-all" title="Cor de Fundo">
                  <Highlighter className="w-4.5 h-4.5" />
                  <input 
                    type="color" 
                    className="absolute inset-0 opacity-0 cursor-pointer" 
                    onInput={(e) => execCmd('hiliteColor', (e.target as HTMLInputElement).value)} 
                    defaultValue="#3D0075"
                  />
                </button>
              </div>

              <div className="w-[1px] h-5 bg-[#222] mx-1" />

              <button className="tool-btn p-2 text-[#888] hover:bg-[#1a1a1a] hover:text-white rounded-md transition-all" onMouseDown={preventDefault} onClick={() => execCmd('justifyLeft')} title="Esquerda">
                <AlignLeft className="w-4.5 h-4.5" />
              </button>
              <button className="tool-btn p-2 text-[#888] hover:bg-[#1a1a1a] hover:text-white rounded-md transition-all" onMouseDown={preventDefault} onClick={() => execCmd('justifyCenter')} title="Centralizar">
                <AlignCenter className="w-4.5 h-4.5" />
              </button>
              <button className="tool-btn p-2 text-[#888] hover:bg-[#1a1a1a] hover:text-white rounded-md transition-all" onMouseDown={preventDefault} onClick={() => execCmd('justifyRight')} title="Direita">
                <AlignRight className="w-4.5 h-4.5" />
              </button>

              <div className="w-[1px] h-5 bg-[#222] mx-1" />

              <button className="tool-btn p-2 text-[#888] hover:bg-[#1a1a1a] hover:text-white rounded-md transition-all" onMouseDown={preventDefault} onClick={() => execCmd('insertUnorderedList')} title="Lista">
                <List className="w-4.5 h-4.5" />
              </button>
              <button className="tool-btn p-2 text-[#888] hover:bg-[#1a1a1a] hover:text-white rounded-md transition-all" onMouseDown={preventDefault} onClick={createLink} title="Adicionar Link">
                <LinkIcon className="w-4.5 h-4.5" />
              </button>
              <button className="tool-btn p-2 text-[#888] hover:bg-[#1a1a1a] hover:text-white rounded-md transition-all" onMouseDown={preventDefault} onClick={() => execCmd('removeFormat')} title="Limpar Formatação">
                <Trash2 className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>
        </div>

        {!isFixedTheme && (
          <div className="space-y-6 bg-white/5 p-6 rounded-2xl border border-white/10">
            <div className="flex items-center gap-2 mb-2"><Palette className="w-4 h-4 text-primary" /><h3 className="text-[11px] font-black uppercase tracking-widest text-white/60">Personalizar Bloco de Mensagem</h3></div>
            <div className="space-y-4"><Label className="text-[11px] font-bold text-white/50 uppercase">Fonte Base</Label><div className="grid grid-cols-2 gap-2">{FONT_OPTIONS.map((f) => (<button key={f.id} onClick={() => onMessageFontChange(f.id)} className={cn("px-4 py-3 rounded-xl border text-xs transition-all", messageFont === f.id ? "border-primary bg-primary/10 text-primary font-bold" : "border-white/10 bg-black/20 text-white/40 hover:border-white/20", f.class)}>{f.name}</button>))}</div></div>
            <div className="space-y-4 pt-4 border-t border-white/5"><Label className="text-[11px] font-bold text-white/50 uppercase">Cor Base do Texto</Label><div className="flex items-center gap-4">
                <Popover><PopoverTrigger asChild><button className="flex items-center gap-3 bg-white/5 border border-white/10 p-2 rounded-xl hover:bg-white/10 transition-all group"><div className="w-10 h-10 rounded-lg shadow-inner border border-white/10" style={{ backgroundColor: messageColor }} /><div className="text-left pr-4"><p className="text-[10px] font-black uppercase text-white/30 group-hover:text-primary transition-colors">Personalizar</p><p className="text-xs font-mono font-bold">{messageColor}</p></div></button></PopoverTrigger><PopoverContent className="w-auto p-0 border-none bg-transparent shadow-none" align="start"><ColorPicker selectedBgColor={messageColor} onChange={onMessageColorChange} /></PopoverContent></Popover>
                <div className="flex flex-wrap gap-1.5">{['#ffffff', '#ff4da6', '#e11d48', '#7c3aed', '#111111'].map((color) => (<button key={color} onClick={() => onMessageColorChange(color)} className={cn("w-6 h-6 rounded-full border transition-transform active:scale-90", messageColor === color ? "border-white scale-110" : "border-white/10")} style={{ backgroundColor: color }} />))}</div>
            </div></div>
          </div>
        )}

        {isSpotify && (
          <div className="space-y-6 bg-white/5 p-6 rounded-2xl border border-white/10 w-full max-w-md">
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
              <p className="text-[10px] text-primary font-black uppercase tracking-widest mb-1 flex items-center gap-2">
                <Palette className="w-3 h-3" /> Estilo Visual Fixo
              </p>
              <p className="text-[10px] text-white/40 leading-relaxed font-medium">
                No tema Spotify, a mensagem é apresentada como a letra da música e biografia do artista, utilizando tipografias e cores que seguem o design original do aplicativo.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
