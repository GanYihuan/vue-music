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
        :class="{active: currentPageIndex === index }"
      >
      </span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import { addClass } from 'common/js/dom'

export default {
	data() {
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
	/* dom ready */
	mounted() {
		/* setTimeout: dom完全刷新, 浏览器17s刷新一次 */
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
			/* better-scroll: refresh */
			this.slider.refresh()
		})
	},
	methods: {
		_setSliderWidth(isResize) {
			let width = 0
			this.children = this.$refs.sliderGroup.children
      // console.log(this.children.length)
      /*
      dom: 5
      better-scroll 复制两个东西放在carousel头部和尾部, 用于循环
			dom: 5+2=7
      */
      /*
      scrollWidth: The width of the actual content of the object, not including the width of the border line, varies with the amount of content in the object
      clientWidth: The visible width of the object, excluding edges such as scroll bars, varies with the display size of the window
      offsetWidth: The visible width of the object, including edges such as scroll bars, varies with the display size of the window
      */
			/* parent clientWidth */
			let sliderWidth = this.$refs.slider.clientWidth
			for (let i = 0; i < this.children.length; i++) {
				let child = this.children[i]
				/* (common/js/dom.js): addClass() */
				addClass(child, 'slider-item')
				child.style.width = sliderWidth + 'px'
				width += sliderWidth
			}
			/* 长度加倍用于循环 (the carousel component) */
			if (this.loop && !isResize) {
				width += 2 * sliderWidth
			}
			this.$refs.sliderGroup.style.width = width + 'px'
		},
		_initDots() {
			// length: 5
			this.dots = new Array(this.children.length)
		},
		_initSlider() {
			/* better-scroll 复制两个东西放在carousel头部和尾部, 用于循环 */
			/* https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/#better-scroll%20%E6%98%AF%E4%BB%80%E4%B9%88 */
			this.slider = new BScroll(this.$refs.slider, {
				scrollX: true,
				scrollY: false,
        /* 当快速滑动时是否开启滑动惯性 */
				momentum: false,
				snap: true,
        /* 是否可以无缝循环轮播 */
				snapLoop: this.loop,
        /* 手指滑动时页面可切换的阈值, 大于这个阈值可以滑动到下一页 */
				snapThreshold: 0.2,
        /* 轮播图切换的动画时间 */
				snapSpeed: 400
			})
			/* better-scroll 派发 event */
			this.slider.on('scrollEnd', () => {
				/* pageIndex: locate which child element, return it index */
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
		_autoPlay() {
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
	destroyed() {
		clearTimeout(this.timer)
	}
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import '~common/scss/variable.scss';
@import './slider.scss';
</style>
