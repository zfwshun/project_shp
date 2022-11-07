import request from '@/utils/request'

// 携带token向服务器发送请求获取用户信息
export const getUserInfo = function () {
  return request.get('/user/passport/auth/getUserInfo')
}
