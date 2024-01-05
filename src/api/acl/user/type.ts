import { ResponseData, Page } from '@/api/type'
import { Roles } from '@/api/acl/role/type'

// 角色
// #region
/**
 * 提交用户角色数据
 */
export interface UpdateUserRole {
  roleIdList: number[]
  userId: number
}
/**
 * 用户角色接口
 */
export interface UserRoleResponseData extends ResponseData {
  data: {
    assignRoles: Roles
    allRolesList: Roles
  }
}
/**
 * 更新用户角色接口
 */
export interface UpdateUserRoleResponseData extends ResponseData {
  data: string
}
/**
 * 删除用户接口
 */
export interface DeleteUserResponseData extends ResponseData {
  data: null
}
// #endregion

// 用户
// #region
/**
 * 用户管理信息
 */
export interface UserInfo {
  id?: number
  createTime?: string
  updateTime?: string
  username: string
  password?: string
  name: string
  phone?: string
  roleName?: string
}
/**
 * 用户管理信息数组
 */
export type UserInfos = UserInfo[]
/**
 * 用户管理信息分页
 */
export interface UserInfoPage extends Page {
  records: UserInfos
}
/**
 * 用户管理信息接口
 */
export interface UserInfoResponseData extends ResponseData {
  data: UserInfoPage
}
/**
 * 添加或更新用户接口
 */
export interface SaveOrUpdateUserResponseData extends ResponseData {
  data: null
}
// #endregion
