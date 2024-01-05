<template>
  <div>
    <Card></Card>
    <Dialog></Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted, provide } from 'vue'
import { ElNotification } from 'element-plus'

import { reqGetTrademark } from '@/api/product/trademark'
import { Trademark, Trademarks } from '@/api/product/trademark/type'

import Card from '@/pages/product/trademark/card/index.vue'
import Dialog from '@/pages/product/trademark/dialog/index.vue'

import useProductStore from '@/store/modules/product'
import useSettingStore from '@/store/modules/setting'
const productStore = useProductStore()
const settingStore = useSettingStore()

// 数据列表
const trademarks = ref<Trademarks>([])
// 数据总量
const total = ref(0)
// 获取数据
const getTrademark = async () => {
  settingStore.load(async () => {
    const result = await reqGetTrademark(
      productStore.trademark.pageNo,
      productStore.trademark.pageSize,
    )
    if (result.code === 200) {
      trademarks.value = result.data.records
      total.value = result.data.total
    } else {
      ElNotification.error('获取品牌失败，请稍后重试')
    }
  })
}

// 对话框显示
const dialogVisible = ref(false)

// 当前编辑数据
const currentTM = ref(-1)

// 表单
const form = reactive<Trademark>({
  tmName: '',
  logoUrl: '',
})

onMounted(async () => {
  await getTrademark()
})

/**
 * 监听分页变化
 */
watch(
  () => [productStore.trademark.pageNo, productStore.trademark.pageSize],
  getTrademark,
)

// 依赖注入provide
// #region
provide('trademarks', trademarks)
provide('dialogVisible', dialogVisible)
provide('currentTM', currentTM)
provide('getTrademark', getTrademark)
provide('total', total)
provide('form', form)
// #endregion
</script>

<style lang="scss" scoped></style>
