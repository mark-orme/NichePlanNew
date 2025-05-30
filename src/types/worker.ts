import type { Point } from './index';

// Web Worker message types for stroke smoothing
export interface SmoothingWorkerMessage {
  type: 'smooth';
  id: string;
  raw: Point[];
  options: {
    tension: number;
    alpha: number;
    preview: boolean;
  };
}

export interface SmoothingWorkerResponse {
  type: 'smoothed';
  id: string;
  points: Point[];
  preview: boolean;
  metrics?: {
    inputPoints: number;
    outputPoints: number;
    processingTime: number;
  };
}

// Worker error types
export interface WorkerError {
  type: 'error';
  id: string;
  message: string;
}

export type WorkerMessage = SmoothingWorkerMessage;
export type WorkerResponse = SmoothingWorkerResponse | WorkerError;
