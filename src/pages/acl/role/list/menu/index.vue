<template>
  <el-dialog
    v-model="visible"
    :title="`为${form.roleName}分配权限`"
    width="40%"
    @open="getRoleMenu"
    @closed="clearRoleMenu"
  >
    <el-tree
      v-loading="load"
      :props="prop"
      :data="nodeData"
      show-checkbox
      :default-checked-keys="defaultSelect"
      node-key="id"
      accordion
      ref="tree"
    />
    <template #footer>
      <el-button plain @click="submit">提交</el-button>
      <el-button plain @click="cancel">取消</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, inject, computed } from 'vue'
import { ElNotification } from 'element-plus'

import { reqAssignRoleMenu, reqGetRoleMenu } from '@/api/acl/role'

import { Role } from '@/api/acl/role/type'
import { Permissions } from '@/api/acl/permission/type'

const form = inject(
  'form',
  reactive<Role>({
    id: undefined,
    roleName: '',
  }),
)
const getRoles = inject('getRoles', () => {})

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits(['update:modelValue'])

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})
/**
 * 是否加载
 */
const load = ref(false)
/**
 * 初始被选择项
 */
const defaultSelect: number[] = []
/**
 * 计算初始被选择项
 */
const getDefaultSelect = (nodeList: Permissions) => {
  const arr: number[] = []
  const core = (nodeList: Permissions, initArr: number[]) => {
    for (let i = 0; i < nodeList.length; i++) {
      const item = nodeList[i]
      if (item.children && item.children.length > 0) {
        core(item.children, initArr)
      } else if (item.select) {
        initArr.push(item.id)
      }
    }
    return initArr
  }
  return core(nodeList, arr)
}
/**
 * 获取数据
 */
const getRoleMenu = async () => {
  load.value = true
  const result = await reqGetRoleMenu(form.id as number)
  if (result.code === 200) {
    nodeData.value = result.data
    defaultSelect.push(...getDefaultSelect(result.data))
  } else {
    ElNotification.error('获取菜单失败')
  }
  load.value = false
}
/**
 * 树形选择元素
 */
const tree = ref()
/**
 * 树形选择配置项
 */
const prop = {
  label: 'name',
  children: 'children',
}
/**
 * 所有选项
 */
const nodeData = ref<Permissions>([])
/**
 * 清空选择
 */
const clearRoleMenu = () => {
  nodeData.value = []
  defaultSelect.length = 0
}
/**
 * 提交
 */
const submit = async () => {
  const arr1 = tree.value.getCheckedKeys()
  const arr2 = tree.value.getHalfCheckedKeys()
  console.log(arr1, arr2, defaultSelect)
  const result = await reqAssignRoleMenu(form.id as number, arr1.concat(arr2))
  if (result.code === 200) {
    ElNotification.success('分配权限成功')
    visible.value = false
    getRoles()
  } else {
    ElNotification.error('分配权限失败')
  }
}

/**
 * 取消
 */
const cancel = () => {
  visible.value = false
}
</script>

<style scoped></style>
