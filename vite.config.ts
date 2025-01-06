import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/document': {
        target: 'http://localhost:80',
        changeOrigin: true
      }
    }
  }
});