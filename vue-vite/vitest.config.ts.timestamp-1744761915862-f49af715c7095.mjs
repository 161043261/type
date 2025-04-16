// vitest.config.ts
import { fileURLToPath as fileURLToPath2 } from "node:url";
import { mergeConfig, defineConfig as defineConfig2, configDefaults } from "file:///C:/Users/usr16/github/type/vue-vite/node_modules/.pnpm/vitest@2.1.8_@types+node@22.10.9_jsdom@25.0.1_sass@1.83.4/node_modules/vitest/dist/config.js";

// vite.config.ts
import { fileURLToPath, URL as URL2 } from "node:url";
import { defineConfig } from "file:///C:/Users/usr16/github/type/vue-vite/node_modules/.pnpm/vite@6.0.7_@types+node@22.10.9_sass@1.83.4/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/usr16/github/type/vue-vite/node_modules/.pnpm/@vitejs+plugin-vue@5.2.1_vi_53f3ea95968994f76030cdd419c09252/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///C:/Users/usr16/github/type/vue-vite/node_modules/.pnpm/@vitejs+plugin-vue-jsx@4.1._69290443c2d9b4ff3f3679afde5c5e72/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import vueDevTools from "file:///C:/Users/usr16/github/type/vue-vite/node_modules/.pnpm/vite-plugin-vue-devtools@7._b1afdd2cba7b301d0347f1a8c82d5a23/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
import defineOptions from "file:///C:/Users/usr16/github/type/vue-vite/node_modules/.pnpm/unplugin-vue-define-options_a55ddadfc2fe8ad85d79e2ddb3801882/node_modules/unplugin-vue-define-options/dist/vite.js";
var __vite_injected_original_import_meta_url = "file:///C:/Users/usr16/github/type/vue-vite/vite.config.ts";
var vite_config_default = defineConfig({
  plugins: [vue(), vueJsx(), vueDevTools(), defineOptions()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL2("./src", __vite_injected_original_import_meta_url))
    }
  }
  // css: {
  //   preprocessorOptions: {
  //     // css 预处理
  //     scss: {
  //       // 全局导入
  //       // additionalData: `@import "../bem.scss";`, // @import 已弃用
  //       additionalData: `@use "../bem.scss" as *;`,
  //     },
  //   },
  // },
  // server: {
  //   // 代理
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:3000',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, ''),
  //     },
  //   },
  // },
});

