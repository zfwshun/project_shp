import request from '@/utils/request'
// 获取搜索信息
export const getSearchInfo = function (data) {
  return request.post('/list', data)
}
