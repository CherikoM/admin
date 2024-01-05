<template>
  <div class="age">
    <Block title="年龄比例">
      <div class="chart" ref="chartEl"></div>
    </Block>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

import * as echarts from 'echarts'

const chartEl = ref()

onMounted(() => {
  const chart = echarts.init(chartEl.value)
  chart.setOption({
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: '5%',
      left: '10',
      orient: 'vertical',
      textStyle: {
        color: 'white',
      },
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 5,
        },
        label: {
          show: true,
          position: 'inside',
          color: 'white',
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 735, name: '0~20' },
          { value: 1048, name: '20~40' },
          { value: 580, name: '40~60' },
          { value: 484, name: '60~80' },
          { value: 300, name: '80~' },
        ],
      },
    ],
  })
})
</script>

<style lang="scss" scoped>
.age {
  flex: 5;

  .chart {
    height: 100%;
  }
}
</style>
