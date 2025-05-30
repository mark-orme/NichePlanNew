import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,wasm}'],
        maximumFileSizeToCacheInBytes: 10000000,
      },
      manifest: {
        name: 'NichePlan Sketch',
        short_name: 'NichePlan',
        description: 'Professional WebGPU PWA for UK Estate Agent Marketing Teams',
        theme_color: '#2563eb',
        icons: [
          {
            src: '/favicon.ico',
            sizes: '64x64 32x32 24x24 16x16',
            type: 'image/x-icon',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.wgsl'],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'smoothing': ['./src/wasm/smoothing.js'],
          'webgpu-renderer': ['./src/hooks/useWebGPURenderer.ts'],
          'gia-tools': ['./src/utils/gia.ts', './src/components/MeasureTool.tsx'],
          'input-system': [
            './src/hooks/useOptimizedPointerStream.ts',
            './src/hooks/usePalmRejection.ts'
          ],
          'gestures': [
            './src/hooks/useUndoGestures.ts',
            './src/hooks/usePencilDoubleTap.ts',
            './src/hooks/useTripleTap.ts'
          ]
        }
      }
    },
    target: ['chrome113', 'safari18', 'firefox120']
  },
  optimizeDeps: {
    exclude: ['@wasm-tool/wasm-pack-plugin']
  }
})
