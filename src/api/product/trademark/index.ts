/**
 * 用户接口
 */
import request from '@/utils/request'
import {
  Trademark,
  GetTrademarksResponseData,
  GetAllTrademarksResponseData,
  UpdateTrademarkResponseData,
  DeleteTrademarkResponseData,
} from '@/api/product/trademark/type.ts'

enum API {
  // 获取品牌
  GET_TRADEMARKS_URL = '/admin/product/baseTrademark/',
  // 获取所有品牌
  GET_ALL_TRADEMARKS_URL = '/admin/product/baseTrademark/getTrademarkList',
  // 添加品牌
  SAVE_TRADEMARK_URL = '/admin/product/baseTrademark/save/',
  // 修改品牌
  UPDATE_TRADEMARK_URL = '/admin/product/baseTrademark/update',
  // 删除品牌
  DELETE_TRADEMARK_URL = '/admin/product/baseTrademark/remove/',
}

/**
 * 获取品牌
 * @param page 页码
 * @param limit 每页大小
 * @returns
 */
export const reqGetTrademark = (page: number, limit: number) =>
  request.get<any, GetTrademarksResponseData>(
    API.GET_TRADEMARKS_URL + `${page}/${limit}`,
  )

/**
 * 获取全部品牌
 * @returns
 */
export const reqGetAllTrademark = () =>
  request.get<any, GetAllTrademarksResponseData>(API.GET_ALL_TRADEMARKS_URL)

/**
 * 添加/修改品牌
 * @param data
 * @returns
 */
export const reqSaveTrademark = (data: Trademark) => {
  return data.id
    ? request.put<any, UpdateTrademarkResponseData>(
        API.UPDATE_TRADEMARK_URL,
        data,
      )
    : request.post<any, UpdateTrademarkResponseData>(
        API.SAVE_TRADEMARK_URL,
        data,
      )
}

/**
 * 删除品牌
 * @param page 页码
 * @param limit 每页大小
 * @returns
 */
export const reqDeleteTrademark = (id: number) =>
  request.delete<any, DeleteTrademarkResponseData>(
    API.DELETE_TRADEMARK_URL + `${id}`,
  )
