import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
  },
  resolve: {
    alias: {
      '@summer/shared': '/../shared/src/index.ts',
    },
  },
  build: {
    assetsInlineLimit: 0,
    chunkSizeWarningLimit: 1500,
  },
});
