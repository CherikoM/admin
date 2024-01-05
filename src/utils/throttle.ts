/**
 * 节流函数
 */
export default (fn: Function, timeout: number = 500) => {
  let timer: undefined | number = undefined,
    last: number

  return function (this: any, ...args: any[]) {
    const now = +new Date()

    if (last && now < last + timeout) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        last = now
        fn.apply(this, args)
      }, timeout)
    } else {
      last = now
      fn.apply(this, args)
    }
  }
}
