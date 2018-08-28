<template>
  <div class="progress-circle">
    <svg
      :width="radius"
      :height="radius"
      viewBox="0 0 100 100"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- inner circle -->
      <circle 
        class="progress-background"
        r="50"
        cx="50"
        cy="50"
        fill="transparent"
      />
      <!-- outer circle can be rotated. -->
      <!-- stroke-dasharray: Stroke distance -->
      <!-- stroke-dashoffset: Stroke offset -->
      <circle
        class="progress-bar"
        r="50"
        cx="50"
        cy="50"
        fill="transparent"
        :stroke-dasharray="dashArray"
        :stroke-dashoffset="dashOffset"
      />
    </svg>
    <!-- i Tag insertion slot -->
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
	props: {
		radius: {
			type: Number,
			default: 100
		},
		percent: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			dashArray: Math.PI * 100
		}
	},
	computed: {
		dashOffset() {
			return (1 - this.percent) * this.dashArray
		}
	}
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import './progress-circle.scss';
</style>
