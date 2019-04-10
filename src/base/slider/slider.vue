<template>
  <!-- ![recommend interface](https://i.loli.net/2019/04/06/5ca861da160ba.png) -->
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
    setTimeout(() => { // setTimeout: 20s, browser 17s refreshe once
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
      this.slider.refresh() // better-scroll: dom change, refresh
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
        addClass(child, 'slider-item') // addClass(): common/js/dom.js
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
        momentum: false, // Whether to open the sliding inertia when sliding quickly
        snap: true, // for slide component
        snapLoop: this.loop, // Is it possible to seamlessly cycle the carousel ?
        snapThreshold: 0.2, // The threshold at which the page can be switched when the finger is swiped, You can switch the threshold of the page when you swipe your finger
        snapSpeed: 400 // Animation time for carousel switching
        // better-scroll and fastclick versus, Clicking on the carousel in mobile mode does not jump
        // click: true
      })
      this.slider.on('scrollEnd', () => { // better-scroll scrollEnd trigger
        let pageIndex = this.slider.getCurrentPage().pageX // pageIndex: stop page index
        if (this.loop) {
          pageIndex -= 1 // better-scroll: add one copy at the first element for loop
        }
        this.currentPageIndex = pageIndex
        if (this.autoPlay) {
          clearTimeout(this.timer)
          this._autoPlay()
        }
      })
    },
    _autoPlay() {
      let pageIndex = this.currentPageIndex + 1 // pageIndex: stop page index + 1, scroll to next page
      if (this.loop) {
        pageIndex += 1 // better-scroll: add one copy at the first element for loop
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
  destroyed() { // Clear the timer after the route change
    clearTimeout(this.timer)
  }
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import './slider.scss';
</style>
