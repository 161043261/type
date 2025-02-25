import { defineConfig } from "vite";
export default defineConfig({
  server: {
    host: "localhost", // default
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '')
      },
    },
  },
});
