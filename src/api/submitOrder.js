import request from '@/utils/request'

// 提交订单
export const submitOrder = function (tradeNo, data) {
  return request.post(`/order/auth/submitOrder?tradeNo=${tradeNo}`, data)
}
