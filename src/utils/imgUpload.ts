import { ElNotification } from 'element-plus'

/**
 * 允许的文件类型
 */
const imageType = ['image/jpeg', 'image/png', 'image/webp']

/**
 * 上传前钩子
 * 请调用此函数
 * @param rawFile 文件
 */
export const beforeImgUpload = (cb?: Function) => {
  return (rawFile: File) => {
    if (!imageType.includes(rawFile.type)) {
      ElNotification.error('请上传静态图片')
      return false
    } else if (rawFile.size / 1024 / 1024 > 2) {
      ElNotification.error('请上传2MB以内的图片')
      return false
    }
    cb ? cb() : ''
    return true
  }
}

/**
 * 上传失败后钩子
 * 请调用此函数
 * @param _
 */
export const onUploadImgError = (cb?: Function) => {
  return (_: Error) => {
    ElNotification.error('图片上传失败，请重试')
    cb ? cb() : ''
  }
}
