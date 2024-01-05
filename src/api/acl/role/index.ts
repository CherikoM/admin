/**
 * 用户管理接口
 */
import request from '@/utils/request'
import {
  RolesResponseData,
  EditRole,
  SaveOrUpdateResponseData,
  RoleMenuResponseData,
  AssignRoleMenuResponseData,
  DeleteRoleResponseData,
} from '@/api/acl/role/type.ts'

enum API {
  // 获取角色信息
  GET_ROLE_URL = '/admin/acl/role/',
  // 添加角色
  SAVE_ROLE_URL = '/admin/acl/role/save',
  // 更新角色
  UPDATE_ROLE_URL = '/admin/acl/role/update',
  // 获取角色菜单权限
  GET_ROLE_MENU_URL = '/admin/acl/permission/toAssign/',
  // 分配角色菜单权限
  ASSIGN_ROLE_MENU_URL = '/admin/acl/permission/doAssign/?',
  // 删除角色
  DELETE_ROLE_URL = '/admin/acl/role/remove/',
}

/**
 * 获取角色信息
 * @param page 页码
 * @param limit 每页大小
 * @param roleName 角色名查找词
 * @returns
 */
export const reqGetRoles = (page: number, limit: number, roleName?: string) =>
  request.get<any, RolesResponseData>(
    API.GET_ROLE_URL +
      `${page}/${limit}` +
      (roleName !== '' ? `?username=${roleName}` : ''),
  )

/**
 * 添加/更新角色
 * @param data
 * @returns
 */
export const reqSaveOrUpdateRole = (data: EditRole) => {
  return data.id
    ? request.put<any, SaveOrUpdateResponseData>(API.UPDATE_ROLE_URL, data)
    : request.post<any, SaveOrUpdateResponseData>(API.SAVE_ROLE_URL, data)
}

/**
 * 获取角色菜单权限
 * @param roleId
 * @returns
 */
export const reqGetRoleMenu = (roleId: number) =>
  request.get<any, RoleMenuResponseData>(API.GET_ROLE_MENU_URL + roleId)

/**
 * 分配角色菜单权限
 * @param roleId
 * @param permissionId
 * @returns
 */
export const reqAssignRoleMenu = (roleId: number, permissionId: number[]) =>
  request.post<any, AssignRoleMenuResponseData>(
    API.ASSIGN_ROLE_MENU_URL + `roleId=${roleId}&permissionId=${permissionId}`,
  )

export const reqDeleteRole = (roleId: number) =>
  request.delete<any, DeleteRoleResponseData>(API.DELETE_ROLE_URL + roleId)
