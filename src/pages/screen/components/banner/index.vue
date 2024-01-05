<template>
  <div class="banner">
    <el-row class="main">
      <el-col :span="6" class="left side">
        <span class="btn" @click="toHome">首页</span>
      </el-col>
      <el-col :span="12" class="center">
        <div class="center-core">
          <h2>标题标题标题标题标题标题</h2>
        </div>
        <div class="warn">
          <h4>消息消息消息</h4>
        </div>
      </el-col>
      <el-col :span="6" class="right side">
        <span class="btn">统计报告</span>
        <span class="time">当前时间：{{ time }}</span>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

import moment from 'moment'

const router = useRouter()

const time = ref(getTime())

let timer: number

onMounted(() => {
  timer = setInterval(() => {
    time.value = getTime()
  }, 1000)
})

onBeforeUnmount(() => {
  clearInterval(timer)
})

const toHome = () => {
  router.push('/home')
}

function getTime() {
  return moment().format('YYYY年MM月DD日 HH:mm:ss')
}
</script>

<style lang="scss" scoped>
.banner {
  width: 100%;
  height: 40px;

  .main {
    height: 100%;

    .side {
      position: relative;
      background: url(../../images/dataScreen-header-left-bg.png) no-repeat;
      background-size: 100% 100%;
      display: flex;

      .btn {
        position: absolute;
        width: 150px;
        height: 50px;
        background-size: 100% 100%;
        text-align: center;
        line-height: 45px;
        color: var(--banner-font-color);
      }
    }
  }
}

.left {
  background: url(../../images/dataScreen-header-left-bg.png) no-repeat;

  .btn {
    right: 10px;
    background-image: url(../../images/dataScreen-header-btn-bg-l.png);
    &:hover {
      cursor: pointer;
    }
  }
}

.center {
  position: relative;
  width: 100%;
  .center-core {
    position: absolute;
    width: 100%;
    height: 80px;
    background-image: url(../../images/dataScreen-header-center-bg.png);
    background-size: 100% 100%;
    h2 {
      color: var(--banner-font-color);
      font-size: 36px;
      letter-spacing: 0.2em;
      text-align: center;
      line-height: 70px;
    }
  }

  .warn {
    position: absolute;
    width: 600px;
    height: 50px;
    top: 75px;
    left: 50%;
    transform: translateX(-50%);
    padding-top: 15px;
    background-image: url(../../images/dataScreen-header-warn-bg.png);
    background-size: 100% 100%;
    h4 {
      font-size: 18px;
      color: white;
      text-align: center;
      letter-spacing: 0.1em;
    }
  }
}

.right {
  background: url(../../images/dataScreen-header-right-bg.png) no-repeat;
  justify-content: right;

  .btn {
    left: 10px;
    background-image: url(../../images/dataScreen-header-btn-bg-r.png);
  }

  .time {
    text-align: right;
    line-height: 40px;
    color: var(--banner-font-color);
    margin-right: 10px;
  }
}
</style>
