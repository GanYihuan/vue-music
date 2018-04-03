<template>
  <!-- 08/搜索框 -->
  <div class="search-box">
    <i class="icon-search"></i>
    <input ref="query" v-model="query" class="box" :placeholder="placeholder"/>
    <i class="icon-dismiss" v-show="query" @click="clear"></i>
  </div>
</template>

<script type="text/ecmascript-6">
  // 优化请求节流函数
  import { debounce } from 'common/js/util'

  export default {
    props: {
      placeholder: {
        type: String,
        default: '搜索歌曲、歌手'
      }
    },
    data () {
      return {
        query: ''
      }
    },
    methods: {
      clear () {
        this.query = ''
      },
      setQuery (query) {
        this.query = query
      },
      // 当滚动时, search框失去焦点, 目的是移动端取消键盘
      blur () {
        this.$refs.query.blur()
      }
    },
    // 不直接在watch里面写
    created () {
      // debounce(): common/js/util.js
      // 节流函数, 优化请求
      this.$watch('query', debounce(newQuery => {
          // 派发query事件给父级
          this.$emit('query', newQuery)
        }, 200)
      )
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import '../../common/scss/variable.scss';
  @import "./search-box.scss";
</style>
