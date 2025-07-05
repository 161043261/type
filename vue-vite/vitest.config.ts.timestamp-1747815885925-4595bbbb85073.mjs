// vitest.config.ts
import { fileURLToPath as fileURLToPath2 } from 'node:url'
import {
  mergeConfig,
  defineConfig as defineConfig2,
  configDefaults,
} from 'file:///C:/Users/usr16/github/type/vue-vite/node_modules/.pnpm/vitest@2.1.8_@types+node@22.10.9_jsdom@25.0.1_sass@1.83.4/node_modules/vitest/dist/config.js'

// vite.config.ts
import { fileURLToPath, URL as URL2 } from 'node:url'
import { defineConfig } from 'file:///C:/Users/usr16/github/type/vue-vite/node_modules/.pnpm/vite@6.0.7_@types+node@22.10.9_sass@1.83.4/node_modules/vite/dist/node/index.js'
import vue from 'file:///C:/Users/usr16/github/type/vue-vite/node_modules/.pnpm/@vitejs+plugin-vue@5.2.1_vi_53f3ea95968994f76030cdd419c09252/node_modules/@vitejs/plugin-vue/dist/index.mjs'
import vueJsx from 'file:///C:/Users/usr16/github/type/vue-vite/node_modules/.pnpm/@vitejs+plugin-vue-jsx@4.1._69290443c2d9b4ff3f3679afde5c5e72/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs'
import vueDevTools from 'file:///C:/Users/usr16/github/type/vue-vite/node_modules/.pnpm/vite-plugin-vue-devtools@7._b1afdd2cba7b301d0347f1a8c82d5a23/node_modules/vite-plugin-vue-devtools/dist/vite.mjs'
import defineOptions from 'file:///C:/Users/usr16/github/type/vue-vite/node_modules/.pnpm/unplugin-vue-define-options_a55ddadfc2fe8ad85d79e2ddb3801882/node_modules/unplugin-vue-define-options/dist/vite.js'
var __vite_injected_original_import_meta_url =
  'file:///C:/Users/usr16/github/type/vue-vite/vite.config.ts'
function hotUpdate() {
  return {
    name: 'vite-plugin-hot-update',
    handleHotUpdate({ file: absoluteFilePath, server }) {
      server.ws.send({
        type: 'custom',
        event: 'custom-update',
        data: { absoluteFilePath },
      })
    },
  }
}
var vite_config_default = defineConfig({
  plugins: [vue(), vueJsx(), vueDevTools(), defineOptions(), hotUpdate()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL2('./src', __vite_injected_original_import_meta_url)),
    },
  },
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
})

// vitest.config.ts
var __vite_injected_original_import_meta_url2 =
  'file:///C:/Users/usr16/github/type/vue-vite/vitest.config.ts'
