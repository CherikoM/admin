/**
 * 自定义插件，用于注册全局组件
 */
import { App } from 'vue'

import SvgIcon from '@/components/SvgIcon/index.vue'
import ElImg from '@/components/ElImg/index.vue'
import Category from '@/components/Category/index.vue'
import ElPagination from '@/components/ElPagination/index.vue'
import KeywordSearch from '@/components/KeywordSearch/index.vue'
import Block from '@/components/Block/index.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import isValidKey from '@/utils/isValidKey'

const allGlobalComponent = {
  SvgIcon,
  ElImg,
  Category,
  ElPagination,
  KeywordSearch,
  Block,
}

export default {
  install(app: App) {
    // 注册所有自定义全局组件
    for (let key in allGlobalComponent) {
      if (isValidKey(key, allGlobalComponent)) {
        app.component(key, allGlobalComponent[key])
      }
    }
    // 注册所有Element+图标
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
