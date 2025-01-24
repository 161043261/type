<script lang="ts" setup>
import { onBeforeUnmount, ref } from 'vue'
import { updateUserPwdService } from '@/apis'
import router from '@/router'

const pwdList = ref({
  pwd: '',
  newPwd: '',
  confirmPwd: ''
})

function checkPwd(rules: string, value: string, callback: (error?: Error) => any) {
  if (value == '') {
    callback(new Error('Confirm new password'))
  } else if (value != pwdList.value.newPwd) {
    callback(new Error('Confirm password is NOT equivalent to new password'))
  } else callback()
}

const rules = {
  pwd: [{ required: true, message: 'Input Password', trigger: 'blur' }],
  newPwd: [
    { required: true, message: 'Input New Password', trigger: 'blur' },
    { min: 4, max: 16, message: 'New password must be 4 to 16 characters', trigger: 'blur' }
  ],
  confirmPwd: [{ required: true, validator: checkPwd, trigger: 'blur' }]
}

async function updateUserPwd() {
  await updateUserPwdService(pwdList.value)
  await router.replace('/user')
}

onBeforeUnmount(() => {
  pwdList.value.pwd = ''
  pwdList.value.newPwd = ''
  pwdList.value.confirmPwd = ''
})
</script>

<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>User Profile</span>
      </div>
    </template>
    <el-row>
      <el-col :span="10">
        <el-form :model="pwdList" :rules="rules" label-width="auto" size="large">
          <el-form-item label="Password" placeholder="Input password" prop="pwd">
            <el-input v-model="pwdList.pwd" type="password"></el-input>
          </el-form-item>
          <el-form-item label="New Password" placeholder="Input new password" prop="newPwd">
            <el-input v-model="pwdList.newPwd" type="password"></el-input>
          </el-form-item>
          <el-form-item label="Confirm" placeholder="Confirm password" prop="confirmPwd">
            <el-input v-model="pwdList.confirmPwd" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="updateUserPwd">Submit</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-card>
</template>
