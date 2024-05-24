import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: '~', replacement: '/src' }]
  },
  define: {
    // Cho phép truy cập biến môi trường trong code
    'process.env': process.env
  }
})
