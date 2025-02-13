<script lang="ts" setup>
import { Delete, Edit, Plus } from '@element-plus/icons-vue'

import useArticle from '@/hooks/useArticle'
import { type Ref, ref, watch } from 'vue'
import type { Article, Result } from '@/types'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { useTokenStore } from '@/stores'
import {
  deleteArticleService,
  detailService,
  insertArticleService,
  updateArticleService
} from '@/apis'
import { ElMessage, ElMessageBox } from 'element-plus'

enum Operate {
  INSERT,
  UPDATE
}

let operate: number = Operate.INSERT
const { token } = useTokenStore()
const { params, categoryList, total, articleList, selectArticleList } = useArticle()

watch(
  params,
  async (newValue, oldValue) => {
    await selectArticleList(params.value)
  },
  {
    deep: true, // default true
    immediate: true // default false
  }
)

const visible = ref(false)
const article: Ref<Article> = ref({
  title: '',
  content: '',
  image: '',
  state: undefined,
  categoryId: undefined
})

async function selectAll() {
  ;[
    params.value.categoryId,
    params.value.state,
    article.value.title,
    article.value.content,
    article.value.categoryId,
    article.value.state
  ] = [undefined, undefined, '', '<p></p>', undefined, undefined]
  await selectArticleList(params.value)
}

const uploaded = (result: Result) => {
  // console.log(result.data)
  article.value.image = result.data
}

async function submit() {
  // 0 as insert, 1 as update
  if (operate == Operate.INSERT) {
    await insertArticleService(article.value)
  } else {
    await updateArticleService(article.value)
  }
  await selectAll()
  visible.value = false
}

async function deleteArticle(row: any) {
  ElMessageBox.confirm('Delete the Article, Continue?', 'WARNING', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    type: 'warning'
  })
    .then(async () => {
      await deleteArticleService(row.id)
      await selectAll()
    })
    .catch(() => {
      ElMessage.warning('Delete Cancel')
    })
}

async function updateArticle(row: any) {
  let response = await detailService(row.id)
  let result: Result = response.data
  article.value = result.data
  visible.value = true
  console.log(article.value)
}
</script>

<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>Article Management</span>
        <div class="extra">
          <el-button
            round
            type="primary"
            @click="
              operate = Operate.INSERT
              visible = true
            "
            >Insert Article</el-button
          >
        </div>
      </div>
    </template>
    <el-form inline>
      <el-form-item label="Article Category">
        <el-select v-model="params.categoryId" placeholder="Category List">
          <el-option v-for="c in categoryList" :key="c.id" :label="c.categoryName" :value="c.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Article State">
        <el-select v-model="params.state" placeholder="0 as BETA, 1 as RELEASE">
          <el-option label="BETA" value="0"></el-option>
          <el-option label="RELEASE" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button round type="danger" @click="selectAll">Reset Condition</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="articleList" style="width: 100%">
      <el-table-column label="Row Number" type="index" width="100"></el-table-column>
      <el-table-column label="Article ID" prop="id"></el-table-column>
      <el-table-column label="Article Title" prop="title"></el-table-column>
      <el-table-column label="Category Name" prop="categoryName"></el-table-column>
      <el-table-column label="Create Date" prop="createTime"></el-table-column>
      <el-table-column label="Update Date" prop="updateTime"></el-table-column>
      <el-table-column label="Article State" prop="stateName"></el-table-column>
      <el-table-column label="Operation" width="100">
        <template #default="{ row }">
          <el-button
            :icon="Edit"
            circle
            plain
            type="primary"
            @click="
              operate = Operate.UPDATE
              updateArticle(row)
            "
          ></el-button>
          <el-button
            :icon="Delete"
            circle
            plain
            type="danger"
            @click="deleteArticle(row)"
          ></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="No Data" />
      </template>
    </el-table>
    <el-pagination
      v-model:current-page="params.pageNum"
      v-model:page-size="params.pageSize"
      :page-sizes="[5, 10, 15]"
      :total="total"
      layout="jumper, total, sizes, prev, pager, next"
      style="margin-top: 20px; justify-content: flex-end"
    />
    <el-drawer v-model="visible" direction="rtl" size="80%" title="Insert Article">
      <el-form :model="article" label-width="100px">
        <el-form-item label="Title">
          <el-input v-model="article.title" placeholder="Input Title"></el-input>
        </el-form-item>
        <el-form-item label="Category">
          <el-select v-model="article.categoryId" placeholder="Select Category">
            <el-option v-for="c in categoryList" :key="c.id" :label="c.categoryName" :value="c.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Image">
          <el-upload
            :auto-upload="true"
            :headers="{ Authorization: token }"
            :on-success="uploaded"
            :show-file-list="false"
            action="/api/upload"
            class="avatar-uploader"
            name="image"
          >
            <img v-if="article.image" :src="article.image" alt="image" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="Content">
          <div class="editor">
            <quill-editor v-model:content="article.content" contentType="html"></quill-editor>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            round
            @click="
              article.state = 0
              submit()
            "
            >BETA</el-button
          >
          <el-button
            round
            type="primary"
            @click="
              article.state = 1
              submit()
            "
            >RELEASE</el-button
          >
        </el-form-item>
      </el-form>
    </el-drawer>
  </el-card>
</template>

<style scoped>
.el-select {
  --el-select-width: 300px;
}

.page-container {
  min-height: 100%;
  box-sizing: border-box;
}

.page-container .header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.avatar-uploader :deep(.avatar) {
  width: 180px;
  height: 180px;
  display: block;
}

.avatar-uploader :deep(.el-upload) {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader :deep(.el-upload:hover) {
  border-color: var(--el-color-primary);
}

.avatar-uploader :deep(.avatar-uploader-icon) {
  font-size: 28px;
  color: black;
  width: 180px;
  height: 180px;
  text-align: center;
}

.editor {
  width: 100%;
}

.editor :deep(.ql-editor) {
  min-height: 200px;
}
</style>
