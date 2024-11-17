import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/agile-hack/',
  plugins: [react()],
  server: {
    proxy: {
      '/sprint': 'http://localhost:5001', 
      '/task': 'http://localhost:5001', 
      '/tasks': 'http://localhost:5001', 
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      },
    },
  },
})
