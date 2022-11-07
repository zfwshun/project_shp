<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.isFooterShow"></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
export default {
  components: { Footer, Header },
  created () {
    this.$store.dispatch('home/categoryList')
  }
}
</script>

<style>

</style>
