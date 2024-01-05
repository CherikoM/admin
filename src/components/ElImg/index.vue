<template>
  <el-image class="img" :src="src" fit="cover">
    <template #error>
      <div class="image-slot">
        <el-icon class="icon" size="20px"><Picture /></el-icon>
        <p>暂无图片</p>
      </div>
    </template>
  </el-image>
</template>

<script setup lang="ts">
defineProps<{
  src: string
  width: string
  height?: string
}>()
</script>

<style lang="scss" scoped>
.img {
  width: v-bind(width);
  height: v-bind(height);

  .image-slot {
    width: 100%;
    height: 100%;
    background-color: var(--el-fill-color);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    p {
      font-size: 0.75rem;
    }
  }
}
</style>
