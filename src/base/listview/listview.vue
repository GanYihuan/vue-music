<template>
  <scroll
    class="listview"
    :data="data"
    ref="listview"
  >
    <ul>
      <li
        v-for="(group, index) in data"
        :key="index"
        class="list-group"
        ref="listGroup"
      >
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li
            v-for="(item, index) in group.items"
            :key="index"
            class="list-group-item"
          >
            <img v-lazy="item.avatar" class="avatar"/>
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="loading-container" v-show="!data.length">
      <loading></loading>
    </div>
  </scroll>
</template>

<script type="text/ecmascript-6">
  import { getData } from '../../common/js/dom'
  import scroll from '../../base/scroll/scroll'
  import loading from '../../base/loading/loading'

  const ANCHOR_HEIGHT = 18
  const FIXED_TITLE_HEIGHT = 30

  export default {
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    data () {
      return {
        scrollY: -1,
        currentIndex: 0,
        diff: -1
      }
    },
    created () {
      this.touch = {}
      this.listenScroll = true
      this.probeType = 3
    },
    components: {
      scroll,
      loading
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../common/scss/variable.scss";
  @import "./listview.scss";
</style>
