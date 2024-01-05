<template>
  <div class="trend">
    <Block title="未来趋势图">
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
    title: {
      text: '访问量',
      textStyle: {
        color: '#29fcff',
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      splitLine: {
        show: false,
      },
    },
    yAxis: {
      splitLine: {
        show: false,
      },
      axisLine: {
        show: true,
      },
    },
    grid: {
      left: 30,
      top: 40,
      right: 10,
      bottom: 20,
    },
    series: {
      type: 'line',
      data: [11, 45, 14, 19, 19, 8, 10, 36, 43, 64],
      smooth: true,
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '#E38B29',
            },
            {
              offset: 1,
              color: '#F1A66100',
            },
          ],
          global: false,
        },
      },
    },
  })
})
</script>

<style lang="scss" scoped>
.trend {
  flex: 3;

  .chart {
    height: 100%;
  }
}
</style>
