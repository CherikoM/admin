<template>
  <div>
    <Category
      :select="productStore.spu.select"
      :disabled="show !== 1"
      @change="categoryChange"
    ></Category>
    <el-card>
      <template #header v-if="show !== 1">
        <div class="card-header">
          <span>{{ title }}</span>
        </div>
      </template>
      <List
        v-show="show === 1"
        @on-edit-spu="editSPU"
        @on-add-sku="addSKU"
      ></List>
      <Edit v-show="show === 2" ref="editEl"></Edit>
      <Add v-show="show === 3" ref="addEl"></Add>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, provide, onMounted } from 'vue'
import { ElNotification } from 'element-plus'

import { reqGetSpus } from '@/api/product/spu'
import { SPU, SPUs } from '@/api/product/spu/type.ts'

import List from '@/pages/product/spu/list/index.vue'
import Edit from '@/pages/product/spu/edit/index.vue'
import Add from '@/pages/product/spu/add/index.vue'

import useProductStore from '@/store/modules/product'
import useSettingStore from '@/store/modules/setting'

const productStore = useProductStore()
const settingStore = useSettingStore()

onMounted(() => {
  if (productStore.spu.select[2]) {
    getSpus()
  }
})

/**
 * 显示场景
 * show==1: 显示SPU列表
 * show==2: 添加/修改SPU
 * show==3: 添加SKU
 */
const show = ref(1)
const title = ref('添加SPU')

const spus = ref<SPUs>([])
const total = ref(0)

/**
 * Edit（添加/修改SPU）元素
 */
const editEl = ref()
/**
 * 添加SKU元素
 */
const addEl = ref()

/**
 * 获取列表数据
 */
const getSpus = () => {
  spus.value = []
  if (productStore.spu.select[2]) {
    settingStore.load(async () => {
      const result = await reqGetSpus(
        productStore.spu.pageNo,
        productStore.spu.pageSize,
        productStore.spu.select[2],
      )
      if (result.code === 200) {
        spus.value = result.data.records
        total.value = result.data.total
      } else {
        ElNotification.error('获取SPU失败')
      }
    })
  }
}

/**
 * 目录变化时回调
 */
const categoryChange = async () => {
  getSpus()
}

/**
 * 监听分页变化
 */
watch(() => [productStore.spu.pageNo, productStore.spu.pageSize], getSpus)

/**
 * 开始添加/修改SPU
 * @param row
 */
const editSPU = (row?: SPU) => {
  if (row) {
    settingStore.load(async () => {
      editEl.value.getSPUInfo(row.id)
      title.value = '修改SPU'
    })
  } else {
    title.value = '添加SPU'
  }
  show.value = 2
}
/**
 * 开始添加对应SKU
 * @param row
 */
const addSKU = async (row: SPU) => {
  await settingStore.load(async () => {
    console.log(addEl)
    await addEl.value.getFormData(row, productStore.spu.select)
    title.value = '添加SKU'
    show.value = 3
  })
}

provide('show', show)
provide('spus', spus)
provide('total', total)
provide('getSpus', getSpus)
</script>

<style lang="scss" scoped></style>
