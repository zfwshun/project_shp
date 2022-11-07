import request from '@/utils/request'
// 改变购物车中商品选中状态
export const changeChecked = function (skuId, isChecked) {
  return request.get(`/cart/checkCart/${skuId}/${isChecked}`)
}
