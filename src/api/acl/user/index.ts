/**
 * 用户管理接口
 */
import request from '@/utils/request'
import {
  UserInfo,
  UserInfoResponseData,
  SaveOrUpdateUserResponseData,
  UserRoleResponseData,
  UpdateUserRole,
  UpdateUserRoleResponseData,
  DeleteUserResponseData,
} from '@/api/acl/user/type.ts'

enum API {
  // 获取用户管理信息
  GET_USER_INFO_URL = '/admin/acl/user/',
  // 添加用户
  SAVE_USER_URL = '/admin/acl/user/save',
  // 更新用户
  UPDATE_USER_URL = '/admin/acl/user/update',
  // 获取用户角色
  GET_USER_ROLE_URL = '/admin/acl/user/toAssign/',
  // 分配用户角色
  UPDATE_USER_ROLE_URL = '/admin/acl/user/doAssignRole',
  // 删除一个用户
  DELETE_USER_URL = '/admin/acl/user/remove/',
  // 删除多个用户
  DELETE_MANY_USER_URL = '/admin/acl/user/batchRemove',
}

/**
 * 获取用户管理信息
 * @param page 页码
 * @param limit 每页大小
 * @returns
 */
export const reqGetUserInfo = (
  page: number,
  limit: number,
  username?: string,
) =>
  request.get<any, UserInfoResponseData>(
    API.GET_USER_INFO_URL +
      `${page}/${limit}` +
      (username !== '' ? `?username=${username}` : ''),
  )

/**
 * 添加或更新用户
 * @param data
 */
export const reqSaveOrUpdateUser = (data: UserInfo) => {
  return data.id
    ? request.put<any, SaveOrUpdateUserResponseData>(API.UPDATE_USER_URL, data)
    : request.post<any, SaveOrUpdateUserResponseData>(API.SAVE_USER_URL, data)
}

/**
 * 获取用户角色
 * @param userId
 * @returns
 */
export const reqGetUserRole = (userId: number) =>
  request.get<any, UserRoleResponseData>(API.GET_USER_ROLE_URL + userId)

/**
 * 更新用户角色
 * @param data
 * @returns
 */
export const reqUpdateUserRole = (data: UpdateUserRole) =>
  request.post<any, UpdateUserRoleResponseData>(API.UPDATE_USER_ROLE_URL, data)

/**
 * 删除一个用户
 * @param userId
 * @returns
 */
export const reqDeleteUser = (userId: number) =>
  request.delete<any, DeleteUserResponseData>(API.DELETE_USER_URL + userId)

export const reqDeleteManyUser = (users: number[]) =>
  request.delete<any, DeleteUserResponseData>(API.DELETE_MANY_USER_URL, {
    data: users,
  })
