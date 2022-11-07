import request from '@/utils/request'

// 注册用户
export const registerUser = function (phone, password, code) {
  return request.post('/user/passport/register/', { phone, password, code })
}
