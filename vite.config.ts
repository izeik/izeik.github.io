import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { aiTutor } from "./server/aiTutor";
export default defineConfig(({ mode }) => ({
  plugins: [vue(), aiTutor(loadEnv(mode, process.cwd(), "AI_"))],
}));
