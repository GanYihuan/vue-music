<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'

export default {
  props: {
    /*
    [better-scroll 官方文档](https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/#better-scroll%20%E6%98%AF%E4%BB%80%E4%B9%88)
    probeType: 1，会非实时（屏幕滑动超过一定时间后）派发scroll 事件
    probeType: 2，会在屏幕滑动的过程中实时的派发 scroll 事件
    probeType: 3，不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件
    default ，probeType: 0，don't distribute scroll event
    */
    probeType: {
      type: Number,
      default: 1
    },
    click: { // better-scroll: By default, the native click event of the browser is blocked. when set true，better-scroll will distributed click event
      type: Boolean,
      default: true
    },
    listenScroll: {
      type: Boolean,
      default: false
    },
    data: { // Data is async, Data changes to recalculate the scroll
      type: Array,
      default: null
    },
    pullup: { // Pull down to refresh
      type: Boolean,
      default: false
    },
    beforeScroll: { // hide mobile keyboard
      type: Boolean,
      default: false
    },
    refreshDelay: {
      type: Number,
      default: 20
    }
  },
  mounted() {
    setTimeout(() => { // maySure dom has render
      this._initScroll()
    }, 20)
  },
  methods: {
    _initScroll() {
      // When it's no value
      if (!this.$refs.wrapper) {
        return
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click
      })
      if (this.listenScroll) {
        const that = this
        this.scroll.on('scroll', pos => {
          that.$emit('scroll', pos)
        })
      }
      if (this.pullup) { // pullup: drop-down refresh
        this.scroll.on('scrollEnd', () => {
          // parent scrollToEnd trigger when the screen is scrolling down 50px
          if (this.scroll.y <= this.scroll.maxScrollY + 50) {
            this.$emit('scrollToEnd') // scrollToEnd: scroll to bottom
          }
        })
      }
      if (this.beforeScroll) {
        this.scroll.on('beforeScrollStart', () => {
          this.$emit('beforeScroll')
        })
      }
    },
    disable() {
      this.scroll && this.scroll.disable()
    },
    enable() {
      this.scroll && this.scroll.enable()
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    scrollTo() {
      // apply: Call a function with this value given And provide parameters as an array
      // apply: scrollTo Receiving parameter, apply Pass the parameters to scroll.scrollTo
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this.refresh()
      }, this.refreshDelay)
    }
  }
}
</script>
