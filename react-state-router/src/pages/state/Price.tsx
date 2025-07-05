import usePriceStore from '@/store/price'

function Left() {
  const { incPrice, decPrice, resetPrice } = usePriceStore()

  return (
    <div className="flex gap-5 bg-blue-300">
      <button onClick={incPrice}>price++</button>
      <button onClick={decPrice}>price--</button>
      <button onClick={resetPrice}>resetPrice</button>
    </div>
  )
}

function Right() {
  const incPrice = usePriceStore((state) => state.incPrice)
  const decPrice = usePriceStore((state) => state.decPrice)
  const resetPrice = usePriceStore((state) => state.resetPrice)

  return (
    <div className="flex gap-5 bg-green-300">
      <button onClick={incPrice}>price++</button>
      <button onClick={decPrice}>price--</button>
      <button onClick={resetPrice}>resetPrice</button>
    </div>
  )
}

export default function Price() {
  const priceStore = usePriceStore()
  const { price } = priceStore
  const price2 = usePriceStore((state) => state.price)

  return (
    <div>
      <h1>Price</h1>
      <div className="flex gap-10">
        <Left />
        <Right />
      </div>
      price: {price}, {price2}
    </div>
  )
}
