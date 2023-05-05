import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000
  },
  resolve: {
    alias: {
      '@/': new URL('./src/', import.meta.url).pathname
    }
  },
  plugins: [react()],
})
