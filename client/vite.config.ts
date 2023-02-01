import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";

import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  base: process.env.NODE_ENV === "production" ? "./" : "/",
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      // 'views':resolve(__dirname,'src/views'),
      // 'utils': resolve(__dirname,'src/utils')
    },
  },
  optimizeDeps: {},
  build: {
    target: "modules",
    outDir: "dist",
    assetsDir: "assets",
    minify: "terser",
  },
  server: {
    cors: true,
    open: false,
    host: "0.0.0.0",
    port: 3005,
    strictPort: true,
    https: false,
    proxy: {
      "/api1": {
        target: "http://jpds.evdo.vip/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api1/, ""),
      },
      "/api2": {
        target: "http://121.37.148.60:9000/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api1/, ""),
      },
    },
  },
});
