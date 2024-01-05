<template>
  <div class="container">
    <div class="screen" ref="screen">
      <el-row>
        <el-col :span="24">
          <Banner></Banner>
        </el-col>
      </el-row>
      <el-row class="main">
        <el-col :span="6" class="left">
          <Left></Left>
        </el-col>
        <el-col :span="12" class="center">
          <Center></Center>
        </el-col>
        <el-col :span="6" class="right">
          <Right></Right>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import throttle from '@/utils/throttle'

import Banner from '@/pages/screen/components/banner/index.vue'
import Left from '@/pages/screen/components/left/index.vue'
import Center from '@/pages/screen/components/center/index.vue'
import Right from '@/pages/screen/components/right/index.vue'

const screen = ref()

onMounted(() => {
  resizeScreen()
})

const getScale = (w: number = 1920, h: number = 1080) => {
  const ww = window.innerWidth / w
  const wh = window.innerHeight / h
  return ww < wh ? ww : wh
}

const resizeScreen = () => {
  screen.value.style.transform = `scale(${getScale()}) `
}

window.addEventListener('resize', throttle(resizeScreen))
</script>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  background-image: url('@/pages/screen/images/bg.png');
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  --banner-font-color: #29fcff;

  .screen {
    position: fixed;
    width: 1920px;
    height: 1080px;
  }
}

.banner {
}

.main {
  height: 100%;
}
</style>
