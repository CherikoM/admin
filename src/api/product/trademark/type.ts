import { ResponseData, Page } from '@/api/type'

// 品牌
// #region
/**
 * 品牌
 */
export interface Trademark {
  id?: number
  createTime?: string
  updateTime?: string
  tmName: string
  logoUrl: string
}
/**
 * 品牌数组
 */
export type Trademarks = Trademark[]
/**
 * 品牌分页
 */
export interface TrademarkPage extends Page {
  records: Trademarks
}
/**
 * 获取品牌接口
 */
export interface GetTrademarksResponseData extends ResponseData {
  data: TrademarkPage
}
/**
 * 获取所有品牌接口
 */
export interface GetAllTrademarksResponseData extends ResponseData {
  data: Trademarks
}
/**
 * 添加/修改品牌接口
 */
export interface UpdateTrademarkResponseData extends ResponseData {
  data: string | string
}
/**
 * 删除品牌接口
 */
export interface DeleteTrademarkResponseData extends ResponseData {
  data: null | string
}
// #endregion
