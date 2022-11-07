import { getBaseCategoryList } from '@/api/getBaseCategoryList'
import { getBannerList } from '@/api/getBannerList'
import { getFloorList } from '@/api/getFloorList'

const state = {
  categoryList: [],
  bannerList: [],
  floorList: []
}
const getters = {}
const actions = {
  async categoryList (context) {
    const { data: res } = await getBaseCategoryList()
    context.commit('CATEGORYLIST', res)
  },
  async bannerList (context) {
    const { data: res } = await getBannerList()
    context.commit('BANNERLIST', res)
  },
  async floorList (context) {
    const { data: res } = await getFloorList()
    context.commit('FLOORLIST', res)
  }
}
const mutations = {
  CATEGORYLIST (state, val) {
    val.splice(15, 2)
    state.categoryList = val
    // console.log(val)
  },
  BANNERLIST (state, val) {
    state.bannerList = val
    // console.log(val)
  },
  FLOORLIST (state, val) {
    state.floorList = val
    // console.log(val)
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
