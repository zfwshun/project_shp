import { getSearchInfo } from '@/api/getSearchInfo'

const state = {
  searchInfo: {},
  total: 0
}
const getters = {
  goodsList (state) {
    return state.searchInfo.goodsList || []
  },
  trademarkList (state) {
    return state.searchInfo.trademarkList || []
  },
  attrsList (state) {
    return state.searchInfo.attrsList || []
  }
}
const actions = {
  async getSearchList ({ commit }, val = {}) {
    const { data: res } = await getSearchInfo(val)
    commit('GETSEARCHLIST', res)
  }
}
const mutations = {
  GETSEARCHLIST (state, val) {
    state.searchInfo = val
    state.total = val.total
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
