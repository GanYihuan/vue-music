<template>
  <div class="music-list">
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-image" :style="bgStyle" ref="bgImg">
      <div class="play-wrapper">
        <div class="play" v-show="songs.length>0" ref="playBtn" @click="random">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter" ref="filter"></div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <scroll
      class="list"
      :probe-type="probeType"
      :listen-scroll="listenScroll"
      :data="songs"
      ref="list"
      @scroll="scroll"
    >
      <div class="song-list-wrapper">
        <song-list @select="selectItem" :songs="songs"></song-list>
      </div>
      <div class="loading-container" v-show="!songs.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
  // 传入 vuex 的 action
  import {mapActions} from "vuex"
  import {prefixStyle} from 'common/js/dom'
  import Scroll from "base/scroll/scroll"
  import SongList from "base/song-list/song-list"
  import Loading from "base/loading/loading"

  const RESERVED_HEIGHT = 40
  // const transform = prefixStyle('transform')
  // const backdrop = prefixStyle('backdrop-filter')

  export default {
    props: {
      songs: {
        type: Array,
        default: []
      },
      title: {
        type: String,
        default: ""
      },
      bgImage: {
        type: String,
        default: ""
      }
    },
    data () {
      return {
        // 事实滚动位置
        scrollY: 0
      }
    },
    created () {
      this.probeType = 3
      this.listenScroll = true
    },
    computed: {
      bgStyle () {
        return `background-image: url(${this.bgImage})`
      }
    },
    methods: {
      back () {
        this.$router.back()
      },
      scroll (pos) {
        // 事实滚动位置
        this.scrollY = pos.y
      },
      selectItem (item, index) {
        // 调用 vuex 的 action
        this.selectPlay({
          list: this.songs,
          index: index
        })
      },
      random () {
        this.randomPlay({
          list: this.songs
        })
      },
      // 传入 vuex 的 action
      ...mapActions([
        "selectPlay",
        "randomPlay"
      ])
    },
    mounted () {
      this.bgImgHeight = this.$refs.bgImg.clientHeight
      this.minTranslateY = -this.bgImgHeight + RESERVED_HEIGHT
      this.$refs.list.$el.style.top = `${this.bgImgHeight}px`
    },
    watch: {
      scrollY (newY) {
        let zIndex = 0
        let scale = 1
        let blur = 0
        let translateY = Math.max(this.minTranslateY, newY)

        if (this.translateY === translateY) {
          return
        }
        this.translateY = translateY
        // 绝对值
        const percent = Math.abs(newY / this.bgImgHeight)

        // 往下拉
        if (newY > 0) {
          scale = 1 + percent
          zIndex = 10
        } else {
          blur = Math.min(20 * percent, 20)
        }

        // bug!
        // 大小变化
        // this.$refs.bgImg.style[transform] = `scale(${scale})`
        // 高斯模糊: apple手机能查看
        // this.$refs.filter.style[backdrop] = `blur(${blur}px)`
        // 动画,位移
        // this.$refs.layer.style[transform] = `translate3d(0, ${translateY}px, 0)`

        this.$refs.bgImg.style["transform"] = `scale(${scale})`;
        this.$refs.bgImg.style["webkitTransform"] = `scale(${scale})`;
        this.$refs.bgImg.style["backdrop-filter"] = `blur(${blur}px)`;
        this.$refs.bgImg.style["webkitBackdrop-filter"] = `blur(${blur}px)`;
        this.$refs.layer.style["transform"] = `translate3d(0, ${translateY}px, 0)`;
        this.$refs.layer.style["webkitTransform"] = `translate3d(0, ${translateY}px, 0)`;

        // 滚动到顶部
        if (newY < this.minTranslateY) {
          zIndex = 10
          this.$refs.bgImg.style.paddingTop = 0
          this.$refs.bgImg.style.height = `${RESERVED_HEIGHT}px`
          this.$refs.playBtn.style.display = "none"
        } else {
          this.$refs.bgImg.style.paddingTop = "70%"
          this.$refs.bgImg.style.height = 0
          this.$refs.playBtn.style.display = ""
        }
        this.$refs.bgImg.style.zIndex = zIndex
      }
    },
    components: {
      Scroll,
      SongList,
      Loading
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import '../../common/scss/variable.scss';
  @import '../../common/scss/_mixin.scss';
  @import './music-list.scss';
</style>