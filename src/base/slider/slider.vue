<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span
        class="dot"
        v-for="(item, index) in dots"
        :key="index"
        :class="{ active: currentPageIndex === index }"
      >
      </span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import { addClass } from 'common/js/dom'

export default {
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
  data() {
    return {
      dots: [],
      currentPageIndex: 0
    }
  },
  mounted() {
    /* setTimeout: 20s, browser 17s refreshe once */
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
      /* better-scroll: dom change, refresh */
      this.slider.refresh()
    })
  },
  methods: {
    _setSliderWidth(isResize) {
      this.children = this.$refs.sliderGroup.children
      /*
      console.log(this.children.length) = 5
      better-scroll copy 2 dom For loop
      dom: 5+2=7
      */
      let width = 0
      const sliderWidth = this.$refs.slider.clientWidth
      for (let i = 0; i < this.children.length; i++) {
        const child = this.children[i]
        /* addClass(): common/js/dom.js */
        addClass(child, 'slider-item')
        child.style.width = sliderWidth + 'px'
        width += sliderWidth
      }
      if (this.loop && !isResize) {
        width += 2 * sliderWidth
      }
      this.$refs.sliderGroup.style.width = width + 'px'
    },
    _initDots() {
      this.dots = new Array(this.children.length)
    },
    _initSlider() {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        /* Whether to open the sliding inertia when sliding quickly */
        momentum: false,
        /* for slide component */
        snap: true,
        /* Is it possible to seamlessly cycle the carousel? */
        snapLoop: this.loop,
        /* The threshold at which the page can be switched when the finger is swiped, You can switch the threshold of the page when you swipe your finger */
        snapThreshold: 0.2,
        /* Animation time for carousel switching */
        snapSpeed: 400
        /* better-scroll and fastclick versus, Clicking on the carousel in mobile mode does not jump */
        // click: true
      })
      // better-scroll 滚动过程结束时触发
      this.slider.on('scrollEnd', () => {
        /* pageIndex: 第几个子元素 */
        let pageIndex = this.slider.getCurrentPage().pageX
        if (this.loop) {
          /* better-scroll: add one copy at the first element for loop */
          pageIndex -= 1
        }
        this.currentPageIndex = pageIndex
        if (this.autoPlay) {
          clearTimeout(this.timer)
          this._autoPlay()
        }
      })
    },
    _autoPlay() {
      let pageIndex = this.currentPageIndex + 1
      if (this.loop) {
        /* better-scroll: add one copy at the first element for loop */
        pageIndex += 1
      }
      this.timer = setTimeout(() => {
        /*
        better-scrol func: goToPage()
        pageIndex: x
        0: y
        400: time interval
        */
        this.slider.goToPage(pageIndex, 0, 400)
      }, this.interval)
    }
  },
  /* Clear the timer after the route change */
  destroyed() {
    clearTimeout(this.timer)
  }
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import './slider.scss';
</style>
