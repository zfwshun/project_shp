import request from '@/utils/request'

// 获取订单支付信息
export const getOrderPayInfo = function (orderId) {
  return request.get(`/payment/weixin/createNative/${orderId}`)
}
