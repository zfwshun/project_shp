import request from '@/utils/request'
// 向购物车中添加商品或者在购物车中修改商品数量
export const addOrUpdateShopCar = function (skuId, skuNum) {
  return request.post(`/cart/addToCart/${skuId}/${skuNum}`)
}
