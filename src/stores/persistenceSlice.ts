import type { StateCreator } from 'zustand';
import type { AppState } from '@/types';

export interface PersistenceSlice {
  saveToStorage: () => Promise<void>;
  loadFromStorage: () => Promise<void>;
  exportProject: () => string;
  importProject: (data: string) => void;
}

export const createPersistenceSlice: StateCreator<AppState, [], [], PersistenceSlice> = (set, get) => ({
  saveToStorage: async () => {
    try {
      const state = get();
      const dataToSave = {
        strokes: state.strokes,
        entities: state.entities,
        measurements: state.measurements,
        gridSettings: state.gridSettings,
        wallThickness: state.wallThickness,
        transform: state.transform,
        savedAt: Date.now(),
      };
      
      localStorage.setItem('nicheplan-project', JSON.stringify(dataToSave));
    } catch (error) {
      console.error('Failed to save to storage:', error);
    }
  },
  
  loadFromStorage: async () => {
    try {
      const saved = localStorage.getItem('nicheplan-project');
      if (!saved) return;
      
      const data = JSON.parse(saved);
      set(state => {
        state.strokes = data.strokes || [];
        state.entities = data.entities || [];
        state.measurements = data.measurements || [];
        state.gridSettings = { ...state.gridSettings, ...data.gridSettings };
        state.wallThickness = data.wallThickness || 0.2;
        state.transform = data.transform || { x: 0, y: 0, scale: 1 };
      });
    } catch (error) {
      console.error('Failed to load from storage:', error);
    }
  },
  
  exportProject: () => {
    const state = get();
    return JSON.stringify({
      strokes: state.strokes,
      entities: state.entities,
      measurements: state.measurements,
      gridSettings: state.gridSettings,
      wallThickness: state.wallThickness,
      transform: state.transform,
      exportedAt: Date.now(),
      version: '1.0.0',
    }, null, 2);
  },
  
  importProject: (data: string) => {
    try {
      const imported = JSON.parse(data);
      set(state => {
        state.strokes = imported.strokes || [];
        state.entities = imported.entities || [];
        state.measurements = imported.measurements || [];
        state.gridSettings = { ...state.gridSettings, ...imported.gridSettings };
        state.wallThickness = imported.wallThickness || 0.2;
        state.transform = imported.transform || { x: 0, y: 0, scale: 1 };
      });
    } catch (error) {
      console.error('Failed to import project:', error);
      throw new Error('Invalid project file format');
    }
  },
});
