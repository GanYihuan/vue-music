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
  import MHeader from './components/m-header/m-header'
  import Tab from './components/tab/tab.vue'

  export default {
    components: {
      MHeader,
      Tab
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
