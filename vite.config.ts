import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/sjtx': {
        target: 'https://api.btstu.cn',
        changeOrigin: true
      }
    }
  }
})
