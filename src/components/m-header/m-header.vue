<template>
  <!-- 01-推荐界面/头部 -->
  <div class="m-header">
    <div class="icon"></div>
    <h1 class="text">Chicken Music</h1>
    <!-- route jump to User Center -->
    <router-link tag="div" class="mine" to="/user">
      <i class="icon-mine"></i>
    </router-link>
  </div>
</template>

<style scoped lang="scss" rel="stylesheet/scss">
@import './m-header.scss';
</style>
