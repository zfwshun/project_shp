import request from '@/utils/request'
// 获取商品分类信息
export const getBaseCategoryList = function () {
  return request.get('/product/getBaseCategoryList')
}
