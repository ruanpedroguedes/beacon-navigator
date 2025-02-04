import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/',  // Corrigido para funcionar melhor em diferentes ambientes
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Minha Aplicação React',
        short_name: 'MinhaApp',
        start_url: '/',
        display: 'standalone',
        theme_color: '#000000',
        background_color: '#ffffff',
        icons: [
          {
            src: 'icons/icon-192x192.png',  // Corrigido o caminho
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icons/icon-512x512.png',  // Corrigido o caminho
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
});