// vitest.config.ts
var __vite_injected_original_import_meta_url2 = "file:///C:/Users/usr16/github/type/vue-vite/vitest.config.ts";
var vitest_config_default = mergeConfig(
  vite_config_default,
  defineConfig2({
    test: {
      environment: "jsdom",
      exclude: [...configDefaults.exclude, "e2e/**"],
      root: fileURLToPath2(new URL("./", __vite_injected_original_import_meta_url2))
    }
  })
);
export {
  vitest_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZXN0LmNvbmZpZy50cyIsICJ2aXRlLmNvbmZpZy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXHVzcjE2XFxcXGdpdGh1YlxcXFx0eXBlXFxcXHZ1ZS12aXRlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx1c3IxNlxcXFxnaXRodWJcXFxcdHlwZVxcXFx2dWUtdml0ZVxcXFx2aXRlc3QuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy91c3IxNi9naXRodWIvdHlwZS92dWUtdml0ZS92aXRlc3QuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCB9IGZyb20gJ25vZGU6dXJsJ1xuaW1wb3J0IHsgbWVyZ2VDb25maWcsIGRlZmluZUNvbmZpZywgY29uZmlnRGVmYXVsdHMgfSBmcm9tICd2aXRlc3QvY29uZmlnJ1xuaW1wb3J0IHZpdGVDb25maWcgZnJvbSAnLi92aXRlLmNvbmZpZydcblxuZXhwb3J0IGRlZmF1bHQgbWVyZ2VDb25maWcoXG4gIHZpdGVDb25maWcsXG4gIGRlZmluZUNvbmZpZyh7XG4gICAgdGVzdDoge1xuICAgICAgZW52aXJvbm1lbnQ6ICdqc2RvbScsXG4gICAgICBleGNsdWRlOiBbLi4uY29uZmlnRGVmYXVsdHMuZXhjbHVkZSwgJ2UyZS8qKiddLFxuICAgICAgcm9vdDogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuLycsIGltcG9ydC5tZXRhLnVybCkpLFxuICAgIH0sXG4gIH0pLFxuKVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx1c3IxNlxcXFxnaXRodWJcXFxcdHlwZVxcXFx2dWUtdml0ZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcdXNyMTZcXFxcZ2l0aHViXFxcXHR5cGVcXFxcdnVlLXZpdGVcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL3VzcjE2L2dpdGh1Yi90eXBlL3Z1ZS12aXRlL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXG5cbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcbmltcG9ydCB2dWVKc3ggZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlLWpzeCdcbmltcG9ydCB2dWVEZXZUb29scyBmcm9tICd2aXRlLXBsdWdpbi12dWUtZGV2dG9vbHMnXG5pbXBvcnQgZGVmaW5lT3B0aW9ucyBmcm9tICd1bnBsdWdpbi12dWUtZGVmaW5lLW9wdGlvbnMvdml0ZSc7XG5cbi8vIGh0dHBzOi8vdml0ZS5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW3Z1ZSgpLCB2dWVKc3goKSwgdnVlRGV2VG9vbHMoKSwgZGVmaW5lT3B0aW9ucygpXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQCc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKSxcbiAgICB9LFxuICB9LFxuICAvLyBjc3M6IHtcbiAgLy8gICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XG4gIC8vICAgICAvLyBjc3MgXHU5ODg0XHU1OTA0XHU3NDA2XG4gIC8vICAgICBzY3NzOiB7XG4gIC8vICAgICAgIC8vIFx1NTE2OFx1NUM0MFx1NUJGQ1x1NTE2NVxuICAvLyAgICAgICAvLyBhZGRpdGlvbmFsRGF0YTogYEBpbXBvcnQgXCIuLi9iZW0uc2Nzc1wiO2AsIC8vIEBpbXBvcnQgXHU1REYyXHU1RjAzXHU3NTI4XG4gIC8vICAgICAgIGFkZGl0aW9uYWxEYXRhOiBgQHVzZSBcIi4uL2JlbS5zY3NzXCIgYXMgKjtgLFxuICAvLyAgICAgfSxcbiAgLy8gICB9LFxuICAvLyB9LFxuXG4gIC8vIHNlcnZlcjoge1xuICAvLyAgIC8vIFx1NEVFM1x1NzQwNlxuICAvLyAgIHByb3h5OiB7XG4gIC8vICAgICAnL2FwaSc6IHtcbiAgLy8gICAgICAgdGFyZ2V0OiAnaHR0cDovL2xvY2FsaG9zdDozMDAwJyxcbiAgLy8gICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAvLyAgICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKC9eXFwvYXBpLywgJycpLFxuICAvLyAgICAgfSxcbiAgLy8gICB9LFxuICAvLyB9LFxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBMlMsU0FBUyxpQkFBQUEsc0JBQXFCO0FBQ3pVLFNBQVMsYUFBYSxnQkFBQUMsZUFBYyxzQkFBc0I7OztBQ0Q2TyxTQUFTLGVBQWUsT0FBQUMsWUFBVztBQUUxVSxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFDaEIsT0FBTyxZQUFZO0FBQ25CLE9BQU8saUJBQWlCO0FBQ3hCLE9BQU8sbUJBQW1CO0FBTitKLElBQU0sMkNBQTJDO0FBUzFPLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxJQUFJLEdBQUcsT0FBTyxHQUFHLFlBQVksR0FBRyxjQUFjLENBQUM7QUFBQSxFQUN6RCxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLGNBQWMsSUFBSUMsS0FBSSxTQUFTLHdDQUFlLENBQUM7QUFBQSxJQUN0RDtBQUFBLEVBQ0Y7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBc0JGLENBQUM7OztBRHJDMEwsSUFBTUMsNENBQTJDO0FBSTVPLElBQU8sd0JBQVE7QUFBQSxFQUNiO0FBQUEsRUFDQUMsY0FBYTtBQUFBLElBQ1gsTUFBTTtBQUFBLE1BQ0osYUFBYTtBQUFBLE1BQ2IsU0FBUyxDQUFDLEdBQUcsZUFBZSxTQUFTLFFBQVE7QUFBQSxNQUM3QyxNQUFNQyxlQUFjLElBQUksSUFBSSxNQUFNRix5Q0FBZSxDQUFDO0FBQUEsSUFDcEQ7QUFBQSxFQUNGLENBQUM7QUFDSDsiLAogICJuYW1lcyI6IFsiZmlsZVVSTFRvUGF0aCIsICJkZWZpbmVDb25maWciLCAiVVJMIiwgIlVSTCIsICJfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsIiwgImRlZmluZUNvbmZpZyIsICJmaWxlVVJMVG9QYXRoIl0KfQo=
