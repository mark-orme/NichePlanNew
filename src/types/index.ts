/**
 * NichePlan Core Type Definitions
 */

// ===== Drawing Types =====

export interface Point {
  x: number;
  y: number;
  pressure: number;
  tilt: number;
  timestamp: number;
  predicted?: boolean;
}

export interface Stroke {
  id: string;
  points: Point[];
  smoothedPoints?: Point[];
  tool: 'pen' | 'erase';
  color: string;
  completed: boolean;
  timestamp: number;
}

// ===== Entity Types =====

export interface Entity {
  id: string;
  type: string;
  x: number;
  y: number;
  rotation: number;
  properties: Record<string, any>;
  data: any;
}

export interface MeasurementEntity extends Entity {
  startPoint: { x: number; y: number };
  endPoint: { x: number; y: number };
  distance: number;
  value: number;
  unit: string;
  accuracy: number;
  confidence: number;
  points: Point[];
  metadata?: Record<string, any>;
}

// ===== State Management Types =====

export interface AppState {
  currentStroke: Point[];
  strokes: Stroke[];
  smoothedStroke: Point[];
  entities: Entity[];
  measurements: MeasurementEntity[];
  currentTool: 'pen' | 'measure' | 'select' | 'erase';
  wallThickness: number;
  transform: { x: number; y: number; scale: number };
  gridSettings: {
    snapEnabled: boolean;
    visible: boolean;
    enabled: boolean;
    pixelsPerMeter: number;
    smallSpacing: number;
    largeSpacing: number;
    size: number;
  };
  performanceMetrics: {
    averageLatency: number;
    frameRate: number;
    memoryUsage: number;
    lastUpdate: number;
  };
  history: HistorySnapshot[];
  historyIndex: number;
}

export interface HistorySnapshot {
  strokes: Stroke[];
  entities: Entity[];
  measurements: MeasurementEntity[];
  transform: { x: number; y: number; scale: number };
  timestamp: number;
  gestureType?: 'gesture-undo' | 'gesture-redo' | 'manual';
}

// ===== WebGPU and Worker Types =====

export interface SmoothingWorkerMessage {
  raw: Point[];
  options: { tension: number };
  preview?: boolean;
  final?: boolean;
}

export interface SmoothingWorkerResponse {
  points: Point[];
  final?: boolean;
  metrics?: {
    inputPoints: number;
    outputPoints: number;
    compressionRatio: number;
  };
  processingTime?: number;
  preview?: boolean;
}

export interface WebGPUResources {
  device: GPUDevice;
  context: GPUCanvasContext;
  pipeline: GPURenderPipeline;
  vertexBuffer: GPUBuffer;
  indexBuffer: GPUBuffer;
  uniformBuffer: GPUBuffer;
  brushTexture: GPUTexture;
  sampler: GPUSampler;
}

export type ToolType = 'pen' | 'measure' | 'select' | 'erase';
export type GestureType = 'pan' | 'zoom' | 'rotate' | 'undo' | 'redo' | 'none';
export type PerformanceLevel = 'optimal' | 'good' | 'warning' | 'critical';
export type MeasurementUnit = 'm' | 'cm' | 'mm' | 'ft' | 'in';
