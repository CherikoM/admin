/**
 * SPU接口
 */
import request from '@/utils/request'
import {
  SPU,
  GetSPUsResponseData,
  SPUImagesResponseData,
  SPUAttrsResponseData,
  SPUAllAttrsResponseData,
  GetSPUInfoResponseData,
  SaveOrUpdateSPUResponseData,
  DeleteSPUResponseData,
} from '@/api/product/spu/type.ts'

enum API {
  // 获取SPU
  GET_SPUS_URL = '/admin/product/',
  // 获取SPU图片列表
  GET_SPU_IMAGES_URL = '/admin/product/spuImageList/',
  // 获取SPU已选属性列表
  GET_SPU_ATTRS_URL = '/admin/product/spuSaleAttrList/',
  // 获取SPU所有销售属性
  GET_SPU_ALL_ATTRS_URL = '/admin/product/baseSaleAttrList',
  // 获取SPU详情
  GET_SPU_INFO_URL = '/admin/product/getSpuInfo/',
  // 添加SPU
  SAVE_SPU_URL = '/admin/product/saveSpuInfo',
  // 修改SPU
  UPDATE_SPU_URL = '/admin/product/updateSpuInfo',
  // 删除SPU
  DELETE_SPU_URL = '/admin/product/deleteSpu/',
}

/**
 * 获取SPU
 * @param page 页码
 * @param limit 每页大小
 * @param category3Id 三级分类id
 * @returns
 */
export const reqGetSpus = (page: number, limit: number, category3Id: number) =>
  request.get<any, GetSPUsResponseData>(
    API.GET_SPUS_URL + `${page}/${limit}?category3Id=${category3Id}`,
  )

/**
 * 获取SPU图片列表
 * @param spuId SPUid
 * @returns
 */
export const reqGetSpuImages = (spuId: number) =>
  request.get<any, SPUImagesResponseData>(API.GET_SPU_IMAGES_URL + spuId)

/**
 * 获取SPU已选属性列表
 * @param spuId SPUid
 * @returns
 */
export const reqGetSpuAttrs = (spuId: number) =>
  request.get<any, SPUAttrsResponseData>(API.GET_SPU_ATTRS_URL + spuId)

/**
 * 获取SPU所有属性列表
 * @returns
 */
export const reqGetSpuAllAttrs = () =>
  request.get<any, SPUAllAttrsResponseData>(API.GET_SPU_ALL_ATTRS_URL)

/**
 * 获取SPU详情
 * @param spuId SPUid
 * @returns
 */
export const reqGetSpuInfo = (spuId: number) =>
  request.get<any, GetSPUInfoResponseData>(API.GET_SPU_INFO_URL + spuId)

/**
 * 添加或修改SPU
 * @param data
 */
export const reqSaveOrUpdateSpu = (data: SPU) =>
  request.post<any, SaveOrUpdateSPUResponseData>(
    data.id ? API.UPDATE_SPU_URL : API.SAVE_SPU_URL,
    data,
  )

/**
 * 删除SPU
 * @param SPUid
 */
export const reqDeleteSpu = (SPUid: number) =>
  request.delete<any, DeleteSPUResponseData>(API.DELETE_SPU_URL + SPUid)
