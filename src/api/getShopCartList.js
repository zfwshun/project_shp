import request from '@/utils/request'
// 获取购物车列表
export const getShopCartList = function () {
  return request.get('/cart/cartList')
}
