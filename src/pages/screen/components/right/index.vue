<template>
  <div class="right">
    <Hot></Hot>
    <Year></Year>
    <Booking></Booking>
  </div>
</template>

<script setup lang="ts">
import Hot from '@/pages/screen/components/right/hot/index.vue'
import Year from '@/pages/screen/components/right/year/index.vue'
import Booking from '@/pages/screen/components/right/booking/index.vue'
</script>

<style lang="scss" scoped>
.right {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
}
</style>
