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
        <div class="play" ref="playBtn" v-show="songs.length>0" @click="random">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter" ref="filter"></div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <scroll class="list"
            ref="list"
            :data="songs"
            :listen-scroll="listenScroll"
            :probe-type="probeType"
            @scroll="scroll"
    >
      <div class="song-list-wrapper">
        <song-list :songs="songs" :rank="rank" @select="selectItem">
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
  // Configuration of different browser CSS.
  import { prefixStyle } from 'common/js/dom'
  // Common code
  import { playlistMixin } from 'common/js/mixin'
  // pass to (vuex/store/actions.js)
  import { mapActions } from 'vuex'

  const RESERVED_HEIGHT = 40
  const transform = prefixStyle('transform')
  const backdrop = prefixStyle('backdrop-filter')

  export default {
    // insert mixin, The component method of the same name overrides the method in a mixin.
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
      // 07-排行榜详情界面.png trophy
      rank: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        scrollY: 0
      }
    },
    computed: {
      bgStyle () {
        return `background-image:url(${this.bgImage})`
      }
    },
    created () {
      this.probeType = 3
      this.listenScroll = true
    },
    mounted () {
      this.imageHeight = this.$refs.bgImage.clientHeight
      // use for layer
      this.minTransalteY = -this.imageHeight + RESERVED_HEIGHT
      this.$refs.list.$el.style.top = `${this.imageHeight}px`
    },
    methods: {
      // If there is a mini player, the singer list bottom will add height to display it.
      handlePlaylist (playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.list.$el.style.bottom = bottom
        this.$refs.list.refresh()
      },
      scroll (pos) {
        this.scrollY = pos.y
      },
      back () {
        this.$router.back()
      },
      selectItem (item, index) {
        // Modify action multiple times, package an actions
        // ...mapActions
        this.selectPlay({
          list: this.songs,
          index
        })
      },
      random () {
        // ...mapActions
        this.randomPlay({
          list: this.songs
        })
      },
      // vuex (store/actions.js)
      ...mapActions([
        'selectPlay',
        'randomPlay'
      ])
    },
    watch: {
      scrollY (newVal) {
        let translateY = Math.max(this.minTransalteY, newVal)
        let scale = 1
        let zIndex = 0
        let blur = 0
        const percent = Math.abs(newVal / this.imageHeight)
        // pull down
        if (newVal > 0) {
          scale = 1 + percent
          zIndex = 10
        } else {
          blur = Math.min(percent * 20, 20)
        }
        this.$refs.layer.style[transform] = `translate3d(0,${translateY}px,0)`
        // Gaussian-blur: iphone can view
        this.$refs.filter.style[backdrop] = `blur(${blur}px)`
        // scroll to top
        if (newVal < this.minTransalteY) {
          zIndex = 10
          // css file: .bg-image { padding-top: 70%; width: 100% }, w : h = 10 : 7
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
    },
    components: {
      Scroll,
      Loading,
      SongList
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import '../../common/scss/variable.scss';
  @import '../../common/scss/_mixin.scss';
  @import './music-list.scss';
</style>
