<template>
  <div class="year">
    <Block title="年度对比">
      <div class="chart" ref="chartEl"></div>
    </Block>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const chartEl = ref()

onMounted(() => {
  echarts.init(chartEl.value).setOption({
    title: {
      text: '（人数）',
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
    series: [
      {
        type: 'line',
        data: [85, 58, 55, 81, 71, 0, 70, 96, 24, 61, 91, 63],
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
                color: '#C63D2F',
              },
              {
                offset: 1,
                color: '#E25E3E00',
              },
            ],
            global: false,
          },
        },
      },
      {
        type: 'line',
        data: [59, 46, 92, 63, 50, 55, 45, 21, 36, 51, 62, 10],
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
                color: '#4477CE',
              },
              {
                offset: 1,
                color: '#8CABFF00',
              },
            ],
            global: false,
          },
        },
      },
      {
        type: 'line',
        data: [65, 68, 36, 7, 56, 67, 89, 10, 3, 14, 47, 60],
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
                color: '#F1C27B',
              },
              {
                offset: 1,
                color: '#FFD89C00',
              },
            ],
            global: false,
          },
        },
      },
    ],
  })
})
</script>

<style lang="scss" scoped>
.year {
  flex: 4;
}

.chart {
  height: 100%;
}
</style>
