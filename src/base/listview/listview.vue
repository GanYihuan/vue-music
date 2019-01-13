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
    <!-- 歌手信息 -->
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
    <!-- 右侧字母 -->
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
      /* Real-time scroll position */
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
    /* Right list 'A','B'... */
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
      /* 获取列表项的 index 值 */
      const anchorIndex = getData(e.target, 'index')
      /* e.touches[0]: 点击的位置 */
      const firstTouch = e.touches[0]
      /* 点击的垂直距离 */
      this.touch.y1 = firstTouch.pageY
      /* 保存点击的位置 index */
      this.touch.anchorIndex = anchorIndex
      this._scrollTo(anchorIndex)
    },
    onShortCutTouchMove(e) {
      const firstTouch = e.touches[0]
      this.touch.y2 = firstTouch.pageY
      /* | 0: Math.floor */
      /* delta: Shifted a few 'letter' positions after the finger swiped */
      const delta = ((this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT) | 0
      /* After sliding your finger, letter subscript on the stopped position */
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
      /* click on the upper and lower blank of the letter */
      /* !index: index === null */
      if (!index && index !== 0) {
        return
      }
      /* handle boundary */
      if (index < 0) {
        index = 0
      } else if (index > this.listHeight.length - 2) {
        index = this.listHeight.length - 2
      }
      /* 当前元素的上线 */
      this.scrollY = -this.listHeight[index]
      /* scroll.vue: First parameter: Scroll to the corresponding element, Second parameter: 动画时间 */
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
    },
    _calculateHeight() {
      let height = 0
      const listGroup = this.$refs.listGroup
      /* listHeight has one more element than listGroup  */
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
      When the title animation is not triggered
      fixedTop is not changing
      */
      if (this.fixedTop === fixedTop) {
        return
      }
      this.fixedTop = fixedTop
      this.$refs.fixed.style.transform = `translate3d(0, ${fixedTop}px, 0)`
    },
    /* Real-time scroll position */
    scrollY(newY) {
      /* Keep the height of the group */
      const listHeight = this.listHeight
      /* When scrolling to the top newY > 0 */
      if (newY > 0) {
        this.currentIndex = 0
        return
      }
      /*
      When scrolling to the middle section,
      listHeight has one more element than listGroup
      listHeight.length-1: the first element upper limit is the second element lower limit,
      */
      for (let i = 0; i < listHeight.length - 1; i++) {
        /* 当前元素的上线 */
        const height1 = listHeight[i]
        /* 下一个元素的上线 */
        const height2 = listHeight[i + 1]
        /* -newY: When scrolling occurs, newY Is negative, Add “-” Ensure that it is positive */
        if (-newY >= height1 && -newY < height2) {
          this.currentIndex = i
          /*
          newY is negative
          diff: trigger the animation of the fix title,
          diff = rolling distance(newY) + 下一个元素的上线
          */
          this.diff = newY + height2
          return
        }
        this.currentIndex = 0
      }
      /*
      When scrolling to the bottom
      -newY is bigger than the last element upper limit
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
