import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base:"/CRUD-USERS",
  plugins: [vue()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: ['src/main.js', './index.html'],
      
  },
    
},
})
