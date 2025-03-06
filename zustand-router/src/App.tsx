import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import { useCntAndListStore } from './store/cnt_list'
import { useCntAndListStore2 } from './store/cnt_list2'

import { useEffect } from 'react'

function App() {
  const { cnt, addCnt, resetCnt, nameList, fetchList } = useCntAndListStore()
  const {
    cnt: cnt2,
    addCnt: addCnt2,
    resetCnt: resetCnt2,
    nameList: nameList2,
    fetchList: fetchList2,
  } = useCntAndListStore2()

  // fetchList()

  useEffect(() => {
    fetchList() // effect: React.EffectCallback
    fetchList2() // effect: React.EffectCallback
  }, [fetchList, fetchList2]) // deps?: React.DependencyList

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

      <div>
        <div>cnt: {cnt}</div>
        <button type="button" onClick={addCnt} className="rounded border-1">
          addCnt
        </button>
        <button type="button" onClick={resetCnt} className="rounded border-1">
          resetCnt
        </button>
      </div>

      <div>nameList.length: {nameList.length}</div>
      <ul className="flex justify-between">
        {nameList.map((item) => (
          <li key={item.id}>{item.cnName}</li>
        ))}
      </ul>
      <button type="button" onClick={fetchList}>
        fetchList
      </button>

      <hr />

      <div>
        <div>cnt: {cnt2}</div>
        <button type="button" onClick={addCnt2} className="rounded border-1">
          addCnt2
        </button>
        <button type="button" onClick={resetCnt2} className="rounded border-1">
          resetCnt2
        </button>
      </div>

      <div>nameList2.length: {nameList2.length}</div>
      <ul className="flex justify-between">
        {nameList2.map((item) => (
          <li key={item.id}>{item.cnName}</li>
        ))}
      </ul>
      <button type="button" onClick={fetchList2}>
        fetchList2
      </button>
    </>
  )
}

export default App
