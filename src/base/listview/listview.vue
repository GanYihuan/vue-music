<template>
  <!-- ![singer interface](https://i.loli.net/2019/04/08/5caac3c529537.png) -->
  <!-- :data="data": data is async, data change refresh scroll -->
  <scroll
    class="listview"
    ref="listview"
    :data="data"
    :listenScroll="listenScroll"
    :probeType='probeType'
    @scroll="scroll"
  >
    <ul>
      <li
        class="list-group"
        ref="listGroup"
        v-for="(group, index) in data"
        :key="index"
      >
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li
            class="list-group-item"
            v-for="(item, index) in group.items"
            :key="index"
            @click="selectItem(item)"
          >
            <img class="avatar" v-lazy="item.avatar" />
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
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
    <div
      class="list-fixed"
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
import { getData } from 'common/js/dom'
import Scroll from 'base/scroll/scroll'
import loading from 'base/loading/loading'
const ANCHOR_HEIGHT = 18
const FIXED_TITLE_HEIGHT = 30

export default {
  components: {
    Scroll,
    loading
  },
  props: {
    data: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      scrollY: -1, // real-time scroll position
      currentIndex: 0, // which letters should be display
      diff: -1 // diff: current element celling to pre element floor gaps
    }
  },
  created() {
    this.touch = {}
    this.listenScroll = true
    this.probeType = 3
  },
  computed: {
    shortcutList() { // 'A','B','C'...
      return this.data.map(group => {
        return group.title.substr(0, 1)
      })
    },
    fixedTitle() {
      if (this.scrollY > 0) {
        return ''
      }
      return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
    }
  },
  methods: {
    selectItem(item) {
      this.$emit('select', item)
    },
    onShortCutTouchStart(e) {
      const anchorIndex = getData(e.target, 'index') // getData(): get index
      const firstTouch = e.touches[0] // e.touches[0]: click position
      this.touch.y1 = firstTouch.pageY
      this.touch.anchorIndex = anchorIndex
      this._scrollTo(anchorIndex)
    },
    onShortCutTouchMove(e) {
      const firstTouch = e.touches[0]
      this.touch.y2 = firstTouch.pageY
      const delta = ((this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT) | 0 // | 0: Math.floor
      const anchorIndex = parseInt(this.touch.anchorIndex) + delta // stop position index
      this._scrollTo(anchorIndex)
    },
    refresh() {
      this.$refs.listview.refresh()
    },
    scroll(pos) {
      this.scrollY = pos.y
    },
    _scrollTo(index) {
      if (!index && index !== 0) { // click on the blank
        return
      }
      if (index < 0) {
        index = 0
      } else if (index > this.listHeight.length - 2) {
        index = this.listHeight.length - 2
      }
      this.scrollY = -this.listHeight[index]
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0) // scrollToElement() -> dom, animate time
    },
    _calculateHeight() {
      let height = 0
      const listGroup = this.$refs.listGroup
      this.listHeight = []
      this.listHeight.push(height)
      for (let i = 0; i < listGroup.length; i++) {
        const item = listGroup[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    }
  },
  watch: {
    data() { // 20: browser 17ms dom render complete
      setTimeout(() => {
        this._calculateHeight()
      }, 20)
    },
    diff(newVal) {
      const fixedTop = newVal > 0 && newVal < FIXED_TITLE_HEIGHT ? newVal - FIXED_TITLE_HEIGHT : 0
      if (this.fixedTop === fixedTop) { // when the title animation not trigger, fixedTop not change
        return
      }
      this.fixedTop = fixedTop
      this.$refs.fixed.style.transform = `translate3d(0, ${fixedTop}px, 0)`
    },
    scrollY(newY) {
      const listHeight = this.listHeight
      if (newY > 0) { // when scroll to the top, newY > 0
        this.currentIndex = 0
        return
      }
      // listHeight one more element than listGroup
      for (let i = 0; i < listHeight.length - 1; i++) { // when scroll to the middle section,
        const height1 = listHeight[i]
        const height2 = listHeight[i + 1]
        if (-newY >= height1 && -newY < height2) { // -newY: When scroll, newY is negative, add “-” ensure positive
          this.currentIndex = i
          this.diff = newY + height2 // diff: trigger animate of the title
          return
        }
        this.currentIndex = 0
      }
      this.currentIndex = listHeight.length - 2 // when scroll to the bottom
    }
  }
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import "./listview.scss";
</style>
