import { RouteRecordRaw } from 'vue-router'

import { User } from '@/api/user/type'
import { Trademarks } from '@/api/product/trademark/type'
import { SPUAllAttrs } from '@/api/product/spu/type'

// 仓库的数据类型

export interface UserState {
  token: string | null
  menuRoute: RouteRecordRaw[]
  userInfo: User
}

export interface productState {
  trademark: {
    pageNo: number
    pageSize: number
    allTrademark: Trademarks
  }
  attr: {
    select: number[]
  }
  spu: {
    select: number[]
    pageNo: number
    pageSize: number
    allSPUAttr: SPUAllAttrs
  }
  sku: {
    pageNo: number
    pageSize: number
  }
}

export interface aclState {
  user: {
    pageNo: number
    pageSize: number
  }
  role: {
    pageNo: number
    pageSize: number
  }
}
