import request from '@/utils/request'

// 查询订单支付状态
export const getOrderPayStatus = function (orderId) {
  return request.get(`/payment/weixin/queryPayStatus/${orderId}`)
}
