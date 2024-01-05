<template>
  <div class="container">
    <!-- 左侧菜单 -->
    <Nav :menuList="userStore.menuRoute" :collapse="collapse"></Nav>
    <div class="right">
      <!-- 顶部导航 -->
      <Bar v-model:navCollapse="collapse"></Bar>
      <!-- 内容 -->
      <div class="main" v-loading="settingStore.loading">
        <Main></Main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import Nav from '@/layout/nav/index.vue'
import Bar from '@/layout/bar/index.vue'
import Main from '@/layout/main/index.vue'

import useUserStore from '@/store/modules/user'
import useSettingStore from '@/store/modules/setting'

const userStore = useUserStore()
const settingStore = useSettingStore()

defineOptions({
  name: 'Layout',
})

const collapse = ref(false)
</script>

<style lang="scss" scoped>
.container {
  @include full();
  display: flex;

  .right {
    flex: 1;
    width: 0;

    .main {
      height: calc(100vh - 50px);
      padding: 20px;
      overflow-y: auto;
    }
  }
}
</style>
