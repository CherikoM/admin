<template>
  <div class="container">
    <el-button plain class="btn" @click="goHome">回到首页</el-button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/home')
}
</script>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  background-image: url(../../assets/images//error_images/404.png);
  background-repeat: no-repeat;
  background-position: center center;
  .btn {
    position: absolute;
    top: 70%;
    left: 50%;
  }
}
</style>
