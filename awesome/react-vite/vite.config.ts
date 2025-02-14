import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import type { Plugin } from "vite";
import mockjs from "mockjs";
import url from "node:url";
// const viteMockServer = (): Plugin => {
// };

function viteMockServer(): Plugin {
  return {
    name: "vite-mock-server",
    configureServer(server) {
      // 区分大小写
      // http://localhost:5173/api/list?keyWord=11
      server.middlewares.use("/api/list", (req, res) => {
        const parseUrl = url.parse(
          req.originalUrl!,
          true /* parseQueryString */,
        ).query;
        res.setHeader("Content-Type", "application/json");
        const data = mockjs.mock({
          "list|1000": [
            {
              "id|+1": 1,
              name: parseUrl.keyWord,
              address: "@county(true)",
            },
          ],
        });
        res.end(JSON.stringify(data));
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), viteMockServer()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '')
      },
    },
  },
  // 基于 postcss-module
  css: {
    modules: {
      localsConvention: 'dashes', // 修改 css-module 类名规则, 可以使用 xxxYyy, 也可以使用 xxx-yyy
      // 修改打包后的类名规则: name 文件名, local 类名
      generateScopedName: '[name]__[local]__[hash:base64:5]'
    }
  }
});

