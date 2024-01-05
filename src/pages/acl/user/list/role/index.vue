<template>
  <el-dialog
    v-model="visible"
    :title="`为${form.username}分配角色`"
    width="40%"
    @open="getUserRole"
    @closed="clearUserRole"
  >
    <el-form v-loading="load">
      <el-form-item>
        <el-checkbox
          v-model="checkAll"
          :indeterminate="isIndeterminate"
          @change="onCheckAllChange"
        >
          选择全部
        </el-checkbox>
        <el-checkbox-group v-model="checked" @change="onCheckChange">
          <el-checkbox v-for="item in all" :key="item.id" :label="item">
            {{ item.roleName }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button plain @click="submit">提交</el-button>
      <el-button plain @click="cancel">取消</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, inject, computed } from 'vue'
import { ElNotification } from 'element-plus'

import { reqGetUserRole, reqUpdateUserRole } from '@/api/acl/user'
import { UserInfo } from '@/api/acl/user/type'
import { Roles } from '@/api/acl/role/type'

import sleep from '@/utils/sleep'

const form = inject(
  'form',
  reactive<UserInfo>({
    id: undefined,
    username: '',
    name: '',
    password: undefined,
  }),
)
const getUserInfo = inject('getUserInfo', () => {})

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
 * 是否选择全部项
 */
const checkAll = ref(false)
/**
 * 是否有选择项且未选全部
 */
const isIndeterminate = ref(false)
/**
 * 已选项
 */
const checked = ref<Roles>([])
/**
 * 所有选项
 */
const all: Roles = []
/**
 * 获取数据
 */
const getUserRole = async () => {
  load.value = true
  const result = await reqGetUserRole(form.id as number)
  if (result.code === 200) {
    const assignRoles = result.data.assignRoles
    const allRolesList = result.data.allRolesList

    checked.value = assignRoles
    all.splice(0, all.length)
    all.push(...allRolesList)

    if (0 < assignRoles.length && assignRoles.length < allRolesList.length) {
      isIndeterminate.value = true
    }
  } else {
    ElNotification.error('获取角色失败')
  }
  await sleep(500)
  load.value = false
}
/**
 * 清空选择
 */
const clearUserRole = () => {
  checked.value = []
  all.splice(0, all.length)
  checkAll.value = false
  isIndeterminate.value = false
}
/**
 * 全选/全不选
 * @param val
 */
const onCheckAllChange = (val: boolean) => {
  checked.value = val ? all : []
  isIndeterminate.value = false
}
/**
 * 勾选/取消选择框
 * @param value
 */
const onCheckChange = (value: string[]) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === all.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < all.length
}
/**
 * 提交
 */
const submit = async () => {
  const roles = checked.value.map((item) => item.id)
  const result = await reqUpdateUserRole({
    roleIdList: roles as number[],
    userId: form.id as number,
  })
  if (result.code === 200) {
    ElNotification.success('分配角色成功')
    visible.value = false
    getUserInfo()
  } else {
    ElNotification.error('分配角色失败')
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
