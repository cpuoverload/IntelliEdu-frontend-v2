import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src", // 将 @ 映射到 /src 目录
    },
  },
  css: {
    modules: {
      generateScopedName: "[name]__[local]__[hash:base64:5]",
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8081",
        changeOrigin: true,
      },
    },
  },
});
