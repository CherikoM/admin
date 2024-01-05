import { ResponseData } from '@/api/type'

// 菜单
// #region
export interface Permission {
  id: number
  createTime: string
  updateTime: string
  pid: number
  name: string
  code: string
  toCode: string
  type: number
  status: number
  level: number
  children: Permissions | null
  select?: boolean
}

export type Permissions = Permission[]

export interface GetPermissionResponseData extends ResponseData {
  data: Permissions
}

export interface MenuData {
  id?: number
  code: string
  level: number
  name: string
  pid: number
}

export interface SaveOrUpdatePermissionResponseData extends ResponseData {
  data: null
}

export interface DeletePermissionResponseData extends ResponseData {
  data: null
}
// #endregion
