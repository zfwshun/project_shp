import request from '@/utils/request'
// 删除购物车中的商品
export const deleteCart = function (skuId) {
  return request.delete(`/cart/deleteCart/${skuId}`)
}
