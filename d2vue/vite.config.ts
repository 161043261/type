import { fileURLToPath, URL } from 'node:url'
import { defineConfig /** , loadEnv */ } from 'vite'
import vue from '@vitejs/plugin-vue'
// 支持 JSX, TSX
// import vueJsx from '@vitejs/plugin-vue-jsx'
import { vitePluginTsx } from './plugins'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { px2vw } from './plugins/postcss'
import unoCss from 'unocss/vite'
import { presetAttributify, presetIcons, presetUno } from 'unocss'
import { visualizer } from 'rollup-plugin-visualizer'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // 文件名前缀为 d2vue-, 后缀为 .ce.vue 的文件, 将被视为自定义元素, 跳过组件检测
          isCustomElement: (tag) => tag.startsWith('d2vue-'),
        },
      },
    }),
    // vueJsx(),
    // 自定义 TSX 插件
    vitePluginTsx(),
    vueDevTools(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    unoCss({
      // 预设
      presets: [presetIcons(), presetAttributify(), presetUno()],
      rules: [
        ['_border', { border: '1px solid #ccc' }],
        [/^_w-(\d+)$/, ([, d]) => ({ width: `${Number(d)}px` })],
        [/^_p-(\d+)$/, ([, d]) => ({ padding: `${Number(d)}px` })],
      ],
      shortcuts: {
        cheerChen: ['_border', '_w-100', '_p-10'],
      },
    }),
    visualizer({ open: true }),
    VitePWA({
      // dist/manifest.webmanifest, dist/sw.js
      //! pnpm install -g http-server
      //! cd dist && http-server -p 5173
      workbox: {
        cacheId: 'd2vue', // 缓存名
        runtimeCaching: [
          {
            urlPattern: /.*\.js.*/, // 缓存文件
            handler: 'StaleWhileRevalidate', // 重新验证时失效
            options: {
              cacheName: 'd2vue-js',
              expiration: {
                maxEntries: 30, // 最大缓存文件数量, LRU 算法
                maxAgeSeconds: 30 * 24 * 60 * 60, // 缓存有效期
              },
            },
          },
        ],
      },
    }),
  ],

  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  css: {
    postcss: {
      // 自定义 postcss 插件
      plugins: [px2vw()],
    },
  },

  build: {
    // 代码块 (chunk) 大小 >2000 KiB 时警告
    chunkSizeWarningLimit: 2000,
    cssCodeSplit: true, // 开启 CSS 拆分
    sourcemap: false, // 不生成源代码映射文件 sourcemap
    minify: 'esbuild', // 最小化混淆, esbuild 打包速度最快, terser 打包体积最小
    cssMinify: 'esbuild', // CSS 最小化混淆
    assetsInlineLimit: 5000, // 静态资源大小 <5000 Bytes 时, 将打包为 base64
  },
})

// console.log(process.env)
// export default ({ mode }) => {
//   console.log('mode:', mode) // mode: development
//   console.log(loadEnv(mode, process.cwd())) // { VITE_HTTP: 'http://121.41.121.204:8080' }
//   return defineConfig({
//     plugins: [
//       vue(),

//       // vueJsx(),
//       // 自定义 TSX 插件
//       vitePluginTsx(),

//       vueDevTools(),
//       AutoImport({
//         resolvers: [ElementPlusResolver()],
//       }),
//       Components({
//         resolvers: [ElementPlusResolver()],
//       }),
//       unoCss({
//         // 预设
//         presets: [presetIcons(), presetAttributify(), presetUno()],
//         rules: [
//           ['_border', { border: '1px solid #ccc' }],
//           [/^_w-(\d+)$/, ([, d]) => ({ width: `${Number(d)}px` })],
//           [/^_p-(\d+)$/, ([, d]) => ({ padding: `${Number(d)}px` })],
//         ],
//         shortcuts: {
//           cheerChen: ['_border', '_w-100', '_p-10'],
//         },
//       }),
//       visualizer({ open: true }),
//     ],
//     resolve: {
//       alias: {
//         '@': fileURLToPath(new URL('./src', import.meta.url)),
//       },
//     },

//     css: {
//       postcss: {
//         // 自定义 postcss 插件
//         plugins: [px2vw()],
//       },
//     },
//   })
// }
