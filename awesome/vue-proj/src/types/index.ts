export interface Result {
  code: number
  message: string
  data: any
}

export interface Category {
  categoryName: string
  createUser?: number
  createTime?: string
  updateTime?: string
}

export interface SelectArticleListParams {
  pageNum: number
  pageSize: number
  categoryId?: number | undefined
  state?: number | undefined
}

export interface Category {
  id?: number
  categoryName: string
  createUser?: number
  createTime?: string
  updateTime?: string
}

export interface Article {
  id?: number
  title: string
  content: string
  image: string
  state: number | undefined // state: 0 as BETA, 1 as RELEASE
  categoryId: number | undefined
  createUser?: number
  createTime?: string
  updateTime?: string
  stateName?: string
  categoryName?: string
}

export interface User {
  id?: number
  username: string
  name?: string
  email?: string
  avatar?: string
}
