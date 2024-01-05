import { Page, ResponseData } from '@/api/type'

// 图片
// #region
/**
 * SKU图片
 */
export interface SKUImage {
  createTime?: string
  id: number
  imgName: string
  imgUrl: string
  isDefault: string
  skuId: number
  spuImgId: number
  updateTime?: string
}
/**
 * SKU图片数组
 */
export type SKUImages = SKUImage[]
// #endregion

// 属性
// #region
/**
 * SKU产品属性
 */
export interface SKUAttr {
  attrId: number
  attrName?: string
  createTime?: string
  id?: number
  skuId?: number
  updateTime?: string
  valueId: number
  valueName?: string
}
/**
 * SKU产品属性数组
 */
export type SKUAttrs = SKUAttr[]
/**
 * SKU销售属性
 */
export interface SKUSaleAttr {
  createTime?: string
  id?: number
  saleAttrId: number
  saleAttrName?: string
  saleAttrValueId: number
  saleAttrValueName?: string
  skuId?: number
  spuId?: number
  updateTime?: string
}
/**
 * SKU销售属性数组
 */
export type SKUSaleAttrs = SKUSaleAttr[]
// #endregion

// SKU
// #region
/**
 * SKU
 */
export interface SKU {
  category3Id: number
  createTime?: string
  id?: number
  isSale: number
  price: number
  skuAttrValueList: SKUAttrs
  skuDefaultImg: string
  skuDesc: string
  skuImageList?: SKUImages
  skuName: string
  skuSaleAttrValueList: SKUSaleAttrs
  spuId: number
  tmId: number
  updateTime?: string
  weight: string
}
/**
 * SKU数组
 */
export type SKUs = SKU[]
/**
 * 保存SKU接口
 */
export interface SaveSKUResponseData extends ResponseData {
  data: null
}
/**
 * 根据SPUid获取SKU接口
 */
export interface GetSKUBySPUIdResponseData extends ResponseData {
  data: SKUs
}
/**
 * SKU分页
 */
export interface SKUPage extends Page {
  records: SKUs
}
/**
 * 分页获取SKU接口
 */
export interface GetSKUResponseData extends ResponseData {
  data: SKUPage
}
/**
 * SKU上/下架接口
 */
export interface SaleOrUnsaleSKUResponseData extends ResponseData {
  data: null
}
/**
 * 获取SKU详情接口
 */
export interface GetSKUInfoResponseData extends ResponseData {
  data: SKU
}
/**
 * 删除SKU接口
 */
export interface DeleteSKUResponseData extends ResponseData {
  data: null
}
// #endregion
