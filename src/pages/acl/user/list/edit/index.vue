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
      <el-form-item label="姓名" prop="name">
        <el-input v-model.trim="form.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      z
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

import { UserInfo } from '@/api/acl/user/type'
import { reqSaveOrUpdateUser } from '@/api/acl/user'

import useUserStore from '@/store/modules/user'

const userStore = useUserStore()

const form = inject(
  'form',
  reactive({
    id: undefined,
    username: '',
    name: '',
    password: undefined,
  }),
)
const addUser = inject('addUser', ref(false))
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
 * 标题
 */
const dialogTitle = computed(() => {
  return addUser.value ? '添加用户' : `更新${form.username}`
})
/**
 * 表单元素
 */
const formEl = ref()
/**
 * 密码校验规则
 * @param _
 * @param value
 * @param callback
 */
const passwordValidator = (
  _: any,
  value: string | undefined,
  callback: Function,
) => {
  if (!addUser.value) {
    // 更新用户，无需校验密码
    if (value) {
      form.password = undefined
    }
    callback()
  } else {
    // 添加用户
    if (value && value.length >= 6 && value.length <= 16) {
      callback()
    } else {
      callback(new Error('请输入6到16位密码'))
    }
  }
}
/**
 * 其他校验规则
 */
const rule = reactive<FormRules<UserInfo>>({
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { min: 5, message: '请输入至少5字姓名', trigger: 'blur' },
  ],
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 5, message: '请输入至少5字用户名', trigger: 'blur' },
  ],
  password: [{ required: true, validator: passwordValidator, trigger: 'blur' }],
})
/**
 * 提交
 */
const submit = async () => {
  try {
    await formEl.value.validate()
    const result = await reqSaveOrUpdateUser(form)
    const flag = addUser.value ? '添加' : '更新'
    if (result.code === 200) {
      if (userStore.name === form.username) {
        ElNotification.success('个人信息变更，请重新登录')
        window.location.reload()
      } else {
        getUserInfo()
        visible.value = false
        clearForm()
        ElNotification.success(`${flag}用户成功`)
      }
    } else {
      ElNotification.error(`${flag}用户失败`)
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
  if (!addUser.value) {
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
    name: '',
    username: '',
    password: undefined,
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
