<template>
  <!-- static/04.png/歌曲控件 -->
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
  // css,各大浏览兼容
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
    created () {
      // 共享数据
      this.touch = {}
    },
    methods: {
      progressTouchStart (e) {
        this.touch.init = true
        // this.touch.startX: 第一次点击位置
        this.touch.startX = e.touches[0].pageX
        // this.$refs.progress: 进度条生成的进度宽度
        this.touch.left = this.$refs.progress.clientWidth
      },
      progressTouchMove (e) {
        if (!this.touch.init) {
          return
        }
        // progressBarWidth: 进度条能移动的距离: 进度条长度 - 小球长度
        const progressBarWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
        // detailX: 进度条移动距离 = 当前点击位置 - 上一次点击位置
        const detailX = e.touches[0].pageX - this.touch.startX
        // Math.max(0, X): (X>0)返回的值不小于0
        const offsetWidth = Math.min(progressBarWidth, Math.max(0, this.touch.left + detailX))
        this._offset(offsetWidth)
      },
      progressTouchEnd () {
        this.touch.init = false
        this._triggerPercent()
      },
      progressClick (e) {
        // getBoundingClientRect: static -> getBoundingClientRect.png
        // getBoundingClientRect: 获得页面中某个元素的左，上，右和下分别相对浏览器视窗的位置
        const rect = this.$refs.progressBar.getBoundingClientRect()
        // e.pageX:  点击点距离browser page最左侧的距离
        const offsetWidth = e.pageX - rect.left
        this._offset(offsetWidth)
        this._triggerPercent()
      },
      _triggerPercent () {
        // progressBarWidth: 进度条能移动的距离 = 进度条长度 - 小球长度
        const progressBarWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
        // this.$refs.progress: 进度条播放进度与总播放进度条长度比例
        const percent = this.$refs.progress.clientWidth / progressBarWidth
        // call父类的percentChange方法
        this.$emit('percentChange', percent)
      },
      _offset (offsetWidth) {
        this.$refs.progress.style.width = `${offsetWidth}px`
        this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px, 0, 0)`
      }
    },
    watch: {
      percent (newPercent) {
        // !this.touch.init: 进度条拖动过程不能够去修改
        if (newPercent >= 0 && !this.touch.init) {
          // progressBtnWidth: 播放控件小球
          // this.$refs.progressBar.clientWidth: 歌曲进度条长度
          // progressBarWidth: 歌曲实际能播放进度条长度
          const progressBarWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
          // offsetWidth: 已经播放了的进度条长度
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
