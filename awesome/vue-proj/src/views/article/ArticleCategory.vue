<script lang="ts" setup>
import { Delete, Edit } from '@element-plus/icons-vue'
import useCategory from '@/hooks/useCategory'
import { ref } from 'vue'
import { deleteCategoryService, insertCategoryService, updateCategoryService } from '@/apis'
import { ElMessage, ElMessageBox } from 'element-plus'

const { categoryList, selectCategoryList } = useCategory()
const category = ref({ id: 0, categoryName: '' })
const rules = {
  categoryName: [{ required: true, message: 'Input category name', trigger: 'blur' }]
}
const title = ref('')
const visible = ref(false)

function show(t: string, row?: any) {
  visible.value = true
  title.value = t
  if (row == null) return
  category.value.id = row.id
  category.value.categoryName = row.categoryName
}

async function operate(t: string) {
  // Insert || Update
  switch (t) {
    case 'Insert Category':
      await insertCategoryService({ categoryName: category.value.categoryName })
      break
    case 'Update Category':
      await updateCategoryService(category.value)
      break
  }
  await selectCategoryList()
  category.value.categoryName = ''
  visible.value = false
}

async function deleteCategory(row: any) {
  ElMessageBox.confirm('Delete the Category, Continue?', 'WARNING', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    type: 'warning'
  })
    .then(async () => {
      await deleteCategoryService(row.id)
      await selectCategoryList()
    })
    .catch(() => {
      ElMessage.warning('Delete Cancel')
    })
}
</script>

<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>Article Category</span>
        <div class="extra">
          <el-button round type="primary" @click="show('Insert Category')"
            >Insert Category
          </el-button>
        </div>
      </div>
    </template>
    <el-table :data="categoryList" style="width: 100%">
      <el-table-column label="Row Number" type="index" width="100"></el-table-column>
      <el-table-column label="Category ID" prop="id"></el-table-column>
      <el-table-column label="Category Name" prop="categoryName"></el-table-column>
      <el-table-column label="Create User Id" prop="createUser"></el-table-column>
      <el-table-column label="Operation">
        <template #default="{ row }">
          <el-button
            :icon="Edit"
            plain
            round
            type="primary"
            @click="show('Update Category', row)"
          ></el-button>
          <el-button
            :icon="Delete"
            plain
            round
            type="danger"
            @click="deleteCategory(row)"
          ></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="No Data" />
      </template>
    </el-table>

    <el-dialog v-model="visible" :title="title" width="40%">
      <el-form :model="category" :rules="rules" label-width="120px" style="padding-right: 30px">
        <el-form-item label="Category Name" prop="categoryName">
          <el-input v-model="category.categoryName" maxlength="16" minlength="1"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button round @click="visible = false">Cancel</el-button>
          <el-button round type="primary" @click="operate(title)">Confirm</el-button>
        </span>
      </template>
    </el-dialog>
  </el-card>
</template>

<style scoped>
.page-container {
  min-height: 100%;
  box-sizing: border-box;
}

.page-container .header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
