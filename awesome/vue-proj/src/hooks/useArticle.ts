import { onMounted, type Ref, ref } from 'vue'
import { selectArticleListService } from '@/apis'
import type { Article, Result, SelectArticleListParams } from '@/types'

import useCategory from './useCategory'

export default function () {
  const { categoryList } = useCategory()
  const params: Ref<SelectArticleListParams> = ref({
    pageNum: 1,
    pageSize: 5
  })

  const total = ref(0)

  const articleList: Ref<Article[]> = ref([
    {
      id: 1,
      title: 'TitleA',
      content: 'ContentA',
      image: '@/assets/default.png',
      state: 0,
      categoryId: 1,
      createTime: '2006-01-02 15:04:05',
      updateTime: '2006-01-02 15:04:05'
    }
  ])

  async function selectArticleList(params: SelectArticleListParams) {
    const response = await selectArticleListService(params)
    const result: Result = response.data as Result
    total.value = result.data.total
    articleList.value = result.data.items
    for (const article of articleList.value) {
      // state -> stateName
      article.stateName = article.state == 0 ? 'BETA' : 'RELEASE'
    }

    for (const article of articleList.value) {
      // categoryId -> categoryName
      for (const category of categoryList.value) {
        if (article.categoryId === category.id) {
          article.categoryName = category.categoryName
          break
        }
      }
    }
  }

  onMounted(async () => {
    await selectArticleList(params.value)
  })
  return { categoryList, params, total, articleList, selectArticleList }
}
