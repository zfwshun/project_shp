import { getCode } from '@/api/getCode'
import { registerUser } from '@/api/registerUser'
import { login } from '@/api/login'
import { logout } from '@/api/logout'
import { getUserInfo } from '@/api/getUserInfo'
import { getToken, removeToken, tokenAbout } from '@/utils/tokenAbout'

const state = {
  correctCode: '',
  token: getToken(),
  userInfo: {}
}
const getters = {}
const actions = {
  async getCode (context, phone) {
    const res = await getCode(phone)
    console.log(res)
    if (res.code === 200) {
      context.commit('GETCODE', res.data)
      return 'ok'
    } else return Promise.reject(new Error('faile'))
  },
  async registerUser (context, { phone, password, code }) {
    const res = await registerUser(phone, password, code)
    console.log(res)
    if (res.code === 200) return 'ok'
    else return Promise.reject(new Error('faile'))
  },
  async login (context, data) {
    const res = await login(data)
    if (res.code === 200) {
      context.commit('LOGIN', res.data.token)
      // 持久化存储token
      tokenAbout(res.data.token)
      return 'ok'
    } else return Promise.reject(new Error('faile'))
  },
  async getUserInfo (context) {
    const res = await getUserInfo()
    if (res.code === 200) {
      context.commit('GETUSERINFO', res.data)
      return 'ok'
    } else return Promise.reject(new Error('faile'))
  },
  async logout ({ commit }) {
    const res = await logout()
    if (res.code === 200) {
      commit('CLEARUSERINFO')
      return 'ok'
    } else return Promise.reject(new Error('faile'))
  }
}
const mutations = {
  GETCODE (state, val) {
    state.correctCode = val
  },
  LOGIN (state, val) {
    state.token = val
  },
  GETUSERINFO (state, val) {
    state.userInfo = val
  },
  CLEARUSERINFO (state) {
    state.token = ''
    state.userInfo = {}
    removeToken()
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
