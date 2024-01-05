<template>
  <div>
    <el-card>
      <div class="card">
        <el-avatar :size="100" :src="userStore.avatar" />
        <div class="info">
          <h3>{{ getTime() }}好，{{ userStore.name }}</h3>
          <p>{{ setting.title }}</p>
        </div>
      </div>
    </el-card>
    <SvgIcon class="svg" name="welcome" width="500px" height="500px"></SvgIcon>
  </div>
</template>

<script setup lang="ts">
import setting from '@/setting'
import getTime from '@/utils/getTime'

import useUserStore from '@/store/modules/user'
const userStore = useUserStore()
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  .info {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    h3 {
      font-size: 24px;
      margin-bottom: 15px;
    }
    p {
      font-size: 14px;
      color: var(--home-sub-title-color);
      font-style: italic;
    }
  }
}

.svg {
  display: flex;
  justify-content: center;
}
</style>
