import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {find: '@assets', replacement: '/src/assets'},
      {find: '@contexts', replacement: '/src/contexts'},
      {find: '@styles', replacement: '/src/styles'},
      {find: '@components', replacement: '/src/components'},
      {find: '@UI', replacement: '/src/components/UI'},
      {find: '@hooks', replacement: '/src/hooks'},
      {find: '@utils', replacement: '/src/utils'},
      {find: '@devlogs', replacement: '/src/devlogs'},
      {find: '@experience', replacement: '/src/experience'}
    ]
  }
})
