import request from '@/utils/request'

// 获取商品细节信息
export const getGoodsInfo = function (skuId) {
  return request.get(`/item/${skuId}`)
}
