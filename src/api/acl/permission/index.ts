/**
 * 用户管理接口
 */
import request from '@/utils/request'
import {
  GetPermissionResponseData,
  SaveOrUpdatePermissionResponseData,
  MenuData,
  DeletePermissionResponseData,
} from '@/api/acl/permission/type.ts'

enum API {
  // 获取权限
  GET_PERMISSION_URL = '/admin/acl/permission',
  // 添加菜单
  SAVE_PERMISSION_URL = '/admin/acl/permission/save',
  // 更新菜单
  UPDATE_PERMISSION_URL = '/admin/acl/permission/update',
  // 删除菜单
  DELETE_PERMISSION_URL = '/admin/acl/permission/remove/',
}

export const reqGetPermission = () =>
  request.get<any, GetPermissionResponseData>(API.GET_PERMISSION_URL)

export const reqSaveOrUpdatePermission = (data: MenuData) => {
  return data.id
    ? request.put<any, SaveOrUpdatePermissionResponseData>(
        API.UPDATE_PERMISSION_URL,
        data,
      )
    : request.post<any, SaveOrUpdatePermissionResponseData>(
        API.SAVE_PERMISSION_URL,
        data,
      )
}

export const reqDeletePermission = (id: number) =>
  request.delete<any, DeletePermissionResponseData>(
    API.DELETE_PERMISSION_URL + id,
  )
