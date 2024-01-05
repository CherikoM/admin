<template>
  <div>
    <Category
      :select="productStore.attr.select"
      :disabled="showAdd"
      @change="categoryChange"
    ></Category>
    <el-card class="box-card">
      <List v-show="!showAdd"></List>
      <Add v-show="showAdd"></Add>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, provide } from 'vue'
import { ElNotification } from 'element-plus'

import { reqGetAttrs } from '@/api/product/attr'
import { Attr, Attrs } from '@/api/product/attr/type'

import List from '@/pages/product/attr/list/index.vue'
import Add from '@/pages/product/attr/add/index.vue'
import useProductStore from '@/store/modules/product'
import useSettingStore from '@/store/modules/setting'

const productStore = useProductStore()
const settingStore = useSettingStore()

onMounted(async () => {
  await getAttrs()
})

/**
 * 是否添加属性
 */
const showAdd = ref(false)
/**
 * 修改坐标
 */
const editIndex = ref(-1)
/**
 * 数据列表
 */
const attrs = ref<Attrs>([])
/**
 * 表单
 */
const form = reactive<Attr>({
  attrName: '',
  attrValueList: [],
  categoryId: 0,
  categoryLevel: 3,
})
/**
 * 获取属性
 */
const getAttrs = async () => {
  attrs.value = []
  if (productStore.attr.select[2]) {
    settingStore.load(async () => {
      const result = await reqGetAttrs(productStore.attr.select)
      if (result.code === 200) {
        attrs.value = result.data
      } else {
        ElNotification.error(result.message)
      }
    })
  }
}
/**
 * 选择分类完成
 */
const categoryChange = async () => {
  await getAttrs()
}

// 依赖注入provide
// #region
provide('attrs', attrs)
provide('showAdd', showAdd)
provide('form', form)
provide('getAttrs', getAttrs)
provide('editIndex', editIndex)
// #endregion
</script>

<style lang="scss" scoped></style>
