import { ResponseData, Page } from '@/api/type'

// 图片
// #region
/**
 * SPU对应图片
 */
export interface SPUImage {
  id?: number
  createTime?: string
  updateTime?: string
  spuId?: number
  imgName: string
  imgUrl: string
  name?: string
  url?: string
}
/**
 * 图片列表
 */
export type SPUImages = SPUImage[]
/**
 * 获取SPU图片列表接口
 */
export interface SPUImagesResponseData extends ResponseData {
  data: SPUImages
}
// #endregion

// 属性
// #region
/**
 * SPU已选属性属性值
 */
export interface SPUAttrValue {
  baseSaleAttrId: number
  createTime?: string
  id?: number
  isChecked?: string
  saleAttrName?: string
  saleAttrValueName: string
  spuId?: number
  updateTime?: string
}
/**
 * SPU已选属性属性值列表
 */
export type SPUAttrValues = SPUAttrValue[]
/**
 * SPU已选属性
 */
export interface SPUAttr {
  baseSaleAttrId: number
  createTime?: string
  updateTime?: string
  id?: number
  saleAttrName: string
  spuId?: number
  spuSaleAttrValueList: SPUAttrValues
  data?: string
}
/**
 * SPU已选属性列表
 */
export type SPUAttrs = SPUAttr[]
/**
 * 获取SPU已选属性列表接口
 */
export interface SPUAttrsResponseData extends ResponseData {
  data: SPUAttrs
}
/**
 * SPU全部属性
 */
export interface SPUAllAttr {
  id: number
  createTime?: string
  updateTime?: string
  name: string
}
/**
 * SPU全部属性列表
 */
export type SPUAllAttrs = SPUAllAttr[]
/**
 * 获取SPU全部属性列表接口
 */
export interface SPUAllAttrsResponseData extends ResponseData {
  data: SPUAllAttrs
}
// #endregion

// SPU
// #region
/**
 * SPU
 */
export interface SPU {
  id?: number
  createTime?: string
  updateTime?: string
  spuName: string
  description: string
  category3Id: number | null
  tmId: number
  spuSaleAttrList: SPUAttrs | null
  spuImageList: SPUImages | null
  spuPosterList: SPUImages | null
}
/**
 * SPU列表
 */
export type SPUs = SPU[]
/**
 * SPU分页
 */
export interface SPUPage extends Page {
  records: SPUs
}
/**
 * 获取SPU接口
 */
export interface GetSPUsResponseData extends ResponseData {
  data: SPUPage
}
/**
 * 获取SPU详情接口
 */
export interface GetSPUInfoResponseData extends ResponseData {
  data: SPU
}
/**
 * 添加/修改SPU接口
 */
export interface SaveOrUpdateSPUResponseData extends ResponseData {
  data: null
}
/**
 * 删除SPU接口
 */
export interface DeleteSPUResponseData extends ResponseData {
  data: null
}
// #endregion
