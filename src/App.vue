<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <!-- keep-alive: 声明周期缓存到内存中 -->
    <keep-alive> 
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
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

<style>
/* scoped 属性是一个布尔属性 */
/* 如果使用该属性，则样式仅仅应用到 style 元素的父元素及其子元素 */
</style>
