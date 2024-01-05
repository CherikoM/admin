import { defineStore } from 'pinia'

import sleep from '@/utils/sleep'

const useSettingStore = defineStore('Setting', {
  state: () => {
    return {
      // 是否折叠菜单
      menuFold: false,
      // 是否正在刷新
      refreshing: false,
      // 是否正在加载
      loading: false,
    }
  },
  actions: {
    async refresh() {
      this.refreshing = true
      await sleep(500)
      this.refreshing = false
    },
    async load(cb?: Function) {
      this.loading = true
      cb ? await cb() : ''
      await sleep(500)
      this.loading = false
    },
  },
})

export default useSettingStore
