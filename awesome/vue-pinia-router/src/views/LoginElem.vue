<script setup lang="ts">
import axios from 'axios'
import { ElMessage, type FormInstance, type FormItemRule } from 'element-plus'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

type Username = {
  username: string
}

interface Password {
  password: string
}

const formData: Username & Password = reactive({
  username: '',
  password: '',
})

type Rules = {
  [key in keyof Username & Password]?: Array<FormItemRule>
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
      addDynamicRouter() // 根据后端的响应, 动态添加路由
      router.push('/index')
      sessionStorage.setItem('token', Date.now().toString())
    } else {
      ElMessage.error('请输入账号/密码')
    }
  })
}

const form = ref<FormInstance>()

// http://localhost:5173/login
async function addDynamicRouter() {
  const res = await axios.get('http://localhost:3333/login', {
    params: formData, // { username: 'admin' | 'admin2', password: '1234' }
  })
  console.log(res)
  // 根据后端的响应, 动态添加路由
  res.data.routes.forEach((route: { path: string; name: string; component: string }) => {
    // router.addRoute() 动态添加路由, 返回删除该路由的回调函数
    /* const removeRoute =  */ router.addRoute({
      path: route.path,
      name: route.name,
      // 这里动态导入时, 不要使用 @ (src 别名), 使用相对路径
      // component: () => import(`@/views/${route.component}.vue`),
      component: () => import(`../views/${route.component}.vue`),
    })
  })
  // router.getRoutes() 获取所有路由信息
  console.log(router.getRoutes())
}
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
