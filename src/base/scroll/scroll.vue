<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'

  export default {
    props: {
      // [官方文档](https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/#better-scroll%20%E6%98%AF%E4%BB%80%E4%B9%88)
      // 有时候我们需要知道滚动的位置。
      // 当 probeType 为 1 的时候，会非实时（屏幕滑动超过一定时间后）派发scroll 事件；
      // 当 probeType 为 2 的时候，会在屏幕滑动的过程中实时的派发 scroll 事件；
      // 当 probeType 为 3 的时候，不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件。
      // 如果没有设置该值，其默认值为 0，即不派发 scroll 事件。
      probeType: {
        type: Number,
        default: 1
      },
      // better-scroll 默认会阻止浏览器的原生 click 事件。
      // 当设置为 true，better-scroll 会派发一个 click 事件，
      // 我们会给派发的 event 参数加一个私有属性 _constructed，值为 true
      click: {
        type: Boolean,
        default: true
      },
      // scroll监听滚动事件?
      listenScroll: {
        type: Boolean,
        default: false
      },
      data: {
        type: Array,
        default: null
      },
      // 是否下拉刷新
      pullup: {
        type: Boolean,
        default: false
      },
      // 目的: 取消手机端键盘
      beforeScroll: {
        type: Boolean,
        default: false
      },
      // 刷新延迟
      refreshDelay: {
        type: Number,
        default: 20
      }
    },
    // mounted: dom ready
    mounted () {
      // 确保dom渲染了
      setTimeout(() => {
        this._initScroll()
      }, 20)
    },
    methods: {
      _initScroll () {
        // undefined 的时候
        if (!this.$refs.wrapper) {
          return
        }
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click
        })
        // scroll 监听滚动
        if (this.listenScroll) {
          let me = this
          this.scroll.on('scroll', (pos) => {
            me.$emit('scroll', pos)
          })
        }
        // pullup: 下拉刷新
        if (this.pullup) {
          // 监听scrollEnd
          this.scroll.on('scrollEnd', () => {
            // 屏幕滚动到底部距离50px时,触发父级scrollToEnd
            if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
              // scrollToEnd: 滚动到底部
              this.$emit('scrollToEnd')
            }
          })
        }
        if (this.beforeScroll) {
          this.scroll.on('beforeScrollStart', () => {
            this.$emit('beforeScroll')
          })
        }
      },
      disable () {
        // 如果this.scroll 存在
        this.scroll && this.scroll.disable()
      },
      enable () {
        this.scroll && this.scroll.enable()
      },
      refresh () {
        this.scroll && this.scroll.refresh()
      },
      scrollTo () {
        // apply: scrollTo会接受参数, apply传入scroll.scrollTo里面
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement () {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    },
    watch: {
      data () {
        setTimeout(() => {
          this.refresh()
        }, this.refreshDelay)
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">

</style>
