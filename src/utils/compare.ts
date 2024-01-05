/**
 * 判断两个值是否在值上相同，也可判断引用类型
 * @param a 值a
 * @param b 值b
 * @attrs 指定需要比较的属性，若不填写则比较全部属性，对非对象比较而言此值无意义
 */
export const compare = (a: any, b: any, attrs?: string | string[]) => {
  if (a === b) {
    // 基本类型，且相等
    return true
  } else if (Array.isArray(a) && Array.isArray(b)) {
    // 数组类型
    if (a.length !== b.length) {
      return false
    } else {
      for (let i = 0; i < a.length; i++) {
        if (!compare(a[i], b[i])) return false
      }
      return true
    }
  } else if (
    Object.prototype.toString.call(a) === '[object Object]' &&
    Object.prototype.toString.call(b) === '[object Object]'
  ) {
    // 对象类型
    let at: string[]
    if (typeof attrs === 'string' && attrs !== '') at = [attrs]
    else if (!attrs) {
      const keys1 = Object.keys(a)
      const keys2 = Object.keys(b)
      at = [...new Set([...keys1, ...keys2])]
    } else at = attrs
    for (let key of at) {
      if (!compare(a[key], b[key])) return false
    }
    return true
  } else {
    // 其他
    return false
  }
}

/**
 * 比较对象数组的部分属性值
 * @param a
 * @param b
 * @param options
 */
export const compareObjArr = (a: any[], b: any[], attrs: string | string[]) => {
  if (a.length !== b.length) {
    return false
  } else {
    let attr = typeof attrs === 'string' ? [attrs] : attrs
    for (let i = 0; i < a.length; i++) {
      for (let at of attr) {
        if (!compare(a[i][at], b[i][at], attrs)) return false
      }
    }
    return true
  }
}
