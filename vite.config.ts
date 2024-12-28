import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': { // Proxy requests starting with /api
        target: 'http://localhost:8080', // Your Java backend URL
        changeOrigin: true, // Required for some backend configurations
        rewrite: (path) => path.replace(/^\/api/, ''), // Optional: Remove /api from the path when forwarding
      },
    },
  },
});