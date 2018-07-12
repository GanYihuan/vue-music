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
    [official document](https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/#better-scroll%20%E6%98%AF%E4%BB%80%E4%B9%88)
		probeType: 1，会非实时（屏幕滑动超过一定时间后）派发scroll 事件
		probeType: 2，会在屏幕滑动的过程中实时的派发 scroll 事件
		probeType: 3，不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件
		default ，probeType: 0，don't distribute scroll event
    */
		probeType: {
			type: Number,
			default: 1
    },
    /*
    better-scroll: By default, the native click event of the browser is blocked.
		when set-to true，better-scroll will distributed click event
		add a attribute _constructed to distribute event params, which value it's true
    */
		click: {
			type: Boolean,
			default: true
		},
		/* listen scroll event */
		listenScroll: {
			type: Boolean,
			default: false
    },
    /* 数据是异步获取的, 数据变化要重新计算scroll */ 
		data: {
			type: Array,
			default: null
		},
		/* 下拉刷新 */
		pullup: {
			type: Boolean,
			default: false
		},
		/* hide mobile keyboard */
		beforeScroll: {
			type: Boolean,
			default: false
		},
		/* delay refresh */
		refreshDelay: {
			type: Number,
			default: 20
		}
	},
	/* dom ready */
	mounted() {
		/* maySure dom has render */
		setTimeout(() => {
			this._initScroll()
		}, 20)
	},
	methods: {
		_initScroll() {
      /* 没有值的时候 */ 
			if (!this.$refs.wrapper) {
				return
			}
			this.scroll = new BScroll(this.$refs.wrapper, {
				probeType: this.probeType,
				click: this.click
			})
			if (this.listenScroll) {
				let that = this
				this.scroll.on('scroll', pos => {
					that.$emit('scroll', pos)
				})
			}
			/* pullup: drop-down refresh */
			if (this.pullup) {
				/* listen scrollEnd */
				this.scroll.on('scrollEnd', () => {
					/* The parent scrollToEnd is triggered when the screen is scrolling down to 50px. */
					if (this.scroll.y <= this.scroll.maxScrollY + 50) {
						/* scrollToEnd: scroll to bottom */
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
      /* apply: 调用具有给定此值的函数，并将参数作为数组提供 */ 
			/* apply: scrollTo 接收参数, apply 传递参数到 scroll.scrollTo 中 */
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
