<template>
  <el-dialog
    v-model="visible"
    :title="dialogTitle"
    width="30%"
    @closed="onDialogClose"
  >
    <el-form
      ref="formEl"
      :model="form"
      :rules="rule"
      label-width="auto"
      class="edit-form"
    >
      <el-form-item label="角色名" prop="roleName">
        <el-input
          v-model.trim="form.roleName"
          placeholder="请输入角色名"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button plain @click="submit">提交</el-button>
      <el-button plain @click="cancel">取消</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed, ref, reactive, inject } from 'vue'
import { ElNotification, FormRules } from 'element-plus'

import { reqSaveOrUpdateRole } from '@/api/acl/role'
import { Role } from '@/api/acl/role/type'

const form = inject(
  'form',
  reactive({
    id: undefined,
    roleName: '',
  }),
)
const origin = inject('origin', ref(''))
const addRole = inject('addRole', ref(false))
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
 * 标题
 */
const dialogTitle = computed(() => {
  return addRole.value ? '添加角色' : `更新${form.roleName}`
})
/**
 * 表单元素
 */
const formEl = ref()
/**
 * 校验规则
 * @param _
 * @param value
 * @param callback
 */
const roleNameValidator = (
  _: any,
  value: string | undefined,
  callback: Function,
) => {
  value === origin.value ? callback(new Error('请更改输入')) : callback()
}
/**
 * 校验规则
 */
const rule = reactive<FormRules<Role>>({
  roleName: [
    { required: true, min: 1, message: '请输入角色名', trigger: 'blur' },
    { validator: roleNameValidator, trigger: 'blur' },
  ],
})
/**
 * 提交
 */
const submit = async () => {
  try {
    await formEl.value.validate()
    const result = await reqSaveOrUpdateRole(form)
    const flag = addRole.value ? '添加' : '更新'
    if (result.code === 200) {
      getRoles()
      visible.value = false
      clearForm()
      ElNotification.success(`${flag}角色成功`)
    } else {
      ElNotification.error(`${flag}角色失败`)
    }
  } catch (e) {
    ElNotification.error('请检查输入')
  }
}
/**
 * 是否执行取消操作
 */
let isCancel = false
/**
 * 取消操作
 */
const cancel = () => {
  visible.value = false
  isCancel = true
}
/**
 * 对话框关闭
 */
const onDialogClose = async () => {
  if (!addRole.value) {
    clearForm()
  } else if (isCancel) {
    clearForm()
    isCancel = false
  }
  formEl.value.clearValidate()
}
/**
 * 清除表单
 */
const clearForm = () => {
  Object.assign(form, {
    id: undefined,
    roleName: '',
  })
  formEl.value.clearValidate()
}
</script>

<style lang="scss" scoped>
.edit-form {
  :deep(.el-form-item):last-child {
    margin: 0;
  }
}
</style>
