import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        // ✅ дозволяє Sass шукати пакети у node_modules
        loadPaths: ["./node_modules"],
      },
    },
  },
});
