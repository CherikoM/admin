<template>
  <div class="nav" :class="{ col: settingStore.menuFold }">
    <!-- logo -->
    <Logo></Logo>
    <!-- 滚动组件 -->
    <el-scrollbar class="scroll">
      <!-- 菜单 -->
      <Menu :menuList="menuList"></Menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { RouteRecordRaw } from 'vue-router'

import Logo from '@/layout/nav/logo/index.vue'
import Menu from '@/layout/nav/menu/index.vue'

import useSettingStore from '@/store/modules/setting'

defineOptions({
  name: 'Nav',
})

defineProps<{
  menuList: RouteRecordRaw[]
}>()

const settingStore = useSettingStore()
</script>

<style lang="scss" scoped>
.nav {
  flex: none;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 30vw;
  max-width: 260px;
  background-color: var(--menu-bg-color);
  border-right: none;
  transition: 0.3s all;

  .scroll {
    flex: 1;
  }
}

.col {
  width: 60px;
}
</style>
