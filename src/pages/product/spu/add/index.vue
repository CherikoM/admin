<template>
  <div class="container">
    <el-form ref="formEl" :model="form" :rules="rule">
      <el-form-item label="名称" prop="skuName">
        <el-input placeholder="请输入名称" v-model="form.skuName"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)" prop="price">
        <el-input-number
          v-model="form.price"
          placeholder="请输入价格"
          :precision="2"
          title=""
          controls-position="right"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="重量(g)" prop="weight">
        <el-input-number
          v-model="form.weight"
          placeholder="请输入重量"
          :precision="2"
          title=""
          controls-position="right"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="描述" prop="skuDesc">
        <el-input
          v-model="form.skuDesc"
          placeholder="请输入描述"
          type="textarea"
        ></el-input>
      </el-form-item>
      <el-form-item label="产品属性" prop="skuAttrValueList">
        <div class="select">
          <div class="select-item" v-for="attr in attrs" :key="attr.id">
            <p>{{ attr.attrName }}</p>
            <el-select
              v-model="attr.data"
              class="select-box"
              :placeholder="'请选择' + attr.attrName"
            >
              <el-option
                v-for="value in attr.attrValueList"
                :key="value.id"
                :label="value.valueName"
                :value="`${attr.id}:${value.id}`"
              ></el-option>
            </el-select>
          </div>
        </div>
      </el-form-item>
      <el-form-item
        label="销售属性"
        prop="skuSaleAttrValueList"
        v-if="spuAttrs && spuAttrs.length > 0"
      >
        <div class="select">
          <div class="select-item" v-for="attr in spuAttrs" :key="attr.id">
            <p>{{ attr.saleAttrName }}</p>
            <el-select
              v-model="attr.data"
              class="select-box"
              :placeholder="'请选择' + attr.saleAttrName"
            >
              <el-option
                v-for="value in attr.spuSaleAttrValueList"
                :key="value.id"
                :label="value.saleAttrValueName"
                :value="`${attr.id}:${value.id}`"
              ></el-option>
            </el-select>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="头图" prop="skuDefaultImg">
        <el-table
          class="table"
          :data="spuImages"
          ref="tableEl"
          :row-class-name="getTableRowClassName"
        >
          <el-table-column label="图片" width="130px" align="center">
            <template #="{ row, $index }">
              <ElImg
                :src="row.imgUrl || ''"
                width="100px"
                height="100px"
                :preview-src-list="imgList"
                :initial-index="$index"
                :hide-on-click-modal="true"
                :preview-teleported="true"
              ></ElImg>
            </template>
          </el-table-column>
          <el-table-column label="文件名" prop="imgName"></el-table-column>
          <el-table-column label="操作" width="140px" align="center">
            <template #="{ row }">
              <el-button
                plain
                type="default"
                @click="setDefaultImg(row)"
                v-show="form.skuDefaultImg !== row.imgUrl"
              >
                设为默认
              </el-button>
              <p v-show="form.skuDefaultImg == row.imgUrl">默认图片</p>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-button type="plain" @click="submit">保存</el-button>
      <el-button type="plain" @click="cancel">取消</el-button>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, inject } from 'vue'
import { ElNotification, FormRules } from 'element-plus'

import { reqGetSpuImages, reqGetSpuAttrs } from '@/api/product/spu'
import { reqGetAttrs } from '@/api/product/attr'

import { SPUImages, SPUAttrs, SPU } from '@/api/product/spu/type'
import { Attrs } from '@/api/product/attr/type'
import { SKU, SKUAttrs, SKUImage, SKUSaleAttrs } from '@/api/product/sku/type'
import { reqSaveOrUpdateSku } from '@/api/product/sku'

// 依赖注入inject
const show = inject('show', ref(1))

// 数据请求
// #region
/**
 * SPU图片列表
 */
const spuImages = ref<SPUImages>([])
/**
 * SPU销售属性列表
 */
const spuAttrs = ref<SPUAttrs>([])
/**
 * 产品属性列表
 */
const attrs = ref<Attrs>([])
/**
 * 初始化表单项数据（在SPU列表添加SKU）
 * @param spuId
 */
