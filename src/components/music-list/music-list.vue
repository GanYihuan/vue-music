<template>
  <!-- static/03-歌手详情页.png/歌手详情页 -->
  <!-- singer-detail.vue handle data, music-list.vue show component -->
  <div class="music-list">
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-image" :style="bgStyle" ref="bgImage">
      <div class="play-wrapper">
        <div
          class="play"
          ref="playBtn"
          v-show="songs.length>0"
          @click="random"
        >
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter" ref="filter"></div>
    </div>
    <!-- 黑色蒙层 -->
    <div class="bg-layer" ref="layer"></div>
    <scroll
      class="list"
      ref="list"
      :data="songs"
      :listen-scroll="listenScroll"
      :probe-type="probeType"
      @scroll="scroll"
    >
      <div class="song-list-wrapper">
        <song-list
          :songs="songs"
          :rank="rank"
          @select="selectItem"
        >
        </song-list>
      </div>
      <div v-show="!songs.length" class="loading-container">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import SongList from 'base/song-list/song-list'
import { prefixStyle } from 'common/js/dom'
import { playlistMixin } from 'common/js/mixin'
import { mapActions } from 'vuex'

const RESERVED_HEIGHT = 40
const transform = prefixStyle('transform')
const backdrop = prefixStyle('backdrop-filter')

export default {
  components: {
    Scroll,
    Loading,
    SongList
  },
  mixins: [playlistMixin],
  props: {
    bgImage: {
      type: String,
      default: ''
    },
    songs: {
      type: Array,
      default: null
    },
    title: {
      type: String,
      default: ''
    },
    rank: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      /* real time roll position */
      scrollY: 0
    }
  },
  created() {
    this.probeType = 3
    this.listenScroll = true
  },
  mounted() {
    this.imageHeight = this.$refs.bgImage.clientHeight
    /* bg-layer */
    this.minTransalteY = -this.imageHeight + RESERVED_HEIGHT
    this.$refs.list.$el.style.top = `${this.imageHeight}px`
  },
  computed: {
    bgStyle() {
      return `background-image:url(${this.bgImage})`
    }
  },
  methods: {
    /* vuex/action.js */
    ...mapActions(['selectPlay', 'randomPlay']),
    /* if mini player, singer list bottom add height */
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.list.$el.style.bottom = bottom
      this.$refs.list.refresh()
    },
    scroll(pos) {
      // 实时滚动的位置
      this.scrollY = pos.y
    },
    back() {
      this.$router.back()
    },
    selectItem(item, index) {
      /* ...mapActions */
      this.selectPlay({
        list: this.songs,
        index
      })
    },
    random() {
      /* ...mapActions */
      this.randomPlay({
        list: this.songs
      })
    }
  },
  watch: {
    scrollY(newVal) {
      const translateY = Math.max(this.minTransalteY, newVal)
      let scale = 1
      let zIndex = 0
      let blur = 0
      const percent = Math.abs(newVal / this.imageHeight)
      /* 下拉 */
      if (newVal > 0) {
        scale = 1 + percent
        zIndex = 10
      } else {
        blur = Math.min(percent * 20, 20)
      }
      this.$refs.layer.style[transform] = `translate3d(0,${translateY}px,0)`
      /* gaussian-blur: iphone can view */
      this.$refs.filter.style[backdrop] = `blur(${blur}px)`
      /* 滚动到了顶部 */
      if (newVal < this.minTransalteY) {
        zIndex = 10
        this.$refs.bgImage.style.paddingTop = 0
        this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`
        this.$refs.playBtn.style.display = 'none'
      } else {
        this.$refs.bgImage.style.paddingTop = '70%'
        this.$refs.bgImage.style.height = 0
        this.$refs.playBtn.style.display = ''
      }
      this.$refs.bgImage.style[transform] = `scale(${scale})`
      this.$refs.bgImage.style.zIndex = zIndex
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "./music-list.scss";
</style>
