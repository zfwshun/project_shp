<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="item in cartInfoList" :key="item.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="item.isChecked" @change="changeGoodsChecked(item.skuId,$event)">
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl">
            <div class="item-msg">{{ item.skuName }}.00</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ item.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handler(0,-1,item)">-</a>
            <input autocomplete="off" type="text" :value="item.skuNum" minnum="1" class="itxt" @change="handler(1,$event.target.value*1,item)">
            <a href="javascript:void(0)" class="plus" @click="handler(2,1,item)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ item.skuNum*item.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteCart(item.skuId)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllChecked" @change="changeAllChecked">
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="deleteAllChecked">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalCount }}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ShopCart',
  data () {
    return {
      flag: true
    }
  },
  computed: {
    ...mapGetters('shopCart', ['cartList']),
    cartInfoList () {
      return this.cartList.cartInfoList || []
    },
    // 计算总计金额
    totalCount () {
      return this.cartInfoList.reduce((total, item) => {
        if (item.isChecked) {
          total += item.skuPrice * item.skuNum
        }
        return total
      }, 0)
    },
    // 是否勾选全选按钮
    isAllChecked () {
      if (this.cartInfoList.length === 0) return false
      return this.cartInfoList.every(item => {
        return item.isChecked
      })
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    // 向服务器请求数据
    getData () {
      this.$store.dispatch('shopCart/getShopCartList')
    },
    // 修改商品数量
    async handler (type, num, goods) {
      if (this.flag) {
        this.flag = false
        console.log(typeof num)
        if (type !== 1) {
          if (type === 0 && goods.skuNum <= 1) {
            this.flag = true
            return false
          }
        } else {
          console.log(num)
          if (isNaN(num) || num < 1) {
            num = 0
          }
          num = parseInt(num) - goods.skuNum
        }
        await this.$store.dispatch('detail/addShopCar', { skuId: goods.skuId, skuNum: num })
        this.getData()
        this.flag = true
      }
    },
    // 删除商品
    async deleteCart (skuId) {
      await this.$store.dispatch('shopCart/deleteCartBySkuId', skuId)
      this.getData()
    },
    // 修改商品选中状态
    async changeGoodsChecked (skuId, $event) {
      await this.$store.dispatch('shopCart/changeChecked', { skuId: skuId, isChecked: $event.target.checked ? '1' : '0' })
      this.getData()
    },
    // 删除所有选中的商品
    deleteAllChecked () {
      this.cartInfoList.forEach(item => {
        if (item.isChecked) { this.deleteCart(item.skuId) }
      })
    },
    // 改变全选状态
    async changeAllChecked (e) {
      const checked = e.target.checked
      await this.$store.dispatch('shopCart/updateAllChecked', checked)
      this.getData()
    }
  }
}
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 15%;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

          .cart-list-con4 {
            width: 10%;

          }

          .cart-list-con5 {
            width: 16%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 9px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 9px;
            }
          }

          .cart-list-con6 {
            width: 11.5%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 11%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>
