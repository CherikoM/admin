/**
 * 用户接口
 */
import request from '@/utils/request'
import {
  LoginForm,
  LoginResponseData,
  GetUserResponseData,
  LogoutResponseData,
} from '@/api/user/type.ts'

enum API {
  // 登录
  LOGIN_URL = '/admin/acl/index/login',
  // 获取用户信息
  USER_INFO_URL = '/admin/acl/index/info',
  // 登出
  LOGOUT_URL = '/admin/acl/index/logout',
}

/**
 * 登录
 * @param data 登陆表单
 * @returns
 */
export const reqLogin = (data: LoginForm) =>
  request.post<any, LoginResponseData>(API.LOGIN_URL, data)

/**
 * 获取用户信息
 * @returns
 */
export const reqGetUser = () =>
  request.get<any, GetUserResponseData>(API.USER_INFO_URL)

/**
 * 登出
 * @returns
 */
export const reqLogout = () =>
  request.post<any, LogoutResponseData>(API.LOGOUT_URL)
