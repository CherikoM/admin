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
      <el-form-item label="权限名" prop="name">
        <el-input
          v-model.trim="form.name"
          placeholder="请输入权限名"
        ></el-input>
      </el-form-item>
      <el-form-item label="权限值" prop="code">
        <el-input
          v-model.trim="form.code"
          placeholder="请输入权限值"
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
import { MenuData, Permission } from '@/api/acl/permission/type'
import { reqSaveOrUpdatePermission } from '@/api/acl/permission'

const form = inject(
  'form',
  reactive<MenuData>({
    id: undefined,
    code: '',
    level: 0,
    name: '',
    pid: 0,
  }),
)
const active = inject('active', ref<Permission>({} as Permission))
const addMenu = inject('addMenu', ref(false))
const getPermission = inject('getPermission', () => {})

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
  return addMenu.value
    ? `为${active.value.name}添加菜单`
    : `更新${active.value.name}`
})
/**
 * 表单元素
 */
const formEl = ref()
/**
 * 防止重复输入校验器
 * @param _
 * @param __
 * @param callback
 */
const validator = (_: any, __: any, callback: Function) => {
  if (!addMenu.value) {
    if (form.name !== active.value.name || form.code !== active.value.code) {
      formEl.value.clearValidate()
      callback()
    } else {
      callback(new Error('请更改输入'))
    }
  }
}
/**
 * 校验规则
 */
const rule = reactive<FormRules<MenuData>>({
  code: [
    { required: true, message: '请输入权限值', trigger: 'blur' },
    { validator: validator, trigger: 'blur' },
  ],
  name: [
    { required: true, message: '请输入权限名', trigger: 'blur' },
    { validator: validator, trigger: 'blur' },
  ],
})
/**
 * 提交
 */
const submit = async () => {
  try {
    await formEl.value.validate()
    const result = await reqSaveOrUpdatePermission(form)
    const flag = addMenu.value ? '添加' : '更新'
    if (result.code === 200) {
      getPermission()
      visible.value = false
      clearForm()
      ElNotification.success(`${flag}目录成功`)
    } else {
      ElNotification.error(`${flag}目录失败`)
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
  if (!addMenu.value) {
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
    code: '',
    level: 0,
    name: '',
    pid: 0,
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
