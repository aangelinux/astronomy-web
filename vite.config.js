import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: 'client',
  server: {
    port: 3002,
    proxy: {
      '/auth': 'http://localhost:3001',
      '/genai': 'http://localhost:3001',
      '/logout': 'http://localhost:3001'
    },
  },
})
