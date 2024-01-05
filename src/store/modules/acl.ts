import { defineStore } from 'pinia'

import { aclState } from '@/store/type'

const useAclStore = defineStore('Acl', {
  state: (): aclState => {
    return {
      user: {
        pageNo: 1,
        pageSize: 5,
      },
      role: {
        pageNo: 1,
        pageSize: 5,
      },
    }
  },
  actions: {},
  getters: {},
})

export default useAclStore
