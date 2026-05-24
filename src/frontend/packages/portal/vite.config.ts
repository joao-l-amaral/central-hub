import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/assets/shelveProducts': {
        target: 'http://localhost:4201',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/assets\/shelveProducts/, '/assets')
      },
      '/assets/gameVault': {
        target: 'http://localhost:4202',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/assets\/gameVault/, '/assets')
      },
      '/api': {
        target: 'http://localhost:8088',
        changeOrigin: true
      },
      '/auth': {
        target: 'http://localhost:8088',
        changeOrigin: true
      },
      '/realms': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  }
});
