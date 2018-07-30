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
      /* 当前第几页, 第一个 */
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
		/* setTimeout: 20s, dom 会完全刷新, 因为浏览器17s刷新一次 */
		setTimeout(() => {
			this._setSliderWidth()
			this._initDots()
			this._initSlider()
			if (this.autoPlay) {
				this._autoPlay()
			} 
    }, 20)
    /* 窗口改变事件 */ 
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
      this.children = this.$refs.sliderGroup.children
      // console.log(this.children.length)
      /*
      dom: 5
      better-scroll 复制两个子元素放在 carousel 头部和尾部, 用于循环
			dom: 5+2=7
      */
      /*
      clientWidth: (样式宽 + padding) The visual portion of the box content, not including borders or scroll bars , but includes padding . Can not be calculated directly from CSS, depends on the system's scroll bar size.
      offsetWidth: (样式宽 + padding + border) The size of the visual box incuding all borders. Can be calculated by adding width/height and paddings and borders, if the element has display: block
      scrollWidth: The size of all of the box's content, including the parts that are currently hidden outside the scrolling area. Can not be calculated directly from CSS, depends on the content.
      */
			let width = 0
			let sliderWidth = this.$refs.slider.clientWidth
			for (let i = 0; i < this.children.length; i++) {
				let child = this.children[i]
				/* (common/js/dom.js): addClass() */
				addClass(child, 'slider-item')
				child.style.width = sliderWidth + 'px'
				width += sliderWidth
			}
			/* 长度加倍用于循环 (the carousel component), isResize 不执行 */
			if (this.loop && !isResize) {
				width += 2 * sliderWidth
			}
			this.$refs.sliderGroup.style.width = width + 'px'
		},
		_initDots() {
			/* length: 5 */
			this.dots = new Array(this.children.length)
		},
		_initSlider() {
			/* better-scroll 复制两个子元素放在carousel头部和尾部, 用于循环 */
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
        /* better-scroll与fastclick冲突, 手机模式下点击轮播图不跳转 */ 
        // click: true 
			})
			/* better-scroll 派发 event */
			this.slider.on('scrollEnd', () => {
				/* pageIndex: 第几个子元素 */
				let pageIndex = this.slider.getCurrentPage().pageX
				if (this.loop) {
          /* 默认向第一个元素添加一个copy, pageIndex-1=实际index */ 
					pageIndex -= 1
        }
        /*
        跳转到下一页
        第一页下标0, pageIndex开始为1, 赋值到currentPageIndex,
        currentPageIndex=1, 第二页下标为1, 即跳转到第二页
        */ 
				this.currentPageIndex = pageIndex
				if (this.autoPlay) {
          /* 防止手动拖动产生问题 */ 
					clearTimeout(this.timer)
					this._autoPlay()
				}
			})
		},
		_autoPlay() {
			let pageIndex = this.currentPageIndex + 1
			if (this.loop) {
        /* this.currentPageIndex 从0开始, pageIndex对应到第几个元素比其多一个, 在最开始复制一个副本 */ 
				pageIndex += 1
			}
			this.timer = setTimeout(() => {
				/*
				goToPage(): better-scroll func
				pageIndex: x
				0: y
				400: time interval
				*/
				this.slider.goToPage(pageIndex, 0, 400)
			}, this.interval)
		}
	},
  /* 路由切走之后要清理计时器 */ 
	destroyed() {
		clearTimeout(this.timer)
	}
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import '~common/scss/variable.scss';
@import './slider.scss';
</style>
