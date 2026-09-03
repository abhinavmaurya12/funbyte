// Vite config for GitHub Pages deployment
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/funbyte/',
  plugins: [react()],
})
