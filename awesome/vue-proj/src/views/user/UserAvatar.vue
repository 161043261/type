<script lang="ts" setup>
import { onBeforeUnmount, ref } from 'vue'
import png from '@/assets/default.png'
import { Plus, Upload } from '@element-plus/icons-vue'
import { useProfileStore, useTokenStore } from '@/stores'
import { storeToRefs } from 'pinia'
import type { Result } from '@/types'
import { updateUserAvatarService } from '@/apis'

let { profile } = storeToRefs(useProfileStore())
let { token } = useTokenStore()
const upload = ref()

const uploaded = (result: Result) => {
  console.log(result.data)
  profile.value.avatar = result.data
}

async function updateUserAvatar(avatar: string) {
  await updateUserAvatarService(avatar)
}

onBeforeUnmount(() => {
  useProfileStore().getProfile()
})
</script>

<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>Update Avatar</span>
      </div>
    </template>
    <el-row>
      <el-col :span="12">
        <el-upload
          ref="upload"
          :auto-upload="true"
          :headers="{ Authorization: token }"
          :on-success="uploaded"
          :show-file-list="false"
          action="/api/upload"
          class="avatar-uploader"
          name="image"
        >
          <img
            v-if="profile.avatar != undefined && profile.avatar.trim().length > 0"
            :src="`/${profile.avatar}`"
            alt="avatar"
            class="avatar"
          />
          <img v-else :src="png" alt="default" width="280" />
        </el-upload>
        <br />
        <el-button
          :icon="Plus"
          round
          size="large"
          @click="upload.$el.querySelector('input').click()"
        >
          Select Image
        </el-button>
        <el-button
          :icon="Upload"
          round
          size="large"
          type="primary"
          @click="updateUserAvatar(profile.avatar as string)"
        >
          Update Avatar
        </el-button>
      </el-col>
    </el-row>
  </el-card>
</template>

<style scoped>
.avatar-uploader :deep(.avatar) {
  width: 280px;
  height: 280px;
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
  width: 280px;
  height: 280px;
  text-align: center;
}
</style>
