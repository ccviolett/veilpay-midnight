import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import wasm from 'vite-plugin-wasm';

export default defineConfig({
  base: './',
  plugins: [wasm(), react()],
  optimizeDeps: {
    exclude: ['@midnightntwrk/onchain-runtime-v4'],
  },
  build: {
    target: 'esnext',
  },
});
