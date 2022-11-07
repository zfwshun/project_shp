import request from '@/utils/request'

// 获取我的订单列表
export const getMyOrderList = function (page, limit) {
  return request.get(`/order/auth/${page}/${limit}`)
}
