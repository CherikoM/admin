import { defineStore } from 'pinia'

import { reqGetAllTrademark } from '@/api/product/trademark'
import { reqGetSpuAllAttrs } from '@/api/product/spu'
import { productState } from '@/store/type'

const useProductStore = defineStore('Product', {
  state: (): productState => {
    return {
      trademark: {
        pageNo: 1,
        pageSize: 3,
        allTrademark: [],
      },
      attr: {
        select: [],
      },
      spu: {
        select: [],
        pageNo: 1,
        pageSize: 3,
        allSPUAttr: [],
      },
      sku: {
        pageNo: 1,
        pageSize: 10,
      },
    }
  },
  actions: {
    async getAllTrademark() {
      if (
        !this.trademark.allTrademark ||
        this.trademark.allTrademark.length <= 0
      ) {
        const result = await reqGetAllTrademark()
        if (result.code === 200) {
          this.trademark.allTrademark = result.data
        } else {
          throw result.message
        }
      }
      return this.trademark.allTrademark
    },
    async getSpuAllAttrs() {
      if (!this.spu.allSPUAttr || this.spu.allSPUAttr.length <= 0) {
        const result = await reqGetSpuAllAttrs()
        if (result.code === 200) {
          this.spu.allSPUAttr = result.data
        } else {
          throw result.message
        }
      }
      return this.spu.allSPUAttr
    },
  },
})

export default useProductStore
