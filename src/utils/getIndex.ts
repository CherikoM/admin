/**
 * 获取列表项确切序号
 * @param index 该项在数据列表内的坐标
 */
export default (pageNo: number, pageSize: number) => {
  return (index: number) => {
    return (pageNo - 1) * pageSize + index + 1
  }
}
