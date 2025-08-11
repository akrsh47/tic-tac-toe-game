// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',          // auto update the SW when new build available
      
      manifest: {
        name: 'X O.Tic,Tac,Win.',
        short_name: 'X O',
        description: 'A fun tic tac toe game',
        theme_color: '#df20a3',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        scope: '/',
        icons: [
          { src: '/icon192x192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icon512x512.png', sizes: '512x512', type: 'image/png' },
          
        ]
      }
    })
  ]
})
