// 路由拦截器

import router from '@/router'

import { ElNotification } from 'element-plus'

import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

import setting from '@/setting'

import useUserStore from '@/store/modules/user'

nprogress.configure({ showSpinner: false })

router.beforeEach(async (to, _, next) => {
  nprogress.start()

  const userStore = useUserStore()

  // next()
  if (userStore.token) {
    // 已登录（有token）
    if (to.path !== '/login') {
      // 前往管理页面
      if (!userStore.name) {
        // 没有用户信息，从接口获取
        try {
          // 用户信息获取成功
          await userStore.getUserInfo()
          // 轮询等待用户信息重载
          next({ ...to })
        } catch (error) {
          // 用户信息获取失败（token过期）
          ElNotification.error(error as Error)
          await userStore.logout()
          next({ path: '/login', query: { redirect: to.path } })
        }
      } else {
        // 有用户信息
        next()
      }
    } else {
      // 前往登录页面，跳到首页
      next({ path: '/home' })
    }
  } else {
    // 未登录
    to.path === '/login' ? next() : next({ path: '/login' })
  }
})

router.afterEach((to, _) => {
  nprogress.done()
  document.title = `${setting.title} - ${to.meta.title}`
})
