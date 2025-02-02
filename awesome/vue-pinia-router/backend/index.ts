import express from 'express'
import fs from 'node:fs'

const files = fs.readdirSync('../src/views')
for (const file of files) {
  if (file.startsWith('Demo')) {
    console.log(file)
  }
}

const app = express()
app.get('/login', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  // get 方法, 使用 req.query
  // post 方法, 使用 req.body
  if (req.query.username === 'admin' && req.query.password === '1234') {
    res.json({
      route: [
        {
          path: '/demo',
          name: 'Demo',
          component: 'DemoView.vue',
        },
        {
          path: '/demo2',
          name: 'Demo2',
          component: 'DemoView2.vue',
        },
        {
          path: '/demo3',
          name: 'Demo3',
          component: 'DemoView3.vue',
        },
      ],
    })
  } else if (req.query.user === 'admin2' && req.query.password === '1234') {
    res.json({
      route: [
        {
          path: '/demo',
          name: 'Demo',
          component: 'DemoView.vue',
        },
        {
          path: '/demo3',
          name: 'Demo3',
          component: 'DemoView3.vue',
        },
      ],
    })
  } else {
    res.json({
      code: 400,
      message: '账号或密码错误',
    })
  }
})

app.listen(3333, () => {
  console.log('http://localhost:3333')
})
