<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span class="dot"
            :class="{active: currentPageIndex === index }"
            v-for="(item, index) in dots"
            :key="index"
      >
      </span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { addClass } from 'common/js/dom'
  import BScroll from 'better-scroll'

  export default {
    data () {
      return {
        dots: [],
        currentPageIndex: 0
      }
    },
    props: {
      loop: {
        type: Boolean,
        default: true
      },
      autoPlay: {
        type: Boolean,
        default: true
      },
      interval: {
        type: Number,
        default: 4000
      }
    },
    // dom ready
    mounted () {
      // setTimeout: dom Fully loaded, browser refresh 17s, 20s it's normal
      setTimeout(() => {
        this._setSliderWidth()
        this._initDots()
        this._initSlider()
        if (this.autoPlay) {
          this._autoPlay()
        }
      }, 20)
      window.addEventListener('resize', () => {
        if (!this.slider) {
          return
        }
        this._setSliderWidth(true)
        // better-scroll: refresh
        this.slider.refresh()
      })
    },
    methods: {
      _setSliderWidth (isResize) {
        let width = 0
        // sliderGroup children element
        this.children = this.$refs.sliderGroup.children
        // console.log(this.children.length)
        // dom: 5
        // BScroll copy two sample into the carousel head and tail, for loop
        // dom: 5+2=7
        /*
        * scrollWidth: 是对象的实际内容的宽，不包边线宽度，会随对象中内容的多少改变
        * clientWidth: 是对象可见的宽度，不包滚动条等边线，会随窗口的显示大小改变
        * offsetWidth: 是对象的可见宽度，包滚动条等边线，会随窗口的显示大小改变
        * */
        // parent clientWidth
        let sliderWidth = this.$refs.slider.clientWidth
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i]
          // addClass(): (common/js/dom.js)
          addClass(child, 'slider-item')
          child.style.width = sliderWidth + 'px'
          width += sliderWidth
        }
        // Duplicate the two dom for loop (the carousel component)
        if (this.loop && !isResize) {
          width += 2 * sliderWidth
        }
        this.$refs.sliderGroup.style.width = width + 'px'
      },
      _initDots () {
        // length: 5
        this.dots = new Array(this.children.length)
      },
      _initSlider () {
        // BScroll copy two sample into the carousel head and tail, use to loop
        /**
         * https://ustbhuangyi.github.io/better-scroll/doc/en/options-advanced.html#snap
         * momentum: If set to true, you can turn on the momentum animation performed when the user quickly flicks on screen.
         * snap: this option is used to configure Slide component. You can enable slide by configure it as an Object
         * snapLoop: set to true to support slide loop
         * snapThreshold: is the threshold of going to the next snap
         * snapSpeed: is the slide loop scroll animate time
         */
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: true,
          snapLoop: this.loop,
          snapThreshold: 0.2,
          snapSpeed: 400
        })
        // better-scroll Distributed event
        this.slider.on('scrollEnd', () => {
          // pageIndex: locate which child element, return it index
          let pageIndex = this.slider.getCurrentPage().pageX
          if (this.loop) {
            // better-scroll copy two sample into the carousel head and tail, use to loop, reduce head sample (-1)
            pageIndex -= 1
          }
          this.currentPageIndex = pageIndex
          if (this.autoPlay) {
            clearTimeout(this.timer)
            this._autoPlay()
          }
        })
      },
      _autoPlay () {
        // currentPageIndex: Starting from 0
        let pageIndex = this.currentPageIndex + 1
        if (this.loop) {
          // better-scroll copy two sample into the carousel head and tail, use to loop, add tail sample (+1)
          pageIndex += 1
        }
        this.timer = setTimeout(() => {
          /**
           * goToPage(): better-scroll func
           * pageIndex: x
           * 0: y
           * 400: time interval
           */
          this.slider.goToPage(pageIndex, 0, 400)
        }, this.interval)
      }
    },
    destroyed () {
      clearTimeout(this.timer)
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../common/scss/variable.scss";
  @import "./slider.scss";
</style>
