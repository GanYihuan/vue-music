<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <!--
        Vue provide slot
        When the slider is referenced outside, the dom of the slider is inserted into the slot.
        When the subcomponent template has only one slot without attributes,
        The entire content fragment of the parent component is inserted into the DOM location
        of the slot and replaces the slot tag itself.
      -->
      <slot></slot>
    </div>
    <div class="dots">
      <span
        class="dot"
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
    mounted () {
      // setTimeout: dom Fully loaded
      setTimeout(() => {
        this._setSliderWidth()
        this._initDots()
        this._initSlider()
        if (this.autoPlay) {
          this._autoPlay()
        }
      }, 20)
      // Listen to the window and change the event.
      window.addEventListener('resize', () => {
        if (!this.slider) {
          return
        }
        this._setSliderWidth(true)
        this.slider.refresh()
      })
    },
    methods: {
      _setSliderWidth (isResize) {
        this.children = this.$refs.sliderGroup.children
        let width = 0
        let sliderWidth = this.$refs.slider.clientWidth
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i]
          // addClass (common/js/dom.js)
          addClass(child, 'slider-item')
          child.style.width = sliderWidth + 'px'
          width += sliderWidth
        }
        // Duplicate the two dom to loop (the multicast component)
        if (this.loop && !isResize) {
          width += 2 * sliderWidth
        }
        this.$refs.sliderGroup.style.width = width + 'px'
      },
      _initDots () {
        this.dots = new Array(this.children.length)
      },
      _initSlider () {
        // better-scroll
        // Rotate the scroll Settings.
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: true,
          // cycle
          snapLoop: this.loop,
          snapThreshold: 0.2,
          // click: true,
          snapSpeed: 400
        })
        this.slider.on('scrollEnd', () => {
          // pageIndex: 第几个子元素
          let pageIndex = this.slider.getCurrentPage().pageX
          if (this.loop) {
            // 默认向第一个元素添加一个copy
            // copy: 1, 2, 3, 1, 2, 3
            pageIndex -= 1
          }
          this.currentPageIndex = pageIndex
          if (this.autoPlay) {
            // 清除定时器
            clearTimeout(this.timer)
            this._autoPlay()
          }
        })
      },
      _autoPlay () {
        // currentPageIndex: 从零开始
        let pageIndex = this.currentPageIndex + 1
        if (this.loop) {
          // this.currentPageIndex下标从0开始
          pageIndex += 1
        }
        this.timer = setTimeout(() => {
          // pageIndex: x
          // 0: y
          // 400: time interval
          this.slider.goToPage(pageIndex, 0, 400)
        }, this.interval)
      }
    },
    // 有计时器时, 要清理
    destroyed () {
      clearTimeout(this.timer)
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../common/scss/variable.scss";
  @import "./slider.scss";
</style>
