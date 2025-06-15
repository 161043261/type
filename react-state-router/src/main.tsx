import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
// import App from "./App.tsx";
import { RouterProvider } from 'react-router'
import { router } from './router/index.tsx'
import '@ant-design/v5-patch-for-react-19'
import { produce } from 'immer'

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

// immer
const data = { user: { name: 'whoami', age: 22 } }
const newData = produce<typeof data>(data, (draft) => {
  draft.user.age = 23
})
// { user: { name: 'whoami', age: 23 } }
console.log(newData, newData === data)

// 花盆
const rootContainer = document.getElementById('root')!
// 树根
const root = createRoot(rootContainer)
// 成长, 开花
root.render(
  <StrictMode>
    <RouterProvider router={router}>
      {/* <BrowserRouter>
        <App />
      </BrowserRouter> */}
    </RouterProvider>
  </StrictMode>,
)
