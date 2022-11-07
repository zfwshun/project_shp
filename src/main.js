import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import './mock/mockServe'
import 'swiper/css/swiper.min.css'
import Pagination from '@/components/Pagination'
import { MessageBox } from 'element-ui'
import VueLazyload from 'vue-lazyload'
import atm from '@/assets/1.gif'
import '@/piugins/validate'
Vue.config.productionTip = false

Vue.component('TypeNav', TypeNav)
Vue.component('Carousel', Carousel)
Vue.component('Pagination', Pagination)
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.use(VueLazyload, {
  loading: atm
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
