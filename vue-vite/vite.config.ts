import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import defineOptions from 'unplugin-vue-define-options/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), vueDevTools(), defineOptions()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
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
