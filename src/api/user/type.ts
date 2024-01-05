import { ResponseData } from '@/api/type'

// 登录
// #region
/**
 * 登录接口参数
 */
export interface LoginForm {
  username: string
  password: string
}
/**
 * 登录接口
 */
export interface LoginResponseData extends ResponseData {
  data: string
}
// #endregion

// 用户信息
// #region
/**
 * 用户登录信息
 */
export interface User {
  routes: string[]
  buttons: string[]
  roles: string[]
  name: string
  avatar: string
}
/**
 * 获取用户登录信息接口
 */
export interface GetUserResponseData extends ResponseData {
  data: User
}
// #endregion

// 登出
// #region
/**
 * 登出接口
 */
export interface LogoutResponseData extends ResponseData {
  data: null
}
// #endregion
