<template>
  <div class="home-container">
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="item in floorList" :key="item.id" :floorList="item"></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from '@/components/ListContainer'
import Recommend from '@/components/Recommend'
import Rank from '@/components/Rank'
import Like from '@/components/Like'
import Floor from '@/components/Floor'
import Brand from '@/components/Brand'
import { mapState } from 'vuex'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Home',
  components: { Brand, Floor, Like, Rank, Recommend, ListContainer },
  computed: {
    ...mapState('home', ['floorList'])
  },
  created () {
    this.$store.dispatch('home/floorList')
  }
}
</script>

<style scoped>

</style>
