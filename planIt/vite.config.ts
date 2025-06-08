import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // 외부 접속 허용
    allowedHosts: ["plan-it-frontend.onrender.com"], // 허용할 호스트 추가
    port: 5173,
    strictPort: true,
  },
});
