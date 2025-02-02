import express from 'express'
import fs from 'node:fs'

const files = fs.readdirSync('../src/views')
for (const file of files) {
  if (file.startsWith('Demo')) {
    console.log(file) // DemoView.vue DemoView2.vue DemoView3.vue
  }
}

const app = express()
app.get('/login', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  // get 方法, 使用 req.query 获取参数
  // post 方法, 使用 req.body 获取参数
  console.log(req.query)
  if (req.query.username === 'admin') {
    res.json({
      routes: [
        { path: '/demo', name: 'Demo', component: 'DemoView' },
        { path: '/demo2', name: 'Demo2', component: 'DemoView2' },
      ],
    })
  } else if (req.query.username === 'admin2') {
    res.json({
      routes: [
        { path: '/demo', name: 'Demo', component: 'DemoView' },
        { path: '/demo3', name: 'Demo3', component: 'DemoView3' },
      ],
    })
  } else {
    res.json({
      routes: [],
      message: 'Not admin',
    })
  }
})

app.listen(3333, () => {
  console.log('http://localhost:3333')
})
