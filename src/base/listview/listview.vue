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
    // created里面的值不会被监听
    created () {
      this.touch = {}
      this.listenScroll = true
      this.probeType = 3
    },
    // data, props里面的值会被监听
    data () {
      return {
        // 事实滚动位置
        scrollY: -1,
        // 当前应该显示哪个
        currentIndex: 0,
        // 当前区块上限和上个区块下限之间的间隔
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
      //  right side list A-Z, title Set array
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
        // The first point is the anchor point.
        this.touch.anchorIndex = anchorIndex
        this._scrollTo(anchorIndex)
      },
      onShortCutTouchMove (e) {
        // touches: Finger position
        let firstTouch = e.touches[0]
        // y-axis position
        this.touch.y2 = firstTouch.pageY
        // | 0: Math.floor
        // delta: Offset several anchors ?
        let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
        // Move to which anchor point.
        let anchorIndex = parseInt(this.touch.anchorIndex) + delta
        this._scrollTo(anchorIndex)
      },
      refresh () {
        this.$refs.listview.refresh()
      },
      scroll (pos) {
        // Gain slip distance
        this.scrollY = pos.y
      },
      _scrollTo (index) {
        // index == null -> !index, index == 0 Rule out
        if (!index && index !== 0) {
          return
        }
        // '热门' Upper black side and bottom black side.
        if (index < 0) {
          index = 0
        } else if (index > this.heightList.length - 2) {
          index = this.heightList.length - 2
        }
        // upper limit position
        this.scrollY = -this.heightList[index]
        // scroll to the corresponding singer destination.
        // Second parameter: animation duration.
        this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
      },
      _calculateHeight () {
        let height = 0
        let listGroup = this.$refs.listGroup
        // heightList 比 listGroup 多一个元素
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
        // The change in data to the dom has a delay, dom rendering.
        setTimeout(() => {
          this._calculateHeight()
        }, 20)
      },
      diff (newVal) {
        let fixedTop = (newVal > 0 && newVal < FIXED_TITLE_HEIGHT) ? newVal - FIXED_TITLE_HEIGHT : 0
        // 当diff在非动画状态时, 不必去变动
        if (this.fixedTop === fixedTop) {
          return
        }
        this.fixedTop = fixedTop
        //开启GPU加速
        this.$refs.fixed.style.transform = `translate3d(0, ${fixedTop}px, 0)`
        // this.$refs.fixed.style.top = `${fixedTop}px`
      },
      // 落入哪个区间
      scrollY (newY) {
        let heightList = this.heightList
        // 当滚动到顶部, newY > 0
        if (newY > 0) {
          this.currentIndex = 0
          return
        }
        // 在中间部分滚动
        // length - 1, 不考虑最后一个
        for (let i = 0; i < heightList.length; i++) {
          // 上限
          let height1 = heightList[i]
          // 下限
          let height2 = heightList[i + 1]
          // -newY 向下滚动newY为负值, 取'-'使其变成正值
          if (-newY >= height1 && -newY < height2) {
            this.currentIndex = i
            // diff: 当前区块上限和上个区块下限之间的间隔
            this.diff = newY + height2
            return
          }
          this.currentIndex = 0
        }
        // 当滚动到底部最后一个元素, 且 -newY 大于最后一个元素的上限
        // heightList上下限
        // heightList 比listGroup多一个元素, 所以 -2
        this.currentIndex = heightList.length - 2
      },
      diff (newVal) {
        // fixed-title上顶
        let fixedTop = (newVal > 0 && newVal < FIXED_TITLE_HEIGHT) ? newVal - FIXED_TITLE_HEIGHT : 0
        // fixed-title不上顶
        if (this.fixedTop === fixedTop) {
          return
        }
        this.fixedTop = fixedTop
        // 开启GPU加速
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
