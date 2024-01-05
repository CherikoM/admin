<template>
  <div class="gender">
    <Block title="男女比例">
      <div class="gender-inner">
        <div class="gender-img">
          <div class="man">
            男士
            <img src="../../../images/man.png" alt="" />
          </div>
          <div class="women">
            女士
            <img src="../../../images/women.png" alt="" />
          </div>
        </div>
        <div class="rate">
          <p>男士58%</p>
          <p>女士42%</p>
        </div>
        <div class="chart" ref="chartEl"></div>
      </div>
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
    xAxis: {
      show: false,
      min: 0,
      max: 100,
    },
    yAxis: {
      show: false,
      type: 'category',
    },
    series: [
      {
        type: 'bar',
        data: [58],
        z: 100,
        itemStyle: {
          color: 'cornflowerblue',
          borderRadius: 50,
        },
      },
      {
        type: 'bar',
        data: [100],
        barGap: '-100%',
        itemStyle: {
          color: 'hotpink',
          borderRadius: 50,
        },
      },
    ],
    grid: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    },
  })
})
</script>

<style lang="scss" scoped>
.gender {
  flex: 5;
  .gender-inner {
    margin: 0 auto;
    margin-top: 20px;
    width: 320px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}

.gender-img {
  // margin: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > div {
    width: 120px;
    height: 120px;
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    color: white;

    img {
      width: 70px;
      height: 70px;
      margin-bottom: 15px;
    }
  }

  .man {
    background-image: url(../../../images/man-bg.png);
  }

  .women {
    background-image: url(../../../images/women-bg.png);
  }
}

.rate {
  color: white;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}

.chart {
  margin-top: 10px;
  height: 40px;
}
</style>
