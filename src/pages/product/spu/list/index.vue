<template>
  <div class="list">
    <el-button
      icon="Plus"
      @click="editSPU()"
      :disabled="!productStore.spu.select[2]"
      v-perm="'btn.Spu.add'"
    >
      添加SPU
    </el-button>
    <el-table class="table" :data="spus">
      <el-table-column
        label="序号"
        type="index"
        align="center"
        width="60px"
      ></el-table-column>
      <el-table-column label="名称" prop="spuName"></el-table-column>
      <el-table-column
        label="描述"
        prop="description"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column label="操作" width="204px" align="center">
        <template #="{ row }">
          <div>
            <el-button
              plain
              size="small"
              type="primary"
              icon="Plus"
              title="添加SKU"
              @click="addSKU(row)"
              v-perm="'btn.Spu.addsku'"
            ></el-button>
            <el-button
              plain
              size="small"
              type="warning"
              icon="Edit"
              title="修改SPU"
              @click="editSPU(row)"
              v-perm="'btn.Spu.update'"
            ></el-button>
            <el-button
              plain
              size="small"
              icon="View"
              title="SKU列表"
              @click="showSKU(row)"
              v-perm="'btn.Spu.skus'"
            ></el-button>
            <el-popconfirm
              :title="`确定要删除${row.spuName}吗？`"
              width="200px"
              @confirm="deleteSPU(row)"
            >
              <template #reference>
                <el-button
                  plain
                  size="small"
                  type="danger"
                  icon="Delete"
                  title="删除SPU"
                  v-perm="'btn.Spu.delete'"
                ></el-button>
              </template>
            </el-popconfirm>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="productStore.spu.pageNo"
      v-model:page-size="productStore.spu.pageSize"
      :page-sizes="[3, 5, 7, 9]"
      :small="true"
      layout="total, sizes, ->, prev, pager, next, jumper"
      :total="total"
    />
    <el-dialog append-to-body title="SKU列表" v-model="dialogVisiable">
      <div v-loading="dialogLoading">
        <el-table :data="SKUs">
          <el-table-column label="名称" prop="skuName"></el-table-column>
          <el-table-column
            label="价格"
            prop="price"
            width="80px"
            align="center"
          ></el-table-column>
          <el-table-column
            label="重量"
            prop="weight"
            width="80px"
            align="center"
          ></el-table-column>
          <el-table-column label="图片" width="130px" align="center">
            <template #="{ row, $index }">
              <ElImg
                :src="row.skuDefaultImg || ''"
                width="100px"
                height="100px"
                :preview-src-list="imgList"
                :initial-index="$index"
                :hide-on-click-modal="true"
                :preview-teleported="true"
              ></ElImg>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, inject } from 'vue'
import { ElNotification } from 'element-plus'

import { reqDeleteSpu } from '@/api/product/spu'
import { reqGetSkuBySpuId } from '@/api/product/sku'
import { SPU, SPUs } from '@/api/product/spu/type.ts'
import { SKUs } from '@/api/product/sku/type'

import useProductStore from '@/store/modules/product'

const productStore = useProductStore()

const show = inject('show', ref(1))
const spus = inject('spus', ref<SPUs>([]))
const total = inject('total', ref(0))
const getSpus = inject('getSpus', () => Promise.resolve())

const emits = defineEmits(['onAddSku', 'onEditSpu'])

/**
 * 展示SKU列表
 */
const SKUs = ref<SKUs>([])
/**
 * 对话框
 */
const dialogVisiable = ref(false)
/**
 * 对话框加载
 */
const dialogLoading = ref(false)
/**
 * 展示图片列表
 */
const imgList = computed(() => {
  return SKUs.value.map((sku) => sku.skuDefaultImg)
})
/**
 * 开始添加SKU
 * @param row
 */
const addSKU = (row: SPU) => {
  show.value = 3
  emits('onAddSku', row)
}
/**
 * 开始添加/修改SPU
 * @param row
 */
const editSPU = (row?: SPU) => {
  show.value = 2
  emits('onEditSpu', row)
}
/**
 * 展示SKU
 * @param row
 */
const showSKU = async (row: SPU) => {
  const result = await reqGetSkuBySpuId(row.id as number)
  if (result.code === 200) {
    dialogVisiable.value = true
    SKUs.value = result.data
  } else {
    ElNotification.error('获取SKU失败')
  }
}
/**
 * 删除SPU
 * @param row
 */
const deleteSPU = async (row: SPU) => {
  const result = await reqDeleteSpu(row.id as number)
  if (result.code === 200) {
    ElNotification.success('删除成功')
    spus.value.length <= 1 ? productStore.spu.pageNo-- : await getSpus()
  } else {
    ElNotification.error('删除失败')
  }
}
</script>

<style lang="scss" scoped>
.table {
  @include table-margin();
}
</style>
