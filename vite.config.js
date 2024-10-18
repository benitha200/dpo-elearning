// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import resolve from '@rollup/plugin-node-resolve';
// import path from 'path';

// export default defineConfig({
//   plugins: [
//     react(),
//     resolve(),
//   ],
//   base: '/',
//   server: {
//     watch: {
//       usePolling: true,
//     },
//   },
//   resolve: {
//     alias: {
//       '@components': path.resolve(__dirname, 'src/components'),
//     },
//   },
//   build: {
//     rollupOptions: {
//       external: ['@chakra-ui/react'],
//     },
//   },
// });

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import resolve from '@rollup/plugin-node-resolve';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    resolve(),
  ],
  base: '/',
  server: {
    watch: {
      usePolling: true,
    },
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
    },
  },
  build: {
    rollupOptions: {
      external: [], // Leave this array empty or remove it entirely
    },
  },
});
