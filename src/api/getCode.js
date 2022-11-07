import request from '@/utils/request'

// 获取验证码
export const getCode = function (phone) {
  return request.get(`/user/passport/sendCode/${phone}`)
}
