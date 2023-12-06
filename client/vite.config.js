import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dns from "dns";
import dotenv from "dotenv";
import jsconfigpaths from "vite-jsconfig-paths";
dotenv.config();

dns.setDefaultResultOrder("verbatim");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), jsconfigpaths()],
  server: {
    port: 3500,
    host: false,
  },
});
