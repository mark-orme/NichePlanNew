import type { Point } from '@/types';

interface QuadStripOptions {
  width?: number;
  pressureEnabled?: boolean;
  devicePixelRatio?: number;
}

interface QuadStripResult {
  vertices: Float32Array;
  indices: Uint16Array;
  vertexCount: number;
  indexCount: number;
}

export function buildQuadStrip(
  points: Point[],
  options: QuadStripOptions = {}
): QuadStripResult {
  if (points.length < 2) {
    return {
      vertices: new Float32Array(0),
      indices: new Uint16Array(0),
      vertexCount: 0,
      indexCount: 0,
    };
  }
  
  const {
    width = 4.0,
    pressureEnabled = true,
    devicePixelRatio = 1.0,
  } = options;
  
  const baseWidth = width * devicePixelRatio;
  const segmentCount = points.length - 1;
  const vertexCount = points.length * 2;
  const indexCount = segmentCount * 6;
  
  const vertices = new Float32Array(vertexCount * 7);
  const indices = new Uint16Array(indexCount);
  
  let vertexOffset = 0;
  let indexOffset = 0;
  
  for (let i = 0; i < points.length; i++) {
    const point = points[i];
    const pressure = pressureEnabled ? point.pressure : 1.0;
    const adjustedWidth = baseWidth * pressure;
    
    let normalX = 0;
    let normalY = 1;
    
    if (i < points.length - 1) {
      const nextPoint = points[i + 1];
      const dx = nextPoint.x - point.x;
      const dy = nextPoint.y - point.y;
      const length = Math.sqrt(dx * dx + dy * dy);
      
      if (length > 0) {
        normalX = -dy / length;
        normalY = dx / length;
      }
    }
    
    // Left vertex
    const leftIndex = vertexOffset * 7;
    vertices[leftIndex] = point.x - normalX * adjustedWidth;
    vertices[leftIndex + 1] = point.y - normalY * adjustedWidth;
    vertices[leftIndex + 2] = pressure;
    vertices[leftIndex + 3] = -normalX;
    vertices[leftIndex + 4] = -normalY;
    vertices[leftIndex + 5] = i / (points.length - 1);
    vertices[leftIndex + 6] = 0;
    
    // Right vertex
    const rightIndex = (vertexOffset + 1) * 7;
    vertices[rightIndex] = point.x + normalX * adjustedWidth;
    vertices[rightIndex + 1] = point.y + normalY * adjustedWidth;
    vertices[rightIndex + 2] = pressure;
    vertices[rightIndex + 3] = normalX;
    vertices[rightIndex + 4] = normalY;
    vertices[rightIndex + 5] = i / (points.length - 1);
    vertices[rightIndex + 6] = 1;
    
    vertexOffset += 2;
    
    if (i < segmentCount) {
      const baseVertex = i * 2;
      
      indices[indexOffset++] = baseVertex;
      indices[indexOffset++] = baseVertex + 1;
      indices[indexOffset++] = baseVertex + 2;
      
      indices[indexOffset++] = baseVertex + 1;
      indices[indexOffset++] = baseVertex + 3;
      indices[indexOffset++] = baseVertex + 2;
    }
  }
  
  return { vertices, indices, vertexCount: vertexOffset, indexCount: indexOffset };
}
