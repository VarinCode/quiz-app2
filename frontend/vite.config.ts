import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env.VITE_BACKEND_PORT": JSON.stringify(env.VITE_BACKEND_PORT),
      "process.env.VITE_API_URL": JSON.stringify(env.VITE_API_URL),
      "process.env.VITE_API_ENDPOINT": JSON.stringify(env.VITE_API_ENTPOINT),
      "process.env.VITE_API_ENDPOINT_SCORE": JSON.stringify(
        env.VITE_API_ENTPOINT_SCORE
      ),
    },
    plugins: [react()],
    resolve: {
      alias: {
        "node-fetch": "node-fetch/lib/index.js",
        stream: "stream-browserify",
      },
    },
  };
});
