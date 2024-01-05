import { ResponseData } from '@/api/type'

// 分类
// #region
/**
 * 一级分类
 */
export interface Category {
  id: number
  createTime: string
  updateTime: string
  name: string
}
/**
 * 二级分类
 */
export interface Category2 extends Category {
  category1Id: number
}
/**
 * 三级分类
 */
export interface Category3 extends Category {
  category2Id: number
}
/**
 * 一级分类数组
 */
export type Categorys = Category[]
/**
 * 二级分类数组
 */
export type Categorys2 = Category2[]
/**
 * 三级分类数组
 */
export type Categorys3 = Category3[]
/**
 * 获取一级分类接口
 */
export interface GetCategory1ResponseData extends ResponseData {
  data: Categorys
}
/**
 * 获取二级分类接口
 */
export interface GetCategory2ResponseData extends ResponseData {
  data: Categorys2
}
/**
 * 获取三级分类接口
 */
export interface GetCategory3ResponseData extends ResponseData {
  data: Categorys3
}
// #endregion

// 属性
// #region
/**
 * 属性值
 */
export interface AttrValue {
  id?: number
  createTime?: string
  updateTime?: string
  valueName: string
  attrId?: number
}
/**
 * 属性值数组
 */
export type AttrValues = AttrValue[]
/**
 * 属性
 */
export interface Attr {
  id?: number
  createTime?: string
  updateTime?: string
  attrName: string
  categoryId: number
  categoryLevel: number
  attrValueList: AttrValues
  data?: string
}
/**
 * 属性数组
 */
export type Attrs = Attr[]
/**
 * 获取属性接口
 */
export interface GetAttrsResponseData extends ResponseData {
  data: Attrs
}
/**
 * 添加/修改属性接口
 */
export interface SaveOrUpdateAttrResponseData extends ResponseData {
  data: string
}
/**
 * 删除属性接口
 */
export interface DeleteAttrResponseData extends ResponseData {
  data: null
}
// #endregion