const getFormData = async (spu: SPU, category: number[]) => {
  const res1 = await reqGetSpuImages(spu.id as number)
  if (res1.code !== 200) {
    ElNotification.error(res1.message)
    return
  }
  const res2 = await reqGetSpuAttrs(spu.id as number)
  if (res2.code !== 200) {
    ElNotification.error(res2.message)
    return
  }
  const res3 = await reqGetAttrs(category)
  if (res3.code !== 200) {
    ElNotification.error(res3.message)
    return
  }
  spuImages.value = res1.data
  spuAttrs.value = res2.data
  attrs.value = res3.data
  form.category3Id = spu.category3Id as number
  form.spuId = spu.id as number
  form.tmId = spu.tmId
}
// #endregion

// 表单
// #region
/**
 * 表单元素
 */
const formEl = ref()
/**
 * 图片表格元素
 */
const tableEl = ref()
/**
 * 表单数据
 */
const form = reactive<SKU>({
  id: undefined,
  category3Id: 0,
  isSale: 0,
  price: 0,
  skuAttrValueList: [],
  skuDefaultImg: '',
  skuDesc: '',
  skuName: '',
  skuSaleAttrValueList: [],
  spuId: 0,
  tmId: 0,
  weight: '',
})
/**
 * 数字校验规则
 * @param _
 * @param value
 * @param callback
 */
const numValidator = (_: any, value: number, callback: Function) => {
  value > 0 ? callback() : callback('请输入正数')
}
/**
 * 表单校验
 */
const rule = reactive<FormRules<SKU>>({
  price: [{ required: true, validator: numValidator }],
  skuDefaultImg: [{ required: true, message: '请选择头图' }],
  skuDesc: [{ required: true, message: '请输入描述' }],
  skuName: [{ required: true, message: '请输入名称' }],
  weight: [{ required: true, validator: numValidator }],
})
/**
 * 展示图片列表
 */
const imgList = computed(() => {
  return spuImages.value.map((img) => img.imgUrl)
})
/**
 * 图片表格高亮行
 * @param param0
 */
const getTableRowClassName = ({ row }: { row: SKUImage }) => {
  return row.imgUrl === form.skuDefaultImg ? 'selected-row' : ''
}
/**
 * 设置默认图片
 * @param row
 */
const setDefaultImg = (row: SKUImage) => {
  tableEl.value.setCurrentRow(row, true)
  form.skuDefaultImg = row.imgUrl
}
/**
 * 提交表单
 */
const submit = async () => {
  form.skuAttrValueList = attrs.value.reduce((prev: SKUAttrs, next) => {
    if (next.data) {
      const [a, b] = next.data.split(':')
      prev.push({ attrId: Number(a), valueId: Number(b) })
    }
    return prev
  }, [])
  form.skuSaleAttrValueList = attrs.value.reduce((prev: SKUSaleAttrs, next) => {
    if (next.data) {
      const [a, b] = next.data.split(':')
      prev.push({ saleAttrId: Number(a), saleAttrValueId: Number(b) })
    }
    return prev
  }, [])

  await formEl.value.validate()
  const result = await reqSaveOrUpdateSku(form)
  if (result.code === 200) {
    show.value = 1
    clearForm()
  } else {
    ElNotification.error('提交失败')
  }
}
/**
 * 取消操作
 */
const cancel = () => {
  show.value = 1
  clearForm()
}
/**
 * 清空表单
 */
const clearForm = () => {
  Object.assign(form, {
    id: undefined,
    category3Id: 0,
    isSale: 0,
    price: 0,
    skuAttrValueList: [],
    skuDefaultImg: '',
    skuDesc: '',
    skuName: '',
    skuSaleAttrValueList: [],
    spuId: 0,
    tmId: 0,
    weight: '',
  })
}
// #endregion

/**
 * 导出
 */
defineExpose({
  getFormData,
})
</script>

<style lang="scss" scoped>
.container {
  container-type: inline-size;
}

.select {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-column-gap: 20px;
  grid-row-gap: 10px;
  .select-item {
    display: flex;
    p {
      width: 30px;
      flex: none;
      margin-right: 5px;
      color: var(--select-attr-tag-color);
      font-size: var(--select-attr-tag-font-size);
      @include one-line-ellipsis();
    }
    .select-box {
      width: 100%;
    }
  }
}

@container (max-width: 920px) {
  .select {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

@container (max-width: 700px) {
  .select {
    grid-template-columns: 1fr 1fr;
  }
}

@container (max-width: 420px) {
  .select {
    grid-template-columns: 1fr;
  }
}

.table {
  :deep(.selected-row) {
    background-color: var(--el-fill-color-light);
  }
}

:deep(.el-form-item__label) {
  width: var(--form-label-width);
}
</style>
