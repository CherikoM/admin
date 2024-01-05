import { createApp } from 'vue'
import '@/styles/index.scss'
import App from '@/App.vue'

// vue-router
import router from '@/router'
import '@/router/permission'

// pinia
import pinia from '@/store'

// element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// @ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/theme-chalk/dark/css-vars.css'

// vite-svg
import 'virtual:svg-icons-register'

// 自定义插件，用于注册全局组件
import globalComponent from '@/components'
// 自定义组件，用于操作鉴权
import vPerm from './directive/vPerm'

const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(ElementPlus, {
  locale: zhCn,
})
app.use(globalComponent)
vPerm(app)

app.mount('#app')
