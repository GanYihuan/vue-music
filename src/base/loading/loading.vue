<template>
  <div class="loading">
    <img width="24" height="24" src="./loading.gif" />
    <p class="desc">{{title}}</p>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    title: {
      type: String,
      default: '正在载入...'
    }
  }
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import './loading.scss';
</style>
