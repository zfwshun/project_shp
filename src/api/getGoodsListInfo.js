import request from '@/utils/request'

// 获取订单交易页信息
export const getGoodsListInfo = function () {
  return request.get('/order/auth/trade')
}
