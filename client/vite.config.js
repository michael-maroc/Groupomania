import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dns from "dns";
import dotenv from "dotenv";
dotenv.config();

dns.setDefaultResultOrder("verbatim");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT,
    host: false,
  },
});
