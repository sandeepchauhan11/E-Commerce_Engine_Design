import { defineConfig } from 'vite'
import react from '@vitejs/react-refresh' // or @vitejs/plugin-react depending on your install

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // THIS IS THE CRITICAL FIX: Tell Vite your repository subfolder name
  base: '/E-Commerce_Engine_Design/', 
})