import axios from 'axios'
// 进度条引入
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store/index.js'

// axios二次封装
const request = axios.create({
  baseURL: 'http://gmall-h5-api.atguigu.cn/api',
  timeout: 5000
})

// 请求拦截器，在请求发送之前，请求拦截器可以检测到，可以在发请求之前做一些事情
request.interceptors.request.use((config) => {
  // 在请求头中添加uuid
  if (store.state.shopCart.uuid_token) {
    config.headers.userTempId = store.state.shopCart.uuid_token
  }
  // 在请求头中添加token
  if (store.state.user.token) {
    config.headers.token = store.state.user.token
  }
  // 发送请求前开启进度条
  nprogress.start()
  // 配置对象congig
  return config
})

// 响应拦截器
request.interceptors.response.use((res) => {
  // 配置对象congig,成功的响应函数
  nprogress.done()
  // 响应成功后关闭进度条
  return res.data
}, () => {
  // 失败的回调函数
  return Promise.reject(new Error('faile'))
})
export default request
