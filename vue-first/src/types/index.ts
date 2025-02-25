// type constraint
export interface ICat {
  id: number
  name: string
  age: number
  optional?: number
}

// user-defined type
export type CatList = ICat[] // Array<Cat>
