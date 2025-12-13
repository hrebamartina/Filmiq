/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

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
        loadPaths: ["./node_modules"]
      }
    }
  },

  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./vitest.setup.ts",
    include: ["src/**/*.test.{ts,tsx}"],
    exclude: ["cypress/**", "node_modules/**"],

    coverage: {
      provider: "istanbul",
      reporter: ["text", "lcov"]
    }
  }
});
