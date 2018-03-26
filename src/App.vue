<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <!-- keep-alive: Declaration Cycle cache to memory -->
    <!-- 防止切回到recommedn界面时, 界面一闪 -->
    <keep-alive>
      <!-- router render here -->
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script type="text/ecmascript-6">
  import MHeader from 'components/m-header/m-header.vue'
  // navigation-bar
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
