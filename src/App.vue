<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <!--
      keep-alive: The content is cached after the route is loaded,
      and the cache is read when loaded to prevent continuous loading.
    -->
    <!--  <keep-alive exclude="Detail"> -->
    <!-- name = Detail component Do not do cache processing. -->
    <keep-alive>
      <!-- router render here -->
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script type="text/ecmascript-6">
  import MHeader from 'components/m-header/m-header.vue'
  import Tab from 'components/tab/tab.vue'
  import Player from 'components/player/player.vue'

  export default {
    components: {
      MHeader,
      Tab,
      Player
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  /* scoped: is a Boolean property */
  /* Styles apply to the parent element of a STYLE element and its child elements */
</style>
