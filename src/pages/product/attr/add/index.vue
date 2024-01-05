<template>
  <div class="add" v-show="showAdd">
    <el-form>
      <el-form-item label="属性名">
        <el-input placeholder="请输入属性名" v-model="form.attrName"></el-input>
      </el-form-item>
    </el-form>
    <el-button icon="Plus" @click="addAttrValue" :disabled="!form.attrName">
      添加属性值
    </el-button>
    <el-table style="margin: 10px 0" :data="form.attrValueList">
      <el-table-column
        type="index"
        label="序号"
        align="center"
        width="60px"
      ></el-table-column>
      <el-table-column label="属性值">
        <template #="{ row, $index }">
          <el-input
            :ref="selected === $index ? 'inputEl' : ''"
            v-show="selected === $index"
            placeholder="请输入属性值"
            v-model="row.valueName"
            @blur="blurAttrValue($index)"
          ></el-input>
          <div v-show="selected !== $index" @click="focusAttrValue($index)">
            {{ row.valueName }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="80px">
        <template #="{ $index }">
          <el-button
            plain
            size="small"
            type="danger"
            icon="Delete"
            @click="remove($index)"
            v-show="$index !== selected"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button
      :disabled="
        selected !== -1 || !form.attrValueList || form.attrValueList.length <= 0
      "
      @click="save"
    >
      保存
    </el-button>
    <el-button @click="cancel">取消</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, inject, nextTick } from 'vue'
import { ElNotification } from 'element-plus'

import { Attr, Attrs } from '@/api/product/attr/type'
import { reqSaveOrUpdateAttr } from '@/api/product/attr'

import useProductStore from '@/store/modules/product'

const productStore = useProductStore()

// 依赖注入inject
// #region
const attrs = inject('attrs', ref<Attrs>([]))
const showAdd = inject('showAdd', ref(false))
const form = inject('form', reactive({} as Attr))
const getAttrs = inject('getAttrs', () => {})
const editIndex = inject('editIndex', ref(-1))
// #endregion

// 属性值输入框
// #region
/**
 * 已选中属性值
 */
const selected = ref(-1)
/**
 * 属性值输入框元素
 */
const inputEl = ref()
/**
 * 展开输入框
 * @param index
 */
const focusAttrValue = async (index: number) => {
  if ((selected.value = -1 || form.attrValueList[selected.value].valueName)) {
    // debugger
    inputEl.value = undefined
    selected.value = index
    await nextTick()
    inputEl.value.focus()
  }
}

/**
 * 输入框失去焦点
 * @param index
 */
const blurAttrValue = (index: number) => {
  const value = form.attrValueList[index]?.valueName
  if (!value) {
    if (index === form.attrValueList.length - 1) {
      form.attrValueList.splice(index)
      selected.value = -1
    } else {
      ElNotification.warning('请输入属性值')
      inputEl.value.focus()
    }
  } else {
    const check = form.attrValueList.some((item, i) =>
      i !== index && item.valueName == value ? true : false,
    )
    if (check) {
      ElNotification.warning('请勿重复属性值')
      inputEl.value.focus()
    } else {
      selected.value = -1
    }
  }
}
// #endregion

// CRUD
// #region
/**
 * 保存全部操作
 */
const save = async () => {
  if (selected.value === -1) {
    if ((form.id && compare(editIndex.value)) || !form.id) {
      form.categoryId = productStore.attr.select[2]
      const result = await reqSaveOrUpdateAttr(form)
      if (result.code === 200) {
        showAdd.value = false
        ElNotification.success(form.id ? '修改成功' : '添加成功')
        await getAttrs()
      } else {
        ElNotification.error((form.id ? '修改失败' : '添加失败') + '，请重试')
      }
      clearForm()
    } else {
      ElNotification.error('请修改内容')
    }
  }
}
/**
 * 取消全部操作
 */
const cancel = () => {
  showAdd.value = false
  clearForm()
}
/**
 * 添加属性值
 */
const addAttrValue = () => {
  !form.attrValueList && (form.attrValueList = [])
  form.attrValueList.push({
    valueName: '',
  })
  focusAttrValue(form.attrValueList.length - 1)
}
/**
 * 删除属性值
 * @param index
 */
const remove = (index: number) => {
  form.attrValueList.splice(index, 1)
}
// #endregion

// 工具
// #region
/**
 * 是否进行修改
 * @param index
 */
const compare = (index: number) => {
  if (index < 0 || !form.id) {
    return true
  } else {
    const attr = attrs.value[index]
    if (
      form.attrName === attr.attrName &&
      form.categoryId === attr.categoryId &&
      JSON.stringify(form.attrValueList) === JSON.stringify(attr.attrValueList)
    ) {
      return false
    } else {
      return true
    }
  }
}
/**
 * 清空表单
 */
const clearForm = () => {
  Object.assign(form, {
    attrName: '',
    attrValueList: [],
    categoryId: 0,
    categoryLevel: 3,
    id: undefined,
  })
}
// #endregion
</script>

<style scoped></style>
