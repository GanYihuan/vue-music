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
    // dom ready
    mounted () {
      // setTimeout: dom Fully loaded
      setTimeout(() => {
        this._setSliderWidth()
        this._initSlider()
        this._initDots()
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
        // How many elements are there in the entire list?
        this.children = this.$refs.sliderGroup.children
        let width = 0
        // The width of the parent container.
        let sliderWidth = this.$refs.slider.clientWidth
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i]
          // addClass(): (common/js/dom.js)
          addClass(child, 'slider-item')
          child.style.width = sliderWidth + 'px'
          width += sliderWidth
        }
        // Duplicate the two dom for loop (the multicast component)
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
        // BScroll copy two sample into the carousel head and tail, use to loop
        /**
         * https://ustbhuangyi.github.io/better-scroll/doc/en/options-advanced.html#snap
         *
         * momentum: If setted to true, you can turn on the momentum animation performed when the user quickly flicks on screen.
         * snap: this option is used to configure Slide component. You can enable slide by configure it as an Object
         * snapLoop: set to true to support slide loop
         * snapThreshold: is the threshold of going to the next snap
         * snapSpeed: is the slide loop scroll animate time
         * @type {_bscroll.BScroll}
         */
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: true,
          // cycle
          snapLoop: this.loop,
          snapThreshold: 0.2,
          snapSpeed: 400
        })
        this.slider.on('scrollEnd', () => {
          // pageIndex: Child elements
          let pageIndex = this.slider.getCurrentPage().pageX
          if (this.loop) {
            // better-scroll Add a copy by default to the first element.
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
          // better-scroll Add a copy by default to the first element.
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
    destroyed () {
      clearTimeout(this.timer)
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../common/scss/variable.scss";
  @import "./slider.scss";
</style>
