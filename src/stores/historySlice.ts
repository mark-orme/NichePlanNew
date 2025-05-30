import type { StateCreator } from 'zustand';
import type { AppState, HistorySnapshot } from '@/types';

export interface HistorySlice {
  history: HistorySnapshot[];
  historyIndex: number;
  createHistorySnapshot: (gestureType?: 'gesture-undo' | 'gesture-redo' | 'manual') => void;
  undo: () => void;
  redo: () => void;
  clearHistory: () => void;
}

export const createHistorySlice: StateCreator<AppState, [], [], HistorySlice> = (set, get) => ({
  history: [],
  historyIndex: -1,
  
  createHistorySnapshot: (gestureType = 'manual') => set(state => {
    const snapshot: HistorySnapshot = {
      strokes: [...state.strokes],
      entities: [...state.entities],
      measurements: [...state.measurements],
      transform: { ...state.transform },
      timestamp: Date.now(),
      gestureType,
    };
    
    if (state.historyIndex < state.history.length - 1) {
      state.history = state.history.slice(0, state.historyIndex + 1);
    }
    
    state.history.push(snapshot);
    state.historyIndex = state.history.length - 1;
    
    if (state.history.length > 100) {
      state.history = state.history.slice(-100);
      state.historyIndex = state.history.length - 1;
    }
  }),
  
  undo: () => set(state => {
    if (state.historyIndex <= 0) return;
    
    const newIndex = state.historyIndex - 1;
    const snapshot = state.history[newIndex];
    
    state.strokes = [...snapshot.strokes];
    state.entities = [...snapshot.entities];
    state.measurements = [...snapshot.measurements];
    state.transform = { ...snapshot.transform };
    state.historyIndex = newIndex;
  }),
  
  redo: () => set(state => {
    if (state.historyIndex >= state.history.length - 1) return;
    
    const newIndex = state.historyIndex + 1;
    const snapshot = state.history[newIndex];
    
    state.strokes = [...snapshot.strokes];
    state.entities = [...snapshot.entities];
    state.measurements = [...snapshot.measurements];
    state.transform = { ...snapshot.transform };
    state.historyIndex = newIndex;
  }),
  
  clearHistory: () => set(state => {
    state.history = [];
    state.historyIndex = -1;
  }),
});
