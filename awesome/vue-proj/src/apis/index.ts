import axios, { type AxiosInstance, type AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import { useTokenStore } from '@/stores'
import router from '@/router'
import type { Article, Category, SelectArticleListParams, User } from '@/types'

// You can create a new instance of axios with a custom config.
const instance: AxiosInstance = axios.create({
  baseURL: '/api', // http://localhost:5173/api
  timeout: 5000
})

// You can intercept requests or responses before they are handled by then or catch.
// Add a request interceptor
instance.interceptors.request.use(
  function config(requestConfig) {
    // Do something before request is sent
    const tokenStore = useTokenStore()
    if (tokenStore.token.length > 0) {
      // { 'Authorization': tokenStore.token }
      // { 'Authorization': tokenStore.$state.token } // state
      // { 'Authorization': tokenStore.jwtString } // getters
      // { 'Authorization': sessionStorage.getItem('token') }
      requestConfig.headers.Authorization = tokenStore.token
    }
    return requestConfig
  },
  function (error) {
    // Do something with request error
    console.log(error)
    ElMessage.error(error.message)
    return Promise.reject(error)
  }
)

// Add a response interceptor
instance.interceptors.response.use(
  function (response: AxiosResponse<any, any>): any {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (response.data.code == 1) {
      ElMessage.success(response.data.message)
      return response
    }
    ElMessage.error(response.data.message)
    return Promise.reject(response)
  },
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response.status == 401) {
      ElMessage.error('Redirect to Login')
      await router.replace('/user')
    } else {
      ElMessage.error(error.message)
    }
    return Promise.reject(error)
  }
)

export function registerService(userData: { [prop: string]: string }) {
  // instance.method(url[, data[, config]])
  return instance.post('/user/register', userData, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
}

export function loginService(userData: { [prop: string]: any }) {
  const params = new URLSearchParams()
  for (const key in userData) {
    params.append(key, userData[key])
  }
  return instance.post('/user/login', params)
}

export function selectCategoryListService(config?: { headers: { [prop: string]: string } }) {
  return instance.get('/category', config)
}

export function insertCategoryService(category: Category) {
  return instance.post('/category', category)
}

export function updateCategoryService(category: Category) {
  return instance.put('/category', category)
}

export function deleteCategoryService(id: number) {
  return instance.delete(`/category?id=${id}`)
}

export function selectArticleListService(params: SelectArticleListParams) {
  return instance.get('/article', { params: params })
}

export function insertArticleService(article: Article) {
  return instance.post('/article', article)
}

export function profileService() {
  return instance.get('/user/profile')
}

export function updateUserProfileService(profile: User) {
  return instance.put('/user/update', profile)
}

export function updateUserAvatarService(avatar: string) {
  const params = new URLSearchParams()
  params.append('avatar', avatar)
  return instance.patch('/user/avatar', params)
}

export function updateUserPwdService(pwdList: { newPwd: string; confirmPwd: string; pwd: string }) {
  return instance.patch('/user/pwd', pwdList)
}

export function deleteArticleService(id: number) {
  return instance.delete(`/article?id=${id}`)
}

export function updateArticleService(article: Article) {
  return instance.put('/article', article)
}

export function detailService(id: number) {
  return instance.get('/article/detail', { params: { id: id } })
}
