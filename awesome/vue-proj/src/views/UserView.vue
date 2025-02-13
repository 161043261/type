<script lang="ts" setup>
import { Lock, User } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import { loginService, registerService } from '@/apis'
import { useRouter } from 'vue-router'
import type { Result } from '@/types'
import { useProfileStore, useTokenStore } from '@/stores'
import { ElMessage } from 'element-plus'
import { storeToRefs } from 'pinia'

const router = useRouter()
const isLogin = ref(true)
const user = ref({
  username: '',
  password: '',
  confirmPwd: ''
})

function checkPwd(rules: string, value: string, callback: (error?: Error) => any) {
  if (value == '') {
    callback(new Error('Confirm password is required'))
  } else if (value != user.value.password) {
    callback(new Error('Password is NOT equivalent to confirm password'))
  } else callback()
}

const rules = reactive({
  username: [
    { required: true, message: 'Username is required', trigger: 'blur' },
    { min: 4, max: 16, message: 'Username must be 4 to 16 characters', trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'Password is required', trigger: 'blur' },
    { min: 4, max: 16, message: 'Password must be 4 to 16 characters', trigger: 'blur' }
  ],
  confirmPwd: [{ required: true, validator: checkPwd, trigger: 'blur' }]
})

async function register() {
  if (user.value.password != user.value.confirmPwd) {
    user.value.password = ''
    user.value.confirmPwd = ''
    ElMessage.error('Password is NOT equivalent to confirmPwd')
    return
  }
  await registerService({
    username: user.value.username,
    password: user.value.password
  })
  isLogin.value = true
}

const tokenStore = useTokenStore()
let { token } = storeToRefs(tokenStore)

async function login() {
  let response = await loginService(user.value)
  let result: Result = response.data as Result
  tokenStore.$subscribe((mutation, state) => {
    console.log('set sessionStorage')
    sessionStorage.setItem('token', state.token)
  })
  token.value = result.data // trigger tokenStore.$subscribe
  await useProfileStore().getProfile()
  await router.replace('/article')
}
</script>

<template>
  <el-row class="login-page" v-bind:rules="rules">
    <el-col :span="12" class="bg" />
    <el-col :offset="3" :span="6" class="form">
      <!-- Login Form -->
      <el-form
        v-if="isLogin"
        ref="form"
        :model="user"
        :rules="rules"
        autocomplete="off"
        label-width="auto"
        size="large"
      >
        <el-form-item>
          <h1>Login</h1>
        </el-form-item>
        <el-form-item label="Username" prop="username">
          <!-- prop="username" corresponds to rules.value.username -->
          <el-input v-model="user.username" :prefix-icon="User" placeholder="Input username" />
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input
            v-model="user.password"
            :prefix-icon="Lock"
            name="password"
            placeholder="Input password"
            type="password"
          />
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>Remember me</el-checkbox>
            <el-link :underline="false" type="primary">Forget password?</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button auto-insert-space class="button" type="primary" @click="login"
            >Login</el-button
          >
        </el-form-item>
        <el-form-item class="flex">
          <el-link :underline="false" type="info" @click="isLogin = false">Register</el-link>
        </el-form-item>
      </el-form>

      <!-- Register Form -->
      <el-form
        v-else
        ref="form"
        :model="user"
        :rules="rules"
        autocomplete="off"
        label-width="auto"
        size="large"
      >
        <el-form-item>
          <h1>Register</h1>
        </el-form-item>
        <el-form-item label="Username" prop="username">
          <el-input v-model="user.username" :prefix-icon="User" placeholder="Input username" />
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input
            v-model="user.password"
            :prefix-icon="Lock"
            placeholder="Input password"
            type="password"
          />
        </el-form-item>
        <el-form-item label=" Confirm" prop="confirmPwd">
          <el-input
            v-model="user.confirmPwd"
            :prefix-icon="Lock"
            placeholder="Confirm password"
            type="password"
          />
        </el-form-item>
        <el-form-item>
          <el-button auto-insert-space class="button" type="primary" @click="register"
            >Register</el-button
          >
        </el-form-item>
        <el-form-item class="flex">
          <el-link :underline="false" type="info" @click="isLogin = true">Go back</el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style scoped>
.login-page {
  height: 100vh;
  background-color: white;
}

.login-page .bg {
  background: url('@/assets/default.png') no-repeat center / cover;
  border-radius: 0 20px 20px 0;
}

.login-page .form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  user-select: none;
}

.login-page .form .title {
  margin: 0 auto;
}

.login-page .form .button {
  width: 100%;
}

.login-page .form .flex {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
