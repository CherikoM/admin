<template>
  <div class="bread">
    <div class="icon" @click="settingStore.menuFold = !settingStore.menuFold">
      <el-icon v-show="!settingStore.menuFold">
        <Fold></Fold>
      </el-icon>
      <el-icon v-show="settingStore.menuFold">
        <Expand></Expand>
      </el-icon>
    </div>

    <!-- 面包屑 -->
    <el-breadcrumb separator-icon="ArrowRight">
      <!-- 优先级：v-if > v-for > v-show -->
      <el-breadcrumb-item
        v-for="(item, index) in route.matched"
        :key="index"
        class="breadcrumb"
        v-show="item.meta.title"
      >
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

import useSettingStore from '@/store/modules/setting'

const route = useRoute()
const settingStore = useSettingStore()
</script>

<style lang="scss" scoped>
.bread {
  display: flex;

  .icon {
    margin-left: 20px;
    margin-right: 10px;
    color: var(--el-text-color-regular);
  }

  .breadcrumb {
    :deep(.el-breadcrumb__inner) {
      display: flex;
      align-items: center;

      i {
        margin-right: 2px;
      }
    }
  }
}
</style>
