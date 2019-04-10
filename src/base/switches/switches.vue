<template>
  <!-- ![search list interface](https://i.loli.net/2019/04/10/5cada57184b01.png) -->
  <ul class="switches">
    <li
      class="switch-item"
      v-for="(item,index) in switches"
      :key="index"
      :class="{'active': currentIndex === index}"
      @click="switchItem(index)"
    >
      <span>{{item.name}}</span>
    </li>
  </ul>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    switches: {
      type: Array,
      default: null
    },
    currentIndex: {
      type: Number,
      default: 0
    }
  },
  methods: {
    switchItem(index) {
      this.$emit('switch', index)
    }
  }
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import './switches.scss';
</style>
