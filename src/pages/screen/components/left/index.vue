<template>
  <div class="left">
    <Tourist></Tourist>
    <Gender></Gender>
    <Age></Age>
  </div>
</template>

<script setup lang="ts">
import Tourist from '@/pages/screen/components/left/tourist/index.vue'
import Gender from '@/pages/screen/components/left/gender/index.vue'
import Age from '@/pages/screen/components/left/age/index.vue'
</script>

<style lang="scss" scoped>
.left {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
}
</style>
