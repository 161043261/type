import { defineConfig } from 'vite'
export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'useResize',
    },
    rollupOptions: {
      // 不打包的依赖
      external: ['vue'],
      output: {
        globals: {
          useResize: 'useResize',
        },
      },
    },
  },
})
