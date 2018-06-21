<template>
  <transition name="confirm-fade">
    <div
      class="confirm"
      v-show="showFlag"
      @click.stop
    >
      <div class="confirm-wrapper">
        <div class="confirm-content">
          <p class="text">{{text}}</p>
          <div class="operate">
            <div @click="cancel" class="operate-btn left">{{cancelBtnText}}</div>
            <div @click="confirm" class="operate-btn">{{confirmBtnText}}</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
export default {
	props: {
		text: {
			type: String,
			default: ''
		},
		confirmBtnText: {
			type: String,
			default: '确定'
		},
		cancelBtnText: {
			type: String,
			default: '取消'
		}
	},
	data() {
		return {
			showFlag: false
		}
	},
	methods: {
		show() {
			this.showFlag = true
		},
		hide() {
			this.showFlag = false
		},
		cancel() {
			this.hide()
			this.$emit('cancel')
		},
		confirm() {
			this.hide()
			this.$emit('confirm')
		}
	}
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import '../../common/scss/variable.scss';
@import './comfirm.scss';
</style>
