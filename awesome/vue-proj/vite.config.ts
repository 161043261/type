import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '127.0.0.1',
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8080', // e.g. http://127.0.0.1:5173 -> http://127.0.0.1:8080
        changeOrigin: true,
        rewrite: (path: string) => {
          return path.replace('/api', '')
        }
      }
    }
  }
})
