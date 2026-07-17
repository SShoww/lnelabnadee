import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: './',
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    watch: {
      // Exclude the scratch folder which contains locked Puppeteer browser profile files
      ignored: ['**/scratch/**', '**/archive-old-project/**']
    }
  }
})
