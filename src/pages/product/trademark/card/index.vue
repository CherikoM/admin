<template>
  <el-card class="box-card">
    <el-button icon="Plus" @click="() => edit()" v-perm="'btn.Trademark.add'">
      添加品牌
    </el-button>
    <!-- 表格体 -->
    <el-table class="table" :data="trademarks">
      <el-table-column
        label="序号"
        width="60px"
        align="center"
        type="index"
        :index="
          getIndex(
            productStore.trademark.pageNo,
            productStore.trademark.pageSize,
          )
        "
      ></el-table-column>
      <el-table-column label="名称" prop="tmName"></el-table-column>
      <el-table-column label="logo" width="130px" align="center">
        <template #="{ row, $index }">
          <ElImg
            :src="row.logoUrl || ''"
            width="100px"
            height="100px"
            :preview-src-list="imgList"
            :initial-index="$index"
            :hide-on-click-modal="true"
            :preview-teleported="true"
          ></ElImg>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120px" align="center">
        <template #="{ row, $index }">
          <el-button
            plain
            size="small"
            type="warning"
            icon="Edit"
            @click="edit(row, $index)"
            v-perm="'btn.Trademark.update'"
          ></el-button>
          <el-popconfirm
            :title="`确定要删除${row.tmName}吗？`"
            width="200px"
            @confirm="del(row.id)"
          >
            <template #reference>
              <el-button
                plain
                size="small"
                type="danger"
                icon="Delete"
                v-perm="'btn.Trademark.remove'"
              ></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      v-model:current-page="productStore.trademark.pageNo"
      v-model:page-size="productStore.trademark.pageSize"
      :page-sizes="[3, 5, 7, 9]"
      :small="true"
      layout="total, sizes, ->, prev, pager, next, jumper"
      :total="total"
    />
  </el-card>
</template>

<script setup lang="ts">
import { ref, reactive, computed, inject, Ref } from 'vue'
import { ElNotification } from 'element-plus'

import { reqDeleteTrademark } from '@/api/product/trademark'
import { Trademark, Trademarks } from '@/api/product/trademark/type'

import getIndex from '@/utils/getIndex'

import useProductStore from '@/store/modules/product'
const productStore = useProductStore()

// 依赖注入inject
// #region
const trademarks = inject<Ref<Trademarks>>('trademarks', ref([]))
const dialogVisible = inject<Ref<boolean>>('dialogVisible', ref(false))
const currentTM = inject<Ref<number>>('currentTM', ref(-1))
const getTrademark = inject<Function>('getTrademark', () => {})
const total = inject<Ref<number>>('total', ref(0))
const form = inject<Trademark>('form', reactive({} as Trademark))
// #endregion

// CRUD
// #region
/**
 * 添加/修改
 * @param trademark 品牌数据
 * @param index 坐标
 */
const edit = (trademark?: Trademark, index?: number) => {
  dialogVisible.value = true
  currentTM.value = index || -1
  trademark && writeForm(trademark)
}
/**
 * 删除
 * @param id 品牌id
 */
const del = async (id: number) => {
  const result = await reqDeleteTrademark(id)
  if (result.code === 200) {
    ElNotification.success('删除成功')
    trademarks.value.length <= 1
      ? productStore.trademark.pageNo--
      : await getTrademark()
  } else {
    ElNotification.error(result.data as string)
  }
}
// #endregion

// 工具
// #region
/**
 * 图片列表
 */
const imgList = computed(() => {
  return trademarks.value.map((tm) => tm.logoUrl)
})
/**
 * 填充表单
 * @param trademark 品牌数据
 */
const writeForm = (trademark: Trademark) => {
  form.tmName = trademark.tmName
  form.logoUrl = trademark.logoUrl
  form.id = trademark.id
}
// #endregion
</script>

<style lang="scss" scoped>
.table {
  @include table-margin();
}
</style>
