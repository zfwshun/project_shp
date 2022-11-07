import request from '@/utils/request'

// 退出登录
export const logout = function () {
  return request.get('/user/passport/logout')
}
