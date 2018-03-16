<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
  import BScorll from 'better-scroll'

  export default {
    props: {
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      },
      data: {
        type: Array,
        default: true
      },
      listenScroll: {
        type: Boolean,
        default: false
      }
    },
    mounted () {
      // Ensure dom rendering
      setTimeout(() => {
        this._initScroll()
      }, 20)
    },
    methods: {
      _initScroll () {
        this.scroll = new BScorll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click
        })
        if (this.listenScroll) {
          let _this = this
          this.scroll.on('scroll', (pos) => {
            // 向父级派发scroll事件
            _this.$emit('scroll', pos)
          })
        }
      },
      refresh () {
        this.scroll && this.scroll.refresh();
      },
      scrollTo () {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement () {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    },
    watch: {
      data () {
        setTimeout(() => {
          this.refresh();
        }, 20)
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">

</style>
