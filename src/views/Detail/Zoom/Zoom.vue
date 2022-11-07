<template>
  <div class="spec-preview" ref="parent">
    <img :src="imgObj.imgUrl" />
    <div class="event" @mousemove="handler"></div>
    <div class="big">
      <img :src="imgObj.imgUrl" ref="bigImg"/>
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
import bus from '@/utils/eventBus'
export default {
  name: 'Zoom',
  props: ['skuImageList'],
  data () {
    return {
      curIndex: 0
    }
  },
  computed: {
    imgObj () {
      return this.skuImageList[this.curIndex] || {}
    }
  },
  mounted () {
    bus.$on('changeImg', (val) => {
      this.curIndex = val
    })
  },
  methods: {
    handler (e) {
      const mask = this.$refs.mask
      const big = this.$refs.bigImg
      const parent = this.$refs.parent
      let left = e.offsetX - mask.offsetWidth / 2
      let top = e.offsetY - mask.offsetHeight / 2
      if (left < 0) {
        left = 0
      } else if (left > parent.offsetWidth - mask.offsetWidth) {
        left = parent - mask.offsetWidth
      }
      if (top < 0) {
        top = 0
      } else if (top > parent.offsetHeight - mask.offsetHeight) {
        top = parent - mask.offsetHeight
      }
      mask.style.top = top + 'px'
      mask.style.left = left + 'px'
      big.style.top = -2 * top + 'px'
      big.style.left = -2 * left + 'px'
    }
  }
}
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>
