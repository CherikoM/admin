<template>
  <div class="hot">
    <Block title="热门排行">
      <div class="hot-inner">
        <el-row class="th">
          <el-col :span="4">排名</el-col>
          <el-col :span="5">名称</el-col>
          <el-col :span="15">数量</el-col>
        </el-row>
        <el-row class="tb">
          <el-col :span="9" class="data-col">
            <el-row v-for="(item, index) in data">
              <el-col :span="11" class="rank">
                <div class="rank-bg" :style="{ backgroundColor: color[index] }">
                  NO.{{ index + 1 }}
                </div>
              </el-col>
              <el-col :span="13">{{ item.name }}</el-col>
            </el-row>
          </el-col>
          <el-col :span="10">
            <div class="chart" ref="chartEl"></div>
          </el-col>
          <el-col :span="5" class="data-col">
            <el-row v-for="item in data" class="total">
              {{ (item.number / 10000).toFixed(2) }}w
            </el-row>
          </el-col>
        </el-row>
      </div>
    </Block>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const data = [
  {
    id: 1,
    name: 'AAA',
    rate: 0.8,
    number: 80000,
  },
  {
    id: 2,
    name: 'BBB',
    rate: 0.6,
    number: 60000,
  },
  {
    id: 3,
    name: 'CCC',
    rate: 0.5,
    number: 50000,
  },
  {
    id: 4,
    name: 'DDD',
    rate: 0.4,
    number: 40000,
  },
  {
    id: 5,
    name: 'EEE',
    rate: 0.3,
    number: 30000,
  },
]

const color = [
  'rgb(209,95,72)',
  'rgb(199,149,68)',
  'rgb(95, 134, 112)',
  'rgb(2,132,240)',
  'rgb(145,126,255)',
]

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
    series: {
      type: 'bar',
      data: [30, 40, 50, 60, 80],
      barWidth: 20,
      showBackground: true,
      backgroundStyle: {
        borderColor: 'rgb(70,197,229)',
        color: 'rgba(0,0,0,0)',
        borderType: 'dotted',
        borderWidth: 1,
        borderRadius: 50,
      },
      itemStyle: {
        color: (data: any) => {
          return color[4 - data.dataIndex]
        },
        borderRadius: 50,
      },
    },

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
.hot {
  flex: 5;

  .hot-inner {
    height: 100%;
    display: flex;
    flex-direction: column;

    .th {
      height: 40px;
      flex: none;
      background-image: url(../../../images/rankingChart-bg.png);
      background-size: 100% 100%;
    }
    .tb {
      flex: 1;
    }
  }
}

.th {
  & > div {
    text-align: center;
    line-height: 40px;
    color: rgb(232, 160, 58);
    font-weight: bold;
  }
}

.data-col {
  display: flex;
  flex-direction: column;
  & > div {
    flex: 1;
    display: flex;
    text-align: center;
    align-items: center;
    color: white;
  }

  .rank {
    display: flex;
    justify-content: center;
    align-items: center;

    .rank-bg {
      width: 50px;
      height: 25px;
      line-height: 25px;
      border-radius: 25px;
    }
  }

  .total {
    display: flex;
    justify-content: center;
  }
}

.chart {
  height: 100%;
}
</style>
