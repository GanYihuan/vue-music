<template>
  <!-- static/02.png -->
  <!-- data: When data changes, refresh scroll -->
  <scroll
    class="listview"
    ref="listview"
    :data="data"
    :listenScroll="listenScroll"
    :probeType='probeType'
    @scroll="scroll"
  >
    <ul>
      <!--
        singer.vue/_normalizeSinger
        data structure
      -->
      <li
        class="list-group"
        ref="listGroup"
        v-for="(group,index) in data"
        :key="index"
      >
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li
            class="list-group-item"
            v-for="(item,index) in group.items"
            :key="index"
            @click="selectItem(item)"
          >
            <img class="avatar" v-lazy="item.avatar"/>
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <!-- On the right side A-Z -->
    <div
      class="list-shortcut"
      @touchstart="onShortCutTouchStart"
      @touchmove.stop.prevent="onShortCutTouchMove"
    >
      <ul>
        <li
          class="item"
          v-for="(item, index) in shortcutList"
          :key="index"
          :class="{'current': currentIndex === index}"
          :data-index="index"
        >
          {{item}}
        </li>
      </ul>
    </div>
    <div class="list-fixed" v-show="fixedTitle" ref="fixed">
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
    // created: The values inside are not monitored
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
        // The interval between the current block cap and the upper limit
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
      // right side list A-Z, title Set array
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
        // delta: move several anchors number
        let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
        // move, locate which anchor point index
        let anchorIndex = parseInt(this.touch.anchorIndex) + delta
        this._scrollTo(anchorIndex)
      },
      refresh () {
        this.$refs.listview.refresh()
      },
      scroll (pos) {
        // pos it's scroll.vue: me.$emit('scroll', pos)
        // The location of the real-time scrolling.
        this.scrollY = pos.y
      },
      _scrollTo (index) {
        // index == null -> !index, index == 0 Rule out
        if (!index && index !== 0) {
          return
        }
        // Click on the top and bottom empty position
        if (index < 0) {
          index = 0
        } else if (index > this.heightList.length - 2) {
          index = this.heightList.length - 2
        }
        // celling position
        this.scrollY = -this.heightList[index]
        // Scroll to the corresponding element
        // Second parameter: animation duration
        this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
      },
      _calculateHeight () {
        let height = 0
        let listGroup = this.$refs.listGroup
        // heightList is more one element then listGroup
        this.heightList = []
        this.heightList.push(height)
        for (let i = 0; i < listGroup.length; i++) {
          let item = listGroup[i]
          height += item.clientHeight
          this.heightList.push(height)
        }
      }
    },
    components: {
      Scroll,
      loading
    },
    watch: {
      data () {
        // data changes to the dom are delayed
        setTimeout(() => {
          this._calculateHeight()
        }, 20)
      },
      diff (newVal) {
        let fixedTop = (newVal > 0 && newVal < FIXED_TITLE_HEIGHT) ? newVal - FIXED_TITLE_HEIGHT : 0
        // When diff is in a non-animation state, no changes are required.
        // Reduce dom manipulation and improve performance optimization.
        if (this.fixedTop === fixedTop) {
          return
        }
        this.fixedTop = fixedTop
        // open GPU accelerate
        this.$refs.fixed.style.transform = `translate3d(0, ${fixedTop}px, 0)`
        // this.$refs.fixed.style.top = `${fixedTop}px`
      },
      scrollY (newY) {
        let heightList = this.heightList
        // When scrolling to the top. newY > 0
        if (newY > 0) {
          this.currentIndex = 0
          return
        }
        // Scroll in the middle.
        // length - 1, Don't consider the last one.
        for (let i = 0; i < heightList.length - 1; i++) {
          // celling
          let height1 = heightList[i]
          // floor
          let height2 = heightList[i + 1]
          // -newY scroll to bottom, newY it's negative，add “-” may it positive
          if (-newY >= height1 && -newY < height2) {
            this.currentIndex = i
            // diff: current element celling and floor gaps
            this.diff = newY + height2
            return
          }
          this.currentIndex = 0
        }
        // When scroll to the bottom of the last element, and -newy is greater than the floor of last element.
        // because create celling and floor, heightList more one then listGroup, so '-2'
        this.currentIndex = heightList.length - 2
      },
      diff (newVal) {
        // fixed-title more to top
        let fixedTop = (newVal > 0 && newVal < FIXED_TITLE_HEIGHT) ? newVal - FIXED_TITLE_HEIGHT : 0
        // fixed-title not more to top
        if (this.fixedTop === fixedTop) {
          return
        }
        this.fixedTop = fixedTop
        // begin GPU accelerate
        this.$refs.fixed.style.transform = `translate3d(0, ${fixedTop}px, 0)`
        // this.$refs.fixed.style.top = `${fixedTop}px`
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../common/scss/variable.scss";
  @import "./listview.scss";
</style>
