import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Use a relative base so built assets use relative paths.
  // This allows the site to be deployed under a subpath (common on cPanel)
  base: './',
  plugins: [react()],
})
