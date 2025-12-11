import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // The third parameter '' loads all env variables regardless of prefix
  const env = loadEnv(mode, '.', '');

  return {
    plugins: [react()],
    // Use VITE_BASE_PATH from env or default to /sales-helpbook
    base: env.VITE_BASE_PATH || '/sales-helpbook',
  };
});