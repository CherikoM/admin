<template>
  <div class="bar">
    <Bread></Bread>
    <Setting></Setting>
  </div>
</template>

<script setup lang="ts">
import Bread from '@/layout/bar/bread/index.vue'
import Setting from '@/layout/bar/setting/index.vue'
</script>

<style lang="scss" scoped>
.bar {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--el-border-color-light);
}
</style>
