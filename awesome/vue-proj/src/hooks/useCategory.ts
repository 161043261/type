import { selectCategoryListService } from '@/apis'
import type { Category, Result } from '@/types'
import { onMounted, type Ref, ref } from 'vue'

export default function () {
  const categoryList: Ref<Category[]> = ref([
    {
      id: 1,
      categoryName: 'CategoryA',
      createTime: '2006-01-02 15:04:05',
      updateTime: '2006-01-02 15:04:05'
    }
  ])

  async function selectCategoryList() {
    const response = await selectCategoryListService() // use axios request interceptor
    const result: Result = response.data as Result
    categoryList.value = result.data
  }

  onMounted(async () => {
    await selectCategoryList()
  })
  return { categoryList, selectCategoryList }
}
