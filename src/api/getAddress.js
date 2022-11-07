import request from '@/utils/request'

// 获取用户地址
export const getAddress = function () {
  return request.get('user/userAddress/auth/findUserAddressList')
}
