import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // 👈 permet d'écouter toutes les IP
    allowedHosts: ['.ngrok-free.app', '.ngrok-free.dev'], // 👈 autorise les domaines ngrok
  },
})
