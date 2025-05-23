import { Connect, defineConfig, Plugin } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import mockjs from 'mockjs'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), viteServer()],
  resolve: {
    alias: {
      '@': path.join(process.cwd(), './src'),
      // '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})

function mockList(amount: number) {
  return mockjs.mock({
    [`list|${amount}`]: [
      {
        'id|+1': 1, // id: '@id()'
        // 'lng|28-30.7': 30,
        // 'lat|118-120.7': 120,
        // 'state|1-5': 3,
        // 'failureNum|0-200': 100,
        // address: '@county(true)',
        // engName: '@word',
        cnName: '@cname',
        // email: '@email',
      },
    ],
  }).list
}

const listFn: Connect.NextHandleFunction = (_req, res) => {
  res.setHeader('Content-Type', 'application/json')
  const resData = mockList(20)
  // resData[0].lng = 31.2513263
  // resData[0].lat = 121.3912291
  res.end(
    JSON.stringify({
      code: 200,
      message: '查询机器人列表',
      data: { list: resData },
    }),
  )
}

function viteServer(): Plugin {
  return {
    name: 'vite-server',
    configureServer(server) {
      server.middlewares.use('/api/list', listFn)
    },
  }
}
