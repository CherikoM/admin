/**
 * 接口
 */
export interface ResponseData {
  code: number
  message: string
}
/**
 * 上传文件接口
 */
export interface ReqFileUploadResponseData extends ResponseData {
  data: string
}
/**
 * 分页
 */
export interface Page {
  total: number
  size: number
  current: number
  orders: any[]
  optimizeCountSql: boolean
  hitCount: boolean
  countId: null
  maxLimit: null
  searchCount: boolean
  pages: number
}
