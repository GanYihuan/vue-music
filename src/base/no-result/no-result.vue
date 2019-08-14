<!--
 * @Description:
 * @version:
 * @Author: GanEhank
 * @Date: 2019-08-04 02:31:14
 * @LastEditors: GanEhank
 * @LastEditTime: 2019-08-14 11:08:54
 -->
<template>
  <div class="no-result">
    <div class="no-result-icon"></div>
    <div class="no-result-text">{{title}}</div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/variable';
@import '../../common/stylus/mixin';

.no-result {
  text-align: center;

  .no-result-icon {
    width: 86px;
    height: 90px;
    margin: 0 auto;
    bg-image('no-result');
    background-size: 86px 90px;
  }

  .no-result-text {
    margin-top: 30px;
    font-size: $font-size-medium;
    color: $color-text-d;
  }
}
</style>

