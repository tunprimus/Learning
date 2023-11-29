import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [VitePWA({
    registerType: 'prompt',
    includeAssets: ['favicon.ico', 'apple-touch-icon.png',],
    manifest: {
      name: 'Colour Picker',
      short_name: 'colourPicker',
      description: 'A PWA Colour Picker made using Vite',
      theme_color: '#FFFFFF',
      start_url: '/',
      'display': 'standalone',
      icons: [
        {  
          src: 'pwa-192x192.png',  
          sizes: '192x192',  
          type: 'image/png',  
        },  
        {  
          src: 'pwa-512x512.png',  
          sizes: '512x512',  
          type: 'image/png',  
        },  
        {  
          src: 'pwa-512x512.png',  
          sizes: '512x512',  
          type: 'image/png',  
          purpose: 'any maskable',  
        }, 
      ],
    },
  })],
});
