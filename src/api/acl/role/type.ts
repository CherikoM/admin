import { ResponseData, Page } from '@/api/type'

import { Permissions } from '@/api/acl/permission/type'

// 角色
// #region
/**
 * 角色
 */
export interface Role {
  id?: number
  createTime?: string
  updateTime?: string
  roleName: string
  remark?: null
}
/**
 * 角色数组
 */
export type Roles = Role[]
/**
 * 角色分页
 */
export interface RolesPage extends Page {
  records: Roles
}
/**
 * 获取角色接口
 */
export interface RolesResponseData extends ResponseData {
  data: RolesPage
}
/**
 * 编辑角色
 */
export interface EditRole {
  id?: number
  roleName: string
}
/**
 * 添加/修改角色接口
 */
export interface SaveOrUpdateResponseData extends ResponseData {
  data: null
}
// #endregion

// 角色菜单
// #region
/**
 * 获取角色菜单权限接口
 */
export interface RoleMenuResponseData extends ResponseData {
  data: Permissions
}
/**
 * 分配角色菜单权限接口
 */
export interface AssignRoleMenuResponseData extends ResponseData {
  data: null
}
/**
 * 删除角色接口
 */
export interface DeleteRoleResponseData extends ResponseData {
  data: null
}
// #endregion
