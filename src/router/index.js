import Vue from 'vue'
import VueRouter from 'vue-router'
import Search from '@/views/Search'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Detail from '@/views/Detail/index'
import AddCartSuccess from '@/views/AddCartSuccess'
import ShopCart from '@/views/ShopCart'
import store from '@/store'
import Trade from '@/views/Trade'
import Pay from '@/views/Pay'
import PaySuccess from '@/views/PaySuccess'
import Center from '@/views/Center'
import MyOrder from '@/views/Center/MyOrder'
import GroupOrder from '@/views/Center/GroupOrder'
// 先将VueRouter原型对象上的push方法保存一份
const originPush = VueRouter.prototype.push

// 重写push方法
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(this, location, () => {}, () => {})
  }
}
Vue.use(VueRouter)

const routes = [
  { path: '/home', component: () => import('@/views/Home'), meta: { isFooterShow: true } },
  {
    path: '/paysuccess',
    component: PaySuccess,
    meta: { isFooterShow: true },
    beforeEnter: (to, from, next) => {
      console.log(from.path)
      if (from.path === '/pay') {
        next()
      } else {
        next(from.path)
      }
    }
  },
  {
    path: '/center',
    component: Center,
    meta: { isFooterShow: true },
    // redirect: '/center/myorder',
    children: [
      { path: '/', component: MyOrder },
      // { path: 'myorder', component: MyOrder },
      { path: 'grouporder', component: GroupOrder }
    ]
  },
  {
    path: '/trade',
    component: Trade,
    meta: { isFooterShow: true },
    beforeEnter: (to, from, next) => {
      console.log(from.path)
      if (from.path === '/shopcart') {
        next()
      } else {
        next(from.path)
      }
    }
  },
  {
    path: '/pay',
    component: Pay,
    meta: { isFooterShow: true },
    beforeEnter: (to, from, next) => {
      console.log(from)
      if (from.path === '/trade') {
        next()
      } else {
        next(from.path)
      }
    }
  },
  { path: '/addcartsuccess', component: AddCartSuccess, meta: { isFooterShow: true } },
  { path: '/shopcart', component: ShopCart, meta: { isFooterShow: true } },
  { path: '/detail/:skuId', component: Detail, meta: { isFooterShow: true } },
  {
    name: 'search',
    path: '/search/:keyword?',
    component: Search,
    meta: { isFooterShow: true }
    // props: true
    // props ($route) {
    //   return {
    //     keyword: $route.params.keyword
    //   }
    // }
    // 连续结构赋值，用props接收传过来的参数
    // props ({ params: { keyword } }) {
    //   return {
    //     keyword: keyword
    //   }
    // }
  },
  { path: '/login', component: Login, meta: { isFooterShow: false } },
  { path: '/register', component: Register, meta: { isFooterShow: false } },
  { path: '/', redirect: '/home' }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  // 让路由跳转后页面到最顶端
  scrollBehavior () {
    return { y: 0 }
  }
})
// 全局前置守卫
router.beforeEach(async function (to, from, next) {
  const token = store.state.user.token
  const name = store.state.user.userInfo.name
  if (token) { // 如果有token
    if (to.path === '/login') { // 就不能去登陆页面，返回主页
      next('/home')
    } else { // 不是去登陆页
      if (name) { // 如果登陆了
        next() // 就放行
      } else { // 没有登陆，或者刷新页面，用户信息消失
        try {
          // 重新获取用户信息
          await store.dispatch('user/getUserInfo')
          next()
        } catch (e) {
          // token失效
          await store.dispatch('user/logout')
          next('/login')
        }
      }
    }
  } else {
    const arr = ['/trade', '/pay', '/paysuccess', '/center']
    if (arr.indexOf(to.path) !== -1) {
      // 将要去的路径存储在路径中
      next('/login?redirect=' + to.path)
    } else {
      next()
    }
  }
})
export default router
