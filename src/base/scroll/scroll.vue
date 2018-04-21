<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'

  export default {
    props: {
      // [official document](https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/#better-scroll%20%E6%98%AF%E4%BB%80%E4%B9%88)
      // scroll potions
      // probeType: 1，The scroll event is distributed over a certain period of time.
      // probeType: 2，The process of screen slippage, distribute scroll event
      // probeType: 3，The process of screen slippage，and In the momentum rolling animation process. distribute scroll event
      // default ，probeType: 0，don't distribute scroll event
      probeType: {
        type: Number,
        default: 1
      },
      // better-scroll: By default, the native click event of the browser is blocked.
      // when set-to true，better-scroll will distributed click event
      // add a attribute _constructed to distribute event params, which value it's true
      click: {
        type: Boolean,
        default: true
      },
      // scroll listen scroll event ?
      listenScroll: {
        type: Boolean,
        default: false
      },
      data: {
        type: Array,
        default: null
      },
      // drop-pull refresh ?
      pullup: {
        type: Boolean,
        default: false
      },
      // hide mobile keyboard
      beforeScroll: {
        type: Boolean,
        default: false
      },
      // delay refresh
      refreshDelay: {
        type: Number,
        default: 20
      }
    },
    // mounted: dom ready
    mounted () {
      // maySure dom has rendering
      setTimeout(() => {
        this._initScroll()
      }, 20)
    },
    methods: {
      _initScroll () {
        // undefined
        if (!this.$refs.wrapper) {
          return
        }
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click
        })
        // scroll listen scroll
        if (this.listenScroll) {
          let me = this
          this.scroll.on('scroll', (pos) => {
            me.$emit('scroll', pos)
          })
        }
        // pullup: drop-down refresh
        if (this.pullup) {
          // listen scrollEnd
          this.scroll.on('scrollEnd', () => {
            // The parent scrollToEnd is triggered when the screen is scrolling down to 50px.
            if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
              // scrollToEnd: scroll to bottom
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
        // if this.scroll exist
        this.scroll && this.scroll.disable()
      },
      enable () {
        this.scroll && this.scroll.enable()
      },
      refresh () {
        this.scroll && this.scroll.refresh()
      },
      scrollTo () {
        // apply: scrollTo access parameter, apply pass into scroll.scrollTo
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
