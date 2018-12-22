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
  created() {
    this.touch = {}
  },
  methods: {
    progressTouchStart(e) {
      this.touch.init = true
      /* this.touch.startX: finger x-axis distance */
      this.touch.startX = e.touches[0].pageX
      /* 进度条已经走过的距离，黄色显示 */
      this.touch.left = this.$refs.progress.clientWidth
    },
    progressTouchMove(e) {
      if (!this.touch.init) {
        return
      }
      /* 进度能移动的距离 = 进度条长度 - 进度条小球的宽度 */
      const progressBarWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
      /* progressbar move distance = current finger x-axis distance - pre finger x-axis distance */
      const detailX = e.touches[0].pageX - this.touch.startX
      /* offsetWidth: yellow color, real progress width */
      const offsetWidth = Math.min(
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
      /* 进度能移动的距离 = 进度条长度 - 进度条小球的宽度 */
      const progressBarWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
      /* 进度条已经走过的距离 / 进度能移动的距离 */
      const percent = this.$refs.progress.clientWidth / progressBarWidth
      this.$emit('percentChange', percent)
    },
    progressClick(e) {
      /* getBoundingClientRect: **static/getBoundingClientRect.png** */
      const rect = this.$refs.progressBar.getBoundingClientRect()
      /* offsetWidth: real progress = stop position - rect */
      const offsetWidth = e.pageX - rect.left
      this._offset(offsetWidth)
      this._triggerPercent()
    },
    /* 进度条已经走过的距离，黄色显示 */
    _offset(offsetWidth) {
      this.$refs.progress.style.width = `${offsetWidth}px`
      this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px, 0, 0)`
    }
  },
  watch: {
    percent(newPercent) {
      /* !this.touch.init: progress bar drag process cancel */
      if (newPercent >= 0 && !this.touch.init) {
        /* 进度能移动的距离 = 进度条长度 - 进度条小球的宽度 */
        const progressBarWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
        /* 进度条已经走过的距离，黄色显示 */
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
