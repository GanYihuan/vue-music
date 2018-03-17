<template>
  <div class="progress-bar" ref="progressBar">
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

<script>
  import {prefixStyle} from 'common/js/dom'

  const progressBtnWidth = 16
  const transform = prefixStyle('transform')

  export default {
    props: {
      percent: {
        type: Number,
        default: 0
      }
    },
    created () {
      // 共享数据
      this.touch = {}
    },
    methods: {
      progressTouchStart (e) {
        this.touch.init = true
        this.touch.startX = e.touches[0].pageX
        this.touch.left = this.$refs.progress.clientWidth
      },
      progressTouchMove (e) {
        if (!this.touch.init) {
          return
        }
        const progressBarWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
        const detailX = e.touches[0].pageX - this.touch.startX
        const offsetWidth = Math.min(progressBarWidth, Math.max(0, this.touch.left + detailX))
        this._offset(offsetWidth)
      },
      progressTouchEnd () {
        this.touch.init = false
        const progressBarWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
        const percent = this.$refs.progress.clientWidth / progressBarWidth
        this.$emit('percentChange', percent)
      },
      _offset (offsetWidth) {
        this.$refs.progress.style.width = `${offsetWidth}px`
        this.$refs.progressBtn.style.transform = `translate3d(${offsetWidth}px, 0, 0)`
      }
    },
    watch: {
      percent (newPercent) {
        if (newPercent >= 0 && !this.touch.init) {
          // 减去小球宽度
          const progressBarWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
          const offsetWidth = progressBarWidth * newPercent
          this._offset(offsetWidth)
        }
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../common/scss/variable.scss";
  @import "./progress-bar.scss";
</style>