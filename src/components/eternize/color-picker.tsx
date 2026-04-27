'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Label } from '@/components/ui/label';

interface ColorPickerProps {
  selectedBgColor: string;
  onChange: (hex: string) => void;
}

export function ColorPicker({ selectedBgColor, onChange }: ColorPickerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [hue, setHue] = useState(200);
  const isDragging = useRef(false);

  useEffect(() => {
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
      onChange(hex.toUpperCase());
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
    
    // Initial position if not set
    if (cursorRef.current && !cursorRef.current.style.left) {
      // Set to bottom (black) by default
      updateColorFromPos(0, canvas.height - 1);
    } else if (cursorRef.current) {
      // Re-sync on hue change
      updateColorFromPos(parseFloat(cursorRef.current.style.left), parseFloat(cursorRef.current.style.top));
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
  }, [hue, onChange]);

  return (
    <div className="bg-[#141414] rounded-[24px] p-6 w-full shadow-[0_30px_60px_rgba(0,0,0,0.8)] border border-[#222]">
      <span className="text-[11px] text-[#555] uppercase tracking-[1.5px] font-bold mb-3 block text-center md:text-left">Escolha a cor</span>
      
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
  );
}
