import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Adel_Portfolio-/',
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            const normalizedId = id.replace(/\\/g, '/');

            if (
              normalizedId.includes('/node_modules/three/') ||
              normalizedId.includes('/node_modules/three-stdlib/')
            ) {
              return 'three';
            }

            if (id.includes('framer-motion')) return 'framer-motion';
            return 'vendor';
          }
        },
      },
    },
  },
});
