import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
// import App from "./App.tsx";
import { RouterProvider } from 'react-router'
import { router } from './router/index.tsx'

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

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
