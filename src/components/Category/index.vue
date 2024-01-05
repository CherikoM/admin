<template>
  <el-card class="category">
    <el-form :inline="true">
      <el-form-item label="一级分类">
        <el-select
          v-model="select[0]"
          @change="selectChange(1)"
          :disabled="disabled"
        >
          <el-option
            v-for="c1 in category1"
            :key="c1.id"
            :label="c1.name"
            :value="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          v-model="select[1]"
          @change="selectChange(2)"
          :disabled="!select[0] || disabled"
        >
          <el-option
            v-for="c2 in category2"
            :key="c2.id"
            :label="c2.name"
            :value="c2.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          v-model="select[2]"
          @change="selectChange(3)"
          :disabled="!select[1] || disabled"
        >
          <el-option
            v-for="c3 in category3"
            :key="c3.id"
            :label="c3.name"
            :value="c3.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElNotification } from 'element-plus'

import {
  reqGetCategory1,
  reqGetCategory2,
  reqGetCategory3,
} from '@/api/product/attr'
import { Categorys, Categorys2, Categorys3 } from '@/api/product/attr/type'

const props = defineProps<{
  select: number[]
  disabled: boolean
}>()

const emits = defineEmits(['change'])

onMounted(() => {
  getCategory1()
  props.select[0] && getCategory2()
  props.select[1] && getCategory3()
})

const category1 = ref<Categorys>([])
// const select1 = ref()
const getCategory1 = async () => {
  const result = await reqGetCategory1()
  if (result.code === 200) {
    category1.value = result.data
  } else {
    ElNotification.error(result.message)
  }
}

const category2 = ref<Categorys2>([])
// const select2 = ref()
const getCategory2 = async () => {
  const result = await reqGetCategory2(props.select[0] as number)
  if (result.code === 200) {
    category2.value = result.data
  } else {
    ElNotification.error(result.message)
  }
}

const category3 = ref<Categorys3>([])
// const select3 = ref()
const getCategory3 = async () => {
  const result = await reqGetCategory3(props.select[1] as number)
  if (result.code === 200) {
    category3.value = result.data
  } else {
    ElNotification.error(result.message)
  }
}

const clearCategory2 = () => {
  category2.value = []
  props.select.splice(1)
}

const clearCategory3 = () => {
  category3.value = []
  props.select.splice(2)
}

const selectChange = async (level: number) => {
  if (level === 1) {
    clearCategory2()
    clearCategory3()
    await getCategory2()
  } else if (level === 2) {
    clearCategory3()
    await getCategory3()
  }
  emits('change')
}
</script>

<style lang="scss" scoped>
.category {
  margin-bottom: var(--card-margin);
}
</style>
