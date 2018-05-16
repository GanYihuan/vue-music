<template>
  <!-- static/02-歌手界面.png -->
  <scroll class="listview"
          ref="listview"
          :data="data"
          :listenScroll="listenScroll"
          :probeType='probeType'
          @scroll="scroll"
  >
    <ul>
      <li class="list-group"
          ref="listGroup"
          v-for="(group, index) in data"
          :key="index"
      >
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li class="list-group-item"
              v-for="(item, index) in group.items"
              :key="index"
              @click="selectItem(item)"
          >
            <img class="avatar" v-lazy="item.avatar"/>
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut"
         @touchstart="onShortCutTouchStart"
         @touchmove.stop.prevent="onShortCutTouchMove"
    >
      <ul>
        <li class="item"
            v-for="(item, index) in shortcutList"
            :key="index"
            :class="{'current': currentIndex === index}"
            :data-index="index"
        >
          {{item}}
        </li>
      </ul>
    </div>
    <div class="list-fixed"
         ref="fixed"
         v-show="fixedTitle"
    >
      <h2 class="fixed-title">{{fixedTitle}}</h2>
    </div>
    <div class="loading-container" v-show="!data.length">
      <loading></loading>
    </div>
  </scroll>
</template>

<script type="text/ecmascript-6">
  // get & set
  import { getData } from 'common/js/dom'
  import Scroll from 'base/scroll/scroll'
  import loading from 'base/loading/loading'

  const ANCHOR_HEIGHT = 18
  const FIXED_TITLE_HEIGHT = 30

  export default {
    // created: The values not need monitored
    created () {
      this.touch = {}
      this.listenScroll = true
      this.probeType = 3
    },
    // data, props The values inside are monitored
    data () {
      return {
        // The location of the real-time scrolling.
        scrollY: -1,
        // Which one should be displayed
        currentIndex: 0,
        // diff: current element celling to pre element floor gaps
        diff: -1
      }
    },
    props: {
      data: {
        type: Array,
        default: null
      }
    },
    computed: {
      shortcutList () {
        return this.data.map((group) => {
          // '热门' only one singer string '热'
          return group.title.substr(0, 1)
        })
      },
      fixedTitle () {
        if (this.scrollY > 0) {
          return ''
        }
        // !== undefined
        return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
      }
    },
    methods: {
      selectItem (item) {
        this.$emit('select', item)
      },
      onShortCutTouchStart (e) {
        // getData (common/js/dom.js)
        let anchorIndex = getData(e.target, 'index')
        // touches: Finger position
        let firstTouch = e.touches[0]
        // y-axis position
        this.touch.y1 = firstTouch.pageY
        // The first point anchor index
        this.touch.anchorIndex = anchorIndex
        this._scrollTo(anchorIndex)
      },
      onShortCutTouchMove (e) {
        // touches: Finger position
        let firstTouch = e.touches[0]
        // y-axis position
        this.touch.y2 = firstTouch.pageY
        // | 0: Math.floor
        // delta: after move, pass several anchors number
        let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
        // after move, locate which anchor point number
        let anchorIndex = parseInt(this.touch.anchorIndex) + delta
        this._scrollTo(anchorIndex)
      },
      refresh () {
        this.$refs.listview.refresh()
      },
      scroll (pos) {
        // scroll.vue: The location of the real-time scrolling.
        this.scrollY = pos.y
      },
      _scrollTo (index) {
        // index === null -> !index, index == 0 Rule out
        if (!index && index !== 0) {
          return
        }
        // Click on the top and bottom empty position
        if (index < 0) {
          index = 0
        } else if (index > this.listHeight.length - 2) {
          index = this.listHeight.length - 2
        }
        // celling position
        this.scrollY = -this.listHeight[index]
        // first parameter: Scroll to the corresponding element, second parameter: animation duration
        this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
      },
      _calculateHeight () {
        let height = 0
        let listGroup = this.$refs.listGroup
        // listHeight is more one element then listGroup
        this.listHeight = []
        this.listHeight.push(height)
        for (let i = 0; i < listGroup.length; i++) {
          let item = listGroup[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      }
    },
    components: {
      Scroll,
      loading
    },
    watch: {
      data () {
        setTimeout(() => {
          this._calculateHeight()
        }, 20)
      },
      diff (newVal) {
        let fixedTop = (newVal > 0 && newVal < FIXED_TITLE_HEIGHT) ? newVal - FIXED_TITLE_HEIGHT : 0
        if (this.fixedTop === fixedTop) {
          return
        }
        this.fixedTop = fixedTop
        // open GPU accelerate
        this.$refs.fixed.style.transform = `translate3d(0, ${fixedTop}px, 0)`
      },
      scrollY (newY) {
        let listHeight = this.listHeight
        // When scrolling to the top, newY > 0
        if (newY > 0) {
          this.currentIndex = 0
          return
        }
        // Scroll in the middle
        // length - 1, Don't consider the last one
        for (let i = 0; i < listHeight.length - 1; i++) {
          // celling
          let height1 = listHeight[i]
          // floor
          let height2 = listHeight[i + 1]
          // -newY scroll to bottom, newY it's negative，add “-” may it positive
          if (-newY >= height1 && -newY < height2) {
            this.currentIndex = i
            this.diff = newY + height2
            return
          }
          this.currentIndex = 0
        }
        // currentIndex: array index start at 0, listHeight more one element then listGroup, -2
        this.currentIndex = listHeight.length - 2
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../common/scss/variable.scss";
  @import "./listview.scss";
</style>
