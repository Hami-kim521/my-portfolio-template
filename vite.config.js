import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// GitHub Pages 프로젝트 사이트(https://{사용자명}.github.io/my-portfolio/) 경로
export default defineConfig({
  base: '/my-portfolio/',
  plugins: [react()],
})
