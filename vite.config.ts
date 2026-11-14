import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { aiTutor } from "./server/aiTutor";
export default defineConfig(({ mode }) => ({
  // Pages may publish dist at the site root or under a branch's /dist/ directory.
  base: "./",
  // Cached HTML must still be able to load its previously published hashed entry.
  build: { emptyOutDir: false },
  plugins: [vue(), aiTutor(loadEnv(mode, process.cwd(), "AI_"))],
}));
