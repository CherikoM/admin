<template>
  <div class="list">
    <el-button
      icon="Plus"
      :disabled="attrs.length <= 0"
      @click="edit()"
      v-perm="'btn.Attr.add'"
    >
      添加属性
    </el-button>
    <el-table class="table" :data="attrs">
      <el-table-column type="index" label="序号" align="center" width="60px" />
      <el-table-column prop="attrName" label="属性" width="120px" />
      <el-table-column prop="address" label="属性值">
        <template #="{ row }">
          <el-tag
            class="tag"
            v-for="value in row.attrValueList"
            :key="value.id"
          >
            {{ value.valueName }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="120px">
        <template #="{ row, $index }">
          <el-button
            plain
            size="small"
            type="warning"
            icon="Edit"
            @click="edit(row, $index)"
            v-perm="'btn.Attr.update'"
          ></el-button>
          <el-popconfirm
            :title="`确定要删除${row.attrName}吗？`"
            width="200px"
            @confirm="del(row.id)"
          >
            <template #reference>
              <el-button
                plain
                size="small"
                type="danger"
                icon="Delete"
                v-perm="'btn.Attr.remove'"
              ></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, inject } from 'vue'
import { ElNotification } from 'element-plus'

import { Attr } from '@/api/product/attr/type'

import { reqDeleteAttr } from '@/api/product/attr'

// 依赖注入inject
// #region
const attrs = inject('attrs', ref([]))
const showAdd = inject('showAdd', ref(false))
const form = inject('form', reactive({} as Attr))
const getAttrs = inject('getAttrs', () => Promise.resolve())
const editIndex = inject('editIndex', ref(-1))
// #endregion

// CRUD
// #region
/**
 * 开始添加/修改属性
 * @param row
 * @param index
 */
const edit = (row?: Attr, index?: number) => {
  showAdd.value = true
  console.log(row)
  if (row) {
    Object.assign(form, row, { attrValueList: [...row.attrValueList] })
    editIndex.value = index || -1
  } else {
    editIndex.value = -1
  }
}

/**
 * 删除属性
 * @param id
 */
const del = async (id: number) => {
  const result = await reqDeleteAttr(id)
  if (result.code === 200) {
    ElNotification.success('删除成功')
    await getAttrs()
  } else {
    ElNotification.error('删除失败')
  }
}
// #endregion
</script>

<style lang="scss" scoped>
.table {
  @include table-margin();
}

.tag {
  margin: 5px;
}
</style>
