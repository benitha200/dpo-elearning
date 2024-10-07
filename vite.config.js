import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/dpo-elearning/',
  server: {
    watch: {
      usePolling: true,
    },
  },
});
