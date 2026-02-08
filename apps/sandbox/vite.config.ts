import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  server: {
    port: 5173
  },
  resolve: {
    alias: {
      "@starforge/engine": fileURLToPath(new URL("../../packages/engine/src/index.ts", import.meta.url))
    }
  }
});
