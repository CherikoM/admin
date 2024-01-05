<template>
  <div class="setting">
    <div class="btns">
      <el-button icon="Refresh" circle @click="refresh"></el-button>
      <el-button icon="FullScreen" circle @click="fullScreen"></el-button>
      <el-popover placement="bottom" :width="100" trigger="hover">
        <template #reference>
          <el-button
            icon="Setting"
            circle
            @click="visible = !visible"
          ></el-button>
        </template>
        <el-form class="form">
          <el-form-item label="暗黑模式">
            <el-switch
              v-model="isDark"
              inline-prompt
              active-icon="MoonNight"
              inactive-icon="Sunrise"
              @change="switchDark"
            />
          </el-form-item>
        </el-form>
      </el-popover>
    </div>
    <div class="user">
      <img :src="userStore.avatar" alt="" />
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ userStore.name }}
          <el-icon class="el-icon--right"><arrow-down /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ElNotification } from 'element-plus'

import useUserStore from '@/store/modules/user'
import useSettingStore from '@/store/modules/setting'

const userStore = useUserStore()
const settingStore = useSettingStore()

const visible = ref(false)

const isDark = ref(false)

onMounted(() => {
  const dark = localStorage.getItem('dark')
  const html = document.documentElement
  if (dark) {
    html.classList.add('dark')
    isDark.value = true
  } else {
    html.classList.remove('dark')
    isDark.value = false
  }
})

// 刷新
const refresh = async () => {
  settingStore.load()
  settingStore.refresh()
}

// 全屏
const fullScreen = () => {
  document.fullscreenElement
    ? document.exitFullscreen()
    : document.documentElement.requestFullscreen()
}

// 退出登录
const logout = async () => {
  try {
    const name = await userStore.logout()
    ElNotification.success('再见，' + name)
  } catch (error) {
    ElNotification.error(error as Error)
  }
}

// 暗黑模式切换
const switchDark = () => {
  const html = document.documentElement
  if (isDark.value) {
    html.classList.add('dark')
    localStorage.setItem('dark', 'true')
  } else {
    html.classList.remove('dark')
    localStorage.removeItem('dark')
  }
}
</script>

<style lang="scss" scoped>
.setting {
  display: flex;
  align-items: center;
  margin-right: 10px;

  .btns {
    & > button {
      margin-left: 10px;
    }
  }

  .user {
    display: flex;
    align-items: center;

    img {
      @include circle(32px);
      margin-left: 15px;
      margin-right: 10px;
    }
  }
}

.form {
  :deep(.el-form-item) {
    .el-form-item__content {
      justify-content: center;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
