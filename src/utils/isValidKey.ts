/**
 * 判断一个值是否为对象的key
 * @param key
 * @param object
 * @returns
 */
export default function (
  key: string | number | symbol,
  object: object,
): key is keyof typeof object {
  return key in object
}
