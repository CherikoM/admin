/**
 * 用户接口
 */
import request from '@/utils/request'
import {
  SKU,
  SaveSKUResponseData,
  GetSKUBySPUIdResponseData,
  GetSKUResponseData,
  SaleOrUnsaleSKUResponseData,
  GetSKUInfoResponseData,
  DeleteSKUResponseData,
} from '@/api/product/sku/type.ts'

enum API {
  // 提交SKU
  SAVE_SKU_URL = '/admin/product/saveSkuInfo',
  // 更新SKU
  UPDATE_SKU_URL = '/admin/product/updateSkuInfo',
  // 根据SPUid获取SKU
  GET_SKU_BY_SPU_ID_URL = '/admin/product/findBySpuId/',
  // 分页获取SKU
  GET_SKU_URL = '/admin/product/list/',
  // 上架SKU
  SALE_SKU_URL = '/admin/product/onSale/',
  // 下架SKU
  UNSALE_SKU_URL = '/admin/product/cancelSale/',
  // 获取SKU详情
  GET_SKU_INFO_URL = '/admin/product/getSkuInfo/',
  // 删除SKU
  DELETE_SKU_URL = '/admin/product/deleteSku/',
}

/**
 * 保存SKU
 * @param data
 * @returns
 */
export const reqSaveOrUpdateSku = (data: SKU) =>
  request.post<any, SaveSKUResponseData>(
    data.id ? API.UPDATE_SKU_URL : API.SAVE_SKU_URL,
    data,
  )

/**
 * 根据SPUid获取SKU
 * @param SPUid
 * @returns
 */
export const reqGetSkuBySpuId = (SPUid: number) =>
  request.get<any, GetSKUBySPUIdResponseData>(API.GET_SKU_BY_SPU_ID_URL + SPUid)

/**
 * 分页获取SKU
 * @param SPUid
 * @returns
 */
export const reqGetSku = (pageNum: number, pageSize: number) =>
  request.get<any, GetSKUResponseData>(
    API.GET_SKU_URL + `${pageNum}/${pageSize}`,
  )

/**
 * SKU上/下架
 */
export const reqSaleOrUnsale = (sku: SKU) =>
  request.get<any, SaleOrUnsaleSKUResponseData>(
    (sku.isSale ? API.UNSALE_SKU_URL : API.SALE_SKU_URL) + sku.id,
  )

/**
 * 根据SPUid获取SKU详情
 * @param SKUid
 * @returns
 */
export const reqGetSkuInfo = (SKUid: number) =>
  request.get<any, GetSKUInfoResponseData>(API.GET_SKU_INFO_URL + SKUid)

/**
 * 删除SKU
 * @param SKUid
 * @returns
 */
export const reqDeleteSku = (SKUid: number) =>
  request.delete<any, DeleteSKUResponseData>(API.DELETE_SKU_URL + SKUid)
