import { UserConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

const config: UserConfig = {
  plugins: [
    VitePWA({
      manifest: {
        name: "Graphql TODO",
        short_name: "TODO",
        theme_color: "#4f46e5",
        background_color: "#93c5fd",        
        icons: [
          {
            "src": "logo.svg",
            "sizes": "48x48 72x72 96x96 128x128 192x192 256x256 384x384 512x512",
          },
          {
            "src": "icon-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "icon-256x256.png",
            "sizes": "256x256",
            "type": "image/png"
          },
          {
            "src": "icon-384x384.png",
            "sizes": "384x384",
            "type": "image/png"
          },
          {
            "src": "icon-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
          }
        ]
      }
    }),
  ],
}

export default config
