<template>
  <scroll class="listview" 
          :data="data"  
          ref="listview"
          :listenScroll="listenScroll"
          :probeType='probeType'
          @scroll="scroll"
  >
    <ul>
      <li v-for="(group,index) in data" :key="index" class="list-group" ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li @click="selectItem(item)" v-for="(item,index) in group.items" :key="index" class="list-group-item">
            <img v-lazy="item.avatar" class="avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>

    <div class="list-shortcut" @touchstart="onShortCutTouchStart" @touchmove.stop.prevent="onShortCutTouchMove">
      <ul>
        <li v-for="(item, index) in shortcutList" 
            :key="index"
            class="item" 
            :data-index="index"
            :class="{'current': currentIndex === index}"
        >{{item}}</li>
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

<script>
  import scroll from 'base/scroll/scroll'
  import {getData} from 'common/js/dom'
  import loading from 'base/loading/loading'

  const ANCHOR_HEIGHT = 18
  const FIXED_TITLE_HEIGHT = 30

  export default {
    created() {
      this.touch = {}
      this.listenScroll = true
      this.probeType = 3
    },
    data() {
      return {
        // 事实滚动位置
        scrollY: -1,
        // 当前应该显示第几个
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
      shortcutList() {
        return this.data.map((group) => {
          return group.title.substr(0, 1)
        })
      },
      fixedTitle() {
        if(this.scrollY > 0) {
          return ''
        }
        return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
      }
    },
    methods: {
      selectItem(item) {
        // 派发事件出去
        this.$emit('select', item)
      },
      onShortCutTouchStart(e) {
        let anchorIndex = getData(e.target, 'index')
        // touches: Finger position
        let firstTouch = e.touches[0]
        this.touch.y1 = firstTouch.pageY
        // Position anchor Point at the start point
        this.touch.anchorIndex = anchorIndex
        this._scrollTo(anchorIndex)
      },
      onShortCutTouchMove(e) {
        // 判断移动时距离 / 每个字母高度，得到detal，再据此移动到目标分类
        let firstTouch = e.touches[0]
        this.touch.y2 = firstTouch.pageY
        let detal = Math.floor((this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT)
        let anchorIndex = parseInt(this.touch.anchorIndex) + detal
        this._scrollTo(anchorIndex)
      },
      scroll(pos) {
        // 获得滑动距离
        this.scrollY = pos.y          
      },
      _scrollTo(index) {
        if (!index && index !== 0) {
          return
        }
        if (index < 0) {
          index = 0
        } else if (index > this.heightList.length - 2) {
          index = this.heightList.length - 2
        }
        this.scrollY = -this.heightList[index]
        // second params: animate duration
        this.$refs.listview.scrollToElement(this.$refs.listGroup[index])
      },
      _calculateHeight() {
        let height = 0
        let listGroup = this.$refs.listGroup
        // heightList 比listGroup多一个元素
        this.heightList = []
        this.heightList.push(height)
        for(let i=0; i<listGroup.length; i++) {
          let item = listGroup[i]
          height += item.clientHeight
          this.heightList.push(height)
        }
      }
    },
    components: {
      scroll,
      loading
    },
    watch: {
      data() {
        setTimeout(() => {
          this._calculateHeight()
        },20)
      },
      diff(newVal) {
        let fixedTop = (newVal > 0 && newVal < FIXED_TITLE_HEIGHT) ? newVal - FIXED_TITLE_HEIGHT : 0
        if(this.fixedTop === fixedTop) {
          return
        }
        this.fixedTop = fixedTop
        this.$refs.fixed.style.transform = `translate3d(0, ${fixedTop}px, 0)`   //开启GPU加速
        // this.$refs.fixed.style.top = `${fixedTop}px`
      },
      scrollY(newY) {
        let heightList = this.heightList
        // 当滚动到顶部, newY > 0
        if (newY > 0) {
          this.currentIndex = 0
          return
        }
        // 在中间部分滚动
        // length - 1, 不考虑最后一个
        for(let i=0; i<heightList.length; i++) {
          let height1 = heightList[i]
          let height2 = heightList[i + 1]
          if(-newY >= height1 && -newY < height2) {
            this.currentIndex = i
            // diff: 当前区块上限和上个区块下限之间的间隔
            this.diff = newY + height2
            return
          }
          this.currentIndex = 0
        }
        // 当滚动到底部最后一个元素, 且-newY大于最后一个元素的上限
        // heightList 比listGroup多一个元素
        this.currentIndex = heightList.length - 2
      },
      diff (newVal) {
        // title上顶
        let fixedTop = (newVal > 0 && newVal < FIXED_TITLE_HEIGHT) ? newVal - FIXED_TITLE_HEIGHT : 0
        // title不上顶
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


<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
