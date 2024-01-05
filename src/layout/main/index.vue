<template>
  <div>
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" v-if="!settingStore.refreshing" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import useSettingStore from '@/store/modules/setting'

const settingStore = useSettingStore()

defineOptions({
  name: 'Main',
})
</script>

<style lang="scss" scoped>
.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-enter-active {
  transition: all 0.3s;
}

.fade-enter-to {
  opacity: 1;
  transform: translateY(0px);
}
</style>
