// Type definitions for WGSL shader files

declare module '*.wgsl' {
  const content: string;
  export default content;
}

// WebGPU type extensions
declare global {
  interface Navigator {
    gpu: GPU;
  }
}

export {};
