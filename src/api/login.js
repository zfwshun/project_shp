import request from '@/utils/request'

// 登录
export const login = function (data) {
  return request.post('user/passport/login', data)
}
