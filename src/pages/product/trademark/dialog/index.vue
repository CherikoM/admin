<template>
  <div>
    <!-- 对话框（添加或修改品牌） -->
    <el-dialog
      v-model="dialogVisible"
      @closed="dialogClose"
      :title="`${form.id ? '修改' : '添加'}品牌`"
      width="60%"
    >
      <el-form
        ref="formEl"
        :model="form"
        :rules="rule"
        class="form"
        label-width="100px"
      >
        <el-form-item label="品牌名" prop="tmName">
          <el-input
            v-model.trim="form.tmName"
            placeholder="请输入品牌名"
          ></el-input>
        </el-form-item>
        <el-form-item label="品牌logo" prop="logoUrl">
          <el-upload
            ref="uploadEl"
            class="avatar-uploader"
            action="/api/admin/product/fileUpload"
            :show-file-list="false"
            :before-upload="beforeImgUpload(beforeUploadcb)"
            :on-success="onUploadImgSuccess"
            :on-error="onUploadImgError(onUploadImgErrorcb)"
            v-loading="uploadLoading"
          >
            <elImg
              v-if="form.logoUrl"
              :src="form.logoUrl"
              width="150px"
              height="150px"
            ></elImg>
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button plain @click="cancel" type="info">取消</el-button>
          <el-button
            plain
            @click="confirm"
            type="primary"
            :disabled="uploadLoading"
          >
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, inject, reactive, Ref } from 'vue'
import { ElNotification, FormRules, UploadProps } from 'element-plus'

import { reqSaveTrademark } from '@/api/product/trademark'
import { Trademark, Trademarks } from '@/api/product/trademark/type'

import { beforeImgUpload, onUploadImgError } from '@/utils/imgUpload'

// 依赖注入inject
// #region
const trademarks = inject<Ref<Trademarks>>('trademarks', ref([]))
const dialogVisible = inject<Ref<boolean>>('dialogVisible', ref(false))
const currentTM = inject<Ref<number>>('currentTM', ref(-1))
const getTrademark = inject<Function>('getTrademark', () => {})
const form = inject<Trademark>('form', reactive({} as Trademark))
// #endregion

// 表单form
// #region
/**
 * 表单DOM元素
 */
const formEl = ref()
/**
 * 上传图片校验规则
 * @param _
 * @param value 表单项的值
 * @param callback 回调函数，判断校验成功与否
 */
const imgValidator = (_: any, value: string, callback: Function) => {
  value ? callback() : callback(new Error('请上传品牌logo'))
}
/**
 * 表单校验规则
 */
const rule = reactive<FormRules>({
  tmName: [{ required: true, message: '请输入品牌名', trigger: 'blur' }],
  logoUrl: [{ required: true, validator: imgValidator }],
})
/**
 * 取消当前添加/更改
 */
const cancel = () => {
  dialogVisible.value = false
  clearForm()
}
/**
 * 确认当前添加/更改
 */
const confirm = async () => {
  if (
    trademarks.value[currentTM.value]?.tmName === form.tmName &&
    trademarks.value[currentTM.value]?.logoUrl === form.logoUrl
  ) {
    ElNotification.error('请修改后再作确认')
    return
  }
  try {
    await formEl.value.validate()
    const result = await reqSaveTrademark(form)
    if (result.code === 200) {
      const str = form.id ? '修改' : '添加'
      ElNotification.success(str + '成功')
      dialogVisible.value = false
      await getTrademark()
      clearForm()
    } else {
      ElNotification.error(result.data)
    }
  } catch {
    ElNotification.error('请检查输入')
  }
}
/**
 * 清空表单
 */
const clearForm = () => {
  form.id = undefined
  form.tmName = ''
  form.logoUrl = ''
}
/**
 * 关闭对话框
 */
const dialogClose = () => {
  form.id && clearForm()
  formEl.value.clearValidate()
  abortUpload()
}
// #endregion

// 图片上传
// #region
/**
 * 文件上传DOM元素
 */
const uploadEl = ref()
// /**
//  * 允许的文件类型
//  */
// const imageType = ['image/jpeg', 'image/png', 'image/webp']
/**
 * 上传框加载状态
 */
const uploadLoading = ref(false)
/**
 * 上传前钩子
 * @param rawFile 文件
 */
const beforeUploadcb = () => {
  uploadLoading.value = true
}
/**
 * 上传成功后钩子
 * @param response 接口响应
 */
const onUploadImgSuccess: UploadProps['onSuccess'] = (response) => {
  form.logoUrl = response.data
  formEl.value.clearValidate('logoUrl')
  uploadLoading.value = false
}
/**
 * 上传失败后钩子
 */
const onUploadImgErrorcb = () => {
  uploadLoading.value = false
}
/**
 * 取消上传
 */
const abortUpload = () => {
  uploadEl.value.abort()
  uploadLoading.value = false
}
// #endregion
</script>

<style lang="scss" scoped>
.form {
  width: 80%;
  margin: 0 auto;

  .avatar-uploader {
    :deep(.el-upload) {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);

      &:hover {
        border-color: var(--el-color-primary);
      }
    }

    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      @include square(150px);
      text-align: center;
    }
  }
}
</style>
@/utils/imgUpload
