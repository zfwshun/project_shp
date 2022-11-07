import { getAddress } from '@/api/getAddress'
import { getGoodsListInfo } from '@/api/getGoodsListInfo'
import { submitOrder } from '@/api/submitOrder'
import { getOrderPayInfo } from '@/api/getOrderPayInfo'
import { getOrderPayStatus } from '@/api/getOrderPayStatus'
import { getMyOrderList } from '@/api/getMyOrderList'

const state = {
  address: {},
  // 结算页内商品信息
  goodsListInfo: {},
  orderId: '',
  orderPayInfo: {},
  payStatus: '',
  // 我的订单页内的订单列表
  orderListInfo: {}
}
const getters = {
  detailArrayList (state) {
    return state.goodsListInfo.detailArrayList || []
  }
}
const actions = {
  async getAddress (context) {
    const res = await getAddress()
    if (res.code === 200) {
      context.commit('GETADDRESS', res.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  async getGoodsListInfo (context) {
    const res = await getGoodsListInfo()
    if (res.code === 200) {
      context.commit('GETGOODSLISTINFO', res.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  async submitOrder (context, { tradeNo, data }) {
    const res = await submitOrder(tradeNo, data)
    if (res.code === 200) {
      context.commit('SUBMITORDER', res.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  async getOrderPayInfo (context, orderId) {
    const res = await getOrderPayInfo(orderId)
    if (res.code === 200) {
      context.commit('GETORDERPAYINFO', res.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  async getOrderPayStatus (context, orderId) {
    const res = await getOrderPayStatus(orderId)
    console.log(res)
    context.commit('GETORDERPAYSTATUS', res.code)
  },
  async getMyOrderList (context, { page, limit }) {
    const res = await getMyOrderList(page, limit)
    console.log(res)
    if (res.code === 200) {
      context.commit('GETMYORDERLIST', res.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  }
}
const mutations = {
  GETADDRESS (state, val) {
    state.address = val
  },
  GETGOODSLISTINFO (state, val) {
    state.goodsListInfo = val
  },
  SUBMITORDER (state, val) {
    state.orderId = val
  },
  GETORDERPAYINFO (state, val) {
    state.orderPayInfo = val
  },
  GETORDERPAYSTATUS (state, val) {
    state.payStatus = val
  },
  GETMYORDERLIST (state, val) {
    state.orderListInfo = val
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
