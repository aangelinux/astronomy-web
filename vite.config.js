import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: 'client',
  server: {
    port: 3002,
    proxy: {
      '/genai': 'http://localhost:3001',
    },
  },
})
