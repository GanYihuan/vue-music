<template>
  <!-- static/04-音乐播放界面.png/歌曲控件 -->
  <div 
    class="progress-bar"
    ref="progressBar"
    @click="progressClick"
  >
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div 
        class="progress-btn-wrapper"
        ref="progressBtn"
        @touchstart="progressTouchStart"
        @touchmove="progressTouchMove"
        @touchend="progressTouchEnd"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { prefixStyle } from 'common/js/dom'

const progressBtnWidth = 16
const transform = prefixStyle('transform')

export default {
	props: {
		percent: {
			type: Number,
			default: 0
		}
  },
  // 数据, 不需要被监控, data, props里面的数据会被监控
  // get back-end data
	created() {
    // 共享数据
		this.touch = {}
	},
	methods: {
		progressTouchStart(e) {
			this.touch.init = true
			// this.touch.startX: Click on location for the first time
			this.touch.startX = e.touches[0].pageX
			// this.$refs.progress: Progress bar generated progress width
			this.touch.left = this.$refs.progress.clientWidth
		},
		progressTouchMove(e) {
			if (!this.touch.init) {
				return
			}
			// progressBarWidth: real progress width, yellow color
			const progressBarWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
			// detailX: Progress bar moving distance = current click position - pre click position
			const detailX = e.touches[0].pageX - this.touch.startX
			// 不小于0: Math.max(0, X): (X>0) The value returned is not less than 0
			const offsetWidth = Math.min(progressBarWidth, Math.max(0, this.touch.left + detailX))
			this._offset(offsetWidth)
		},
		progressTouchEnd() {
			this.touch.init = false
			this._triggerPercent()
		},
		progressClick(e) {
			// getBoundingClientRect: static/getBoundingClientRect.png
			const rect = this.$refs.progressBar.getBoundingClientRect()
			// offsetWidth: real progress = stop position - rect
			const offsetWidth = e.pageX - rect.left
			this._offset(offsetWidth)
			this._triggerPercent()
		},
		_triggerPercent() {
			// progressBarWidth: Progress bar can move distance = progress bar length - ball length
			const progressBarWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
			const percent = this.$refs.progress.clientWidth / progressBarWidth
			this.$emit('percentChange', percent)
		},
		_offset(offsetWidth) {
			this.$refs.progress.style.width = `${offsetWidth}px`
			this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px, 0, 0)`
		}
	},
	watch: {
		percent(newPercent) {
			// !this.touch.init: progress bar dragging process cannot be modified
			if (newPercent >= 0 && !this.touch.init) {
				// progressBarWidth: Progress bar can move distance = progress bar length - ball length
				const progressBarWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
				// offsetWidth: real progress width, yellow color
				const offsetWidth = progressBarWidth * newPercent
				this._offset(offsetWidth)
			}
		}
	}
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import '~common/scss/variable.scss';
@import './progress-bar.scss';
</style>
