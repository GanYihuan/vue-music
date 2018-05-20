<template>
  <!-- 11-歌曲列表/顶部提示 -->
  <transition name="drop">
    <div class="top-tip" v-show="showFlag" @click.stop="hide">
      <slot></slot>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      delay: {
        type: Number,
        default: 2000
      }
    },
    data () {
      return {
        showFlag: false
      }
    },
    methods: {
      show () {
        this.showFlag = true
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.hide()
        }, this.delay)
      },
      hide () {
        this.showFlag = false
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../common/scss/variable.scss";
  @import "./top-tip.scss";
</style>
