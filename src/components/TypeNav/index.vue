<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
<!--      事件委托-->
      <div @mouseleave="changeIndex2" @mouseenter="showNav">
        <h2 class="all">全部商品分类</h2>
<!--        过渡动画-->
<!--        <transition name="sort">-->
          <div class="sort"  v-show="flag">
            <div class="all-sort-list2" @click="goSearch">
              <div class="item" v-for="(item1,index) in categoryList" :key="item1.categoryId" :class="{cur: currentIndex===index}">
                <h3 @mouseenter="changeIndex(index)">
                  <a href="javascript:;" :data-categoryName="item1.categoryName" :data-category1Id="item1.categoryId">{{ item1.categoryName }}</a>
                </h3>
                <div class="item-list clearfix" :style="{'display': currentIndex===index?'block':'none' }">
                  <div class="subitem">
                    <dl class="fore" v-for="item2 in item1.categoryChild" :key="item2.categoryId">
                      <dt>
                        <a href="javascript:;" :data-categoryName="item2.categoryName" :data-category2Id="item2.categoryId">{{ item2.categoryName }}</a>
                      </dt>
                      <dd>
                        <em v-for="item3 in item2.categoryChild" :key="item3.categoryId">
                          <a href="javascript:;" :data-categoryName="item3.categoryName" :data-category3Id="item3.categoryId">{{ item3.categoryName }}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
<!--        </transition>-->
      </div>
      <nav class="nav">
        <a href="javascript:;">服装城</a>
        <a href="javascript:;">美妆馆</a>
        <a href="javascript:;">尚品汇超市</a>
        <a href="javascript:;">全球购</a>
        <a href="javascript:;">闪购</a>
        <a href="javascript:;">团购</a>
        <a href="javascript:;">有趣</a>
        <a href="javascript:;">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import throttle from 'lodash/throttle'
export default {
  name: 'TypeNav',
  data () {
    return {
      currentIndex: -1,
      flag: false
    }
  },
  computed: {
    // categoryList () {
    //   return this.$store.state['home/categoryList']
    // }
    // 简写形式
    ...mapState('home', ['categoryList'])
  },
  methods: {
    // changeIndex (index) {
    //   this.currentIndex = index
    // },
    // 使用lodash的防抖
    changeIndex: throttle(function (index) {
      this.currentIndex = index
    }, 50),
    // 鼠标离开事件，隐藏TypeNav组件
    changeIndex2 () {
      this.currentIndex = -1
      const reg = /^\/search/
      const reg1 = /^\/detail/
      if (reg.test(this.$route.path) || reg1.test(this.$route.path)) { this.flag = false }
    },
    // 点击三级联动目录中的标签跳转到搜索页面
    goSearch (e) {
      const { categoryname, category1id, category2id, category3id } = e.target.dataset
      if (categoryname) {
        const location = { name: 'search' }
        const query = { categoryName: categoryname }
        if (category1id) {
          query.category1Id = category1id
        } else if (category2id) {
          query.category2Id = category2id
        } else {
          query.category3Id = category3id
        }
        location.query = query
        location.params = this.$route.params
        this.$router.push(location)
      }
    },
    // 显示TypeNav组件
    showNav () {
      const reg = /^\/search/
      const reg1 = /^\/detail/
      if (reg.test(this.$route.path) || reg1.test(this.$route.path)) { this.flag = true }
    }
  },
  mounted () {
    if (this.$route.path === '/home') { this.flag = true }
  }
}
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

.container {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  position: relative;

.all {
  width: 210px;
  height: 45px;
  background-color: #e1251b;
  line-height: 45px;
  text-align: center;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
}

.nav {
a {
  height: 45px;
  margin: 0 22px;
  line-height: 45px;
  font-size: 16px;
  color: #333;
}
}

.sort {
  position: absolute;
  left: 0;
  top: 45px;
  width: 210px;
  height: 461px;
  position: absolute;
  background: #fafafa;
  z-index: 999;

.all-sort-list2 {
.item {
h3 {
  line-height: 30px;
  font-size: 14px;
  font-weight: 400;
  overflow: hidden;
  padding: 0 20px;
  margin: 0;

a {
  color: #333;
}
}

.item-list {
  display: none;
  position: absolute;
  width: 734px;
  min-height: 460px;
  background: #f7f7f7;
  left: 210px;
  border: 1px solid #ddd;
  top: 0;
  z-index: 9999 !important;

.subitem {
  float: left;
  width: 650px;
  padding: 0 4px 0 8px;

dl {
  border-top: 1px solid #eee;
  padding: 6px 0;
  overflow: hidden;
  zoom: 1;

&.fore {
   border-top: 0;
 }

dt {
  float: left;
  width: 54px;
  line-height: 22px;
  text-align: right;
  padding: 3px 6px 0 0;
  font-weight: 700;
}

dd {
  float: left;
  width: 415px;
  padding: 3px 0 0;
  overflow: hidden;

em {
  float: left;
  height: 14px;
  line-height: 14px;
  padding: 0 8px;
  margin-top: 5px;
  border-left: 1px solid #ccc;
}
}
}
}
}

//&:hover {
//.item-list {
//  display: block;
//}
//}
}
  .cur {
    background-color: skyblue;
  }
}
}

//.sort-enter {
//height: 0px;
//}
//  .sort-enter-to {
//height: 461px;
//  }
//.sort-enter-active {
//  overflow: hidden;
//  transition: all 0.5s linear;
//}
}
}
</style>
