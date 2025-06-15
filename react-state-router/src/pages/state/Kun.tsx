import { KunLeft, KunLeft2, KunLeft3, KunLeft4 } from './KunLeft'
import { KunRight, KunRight2, KunRight3, KunRight4 } from './KunRight'
import { KunMiddle, KunMiddle2, KunMiddle3, KunMiddle4 } from './KunMiddle'

export default function Kun() {
  console.log('Kun')
  return (
    <>
      <div className="flex gap-10">
        <h1>vanilla</h1>
        <KunLeft />
        <KunMiddle />
        <KunRight />
      </div>

      <hr />

      <div className="flex gap-10">
        <h1>immer</h1>
        <KunLeft2 />
        <KunMiddle2 />
        <KunRight2 />
      </div>

      <hr />

      <div className="flex gap-10">
        <h1>logger + vanilla</h1>
        <KunLeft3 />
        <KunMiddle3 />
        <KunRight3 />
      </div>

      <hr />

      <div className="flex gap-10">
        <h1>logger + immer</h1>
        <KunLeft4 />
        <KunMiddle4 />
        <KunRight4 />
      </div>
    </>
  )
}
