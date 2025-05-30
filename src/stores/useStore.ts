import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { AppState, Point, Stroke, Entity, MeasurementEntity, ToolType } from '@/types';

const initialState: AppState = {
  currentStroke: [],
  strokes: [],
  smoothedStroke: [],
  entities: [],
  measurements: [],
  currentTool: 'pen',
  wallThickness: 0.2,
  transform: { x: 0, y: 0, scale: 1 },
  gridSettings: {
    snapEnabled: true,
    visible: true,
    enabled: true,
    pixelsPerMeter: 100,
    smallSpacing: 0.1,
    largeSpacing: 1.0,
    size: 100,
  },
  performanceMetrics: {
    averageLatency: 0,
    frameRate: 0,
    memoryUsage: 0,
    lastUpdate: 0,
  },
  history: [],
  historyIndex: -1,
};

export const useStore = create<AppState>()(
  immer((set, get) => ({
    ...initialState,
    
    addPointToCurrentStroke: (point: Point) => set(state => {
      state.currentStroke.push(point);
    }),
    
    setCurrentTool: (tool: ToolType) => set(state => {
      state.currentTool = tool;
    }),
    
    setWallThickness: (thickness: number) => set(state => {
      state.wallThickness = thickness;
    }),
    
    clearStrokes: () => set(state => {
      state.strokes = [];
    }),
  }))
);

export default useStore;
