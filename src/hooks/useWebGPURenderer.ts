import { useState, useCallback, useRef } from 'react';
import type { WebGPUResources, Stroke, Point } from '@/types';

interface UseWebGPURenderer {
  initializeWebGPU: (canvas: HTMLCanvasElement) => Promise<void>;
  render: (strokes: Stroke[], currentStroke: Point[]) => void;
  isWebGPUSupported: boolean;
  webGPUError: string | null;
}

export default function useWebGPURenderer(): UseWebGPURenderer {
  const [isWebGPUSupported, setIsWebGPUSupported] = useState(false);
  const [webGPUError, setWebGPUError] = useState<string | null>(null);
  const resourcesRef = useRef<WebGPUResources | null>(null);

  const initializeWebGPU = useCallback(async (canvas: HTMLCanvasElement): Promise<void> => {
    try {
      if (!navigator.gpu) {
        throw new Error('WebGPU not supported');
      }
      
      setIsWebGPUSupported(true);
      const adapter = await navigator.gpu.requestAdapter();
      if (!adapter) throw new Error('No GPUAdapter found');
      
      const device = await adapter.requestDevice();
      const context = canvas.getContext('webgpu') as GPUCanvasContext;
      
      context.configure({
        device,
        format: navigator.gpu.getPreferredCanvasFormat(),
      });
      
      setWebGPUError(null);
    } catch (error) {
      setWebGPUError((error as Error).message);
    }
  }, []);
  
  const render = useCallback((strokes: Stroke[], currentStroke: Point[]): void => {
    // Basic render implementation
    console.log('Rendering', strokes.length, 'strokes');
  }, []);
  
  return { initializeWebGPU, render, isWebGPUSupported, webGPUError };
}
