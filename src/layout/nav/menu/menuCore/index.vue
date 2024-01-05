<template>
  <template v-for="item in menuList" :key="item.path">
    <template v-if="!item.meta?.hidden">
      <!-- 没有子项 -->
      <el-menu-item
        v-if="!item.children || item.children.length == 0"
        :index="item.path"
      >
        <el-icon>
          <component :is="item.meta?.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.meta?.title }}</span>
        </template>
      </el-menu-item>
      <!-- 有一个子项 -->
      <el-menu-item
        v-else-if="item.children.length === 1"
        :index="item.children[0].path"
      >
        <el-icon>
          <component :is="item.children[0].meta?.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.children[0].meta?.title }}</span>
        </template>
      </el-menu-item>
      <!-- 有多个子项 -->
      <el-sub-menu v-else :index="item.path">
        <template #title>
          <el-icon>
            <component :is="item.meta?.icon"></component>
          </el-icon>
          <span>{{ item.meta?.title }}</span>
        </template>
        <MenuCore :menuList="item.children"></MenuCore>
      </el-sub-menu>
    </template>
  </template>
</template>

<script setup lang="ts">
import { RouteRecordRaw } from 'vue-router'

defineOptions({
  name: 'MenuCore',
})

defineProps<{
  menuList: RouteRecordRaw[]
}>()
</script>

<style lang="scss" scoped></style>
