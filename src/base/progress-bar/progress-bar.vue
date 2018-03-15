<template>
  <div class="progress-bar" ref="progressBar">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" ref="progressBtn"
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

  const progressBtnWidth = 16

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
        this.touch.startX = e.touches[0].pageX
        this.touch.left = this.$refs.progress.clientWidth
      },
      progressTouchMove(e) {
        if(!this.touch.init) {
          return
        }
        const progressBarWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
        const detailX = e.touches[0].pageX - this.touch.startX
        const offsetWidth = Math.min(progressBarWidth, Math.max(0, this.touch.left + detailX))

        this._offset(offsetWidth)
      },
      progressTouchEnd() {
        this.touch.init = false
        const progressBarWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
        const percent = this.$refs.progress.clientWidth / progressBarWidth

        this.$emit('percentChange', percent)

      },
      _offset(offsetWidth) {
        this.$refs.progress.style.width = offsetWidth + 'px'
        this.$refs.progressBtn.style.transform = `translate3d(${offsetWidth}px, 0, 0)`
      }
    },
    watch: {
      percent(newPercent) {
        if(newPercent >= 0 && !this.touch.init) {
          const progressBarWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
          const offsetWidth = progressBarWidth * newPercent

          this._offset(offsetWidth)
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .progress-bar
    height: 30px
    .bar-inner
      position: relative
      top: 13px
      height: 4px
      background: rgba(0, 0, 0, 0.3)
      border-radius 20px
      .progress
        position: absolute
        height: 100%
        background: $color-theme
        border-radius 20px
      .progress-btn-wrapper
        position: absolute
        left: -8px
        top: -13px
        width: 30px
        height: 30px
        .progress-btn
          position: relative
          top: 7px
          left: 7px
          box-sizing: border-box
          width: 16px
          height: 16px
          border: 3px solid $color-text
          border-radius: 50%
          background: $color-theme
</style>