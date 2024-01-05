<template>
  <div class="center">
    <Map></Map>
    <Trend></Trend>
  </div>
</template>

<script setup lang="ts">
import Map from '@/pages/screen/components/center/map/index.vue'
import Trend from '@/pages/screen/components/center/trend/index.vue'
</script>

<style scoped>
.center {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
}
</style>
