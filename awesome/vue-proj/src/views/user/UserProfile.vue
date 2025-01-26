<script lang="ts" setup>
import { updateUserProfileService } from '@/apis'
import { useProfileStore } from '@/stores'
import { storeToRefs } from 'pinia'

const profileStore = useProfileStore()
const { profile } = storeToRefs(profileStore)

const rules = {
  name: [
    { required: true, message: 'Input Name', trigger: 'blur' },
    { pattern: /^[\s\S]{1,16}$/, message: 'Name must be 1 to 16 characters', trigger: 'blur' }
  ],
  email: [
    { required: true, message: 'Input Email', trigger: 'blur' },
    { type: 'email', message: 'Email Format Error', trigger: 'blur' }
  ]
}

async function updateUserProfile() {
  await updateUserProfileService(profile.value)
}
</script>

<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>User Profile</span>
      </div>
    </template>
    <el-row>
      <el-col :span="12">
        <el-form :model="profile" :rules="rules" label-width="100px" size="large">
          <el-form-item label="Username">
            <el-input v-model="profile.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="Name" prop="name">
            <el-input v-model="profile.name"></el-input>
          </el-form-item>
          <el-form-item label="Email" prop="email">
            <el-input v-model="profile.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="updateUserProfile">Submit</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-card>
</template>
