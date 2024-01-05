<template>
  <div v-if="!setting.logoHidden" class="logo">
    <img :src="setting.logo" />
    <p>{{ setting.title }}</p>
  </div>
</template>

<script setup lang="ts">
import setting from '@/setting.ts'

defineOptions({
  name: 'Logo',
})
</script>

<style lang="scss" scoped>
.logo {
  flex: none;
  width: 100%;
  height: var(--menu-logo-height);
  padding: 10px;
  display: flex;
  align-items: center;

  img {
    height: calc(var(--menu-logo-height) - 10px);
    margin-right: 10px;
  }

  p {
    color: var(--title-white);
    font-size: var(--menu-title-size);
    white-space: nowrap;
    overflow: hidden;
  }
}
</style>
