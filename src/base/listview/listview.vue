<template>
  <!-- static/02-歌手列表.png -->
  <!-- :data="data" Data is obtained async, Data changes to refresh the scroll -->
  <scroll
    class="listview"
    ref="listview"
    :data="data"
    :listenScroll="listenScroll"
    :probeType='probeType'
    @scroll="scroll"
  >
    <!-- singer -->
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
    <!-- 'A','B','C'... -->
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
    <!-- 分类字母 -->
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
/* get & set <li class="item" :data-index></li> */
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
      /* real-time scroll position */
      scrollY: -1,
      /* which letters should be displayed */
      currentIndex: 0,
      /* diff: current element celling to pre element floor gaps */
      diff: -1
    }
  },
  created() {
    this.touch = {}
    this.listenScroll = true
    this.probeType = 3
  },
  computed: {
    /* 'A','B','C'... */
    shortcutList() {
      return this.data.map(group => {
        return group.title.substr(0, 1)
      })
    },
    fixedTitle() {
      if (this.scrollY > 0) {
        return ''
      }
      /* make sure !== undefined */
      return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
    }
  },
  methods: {
    selectItem(item) {
      this.$emit('select', item)
    },
    onShortCutTouchStart(e) {
      /* getData(): get index */
      const anchorIndex = getData(e.target, 'index')
      /* e.touches[0]: click position */
      const firstTouch = e.touches[0]
      this.touch.y1 = firstTouch.pageY
      this.touch.anchorIndex = anchorIndex
      this._scrollTo(anchorIndex)
    },
    onShortCutTouchMove(e) {
      const firstTouch = e.touches[0]
      this.touch.y2 = firstTouch.pageY
      /* | 0: Math.floor */
      const delta = ((this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT) | 0
      /* stopped position */
      const anchorIndex = parseInt(this.touch.anchorIndex) + delta
      this._scrollTo(anchorIndex)
    },
    refresh() {
      this.$refs.listview.refresh()
    },
    scroll(pos) {
      /* pos.y: Real-time scroll position */
      this.scrollY = pos.y
    },
    _scrollTo(index) {
      /* click on the blank */
      /* !index: index === null */
      if (!index && index !== 0) {
        return
      }
      if (index < 0) {
        index = 0
      } else if (index > this.listHeight.length - 2) {
        index = this.listHeight.length - 2
      }
      this.scrollY = -this.listHeight[index]
      /* scroll.vue: First parameter: Scroll to the element, Second parameter: animate time */
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
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
    /* 17ms dom Rendering completed */
    data() {
      setTimeout(() => {
        this._calculateHeight()
      }, 20)
    },
    diff(newVal) {
      const fixedTop = newVal > 0 && newVal < FIXED_TITLE_HEIGHT ? newVal - FIXED_TITLE_HEIGHT : 0
      /*
      When the title animation not triggered
      fixedTop not changing
      */
      if (this.fixedTop === fixedTop) {
        return
      }
      this.fixedTop = fixedTop
      this.$refs.fixed.style.transform = `translate3d(0, ${fixedTop}px, 0)`
    },
    scrollY(newY) {
      const listHeight = this.listHeight
      /* When scrolling to the top, newY > 0 */
      if (newY > 0) {
        this.currentIndex = 0
        return
      }
      /*
      When scrolling to the middle section,
      listHeight has one more element than listGroup
      */
      for (let i = 0; i < listHeight.length - 1; i++) {
        const height1 = listHeight[i]
        const height2 = listHeight[i + 1]
        /* -newY: When scrolling, newY is negative, add “-” ensure is positive */
        if (-newY >= height1 && -newY < height2) {
          this.currentIndex = i
          /* diff: trigger animation of the title */
          this.diff = newY + height2
          return
        }
        this.currentIndex = 0
      }
      /*
      When scrolling to the bottom
      listHeight.length-2: listHeight has one more element than listGroup
      */
      this.currentIndex = listHeight.length - 2
    }
  }
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import "./listview.scss";
</style>
