<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <!--
      keep-alive: 在加载路由后缓存内容,
      并且缓存在加载时被读取，以防止连续加载.
    -->
    <!-- <keep-alive exclude="Detail"> -->
    <!-- name = Detail 组件不做缓存处理. -->
    <keep-alive>
      <!-- router render here -->
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script type="text/ecmascript-6">
import MHeader from 'components/m-header/m-header'
import Tab from 'components/tab/tab'
import Player from 'components/player/player'

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
/* Styles apply to the parent element of a style element and its child elements */
</style>
