import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/wp-json/wp/v2": {
        target: "https://confiabilidadoperacional.com",
        changeOrigin: true,
      },
    },
  },
});
