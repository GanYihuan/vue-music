<template>
  <!-- static/11-切换 -->
  <ul class="switches">
    <li class="switch-item"
        v-for="(item,index) in switches"
        :key="index"
        :class="{'active':currentIndex === index}"
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
      switchItem (index) {
        this.$emit('switch', index)
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../common/scss/variable.scss";
  @import "./switches.scss";
</style>
