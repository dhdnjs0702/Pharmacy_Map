import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/kakao-maps": {
        target: "https://dapi.kakao.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/kakao-maps/, ""),
        secure: false,
      },
    },
  },
});