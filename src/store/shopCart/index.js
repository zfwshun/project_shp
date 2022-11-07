import { getShopCartList } from '@/api/getShopCartList'
import { getUUID } from '@/utils/uuid_token'
import { deleteCart } from '@/api/deleteCart'
import { changeChecked } from '@/api/changeChecked'

const state = {
  cart: [],
  uuid_token: getUUID()
}
const getters = {
  cartList (state) {
    return state.cart[0] || {}
  }
}
const actions = {
  async getShopCartList ({ commit }) {
    const res = await getShopCartList()
    commit('GETSHOPCARTLIST', res.data)
  },
  async deleteCartBySkuId ({ commit }, skuId) {
    const res = await deleteCart(skuId)
    if (res.code === 200) return 'ok'
    else return Promise.reject(new Error('faile'))
  },
  async changeChecked ({ commit }, { skuId, isChecked }) {
    const res = await changeChecked(skuId, isChecked)
    if (res.code === 200) return 'ok'
    else return Promise.reject(new Error('faile'))
  },
  async updateAllChecked (context, allChecked) {
    const promiseAll = []
    context.getters.cartList.cartInfoList.forEach(item => {
      if (item.isChecked !== allChecked) {
        console.log(allChecked, item.isChecked)
        promiseAll.push(context.dispatch('changeChecked', { skuId: item.skuId, isChecked: allChecked ? '1' : '0' }))
      }
    })
    return Promise.all(promiseAll)
  }
}
const mutations = {
  GETSHOPCARTLIST (state, val) {
    state.cart = val
    console.log(state.cart)
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
