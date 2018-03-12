<template>
  <transition name="slide">
    <h1>singer-detail</h1>
  </transition>
</template>

<script type="text/ecmascript-6">
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters([
        'singer'
      ])
    },
    created() {
      console.log(this.singer)
      // this._getDetail()
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../common/scss/variable.scss';
  @import "./singer-detail.scss";
</style>