var vitest_config_default = mergeConfig(
  vite_config_default,
  defineConfig2({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath2(new URL('./', __vite_injected_original_import_meta_url2)),
    },
  }),
)
export { vitest_config_default as default }
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZXN0LmNvbmZpZy50cyIsICJ2aXRlLmNvbmZpZy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXHVzcjE2XFxcXGdpdGh1YlxcXFx0eXBlXFxcXHZ1ZS12aXRlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx1c3IxNlxcXFxnaXRodWJcXFxcdHlwZVxcXFx2dWUtdml0ZVxcXFx2aXRlc3QuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy91c3IxNi9naXRodWIvdHlwZS92dWUtdml0ZS92aXRlc3QuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCB9IGZyb20gJ25vZGU6dXJsJ1xuaW1wb3J0IHsgbWVyZ2VDb25maWcsIGRlZmluZUNvbmZpZywgY29uZmlnRGVmYXVsdHMgfSBmcm9tICd2aXRlc3QvY29uZmlnJ1xuaW1wb3J0IHZpdGVDb25maWcgZnJvbSAnLi92aXRlLmNvbmZpZydcblxuZXhwb3J0IGRlZmF1bHQgbWVyZ2VDb25maWcoXG4gIHZpdGVDb25maWcsXG4gIGRlZmluZUNvbmZpZyh7XG4gICAgdGVzdDoge1xuICAgICAgZW52aXJvbm1lbnQ6ICdqc2RvbScsXG4gICAgICBleGNsdWRlOiBbLi4uY29uZmlnRGVmYXVsdHMuZXhjbHVkZSwgJ2UyZS8qKiddLFxuICAgICAgcm9vdDogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuLycsIGltcG9ydC5tZXRhLnVybCkpLFxuICAgIH0sXG4gIH0pLFxuKVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx1c3IxNlxcXFxnaXRodWJcXFxcdHlwZVxcXFx2dWUtdml0ZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcdXNyMTZcXFxcZ2l0aHViXFxcXHR5cGVcXFxcdnVlLXZpdGVcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL3VzcjE2L2dpdGh1Yi90eXBlL3Z1ZS12aXRlL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXG5cbmltcG9ydCB7IGRlZmluZUNvbmZpZywgUGx1Z2luIH0gZnJvbSAndml0ZSdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IHZ1ZUpzeCBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUtanN4J1xuaW1wb3J0IHZ1ZURldlRvb2xzIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1kZXZ0b29scydcbmltcG9ydCBkZWZpbmVPcHRpb25zIGZyb20gJ3VucGx1Z2luLXZ1ZS1kZWZpbmUtb3B0aW9ucy92aXRlJ1xuXG5mdW5jdGlvbiBob3RVcGRhdGUoKTogUGx1Z2luIHtcbiAgcmV0dXJuIHtcbiAgICBuYW1lOiAndml0ZS1wbHVnaW4taG90LXVwZGF0ZScsXG4gICAgaGFuZGxlSG90VXBkYXRlKHsgZmlsZTogYWJzb2x1dGVGaWxlUGF0aCwgc2VydmVyIH0pIHtcbiAgICAgIHNlcnZlci53cy5zZW5kKHtcbiAgICAgICAgdHlwZTogJ2N1c3RvbScsXG4gICAgICAgIGV2ZW50OiAnY3VzdG9tLXVwZGF0ZScsXG4gICAgICAgIGRhdGE6IHsgYWJzb2x1dGVGaWxlUGF0aCB9LFxuICAgICAgfSlcbiAgICB9LFxuICB9XG59XG5cbi8vIGh0dHBzOi8vdml0ZS5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW3Z1ZSgpLCB2dWVKc3goKSwgdnVlRGV2VG9vbHMoKSwgZGVmaW5lT3B0aW9ucygpLCBob3RVcGRhdGUoKV0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0AnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjJywgaW1wb3J0Lm1ldGEudXJsKSksXG4gICAgfSxcbiAgfSxcbiAgLy8gY3NzOiB7XG4gIC8vICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xuICAvLyAgICAgLy8gY3NzIFx1OTg4NFx1NTkwNFx1NzQwNlxuICAvLyAgICAgc2Nzczoge1xuICAvLyAgICAgICAvLyBcdTUxNjhcdTVDNDBcdTVCRkNcdTUxNjVcbiAgLy8gICAgICAgLy8gYWRkaXRpb25hbERhdGE6IGBAaW1wb3J0IFwiLi4vYmVtLnNjc3NcIjtgLCAvLyBAaW1wb3J0IFx1NURGMlx1NUYwM1x1NzUyOFxuICAvLyAgICAgICBhZGRpdGlvbmFsRGF0YTogYEB1c2UgXCIuLi9iZW0uc2Nzc1wiIGFzICo7YCxcbiAgLy8gICAgIH0sXG4gIC8vICAgfSxcbiAgLy8gfSxcblxuICAvLyBzZXJ2ZXI6IHtcbiAgLy8gICAvLyBcdTRFRTNcdTc0MDZcbiAgLy8gICBwcm94eToge1xuICAvLyAgICAgJy9hcGknOiB7XG4gIC8vICAgICAgIHRhcmdldDogJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMCcsXG4gIC8vICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgLy8gICAgICAgcmV3cml0ZTogKHBhdGgpID0+IHBhdGgucmVwbGFjZSgvXlxcL2FwaS8sICcnKSxcbiAgLy8gICAgIH0sXG4gIC8vICAgfSxcbiAgLy8gfSxcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTJTLFNBQVMsaUJBQUFBLHNCQUFxQjtBQUN6VSxTQUFTLGFBQWEsZ0JBQUFDLGVBQWMsc0JBQXNCOzs7QUNENk8sU0FBUyxlQUFlLE9BQUFDLFlBQVc7QUFFMVUsU0FBUyxvQkFBNEI7QUFDckMsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sWUFBWTtBQUNuQixPQUFPLGlCQUFpQjtBQUN4QixPQUFPLG1CQUFtQjtBQU4rSixJQUFNLDJDQUEyQztBQVExTyxTQUFTLFlBQW9CO0FBQzNCLFNBQU87QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLGdCQUFnQixFQUFFLE1BQU0sa0JBQWtCLE9BQU8sR0FBRztBQUNsRCxhQUFPLEdBQUcsS0FBSztBQUFBLFFBQ2IsTUFBTTtBQUFBLFFBQ04sT0FBTztBQUFBLFFBQ1AsTUFBTSxFQUFFLGlCQUFpQjtBQUFBLE1BQzNCLENBQUM7QUFBQSxJQUNIO0FBQUEsRUFDRjtBQUNGO0FBR0EsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLElBQUksR0FBRyxPQUFPLEdBQUcsWUFBWSxHQUFHLGNBQWMsR0FBRyxVQUFVLENBQUM7QUFBQSxFQUN0RSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLGNBQWMsSUFBSUMsS0FBSSxTQUFTLHdDQUFlLENBQUM7QUFBQSxJQUN0RDtBQUFBLEVBQ0Y7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBc0JGLENBQUM7OztBRGxEMEwsSUFBTUMsNENBQTJDO0FBSTVPLElBQU8sd0JBQVE7QUFBQSxFQUNiO0FBQUEsRUFDQUMsY0FBYTtBQUFBLElBQ1gsTUFBTTtBQUFBLE1BQ0osYUFBYTtBQUFBLE1BQ2IsU0FBUyxDQUFDLEdBQUcsZUFBZSxTQUFTLFFBQVE7QUFBQSxNQUM3QyxNQUFNQyxlQUFjLElBQUksSUFBSSxNQUFNRix5Q0FBZSxDQUFDO0FBQUEsSUFDcEQ7QUFBQSxFQUNGLENBQUM7QUFDSDsiLAogICJuYW1lcyI6IFsiZmlsZVVSTFRvUGF0aCIsICJkZWZpbmVDb25maWciLCAiVVJMIiwgIlVSTCIsICJfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsIiwgImRlZmluZUNvbmZpZyIsICJmaWxlVVJMVG9QYXRoIl0KfQo=
