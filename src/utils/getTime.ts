/**
 * 判断今日时间
 */
export default () => {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 8) {
    return '清晨'
  } else if (hour >= 8 && hour < 12) {
    return '上午'
  } else if (hour >= 12 && hour < 14) {
    return '中午'
  } else if (hour >= 14 && hour < 17) {
    return '下午'
  } else if (hour >= 17 && hour < 19) {
    return '傍晚'
  } else if (hour >= 19 && hour < 24) {
    return '晚上'
  } else {
    return '深夜'
  }
}
