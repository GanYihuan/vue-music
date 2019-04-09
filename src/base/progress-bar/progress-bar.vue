<template>
  <!-- ![music player interface](https://i.loli.net/2019/04/09/5cac16b7d5a91.png) -->
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
  created() {
    this.touch = {}
  },
  methods: {
    progressTouchStart(e) {
      this.touch.init = true
      this.touch.startX = e.touches[0].pageX // this.touch.startX: finger x-axis distance
      this.touch.left = this.$refs.progress.clientWidth // The distance the progress bar has traveled, Yellow display
    },
    progressTouchMove(e) {
      if (!this.touch.init) {
        return
      }
      const progressBarWidth = this.$refs.progressBar.clientWidth - progressBtnWidth // The distance that the progress can move = Progress bar length - Progress bar ball width
      const detailX = e.touches[0].pageX - this.touch.startX // progressbar move distance = current finger x-axis distance - pre finger x-axis distance
      const offsetWidth = Math.min( // offsetWidth: yellow color, real progress width
        progressBarWidth,
        Math.max(0, this.touch.left + detailX)
      )
      this._offset(offsetWidth)
    },
    progressTouchEnd() {
      this.touch.init = false
      this._triggerPercent()
    },
    _triggerPercent() {
      const progressBarWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
      const percent = this.$refs.progress.clientWidth / progressBarWidth // The distance the progress bar has traveled / The distance that the progress can move
      this.$emit('percentChange', percent)
    },
    progressClick(e) {
      const rect = this.$refs.progressBar.getBoundingClientRect() // getBoundingClientRect: **static/getBoundingClientRect.png**
      const offsetWidth = e.pageX - rect.left // offsetWidth: real progress = stop position - rect
      this._offset(offsetWidth)
      this._triggerPercent()
    },
    _offset(offsetWidth) { // The distance the progress bar has traveled, Yellow display
      this.$refs.progress.style.width = `${offsetWidth}px`
      this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px, 0, 0)`
    }
  },
  watch: {
    percent(newPercent) {
      if (newPercent >= 0 && !this.touch.init) { // > !this.touch.init: progress bar drag process cancel
        const progressBarWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
        const offsetWidth = progressBarWidth * newPercent
        this._offset(offsetWidth)
      }
    }
  }
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import './progress-bar.scss';
</style>
