/**
 * axios二次封装
 */
import axios from 'axios'
import { ElMessage } from 'element-plus'
import useUserStore from '@/store/modules/user'

const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 100000,
})

request.interceptors.request.use((config) => {
  const userStore = useUserStore()
  if (userStore.token) {
    config.headers.token = userStore.token
  }
  return config
})

request.interceptors.response.use(
  (res) => {
    return res.data
  },
  (err) => {
    let msg = ''
    const status = err.response.status
    switch (status) {
      case 401:
        msg = '凭证已过期'
        break
      case 403:
        msg = '无权访问'
        break
      case 404:
        msg = '请求地址错误'
        break
      case 500:
        msg = '服务器错误'
        break
      default:
        msg = '暂无网络'
    }
    ElMessage.error(msg)
  },
)

export default request
