<template>
  <div class="pagination">
    <button :disabled="pageNo===1" @click="$emit('getPageNo',pageNo-1)">上一页</button>
    <button v-if="startAndEnd.start>1" @click="$emit('getPageNo',1)" :class="{active:pageNo===2}">1</button>
    <button v-if="startAndEnd.start-1>1">···</button>

    <button v-for="(item,index) in continuesArr" :key="index" @click="$emit('getPageNo',item)" :disabled="pageNo===item" :class="{active:pageNo===item}">{{ item }}</button>

    <button v-if="totalPage-startAndEnd.end>1">···</button>
    <button v-if="totalPage!==startAndEnd.end" @click="$emit('getPageNo',totalPage)" :class="{active:pageNo===totalPage}">{{ totalPage }}</button>
    <button :disabled="pageNo===totalPage" @click="$emit('getPageNo',pageNo+1)">下一页</button>

    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: ['pageNo', 'pageSize', 'total', 'continues'],
  computed: {
    // 计算总页数
    totalPage () {
      return Math.ceil(this.total / this.pageSize)
    },
    // 计算连续页面的起始页和结束页
    startAndEnd () {
      const { pageNo, totalPage, continues } = this
      let start = 0
      let end = 0
      if (totalPage < continues) {
        start = 1
        end = totalPage
      } else {
        start = pageNo - parseInt(continues / 2)
        end = pageNo + parseInt(continues / 2)
        if (start < 1 || pageNo < continues) {
          start = 1
          end = continues
        }
        if (end > totalPage || pageNo > totalPage - continues + 1) {
          end = totalPage
          start = totalPage - continues + 1
        }
      }
      return { start, end }
    },
    // 将连续页放入数组
    continuesArr () {
      const arr = []
      for (let i = this.startAndEnd.start; i <= this.startAndEnd.end; i++) { arr.push(i) }
      return arr
    }
  }
}
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
