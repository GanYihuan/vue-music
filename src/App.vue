<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <!-- 声明周期缓存到内存中 -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  import MHeader from 'components/m-header/m-header'
  import Tab from 'components/tab/tab.vue'

  export default {
    components: {
      MHeader,
      Tab
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
/* scoped 属性是一个布尔属性 */
/* 如果使用该属性，则样式仅仅应用到 style 元素的父元素及其子元素 */
</style>
