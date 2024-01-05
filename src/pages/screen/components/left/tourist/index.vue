<template>
  <div class="tourist">
    <Block title="实时统计">
      <template #subtitle>
        <div class="subtitle">
          可预约总量
          <span>364364</span>
          人
        </div>
      </template>
      <div class="number">
        <div v-for="word in people" class="num">
          {{ word }}
        </div>
      </div>
      <div class="chart" ref="chartEl"></div>
    </Block>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import 'echarts-liquidfill/index'

const people = ref('114514人')

const chartEl = ref()

onMounted(() => {
  const chart = echarts.init(chartEl.value)
  chart.setOption({
    series: {
      type: 'liquidFill',
      data: [0.4, 0.4, 0.2],
      radius: '90%',
      outline: {
        show: true,
        borderDistance: 8,
        itemStyle: {
          borderColor: 'green',
          borderWidth: 5,
          shadowBlur: 20,
          shadowColor: 'rgba(0,0,0,0.25)',
        },
      },
    },
    // grid: {
    //   left: 0,
    //   right: 0,
    //   top: 0,
    //   bottom: 0,
    // }
  })
})
</script>

<style lang="scss" scoped>
.tourist {
  flex: 6;
}

.subtitle {
  color: white;
  text-align: right;
  margin-top: 40px;
  margin-right: 5px;
  span {
    margin: 0 3px;
    color: orange;
  }
}

.number {
  height: 60px;
  display: flex;
  flex: none;

  .num {
    flex: 1;
    height: 100%;
    background-image: url(../../../images/total.png);
    background-size: 100% 100%;
    line-height: 60px;
    text-align: center;
    font-size: 32px;
    color: var(--banner-font-color);
  }
}

.chart {
  flex: 1;
  // width: 100%;
  // height: 100%;
}
</style>
