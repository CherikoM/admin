import { App, DirectiveBinding } from 'vue'
import useUserStore from '@/store/modules/user'

export default (app: App) => {
  app.directive('perm', {
    mounted(el: HTMLElement, options: DirectiveBinding) {
      const userStore = useUserStore()
      if (!userStore.buttons.includes(options.value)) {
        el.parentElement?.removeChild(el)
      }
    },
  })
}
