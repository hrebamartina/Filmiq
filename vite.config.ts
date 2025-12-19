import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true
    }),
    react()
  ],
  css: {
    preprocessorOptions: {
      scss: {
        //  дозволяє Sass шукати пакети у node_modules
        loadPaths: ["./node_modules"]
      }
    }
  }
});
