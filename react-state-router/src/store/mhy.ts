import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface IMhy {
  games: {
    first: string
    second: string
    third: string
  }
  updateFirst: () => void
}

// const useMhyStore = create<IMhy>((set /** , get */) => {
//   return {
//     games: {
//       first: 'HI 1',
//       second: 'GI 1',
//       third: 'HSR 1',
//     },
//     updateFirst: () =>
//       set((state) => ({
//         games: {
//           // set 深层次状态时, 必须解构
//           ...state.games,
//           first:
//             state.games.first.split(' ')[0] +
//             ' ' +
//             (Number.parseInt(state.games.first.split(' ')[1]) + 1),
//         },
//       })),
//   }
// })

const useMhyStore = create<IMhy>()(
  immer((set /** , get */) => ({
    games: {
      first: 'HI 1',
      second: 'GI 1',
      third: 'HSR 1',
    },
    updateFirst: () =>
      set((state) => {
        state.games.first =
          state.games.first.split(' ')[0] +
          ' ' +
          (Number.parseInt(state.games.first.split(' ')[1]) + 1)
      }),
  })),
)

export default useMhyStore
