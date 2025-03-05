import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'

function App() {
  return (
    <>
      <div>
        {/* rel="noopener" 禁止新页面访问原页面的数据 */}
        <a href="https://vite.dev" target="_blank" rel="noopener">
          <img src={viteLogo} alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener">
          <img src={reactLogo} alt="React logo" />
        </a>
      </div>
    </>
  )
}

export default App
