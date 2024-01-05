<!-- 二次封装el-pagination -->
<template>
  <el-pagination
    v-model:current-page="pn"
    v-model:page-size="ps"
    :page-sizes="pageSizes"
    :small="true"
    layout="total, sizes, ->, prev, pager, next, jumper"
    :total="total"
  />
</template>

<script setup lang="ts">
import { watch, computed } from 'vue'

const props = defineProps<{
  pageNo: number
  pageSize: number
  pageSizes: number[]
  total: number
  pageChange: Function
}>()

const emit = defineEmits(['update:pageNo', 'update:pageSize'])

const pn = computed({
  get: () => props.pageNo,
  set: (val) => {
    emit('update:pageNo', val)
  },
})

const ps = computed({
  get: () => props.pageSize,
  set: (val) => {
    emit('update:pageSize', val)
  },
})

/**
 * 监听分页变化
 */
watch(
  () => [props.pageNo, props.pageSize],
  () => props.pageChange(),
)
</script>

<style scoped></style>
