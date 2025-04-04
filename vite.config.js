import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Create separate chunks for large dependencies
          if (id.includes('node_modules')) {
            if (id.includes('three')) {
              return 'three'; // Separate chunk for Three.js
            }
            if (id.includes('framer-motion')) {
              return 'framer-motion'; // Separate chunk for Framer Motion
            }
            return 'vendor'; // Default chunk for other dependencies
          }
        },
      },
    },
  },
});