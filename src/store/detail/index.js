import { getGoodsInfo } from '@/api/getGoodsInfo'
import { addOrUpdateShopCar } from '@/api/addOrUpdateShopCar'

const state = {
  goodsInfo: {}
}
const getters = {
  categoryView (state) {
    return state.goodsInfo.categoryView || {}
  },
  skuInfo (state) {
    return state.goodsInfo.skuInfo || {}
  },
  spuSaleAttrList (state) {
    return state.goodsInfo.spuSaleAttrList || []
  }
}
const actions = {
  // 获取商品详细信息
  async getGoodsInfo (context, val) {
    const { data: res } = await getGoodsInfo(val)
    context.commit('GETGOODSINFO', res)
  },
  async addShopCar (context, { skuId, skuNum }) {
    const res = await addOrUpdateShopCar(skuId, skuNum)
    if (res.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  }
}
const mutations = {
  GETGOODSINFO (state, val) {
    state.goodsInfo = val
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
