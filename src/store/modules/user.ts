import { defineStore } from 'pinia'
// useRouter()方法中会调用依赖注入inject()方法（它只能在组件中使用）
// 所以此处直接使用项目中已初始化的router
import router from '@/router'

import { reqLogin, reqGetUser, reqLogout } from '@/api/user'
import { LoginForm, User } from '@/api/user/type'
import { UserState } from '@/store/type'

import { constantRoute, asyncRoute, anyRoute } from '@/router/routes'
import { RouteRecordRaw } from 'vue-router'

import cloneDeep from 'lodash/cloneDeep'

/**
 * 过滤异步路由
 */
const filtAsyncRoute = (
  asyncRoute: RouteRecordRaw[],
  routes: string[],
): RouteRecordRaw[] => {
  const ar = cloneDeep(asyncRoute)
  return ar.filter((item: RouteRecordRaw) => {
    if (routes.includes(item.name as string)) {
      if (item.children && item.children.length > 0) {
        item.children = filtAsyncRoute(item.children, routes)
      }
      return true
    }
  })
}

const useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      // 用户唯一标识token
      token: '',
      // 路由数组
      menuRoute: [...constantRoute],
      // 用户信息
      userInfo: {} as User,
    }
  },
  persist: {
    paths: ['token'],
  },
  actions: {
    // 用户登录
    async login(data: LoginForm) {
      const result = await reqLogin(data)
      if (result.code === 200) {
        this.token = result.data
        return true
      } else {
        return Promise.reject('登录失败')
      }
    },
    // 获取用户信息
    async getUserInfo() {
      const result = await reqGetUser()
      if (result.code === 200) {
        this.userInfo = result.data
        // 用户权限
        const userAsyncRoute = filtAsyncRoute(asyncRoute, result.data.routes)
        this.menuRoute.push(...userAsyncRoute, anyRoute)
        // 动态注册路由
        ;[...userAsyncRoute, anyRoute].forEach((item: RouteRecordRaw) => {
          router.addRoute(item)
        })
        console.log(router.getRoutes())
        return true
      } else {
        return Promise.reject('用户身份已失效')
      }
    },
    async logout() {
      const result = await reqLogout()
      if (result.code === 200) {
        let name = this.userInfo.name
        router.push({ path: '/login' })
        this.token = ''
        this.userInfo = {} as User
        this.menuRoute.length = 0
        this.menuRoute.push(...constantRoute)
        return name
      } else {
        return Promise.reject(result.message)
      }
    },
  },
  getters: {
    name: (state) => state.userInfo.name,
    avatar: (state) => state.userInfo.avatar,
    buttons: (state) => state.userInfo.buttons,
  },
})

export default useUserStore
