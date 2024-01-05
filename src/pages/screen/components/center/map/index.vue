<template>
  <div class="map">
    <div class="title">地图地图地图地图</div>
    <div class="chart" ref="chartEl"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const chartEl = ref()

const getMap = async () => {
  const res = await fetch(
    'https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json',
  )
  const chinaJSON = await res.json()
  echarts.registerMap('china', chinaJSON)
  const chart = echarts.init(chartEl.value)
  chart.setOption({
    geo: {
      map: 'china',
      roam: true,
      zoom: 1.5,
      top: 200,
      label: {
        // show: true,
        color: 'white',
      },
      itemStyle: {
        areaColor: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '#001B79',
            },
            {
              offset: 1,
              color: '#1640D6',
            },
          ],
          global: false,
        },
        borderColor: 'white',
        borderType: 'dotted',
        opacity: 0.5,
      },
      emphasis: {
        label: {
          show: true,
          color: 'white',
        },
        itemStyle: {
          areaColor: {
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
                color: '#E25E3E',
              },
            ],
            global: false,
          },
        },
      },
    },
    series: [
      {
        type: 'lines',
        data: [
          {
            coords: [
              [116, 39],
              [119, 26],
            ],
            lineStyle: {
              color: 'white',
            },
          },
          {
            coords: [
              [116, 39],
              [114, 30],
            ],
            lineStyle: {
              color: 'white',
            },
          },
        ],
        effect: {
          show: true,
          symbol:
            'path://M1024 746.666667c0 23.466667-19.2 42.666667-42.666667 42.666667-6.4 0-10.666667-2.133333-17.066667-4.266667l0 0 0 0c0 0 0 0 0 0L661.333333 661.333333l0 221.866667 100.266667 36.266667 0 0c17.066667 6.4 27.733333 21.333333 27.733333 40.533333 0 23.466667-19.2 42.666667-42.666667 42.666667-4.266667 0-10.666667 0-14.933333-2.133333l0 0L512 919.466667l-219.733333 81.066667 0 0C288 1002.666667 281.6 1002.666667 277.333333 1002.666667c-23.466667 0-42.666667-19.2-42.666667-42.666667 0-19.2 12.8-34.133333 27.733333-40.533333l0 0 100.266667-36.266667L362.666667 661.333333 59.733333 785.066667c0 0 0 0 0 0l0 0 0 0C53.333333 787.2 49.066667 789.333333 42.666667 789.333333c-23.466667 0-42.666667-19.2-42.666667-42.666667l0 0 0-128 0 0c0-14.933333 6.4-27.733333 17.066667-34.133333l0 0L362.666667 341.333333 362.666667 170.666667c0-83.2 66.133333-149.333333 149.333333-149.333333s149.333333 66.133333 149.333333 149.333333l0 170.666667 345.6 243.2 0 0c10.666667 8.533333 17.066667 21.333333 17.066667 34.133333l0 0L1024 746.666667 1024 746.666667zM938.666667 640 593.066667 396.8l0 0c-2.133333-2.133333-4.266667-4.266667-6.4-6.4 0 0 0 0-2.133333-2.133333-2.133333-2.133333-2.133333-4.266667-4.266667-6.4 0 0 0-2.133333-2.133333-2.133333 0-2.133333-2.133333-4.266667-2.133333-6.4 0 0 0-2.133333 0-2.133333 0-2.133333-2.133333-6.4-2.133333-10.666667L573.866667 170.666667c0-36.266667-27.733333-64-64-64s-64 27.733333-64 64l0 192c0 4.266667 0 6.4-2.133333 10.666667 0 0 0 2.133333 0 2.133333 0 2.133333-2.133333 4.266667-2.133333 6.4 0 0 0 2.133333-2.133333 2.133333-2.133333 2.133333-2.133333 4.266667-4.266667 6.4 0 0 0 2.133333-2.133333 2.133333-2.133333 2.133333-4.266667 4.266667-6.4 6.4l0 0L85.333333 640l0 42.666667 302.933333-125.866667 0 0c0 0 0 0 0 0l0 0 0 0 0 0 0 0c2.133333 0 4.266667-2.133333 8.533333-2.133333 2.133333 0 6.4 0 8.533333 0 23.466667 0 42.666667 19.2 42.666667 42.666667l0 256 49.066667-17.066667 0 0C501.333333 832 507.733333 832 512 832s10.666667 0 14.933333 2.133333l0 0L576 853.333333 576 597.333333c0-23.466667 19.2-42.666667 42.666667-42.666667 2.133333 0 6.4 0 8.533333 0 2.133333 0 4.266667 2.133333 8.533333 2.133333l0 0 0 0 0 0 0 0c0 0 0 0 0 0l0 0L938.666667 682.666667 938.666667 640z',
          symbolSize: 15,
          color: '#7BD3EA',
        },
      },
    ],
  })
}

onMounted(async () => {
  getMap()
})
</script>

<style lang="scss" scoped>
.map {
  position: relative;
  flex: 7;
  display: flex;
  padding: 10px;

  .chart {
    flex: 1;
    // background-color: #fff;
    margin-top: 20px;
  }

  .title {
    z-index: 1000;
    position: absolute;
    left: 0;
    top: 100px;
    width: 300px;
    height: 25px;
    text-indent: 2em;
    letter-spacing: 0.25em;
    line-height: 25px;
    color: white;
    background-image: url(../../../images/map-title-bg.png);
    background-size: 100% 100%;
  }
}
</style>
