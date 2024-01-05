/**
 * 用户接口
 */
import request from '@/utils/request'
import {
  Attr,
  GetAttrsResponseData,
  GetCategory1ResponseData,
  GetCategory2ResponseData,
  GetCategory3ResponseData,
  SaveOrUpdateAttrResponseData,
  DeleteAttrResponseData,
} from '@/api/product/attr/type.ts'

enum API {
  // 获取一级分类
  GET_CATEGORY_1_URL = '/admin/product/getCategory1',
  // 获取二级分类
  GET_CATEGORY_2_URL = '/admin/product/getCategory2/',
  // 获取三级分类
  GET_CATEGORY_3_URL = '/admin/product/getCategory3/',
  // 获取属性
  GET_ATTRS_URL = '/admin/product/attrInfoList/',
  // 添加/修改属性
  SAVE_OR_UPDATE_ATTR_URL = '/admin/product/saveAttrInfo/',
  // 删除属性
  DELETE_ATTR_URL = '/admin/product/deleteAttr/',
}

/**
 * 获取一级分类
 * @returns
 */
export const reqGetCategory1 = () =>
  request.get<any, GetCategory1ResponseData>(API.GET_CATEGORY_1_URL)

/**
 * 获取二级分类
 * @param id 一级分类id
 * @returns
 */
export const reqGetCategory2 = (id: number) =>
  request.get<any, GetCategory2ResponseData>(API.GET_CATEGORY_2_URL + id)

/**
 * 获取三级分类
 * @param id 二级分类id
 * @returns
 */
export const reqGetCategory3 = (id: number) =>
  request.get<any, GetCategory3ResponseData>(API.GET_CATEGORY_3_URL + id)

/**
 * 获取属性
 * @param category 属性目录
 * @returns
 */
export const reqGetAttrs = (category: number[]) =>
  request.get<any, GetAttrsResponseData>(
    API.GET_ATTRS_URL + `${category[0]}/${category[1]}/${category[2]}`,
  )

/**
 * 添加/修改属性
 * @param attr 属性对象
 * @returns
 */
export const reqSaveOrUpdateAttr = (attr: Attr) =>
  request.post<any, SaveOrUpdateAttrResponseData>(
    API.SAVE_OR_UPDATE_ATTR_URL,
    attr,
  )

/**
 * 删除属性
 * @param id 属性id
 * @returns
 */
export const reqDeleteAttr = (id: number) =>
  request.delete<any, DeleteAttrResponseData>(API.DELETE_ATTR_URL + id)
