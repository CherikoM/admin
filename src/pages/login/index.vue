<template>
  <div>
    <div class="container">
      <el-row>
        <el-col :span="12" :xs="0"></el-col>
        <el-col :span="12" :xs="24">
          <el-form :model="form" :rules="rules" class="form" ref="formEl">
            <h1>Hello</h1>
            <h2>欢迎来到幻♂想♂乡</h2>
            <el-form-item prop="username">
              <el-input prefix-icon="User" v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                prefix-icon="Lock"
                v-model="form.password"
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                :loading="btnLoading"
                type="primary"
                class="login_btn"
                @click="submit"
              >
                登录
              </el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElNotification, FormRules } from 'element-plus'
import useUserStore from '@/store/modules/user'
import getTime from '@/utils/getTime'

defineOptions({
  name: 'Login',
})

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

// 登录按钮是否加载
const btnLoading = ref(false)

// 表单元素
const formEl = ref()

// 表单数据
const form = reactive({
  username: 'admin',
  password: '111111',
})

const rules = reactive<FormRules>({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      required: true,
      min: 6,
      max: 16,
      message: '请输入6到16位密码',
      trigger: 'change',
    },
  ],
})

// 登录
const submit = async () => {
  await formEl.value.validate()
  btnLoading.value = true
  try {
    if (await userStore.login(form)) {
      ElNotification({
        type: 'success',
        message: '欢迎回来',
        title: `Hi，${getTime()}好`,
      })
      route.query.redirect
        ? router.push({ path: String(route.query.redirect) })
        : router.push('/')
    }
  } catch (error) {
    ElNotification.error(error as Error)
  } finally {
    btnLoading.value = false
  }
}
</script>

<style lang="scss" scoped>
.container {
  @include full;
  @include background-cover('@/assets/images/background.jpg');

  .form {
    position: relative;
    width: 80%;
    top: 30vh;
    @include background-cover('@/assets/images/login_form.png');
    margin: 0 auto;
    padding: 40px;

    h1 {
      color: var(--title-white);
      font-size: 40px;
    }

    h2 {
      color: var(--title-white);
      font-size: 20px;
      margin: 20px 0;
    }

    .login_btn {
      width: 100%;
    }
  }
}
</style>
