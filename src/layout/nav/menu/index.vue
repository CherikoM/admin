<template>
  <div>
    <el-menu
      active-text-color="#ffd04b"
      background-color="#545c64"
      class="menu"
      :default-active="route.path"
      text-color="#fff"
      router
      :collapse="settingStore.menuFold"
    >
      <MenuCore :menuList="menuList"></MenuCore>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { RouteRecordRaw, useRoute } from 'vue-router'
import MenuCore from '@/layout/nav/menu/menuCore/index.vue'
import useSettingStore from '@/store/modules/setting'

defineOptions({
  name: 'Menu',
})

defineProps<{
  menuList: RouteRecordRaw[]
}>()

const route = useRoute()

const settingStore = useSettingStore()
</script>

<style lang="scss" scoped>
:deep(.menu) {
  background-color: transparent;
  border-right: none;

  .el-menu-item {
    --el-menu-hover-bg-color: black !important;
    &.is-active {
      color: #79bbff;
    }
  }

  .el-sub-menu {
    --el-menu-hover-bg-color: black !important;

    .el-menu--inline {
      background-color: transparent !important;
    }

    .el-menu-item {
      --el-menu-bg-color: black !important;
    }
  }
}
</style>
