// xhr.readyState
// 1 未调用 send 方法
// 2 正在执行 send 方法
// 3 send 方法执行完成
// 4 正在解析响应
// 5 响应解析完成

// 原生 AJAX
export const myAxios = {
  get<T>(url: string): Promise<T> {
    return new Promise((resolve) => {
      const xhr = new XMLHttpRequest()
      xhr.open('GET', url)
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          setTimeout(() => {
            resolve(JSON.parse(xhr.responseText))
          }, 3000)
        }
      }
      xhr.send(null)
    })
  },
}
