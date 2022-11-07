// vee-validate表单验证
import Vue from 'vue'
import VeeValidate from 'vee-validate'
import zh from 'vee-validate/dist/locale/zh_CN'
Vue.use(VeeValidate)
VeeValidate.Validator.localize('zh_CN', {
  messages: {
    ...zh.messages,
    is: (filed) => `${filed}必须与密码相同`,
    attributes: {
      phone: '手机号',
      code: '验证码',
      password: '密码',
      confirmPass: '确认密码',
      agree: '协议'
    }
  }
})

// 自定义规则
VeeValidate.Validator.extend('agree', {
  validate: value => value,
  getMessage: filed => filed + '必须同意'
})
