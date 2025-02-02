<script setup lang="ts">
import { ElMessage, type FormInstance, type FormItemRule } from 'element-plus'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

type FormData = {
  username: string
}

interface IFormData {
  password: string
}

const formData: FormData & IFormData = reactive({
  username: '',
  password: '',
})

type Rules = {
  [key in keyof FormData & IFormData]?: Array<FormItemRule>
}

const rules: Rules = {
  username: [
    {
      required: true,
      message: '请输入账号',
    },
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
    },
  ],
}

const router = useRouter()
const onSubmit = () => {
  // console.log(form.value)
  form.value?.validate((isValid) => {
    console.log('isValid:', isValid)
    if (isValid) {
      router.push('/index')
      sessionStorage.setItem('token', Date.now().toString())
    } else {
      ElMessage.error('请输入账号/密码')
    }
  })
}

const form = ref<FormInstance>()
</script>

<template>
  <div class="login">
    <el-form ref="form" :rules="rules" :model="formData" class="demo-form-inline">
      <el-form-item prop="username" label="账号">
        <el-input v-model="formData.username" placeholder="请输入账号" clearable />
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input type="password" v-model="formData.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="scss">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
