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
    <div
      class="list-shortcut"
      @touchstart="onShortCutTouchStart"
      @touchmove.stop.prevent="onShortCutTouchMove">
      <ul>
        <li
          v-for="(item, index) in shortcutList"
          :key="index"
          class="item"
          :data-index="index"
          :class="{'current': currentIndex === index}"
        >{{item}}
        </li>
      </ul>
    </div>
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
    created () {
      this.touch = {}
      this.listenScroll = true
      this.probeType = 3
    },
    data () {
      return {
        scrollY: -1,
        currentIndex: 0,
        diff: -1
      }
    },
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    computed: {
      shortcutList () {
        return this.data.map((group) => {
          return group.title.substr(0, 1)
        })
      }
    },
    methods: {
      onShortCutTouchStart (e) {
        let anchorIndex = getData(e.target, 'index')
        let firstTouch = e.touches[0]
        this.touch.y1 = firstTouch.pageY
        this.touch.anchorIndex = anchorIndex
        this._scrollTo(anchorIndex)
      },
      onShortCutTouchMove (e) {
        // 判断移动时距离 / 每个字母高度，得到 delta，再据此移动到目标分类
        let firstTouch = e.touches[0]
        this.touch.y2 = firstTouch.pageY
        let delta = Math.floor((this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT)
        let anchorIndex = parseInt(this.touch.anchorIndex) + delta
        this._scrollTo(anchorIndex)
      },
      _scrollTo (index) {
        this.$refs.listview.scrollToElement(this.$refs.listGroup[index])
      }
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
